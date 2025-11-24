import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Sparkles, Shield, Users, Star, Zap, 
  Search, Cpu, Rocket, Play, Phone, Calendar,
  ChevronDown, ArrowUp, Brain, Eye, Tag, BarChart3,
  Palette, Video, Camera, Database, Cloud, Server,
  CheckCircle, TrendingUp, Target, Globe, Lock,
  Workflow, Code, Mail, Scale
} from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";

// Recharts imports for analytics - FIXED: Correct import names
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Asset imports - FIXED: Added proper type declarations and fallbacks
const aiDashboard = "/src/assets/ai-dashboard.png";
const enterpriseIntegration = "/src/assets/home1.png";
const apiArchitecture = "/src/assets/home2.png";

// Component imports
import KPICarousel from "@/components/KPICarousel";

// AI Services Data
const aiServices = [
  {
    icon: Search,
    name: "Product Discovery",
    description: "AI-powered visual search that understands context, style, and intent",
    features: ["Visual similarity matching", "Semantic search", "Multi-modal understanding"],
    useCase: "Reduce search abandonment by 68%",
    color: "from-blue-500 to-cyan-500",
    delay: 0
  },
  {
    icon: Palette,
    name: "Description Generation",
    description: "Automatically create compelling, SEO-optimized product descriptions",
    features: ["Natural language generation", "Brand voice consistency", "Multi-language support"],
    useCase: "Scale content creation 10x faster",
    color: "from-green-500 to-emerald-500",
    delay: 0.1
  },
  {
    icon: Tag,
    name: "Automatic Tagging",
    description: "Intelligent categorization and metadata generation for your entire catalog",
    features: ["Attribute extraction", "Category prediction", "Quality scoring"],
    useCase: "Process 10,000+ products in minutes",
    delay: 0.2
  },
  {
    icon: BarChart3,
    name: "Product Recommendation & Analytics",
    description: "Personalized recommendations with real-time performance analytics",
    features: ["Behavioral analysis", "A/B testing", "ROI tracking"],
    useCase: "Increase AOV by 45%",
    color: "from-purple-500 to-pink-500",
    delay: 0.3
  },
  {
    icon: Brain,
    name: "Hyper-Personalization",
    description: "Individualized shopping experiences powered by deep learning",
    features: ["Real-time adaptation", "Cross-channel consistency", "Predictive modeling"],
    useCase: "Boost conversion rates 7x",
    color: "from-orange-500 to-red-500",
    delay: 0.4
  },
  {
    icon: Video,
    name: "Image to Video Conversion",
    description: "Transform product images into engaging video content automatically",
    features: ["AI video generation", "Background removal", "Dynamic compositions"],
    useCase: "Create 100+ videos daily",
    color: "from-indigo-500 to-purple-500",
    delay: 0.5
  },
  {
    icon: Camera,
    name: "Virtual Try-On",
    description: "Augmented reality experiences for realistic product visualization",
    features: ["Real-time rendering", "Size accuracy", "Multi-product try-on"],
    useCase: "Reduce returns by 40%",
    color: "from-cyan-500 to-blue-500",
    delay: 0.6
  },
  {
    icon: Cpu,
    name: "Multi-Object Classification",
    description: "Advanced computer vision for complex scene understanding",
    features: ["Object detection", "Relationship mapping", "Context awareness"],
    useCase: "Process complex images with 99.2% accuracy",
    color: "from-violet-500 to-purple-500",
    delay: 0.7
  }
];

// Technical Capabilities
const technicalCapabilities = [
  {
    icon: Cloud,
    title: "Scalable Infrastructure",
    description: "Handle millions of requests with 99.9% uptime SLA",
    metrics: "10M+ daily API calls"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "SOC 2 Type II compliant with end-to-end encryption",
    metrics: "Zero data breaches"
  },
  {
    icon: Mail,
    title: "Seamless Integration",
    description: "RESTful APIs with comprehensive SDKs and documentation",
    metrics: "2-week average implementation"
  },
  {
    icon: Scale,
    title: "Global Performance",
    description: "Multi-region deployment with <100ms response times",
    metrics: "15 global edge locations"
  }
];

// Enterprise Features
const enterpriseFeatures = [
  {
    icon: Workflow,
    title: "Custom AI Models",
    description: "Tailored machine learning models trained on your specific data and business goals"
  },
  {
    icon: Play,
    title: "Comprehensive APIs",
    description: "RESTful APIs with real-time streaming, webhooks, and extensive documentation"
  },
  {
    icon: Database,
    title: "Data Pipeline Management",
    description: "End-to-end data processing with monitoring, logging, and analytics"
  },
  {
    icon: Server,
    title: "On-Premise Deployment",
    description: "Self-hosted solutions for maximum data control and compliance"
  }
];

