// src/pages/blog/BlogList.tsx
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Search, Filter, Calendar, Clock, User, Eye,
  Heart, Bookmark, TrendingUp, Zap, Tag,
  ArrowUpDown, Grid, List, ChevronRight,
  Cpu, Database, Cloud, Shield, Globe,
  Smartphone, ShoppingCart, Code, Layers,
  Camera, Sparkles, BarChart, Search as SearchIcon,
  Brain, Activity, Server, GitBranch, MessageSquare,
  Award, Target, Palette, BarChart3, Radio,
  Network, FileText, Download, ThumbsUp, CreditCard,
  Package, X, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allBlogPosts } from "./pages/blogData";

// Define the types for our filters
interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    bio: string;
    expertise: string[];
  };
  views: string;
  likes: number;
  featured: boolean;
  icon: JSX.Element;
  color: string;
  tags: string[];
  featuredImage: string;
  toc: { id: string; title: string }[];
  content: any[];
  technicalDetails?: Record<string, string[]>;
}

export default function BlogList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "trending" | "title">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Extract unique categories
  const categories = ["All", ...new Set(allBlogPosts.map(post => post.category))];

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allBlogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Get popular tags (tags that appear in at least 3 posts)
  const popularTags = useMemo(() => {
    const tagCount: Record<string, number> = {};
    allBlogPosts.forEach(post => {
      post.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return allTags
      .filter(tag => tagCount[tag] >= 3)
      .sort((a, b) => tagCount[b] - tagCount[a])
      .slice(0, 15);
  }, [allTags]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter(post => {
      // Search filter
      const matchesSearch = searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

      // Tag filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    }).sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "popular":
          return parseInt(b.views.replace('k', '000')) - parseInt(a.views.replace('k', '000'));
        case "trending":
          return b.likes - a.likes;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  // Featured posts (first 3)
  const featuredPosts = useMemo(() => {
    return filteredPosts.filter(post => post.featured).slice(0, 3);
  }, [filteredPosts]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allBlogPosts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleBookmark = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleLike = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedTags([]);
    setSearchQuery("");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Lens Search": return <Search className="w-5 h-5" />;
      case "Lens VTO": return <Camera className="w-5 h-5" />;
      case "Lens Tag": return <Tag className="w-5 h-5" />;
      case "AI Solutions": return <Cpu className="w-5 h-5" />;
      case "Ecommerce AI": return <ShoppingCart className="w-5 h-5" />;
      case "Computer Vision": return <Globe className="w-5 h-5" />;
      case "Machine Learning": return <Brain className="w-5 h-5" />;
      case "Deep Learning": return <Layers className="w-5 h-5" />;
      case "Visual Search": return <Search className="w-5 h-5" />;
      case "Product Discovery": return <Sparkles className="w-5 h-5" />;
      case "Recommendation Systems": return <TrendingUp className="w-5 h-5" />;
      case "NLP": return <MessageSquare className="w-5 h-5" />;
      case "AR/VR": return <Globe className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Lens Search": return "from-blue-500 to-cyan-500";
      case "Lens VTO": return "from-purple-500 to-pink-500";
      case "Lens Tag": return "from-orange-500 to-yellow-500";
      case "AI Solutions": return "from-green-500 to-emerald-500";
      case "Ecommerce AI": return "from-red-500 to-pink-500";
      case "Computer Vision": return "from-indigo-500 to-purple-500";
      case "Machine Learning": return "from-cyan-500 to-blue-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="container relative mx-auto px-4 py-20 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">AI Research & Insights</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
              AI & Ecommerce Insights
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge research, case studies, and technical deep dives on AI in ecommerce, 
              computer vision, and machine learning. Explore {allBlogPosts.length} articles from our experts.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              <Input
                type="text"
                placeholder="Search articles by title, tags, content, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border-gray-700 text-white placeholder-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-3xl mx-auto">
              {[
                { value: allBlogPosts.length, label: "Articles", icon: FileText },
                { 
                  value: allBlogPosts.reduce((sum, post) => sum + parseInt(post.views.replace('k', '000')), 0).toLocaleString(),
                  label: "Total Views", 
                  icon: Eye 
                },
                { 
                  value: allBlogPosts.reduce((sum, post) => sum + post.likes, 0),
                  label: "Total Likes", 
                  icon: Heart 
                },
                { value: categories.length - 1, label: "Categories", icon: Tag }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className="w-5 h-5 text-blue-400" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Filter className="text-blue-400" size={20} />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-white"
                          : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {category !== "All" && (
                          <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center">
                            {getCategoryIcon(category)}
                          </div>
                        )}
                        <span>{category}</span>
                      </div>
                      {category !== "All" && (
                        <span className="text-sm text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                          {categoryCounts[category] || 0}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Tag className="text-blue-400" size={20} />
                    Popular Tags
                  </h3>
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                
                {/* Selected Tags */}
                {selectedTags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="hover:text-white"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => 
                          isSelected 
                            ? removeTag(tag)
                            : setSelectedTags(prev => [...prev, tag])
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured Authors */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="text-yellow-400" size={20} />
                  Top Authors
                </h3>
                <div className="space-y-4">
                  {Array.from(new Set(allBlogPosts.map(p => p.author.name)))
                    .slice(0, 3)
                    .map((authorName, idx) => {
                      const authorPosts = allBlogPosts.filter(p => p.author.name === authorName);
                      const author = authorPosts[0].author;
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <User className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white">{author.name}</div>
                            <div className="text-sm text-gray-400">{author.role}</div>
                            <div className="text-xs text-gray-500">{authorPosts.length} articles</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Controls Bar */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-400">
                  Showing <span className="text-white font-bold">{filteredPosts.length}</span> of{" "}
                  <span className="text-white">{allBlogPosts.length}</span> articles
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown size={16} className="text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
                    >
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Popular</option>
                      <option value="trending">Trending</option>
                      <option value="title">Alphabetical</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-1 ${viewMode === "grid" ? "bg-gray-700 text-white" : "text-gray-400"}`}
                    >
                      <Grid size={16} />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1 ${viewMode === "list" ? "bg-gray-700 text-white" : "text-gray-400"}`}
                    >
                      <List size={16} />
                    </Button>
                  </div>

                  {/* Filter Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilterModal(true)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Filter size={16} className="mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Posts (if any) */}
            {featuredPosts.length > 0 && searchQuery === "" && selectedTags.length === 0 && selectedCategory === "All" && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Zap className="text-yellow-400" size={24} />
                  Featured Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 hover:border-blue-500/50 cursor-pointer"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          FEATURED
                        </span>
                      </div>
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs ${post.color} border ${post.color.replace('bg', 'border')} text-white`}>
                            {post.category}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{post.readTime}</span>
                          <div className="flex items-center gap-2">
                            <Eye size={14} />
                            <span>{post.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Posts Grid/List */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">No articles found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Try adjusting your search or filter criteria. Maybe try different keywords or clear some filters.
                </p>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => {
                  const isBookmarked = bookmarkedPosts.includes(post.id);
                  const isLiked = likedPosts.includes(post.id);
                  
                  return (
                    <div
                      key={post.id}
                      className="group bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer h-full flex flex-col"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featuredImage || "/src/assets/ai/1 (1).png"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.color} border ${post.color.replace('bg', 'border')} text-white`}>
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleBookmark(post.id, e)}
                            className={`p-1 h-8 w-8 rounded-full backdrop-blur-sm ${
                              isBookmarked 
                                ? 'text-yellow-400 bg-gray-900/80' 
                                : 'text-gray-300 bg-gray-900/80 hover:text-yellow-300'
                            }`}
                          >
                            <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1 ml-auto">
                            <Eye size={12} />
                            <span>{post.views}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-gray-300 mb-4 flex-1 line-clamp-3">
                          {post.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                              <User size={14} className="text-white" />
                            </div>
                            <div className="text-sm">
                              <div className="font-bold text-white">{post.author.name}</div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleLike(post.id, e)}
                            className={`p-1 h-8 w-8 ${
                              isLiked 
                                ? 'text-red-400' 
                                : 'text-gray-400 hover:text-red-400'
                            }`}
                          >
                            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map((tag, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => handleTagClick(tag, e)}
                              className="px-2 py-0.5 rounded-full text-xs bg-gray-800/70 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-800/70 text-gray-400 border border-gray-700">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredPosts.map((post) => {
                  const isBookmarked = bookmarkedPosts.includes(post.id);
                  const isLiked = likedPosts.includes(post.id);
                  
                  return (
                    <div
                      key={post.id}
                      className="group bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-1/4 lg:w-1/5 relative min-h-[180px] md:h-auto">
                          <img
                            src={post.featuredImage || "/src/assets/ai/1 (1).png"}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-gray-900/20 to-transparent md:hidden" />
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.color} border ${post.color.replace('bg', 'border')} text-white`}>
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:w-3/4 lg:w-4/5 p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-gray-300 mb-4 line-clamp-2">
                                {post.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 mb-4 md:mb-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleBookmark(post.id, e)}
                                className={`p-1 ${isBookmarked ? 'text-yellow-400' : 'text-gray-400'}`}
                              >
                                <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleLike(post.id, e)}
                                className={`p-1 ${isLiked ? 'text-red-400' : 'text-gray-400'}`}
                              >
                                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                                <span className="ml-1 text-xs">{post.likes}</span>
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                  <User size={16} className="text-white" />
                                </div>
                                <div>
                                  <div className="font-bold text-white text-sm">{post.author.name}</div>
                                  <div className="text-xs text-gray-400">{post.author.role}</div>
                                </div>
                              </div>
                              
                              <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span>{post.readTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye size={14} />
                                  <span>{post.views}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="flex flex-wrap gap-1.5">
                                {post.tags.slice(0, 3).map((tag, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => handleTagClick(tag, e)}
                                    className="px-2 py-0.5 rounded-full text-xs bg-gray-800/70 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                              <ChevronRight className="text-gray-400 ml-2" size={20} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {filteredPosts.length > 0 && filteredPosts.length < allBlogPosts.length && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-6 rounded-xl"
                >
                  <Download className="mr-2" size={18} />
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 border border-gray-700/50 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Stay Ahead with AI Insights</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Join 10,000+ ecommerce professionals receiving weekly insights on AI implementation, 
                computer vision breakthroughs, and actionable technical tutorials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 py-3"
                />
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3">
                  <Sparkles className="mr-2" size={18} />
                  Subscribe Now
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Advanced Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" className="bg-gray-800 border-gray-700 text-white" />
                  <Input type="date" className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>

              {/* Read Time */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Read Time</label>
                <div className="flex flex-wrap gap-2">
                  {["<5 min", "5-10 min", "10-15 min", ">15 min"].map((time) => (
                    <button
                      key={time}
                      className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Views Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Views</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="1000"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0</span>
                  <span>2.5k</span>
                  <span>5k</span>
                  <span>7.5k</span>
                  <span>10k+</span>
                </div>
              </div>

              {/* All Tags */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">All Tags</label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2">
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => 
                          isSelected 
                            ? removeTag(tag)
                            : setSelectedTags(prev => [...prev, tag])
                        }
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-700">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Reset All
                </Button>
                <Button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}