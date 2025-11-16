import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 🌀 Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // 🌫️ Add scroll-based effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[hsla(239,84%,10%,0.9)] backdrop-blur-2xl border-b border-[hsla(239,84%,70%,0.2)] shadow-[0_0_25px_hsla(239,84%,60%,0.3)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 🌟 Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/src/assets/screenshot (16).png"
              alt="BigO AI Logo"
              className="w-36 h-36 object-contain drop-shadow-[0_0_12px_hsl(239,84%,70%)] hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* 🖥️ Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-blue-100">
            {/* Solutions Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("solutions")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-cyan-300 transition">
                Solutions <ChevronDown size={16} />
              </button>

              {openDropdown === "solutions" && (
                <div className="absolute left-0 mt-3 bg-[hsla(239,84%,10%,0.95)] backdrop-blur-md rounded-xl shadow-[0_0_20px_hsla(239,84%,60%,0.2)] border border-[hsla(239,84%,70%,0.25)] w-64 animate-fadeIn">
                  {[
                    { name: "Product Discovery", href: "/solutions/product-discovery" },
                    { name: "Description Generation", href: "/solutions/description-generation" },
                    { name: "Automatic Tagging", href: "/solutions/auto-tagging" },
                    { name: "Product Recommendation & Analytics", href: "/solutions/recommendation" },
                    { name: "Hyper-Personalization", href: "/solutions/personalization" },
                    { name: "Image to Video Conversion", href: "/solutions/imgtovideo" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm hover:bg-[hsla(239,84%,60%,0.1)] hover:text-cyan-300 transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-cyan-300 transition">
                Resources <ChevronDown size={16} />
              </button>

              {openDropdown === "resources" && (
                <div className="absolute left-0 mt-3 bg-[hsla(239,84%,10%,0.95)] backdrop-blur-md rounded-xl shadow-[0_0_20px_hsla(239,84%,60%,0.2)] border border-[hsla(239,84%,70%,0.25)] w-56 animate-fadeIn">
                  {[
                    { name: "Blogs", href: "/resources/blogs" },
                    { name: "Newsletters", href: "/resources/newsletters" },
                    { name: "Case Studies", href: "/resources/case-studies" },
                    { name: "ROI Calculator", href: "/resources/roi-calculator" },
                    { name: "Publications", href: "/resources/publications" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm hover:bg-[hsla(239,84%,60%,0.1)] hover:text-cyan-300 transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Static Links */}
            <Link to="/whyBigO" className="hover:text-cyan-300 transition">
              Why BigO Lens?
            </Link>
            <Link to="/contact" className="hover:text-cyan-300 transition">
              Contact Us
            </Link>
            <Link to="/TheWallofLove" className="hover:text-cyan-300 transition">
              Customer Reviews
            </Link>
            <Link to="/login" className="hover:text-cyan-300 transition">
              Sign Up
            </Link>

            {/* CTA Button */}
            <Link to="/demo">
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full px-5 py-2 hover:scale-105 hover:shadow-[0_0_20px_hsla(188,85%,60%,0.5)] transition-all duration-300"
              >
                Request Demo
              </Button>
            </Link>
          </div>

          {/* 📱 Mobile Menu Toggle */}
          <button
            className="md:hidden text-blue-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 📱 Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 text-blue-100 animate-fadeIn backdrop-blur-lg bg-[hsla(239,84%,10%,0.95)] border-t border-[hsla(239,84%,70%,0.15)] rounded-b-2xl">
            {/* Solutions */}
            <details>
              <summary className="cursor-pointer flex items-center justify-between px-4">
                Solutions <ChevronDown size={16} />
              </summary>
              <div className="pl-6 mt-2 space-y-2">
                {[
                  "Product Discovery",
                  "Description Generation",
                  "Automatic Tagging",
                  "Product Recommendation & Analytics",
                  "Hyper-Personalization",
                  "Image to Video Conversion",
                ].map((name) => (
                  <Link
                    key={name}
                    to={`/solutions/${name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-sm hover:text-cyan-300 transition"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </details>

            {/* Resources */}
            <details>
              <summary className="cursor-pointer flex items-center justify-between px-4">
                Resources <ChevronDown size={16} />
              </summary>
              <div className="pl-6 mt-2 space-y-2">
                {[
                  "Blogs",
                  "Newsletters",
                  "Case Studies",
                  "ROI Calculator",
                  "Publications",
                ].map((name) => (
                  <Link
                    key={name}
                    to={`/resources/${name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-sm hover:text-cyan-300 transition"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </details>

            {/* Other Links */}
            <Link to="/whyBigO" className="block px-4 hover:text-cyan-300">
              Why BigO Lens?
            </Link>
            <Link to="/contact" className="block px-4 hover:text-cyan-300">
              Contact Us
            </Link>
            <Link to="/TheWallOfLove" className="block px-4 hover:text-cyan-300">
              Customer Reviews
            </Link>
            <Link to="/login" className="block px-4 hover:text-cyan-300">
              Sign Up
            </Link>

            {/* CTA */}
            <div className="px-4">
              <Link to="/demo">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full py-2 hover:shadow-[0_0_20px_hsla(188,85%,60%,0.5)] transition-all">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