// Case Study Metrics
const caseStudyMetrics = [
  { value: 45, suffix: "%", label: "Increase in Average Order Value" },
  { value: 7, suffix: "x", label: "Higher Conversion Rates" },
  { value: 68, suffix: "%", label: "Reduction in Search Abandonment" },
  { value: 40, suffix: "%", label: "Decrease in Product Returns" }
];

// Analytics Data
const performanceMetrics = [
  { metric: "Conversion Rate", value: "4.8", change: "+12%", trend: "up" as const },
  { metric: "Click-Through Rate", value: "18.2", change: "+5%", trend: "up" as const },
  { metric: "Avg Session Time", value: "3.2", change: "+8%", trend: "up" as const },
  { metric: "Bounce Rate", value: "32.1", change: "-15%", trend: "down" as const }
];

const conversionData = [
  { month: 'Jan', conv: 3.2, ctr: 12.1 },
  { month: 'Feb', conv: 3.8, ctr: 14.2 },
  { month: 'Mar', conv: 4.1, ctr: 15.8 },
  { month: 'Apr', conv: 4.5, ctr: 16.5 },
  { month: 'May', conv: 4.8, ctr: 18.2 },
  { month: 'Jun', conv: 5.2, ctr: 19.1 }
];

const coverageData = [
  { cohort: 'Q1', coverage: 45, aovLift: 12 },
  { cohort: 'Q2', coverage: 62, aovLift: 18 },
  { cohort: 'Q3', coverage: 78, aovLift: 25 },
  { cohort: 'Q4', coverage: 85, aovLift: 32 }
];

// ⌨️ Typewriter Component
const Typewriter = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// 🎨 Enhanced Spipa Circle 3D Background Component
const SpipaCircle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Enhanced Particle system with 3D effects
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      color: string;
      alpha: number;
      originalSize: number;

      constructor() {
        this.reset();
        this.originalSize = this.size;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 800 + 200; // Depth for 3D effect
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.speedZ = (Math.random() - 0.5) * 0.5;
        this.color = `hsl(${Math.random() * 60 + 200}, 80%, 65%)`;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.originalSize = this.size;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;

        // Mouse interaction with depth consideration
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          this.x += Math.cos(angle) * force * 3 * (this.z / 1000);
          this.y += Math.sin(angle) * force * 3 * (this.z / 1000);
        }

        // Size based on depth (3D perspective)
        this.size = this.originalSize * (800 / this.z);

        // Wrap around edges with depth consideration
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.y > canvas.height + 100) this.y = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.z > 1000 || this.z < 200) this.speedZ *= -1;
      }

      draw() {
        if (!ctx) return;
        
        // Calculate screen position with perspective
        const scale = 800 / this.z;
        const x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        
        ctx.save();
        ctx.globalAlpha = this.alpha * (800 / this.z);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Enhanced main circle with 3D rotation
    const mainCircle = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.min(canvas.width, canvas.height) * 0.15,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0
    };

    // Animation loop
    const animate = () => {
      // Clear with gradient for depth
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(10, 10, 25, 0.1)');
      gradient.addColorStop(1, 'rgba(5, 5, 15, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw main circle with 3D rotation
      mainCircle.rotationX += 0.001;
      mainCircle.rotationY += 0.002;
      mainCircle.rotationZ += 0.0005;
      
      // Draw main circle with 3D effect
      ctx.save();
      ctx.translate(mainCircle.x, mainCircle.y);
      ctx.rotate(mainCircle.rotationZ);
      
      // Outer glow
      const glow = ctx.createRadialGradient(0, 0, mainCircle.radius, 0, 0, mainCircle.radius * 1.5);
      glow.addColorStop(0, 'rgba(79, 209, 197, 0.4)');
      glow.addColorStop(1, 'rgba(79, 209, 197, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, mainCircle.radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Main circle
      ctx.strokeStyle = '#4fd1c5';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, mainCircle.radius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner rotating elements with 3D positioning
      for (let i = 0; i < 12; i++) {
        const angle = mainCircle.rotationZ + (i * Math.PI / 6);
        const radiusVariation = Math.sin(mainCircle.rotationX + i * 0.5) * 20;
        const x = Math.cos(angle) * (mainCircle.radius * 0.7 + radiusVariation);
        const y = Math.sin(angle) * (mainCircle.radius * 0.7 + radiusVariation);
        const z = Math.cos(mainCircle.rotationY + i) * 50;
        
        const size = 6 + Math.sin(mainCircle.rotationX + i) * 2;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(1, 1 + z * 0.01); // Simple perspective
        ctx.fillStyle = `rgba(79, 209, 197, ${0.8 + Math.sin(mainCircle.rotationY + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles with depth consideration
      ctx.strokeStyle = 'rgba(79, 209, 197, 0.15)';
      ctx.lineWidth = 0.8;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          // Calculate screen positions
          const scale1 = 800 / p1.z;
          const x1 = (p1.x - canvas.width / 2) * scale1 + canvas.width / 2;
          const y1 = (p1.y - canvas.height / 2) * scale1 + canvas.height / 2;
          
          const scale2 = 800 / p2.z;
          const x2 = (p2.x - canvas.width / 2) * scale2 + canvas.width / 2;
          const y2 = (p2.y - canvas.height / 2) * scale2 + canvas.height / 2;
          
          const dx = x1 - x2;
          const dy = y1 - y2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect particles that are close in screen space
          if (distance < 120) {
            const alpha = 0.15 * (1 - distance / 120) * Math.min(800 / p1.z, 800 / p2.z);
            ctx.strokeStyle = `rgba(79, 209, 197, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="spipa-circle-container">
      <canvas
        ref={canvasRef}
        className="spipa-circle-canvas"
      />
    </div>
  );
};

// 🔁 Enhanced Fade-in animation
const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.8, 
            ease: "easeOut",
            delay: delay 
          } 
        },
        hidden: { opacity: 0, y: 60 },
      }}
    >
      {children}
    </motion.div>
  );
};

