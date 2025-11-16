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
import { 
  Zap, 
  BarChart3, 
  Sparkles, 
  PieChart as PieIcon, 
  Search,
  Lightbulb,
  Rocket,
  Globe,
  Scale,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Star
} from "lucide-react";

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
  { name: "Similar Items", value: 45, color: "#22d3ee" },
  { name: "Personalized Picks", value: 30, color: "#0ea5e9" },
  { name: "Shop the Look", value: 15, color: "#1d4ed8" },
  { name: "Trending / Merch", value: 10, color: "#0369a1" },
];

const features = [
  {
    icon: Search,
    title: "Recommend Me",
    description: "AI-powered personalized recommendations based on user behavior and preferences"
  },
  {
    icon: Zap,
    title: "Visually Similar",
    description: "Find identical or similar products using visual search technology"
  },
  {
    icon: Lightbulb,
    title: "Pairing Suggestions",
    description: "Intelligent product bundling and cross-selling recommendations"
  },
  {
    icon: Rocket,
    title: "Shop the Look",
    description: "Complete outfit and style recommendations for fashion retailers"
  }
];

const whyChooseUs = [
  {
    icon: CheckCircle,
    title: "Plug-and-Play Templates",
    description: "Easy deployment with pre-built templates and simple business rules"
  },
  {
    icon: Sparkles,
    title: "Real-time Dynamic Recommendations",
    description: "Automatic updates based on new products without manual intervention"
  },
  {
    icon: BarChart3,
    title: "Deep Conversion Analytics",
    description: "Comprehensive funnel analytics to aid data-driven decision making"
  },
  {
    icon: Users,
    title: "No-code Configuration",
    description: "Easy optimization with drag-and-drop widgets and no-code tools"
  },
  {
    icon: Globe,
    title: "A/B Testing & Preview",
    description: "Built-in testing functionality to optimize performance"
  },
  {
    icon: Scale,
    title: "Scalable Performance",
    description: "Handles peak traffic events with blazing-fast performance"
  }
];

