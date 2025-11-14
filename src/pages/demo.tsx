import { motion } from "framer-motion";
import { useState } from "react";
import { 
  CheckCircle2, Zap, Users, BarChart3, Rocket, 
  Shield, ArrowRight, Calendar, Star, Target,
  Search, Sparkles, Cpu, Eye, Tag
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 🖼️ Asset imports
import demoImage from "@/assets/demo.png";
import backgroundPattern from "@/assets/background-pattern.png";

export default function RequestDemo() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate backend submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  const features = [
    {
      icon: Search,
      title: "Visual Search",
      description: "AI-powered visual search with 99.2% accuracy",
      color: "from-cyan-500 to-blue-500",
      glow: "shadow-cyan-500/25"
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Hyper-personalized product suggestions",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/25"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Data-driven insights and performance metrics",
      color: "from-green-500 to-emerald-500",
      glow: "shadow-green-500/25"
    },
    {
      icon: Tag,
      title: "Auto Tagging",
      description: "Automated product metadata generation",
      color: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/25"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with military-grade encryption",
      color: "from-blue-500 to-indigo-500",
      glow: "shadow-blue-500/25"
    },
    {
      icon: Target,
      title: "Proven ROI",
      description: "45% higher AOV and 7x conversion lift",
      color: "from-violet-500 to-purple-500",
      glow: "shadow-violet-500/25"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />
      
      <div className="pt-32 pb-20">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
            >
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">Get Started</span>
            </motion.div>

            <h1 className="text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Request a Demo
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Discover how our AI-powered platform can transform your e-commerce experience. 
              See firsthand how we drive engagement, conversion, and revenue growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Left Side - Form Section */}
            <div className="space-y-8">
              {!submitted ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl"></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold text-white mb-2">Schedule Your Demo</h2>
                      <p className="text-blue-200 mb-8">Fill out the form and we'll contact you within 24 hours</p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-blue-200 text-sm font-medium mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-blue-200 text-sm font-medium mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-blue-200 text-sm font-medium mb-2">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                            placeholder="Your Company"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-blue-200 text-sm font-medium mb-2">
                              Work Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                              placeholder="john@company.com"
                            />
                          </div>
                          <div>
                            <label className="block text-blue-200 text-sm font-medium mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-blue-200 text-sm font-medium mb-2">
                              Company Size
                            </label>
                            <select
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleChange}
                              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                            >
                              <option value="">Select size</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="201-500">201-500 employees</option>
                              <option value="501-1000">501-1000 employees</option>
                              <option value="1000+">1000+ employees</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-blue-200 text-sm font-medium mb-2">
                              Industry
                            </label>
                            <select
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                            >
                              <option value="">Select industry</option>
                              <option value="fashion">Fashion & Apparel</option>
                              <option value="home">Home & Decor</option>
                              <option value="electronics">Electronics</option>
                              <option value="beauty">Beauty & Cosmetics</option>
                              <option value="jewelry">Jewelry & Luxury</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-blue-200 text-sm font-medium mb-2">
                            What challenges are you facing?
                          </label>
                          <textarea
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
                            placeholder="Tell us about your current e-commerce challenges and goals..."
                          ></textarea>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl py-4 text-lg font-semibold transition-all duration-300 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40"
                        >
                          <Calendar className="w-5 h-5 inline mr-2" />
                          Request Demo
                          <ArrowRight className="w-4 h-4 inline ml-2" />
                        </motion.button>

                        <p className="text-center text-blue-300 text-sm">
                          By submitting, you agree to our Privacy Policy. We'll never spam you.
                        </p>
                      </form>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="text-center bg-white/5 backdrop-blur-md border border-green-500/30 rounded-3xl p-12 shadow-2xl shadow-green-500/20 relative overflow-hidden"
                >
                  {/* Success Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle2 className="text-green-400 w-20 h-20 mx-auto mb-6 drop-shadow-lg" />
                    </motion.div>
                    <h2 className="text-4xl font-bold text-white mb-4">Demo Request Received!</h2>
                    <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                      Thank you for your interest in BigOLens. Our team will contact you within 24 hours 
                      to schedule your personalized demo and discuss how we can transform your e-commerce experience.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-cyan-100">
                        <Star className="w-4 h-4 fill-current drop-shadow-sm" />
                        <span>Check your email for confirmation</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-cyan-100">
                        <Users className="w-4 h-4 drop-shadow-sm" />
                        <span>Prepare any specific questions for our experts</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 text-center"
              >
                {[
                  { value: "500+", label: "Brands", color: "text-cyan-400" },
                  { value: "45%", label: "Avg. AOV Lift", color: "text-green-400" },
                  { value: "99.2%", label: "Accuracy", color: "text-purple-400" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-lg"
                  >
                    <div className={`text-2xl font-bold ${stat.color} drop-shadow-sm`}>{stat.value}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Image & Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Main Image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20 overflow-hidden">
                  <img 
                    src={demoImage} 
                    alt="BigOLens AI Platform Demo" 
                    className="w-full h-auto rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating AI Elements */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-cyan-500 rounded-full blur-sm animate-pulse shadow-lg shadow-cyan-500/50"></div>
                  <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-purple-500 rounded-full blur-sm animate-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-4 -right-2 w-3 h-3 bg-blue-500 rounded-full blur-sm animate-pulse shadow-lg shadow-blue-500/50" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>

              {/* Features Grid */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-cyan-400 drop-shadow-sm" />
                  Platform Features
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group p-4 bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg ${feature.glow} group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 5 }}
                        >
                          <feature.icon className="w-6 h-6 text-white drop-shadow-sm" />
                        </motion.div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-100 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-blue-200 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Demo Highlights Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-pink-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/20 backdrop-blur-md">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-cyan-400 drop-shadow-sm" />
                    Demo Highlights
                  </h4>
                  <ul className="space-y-3 text-blue-100">
                    {[
                      "Live platform walkthrough",
                      "Real-time visual search demo", 
                      "ROI calculation for your business",
                      "Integration and implementation plan",
                      "Q&A with our AI experts"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-150 transition-transform duration-300 shadow-sm shadow-cyan-400/50"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}