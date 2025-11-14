import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles, Tags, Eye, ShoppingBag, Layers, Zap, Gem, Home, Shirt, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AITagging() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="bg-[#0E0E10] text-[#E6E6E6]">
      <Navigation />
      {/* 🌟 Hero Section */}
      <section className="relative text-center py-28 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(78,168,255,0.15),transparent_70%)]"
        />
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] bg-clip-text text-transparent"
        >
          AI Tagging & Merchandising
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-lg md:text-xl max-w-3xl mx-auto text-[#CFCFCF] mb-10"
        >
          Drive efficiency and enrich your catalog with automatic AI-powered product tagging that enhances search, navigation, and merchandising performance.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          <Link
            to="/book-demo"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] text-[#0E0E10] font-semibold hover:scale-105 transition-transform"
          >
            Book a Free Demo
          </Link>
        </motion.div>
      </section>

      {/* 🧩 Core Benefits */}
      <section className="py-20 px-6 md:px-16 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-4xl font-bold mb-10"
        >
          Why Automatic Product Tagging?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Tags className="w-10 h-10 text-[#89C2FF]" />,
              title: "Improved Search & SEO",
              desc: "Enhance discoverability with structured product metadata that matches your shoppers’ language.",
            },
            {
              icon: <Zap className="w-10 h-10 text-[#4EA8FF]" />,
              title: "Tag at Scale",
              desc: "Automatically tag thousands of SKUs in minutes, saving time and operational costs.",
            },
            {
              icon: <BarChart3 className="w-10 h-10 text-[#89C2FF]" />,
              title: "Data-Driven Merchandising",
              desc: "Leverage attribute-level insights to predict trends and optimize assortment strategies.",
            },
          ].map((b, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="p-8 rounded-2xl bg-[#1A1A1D]/60 border border-[#4EA8FF]/20 hover:shadow-[0_0_25px_#4EA8FF44] transition"
            >
              <div className="flex justify-center mb-4">{b.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-[#89C2FF]">{b.title}</h3>
              <p className="text-[#D1D5DB]">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⚙️ Workflow */}
      <section className="py-24 bg-[#101014] text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-4xl font-bold mb-10"
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { step: "1", title: "Upload", icon: <Layers />, desc: "Ingest product data and images via API or dashboard." },
            { step: "2", title: "AI Tagging", icon: <Sparkles />, desc: "AI automatically generates structured, accurate attributes." },
            { step: "3", title: "Curate", icon: <Eye />, desc: "Refine and approve tags aligned with brand and merchandising goals." },
            { step: "4", title: "Optimize", icon: <ShoppingBag />, desc: "Deploy tags to improve search, filters, and recommendations." },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="p-6 rounded-2xl bg-[#1A1A1D]/60 border border-[#4EA8FF]/20 hover:shadow-[0_0_25px_#4EA8FF44] transition"
            >
              <div className="flex justify-center mb-3 text-[#89C2FF]">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-[#CFCFCF] text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💎 Industry Applications */}
      <section className="py-20 px-6 md:px-16 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-4xl font-bold mb-10"
        >
          Industry Applications
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: <Shirt className="w-10 h-10 text-[#4EA8FF]" />, title: "Fashion & Apparel", desc: "Detect color, fit, style, and material to improve product recommendations." },
            { icon: <Gem className="w-10 h-10 text-[#89C2FF]" />, title: "Jewelry", desc: "Recognize gem type, metal, and design patterns for precise categorization." },
            { icon: <Home className="w-10 h-10 text-[#4EA8FF]" />, title: "Home Decor", desc: "Identify texture, material, and style to enhance visual discovery." },
          ].map((app, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="p-8 rounded-2xl bg-[#1A1A1D]/60 border border-[#4EA8FF]/20 hover:shadow-[0_0_25px_#4EA8FF44] transition"
            >
              <div className="flex justify-center mb-4">{app.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-[#89C2FF]">{app.title}</h3>
              <p className="text-[#D1D5DB]">{app.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA Footer */}
      <section className="text-center py-24 bg-gradient-to-b from-[#1A1A1D] to-[#0E0E10]">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] bg-clip-text text-transparent"
        >
          Boost Efficiency with AI Tagging
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-[#CFCFCF] mb-10 max-w-xl mx-auto"
        >
          Transform your catalog with AI-driven tagging that improves search, navigation, and merchandising.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={2}>
          <Link
            to="/demo"
            className="px-10 py-4 bg-gradient-to-r from-[#4EA8FF] to-[#89C2FF] text-[#0E0E10] rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Get a Free Demo
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
