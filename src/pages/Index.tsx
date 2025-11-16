import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Sparkles, BarChart3, 
  Shield, Users, Star, Zap, TrendingUp, Search, Cpu, Rocket,
  ChevronLeft, ChevronRight, Play, Pause, Mail, Phone, Calendar,
  ChevronDown, HelpCircle, ArrowUp, Facebook, Twitter, Instagram, 
  Linkedin, Youtube, PieChart, LineChart, BarChart
} from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBar,
  Bar,
  Legend,
  PieChart as RechartsPie,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

// 🖼️ Asset imports
import featureShowcase from "@/assets/1 (17).png";

// Carousel Images
import carouselImg1 from "@/assets/img1.png";
import carouselImg2 from "@/assets/img2.png";
import carouselImg3 from "@/assets/img3.png";
import carouselImg4 from "@/assets/img4.png";
import carouselImg5 from "@/assets/img5.png";

// 📊 Analytics Data
const conversionData = [
  { month: "Jan", conv: 1.8, ctr: 3.2 },
  { month: "Feb", conv: 2.0, ctr: 3.6 },
  { month: "Mar", conv: 2.6, ctr: 4.1 },
  { month: "Apr", conv: 3.2, ctr: 4.8 },
  { month: "May", conv: 3.8, ctr: 5.2 },
  { month: "Jun", conv: 4.4, ctr: 5.9 },
  { month: "Jul", conv: 4.9, ctr: 6.3 },
  { month: "Aug", conv: 5.1, ctr: 6.5 },
  { month: "Sep", conv: 5.4, ctr: 6.9 },
  { month: "Oct", conv: 5.7, ctr: 7.2 },
];

const coverageData = [
  { cohort: "Top 10%", coverage: 92, aovLift: 18 },
  { cohort: "Top 20%", coverage: 85, aovLift: 14 },
  { cohort: "Long-tail", coverage: 42, aovLift: 6 },
];

const strategySplit = [
  { name: "Similar Items", value: 45, color: "#22d3ee" },
  { name: "Personalized Picks", value: 30, color: "#0ea5e9" },
  { name: "Shop the Look", value: 15, color: "#1d4ed8" },
  { name: "Trending / Merch", value: 10, color: "#0369a1" },
];

const performanceMetrics = [
  { metric: "Visual Match Accuracy", value: 99.2, change: "+2.1%", trend: "up" },
  { metric: "Recommendation CTR", value: 7.2, change: "+15%", trend: "up" },
  { metric: "AOV Lift", value: 18.5, change: "+3.2%", trend: "up" },
  { metric: "Search-to-Purchase Time", value: 32, change: "-12%", trend: "down" },
];

