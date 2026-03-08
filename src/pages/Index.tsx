import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, ArrowRight, Zap, Users, Star, Search, Tag, Camera, 
  ShoppingBag, Smartphone, CheckCircle, ChevronDown, Globe, 
  Brain, Server, ShieldCheck, Calendar, Headphones, Download,
  ExternalLink, Rocket, Award, RefreshCw, TrendingUp, DollarSign,
  Clock, Play, FileText, Home, Gem, Palette, Building, Layers,
  Code, Cloud, Lock, Scale, Coffee, Braces, Code2, Cpu,
  Phone, Mail, MessageSquare, Video, ShoppingCart, BarChart,
  Database, Target, LineChart, ThumbsUp, Wifi, Terminal,
  FileCode, Network, Zap as Lightning, FileText as FileTextIcon,
  Headphones as HeadphonesIcon, Braces as BracesIcon,
  Code2 as Code2Icon, Webhook, Cpu as CpuIcon, Database as DatabaseIcon,
  Terminal as TerminalIcon, Shield as ShieldIcon, Cloud as CloudIcon,
  Quote, ChevronRight, X, Check, TrendingDown, AlertCircle,
  Sparkles, Target as TargetIcon, Clock as ClockIcon,
  BarChart as BarChartIcon, DollarSign as DollarSignIcon,
  UserCheck, Settings, FileEdit, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

// ==================== CUSTOM ICONS ====================
const PythonIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.914 0C5.317 0 5.266 2.988 5.266 2.988v3.388h5.791v1.067H2.025S0 7.366 0 11.916c0 4.55 2.212 4.937 2.212 4.937h2.212v-2.53s-.064-2.212 2.151-2.212h5.795s2.212.085 2.212-2.168V2.167S18.562 0 11.914 0zM8.648 1.85c.589 0 1.066.478 1.066 1.066s-.477 1.066-1.066 1.066c-.589 0-1.066-.478-1.066-1.066s.477-1.066 1.066-1.066z"/>
    <path d="M12.086 24c6.597 0 6.648-2.988 6.648-2.988v-3.388h-5.791v-1.067h9.032s2.025.923 2.025-4.627c0-4.55-2.212-4.937-2.212-4.937h-2.212v2.53s.064 2.212-2.151 2.212h-5.795s-2.212-.085-2.212 2.168v5.699s-.051 2.167 6.597 2.167zm3.266-1.85c-.589 0-1.066-.478-1.066-1.066s.477-1.066 1.066-1.066c.589 0 1.066.478 1.066 1.066s-.477 1.066-1.066 1.066z"/>
  </svg>
);

const DotNetIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24v1.24zM12.324 7.53v9.805h-1.424V7.53h1.424zM9.047 7.53v9.805H7.622V7.53h1.425zM4.321 7.53v9.805H2.896V7.53h1.425zM0 7.53h1.463v9.805H0V7.53z"/>
  </svg>
);

const PhpIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 16.5h-3l1-6H4.5l1-3h5.5l1-3h3l-1 3h3l1-3h3l-1 3h-3l-1 3h-3l-1 3h3l1 3h-3z"/>
  </svg>
);

const GoIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.964 0C5.346 0 0 5.346 0 11.964c0 6.617 5.346 11.964 11.964 11.964 6.617 0 11.964-5.347 11.964-11.964C23.928 5.346 18.581 0 11.964 0zm5.148 16.117c-.272.453-.997.838-1.591 1.043-.594.205-1.384.307-2.371.307h-4.203V6.75h4.581c.857 0 1.569.154 2.136.462.567.308.991.718 1.272 1.23.281.512.422 1.093.422 1.743 0 .65-.148 1.24-.445 1.771-.296.531-.743.957-1.339 1.277v.037c.771.154 1.379.514 1.823 1.078.444.564.667 1.27.667 2.116 0 .63-.14 1.204-.422 1.723zM10.52 8.304h-1.894v2.894h1.894c.581 0 1.04-.13 1.375-.39.335-.26.502-.632.502-1.115 0-.483-.167-.856-.502-1.119-.335-.262-.794-.393-1.375-.393zm1.894 6.093c0-.536-.176-.958-.527-1.268-.352-.31-.829-.465-1.432-.465h-1.947v3.487h1.947c.603 0 1.08-.155 1.432-.465.351-.31.527-.732.527-1.268z"/>
  </svg>
);

const GraphQlIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 29 33" fill="currentColor">
    <path d="M14.5 0L29 8.25V24.75L14.5 33L0 24.75V8.25L14.5 0Z" fill="#E535AB"/>
    <path d="M14.5 4.125L25.3125 9.9V23.1L14.5 28.875L3.6875 23.1V9.9L14.5 4.125Z" fill="#E535AB"/>
    <path d="M14.5 7.425L22.125 11.55V21.45L14.5 25.575L6.875 21.45V11.55L14.5 7.425Z" fill="#FFFFFF"/>
  </svg>
);

// ==================== CUSTOM COMPONENTS ====================
const Typewriter = ({ text, delay = 100, loop = true }: { text: string; delay?: number; loop?: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
    } else if (isDeleting && currentIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, delay / 2);
    } else if (currentIndex === text.length && loop) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (currentIndex === 0 && isDeleting && loop) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text, isDeleting, loop]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