// LogoCloud Component (Integrated)
const LogoCloud = () => {
  const logos = [
    { name: "Fashion Retail Co", src: "/logos/fashion-retail.svg" },
    { name: "TechGadgets", src: "/logos/tech-gadgets.svg" },
    { name: "HomeStyle", src: "/logos/home-style.svg" },
    { name: "BeautyBrand", src: "/logos/beauty-brand.svg" },
    { name: "SportOutlet", src: "/logos/sport-outlet.svg" },
    { name: "LuxuryGoods", src: "/logos/luxury-goods.svg" },
  ];

  return (
    <div className="py-12 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-blue-200 text-lg">Trusted by 500+ leading brands worldwide</p>
        </motion.div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="w-32 h-16 bg-white/5 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <span className="text-white font-semibold text-sm">{logo.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CustomerStories Component (Integrated)
const CustomerStories = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, Fashion Retail Co",
      content: "Increased our conversion rate by 45% in just 3 months. The visual search is incredible.",
      rating: 5,
      avatar: "/avatars/sarah-chen.jpg",
      stats: "45% conversion lift"
    },
    {
      name: "Marcus Rodriguez",
      role: "E-commerce Director",
      content: "The AI tagging saved us hundreds of hours in catalog management. ROI was immediate.",
      rating: 5,
      avatar: "/avatars/marcus-rodriguez.jpg",
      stats: "78% time savings"
    },
    {
      name: "Emily Watson",
      role: "Head of Digital",
      content: "Our customers love the personalized recommendations. Engagement is through the roof.",
      rating: 5,
      avatar: "/avatars/emily-watson.jpg",
      stats: "3.2x engagement"
    },
    {
      name: "James Kim",
      role: "VP of E-commerce",
      content: "The unified search and recommendations created a seamless shopping experience.",
      rating: 5,
      avatar: "/avatars/james-kim.jpg",
      stats: "32% AOV increase"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 mb-6">
            Loved by Industry Leaders
          </h2>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto">
            Discover how leading retailers are transforming their e-commerce with our AI-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-blue-100 mb-4 leading-relaxed">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-blue-300 text-sm">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="text-cyan-400 text-sm font-semibold">
                {testimonial.stats}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KPI = ({ title, value, hint }: { title: string; value: string; hint?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45 }}
    className="bg-white/6 backdrop-blur-md border border-white/6 rounded-2xl p-6"
  >
    <div className="flex items-center justify-between">
      <h4 className="text-sm text-blue-200">{title}</h4>
      <div className="text-2xl font-extrabold text-white">{value}</div>
    </div>
    {hint && <div className="text-xs text-blue-300 mt-2">{hint}</div>}
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
      <header className="py-20 px-6 lg:px-16 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 leading-tight"
            >
              Search & Recommendations
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                One Fluid Experience
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-2xl text-blue-100 text-xl leading-relaxed"
            >
              Unify search and recommendations with shared behavioral data that drives performance optimization for both. 
              Create seamless browse, search, and discovery experiences that convert.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/demo" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </Link>

              <Link to="/recommendations/tune" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-6 py-4 rounded-xl bg-white/6 border border-white/8 text-white font-semibold flex items-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Start Free Trial
                </motion.button>
              </Link>
            </div>

            {/* Key Benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="p-6 rounded-2xl bg-white/4 border border-white/6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-cyan-300" />
                  <div>
                    <h5 className="font-semibold text-white text-lg">Unified Platform</h5>
                    <p className="text-sm text-blue-200 mt-1">Search and recommendations powered by shared AI intelligence</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="p-6 rounded-2xl bg-white/4 border border-white/6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-blue-300" />
                  <div>
                    <h5 className="font-semibold text-white text-lg">Real-time Optimization</h5>
                    <p className="text-sm text-blue-200 mt-1">Continuous A/B testing and performance analytics</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="p-6 rounded-2xl bg-white/4 border border-white/6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-cyan-200" />
                  <div>
                    <h5 className="font-semibold text-white text-lg">Multimodal AI</h5>
                    <p className="text-sm text-blue-200 mt-1">Visual, behavioral, and contextual recommendations</p>
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
              <KPI title="Search-to-Purchase" value="32s" hint="Average time reduction" />
            </div>
          </aside>
        </div>
      </header>

      {/* Logo Cloud */}
      <LogoCloud />

      {/* FEATURES SECTION */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 mb-6">
              Plug-and-Play Recommendation Strategies
            </h2>
            <p className="text-blue-200 text-xl max-w-3xl mx-auto">
              Multiple recommendation types that get the right products in front of your customers every time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-200 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIFIED EXPERIENCE SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-900/50 to-cyan-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 mb-6">
                One Fluid Experience
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed mb-6">
                Traditional product search engines operate independently of recommendation engines, creating disconnected shopping experiences. 
                With our multimodal platform, search and recommendations work together seamlessly.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Shared behavioral data drives optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Unified AI models for search and discovery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Seamless transition between browse and search</span>
                </div>
              </div>
            </motion.div>

           <motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden"
>
  <div className="relative aspect-video rounded-xl overflow-hidden">
    <img 
      src="/src/assets/1 (9).png" 
      alt="Visual Search + AI Recommendations Dashboard"
      className="w-full h-full object-cover"
    />
    {/* Overlay for better text readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
    
    {/* Content overlay */}
    <div className="absolute bottom-6 left-6 right-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-cyan-500/30">
          <Search className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <p className="text-white font-semibold text-lg">Visual Search + AI Recommendations</p>
          <p className="text-cyan-200 text-sm">Working in perfect harmony</p>
        </div>
      </div>
      
      {/* Feature indicators */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-200 text-xs">Real-time Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <span className="text-blue-200 text-xs">AI-Powered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <span className="text-purple-200 text-xs">Multi-modal</span>
        </div>
      </div>
    </div>

    {/* Floating elements for visual interest */}
    <div className="absolute top-4 right-4 w-8 h-8 bg-cyan-500/20 rounded-full blur-sm"></div>
    <div className="absolute top-12 left-4 w-6 h-6 bg-blue-500/20 rounded-full blur-sm"></div>
  </div>
</motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 mb-6">
              Why Choose Our Platform
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-blue-200 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYTICS DASHBOARD */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 mb-6">
              Data-Driven Insights
            </h2>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Real-time ecommerce funnel optimization to improve conversions at every stage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Conversion Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Conversion & CTR Trends</h3>
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => setShowMetric("conv")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      showMetric === "conv" 
                        ? "bg-cyan-500 text-white" 
                        : "bg-white/10 text-blue-200 hover:bg-white/20"
                    }`}
                  >
                    Conversion
                  </button>
                  <button
                    onClick={() => setShowMetric("ctr")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      showMetric === "ctr" 
                        ? "bg-cyan-500 text-white" 
                        : "bg-white/10 text-blue-200 hover:bg-white/20"
                    }`}
                  >
                    CTR
                  </button>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={showMetric === "conv" ? "conv" : "ctr"}
                      stroke="#22d3ee"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#22d3ee" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Coverage vs AOV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Coverage vs AOV Lift</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coverageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="cohort" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="coverage" name="Coverage (%)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="aovLift" name="AOV Lift (%)" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Strategy Split */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieIcon className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Recommendation Strategy Mix</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={strategySplit}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {strategySplit.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                {strategySplit.map((strategy) => (
                  <div key={strategy.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: strategy.color }}
                      />
                      <span className="text-white font-medium">{strategy.name}</span>
                    </div>
                    <span className="text-cyan-400 font-semibold">{strategy.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CUSTOMER STORIES */}
      <CustomerStories />

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-cyan-900/40 to-blue-900/40">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 mb-6">
              Ready to Transform Your E-commerce?
            </h2>
            <p className="text-blue-200 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of retailers using our unified search and recommendation platform to drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Platform Demo
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl flex items-center gap-2 backdrop-blur-sm"
                >
                  <Users className="w-5 h-5" />
                  Talk to Sales
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}