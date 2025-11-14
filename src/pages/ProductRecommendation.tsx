import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Zap, BarChart3, Sparkles, PieChart as PieIcon } from "lucide-react";

const conversionData = [
  { month: "Jan", conv: 1.8, ctr: 3.2 },
  { month: "Feb", conv: 2.0, ctr: 3.6 },
  { month: "Mar", conv: 2.6, ctr: 4.1 },
  { month: "Apr", conv: 3.2, ctr: 4.8 },
  { month: "May", conv: 3.8, ctr: 5.2 },
  { month: "Jun", conv: 4.4, ctr: 5.9 },
  { month: "Jul", conv: 4.9, ctr: 6.3 },
  { month: "Aug", conv: 5.1, ctr: 6.5 },
  { month: "Sep", conv: 5.4, ctr: 6.9 },
  { month: "Oct", conv: 5.7, ctr: 7.2 },
];

const coverageData = [
  { cohort: "Top 10%", coverage: 92, aovLift: 18 },
  { cohort: "Top 20%", coverage: 85, aovLift: 14 },
  { cohort: "Long-tail", coverage: 42, aovLift: 6 },
];

const strategySplit = [
  { name: "Similar Items", value: 45, color: "#4EA8FF" },
  { name: "Personalized Picks", value: 30, color: "#89C2FF" },
  { name: "Shop the Look", value: 15, color: "#7C3AED" },
  { name: "Trending / Merch", value: 10, color: "#06B6D4" },
];

const KPI = ({ title, value, hint }: { title: string; value: string; hint?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45 }}
    className="bg-white/6 backdrop-blur-md border border-white/6 rounded-2xl p-6"
  >
    <div className="flex items-center justify-between">
      <h4 className="text-sm text-slate-200">{title}</h4>
      <div className="text-2xl font-extrabold text-white">{value}</div>
    </div>
    {hint && <div className="text-xs text-slate-400 mt-2">{hint}</div>}
  </motion.div>
);

export default function ProductRecommendation() {
  const [showMetric, setShowMetric] = useState<"conv" | "ctr">("conv");

  // Derived / memoized values
  const latestConv = useMemo(() => conversionData[conversionData.length - 1].conv, []);
  const avgAovLift = useMemo(
    () => (coverageData.reduce((s, d) => s + d.aovLift, 0) / coverageData.length).toFixed(1),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
      {/* HERO */}
      <Navigation />
      <header className="py-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400"
            >
              Product Recommendation Engine & Analytics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-2xl text-slate-300"
            >
              Multimodal recommendations that unite visual search and behavior signals to deliver relevant
              suggestions across the funnel. Measure uplift, tune strategies, and recover long-tail demand —
              all from one analytics console.
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/demo" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-900 font-semibold"
                >
                  Request Demo
                </motion.button>
              </Link>

              <Link to="/recommendations/tune" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-5 py-3 rounded-full bg-white/6 border border-white/8 text-white"
                >
                  Tune Strategy
                </motion.button>
              </Link>
            </div>

            {/* short theory */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="p-4 rounded-xl bg-white/4 border border-white/6"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-sky-300" />
                  <div>
                    <h5 className="font-semibold">Why recommendations?</h5>
                    <p className="text-xs text-slate-300">Increase conversion, AOV, retention and help shoppers discover relevant items faster.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="p-4 rounded-xl bg-white/4 border border-white/6"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-indigo-300" />
                  <div>
                    <h5 className="font-semibold">How it works</h5>
                    <p className="text-xs text-slate-300">
                      Blend collaborative filtering, content (visual + metadata), and session-based models. Apply business rules and A/B test strategies.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="p-4 rounded-xl bg-white/4 border border-white/6"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-sky-200" />
                  <div>
                    <h5 className="font-semibold">Types of recommenders</h5>
                    <p className="text-xs text-slate-300">
                      Similar-item (visual), Personalized (user-behavior), Session & Hybrid (real-time).
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: KPIs */}
          <aside className="w-full lg:w-96">
            <div className="grid gap-4">
              <KPI title="Conversion Rate (latest)" value={`${latestConv}%`} hint="Measured on pages with recommendations" />
              <KPI title="Avg AOV Lift" value={`${avgAovLift}%`} hint="Lift where recommendations applied" />
              <KPI title="Recommendation Coverage" value="78%" hint="Products with at least one recommendation" />
            </div>
          </aside>
        </div>
      </header>

      {/* MAIN CONTENT - Dashboard */}
      <main className="max-w-7xl mx-auto px-6 lg:px-16 pb-24">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Conversion trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/4 border border-white/6 rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Conversion & CTR Trends</h3>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setShowMetric("conv")}
                  className={`px-3 py-1 rounded-full ${showMetric === "conv" ? "bg-sky-500/80 text-slate-900" : "bg-white/6 text-slate-200"}`}
                >
                  Conversion
                </button>
                <button
                  onClick={() => setShowMetric("ctr")}
                  className={`px-3 py-1 rounded-full ${showMetric === "ctr" ? "bg-sky-500/80 text-slate-900" : "bg-white/6 text-slate-200"}`}
                >
                  CTR
                </button>
              </div>
            </div>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ background: "#0b1220" }} />
                  <Line
                    type="monotone"
                    dataKey={showMetric === "conv" ? "conv" : "ctr"}
                    stroke="#4EA8FF"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-sm text-slate-300">
              Interpretation: steady growth in conversion indicates strategy improvements — continue A/B testing recommendation UI and tuning model thresholds.
            </p>
          </motion.div>

          {/* Right: Coverage / AOV bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="bg-white/4 border border-white/6 rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-2">Recommendation Coverage vs AOV Lift</h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={coverageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="cohort" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip contentStyle={{ background: "#0b1220" }} />
                  <Legend />
                  <Bar dataKey="coverage" name="Coverage (%)" fill="#89C2FF" barSize={18} />
                  <Bar dataKey="aovLift" name="AOV Lift (%)" fill="#7C3AED" barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-sm text-slate-300">
              Action: prioritize strategies to increase coverage on long-tail SKUs — improving coverage lifts AOV across the catalog.
            </p>
          </motion.div>
        </section>

        {/* Strategy split + insights */}
        <section className="mt-8 grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2 bg-white/4 border border-white/6 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <PieIcon className="w-6 h-6 text-sky-300" />
                <h3 className="font-semibold">Recommendation Strategy Mix</h3>
              </div>
              <div className="text-sm text-slate-300">Proportions of recommendation types</div>
            </div>

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={strategySplit}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    label={(entry) => `${entry.name} (${entry.value}%)`}
                  >
                    {strategySplit.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0b1220" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {strategySplit.map((s) => (
                <div key={s.name} className="p-3 rounded-lg bg-white/6">
                  <div className="text-sm font-medium text-slate-200">{s.name}</div>
                  <div className="text-lg font-bold text-white">{s.value}%</div>
                  <div className="text-xs text-slate-300 mt-1">Use-case: {s.name === "Shop the Look" ? "Editorial, social" : "On PDP, PLP"}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Insights */}
          <motion.aside
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="bg-white/4 border border-white/6 rounded-2xl p-6"
          >
            <h4 className="font-semibold mb-3">Smart Insights</h4>
            <ul className="space-y-3 text-sm text-slate-300">  
  <li>• Personalization increases CTR — prioritize returning users for personalized picks.</li>
  <li>• Visual similarity drives discoverability for new SKUs — use on social & search.</li>
  <li>• A/B test UI placements — small UX changes can produce &gt;10% lift in add-to-cart.</li>
  <li>• Monitor cold-start items: boost via merchandising rules until model confidence increases.</li>
