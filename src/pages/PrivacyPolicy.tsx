import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Lock, 
  User, 
  Database, 
  Eye,
  Cookie,
  Server,
  Mail,
  Phone,
  Globe,
  Cpu,
  Camera,
  Search,
  Tag,
  BarChart3,
  Sparkles,
  Video,
  Palette
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

export default function PrivacyPolicy() {
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
      dataTypes: ["Product images", "Search queries", "User behavior patterns"]
    },
    {
      icon: Palette,
      name: "Description Generation",
      dataTypes: ["Product specifications", "Image analysis", "Brand guidelines"]
    },
    {
      icon: Tag,
      name: "Automatic Tagging",
      dataTypes: ["Product images", "Categories", "Metadata patterns"]
    },
    {
      icon: BarChart3,
      name: "Product Recommendation & Analytics",
      dataTypes: ["Purchase history", "Browsing behavior", "User preferences"]
    },
    {
      icon: Sparkles,
      name: "Hyper-Personalization",
      dataTypes: ["User profiles", "Behavioral data", "Demographic information"]
    },
    {
      icon: Video,
      name: "Image to Video Conversion",
      dataTypes: ["Product images", "Marketing content", "User-generated content"]
    },
    {
      icon: Camera,
      name: "Virtual Try-On",
      dataTypes: ["User images", "Facial features", "Body measurements"]
    },
    {
      icon: Cpu,
      name: "Multi-Object Classification",
      dataTypes: ["Product catalogs", "Image libraries", "Visual content"]
    }
  ];

  const accordionItems: AccordionItem[] = [
    {
      id: "introduction",
      title: "1. Introduction & Scope",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p>
            This Privacy Policy describes how BigOLens AI Solutions ("we," "our," or "us") collects, uses, 
            and protects information when you use our AI-powered ecommerce services. We are committed to 
            protecting your privacy and handling your data in accordance with applicable data protection laws.
          </p>
          <p>
            This policy applies to all AI services provided through our platform, including API integrations, 
            and covers both personal data and business data processed through our systems.
          </p>
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-400 mb-2">AI Services Covered</h4>
            <p className="text-sm">
              This policy specifically addresses data processing for our AI services including machine learning 
              models, computer vision algorithms, and personalized recommendation systems.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "data-collection",
      title: "2. Information We Collect",
      icon: Database,
      content: (
        <div className="space-y-6">
          <p>
            We collect various types of information to provide and improve our AI services:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-3">Personal Data</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Contact information (email, name)</li>
                <li>Business account details</li>
                <li>API usage patterns</li>
                <li>Communication records</li>
                <li>Billing information</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <h4 className="font-semibold text-purple-400 mb-3">AI Processing Data</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Product images and descriptions</li>
                <li>User behavior analytics</li>
                <li>Facial features (Virtual Try-On)</li>
                <li>Search and preference data</li>
                <li>Content for AI processing</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-400 mb-2">Special Note: Virtual Try-On Data</h4>
            <p className="text-sm">
              For Virtual Try-On services, we process facial features and body measurements in real-time. 
              This data is processed locally when possible and is not stored unless explicitly saved by users. 
              We never use biometric data for identification purposes.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "ai-services-data",
      title: "3. Data Processing by AI Service",
      icon: Cpu,
      content: (
        <div className="space-y-6">
          <p className="font-semibold text-cyan-400">
            Each AI service processes specific types of data for optimal performance:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {aiServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="p-4 bg-white/5 rounded-lg border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-blue-200">
                    {service.dataTypes.map((type, idx) => (
                      <li key={idx}>{type}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <h4 className="font-semibold text-yellow-400 mb-2">AI Model Training</h4>
            <p className="text-sm">
              We may use anonymized, aggregated data to improve our AI models. Personal identifiers are 
              always removed before model training, and you can opt-out of this processing.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "data-usage",
      title: "4. How We Use Your Information",
      icon: Eye,
      content: (
        <div className="space-y-4">
          <p>We use collected information for the following purposes:</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-400">Service Provision</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Deliver AI-powered features</li>
                <li>Process product recommendations</li>
                <li>Generate personalized content</li>
                <li>Enable virtual try-on experiences</li>
                <li>Provide analytics insights</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-400">Service Improvement</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Enhance AI algorithm accuracy</li>
                <li>Optimize service performance</li>
                <li>Develop new features</li>
                <li>Ensure system security</li>
                <li>Provide customer support</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-400 mb-2">Legal Basis for Processing</h4>
            <p className="text-sm">
              We process your data based on: (1) Contractual necessity for service delivery, 
              (2) Legitimate interests for service improvement, (3) Consent for optional features, 
              and (4) Legal obligations where required.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "data-sharing",
      title: "5. Data Sharing & Disclosure",
      icon: Server,
      content: (
        <div className="space-y-4">
          <p>We may share your information in the following circumstances:</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Service Providers</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Cloud infrastructure providers</li>
                <li>AI model hosting services</li>
                <li>Payment processors</li>
                <li>Customer support platforms</li>
                <li>Analytics services (anonymized)</li>
              </ul>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Legal Requirements</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>To comply with legal obligations</li>
                <li>To protect our rights and property</li>
                <li>To prevent fraud or security issues</li>
                <li>To protect user safety</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
            <h4 className="font-semibold text-red-400 mb-2">Data Selling</h4>
            <p className="text-sm">
              We do not sell your personal data to third parties. We may share aggregated, 
              anonymized insights for business intelligence purposes, but this never includes 
              personally identifiable information.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "data-security",
      title: "6. Data Security Measures",
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p>We implement comprehensive security measures to protect your data:</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-green-400 mb-1">Encryption</h4>
              <p className="text-xs">End-to-end encryption for data in transit and at rest</p>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-400 mb-1">Access Control</h4>
              <p className="text-xs">Role-based access and multi-factor authentication</p>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <Database className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-400 mb-1">Monitoring</h4>
              <p className="text-xs">24/7 security monitoring and intrusion detection</p>
            </div>
          </div>

          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-400 mb-2">Security Certifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                SOC 2 Type II
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                ISO 27001
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                GDPR Compliant
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                CCPA Ready
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "data-retention",
      title: "7. Data Retention & Deletion",
      icon: Database,
      content: (
        <div className="space-y-4">
          <p>We retain data only for as long as necessary for the purposes outlined:</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 font-semibold">Data Type</th>
                  <th className="text-left py-2 font-semibold">Retention Period</th>
                  <th className="text-left py-2 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-500/30">
                  <td className="py-2">User Account Data</td>
                  <td className="py-2">While account is active + 30 days</td>
                  <td className="py-2 text-blue-300">Deleted upon account closure</td>
                </tr>
                <tr className="border-b border-gray-500/30">
                  <td className="py-2">Virtual Try-On Images</td>
                  <td className="py-2">30 days</td>
                  <td className="py-2 text-blue-300">Automatically deleted</td>
                </tr>
                <tr className="border-b border-gray-500/30">
                  <td className="py-2">AI Processing Data</td>
                  <td className="py-2">90 days</td>
                  <td className="py-2 text-blue-300">Anonymized after retention</td>
                </tr>
                <tr className="border-b border-gray-500/30">
                  <td className="py-2">Analytics Data</td>
                  <td className="py-2">26 months</td>
                  <td className="py-2 text-blue-300">Aggregated and anonymized</td>
                </tr>
                <tr>
                  <td className="py-2">Business Records</td>
                  <td className="py-2">7 years</td>
                  <td className="py-2 text-blue-300">Legal requirement</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-400 mb-2">Right to Erasure</h4>
            <p className="text-sm">
              You can request deletion of your personal data at any time. We will process deletion 
              requests within 30 days, subject to legal obligations.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "user-rights",
      title: "8. Your Data Protection Rights",
      icon: User,
      content: (
        <div className="space-y-4">
          <p>Under data protection laws, you have the following rights:</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-400">Access & Control</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-400">Preferences & Objections</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
                <li>Right to opt-out of marketing</li>
                <li>Right to lodge complaints</li>
                <li>Right to human intervention in AI decisions</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-400 mb-2">Exercising Your Rights</h4>
            <p className="text-sm">
              To exercise any of these rights, contact us at privacy@bigolens.com. We will respond 
              to all legitimate requests within 30 days and provide information free of charge.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "cookies-tracking",
      title: "9. Cookies & Tracking Technologies",
      icon: Cookie,
      content: (
        <div className="space-y-4">
          <p>We use cookies and similar technologies to enhance our services:</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Essential</h4>
              <p className="text-sm">Required for basic functionality and security</p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Analytics</h4>
              <p className="text-sm">Help us understand how services are used</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">Personalization</h4>
              <p className="text-sm">Enable AI-driven personalization features</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <h4 className="font-semibold text-yellow-400 mb-2">Cookie Management</h4>
            <p className="text-sm">
              You can control cookies through your browser settings. However, disabling essential 
              cookies may affect service functionality. Our cookie preference center allows granular 
              control over tracking technologies.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "international-transfers",
      title: "10. International Data Transfers",
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p>
            As a global AI service provider, we may transfer and process data outside your country of residence:
          </p>

          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <h4 className="font-semibold text-blue-400 mb-2">Transfer Safeguards</h4>
            <p className="text-sm">
              We use approved transfer mechanisms including Standard Contractual Clauses (SCCs) and 
              ensure that all data transfers comply with applicable data protection laws. Our primary 
              data centers are located in the EU and US with adequate protection measures.
            </p>
          </div>

          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <h4 className="font-semibold text-green-400 mb-2">Privacy Shield</h4>
            <p className="text-sm">
              While Privacy Shield is invalidated, we continue to adhere to its principles and have 
              implemented alternative transfer mechanisms to ensure adequate data protection.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "children-privacy",
      title: "11. Children's Privacy",
      icon: User,
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-red-400">
            Our AI services are not directed to individuals under the age of 16.
          </p>
          <p>
            We do not knowingly collect personal data from children under 16. If you become aware that 
            a child has provided us with personal data, please contact us immediately. If we become aware 
            that we have collected personal data from children without verification of parental consent, 
            we take steps to remove that information from our servers.
          </p>
        </div>
      )
    },
    {
      id: "policy-changes",
      title: "12. Changes to This Policy",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p>
            We may update this Privacy Policy to reflect changes in our practices or legal requirements:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Significant changes will be notified 30 days in advance</li>
            <li>Updates will be posted on our website and communicated via email</li>
            <li>Continued use of services after changes constitutes acceptance</li>
            <li>We maintain version history of all policy changes</li>
          </ul>
          <p className="font-semibold text-cyan-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      )
    },
    {
      id: "contact",
      title: "13. Contact Information",
      icon: Mail,
      content: (
        <div className="space-y-4">
          <p>For privacy-related inquiries or to exercise your rights, please contact us:</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold mb-3">Contact Channels</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-medium">Privacy Team</div>
                    <div className="text-sm text-blue-300">privacy@bigolens.com</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-medium">Data Protection Officer</div>
                    <div className="text-sm text-blue-300">dpo@bigolens.com</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-medium">Security Issues</div>
                    <div className="text-sm text-blue-300">security@bigolens.com</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold mb-3">Mailing Address</h4>
              <address className="not-italic">
                <div className="font-medium">BigOLens AI Solutions Inc.</div>
                <div className="text-sm text-blue-300 mt-2">
                  123 Data Protection Avenue<br />
                  Privacy District, CA 94025<br />
                  United States
                </div>
              </address>
              <div className="mt-4 text-xs text-blue-300">
                <strong>Response Time:</strong> Within 30 days for data requests<br />
                <strong>Emergency:</strong> 24/7 for security incidents
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
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-100">Data Protection & Privacy</span>
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              How we protect and process your data across our AI-powered ecommerce services
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Shield className="w-4 h-4 text-cyan-400" />
                GDPR & CCPA Compliant
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Lock className="w-4 h-4 text-cyan-400" />
                Enterprise-Grade Security
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Database className="w-4 h-4 text-cyan-400" />
                AI-Specific Data Protection
              </div>
            </div>
          </motion.div>

          {/* AI Services Data Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                <Cpu className="w-6 h-6 text-cyan-400" />
                AI Services Data Processing
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
                      <ul className="text-blue-200 text-xs space-y-1">
                        {service.dataTypes.slice(0, 2).map((type, idx) => (
                          <li key={idx}>• {type}</li>
                        ))}
                        {service.dataTypes.length > 2 && (
                          <li className="text-cyan-400">+{service.dataTypes.length - 2} more</li>
                        )}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Privacy Policy Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Privacy Policy Details
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

              {/* Policy Acceptance */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-6 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-center"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Policy Acceptance
                </h3>
                <p className="text-blue-200 mb-4">
                  By using our AI services, you acknowledge that you have read and understood this Privacy Policy 
                  and agree to the collection, processing, and use of your data as described herein.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Download Policy PDF
                  </Button>
                  <Button variant="outline" className="bg-transparent border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20">
                    Contact Privacy Team
                  </Button>
                  <Button variant="outline" className="bg-transparent border-green-500/30 text-green-300 hover:bg-green-500/20">
                    Data Request Portal
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