import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Shield, 
  Lock, 
  User, 
  ShoppingBag, 
  Camera, 
  Zap,
  Search,
  Tag,
  BarChart3,
  Palette,
  Video,
  Sparkles,
  Cpu,
  Brain,
  Database,
  Cloud,
  Eye
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ComponentType<any>;
}

export default function TermsOfService() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["introduction"]));

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const aiServices = [
    {
      icon: Search,
      name: "Product Discovery",
      description: "AI-powered search and product finding capabilities"
    },
    {
      icon: Palette,
      name: "Description Generation",
      description: "Automated product description creation using AI"
    },
    {
      icon: Tag,
      name: "Automatic Tagging",
      description: "Intelligent product categorization and tagging"
    },
    {
      icon: BarChart3,
      name: "Product Recommendation & Analytics",
      description: "Personalized recommendations and sales analytics"
    },
    {
      icon: Sparkles,
      name: "Hyper-Personalization",
      description: "Tailored shopping experiences for each user"
    },
    {
      icon: Video,
      name: "Image to Video Conversion",
      description: "Transform product images into engaging videos"
    },
    {
      icon: Camera,
      name: "Virtual Try-On",
      description: "Augmented reality product visualization"
    },
    {
      icon: Cpu,
      name: "Multi-Object Classification",
      description: "Advanced image recognition and categorization"
    }
  ];

  const accordionItems: AccordionItem[] = [
    {
      id: "introduction",
      title: "1. Introduction & Acceptance",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p>
            Welcome to BigOLens AI Ecommerce Solutions ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our advanced AI-powered ecommerce services, APIs, and integration platforms (collectively, the "Services").
          </p>
          <p>
            By accessing, integrating, or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these Terms, you may not access or integrate our Services into your ecommerce platform.
          </p>
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-400 mb-2">AI Services Overview</h4>
            <p className="text-sm">
              Our Services leverage cutting-edge artificial intelligence and machine learning technologies to enhance ecommerce experiences. By using our Services, you acknowledge the AI-powered nature of our solutions and accept the specific terms related to AI technologies.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "services-overview",
      title: "2. AI Services Description",
      icon: Brain,
      content: (
        <div className="space-y-6">
          <p>
            BigOLens provides enterprise-grade AI solutions for ecommerce platforms, including but not limited to:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {aiServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Icon className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                    <p className="text-blue-200 text-xs">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <h4 className="font-semibold text-purple-400 mb-2">AI Technology Notice</h4>
            <p className="text-sm">
              Our Services utilize machine learning models that continuously improve through data processing. Results may vary and should be verified for critical business decisions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "api-integration",
      title: "3. API Integration & Usage",
      icon: Cloud,
      content: (
        <div className="space-y-4">
          <p>
            Access to our AI Services is primarily provided through RESTful APIs. By integrating our APIs, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use API keys securely and prevent unauthorized access</li>
            <li>Comply with rate limits and usage quotas</li>
            <li>Implement proper error handling and fallback mechanisms</li>
            <li>Not attempt to reverse engineer or decompile our APIs</li>
            <li>Use APIs only for their intended ecommerce purposes</li>
          </ul>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-green-500/10 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Allowed Usage</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Ecommerce product catalogs</li>
                <li>Customer shopping experiences</li>
                <li>Inventory management</li>
                <li>Marketing and analytics</li>
              </ul>
            </div>
            <div className="p-4 bg-red-500/10 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">Prohibited Usage</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Illegal or fraudulent activities</li>
                <li>Spam generation</li>
                <li>Harassment or abuse</li>
                <li>Military or weapons applications</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "data-processing",
      title: "4. Data Processing & Privacy",
      icon: Database,
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-cyan-400">
            Important: Our AI Services process various types of data to function effectively.
          </p>
          <p>
            By using our Services, you acknowledge that we process:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Product images and descriptions for classification and tagging</li>
            <li>User behavior data for personalization and recommendations</li>
            <li>Customer data for hyper-personalization features</li>
            <li>Visual content for virtual try-on and image conversion</li>
          </ul>

          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-400 mb-2">GDPR & CCPA Compliance</h4>
            <p className="text-sm">
              We act as a Data Processor under GDPR. We implement appropriate technical and organizational measures to ensure data protection. You remain the Data Controller for your customer data.
            </p>
          </div>

          <p>
            <strong>Data Retention:</strong> Processing data is typically retained for 30-90 days for service improvement and analytics. You can request data deletion through our privacy dashboard.
          </p>
        </div>
      )
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property Rights",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p>
            The AI models, algorithms, software, and technology powering our Services are proprietary to BigOLens and protected by intellectual property laws.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold mb-2">Our IP Includes</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Machine learning models and algorithms</li>
                <li>AI training methodologies</li>
                <li>API infrastructure and code</li>
                <li>Virtual try-on technology</li>
                <li>Image processing pipelines</li>
                <li>Recommendation engines</li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold mb-2">Your Rights Protected</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Your product catalog data</li>
                <li>Your customer information</li>
                <li>Your brand assets and content</li>
                <li>Your ecommerce platform code</li>
              </ul>
            </div>
          </div>
          
          <p className="font-semibold">
            License Grant: We grant you a limited, non-exclusive, non-transferable license to use our Services for your ecommerce operations during the subscription term.
          </p>
        </div>
      )
    },
    {
      id: "ai-limitations",
      title: "6. AI Service Limitations & Accuracy",
      icon: Eye,
      content: (
        <div className="space-y-4">
          <p className="font-semibold">
            AI-GENERATED CONTENT MAY CONTAIN INACCURACIES AND SHOULD BE VERIFIED.
          </p>
          <p>
            Our AI Services have inherent limitations:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Product descriptions may require human review for accuracy</li>
            <li>Tagging and classification may have margin of error</li>
            <li>Recommendations are based on patterns and may not suit all users</li>
            <li>Virtual try-on results are simulations, not exact representations</li>
            <li>Image-to-video conversion quality depends on input quality</li>
          </ul>

          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <h4 className="font-semibold text-yellow-400 mb-2">Accuracy Disclaimers</h4>
            <div className="text-sm space-y-2">
              <p><strong>Product Discovery:</strong> Search results are AI-ranked and may not always match user intent perfectly.</p>
              <p><strong>Description Generation:</strong> Generated content should be reviewed for brand voice and factual accuracy.</p>
              <p><strong>Virtual Try-On:</strong> Results are visual approximations and may differ from physical product appearance.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "service-levels",
      title: "7. Service Levels & Availability",
      icon: Zap,
      content: (
        <div className="space-y-4">
          <p>
            We strive to maintain high service availability but cannot guarantee uninterrupted access:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Target uptime: 99.5% for core AI services</li>
            <li>Scheduled maintenance windows communicated 48 hours in advance</li>
            <li>Emergency maintenance may occur with minimal notice</li>
            <li>API rate limits apply based on your subscription tier</li>
          </ul>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400">99.5%</div>
              <div className="text-sm text-green-300">Uptime SLA</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">&lt; 200ms</div>
              <div className="text-sm text-blue-300">Average Response</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-purple-300">Monitoring</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "pricing-payment",
      title: "8. Pricing & Payment Terms",
      icon: ShoppingBag,
      content: (
        <div className="space-y-4">
          <p>
            Our Services are offered under various subscription models:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Pay-per-API-call models for low-volume usage</li>
            <li>Monthly/annual subscriptions for enterprise clients</li>
            <li>Custom pricing for high-volume integrations</li>
            <li>All prices in US dollars unless specified otherwise</li>
          </ul>

          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="font-semibold mb-3">Billing & Cancellation</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Payment:</strong> Invoices are generated monthly. Late payments may result in service suspension.</p>
              <p><strong>Cancellation:</strong> 30-day notice required for subscription cancellation.</p>
              <p><strong>Refunds:</strong> Service fees are non-refundable except as required by law.</p>
              <p><strong>Usage Overage:</strong> Additional charges apply for usage beyond plan limits.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "data-security",
      title: "9. Data Security & Compliance",
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p>
            We implement enterprise-grade security measures to protect your data:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>End-to-end encryption for data in transit</li>
            <li>AES-256 encryption for data at rest</li>
            <li>SOC 2 Type II compliant infrastructure</li>
            <li>Regular security audits and penetration testing</li>
            <li>Role-based access controls</li>
          </ul>

          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-400 mb-2">Compliance Certifications</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>✓ GDPR Compliant</div>
              <div>✓ CCPA Ready</div>
              <div>✓ SOC 2 Type II</div>
              <div>✓ ISO 27001</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "liability",
      title: "10. Limitation of Liability",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="font-semibold">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, BIGOLENS'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM.
          </p>
          <p>
            We are not liable for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Business losses or lost revenue</li>
            <li>Inaccuracies in AI-generated content</li>
            <li>Third-party integration issues</li>
            <li>Data loss due to user error</li>
            <li>Service interruptions beyond our control</li>
          </ul>
          
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
            <h4 className="font-semibold text-red-400 mb-2">Critical Business Decisions</h4>
            <p className="text-sm">
              AI-generated insights and recommendations should not be the sole basis for critical business decisions. Always verify important information through multiple sources.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "termination",
      title: "11. Termination & Suspension",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p>
            We may suspend or terminate access for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Violation of these Terms</li>
            <li>Non-payment of fees</li>
            <li>Abusive or excessive API usage</li>
            <li>Legal or regulatory requirements</li>
            <li>Security threats or breaches</li>
          </ul>
          <p>
            Upon termination, all rights granted under these Terms will immediately cease. You must cease all use of our APIs and delete any cached or stored content generated by our Services.
          </p>
        </div>
      )
    },
    {
      id: "governing-law",
      title: "12. Governing Law & Disputes",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p>
            These Terms shall be governed by the laws of the State of Delaware, without regard to its conflict of law provisions.
          </p>
          <p>
            <strong>Dispute Resolution:</strong> Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.
          </p>
          <p>
            <strong>Class Action Waiver:</strong> You agree to resolve disputes on an individual basis and waive any right to participate in class actions.
          </p>
          <p>
            <strong>Informal Resolution:</strong> We encourage you to contact us first at legal@bigolens.com to resolve any issues informally.
          </p>
        </div>
      )
    },
    {
      id: "updates",
      title: "13. Updates to Terms",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p>
            We may update these Terms to reflect:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>New AI technologies and capabilities</li>
            <li>Changes in legal or regulatory requirements</li>
            <li>Service enhancements or modifications</li>
            <li>Security or privacy improvements</li>
          </ul>
          <p>
            We will notify you of material changes via email and through our developer portal. Continued use of our Services after changes constitutes acceptance of the modified Terms.
          </p>
          <p className="font-semibold text-cyan-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      )
    },
    {
      id: "contact",
      title: "14. Contact Information",
      icon: User,
      content: (
        <div className="space-y-4">
          <p>
            For questions about these Terms or our AI Services, please contact us:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold mb-3">Contact Channels</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Legal: legal@bigolens.com
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Support: support@bigolens.com
                </li>
                <li className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-cyan-400" />
                  API Docs: developers@bigolens.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  Phone: +1 (555) 123-4567
                </li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold mb-3">Mailing Address</h4>
              <address className="not-italic text-sm">
                BigOLens AI Solutions Inc.<br />
                123 AI Innovation Drive<br />
                Tech Valley, CA 94025<br />
                United States
              </address>
              <div className="mt-3 text-xs text-blue-300">
                <strong>Office Hours:</strong> 9:00 AM - 6:00 PM PST<br />
                <strong>Emergency Support:</strong> 24/7 for critical issues
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      <div className="pt-24 pb-16">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30"
            >
              <Brain className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">AI Ecommerce Solutions</span>
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Terms of Service
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Governing the use of BigOLens AI-powered ecommerce services and API integrations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <FileText className="w-4 h-4 text-cyan-400" />
                Last Updated: {new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Shield className="w-4 h-4 text-cyan-400" />
                Enterprise-Grade AI Solutions
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Cloud className="w-4 h-4 text-cyan-400" />
                API-First Integration
              </div>
            </div>
          </motion.div>

          {/* AI Services Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                <Zap className="w-6 h-6 text-cyan-400" />
                Our AI Ecommerce Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {aiServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-white/5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                    >
                      <Icon className="w-8 h-8 text-cyan-400 mb-3" />
                      <h3 className="font-semibold text-white text-sm mb-2">{service.name}</h3>
                      <p className="text-blue-200 text-xs">{service.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Terms Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Terms & Conditions
              </h2>
              
              <div className="space-y-4">
                {accordionItems.map((item, index) => {
                  const Icon = item.icon;
                  const isOpen = openSections.has(item.id);
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-cyan-500/20 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(item.id)}
                        className="w-full p-6 text-left bg-white/5 hover:bg-white/10 transition-colors duration-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          <span className="font-semibold text-white">{item.title}</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-cyan-400" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-6 bg-black/20 border-t border-cyan-500/10"
                        >
                          {item.content}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Final Acceptance */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-6 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-center"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Acceptance of Terms
                </h3>
                <p className="text-blue-200 mb-4">
                  By integrating or using any of our AI services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Download PDF Version
                  </Button>
                  <Button variant="outline" className="bg-transparent border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20">
                    Contact Legal Team
                  </Button>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Add missing Phone icon component
function Phone(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}