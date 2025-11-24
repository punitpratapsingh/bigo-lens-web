import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Mail, ArrowLeft, CheckCircle, Shield } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 🔥 Call your backend API
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset email sent! Check your inbox.");
        setIsSubmitted(true);
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-purple-500/10 rounded-full blur-md animate-pulse delay-500"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Login */}
        <div className="mb-6">
          <Link 
            to="/login" 
            className="inline-flex items-center text-sm text-blue-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
        </div>

        <Card className="w-full shadow-2xl border-white/10 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
          {/* Gradient Top Border */}
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-blue-200 mt-2">
              {isSubmitted 
                ? "Check your email for reset instructions" 
                : "Enter your email and we'll send you a reset link"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-blue-200 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                      <Input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300 h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 font-semibold relative overflow-hidden group"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Send Reset Link
                    </>
                  )}
                </Button>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-xl text-sm text-center ${
                      message.includes("error") || message.includes("wrong")
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    }`}
                  >
                    {message}
                  </motion.div>
                )}
              </form>
            ) : (
              // Success State
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-4"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    Check Your Email
                  </h3>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    We've sent a password reset link to <br />
                    <span className="text-cyan-400 font-medium">{email}</span>
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-left">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">
                    📧 Didn't receive the email?
                  </h4>
                  <ul className="text-xs text-blue-200 space-y-1">
                    <li>• Check your spam folder</li>
                    <li>• Verify your email address is correct</li>
                    <li>• Wait a few minutes and try again</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage("");
                    }}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl h-11"
                  >
                    Try Another Email
                  </Button>
                  
                  <Link to="/login" className="block">
                    <Button
                      variant="ghost"
                      className="w-full text-blue-300 hover:text-white hover:bg-transparent rounded-xl h-11"
                    >
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Additional Help */}
            {!isSubmitted && (
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-sm text-blue-300">
                  Need help?{" "}
                  <a 
                    href= "/contact"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Contact Support
                  </a>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-blue-400/80 flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            Your security is our priority. We use industry-standard encryption.
          </p>
        </div>
      </div>
    </div>
  );
}

// Add motion import at the top if not already present
