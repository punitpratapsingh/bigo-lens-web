import { useState, useEffect, useRef } from "react";
import React from 'react';
import Marquee from 'react-fast-marquee';

import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform,
  useSpring
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

// Import all required icons
import { 
  ArrowRight, Zap, Users, Rocket, Cpu, Eye,
  Search, FileText, Tag, ShoppingBag, Smartphone, 
  Video, Camera, Grid3X3, Brain, Palette, Filter,
  ChevronDown, Sparkles, BarChart, Target, Shield,
  TrendingUp, Layers, MessageSquare, CheckCircle, 
  Cloud, Database, Globe2, Star, Award, BarChart2,
  Puzzle, Code, Server, ArrowUpRight, ExternalLink,
  Clock, ShieldCheck, LineChart, 
  Scan, Package, ShoppingCart, TrendingDown, UsersRound,
  Globe, Settings, Headphones, Bot, CircuitBoard,
  CloudLightning, Play, Lock, Download, Upload,
  MousePointerClick, EyeOff, DatabaseZap, Cctv,
  ScanFace, QrCode, ScanLine, Binary, Braces,
  Terminal, Hash, Percent, Infinity as InfinityIcon,
  Maximize2, ZoomIn, Crop, Contrast, Monitor,
  Tablet, Laptop, Gamepad2, Keyboard, HardDrive,
  Wifi, Signal, Battery, Power, Share2, Key,
  BotMessageSquare, MemoryStick, FolderOpen, Calendar,
  Bell, Plus, Minus, Divide, Asterisk, AtSign,
  Mail, Phone, Mic, Headphones as Headset, Radio,
  Bluetooth, Thermometer, MapPin, Navigation, Home,
  Store, Truck, Car, Bike, Train, Plane,
  Satellite, Radar, Cpu as AIIcon, Code2, Command,
  Braces as CodeBraces, Brackets, Hash as HashIcon,
  Percent as PercentIcon2, Infinity as InfinityIcon2
} from "lucide-react";

// Import components
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

// 🖼️ Asset imports
import heroVideo from "@/assets/heroo.mp4";
import aiPlatform from "@/assets/ai-platform.png";
import neuralNetwork from "@/assets/neural-network.png";

// Import solutions images
import s1 from "@/assets/solutions/s1.png";
import s2 from "@/assets/solutions/s2.png";
import s3 from "@/assets/solutions/s3.png";
import s4 from "@/assets/solutions/s4.png";
import s5 from "@/assets/solutions/s5.png";
import s6 from "@/assets/solutions/s6.png";
import s7 from "@/assets/solutions/s7.png";
import s8 from "@/assets/solutions/s8.png";

// Import integration logos
import shopifyLogo from "@/assets/logo/Shopify-Logo.wine.png";
import woocommerceLogo from "@/assets/logo/WooCommerce.png";
import magentoLogo from "@/assets/logo/magento.png";
import salesforceLogo from "@/assets/logo/Salesforce.com_logo.svg.png";
import bigcommerceLogo from "@/assets/logo/bigcommerce.png";
import awsLogo from "@/assets/logo/Amazon_Web_Services-Logo.wine.png";
import gcpLogo from "@/assets/logo/gcp.png";
import azureLogo from "@/assets/logo/microsoft-azure.png";

// Import additional tech logos
import adobeLogo from "@/assets/logo/Adobe-logo.png";
import hubspotLogo from "@/assets/logo/hubspot.png";
import mailchimpLogo from "@/assets/logo/Mailchimp-Symbol.jpg";
import klaviyoLogo from "@/assets/logo/klaviyo.jpg";

// Import all company logos (cp1.png to cp27.png)
import cp1 from "@/assets/CompanyLogo/cp1.png";
import cp2 from "@/assets/CompanyLogo/cp2.png";
import cp3 from "@/assets/CompanyLogo/cp3.png";
import cp4 from "@/assets/CompanyLogo/cp4.png";
import cp5 from "@/assets/CompanyLogo/cp5.png";
import cp6 from "@/assets/CompanyLogo/cp6.png";
import cp7 from "@/assets/CompanyLogo/cp7.png";
import cp8 from "@/assets/CompanyLogo/cp8.png";
import cp9 from "@/assets/CompanyLogo/cp9.png";
import cp10 from "@/assets/CompanyLogo/cp10.png";
import cp11 from "@/assets/CompanyLogo/cp11.png";
import cp12 from "@/assets/CompanyLogo/cp12.png";
import cp13 from "@/assets/CompanyLogo/cp13.png";
import cp14 from "@/assets/CompanyLogo/cp14.png";
import cp15 from "@/assets/CompanyLogo/cp15.png";
import cp16 from "@/assets/CompanyLogo/cp16.png";
import cp17 from "@/assets/CompanyLogo/cp17.png";
import cp18 from "@/assets/CompanyLogo/cp18.png";
import cp19 from "@/assets/CompanyLogo/cp19.png";
import cp20 from "@/assets/CompanyLogo/cp20.png";
import cp21 from "@/assets/CompanyLogo/cp21.png";
import cp22 from "@/assets/CompanyLogo/cp22.png";
import cp23 from "@/assets/CompanyLogo/cp23.png";
import cp24 from "@/assets/CompanyLogo/cp24.png";
import cp25 from "@/assets/CompanyLogo/cp25.png";
import cp26 from "@/assets/CompanyLogo/cp26.png";
import cp27 from "@/assets/CompanyLogo/cp27.png";

