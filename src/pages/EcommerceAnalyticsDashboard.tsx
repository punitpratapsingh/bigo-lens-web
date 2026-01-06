import React, { useState, useEffect } from 'react';
import { 
  Calculator, BarChart3, TrendingUp, ShieldCheck, Image, Search, 
  FileText, Target, DollarSign, Globe, Users, Database, Tag,
  Palette, Layers, Activity, CheckCircle, AlertCircle, ArrowRight,
  ChevronDown, Menu, X, Moon, Sun, Bell, HelpCircle, ExternalLink,
  Download, Share2, Star, Settings, LogOut, User, Home, Grid,
  Filter, Calendar, Clock, PieChart, ShoppingCart, Package,
  CreditCard, Percent, BookOpen, Server, HardDrive, Cpu,
  MessageSquare, Mail, Phone, Video, MapPin, Navigation,
  ChevronLeft, ChevronRight, ChevronUp, MoreVertical, Play,
  RotateCcw, Volume2, Camera, MessageCircle, Cloud, Zap,
  Wifi, Battery, Shield, Key, PhoneOff, VideoOff, Mail as MailIcon,
  Navigation as NavigationIcon, Compass, Globe as GlobeIcon,
  TrendingUp as TrendingUpIcon, Users as UsersIcon, Ruler
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define feature interface
interface DashboardFeature {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  category: string;
  path: string;
  longDescription: string;
  keyBenefits: string[];
  usageTips: string[];
  usageCount?: number;
  lastUsed?: string;
}

// Main Dashboard Component
const EnhancedDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<DashboardFeature | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // User data
  const [user] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    role: 'Admin'
  });

  // Features data - INCLUDING NEW FEATURES
  const features: DashboardFeature[] = [
    {
      id: 'roi-calculator',
      name: 'ROI Calculator',
      description: 'Calculate return on investment for e-commerce initiatives',
      icon: DollarSign,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/40',
      category: 'analytics',
      path: '/resources/roi-calculator',
      longDescription: 'Advanced ROI calculator that helps measure return on investment for e-commerce campaigns and business investments with detailed breakdowns and projections.',
      keyBenefits: [
        'Accurate ROI projections with confidence intervals',
        'Multiple scenario comparisons',
        'Time-value of money calculations',
        'Break-even analysis with timelines'
      ],
      usageTips: [
        'Use historical data for accurate projections',
        'Compare multiple investment scenarios',
        'Adjust discount rates based on risk profile'
      ],
      usageCount: 1245,
      lastUsed: '2 hours ago'
    },
    {
      id: 'ecommerce-audit',
      name: 'Ecommerce Audit',
      description: 'Comprehensive audit of your e-commerce performance',
      icon: ShieldCheck,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
      category: 'analytics',
      path: '/resources/ecommerce-audit',
      longDescription: 'Complete e-commerce performance audit tool that analyzes your store across conversion rates, user experience, SEO, and technical performance.',
      keyBenefits: [
        '360-degree store analysis',
        'Competitive benchmarking',
        'Actionable recommendations',
        'Performance tracking'
      ],
      usageTips: [
        'Run quarterly audits to track improvements',
        'Focus on high-impact recommendations',
        'Share results with your team'
      ],
      usageCount: 892,
      lastUsed: '1 day ago'
    },
    {
      id: 'competitor-analysis',
      name: 'Competitor Analysis',
      description: 'Analyze competitor strategies and performance',
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/40',
      category: 'analytics',
      path: '/resources/competitor-analysis-snapshot-audit',
      longDescription: 'Deep dive into competitor strategies with analysis of pricing, product assortments, marketing tactics, and customer reviews.',
      keyBenefits: [
        'Real-time competitor tracking',
        'Price positioning analysis',
        'Product gap identification',
        'Marketing strategy insights'
      ],
      usageTips: [
        'Monitor 3-5 key competitors',
        'Track pricing changes during sales',
        'Analyze competitor customer reviews'
      ],
      usageCount: 567,
      lastUsed: '3 days ago'
    },
    {
      id: 'personalization-maturity',
      name: 'Personalization Score',
      description: 'Evaluate personalization strategy effectiveness',
      icon: Users,
      color: 'text-pink-500',
      bgColor: 'bg-pink-100 dark:bg-pink-900/40',
      category: 'analytics',
      path: '/resources/personalization-maturity-score',
      longDescription: 'Assess personalization capabilities across customer touchpoints and get a roadmap to advance your strategy.',
      keyBenefits: [
        'Maturity scoring across levels',
        'Personalization roadmap',
        'Best practice recommendations',
        'Industry benchmarking'
      ],
      usageTips: [
        'Complete assessment with team',
        'Reassess quarterly',
        'Focus on quick wins first'
      ],
      usageCount: 423,
      lastUsed: '1 week ago'
    },
    {
      id: 'catalog-quality',
      name: 'Catalog Quality Checker',
      description: 'Assess and improve product catalog quality',
      icon: Database,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/40',
      category: 'content',
      path: '/resources/catalog-quality-checker',
      longDescription: 'Tool to analyze product data quality, completeness, and consistency across your catalog.',
      keyBenefits: [
        'Automated quality scoring',
        'Missing data identification',
        'Consistency checks',
        'Exportable improvement lists'
      ],
      usageTips: [
        'Start with best-selling products',
        'Fix critical issues first',
        'Establish data quality standards'
      ],
      usageCount: 678,
      lastUsed: '2 days ago'
    },
    {
      id: 'tag-completeness',
      name: 'Tag Completeness Checker',
      description: 'Evaluate product tagging completeness',
      icon: Tag,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/40',
      category: 'content',
      path: '/resources/tag-completeness-checker',
      longDescription: 'Ensure product tags are comprehensive and accurate to improve search relevance and personalization.',
      keyBenefits: [
        'Tag coverage analysis',
        'Relevance scoring',
        'Automated suggestions',
        'Taxonomy validation'
      ],
      usageTips: [
        'Review tags for seasonal products',
        'Use consistent tagging',
        'Update based on search trends'
      ],
      usageCount: 345,
      lastUsed: '4 days ago'
    },
    {
      id: 'cost-saving',
      name: 'Cost Saving Calculator',
      description: 'Calculate potential cost savings',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/40',
      category: 'optimization',
      path: '/resources/cost-saving-calculator',
      longDescription: 'Identify and quantify cost-saving opportunities across logistics, marketing, operations, and technology.',
      keyBenefits: [
        'Multi-department analysis',
        'ROI calculations',
        'Implementation timelines',
        'Risk assessment'
      ],
      usageTips: [
        'Involve department heads',
        'Prioritize quick wins',
        'Track implementation progress'
      ],
      usageCount: 789,
      lastUsed: 'Today'
    },
    {
      id: 'return-rate',
      name: 'Return Rate Calculator',
      description: 'Estimate savings from reducing returns',
      icon: TrendingUp,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/40',
      category: 'optimization',
      path: '/resources/return-rate-reduction-calculator',
      longDescription: 'Calculate financial impact of reducing return rates and identify effective strategies.',
      keyBenefits: [
        'Cost of returns analysis',
        'Reduction strategy ROI',
        'Root cause identification',
        'Industry benchmarking'
      ],
      usageTips: [
        'Analyze return reasons',
        'Test prevention strategies',
        'Monitor customer satisfaction'
      ],
      usageCount: 456,
      lastUsed: 'Yesterday'
    },
    {
      id: 'virtual-tryon',
      name: 'Virtual Try-On Calculator',
      description: 'Measure savings from virtual try-on',
      icon: Palette,
      color: 'text-violet-500',
      bgColor: 'bg-violet-100 dark:bg-violet-900/40',
      category: 'optimization',
      path: '/resources/virtual-try-on-return-saving-calculator',
      longDescription: 'Quantify impact of virtual try-on technology on return rates and customer satisfaction.',
      keyBenefits: [
        'Virtual try-on ROI',
        'Return reduction projections',
        'Implementation cost analysis',
        'Customer satisfaction impact'
      ],
      usageTips: [
        'Start with high-return categories',
        'Measure before/after metrics',
        'Combine with sizing guides'
      ],
      usageCount: 234,
      lastUsed: '5 days ago'
    },
    {
      id: 'dynamic-pricing',
      name: 'Dynamic Pricing Calculator',
      description: 'Optimize pricing strategies',
      icon: BarChart3,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/40',
      category: 'optimization',
      path: '/resources/dynamic-pricing-engine-calculator',
      longDescription: 'Simulate and optimize dynamic pricing strategies based on demand, competition, and inventory.',
      keyBenefits: [
        'Price elasticity analysis',
        'Competitor price tracking',
        'Demand forecasting',
        'Inventory optimization'
      ],
      usageTips: [
        'Start with clear pricing rules',
        'Monitor competitor reactions',
        'Test different algorithms'
      ],
      usageCount: 567,
      lastUsed: '3 days ago'
    },
    {
      id: 'search-abandonment',
      name: 'Search Abandonment Calculator',
      description: 'Identify search abandonment risks',
      icon: Search,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/40',
      category: 'optimization',
      path: '/resources/search-abandonment-risk',
      longDescription: 'Analyze search behavior to identify why customers abandon searches and calculate revenue impact.',
      keyBenefits: [
        'Search funnel analysis',
        'Abandonment root cause',
        'Revenue impact calculation',
        'Improvement recommendations'
      ],
      usageTips: [
        'Monitor high-volume searches',
        'Improve zero-result searches',
        'Add filters based on behavior'
      ],
      usageCount: 321,
      lastUsed: '6 days ago'
    },
    {
      id: 'description-generator',
      name: 'Description Generator',
      description: 'Generate product descriptions',
      icon: FileText,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
      category: 'content',
      path: '/resources/product-description-grader',
      longDescription: 'AI-powered tool to create, optimize, and grade product descriptions for SEO and conversion.',
      keyBenefits: [
        'AI-generated descriptions',
        'SEO optimization',
        'Readability scoring',
        'Competitor comparison'
      ],
      usageTips: [
        'Use for new product launches',
        'A/B test descriptions',
        'Optimize for keywords'
      ],
      usageCount: 654,
      lastUsed: 'Today'
    },
    {
      id: 'image-quality',
      name: 'Image Quality Analyser',
      description: 'Analyze product image quality',
      icon: Image,
      color: 'text-teal-500',
      bgColor: 'bg-teal-100 dark:bg-teal-900/40',
      category: 'content',
      path: '/resources/image-quality-analyser',
      longDescription: 'Automated image analysis tool that evaluates product image quality, consistency, and compliance.',
      keyBenefits: [
        'Automated quality scoring',
        'Consistency checks',
        'Resolution validation',
        'Background analysis'
      ],
      usageTips: [
        'Establish quality standards',
        'Batch process images',
        'Integrate with upload workflow'
      ],
      usageCount: 432,
      lastUsed: '2 days ago'
    },
    {
      id: 'product-clustering',
      name: 'Product Clustering',
      description: 'Group similar products',
      icon: Layers,
      color: 'text-rose-500',
      bgColor: 'bg-rose-100 dark:bg-rose-900/40',
      category: 'content',
      path: '/resources/product-clustering-calculator',
      longDescription: 'Advanced clustering algorithms to group products based on attributes and customer behavior.',
      keyBenefits: [
        'Automated product grouping',
        'Cross-sell opportunity',
        'Category optimization',
        'Personalization improvement'
      ],
      usageTips: [
        'Start with clear objectives',
        'Validate with sales data',
        'Update clusters quarterly'
      ],
      usageCount: 298,
      lastUsed: '1 week ago'
    },
    {
      id: 'product-compatibility',
      name: 'Product Compatibility',
      description: 'Calculate product compatibility',
      icon: CheckCircle,
      color: 'text-sky-500',
      bgColor: 'bg-sky-100 dark:bg-sky-900/40',
      category: 'content',
      path: '/resources/product-compatability-calculator',
      longDescription: 'Identify compatible products for bundles and cross-sell recommendations.',
      keyBenefits: [
        'Bundle opportunity identification',
        'Cross-sell recommendation',
        'Purchase pattern analysis',
        'Revenue uplift projection'
      ],
      usageTips: [
        'Analyze historical bundles',
        'Test bundle configurations',
        'Monitor conversion rates'
      ],
      usageCount: 187,
      lastUsed: '2 weeks ago'
    },
    {
      id: 'recommendation-uplift',
      name: 'Recommendation Uplift',
      description: 'Estimate revenue uplift',
      icon: TrendingUpIcon,
      color: 'text-lime-500',
      bgColor: 'bg-lime-100 dark:bg-lime-900/40',
      category: 'forecasting',
      path: '/resources/product-recommendation-uplift-estimator',
      longDescription: 'Project revenue impact of implementing or improving product recommendation systems.',
      keyBenefits: [
        'Uplift projection modeling',
        'Algorithm comparison',
        'Implementation ROI',
        'A/B testing simulation'
      ],
      usageTips: [
        'Start with simple rules',
        'Implement complex gradually',
        'Continuously measure'
      ],
      usageCount: 543,
      lastUsed: '4 days ago'
    },
    {
      id: 'growth-roadmap',
      name: 'Growth Roadmap Generator',
      description: 'Create growth strategies',
      icon: Globe,
      color: 'text-fuchsia-500',
      bgColor: 'bg-fuchsia-100 dark:bg-fuchsia-900/40',
      category: 'forecasting',
      path: '/resources/ecommerce-growth-roadmap-generator',
      longDescription: 'Strategic planning tool that creates customized growth roadmaps based on metrics and goals.',
      keyBenefits: [
        'Customized growth strategy',
        'Milestone planning',
        'Resource allocation',
        'Progress tracking'
      ],
      usageTips: [
        'Involve stakeholders',
        'Set realistic goals',
        'Regularly review'
      ],
      usageCount: 376,
      lastUsed: '3 days ago'
    },
    {
      id: 'trend-forecast',
      name: 'Trend Forecast Explorer',
      description: 'Explore market trends',
      icon: Activity,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/40',
      category: 'forecasting',
      path: '/resources/trend-forecast-explorer',
      longDescription: 'Predictive analytics tool that identifies emerging trends and forecasts market opportunities.',
      keyBenefits: [
        'Trend identification',
        'Market opportunity sizing',
        'Seasonality analysis',
        'Competitive forecasting'
      ],
      usageTips: [
        'Combine with sales data',
        'Validate with research',
        'Update monthly'
      ],
      usageCount: 289,
      lastUsed: '5 days ago'
    },
    // NEW FEATURES ADDED HERE
    {
      id: 'demand-forecasting',
      name: 'Demand Forecasting',
      description: 'Predict product demand and optimize inventory',
      icon: TrendingUpIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/40',
      category: 'forecasting',
      path: '/resources/demand-forecasting-dashboard',
      longDescription: 'Advanced demand forecasting tool that uses machine learning to predict product demand, optimize inventory levels, and reduce stockouts.',
      keyBenefits: [
        'Accurate demand predictions using historical data',
        'Seasonality and trend analysis',
        'Inventory optimization recommendations',
        'Stockout prevention and overstock reduction'
      ],
      usageTips: [
        'Upload at least 2 years of sales data for best results',
        'Adjust for promotions and marketing campaigns',
        'Regularly update forecasts with new sales data',
        'Consider external factors like seasonality and trends'
      ],
      usageCount: 412,
      lastUsed: 'Yesterday'
    },
    {
      id: 'customer-fit-size',
      name: 'Customer Fit & Size Analysis',
      description: 'Analyze customer fit preferences and size distribution',
      icon: UsersIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/40',
      category: 'analytics',
      path: '/resources/customer-fit',
      longDescription: 'Comprehensive analysis tool to understand customer fit preferences, size distribution, and return patterns to optimize sizing and reduce returns.',
      keyBenefits: [
        'Size recommendation optimization',
        'Return pattern analysis by size',
        'Customer fit preference insights',
        'Sizing chart optimization'
      ],
      usageTips: [
        'Analyze return reasons by size category',
        'Update sizing charts based on customer feedback',
        'Monitor fit satisfaction scores',
        'Test different sizing recommendations'
      ],
      usageCount: 328,
      lastUsed: '3 days ago'
    }
  ];

  // Categories - UPDATED WITH NEW CATEGORIES
  const categories = [
    { id: 'all', name: 'All Tools', icon: Grid, color: 'text-gray-300', count: features.length },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'text-blue-400', count: features.filter(f => f.category === 'analytics').length },
    { id: 'optimization', name: 'Optimization', icon: TrendingUp, color: 'text-green-400', count: features.filter(f => f.category === 'optimization').length },
    { id: 'content', name: 'Content', icon: FileText, color: 'text-amber-400', count: features.filter(f => f.category === 'content').length },
    { id: 'forecasting', name: 'Forecasting', icon: Globe, color: 'text-purple-400', count: features.filter(f => f.category === 'forecasting').length }
  ];

  // Filter features
  const filteredFeatures = features.filter(feature => {
    const matchesCategory = activeCategory === 'all' || feature.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Set default selected feature
  useEffect(() => {
    if (!selectedFeature && features.length > 0) {
      setSelectedFeature(features[0]);
    }
  }, []);

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  // Mobile navigation dropdown
  const MobileNavigation = () => (
    <div className="lg:hidden">
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium"
      >
        <Menu className="w-5 h-5" />
        Browse Tools
      </button>
      
      {showSidebar && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSidebar(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-gray-900 shadow-xl">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Tools</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {filteredFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => {
                      setSelectedFeature(feature);
                      setShowSidebar(false);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{feature.name}</p>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Categories dropdown - DARK THEME
  const CategoriesDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors text-white"
      >
        <Grid className="w-5 h-5" />
        <span className="hidden sm:inline">Categories</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
      </button>
      
      {showCategoriesDropdown && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-lg border border-gray-800 z-50">
          <div className="p-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setShowCategoriesDropdown(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 last:mb-0 ${
                  activeCategory === category.id
                    ? 'bg-blue-900/50 text-blue-400'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <category.icon className={`w-4 h-4 ${category.color}`} />
                  <span>{category.name}</span>
                </div>
                <span className="text-sm bg-gray-800 px-2 py-1 rounded">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // User menu dropdown - DARK THEME
  const UserMenuDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-8 h-8 rounded-full border-2 border-blue-500/30"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">{user.name}</p>
          <p className="text-xs text-gray-400">{user.role}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {showUserMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-800 z-50">
          <div className="p-2">
            <div className="px-3 py-2 border-b border-gray-800 mb-2">
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-300">
              Profile Settings
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-300">
              Account Settings
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-300">
              Help & Support
            </button>
            <div className="border-t border-gray-800 mt-2 pt-2">
              <button 
                onClick={() => navigate('/logout')}
                className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Tool selection panel - DARK THEME
  const ToolSelectionPanel = () => (
    <div className={`fixed lg:relative inset-y-0 left-0 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 w-80 lg:w-96 h-full bg-gray-900 border-r border-gray-800 z-40 overflow-y-auto`}>
      {/* Panel Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Analytics Tools</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tools List */}
      <div className="p-4">
        <div className="space-y-3">
          {filteredFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => {
                setSelectedFeature(feature);
                if (window.innerWidth < 1024) {
                  setShowSidebar(false);
                }
              }}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                selectedFeature?.id === feature.id
                  ? 'bg-blue-900/20 border-2 border-blue-500'
                  : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${feature.bgColor} flex-shrink-0`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white">{feature.name}</h3>
                    {feature.usageCount && (
                      <span className="text-xs text-gray-400">
                        {formatNumber(feature.usageCount)} uses
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{feature.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-700 rounded">
                      {categories.find(c => c.id === feature.category)?.name}
                    </span>
                    {feature.lastUsed && (
                      <span>Last used: {feature.lastUsed}</span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
          
          {filteredFeatures.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 mx-auto text-gray-600 mb-3" />
              <p className="text-gray-400">No tools found</p>
              <p className="text-sm text-gray-500 mt-1">Try a different search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* DARK HEADER - PUSHED DOWN WITH MARGIN */}
      <header className="sticky top-0 z-40 bg-gray-900 border-b border-gray-800 shadow-lg mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side - Logo & Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-900/30">
                  <Calculator className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">E-commerce Analytics</h1>
                  <p className="text-sm text-gray-400">Professional Dashboard</p>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center gap-2 ml-8">
                <CategoriesDropdown />
              </div>
            </div>

            {/* Right side - User Controls */}
            <div className="flex items-center gap-4">
              {/* Mobile Navigation */}
              <div className="lg:hidden">
                <MobileNavigation />
              </div>
              
              {/* Search for desktop */}
              <div className="hidden lg:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-72 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                title={darkMode ? 'Switch to Light' : 'Switch to Dark'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {/* Notifications */}
              <button className="p-2.5 hover:bg-gray-800 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-400 hover:text-white" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-900"></span>
              </button>
              
              {/* User Menu */}
              <UserMenuDropdown />
            </div>
          </div>
          
          {/* Quick Access Bar */}
          <div className="flex items-center gap-6 pb-4 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Quick Access:</span>
              <button 
                onClick={() => navigate('/resources/roi-calculator')}
                className="px-3 py-1.5 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 rounded-lg transition-colors"
              >
                ROI Calculator
              </button>
              <button 
                onClick={() => navigate('/resources/ecommerce-audit')}
                className="px-3 py-1.5 bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 rounded-lg transition-colors"
              >
                E-commerce Audit
              </button>
              <button 
                onClick={() => navigate('/resources/demand-forecasting')}
                className="px-3 py-1.5 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 rounded-lg transition-colors"
              >
                Demand Forecasting
              </button>
              <button 
                onClick={() => navigate('/resources/customer-fit-size')}
                className="px-3 py-1.5 bg-purple-900/30 hover:bg-purple-900/50 text-purple-400 rounded-lg transition-colors"
              >
                Fit & Size Analysis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Stats Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Tools</p>
                  <p className="text-3xl font-bold text-white mt-2">{features.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-900/30">
                  <Calculator className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                All e-commerce calculators
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Calculations</p>
                  <p className="text-3xl font-bold text-white mt-2">12,847</p>
                </div>
                <div className="p-3 rounded-lg bg-green-900/30">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Performed this month
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-3xl font-bold text-white mt-2">1,284</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-900/30">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Currently online
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="text-3xl font-bold text-white mt-2">98.2%</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-900/30">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Accurate calculations
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tool Selection Panel */}
          <ToolSelectionPanel />
          
          {/* Main Content Area */}
          <div className="flex-1">
            {selectedFeature ? (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-xl p-6 lg:p-8">
                {/* Feature Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                  <div className="flex items-start gap-5">
                    <div className={`p-4 rounded-xl ${selectedFeature.bgColor}`}>
                      <selectedFeature.icon className={`w-10 h-10 ${selectedFeature.color}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-3">{selectedFeature.name}</h2>
                      <p className="text-lg text-gray-300 mb-4">{selectedFeature.longDescription}</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-400" />
                          <span className="text-gray-300">
                            {selectedFeature.usageCount ? formatNumber(selectedFeature.usageCount) + ' uses' : 'Popular'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">
                            {selectedFeature.lastUsed || 'Recently used'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-gray-300">
                            {categories.find(c => c.id === selectedFeature.category)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                    <button
                      onClick={() => navigate(selectedFeature.path)}
                      className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <Calculator className="w-5 h-5" />
                      Open Tool
                    </button>
                    <button className="px-5 py-3.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2.5 transition-colors border border-gray-700">
                      <Star className="w-5 h-5" />
                      Add to Favorites
                    </button>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Key Benefits */}
                  <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-blue-900/30">
                        <CheckCircle className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Key Benefits</h3>
                    </div>
                    <ul className="space-y-4">
                      {selectedFeature.keyBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="p-1 mt-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pro Tips */}
                  <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-amber-900/30">
                        <Zap className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Pro Tips</h3>
                    </div>
                    <ul className="space-y-4">
                      {selectedFeature.usageTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="p-1 mt-1">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          </div>
                          <span className="text-gray-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* How It Works */}
                <div className="mt-8 bg-gray-800/30 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-6">How It Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { step: 1, title: 'Input Data', desc: 'Enter your metrics or upload data files', icon: FileText },
                      { step: 2, title: 'Run Analysis', desc: 'Algorithms process and analyze your data', icon: BarChart3 },
                      { step: 3, title: 'Get Insights', desc: 'Receive actionable recommendations', icon: Target }
                    ].map((item) => (
                      <div key={item.step} className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                        <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                          <span className="text-xl font-bold text-blue-400">{item.step}</span>
                        </div>
                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Ready to Get Started?</h3>
                      <p className="text-blue-100">Open the full calculator for detailed analysis and insights.</p>
                    </div>
                    <button
                      onClick={() => navigate(selectedFeature.path)}
                      className="px-8 py-3.5 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Launch Calculator
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-900 rounded-2xl border border-gray-800">
                <Calculator className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Select a Tool</h3>
                <p className="text-gray-400 mb-6">Choose a tool from the panel to view details</p>
                <button
                  onClick={() => setShowSidebar(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold lg:hidden"
                >
                  Browse Tools
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedDashboard;