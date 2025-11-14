import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Quote,
  TrendingUp,
  Brain,
  Sparkles,
  Activity,
  Users,
} from "lucide-react";
import sample4 from "/src/assets/sample4.png"; // ✅ Local image import

export default function HyperPersonalization() {
  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { delay, duration: 0.8 } },
  });

  return (
    <div className="bg-gradient-to-b from-[#030014] via-[#0b0127] to-[#030014] text-white min-h-screen overflow-hidden">
      <Navigation />
      {/* 🌌 Hero Section */}
      <section className="relative text-center py-28 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_70%)] blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.h1
          {...fadeIn(0.2)}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400"
        >
          Hyper-Personalization with Visual AI
        </motion.h1>
        <motion.p
          {...fadeIn(0.4)}
          className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          Deliver truly one-to-one shopping experiences with multimodal AI that
          fuses visual similarity, intent prediction, and behavioral analytics —
          increasing engagement, AOV, and retention.
        </motion.p>
        <motion.div {...fadeIn(0.6)} className="mt-10 flex justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-black font-semibold hover:opacity-90 transition"
          >
            🚀 Request a Demo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-indigo-400 text-indigo-300 hover:bg-indigo-500/10"
          >
            Learn More
          </Button>
        </motion.div>
      </section>

      {/* 💡 Concept Section */}
      <section className="py-20 px-8 md:px-20 bg-slate-900/30 backdrop-blur-sm">
        <motion.h2
          {...fadeIn(0.1)}
          className="text-4xl font-bold mb-8 text-cyan-300"
        >
          Personalize Your Entire Discovery Experience
        </motion.h2>
        <motion.p
          {...fadeIn(0.2)}
          className="text-slate-300 mb-6 leading-relaxed"
        >
          <strong>Hyper-personalization</strong> combines multimodal intelligence
          and real-time decision systems to adapt every digital touchpoint. By
          analyzing visual, contextual, and behavioral cues simultaneously, your
          product discovery becomes predictive and emotionally resonant — not
          just reactive.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {[
            {
              icon: Brain,
              title: "Visual AI Insights",
              desc: "Understands color, texture, and style features from product images and maps them to shopper preferences.",
            },
            {
              icon: Users,
              title: "Behavioral Context",
              desc: "Learns from clickstream and dwell-time signals to model short-term and long-term user intent.",
            },
            {
              icon: Activity,
              title: "Journey Awareness",
              desc: "Dynamically adjusts recommendations based on where the shopper is in their journey.",
            },
            {
              icon: Sparkles,
              title: "Continuous Learning",
              desc: "Each session enhances model precision — achieving 25–35% higher CTR over static personalization.",
            },
          ].map((f, i) => (
            <motion.div key={i} {...fadeIn(0.3 + i * 0.2)}>
              <Card className="bg-slate-800/60 border border-slate-700 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <f.icon className="mx-auto text-cyan-400 w-10 h-10 mb-4" />
                  <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📊 Data & Impact Section with Image */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-indigo-900/50 to-slate-950 relative">
        <motion.div {...fadeIn(0.1)} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">
            The Measurable Impact of Hyper-Personalization
          </h2>
          <p className="text-slate-300 mb-10">
            Data-driven personalization translates directly to tangible business
            outcomes.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          {...fadeIn(0.2)}
          className="flex justify-center mb-16"
        >
          <img
            src={sample4}
            alt="AI Growth Analytics"
            className="rounded-2xl shadow-xl border border-indigo-500/30 w-full max-w-4xl"
          />
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { metric: "+42%", label: "Increase in Click-Through Rate" },
            { metric: "3.2×", label: "Boost in Conversion Probability" },
            { metric: "+27%", label: "Average Order Value Growth" },
          ].map((d, i) => (
            <motion.div
              key={i}
              {...fadeIn(0.3 + i * 0.2)}
              className="p-6 rounded-2xl bg-slate-900/60 border border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.3)]"
            >
              <TrendingUp className="mx-auto text-cyan-400 w-10 h-10 mb-3" />
              <h3 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {d.metric}
              </h3>
              <p className="text-slate-400 mt-2">{d.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="py-24 bg-slate-900/40 px-6 md:px-20">
        <motion.h2
          {...fadeIn(0.1)}
          className="text-4xl font-semibold text-center text-indigo-300 mb-12"
        >
          What Leading Brands Are Saying
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Matthew Gratze",
              role: "Director of Digital at Signet UK",
              quote:
                "After implementing hyper-personalization, our shoppers found desired products 2× faster, lifting conversion and retention.",
            },
            {
              name: "Toshinori Kato",
              role: "Digital Marketing Director at Baycrew’s",
              quote:
                "Only this multimodal AI achieved the recognition accuracy needed for unified commerce — 99.2% matching precision.",
            },
            {
              name: "Victor Noda",
              role: "CEO at Mobly",
              quote:
                "Visual AI personalization tripled conversion — the collaboration experience is unmatched.",
            },
          ].map((t, i) => (
            <motion.div key={i} {...fadeIn(0.2 + i * 0.2)}>
              <Card className="bg-slate-800/70 border border-indigo-500/30 hover:border-cyan-400/40 transition-all hover:scale-105">
                <CardContent className="p-6">
                  <Quote className="text-cyan-400 mb-3" />
                  <p className="text-slate-300 italic mb-4">{t.quote}</p>
                  <h4 className="font-semibold text-indigo-200">{t.name}</h4>
                  <p className="text-sm text-slate-400">{t.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⚙️ CTA */}
      <section className="text-center py-24 bg-gradient-to-b from-cyan-800/30 to-indigo-900/30 backdrop-blur-sm">
        <motion.h2
          {...fadeIn(0.1)}
          className="text-4xl font-bold text-cyan-300 mb-4"
        >
          See Hyper-Personalization in Action
        </motion.h2>
        <motion.p
          {...fadeIn(0.2)}
          className="text-slate-300 max-w-2xl mx-auto mb-8"
        >
          Decathlon Belgium achieved a{" "}
          <strong className="text-cyan-400">2.5× conversion uplift</strong> and{" "}
          <strong className="text-indigo-400">+22% AOV growth</strong> by
          deploying real-time visual AI recommendations.
        </motion.p>
        <motion.div {...fadeIn(0.4)} className="flex justify-center gap-6">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-semibold hover:opacity-90"
          >
            Read Case Study
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-cyan-400 text-cyan-300 hover:bg-cyan-600/10"
          >
            Download eBook
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
