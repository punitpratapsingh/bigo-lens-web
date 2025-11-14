import { motion } from "framer-motion";
import { ChevronDown, Eye, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import visualImg from "@/assets/visual.png";

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
    q: "What’s the benefit of AI-generated tags?",
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
          Leverage 30,000+ AI-generated searchable attributes aligned with your shoppers’ language
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

      {/* 📊 Stats Section */}
      <section className="py-20 bg-[#101014] text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] bg-clip-text text-transparent">
          Real Impact in Numbers
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { value: "40%", label: "Increase in Conversion Rate" },
            { value: "20%", label: "Boost in Average Order Value" },
            { value: "+18%", label: "Higher Sell-Through Rate" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-xl bg-[#1A1A1D]/50 border border-[#4EA8FF]/20 hover:shadow-[0_0_20px_#4EA8FF44] transition"
            >
              <h3 className="text-5xl font-bold text-[#89C2FF] mb-2">{stat.value}</h3>
              <p className="text-[#D1D5DB]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
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

      {/* 🚀 CTA */}
      <section className="text-center py-20 bg-gradient-to-b from-[#1A1A1D] to-[#0E0E10]">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] bg-clip-text text-transparent">
          Ready to Revolutionize Your Discovery?
        </h2>
        <p className="text-[#D1D5DB] mb-8 max-w-xl mx-auto">
          Join top retailers transforming their eCommerce experiences with AI-enriched product data.
        </p>
        <Link
          to="/demo"
          className="px-8 py-3 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] text-[#0E0E10] rounded-full font-semibold hover:scale-105 transition-transform inline-block"
        >
          Get Started
        </Link>
      </section>

      <Footer />
    </div>
  );
}
