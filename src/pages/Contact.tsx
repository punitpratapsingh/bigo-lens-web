import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  MapPin, Phone, Mail, Clock, Send, ArrowRight, MessageCircle, 
  Building, Globe, CheckCircle, Users, Shield, Award, Zap,
  Download, Calendar, Video, Headphones, ChevronRight, Upload,
  Twitter, Linkedin, Instagram, Facebook, Youtube,
  Smartphone, Laptop, Cloud, Database, Cpu, Target,
  BarChart3, TrendingUp, DollarSign, Rocket, Sparkles,
  Search, Tag, Palette, Heart, Eye, Filter, Layers, UserCheck,
  Moon, Sun
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// 🔁 Fade-in animation reusable
const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
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

// Floating particle background with vibrant colors
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              i % 5 === 0 ? '#3B82F6' : 
              i % 5 === 1 ? '#06b6d4' : 
              i % 5 === 2 ? '#1D4ED8' : 
              i % 5 === 3 ? '#0EA5E9' : 
              '#2563EB'
            }/20%, transparent 70%)`,
            width: Math.random() * 120 + 80 + 'px',
            height: Math.random() * 120 + 80 + 'px',
            left: Math.random() * 100 + 'vw',
            top: Math.random() * 100 + 'vh',
            scale: Math.random() * 0.6 + 0.4
          }}
          animate={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
          }}
          transition={{
            duration: Math.random() * 25 + 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

// Stats counter animation
const Counter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // 60 fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}+</span>;
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    service: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const services = [
    { 
      id: "lens-search", 
      name: "Lens Search", 
      icon: Search,
      description: "AI-powered visual search for instant product discovery",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-900/20 to-indigo-900/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-800"
    },
    { 
      id: "lens-tag", 
      name: "Lens Tag", 
      icon: Tag,
      description: "Automated product tagging and attribute extraction",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-cyan-900/20 to-blue-900/20",
      iconColor: "text-cyan-400",
      borderColor: "border-cyan-800"
    },
    { 
      id: "lens-vto", 
      name: "Lens VTO", 
      icon: Eye,
      description: "Virtual try-on solutions for enhanced shopping experience",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-indigo-900/20 to-blue-900/20",
      iconColor: "text-indigo-400",
      borderColor: "border-indigo-800"
    },
    { 
      id: "lens-recom", 
      name: "Lens Recom", 
      icon: Heart,
      description: "Intelligent product recommendations using AI algorithms",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-sky-900/20 to-blue-900/20",
      iconColor: "text-sky-400",
      borderColor: "border-sky-800"
    },
    { 
      id: "lens-personalization", 
      name: "Lens Personalization", 
      icon: UserCheck,
      description: "Personalized shopping experiences with AI insights",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-800"
    },
    { 
      id: "lens-analytics", 
      name: "Lens Analytics", 
      icon: BarChart3,
      description: "Advanced analytics and insights for business growth",
      color: "from-blue-600 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-900/20 to-indigo-900/20",
      iconColor: "text-blue-500",
      borderColor: "border-blue-800"
    }
  ];

  const contactNumbers = [
    { number: "+91 70535 17288", label: "Sales & Business", icon: Phone, color: "bg-gradient-to-r from-blue-600 to-cyan-600" },
    { number: "+91 92191 51029", label: "Technical Support", icon: Headphones, color: "bg-gradient-to-r from-blue-500 to-indigo-500" }
  ];

  const faqs = [
    {
      question: "How quickly can you implement Lens Search?",
      answer: "Lens Search implementation typically takes 2-4 weeks. We provide seamless integration with your existing e-commerce platform."
    },
    {
      question: "Do you offer custom AI model training?",
      answer: "Yes! We specialize in custom AI model training tailored to your specific product catalog and business requirements."
    },
    {
      question: "What e-commerce platforms do you support?",
      answer: "We support all major platforms including Shopify, Magento, WooCommerce, BigCommerce, and custom solutions."
    },
    {
      question: "Can I try Lens VTO before purchasing?",
      answer: "Absolutely! We offer 14-day free trials for all our Lens products. Contact us to schedule a demo."
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
        service: ""
      });
      setIsSubmitted(false);
    }, 8000);
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-blue-50 text-gray-900'} overflow-x-hidden transition-colors duration-300`}>
      <Navigation />

      {/* Theme Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-24 right-6 z-50 p-3 rounded-full ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' 
            : 'bg-white hover:bg-gray-100 text-gray-900'
        } shadow-2xl transition-all duration-300 hover:scale-110`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* 🎯 VIBRANT HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-32">
        <FloatingParticles />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute -top-40 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Revolutionizing E-commerce with AI Vision</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
            >
              Transform Your Store <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-indigo-400">
                with AI Vision
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto"
            >
              Experience the future of e-commerce with our Lens AI suite. From visual search to virtual try-on, 
              we provide cutting-edge solutions that boost engagement and drive conversions.
            </motion.p>

            {/* Animated Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12"
            >
              {[
                { label: "Stores Transformed", value: 250, suffix: "+", color: "text-blue-300" },
                { label: "Search Accuracy", value: 98, suffix: "%", color: "text-cyan-300" },
                { label: "Conversion Uplift", value: 45, suffix: "%", color: "text-sky-300" },
                { label: "Avg ROI Increase", value: 68, suffix: "%", color: "text-indigo-300" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    <Counter end={stat.value} />{stat.suffix}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📍 VIBRANT CONTACT & MAP SECTION */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Information */}
            <FadeInWhenVisible>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                    Connect with Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">AI Experts</span>
                  </h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    Ready to implement AI-powered visual commerce? Our team is here to help you 
                    integrate Lens solutions seamlessly into your e-commerce platform.
                  </p>
                </div>

                {/* Enhanced Contact Cards */}
                <div className="space-y-6">
                  {/* Address Card with Interactive Map */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className={`p-6 border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-blue-900/50 backdrop-blur-sm' 
                        : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Corporate Office</h3>
                          <p className={`leading-relaxed mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Lodha Signet, Kolshet Road<br />
                            Mumbai<br />
                            Maharashtra 400607
                          </p>
                          <a 
                            href="https://maps.google.com/?q=Lodha+Signet+Kolshet+Road+Mumbai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            View on Google Maps
                          </a>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Phone Numbers Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className={`p-6 border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-cyan-900/50 backdrop-blur-sm' 
                        : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
                          <div className="space-y-4">
                            {contactNumbers.map((contact, index) => (
                              <div key={index} className={`backdrop-blur-sm p-4 rounded-xl border transition-all duration-300 group ${
                                isDarkMode 
                                  ? 'bg-gray-700/30 border-blue-800 hover:border-blue-600' 
                                  : 'bg-white/80 border-blue-100 hover:border-blue-300'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <contact.icon className="w-4 h-4 text-blue-400" />
                                      <p className={`text-lg font-semibold group-hover:text-blue-400 transition-colors ${
                                        isDarkMode ? 'text-white' : 'text-gray-900'
                                      }`}>
                                        {contact.number}
                                      </p>
                                    </div>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {contact.label}
                                    </p>
                                  </div>
                                  <a 
                                    href={`tel:${contact.number.replace(/\s/g, '')}`}
                                    className={`px-4 py-2 ${contact.color} hover:opacity-90 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm`}
                                  >
                                    Call Now
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Email & Social Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className={`p-6 border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-sky-900/50 backdrop-blur-sm' 
                        : 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Email & Social</h3>
                            <a 
                              href="mailto:contact.bigolabs@gmail.com"
                              className="text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors inline-block mb-2"
                            >
                              contact.bigolabs@gmail.com
                            </a>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Guaranteed response within 2 hours
                            </p>
                          </div>
                          
                          <div>
                            <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Connect With Us
                            </h4>
                            <div className="flex gap-3">
                              {[
                                { icon: Twitter, label: "Twitter", color: "bg-blue-500 hover:bg-blue-600" },
                                { icon: Linkedin, label: "LinkedIn", color: "bg-blue-600 hover:bg-blue-700" },
                                { icon: Instagram, label: "Instagram", color: "bg-gradient-to-r from-blue-400 to-indigo-500 hover:opacity-90" },
                                { icon: Facebook, label: "Facebook", color: "bg-blue-700 hover:bg-blue-800" },
                                { icon: Youtube, label: "YouTube", color: "bg-blue-600 hover:bg-blue-700" }
                              ].map((social, index) => (
                                <a
                                  key={index}
                                  href="#"
                                  className={`p-3 rounded-xl ${social.color} text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg`}
                                  aria-label={social.label}
                                >
                                  <social.icon className="w-5 h-5" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Interactive Map & Quick Actions */}
            <FadeInWhenVisible delay={0.2}>
              <div className="space-y-8">
                {/* Enhanced Map Section */}
                <div className={`border-2 rounded-3xl overflow-hidden shadow-2xl ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-blue-900/50' 
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                }`}>
                  {/* Map Container with Interactive Elements */}
                  <div className="h-96 relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700">
                    {/* Animated Location Pin */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                          <MapPin className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute inset-0 border-2 border-blue-300 rounded-full animate-ping opacity-50"></div>
                        <div className="absolute inset-0 border-2 border-blue-200 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                    </motion.div>
                    
                    {/* Location Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">Lens AI Headquarters</h3>
                          <p className="text-blue-200">Kolshet Road • Mumbai • 400607</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-blue-500/80 text-white border-blue-400 backdrop-blur-sm">
                            🚇 15 min from station
                          </Badge>
                          <Badge className="bg-indigo-500/80 text-white border-indigo-400 backdrop-blur-sm">
                            🅿️ Parking available
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transportation Info */}
                  <div className={`p-6 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
                    <h3 className="text-xl font-semibold mb-4">📍 Location Highlights</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: "🚇", label: "Nearest Station", value: "Mumbai Central", time: "15 min" },
                        { icon: "🛣️", label: "Highway Access", value: "Eastern Express", time: "5 min" },
                        { icon: "✈️", label: "Airport", value: "CSMIA", time: "45 min" },
                        { icon: "🏢", label: "Business District", value: "BKC", time: "30 min" }
                      ].map((info, index) => (
                        <div key={index} className={`border rounded-xl p-3 transition-all duration-300 hover:shadow-md ${
                          isDarkMode 
                            ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500' 
                            : 'bg-white border-blue-100 hover:border-blue-300'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{info.icon}</span>
                            <span className={`text-sm font-medium ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>{info.label}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{info.value}</span>
                            <span className="text-blue-500 text-sm font-medium">{info.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a href="tel:+917053517288">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 rounded-xl py-6 group shadow-lg hover:shadow-xl transition-all duration-300">
                      <Phone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Call Sales
                    </Button>
                  </a>
                  <a href="mailto:contact.bigolabs@gmail.com">
                    <Button variant={isDarkMode ? "outline" : "default"} className={`w-full border-2 rounded-xl py-6 group shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'border-blue-500 bg-transparent text-blue-400 hover:bg-blue-500/20' 
                        : 'border-blue-500 bg-white hover:bg-blue-50 text-blue-700'
                    }`}>
                      <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Email Us
                    </Button>
                  </a>
                  <a href="#contact-form">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0 rounded-xl py-6 group shadow-lg hover:shadow-xl transition-all duration-300">
                      <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Get Demo
                    </Button>
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* 🎯 LENS SERVICES SELECTION */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600">Lens AI Solutions</span>
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Choose the Lens solution that fits your e-commerce needs
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`p-6 cursor-pointer transition-all duration-300 h-full ${
                        service.bgColor
                      } border-2 ${
                        selectedService === service.id 
                          ? `${service.borderColor} shadow-xl shadow-blue-500/30` 
                          : isDarkMode 
                            ? 'border-gray-700 hover:border-blue-800' 
                            : 'border-blue-100 hover:border-blue-300'
                      }`}
                      onClick={() => {
                        setSelectedService(service.id);
                        setFormData(prev => ({ ...prev, service: service.name }));
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{service.name}</h3>
                            {selectedService === service.id && (
                              <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">
                                Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className={`text-sm flex-1 mb-4 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-700'
                        }`}>
                          {service.description}
                        </p>
                        
                        <div className={`flex items-center justify-between mt-4 pt-4 border-t ${
                          isDarkMode ? 'border-gray-700' : 'border-blue-100'
                        }`}>
                          <span className="text-sm text-blue-400 font-medium">Learn more →</span>
                          {selectedService === service.id ? (
                            <CheckCircle className="w-5 h-5 text-blue-400" />
                          ) : (
                            <div className={`w-2 h-2 rounded-full ${service.iconColor}/50`}></div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 📝 BEAUTIFUL CONTACT FORM */}
      <section id="contact-form" className={`py-20 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-blue-50'
      }`}>
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent' 
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent'
        }`}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeInWhenVisible>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  Start Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600">AI Transformation</span>
                </h2>
                <p className={`text-lg max-w-2xl mx-auto ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Fill out the form below and our Lens AI specialists will contact you within 24 hours
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <Card className={`p-6 sm:p-8 lg:p-12 border-2 rounded-3xl shadow-2xl relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-blue-900/50 backdrop-blur-sm' 
                  : 'bg-gradient-to-br from-white to-blue-50 border-blue-100'
              }`}>
                {/* Form background gradient */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-32 translate-x-32 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20' 
                    : 'bg-gradient-to-br from-blue-200/20 to-indigo-200/20'
                }`}></div>
                <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-32 -translate-x-32 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-cyan-900/20 to-blue-900/20' 
                    : 'bg-gradient-to-br from-cyan-200/20 to-blue-200/20'
                }`}></div>
                
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                          transition={{ duration: 0.8 }}
                        >
                          <CheckCircle className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                        </motion.div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Request Submitted!</h3>
                        <div className="space-y-4 max-w-md mx-auto">
                          <p className={`text-lg ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Thank you for your interest in Lens AI solutions. Our specialist will contact you within 24 hours.
                          </p>
                          <div className={`rounded-xl p-6 border ${
                            isDarkMode 
                              ? 'bg-gray-700/50 border-blue-800' 
                              : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                          }`}>
                            <p className="text-blue-400 font-medium mb-3">What's Next:</p>
                            <ul className={`text-sm space-y-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-400" />
                                Initial consultation call
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-400" />
                                Custom solution proposal
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-400" />
                                Free pilot implementation
                              </li>
                            </ul>
                          </div>
                        </div>
                        <Button 
                          onClick={() => setIsSubmitted(false)}
                          className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 rounded-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Submit Another Request
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                      >
                        {/* Service Selection Summary */}
                        {selectedService && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`rounded-xl p-4 border-2 ${
                              isDarkMode 
                                ? 'bg-gray-700/30 border-blue-800' 
                                : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                                  <Target className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm text-blue-400">Selected Solution</p>
                                  <p className={`font-medium ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {services.find(s => s.id === selectedService)?.name}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setSelectedService("")}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                              >
                                Change
                              </button>
                            </div>
                          </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              First Name *
                            </label>
                            <Input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className={`w-full border-2 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 hover:border-blue-600 focus:border-blue-500 text-white' 
                                  : 'bg-white border-blue-100 hover:border-blue-300 focus:border-blue-500 text-gray-900'
                              }`}
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Last Name *
                            </label>
                            <Input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className={`w-full border-2 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 hover:border-blue-600 focus:border-blue-500 text-white' 
                                  : 'bg-white border-blue-100 hover:border-blue-300 focus:border-blue-500 text-gray-900'
                              }`}
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className={`w-full border-2 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 hover:border-blue-600 focus:border-blue-500 text-white' 
                                  : 'bg-white border-blue-100 hover:border-blue-300 focus:border-blue-500 text-gray-900'
                              }`}
                              placeholder="john@company.com"
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Phone Number *
                            </label>
                            <Input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className={`w-full border-2 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 hover:border-blue-600 focus:border-blue-500 text-white' 
                                  : 'bg-white border-blue-100 hover:border-blue-300 focus:border-blue-500 text-gray-900'
                              }`}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Company Name *
                            </label>
                            <Input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              required
                              className={`w-full border-2 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 hover:border-blue-600 focus:border-blue-500 text-white' 
                                  : 'bg-white border-blue-100 hover:border-blue-300 focus:border-blue-500 text-gray-900'
                              }`}
                              placeholder="Your Company Inc."
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              Subject *
                            </label>
                            <Input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className={`w-full border-2 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 hover:border-blue-600 focus:border-blue-500 text-white' 
                                  : 'bg-white border-blue-100 hover:border-blue-300 focus:border-blue-500 text-gray-900'
                              }`}
                              placeholder="How can we help you?"
                            />
                          </div>
                        </div>

                        {/* Service Selection Dropdown */}
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Interested In (Optional)
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 hover:border-blue-600 focus:border-blue-500 text-white' 
                                : 'bg-white border-blue-100 hover:border-blue-300 focus:border-blue-500 text-gray-900'
                            }`}
                          >
                            <option value="">Select a Lens AI Solution</option>
                            {services.map((service) => (
                              <option key={service.id} value={service.name}>
                                {service.name} - {service.description}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Your Message *
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className={`w-full border-2 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors resize-none ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 hover:border-blue-600 focus:border-blue-500 text-white' 
                                : 'bg-white border-blue-100 hover:border-blue-300 focus:border-blue-500 text-gray-900'
                            }`}
                            placeholder="Tell us about your e-commerce challenges and goals..."
                          />
                        </div>

                        {/* File Upload */}
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Attachments (Optional)
                          </label>
                          <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors hover:bg-blue-500/5 ${
                            isDarkMode 
                              ? 'border-blue-800 hover:border-blue-600' 
                              : 'border-blue-200 hover:border-blue-400'
                          }`}>
                            <div className="flex flex-col items-center">
                              <Download className={`w-12 h-12 mb-4 ${
                                isDarkMode ? 'text-blue-500' : 'text-blue-400'
                              }`} />
                              <p className={`mb-2 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                <span className="font-medium">Click to upload</span> or drag and drop
                              </p>
                              <p className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                PDF, DOC, PPT, images up to 10MB
                              </p>
                              <Input
                                type="file"
                                className="hidden"
                                id="file-upload"
                                multiple
                              />
                              <label
                                htmlFor="file-upload"
                                className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors cursor-pointer ${
                                  isDarkMode 
                                    ? 'bg-blue-900/30 text-blue-400' 
                                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                }`}
                              >
                                <Upload className="w-4 h-4" />
                                Browse Files
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Consent Checkbox */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="consent"
                            required
                            className={`mt-1 w-4 h-4 rounded focus:ring-2 focus:ring-blue-500 ${
                              isDarkMode 
                                ? 'text-blue-500 bg-gray-700 border-gray-600' 
                                : 'text-blue-600 bg-gray-100 border-gray-300'
                            }`}
                          />
                          <label htmlFor="consent" className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            I agree to receive communications about Lens AI solutions and services. 
                            Your data is protected by our{' '}
                            <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                              Privacy Policy
                            </a>.
                          </label>
                        </div>

                        <div className="pt-4">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white text-lg font-semibold border-0 rounded-xl py-6 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center gap-3">
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing Request...
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-3">
                                <span>Submit Request</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                          </Button>
                          <p className={`text-center text-sm mt-4 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            We'll get back to you within 24 hours
                          </p>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">Questions</span>
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Everything you need to know about Lens AI implementation
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      activeFAQ === index 
                        ? isDarkMode 
                          ? 'bg-gray-800/50 border-blue-700 backdrop-blur-sm' 
                          : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300' 
                        : isDarkMode 
                          ? 'bg-gray-800/30 border-gray-700 hover:border-blue-700 hover:bg-gray-800/50' 
                          : 'bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md'
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          activeFAQ === index 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                            : isDarkMode 
                              ? 'bg-blue-900/50' 
                              : 'bg-blue-100'
                        }`}>
                          <MessageCircle className={`w-5 h-5 ${
                            activeFAQ === index ? 'text-white' : 'text-blue-500'
                          }`} />
                        </div>
                        <h3 className={`text-lg font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className={`w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {activeFAQ === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className={`mt-4 pt-4 border-t ${
                            isDarkMode ? 'border-gray-700' : 'border-blue-100'
                          }`}>
                            <p className={`leading-relaxed ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {faq.answer}
                            </p>
                            {index === 0 && (
                              <div className={`mt-4 p-3 rounded-lg border ${
                                isDarkMode 
                                  ? 'bg-blue-900/20 border-blue-800' 
                                  : 'bg-blue-50 border-blue-200'
                              }`}>
                                <p className={`text-sm ${
                                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                                }`}>
                                  <span className="font-medium">Quick Start:</span> Basic implementation can be completed in as little as 7 days.
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>

          {/* Additional Help */}
          <FadeInWhenVisible delay={0.4}>
            <div className="text-center mt-12">
              <div className={`inline-flex items-center gap-3 rounded-2xl px-8 py-6 border ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-blue-800' 
                  : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'
              }`}>
                <Headphones className="w-8 h-8 text-blue-500" />
                <div className="text-left">
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Still have questions?</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Call our support team at{' '}
                    <a href="tel:+919219151029" className="text-blue-400 hover:text-blue-300 font-medium">
                      +91 92191 51029
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 📞 FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                <Zap className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">Ready to Transform Your E-commerce?</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
                Start Your AI Journey
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-indigo-400">
                  Today
                </span>
              </h2>

              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Join 250+ e-commerce businesses that have transformed their customer experience with Lens AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 border-0 rounded-xl px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  <Video className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Book a Live Demo
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Download Case Studies
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: Clock,
                    title: "24/7 Support",
                    description: "Round-the-clock technical assistance"
                  },
                  {
                    icon: Shield,
                    title: "Data Security",
                    description: "Enterprise-grade encryption & compliance"
                  },
                  {
                    icon: TrendingUp,
                    title: "Proven Results",
                    description: "45% average conversion uplift"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;