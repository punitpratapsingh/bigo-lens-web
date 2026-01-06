import { motion } from "framer-motion";
import founderImage from "/src/assets/team/images.jpg";
import { useState, useRef, useEffect } from "react";
import { 
  Users, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Briefcase,
  X,
  ExternalLink,
  Mail,
  Linkedin,
  Globe,
  FileText,
  Star,
  Shield,
  Cpu,
  Zap,
  Building,
  BadgeCheck,
  Calendar,
  BookMarked,
  BookText,
  TrendingUp,
  Microscope,
  Globe as GlobeIcon,
  Code,
  Database,
  Brain,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Ribbon,
  Target,
  Lightbulb,
  Puzzle,
  Sparkles,
  Rocket,
  Crown,
  Gem,
  Trophy,
  Medal,
  Flag,
  Heart,
  ShieldCheck,
  Lock,
  Key,
  Eye,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Download,
  Share2,
  Bookmark,
  Heart as HeartIcon,
  MessageCircle,
  ThumbsUp,
  Eye as EyeIcon,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  Maximize2,
  Minimize2,
  Grid,
  List,
  Layout,
  Camera,
  Video,
  Mic,
  Phone,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Link,
  Unlink,
  EyeOff,
  Archive,
  Inbox,
  Mail as MailIcon,
  Bell,
  Home,
  User,
  LogOut,
  CreditCard,
  Shield as ShieldIcon,
  LifeBuoy,
  Cloud,
  Server,
  HardDrive,
  Wifi,
  Bluetooth,
  Battery,
  BatteryCharging,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  Printer,
  Mouse,
  Keyboard,
  Cpu as CpuIcon,
  HardDrive as HardDriveIcon,
  Network,
  WifiOff,
  BluetoothOff,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Fallback } from "@radix-ui/react-avatar";

