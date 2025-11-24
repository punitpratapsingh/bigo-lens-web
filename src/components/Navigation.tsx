import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ChevronDown, Sparkles, Camera, Tag, BarChart3, 
  Palette, Video, Cpu, Brain, Gem, Search, Users, FileText, 
  Calculator, BookOpen, Calendar, Star, UserCircle, Heart 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🌀 Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  // 🌫️ Add scroll-based effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const solutions = [
    {
      icon: Search,
      name: "Product Discovery",
      description: "AI-powered search and product finding",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      path: "/solutions/product-discovery"
    },
    {
      icon: Palette,
      name: "Description Generation",
      description: "Automated product description creation",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      path: "/solutions/description-generation"
    },
    {
      icon: Tag,
      name: "Automatic Tagging",
      description: "Intelligent product categorization",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      path: "/solutions/auto-tagging"
    },
    {
      icon: BarChart3,
      name: "Product Recommendation & Analytics",
      description: "Personalized recommendations and insights",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      path: "/solutions/recommendation"
    },
    {
      icon: Sparkles,
      name: "Hyper-Personalization",
      description: "Tailored shopping experiences",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      path: "/solutions/personalization"
    },
    {
      icon: Video,
      name: "Image to Video Conversion",
      description: "Transform images into engaging videos",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      path: "/solutions/imgtovideo"
    },
    {
      icon: Camera,
      name: "Virtual Try-On",
      description: "Augmented reality product visualization",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      path: "/solutions/virtual-try-on"
    },
    {
      icon: Cpu,
      name: "Multi-Object Classification",
      description: "Advanced image recognition and categorization",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      path: "/solutions/multi-object-classification"
    }
  ];

  // Split solutions into two equal columns
  const solutionsFirstColumn = solutions.slice(0, Math.ceil(solutions.length / 2));
  const solutionsSecondColumn = solutions.slice(Math.ceil(solutions.length / 2));

  const resources = [
    {
      icon: FileText,
      name: "Blogs",
      description: "Latest insights and AI trends",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      path: "/resources/blogs"
    },
    {
      icon: Users,
      name: "Case Studies",
      description: "Success stories from our clients",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      path: "/resources/case-studies"
    },
    {
      icon: Calculator,
      name: "ROI Calculator",
      description: "Measure your potential savings",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      path: "/resources/roi-calculator"
    },
    {
      icon: BookOpen,
      name: "Publications",
      description: "Research papers and white papers",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      path: "/resources/publications"
    },
    {
      icon: Calendar,
      name: "Events",
      description: "Webinars, workshops and conferences",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      path: "/resources/events"
    }
  ];

  const aboutCompany = [
    {
      icon: Sparkles,
      name: "Why BigOLens?",
      description: "Discover what makes us different",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      path: "/about/whyBigO"
    },
    {
      icon: Star,
      name: "Customer Reviews",
      description: "See what our clients say about us",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      path: "/about/TheWallOfLove"
    },
    {
      icon: Users,
      name: "Meet the Team",
      description: "Get to know our experts",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      path: "/about/meet-the-team"
    }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[hsla(239,84%,10%,0.95)] backdrop-blur-2xl border-b border-[hsla(239,84%,70%,0.2)] shadow-[0_0_25px_hsla(239,84%,60%,0.3)]"
          : "bg-transparent border-transparent"
      }`}
      ref={dropdownRef}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 🌟 Logo */}
          <Link to="/" className="flex items-center space-x-2 z-50">
            <img
              src="/src/assets/bg-rmv.png"
              alt="BigO AI Logo"
              className="w-40 h-50 object-contain drop-shadow-[0_0_12px_hsl(239,84%,70%)] hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* 🖥️ Center Navigation - Dropdowns */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-blue-100 flex-1 justify-center">
            
            {/* Solutions Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 hover:text-cyan-300 transition duration-200 py-2"
                onMouseEnter={() => setOpenDropdown("solutions")}
              >
                Solutions <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "solutions" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "solutions" && (
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-[hsla(239,84%,8%,0.98)] backdrop-blur-xl rounded-2xl shadow-2xl border border-[hsla(239,84%,60%,0.2)] w-[42rem] p-6 animate-fadeIn"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Column */}
                    <div className="space-y-2">
                      {solutionsFirstColumn.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${item.bgColor} ${item.borderColor} border`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                              <Icon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className={`font-semibold text-white text-sm mb-1`}>
                                {item.name}
                              </div>
                              <div className={`text-xs ${item.color}`}>
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    
                    {/* Second Column */}
                    <div className="space-y-2">
                      {solutionsSecondColumn.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${item.bgColor} ${item.borderColor} border`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                              <Icon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className={`font-semibold text-white text-sm mb-1`}>
                                {item.name}
                              </div>
                              <div className={`text-xs ${item.color}`}>
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 hover:text-cyan-300 transition duration-200 py-2"
                onMouseEnter={() => setOpenDropdown("resources")}
              >
                Resources <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "resources" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "resources" && (
                <div 
                  className="absolute left-0 top-full mt-2 bg-[hsla(239,84%,8%,0.98)] backdrop-blur-xl rounded-2xl shadow-2xl border border-[hsla(239,84%,60%,0.2)] w-80 p-4 animate-fadeIn"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="grid grid-cols-1 gap-2">
                    {resources.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${item.bgColor} border border-transparent`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className={`p-2 rounded-lg ${item.bgColor}`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white text-sm mb-1">
                              {item.name}
                            </div>
                            <div className={`text-xs ${item.color}`}>
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* About Company Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 hover:text-cyan-300 transition duration-200 py-2"
                onMouseEnter={() => setOpenDropdown("about")}
              >
                About Company <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "about" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "about" && (
                <div 
                  className="absolute left-0 top-full mt-2 bg-[hsla(239,84%,8%,0.98)] backdrop-blur-xl rounded-2xl shadow-2xl border border-[hsla(239,84%,60%,0.2)] w-64 p-4 animate-fadeIn"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="grid grid-cols-1 gap-2">
                    {aboutCompany.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${item.bgColor} border border-transparent`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className={`p-2 rounded-lg ${item.bgColor}`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white text-sm mb-1">
                              {item.name}
                            </div>
                            <div className={`text-xs ${item.color}`}>
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 🖥️ Right Side - Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/contact">
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-white font-semibold rounded-full px-4 py-2 transition-all duration-300"
              >
                Contact Us
              </Button>
            </Link>
            
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:text-white font-semibold rounded-full px-4 py-2 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
            
            <Link to="/demo">
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full px-5 py-2 hover:scale-105 hover:shadow-[0_0_20px_hsla(188,85%,60%,0.5)] transition-all duration-300 shadow-lg"
              >
                Book Demo
              </Button>
            </Link>
          </div>

          {/* 📱 Mobile Menu Toggle */}
          <button
            className="lg:hidden text-blue-100 z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 📱 Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 py-4 space-y-4 text-blue-100 animate-fadeIn backdrop-blur-xl bg-[hsla(239,84%,8%,0.98)] border-t border-[hsla(239,84%,70%,0.2)] rounded-b-2xl shadow-2xl">
            
            {/* Solutions Mobile */}
            <div className="px-4">
              <button 
                className="w-full flex items-center justify-between py-3 text-left"
                onClick={() => toggleDropdown("solutions-mobile")}
              >
                <span className="font-semibold">Solutions</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "solutions-mobile" ? "rotate-180" : ""}`} />
              </button>
              
              {openDropdown === "solutions-mobile" && (
                <div className="mt-2 space-y-2 pl-4 border-l-2 border-cyan-500/30">
                  {solutions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${item.bgColor} border ${item.borderColor}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <div>
                          <div className="font-medium text-white text-sm">{item.name}</div>
                          <div className={`text-xs ${item.color}`}>{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Resources Mobile */}
            <div className="px-4">
              <button 
                className="w-full flex items-center justify-between py-3 text-left"
                onClick={() => toggleDropdown("resources-mobile")}
              >
                <span className="font-semibold">Resources</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "resources-mobile" ? "rotate-180" : ""}`} />
              </button>
              
              {openDropdown === "resources-mobile" && (
                <div className="mt-2 space-y-2 pl-4 border-l-2 border-cyan-500/30">
                  {resources.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${item.bgColor}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <div>
                          <div className="font-medium text-white text-sm">{item.name}</div>
                          <div className={`text-xs ${item.color}`}>{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* About Company Mobile */}
            <div className="px-4">
              <button 
                className="w-full flex items-center justify-between py-3 text-left"
                onClick={() => toggleDropdown("about-mobile")}
              >
                <span className="font-semibold">About Company</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "about-mobile" ? "rotate-180" : ""}`} />
              </button>
              
              {openDropdown === "about-mobile" && (
                <div className="mt-2 space-y-2 pl-4 border-l-2 border-cyan-500/30">
                  {aboutCompany.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${item.bgColor}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <div>
                          <div className="font-medium text-white text-sm">{item.name}</div>
                          <div className={`text-xs ${item.color}`}>{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="px-4 space-y-3 border-t border-[hsla(239,84%,70%,0.2)] pt-4">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-transparent border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 mb-2">
                  Contact Us
                </Button>
              </Link>
              
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-transparent border-blue-500/30 text-blue-300 hover:bg-blue-500/20 mb-2">
                  Sign In
                </Button>
              </Link>
              
              <Link to="/demo" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:shadow-[0_0_20px_hsla(188,85%,60%,0.5)]">
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}