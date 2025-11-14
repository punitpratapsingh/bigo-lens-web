import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import { 
  ArrowRight, Shield, Zap, Users, Award, Globe, 
  Rocket, Cpu, Eye, Sparkles, BarChart3, CheckCircle,
  Target, Heart, Clock, TrendingUp, Star, Lightbulb,
  Search, Tag, Database, Settings, Monitor, ArrowUpRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 🖼️ Asset imports
import companyHero from "@/assets/growth-insights.png";
import teamImage from "@/assets/icon2.png";
import innovationImage from "@/assets/innovation-image.png";
import platformImage from "@/assets/1 (13).png";
import partnershipImage from "@/assets/partnership-image.png";

// 🔁 Fade-in animation reusable
const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

const WhyBigOLens = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />

      {/* 🎯 HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-cyan-400/30"
              >
                <Lightbulb className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-100">Our Story</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight"
              >
                Why
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
                  BigOLens?
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-blue-100 leading-relaxed"
              >
                BigOLens does more than simply provide retailers with the best product discovery solution in the industry. 
                Our talented team works alongside our customers to continuously map their needs to our capabilities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact">
                  <Button size="lg" className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl transition-all duration-300">
                    <Users className="mr-2 w-5 h-5" />
                    Request a Demo
                  </Button>
                </Link>
                <Link to="/classify">
                  <Button size="lg" variant="outline" className="px-8 py-6 border-2 border-blue-400/50 bg-blue-500/10 hover:bg-blue-500/20 text-white rounded-xl">
                    <Zap className="mr-2 w-5 h-5" />
                    Try Demo
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50"></div>
              <img 
                src={companyHero} 
                alt="BigOLens AI Technology" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🎯 OUR APPROACH */}
      <section className="py-28 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                Our Approach
              </h2>
              <p className="text-blue-100 max-w-3xl mx-auto text-xl">
                We go beyond providing technology - we partner with you to ensure success at every step
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Collaboration",
                description: "From proof of concept and testing to launch and scaling, our team partners with customers every step of the way.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: TrendingUp,
                title: "Optimization",
                description: "We work with customers to continuously analyze performance, recommending new ways to maximize success.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Settings,
                title: "Customization",
                description: "We understand that not all retailers are the same, so we help solve the problems that matter most to them.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <FadeInWhenVisible key={item.title}>
                <Card className="p-8 bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-3xl hover:border-cyan-500/40 transition-all duration-500 group text-center h-full">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{item.description}</p>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Results Section */}
          <FadeInWhenVisible>
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div>
                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  Powered by BigOLens Search and Recommendations, global brands and retailers help shoppers 
                  discover products faster and confidently make purchases more quickly. We also help our retail 
                  partners deliver exceptional customer experiences to grow their revenues and market share.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "45%", label: "Higher AOV" },
                    { value: "7x", label: "Conversion Lift" },
                    { value: "92%", label: "Accuracy Rate" },
                    { value: "500+", label: "Brands Trust Us" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50"></div>
                <img 
                  src={teamImage} 
                  alt="BigOLens Platform Results" 
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* 🚀 OUR PLATFORM */}
      <section className="py-28 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-cyan-500/[0.02] bg-[size:60px_60px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-100">Our Platform</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                Advanced AI Discovery Suite
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto text-xl">
                To support advanced AI capabilities, the Discovery Suite has data at its core
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Features */}
            <div className="space-y-8">
              {[
                {
                  icon: Database,
                  title: "Fast-to-ingest data",
                  description: "Retailers can quickly integrate their full product catalogs from multiple e-commerce, PIM and DAM platforms."
                },
                {
                  icon: BarChart3,
                  title: "Optimizable with A/B testing",
                  description: "Configuration rules and tracking for each placement. Test different strategies to reach desired outcomes."
                },
                {
                  icon: Monitor,
                  title: "Flexible placements",
                  description: "Easy to deploy anywhere: Homepage, Category pages, Product listing page, Out-of-stock page, Checkout page"
                },
                {
                  icon: Eye,
                  title: "Instant insights",
                  description: "From individual shopper behavior to broader customer segments, gain continuous learning about your audiences."
                },
                {
                  icon: Settings,
                  title: "Easy to fine-tune",
                  description: "Show products in price ranges, boost specific brands, hide out-of-stock products with simple customizations."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-blue-200">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Image */}
            <FadeInWhenVisible>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50"></div>
                <img 
                  src={platformImage} 
                  alt="BigOLens Platform Architecture" 
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* 💡 OUR TECHNOLOGY */}
      <section className="py-28 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-purple-400/30">
                <Rocket className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-100">Our Technology</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Built for Scale and Performance
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: TrendingUp,
                title: "Scalability",
                description: "Store and process billions of product SKU data without sacrificing performance",
                value: "Billions+ SKUs"
              },
              {
                icon: Zap,
                title: "Latency",
                description: "Lightning-fast search results generation",
                value: "< 500ms"
              },
              {
                icon: Target,
                title: "Accuracy",
                description: "Industry-leading satisfaction rate for search and recommendations",
                value: "90%+"
              },
              {
                icon: Shield,
                title: "Reliability",
                description: "High availability with exceptional service uptime",
                value: "99.96%"
              }
            ].map((tech, index) => (
              <FadeInWhenVisible key={tech.title}>
                <Card className="p-6 bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-3xl hover:border-purple-500/40 transition-all duration-300 text-center group h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-2">{tech.value}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tech.title}</h3>
                  <p className="text-blue-200 text-sm">{tech.description}</p>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Additional Tech Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Continuous Training",
                description: "High-quality training data enables continuous improvement in recognition models and accuracy"
              },
              {
                title: "Monitoring & Reporting",
                description: "Comprehensive client console for measuring performance metrics and impact at a glance"
              },
              {
                title: "Domain Models",
                description: "Advanced models and algorithms developed specifically for online retailers"
              }
            ].map((feature, index) => (
              <FadeInWhenVisible key={feature.title}>
                <div className="text-center p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-blue-200">{feature.description}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* 🤝 OUR PARTNERS */}
      <section className="py-28 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-100">Our Partners</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                Trusted by Industry Leaders
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="p-8 bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AWS</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">AWS Advanced Partner</h3>
                    <p className="text-cyan-100">Advanced Technology Partner</p>
                  </div>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  BigOLens is an advanced technology partner of AWS, the largest on-demand cloud computing 
                  platform powering the most sophisticated AI solutions for retailers throughout the world.
                </p>
              </div>

              <div className="p-8 bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">ZL</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Zalora</h3>
                    <p className="text-purple-100">Leading Fashion E-commerce</p>
                  </div>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  Zalora is the leading name in online fashion shopping. Innovations like its data analytics 
                  platform provide brand partners with valuable insights powered by BigOLens technology.
                </p>
              </div>
            </div>

            {/* Right Content */}
            <FadeInWhenVisible>
              <div className="text-center">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12">
                  <Users className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Join Our Partner Ecosystem</h3>
                  <p className="text-blue-100 mb-8 leading-relaxed">
                    Become part of our growing network of technology partners, system integrators, 
                    and retail innovators working together to transform e-commerce.
                  </p>
                  <Link to="/contact">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl">
                      <ArrowUpRight className="mr-2 w-4 h-4" />
                      Partner With Us
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* 🎯 CTA SECTION */}
      <section className="py-28 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <FadeInWhenVisible>
            <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
              <Award className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">Get Started</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Ready to See the BigOLens Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of forward-thinking brands that are already transforming their 
              e-commerce experience with our AI-powered visual technology.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact">
                <Button size="lg" className="px-12 py-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-2xl transition-all duration-300 text-lg font-semibold">
                  <Users className="mr-3 w-6 h-6" />
                  Request a Demo
                </Button>
              </Link>
              <Link to="/classify">
                <Button size="lg" variant="outline" className="px-12 py-8 border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white rounded-2xl text-lg font-semibold">
                  <Zap className="mr-3 w-6 h-6" />
                  Try Free Demo
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyBigOLens;