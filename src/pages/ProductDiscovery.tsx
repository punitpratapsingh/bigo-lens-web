import { motion } from "framer-motion";
import { ChevronDown, Eye, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import visualImg from "@/assets/visual.png";
import searchImg from "@/assets/search.png";

const faqs = [
  {
    q: "What are searchable attributes in product discovery?",
    a: "Searchable attributes are AI-generated tags describing key visual or contextual product aspects — color, texture, or style — enabling natural, accurate search.",
  },
  {
    q: "How does BigO AI use AI for data enrichment?",
    a: "BigO AI extracts 30,000+ structured and semantic attributes from product data and images, aligning with how shoppers describe products.",
  },
  {
    q: "Can it integrate with my existing platform?",
    a: "Yes. BigO integrates seamlessly via REST APIs or plug-ins for Shopify, Magento, and enterprise systems.",
  },
  {
    q: "What's the benefit of AI-generated tags?",
    a: "They boost discoverability, SEO performance, recommendation quality, and conversion rates.",
  },
  {
    q: "How fast can integration be done?",
    a: "Typically within 5–10 days, depending on catalog size and platform complexity.",
  },
];

export default function ProductDiscovery() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="bg-[#0E0E10] text-[#F7E6CA] overflow-hidden">
      <Navigation />
      {/* 🎯 Hero Section with Image Split */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-24 overflow-hidden bg-gradient-to-b from-[#101014] to-[#0E0E10]">
        {/* Background Glows */}
        <div className="absolute -top-32 -left-40 w-[400px] h-[400px] bg-[#4EA8FF33] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#89C2FF22] rounded-full blur-[100px]" />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left relative z-10"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] bg-clip-text text-transparent"
          >
            Transform Product Discovery <br /> with AI-Powered Attributes
          </motion.h1>

          <p className="text-[#D1D5DB] text-lg max-w-xl mb-8">
            Empower your eCommerce with BigO AI — turning unstructured product data into
            intelligent searchable attributes that boost visibility and conversions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/book-demo"
              className="bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] text-[#0E0E10] px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Book a Demo
            </Link>
            <Link
              to="/case-studies"
              className="border border-[#4EA8FF]/40 px-8 py-3 rounded-full font-semibold text-[#89C2FF] hover:bg-[#4EA8FF22] transition"
            >
              View Case Studies
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 mt-10 md:mt-0 relative flex justify-center"
        >
          <motion.img
            src={visualImg}
            alt="AI Product Discovery Visualization"
            className="w-[85%] md:w-[90%] drop-shadow-[0_0_40px_#4EA8FF55] rounded-2xl"
            whileHover={{ scale: 1.02 }}
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -bottom-6 right-10 text-[#89C2FF]/70"
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
        </motion.div>
      </section>

      {/* 💡 How it Works Section */}
      <section className="py-20 px-6 md:px-16 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
          How Product Discovery Works
        </motion.h2>
        <p className="text-[#CFCFCF] max-w-3xl mx-auto mb-12">
          Leverage 30,000+ AI-generated searchable attributes aligned with your shoppers' language
          to boost visibility and streamline shopping experiences.
        </p>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {[
            {
              title: "Improved Visibility",
              desc: "Enhance listings with structured AI attributes so customers find exactly what they seek.",
              icon: <Eye className="w-10 h-10 text-[#89C2FF]" />,
            },
            {
              title: "Streamlined Experience",
              desc: "Enable effortless navigation and filters powered by attribute-level intelligence.",
              icon: <ShoppingBag className="w-10 h-10 text-[#4EA8FF]" />,
            },
            {
              title: "Smarter Recommendations",
              desc: "Feed your recommendation engine with enriched metadata for hyper-personalized journeys.",
              icon: <Sparkles className="w-10 h-10 text-[#5FB9FF]" />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#1A1A1D]/60 border border-[#4EA8FF]/30 p-8 rounded-2xl hover:shadow-[0_0_25px_#4EA8FF55] transition hover:-translate-y-1"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-[#89C2FF]">{item.title}</h3>
              <p className="text-[#D1D5DB] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📊 Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#101014] to-[#1A1A1D] text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#4EA8FF]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#89C2FF]/10 rounded-full blur-2xl"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto px-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] bg-clip-text text-transparent"
          >
            Real Impact in Numbers
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#CFCFCF] text-lg max-w-2xl mx-auto mb-16"
          >
            See how AI-powered product discovery drives measurable business outcomes across leading eCommerce platforms
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                value: "40%", 
                label: "Increase in Conversion Rate",
                description: "Higher conversion rates through improved product discoverability and relevant search results"
              },
              { 
                value: "20%", 
                label: "Boost in Average Order Value",
                description: "Increased basket size with better product recommendations and cross-selling opportunities"
              },
              { 
                value: "+18%", 
                label: "Higher Sell-Through Rate",
                description: "Reduced inventory costs and improved revenue through enhanced product visibility"
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                {/* 3D Card Effect */}
                <div className="bg-gradient-to-br from-[#1A1A1D] to-[#25252A] p-8 rounded-2xl border border-[#4EA8FF]/20 shadow-2xl shadow-[#4EA8FF]/10 hover:shadow-[#4EA8FF]/20 transition-all duration-300 transform-gpu">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4EA8FF]/0 via-[#4EA8FF]/5 to-[#89C2FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-5xl md:text-6xl font-bold text-[#89C2FF] mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.value}
                    </motion.h3>
                    <h4 className="text-xl font-semibold text-[#E8ECF2] mb-3">
                      {stat.label}
                    </h4>
                    <p className="text-[#CFCFCF] text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
                
                {/* Floating particles */}
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-[#4EA8FF] rounded-full opacity-70"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Additional Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "30K+", label: "AI Attributes" },
              { value: "95%", label: "Search Accuracy" },
              { value: "2.5x", label: "Faster Discovery" },
              { value: "50%", label: "Less Bounce Rate" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center p-4 bg-[#1A1A1D]/40 rounded-xl border border-[#4EA8FF]/10"
              >
                <div className="text-2xl font-bold text-[#4EA8FF]">{metric.value}</div>
                <div className="text-sm text-[#CFCFCF] mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ❓ FAQs */}
      <section className="py-20 px-6 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-12">FAQs</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#4EA8FF]/20 rounded-xl p-4 bg-[#1A1A1D]/40 hover:border-[#89C2FF]/40 transition"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="font-medium text-[#E8ECF2]">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#89C2FF] transition-transform ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFAQ === index && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-[#CFCFCF]"
                >
                  {faq.a}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 Enhanced CTA with 3D Image */}
      <section className="py-20 bg-gradient-to-br from-[#1A1A1D] to-[#0E0E10] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-[#4EA8FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-[#89C2FF]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - 3D Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* 3D Container */}
              <motion.div
                className="relative"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Main Image with 3D Effect */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img 
                    src={searchImg} 
                    alt="AI Search Interface" 
                    className="w-full h-auto rounded-2xl border border-[#4EA8FF]/30"
                  />
                  
                  {/* 3D Depth Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/80 to-transparent rounded-2xl"></div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-6 left-6 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] text-[#0E0E10] px-4 py-2 rounded-full font-semibold text-sm"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🔍 AI-Powered Search
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-6 right-6 bg-[#1A1A1D]/80 backdrop-blur-sm border border-[#4EA8FF]/30 rounded-xl p-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#89C2FF]">95%</div>
                      <div className="text-xs text-[#CFCFCF]">Accuracy</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* 3D Shadow */}
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-[#4EA8FF]/20 to-transparent rounded-2xl blur-xl -z-10"></div>
              </motion.div>

              {/* Floating Particles */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 bg-[#4EA8FF] rounded-full opacity-60"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute -bottom-2 right-8 w-6 h-6 bg-[#89C2FF] rounded-full opacity-40"
                animate={{
                  y: [0, 15, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] bg-clip-text text-transparent"
              >
                Ready to Revolutionize Your Discovery?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-[#D1D5DB] text-lg mb-8 leading-relaxed"
              >
                Transform your eCommerce experience with AI-powered search and discovery. 
                Our advanced algorithms understand customer intent and deliver hyper-relevant 
                results that drive conversions and customer satisfaction.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-[#CFCFCF] mb-8 text-sm"
              >
                • 30,000+ AI-generated attributes<br/>
                • Real-time search optimization<br/>
                • Seamless platform integration<br/>
                • Enterprise-grade security
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/demo"
                  className="px-8 py-4 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] text-[#0E0E10] rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-[#4EA8FF]/25"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/enterprise"
                  className="px-8 py-4 border border-[#4EA8FF]/40 text-[#89C2FF] rounded-xl font-semibold hover:bg-[#4EA8FF]/10 transition"
                >
                  Enterprise Demo
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}