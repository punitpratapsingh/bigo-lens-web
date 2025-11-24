// components/KPICarousel.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, TrendingUp, Users, ShoppingCart, DollarSign, Clock, Zap, Target } from 'lucide-react';

// KPI Data
const kpiData = [
  {
    id: 1,
    metric: "Conversion Rate",
    value: "4.8%",
    change: "+12%",
    trend: "up" as const,
    description: "Average conversion rate across all client implementations",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    details: "Up from 4.3% last quarter"
  },
  {
    id: 2,
    metric: "Average Order Value",
    value: "$145.67",
    change: "+18%",
    trend: "up" as const,
    description: "Increased basket size through personalized recommendations",
    icon: DollarSign,
    color: "from-blue-500 to-cyan-500",
    details: "Personalization driving higher value orders"
  },
  {
    id: 3,
    metric: "Visual Search Usage",
    value: "68%",
    change: "+45%",
    trend: "up" as const,
    description: "Of users engage with visual search features",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    details: "Growing adoption of AI-powered search"
  },
  {
    id: 4,
    metric: "Return Rate Reduction",
    value: "42%",
    change: "-42%",
    trend: "down" as const,
    description: "Reduction in product returns with virtual try-on",
    icon: Target,
    color: "from-orange-500 to-red-500",
    details: "Better product visualization = fewer returns"
  },
  {
    id: 5,
    metric: "User Engagement",
    value: "3.2min",
    change: "+25%",
    trend: "up" as const,
    description: "Average session duration increase",
    icon: Clock,
    color: "from-indigo-500 to-purple-500",
    details: "More time spent exploring products"
  },
  {
    id: 6,
    metric: "Customer Satisfaction",
    value: "4.9/5",
    change: "+0.4",
    trend: "up" as const,
    description: "Average customer rating across platforms",
    icon: Users,
    color: "from-cyan-500 to-blue-500",
    details: "Based on 2.1k+ reviews"
  }
];

// Industry-specific KPIs
const industryKPIs = [
  {
    industry: "Fashion & Apparel",
    metrics: [
      { label: "Size Accuracy", value: "98%", change: "+5%" },
      { label: "Style Match", value: "94%", change: "+12%" },
      { label: "Return Reduction", value: "52%", change: "-52%" }
    ]
  },
  {
    industry: "Home & Furniture",
    metrics: [
      { label: "Space Planning", value: "89%", change: "+15%" },
      { label: "Style Cohesion", value: "92%", change: "+8%" },
      { label: "Purchase Confidence", value: "4.8/5", change: "+0.6" }
    ]
  },
  {
    industry: "Electronics",
    metrics: [
      { label: "Feature Discovery", value: "78%", change: "+22%" },
      { label: "Compatibility Check", value: "95%", change: "+10%" },
      { label: "Support Queries", value: "35%", change: "-35%" }
    ]
  }
];

const KPICarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'single' | 'grid' | 'industry'>('single');
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying || viewMode !== 'single') return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % kpiData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, viewMode]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % kpiData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + kpiData.length) % kpiData.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  const CurrentKPI = kpiData[currentIndex];
  const Icon = CurrentKPI.icon;

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* View Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
          <div className="flex space-x-2">
            {[
              { key: 'single', label: 'Single View' },
              { key: 'grid', label: 'Grid View' },
              { key: 'industry', label: 'By Industry' }
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key as any)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  viewMode === mode.key
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'text-blue-200 hover:bg-white/10'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Single View Carousel */}
      {viewMode === 'single' && (
        <div className="relative">
          {/* Main KPI Display */}
          <div className="relative h-96">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 }
                }}
                className="absolute inset-0"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${CurrentKPI.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{CurrentKPI.metric}</h3>
                        <p className="text-blue-200 text-sm mt-1">{CurrentKPI.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      CurrentKPI.trend === 'up' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {CurrentKPI.change}
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 mb-4">
                      {CurrentKPI.value}
                    </div>
                    <p className="text-blue-300 text-lg">{CurrentKPI.details}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className={`h-full rounded-full ${
                        CurrentKPI.trend === 'up' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-4 rounded-2xl bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300 group"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
              ) : (
                <Play className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
              )}
            </button>

            <button
              onClick={nextSlide}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-6">
            {kpiData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-cyan-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    kpi.trend === 'up' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {kpi.change}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{kpi.metric}</h3>
                <div className="text-3xl font-bold text-white mb-2">{kpi.value}</div>
                <p className="text-blue-200 text-sm">{kpi.description}</p>
                
                <div className="mt-4 w-full bg-white/10 rounded-full h-1">
                  <div className={`h-full rounded-full ${
                    kpi.trend === 'up' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
                  }`} 
                  style={{ width: '85%' }} 
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Industry View */}
      {viewMode === 'industry' && (
        <div className="space-y-8">
          {industryKPIs.map((industry, industryIndex) => (
            <motion.div
              key={industry.industry}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: industryIndex * 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {industry.industry} Performance
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {industry.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: industryIndex * 0.2 + metricIndex * 0.1 }}
                    className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-white mb-2">
                      {metric.value}
                    </div>
                    <div className="text-blue-200 text-sm mb-2">
                      {metric.label}
                    </div>
                    <div className={`text-xs font-semibold ${
                      metric.change.startsWith('+') 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {metric.change}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      >
        {[
          { label: "Active Clients", value: "500+" },
          { label: "Countries", value: "45+" },
          { label: "Daily API Calls", value: "10M+" },
          { label: "Uptime", value: "99.9%" }
        ].map((stat, index) => (
          <div key={stat.label} className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
            <div className="text-blue-300 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default KPICarousel;