import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Mic, Target, Zap, ArrowRight, Search, Filter, ExternalLink, Sparkles, Heart, Share2 } from "lucide-react";

type Event = {
  id: string;
  name: string;
  description: string;
  category: string;
  bigOlensOfferings: string[];
  initiatives: string[];
  sessions: string[];
  discussions: string[];
  image: string;
  status: "completed";
  partnersCount: number;
  sessionsCount: number;
  initiativesCount: number;
};

const EVENTS: Event[] = [
  {
    id: "wedding-asia-2025",
    name: "Wedding Asia Mumbai",
    description: "Premier wedding exhibition bringing together top-tier vendors and showcasing the latest trends in wedding planning and services.",
    category: "Wedding & Bridal",
    bigOlensOfferings: [
      "Virtual Try-On for wedding attire",
      "AI-powered vendor matching",
      "Personalized wedding planning recommendations",
      "Digital catalog management"
    ],
    initiatives: [
      "Discussed AI-powered wedding planning assistant",
      "Introduced virtual venue visualization",
      "Partnered with 15+ wedding planners"
    ],
    sessions: [
      "AI in Wedding Industry: Future Trends",
      "Digital Transformation for Wedding Businesses",
      "Personalization at Scale"
    ],
    discussions: [
      "Met with 50+ wedding planners and venue owners",
      "Discussed AI integration with fashion designers",
      "Collaborated with jewelry brands for virtual try-on"
    ],
    image: "/src/assets/events/Wedding Asia Mumbai.jpg",
    status: "completed",
    partnersCount: 45,
    sessionsCount: 3,
    initiativesCount: 3
  },
  {
    id: "iijs-signature-2026",
    name: "IIJS Signature Show",
    description: "18th edition of India's premier gems and jewellery exhibition showcasing exquisite collections and industry innovations.",
    category: "Gems & Jewelry",
    bigOlensOfferings: [
      "Virtual jewelry try-on technology",
      "AI-powered gemstone classification",
      "Personalized jewelry recommendations",
      "Inventory management automation"
    ],
    initiatives: [
      "Demonstrated real-time jewelry visualization",
      "Discussed AI gem quality assessment",
      "Established partnerships with 20+ jewelers"
    ],
    sessions: [
      "Digital Transformation in Jewelry Retail",
      "AI for Personalized Customer Experiences",
      "Virtual Try-On Revolution"
    ],
    discussions: [
      "Engaged with leading jewelry manufacturers",
      "Discussed AI integration with retail chains",
      "Explored blockchain for jewelry certification"
    ],
    image: "/src/assets/events/IIJS Signature Show.jpeg",
    status: "completed",
    partnersCount: 38,
    sessionsCount: 4,
    initiativesCount: 3
  },
  {
    id: "fashionista-nashik-2026",
    name: "Fashionista Nashik",
    description: "Platform for entrepreneurs and young designers to reach new horizons in fashion and apparel industry.",
    category: "Fashion & Apparel",
    bigOlensOfferings: [
      "AI-powered fashion recommendations",
      "Virtual fitting room technology",
      "Trend analysis and prediction",
      "Supply chain optimization"
    ],
    initiatives: [
      "Mentored 30+ emerging designers",
      "Discussed AI trend forecasting tool",
      "Established design innovation lab"
    ],
    sessions: [
      "AI in Fashion Design and Manufacturing",
      "Sustainable Fashion through Technology",
      "Digital Supply Chain Management"
    ],
    discussions: [
      "Collaborated with textile manufacturers",
      "Discussed sustainable fashion tech",
      "Engaged with retail fashion brands"
    ],
    image: "/src/assets/events/Fashionista Nashik.jpg",
    status: "completed",
    partnersCount: 52,
    sessionsCount: 3,
    initiativesCount: 4
  },
  {
    id: "unique-gems-2026",
    name: "Unique Gems and Jewellery International Show",
    description: "13th edition B2B gem and jewelry exhibition showcasing unique collections and industry innovations.",
    category: "Gems & Jewelry",
    bigOlensOfferings: [
      "3D jewelry visualization",
      "Automated quality assessment",
      "Personalized collection curation",
      "Market trend analysis"
    ],
    initiatives: [
      "Introduced AI-powered design assistance",
      "Discussed virtual exhibition platform",
      "Partnered with international gemologists"
    ],
    sessions: [
      "Future of Jewelry Retail with AI",
      "Digital Craftsmanship Enhancement",
      "Global Market Access through Technology"
    ],
    discussions: [
      "Met with international jewelry buyers",
      "Discussed export market expansion",
      "Collaborated with design institutes"
    ],
    image: "/src/assets/events/Unique Gems and Jewellery International Show.jpg",
    status: "completed",
    partnersCount: 41,
    sessionsCount: 3,
    initiativesCount: 3
  },
  {
    id: "india-jewellery-2026",
    name: "India Jewellery Show Mumbai",
    description: "Premier B2C exhibition celebrating timeless beauty and masterful craftsmanship in luxury jewellery sector.",
    category: "Gems & Jewelry",
    bigOlensOfferings: [
      "Augmented reality jewelry try-on",
      "Customer preference analysis",
      "Personalized shopping experiences",
      "Real-time inventory management"
    ],
    initiatives: [
      "Discussed mobile AR jewelry experience",
      "Introduced AI style advisor",
      "Established customer insight platform"
    ],
    sessions: [
      "Luxury Retail Transformation",
      "Customer Experience Innovation",
      "Technology in Traditional Craftsmanship"
    ],
    discussions: [
      "Engaged with luxury retail chains",
      "Discussed heritage brand digitization",
      "Collaborated with craftsmanship preservation societies"
    ],
    image: "/src/assets/events/India Jewellery Show Mumbai.jpg",
    status: "completed",
    partnersCount: 47,
    sessionsCount: 3,
    initiativesCount: 3
  },
  {
    id: "crescent-moon",
    name: "Crescent Moon Exhibition",
    description: "Exclusive exhibition showcasing premium fashion and lifestyle products with focus on innovation.",
    category: "Fashion & Beauty",
    bigOlensOfferings: [
      "AI-powered style recommendations",
      "Virtual product demonstrations",
      "Customer behavior analytics",
      "Personalized shopping assistants"
    ],
    initiatives: [
      "Introduced AI styling consultant",
      "Discussed virtual showroom experience",
      "Partnered with luxury brands"
    ],
    sessions: [
      "Future of Retail Experience",
      "AI in Luxury Fashion",
      "Digital Transformation Strategies"
    ],
    discussions: [
      "Met with high-end fashion retailers",
      "Discussed omnichannel retail solutions",
      "Collaborated with lifestyle brands"
    ],
    image: "/src/assets/events/Crescent Moon Exhibition.jpg",
    status: "completed",
    partnersCount: 36,
    sessionsCount: 3,
    initiativesCount: 3
  },
  {
    id: "india-gem-2026",
    name: "India Gem & Jewellery Show",
    description: "8th edition showcasing age-old heritage and brand new legacy in gems and jewellery industry.",
    category: "Gems & Jewelry",
    bigOlensOfferings: [
      "Gemstone authentication AI",
      "Virtual collection showcases",
      "Market trend predictions",
      "Inventory optimization"
    ],
    initiatives: [
      "Discussed AI certification verification",
      "Introduced virtual gemstone appraisal",
      "Established industry standards collaboration"
    ],
    sessions: [
      "AI in Gemstone Industry",
      "Digital Certification Standards",
      "Market Intelligence through AI"
    ],
    discussions: [
      "Engaged with gemstone laboratories",
      "Discussed industry standardization",
      "Collaborated with certification authorities"
    ],
    image: "/src/assets/events/India Gem & Jewellery Show.jpg",
    status: "completed",
    partnersCount: 44,
    sessionsCount: 3,
    initiativesCount: 3
  },
  {
    id: "denim-show-2026",
    name: "Denim Show",
    description: "Prominent tradeshow showcasing latest trends and innovations in denim and apparel industry.",
    category: "Fashion & Apparel",
    bigOlensOfferings: [
      "Fabric quality analysis AI",
      "Trend forecasting algorithms",
      "Sustainable manufacturing insights",
      "Supply chain optimization"
    ],
    initiatives: [
      "Discussed sustainable fashion AI",
      "Introduced fabric innovation platform",
      "Partnered with denim manufacturers"
    ],
    sessions: [
      "Sustainable Fashion Technology",
      "AI in Textile Manufacturing",
      "Digital Supply Chain Solutions"
    ],
    discussions: [
      "Met with textile manufacturers",
      "Discussed sustainable practices",
      "Collaborated with fashion brands"
    ],
    image: "/src/assets/events/Denim Show.jpg",
    status: "completed",
    partnersCount: 39,
    sessionsCount: 3,
    initiativesCount: 3
  },
  {
    id: "hair-beauty-2026",
    name: "Hair & Beauty Show India",
    description: "Inspiring creativity in beauty industry with latest trends and technologies.",
    category: "Beauty & Cosmetics",
    bigOlensOfferings: [
      "Virtual makeup try-on",
      "Skin analysis AI",
      "Personalized beauty regimens",
      "Product recommendation engine"
    ],
    initiatives: [
      "Discussed AI beauty consultant",
      "Introduced virtual salon experience",
      "Partnered with cosmetic brands"
    ],
    sessions: [
      "Beauty Tech Revolution",
      "AI in Personal Care",
      "Digital Beauty Experiences"
    ],
    discussions: [
      "Engaged with salon chains",
      "Discussed beauty tech integration",
      "Collaborated with cosmetic companies"
    ],
    image: "/src/assets/events/Hair & Beauty Show India.jpg",
    status: "completed",
    partnersCount: 42,
    sessionsCount: 3,
    initiativesCount: 3
  },
  {
    id: "fibers-yarns-2026",
    name: "Fibers N Yarns Expo",
    description: "India's premier trade fair dedicated to fibers and yarns sector showcasing innovations.",
    category: "Fashion & Apparel",
    bigOlensOfferings: [
      "Yarn quality assessment AI",
      "Supply chain optimization",
      "Market demand forecasting",
      "Sustainable material analysis"
    ],
    initiatives: [
      "Discussed textile innovation platform",
      "Introduced sustainable sourcing AI",
      "Partnered with textile mills"
    ],
    sessions: [
      "Textile Industry Digitalization",
      "AI in Material Science",
      "Sustainable Fashion Supply Chain"
    ],
    discussions: [
      "Met with textile manufacturers",
      "Discussed material innovation",
      "Collaborated with fashion houses"
    ],
    image: "/src/assets/events/Fibers N Yarns Expo.jpg",
    status: "completed",
    partnersCount: 48,
    sessionsCount: 3,
    initiativesCount: 3
  },
  {
    id: "fashionista-mumbai-2025",
    name: "Fashionista Mumbai",
    description: "Platform for entrepreneurs and young designers to reach new horizons in fashion industry.",
    category: "Fashion & Apparel",
    bigOlensOfferings: [
      "Design assistance AI",
      "Market entry strategy",
      "Customer segmentation",
      "Brand positioning analysis"
    ],
    initiatives: [
      "Mentored startup fashion brands",
      "Discussed design innovation program",
      "Established incubation support"
    ],
    sessions: [
      "Fashion Entrepreneurship",
      "Digital Brand Building",
      "Market Access Strategies"
    ],
    discussions: [
      "Met with emerging designers",
      "Discussed manufacturing challenges",
      "Collaborated with fashion schools"
    ],
    image: "/src/assets/events/Fashionista Mumbai.jpg",
    status: "completed",
    partnersCount: 28,
    sessionsCount: 2,
    initiativesCount: 2
  },
  {
    id: "professional-beauty-2025",
    name: "Professional Beauty Mumbai",
    description: "Premier tradeshow dedicated to fashion and beauty industry showcasing latest products.",
    category: "Beauty & Cosmetics",
    bigOlensOfferings: [
      "Virtual product testing",
      "Beauty trend analysis",
      "Personalized regimen planning",
      "Ingredient analysis AI"
    ],
    initiatives: [
      "Discussed virtual beauty counter",
      "Introduced ingredient compatibility checker",
      "Partnered with cosmetic chemists"
    ],
    sessions: [
      "Beauty Tech Innovation",
      "Personalized Cosmetics",
      "Digital Beauty Experiences"
    ],
    discussions: [
      "Engaged with beauty brands",
      "Discussed product development",
      "Collaborated with research labs"
    ],
    image: "/src/assets/events/Professional Beauty Mumbai.jpg",
    status: "completed",
    partnersCount: 35,
    sessionsCount: 4,
    initiativesCount: 3
  },
  {
    id: "iifjas-2025",
    name: "India International Fashion Jewellery & Accessories Show",
    description: "International fashion jewellery industry trade show featuring latest designs.",
    category: "Fashion & Jewelry",
    bigOlensOfferings: [
      "Fashion trend prediction",
      "Accessory recommendation engine",
      "Style matching algorithms",
      "Seasonal collection planning"
    ],
    initiatives: [
      "Discussed fashion AI assistant",
      "Introduced style evolution tracking",
      "Partnered with fashion influencers"
    ],
    sessions: [
      "Fashion Technology Integration",
      "Accessory Market Digitalization",
      "Trend Forecasting with AI"
    ],
    discussions: [
      "Met with accessory designers",
      "Discussed global fashion trends",
      "Collaborated with retail brands"
    ],
    image: "/src/assets/events/India International Fashion Jewellery & Accessories Show.jpg",
    status: "completed",
    partnersCount: 31,
    sessionsCount: 3,
    initiativesCount: 2
  },
  {
    id: "giftex-2025",
    name: "GIFTEX",
    description: "India's biggest corporate gifting fair showcasing innovative gifting solutions.",
    category: "Gifts & Corporate",
    bigOlensOfferings: [
      "Personalized gifting recommendations",
      "Corporate gifting automation",
      "Sentiment analysis for gifting",
      "Bulk order management"
    ],
    initiatives: [
      "Discussed AI gifting consultant",
      "Introduced corporate gifting platform",
      "Established B2B partnership network"
    ],
    sessions: [
      "Corporate Gifting Revolution",
      "Personalization at Scale",
      "AI in Relationship Management"
    ],
    discussions: [
      "Engaged with corporate HR teams",
      "Discussed employee engagement solutions",
      "Collaborated with gift manufacturers"
    ],
    image: "/src/assets/events/GIFTEX.jpg",
    status: "completed",
    partnersCount: 55,
    sessionsCount: 2,
    initiativesCount: 4
  },
  {
    id: "bridal-asia-2025",
    name: "Bridal Asia Mumbai",
    description: "Handpicked collection of bridal couture, jewellery & accessories showcasing premium products.",
    category: "Wedding & Bridal",
    bigOlensOfferings: [
      "Bridal style recommendations",
      "Virtual wedding planning",
      "Vendor matching algorithm",
      "Budget optimization tools"
    ],
    initiatives: [
      "Discussed comprehensive wedding suite",
      "Introduced AI wedding planner",
      "Established partnership network"
    ],
    sessions: [
      "Digital Wedding Planning",
      "Bridal Fashion Technology",
      "Vendor Management Systems"
    ],
    discussions: [
      "Engaged with luxury wedding planners",
      "Discussed destination wedding tech",
      "Collaborated with hospitality brands"
    ],
    image: "/src/assets/events/Bridal Asia Mumbai.jpg",
    status: "completed",
    partnersCount: 62,
    sessionsCount: 5,
    initiativesCount: 4
  },
  {
    id: "silver-show-2025",
    name: "Silver Show of India",
    description: "Comprehensive showcase of silver products and innovations in jewelry industry.",
    category: "Gems & Jewelry",
    bigOlensOfferings: [
      "Silver quality assessment",
      "Design optimization AI",
      "Market trend analysis",
      "Pricing optimization"
    ],
    initiatives: [
      "Discussed silver market insights",
      "Introduced design innovation platform",
      "Partnered with silver artisans"
    ],
    sessions: [
      "Silver Industry Digital Transformation",
      "AI in Precious Metals",
      "Market Intelligence Systems"
    ],
    discussions: [
      "Met with silver manufacturers",
      "Discussed traditional craftsmanship",
      "Collaborated with jewelry designers"
    ],
    image: "/src/assets/events/Silver Show of India.jpg",
    status: "completed",
    partnersCount: 33,
    sessionsCount: 3,
    initiativesCount: 2
  },
  {
    id: "iijs-premiere-2025",
    name: "IIJS Premiere Show",
    description: "World's second-largest gem and jewellery B2B exhibition celebrating innovation.",
    category: "Gems & Jewelry",
    bigOlensOfferings: [
      "Cutting-edge trend analysis",
      "Network optimization AI",
      "Innovation tracking",
      "Partnership matching"
    ],
    initiatives: [
      "Discussed industry innovation tracker",
      "Introduced partnership platform",
      "Established global connections"
    ],
    sessions: [
      "Global Jewelry Trends",
      "Innovation in Jewelry Industry",
      "International Market Access"
    ],
    discussions: [
      "Engaged with international buyers",
      "Discussed global market trends",
      "Collaborated with industry leaders"
    ],
    image: "/src/assets/events/IIJS Premiere Show.jpg",
    status: "completed",
    partnersCount: 67,
    sessionsCount: 6,
    initiativesCount: 5
  },
  {
    id: "pink-almari-2024",
    name: "Pink Almari",
    description: "New Year & wedding shopping exhibition featuring diverse fashion and lifestyle products.",
    category: "Fashion & Apparel",
    bigOlensOfferings: [
      "Seasonal trend analysis",
      "Personal shopping assistant",
      "Inventory optimization",
      "Customer preference learning"
    ],
    initiatives: [
      "Discussed seasonal trend predictor",
      "Introduced personalized shopping AI",
      "Partnered with fashion retailers"
    ],
    sessions: [
      "Seasonal Fashion Trends",
      "Personalized Shopping Experience",
      "Retail Technology Integration"
    ],
    discussions: [
      "Met with fashion retailers",
      "Discussed consumer behavior",
      "Collaborated with lifestyle brands"
    ],
    image: "/src/assets/events/Pink Almari.jpg",
    status: "completed",
    partnersCount: 41,
    sessionsCount: 2,
    initiativesCount: 3
  },
  {
    id: "trousseau-show-2024",
    name: "The Trousseau Show",
    description: "Exclusive wedding and lifestyle exhibition showcasing bridal and festive collections.",
    category: "Wedding & Bridal",
    bigOlensOfferings: [
      "Bridal trousseau planning",
      "Virtual wardrobe management",
      "Style coordination AI",
      "Budget planning tools"
    ],
    initiatives: [
      "Discussed trousseau planning suite",
      "Introduced virtual wardrobe assistant",
      "Partnered with bridal designers"
    ],
    sessions: [
      "Digital Trousseau Planning",
      "Bridal Fashion Coordination",
      "Wedding Budget Management"
    ],
    discussions: [
      "Engaged with bridal designers",
      "Discussed wedding planning challenges",
      "Collaborated with fashion stylists"
    ],
    image: "/src/assets/events/The Trousseau Show.jpg",
    status: "completed",
    partnersCount: 29,
    sessionsCount: 3,
    initiativesCount: 2
  },
  {
    id: "parineeti-2024",
    name: "PARINEETI - Rakhi and Trousseau Shopping",
    description: "Shopping experience with 90+ exhibitors showcasing latest collections across categories.",
    category: "Fashion & Apparel",
    bigOlensOfferings: [
      "Multi-category recommendations",
      "Virtual shopping assistant",
      "Cross-category styling",
      "Personalized discovery"
    ],
    initiatives: [
      "Discussed multi-vendor platform",
      "Introduced cross-category styling AI",
      "Partnered with diverse exhibitors"
    ],
    sessions: [
      "Multi-Category Retail",
      "Personalized Shopping",
      "Vendor Management Technology"
    ],
    discussions: [
      "Met with various product vendors",
      "Discussed retail integration",
      "Collaborated with small businesses"
    ],
    image: "/src/assets/events/PARINEETI - Rakhi and Trousseau Shopping.jpg",
    status: "completed",
    partnersCount: 74,
    sessionsCount: 4,
    initiativesCount: 3
  },
  {
    id: "bridal-show-2024",
    name: "The Bridal Show Jewellery & Wedding Exhibition",
    description: "Luxurious shopping experience featuring wedding couture and exquisite jewels.",
    category: "Wedding & Bridal",
    bigOlensOfferings: [
      "Luxury experience enhancement",
      "Premium vendor matching",
      "Exclusive collection access",
      "High-end customer service"
    ],
    initiatives: [
      "Discussed luxury experience platform",
      "Introduced premium vendor network",
      "Partnered with luxury brands"
    ],
    sessions: [
      "Luxury Retail Technology",
      "Premium Customer Experience",
      "High-End Market Digitalization"
    ],
    discussions: [
      "Engaged with luxury brands",
      "Discussed premium market needs",
      "Collaborated with high-end retailers"
    ],
    image: "/src/assets/events/The Bridal Show Jewellery & Wedding Exhibition.jpg",
    status: "completed",
    partnersCount: 38,
    sessionsCount: 3,
    initiativesCount: 2
  },
  {
    id: "bridal-jewellery-2024",
    name: "Bridal Jewellery Exhibition",
    description: "India's most premium B2C jewellery exhibition showcasing exclusive collections.",
    category: "Gems & Jewelry",
    bigOlensOfferings: [
      "Premium customer targeting",
      "Exclusive collection access",
      "Luxury market analytics",
      "High-value customer insights"
    ],
    initiatives: [
      "Discussed premium market platform",
      "Introduced luxury customer insights",
      "Partnered with exclusive jewelers"
    ],
    sessions: [
      "Premium Market Strategies",
      "Luxury Customer Engagement",
      "Exclusive Retail Technology"
    ],
    discussions: [
      "Met with premium jewelers",
      "Discussed luxury market trends",
      "Collaborated with exclusive brands"
    ],
    image: "/src/assets/events/Bridal Jewellery Exhibition.jpg",
    status: "completed",
    partnersCount: 26,
    sessionsCount: 2,
    initiativesCount: 1
  },
  {
    id: "tech-fashion-summit-2024",
    name: "Tech Fashion Summit",
    description: "Leading conference exploring the intersection of technology and fashion industry.",
    category: "Fashion & Technology",
    bigOlensOfferings: [
      "Smart fabric analysis",
      "Wearable tech integration",
      "Supply chain digitalization",
      "Consumer behavior prediction"
    ],
    initiatives: [
      "Discussed tech-fashion integration platform",
      "Introduced smart manufacturing solutions",
      "Partnered with tech startups"
    ],
    sessions: [
      "Future of Fashion Technology",
      "AI in Textile Innovation",
      "Digital Supply Chain Revolution"
    ],
    discussions: [
      "Engaged with tech innovators",
      "Discussed IoT in fashion",
      "Collaborated with research institutions"
    ],
    image: "/src/assets/events/Tech Fashion Summit.jpg",
    status: "completed",
    partnersCount: 58,
    sessionsCount: 5,
    initiativesCount: 4
  },
  {
    id: "beauty-innovation-forum-2024",
    name: "Beauty Innovation Forum",
    description: "Platform for beauty industry leaders to discuss technological advancements and market trends.",
    category: "Beauty & Cosmetics",
    bigOlensOfferings: [
      "Skin analysis technology",
      "Personalized product formulation",
      "Beauty trend forecasting",
      "Virtual try-on solutions"
    ],
    initiatives: [
      "Discussed beauty tech accelerator",
      "Introduced AI formulation assistant",
      "Partnered with cosmetic scientists"
    ],
    sessions: [
      "Beauty Tech Revolution",
      "Personalized Cosmetics Future",
      "Digital Beauty Transformation"
    ],
    discussions: [
      "Met with beauty tech startups",
      "Discussed sustainable beauty",
      "Collaborated with dermatologists"
    ],
    image: "/src/assets/events/Beauty Innovation Forum.png",
    status: "completed",
    partnersCount: 43,
    sessionsCount: 4,
    initiativesCount: 3
  }
];

const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-cyan-500/30 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Clean image - no icons */}
      </div>

      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {event.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
        <p className="text-cyan-100 text-sm mb-4 leading-relaxed">{event.description}</p>

        {/* Varying counts for each event */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Users className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <span className="text-xs text-cyan-300">{event.partnersCount}+ Partners</span>
          </div>
          <div className="text-center">
            <Mic className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <span className="text-xs text-purple-300">{event.sessionsCount} Sessions</span>
          </div>
          <div className="text-center">
            <Target className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <span className="text-xs text-green-300">{event.initiativesCount} Initiatives</span>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  BigOlens AI Services Showcased
                </h4>
                <ul className="text-xs text-cyan-100 space-y-1">
                  {event.bigOlensOfferings.map((offering, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      {offering}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-green-300 mb-2">Key Initiatives</h4>
                <ul className="text-xs text-green-100 space-y-1">
                  {event.initiatives.map((initiative, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      {initiative}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Sessions Conducted</h4>
                  <ul className="text-xs text-purple-100 space-y-1">
                    {event.sessions.map((session, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        {session}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yellow-300 mb-2">Key Discussions</h4>
                  <ul className="text-xs text-yellow-100 space-y-1">
                    {event.discussions.map((discussion, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        {discussion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 py-2 px-4 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isExpanded ? "Show Less" : "Learn More"}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

export default function EventsPage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => {
    const allCategories = EVENTS.map(event => event.category);
    return ["all", ...Array.from(new Set(allCategories))];
  }, []);

  const filteredEvents = useMemo(() => {
    return EVENTS.filter(event => {
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const totalStats = useMemo(() => {
    return {
      events: EVENTS.length,
      partners: EVENTS.reduce((sum, event) => sum + event.partnersCount, 0),
      sessions: EVENTS.reduce((sum, event) => sum + event.sessionsCount, 0),
      initiatives: EVENTS.reduce((sum, event) => sum + event.initiativesCount, 0)
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-cyan-900 text-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.header 
        className="py-20 px-6 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <Calendar className="w-10 h-10 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-xl">BIGOLENS INDUSTRY PRESENCE</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-black text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Event{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover how BigOlens is revolutionizing industries through AI-powered solutions. 
            We've participated in 50+ events, connecting with industry leaders and driving innovation across fashion, jewelry, wedding, and beauty sectors.
          </motion.p>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {/* Category Filter Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-cyan-300">Sort by Category</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-slate-700/50 text-cyan-200 border border-cyan-500/20 hover:bg-slate-600/50 hover:border-cyan-500/40"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Search Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent"
              />
            </div>
          </div>
        </motion.section>

        {/* Events Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-cyan-300 text-lg">No events found matching your criteria</div>
              <motion.button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                className="mt-4 px-6 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">{totalStats.events}+</div>
              <div className="text-cyan-200 text-sm">Events Attended</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">{totalStats.partners}+</div>
              <div className="text-purple-200 text-sm">Industry Partners</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-green-400 mb-2">{totalStats.sessions}+</div>
              <div className="text-green-200 text-sm">Sessions Conducted</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">{totalStats.initiatives}+</div>
              <div className="text-yellow-200 text-sm">Initiatives Launched</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Bottom Buttons Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl p-12 border border-cyan-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Transform Your Industry?
              </h2>
            </motion.div>
            
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
              Join the revolution and leverage BigOlens AI solutions to transform your business. 
              Let's create the future together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ExternalLink className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold text-lg rounded-xl hover:bg-cyan-400/10 backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        {/* Navigation Buttons */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            className="px-6 py-3 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-5 h-5" />
            View Our Services
          </motion.button>
          
          <motion.button
            className="px-6 py-3 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-5 h-5" />
            Meet Our Team
          </motion.button>
          
          <motion.button
            className="px-6 py-3 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Target className="w-5 h-5" />
            Our Success Stories
          </motion.button>

          <motion.button
            className="px-6 py-3 bg-pink-500/20 text-pink-300 rounded-lg border border-pink-500/30 hover:bg-pink-500/30 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5" />
            Client Testimonials
          </motion.button>

          <motion.button
            className="px-6 py-3 bg-yellow-500/20 text-yellow-300 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
            Share Our Journey
          </motion.button>
        </motion.section>
      </main>
    </div>
  );
}