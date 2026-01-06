import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Zap,
  Shield,
  CheckCircle,
  Star,
  Building,
  UserCog
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 🖼️ Asset imports
import loginImage from "/src/assets/login.png";
import backgroundPattern from "/src/assets/case1.png";

type LoginType = 'admin' | 'client';

export default function Login() {
  const [loginType, setLoginType] = useState<LoginType>('client');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    companyCode: "" // For client login
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect based on login type
    if (loginType === 'admin') {
      window.location.href = "https://bigo-insight-hub.lovable.app/";
    } else {
      window.location.href = "https://bigo-lens-console.lovable.app/dashboard";
    }
    
    setIsLoading(false);
  };

  const getDashboardUrl = () => {
    return loginType === 'admin' 
      ? "https://bigo-lens-console.lovable.app/admin-dashboard"
      : "https://bigo-lens-console.lovable.app/client-dashboard";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <div className="max-w-md mx-auto lg:mx-0 w-full">
                {/* Header */}
                <div className="text-center lg:text-left mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-cyan-400/30"
                  >
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-100">Secure Login</span>
                  </motion.div>

                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    {loginType === 'admin' ? 'Admin Portal' : 'Client Dashboard'}
                  </h1>
                  <p className="text-blue-100 text-lg">
                    {loginType === 'admin' 
                      ? 'Access the BigOLens administration panel to manage clients and platform settings.'
                      : 'Sign in to your company dashboard and continue transforming your business with AI.'
                    }
                  </p>
                </div>

                {/* Login Type Selector */}
                <div className="flex bg-white/10 backdrop-blur-md rounded-2xl p-2 mb-6 border border-blue-500/30">
                  <button
                    type="button"
                    onClick={() => setLoginType('client')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                      loginType === 'client' 
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                        : 'text-blue-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    Client Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType('admin')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                      loginType === 'admin' 
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                        : 'text-blue-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <UserCog className="w-4 h-4" />
                    Admin Login
                  </button>
                </div>

                {/* Login Form */}
                <Card className="bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        {loginType === 'admin' ? 'Admin Email' : 'Work Email'}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-blue-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder={loginType === 'admin' ? "admin@bigolens.com" : "Enter your work email"}
                        />
                      </div>
                    </div>

                    {/* Company Code Field - Only for Client Login */}
                    {loginType === 'client' && (
                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">
                          Company Code
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                          <input
                            type="text"
                            name="companyCode"
                            value={formData.companyCode}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/10 border border-blue-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                            placeholder="Enter your company code"
                          />
                        </div>
                      </div>
                    )}

                    {/* Password Field */}
                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-blue-500/30 rounded-xl pl-12 pr-12 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-cyan-400 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="w-4 h-4 text-cyan-500 bg-white/10 border-blue-500/30 rounded focus:ring-cyan-500 focus:ring-2"
                        />
                        <span className="text-blue-200 text-sm">Remember me</span>
                      </label>
                      
                      <Link 
                        to="/forgot-password" 
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r ${
                        loginType === 'admin' 
                          ? 'from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' 
                          : 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                      } disabled:from-slate-600 disabled:to-slate-700 text-white border-0 rounded-xl py-4 text-lg font-semibold transition-all duration-300 shadow-lg ${
                        loginType === 'admin' ? 'shadow-purple-500/25' : 'shadow-cyan-500/25'
                      } disabled:shadow-none disabled:cursor-not-allowed`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Signing In...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          {loginType === 'admin' ? 'Access Admin Panel' : 'Access Client Dashboard'}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                      )}
                    </motion.button>

                    {/* Divider */}
                    <div className="relative flex items-center py-4">
                      <div className="flex-grow border-t border-blue-500/30"></div>
                      <span className="flex-shrink mx-4 text-blue-300 text-sm">or</span>
                      <div className="flex-grow border-t border-blue-500/30"></div>
                    </div>

                    {/* Sign Up Link - Only show for client login */}
                    {loginType === 'client' && (
                      <div className="text-center">
                        <p className="text-blue-200">
                          Don't have an account?{" "}
                          <Link 
                            to="/signUp" 
                            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                          >
                            Sign up now
                          </Link>
                        </p>
                      </div>
                    )}

                    {/* Admin Notice */}
                    {loginType === 'admin' && (
                      <div className="text-center p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                        <p className="text-purple-200 text-sm">
                          Admin access requires special permissions. Contact system administrator if needed.
                        </p>
                      </div>
                    )}
                  </form>
                </Card>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 grid grid-cols-3 gap-4 text-center"
                >
                  {[
                    { value: "500+", label: "Clients" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "A+", label: "Security" }
                  ].map((stat, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-sm font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-blue-200 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Image & Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Background Pattern */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-5 rounded-3xl"
                  style={{ backgroundImage: `url(${backgroundPattern})` }}
                ></div>
                
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-3xl p-8 backdrop-blur-md">
                  <img 
                    src={loginImage} 
                    alt="BigOLens AI Dashboard Preview" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500 rounded-full blur-sm animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Features Overlay - Changes based on login type */}
                <div className="absolute -bottom-8 -left-8 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 shadow-2xl max-w-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    {loginType === 'admin' ? 'Admin Features' : 'Platform Features'}
                  </h3>
                  <ul className="space-y-3">
                    {loginType === 'admin' ? [
                      "Client Management",
                      "Platform Analytics",
                      "System Configuration",
                      "User Permissions"
                    ] : [
                      "Real-time Visual Search",
                      "AI Auto Tagging",
                      "Personalized Recommendations",
                      "Advanced Analytics"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-blue-100 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial Card */}
                <div className="absolute -top-8 -right-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 shadow-2xl max-w-xs">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-100 text-sm italic mb-3">
                    {loginType === 'admin' 
                      ? "The admin panel gives us complete control and visibility over all client implementations."
                      : "BigOLens transformed our e-commerce with AI-powered visual search. Incredible results!"
                    }
                  </p>
                  <div className="text-cyan-100 text-sm font-semibold">
                    {loginType === 'admin' 
                      ? "- System Administrator"
                      : "- Sarah Chen, Fashion Retail Co."
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}