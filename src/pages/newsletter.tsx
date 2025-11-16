// src/pages/Newsletter.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import newsletterImage from "@/assets/newsletter1.png";

const Newsletter: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(3250);
  const [growthRate, setGrowthRate] = useState(8.4);

  // Animate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSubscriberCount((prev) => prev + Math.floor(Math.random() * 3));
      setGrowthRate((prev) => parseFloat((prev + Math.random() * 0.01).toFixed(2)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col items-center justify-center text-white px-6 py-16">
      <Navigation />
      <motion.div
        className="max-w-3xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
          Join Our Innovation Newsletter 🚀
        </h1>
        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          Stay ahead of the curve with the latest insights in Visual Search, Hyper-Personalization, GenAI Auto-Tagging, Image-to-Video, and Product Analytics.  
          Get exclusive growth strategies and AI breakthroughs from our labs delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-5 py-3 rounded-xl bg-gray-800 text-white w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-gray-900 font-semibold rounded-xl shadow-lg"
          >
            Subscribe
          </motion.button>
        </form>

        <AnimatePresence>
          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 text-green-400 font-medium"
            >
              🎉 You're subscribed! Welcome to the AI Growth Network.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Animated Metrics Section */}
      <motion.div
        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <h2 className="text-4xl font-bold text-cyan-400">{subscriberCount.toLocaleString()}+</h2>
          <p className="text-gray-400 mt-2">Active Subscribers</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <h2 className="text-4xl font-bold text-cyan-400">{growthRate}%</h2>
          <p className="text-gray-400 mt-2">Monthly Growth Rate</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <h2 className="text-4xl font-bold text-cyan-400">98%</h2>
          <p className="text-gray-400 mt-2">Reader Satisfaction</p>
        </motion.div>
      </motion.div>

      {/* Newsletter Image Section */}
      <motion.div
        className="mt-24 max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20">
          <img 
            src={newsletterImage} 
            alt="Newsletter Preview" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 to-transparent"></div>
          
          {/* Floating elements on image */}
          <motion.div
            className="absolute top-6 left-6 bg-gradient-to-r from-sky-500 to-cyan-400 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📰 Latest Edition
          </motion.div>
          
          <motion.div
            className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">24K+</div>
              <div className="text-xs text-gray-300">Weekly Readers</div>
            </div>
          </motion.div>
        </div>
        
        {/* Image caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mt-4 text-sm"
        >
          Get visually-rich, actionable insights delivered weekly
        </motion.p>
      </motion.div>

      {/* Product Highlights */}
      <div className="mt-24 max-w-5xl">
        <motion.h2
          className="text-3xl font-semibold mb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          What You'll Learn Each Week
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            "Visual Search Engine",
            "Hyper-Personalization",
            "Auto-Tagging & AI Metadata",
            "Product Recommendation",
            "Image-to-Video Generation",
            "E-Commerce Analytics",
          ].map((topic, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-cyan-300 mb-2">{topic}</h3>
              <p className="text-gray-400 text-sm">
                Learn how our AI-powered tools are redefining {topic.toLowerCase()} with automation, intelligence, and insight.
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Newsletter;