import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Eye, Tag, Sparkles, BarChart3, 
  Shield, CheckCircle, Users, Globe, Award, Clock,
  Star, Zap, TrendingUp, Lock, Heart, Search, Cpu, Rocket,
  ChevronLeft, ChevronRight, Play, Pause, Mail, Phone, Calendar
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";

// 🖼️ Asset imports
import heroImg from "@/assets/sample6.png";
import fashionImg from "@/assets/1 (12).png";
import jewelryImg from "@/assets/1 (2).png";
import homeImg from "@/assets/1 (13).png";
import backgroundPattern from "@/assets/background.png";
import featureShowcase from "@/assets/1 (17).png";

// Carousel Images
import carouselImg1 from "@/assets/img1.png";
import carouselImg2 from "@/assets/img2.png";
import carouselImg3 from "@/assets/img3.png";
import carouselImg4 from "@/assets/img4.png";
import carouselImg5 from "@/assets/img5.png";

// 🔁 Fade-in animation reusable
const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        hidden: { opacity: 0, y: 40 },
      }}
    >
      {children}
    </motion.div>
  );
};

// 🎠 Animated KPI Carousel Component with Images
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
      color: "from-green-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-green-500/20 to-cyan-500/20",
      delay: 0
    },
    {
      value: 7,
      suffix: "x",
      label: "Higher Conversion Rate",
      description: "Visual recommendations drive immediate purchase decisions and reduce cart abandonment",
      image: carouselImg2,
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      delay: 1
    },
    {
      value: 92,
      suffix: "%",
      label: "Visual Match Accuracy",
      description: "Industry-leading AI precision for product recognition and similarity matching",
      image: carouselImg3,
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      delay: 2
    },
    {
      value: 3.2,
      suffix: "x",
      label: "Faster Discovery",
      description: "Reduce search time with instant visual results and intelligent recommendations",
      image: carouselImg4,
      color: "from-orange-400 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      delay: 3
    },
    {
      value: 68,
      suffix: "%",
      label: "Customer Engagement",
      description: "Increase in time spent exploring visual recommendations and personalized content",
      image: carouselImg5,
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
      delay: 4
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % kpiData.length);
    }, 3000);

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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 overflow-hidden group ${
              index === currentIndex
                ? 'bg-white/20 border-cyan-400/50 shadow-lg shadow-cyan-400/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
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

// 📞 New Reach Us & Book Demo Section
const ReachUsSection = () => {
  return (
    <section className="py-28 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      ></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <FadeInWhenVisible>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-cyan-400/30">
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
                <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Email Us</h3>
                    <p className="text-blue-200">hello@yourcompany.com</p>
                    <p className="text-sm text-blue-300">Get a response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Call Us</h3>
                    <p className="text-blue-200">+1 (555) 123-4567</p>
                    <p className="text-sm text-blue-300">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Book a Demo</h3>
                    <p className="text-blue-200">30-minute personalized walkthrough</p>
                    <p className="text-sm text-blue-300">See our platform in action</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Right Side - Contact Form */}
          <FadeInWhenVisible>
            <div className="bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">
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
                
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl py-6 text-lg font-semibold transition-all duration-300">
                  <Calendar className="mr-2 w-5 h-5" />
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

const testimonials = [
  { name: "Sarah Chen", role: "CTO, Fashion Retail Co.", content: "Increased our conversion rate by 45% in just 3 months. The visual search is incredible.", rating: 5 },
  { name: "Marcus Rodriguez", role: "E-commerce Director", content: "The AI tagging saved us hundreds of hours in catalog management. ROI was immediate.", rating: 5 },
  { name: "Emily Watson", role: "Head of Digital", content: "Our customers love the personalized recommendations. Engagement is through the roof.", rating: 5 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />

      {/* 🧠 ENHANCED HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 py-32">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundPattern})` }}
        ></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-blue-500/30"
          >
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-100">Enterprise-Grade Security</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight"
          >
            Visual Commerce
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
              Powered by AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Transform your retail experience with intelligent visual search, automated tagging, and hyper-personalized recommendations
          </motion.p>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full border-2 border-slate-900"></div>
                ))}
              </div>
              <span className="text-blue-200">500+ brands trust us</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold text-white">4.9/5</span>
              <span className="text-blue-200">(2.1k reviews)</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-6 flex-wrap"
          >
            <Link to="/classify">
              <Button size="lg" className="text-lg px-10 py-7 shadow-2xl group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/25">
                <Zap className="mr-3 w-6 h-6" />
                Try Live Demo
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-blue-400/50 bg-blue-500/10 backdrop-blur-sm group hover:bg-blue-500/20 rounded-2xl transition-all duration-300">
                <Users className="mr-3 w-6 h-6" />
                Book Strategy Call
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Floating AI Elements */}
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-blue-500/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-purple-500/25 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* 🎯 ENHANCED KPI CAROUSEL SECTION */}
      <section className="py-28 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 relative overflow-hidden">
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

      {/* 🚀 FEATURE SHOWCASE SECTION WITH RIGHT-SIDE IMAGE */}
      <section className="py-28 bg-slate-900 relative overflow-hidden">
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
                    className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
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
                  <Button className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl transition-all duration-300">
                    <Zap className="mr-2 w-5 h-5" />
                    Try Feature Demo
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="px-8 py-6 border-2 border-blue-400/50 bg-blue-500/10 hover:bg-blue-500/20 text-white rounded-xl">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side Image */}
            <FadeInWhenVisible>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 transform hover:scale-105 transition-all duration-500">
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

      {/* 📞 NEW REACH US & BOOK DEMO SECTION */}
      <ReachUsSection />

      <Footer />
      <h1>test</h1>
    </div>
  );
};

export default Index;