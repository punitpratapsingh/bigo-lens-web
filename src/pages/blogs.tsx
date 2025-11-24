// src/pages/Blogs.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";
import { BarChart3, Sparkles, Eye, Tag, Film, LineChart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the Blog interface
interface Blog {
  _id?: string;
  title: string;
  image: string;
  author: string;
  content: string;
  views: number;
  readTime: string;
  icon?: string;
  stat?: number;
  desc?: string;
  details?: string;
}

// Map icon names to actual components
const iconMap = {
  Eye,
  Sparkles,
  Tag,
  Film,
  BarChart3,
  LineChart,
};

const Blogs = () => {
  const [activeBlog, setActiveBlog] = useState<number | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/blogs/listAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status}`);
        }

        const data = await response.json();
        
        // Transform API data to match your component structure
        const transformedBlogs = data.map((blog: Blog, index: number) => {
          // Assign icons based on index or any other logic
          const iconKeys = Object.keys(iconMap);
          const iconName = iconKeys[index % iconKeys.length] as keyof typeof iconMap;
          
          return {
            ...blog,
            icon: iconName,
            img: blog.image, // Map image to img for your component
            stat: Math.floor(Math.random() * 50) + 50, // Generate random stats between 50-100
            desc: blog.content.substring(0, 150) + '...', // Use first 150 chars of content as desc
            details: blog.content, // Use full content as details
          };
        });

        setBlogs(transformedBlogs);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white text-gray-900">
        <Navigation />
        <div className="flex justify-center items-center py-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading blogs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white text-gray-900">
        <Navigation />
        <div className="flex justify-center items-center py-40">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white text-gray-900">
      <Navigation />

      {/* 🧠 HERO */}
      <section className="py-24 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          Insights & Innovations in AI Commerce
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
        >
          Stay ahead of the curve with our latest research, market updates, and
          how our AI suite transforms eCommerce experiences.
        </motion.p>
      </section>

      {/* 📰 BLOG GRID */}
      <section className="py-20 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogs.map((blog, i) => {
          const IconComponent = iconMap[blog.icon as keyof typeof iconMap] || Eye;
          
          return (
            <Tilt key={blog._id || i} glareEnable glareMaxOpacity={0.2}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveBlog(i)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden shadow-lg bg-white hover:shadow-2xl transition rounded-2xl">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-blue-600">
                      <IconComponent className="w-6 h-6" />
                      <h3 className="text-xl font-semibold">{blog.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{blog.desc}</p>

                    {/* Blog metadata */}
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>By {blog.author}</span>
                      <span>{blog.readTime}</span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                      <Eye className="w-4 h-4" />
                      <span>{blog.views} views</span>
                    </div>

                    {/* Animated Metric */}
                    <div className="flex items-center gap-2 text-3xl font-bold text-purple-600">
                      <CountUp end={blog.stat || 0} duration={2.5} suffix="%" />
                      <span className="text-sm text-gray-500 font-normal">
                        Impact Growth
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Tilt>
          );
        })}
      </section>

      {/* 📊 MODAL OVERLAY */}
      <AnimatePresence>
        {activeBlog !== null && blogs[activeBlog] && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBlog(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-3xl mx-auto relative overflow-y-auto max-h-[80vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-4 right-6 text-2xl font-bold text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <img
                src={blogs[activeBlog].img}
                alt={blogs[activeBlog].title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h2 className="text-3xl font-bold mb-3 text-blue-700">
                {blogs[activeBlog].title}
              </h2>
              
              {/* Blog metadata in modal */}
              <div className="flex justify-between items-center text-gray-600 mb-6">
                <div className="flex items-center gap-4">
                  <span className="font-medium">By {blogs[activeBlog].author}</span>
                  <span>{blogs[activeBlog].readTime}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {blogs[activeBlog].views} views
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
                {blogs[activeBlog].details}
              </p>

              {/* Animated Stat */}
              <div className="flex items-center gap-3 text-4xl font-bold text-purple-600">
                <CountUp end={blogs[activeBlog].stat || 0} duration={2.5} suffix="%" />
                <span className="text-lg text-gray-600 font-normal">
                  measurable growth with our AI solution
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-blue-700 to-purple-800 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Let AI Accelerate Your Commerce Growth
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-2xl mx-auto text-lg mb-8"
        >
          Discover how our suite of visual intelligence tools can automate,
          personalize, and scale your business impact.
        </motion.p>
        <Button
          size="lg"
          className="text-lg px-8 py-6 bg-white text-blue-700 hover:bg-blue-100 shadow-xl"
        >
          Contact Us
        </Button>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;