import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import publication1 from "@/assets/Screenshot (13).png";
import publication2 from "@/assets/Screenshot (14).png";
import publication3 from "@/assets/Screenshot (15).png";

const Publications = () => {
  const [counter, setCounter] = useState(0);

  // Animate counter to simulate "Impact Factor Growth" visualization
  useEffect(() => {
    let start = 0;
    const end = 120; // Example metric (e.g., citations, research partners)
    const duration = 2500;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCounter(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
  }, []);

  const publications = [
    {
      title: "Generative AI for Visual Commerce 2025 Report",
      desc: "Comprehensive study on multimodal transformers and their applications in product tagging, fashion discovery, and visual search engines.",
      img: publication1,
      link: "#",
      category: "Whitepaper",
    },
    {
      title: "AI-Powered Visual Recommendation Systems for E-commerce",
      desc: "Research insights into transformer-based personalization models and diffusion-driven image-to-video generation for retail innovation.",
      img: publication2,
      link: "#",
      category: "Research",
    },
    {
      title: "Multimodal Deep Learning Trends in Retail AI",
      desc: "A market analysis on integrating vision-language models (VLMs) for personalized recommendations and predictive analytics.",
      img: publication3,
      link: "#",
      category: "Report",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 md:px-16 py-20">
     <Navigation />
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">Publications & Research</h1>
        <p className="text-lg text-gray-300">
          Explore our latest AI breakthroughs, technical whitepapers, and data-driven insights.
        </p>
      </motion.div>

      {/* Animated Counter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-semibold mb-2">{counter}+</h2>
        <p className="text-gray-400">Citations & Collaborations Worldwide</p>
      </motion.div>

      {/* Publications Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {publications.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            className="bg-gray-800/60 rounded-2xl overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform"
          >
            <img
              src={pub.img}
              alt={pub.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-pink-400 mb-2 uppercase">{pub.category}</p>
              <h3 className="text-2xl font-bold mb-3">{pub.title}</h3>
              <p className="text-gray-400 mb-4">{pub.desc}</p>
              <a
                href={pub.link}
                className="text-pink-500 hover:underline font-semibold"
              >
                Read Publication →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="mt-24 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          Partner with Us for AI-Driven Innovation
        </h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Collaborate with our research team to co-author the next breakthrough in AI-based visual discovery, hyper-personalization, and content generation.
        </p>
        <a
          href="/contact"
          className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold shadow-md"
        >
          Contact Research Team
        </a>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Publications;