// 🔁 Animation Components
const FadeInWhenVisible = ({ children, delay = 0, threshold = 0.1 }: { 
  children: React.ReactNode; 
  delay?: number;
  threshold?: number;
}) => {
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const ParticleBackground = () => {
  const particles = Array.from({ length: 30 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-cyan-400/20 rounded-full"
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
          }}
          animate={{
            x: [null, Math.random() * 100 + 'vw'],
            y: [null, Math.random() * 100 + 'vh'],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
};

// Array of all company logos for CompanyLogoMarquee
const companyLogosData = [
  { src: cp1, name: "Company 1", alt: "Client 1" },
  { src: cp2, name: "Company 2", alt: "Client 2" },
  { src: cp3, name: "Company 3", alt: "Client 3" },
  { src: cp4, name: "Company 4", alt: "Client 4" },
  { src: cp5, name: "Company 5", alt: "Client 5" },
  { src: cp6, name: "Company 6", alt: "Client 6" },
  { src: cp7, name: "Company 7", alt: "Client 7" },
  { src: cp8, name: "Company 8", alt: "Client 8" },
  { src: cp9, name: "Company 9", alt: "Client 9" },
  { src: cp10, name: "Company 10", alt: "Client 10" },
  { src: cp11, name: "Company 11", alt: "Client 11" },
  { src: cp12, name: "Company 12", alt: "Client 12" },
  { src: cp13, name: "Company 13", alt: "Client 13" },
  { src: cp14, name: "Company 14", alt: "Client 14" },
  { src: cp15, name: "Company 15", alt: "Client 15" },
  { src: cp16, name: "Company 16", alt: "Client 16" },
  { src: cp17, name: "Company 17", alt: "Client 17" },
  { src: cp18, name: "Company 18", alt: "Client 18" },
  { src: cp19, name: "Company 19", alt: "Client 19" },
  { src: cp20, name: "Company 20", alt: "Client 20" },
  { src: cp21, name: "Company 21", alt: "Client 21" },
  { src: cp22, name: "Company 22", alt: "Client 22" },
  { src: cp23, name: "Company 23", alt: "Client 23" },
  { src: cp24, name: "Company 24", alt: "Client 24" },
  { src: cp25, name: "Company 25", alt: "Client 25" },
  { src: cp26, name: "Company 26", alt: "Client 26" },
  { src: cp27, name: "Company 27", alt: "Client 27" }
];

const CompanyLogoMarquee = () => {
  // Generate array of 27 logos
  const logoNumbers = Array.from({ length: 27 }, (_, i) => i + 1);

  return (
    <div className="relative overflow-hidden py-4">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
      
      {/* Single Marquee Component */}
      <Marquee
        speed={50}
        gradient={false}
        pauseOnHover={true}
        direction="left"
        className="overflow-hidden"
      >
        {logoNumbers.map((number) => {
          const logoUrl = `/src/assets/CompanyLogo/cp${number}.png`;
          
          return (
            <div
              key={`logo-${number}`}
              className="flex-shrink-0 transition-all duration-300 hover:scale-110 mx-4"
            >
              <div className="w-32 h-16 flex items-center justify-center relative group">
                <img 
                  src={logoUrl}
                  alt={`Client ${number}`}
                  className="h-12 w-auto max-w-[120px] object-contain group-hover:brightness-110 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Show fallback text
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'text-white text-sm font-semibold px-3 py-2 rounded bg-slate-800/50';
                      fallback.textContent = `Client ${number}`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

const PlatformJourney = () => {
  const steps = [
    { icon: Search, label: "Visual Search", color: "from-blue-500 to-cyan-500", desc: "AI-powered image recognition" },
    { icon: FileText, label: "Content AI", color: "from-purple-500 to-pink-500", desc: "Automated descriptions" },
    { icon: Tag, label: "Smart Tagging", color: "from-green-500 to-emerald-500", desc: "Metadata generation" },
    { icon: Brain, label: "Personalization", color: "from-orange-500 to-red-500", desc: "Behavioral AI" },
    { icon: Camera, label: "Virtual Try-On", color: "from-yellow-500 to-amber-500", desc: "AR visualization" },
    { icon: BarChart2, label: "Analytics", color: "from-violet-500 to-purple-500", desc: "Real-time insights" }
  ];

  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
      <div className="container mx-auto px-6 relative">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              360° Product Intelligence Platform
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A complete journey from discovery to conversion, powered by unified AI
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="relative">
          {/* Journey Line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-blue-500/0 transform -translate-y-1/2 hidden lg:block">
            <motion.div
              className="absolute top-1/2 left-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-lg shadow-cyan-500/50"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Journey Steps */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 relative">
            {steps.map((step, index) => (
              <FadeInWhenVisible key={step.label} delay={index * 0.1}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-slate-900/80 backdrop-blur-lg border border-white/10 rounded-3xl p-6 text-center group-hover:border-cyan-500/40 transition-all duration-300">
                    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{step.label}</h3>
                    <p className="text-blue-200 text-sm mb-4">{step.desc}</p>
                    
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-cyan-400 mx-auto animate-pulse" />
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyBigOLens = () => {
  const [activeTab, setActiveTab] = useState("discovery");
  const [stats, setStats] = useState({
    searches: 0,
    conversions: 0,
    revenue: 0,
    accuracy: 0,
  });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Animated statistics
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        searches: Math.min(prev.searches + 127, 1250000),
        conversions: Math.min(prev.conversions + 43, 450000),
        revenue: Math.min(prev.revenue + 382, 3800000),
        accuracy: Math.min(prev.accuracy + 0.1, 99.7),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Solutions with detailed information
  const solutions = [
    {
      id: "discovery",
      title: "Product Discovery AI",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent",
      image: s1,
      description: "Advanced multi-modal search that understands images, text, and context",
      detailedDescription: "Our Product Discovery AI combines computer vision, natural language processing, and behavioral analytics to understand exactly what shoppers are looking for. It learns from every interaction, continuously improving its understanding of visual patterns, semantic relationships, and user preferences across millions of products.",
      features: [
        {
          title: "Visual Search",
          description: "Upload or capture images to find visually similar products",
          icon: Camera,
          details: ["Pattern recognition", "Color palette matching", "Style detection", "Brand identification"]
        },
        {
          title: "Semantic Search",
          description: "Understand natural language queries with contextual intelligence",
          icon: MessageSquare,
          details: ["Intent classification", "Query expansion", "Multilingual support", "Context awareness"]
        },
        {
          title: "Multi-modal Search",
          description: "Combine visual, textual, and behavioral signals",
          icon: Layers,
          details: ["Cross-modal embedding", "Unified representation", "Behavioral integration", "Real-time ranking"]
        },
        {
          title: "Similarity Matching",
          description: "Advanced pattern and style recognition",
          icon: Filter,
          details: ["Deep metric learning", "Style transfer", "Trend detection", "Complementary suggestions"]
        }
      ],
      metrics: [
        { value: "95%", label: "Accuracy Rate" },
        { value: "< 200ms", label: "Response Time" },
        { value: "10M+", label: "Products Indexed" }
      ],
      technicalSpecs: {
        "Models": "10+ specialized AI",
        "Training Data": "500M+ examples",
        "Processing": "Real-time",
        "Scalability": "Billions of SKUs"
      }
    },
    {
      id: "description",
      title: "Description Generation",
      icon: FileText,
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent",
      image: s2,
      description: "AI-powered content creation that produces SEO-optimized product descriptions",
      detailedDescription: "Our Description Generation engine combines advanced language models with domain-specific training on millions of product descriptions. The system understands brand voice guidelines, SEO requirements, and target audience preferences to generate compelling, conversion-optimized content that maintains consistency across your entire catalog.",
      features: [
        {
          title: "SEO Optimization",
          description: "AI-generated content that ranks high in search results",
          icon: Globe,
          details: ["Keyword optimization", "Semantic SEO", "Meta generation", "Content structuring"]
        },
        {
          title: "Brand Consistency",
          description: "Maintain consistent brand voice across all content",
          icon: Palette,
          details: ["Voice profiling", "Style adherence", "Tone adjustment", "Quality control"]
        },
        {
          title: "Multi-language",
          description: "Generate descriptions in 50+ languages",
          icon: Globe2,
          details: ["Native translations", "Cultural adaptation", "Local SEO", "Format optimization"]
        },
        {
          title: "Batch Processing",
          description: "Scale content creation for entire catalogs",
          icon: Database,
          details: ["Mass generation", "Quality scoring", "Version control", "Auto-publishing"]
        }
      ],
      metrics: [
        { value: "40%", label: "More Traffic" },
        { value: "1000/hour", label: "Generation Speed" },
        { value: "50+", label: "Languages" }
      ],
      technicalSpecs: {
        "AI Models": "Fine-tuned GPT",
        "Languages": "50+ supported",
        "Speed": "1000 descriptions/hour",
        "Customization": "Full brand control"
      }
    },
    {
      id: "tagging",
      title: "Automatic Tagging",
      icon: Tag,
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent",
      image: s3,
      description: "Intelligent categorization and metadata generation for your catalog",
      detailedDescription: "Our Automatic Tagging system uses computer vision and natural language processing to analyze products and generate rich, accurate metadata. It automatically detects attributes, categorizes products, and creates searchable tags that improve discoverability and organization across your entire inventory.",
      features: [
        {
          title: "Attribute Extraction",
          description: "Auto-detect colors, materials, styles, and features",
          icon: Sparkles,
          details: ["Visual analysis", "Text extraction", "Feature detection", "Quality validation"]
        },
        {
          title: "Category Prediction",
          description: "Intelligent product categorization and classification",
          icon: Target,
          details: ["Hierarchical classification", "Multi-label tagging", "Confidence scoring", "Auto-correction"]
        },
        {
          title: "Metadata Generation",
          description: "Create rich, searchable product metadata",
          icon: Database,
          details: ["Structured data", "SEO metadata", "Search optimization", "API readiness"]
        },
        {
          title: "Batch Processing",
          description: "Process entire catalogs in minutes",
          icon: Package,
          details: ["Parallel processing", "Progress tracking", "Error handling", "Results export"]
        }
      ],
      metrics: [
        { value: "95%", label: "Tagging Accuracy" },
        { value: "200+", label: "Hours Saved/Month" },
        { value: "100K/hour", label: "Processing Speed" }
      ],
      technicalSpecs: {
        "Accuracy": "95-98%",
        "Speed": "100K products/hour",
        "Attributes": "500+ detected",
        "Categories": "Unlimited hierarchy"
      }
    },
    {
      id: "recommendation",
      title: "Recommendation Engine",
      icon: ShoppingBag,
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent",
      image: s4,
      description: "Personalized product recommendations with real-time analytics",
      detailedDescription: "Our Recommendation Engine uses collaborative filtering, content-based filtering, and deep learning to deliver highly personalized product suggestions. It analyzes user behavior, purchase history, and product relationships in real-time to increase conversion rates, average order value, and customer satisfaction.",
      features: [
        {
          title: "Behavioral Recommendations",
          description: "Personalized suggestions based on user behavior",
          icon: Brain,
          details: ["Clickstream analysis", "Purchase patterns", "Session tracking", "Intent prediction"]
        },
        {
          title: "Real-time Analytics",
          description: "Live performance tracking and optimization",
          icon: BarChart2,
          details: ["Performance dashboards", "Conversion tracking", "ROI measurement", "Trend analysis"]
        },
        {
          title: "A/B Testing",
          description: "Test and optimize recommendation strategies",
          icon: TrendingUp,
          details: ["Strategy testing", "Performance comparison", "Auto-optimization", "Result reporting"]
        },
        {
          title: "Cross-sell/Up-sell",
          description: "Intelligent product pairing and bundling",
          icon: Clock,
          details: ["Complementary items", "Bundle suggestions", "Price optimization", "Inventory awareness"]
        }
      ],
      metrics: [
        { value: "35%", label: "Higher Conversion" },
        { value: "45%", label: "Increased AOV" },
        { value: "Real-time", label: "Updates" }
      ],
      technicalSpecs: {
        "Algorithms": "10+ ML models",
        "Latency": "< 50ms",
        "Personalization": "Individual level",
        "Testing": "Multi-variant"
      }
    },
    {
      id: "personalization",
      title: "Hyper-Personalization",
      icon: Smartphone,
      color: "from-indigo-500 to-violet-500",
      gradient: "bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent",
      image: s5,
      description: "Individualized shopping experiences powered by deep learning",
      detailedDescription: "Our Hyper-Personalization engine creates unique shopping experiences for each customer by analyzing their behavior, preferences, and context in real-time. It dynamically adjusts content, recommendations, and interfaces to maximize engagement, conversion, and customer lifetime value.",
      features: [
        {
          title: "Predictive Modeling",
          description: "Anticipate customer needs and preferences",
          icon: Brain,
          details: ["Purchase prediction", "Churn prevention", "Lifetime value", "Next-best action"]
        },
        {
          title: "Dynamic Content",
          description: "Real-time personalized experiences",
          icon: Zap,
          details: ["Content adaptation", "Layout personalization", "Message targeting", "Offer optimization"]
        },
        {
          title: "User Intent Clustering",
          description: "Segment users by behavior and intent",
          icon: UsersRound,
          details: ["Behavioral segmentation", "Intent classification", "Journey mapping", "Segment targeting"]
        },
        {
          title: "Cross-channel Consistency",
          description: "Unified personalization across all touchpoints",
          icon: Globe,
          details: ["Omnichannel sync", "Profile unification", "Journey continuity", "Device adaptation"]
        }
      ],
      metrics: [
        { value: "60%", label: "Higher Engagement" },
        { value: "3x", label: "Return Visits" },
        { value: "Real-time", label: "Adaptation" }
      ],
      technicalSpecs: {
        "Processing": "Real-time",
        "Models": "Deep learning",
        "Channels": "Omnichannel",
        "Segments": "Dynamic creation"
      }
    },
    {
      id: "video",
      title: "Image-to-Video Conversion",
      icon: Video,
      color: "from-yellow-500 to-amber-500",
      gradient: "bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-transparent",
      image: s6,
      description: "Transform static product images into engaging video content",
      detailedDescription: "Our Image-to-Video Conversion system uses AI to automatically create professional-quality product videos from static images. It adds motion, effects, and context to showcase products in dynamic, engaging ways that capture attention and drive conversions.",
      features: [
        {
          title: "AI Video Generation",
          description: "Transform images into dynamic product videos",
          icon: Video,
          details: ["Motion effects", "Scene creation", "Transitions", "Animation"]
        },
        {
          title: "Background Enhancement",
          description: "Professional background removal and replacement",
          icon: Filter,
          details: ["Auto removal", "Background generation", "Scene optimization", "Quality enhancement"]
        },
        {
          title: "Dynamic Scenes",
          description: "Create engaging product showcases",
          icon: Sparkles,
          details: ["Scene composition", "Product highlighting", "Context addition", "Style application"]
        },
        {
          title: "Template Library",
          description: "Pre-designed video templates and styles",
          icon: Package,
          details: ["Template customization", "Style adaptation", "Brand integration", "Quick editing"]
        }
      ],
      metrics: [
        { value: "5x", label: "More Engagement" },
        { value: "70%", label: "Faster Production" },
        { value: "Professional", label: "Quality" }
      ],
      technicalSpecs: {
        "Generation": "AI-powered",
        "Speed": "Minutes/video",
        "Quality": "4K ready",
        "Formats": "Multiple outputs"
      }
    },
    {
      id: "virtual-tryon",
      title: "Virtual Try-On",
      icon: Camera,
      color: "from-emerald-500 to-green-500",
      gradient: "bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-transparent",
      image: s7,
      description: "Augmented reality experiences for realistic product visualization",
      detailedDescription: "Our Virtual Try-On technology uses advanced computer vision and AR to let customers visualize products on themselves in real-time. It provides accurate fitting, realistic rendering, and interactive experiences that build confidence and reduce returns.",
      features: [
        {
          title: "Real-time Fitting",
          description: "Instant visualization on body or face",
          icon: Smartphone,
          details: ["Body scanning", "Size matching", "Real-time rendering", "Pose adaptation"]
        },
        {
          title: "3D Mesh Mapping",
          description: "Accurate size and fit prediction",
          icon: Grid3X3,
          details: ["3D modeling", "Mesh generation", "Fit simulation", "Accuracy validation"]
        },
        {
          title: "Return Reduction",
          description: "Reduce returns with accurate visualization",
          icon: TrendingDown,
          details: ["Fit confidence", "Size guidance", "Visual accuracy", "Customer education"]
        },
        {
          title: "Multi-product Try-On",
          description: "Visualize multiple products together",
          icon: Scan,
          details: ["Combination viewing", "Style matching", "Outfit creation", "Accessory pairing"]
        }
      ],
      metrics: [
        { value: "40%", label: "Fewer Returns" },
        { value: "2.5x", label: "Conversion Lift" },
        { value: "Accurate", label: "Sizing" }
      ],
      technicalSpecs: {
        "Rendering": "Real-time AR",
        "Accuracy": "98% sizing",
        "Platforms": "Web & mobile",
        "Integration": "Seamless"
      }
    },
    {
      id: "classification",
      title: "Multi-Object Classification",
      icon: Grid3X3,
      color: "from-violet-500 to-purple-500",
      gradient: "bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent",
      image: s8,
      description: "Advanced computer vision for complex scene understanding",
      detailedDescription: "Our Multi-Object Classification system can identify and categorize multiple products within complex scenes. It understands relationships between objects, extracts contextual information, and generates rich metadata for enhanced search and discovery capabilities.",
      features: [
        {
          title: "Object Detection",
          description: "Identify multiple products in complex scenes",
          icon: Eye,
          details: ["Multi-object recognition", "Boundary detection", "Object counting", "Relationship mapping"]
        },
        {
          title: "Scene Understanding",
          description: "Context-aware product recognition",
          icon: Layers,
          details: ["Context analysis", "Scene interpretation", "Environment awareness", "Spatial understanding"]
        },
        {
          title: "Contextual Metadata",
          description: "Generate rich tags based on environment",
          icon: Database,
          details: ["Context tagging", "Relationship metadata", "Scene description", "Search optimization"]
        },
        {
          title: "Complex Analysis",
          description: "Advanced analysis of product relationships",
          icon: CircuitBoard,
          details: ["Relationship analysis", "Pattern recognition", "Trend detection", "Insight generation"]
        }
      ],
      metrics: [
        { value: "98%", label: "Accuracy Rate" },
        { value: "1000+", label: "Images/Minute" },
        { value: "Real-time", label: "Processing" }
      ],
      technicalSpecs: {
        "Detection": "Multi-object",
        "Speed": "Real-time",
        "Accuracy": "98%+",
        "Complexity": "High scenes"
      }
    }
  ];

  // Integration data
  const integrations = [
    { name: "Shopify", logo: shopifyLogo, description: "One-click install", type: "ecommerce" },
    { name: "WooCommerce", logo: woocommerceLogo, description: "WordPress plugin", type: "ecommerce" },
    { name: "Magento", logo: magentoLogo, description: "Enterprise extension", type: "ecommerce" },
    { name: "Salesforce Commerce", logo: salesforceLogo, description: "Native integration", type: "ecommerce" },
    { name: "BigCommerce", logo: bigcommerceLogo, description: "Headless ready", type: "ecommerce" },
    { name: "Custom APIs", logo: Code, description: "Full API access", type: "api" },
    { name: "Adobe Experience", logo: adobeLogo, description: "Marketing cloud", type: "marketing" },
    { name: "HubSpot", logo: hubspotLogo, description: "CRM integration", type: "marketing" },
    { name: "Mailchimp", logo: mailchimpLogo, description: "Email marketing", type: "marketing" },
    { name: "Klaviyo", logo: klaviyoLogo, description: "SMS & email", type: "marketing" }
  ];

  const cloudProviders = [
    { name: "AWS", logo: awsLogo, description: "Advanced Partner", features: ["SageMaker", "Rekognition", "Bedrock"] },
    { name: "Google Cloud", logo: gcpLogo, description: "AI Platform", features: ["Vertex AI", "Vision AI", "AutoML"] },
    { name: "Microsoft Azure", logo: azureLogo, description: "Cloud Solutions", features: ["Azure ML", "Cognitive", "OpenAI"] }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden" ref={containerRef}>
      <Navigation />

      {/* Hero Section - Fixed 650px Height */}
      <section className="relative h-[650px] overflow-hidden">
        <ParticleBackground />
        
        {/* Animated Gradient Orbs - Adjusted for 650px height */}
        <div className="absolute top-12 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Video Background - Fits in 650px container */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/40 to-slate-950/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/25 to-purple-900/25"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/15 via-transparent to-blue-500/15"></div>
          
          {/* Watermark cover */}
          <div className="absolute top-0 left-0 w-80 h-44 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-transparent"></div>
        </div>

        {/* Hero Content - Adjusted for 650px height */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              {/* Badge - Shifted lower and left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-8 ml-16 mt-11"
              >
                <Rocket className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-white">Enterprise AI Platform</span>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Transform Commerce
                </span>
                <span className="block text-white text-4xl md:text-5xl lg:text-6xl">
                  with AI Intelligence
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl leading-relaxed"
              >
                Enterprise-grade AI solutions for visual search, content automation, 
                and personalized shopping experiences that drive revenue and growth.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
              >
                {[
                  { value: `${stats.searches.toLocaleString()}+`, label: "AI Searches/Day", icon: Search },
                  { value: `${stats.conversions.toLocaleString()}+`, label: "Monthly Conversions", icon: TrendingUp },
                  { value: `$${stats.revenue.toLocaleString()}`, label: "Revenue Generated", icon: Clock },
                  { value: `${stats.accuracy.toFixed(1)}%`, label: "Accuracy Rate", icon: Target }
                ].map((stat, index) => (
                  <div key={index} className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <stat.icon className="w-5 h-5 text-cyan-400" />
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                    </div>
                    <div className="text-sm text-blue-300">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-6 items-center mb-8"
              >
                <Link to="/contact">
                  <Button size="lg" className="px-10 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl text-lg font-semibold">
                    <Users className="mr-3 w-5 h-5" />
                    Book a Demo
                  </Button>
                </Link>
                <Link to="/classify">
                  <Button size="lg" variant="outline" className="px-10 py-6 border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white rounded-xl text-lg">
                    <Zap className="mr-3 w-5 h-5" />
                    Try AI Tools Free
                  </Button>
                </Link>
              </motion.div>

              {/* Trusted By */}
             
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <ChevronDown className="w-7 h-7 text-white/50" />
            <div className="text-xs text-white/30 tracking-wider mt-1">EXPLORE</div>
          </div>
        </motion.div>
      </section>

      {/* Company Logo Marquee Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="text-center mb-10">
              <p className="text-blue-300 text-sm uppercase tracking-wider mb-2">Trusted by Industry Leaders</p>
              <h3 className="text-2xl font-bold text-white">500+ Companies Worldwide</h3>
            </div>
          </FadeInWhenVisible>
          <CompanyLogoMarquee />
        </div>
      </section>

      {/* Platform Journey */}
      <PlatformJourney />

      {/* Complete AI Services Suite */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-cyan-500/30">
                <Cpu className="w-6 h-6 text-cyan-400" />
                <span className="text-lg font-semibold text-cyan-100">Complete AI Services Suite</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                Eight Powerful AI Modules
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Working in harmony to deliver unprecedented e-commerce capabilities
              </p>
            </div>
          </FadeInWhenVisible>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-12 bg-slate-800/50 p-2 rounded-2xl">
              {solutions.map((solution) => (
                <TabsTrigger
                  key={solution.id}
                  value={solution.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white/10 data-[state=active]:to-white/5 data-[state=active]:border data-[state=active]:border-white/20 rounded-xl transition-all duration-300"
                >
                  <solution.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{solution.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {solutions.map((solution) => (
                <TabsContent key={solution.id} value={solution.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-12"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                      {/* Left Column - Content */}
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${solution.color} flex items-center justify-center shadow-lg`}>
                            <solution.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-white">{solution.title}</h3>
                            <p className="text-blue-200">{solution.description}</p>
                          </div>
                        </div>

                        <p className="text-lg text-blue-100 leading-relaxed">
                          {solution.detailedDescription}
                        </p>

                        <div className="space-y-6">
                          <h4 className="text-xl font-bold text-white">Key Features</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {solution.features.map((feature, idx) => (
                              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-3">
                                  <feature.icon className="w-5 h-5 text-cyan-400" />
                                  <h5 className="font-semibold text-white">{feature.title}</h5>
                                </div>
                                <p className="text-blue-200 text-sm mb-3">{feature.description}</p>
                                <ul className="space-y-1">
                                  {feature.details.map((detail, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-blue-300">
                                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {solution.metrics.map((metric, idx) => (
                            <div key={idx} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                              <div className="text-2xl font-bold text-cyan-400 mb-1">{metric.value}</div>
                              <div className="text-sm text-blue-300">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Image & Tech Specs */}
                      <div className="space-y-8">
                        <FadeInWhenVisible delay={0.2}>
                          <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50"></div>
                            <img 
                              src={solution.image} 
                              alt={solution.title}
                              className="relative rounded-2xl shadow-2xl w-full border border-white/20"
                            />
                          </div>
                        </FadeInWhenVisible>

                        <div className={`p-6 rounded-2xl border border-white/10 ${solution.gradient}`}>
                          <h4 className="text-xl font-bold text-white mb-4">Technical Specifications</h4>
                          <div className="space-y-3">
                            {Object.entries(solution.technicalSpecs).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-blue-300">{key}</span>
                                <span className="text-white font-semibold">{value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Link to="/contact">
                            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Get Started
                            </Button>
                          </Link>
                          <Button variant="outline" className="border-cyan-500/50 text-cyan-400">
                            <Play className="w-4 h-4 mr-2" />
                            Watch Demo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>

          {/* All Solutions Grid */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-32">
              <h3 className="text-3xl font-bold text-white mb-12 text-center">Explore All Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                    onClick={() => setActiveTab(solution.id)}
                  >
                    <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group-hover:border-cyan-500/40 transition-all duration-300 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <solution.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-3">{solution.title}</h4>
                      <p className="text-blue-200 text-sm mb-4">{solution.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-cyan-400 text-sm">Learn More</span>
                        <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Enterprise Platform Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-cyan-500/[0.02] bg-[size:60px_60px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-blue-500/30">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
                <span className="text-lg font-semibold text-blue-100">Enterprise Platform</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Built for Scale & Performance
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Trusted by Fortune 500 companies with the highest standards for reliability and security
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Military-grade security with full compliance",
                features: ["SOC 2 Type II", "GDPR & CCPA", "PCI DSS", "End-to-end Encryption"],
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "High Performance",
                description: "Lightning-fast AI processing at scale",
                features: ["< 100ms Response", "Auto-scaling", "Global CDN", "Real-time Processing"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Database,
                title: "Massive Scale",
                description: "Handle billions of products seamlessly",
                features: ["Petabyte Storage", "Distributed AI", "Horizontal Scaling", "Data Sharding"],
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <FadeInWhenVisible key={feature.title} delay={index * 0.2}>
                <Card className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:border-cyan-500/40 transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-blue-200 mb-6">{feature.description}</p>
                  
                  <div className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-blue-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Performance Metrics */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-20 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Proven Performance Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Uptime SLA", value: "99.99%", icon: ShieldCheck },
                      { label: "API Response Time", value: "< 50ms", icon: Zap },
                      { label: "Data Processing", value: "Petabytes/day", icon: Database },
                      { label: "Customer Support", value: "< 15min", icon: Headphones }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-3">
                          <metric.icon className="w-5 h-5 text-cyan-400" />
                          <span className="text-white">{metric.label}</span>
                        </div>
                        <span className="text-cyan-400 font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-cyan-400 mb-4">7x</div>
                  <div className="text-xl text-white mb-2">Average ROI</div>
                  <div className="text-blue-300">For enterprise customers</div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-32 bg-slate-900/70 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-cyan-500/30">
                <Puzzle className="w-6 h-6 text-cyan-400" />
                <span className="text-lg font-semibold text-cyan-100">Integration Ecosystem</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                Seamless Integration
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Connect with your entire tech stack in minutes, not months
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="space-y-16">
            {/* Integration Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "E-commerce Platforms",
                  icon: ShoppingCart,
                  description: "Native integrations with all major platforms",
                  integrations: integrations.filter(i => i.type === "ecommerce")
                },
                {
                  title: "Marketing Tools",
                  icon: BarChart2,
                  description: "Connect with your marketing stack",
                  integrations: integrations.filter(i => i.type === "marketing")
                },
                {
                  title: "APIs & Development",
                  icon: Code,
                  description: "Full API access and SDKs",
                  integrations: integrations.filter(i => i.type === "api")
                }
              ].map((category, index) => (
                <FadeInWhenVisible key={category.title} delay={index * 0.1}>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        <p className="text-blue-200 text-sm">{category.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {category.integrations.map((integration, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                          {typeof integration.logo === 'string' ? (
                            <img src={integration.logo} alt={integration.name} className="w-6 h-6" />
                          ) : (
                            <integration.logo className="w-6 h-6 text-cyan-400" />
                          )}
                          <div>
                            <div className="text-white font-medium">{integration.name}</div>
                            <div className="text-blue-300 text-sm">{integration.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>

            {/* Cloud Providers */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Cloud Infrastructure Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {cloudProviders.map((cloud, index) => (
                  <FadeInWhenVisible key={cloud.name} delay={index * 0.2}>
                    <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-blue-500/40 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center p-4">
                          <img src={cloud.logo} alt={cloud.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{cloud.name}</h4>
                          <p className="text-blue-200 text-sm">{cloud.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-blue-300 mb-2">Integrated Services:</div>
                        <div className="flex flex-wrap gap-2">
                          {cloud.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/30">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </FadeInWhenVisible>
                ))}
              </div>
            </div>

            {/* API Section */}
            <FadeInWhenVisible delay={0.3}>
              <div className="p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <Code className="w-10 h-10 text-cyan-400" />
                      <div>
                        <h3 className="text-2xl font-bold text-white">API-First Architecture</h3>
                        <p className="text-blue-200">Build custom integrations with our comprehensive API</p>
                      </div>
                    </div>
                    <div className="space-y-4 mb-6">
                      {[
                        "RESTful APIs with OpenAPI 3.0",
                        "SDKs for JavaScript, Python, Java, .NET",
                        "Webhook support for real-time updates",
                        "GraphQL endpoint for flexible queries",
                        "Comprehensive documentation",
                        "24/7 developer support"
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-cyan-400" />
                          <span className="text-blue-100">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Explore API Documentation
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50"></div>
                    <div className="relative bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <div className="font-mono text-sm">
                        <div className="text-cyan-400">// Example API Integration</div>
                        <div className="text-blue-300 mt-4">
                          <div>const bigolens = new BigOLensAPI({`{`}</div>
                          <div className="ml-4">apiKey: 'your-api-key',</div>
                          <div className="ml-4">environment: 'production'</div>
                          <div>{`});`}</div>
                          <div className="mt-4">// Visual search example</div>
                          <div>const results = await bigolens.visualSearch({`{`}</div>
                          <div className="ml-4">image: uploadedImage,</div>
                          <div className="ml-4">limit: 10,</div>
                          <div className="ml-4">filters: {`{`} category: 'fashion' {`}`}</div>
                          <div>{`});`}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-900/50 via-slate-900 to-purple-900/50">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <FadeInWhenVisible>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-white/20">
              <Award className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-semibold text-white">Start Your AI Journey Today</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join leading retailers using BigOLens to drive innovation, increase revenue, 
              and deliver exceptional customer experiences powered by AI.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Link to="/contact">
                <Button size="lg" className="px-14 py-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-2xl text-lg font-semibold group">
                  <Users className="mr-3 w-6 h-6" />
                  Schedule Enterprise Demo
                </Button>
              </Link>
              <Link to="/classify">
                <Button size="lg" variant="outline" className="px-14 py-8 border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white rounded-2xl text-lg font-semibold">
                  <Zap className="mr-3 w-6 h-6" />
                  Try AI Tools Free
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">14-Day Free Trial</h4>
                <p className="text-sm text-blue-300">No credit card required</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Enterprise Security</h4>
                <p className="text-sm text-blue-300">SOC 2, GDPR & PCI DSS</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">24/7 Support</h4>
                <p className="text-sm text-blue-300">Dedicated account managers</p>
              </div>
            </div>

            <p className="mt-12 text-blue-300 text-sm">
              Join 500+ enterprise customers • Average ROI: 7x • Implementation: 2-4 weeks
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyBigOLens;