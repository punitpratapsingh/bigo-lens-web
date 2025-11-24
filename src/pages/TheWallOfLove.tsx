import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, Quote, Sparkles, Zap, Heart, ExternalLink } from "lucide-react";

/* -------------------------
   Data Types
------------------------- */

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  review: string;
  photo?: string;
  logo?: string;
  rating?: number;
  sentiment?: "excellent" | "very-good" | "good" | "positive";
};

/* -------------------------
   Sentiment Heatmap Component
------------------------- */

const SentimentHeatmap: React.FC<{ sentiment: Testimonial["sentiment"] }> = ({ sentiment }) => {
  const getColor = () => {
    switch (sentiment) {
      case "excellent": return "from-green-400 to-emerald-600";
      case "very-good": return "from-cyan-400 to-blue-500";
      case "good": return "from-purple-400 to-indigo-500";
      case "positive": return "from-pink-400 to-rose-500";
      default: return "from-cyan-400 to-purple-500";
    }
  };

  const getEmoji = () => {
    switch (sentiment) {
      case "excellent": return "🤩";
      case "very-good": return "😊";
      case "good": return "🙂";
      case "positive": return "😄";
      default: return "👍";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="flex items-center gap-2"
    >
      <span className="text-2xl">{getEmoji()}</span>
      <div className={`w-16 h-2 rounded-full bg-gradient-to-r ${getColor()} shadow-lg`} />
    </motion.div>
  );
};

/* -------------------------
   Testimonial Content - Shortened Reviews with Sentiment
------------------------- */

const TESTIMONIALS: Testimonial[] = [
  {
    id: "client-1",
    name: "Shayley Reynolds",
    role: "CEO & Founder",
    company: "Artifex Casa",
    email: "shayley@artifexcasa.com",
    photo: "/src/assets/ClientCompanyOwners/o1.png",
    logo: "/src/assets/CompanyLogo/cp1.png",
    rating: 5,
    sentiment: "excellent",
    review: "BigOlens transformed our ecommerce with AI! Product Discovery boosted conversions by 45% and Automatic Tagging saved hundreds of hours. Hyper-Personalization creates unique shopping journeys for every customer."
  },
  {
    id: "client-2",
    name: "Sarah Ronald",
    role: "CTO",
    company: "Cart Pulse",
    email: "sarah@cartpulse.com",
    photo: "/src/assets/ClientCompanyOwners/o2.png",
    logo: "/src/assets/CompanyLogo/cp2.png",
    rating: 4.5,
    sentiment: "very-good",
    review: "Description Generation revolutionized our catalog management! Multi-Object Classification handles complex inventory perfectly. Virtual Try-On cut returns by 30%. Seamless integration exceeded expectations."
  },
  {
    id: "client-3",
    name: "Shivin Sharma",
    role: "Product Director",
    company: "Gadget Flow",
    email: "shivin@gadgetflow.com",
    photo: "/src/assets/ClientCompanyOwners/o3.png",
    logo: "/src/assets/CompanyLogo/cp3.png",
    rating: 5,
    sentiment: "excellent",
    review: "Product Recommendation engine transformed customer engagement! AI analytics provide deep behavioral insights. Hyper-Personalization increased average order value by 28%. Image to Video boosted engagement."
  },
  {
    id: "client-4",
    name: "Sneha Tomar",
    role: "Head of Digital",
    company: "Logic Lens",
    email: "sneha@logiclens.ai",
    photo: "/src/assets/ClientCompanyOwners/o4.png",
    logo: "/src/assets/CompanyLogo/cp4.png",
    rating: 5,
    sentiment: "excellent",
    review: "Virtual Try-On reduced returns by 40%! Product Discovery AI understands customer intent perfectly. Automatic Tagging streamlined inventory management. AI descriptions drive organic traffic growth."
  },
  {
    id: "client-5",
    name: "Jaya Mishra",
    role: "Managing Partner",
    company: "Cortex Flow",
    email: "jaya@cortexflow.ai.vc",
    photo: "/src/assets/ClientCompanyOwners/o5.png",
    logo: "/src/assets/CompanyLogo/cp5.png",
    rating: 4.5,
    sentiment: "very-good",
    review: "Multi-Object Classification revolutionized our catalog management! Product Recommendation drives 35% of revenue. Hyper-Personalization doubled customer retention. Deep insights into customer preferences."
  },
  {
    id: "client-6",
    name: "Michel Patterson",
    role: "COO",
    company: "Nestful Homes",
    email: "michel@nestful.com",
    photo: "/src/assets/ClientCompanyOwners/o6.png",
    logo: "/src/assets/CompanyLogo/cp6.png",
    rating: 4,
    sentiment: "good",
    review: "Automatic Tagging streamlined operations significantly! Manual review eliminated for thousands of products. Product Discovery improved search success rates. Description Generation maintains brand voice perfectly."
  },
  {
    id: "client-7",
    name: "Radhika Merchant",
    role: "Technical Director",
    company: "Urban Vogue",
    email: "radhika@urbanvogue.com",
    photo: "/src/assets/ClientCompanyOwners/o7.png",
    logo: "/src/assets/CompanyLogo/cp7.png",
    rating: 5,
    sentiment: "excellent",
    review: "Hyper-Personalization increased conversions by 52%! Product Recommendation understands preferences perfectly. Virtual Try-On is our most talked-about feature. Image to Video keeps customers engaged longer."
  },
  {
    id: "client-8",
    name: "Shivin Kirar",
    role: "CEO",
    company: "Pure Glow Skincare",
    email: "shivin@pureglow.in",
    photo: "/src/assets/ClientCompanyOwners/o8.png",
    logo: "/src/assets/CompanyLogo/cp8.png",
    rating: 5,
    sentiment: "excellent",
    review: "Product Discovery transformed customer interactions! AI understands eco-friendly materials perfectly. Description Generation maintains environmental messaging. Virtual Try-On reduced returns significantly."
  },
  {
    id: "client-9",
    name: "Michael Zhang",
    role: "Founder & CPO",
    company: "Data Sphere",
    email: "michael@datasphere.com",
    photo: "/src/assets/ClientCompanyOwners/o9.png",
    logo: "/src/assets/CompanyLogo/cp9.png",
    rating: 4,
    sentiment: "good",
    review: "Multi-Object Classification organized our complex catalog perfectly! Product Recommendation increased cross-selling by 40%. Analytics provide clear feature insights. Description Generation maintains compliance."
  },
  {
    id: "client-10",
    name: "James Martinez",
    role: "Product Manager",
    company: "Fit Fuel Plus",
    email: "james@fitfuelplus.com",
    photo: "/src/assets/ClientCompanyOwners/o10.png",
    logo: "/src/assets/CompanyLogo/cp10.png",
    rating: 5,
    sentiment: "excellent",
    review: "Virtual Try-On revolutionized healthcare product experience! Image to Video shows devices in action. Product Discovery understands medical terminology. Automatic Tagging ensures proper categorization."
  },
  {
    id: "client-11",
    name: "Shivam Pratap Singh",
    role: "CTO",
    company: "Nexus Core",
    email: "shivam@nexuscore.com",
    photo: "/src/assets/ClientCompanyOwners/o11.png",
    logo: "/src/assets/CompanyLogo/cp11.png",
    rating: 5,
    sentiment: "excellent",
    review: "AI services automated our entire workflow! Automatic Tagging processes thousands weekly. Description Generation creates compelling copy. Product Recommendation increased order value by 35%."
  },
  {
    id: "client-12",
    name: "Sadhna Deshmukh",
    role: "Innovation Director",
    company: "Tiny Treasures",
    email: "sadhna@tinytreasures.com",
    photo: "/src/assets/ClientCompanyOwners/o12.png",
    logo: "/src/assets/CompanyLogo/cp12.png",
    rating: 4,
    sentiment: "good",
    review: "Hyper-Personalization creates unique shopping experiences! Product Discovery understands vague queries perfectly. Automatic Tagging eliminated manual work. Image to Video makes pages more engaging."
  },
  {
    id: "client-13",
    name: "Emily Wilson",
    role: "CEO",
    company: "Synapse AI",
    email: "emily@synapseai.com",
    photo: "/src/assets/ClientCompanyOwners/o13.png",
    logo: "/src/assets/CompanyLogo/cp13.png",
    rating: 5,
    sentiment: "excellent",
    review: "Multi-Object Classification organized security products perfectly! Product Recommendation suggests compatible systems. Virtual Try-On helps customers visualize placements. Analytics reveal important feature preferences."
  },
  {
    id: "client-14",
    name: "Olivia Garcia",
    role: "Product Head",
    company: "Circuit Core",
    email: "olivia@circuitcore.com",
    photo: "/src/assets/ClientCompanyOwners/o14.png",
    logo: "/src/assets/CompanyLogo/cp14.png",
    rating: 5,
    sentiment: "excellent",
    review: "Product Discovery transformed educational material finding! AI understands concepts perfectly. Description Generation helps educators decide. Hyper-Personalization recommends based on teaching styles."
  },
  {
    id: "client-15",
    name: "Sarika Verma",
    role: "Managing Director",
    company: "Bloom Living",
    email: "sarika@bloomliving.com",
    photo: "/src/assets/ClientCompanyOwners/o15.png",
    logo: "/src/assets/CompanyLogo/cp15.png",
    rating: 4,
    sentiment: "good",
    review: "AI services streamlined industrial equipment platform! Multi-Object Classification categorizes machinery precisely. Product Discovery finds specialized equipment. Analytics provide valuable trend insights."
  },
  {
    id: "client-16",
    name: "Sophia Anderson",
    role: "CEO",
    company: "Stack Forge",
    email: "sophia@stackforge.com",
    photo: "/src/assets/ClientCompanyOwners/o16.png",
    logo: "/src/assets/CompanyLogo/cp16.png",
    rating: 5,
    sentiment: "excellent",
    review: "Virtual Try-On revolutionized creative product experience! Image to Video showcases products dynamically. Product Discovery understands artistic intent. Hyper-Personalization recommends based on style."
  },
  {
    id: "client-17",
    name: "Ethan Parker",
    role: "Technical Lead",
    company: "Vision Grid",
    email: "ethan@visiongrid.com",
    photo: "/src/assets/ClientCompanyOwners/o17.png",
    logo: "/src/assets/CompanyLogo/cp17.png",
    rating: 5,
    sentiment: "excellent",
    review: "Product Recommendation provides incredible blockchain insights! Multi-Object Classification organizes services perfectly. Description Generation explains complex concepts clearly. Hyper-Personalization delivers custom solutions."
  },
  {
    id: "client-18",
    name: "Santosh Kaur",
    role: "COO",
    company: "Style Sphere",
    email: "santosh@stylesphere.com",
    photo: "/src/assets/ClientCompanyOwners/o18.png",
    logo: "/src/assets/CompanyLogo/cp18.png",
    rating: 4,
    sentiment: "good",
    review: "Virtual Try-On transformed property viewing experience! Image to Video creates dynamic tours. Product Discovery finds perfect matches. Automatic Tagging categorizes features accurately."
  },
  {
    id: "client-19",
    name: "Alexander Wright",
    role: "Chief AI Officer",
    company: "Performetix Tech",
    email: "alex@performetixtech.com",
    photo: "/src/assets/ClientCompanyOwners/o19.png",
    logo: "/src/assets/CompanyLogo/cp19.png",
    rating: 5,
    sentiment: "excellent",
    review: "As an AI company, we're blown away! Multi-Object Classification handles complex relationships. Product Recommendation adapts to user behavior. Hyper-Personalization feels genuinely personal."
  },
  {
    id: "client-20",
    name: "Mia Roberts",
    role: "Product Director",
    company: "Aether AI",
    email: "mia@aether.ai",
    photo: "/src/assets/ClientCompanyOwners/o20.png",
    logo: "/src/assets/CompanyLogo/cp20.png",
    rating: 5,
    sentiment: "excellent",
    review: "Hyper-Personalization creates individually crafted experiences! Product Discovery understands social context perfectly. Automatic Tagging organizes user content. Product Recommendation drives 45% of revenue."
  },
  {
    id: "client-21",
    name: "Benjamin Scott",
    role: "CTO",
    company: "Shop Vista",
    email: "benjamin@shopvista.com",
    photo: "/src/assets/ClientCompanyOwners/o21.png",
    logo: "/src/assets/CompanyLogo/cp21.png",
    rating: 4,
    sentiment: "good",
    review: "Automatic Tagging revolutionized parts catalog management! AI understands technical specifications perfectly. Product Discovery finds specialized parts. Description Generation saves engineering time."
  },
  {
    id: "client-22",
    name: "Charlotte Evans",
    role: "CEO",
    company: "Artisan Haus",
    email: "charlotte@artisanhaus.com",
    photo: "/src/assets/ClientCompanyOwners/o22.png",
    logo: "/src/assets/CompanyLogo/cp22.png",
    rating: 5,
    sentiment: "excellent",
    review: "Virtual Try-On transformed wellness product confidence! Hyper-Personalization recommends based on health goals. Product Discovery understands wellness terminology. Analytics reveal emerging trends early."
  },
  {
    id: "client-23",
    name: "Amanda Baker",
    role: "Tech Director",
    company: "Quantum Sight",
    email: "amanda@quantumsight.com",
    photo: "/src/assets/ClientCompanyOwners/o23.png",
    logo: "/src/assets/CompanyLogo/cp23.png",
    rating: 5,
    sentiment: "excellent",
    review: "Product Recommendation provides deep energy insights! AI understands efficiency metrics perfectly. Multi-Object Classification organizes technical products. Virtual Try-On visualizes installations."
  },
  {
    id: "client-24",
    name: "Amelia Green",
    role: "Digital Head",
    company: "Tech Nest",
    email: "amelia@technest.com",
    photo: "/src/assets/ClientCompanyOwners/o24.png",
    logo: "/src/assets/CompanyLogo/cp24.png",
    rating: 4,
    sentiment: "good",
    review: "Virtual Try-On revolutionized fashion ecommerce! Image to Video showcases garments dynamically. Product Discovery understands style preferences. Automatic Tagging categorizes accurately."
  },
  {
    id: "client-25",
    name: "Tarun Upadhyay",
    role: "Analytics Officer",
    company: "Thread Craft",
    email: "tarun@threadcraft",
    photo: "/src/assets/ClientCompanyOwners/o25.png",
    logo: "/src/assets/CompanyLogo/cp25.png",
    rating: 5,
    sentiment: "excellent",
    review: "Analytics transformed sports equipment platform! AI understands athletic requirements perfectly. Multi-Object Classification organizes gear precisely. Virtual Try-On visualizes equipment use."
  },
  {
    id: "client-26",
    name: "Harper Adams",
    role: "CEO",
    company: "Verita Systems",
    email: "harper@veritasystems.com",
    photo: "/src/assets/ClientCompanyOwners/o26.png",
    logo: "/src/assets/CompanyLogo/cp26.png",
    rating: 5,
    sentiment: "excellent",
    review: "Hyper-Personalization creates curated travel experiences! Product Discovery understands preferences perfectly. Automatic Tagging categorizes travel styles. Image to Video creates immersive experiences."
  },
  {
    id: "client-27",
    name: "Jacob White",
    role: "CTO",
    company: "Pataran Technologies",
    email: "jacob@patarantechnologies.com",
    photo: "/src/assets/ClientCompanyOwners/o27.png",
    logo: "/src/assets/CompanyLogo/cp27.png",
    rating: 4,
    sentiment: "good",
    review: "Image to Video enhanced media equipment platform significantly! AI transforms images into engaging demos. Automatic Tagging organizes gear accurately. Product Discovery finds perfect equipment."
  }
];

/* -------------------------
   Animated Stars Component
------------------------- */

const AnimatedStarRow: React.FC<{ rating?: number }> = ({ rating = 5 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  
  return (
    <div className="inline-flex items-center gap-1" aria-hidden>
      {stars.map((on, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.2, rotate: 15 }}
        >
          <Star
            className={`w-5 h-5 drop-shadow-lg ${
              on ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

/* -------------------------
   Floating Background Elements
------------------------- */

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-600/15 rounded-full blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

/* -------------------------
   Animated Testimonial Card
------------------------- */

const AnimatedCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Main Card */}
      <motion.div
        className="relative bg-gradient-to-br from-slate-900/80 to-purple-900/60 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 shadow-2xl cursor-pointer transform-gpu"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          animate={{
            background: [
              "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)",
              "linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)",
              "linear-gradient(225deg, #8b5cf6, #06b6d4, #ec4899)",
              "linear-gradient(315deg, #06b6d4, #ec4899, #8b5cf6)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-2xl bg-slate-900 overflow-hidden">
                    {testimonial.photo ? (
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </div>
                </div>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-400 fill-current" />
                </motion.div>
              </motion.div>
              
              <div className="flex-1">
                <motion.h3 
                  className="text-xl font-bold text-white mb-1"
                  whileHover={{ x: 5 }}
                >
                  {testimonial.name}
                </motion.h3>
                <p className="text-cyan-300 text-sm mb-1">{testimonial.role}</p>
                <p className="text-purple-300 text-xs font-medium">{testimonial.company}</p>
              </div>
            </div>
            
            {/* Company Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-12 bg-transparent rounded-xl p-1"
            >
              {testimonial.logo && (
                <img
                  src={testimonial.logo}
                  alt={testimonial.company}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
          </div>
          
          {/* Review Text - Shorter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mb-4"
          >
            <Quote className="absolute -top-2 -left-2 w-6 h-6 text-cyan-400/30 rotate-180" />
            <p className="text-cyan-50 text-sm leading-relaxed pl-4 min-h-[80px]">
              {testimonial.review}
            </p>
            <Quote className="absolute -bottom-2 -right-2 w-6 h-6 text-purple-400/30" />
          </motion.div>
          
          {/* Sentiment & Rating Row */}
          <motion.div 
            className="flex items-center justify-between mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatedStarRow rating={testimonial.rating} />
            <SentimentHeatmap sentiment={testimonial.sentiment} />
          </motion.div>
          
          {/* Footer - BigOlens Client Section */}
          <motion.div 
            className="flex items-center justify-between pt-3 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 text-xs text-cyan-300/70 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30"
            >
              <Heart className="w-3 h-3 fill-current" />
              BigOlens Client
            </motion.div>
            
            <div className="text-xs text-cyan-300/50">
              {testimonial.rating}/5
            </div>
          </motion.div>
        </div>
        
        {/* Hover Effect Particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.1,
                    repeat: Infinity 
                  }}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* -------------------------
   Main Component
------------------------- */

export default function TheWallOfLove(): JSX.Element {
  const testimonials = useMemo(() => TESTIMONIALS, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-cyan-900 text-slate-200 relative overflow-hidden">
      <FloatingShapes />
      
      <Navigation />

      {/* HEADER - EXACT CONTENT PRESERVED */}
      <motion.header 
        className="py-20 px-6 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-10 h-10 text-cyan-400 fill-current" />
            </motion.div>
            <span className="text-cyan-400 font-semibold text-xl">BIGOLENS AI SUCCESS STORIES</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h1>

          <motion.p 
            className="text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover how <span className="text-cyan-400 font-bold">leading E-Commerce companies</span>{" "}
            transformed their businesses with BigOlens AI services including Product Discovery, Virtual Try-On, Hyper-Personalization, and Advanced Analytics.
          </motion.p>
        </div>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {/* Testimonials Grid */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.section>

        {/* CTA SECTION */}
        <motion.section 
          className="mt-16 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Ready for Your Success Story?
            </motion.h2>
            
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join these happy clients and transform your ecommerce with BigOlens AI magic!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all group">
                  Start AI Transformation
                  <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="px-8 py-4 border-cyan-400 text-cyan-400 font-bold text-lg hover:bg-cyan-400/10 backdrop-blur-sm"
                >
                  View Services
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}