// components/ChatBot.tsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Bot, User, 
  Search, FileText, Tag, BarChart3, 
  Brain, Video, Camera, Cpu, Image,
  Upload, Camera as CameraIcon, Shirt, Play,
  Zap, Shield, Database, Workflow, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Types
type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'quick_reply' | 'service_info' | 'product_results' | 'try_on' | 'video_task';
  quickReplies?: string[];
  imageUrl?: string;
  products?: ProductType[];
  taskId?: string;
  status?: 'processing' | 'completed' | 'failed';
};

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  sku: string;
  category: string;
  attributes: string[];
  similarity: number;
};

type ChatMode = 'text' | 'visual_search' | 'try_on' | 'batch_processing';

// Mock services
const ChatBotService = {
  // API Orchestration
  async sendMessage(message: string, image?: File): Promise<any> {
    const formData = new FormData();
    formData.append('message', message);
    if (image) formData.append('image', image);

    const response = await fetch('/api/chat/orchestrate', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
      body: formData,
    });

    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  // Vector DB Search
  async visualSearch(image: File): Promise<ProductType[]> {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('/api/vision/search', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
      body: formData,
    });

    const data = await response.json();
    return data.products || [];
  },

  // Auto-tagging
  async autoTagImage(image: File): Promise<string[]> {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('/api/vision/tag', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
    });

    const data = await response.json();
    return data.tags || [];
  },

  // Multi-object classification
  async detectObjects(image: File): Promise<any[]> {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('/api/vision/detect', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.objects || [];
  },

  // Description generation
  async generateDescription(productData: any): Promise<string> {
    const response = await fetch('/api/ai/describe', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return data.description;
  },

  // Virtual Try-On
  async initiateTryOn(productId: string, userImage?: File): Promise<string> {
    const formData = new FormData();
    formData.append('productId', productId);
    if (userImage) formData.append('userImage', userImage);

    const response = await fetch('/api/ar/try-on', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.tryOnUrl;
  },

  // Image to Video
  async createVideoFromImages(images: File[], productId: string): Promise<string> {
    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    formData.append('productId', productId);

    const response = await fetch('/api/video/generate', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.taskId;
  },

  // Check task status
  async getTaskStatus(taskId: string): Promise<any> {
    const response = await fetch(`/api/tasks/${taskId}`);
    return response.json();
  },
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>('text');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [tryOnActive, setTryOnActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        content: "Hello! I'm your BigOLens AI assistant. I can help you with:\n\n• **Visual Search** - Find products using images\n• **Auto-Tagging** - Generate product attributes\n• **Virtual Try-On** - See how products look on you\n• **Video Creation** - Transform images into videos\n• **Product Recommendations** - Personalized suggestions\n\nWhat would you like to explore today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick_reply',
        quickReplies: [
          'Visual Search',
          'Auto-Tag Products',
          'Virtual Try-On',
          'Create Product Video'
        ]
      }]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Camera handling
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
            setSelectedImage(file);
            handleImageUpload(file);
          }
        }, 'image/jpeg');
      }
      stopCamera();
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  }, []);

  // Image upload handling
  const handleImageUpload = async (file: File) => {
    setSelectedImage(file);
    setIsLoading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const userMessage: MessageType = {
        id: Date.now().toString(),
        content: `Uploaded image: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'image',
        imageUrl: URL.createObjectURL(file)
      };

      setMessages(prev => [...prev, userMessage]);

      // Process based on chat mode
      let response;
      switch (chatMode) {
        case 'visual_search':
          response = await ChatBotService.visualSearch(file);
          break;
        case 'try_on':
          // Handle try-on flow
          break;
        default:
          response = await ChatBotService.autoTagImage(file);
      }

      setUploadProgress(100);
      
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: generateResponseForMode(chatMode, response),
        sender: 'bot',
        timestamp: new Date(),
        type: chatMode === 'visual_search' ? 'product_results' : 'text',
        products: chatMode === 'visual_search' ? response : undefined
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing image:', error);
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error processing your image. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      clearInterval(progressInterval);
    }
  };

  const generateResponseForMode = (mode: ChatMode, data: any): string => {
    switch (mode) {
      case 'visual_search':
        return `I found ${data.length} similar products in our catalog. Here are the best matches:`;
      case 'try_on':
        return "I've prepared the virtual try-on experience. Click 'Start Try-On' to begin.";
      default:
        return `I've analyzed your image and generated the following tags: ${data.join(', ')}`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await ChatBotService.sendMessage(inputMessage, selectedImage || undefined);
      
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: response.quickReplies
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    // Auto-trigger send for certain quick replies
    if (['Visual Search', 'Auto-Tag Products', 'Virtual Try-On'].includes(reply)) {
      setTimeout(() => handleSendMessage(), 100);
    }
  };

  const handleTryOn = async (productId: string) => {
    setTryOnActive(true);
    setIsLoading(true);

    try {
      const tryOnUrl = await ChatBotService.initiateTryOn(productId);
      
      const message: MessageType = {
        id: Date.now().toString(),
        content: "Virtual Try-On ready! Use your camera to see how this product looks on you.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'try_on'
      };

      setMessages(prev => [...prev, message]);
    } catch (error) {
      console.error('Error starting try-on:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoCreation = async (productId: string) => {
    if (!selectedImage) return;

    setIsLoading(true);
    
    try {
      const taskId = await ChatBotService.createVideoFromImages([selectedImage], productId);
      
      const message: MessageType = {
        id: Date.now().toString(),
        content: "I've started creating a video from your product images. This usually takes 2-3 minutes.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'video_task',
        taskId,
        status: 'processing'
      };

      setMessages(prev => [...prev, message]);

      // Poll for task completion
      const checkStatus = setInterval(async () => {
        const status = await ChatBotService.getTaskStatus(taskId);
        if (status.completed) {
          clearInterval(checkStatus);
          setMessages(prev => prev.map(msg => 
            msg.taskId === taskId 
              ? { ...msg, status: 'completed', content: "Your product video is ready!" }
              : msg
          ));
        }
      }, 5000);
    } catch (error) {
      console.error('Error creating video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    return content.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="text-cyan-400">{part}</strong> : part
    );
  };

  return (
    <>
      {/* Chat Bot Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center z-50 border-2 border-white/20 hover:shadow-cyan-500/25 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 w-80 h-[500px] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">BigOLens AI</h3>
                    <p className="text-xs text-white/80">Multimodal Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    stopCamera();
                    setTryOnActive(false);
                  }}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex border-b border-white/10 bg-slate-800/50">
              {[
                { mode: 'text', icon: MessageCircle, label: 'Chat' },
                { mode: 'visual_search', icon: Search, label: 'Visual Search' },
                { mode: 'try_on', icon: Shirt, label: 'Try-On' },
                { mode: 'batch_processing', icon: Settings, label: 'Tools' },
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setChatMode(mode as ChatMode)}
                  className={`flex-1 flex items-center justify-center p-2 text-xs transition-colors ${
                    chatMode === mode 
                      ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400' 
                      : 'text-blue-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {label}
                </button>
              ))}
            </div>

            {/* Messages Container */}
            <div className="h-[340px] overflow-y-auto p-3 space-y-3 chat-scrollbar">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-white rounded-br-none'
                        : 'bg-white/10 text-white rounded-bl-none border border-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'bot' ? (
                        <Bot className="w-3 h-3 text-cyan-400" />
                      ) : (
                        <User className="w-3 h-3 text-cyan-300" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    {/* Image Message */}
                    {message.type === 'image' && message.imageUrl && (
                      <div className="mb-2">
                        <img 
                          src={message.imageUrl} 
                          alt="Uploaded" 
                          className="rounded-lg max-w-full h-32 object-cover"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="whitespace-pre-line text-xs leading-relaxed">
                      {formatMessage(message.content)}
                    </div>

                    {/* Product Results */}
                    {message.type === 'product_results' && message.products && (
                      <div className="mt-2 space-y-2">
                        {message.products.slice(0, 3).map((product) => (
                          <Card key={product.id} className="bg-white/5 border-white/10">
                            <CardContent className="p-2">
                              <div className="flex space-x-2">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-semibold text-white truncate">
                                    {product.name}
                                  </h4>
                                  <p className="text-cyan-400 text-xs">${product.price}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {product.attributes.slice(0, 2).map(attr => (
                                      <Badge key={attr} variant="secondary" className="text-xs px-1 py-0">
                                        {attr}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-1 mt-2">
                                <Button 
                                  size="sm" 
                                  className="text-xs h-6 flex-1"
                                  onClick={() => handleTryOn(product.id)}
                                >
                                  <Shirt className="w-3 h-3 mr-1" />
                                  Try On
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-xs h-6 flex-1"
                                  onClick={() => handleVideoCreation(product.id)}
                                >
                                  <Video className="w-3 h-3 mr-1" />
                                  Video
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Quick Replies */}
                    {message.type === 'quick_reply' && message.quickReplies && (
                      <div className="mt-2 space-y-1">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="block w-full text-left p-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Upload Progress */}
              {uploadProgress > 0 && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-xl p-3 max-w-[85%]">
                    <div className="flex items-center space-x-2 mb-2">
                      <Upload className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs text-white">Processing image...</span>
                    </div>
                    <Progress value={uploadProgress} className="h-1" />
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white rounded-xl rounded-bl-none p-3">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Camera View */}
              {cameraActive && (
                <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-w-md rounded-lg"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="flex space-x-4 mt-4">
                    <Button onClick={captureImage} className="bg-cyan-500 hover:bg-cyan-600">
                      <CameraIcon className="w-4 h-4 mr-2" />
                      Capture
                    </Button>
                    <Button variant="outline" onClick={stopCamera}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
              {/* Selected Image Preview */}
              {selectedImage && (
                <div className="mb-2 flex items-center space-x-2">
                  <img 
                    src={URL.createObjectURL(selectedImage)} 
                    alt="Selected" 
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="text-xs text-blue-300 flex-1 truncate">
                    {selectedImage.name}
                  </span>
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div className="flex space-x-2">
                {/* File Upload Button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 w-8 p-0"
                >
                  <Image className="w-3 h-3" />
                </Button>

                {/* Camera Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startCamera}
                  className="h-8 w-8 p-0"
                >
                  <CameraIcon className="w-3 h-3" />
                </Button>

                {/* Text Input */}
                <Input
                  type="text"
                  placeholder={
                    chatMode === 'visual_search' ? "Describe or upload an image to search..." :
                    chatMode === 'try_on' ? "Select a product to try on..." :
                    "Ask about products, features, or upload images..."
                  }
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-300 rounded-lg text-xs h-8"
                />

                {/* Send Button */}
                <Button
                  onClick={handleSendMessage}
                  disabled={(!inputMessage.trim() && !selectedImage) || isLoading}
                  className="bg-cyan-500 hover:bg-cyan-600 border-0 rounded-lg px-3 h-8 min-w-8"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;