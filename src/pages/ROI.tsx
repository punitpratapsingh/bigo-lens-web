import React, { useState } from "react";
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
  Legend,
} from "recharts";

const ROICalculator: React.FC = () => {
  const [industry, setIndustry] = useState("Fashion");
  const [location, setLocation] = useState("North America");
  const [traffic, setTraffic] = useState(350000);
  const [avgPrice, setAvgPrice] = useState(130);
  const [skus, setSkus] = useState(3700);

  // --- Simulated ROI model ---
  const multiplier =
    industry === "Fashion"
      ? 1.3
      : industry === "Home Decor"
      ? 1.2
      : industry === "Jewelry"
      ? 1.5
      : 1;

  const uplift = (traffic * avgPrice * 0.002 * multiplier) / 1000;
  const roi = (uplift / (traffic * 0.001)) * 100;

  const graphData = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    baseline: uplift * 0.6 + i * 10,
    withAI: uplift * 0.6 + i * 10 * multiplier * 1.4,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-16 font-sans">
      
      {/* Hero */}
      <section className="text-center mb-12">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ROI Calculator
        </motion.h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Find out how much revenue you’re leaving on the table. Get a
          custom-calculated estimation of the ROI your brand can see with our
          AI-powered Product Discovery Platform — based on your vertical,
          location, and unique metrics.
        </p>
      </section>

      {/* Input Section */}
      <motion.section
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl max-w-5xl mx-auto mb-16 border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Customize Your Inputs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Industry */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              What industry are you in?
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-2 rounded-lg text-gray-900"
            >
              <option>Fashion</option>
              <option>Home Decor</option>
              <option>Jewelry</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Where are you located?
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 rounded-lg text-gray-900"
            >
              <option>North America</option>
              <option>Europe</option>
              <option>APAC</option>
            </select>
          </div>

          {/* Traffic */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Monthly Traffic (sessions)
            </label>
            <input
              type="number"
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
              className="w-full p-2 rounded-lg text-gray-900"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Average Product Price ($)
            </label>
            <input
              type="number"
              value={avgPrice}
              onChange={(e) => setAvgPrice(Number(e.target.value))}
              className="w-full p-2 rounded-lg text-gray-900"
            />
          </div>

          {/* SKUs */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Total SKUs on Site
            </label>
            <input
              type="number"
              value={skus}
              onChange={(e) => setSkus(Number(e.target.value))}
              className="w-full p-2 rounded-lg text-gray-900"
            />
          </div>
        </div>

        {/* ROI Output */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-300 mb-2">Estimated Monthly Uplift</p>
          <motion.h3
            className="text-5xl font-bold text-green-400"
            key={uplift}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            ${uplift.toFixed(2)}
          </motion.h3>
          <p className="text-gray-400 mt-2">
            Projected ROI:{" "}
            <span className="text-cyan-400 font-semibold">
              {roi.toFixed(1)}%
            </span>
          </p>
        </div>
      </motion.section>

      {/* Graph Section */}
      <motion.section
        className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="text-2xl mb-4 text-center text-cyan-400">
          Projected Monthly Growth with AI
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30,30,50,0.9)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#ff0080"
              strokeWidth={2}
              name="Without AI"
            />
            <Line
              type="monotone"
              dataKey="withAI"
              stroke="#00e0ff"
              strokeWidth={3}
              name="With AI"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.section>

      {/* Explanation Section */}
      <section className="max-w-4xl mx-auto mt-16 text-center text-gray-300">
        <h3 className="text-3xl font-bold mb-4 text-white">
          How the Results Are Calculated
        </h3>
        <p className="text-gray-400">
          Using performance data from leading brands worldwide, we extract
          benchmarks based on your vertical and region. Then, we use your key
          metrics to estimate the uplift achievable using our AI solutions such
          as Visual Search, Hyper-Personalization, and Smart Recommendations.
        </p>
      </section>

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
          Request a Free Demo
        </button>
      </motion.div>
      <Footer />
    </div>
  );
};

export default ROICalculator;