// 🎯 Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center z-50 border-2 border-white/20"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// 📈 Analytics KPI Component
const AnalyticsKPI = ({ title, value, hint, change, trend }: { 
  title: string; 
  value: string; 
  hint?: string;
  change?: string;
  trend?: "up" | "down";
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45 }}
    className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
  >
    <div className="flex items-center justify-between">
      <h4 className="text-sm text-blue-200">{title}</h4>
      {change && (
        <div className={`text-xs px-2 py-1 rounded-full ${
          trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
        }`}>
          {change}
        </div>
      )}
    </div>
    <div className="text-2xl font-extrabold text-white mt-2">{value}</div>
    {hint && <div className="text-xs text-blue-300 mt-2">{hint}</div>}
  </motion.div>
);

// 🎨 Bento Grid Analytics Section
const AnalyticsBentoGrid = () => {
  const [showMetric, setShowMetric] = useState<"conv" | "ctr">("conv");

  return (
    <section className="py-12 bg-gradient-to-br from-slate-900/80 to-blue-900/80 relative overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-grid-cyan-500/[0.02] bg-[size:60px_60px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">Live Analytics</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              Data-Driven Insights
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-xl">
              Real-time analytics and performance metrics that drive your visual commerce strategy
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {performanceMetrics.map((metric, index) => (
            <FadeInWhenVisible key={metric.metric} delay={index * 0.1}>
              <AnalyticsKPI
                title={metric.metric}
                value={metric.value + (metric.metric.includes("Time") ? "s" : "%")}
                change={metric.change}
                trend={metric.trend}
                hint="Last 30 days"
              />
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Conversion Trend Chart */}
          <FadeInWhenVisible>
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Conversion & CTR Trends</h3>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setShowMetric("conv")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      showMetric === "conv" 
                        ? "bg-cyan-500 text-white" 
                        : "bg-white/10 text-blue-200 hover:bg-white/20"
                    }`}
                  >
                    Conversion
                  </button>
                  <button
                    onClick={() => setShowMetric("ctr")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      showMetric === "ctr" 
                        ? "bg-cyan-500 text-white" 
                        : "bg-white/10 text-blue-200 hover:bg-white/20"
                    }`}
                  >
                    CTR
                  </button>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="rgba(255,255,255,0.6)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.6)"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(12px)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={showMetric === "conv" ? "conv" : "ctr"}
                      stroke="#22d3ee"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#22d3ee" }}
                      activeDot={{ r: 6, fill: "#0ea5e9" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </FadeInWhenVisible>

          {/* Coverage vs AOV Chart */}
          <FadeInWhenVisible delay={0.1}>
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Coverage vs AOV Lift</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coverageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="cohort" 
                      stroke="rgba(255,255,255,0.6)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.6)"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(12px)'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="coverage" 
                      name="Coverage (%)" 
                      fill="#0ea5e9" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="aovLift" 
                      name="AOV Lift (%)" 
                      fill="#1d4ed8" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

// 🛠️ AI Services Grid Component
const AIServicesGrid = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">AI-Powered Solutions</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              Enterprise-Grade AI Services
            </h2>
            <p className="text-blue-100 max-w-3xl mx-auto text-xl">
              Advanced artificial intelligence solutions designed specifically for ecommerce scale and performance
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeInWhenVisible key={service.name} delay={service.delay}>
                <motion.div
                  className="group bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105"
                  whileHover={{ y: -8 }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${service.color || 'from-cyan-500 to-blue-500'} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{service.name}</h3>
                  <p className="text-blue-200 text-sm mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-cyan-300">
                        <CheckCircle className="w-4 h-4" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                    <p className="text-cyan-300 text-sm font-semibold">{service.useCase}</p>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 💻 Technical Capabilities Section
const TechnicalCapabilities = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <FadeInWhenVisible>
              <div className="inline-flex items-center gap-3 bg-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-400/30">
                <Server className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-100">Enterprise Infrastructure</span>
              </div>
              <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 leading-tight">
                Built for Scale & Security
              </h2>
              <p className="text-blue-100 text-xl leading-relaxed">
                Robust technical foundation designed to handle enterprise workloads with military-grade security and global performance.
              </p>
            </FadeInWhenVisible>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {technicalCapabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <FadeInWhenVisible key={capability.title} delay={index * 0.1}>
                    <motion.div
                      className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Icon className="w-8 h-8 text-purple-400 mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">{capability.title}</h3>
                      <p className="text-blue-200 text-sm mb-3">{capability.description}</p>
                      <div className="text-purple-300 text-sm font-semibold">{capability.metrics}</div>
                    </motion.div>
                  </FadeInWhenVisible>
                );
              })}
            </div>
          </div>

          {/* Right Side - Architecture Image */}
          <FadeInWhenVisible delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 transform hover:scale-105 transition-all duration-500">
                <img 
                  src={apiArchitecture} 
                  alt="BigOLens API Architecture" 
                  className="w-full h-auto rounded-xl shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

// 🏢 Enterprise Features Section
const EnterpriseFeatures = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
              <Scale className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">For Large Enterprises</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              Enterprise-Ready Features
            </h2>
            <p className="text-blue-100 max-w-3xl mx-auto text-xl">
              Comprehensive solutions designed for Fortune 500 companies and high-growth ecommerce platforms
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {enterpriseFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeInWhenVisible key={feature.title} delay={index * 0.1}>
                <motion.div
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-blue-200 text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            );
          })}
        </div>

        {/* Integration Demo */}
        <FadeInWhenVisible delay={0.3}>
          <div className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Seamless Integration</h3>
                <p className="text-blue-200 text-lg mb-6">
                  Integrate with your existing tech stack in weeks, not months. Our comprehensive APIs and SDKs make implementation straightforward.
                </p>
                <div className="space-y-3">
                  {['RESTful APIs', 'Webhook Support', 'Real-time Streaming', 'Comprehensive Documentation'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-cyan-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src={enterpriseIntegration} 
                  alt="Enterprise Integration" 
                  className="w-full h-auto rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

// 📈 Results & Case Studies Section
const ResultsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-blue-400/30">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-100">Proven Results</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Measurable Business Impact
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-xl">
              See how leading ecommerce companies achieve significant ROI with our AI solutions
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {caseStudyMetrics.map((metric, index) => (
            <FadeInWhenVisible key={metric.label} delay={index * 0.1}>
              <motion.div
                className="text-center p-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl font-bold text-white mb-2">
                  <CountUp end={metric.value} duration={2.5} suffix={metric.suffix} />
                </div>
                <div className="text-blue-200 text-lg">{metric.label}</div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Case Study Highlights */}
        <FadeInWhenVisible delay={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                company: "Global Fashion Retailer",
                result: "45% AOV Increase",
                description: "Implemented visual search and personalized recommendations across 50+ countries"
              },
              {
                company: "Home Goods Marketplace",
                result: "7x Conversion Boost",
                description: "Deployed AI-powered product tagging and discovery for 2M+ SKUs"
              },
              {
                company: "Electronics E-commerce",
                result: "40% Fewer Returns",
                description: "Integrated virtual try-on and size recommendation technology"
              }
            ].map((caseStudy, index) => (
              <motion.div
                key={caseStudy.company}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-purple-400 text-sm font-semibold mb-2">{caseStudy.company}</div>
                <div className="text-2xl font-bold text-white mb-3">{caseStudy.result}</div>
                <div className="text-blue-200">{caseStudy.description}</div>
              </motion.div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

// 🚀 CTA Section
const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInWhenVisible>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <Rocket className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">Start Your AI Journey</span>
            </div>
            
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              Ready to Transform Your E-commerce?
            </h2>
            
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Join 500+ leading companies using BigOLens AI to drive growth, reduce costs, and create exceptional customer experiences.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/demo">
                <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-2xl transition-all duration-300 group">
                  <Zap className="mr-3 w-6 h-6" />
                  Request Technical Demo
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button size="lg" variant="outline" className="px-12 py-6 text-lg border-2 border-cyan-400/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-white rounded-2xl transition-all duration-300">
                  <Calendar className="mr-3 w-6 h-6" />
                  Speak with Sales
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.4}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "2-4", label: "Weeks to Implement" },
                { value: "99.9%", label: "Uptime SLA" },
                { value: "24/7", label: "Enterprise Support" },
                { value: "SOC 2", label: "Compliant" }
              ].map((stat, index) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* 🧠 HERO SECTION WITH ADJUSTED GAPS */}
<section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Spipa Circle Background */}
  <div className="absolute inset-0">
    <SpipaCircle />
  </div>
  
  {/* Dark overlay for better text readability */}
  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>

  <div className="container mx-auto px-6 text-center relative z-10">
    {/* Increased gap from top to security badge */}
    <div className="pt-16">
    
    {/* Trust Badge */}
    <motion.div  
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-cyan-500/30 group z-[9999]"
    >
      <Shield className="w-5 h-5 text-cyan-400" />
      <span className="text-sm font-medium text-cyan-100"> Lead the Future of E-Commerce, Now! </span>
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>

      {/* HOVER BOX WITH IMAGE + JUSTIFIED TEXT */}
      <div
        className="
          invisible opacity-0 group-hover:visible group-hover:opacity-100 
          transition-all duration-300 
          absolute left-1/2 top-full -translate-x-1/2 mt-3 
          w-[350px] md:w-[420px]
          bg-black text-white text-sm 
          p-4 rounded-xl shadow-2xl 
          z-[999999]
        "
      >
        {/* QUOTE */}
        <p className="text-justify leading-relaxed mb-4">
          "With bigOlens' advanced AI suite for Product Discovery, Automated Descriptions, Smart Tagging,
          Personalization, Virtual Try-On, and Intelligent Recommendations for ecommerce brands now automate
          previously manual workflows with greater speed, accuracy, and scalability."
        </p>

        {/* IMAGE + NAME SIDE BY SIDE */}
        <div className="flex items-center gap-3 mt-3">
          <img 
            src="/src/assets/founder.jpg" 
            alt="Dr. Aashi Singh Bhadouria" 
            className="w-14 h-14 object-cover rounded-full border border-cyan-400 shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          
          <div className="flex flex-col justify-center">
            <p className="font-semibold leading-tight">
              Dr. Aashi Singh Bhadouria
            </p>
            <span className="text-cyan-400 text-xs">Founder & CEO — bigOlens Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Main Heading */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 drop-shadow-2xl">
          Visual Search 2.0
        </span>
      </motion.h1>
      <motion.h3
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 drop-shadow-2xl mt-4">
          Reinventing Commerce that Transforms Shopping Experiences
        </span>
      </motion.h3>
    </motion.div>

    {/* Typewriter Subtitle */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="text-2xl md:text-3xl lg:text-4xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed font-light"
    >
      <Typewriter text="Powered by Advanced AI" delay={100} />
    </motion.div>

    {/* Updated Social Proof - Side by Side Layout */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex items-center justify-center gap-5 mb-12"
    >
      {/* Trust Statement */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="text-blue-100 text-lg font-medium"
      >
        Trusted by 45+ public companies to bootstrap founders, since 2016
      </motion.div>

      {/* Vertical Divider */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.8 }}
        className="w-px h-12 bg-cyan-500/30"
      />

      {/* Star Rating */}
      <motion.div 
        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-cyan-500/30"
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
          ))}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white">4.9/5</span>
          <span className="text-cyan-300 text-sm">(2.1k reviews)</span>
        </div>
      </motion.div>
    </motion.div>

    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex justify-center gap-6 flex-wrap"
    >
      <Link to="/classify">
        <Button size="lg" className="text-lg px-12 py-6 shadow-2xl group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/25 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
          <Zap className="mr-2 w-2 h-2" />
          Try Live Demo
          <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
        </Button>
      </Link>
      <Link to="/contact">
        <Button size="lg" variant="outline" className="text-lg px-12 py-6 border-2 border-cyan-400/50 bg-cyan-500/10 backdrop-blur-sm group hover:bg-cyan-500/20 rounded-2xl transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -skew-x-12 animate-shine"></div>
          <Users className="mr-2 w-2 h-2" />
          Book Strategy Call
          <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
        </Button>
      </Link>
    </motion.div>

    {/* Reduced gap between buttons and Trusted by industry leaders */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0 }}
      className="mt-8"
    >
      <div className="text-center mb-6">
        <div className="text-blue-200 text-lg font-medium mb-2">
          Trusted by industry leaders worldwide..
        </div>
      </div>
      
      {/* Logo Scroller Container - Clean logos without backgrounds */}
      <div className="relative overflow-hidden py-2">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10" />
        
        {/* First Marquee - Clean logos without backgrounds */}
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear"
            }
          }}
        >
          {Array.from({ length: 27 }, (_, i) => i + 1).map((number) => (
            <div
              key={`logo-${number}-1`}
              className="flex-shrink-0 transition-all duration-300 hover:scale-110"
            >
              <div className="w-32 h-16 flex items-center justify-center">
                <img 
                  src={`/src/assets/CompanyLogo/cp${number}.png`}
                  alt={`Client ${number}`}
                  className="h-12 w-auto max-w-[120px] object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Show fallback text
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'text-white text-sm font-semibold px-3 py-2 rounded';
                      fallback.textContent = `Client ${number}`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second Marquee (Reverse) - Clean logos without backgrounds */}
      <div className="relative overflow-hidden py-2">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10" />
        
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [-1000, 0] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear"
            }
          }}
        >
          {Array.from({ length: 27 }, (_, i) => i + 1).map((number) => (
            <div
              key={`logo-${number}-2`}
              className="flex-shrink-0 transition-all duration-300 hover:scale-110"
            >
              <div className="w-32 h-16 flex items-center justify-center">
                <img 
                  src={`/src/assets/CompanyLogo/cp${number}.png`}
                  alt={`Client ${number}`}
                  className="h-12 w-auto max-w-[120px] object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Show fallback text
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'text-white text-sm font-semibold px-3 py-2 rounded';
                      fallback.textContent = `Partner ${number}`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
    
    </div>
  </div>
  
  {/* Enhanced Floating 3D Elements */}
  <motion.div
    className="absolute bottom-20 left-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
  <motion.div
    className="absolute top-32 right-20 w-20 h-20 bg-blue-500/30 rounded-full blur-xl"
    animate={{
      y: [0, 30, 0],
      rotate: [0, -180, -360],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }}
  />
  <motion.div
    className="absolute bottom-40 right-32 w-16 h-16 bg-cyan-500/25 rounded-full blur-lg"
    animate={{
      y: [0, -15, 0],
      x: [0, 10, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    }}
  />
</section>

      {/* 🎯 ENHANCED KPI CAROUSEL SECTION */}
      <section id="results" className="py-16 bg-gradient-to-br from-slate-900/80 via-blue-900/40 to-cyan-900/40 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-cyan-500/[0.02] bg-[size:60px_60px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-100">Proven Performance</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                Results That Speak Volumes
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto text-xl">
                Discover how our AI-powered solutions drive measurable business impact across industries
              </p>
            </div>
          </FadeInWhenVisible>

          <KPICarousel />
        </div>
      </section>

      {/* 📊 ANALYTICS BENTO GRID SECTION */}
      <AnalyticsBentoGrid />

      {/* 🛠️ AI SERVICES GRID */}
      <AIServicesGrid />

      {/* 💻 TECHNICAL CAPABILITIES */}
      <TechnicalCapabilities />

      {/* 🏢 ENTERPRISE FEATURES */}
      <EnterpriseFeatures />

      {/* 📈 RESULTS & CASE STUDIES */}
      <ResultsSection />

      {/* 🚀 CTA SECTION */}
      <CTASection />

      {/* 🆙 BACK TO TOP BUTTON */}
      <BackToTop />

      <Footer />
    </div>
  );
};

export default HomePage;