// Enhanced Founder's detailed data with all achievements
const founderData = {
  personal: {
    name: "Dr. Aashi Singh Bhadouria",
    title: "Founder, Managing Director & CEO",
    tagline: "AI/ML Research Specialist | Building Future of Visual Intelligence for eCommerce | Author | Patent Holder",
    image: "/src/assets/team/images.jpg",
    fallback:"https://matjournals.com/img/AashiSinghBhadouria.jpg",
    bio: "Visionary AI/ML Research and Development Specialist with extensive expertise in designing and deploying advanced intelligent systems. Founder of Pataran Labs, revolutionizing eCommerce through cutting-edge visual intelligence solutions. Internationally recognized researcher, author, patent holder, and IEEE leader with significant contributions to AI, computer vision, and machine learning.",
    location: "Mumbai, Maharashtra, India",
    experience: "8+ Years in AI/ML Research",
    availability: "Available for Consulting & Research Collaboration",
    contact: {
      email: "aashi@bigolens.com",
      linkedin: "https://linkedin.com/in/aashi-singh-bhadouria",
      scholar: "https://scholar.google.com/citations?user=e3NjL1kAAAAJ",
      orcid: "https://orcid.org/0000-0002-6753-4272",
      ieee: "https://ieeexplore.ieee.org/author/37086117852",
      researchid: "https://researchid.co/a09101995"
    }
  },

  education: [
    {
      degree: "Ph.D in Computer Science",
      institution: "Madhav Institute of Technology and Science, Gwalior",
      year: "2024 - Present",
      focus: "Advanced AI and Machine Learning Applications in Computer Vision",
      icon: <Microscope className="w-5 h-5" />,
      gpa: "Ongoing Research",
      achievements: ["Advanced AI Research", "Computer Vision Specialization"],
      duration: "3 Years"
    },
    {
      degree: "M.Tech in Computer Science & Engineering",
      institution: "Madhav Institute of Technology and Science, Gwalior",
      year: "2019",
      focus: "Specialization in Image Processing and Computer Vision",
      icon: <GraduationCap className="w-5 h-5" />,
      gpa: "8.5/10 CGPA",
      achievements: ["Image Processing Research", "Thesis on Computer Vision"],
      duration: "2 Years"
    },
    {
      degree: "B.E. in Computer Science & Engineering",
      institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal",
      year: "2016",
      focus: "Computer Science Fundamentals and Software Engineering",
      icon: <Code className="w-5 h-5" />,
      gpa: "7.8/10 CGPA",
      achievements: ["Software Engineering", "Algorithms & Data Structures"],
      duration: "4 Years"
    }
  ],

  certifications: [
    {
      name: "Machine Learning - NPTEL Star Certificate",
      provider: "NPTEL - IIT Kharagpur",
      duration: "8 weeks",
      year: "Elite Certificate",
      score: "Top 5%",
      credential: "NPTEL24ML92",
      verification: "https://nptel.ac.in/noc/verify",
      skills: ["Machine Learning", "AI Algorithms", "Statistical Modeling"]
    },
    {
      name: "Data Mining - NPTEL Star Certificate",
      provider: "NPTEL - IIT Kharagpur",
      duration: "8 weeks",
      year: "Elite Certificate",
      score: "Top 5%",
      credential: "NPTEL24DM88",
      verification: "https://nptel.ac.in/noc/verify",
      skills: ["Data Mining", "Pattern Recognition", "Big Data"]
    },
    {
      name: "Cloud Computing - NPTEL Star Certificate",
      provider: "NPTEL - IIT Kharagpur",
      duration: "8 weeks",
      year: "Elite Certificate",
      score: "Top 5%",
      credential: "NPTEL24CC85",
      verification: "https://nptel.ac.in/noc/verify",
      skills: ["Cloud Architecture", "AWS", "Azure", "Distributed Systems"]
    },
    {
      name: "Ethical Hacking - NPTEL Star Certificate",
      provider: "NPTEL - IIT Kharagpur",
      duration: "12 weeks",
      year: "Elite Certificate",
      score: "Top 5%",
      credential: "NPTEL24EH90",
      verification: "https://nptel.ac.in/noc/verify",
      skills: ["Cybersecurity", "Network Security", "Penetration Testing"]
    },
    {
      name: "Digital Image Processing - NPTEL Star Certificate",
      provider: "NPTEL - IIT Kharagpur",
      duration: "12 weeks",
      year: "Elite Certificate",
      score: "Top 5%",
      credential: "NPTEL24DIP87",
      verification: "https://nptel.ac.in/noc/verify",
      skills: ["Image Processing", "Computer Vision", "OpenCV"]
    },
    {
      name: "Big Data Computing - NPTEL Star Certificate",
      provider: "NPTEL - IIT Kanpur",
      duration: "12 weeks",
      year: "Elite Certificate",
      score: "Top 5%",
      credential: "NPTEL24BDC89",
      verification: "https://nptel.ac.in/noc/verify",
      skills: ["Big Data", "Hadoop", "Spark", "NoSQL"]
    }
  ],

  books: [
    {
      title: "Mastering Data Science: Unraveling Patterns and Predictive Analytics for Building Intelligent Systems",
      publisher: "Apple Academic Press (AAP)",
      year: "2024",
      isbn: "9781774912045",
      description: "Comprehensive guide to data science methodologies, pattern recognition, and predictive analytics for developing intelligent systems.",
      cover: "/src/assets/books/data-science.jpg",
      pages: "450",
      category: "Data Science & AI",
      status: "Published",
      link: "https://www.appleacademicpress.com/mastering-data-science",
      reviews: "4.8/5 Stars"
    },
    {
      title: "Advanced Machine Learning: Theory and Applications",
      publisher: "NOVA Science Publishers",
      year: "2024",
      isbn: "9781685078542",
      description: "In-depth exploration of machine learning theories and practical applications in modern computing environments.",
      cover: "/src/assets/books/machine-learning.jpg",
      pages: "380",
      category: "Machine Learning",
      status: "Published",
      link: "https://novapublishers.com/advanced-machine-learning",
      reviews: "4.7/5 Stars"
    }
  ],

  patents: [
    {
      title: "AI and Blockchain based Fraud Detection Device",
      number: "432780001",
      organization: "Patent Office, Government of India",
      status: "Granted",
      year: "2025",
      description: "Innovative device combining AI and blockchain technologies for advanced fraud detection and prevention systems in financial and security applications.",
      category: "AI & Blockchain Security",
      inventors: ["Dr. Aashi Singh Bhadouria"],
      applicationDate: "2023-08-15",
      grantDate: "2025-01-20",
      jurisdiction: "India",
      claims: "15 Claims",
      drawings: "8 Figures"
    }
  ],

  leadershipRoles: [
    {
      role: "IEEE MP Section Vice Chair - Young Professionals",
      organization: "IEEE Madhya Pradesh Section",
      period: "2024-2025",
      description: "Leading IEEE Young Professionals initiatives in Madhya Pradesh region, promoting technological innovation and professional development among early-career professionals",
      icon: <Award className="w-5 h-5" />,
      achievements: ["500+ Members", "10+ Workshops", "Industry-Academia Bridge"],
      location: "Madhya Pradesh, India"
    },
    {
      role: "Founder & CEO",
      organization: "Pataran Labs",
      period: "2023-Present",
      description: "Building AI/ML Image Search SaaS platform, revolutionizing visual intelligence for eCommerce industry with cutting-edge computer vision technology",
      icon: <Building className="w-5 h-5" />,
      achievements: ["Product Development", "Team Leadership", "Market Strategy"],
      location: "Remote/Global"
    },
    {
      role: "Assistant Professor",
      organization: "Madhav Institute of Technology and Science, Gwalior",
      period: "2022-Present",
      description: "Mentoring next generation of AI/ML specialists, conducting cutting-edge research, and supervising postgraduate projects in computer vision and machine learning",
      icon: <BookOpen className="w-5 h-5" />,
      achievements: ["Research Supervision", "Curriculum Development", "Student Mentorship"],
      location: "Gwalior, India"
    }
  ],

  editorialRoles: [
    {
      role: "Editor-in-Chief",
      journal: "Journal of Future Internet and Hyperconnectivity",
      organization: "MAT Journals",
      period: "2025 - Present",
      impact: "Leading journal in networking and connectivity technologies",
      issn: "XXXX-XXXX",
      frequency: "Quarterly",
      scope: ["Networking", "IoT", "5G/6G", "Edge Computing"]
    },
    {
      role: "Editor",
      journal: "Journal of Ad-hoc Network and Mobile Computing",
      organization: "MAT Journals",
      period: "2025 - Present",
      impact: "Premier publication in mobile and ad-hoc networking",
      issn: "XXXX-XXXX",
      frequency: "Bi-Monthly",
      scope: ["Mobile Computing", "Ad-hoc Networks", "Wireless Communication"]
    },
    {
      role: "Reviewer",
      journal: "Journal of Scientific Research and Reports",
      organization: "International Journal",
      period: "2024 - Present",
      impact: "Peer-reviewed multidisciplinary research journal",
      issn: "XXXX-XXXX",
      frequency: "Monthly",
      scope: ["Multidisciplinary Research", "Scientific Reports"]
    }
  ],

  conferenceCommittees: [
    {
      conference: "BIDA 2025 - Program Committee Member & Reviewer",
      organization: "International Conference on Big Data and Analytics",
      role: "Program Committee & Reviewer",
      year: "2025",
      category: "Big Data & Analytics",
      location: "Virtual",
      papersReviewed: 15
    },
    {
      conference: "CML 2025 - Program Committee Member & Reviewer",
      organization: "International Conference on Computational Machine Learning",
      role: "Program Committee & Reviewer",
      year: "2025",
      category: "Machine Learning",
      location: "Virtual",
      papersReviewed: 12
    },
    {
      conference: "3rd International Conference on Power Engineering and Intelligent Systems",
      organization: "NIT Uttarakhand",
      role: "Technical Programme Committee & Reviewer",
      year: "2025",
      category: "Power Engineering & AI",
      location: "NIT Uttarakhand",
      papersReviewed: 8
    },
    {
      conference: "5th International Conference on Paradigms of Communication, Computing and Data Analytics (PCCDA 2025)",
      organization: "International Conference",
      role: "Program Committee & Reviewer",
      year: "2025",
      category: "Communication & Computing",
      location: "Virtual",
      papersReviewed: 10
    }
  ],

  publications: {
    stats: {
      total: 28,
      books: 5,
      citations: 258,
      hIndex: 3,
      i10Index: 1,
      conferences: 8,
      journals: 5,
      chapters: 2,
      international: 11,
      national: 2
    },
    highlights: [
      {
        title: "Machine Learning Model for Healthcare Investments Predicting Hospital Stay & Mortality Rate",
        journal: "Multimedia Tools and Applications",
        year: 2023,
        citations: 8,
        impact: "Healthcare AI Application",
        doi: "10.1007/s11042-023-15459-5",
        authors: ["Aashi Singh Bhadouria", "Co-Author 1", "Co-Author 2"],
        abstract: "Innovative ML model for healthcare investment analysis...",
        keywords: ["Healthcare", "Machine Learning", "Predictive Analytics"]
      },
      {
        title: "Effective Framework for Underwater Image Enhancement using Multi-Fusion Technique",
        journal: "IEEE Conference on Communication Systems and Network Technologies",
        year: 2020,
        citations: 3,
        impact: "Computer Vision Innovation",
        doi: "10.1109/CSNT.2020.XXXXX",
        authors: ["Aashi Singh Bhadouria", "Co-Author 1"],
        abstract: "Advanced framework for underwater image processing...",
        keywords: ["Computer Vision", "Image Enhancement", "Underwater Imaging"]
      },
      {
        title: "Study of: Impact of malicious attacks and data breach on company growth",
        journal: "International Journal of Scientific and Research Publications",
        year: 2022,
        citations: 36,
        impact: "Cybersecurity Research",
        doi: "10.29322/IJSRP.12.XX.XXXX",
        authors: ["Aashi Singh Bhadouria"],
        abstract: "Comprehensive study on cybersecurity impacts...",
        keywords: ["Cybersecurity", "Data Breach", "Business Impact"]
      }
    ]
  },

  expertise: {
    technical: [
      { name: "Artificial Intelligence", level: 95, icon: <Brain className="w-4 h-4" />, years: 6 },
      { name: "Machine Learning", level: 92, icon: <Cpu className="w-4 h-4" />, years: 5 },
      { name: "Computer Vision", level: 90, icon: <ImageIcon className="w-4 h-4" />, years: 4 },
      { name: "Image Processing", level: 88, icon: <FileText className="w-4 h-4" />, years: 4 },
      { name: "Natural Language Processing", level: 85, icon: <BookOpen className="w-4 h-4" />, years: 3 },
      { name: "Big Data Analytics", level: 82, icon: <Database className="w-4 h-4" />, years: 3 },
      { name: "Blockchain Technology", level: 80, icon: <Shield className="w-4 h-4" />, years: 2 },
      { name: "Cloud Computing", level: 78, icon: <GlobeIcon className="w-4 h-4" />, years: 2 }
    ],
    domains: [
      "AI/ML Research & Development",
      "Computer Vision Systems",
      "Image Search & Recognition",
      "Fraud Detection Systems",
      "eCommerce Intelligence",
      "Academic Research",
      "Technology Innovation",
      "Strategic Leadership",
      "Book Authoring",
      "International Conference Leadership"
    ]
  },

  achievements: [
    {
      title: "Patent Granted - AI & Blockchain Fraud Detection",
      organization: "Government of India",
      year: "2025",
      description: "First patent granted for innovative AI and blockchain based fraud detection system",
      category: "Innovation",
      icon: <FileText className="w-5 h-5" />,
      recognition: "National Level",
      impact: "Industry Transformation"
    },
    {
      title: "Book Publication - Apple Academic Press",
      organization: "AAP International",
      year: "2024",
      description: "Published comprehensive guide on data science and predictive analytics",
      category: "Publication",
      icon: <BookText className="w-5 h-5" />,
      recognition: "International",
      impact: "Academic Contribution"
    },
    {
      title: "IEEE MP Section Vice Chair",
      organization: "IEEE",
      year: "2024-2025",
      description: "Elected leadership position in IEEE Madhya Pradesh Section",
      category: "Leadership",
      icon: <Award className="w-5 h-5" />,
      recognition: "Professional Body",
      impact: "Community Leadership"
    }
  ],

  researchInterests: [
    "Computer Vision and Pattern Recognition",
    "Machine Learning and Deep Learning",
    "Digital Image Processing",
    "Natural Language Processing",
    "Big Data Computing and Analytics",
    "Artificial Intelligence in Healthcare",
    "Sustainable Technologies",
    "IoT and Smart Systems",
    "Blockchain and AI Integration",
    "Predictive Analytics"
  ],

  futureProjects: [
    "MNIST Classification System Enhancement",
    "IoT-based Smart Agriculture Solutions",
    "3D Point Cloud Processing for AR/VR",
    "5G Technology Applications in AI",
    "Robotic Arm Control Systems",
    "Intelligent Dog Feeder Automation",
    "Foggy/Haze/Blur Image Transformation",
    "Advanced Book Recommendation System",
    "Real-time Sentiment Analysis",
    "Emoticon Recognition AI"
  ],

  testimonials: [
    {
      name: "Dr. Rajesh Kumar",
      role: "Professor, IIT Delhi",
      content: "Dr. Aashi's research in computer vision is groundbreaking. Her contributions to the field are exceptional.",
      avatar: "/src/assets/testimonials/prof1.jpg",
      rating: 5
    },
    {
      name: "Industry Expert",
      role: "CTO, Tech Solutions Inc.",
      content: "The AI solutions developed under Aashi's leadership have transformed our eCommerce platform.",
      avatar: "/src/assets/testimonials/industry1.jpg",
      rating: 5
    }
  ]
};

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Dr. Aashi Singh Bhadouria",
    role: "Founder, Managing Director & CEO",
    image: founderImage,
    tagline: "AI/ML Research Specialist | Building Future of Visual Intelligence",
    isFounder: true,
    qualifications: [
      "Ph.D - Madhav Institute of Technology and Science",
      "M.Tech - Computer Science & Engineering",
      "B.E. - Computer Science & Engineering",
      "NPTEL Star Certified - Multiple Specializations"
    ],
    expertise: [
      "AI/ML Research & Development",
      "Computer Vision & Image Processing",
      "Machine Learning & Deep Learning",
      "Natural Language Processing",
      "Big Data Computing",
      "Blockchain Technology",
      "Patent Holder - AI & Blockchain Fraud Detection"
    ],
    bio: "Visionary AI/ML Research and Development Specialist with deep expertise in designing and deploying advanced intelligent systems. Founder of Pataran Labs, building the future of visual intelligence for eCommerce. Recognized thought leader with extensive research contributions and industry impact.",
    joinDate: "2023",
    location: "Mumbai, India"
  },
  {
    id: 2,
    name: "Punit Pratap Singh",
    role: "Chief Technology Officer",
    image: "/src/assets/team/punit.jpg",
    tagline: "Technology Visionary & Strategic Leader",
    isFounder: false,
    qualifications: [
      "Expert in Technology Strategy",
      "Software Architecture & Development",
      "Cloud Infrastructure & Scalability"
    ],
    expertise: [
      "Technical Leadership",
      "Product Development",
      "System Architecture",
      "Team Management & Scaling"
    ],
    bio: "Technology visionary with extensive experience in building scalable software solutions and leading engineering teams to deliver cutting-edge products. Drives technical excellence and innovation across all platforms.",
    joinDate: "2023",
    location: "Remote"
  },
  {
    id: 3,
    name: "Ishan Singh Bhadouria",
    role: "Chief Operating Officer",
    image: "/src/assets/team/ishaan.jpg",
    tagline: "Operations Excellence & Business Strategy",
    isFounder: false,
    qualifications: [
      "Operations Management",
      "Business Strategy",
      "Process Optimization"
    ],
    expertise: [
      "Operational Excellence",
      "Strategic Planning",
      "Business Development",
      "Team Leadership"
    ],
    bio: "Operations leader focused on driving efficiency and excellence across all business functions while ensuring seamless execution of company strategy and sustainable growth.",
    joinDate: "2023",
    location: "Remote"
  },
  {
    id: 4,
    name: "Vanshika Patel",
    role: "Chief Financial Officer",
    image: "/src/assets/team/vanshika.jpg",
    tagline: "Financial Strategy & Business Growth",
    isFounder: false,
    qualifications: [
      "Financial Management",
      "Strategic Planning",
      "Investment Analysis"
    ],
    expertise: [
      "Financial Strategy",
      "Budget Management",
      "Risk Assessment",
      "Financial Reporting"
    ],
    bio: "Financial expert with a proven track record in managing corporate finances, driving profitability, and ensuring sustainable business growth through strategic financial planning.",
    joinDate: "2023",
    location: "Remote"
  },
  {
    id: 5,
    name: "Akshat Upasani",
    role: "Chief Marketing Officer",
    image: "/src/assets/team/akshat.jpg",
    tagline: "Brand Strategy & Market Expansion",
    isFounder: false,
    qualifications: [
      "Digital Marketing Strategy",
      "Brand Management",
      "Market Research"
    ],
    expertise: [
      "Digital Marketing",
      "Brand Strategy",
      "Customer Acquisition",
      "Market Analysis"
    ],
    bio: "Marketing strategist dedicated to building strong brands and driving market presence through innovative digital marketing campaigns and data-driven strategies.",
    joinDate: "2023",
    location: "Remote"
  },
  {
    id: 6,
    name: "Rekha Bhadouria",
    role: "President",
    image: "/src/assets/team/rekha.jpg",
    tagline: "Executive Leadership & Strategic Partnerships",
    isFounder: false,
    qualifications: [
      "Executive Leadership",
      "Business Administration",
      "Strategic Partnerships"
    ],
    expertise: [
      "Leadership Development",
      "Strategic Partnerships",
      "Corporate Governance",
      "Mentorship"
    ],
    bio: "Seasoned executive with extensive experience in corporate leadership, strategic planning, and fostering business growth through innovative partnerships and governance.",
    joinDate: "2023",
    location: "Remote"
  }
];

