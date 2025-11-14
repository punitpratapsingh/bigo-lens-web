// src/pages/CaseStudies.tsx
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Search,
  BarChart3,
  Users,
  Sparkles,
  Star,
} from "lucide-react";

const caseStudies = [
  {
    title: "Snitch Increases Conversions with AI-Powered Recommendations",
    brand: "Snitch",
    description:
      "Snitch, a fast-growing fashion brand, used bigO Lens Labs’ recommendation engine and visual AI to increase conversion rates by 22% and engagement by 35%.",
    image: "/src/assets/case1.png",
    uplift: "22%",
    read: "Read More →",
  },
  {
    title: "Meesho Achieves 1 Billion Visual Searches Annually",
    brand: "Meesho",
    description:
      "By integrating bigO Lens visual search API, Meesho streamlined product discovery for millions, scaling to over 1B visual searches yearly.",
    image: "/src/assets/case2.png",
    uplift: "1B+",
    read: "Read More →",
  },
  {
    title: "Reliance Ajio Transforms Its Ecommerce Experience",
    brand: "Reliance Ajio",
    description:
      "Ajio used bigO Lens’s AI-powered visual tagging and personalization engine to enhance user engagement and conversion lift by 40%.",
    image: "/src/assets/case3.png",
    uplift: "40%",
    read: "Read More →",
  },
  {
    title: "Myntra Boosts Visual Search Adoption by 35% YoY",
    brand: "Myntra",
    description:
      "Through smart tagging and product discovery modules, Myntra increased visual search engagement by 35% year-over-year.",
    image: "/src/assets/case4.png",
    uplift: "35%",
    read: "Read More →",
  },
  {
    title: "EyeBuyDirect Sees 29x ROI from AI Recommendations",
    brand: "EyeBuyDirect",
    description:
      "By leveraging bigO Lens’s recommendation analytics, EyeBuyDirect optimized user journeys, seeing a 29x ROI within 6 months.",
    image: "/src/assets/case5.png",
    uplift: "29x",
    read: "Read More →",
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white px-6 py-20">
      <Navigation />
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Case Studies
        </h1>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
          Explore how leading global brands leverage bigO Lens Labs’ AI-driven
          solutions to increase conversions, engagement, and efficiency across
          ecommerce.
        </p>
      </motion.div>

      {/* Animated Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 text-center">
        {[
          { icon: <TrendingUp size={32} />, label: "Avg Conversion Lift", value: "18%" },
          { icon: <BarChart3 size={32} />, label: "ROI in 6 Months", value: "29x" },
          { icon: <Users size={32} />, label: "Clients Served", value: "120+" },
          { icon: <Sparkles size={32} />, label: "AI Models Deployed", value: "75+" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.07 }}
            className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700"
          >
            <div className="flex justify-center mb-3 text-cyan-400">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-cyan-300">{stat.value}</h3>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Case Study Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {caseStudies.map((study, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all"
          >
            <img
              src={study.image}
              alt={study.brand}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-cyan-300">
                {study.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">{study.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-cyan-400 font-bold text-lg">
                  ↑ {study.uplift}
                </span>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-cyan-400 text-sm font-medium"
                >
                  {study.read}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your E-Commerce with AI?
        </h2>
        <p className="text-gray-400 mb-6">
          Join global leaders using bigO Lens Labs to deliver hyper-personalized,
          visual-first shopping experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-semibold rounded-xl"
          >
            Request a Demo
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-cyan-400 rounded-xl text-cyan-300 hover:bg-cyan-400 hover:text-gray-900 transition"
          >
            Login
          </Link>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="mt-24 grid md:grid-cols-4 gap-8 text-sm text-gray-400 border-t border-gray-700 pt-12">
        <div>
          <h3 className="font-semibold mb-3 text-cyan-300">Solutions</h3>
          <ul className="space-y-2">
            <li>Smart Recommendations</li>
            <li>Visual Search</li>
            <li>Auto Tagging</li>
            <li>Analytics</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-cyan-300">Resources</h3>
          <ul className="space-y-2">
            <li>Case Studies</li>
            <li>Blog</li>
            <li>Guides</li>
            <li>Videos</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-cyan-300">Company</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Partners</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-cyan-300">Legal</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Security</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-500 text-xs">
        © {new Date().getFullYear()}  bigO Lens Labs. All rights reserved.
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies;
