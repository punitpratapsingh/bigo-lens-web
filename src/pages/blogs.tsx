// src/pages/Blogs.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";
import { BarChart3, Sparkles, Eye, Tag, Film, LineChart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import blogImg1 from "@/assets/sample1.png";
import blogImg2 from "@/assets/growth-insights.png";
import blogImg3 from "@/assets/sample3.png";
import blogImg4 from "@/assets/sample4.png";
import blogImg5 from "@/assets/sample5.png";
import blogImg6 from "@/assets/sample6.png";

const blogs = [
  {
    icon: Eye,
    title: "Visual Search: The Future of Product Discovery",
    img: blogImg1,
    stat: 78,
    desc: "Visual search adoption is growing rapidly — 78% of shoppers prefer finding products using images rather than text. Our AI-driven Visual Search Engine helps retailers capture this shift by offering intuitive product discovery experiences.",
    details: `
      Visual search uses convolutional neural networks and multimodal transformers to compare vector embeddings of product images.
      Retailers integrating visual search have reported 2.3x higher engagement and 31% faster conversions. 
      Our system uses RETFound + CLIP fusion to achieve state-of-the-art retrieval precision.
    `,
  },
  {
    icon: Sparkles,
    title: "Hyper-Personalization: The New Retail Norm",
    img: blogImg2,
    stat: 45,
    desc: "Personalized recommendations boost conversions by 45%. Our Hyper-Personalization module analyzes user intent, style preferences, and purchase history to craft truly individualized journeys.",
    details: `
      Using deep user embeddings, our AI models adapt in real time to context changes.
      With transformer-based sequence modeling, we predict preferences dynamically — resulting in 2.8x higher click-through and retention rates.
    `,
  },
  {
    icon: Tag,
    title: "AI Auto Tagging & Catalog Enrichment",
    img: blogImg3,
    stat: 90,
    desc: "Retailers spend up to 90% less time on manual tagging using our Auto Tagging Engine powered by multi-modal LLMs. Enhance accuracy, SEO, and discoverability instantly.",
    details: `
      Our Auto Tagger uses ViT + LLM pipelines for contextual label generation and rich attribute tagging.
      Trained on 10M+ product pairs, it achieves 97% attribute accuracy and speeds up onboarding by 12x.
    `,
  },
  {
    icon: Film,
    title: "AI Image-to-Video Generation for Rich Media",
    img: blogImg4,
    stat: 65,
    desc: "Dynamic product videos increase click-through rates by 65%. Our Image-to-Video Generator transforms static images into cinematic product stories with AI-driven scene design.",
    details: `
      The Image-to-Video pipeline uses diffusion-based frame synthesis, motion consistency models, and 3D parallax generation.
      Brands using this feature report 2x more engagement on social platforms.
    `,
  },
  {
    icon: BarChart3,
    title: "AI-Powered Analytics & Market Insights",
    img: blogImg5,
    stat: 70,
    desc: "Brands leveraging predictive analytics see 70% faster decision-making. Our AI analytics engine visualizes performance, trends, and customer engagement metrics in real time.",
    details: `
      Built on predictive time-series models (Prophet + LSTM), our analytics suite forecasts demand and price elasticity with 92% accuracy.
      The insights dashboard helps optimize campaigns and reduce churn by 18%.
    `,
  },
  {
    icon: LineChart,
    title: "Smart Product Recommendations & Upselling",
    img: blogImg6,
    stat: 50,
    desc: "AI recommendations drive up to 50% of Amazon’s total revenue. Our Product Recommendation API offers plug-and-play integration to replicate that success for your platform.",
    details: `
      We use graph-based recommendation systems with hybrid collaborative filtering to map user-product affinity.
      Customers deploying this saw average order values rise by 33% and basket size increase by 19%.
    `,
  },
];

const Blogs = () => {
  const [activeBlog, setActiveBlog] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white text-gray-900">
      <Navigation />

      {/* 🧠 HERO */}
      <section className="py-24 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          Insights & Innovations in AI Commerce
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
        >
          Stay ahead of the curve with our latest research, market updates, and
          how our AI suite transforms eCommerce experiences.
        </motion.p>
      </section>

      {/* 📰 BLOG GRID */}
      <section className="py-20 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogs.map((blog, i) => (
          <Tilt key={i} glareEnable glareMaxOpacity={0.2}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveBlog(i)}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden shadow-lg bg-white hover:shadow-2xl transition rounded-2xl">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-blue-600">
                    <blog.icon className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{blog.desc}</p>

                  {/* Animated Metric */}
                  <div className="flex items-center gap-2 text-3xl font-bold text-purple-600">
                    <CountUp end={blog.stat} duration={2.5} suffix="%" />
                    <span className="text-sm text-gray-500 font-normal">
                      Impact Growth
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Tilt>
        ))}
      </section>

      {/* 📊 MODAL OVERLAY */}
      <AnimatePresence>
        {activeBlog !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBlog(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-3xl mx-auto relative overflow-y-auto max-h-[80vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-4 right-6 text-2xl font-bold text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <img
                src={blogs[activeBlog].img}
                alt={blogs[activeBlog].title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h2 className="text-3xl font-bold mb-3 text-blue-700">
                {blogs[activeBlog].title}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {blogs[activeBlog].details}
              </p>

              {/* Animated Stat */}
              <div className="flex items-center gap-3 text-4xl font-bold text-purple-600">
                <CountUp end={blogs[activeBlog].stat} duration={2.5} suffix="%" />
                <span className="text-lg text-gray-600 font-normal">
                  measurable growth with our AI solution
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-blue-700 to-purple-800 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Let AI Accelerate Your Commerce Growth
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-2xl mx-auto text-lg mb-8"
        >
          Discover how our suite of visual intelligence tools can automate,
          personalize, and scale your business impact.
        </motion.p>
        <Button
          size="lg"
          className="text-lg px-8 py-6 bg-white text-blue-700 hover:bg-blue-100 shadow-xl"
        >
          Contact Us
        </Button>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
