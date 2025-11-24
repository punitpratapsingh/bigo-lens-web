import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { 
  Upload, Camera, Scan, Box, Tag, Filter, 
  Download, RotateCw, ZoomIn, ZoomOut, Settings,
  BarChart3, Sparkles, CheckCircle, X, Play,
  Square, Image, Package, ShoppingCart, Database,
  Layers, Cpu, Zap, Shield, Clock
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

// Asset imports
import classificationHero from "@/assets/classification-hero.png";
import demoImage1 from "/src/assets/set1.png";
import demoImage2 from "/src/assets/set2.png";
import demoImage3 from "/src/assets/set3.png";

interface DetectedObject {
  id: string;
  label: string;
  category: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  price?: string;
  brand?: string;
  similarProducts?: Array<{
    id: string;
    name: string;
    price: string;
    image: string;
  }>;
}

interface ClassificationResult {
  id: string;
  image: string;
  objects: DetectedObject[];
  processingTime: number;
  confidence: number;
  timestamp: string;
  dominantCategory: string;
}

export default function MultiObjectClassification() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Mock classification results
  const mockResults: ClassificationResult[] = [
    {
      id: "1",
      image: demoImage1,
      objects: [
        {
          id: "1-1",
          label: "Designer Handbag",
          category: "accessories",
          confidence: 94.2,
          bbox: { x: 120, y: 80, width: 200, height: 180 },
          price: "$299.99",
          brand: "LuxuryBrand",
          similarProducts: [
            { id: "p1", name: "Premium Leather Handbag", price: "$249.99", image: demoImage1 },
            { id: "p2", name: "Designer Tote Bag", price: "$189.99", image: demoImage2 }
          ]
        },
        {
          id: "1-2",
          label: "Sunglasses",
          category: "eyewear",
          confidence: 88.7,
          bbox: { x: 350, y: 100, width: 80, height: 40 },
          price: "$149.99",
          brand: "SunStyle",
          similarProducts: [
            { id: "p3", name: "Aviator Sunglasses", price: "$129.99", image: demoImage3 }
          ]
        },
        {
          id: "1-3",
          label: "Watch",
          category: "accessories",
          confidence: 91.5,
          bbox: { x: 450, y: 150, width: 60, height: 40 },
          price: "$199.99",
          brand: "TimeMaster"
        }
      ],
      processingTime: 1.2,
      confidence: 91.5,
      timestamp: new Date().toISOString(),
      dominantCategory: "accessories"
    },
    {
      id: "2",
      image: demoImage2,
      objects: [
        {
          id: "2-1",
          label: "Smartphone",
          category: "electronics",
          confidence: 96.8,
          bbox: { x: 150, y: 120, width: 120, height: 200 },
          price: "$899.99",
          brand: "TechCorp"
        },
        {
          id: "2-2",
          label: "Wireless Earbuds",
          category: "electronics",
          confidence: 92.3,
          bbox: { x: 300, y: 180, width: 80, height: 40 },
          price: "$129.99",
          brand: "AudioTech"
        },
        {
          id: "2-3",
          label: "Smart Watch",
          category: "electronics",
          confidence: 89.1,
          bbox: { x: 400, y: 140, width: 100, height: 60 },
          price: "$299.99",
          brand: "WearableTech"
        }
      ],
      processingTime: 1.1,
      confidence: 92.7,
      timestamp: new Date().toISOString(),
      dominantCategory: "electronics"
    }
  ];

  const categories = [
    { id: "all", name: "All Objects", count: 6, color: "bg-blue-500" },
    { id: "accessories", name: "Accessories", count: 3, color: "bg-purple-500" },
    { id: "electronics", name: "Electronics", count: 3, color: "bg-green-500" },
    { id: "clothing", name: "Clothing", count: 0, color: "bg-orange-500" },
    { id: "footwear", name: "Footwear", count: 0, color: "bg-red-500" },
    { id: "home", name: "Home Goods", count: 0, color: "bg-cyan-500" }
  ];

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setClassificationResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate AI classification processing
  const handleClassification = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing steps
    const steps = [20, 40, 60, 80, 100];
    for (const progress of steps) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProcessingProgress(progress);
    }

    // Select a random mock result
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    const resultWithImage = {
      ...randomResult,
      image: selectedImage
    };

    setClassificationResult(resultWithImage);
    setIsProcessing(false);
    setProcessingProgress(0);
  };

  // Draw bounding boxes on canvas
  const drawBoundingBoxes = useCallback(() => {
    if (!canvasRef.current || !imageRef.current || !classificationResult) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bounding boxes
    classificationResult.objects.forEach((obj) => {
      if (obj.confidence >= confidenceThreshold) {
        const { x, y, width, height } = obj.bbox;
        
        // Draw bounding box
        ctx.strokeStyle = getCategoryColor(obj.category);
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw label background
        ctx.fillStyle = getCategoryColor(obj.category);
        ctx.fillRect(x, y - 25, ctx.measureText(`${obj.label} (${obj.confidence.toFixed(1)}%)`).width + 20, 25);

        // Draw label text
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText(`${obj.label} (${obj.confidence.toFixed(1)}%)`, x + 10, y - 8);
      }
    });
  }, [classificationResult, confidenceThreshold]);

  // Get color for category
  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      accessories: '#8B5CF6',
      electronics: '#10B981',
      clothing: '#F59E0B',
      footwear: '#EF4444',
      home: '#06B6D4',
      eyewear: '#EC4899'
    };
    return colorMap[category] || '#6B7280';
  };

  // Filter objects by category and confidence
  const filteredObjects = classificationResult?.objects.filter(obj => 
    (selectedCategory === "all" || obj.category === selectedCategory) &&
    obj.confidence >= confidenceThreshold
  ) || [];

  // Reset everything
  const resetClassification = () => {
    setSelectedImage(null);
    setClassificationResult(null);
    setProcessingProgress(0);
    setZoomLevel(1);
  };

  // Load demo result
  const loadDemoResult = (result: ClassificationResult) => {
    setSelectedImage(result.image);
    setClassificationResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      <div className="pt-24 pb-16">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-green-400/30"
            >
              <Layers className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-green-100">AI Multi-Object Classification</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
              Multi-Object Detection
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Advanced AI-powered object detection and classification for e-commerce. 
              Automatically identify multiple products in images with pinpoint accuracy.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Sidebar - Controls & Results */}
            <div className="xl:col-span-1 space-y-6">
              {/* Upload Section */}
              <Card className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-400" />
                  Upload Image
                </h3>
                
                {!selectedImage ? (
                  <div
                    className="border-2 border-dashed border-green-500/30 rounded-2xl p-8 text-center cursor-pointer hover:border-green-400/50 transition-colors duration-300"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <p className="text-green-100 font-medium mb-2">Upload Product Image</p>
                    <p className="text-blue-200 text-sm">PNG, JPG up to 20MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        onClick={resetClassification}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <Button
                      onClick={handleClassification}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    >
                      {isProcessing ? (
                        <>
                          <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Scan className="w-4 h-4 mr-2" />
                          Detect Objects
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </Card>

              {/* Processing Progress */}
              {isProcessing && (
                <Card className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Processing Image</h3>
                  <div className="space-y-3">
                    <Progress value={processingProgress} className="h-2" />
                    <div className="flex justify-between text-sm text-blue-200">
                      <span>AI Analysis</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-blue-300">
                      {['Object Detection', 'Classification', 'BBox Generation', 'Results'].map((step, index) => (
                        <div key={step} className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            processingProgress >= (index + 1) * 25 ? 'bg-green-400' : 'bg-blue-400/30'
                          }`} />
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Results Summary */}
              {classificationResult && (
                <Card className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                    Analysis Results
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-500/10 rounded-xl">
                        <div className="text-2xl font-bold text-green-400">{classificationResult.objects.length}</div>
                        <div className="text-blue-200 text-sm">Objects Found</div>
                      </div>
                      <div className="text-center p-3 bg-blue-500/10 rounded-xl">
                        <div className="text-2xl font-bold text-blue-400">{classificationResult.processingTime}s</div>
                        <div className="text-blue-200 text-sm">Processing Time</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">Confidence Score</span>
                        <span className="text-green-400 font-semibold">
                          {classificationResult.confidence.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">Dominant Category</span>
                        <span className="text-purple-400 font-semibold capitalize">
                          {classificationResult.dominantCategory}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Demo Results */}
              <Card className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-purple-400" />
                  Try Demo Images
                </h3>
                <div className="space-y-3">
                  {mockResults.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => loadDemoResult(result)}
                      className="w-full p-3 rounded-xl border border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={result.image}
                          alt={`Demo ${index + 1}`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-white text-sm font-medium">
                            Demo {index + 1} - {result.objects.length} objects
                          </p>
                          <p className="text-purple-300 text-xs">
                            {result.dominantCategory} • {result.confidence.toFixed(1)}% accuracy
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-2 space-y-6">
              {/* Image Display & Analysis */}
              <Card className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image with Bounding Boxes */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">Object Detection Results</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                          className="bg-transparent border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                        >
                          {showBoundingBoxes ? <Square className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={drawBoundingBoxes}
                          className="bg-transparent border-green-500/30 text-green-300 hover:bg-green-500/20"
                        >
                          <RotateCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {selectedImage ? (
                      <div className="relative bg-black/20 rounded-xl overflow-hidden">
                        <img
                          ref={imageRef}
                          src={selectedImage}
                          alt="Analysis"
                          className="w-full max-h-96 object-contain"
                          onLoad={drawBoundingBoxes}
                          style={{
                            transform: `scale(${zoomLevel})`,
                            transition: 'transform 0.3s ease'
                          }}
                        />
                        <canvas
                          ref={canvasRef}
                          className="absolute top-0 left-0 w-full h-full pointer-events-none"
                          style={{ display: showBoundingBoxes ? 'block' : 'none' }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-64 bg-black/20 rounded-xl flex items-center justify-center border-2 border-dashed border-green-500/30">
                        <div className="text-center">
                          <Image className="w-12 h-12 text-green-400 mx-auto mb-3" />
                          <p className="text-green-100 font-medium">Upload an image to start analysis</p>
                          <p className="text-blue-200 text-sm mt-1">Or try our demo images</p>
                        </div>
                      </div>
                    )}

                    {/* Zoom Controls */}
                    {selectedImage && (
                      <div className="flex items-center gap-4 mt-4">
                        <ZoomOut className="w-4 h-4 text-blue-300" />
                        <Slider
                          value={[zoomLevel]}
                          onValueChange={([value]) => setZoomLevel(value)}
                          min={0.5}
                          max={3}
                          step={0.1}
                          className="flex-1"
                        />
                        <ZoomIn className="w-4 h-4 text-blue-300" />
                        <span className="text-blue-300 text-sm min-w-12">
                          {Math.round(zoomLevel * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Controls Panel */}
                  <div className="lg:w-80 space-y-6">
                    {/* Confidence Threshold */}
                    <div>
                      <label className="text-blue-200 text-sm font-medium mb-2 block">
                        Confidence Threshold: {confidenceThreshold}%
                      </label>
                      <Slider
                        value={[confidenceThreshold]}
                        onValueChange={([value]) => setConfidenceThreshold(value)}
                        min={50}
                        max={95}
                        step={5}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-blue-300">
                        <span>50%</span>
                        <span>More Objects</span>
                        <span>95%</span>
                        <span>High Accuracy</span>
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <h4 className="text-blue-200 font-medium mb-3">Filter by Category</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full p-3 rounded-xl border transition-all duration-300 text-left ${
                              selectedCategory === category.id
                                ? 'bg-green-500/20 border-green-400 text-green-100'
                                : 'bg-white/5 border-blue-500/30 text-blue-200 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                                <span className="font-medium">{category.name}</span>
                              </div>
                              <span className="text-blue-300 text-sm">{category.count}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Export Options */}
                    {classificationResult && (
                      <div className="space-y-3">
                        <h4 className="text-blue-200 font-medium">Export Results</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-green-500/30 text-green-300 hover:bg-green-500/20"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            JSON
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            CSV
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Detected Objects List */}
              {classificationResult && filteredObjects.length > 0 && (
                <Card className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-400" />
                    Detected Objects ({filteredObjects.length})
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredObjects.map((obj) => (
                      <motion.div
                        key={obj.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white text-sm">{obj.label}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: getCategoryColor(obj.category) }}
                              />
                              <span className="text-blue-300 text-sm capitalize">{obj.category}</span>
                              <span className="text-green-400 text-sm font-semibold">
                                {obj.confidence.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          {obj.price && (
                            <span className="text-green-400 font-semibold text-sm">{obj.price}</span>
                          )}
                        </div>

                        {obj.brand && (
                          <p className="text-blue-300 text-sm mb-2">Brand: {obj.brand}</p>
                        )}

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Find Similar
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Features Showcase */}
              {!classificationResult && (
                <Card className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 text-center">
                    Advanced AI Classification Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Cpu,
                        title: "Multi-Object Detection",
                        description: "Identify multiple products in single images"
                      },
                      {
                        icon: Zap,
                        title: "Real-time Processing",
                        description: "Get results in under 2 seconds"
                      },
                      {
                        icon: Shield,
                        title: "High Accuracy",
                        description: "Industry-leading 95%+ accuracy rate"
                      },
                      {
                        icon: Database,
                        title: "Product Catalog",
                        description: "Match with existing product database"
                      },
                      {
                        icon: BarChart3,
                        title: "Analytics",
                        description: "Detailed insights and metrics"
                      },
                      {
                        icon: Clock,
                        title: "Batch Processing",
                        description: "Process multiple images simultaneously"
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-4"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white mb-2 text-sm">{feature.title}</h4>
                        <p className="text-blue-200 text-xs">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}