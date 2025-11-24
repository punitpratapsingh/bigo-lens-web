import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Eye, EyeOff, Mail, Lock, Building, User, 
  CheckCircle, XCircle, ArrowRight, Shield,
  Calendar, Users, Globe, Phone, Verified
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Asset imports
import signUpImage from "/src/assets/SignUpp.png";

interface SignUpForm {
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  companySize: string;
  industry: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  termsAccepted: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  userId?: string;
  token?: string;
  user?: {
    companyName: string;
    fullName: string;
    email: string;
    role: string;
  };
  requiresVerification?: boolean;
}

export default function CompanySignUp() {
  const [formData, setFormData] = useState<SignUpForm>({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    termsAccepted: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userCredentials, setUserCredentials] = useState<{email: string; password: string} | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = (step: number): boolean => {
    setError(null);

    if (step === 1) {
      if (!formData.companyName.trim()) {
        setError("Company name is required");
        return false;
      }
      if (!formData.fullName.trim()) {
        setError("Full name is required");
        return false;
      }
      if (!formData.email.trim()) {
        setError("Email is required");
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
      if (!formData.phone.trim()) {
        setError("Phone number is required");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.companySize) {
        setError("Please select company size");
        return false;
      }
      if (!formData.industry) {
        setError("Please select industry");
        return false;
      }
    }

    if (step === 3) {
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return false;
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        setError("Password must contain uppercase, lowercase letters and numbers");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
      if (!formData.termsAccepted) {
        setError("Please accept the terms and conditions");
        return false;
      }
    }

    if (step === 4) {
      if (!formData.verificationCode.trim()) {
        setError("Verification code is required");
        return false;
      }
      if (formData.verificationCode.length !== 6) {
        setError("Verification code must be 6 digits");
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateForm(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const sendVerificationCode = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          companyName: formData.companyName
        }),
      });

      const result: ApiResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send verification code');
      }
      
      return result.success;
    } catch (error) {
      console.error('Error sending verification code:', error);
      throw error;
    }
  };

  const verifyCode = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.verificationCode
        }),
      });

      const result: ApiResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to verify code');
      }
      
      return result.success;
    } catch (error) {
      console.error('Error verifying code:', error);
      throw error;
    }
  };

  const createCompanyAccount = async (): Promise<ApiResponse> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companySize: formData.companySize,
          industry: formData.industry,
          password: formData.password
        }),
      });

      const result: ApiResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create account');
      }
      
      return result;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm(4)) return;

    setLoading(true);
    setError(null);

    try {
      // Verify the code first
      const isVerified = await verifyCode();
      if (!isVerified) {
        setError("Invalid verification code. Please try again.");
        setLoading(false);
        return;
      }

      // Create the company account
      const result = await createCompanyAccount();
      if (result.success) {
        // Store credentials for auto-login
        setUserCredentials({
          email: formData.email,
          password: formData.password
        });
        setSuccess(true);
        
        // Store token in localStorage for future authenticated requests
        if (result.token) {
          localStorage.setItem('authToken', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
        }
      } else {
        setError(result.message || "Failed to create account. Please try again.");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerification = async () => {
    if (!validateForm(3)) return;

    setLoading(true);
    setError(null);

    try {
      await sendVerificationCode();
      setVerificationSent(true);
      setCurrentStep(4);
    } catch (error: any) {
      setError(error.message || "Failed to send verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoLogin = async () => {
    if (!userCredentials) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userCredentials.email,
          password: userCredentials.password
        }),
      });

      const result: ApiResponse = await response.json();
      
      if (result.success && result.token) {
        // Store authentication data
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // Redirect to dashboard or home page
        window.location.href = 'https://bigo-lens-console.lovable.app/dashboard';
      } else {
        // If auto-login fails, redirect to login page
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Auto-login failed:', error);
      // Redirect to login page with credentials pre-filled
      window.location.href = `/login?email=${encodeURIComponent(userCredentials.email)}`;
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    if (userCredentials) {
      // Redirect to login with pre-filled email
      window.location.href = `/login?email=${encodeURIComponent(userCredentials.email)}`;
    } else {
      window.location.href = '/login';
    }
  };

  const companySizes = [
    { value: "", label: "Select company size" },
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "501-1000", label: "501-1000 employees" },
    { value: "1000+", label: "1000+ employees" }
  ];

  const industries = [
    { value: "", label: "Select industry" },
    { value: "fashion", label: "Fashion & Apparel" },
    { value: "home", label: "Home & Decor" },
    { value: "electronics", label: "Electronics" },
    { value: "beauty", label: "Beauty & Cosmetics" },
    { value: "jewelry", label: "Jewelry & Luxury" },
    { value: "sports", label: "Sports & Outdoor" },
    { value: "other", label: "Other E-commerce" }
  ];

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: "At least 8 characters" },
    { met: /[a-z]/.test(formData.password), text: "One lowercase letter" },
    { met: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
    { met: /\d/.test(formData.password), text: "One number" }
  ];

  const steps = [
    { number: 1, title: "Company Info" },
    { number: 2, title: "Business Details" },
    { number: 3, title: "Security" },
    { number: 4, title: "Verify Email" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      <div className="pt-24 pb-16">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
            {/* Left Side - Image & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 bg-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-blue-400/30"
                >
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-blue-100">Join BigOlens</span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Bigolens: 
                </h1>
                <h3 className="text-2xl lg:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Sign Up. Dive In. Empowering Ecommerce with Advanced AI Solutions. 
                </h3>
                <p className="text-xl text-blue-100 leading-relaxed mb-8">
                  Transform your e-commerce with AI-powered visual intelligence. 
                  Join hundreds of forward-thinking companies already using BigOLens.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 shadow-2xl shadow-blue-500/20 overflow-hidden">
                  <img 
                    src={signUpImage} 
                    alt="BigOLens AI Platform" 
                    className="w-full h-auto rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Users, text: "Join 500+ successful brands" },
                  { icon: Shield, text: "Enterprise-grade security & compliance" },
                  { icon: Verified, text: "Verified company accounts only" },
                  { icon: Globe, text: "24/7 dedicated support" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-blue-100">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Sign Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border border-blue-500/30 rounded-3xl p-8 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                  {steps.map((step) => (
                    <div key={step.number} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        currentStep >= step.number 
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' 
                          : 'bg-white/10 text-blue-200'
                      }`}>
                        {currentStep > step.number ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span className={`text-xs mt-2 ${
                        currentStep >= step.number ? 'text-blue-300' : 'text-blue-200/50'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 flex items-center gap-3"
                  >
                    <XCircle className="w-5 h-5" />
                    {error}
                  </motion.div>
                )}

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Welcome to BigOLens!</h3>
                    <p className="text-blue-200 mb-6">
                      Your company account has been created successfully. 
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <Button 
                        onClick={handleAutoLogin}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      >
                        {loading ? "Logging in..." : "Auto Login to Dashboard"}
                      </Button>
                      
                      <Button 
                        onClick={handleGoToLogin}
                        variant="outline"
                        className="w-full bg-transparent border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                      >
                        Go to Login Page
                      </Button>
                    </div>

                    <p className="text-blue-300 text-sm">
                      You can now access all BigOLens AI platform features.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    {/* Step 1: Company Info */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="companyName" className="text-blue-200 mb-2">
                            Company Name *
                          </Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                            <Input
                              id="companyName"
                              name="companyName"
                              type="text"
                              required
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="pl-10 bg-white/10 border-blue-500/30 text-white placeholder-blue-300"
                              placeholder="Enter company name"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="fullName" className="text-blue-200 mb-2">
                            Your Full Name *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                            <Input
                              id="fullName"
                              name="fullName"
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="pl-10 bg-white/10 border-blue-500/30 text-white placeholder-blue-300"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-blue-200 mb-2">
                            Work Email *
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="pl-10 bg-white/10 border-blue-500/30 text-white placeholder-blue-300"
                              placeholder="your@company.com"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-blue-200 mb-2">
                            Phone Number *
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="pl-10 bg-white/10 border-blue-500/30 text-white placeholder-blue-300"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Business Details */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="companySize" className="text-blue-200 mb-2">
                            Company Size *
                          </Label>
                          <select
                            id="companySize"
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-blue focus:outline-none focus:border-blue-400"
                          >
                            {companySizes.map((size) => (
                              <option key={size.value} value={size.value}>
                                {size.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="industry" className="text-blue-200 mb-2">
                            Industry *
                          </Label>
                          <select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-blue focus:outline-none focus:border-blue-400"
                          >
                            {industries.map((industry) => (
                              <option key={industry.value} value={industry.value}>
                                {industry.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Security */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="password" className="text-blue-200 mb-2">
                            Password *
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              required
                              value={formData.password}
                              onChange={handleInputChange}
                              className="pl-10 pr-10 bg-white/10 border-blue-500/30 text-white placeholder-blue-300"
                              placeholder="Create a strong password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-blue-400 hover:text-blue-300"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          
                          {/* Password Requirements */}
                          <div className="mt-3 space-y-2">
                            {passwordRequirements.map((req, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                {req.met ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                )}
                                <span className={req.met ? "text-green-400" : "text-red-400"}>
                                  {req.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="confirmPassword" className="text-blue-200 mb-2">
                            Confirm Password *
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              required
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="pl-10 pr-10 bg-white/10 border-blue-500/30 text-white placeholder-blue-300"
                              placeholder="Confirm your password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-blue-400 hover:text-blue-300"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="termsAccepted"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                            className="mt-1 w-4 h-4 text-blue-500 bg-white/10 border-blue-500/30 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <Label htmlFor="termsAccepted" className="text-blue-200 text-sm">
                            I agree to the BigOLens{" "}
                            <a href="/login/signUp/terms-of-service" className="text-blue-400 hover:text-blue-300 underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/login/signUp/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                              Privacy Policy
                            </a>
                          </Label>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Email Verification */}
                    {currentStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 text-center"
                      >
                        <Verified className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Verify Your Email</h3>
                        <p className="text-blue-200 mb-6">
                          We've sent a 6-digit verification code to{" "}
                          <span className="text-blue-300 font-semibold">{formData.email}</span>
                        </p>
                        
                        <div>
                          <Label htmlFor="verificationCode" className="text-blue-200 mb-2">
                            Verification Code *
                          </Label>
                          <Input
                            id="verificationCode"
                            name="verificationCode"
                            type="text"
                            required
                            maxLength={6}
                            value={formData.verificationCode}
                            onChange={handleInputChange}
                            className="text-center text-xl tracking-widest bg-white/10 border-blue-500/30 text-white"
                            placeholder="000000"
                          />
                        </div>

                        <p className="text-blue-300 text-sm">
                          Didn't receive the code?{" "}
                          <button
                            type="button"
                            onClick={handleSendVerification}
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            Resend code
                          </button>
                        </p>
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-4">
                      {currentStep > 1 && currentStep < 4 && (
                        <Button
                          type="button"
                          onClick={handlePrevStep}
                          variant="outline"
                          className="flex-1 bg-transparent border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                        >
                          Back
                        </Button>
                      )}
                      
                      {currentStep < 3 && (
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                      
                      {currentStep === 3 && (
                        <Button
                          type="button"
                          onClick={handleSendVerification}
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          {loading ? "Sending..." : "Send Verification Code"}
                          <Mail className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                      
                      {currentStep === 4 && (
                        <Button
                          type="button"
                          onClick={handleSubmit}
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                        >
                          {loading ? "Creating Account..." : "Create Account"}
                          <CheckCircle className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>

                    <p className="text-center text-blue-300 text-sm">
                      Already have an account?{" "}
                      <a href="/login" className="text-blue-200 hover:text-blue-300 font-semibold">
                        Sign in here
                      </a>
                    </p>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}