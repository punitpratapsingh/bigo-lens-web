import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Pen,
  ImageIcon,
  ListChecks,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import CountUp from "react-countup";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// Optional: import your Navbar & Footer if present
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const metrics = [
  { key: "manual", label: "Manual (min)", time: 15 },
  { key: "ai", label: "AI (min)", time: 1.5 },
];

const seoTrend = [
  { month: "Jan", manual: 30, ai: 45 },
  { month: "Feb", manual: 28, ai: 48 },
  { month: "Mar", manual: 25, ai: 52 },
  { month: "Apr", manual: 24, ai: 57 },
  { month: "May", manual: 22, ai: 63 },
  { month: "Jun", manual: 20, ai: 70 },
];

const FeatureCard: React.FC<{
  title: string;
  desc: string;
  Icon: React.ComponentType<any>;
}> = ({ title, desc, Icon }) => {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(59,130,246,0.12)" }}
      className="bg-white/5 border border-white/6 rounded-2xl p-6"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white">
          <Icon className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-gray-300">{desc}</p>
    </motion.div>
  );
};

const AnimatedStat: React.FC<{ value: number | string; label: string }> = ({
  value,
  label,
}) => (
  <div className="bg-gradient-to-br from-sky-700/10 to-indigo-700/6 border border-white/6 rounded-2xl p-6 text-center">
    <div className="text-4xl font-bold text-sky-300 mb-1">
      {typeof value === "number" ? (
        <CountUp end={value} duration={2} separator="," />
      ) : (
        value
      )}
    </div>
    <div className="text-sm text-gray-300">{label}</div>
  </div>
);