export default function EnhancedMeetTheTeam() {
  const [selectedFounder, setSelectedFounder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = filterRole === "all" || 
                       (filterRole === "founder" && member.isFounder) ||
                       (filterRole === "leadership" && member.role.includes("Chief")) ||
                       (filterRole === "other" && !member.isFounder && !member.role.includes("Chief"));
    
    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    switch (sortBy) {
      case "id": return a.id.toString().localeCompare(b.id.toString());
      case "role": return a.role.localeCompare(b.role);
      case "joinDate": return b.joinDate.localeCompare(a.joinDate);
      default: return 0;
    }
  });

  const handleProfileView = (member: any) => {
    if (member.isFounder) {
      setSelectedFounder(founderData);
      toast({
        title: "Profile Opened",
        description: "Viewing detailed profile of Dr. Aashi Singh Bhadouria",
      });
    } else {
      toast({
        title: "Team Member",
        description: `Viewing ${member.name}'s profile`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      
      {/* Enhanced Header Section with Parallax */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900/40 to-purple-900/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-20 right-20 w-16 h-16 bg-blue-500/10 rounded-full blur-lg"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-6xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-cyan-400/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-100">World-Class AI Leadership</span>
            </motion.div>
            
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Meet Our Visionaries
            </motion.h1>
            
            <motion.p
              className="text-xl text-slate-200 leading-relaxed mb-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Led by internationally acclaimed AI researcher and author Dr. Aashi Singh Bhadouria, 
              our team combines cutting-edge research with practical innovation to deliver 
              transformative AI solutions for the modern enterprise.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid Section with Filters */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 p-6 bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-600/30"
          >
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
              
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[180px] bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="founder">Founder</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="role">Role</SelectItem>
                  <SelectItem value="joinDate">Join Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="bg-slate-700/50 border-slate-600 text-white"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="bg-slate-700/50 border-slate-600 text-white"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Team Grid */}
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-6"
          }>
            {filteredMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
                viewMode={viewMode}
                onViewProfile={handleProfileView}
              />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl text-slate-300 mb-2">No team members found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Founder Profile Modal */}
      {selectedFounder && (
        <EnhancedFounderProfileModal 
          data={selectedFounder} 
          onClose={() => setSelectedFounder(null)} 
        />
      )}

      <Footer />
    </div>
  );
}

// Team Member Card Component
function TeamMemberCard({ member, index, viewMode, onViewProfile }: any) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="w-full"
      >
        <Card 
          className="bg-white/5 backdrop-blur-md border border-slate-600/30 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onViewProfile(member)}
        >
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className={`w-20 h-20 rounded-full p-1 ${
                member.isFounder 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
              </div>
              {member.isFounder && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-2 shadow-lg">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 font-semibold">{member.role}</p>
                  <p className="text-blue-300 text-sm italic">{member.tagline}</p>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewProfile(member);
                  }}
                  className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30"
                >
                  View Profile
                </Button>
              </div>
              
              <p className="text-slate-300 mb-3 line-clamp-2">{member.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {member.expertise.slice(0, 4).map((skill: string, idx: number) => (
                  <Badge 
                    key={idx}
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full"
    >
      <Card 
        className={`bg-white/5 backdrop-blur-md border rounded-3xl p-6 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer group ${
          member.isFounder 
            ? 'border-cyan-500/50 hover:border-cyan-400' 
            : 'border-blue-500/30 hover:border-blue-400'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onViewProfile(member)}
      >
        {/* Profile Image */}
        <div className="relative mb-6">
          <motion.div
            className={`w-32 h-32 mx-auto rounded-full p-1 ${
              member.isFounder 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {member.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
          </motion.div>
          
          {/* Founder Badge */}
          {member.isFounder && (
            <motion.div 
              className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-2 shadow-lg"
              animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Crown className="w-4 h-4 text-white" />
            </motion.div>
          )}

          {/* Location Badge */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600/50">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-slate-300">{member.location}</span>
            </div>
          </div>
        </div>

        {/* Member Info */}
        <div className="text-center">
          <motion.h3 
            className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors"
            animate={isHovered ? { y: -2 } : { y: 0 }}
          >
            {member.name}
          </motion.h3>
          <p className="text-cyan-400 font-semibold mb-2">{member.role}</p>
          <p className="text-blue-300 text-sm mb-3 italic">{member.tagline}</p>
          <motion.p 
            className="text-blue-200 text-sm mb-4 line-clamp-3"
            animate={isHovered ? { opacity: 0.8 } : { opacity: 1 }}
          >
            {member.bio}
          </motion.p>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {member.expertise.slice(0, 3).map((skill: string, idx: number) => (
              <motion.span 
                key={idx}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs border border-cyan-500/30"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.span>
            ))}
            {member.expertise.length > 3 && (
              <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs">
                +{member.expertise.length - 3}
              </span>
            )}
          </div>

          {/* Action Button */}
          <motion.div
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {member.isFounder ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProfile(member);
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl py-3 font-semibold transition-all duration-300 group"
              >
                View Full Profile & Credentials
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <div className="w-full bg-slate-700/50 text-slate-300 border-0 rounded-xl py-3 font-semibold text-center group-hover:bg-slate-600/50 transition-colors">
                Industry Expert
              </div>
            )}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

// Enhanced Founder Profile Modal Component
function EnhancedFounderProfileModal({ data, onClose }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

  const handleContactClick = (platform: string, url: string) => {
    toast({
      title: "Opening Profile",
      description: `Redirecting to ${platform} profile...`,
    });
    window.open(url, '_blank');
  };

  const TabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <EnhancedOverviewTab data={data} />;
      case 'credentials':
        return <EnhancedCredentialsTab data={data} />;
      case 'research':
        return <EnhancedResearchTab data={data} />;
      case 'publications':
        return <EnhancedPublicationsTab data={data} />;
      case 'leadership':
        return <EnhancedLeadershipTab data={data} />;
      case 'testimonials':
        return <EnhancedTestimonialsTab data={data} />;
      default:
        return <EnhancedOverviewTab data={data} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 overflow-y-auto">
      <div className="min-h-screen">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            {/* Enhanced Header - More Horizontal Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
              {/* Main Profile Info */}
              <div className="lg:col-span-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-3"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Crown className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold text-white">
                        {data.personal.name}
                      </h1>
                      <p className="text-xl text-cyan-400 mt-2">{data.personal.title}</p>
                      <p className="text-lg text-slate-300 mt-1 italic">{data.personal.tagline}</p>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    className="text-white hover:bg-white/10 p-3 rounded-xl"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4" />
                    <span>{data.personal.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4" />
                    <span>{data.personal.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>{data.personal.availability}</span>
                  </div>
                </div>
                
                <p className="text-slate-200 text-lg leading-relaxed">
                  {data.personal.bio}
                </p>
              </div>

              {/* Quick Stats Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Publications", value: data.publications.stats.total, icon: <FileText className="w-4 h-4" /> },
                      { label: "Citations", value: data.publications.stats.citations + "+", icon: <TrendingUp className="w-4 h-4" /> },
                      { label: "Books", value: data.publications.stats.books, icon: <BookText className="w-4 h-4" /> },
                      { label: "Patents", value: data.patents.length, icon: <Shield className="w-4 h-4" /> }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-cyan-400">
                            {stat.icon}
                          </div>
                          <span className="text-slate-200 text-sm">{stat.label}</span>
                        </div>
                        <span className="text-white font-bold">{stat.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Enhanced Navigation Tabs - More Compact */}
            <motion.div 
              className="flex overflow-x-auto gap-1 mb-8 pb-2 border-b border-slate-600/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[
                { id: 'overview', label: 'Overview', icon: <Users className="w-4 h-4" /> },
                { id: 'credentials', label: 'Credentials', icon: <BadgeCheck className="w-4 h-4" /> },
                { id: 'research', label: 'Research', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'publications', label: 'Publications', icon: <BookText className="w-4 h-4" /> },
                { id: 'leadership', label: 'Leadership', icon: <Award className="w-4 h-4" /> },
                { id: 'testimonials', label: 'Testimonials', icon: <MessageCircle className="w-4 h-4" /> }
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all border ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border-cyan-500/50'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border-slate-600/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <EnhancedProfileSidebar 
                  data={data} 
                  onContactClick={handleContactClick}
                />
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <TabContent />
              </div>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

// Enhanced Tab Components
function EnhancedOverviewTab({ data }: any) {
  return (
    <div className="space-y-8">
      {/* Client-Focused Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-slate-800/80 to-slate-700/60 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-cyan-400" />
            Why Partner With Our AI Expertise?
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                title: "Patent-Protected Innovation",
                description: "Granted patent for AI & Blockchain fraud detection technology",
                icon: <Shield className="w-5 h-5" />,
                color: "cyan"
              },
              {
                title: "Published Author",
                description: "Books with Apple Academic Press and NOVA Science Publishers",
                icon: <BookText className="w-5 h-5" />,
                color: "blue"
              },
              {
                title: "IEEE Leadership",
                description: "Vice Chair position in IEEE MP Section",
                icon: <Award className="w-5 h-5" />,
                color: "purple"
              },
              {
                title: "International Recognition",
                description: "13+ international conference committee memberships",
                icon: <Globe className="w-5 h-5" />,
                color: "green"
              },
              {
                title: "Research Excellence",
                description: "28+ publications with 258+ citations",
                icon: <TrendingUp className="w-5 h-5" />,
                color: "orange"
              },
              {
                title: "Certified Expertise",
                description: "6 NPTEL Star certifications from IITs",
                icon: <Star className="w-5 h-5" />,
                color: "yellow"
              }
            ].map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-4 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`bg-${point.color}-500/20 p-2 rounded-lg mt-1`}>
                  {point.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{point.title}</h4>
                  <p className="text-slate-300 text-sm">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Enhanced Expertise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            Core Technical Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.expertise.technical.map((skill: any, index: number) => (
              <motion.div
                key={index}
                className="space-y-3 p-4 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-cyan-400">
                      {skill.icon}
                    </div>
                    <span className="text-slate-200 font-semibold">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">{skill.years}y</span>
                    <span className="text-cyan-400 font-bold">{skill.level}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700/60 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full shadow-lg shadow-cyan-500/25"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Research Interests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-cyan-400" />
            Research Interests & Specializations
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.researchInterests.map((interest: string, index: number) => (
              <motion.span 
                key={index}
                className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 text-sm font-medium hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function EnhancedCredentialsTab({ data }: any) {
  return (
    <div className="space-y-8">
      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            Academic Qualifications
          </h3>
          <div className="space-y-6">
            {data.education.map((edu: any, index: number) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.01, y: -2 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-500/20 p-3 rounded-xl">
                      {edu.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                      <p className="text-slate-300 text-lg">{edu.institution}</p>
                      <p className="text-slate-400 text-sm">{edu.focus}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-400 text-sm bg-cyan-500/20 px-3 py-2 rounded-full font-semibold">
                      {edu.year}
                    </span>
                    <p className="text-slate-400 text-sm mt-1">{edu.duration}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-200 text-sm">{edu.gpa}</p>
                  </div>
                  <div className="flex gap-2">
                    {edu.achievements.map((ach: string, idx: number) => (
                      <span key={idx} className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full">
                        {ach}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Star className="w-6 h-6 text-cyan-400" />
            NPTEL Star Certifications from IITs
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.certifications.map((cert: any, index: number) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-cyan-500/20 p-3 rounded-xl">
                    <Star className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
                    <p className="text-slate-300">{cert.provider}</p>
                    <p className="text-slate-400 text-sm">Credential: {cert.credential}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-200 text-sm">{cert.duration}</span>
                  <div className="flex gap-2">
                    <span className="text-cyan-400 text-sm bg-cyan-500/20 px-2 py-1 rounded-full">
                      {cert.year}
                    </span>
                    <span className="text-green-400 text-sm bg-green-500/20 px-2 py-1 rounded-full">
                      {cert.score}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="text-xs text-slate-300 bg-slate-600/50 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function EnhancedResearchTab({ data }: any) {
  return (
    <div className="space-y-8">
      {/* Research Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-slate-800/80 to-slate-700/60 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Research Impact & Metrics
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Publications", value: data.publications.stats.total, color: "cyan", icon: <FileText className="w-6 h-6" /> },
              { label: "Citations", value: data.publications.stats.citations + "+", color: "blue", icon: <TrendingUp className="w-6 h-6" /> },
              { label: "h-index", value: data.publications.stats.hIndex, color: "green", icon: <BarChart3 className="w-6 h-6" /> },
              { label: "Books Published", value: data.publications.stats.books, color: "purple", icon: <BookText className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`text-${stat.color}-400 mb-2 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Research Highlights */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white mb-4">Research Highlights</h4>
            {data.publications.highlights.map((pub: any, index: number) => (
              <motion.div
                key={index}
                className="p-4 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.01, y: -2 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h5 className="text-lg font-semibold text-white mb-2">{pub.title}</h5>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">{pub.journal} • {pub.year}</span>
                  <div className="flex gap-2">
                    <span className="text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full text-sm">
                      {pub.citations} citations
                    </span>
                    <span className="text-green-400 bg-green-500/20 px-2 py-1 rounded-full text-sm">
                      {pub.impact}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-2">DOI: {pub.doi}</p>
                <div className="flex flex-wrap gap-1">
                  {pub.keywords.map((keyword: string, idx: number) => (
                    <span key={idx} className="text-xs text-slate-300 bg-slate-600/50 px-2 py-1 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function EnhancedPublicationsTab({ data }: any) {
  return (
    <div className="space-y-8">
      {/* Books */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <BookText className="w-6 h-6 text-cyan-400" />
            Book Publications
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.books.map((book: any, index: number) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-500/20 p-3 rounded-xl">
                    <BookText className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{book.title}</h4>
                    <p className="text-slate-300 font-semibold">{book.publisher}</p>
                    <p className="text-slate-400 text-sm">ISBN: {book.isbn}</p>
                    <p className="text-slate-400 text-sm">{book.pages} pages • {book.category}</p>
                  </div>
                </div>
                <p className="text-slate-200 text-sm mb-3">{book.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 text-sm">{book.year}</span>
                  <div className="flex gap-2">
                    <span className="text-green-400 text-sm bg-green-500/20 px-2 py-1 rounded-full">
                      {book.status}
                    </span>
                    <span className="text-yellow-400 text-sm bg-yellow-500/20 px-2 py-1 rounded-full">
                      {book.reviews}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Patents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <FileText className="w-6 h-6 text-cyan-400" />
            Patents & Intellectual Property
          </h3>
          <div className="space-y-6">
            {data.patents.map((patent: any, index: number) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.01, y: -2 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{patent.title}</h4>
                    <p className="text-slate-300">Patent No: {patent.number}</p>
                    <p className="text-slate-300">{patent.organization} • {patent.year}</p>
                    <p className="text-slate-400 text-sm">
                      Application: {patent.applicationDate} • Grant: {patent.grantDate}
                    </p>
                  </div>
                  <span className="text-green-400 text-sm bg-green-500/20 px-3 py-2 rounded-full border border-green-500/30 font-semibold">
                    {patent.status}
                  </span>
                </div>
                <p className="text-slate-200 mb-3">{patent.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-cyan-400 text-sm bg-cyan-500/20 px-2 py-1 rounded-full">
                    {patent.category}
                  </span>
                  <span className="text-blue-400 text-sm bg-blue-500/20 px-2 py-1 rounded-full">
                    {patent.jurisdiction}
                  </span>
                  <span className="text-purple-400 text-sm bg-purple-500/20 px-2 py-1 rounded-full">
                    {patent.claims}
                  </span>
                  <span className="text-orange-400 text-sm bg-orange-500/20 px-2 py-1 rounded-full">
                    {patent.drawings}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function EnhancedLeadershipTab({ data }: any) {
  return (
    <div className="space-y-8">
      {/* Leadership Roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="w-6 h-6 text-cyan-400" />
            Professional Leadership Roles
          </h3>
          <div className="space-y-6">
            {data.leadershipRoles.map((role: any, index: number) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.01, y: -2 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-500/20 p-3 rounded-xl">
                      {role.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{role.role}</h4>
                      <p className="text-slate-300 text-lg">{role.organization}</p>
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {role.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-cyan-400 text-sm bg-cyan-500/20 px-3 py-2 rounded-full font-semibold">
                    {role.period}
                  </span>
                </div>
                <p className="text-slate-200 mb-3">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.achievements.map((ach: string, idx: number) => (
                    <span key={idx} className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full">
                      {ach}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Editorial Roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <BookMarked className="w-6 h-6 text-cyan-400" />
            Editorial Board Memberships
          </h3>
          <div className="space-y-6">
            {data.editorialRoles.map((role: any, index: number) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.01, y: -2 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{role.role}</h4>
                    <p className="text-slate-300 text-lg">{role.journal}</p>
                    <p className="text-slate-400">{role.organization}</p>
                    <p className="text-slate-400 text-sm">ISSN: {role.issn} • {role.frequency}</p>
                  </div>
                  <span className="text-cyan-400 text-sm bg-cyan-500/20 px-3 py-2 rounded-full font-semibold">
                    {role.period}
                  </span>
                </div>
                <p className="text-slate-200 text-sm mb-3">{role.impact}</p>
                <div className="flex flex-wrap gap-1">
                  {role.scope.map((item: string, idx: number) => (
                    <span key={idx} className="text-xs text-slate-300 bg-slate-600/50 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Conference Committees */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-cyan-400" />
            International Conference Committees
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.conferenceCommittees.map((conf: any, index: number) => (
              <motion.div
                key={index}
                className="p-4 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-white font-semibold mb-2">{conf.conference}</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 text-sm">{conf.organization}</span>
                  <span className="text-cyan-400 text-sm bg-cyan-500/20 px-2 py-1 rounded-full border border-cyan-500/30">
                    {conf.year}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 text-xs">{conf.role}</span>
                  <div className="flex gap-2">
                    <span className="text-blue-400 text-xs bg-blue-500/20 px-2 py-1 rounded-full">
                      {conf.category}
                    </span>
                    <span className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full">
                      {conf.papersReviewed} papers
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function EnhancedTestimonialsTab({ data }: any) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-cyan-400" />
            Professional Testimonials
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.testimonials.map((testimonial: any, index: number) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-200 italic mb-4">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

// Enhanced Sidebar Component
function EnhancedProfileSidebar({ data, onContactClick }: any) {
  const [expandedSections, setExpandedSections] = useState({
    achievements: true,
    projects: false,
    domains: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Contact Links */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">Professional Connect</h3>
          <div className="space-y-3">
            {Object.entries(data.personal.contact).map(([platform, url]) => (
              <motion.a
                key={platform}
                onClick={() => onContactClick(platform, url as string)}
                className="flex items-center gap-3 p-3 bg-slate-700/40 rounded-xl hover:bg-slate-600/40 transition-all duration-300 border border-slate-600/30 hover:border-cyan-500/30 group cursor-pointer"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {platform === 'email' && <Mail className="w-4 h-4 text-cyan-400" />}
                {platform === 'linkedin' && <Linkedin className="w-4 h-4 text-blue-400" />}
                {platform === 'scholar' && <BookOpen className="w-4 h-4 text-green-400" />}
                {platform === 'orcid' && <Globe className="w-4 h-4 text-orange-400" />}
                {platform === 'ieee' && <Award className="w-4 h-4 text-red-400" />}
                {platform === 'researchid' && <FileText className="w-4 h-4 text-purple-400" />}
                <span className="text-sm text-slate-200 capitalize flex-1 group-hover:text-white transition-colors">
                  {platform === 'scholar' ? 'Google Scholar' : 
                   platform === 'researchid' ? 'ResearchID' : platform}
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </motion.a>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Quick Achievements */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Key Achievements</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('achievements')}
              className="text-slate-400 hover:text-white"
            >
              {expandedSections.achievements ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          {expandedSections.achievements && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {data.achievements.slice(0, 4).map((achievement: any, index: number) => (
                <motion.div
                  key={index}
                  className="p-3 bg-slate-700/40 rounded-xl border border-slate-600/30 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-white text-sm font-semibold">{achievement.title}</span>
                    <span className="text-cyan-400 text-xs bg-cyan-500/20 px-2 py-1 rounded-full">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs mb-2">{achievement.organization}</p>
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${
                      achievement.category === 'Innovation' ? 'bg-green-500/20' :
                      achievement.category === 'Publication' ? 'bg-blue-500/20' :
                      achievement.category === 'Leadership' ? 'bg-purple-500/20' : 'bg-cyan-500/20'
                    }`}>
                      {achievement.icon}
                    </div>
                    <span className={`text-xs ${
                      achievement.category === 'Innovation' ? 'text-green-400' :
                      achievement.category === 'Publication' ? 'text-blue-400' :
                      achievement.category === 'Leadership' ? 'text-purple-400' : 'text-cyan-400'
                    }`}>
                      {achievement.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Expertise Domains */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Expertise Domains</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('domains')}
              className="text-slate-400 hover:text-white"
            >
              {expandedSections.domains ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          {expandedSections.domains && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {data.expertise.domains.slice(0, 8).map((domain: string, index: number) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/40 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-200 text-sm">{domain}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Future Projects */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="bg-slate-800/80 backdrop-blur-md border border-slate-600/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Future Research Directions</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('projects')}
              className="text-slate-400 hover:text-white"
            >
              {expandedSections.projects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          {expandedSections.projects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {data.futureProjects.slice(0, 5).map((project: string, index: number) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/40 transition-colors duration-200 group"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                  <span className="text-slate-200 text-sm group-hover:text-cyan-300 transition-colors">
                    {project}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}