import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { 
  MapPin, Phone, Mail, Clock, Send, ArrowRight,
  MessageCircle, Building, Globe, CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitted(false);
    }, 5000);
  };

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
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-cyan-400/30"
            >
              <MessageCircle className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">Get In Touch</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight"
            >
              Contact Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-blue-100 leading-relaxed mb-8"
            >
              Ready to transform your e-commerce with AI? Let's start the conversation. 
              Our team is here to help you discover the power of visual commerce.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 📍 CONTACT & MAP SECTION */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Information */}
            <FadeInWhenVisible>
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Let's Start Your AI Journey
                  </h2>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    Whether you're looking to implement visual search, enhance product recommendations, 
                    or explore AI-powered commerce solutions, we're here to guide you every step of the way.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {/* Address */}
                  <Card className="p-6 bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Our Office</h3>
                        <p className="text-blue-100 leading-relaxed">
                          Lodha Signet, Kolshet Road<br />
                          Thane, Mumbai<br />
                          Maharashtra 400607
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Phone */}
                  <Card className="p-6 bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                        <p className="text-blue-100 text-lg mb-1">+91 22 1234 5678</p>
                        <p className="text-blue-200 text-sm">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                      </div>
                    </div>
                  </Card>

                  {/* Email */}
                  <Card className="p-6 bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                        <p className="text-blue-100 text-lg mb-1">hello@bigolens.com</p>
                        <p className="text-blue-200 text-sm">We'll respond within 2 hours</p>
                      </div>
                    </div>
                  </Card>

                  {/* Business Hours */}
                  <Card className="p-6 bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
                        <div className="space-y-1 text-blue-100">
                          <div className="flex justify-between">
                            <span>Monday - Friday</span>
                            <span className="text-cyan-100">9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span className="text-cyan-100">10:00 AM - 4:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span className="text-cyan-100">Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Map Section */}
            <FadeInWhenVisible>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Map Container */}
                  <div className="h-96 bg-gradient-to-br from-blue-900 to-purple-900 relative">
                    {/* Static Map Representation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Lodha Signet</h3>
                        <p className="text-blue-200">Kolshet Road, Thane</p>
                        <p className="text-blue-300 text-sm">Mumbai, Maharashtra 400607</p>
                      </div>
                    </div>
                    
                    {/* Map Overlay Elements */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-white text-sm font-medium">Google Maps</span>
                    </div>
                    
                    {/* Interactive Map Button */}
                    <div className="absolute bottom-4 right-4">
                      <a 
                        href="https://maps.google.com/?q=Lodha+Signet+Kolshet+Road+Thane+Mumbai"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-white text-slate-900 hover:bg-gray-100 border-0 rounded-xl">
                          <Globe className="w-4 h-4 mr-2" />
                          Open in Maps
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="p-6 border-t border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-3">How to Reach Us</h3>
                    <div className="space-y-2 text-blue-100">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-cyan-400" />
                        <span>Located in Lodha Signet, Kolshet Road</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>15 minutes from Thane Station</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>Easy access via Eastern Express Highway</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="tel:+912212345678">
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl py-6">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a href="mailto:hello@bigolens.com">
                    <Button variant="outline" className="w-full border-2 border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-white rounded-xl py-6">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Us
                    </Button>
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* 📝 CONTACT FORM SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-cyan-500/[0.02] bg-[size:60px_60px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeInWhenVisible>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                  Send Us a Message
                </h2>
                <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                  Have questions about our AI solutions? Ready to schedule a demo? 
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="p-8 lg:p-12 bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-3xl shadow-2xl">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                    <p className="text-blue-100 text-lg mb-8">
                      Thank you for reaching out. Our team will contact you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <Input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <Input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">
                          Work Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="+91 12345 67890"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">
                          Company *
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-white/10 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                        placeholder="Tell us about your project and how we can help..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl py-6 text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 w-5 h-5" />
                          Send Message
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-blue-300 text-sm">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service. 
                      We'll never share your information with third parties.
                    </p>
                  </form>
                )}
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;                                