</ul>


            <div className="mt-6">
              <h5 className="font-medium mb-2">Quick Wins</h5>
              <ol className="text-sm text-slate-300 list-decimal list-inside space-y-2">
                <li>Enable "Similar items" on PDP & search results</li>
                <li>Run 2-week A/B test for recommendation card layout</li>
                <li>Increase coverage for long-tail SKUs by 20% with auto-tags</li>
              </ol>
            </div>
          </motion.aside>
        </section>

        {/* Case Study + CTA */}
        <section className="mt-12 grid lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white/4 border border-white/6 rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4">Case Study — Regional Retailer</h3>
            <p className="text-sm text-slate-300 mb-4">
              Implementation of hybrid recommendations (visual + behavioral) across PDP and search increased AOV by 18% and conversion by 4.5% in 90 days.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/6">
                <div className="text-xs text-slate-300">Conversion lift</div>
                <div className="text-2xl font-bold text-white">+4.5%</div>
              </div>
              <div className="p-4 rounded-lg bg-white/6">
                <div className="text-xs text-slate-300">AOV lift</div>
                <div className="text-2xl font-bold text-white">+18%</div>
              </div>
              <div className="p-4 rounded-lg bg-white/6">
                <div className="text-xs text-slate-300">Coverage increase</div>
                <div className="text-2xl font-bold text-white">+32%</div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Learnings: prioritize coverage for long-tail items first and use merchandising rules for seasonal pushes.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="bg-gradient-to-tr from-sky-700/30 to-indigo-800/30 rounded-2xl p-6 border border-white/6"
          >
            <h4 className="font-semibold mb-3">Ready to test?</h4>
            <p className="text-sm text-slate-200 mb-4">Get a customized plan — model selection, integration, and expected ROI estimate.</p>
            <div className="flex gap-3">
              <Link to="/demo">
                <button className="px-4 py-2 rounded-full bg-white/90 text-slate-900 font-semibold">Request Demo</button>
              </Link>
              <Link to="/recommendations/tune">
                <button className="px-4 py-2 rounded-full bg-white/6 border border-white/8 text-white">Tune Strategy</button>
              </Link>
            </div>
          </motion.aside>
        </section>

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