const userEngagementData = [
  { day: "Mon", engagement: 45, sessions: 1200 },
  { day: "Tue", engagement: 52, sessions: 1400 },
  { day: "Wed", engagement: 48, sessions: 1300 },
  { day: "Thu", engagement: 61, sessions: 1600 },
  { day: "Fri", engagement: 58, sessions: 1550 },
  { day: "Sat", engagement: 72, sessions: 2100 },
  { day: "Sun", engagement: 68, sessions: 1900 },
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
    <section className="py-20 bg-gradient-to-br from-slate-900/80 to-blue-900/80 relative overflow-hidden backdrop-blur-sm">
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
                  <RechartsLine data={conversionData}>
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
                  </RechartsLine>
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
                  <RechartsBar data={coverageData}>
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
                  </RechartsBar>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </FadeInWhenVisible>
        </div>

        {/* Bottom Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Strategy Split Pie Chart */}
          <FadeInWhenVisible delay={0.2}>
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">Strategy Mix</h3>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={strategySplit}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {strategySplit.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(12px)'
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </FadeInWhenVisible>

          {/* User Engagement Area Chart */}
          <FadeInWhenVisible delay={0.3}>
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">User Engagement</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="day" 
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
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stroke="#22d3ee"
                      fill="url(#engagementGradient)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </FadeInWhenVisible>

          {/* Quick Insights */}
          <FadeInWhenVisible delay={0.4}>
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Smart Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <div className="text-sm font-medium text-cyan-200 mb-2">📈 Performance Tip</div>
                  <div className="text-xs text-blue-200">
                    Personalization increases CTR — prioritize returning users for personalized picks
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-sm font-medium text-blue-200 mb-2">🎯 Quick Win</div>
                  <div className="text-xs text-blue-200">
                    Enable "Similar items" on PDP & search results for immediate impact
                  </div>
                </div>
                <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <div className="text-sm font-medium text-indigo-200 mb-2">💡 Strategy</div>
                  <div className="text-xs text-blue-200">
                    Visual similarity drives discoverability for new SKUs — use on social & search
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

// ❓ Enhanced FAQ Section with Accordions
const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "How accurate is your visual search technology?",
      answer: "Our AI achieves 99.2% accuracy in product recognition and similarity matching, powered by advanced deep learning models trained on millions of product images."
    },
    {
      question: "What e-commerce platforms do you integrate with?",
      answer: "We seamlessly integrate with Shopify, WooCommerce, Magento, BigCommerce, and custom platforms through our comprehensive API."
    },
    {
      question: "How long does implementation take?",
      answer: "Most clients are up and running within 2-4 weeks, depending on catalog size and customization requirements."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 premium support, dedicated account management, and comprehensive documentation for all our clients."
    },
    {
      question: "Is my data secure with your platform?",
      answer: "Yes, we employ enterprise-grade security including SOC 2 compliance, end-to-end encryption, and regular security audits."
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-cyan-900/80 relative overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-grid-cyan-500/[0.02] bg-[size:60px_60px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">FAQ</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              Frequently Asked Questions
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-xl">
              Everything you need to know about our AI-powered visual commerce platform
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <motion.div
                className="mb-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between group"
                >
                  <h3 className="text-xl font-semibold text-white pr-4">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/30"
                  >
                    <ChevronDown className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <p className="text-blue-200 text-lg leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

// 📧 Enhanced Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 relative overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInWhenVisible>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">Stay Updated</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              Join Our AI Revolution
            </h2>
            
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Get the latest insights on visual commerce, AI trends, and exclusive platform updates delivered to your inbox.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              whileInView={{ y: 0, opacity: 1 }}
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                  required
                  disabled={isSubmitting || isSubmitted}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                  />
                ) : isSubmitted ? (
                  "Subscribed! 🎉"
                ) : (
                  "Subscribe Now"
                )}
              </motion.button>
            </motion.form>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.4}>
            <p className="text-blue-300 text-sm mt-4">
              Join 15,000+ e-commerce professionals. No spam, unsubscribe anytime.
            </p>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

