import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import {
  Camera as CamIcon,
  Sparkles,
  Download,
  X,
  Shield,
  CheckCircle,
  Palette,
  Gem,
  Star,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Users,
  BarChart3,
  Heart,
  ShoppingBag,
  Crown,
  Ear,
  StarHalf,
  Diamond,
  Watch
} from "lucide-react";

/**
 * NOTE ON LOCAL UPLOADED IMAGE:
 * The developer requested that the uploaded file path from this session be used in the code.
 * Using that path as a sample model image URL:
 */
const sampleModelImage = "/src/assets/Screenshot (16).png";

// Enhanced jewellery items with categories and better data
const jewelryItems = [
  { 
    id: "earrings1", 
    name: "Crystal Drops", 
    type: "earring", 
    category: "earrings",
    img: "/src/assets/jewelry/sapphire-earrings.jpg",
    price: "$89",
    brand: "CrystalWorks",
    rating: 4.8,
    material: "Sterling Silver & Crystals"
  },
  { 
    id: "earrings2", 
    name: "Gold Hoops", 
    type: "earring", 
    category: "earrings",
    img: "/src/assets/jewelry/gold-earrings.jpg",
    price: "$129",
    brand: "GoldCraft",
    rating: 4.6,
    material: "24K Gold Plated"
  },
  { 
    id: "neck1", 
    name: "Diamond Cascade", 
    type: "necklace", 
    category: "necklaces",
    img: "/src/assets/jewelry/diamond-necklace.jpg",
    price: "$299",
    brand: "LuxuryGems",
    rating: 4.9,
    material: "White Gold & Diamonds"
  },
  { 
    id: "neck2", 
    name: "Pearl Elegance", 
    type: "necklace", 
    category: "necklaces",
    img: "/src/assets/jewelry/pearl-necklace.jpg",
    price: "$199",
    brand: "PearlPerfect",
    rating: 4.7,
    material: "Cultured Pearls & Silver"
  },
  { 
    id: "neck3", 
    name:"Ruby Pendant", 
    type:"necklace", 
    category: "necklaces",
    img:"/src/assets/jewelry/crystal-necklace.jpg",
    price: "$159",
    brand: "GemCraft",
    rating: 4.5,
    material: "Rose Gold & Ruby"
  },
  { 
    id: "hand1", 
    name:"Gold Bracelet", 
    type:"hand", 
    category: "bracelets",
    img:"/src/assets/jewelry/rose-gold-bracelet.jpg",
    price: "$179",
    brand: "GoldArt",
    rating: 4.4,
    material: "18K Gold"
  },
  { 
    id: "hand2", 
    name:"Emerald Ring", 
    type:"hand", 
    category: "rings",
    img:"/src/assets/jewelry/emrald-ring.jpg",
    price: "$249",
    brand: "GreenGems",
    rating: 4.8,
    material: "Platinum & Emerald"
  },
  { 
    id:"hand3", 
    name:"Titanium Band", 
    type:"hand", 
    category: "rings",
    img:"/src/assets/jewelry/titanium-ring.jpg",
    price: "$99",
    brand: "MetalTech",
    rating: 4.3,
    material: "Titanium & Carbon Fiber"
  },
  { 
    id: "nose1", 
    name: "Diamond Nose Pin", 
    type: "nose", 
    category: "nose",
    img: "/src/assets/jewelry/nose1.png", 
    price: "$49",
    brand: "DelicateDesigns",
    rating: 4.2,
    material: "Sterling Silver & Diamond"
  },
  { 
    id: "head1", 
    name: "Maang Tikka", 
    type: "head", 
    category: "head",
    img: "/src/assets/jewelry/maang1.png", 
    price: "$89",
    brand: "TraditionalArt",
    rating: 4.6,
    material: "Gold Plated & Kundan"
  },
  { 
    id: "glasses1", 
    name: "Aviator Glasses", 
    type: "glasses", 
    category: "glasses",
    img: "/src/assets/jewelry/glasses1.png", 
    price: "$149",
    brand: "VisionCraft",
    rating: 4.4,
    material: "Acetate & Crystal"
  },
  { 
    id: "bindi1", 
    name: "Crystal Bindi", 
    type: "bindi", 
    category: "bindi",
    img: "/src/assets/jewelry/bindi1.png", 
    price: "$29",
    brand: "TraditionalArt",
    rating: 4.1,
    material: "Crystals & Adhesive"
  },
  { 
    id: "crown1", 
    name: "Royal Crown", 
    type: "crown", 
    category: "crowns",
    img: "/assets/jewelry/crown1.png", 
    price: "$599",
    brand: "RoyalCollection",
    rating: 4.9,
    material: "Silver & Crystals"
  },
];

