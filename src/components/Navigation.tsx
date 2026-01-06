import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ChevronDown, Sparkles, Camera, Tag, BarChart3, 
  Palette, Video, Cpu, Brain, Gem, Search, Users, FileText, 
  Calculator, BookOpen, Calendar, Star, UserCircle, Heart,
  Zap, Shield, TrendingUp, Clock, CheckCircle
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
      name: "Lens Search",
      description: "AI-powered search and product finding",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/solutions/product-discovery"
    },
    {
      icon: Palette,
      name: "Lens APD",
      description: "Automated product description",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/solutions/description-generation"
    },
    {
      icon: Tag,
      name: "Lens Tag",
      description: "Intelligent categorization",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/solutions/auto-tagging"
    },
    {
      icon: BarChart3,
      name: "Lens RECOM",
      description: "Personalized recommendations",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/solutions/recommendation"
    },
    {
      icon: Sparkles,
      name: "Lens Personalization",
      description: "Tailored shopping experiences",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/solutions/personalization"
    },
    {
      icon: Camera,
      name: "Lens VTO",
      description: "Virtual try-on with AR",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/solutions/virtual-try-on"
    },
    {
      icon: Cpu,
      name: "Lens MOC",
      description: "Image recognition & classification",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/solutions/multi-object-classification"
    }
  ];

  // Split solutions into two equal columns
  const solutionsFirstColumn = solutions.slice(0, Math.ceil(solutions.length / 2));
  const solutionsSecondColumn = solutions.slice(Math.ceil(solutions.length / 2));

  const resources = [
    // {
    //   icon: FileText,
    //   name: "Blogs",
    //   description: "Latest AI insights and trends",
    //   color: "text-blue-300",
    //   bgColor: "bg-gray-800/30",
    //   borderColor: "border-gray-700",
    //   path: "/resources/blogs"
    // },
    {
      icon: Users,
      name: "Case Studies",
      description: "Client success stories",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/resources/case-studies"
    },
    {
      icon: BookOpen,
      name: "Research",
      description: "Research papers and publications",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/resources/publications"
    },
    {
      icon: Calendar,
      name: "Events",
      description: "Webinars and conferences",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/resources/events"
    }
  ];

  const aboutCompany = [
    {
      icon: Sparkles,
      name: "Why BigOLens?",
      description: "What makes us different",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/about/whyBigO"
    },
    {
      icon: Star,
      name: "Customer Reviews",
      description: "Client testimonials",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/about/TheWallOfLove"
    },
    {
      icon: Users,
      name: "Meet the Team",
      description: "Our AI experts",
      color: "text-blue-300",
      bgColor: "bg-gray-800/30",
      borderColor: "border-gray-700",
      path: "/about/meet-the-team"
    }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95 backdrop-blur-2xl border-b border-gray-800/80 shadow-2xl shadow-gray-900/30"
          : "bg-gradient-to-b from-gray-900/90 via-gray-900/85 to-gray-900/90 backdrop-blur-xl border-b border-gray-800/50"
      }`}
      ref={dropdownRef}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 🌟 Logo */}
          <Link to="/" className="flex items-center space-x-2 z-50 group">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 blur-xl group-hover:opacity-50 opacity-0 transition-opacity duration-500" />
              <img
                src="/src/assets/bg-rmv.png"
                alt="BigO AI Logo"
                className="relative w-40 h-50 object-contain filter brightness-110 contrast-110 group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </Link>

          {/* 🖥️ Center Navigation - Dropdowns */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-200 flex-1 justify-center">
            
            {/* Solutions Dropdown - Minimal Advanced Version */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50 hover:text-white group"
                onMouseEnter={() => setOpenDropdown("solutions")}
                onMouseLeave={(e) => {
                  if (!e.relatedTarget?.closest('.solutions-dropdown')) {
                    setTimeout(() => setOpenDropdown(null), 100);
                  }
                }}
              >
                Solutions
                <ChevronDown size={16} className={`transition-all duration-300 ${openDropdown === "solutions" ? "rotate-180 text-blue-300" : "text-gray-400"}`} />
              </button>

              {openDropdown === "solutions" && (
                <div 
                  className="solutions-dropdown absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-gray-900 backdrop-blur-xl rounded-xl shadow-2xl shadow-gray-900/50 border border-gray-800 w-[44rem] p-4 animate-fadeIn"
                  onMouseEnter={() => setOpenDropdown("solutions")}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {/* Compact Header */}
                  <div className="mb-3 pb-3 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-gray-800/50 rounded-lg">
                        <Zap size={14} className="text-blue-300" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">AI Solutions Suite</span>
                    </div>
                  </div>
                  
                  {/* Compact Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* First Column */}
                    <div className="space-y-1.5">
                      {solutionsFirstColumn.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`group/item flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 hover:bg-gray-800/70 ${item.bgColor} border ${item.borderColor} hover:border-blue-500/30 hover:shadow-md`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className={`p-1.5 rounded-md ${item.bgColor} border ${item.borderColor} group-hover/item:bg-blue-500/10 transition-colors`}>
                              <Icon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium text-white text-sm truncate ${item.color}`}>
                                {item.name}
                              </div>
                              <div className={`text-xs ${item.color} opacity-80 truncate`}>
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    
                    {/* Second Column */}
                    <div className="space-y-1.5">
                      {solutionsSecondColumn.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`group/item flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 hover:bg-gray-800/70 ${item.bgColor} border ${item.borderColor} hover:border-blue-500/30 hover:shadow-md`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className={`p-1.5 rounded-md ${item.bgColor} border ${item.borderColor} group-hover/item:bg-blue-500/10 transition-colors`}>
                              <Icon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium text-white text-sm truncate ${item.color}`}>
                                {item.name}
                              </div>
                              <div className={`text-xs ${item.color} opacity-80 truncate`}>
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Minimal Footer */}
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <Link 
                      to="/solutions" 
                      className="flex items-center justify-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <span>View All Solutions</span>
                      <ChevronDown size={14} className="rotate-[-90deg]" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown - Minimal */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50 hover:text-white group"
                onMouseEnter={() => setOpenDropdown("resources")}
              >
                Resources
                <ChevronDown size={16} className={`transition-all duration-300 ${openDropdown === "resources" ? "rotate-180 text-cyan-300" : "text-gray-400"}`} />
              </button>

              {openDropdown === "resources" && (
                <div 
                  className="absolute left-0 top-full mt-2 bg-gray-900 backdrop-blur-xl rounded-xl shadow-2xl shadow-gray-900/50 border border-gray-800 w-72 p-3 animate-fadeIn"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-300">Knowledge Resources</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {resources.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`group/item flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 hover:bg-gray-800/70 ${item.bgColor} border ${item.borderColor} hover:border-cyan-500/30`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className={`p-1.5 rounded-md ${item.bgColor} border ${item.borderColor} group-hover/item:bg-cyan-500/10 transition-colors`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white text-sm truncate">
                              {item.name}
                            </div>
                            <div className={`text-xs ${item.color} opacity-80 truncate`}>
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

            {/* About Company Dropdown - Minimal */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50 hover:text-white group"
                onMouseEnter={() => setOpenDropdown("about")}
              >
                About
                <ChevronDown size={16} className={`transition-all duration-300 ${openDropdown === "about" ? "rotate-180 text-blue-300" : "text-gray-400"}`} />
              </button>

              {openDropdown === "about" && (
                <div 
                  className="absolute left-0 top-full mt-2 bg-gray-900 backdrop-blur-xl rounded-xl shadow-2xl shadow-gray-900/50 border border-gray-800 w-64 p-3 animate-fadeIn"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-300">Our Company</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {aboutCompany.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`group/item flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 hover:bg-gray-800/70 ${item.bgColor} border ${item.borderColor} hover:border-blue-500/30`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className={`p-1.5 rounded-md ${item.bgColor} border ${item.borderColor} group-hover/item:bg-blue-500/10 transition-colors`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white text-sm truncate">
                              {item.name}
                            </div>
                            <div className={`text-xs ${item.color} opacity-80 truncate`}>
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
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dashboard Button */}
            <Link to="/resources/ecommerce-analytics-dashboard">
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 border-gray-700/50 text-white hover:from-cyan-900/20 hover:to-cyan-800/20 hover:text-white hover:border-cyan-500/30 font-medium rounded-full px-4 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <TrendingUp size={14} className="mr-2" />
                Dashboard
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800/30 border-gray-700/50 text-gray-200 hover:bg-gray-800/70 hover:text-white hover:border-blue-500/30 font-medium rounded-full px-4 py-2 transition-all duration-300"
              >
                Contact
              </Button>
            </Link>

            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800/30 border-gray-700/50 text-blue-300 hover:bg-blue-900/20 hover:text-white hover:border-blue-500/30 font-medium rounded-full px-4 py-2 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
              
              <Link to="/demo">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold rounded-full px-5 py-2 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* 📱 Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-200 z-50 p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 📱 Mobile Menu - Minimal */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 py-4 space-y-1 text-gray-200 animate-fadeIn bg-gray-900 border-t border-gray-800 rounded-b-xl shadow-2xl shadow-gray-900/50">
            
            {/* Solutions Mobile */}
            <div className="px-4">
              <button 
                className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-800/50 rounded-lg px-2 transition-colors"
                onClick={() => toggleDropdown("solutions-mobile")}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">Solutions</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown === "solutions-mobile" ? "rotate-180 text-blue-300" : "text-gray-400"}`} />
              </button>
              
              {openDropdown === "solutions-mobile" && (
                <div className="mt-1 space-y-1 pl-4">
                  {solutions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 py-2 px-2 rounded-lg transition-colors hover:bg-gray-800/50 ${item.bgColor} border ${item.borderColor}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm">{item.name}</div>
                          <div className={`text-xs ${item.color} opacity-80`}>{item.description}</div>
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
                className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-800/50 rounded-lg px-2 transition-colors"
                onClick={() => toggleDropdown("resources-mobile")}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">Resources</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown === "resources-mobile" ? "rotate-180 text-cyan-300" : "text-gray-400"}`} />
              </button>
              
              {openDropdown === "resources-mobile" && (
                <div className="mt-1 space-y-1 pl-4">
                  {resources.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 py-2 px-2 rounded-lg transition-colors hover:bg-gray-800/50 ${item.bgColor} border ${item.borderColor}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm">{item.name}</div>
                          <div className={`text-xs ${item.color} opacity-80`}>{item.description}</div>
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
                className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-800/50 rounded-lg px-2 transition-colors"
                onClick={() => toggleDropdown("about-mobile")}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">About</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown === "about-mobile" ? "rotate-180 text-blue-300" : "text-gray-400"}`} />
              </button>
              
              {openDropdown === "about-mobile" && (
                <div className="mt-1 space-y-1 pl-4">
                  {aboutCompany.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 py-2 px-2 rounded-lg transition-colors hover:bg-gray-800/50 ${item.bgColor} border ${item.borderColor}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm">{item.name}</div>
                          <div className={`text-xs ${item.color} opacity-80`}>{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="px-4 space-y-2 border-t border-gray-800 pt-4 mt-4">
              {/* Dashboard Mobile */}
              <Link to="/resources/ecommerce-analytics-dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-gray-800/30 to-gray-900/30 border-gray-700/50 text-cyan-300 hover:from-cyan-900/20 hover:to-cyan-800/20 hover:text-white hover:border-cyan-500/30 mb-2 transition-all duration-300">
                  <TrendingUp size={14} className="mr-2" />
                  Dashboard
                </Button>
              </Link>
              
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gray-800/50 border-gray-700/50 text-gray-200 hover:bg-gray-800/70 hover:border-blue-500/30 transition-all duration-300 mb-2">
                  Contact
                </Button>
              </Link>
              
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gray-800/50 border-gray-700/50 text-blue-300 hover:bg-blue-900/20 hover:border-blue-500/30 transition-all duration-300 mb-2">
                  Sign In
                </Button>
              </Link>
              
              <Link to="/demo" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
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