// ==================== HERO SECTION ====================
const HeroSection = () => {
  const [showFounderNote, setShowFounderNote] = useState(false);
  const companyLogos = Array.from({ length: 27 }, (_, i) => `/src/assets/CompanyLogo/cp${i + 1}.png`);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Video for Hero Section */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/src/assets/HomeBG.mp4" type="video/mp4" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        </video>
        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="pt-16">
        
        {/* Trust Badge with Founder Note */}
        <div className="relative mb-8">
          <motion.div  
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-md rounded-full px-6 py-3 border border-cyan-500/30 group cursor-pointer"
            onMouseEnter={() => setShowFounderNote(true)}
            onMouseLeave={() => setShowFounderNote(false)}
          >
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-gray-200">Lead the Future of E-Commerce, Now!</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Founder Note Dropdown */}
          <AnimatePresence>
            {showFounderNote && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-96 z-50"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-cyan-500/50">
                      <img 
                        src="/src/assets/images.jpg" 
                        alt="Aashi Singh Bhadouria"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/64/0ea5e9/ffffff?text=AS";
                        }}
                      />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-cyan-400 font-bold">Aashi Singh Bhadouria</div>
                        <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">Founder & CEO</div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed italic">
                        "We're not just building technology; we're crafting the future of commerce. Our AI doesn't just understand products—it understands people. Every line of code is written with one goal: to make shopping magical again."
                      </p>
                      <div className="mt-3 text-xs text-gray-400">
                        BigOlens - Transforming Commerce with AI
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 drop-shadow-2xl">
              Visual Search 2.0
            </span>
          </motion.h1>
          <motion.h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 drop-shadow-2xl mt-4">
              Reinventing Commerce that Transforms Shopping Experiences
            </span>
          </motion.h3>
        </motion.div>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-2xl md:text-3xl lg:text-4xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed font-light h-12"
        >
          <Typewriter text="Powered by Advanced AI" delay={100} loop={true} />
        </motion.div>

        {/* Ratings Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-amber-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-300 font-semibold">4.9/5</span>
            <span className="text-gray-400 text-sm">on G2</span>
          </div>
          
          <div className="w-px h-6 bg-gray-700"></div>
          
          <div className="flex items-center gap-2">
            <div className="text-cyan-400 font-bold">500+</div>
            <span className="text-gray-300">Enterprise Clients</span>
          </div>
          
          <div className="w-px h-6 bg-gray-700"></div>
          
          <div className="flex items-center gap-2">
            <div className="text-green-400 font-bold">98%</div>
            <span className="text-gray-300">Satisfaction Rate</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          <Link to="/classify">
            <Button size="lg" className="text-lg px-12 py-6 shadow-2xl group bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white border-0 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/25">
              <Zap className="mr-2 w-5 h-5" />
              Try Live Demo
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="text-lg px-12 py-6 border-2 border-cyan-400/50 bg-cyan-500/20 backdrop-blur-sm group hover:bg-cyan-500/30 rounded-2xl transition-all duration-300 text-gray-100">
              <Users className="mr-2 w-5 h-5" />
              Book Strategy Call
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Company Marquee - 2 Lines with actual images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <div className="text-gray-300 text-lg font-medium mb-2">
              Trusted by industry leaders worldwide
            </div>
          </div>
          
          {/* First Marquee - Straight */}
          <div className="relative overflow-hidden py-4 mb-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10" />
            
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: [0, -1800] }}
              transition={{ 
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear"
                }
              }}
            >
              {companyLogos.concat(companyLogos).map((logo, index) => (
                <div key={`logo-${index}`} className="flex-shrink-0">
                  <div className="w-40 h-16 flex items-center justify-center bg-gray-800/30 rounded-lg p-2">
                    <img 
                      src={logo} 
                      alt={`Company ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/160x64/1f2937/ffffff?text=Company+${index % 27 + 1}`;
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Marquee - Reverse */}
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10" />
            
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: [-1800, 0] }}
              transition={{ 
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear"
                }
              }}
            >
              {companyLogos.concat(companyLogos).map((logo, index) => (
                <div key={`logo-reverse-${index}`} className="flex-shrink-0">
                  <div className="w-40 h-16 flex items-center justify-center bg-gray-800/30 rounded-lg p-2">
                    <img 
                      src={logo} 
                      alt={`Partner ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/160x64/1f2937/ffffff?text=Partner+${index % 27 + 1}`;
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
    </section>
  );
};

// ==================== BEFORE VS AFTER SECTION ====================
const BeforeAfterSection = () => {
  const [activeSide, setActiveSide] = useState<"before" | "after">("before");

  const beforeItems = [
    {
      icon: ClockIcon,
      title: "Manual Data Creation",
      description: "Time-consuming manual tagging and copywriting",
      details: ["Hours spent per product", "Inconsistent quality", "Human errors"]
    },
    {
      icon: AlertCircle,
      title: "Inconsistent Attributes",
      description: "Inconsistent product tags, titles and descriptions",
      details: ["Poor SEO performance", "Confusing customer experience", "Low discoverability"]
    },
    {
      icon: Filter,
      title: "Limited Filtering",
      description: "Limited filters due to missing attributes",
      details: ["Poor search results", "High bounce rates", "Lost sales opportunities"]
    },
    {
      icon: TrendingDown,
      title: "Poor Search Accuracy",
      description: "Poor search accuracy and low product discoverability",
      details: ["<30% search success rate", "High search abandonment", "Missed conversions"]
    },
    {
      icon: Settings,
      title: "Delayed Launches",
      description: "Delayed product launches and lost sales opportunities",
      details: ["Weeks to launch new products", "Missed market trends", "Revenue leakage"]
    }
  ];

  const afterItems = [
    {
      icon: Zap,
      title: "AI-Generated Content",
      description: "AI-generated tags, titles, and descriptions in seconds",
      details: ["90% faster processing", "Consistent quality", "Zero human errors"]
    },
    {
      icon: CheckCircle,
      title: "Structured Data",
      description: "Rich, structured data powering better filters and search",
      details: ["Improved SEO ranking", "Enhanced user experience", "Better discoverability"]
    },
    {
      icon: TargetIcon,
      title: "Advanced Filtering",
      description: "Advanced filters with comprehensive attributes",
      details: ["Precise search results", "Lower bounce rates", "Higher conversion"]
    },
    {
      icon: TrendingUp,
      title: "High Search Accuracy",
      description: "Improved product discovery and increased sales",
      details: ["85% search success rate", "Reduced abandonment", "More conversions"]
    },
    {
      icon: Rocket,
      title: "Rapid Deployment",
      description: "Up to 90% faster time to market",
      details: ["Hours to launch", "Capitalize on trends", "Revenue maximization"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-purple-600/30">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold text-gray-200">The Transformation Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-purple-200">
              Before BigOlens vs. After BigOlens
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how AI-powered product attribution transforms your e-commerce operations
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700">
            <button
              onClick={() => setActiveSide("before")}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeSide === "before"
                  ? "bg-gradient-to-r from-red-600/20 to-orange-600/20 text-gray-100 border border-red-600/30"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setActiveSide("after")}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeSide === "after"
                  ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-gray-100 border border-green-600/30"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              After
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: activeSide === "before" ? 1 : 0.5,
                x: 0
              }}
              transition={{ duration: 0.5 }}
              className={`space-y-4 p-8 rounded-3xl border-2 transition-all duration-300 ${
                activeSide === "before"
                  ? "border-red-600/30 bg-gradient-to-br from-red-600/10 to-orange-600/5"
                  : "border-gray-700 bg-gray-800/30"
              }`}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-gray-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-100">Manual E-commerce</h3>
                </div>
                <p className="text-gray-300">
                  Time-consuming processes, inconsistent data, and missed opportunities
                </p>
              </div>

              <div className="space-y-4">
                {beforeItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-red-600/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-600/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-100 mb-2">{item.title}</h4>
                          <p className="text-gray-300 mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.details.map((detail, idx) => (
                              <span key={idx} className="text-xs text-red-300 bg-red-600/10 px-2 py-1 rounded">
                                {detail}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* After Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: activeSide === "after" ? 1 : 0.5,
                x: 0
              }}
              transition={{ duration: 0.5 }}
              className={`space-y-4 p-8 rounded-3xl border-2 transition-all duration-300 ${
                activeSide === "after"
                  ? "border-green-600/30 bg-gradient-to-br from-green-600/10 to-emerald-600/5"
                  : "border-gray-700 bg-gray-800/30"
              }`}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-gray-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-100">AI-Powered E-commerce</h3>
                </div>
                <p className="text-gray-300">
                  Automated workflows, rich data, and accelerated growth
                </p>
              </div>

              <div className="space-y-4">
                {afterItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-green-600/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-100 mb-2">{item.title}</h4>
                          <p className="text-gray-300 mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.details.map((detail, idx) => (
                              <span key={idx} className="text-xs text-green-300 bg-green-600/10 px-2 py-1 rounded">
                                {detail}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Transformation Stats */}
          <FadeInWhenVisible delay={0.3}>
            <div className="mt-16 p-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/30 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">90%</div>
                  <div className="text-sm text-purple-300">Faster Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">85%</div>
                  <div className="text-sm text-purple-300">Search Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">3x</div>
                  <div className="text-sm text-purple-300">Conversion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">70%</div>
                  <div className="text-sm text-purple-300">Cost Reduction</div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

// ==================== AI POWERED ATTRIBUTION SECTION ====================
const AIPoweredAttribution = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <FadeInWhenVisible>
                <div>
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-600/30">
                    <TargetIcon className="w-6 h-6 text-cyan-400" />
                    <span className="text-lg font-semibold text-gray-200">AI-Powered Product Attribution</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-cyan-200">
                    Boost your eCommerce sales with AI-powered product attribution
                  </h2>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Transform your eCommerce with rich product attributes for improved product discovery, 
                    better search results, and higher conversion rates. Our AI automatically generates 
                    comprehensive metadata that drives sales.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-100 mb-2">Automated Tagging</h4>
                        <p className="text-gray-300">
                          AI automatically generates accurate tags, titles, and descriptions in seconds
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 flex items-center justify-center flex-shrink-0">
                        <Search className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-100 mb-2">Enhanced Discovery</h4>
                        <p className="text-gray-300">
                          Rich structured data powers better filters, search, and recommendations
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-100 mb-2">Revenue Growth</h4>
                        <p className="text-gray-300">
                          Increase conversion rates by up to 3x with better product discoverability
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 mt-8">
                    <Link to="/demo">
                      <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-gray-100 border-0 rounded-xl group">
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Demo
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                    
                    <Link to="/contact">
                      <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-cyan-400/50 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-xl text-gray-100">
                        <Phone className="w-5 h-5 mr-2" />
                        Contact Sales
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Right Side - Image with Animation */}
            <FadeInWhenVisible delay={0.2}>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src="/src/assets/1 (17).png" 
                    alt="AI-Powered Product Attribution"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/600x700/1f2937/0ea5e9?text=AI+Product+Attribution";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                  
                  {/* Animated Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-gray-100" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-8 left-8 p-4 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-cyan-600/30 max-w-xs"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-gray-100" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-100">3x</div>
                        <div className="text-sm text-cyan-300">Conversion Increase</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-xl"
                  animate={{
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== AI MODULES SECTION ====================
const AIModules = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const modules = [
    {
      id: "lens-search",
      title: "Lens Search",
      icon: Search,
      color: "from-blue-600 to-cyan-600",
      gradient: "bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-transparent",
      description: "Multi-modal search that understands images, text, and context",
      detailedDescription: "Advanced visual and semantic search technology that enables customers to find products using images, natural language, or voice queries. Our AI understands style, pattern, color, and contextual relationships across millions of products.",
      features: ["Visual similarity matching", "Semantic search", "Real-time indexing", "Multi-modal understanding"],
      benefits: ["Reduce search abandonment by 68%", "Increase product discovery by 5x", "Improve customer satisfaction", "Boost conversion rates"],
      metrics: [
        { value: "95%", label: "Accuracy" },
        { value: "<200ms", label: "Response Time" },
        { value: "68%", label: "Search Reduction" }
      ],
      image: "/src/assets/solutions/LensSearch.png",
      demoLink: "/demo/lens-search"
    },
    {
      id: "lens-tag",
      title: "Lens Tag",
      icon: Tag,
      color: "from-green-600 to-emerald-600",
      gradient: "bg-gradient-to-br from-green-600/20 via-emerald-600/10 to-transparent",
      description: "Intelligent categorization and metadata generation",
      detailedDescription: "Automatically analyze and tag products with rich metadata including attributes, categories, and descriptions. Process entire catalogs in minutes with 98%+ accuracy, saving hundreds of manual hours.",
      features: ["Automatic attribute extraction", "Batch processing", "500+ attributes", "Quality scoring"],
      benefits: ["Save 200+ hours monthly", "Improve search relevance by 85%", "Scale catalog management", "Ensure consistent product info"],
      metrics: [
        { value: "98%", label: "Precision" },
        { value: "100K/hour", label: "Processing" },
        { value: "200+", label: "Hours Saved" }
      ],
      image: "/src/assets/solutions/s7.png",
      demoLink: "/demo/lens-tag"
    },
    {
      id: "lens-vto",
      title: "Lens VTO",
      icon: Camera,
      color: "from-purple-600 to-pink-600",
      gradient: "bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-transparent",
      description: "Virtual Try-On for realistic product visualization",
      detailedDescription: "Augmented reality technology that allows customers to virtually try products. Real-time 3D rendering, accurate sizing, and realistic visualization that builds confidence and reduces returns.",
      features: ["Real-time AR fitting", "3D mesh mapping", "Size accuracy", "Multi-product try-on"],
      benefits: ["Reduce returns by 40%", "Increase conversion by 2.5x", "Enhance customer confidence", "Drive social engagement"],
      metrics: [
        { value: "40%", label: "Return Reduction" },
        { value: "2.5x", label: "Conversion" },
        { value: "98%", label: "Size Accuracy" }
      ],
      image: "/src/assets/solutions/LensVTO.png",
      demoLink: "/demo/lens-vto"
    },
    {
      id: "lens-recom",
      title: "Lens Recom",
      icon: ShoppingBag,
      color: "from-orange-600 to-red-600",
      gradient: "bg-gradient-to-br from-orange-600/20 via-red-600/10 to-transparent",
      description: "Personalized product recommendations",
      detailedDescription: "AI-powered recommendation engine that analyzes user behavior, preferences, and contextual data to deliver hyper-personalized product suggestions in real-time.",
      features: ["Behavioral AI analysis", "Real-time analytics", "A/B testing", "Cross-sell/Up-sell"],
      benefits: ["Increase AOV by 45%", "Boost conversion by 35%", "Enhance retention by 60%", "Drive repeat purchases"],
      metrics: [
        { value: "45%", label: "AOV Increase" },
        { value: "35%", label: "Conversion" },
        { value: "Real-time", label: "Updates" }
      ],
      image: "/src/assets/solutions/set1.png",
      demoLink: "/demo/lens-recom"
    },
    {
      id: "lens-personalize",
      title: "Lens Personalize",
      icon: Smartphone,
      color: "from-indigo-600 to-violet-600",
      gradient: "bg-gradient-to-br from-indigo-600/20 via-violet-600/10 to-transparent",
      description: "Individualized shopping experiences",
      detailedDescription: "Deep learning algorithms that create unique shopping journeys for each customer by adapting content, layout, and offers in real-time based on individual preferences.",
      features: ["Predictive modeling", "Dynamic content", "User intent clustering", "Cross-channel consistency"],
      benefits: ["Increase engagement by 60%", "Drive 3x return visits", "Improve customer lifetime value", "Create memorable experiences"],
      metrics: [
        { value: "60%", label: "Engagement" },
        { value: "3x", label: "Return Visits" },
        { value: "Real-time", label: "Adaptation" }
      ],
      image: "/src/assets/solutions/s9.png",
      demoLink: "/demo/lens-personalize"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    if (!autoSlide) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modules.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, modules.length]);

  const handleModuleClick = (index: number) => {
    setActiveIndex(index);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const activeModule = modules[activeIndex];
  const Icon = activeModule.icon;

  return (
    <section id="solutions" className="py-24 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-cyan-600/30">
              <Brain className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-semibold text-gray-200">Our Powerful AI Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-cyan-200">
              Our Powerful AI Solutions
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left Side - Active Module Content */}
            <div className="space-y-8">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${activeModule.color} p-1 shadow-2xl`}>
                    <div className="w-full h-full bg-gray-900/90 rounded-xl flex items-center justify-center">
                      <Icon className="w-10 h-10 text-gray-100" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">{activeModule.title}</h3>
                    <p className="text-cyan-300 text-lg">{activeModule.description}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {activeModule.detailedDescription}
                </p>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-100">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeModule.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {activeModule.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                      <div className="text-2xl font-bold text-gray-100 mb-1">{metric.value}</div>
                      <div className="text-xs text-cyan-300">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <Button 
                  asChild
                  className="w-full lg:w-auto px-8 py-6 text-lg bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-gray-100 border-0 rounded-xl group"
                >
                  <Link to={activeModule.demoLink}>
                    Try {activeModule.title}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right Side - Large Image Only */}
            <div className="space-y-8">
              {/* Large Image */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                <img
                  src={activeModule.image}
                  alt={activeModule.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/800x500/1f2937/3b82f6?text=${encodeURIComponent(activeModule.title)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                
                {/* Benefits Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-2">
                    {activeModule.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-100 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Module Navigation with Progress Indicator */}
              <div>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-800 rounded-full mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: autoSlide ? "100%" : "0%" }}
                    transition={{ 
                      duration: 5,
                      ease: "linear"
                    }}
                    key={activeIndex}
                  />
                </div>

                {/* Module Navigation */}
                <div className="grid grid-cols-5 gap-4">
                  {modules.map((module, index) => {
                    const ModuleIcon = module.icon;
                    return (
                      <motion.button
                        key={module.id}
                        onClick={() => handleModuleClick(index)}
                        whileHover={{ y: -5 }}
                        className={`text-center p-4 rounded-xl border transition-all duration-300 ${
                          activeIndex === index
                            ? `bg-gradient-to-r ${module.color}/20 border-cyan-600/50 shadow-lg shadow-cyan-600/10`
                            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                            <ModuleIcon className="w-5 h-5 text-gray-100" />
                          </div>
                          <h4 className="font-semibold text-gray-100 text-xs">{module.title}</h4>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Business Impact Section */}
          <FadeInWhenVisible delay={0.3}>
            <div className="p-8 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-600/30 rounded-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-6">Measurable Business Impact</h3>
                  <div className="space-y-4">
                    {[
                      { metric: "Average Revenue Increase", value: "45%", icon: TrendingUp },
                      { metric: "Conversion Rate Improvement", value: "7x", icon: Zap },
                      { metric: "Customer Retention Rate", value: "68%", icon: Users },
                      { metric: "Implementation Timeline", value: "2-4 weeks", icon: Clock }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-purple-400" />
                            <span className="text-gray-100">{item.metric}</span>
                          </div>
                          <span className="text-cyan-400 font-bold">{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-center">
                  <div className="relative inline-block">
                    <motion.div
                      className="relative w-48 h-48 mx-auto mb-4"
                      animate={{
                        rotateY: [0, 360],
                        rotateX: [0, 180, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-4 bg-gray-900 rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            className="text-5xl font-bold text-gray-100 mb-2"
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            7x
                          </motion.div>
                          <div className="text-xl text-gray-100 mb-2">Average ROI</div>
                          <div className="text-blue-300">Within first 6 months</div>
                        </div>
                      </div>
                      <motion.div 
                        className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <TrendingUp className="w-6 h-6 text-gray-100" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

// ==================== INDUSTRIES SECTION ====================
const IndustriesSection = () => {
  const industries = [
    {
      id: 1,
      title: "Fashion & Apparel",
      icon: ShoppingBag,
      video: "/src/assets/solutions/fashion.mp4",
      description: "Revolutionizing fashion retail with AI-powered style discovery",
      features: ["Virtual Try-On for clothing", "Style pattern recognition", "Size recommendation", "Trend analysis"],
      stats: ["7x", "45%", "68%"],
      statLabels: ["Conversion Lift", "AOV Increase", "Retention Rate"],
      caseStudy: "Global fashion retailer achieved 45% AOV increase in 6 months"
    },
    {
      id: 2,
      title: "Jewellery & Luxury",
      icon: Gem,
      video: "/src/assets/solutions/jewellery.mp4",
      description: "Precision AI for luxury goods and high-value items",
      features: ["Gemstone recognition", "Metal type detection", "Design pattern matching", "Certificate verification"],
      stats: ["3x", "60%", "85%"],
      statLabels: ["Engagement Rate", "AOV Increase", "Accuracy Rate"],
      caseStudy: "Luxury jeweller reduced authentication time by 70%"
    },
    {
      id: 3,
      title: "Home & Decor",
      icon: Home,
      video: "/src/assets/solutions/HomeDecor.mp4",
      description: "Bringing home decor visualization to life",
      features: ["Room visualization", "Style coordination", "Space planning", "Color matching"],
      stats: ["5x", "35%", "78%"],
      statLabels: ["Discovery Rate", "AOV Increase", "Customer Satisfaction"],
      caseStudy: "Home decor brand increased bundles by 60%"
    },
    {
      id: 4,
      title: "Electronics & Gadgets",
      icon: Smartphone,
      video: "/src/assets/solutions/Gadgets.mp4",
      description: "Smart technology for tech products and gadgets",
      features: ["Specification matching", "Feature comparison", "Compatibility checking", "Usage simulation"],
      stats: ["4x", "55%", "92%"],
      statLabels: ["Conversion Lift", "AOV Increase", "Accuracy Rate"],
      caseStudy: "Electronics retailer reduced support calls by 65%"
    },
    {
      id: 5,
      title: "Beauty & Cosmetics",
      icon: Palette,
      video: "/src/assets/solutions/beauty.mp4",
      description: "Personalized beauty experiences powered by AI",
      features: ["Skin tone analysis", "Virtual makeup try-on", "Product matching", "Ingredient analysis"],
      stats: ["6x", "40%", "88%"],
      statLabels: ["Engagement Rate", "AOV Increase", "Match Accuracy"],
      caseStudy: "Beauty brand increased repeat purchases by 3x"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-purple-600/30">
              <Globe className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold text-gray-200">360° Product Intelligence Platform</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-purple-200">
              A complete journey from discovery to conversion
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by unified AI across all industries
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative h-[420px] group cursor-pointer"
              >
                {/* Flip Card Container */}
                <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* Front of Card - Video */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-xl">
                    <div className="absolute inset-0">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={industry.video} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-900/20"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div className="w-16 h-16 mb-4 rounded-2xl bg-gray-900/80 flex items-center justify-center relative z-10 backdrop-blur-sm">
                          <Icon className="w-8 h-8 text-gray-100" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-2 relative z-10">{industry.title}</h3>
                        <p className="text-sm text-gray-300 text-center mb-4 relative z-10">{industry.description}</p>
                        <div className="text-xs text-gray-400 mt-4 relative z-10">Hover to explore →</div>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden [transform:rotateY(180deg)] bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gray-100" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-100">{industry.title}</h3>
                        </div>

                        <div className="space-y-3 mb-6">
                          <h4 className="text-sm font-semibold text-gray-100">Key Features</h4>
                          <ul className="space-y-2">
                            {industry.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {industry.stats.map((stat, idx) => (
                            <div key={idx} className="text-center p-2 bg-gray-800/50 rounded-lg">
                              <div className="text-base font-bold text-gray-100">{stat}</div>
                              <div className="text-xs text-cyan-300">{industry.statLabels[idx]}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          asChild
                          size="sm"
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-gray-100 border-0 rounded-xl"
                        >
                          <Link to={`/case-study/${industry.id}`}>
                            View Case Study
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                        
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 rounded-xl"
                        >
                          <Link to={`/industries/${industry.id}`}>
                            Explore Solutions
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Industry Performance Stats */}
        <FadeInWhenVisible delay={0.6}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="p-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/30 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">5</div>
                  <div className="text-sm text-purple-300">Industries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">7x</div>
                  <div className="text-sm text-purple-300">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">45%</div>
                  <div className="text-sm text-purple-300">AOV Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-100 mb-2">500+</div>
                  <div className="text-sm text-purple-300">Enterprise Clients</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

// ==================== ENTERPRISE READY FEATURES ====================
const EnterpriseReadyFeatures = () => {
  const [activeFeature, setActiveFeature] = useState("custom-models");

  const enterpriseFeatures = [
    {
      id: "custom-models",
      title: "Custom AI Models",
      icon: Brain,
      color: "from-blue-600 to-cyan-600",
      description: "Tailored machine learning models trained on your specific data and business goals",
      detailedDescription: "Our custom AI models are specifically trained on your product catalog, customer behavior, and business objectives to deliver maximum accuracy and relevance for your unique use case.",
      keyFeatures: [
        "Domain-specific training data with your product catalog",
        "Continuous learning and adaptation based on user interactions",
        "Performance optimization for your specific use case and industry",
        "Regular model updates and improvements based on new data patterns"
      ],
      businessBenefits: [
        "Higher accuracy on your specific products and categories",
        "Better adaptation to your unique customer behavior patterns",
        "Competitive advantage with proprietary AI models",
        "Scalable performance across all regions and markets"
      ],
      performanceMetrics: [
        { value: "98%", label: "Accuracy", description: "Model accuracy on your specific products" },
        { value: "2-4 weeks", label: "Setup Time", description: "Custom model training and deployment" },
        { value: "Continuous", label: "Updates", description: "Regular model improvements and retraining" }
      ]
    },
    {
      id: "comprehensive-apis",
      title: "Comprehensive APIs",
      icon: Code,
      color: "from-purple-600 to-pink-600",
      description: "RESTful APIs with real-time streaming, webhooks, and extensive documentation",
      detailedDescription: "Enterprise-grade API infrastructure with full OpenAPI 3.0 specification, real-time event streaming, and comprehensive webhook support for seamless integration.",
      keyFeatures: [
        "Full OpenAPI 3.0 specification with interactive documentation",
        "Real-time event streaming with WebSocket support",
        "Webhook notifications for all business events and updates",
        "Interactive API documentation with code samples"
      ],
      businessBenefits: [
        "Faster integration and development cycles",
        "Real-time data synchronization across all systems",
        "Automated workflow triggers and notifications",
        "Easy debugging and testing with comprehensive tools"
      ],
      performanceMetrics: [
        { value: "<50ms", label: "Response Time", description: "Average API response time" },
        { value: "99.9%", label: "Uptime", description: "Service level agreement" },
        { value: "24/7", label: "Support", description: "Enterprise technical support" }
      ]
    },
    {
      id: "data-pipeline",
      title: "Data Pipeline Management",
      icon: Database,
      color: "from-green-600 to-emerald-600",
      description: "End-to-end data processing with monitoring, logging, and analytics",
      detailedDescription: "Complete data pipeline solution with automated ingestion, real-time processing, comprehensive monitoring, and detailed analytics for enterprise-scale operations.",
      keyFeatures: [
        "Automated data ingestion and validation pipelines",
        "Real-time processing with stream processing capabilities",
        "Comprehensive monitoring dashboard with real-time alerts",
        "Automated alerting and notifications for data quality issues"
      ],
      businessBenefits: [
        "Seamless data flow across all business systems",
        "Proactive issue detection and resolution",
        "Detailed analytics and insights for data-driven decisions",
        "Reduced maintenance overhead with automated monitoring"
      ],
      performanceMetrics: [
        { value: "Petabyte", label: "Scale", description: "Data processing capacity" },
        { value: "Real-time", label: "Processing", description: "Data processing speed" },
        { value: "99.99%", label: "Reliability", description: "Pipeline uptime and reliability" }
      ]
    },
    {
      id: "on-premise",
      title: "On-Premise Deployment",
      icon: Server,
      color: "from-orange-600 to-red-600",
      description: "Self-hosted solutions for maximum data control and compliance",
      detailedDescription: "Complete on-premise deployment options with full data sovereignty, custom security configurations, and air-gapped deployment for maximum security and compliance.",
      keyFeatures: [
        "Full data sovereignty and complete control over your data",
        "Custom security configurations and access controls",
        "Air-gapped deployment options for maximum security",
        "Custom SLAs and dedicated support agreements"
      ],
      businessBenefits: [
        "Complete data privacy and security compliance",
        "Compliance with strict regulatory requirements (HIPAA, GDPR)",
        "Custom performance requirements and infrastructure",
        "Seamless integration with existing enterprise infrastructure"
      ],
      performanceMetrics: [
        { value: "HIPAA", label: "Compliance", description: "Healthcare compliance standards" },
        { value: "GDPR", label: "Privacy", description: "Data privacy regulations" },
        { value: "SOC 2", label: "Security", description: "Security compliance certification" }
      ]
    }
  ];

  const activeFeatureData = enterpriseFeatures.find(f => f.id === activeFeature);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-cyan-600/30">
              <Scale className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-semibold text-gray-200">For Large Enterprises</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-cyan-200">
              Enterprise-Ready Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions designed for Fortune 500 companies and high-growth ecommerce platforms
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Features Grid */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {enterpriseFeatures.map((feature) => {
                  const Icon = feature.icon;
                  const isActive = activeFeature === feature.id;
                  return (
                    <motion.button
                      key={feature.id}
                      onClick={() => setActiveFeature(feature.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-br ${feature.color}/20 border-cyan-600/50 shadow-lg shadow-cyan-600/10`
                          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0 ${isActive ? 'scale-110' : ''} transition-transform`}>
                          <Icon className="w-6 h-6 text-gray-100" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-100 mb-2">{feature.title}</h3>
                          <p className="text-sm text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Enterprise Adoption Stats */}
              <div className="p-8 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-600/30 rounded-3xl">
                <h4 className="text-xl font-bold text-gray-100 mb-6 text-center">Enterprise Adoption</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Fortune 500 Companies", value: "50+", icon: Building },
                    { label: "Enterprise Deployments", value: "200+", icon: Server },
                    { label: "Countries Supported", value: "40+", icon: Globe },
                    { label: "Industry Verticals", value: "15+", icon: Layers }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-cyan-400" />
                          <span className="text-gray-100 text-sm">{stat.label}</span>
                        </div>
                        <span className="text-cyan-400 font-bold">{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Active Feature Details */}
            {activeFeatureData && (
              <div className="space-y-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${activeFeatureData.color} flex items-center justify-center shadow-2xl`}>
                    <activeFeatureData.icon className="w-10 h-10 text-gray-100" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-100 mb-2">{activeFeatureData.title}</h3>
                    <p className="text-lg text-cyan-200">{activeFeatureData.description}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-100 mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {activeFeatureData.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                          <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-100 mb-4">Business Benefits</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {activeFeatureData.businessBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                          <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {activeFeatureData.performanceMetrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-4 bg-gray-800/50 rounded-xl">
                        <div className="text-2xl font-bold text-gray-100 mb-1">{metric.value}</div>
                        <div className="text-xs text-cyan-300">{metric.label}</div>
                        <div className="text-xs text-gray-400 mt-1">{metric.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== SEAMLESS INTEGRATION SECTION ====================
const SeamlessIntegration = () => {
  const apiArchitectureFeatures = [
    {
      icon: BracesIcon,
      title: "RESTful APIs with OpenAPI 3.0",
      description: "Fully documented REST APIs with OpenAPI 3.0 specification",
      details: ["CRUD operations", "Bulk operations", "Advanced filtering", "Version management"]
    },
    {
      icon: Code2Icon,
      title: "SDKs for JavaScript, Python, Java, .NET",
      description: "Comprehensive SDKs for popular programming languages",
      details: ["TypeScript/JavaScript SDK", "Python package", "Java library", ".NET NuGet package"]
    },
    {
      icon: Webhook,
      title: "Webhook support for real-time updates",
      description: "Instant notifications for events and updates",
      details: ["Custom events", "Retry mechanisms", "Payload customization", "Security headers"]
    },
    {
      icon: GraphQlIcon,
      title: "GraphQL endpoint for flexible queries",
      description: "Single endpoint for complex data queries",
      details: ["WebSocket support", "Event sourcing", "Change data capture", "Stream processing"]
    },
    {
      icon: FileTextIcon,
      title: "Comprehensive documentation",
      description: "Detailed guides, tutorials, and API references",
      details: ["Interactive docs", "Code samples", "Troubleshooting", "Best practices"]
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 developer support",
      description: "Round-the-clock technical assistance",
      details: ["Dedicated support", "Slack channel", "Priority ticketing", "Developer forums"]
    }
  ];

  const analyticsFeatures = [
    {
      title: "Analytics Dashboard",
      icon: BarChart,
      description: "Real-time analytics and performance monitoring with detailed insights",
      details: ["Real-time metrics", "Performance tracking", "User behavior analysis", "Conversion analytics"]
    },
    {
      title: "Marketing Automation",
      icon: Target,
      description: "Automated campaign management and optimization tools",
      details: ["Campaign automation", "A/B testing", "Personalization engine", "ROI tracking"]
    },
    {
      title: "Customer Insights",
      icon: Users,
      description: "Deep customer behavior analysis and segmentation",
      details: ["Customer segmentation", "Behavior analysis", "Predictive analytics", "Lifetime value tracking"]
    },
    {
      title: "Performance Tracking",
      icon: LineChart,
      description: "Comprehensive performance metrics and reporting",
      details: ["KPI tracking", "Real-time reporting", "Custom dashboards", "Export capabilities"]
    }
  ];

  const sdkSupport = [
    { name: "JavaScript", icon: Code2Icon, description: "Node.js and browser support" },
    { name: "Python", icon: PythonIcon, description: "PyPI package with async support" },
    { name: "Java", icon: Coffee, description: "Maven and Gradle support" },
    { name: ".NET", icon: DotNetIcon, description: "NuGet package for .NET Core" },
    { name: "PHP", icon: PhpIcon, description: "Composer package" },
    { name: "Go", icon: GoIcon, description: "Go modules support" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-blue-600/30">
              <Code className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-semibold text-gray-200">Seamless Integration</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-blue-200">
              Connect with Your Tech Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Integrate with your existing tech stack in weeks, not months. Our comprehensive APIs and SDKs make implementation straightforward.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Left Side - Image */}
            <FadeInWhenVisible delay={0.1}>
              <div className="relative">
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 shadow-2xl overflow-hidden group">
                  <img 
                    src="/src/assets/integration.png" 
                    alt="Integration Dashboard" 
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/800x500/1f2937/6366f1?text=Integration+Dashboard";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                </div>
                
                {/* Integration Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-gray-100 mb-1">50+</div>
                    <div className="text-xs text-cyan-300">Integrations</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-gray-100 mb-1">&lt;30 min</div>
                    <div className="text-xs text-cyan-300">Setup Time</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-gray-100 mb-1">99.9%</div>
                    <div className="text-xs text-cyan-300">Uptime SLA</div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Right Side - Content */}
            <div className="space-y-12">
              {/* API-First Architecture */}
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-6">API-First Architecture</h3>
                <p className="text-gray-300 mb-6">
                  Build custom integrations with our comprehensive, developer-friendly API ecosystem designed for enterprise-scale applications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apiArchitectureFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-cyan-600/40 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-100 mb-1">{feature.title}</h4>
                            <p className="text-gray-300 text-sm mb-2">{feature.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {feature.details.map((detail, idx) => (
                                <span key={idx} className="text-xs text-blue-300 bg-blue-600/10 px-2 py-1 rounded">
                                  {detail}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Analytics & Marketing */}
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-6">Analytics & Marketing</h3>
                <div className="grid grid-cols-2 gap-4">
                  {analyticsFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.title} className="p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-purple-400" />
                          </div>
                          <h4 className="font-semibold text-gray-100 text-sm">{feature.title}</h4>
                        </div>
                        <p className="text-gray-400 text-xs mb-2">{feature.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {feature.details.slice(0, 2).map((detail, idx) => (
                            <span key={idx} className="text-xs text-purple-300 bg-purple-600/10 px-1.5 py-0.5 rounded">
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* SDK Support */}
          <FadeInWhenVisible delay={0.3}>
            <div className="p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/30 rounded-3xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-100 mb-2">SDK Support</h3>
                <p className="text-gray-300">Comprehensive SDKs for popular programming languages with full documentation and examples</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {sdkSupport.map((sdk, index) => {
                  const Icon = sdk.icon;
                  return (
                    <div key={index} className="text-center p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-100" />
                      </div>
                      <div className="text-sm font-bold text-gray-100 mb-1">{sdk.name}</div>
                      <div className="text-xs text-blue-300">{sdk.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

// ==================== CLIENT REVIEWS SECTION (Animated Marquee) ====================
const ClientReviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      position: "Chief Technology Officer",
      company: "Global Fashion Retailer",
      content: "BigOlens AI transformed our e-commerce platform. The visual search capabilities increased our conversion rates by 300% and reduced search abandonment by 68%.",
      rating: 5,
      image: "/src/assets/ClientCompanyOwners/o1.png"
    },
    {
      name: "Michael Chen",
      position: "Head of E-commerce",
      company: "Electronics Giant",
      content: "The Virtual Try-On technology has been a game-changer for our electronics business. We've seen a 40% reduction in returns and a 2.5x increase in conversion rates.",
      rating: 5,
      image: "/src/assets/ClientCompanyOwners/o2.png"
    },
    {
      name: "Emma Rodriguez",
      position: "VP of Digital Transformation",
      company: "Luxury Jewellery Brand",
      content: "Working with BigOlens has been exceptional. Their AI models understand the nuances of luxury products, providing accurate gemstone recognition and design matching.",
      rating: 5,
      image: "/src/assets/ClientCompanyOwners/o3.png"
    },
    {
      name: "David Park",
      position: "E-commerce Director",
      company: "Home Decor Chain",
      content: "The room visualization and style coordination features have revolutionized how customers shop for home decor. We've achieved a 5x increase in product discovery.",
      rating: 5,
      image: "/src/assets/ClientCompanyOwners/o4.png"
    },
    {
      name: "Lisa Thompson",
      position: "Digital Transformation Lead",
      company: "Beauty Conglomerate",
      content: "BigOlens' beauty AI suite has transformed our customer experience. The virtual makeup try-on and skin tone analysis have increased engagement by 6x.",
      rating: 5,
      image: "/src/assets/ClientCompanyOwners/o5.png"
    },
    {
      name: "Robert Kim",
      position: "Technology Director",
      company: "Sports Apparel Brand",
      content: "The automated tagging system saved us over 200 hours monthly in manual work. The search relevance improved by 85% and our conversion rates increased by 7x.",
      rating: 5,
      image: "/src/assets/ClientCompanyOwners/o6.png"
    }
  ];

  // Duplicate reviews for seamless marquee
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-cyan-900/10 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-cyan-600/30">
              <ThumbsUp className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-semibold text-gray-200">Client Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-cyan-200">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from industry leaders who transformed their e-commerce with our AI solutions
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Animated Marquee */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10" />
          
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -3840] }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear"
              }
            }}
          >
            {marqueeReviews.map((review, index) => (
              <div key={`${review.name}-${index}`} className="flex-shrink-0 w-96">
                <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-3xl p-8 h-full hover:border-cyan-600/30 transition-all duration-300">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Review Content */}
                  <p className="text-gray-300 mb-8 italic leading-relaxed flex-grow">
                    "{review.content}"
                  </p>
                  
                  {/* Client Info */}
                  <div className="border-t border-gray-700 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={review.image} 
                          alt={review.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=0ea5e9&color=fff`;
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-100 text-lg">{review.name}</div>
                        <div className="text-cyan-300 text-sm">{review.position}</div>
                        <div className="text-gray-400 text-sm">{review.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Overall Rating */}
        <FadeInWhenVisible delay={0.6}>
          <div className="mt-16 p-8 bg-gradient-to-r from-cyan-600/10 to-teal-600/10 border border-cyan-600/30 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-100 mb-2">4.9/5</div>
                <div className="text-cyan-300">Average Rating</div>
                <div className="flex justify-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-100 mb-2">500+</div>
                <div className="text-cyan-300">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-100 mb-2">98%</div>
                <div className="text-cyan-300">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

// ==================== CERTIFICATIONS AND AWARDS SECTION ====================
const CertificationsAwards = () => {
  const badges = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: [
      "AI Innovation Award 2024",
      "Enterprise Security Certified",
      "Best in E-commerce AI",
      "GDPR Compliant",
      "ISO 27001 Certified",
      "Technology Excellence",
      "Customer Choice Award",
      "Innovation Leader"
    ][i],
    image: `/src/assets/badge/b${i + 1}.png`
  }));

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-amber-900/10 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-800/[0.02] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-amber-600/30">
              <Award className="w-6 h-6 text-amber-400" />
              <span className="text-lg font-semibold text-gray-200">Certifications & Awards</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-amber-200">
              Recognized Excellence in AI Technology
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our commitment to innovation and security has been recognized by industry leaders worldwide
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-6xl mx-auto">
          {/* Badges Grid - Single Row */}
          <div className="flex flex-nowrap justify-center gap-6 overflow-x-auto pb-8 mb-12 scrollbar-hide">
            {badges.map((badge, index) => (
              <FadeInWhenVisible key={badge.id} delay={index * 0.1}>
                <div className="text-center group flex-shrink-0 w-32">
                  <div className="relative w-24 h-24 mx-auto mb-3 p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-amber-600/20 hover:border-amber-600/40 transition-all duration-300">
                    <div className="absolute inset-1.5 bg-gray-900/50 rounded-lg"></div>
                    <img 
                      src={badge.image} 
                      alt={badge.name}
                      className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/96x96/92400e/fbbf24?text=${encodeURIComponent(badge.name.split(' ')[0])}`;
                      }}
                    />
                  </div>
                  <h3 className="text-xs font-bold text-gray-100 mb-1 leading-tight px-1">{badge.name}</h3>
                  <p className="text-xs text-amber-300">2023-2024</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Recognition Stats */}
          <FadeInWhenVisible delay={0.5}>
            <div className="p-6 bg-gradient-to-r from-amber-600/10 to-yellow-600/10 border border-amber-600/30 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-100 mb-2">8+</div>
                  <div className="text-xs text-amber-300">Industry Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-100 mb-2">12+</div>
                  <div className="text-xs text-amber-300">Security Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-100 mb-2">100%</div>
                  <div className="text-xs text-amber-300">Compliance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-100 mb-2">ISO</div>
                  <div className="text-xs text-amber-300">27001 Certified</div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

// ==================== BOOK DEMO SECTION (Enhanced) ====================
const BookDemoSection = () => {
  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-green-600/5 to-emerald-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-amber-600/5 to-yellow-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm rounded-full px-8 py-4 mb-6 border border-gray-700 group hover:border-cyan-600/30 transition-all duration-300">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6"
                >
                  <Calendar className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <span className="text-lg font-semibold text-gray-200">Ready to Transform Your Business?</span>
              </div>
              
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-cyan-200 to-blue-200"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Book a Demo Today
              </motion.h2>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                See how our AI solutions can drive measurable results for your business. Get a personalized demo tailored to your needs.
              </p>

              {/* Animated Stats */}
              <div className="flex justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">45%</div>
                  <div className="text-sm text-gray-300">Average Revenue Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">7x</div>
                  <div className="text-sm text-gray-300">ROI in 6 Months</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">2-4</div>
                  <div className="text-sm text-gray-300">Weeks to Launch</div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Side - Benefits with Animation */}
            <FadeInWhenVisible delay={0.1}>
              <div className="space-y-6">
                {[
                  {
                    icon: Video,
                    title: "Live Product Demo",
                    description: "See our AI modules in action with your actual products and catalog"
                  },
                  {
                    icon: MessageSquare,
                    title: "Strategy Session",
                    description: "Personalized consultation with our AI experts and solution architects"
                  },
                  {
                    icon: BarChart,
                    title: "ROI Analysis",
                    description: "Custom projection for your specific business impact and revenue growth"
                  }
                ].map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-4 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-cyan-600/30 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 flex items-center justify-center"
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-100 mb-1">{benefit.title}</h4>
                        <p className="text-gray-300 text-sm">{benefit.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </FadeInWhenVisible>

            {/* Center - Animated Image */}
            <FadeInWhenVisible delay={0.2}>
              <div className="relative">
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-700"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  onHoverStart={() => setHoverEffect(true)}
                  onHoverEnd={() => setHoverEffect(false)}
                >
                  <img 
                    src="/src/assets/solutions/s11.png" 
                    alt="Book Demo"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/400x500/1f2937/0ea5e9?text=Schedule+Your+Demo";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
                  
                  {/* Animated Overlay */}
                  {hoverEffect && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-gray-100" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 right-4 p-3 bg-gray-900/90 backdrop-blur-sm rounded-lg border border-green-600/30"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    
                  </motion.div>
                </motion.div>
                
                {/* Floating Particles */}
                <motion.div
                  className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-xl"
                  animate={{
                    y: [0, 20, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </FadeInWhenVisible>

            {/* Right Side - CTA Buttons */}
            <FadeInWhenVisible delay={0.3}>
              <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl">
                  <h3 className="text-2xl font-bold text-gray-100 mb-6 text-center">Schedule Your Demo</h3>
                  
                  <div className="space-y-4">
                    <Link to="/demo">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-gray-100 border-0 rounded-xl py-6 text-lg font-semibold group"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 mr-3"
                        >
                          <Calendar className="w-6 h-6" />
                        </motion.div>
                        Book Demo
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                    
                    <Link to="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-2 border-cyan-400/50 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-xl py-6 text-lg font-semibold text-gray-100 group"
                      >
                        <Phone className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                        Contact Sales
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>30-minute personalized session</span>
                    </div>
                  </div>
                </div>
                
                {/* Trust Badge */}
                <div className="p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-semibold text-gray-100">Trusted by 500+ Enterprises</span>
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">4.9/5 average rating</p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN HOME PAGE ====================
const HomePage = () => {
  return (
    <div className="relative bg-gray-900">
      <HeroSection />
      <AIPoweredAttribution />
      <BeforeAfterSection />
      <AIModules />
      <IndustriesSection />
      <EnterpriseReadyFeatures />
      <SeamlessIntegration />
      <ClientReviews />
      <CertificationsAwards />
      <BookDemoSection />
      <Footer />
    </div>
  );
};

export default HomePage;