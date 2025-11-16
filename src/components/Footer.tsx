import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsla(239,84%,10%,0.95)] backdrop-blur-xl border-t border-[hsla(239,84%,70%,0.2)] text-blue-100 mt-20 shadow-[0_-5px_25px_hsla(239,84%,50%,0.2)]">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* 🧭 Company Info */}
        <div>
          <Link to="/" className="flex items-center mb-4">
            <img
              src="/src/assets/icon6.png"
              alt="BigO Lens Logo"
              className="w-20 h-20 drop-shadow-[0_0_12px_hsl(239,84%,70%)]"
            />
          </Link>
          <p className="text-sm text-blue-200 leading-relaxed">
            Empowering businesses with cutting-edge AI solutions — Visual Search,
            Auto Tagging, Product Discovery, and Hyper-Personalization for the next
            generation of eCommerce growth.
          </p>
        </div>

        {/* 🔍 Solutions */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/solutions/product-discovery" className="hover:text-cyan-300 transition">Product Discovery</Link></li>
            <li><Link to="/solutions/description-generation" className="hover:text-cyan-300 transition">Description Generation</Link></li>
            <li><Link to="/solutions/auto-tagging" className="hover:text-cyan-300 transition">Auto Tagging</Link></li>
            <li><Link to="/solutions/personalization" className="hover:text-cyan-300 transition">Hyper-Personalization</Link></li>
            <li><Link to="/solutions/recommendation" className="hover:text-cyan-300 transition">Product Recommendation</Link></li>
            <li><Link to="/solutions/imgtovideo" className="hover:text-cyan-300 transition">Image-to-Video Generation</Link></li>
          </ul>
        </div>

        {/* 📚 Resources */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/resources/blogs" className="hover:text-cyan-300 transition">Blogs</Link></li>
            <li><Link to="/resources/newsletters" className="hover:text-cyan-300 transition">Newsletters</Link></li>
            <li><Link to="/resources/publications" className="hover:text-cyan-300 transition">Publications</Link></li>
            <li><Link to="/resources/roi-calculator" className="hover:text-cyan-300 transition">ROI Calculator</Link></li>
            <li><Link to="/resources/case-studies" className="hover:text-cyan-300 transition">Case Studies</Link></li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">Get in Touch</h3>
          <p className="text-sm text-blue-200 mb-3">
            Have questions or want to explore AI-powered solutions for your brand?
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300"
          >
            Contact Us
          </Link>

          {/* Social Icons - Enhanced */}
<div className="flex space-x-2 mt-5">
  {[
    { 
      Icon: Facebook, 
      href: "https://facebook.com/bigolens", 
      label: "Facebook",
      bgColor: "hover:bg-[#1877F2]/20",
      borderColor: "hover:border-[#1877F2]/40",
      textColor: "hover:text-[#1877F2]"
    },
    { 
      Icon: Twitter, 
      href: "https://twitter.com/bigolens", 
      label: "Twitter",
      bgColor: "hover:bg-[#1DA1F2]/20",
      borderColor: "hover:border-[#1DA1F2]/40",
      textColor: "hover:text-[#1DA1F2]"
    },
    { 
      Icon: Linkedin, 
      href: "https://linkedin.com/company/bigolens", 
      label: "LinkedIn",
      bgColor: "hover:bg-[#0A66C2]/20",
      borderColor: "hover:border-[#0A66C2]/40",
      textColor: "hover:text-[#0A66C2]"
    },
    { 
      Icon: Instagram, 
      href: "https://instagram.com/bigolens", 
      label: "Instagram",
      bgColor: "hover:bg-gradient-to-r from-[#833AB4]/20 via-[#C13584]/20 to-[#E1306C]/20",
      borderColor: "hover:border-[#E1306C]/40",
      textColor: "hover:text-[#E1306C]"
    },
    { 
      Icon: Youtube, 
      href: "https://youtube.com/bigolens", 
      label: "YouTube",
      bgColor: "hover:bg-[#FF0000]/20",
      borderColor: "hover:border-[#FF0000]/40",
      textColor: "hover:text-[#FF0000]"
    },
  ].map(({ Icon, href, label, bgColor, borderColor, textColor }) => (
    <a 
      key={href}
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        p-2 bg-white/5 border border-blue-500/20 rounded-lg 
        transition-all duration-300 group
        ${bgColor} ${borderColor} ${textColor}
      `}
    >
      <Icon 
        size={18} 
        className="text-blue-300 group-hover:scale-110 transition-transform" 
      />
    </a>
  ))}
</div>
        </div>
      </div>

      {/* ⚡ Bottom Bar */}
      <div className="border-t border-[hsla(239,84%,70%,0.2)] py-4 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} <span className="text-cyan-300 font-semibold">BigO Lens</span> — All Rights Reserved.
      </div>
    </footer>
  );
}
