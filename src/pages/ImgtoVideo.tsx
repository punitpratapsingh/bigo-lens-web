import React from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ImgtoVideo: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white font-sans">
      <Navigation />
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Generate AI UGC Videos Instantly 🎬
        </motion.h1>
        <p className="text-gray-300 max-w-2xl mb-8">
          Transform product URLs or marketing scripts into high-performing,
          user-generated style AI videos — instantly. Drive growth with
          hyper-personalized, camera-free content creation.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full text-white font-semibold transition">
            Start for Free
          </button>
          <button className="border border-gray-500 hover:bg-gray-800 px-6 py-3 rounded-full text-white font-semibold transition">
            Book a Demo
          </button>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-black/40 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-8">
          <div>
            <h2 className="text-4xl font-bold text-pink-500">3x</h2>
            <p className="text-gray-300 mt-2">Higher Ad Engagement Rate</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-pink-500">70%</h2>
            <p className="text-gray-300 mt-2">Reduction in Production Time</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-pink-500">5x</h2>
            <p className="text-gray-300 mt-2">Faster Go-To-Market Cycles</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <h2 className="text-center text-4xl font-bold mb-12">
          AI-Powered Features ✨
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "URL to Video",
              desc: "Convert any product page into a ready-to-publish UGC video instantly, powered by computer vision + NLP.",
            },
            {
              title: "AI Script Generator",
              desc: "Auto-generate high-converting ad scripts with emotional tone control and call-to-action optimization.",
            },
            {
              title: "Voice Cloning & Localization",
              desc: "Replicate voices in 200+ languages and adapt videos for regional audiences with native fluency.",
            },
            {
              title: "Digital Twin Avatars",
              desc: "Build AI versions of your brand ambassadors — consistent, scalable, and hyper-realistic.",
            },
            {
              title: "Multi-Channel Optimization",
              desc: "Auto-format videos for TikTok, Instagram, YouTube Shorts, and LinkedIn without manual edits.",
            },
            {
              title: "Data-Driven Storytelling",
              desc: "Leverage analytics to personalize video narratives based on audience engagement trends.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-pink-400 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Growth Impact Section */}
      <section className="bg-black/50 py-20 px-6">
        <h2 className="text-center text-4xl font-bold mb-12">
          Why ImgtoVideo Drives Growth 📈
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-pink-400 mb-2">
                ⚡ Accelerated Marketing Velocity
              </h3>
              <p className="text-gray-300">
                Teams reduce video production cycles from weeks to minutes,
                enabling faster campaign iteration and A/B testing at scale.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-pink-400 mb-2">
                💰 Lower Operational Costs
              </h3>
              <p className="text-gray-300">
                No need for studios, actors, or post-production. AI-generated
                content cuts costs by up to <span className="text-pink-400">90%</span>.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-pink-400 mb-2">
                🚀 Conversion-Focused Storytelling
              </h3>
              <p className="text-gray-300">
                Personalized video ads lead to <span className="text-pink-400">3.2x higher CTR</span> 
                and <span className="text-pink-400">45% increase</span> in retention on product pages.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-pink-400 mb-2">
                🌎 Global Audience Reach
              </h3>
              <p className="text-gray-300">
                AI localization allows brands to scale effortlessly across
                200+ languages, ensuring inclusivity and wider audience
                resonance.
              </p>
            </div>
          </div>

          <motion.img
            src= "/src/assets/growth-insights.png"
            alt="Growth Insights"
            className="rounded-2xl shadow-xl border border-gray-800"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <h2 className="text-center text-4xl font-bold mb-12">
          What Our Users Say 💬
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Sivan Michaeli-Roimi",
              role: "VP Marketing @ Pynt",
              quote:
                "UGC is something every brand needs nowadays. ImgtoVideo AI made it effortless — it’s like having a full studio powered by AI.",
            },
            {
              name: "Anirudh",
              role: "Founder of Think Tanks",
              quote:
                "Their multilingual avatars are a game-changer. I created 20 videos for different audiences — no human actor needed!",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
            >
              <p className="italic text-gray-300 mb-4">“{t.quote}”</p>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm text-gray-400">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-pink-600">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Ready to Revolutionize Your Video Marketing?
        </h2>
        <p className="text-white mb-8">
          Scale faster, spend less, and engage better — all with AI video creation.
        </p>
        <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Create Your First AI Video
        </button>
      </section>

      <Footer />

    </div>
  );
};

export default ImgtoVideo;
