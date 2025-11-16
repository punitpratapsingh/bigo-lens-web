import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Tags, Eye, ShoppingBag, Layers, Zap, Gem, Home, Shirt, BarChart3, Play, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Import your image
import taggingImage from "@/assets/tagging.png";

// Mouse Tilt Card Component
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stack Cards Component with Auto-timer
const StackCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const stackData = [
    {
      title: "Automated Tagging",
      description: "AI automatically generates accurate product tags",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Quality Control",
      description: "Human-in-the-loop validation for perfect accuracy",
      icon: <Eye className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Real-time Updates",
      description: "Instant tagging for new products as they're added",
      icon: <Zap className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Multi-language",
      description: "Automatic translation for global catalogs",
      icon: <Tags className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Auto-rotate timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stackData.length);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(timer);
  }, [stackData.length]);

  return (
    <div className="relative h-80 w-64 mx-auto">
      {stackData.map((card, index) => {
        const position = index - currentIndex;
        const isActive = position === 0;
        const isNext = position === 1;
        const isPrevious = position === -1;
        
        return (
          <motion.div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm cursor-pointer`}
            initial={false}
            animate={{
              scale: isActive ? 1 : isNext ? 0.9 : isPrevious ? 0.9 : 0.8,
              rotate: isActive ? 0 : isNext ? -5 : isPrevious ? 5 : 0,
              x: isActive ? 0 : isNext ? 60 : isPrevious ? -60 : 0,
              y: isActive ? 0 : isNext ? -20 : isPrevious ? -20 : 0,
              zIndex: isActive ? 30 : isNext ? 20 : isPrevious ? 20 : 10,
              opacity: Math.abs(position) > 2 ? 0 : 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => setCurrentIndex(index)}
          >
            <div className="text-white h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {card.icon}
                </div>
                <div className="text-white/60 text-sm">
                  {index + 1}/{stackData.length}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{card.description}</p>
              </div>
              
              <div className="flex justify-center space-x-1">
                {stackData.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(dotIndex);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      dotIndex === index ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function AITagging() {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const industries = [
    {
      name: "Fashion & Apparel",
      icon: <Shirt className="w-8 h-8" />,
      tags: ["Color Analysis", "Fit & Style", "Material", "Pattern", "Seasonal"],
      benefits: ["98% accuracy in color detection", "45% faster catalog processing", "Improved search relevance"]
    },
    {
      name: "Jewelry & Accessories",
      icon: <Gem className="w-8 h-8" />,
      tags: ["Gemstone ID", "Metal Type", "Design Pattern", "Style Class"],
      benefits: ["Precise gemstone categorization", "Metal purity detection", "Design style matching"]
    },
    {
      name: "Home Decor",
      icon: <Home className="w-8 h-8" />,
      tags: ["Material", "Style", "Color Palette", "Room Type"],
      benefits: ["Material texture analysis", "Interior style matching", "Color coordination"]
    }
  ];

  // Fixed fadeUp variants with proper TypeScript types
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const 
      } 
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white min-h-screen">
      <Navigation />
      
      {/* 🌟 Enhanced Hero Section */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">AI-Powered Tagging</span>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 leading-tight"
            >
              AI Tagging & Merchandising
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Drive efficiency and enrich your catalog with automatic AI-powered product tagging that enhances search, navigation, and merchandising performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-6 flex-wrap"
            >
              <Link to="/book-demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl flex items-center gap-2 shadow-2xl"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🎴 Interactive Features Section with Tilt Cards Only */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200"
          >
            Interactive Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tilt Card 1 */}
            <TiltCard>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-80 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Tags className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Smart Tagging</h3>
                  <p className="text-blue-200 leading-relaxed">AI analyzes product images and descriptions to generate accurate tags automatically</p>
                </div>
                <div className="text-center text-cyan-400 text-sm font-semibold">
                  95% Accuracy Rate
                </div>
              </div>
            </TiltCard>

            {/* Tilt Card 2 */}
            <TiltCard>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-80 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Analytics</h3>
                  <p className="text-blue-200 leading-relaxed">Comprehensive performance metrics and real-time dashboard for tag performance</p>
                </div>
                <div className="text-center text-blue-400 text-sm font-semibold">
                  Live Dashboard Available
                </div>
              </div>
            </TiltCard>

            {/* Tilt Card 3 */}
            <TiltCard>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-80 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Integration</h3>
                  <p className="text-blue-200 leading-relaxed">Seamless integration with major e-commerce platforms and REST API support</p>
                </div>
                <div className="text-center text-indigo-400 text-sm font-semibold">
                  Setup in 15 minutes
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 🃏 Stack Cards Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 to-blue-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200"
          >
            How It Works?
          </motion.h2>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-xl text-blue-200 text-center mb-20 max-w-2xl mx-auto"
          >
            Our streamlined process automates product tagging while maintaining exceptional accuracy
          </motion.p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Stack Cards */}
            <div>
              <StackCards />
            </div>
            
            {/* Right side - Colored Tags */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="space-y-7"
            >
              <h4 className="text-2xl font-bold text-white mb-5">AI-Generated Tags</h4>
              
              <div className="space-y-3">
                {[
                  { category: "Visual Attributes", tags: ["Color Analysis", "Pattern Recognition", "Texture Detection", "Style Classification"], color: "from-cyan-500 to-blue-500" },
                  { category: "Product Details", tags: ["Material Composition", "Size & Fit", "Brand Identification", "Seasonal Relevance"], color: "from-blue-500 to-indigo-500" },
                  { category: "Contextual Tags", tags: ["Occasion Type", "Target Audience", "Price Range", "Sustainability"], color: "from-indigo-500 to-purple-500" },
                  { category: "Technical Attributes", tags: ["Care Instructions", "Country of Origin", "Certifications", "Compliance Standards"], color: "from-purple-500 to-pink-500" }
                ].map((group, groupIndex) => (
                  <motion.div
                    key={groupIndex}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIndex * 0.1 }}
                    className="p-6 bg-white/4 rounded-xl border border-white/7 hover:border-cyan-500/30 transition-all"
                  >
                    <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${group.color}`}></div>
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className={`px-3 py-2 rounded-full text-sm font-medium border backdrop-blur-sm ${
                            groupIndex === 0 
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                              : groupIndex === 1
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                              : groupIndex === 2
                              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                              : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 💎 Industry Applications with Tilt Cards */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200"
          >
            Industry Applications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <TiltCard key={index}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  variants={staggerVariants}
                  className={`bg-white/5 backdrop-blur-md border rounded-2xl p-6 h-96 cursor-pointer transition-all duration-300 ${
                    selectedIndustry === index 
                      ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/20' 
                      : 'border-white/10 hover:border-cyan-500/30'
                  }`}
                  onClick={() => setSelectedIndustry(index)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{industry.name}</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-3">AI Tags Generated:</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs border border-cyan-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-green-400 font-semibold mb-3">Key Benefits:</h4>
                      <ul className="space-y-3">
                        {industry.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-blue-200 flex items-start gap-2 leading-relaxed">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Enhanced CTA Section with Image */}
      <section className="py-32 bg-gradient-to-br from-cyan-900/40 to-blue-900/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-100">Get Started Today</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                Ready to Transform Your Catalog?
              </h2>
              
              <p className="text-blue-200 text-xl mb-8 leading-relaxed">
                Join thousands of retailers using AI-powered tagging to boost efficiency and drive sales. 
                Our intelligent system automatically enriches your product data with accurate, searchable tags.
              </p>

              <p className="text-cyan-200 mb-12 text-sm">
                • 95% tagging accuracy<br/>
                • 78% reduction in manual work<br/>
                • Real-time processing<br/>
                • Multi-language support
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link to="/demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl flex items-center gap-2 shadow-2xl"
                  >
                    <Play className="w-5 h-5" />
                    Watch Live Demo
                  </motion.button>
                </Link>
                
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    Start Free Trial
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30"
              >
                <img 
                  src={taggingImage} 
                  alt="AI Tagging Dashboard" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent rounded-2xl"></div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute top-6 left-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🚀 Live Preview
                </motion.div>
                
                <motion.div
                  className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">95%</div>
                    <div className="text-xs text-blue-200">Accuracy</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Background glow */}
              <div className="absolute -inset-4 bg-cyan-500/20 rounded-2xl blur-xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}