const DescriptionGeneration: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  if (inView) controls.start("visible");

  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      <Navigation />

      {/* HERO */}
      <header className="pt-28 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-indigo-400">
                AI-Powered Product Description Generator
              </h1>
              <p className="mt-4 text-gray-300 max-w-2xl">
                Automatically generate compelling, SEO-optimized product titles
                and descriptions from images and attribute data — reduce listing
                setup time by up to <strong>90%</strong>.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link to="/book-demo" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-[#041028] font-semibold shadow-lg"
                  >
                    Book a Free Demo
                  </motion.button>
                </Link>

                <Link to="/contact" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="px-6 py-3 rounded-full border border-white/10 text-white/90"
                  >
                    Request a Quote
                  </motion.button>
                </Link>
              </div>

              {/* quick feature chips */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="px-3 py-2 bg-white/5 rounded-full text-sm text-gray-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-300" />
                  SEO-optimized copy
                </div>
                <div className="px-3 py-2 bg-white/5 rounded-full text-sm text-gray-200 flex items-center gap-2">
                  <Pen className="w-4 h-4 text-indigo-300" />
                  Multilingual support
                </div>
                <div className="px-3 py-2 bg-white/5 rounded-full text-sm text-gray-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  Consistent brand tone
                </div>
              </div>
            </motion.div>

            {/* Illustration + small preview card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-sky-900/40 to-indigo-900/30 p-6 rounded-3xl border border-white/6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white">
                    <Pen className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Example output</div>
                    <h3 className="text-lg font-semibold mt-1">
                      "Luxe Satin Evening Dress — Midnight Blue"
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 max-w-md">
                      Elegant satin finish, floor-length silhouette, concealed
                      side zipper, and machine-washable lining. Perfect for
                      weddings, formal events and evening outings.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <div className="px-3 py-1 rounded-md bg-white/6 text-xs text-gray-200">
                        SEO: high
                      </div>
                      <div className="px-3 py-1 rounded-md bg-white/6 text-xs text-gray-200">
                        Tone: Premium
                      </div>
                      <div className="px-3 py-1 rounded-md bg-white/6 text-xs text-gray-200">
                        Lang: EN, FR, ES
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* small floating stat */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 right-6 bg-gradient-to-br from-emerald-600 to-cyan-400 text-[#021025] rounded-2xl px-5 py-3 shadow-2xl font-semibold"
              >
                <div className="text-sm">Time to publish</div>
                <div className="text-2xl">~ 90% faster</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-center mb-8"
          >
            How it works — simple, transparent pipeline
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-[#071027]/60 border border-white/6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-sky-500/80 flex items-center justify-center text-white">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">1. Extract</h3>
              </div>
              <p className="text-sm text-gray-300">
                Upload product images and structured attributes — AI isolates
                product regions, color, texture, and key visual cues.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="p-6 rounded-2xl bg-[#071027]/60 border border-white/6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/80 flex items-center justify-center text-white">
                  <ListChecks className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">2. Normalize & Map</h3>
              </div>
              <p className="text-sm text-gray-300">
                Convert extracted cues into standardized attributes and taxonomy
                mapped to shopper language and SEO keywords.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5 }}
              className="p-6 rounded-2xl bg-[#071027]/60 border border-white/6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-400/90 flex items-center justify-center text-[#021025]">
                  <Pen className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">3. Generate</h3>
              </div>
              <p className="text-sm text-gray-300">
                Produce SEO-optimized titles and multi-paragraph descriptions in
                a consistent brand voice. Export directly to CMS or CSV.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS + CHARTS */}
      <section className="py-12 bg-[#040618]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-3 gap-4">
              <AnimatedStat value="90%" label="Faster time to market" />
              <AnimatedStat value="40%" label="Higher conversion rate" />
              <AnimatedStat value="20%" label="Avg. Order Value uplift" />
            </div>

            <div className="bg-white/3 p-6 rounded-2xl border border-white/6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-semibold">Manual vs AI — Time (min)</h4>
                  <div className="text-sm text-gray-300">
                    Typical time to craft a product listing title + description
                  </div>
                </div>
                <div className="text-sm text-gray-300">Faster publishing with AI</div>
              </div>

              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="label" tick={{ fill: "#cbd5e1" }} />
                    <YAxis tick={{ fill: "#cbd5e1" }} />
                    <Tooltip />
                    <Bar dataKey="time" fill="url(#colorTime)" radius={[6, 6, 0, 0]} />
                    <defs>
                      <linearGradient id="colorTime" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* SEO trend */}
          <div className="mt-8 bg-white/3 p-6 rounded-2xl border border-white/6">
            <h4 className="font-semibold mb-3">SEO Impact Over Time</h4>
            <p className="text-sm text-gray-300 mb-4">
              Example trend: improved CTR and listing traffic after switching to AI-generated
              SEO descriptions.
            </p>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={seoTrend}>
                  <CartesianGrid stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="month" tick={{ fill: "#cbd5e1" }} />
                  <YAxis tick={{ fill: "#cbd5e1" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="manual" stroke="#94a3b8" strokeWidth={2} />
                  <Line type="monotone" dataKey="ai" stroke="#60a5fa" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold mb-6"
          >
            Why BigO Lens for Description Generation
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              Icon={BarChart3}
              title="Data-backed copy"
              desc="AI uses product signals & search intent to craft descriptions that convert."
            />
            <FeatureCard
              Icon={ListChecks}
              title="Taxonomy & control"
              desc="Full control over tags, tone, and SEO templates. Review & approve at scale."
            />
            <FeatureCard
              Icon={Sparkles}
              title="Scale & speed"
              desc="Generate thousands of listings in minutes with consistent voice and compliance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 bg-gradient-to-r from-sky-900 to-indigo-900">
        <div className="container mx-auto px-6 text-center">
          <h4 className="text-2xl font-bold mb-3">Supercharge your product storytelling</h4>
          <p className="text-gray-300 mb-6">
            Try AI-powered description generation and reduce time to market while improving SEO
            performance.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/book-demo">
              <button className="px-6 py-3 rounded-full bg-white text-[#041028] font-semibold">
                Book a Personalized Demo
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-6 py-3 rounded-full border border-white/10 text-white">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DescriptionGeneration;
