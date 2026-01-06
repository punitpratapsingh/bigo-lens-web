import { Link } from "react-router-dom";  
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsla(239,84%,10%,0.95)] backdrop-blur-xl border-t border-[hsla(239,84%,70%,0.2)] text-blue-100 mt-20 shadow-[0_-5px_25px_hsla(239,84%,50%,0.2)]">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

        {/* 🧭 Company Info */}
        <div>
          <Link to="/" className="flex items-center mb-4">
            <img
              src="/src/assets/bg-rmv.png"
              alt="BigO Lens Logo"
              className="w-40 h-20 drop-shadow-[0_0_12px_hsl(239,84%,70%)]"
            />
          </Link>
          <p className="text-sm text-blue-200 leading-relaxed">
            Empowering Businesses with Cutting-edge Advanced AI Solutions for the next
            generation of E-Commerce growth.
          </p>
        </div>

        {/* 🔍 Solutions */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/solutions/product-discovery" className="hover:text-cyan-300 transition">Lens Search</Link></li>
            <li><Link to="/solutions/description-generation" className="hover:text-cyan-300 transition">Lens APD</Link></li>
            <li><Link to="/solutions/auto-tagging" className="hover:text-cyan-300 transition">Lens Tag</Link></li>
            <li><Link to="/solutions/personalization" className="hover:text-cyan-300 transition">Lens Personalization</Link></li>
            <li><Link to="/solutions/recommendation" className="hover:text-cyan-300 transition">Lens RECOM</Link></li>
            <li><Link to="/solutions/imgtovideo" className="hover:text-cyan-300 transition">Lens Img2Video</Link></li>
            <li><Link to="/solutions/virtual-try-on" className="hover:text-cyan-300 transition">Lens VTO</Link></li>
            <li><Link to="/solutions/multi-object-classification" className="hover:text-cyan-300 transition">Lens MOC</Link></li>
          </ul>
        </div>

        {/* 🆕 About Company — ADDED WITHOUT REMOVING ANYTHING */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">About Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about/whyBigO" className="hover:text-cyan-300 transition">Why BigOlens?</Link></li>
            <li><Link to="/about/TheWallOfLove" className="hover:text-cyan-300 transition">Customer Reviews</Link></li>
            <li><Link to="/about/meet-the-team" className="hover:text-cyan-300 transition">Meet the Team</Link></li>
          </ul>
        </div>

        {/* 📚 Resources */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/resources/blogs" className="hover:text-cyan-300 transition">Blogs</Link></li>
            <li><Link to="/resources/events" className="hover:text-cyan-300 transition">Events</Link></li>
            <li><Link to="/resources/publications" className="hover:text-cyan-300 transition">Research & Publications</Link></li>
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
              { Icon: Facebook, href: "https://facebook.com/bigolens", label: "Facebook" },
              { Icon: Twitter, href: "https://twitter.com/bigolens", label: "Twitter" },
              { Icon: Linkedin, href: "https://linkedin.com/company/bigolens", label: "LinkedIn" },
              { Icon: Instagram, href: "https://instagram.com/bigolens", label: "Instagram" },
              { Icon: Youtube, href: "https://www.youtube.com/@BigOlens", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 bg-white/5 border border-blue-500/20 rounded-lg transition-all duration-300 group"
              >
                <Icon size={18} className="text-blue-300 group-hover:scale-110 transition-transform" />
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