// 🎠 Enhanced KPI Carousel Component
const KPICarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const kpiData = [
    {
      value: 45,
      suffix: "%",
      label: "Uplift in Avg. Order Value",
      description: "Customers discover more relevant products through visual search leading to higher value purchases",
      image: carouselImg1,
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
      delay: 0
    },
    {
      value: 7,
      suffix: "x",
      label: "Higher Conversion Rate",
      description: "Visual recommendations drive immediate purchase decisions and reduce cart abandonment",
      image: carouselImg2,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      delay: 1
    },
    {
      value: 92,
      suffix: "%",
      label: "Visual Match Accuracy",
      description: "Industry-leading AI precision for product recognition and similarity matching",
      image: carouselImg3,
      color: "from-cyan-400 to-blue-600",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
      delay: 2
    },
    {
      value: 3.2,
      suffix: "x",
      label: "Faster Discovery",
      description: "Reduce search time with instant visual results and intelligent recommendations",
      image: carouselImg4,
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-400/20",
      delay: 3
    },
    {
      value: 68,
      suffix: "%",
      label: "Customer Engagement",
      description: "Increase in time spent exploring visual recommendations and personalized content",
      image: carouselImg5,
      color: "from-cyan-500 to-blue-400",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-blue-400/20",
      delay: 4
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % kpiData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, kpiData.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % kpiData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + kpiData.length) % kpiData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Carousel Display */}
      <div className="relative h-96 mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.2, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 ${kpiData[currentIndex].bgColor} backdrop-blur-md rounded-3xl border border-white/10 p-8 flex flex-col lg:flex-row items-center justify-between overflow-hidden`}
          >
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
              >
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Proven Result</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="text-7xl lg:text-8xl font-bold text-white">
                  <CountUp 
                    end={kpiData[currentIndex].value} 
                    duration={2.5} 
                    suffix={kpiData[currentIndex].suffix}
                  />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  {kpiData[currentIndex].label}
                </h3>
                <p className="text-blue-100 text-lg max-w-md">
                  {kpiData[currentIndex].description}
                </p>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={kpiData[currentIndex].image} 
                alt={kpiData[currentIndex].label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group z-20"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group z-20"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center items-center gap-3 mb-8">
        {kpiData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-cyan-400 w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Mini KPIs Grid with Images */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 overflow-hidden group ${
              index === currentIndex
                ? 'bg-white/20 border-cyan-400/50 shadow-lg shadow-cyan-400/20'
                : 'bg-white/10 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={kpi.image} 
                  alt={kpi.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-lg font-bold text-white">
                {kpi.value}{kpi.suffix}
              </div>
              <div className="text-xs text-blue-200 leading-tight">
                {kpi.label.split(' ').slice(0, 2).join(' ')}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// 📞 Enhanced Reach Us Section
const ReachUsSection = () => {
  return (
    <section id="contact" className="py-28 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-cyan-900/80 relative overflow-hidden backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <FadeInWhenVisible>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-100">Get Started Today</span>
              </div>
              
              <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 leading-tight">
                Ready to Transform Your Business?
              </h2>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Schedule a personalized demo and discover how our AI-powered visual commerce platform can drive growth for your business.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Email Us</h3>
                    <p className="text-blue-200">hello@visionai.com</p>
                    <p className="text-sm text-blue-300">Get a response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Call Us</h3>
                    <p className="text-blue-200">+1 (555) 123-4567</p>
                    <p className="text-sm text-blue-300">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Book a Demo</h3>
                    <p className="text-blue-200">30-minute personalized walkthrough</p>
                    <p className="text-sm text-blue-300">See our platform in action</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex gap-4 pt-6">
                {[
                  { icon: Facebook, color: "hover:bg-blue-600", href: "#" },
                  { icon: Twitter, color: "hover:bg-cyan-500", href: "#" },
                  { icon: Instagram, color: "hover:bg-blue-500", href: "#" },
                  { icon: Linkedin, color: "hover:bg-blue-700", href: "#" },
                  { icon: Youtube, color: "hover:bg-red-600", href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} group`}
                  >
                    <social.icon className="w-5 h-5 text-blue-200 group-hover:text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Right Side - Contact Form */}
          <FadeInWhenVisible delay={0.2}>
            <div className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-2">Schedule Your Demo</h3>
              <p className="text-blue-200 mb-8">Fill out the form and we'll get back to you within 24 hours</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">Work Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">Company</label>
                  <input 
                    type="text" 
                      className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">What challenges are you facing?</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    placeholder="Tell us about your current e-commerce challenges..."
                  ></textarea>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl py-6 text-lg font-semibold transition-all duration-300 group">
                  <Calendar className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Schedule My Demo
                </Button>
                
                <p className="text-center text-blue-300 text-sm">
                  By submitting, you agree to our Privacy Policy. We'll never spam you.
                </p>
              </form>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* 🧠 HERO SECTION WITH SPIPA CIRCLE BACKGROUND */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spipa Circle Background */}
        <div className="absolute inset-0">
          <SpipaCircle />
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-cyan-500/30"
          >
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-100">Enterprise-Grade Security</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
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
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 drop-shadow-2xl">
                Visual Search 2.0
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 drop-shadow-2xl mt-4">
                Reinventing Commerce
              </span>
            </motion.h1>

           
          </motion.div>

          {/* Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-2xl md:text-3xl lg:text-4xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed font-light"
          >
            <Typewriter text="Powered by Advanced AI" delay={80} />
          </motion.div>

          {/* Updated Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mb-12 flex-wrap"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full border-2 border-slate-900 shadow-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                ))}
              </div>
              <span className="text-blue-200 text-lg font-medium">
                Trusted by 45+ public companies to bootstrap founders, since 2016
              </span>
            </div>
            <motion.div 
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-5 h-5 text-cyan-400 fill-current" />
              <span className="text-lg font-semibold text-white">4.9/5</span>
              <span className="text-blue-200">(2.1k reviews)</span>
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
              <Button size="lg" className="text-lg px-12 py-8 shadow-2xl group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
                <Zap className="mr-3 w-6 h-6" />
                Try Live Demo
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-12 py-8 border-2 border-cyan-400/50 bg-cyan-500/10 backdrop-blur-sm group hover:bg-cyan-500/20 rounded-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -skew-x-12 animate-shine"></div>
                <Users className="mr-3 w-6 h-6" />
                Book Strategy Call
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
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
      <section id="results" className="py-28 bg-gradient-to-br from-slate-900/80 via-blue-900/40 to-cyan-900/40 relative overflow-hidden backdrop-blur-sm">
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

      {/* 📊 NEW ANALYTICS BENTO GRID SECTION */}
      <AnalyticsBentoGrid />

      {/* 🚀 FEATURE SHOWCASE SECTION */}
      <section id="features" className="py-28 bg-gradient-to-br from-slate-900/80 to-blue-900/80 relative overflow-hidden backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <FadeInWhenVisible>
                <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-cyan-400/30">
                  <Rocket className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold text-cyan-100">Next Generation AI</span>
                </div>
                <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 leading-tight">
                  See Our AI in Action
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Experience the power of real-time visual recognition and intelligent product discovery that transforms how customers shop online.
                </p>
              </FadeInWhenVisible>

              {/* Feature List */}
              <div className="space-y-6">
                {[
                  { icon: Search, title: "Real-time Visual Search", desc: "Instantly find products using any image with 99.2% accuracy" },
                  { icon: Sparkles, title: "Smart Recommendations", desc: "Personalized suggestions based on visual preferences and behavior" },
                  { icon: Cpu, title: "AI-Powered Insights", desc: "Deep learning algorithms that understand style, context, and trends" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-blue-200">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <Link to="/classify">
                  <Button className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl transition-all duration-300 group">
                    <Zap className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Try Feature Demo
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="px-8 py-6 border-2 border-cyan-400/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-white rounded-xl">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side Image */}
            <FadeInWhenVisible delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 transform hover:scale-105 transition-all duration-500">
                  <img 
                    src={featureShowcase} 
                    alt="AI Visual Commerce Platform Interface" 
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                  {/* Floating Elements around Image */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500 rounded-full blur-sm animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                
                {/* Stats Overlay */}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-6 shadow-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">99.2%</div>
                    <div className="text-cyan-100 text-sm">Accuracy Rate</div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ❓ NEW FAQ SECTION */}
      <FAQSection />

      {/* 📧 NEW NEWSLETTER SECTION */}
      <NewsletterSection />

      {/* 📞 ENHANCED REACH US & BOOK DEMO SECTION */}
      <ReachUsSection />

      {/* 🆙 BACK TO TOP BUTTON */}
      <BackToTop />

      <Footer />
    </div>
  );
};

export default Index;