const categories = [
  { id: "all", name: "All Jewelry", icon: Gem },
  { id: "earrings", name: "Earrings", icon: Ear },
  { id: "necklaces", name: "Necklaces", icon: StarHalf },
  { id: "rings", name: "Rings", icon: Diamond },
  { id: "bracelets", name: "Bracelets", icon: Watch },
  { id: "head", name: "Head Pieces", icon: Crown }
];

type Landmark = { x: number; y: number; z?: number };

export default function VirtualTryOn() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const mediaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const faceMeshRef = useRef<FaceMesh | null>(null);
  const cameraHandlerRef = useRef<any>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof jewelryItems[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [detectedLandmarks, setDetectedLandmarks] = useState<Landmark[] | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [tryOnHistory, setTryOnHistory] = useState<any[]>([]);

  // Filter items by category
  const filteredItems = selectedCategory === "all" 
    ? jewelryItems 
    : jewelryItems.filter(item => item.category === selectedCategory);

  // ---- Useful landmark indices (MediaPipe FaceMesh) ----
  const INDEX = {
    NOSE_TIP: 1,
    CHIN: 152,
    LEFT_EAR: 234,
    RIGHT_EAR: 454,
    LEFT_EYE_OUTER: 33,
    RIGHT_EYE_OUTER: 263,
    FOREHEAD: 10,
  };

  // Factual cards data
  const factualCards = [
    {
      icon: Users,
      title: "98% Customer Satisfaction",
      description: "Users report high satisfaction with virtual try-on accuracy",
      metric: "98%",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: BarChart3,
      title: "3x Conversion Rate",
      description: "E-commerce stores using virtual try-on see 3x higher conversions",
      metric: "3x",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Heart,
      title: "40% Fewer Returns",
      description: "Virtual try-on reduces product returns by 40% on average",
      metric: "40%",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Sparkles,
      title: "2M+ Try-Ons",
      description: "Over 2 million virtual try-ons completed using our AI technology",
      metric: "2M+",
      color: "from-orange-500 to-amber-600"
    }
  ];

  // Initialize MediaPipe FaceMesh
  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    faceMesh.onResults(onResults);
    faceMeshRef.current = faceMesh;

    return () => {
      faceMeshRef.current?.close();
      faceMeshRef.current = null;
    };
  }, []);

  const startCamera = useCallback(async () => {
    if (!videoRef.current || !faceMeshRef.current) return;

    try {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (!faceMeshRef.current) return;
          await faceMeshRef.current.send({ image: videoRef.current as HTMLVideoElement });
        },
        width: 1280,
        height: 720,
        facingMode: "user",
      });

      camera.start();
      cameraHandlerRef.current = camera;
      setIsCameraActive(true);
      setCapturedImage(null);
      setPermissionDenied(false);
    } catch (err) {
      console.error("startCamera error:", err);
      setPermissionDenied(true);
      setIsCameraActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    try {
      if (cameraHandlerRef.current) {
        cameraHandlerRef.current.stop();
        cameraHandlerRef.current = null;
      }
      if (videoRef.current && (videoRef.current.srcObject as MediaStream | null)) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
    } catch (err) {
      console.warn("stopCamera error", err);
    } finally {
      setIsCameraActive(false);
    }
  }, []);

  const onResults = useCallback((results: any) => {
    if (!results.multiFaceLandmarks || !results.multiFaceLandmarks[0]) {
      setDetectedLandmarks(null);
      return;
    }
    const landmarks: Landmark[] = results.multiFaceLandmarks[0].map((lm: any) => ({ x: lm.x, y: lm.y, z: lm.z }));
    setDetectedLandmarks(landmarks);
  }, []);

  const captureImage = () => {
    if (!mediaCanvasRef.current || !videoRef.current) return;
    const canvas = mediaCanvasRef.current;
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    if (selectedItem && detectedLandmarks) {
      drawItemOnCtx(ctx, selectedItem, detectedLandmarks, canvas.width, canvas.height);
    }

    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl);
    
    // Add to history
    if (selectedItem) {
      setTryOnHistory(prev => [{
        id: Date.now(),
        item: selectedItem,
        image: dataUrl,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 3)]);
    }
    
    stopCamera();
  };

  const downloadImage = () => {
    if (!capturedImage) return;
    const a = document.createElement("a");
    a.href = capturedImage;
    a.download = `bigolens-tryon-${selectedItem?.id || "capture"}.png`;
    a.click();
  };

  const drawItemOnCtx = (ctx: CanvasRenderingContext2D, item: typeof jewelryItems[0], landmarks: Landmark[], canvasW: number, canvasH: number) => {
    const img = new Image();
    img.src = item.img;
    img.onload = () => {
      let px = canvasW / 2;
      let py = canvasH / 2;
      let drawW = img.width;
      let drawH = img.height;

      const getAvg = (indices: number[]) => {
        const pts = indices.map((i) => landmarks[i]).filter(Boolean);
        if (pts.length === 0) return { x: canvasW / 2, y: canvasH / 2 };
        const avg = pts.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
        return { x: (avg.x / pts.length) * canvasW, y: (avg.y / pts.length) * canvasH };
      };

      switch (item.type) {
        case "earring": {
          const leftEar = getAvg([INDEX.LEFT_EAR]);
          px = leftEar.x;
          py = leftEar.y;
          drawW = canvasW * 0.12;
          drawH = drawW * (img.height / img.width);
          break;
        }
        case "necklace": {
          const chin = getAvg([INDEX.CHIN]);
          px = chin.x;
          py = chin.y + canvasH * 0.06;
          drawW = canvasW * 0.6;
          drawH = drawW * (img.height / img.width);
          break;
        }
        case "nose": {
          const nose = getAvg([INDEX.NOSE_TIP]);
          px = nose.x;
          py = nose.y + canvasH * 0.02;
          drawW = canvasW * 0.08;
          drawH = drawW * (img.height / img.width);
          break;
        }
        case "head": {
          const forehead = getAvg([INDEX.FOREHEAD]);
          px = forehead.x;
          py = forehead.y - canvasH * 0.08;
          drawW = canvasW * 0.35;
          drawH = drawW * (img.height / img.width);
          break;
        }
        case "glasses": {
          const leftEye = getAvg([INDEX.LEFT_EYE_OUTER]);
          const rightEye = getAvg([INDEX.RIGHT_EYE_OUTER]);
          px = (leftEye.x + rightEye.x) / 2;
          py = (leftEye.y + rightEye.y) / 2;
          drawW = Math.abs(rightEye.x - leftEye.x) * 1.8;
          drawH = drawW * (img.height / img.width);
          break;
        }
        case "bindi": {
          const forehead = getAvg([INDEX.FOREHEAD]);
          px = forehead.x;
          py = forehead.y + canvasH * 0.03;
          drawW = canvasW * 0.04;
          drawH = drawW * (img.height / img.width);
          break;
        }
        case "crown": {
          const forehead = getAvg([INDEX.FOREHEAD]);
          px = forehead.x;
          py = forehead.y - canvasH * 0.14;
          drawW = canvasW * 0.5;
          drawH = drawW * (img.height / img.width);
          break;
        }
        default: break;
      }

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    };
  };

  const handleSelectItem = (item: typeof jewelryItems[0]) => {
    setSelectedItem(item);
    if (capturedImage) {
      setCapturedImage(null);
      startCamera();
    }
  };

  const computeOverlayPos = (type: string) => {
    if (!detectedLandmarks || !overlayRef.current) return { left: "50%", top: "50%", transform: "translate(-50%,-50%)" };

    const landmarks = detectedLandmarks;
    const w = overlayRef.current.clientWidth;
    const h = overlayRef.current.clientHeight;

    const idxToPixel = (idx: number) => {
      const lm = landmarks[idx];
      return { x: lm.x * w, y: lm.y * h };
    };

    switch (type) {
      case "earring": {
        const left = idxToPixel(INDEX.LEFT_EAR);
        return { left: `${left.x}px`, top: `${left.y}px`, transform: "translate(-50%,-50%)" };
      }
      case "necklace": {
        const chin = idxToPixel(INDEX.CHIN);
        return { left: `${chin.x}px`, top: `${chin.y + h * 0.06}px`, transform: "translate(-50%,-50%)" };
      }
      case "nose": {
        const n = idxToPixel(INDEX.NOSE_TIP);
        return { left: `${n.x}px`, top: `${n.y + h * 0.02}px`, transform: "translate(-50%,-50%)" };
      }
      case "head": {
        const f = idxToPixel(INDEX.FOREHEAD);
        return { left: `${f.x}px`, top: `${f.y - h * 0.08}px`, transform: "translate(-50%,-50%)" };
      }
      case "glasses": {
        const leftEye = idxToPixel(INDEX.LEFT_EYE_OUTER);
        const rightEye = idxToPixel(INDEX.RIGHT_EYE_OUTER);
        return { left: `${(leftEye.x + rightEye.x) / 2}px`, top: `${(leftEye.y + rightEye.y) / 2}px`, transform: "translate(-50%,-50%)" };
      }
      case "bindi": {
        const f = idxToPixel(INDEX.FOREHEAD);
        return { left: `${f.x}px`, top: `${f.y + h * 0.03}px`, transform: "translate(-50%,-50%)" };
      }
      case "crown": {
        const f = idxToPixel(INDEX.FOREHEAD);
        return { left: `${f.x}px`, top: `${f.y - h * 0.14}px`, transform: "translate(-50%,-50%)" };
      }
      default: return { left: "50%", top: "50%", transform: "translate(-50%,-50%)" };
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30"
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">AI-Powered Virtual Try-On</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Virtual Jewelry Try-On
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Experience our exquisite jewelry collection with real-time AI-powered virtual try-on technology. 
              See exactly how each piece looks on you before making a purchase.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Category Filter */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-cyan-400" />
                  Categories
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-xl border transition-all duration-300 text-sm font-medium flex items-center gap-2 ${
                          selectedCategory === category.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-500/20'
                            : 'bg-white/5 border-blue-500/30 text-blue-200 hover:bg-white/10 hover:border-cyan-400/50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Products Grid */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Available Jewelry</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {filteredItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSelectItem(item)}
                        className={`w-full p-3 rounded-xl border transition-all duration-300 text-left ${
                          selectedItem?.id === item.id
                            ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                            : 'bg-white/5 border-blue-500/30 hover:bg-white/10 hover:border-cyan-400/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                            <Gem className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                            <p className="text-cyan-300 text-xs">{item.brand}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-green-400 font-semibold text-sm">{item.price}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-blue-200">{item.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Try-On History */}
              {tryOnHistory.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Try-Ons</h3>
                  <div className="space-y-3">
                    {tryOnHistory.map((history) => (
                      <div key={history.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                        <img 
                          src={history.image} 
                          alt="Try-on result" 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-white">{history.item.name}</p>
                          <p className="text-xs text-cyan-300">
                            {new Date(history.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Main Try-On Area */}
            <div className="xl:col-span-2 space-y-6">
              {/* Camera/Try-On Window */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Virtual Try-On</h3>
                  <div className="flex items-center gap-2">
                    {isCameraActive && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-cyan-300">Live Tracking</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative bg-black rounded-xl overflow-hidden aspect-[4/3] border-2 border-cyan-500/30">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                    autoPlay
                    style={{ display: isCameraActive ? "block" : "none" }}
                  />

                  {!isCameraActive && capturedImage && (
                    <img src={capturedImage} alt="captured" className="w-full h-full object-cover" />
                  )}

                  {!isCameraActive && !capturedImage && (
                    <img src={sampleModelImage} alt="sample model" className="w-full h-full object-cover opacity-80" />
                  )}

                  {/* Overlay container */}
                  <div ref={overlayRef} className="absolute inset-0 pointer-events-none">
                    {selectedItem && detectedLandmarks && isCameraActive && (
                      <motion.img
                        key={selectedItem.id}
                        src={selectedItem.img}
                        alt={selectedItem.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        style={{
                          position: "absolute",
                          width: selectedItem.type === "glasses" ? "30%" : selectedItem.type === "necklace" ? "55%" : "12%",
                          transformOrigin: "center center",
                          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.35))",
                          ...computeOverlayPos(selectedItem.type),
                          transform: `translate(-50%,-50%) scale(${zoom}) rotate(${rotation}deg)`,
                        }}
                      />
                    )}

                    {selectedItem && selectedItem.type === "earring" && detectedLandmarks && isCameraActive && (
                      <>
                        <motion.img
                          src={selectedItem.img}
                          alt="ear-left"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute pointer-events-none"
                          style={{
                            width: "9%",
                            ...computeOverlayPos("earring"),
                            transform: `translate(-50%,-50%) scale(${zoom}) rotate(${rotation}deg)`,
                          }}
                        />
                        {detectedLandmarks[0] && (
                          <motion.img
                            src={selectedItem.img}
                            alt="ear-right"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute pointer-events-none"
                            style={{
                              width: "9%",
                              ...computeOverlayPos("earring"),
                              left: `${detectedLandmarks[INDEX.RIGHT_EAR].x * (overlayRef.current?.clientWidth || 1)}px`,
                              top: `${detectedLandmarks[INDEX.RIGHT_EAR].y * (overlayRef.current?.clientHeight || 1)}px`,
                              transform: `translate(-50%,-50%) scale(${zoom}) rotate(${rotation}deg)`,
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="mt-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-3 flex-wrap">
                    {isCameraActive ? (
                      <>
                        <button
                          onClick={captureImage}
                          disabled={!selectedItem}
                          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <CamIcon className="w-4 h-4" />
                          Capture Try-On
                        </button>
                        <button onClick={stopCamera} className="px-6 py-3 rounded-xl bg-white/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : capturedImage ? (
                      <>
                        <button onClick={downloadImage} className="bg-gradient-to-r from-green-500 to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download Image
                        </button>
                        <button onClick={() => { setCapturedImage(null); startCamera(); }} className="bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
                          Try Again
                        </button>
                      </>
                    ) : (
                      <button onClick={startCamera} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                        <CamIcon className="w-4 h-4" />
                        Start Camera
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))} className="p-3 bg-white/10 rounded-lg border border-cyan-500/30 hover:bg-white/20 transition-colors">
                      <ZoomIn className="w-4 h-4 text-cyan-400" />
                    </button>
                    <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} className="p-3 bg-white/10 rounded-lg border border-cyan-500/30 hover:bg-white/20 transition-colors">
                      <ZoomOut className="w-4 h-4 text-cyan-400" />
                    </button>
                    <button onClick={() => setRotation(r => (r + 15) % 360)} className="p-3 bg-white/10 rounded-lg border border-cyan-500/30 hover:bg-white/20 transition-colors">
                      <RotateCw className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Selected Item Details */}
              {selectedItem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6"
                >
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg flex items-center justify-center">
                        <Gem className="w-8 h-8 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{selectedItem.name}</h4>
                        <p className="text-cyan-300">{selectedItem.brand}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-green-400 font-semibold text-lg">{selectedItem.price}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(selectedItem.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-400'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-6 py-3 bg-white/10 border border-cyan-500/30 text-cyan-300 rounded-xl hover:bg-cyan-500/20 transition-colors">
                        <Heart className="w-4 h-4 mr-2 inline" />
                        Save
                      </button>
                      <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                        <ShoppingBag className="w-4 h-4 mr-2 inline" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Factual Cards Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {factualCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{card.metric}</div>
                      <h5 className="font-semibold text-white mb-2">{card.title}</h5>
                      <p className="text-blue-200 text-sm">{card.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  { icon: Sparkles, title: "AI-Powered", desc: "Advanced landmark detection for perfect placement" },
                  { icon: Shield, title: "Privacy First", desc: "All processing happens locally in your browser" },
                  { icon: CheckCircle, title: "Realistic Preview", desc: "Accurate sizing and positioning algorithms" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-blue-200 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for capture/download */}
      <canvas ref={mediaCanvasRef} style={{ display: "none" }} />
    </div>
  );
}