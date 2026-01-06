// QualityChecker.tsx - Complete Catalog Quality Checker Dashboard
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, Treemap
} from 'recharts';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Alert, AlertDescription, AlertTitle,
} from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types and Interfaces
interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  discountPrice?: number;
  inventory: number;
  status: 'active' | 'inactive' | 'draft';
  images: string[];
  attributes: ProductAttributes;
  seo: SEOData;
  media: MediaAssets;
  qualityScores: QualityScores;
  issues: Issue[];
  createdAt: string;
  updatedAt: string;
}

interface ProductAttributes {
  size: string[];
  color: string[];
  material: string[];
  brand: string;
  fit: string;
  fabricCare: string[];
  technicalSpecs: Record<string, string>;
  tags: string[];
  weight?: number;
  dimensions?: string;
}

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  altTags: string[];
  keywords: string[];
  canonicalUrl?: string;
  richSchema?: any;
}

interface MediaAssets {
  images: ImageData[];
  videos?: VideoData[];
  threeSixtyImages?: string[];
  virtualTryOnCompatible: boolean;
  modelShots: number;
  flatLayShots: number;
}

interface ImageData {
  url: string;
  qualityScore: number;
  resolution: { width: number; height: number };
  blurScore: number;
  backgroundUniformity: number;
  lightingScore: number;
  issues: string[];
  altText?: string;
}

interface VideoData {
  url: string;
  duration: number;
  quality: string;
}

interface QualityScores {
  completeness: number;
  attributes: number;
  images: number;
  media: number;
  tagging: number;
  seo: number;
  searchability: number;
  conversion: number;
  compliance: number;
  overall: number;
}

interface Issue {
  id: string;
  type: 'error' | 'warning' | 'info';
  priority: 'high' | 'medium' | 'low';
  module: string;
  title: string;
  description: string;
  sku?: string;
  productId?: string;
  suggestedFix?: string;
  autoFixable: boolean;
  createdAt: string;
}

interface CategoryStats {
  name: string;
  productCount: number;
  avgQualityScore: number;
  completeness: number;
  issuesCount: number;
  highPriorityIssues: number;
}

interface DashboardMetrics {
  totalProducts: number;
  totalSKUs: number;
  catalogQualityScore: number;
  issuesByPriority: {
    high: number;
    medium: number;
    low: number;
  };
  completenessPercentage: number;
  recentIssues: Issue[];
  categoryDistribution: CategoryStats[];
}

// AI Recommendation Types
interface AIRecommendation {
  id: string;
  type: 'fix' | 'optimization' | 'enhancement';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedEffort: number; // minutes
  autoApply: boolean;
  affectedProducts: number;
  preview?: any;
}

// Helper function to get safe badge variant
const getBadgeVariant = (type: string): "default" | "destructive" | "outline" | "secondary" => {
  if (type === 'error' || type === 'destructive' || type === 'Critical' || type === 'High') return 'destructive';
  if (type === 'warning' || type === 'Medium') return 'default';
  if (type === 'success' || type === 'Good' || type === 'Compliant') return 'secondary';
  return 'outline';
};

// Helper function to get badge variant for priority
const getPriorityBadgeVariant = (priority: 'high' | 'medium' | 'low' | string): "default" | "destructive" | "outline" | "secondary" => {
  if (priority === 'high' || priority === 'High' || priority === 'Critical') return 'destructive';
  if (priority === 'medium' || priority === 'Medium') return 'default';
  return 'outline';
};

// Helper function to get badge variant for impact
const getImpactBadgeVariant = (impact: string): "default" | "destructive" | "outline" | "secondary" => {
  if (impact === 'high') return 'destructive';
  if (impact === 'medium') return 'default';
  return 'outline';
};

// Main Dashboard Component
const CatalogueQualityChecker: React.FC = (): JSX.Element => {
  // State Management
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>({
    totalProducts: 0,
    totalSKUs: 0,
    catalogQualityScore: 0,
    issuesByPriority: { high: 0, medium: 0, low: 0 },
    completenessPercentage: 0,
    recentIssues: [],
    categoryDistribution: [],
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [realTimeAlerts, setRealTimeAlerts] = useState<Issue[]>([]);
  const [customRules, setCustomRules] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [autoFixEnabled, setAutoFixEnabled] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    initializeData();
    loadTrendData();
    setupWebSocket();
  }, []);

  const initializeData = () => {
    // Sample products data
    const sampleProducts: Product[] = [
      {
        id: 'prod_001',
        sku: 'TSHIRT-BLK-M',
        name: 'Premium Cotton T-Shirt',
        description: 'High-quality cotton t-shirt with premium finish',
        category: 'Apparel',
        subcategory: 'T-Shirts',
        price: 29.99,
        discountPrice: 24.99,
        inventory: 150,
        status: 'active',
        images: ['https://example.com/tshirt1.jpg'],
        attributes: {
          size: ['S', 'M', 'L', 'XL'],
          color: ['Black', 'White'],
          material: ['100% Cotton'],
          brand: 'PremiumWear',
          fit: 'Regular',
          fabricCare: ['Machine Wash Cold', 'Tumble Dry Low'],
          technicalSpecs: {
            weight: '180 GSM',
            fabricType: 'Jersey',
            origin: 'India'
          },
          tags: ['casual', 'cotton', 'basic', 'summer']
        },
        seo: {
          metaTitle: 'Premium Cotton T-Shirt - Best Quality | PremiumWear',
          metaDescription: 'Buy premium quality cotton t-shirt at best price. Available in multiple sizes and colors.',
          altTags: ['black cotton t-shirt', 'premium t-shirt'],
          keywords: ['t-shirt', 'cotton', 'premium', 'casual wear']
        },
        media: {
          images: [
            {
              url: 'https://example.com/tshirt1.jpg',
              qualityScore: 85,
              resolution: { width: 1920, height: 1280 },
              blurScore: 0.1,
              backgroundUniformity: 0.9,
              lightingScore: 0.8,
              issues: ['No model shot', 'Missing close-up'],
              altText: 'Black cotton t-shirt front view'
            }
          ],
          videos: [],
          virtualTryOnCompatible: false,
          modelShots: 0,
          flatLayShots: 1
        },
        qualityScores: {
          completeness: 85,
          attributes: 90,
          images: 75,
          media: 60,
          tagging: 80,
          seo: 88,
          searchability: 82,
          conversion: 78,
          compliance: 92,
          overall: 81
        },
        issues: [
          {
            id: 'issue_001',
            type: 'warning',
            priority: 'medium',
            module: 'Image Quality Checker',
            title: 'Insufficient product images',
            description: 'Product has only 1 image. Minimum 3 images required for better conversion.',
            sku: 'TSHIRT-BLK-M',
            productId: 'prod_001',
            suggestedFix: 'Add front, back, and detail shots of the product',
            autoFixable: false,
            createdAt: '2024-01-15T10:30:00Z'
          }
        ],
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-01-14T15:30:00Z'
      },
      // Add more sample products as needed
    ];

    setProducts(sampleProducts);
    
    // Calculate dashboard metrics
    const metrics: DashboardMetrics = {
      totalProducts: sampleProducts.length,
      totalSKUs: sampleProducts.reduce((acc, p) => acc + (p.attributes.size?.length || 1), 0),
      catalogQualityScore: calculateAverageScore(sampleProducts),
      issuesByPriority: {
        high: 12,
        medium: 45,
        low: 89
      },
      completenessPercentage: 78,
      recentIssues: [
        {
          id: 'alert_001',
          type: 'error',
          priority: 'high',
          module: 'Product Completeness',
          title: 'Missing GTIN for 15 products',
          description: '15 products are missing GTIN/UPC codes which are required for marketplace listing',
          autoFixable: true,
          createdAt: new Date().toISOString()
        }
      ],
      categoryDistribution: [
        { name: 'Apparel', productCount: 45, avgQualityScore: 82, completeness: 85, issuesCount: 23, highPriorityIssues: 5 },
        { name: 'Electronics', productCount: 32, avgQualityScore: 88, completeness: 92, issuesCount: 12, highPriorityIssues: 2 },
        { name: 'Home & Garden', productCount: 28, avgQualityScore: 76, completeness: 72, issuesCount: 34, highPriorityIssues: 8 },
        { name: 'Beauty', productCount: 19, avgQualityScore: 91, completeness: 94, issuesCount: 8, highPriorityIssues: 1 },
      ]
    };

    setDashboardMetrics(metrics);
    
    // Load AI recommendations
    setAiRecommendations(generateAIRecommendations());
    
    setIsLoading(false);
  };

  const calculateAverageScore = (products: Product[]): number => {
    if (products.length === 0) return 0;
    const total = products.reduce((sum, product) => sum + product.qualityScores.overall, 0);
    return Math.round(total / products.length);
  };

  const generateAIRecommendations = (): AIRecommendation[] => {
    return [
      {
        id: 'rec_001',
        type: 'fix',
        title: 'Auto-generate missing descriptions',
        description: '15 products are missing product descriptions. AI can generate optimized descriptions based on attributes.',
        impact: 'high',
        estimatedEffort: 5,
        autoApply: true,
        affectedProducts: 15,
        preview: { before: 'No description', after: 'Premium cotton t-shirt with...' }
      },
      {
        id: 'rec_002',
        type: 'optimization',
        title: 'Optimize image ALT tags',
        description: '23 product images have missing or generic ALT tags. AI can generate descriptive ALT text.',
        impact: 'medium',
        estimatedEffort: 10,
        autoApply: true,
        affectedProducts: 23
      },
      {
        id: 'rec_003',
        type: 'enhancement',
        title: 'Add semantic keywords',
        description: 'Add 5-7 semantic keywords to improve internal search relevance for 42 products.',
        impact: 'medium',
        estimatedEffort: 15,
        autoApply: false,
        affectedProducts: 42
      }
    ];
  };

  const loadTrendData = () => {
    const data = [];
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        qualityScore: 70 + Math.random() * 20,
        completeness: 65 + Math.random() * 25,
        issues: Math.floor(Math.random() * 50),
        fixedIssues: Math.floor(Math.random() * 30)
      });
    }
    setTrendData(data);
  };

  const setupWebSocket = () => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newAlert: Issue = {
        id: `alert_${Date.now()}`,
        type: Math.random() > 0.7 ? 'error' : 'warning',
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        module: ['Image Quality', 'SEO', 'Attributes', 'Compliance'][Math.floor(Math.random() * 4)],
        title: 'New issue detected',
        description: 'A new issue has been detected in the catalog',
        autoFixable: Math.random() > 0.5,
        createdAt: new Date().toISOString()
      };
      setRealTimeAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
    }, 10000);

    return () => clearInterval(interval);
  };

  // Export Functions
  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    setExportFormat(format);
    // Implement export logic
    console.log(`Exporting in ${format} format`);
    
    // Generate and download report
    const report = generateExportReport();
    downloadReport(report, format);
  };

  const generateExportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      metrics: dashboardMetrics,
      products: products.map(p => ({
        sku: p.sku,
        name: p.name,
        qualityScore: p.qualityScores.overall,
        issues: p.issues.length,
        completeness: p.qualityScores.completeness
      })),
      recommendations: aiRecommendations,
      summary: {
        totalIssues: dashboardMetrics.issuesByPriority.high + 
                   dashboardMetrics.issuesByPriority.medium + 
                   dashboardMetrics.issuesByPriority.low,
        fixableIssues: aiRecommendations.filter(r => r.autoApply).length
      }
    };
    return report;
  };

  const downloadReport = (report: any, format: string) => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `catalog-quality-report-${new Date().toISOString().split('T')[0]}.${format}`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // AI Auto-Fix Functions
  const applyAutoFix = (recommendationId: string) => {
    const recommendation = aiRecommendations.find(r => r.id === recommendationId);
    if (!recommendation) return;

    console.log(`Applying auto-fix: ${recommendation.title}`);
    
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      // Update affected products
      const updatedProducts = products.map(product => {
        if (Math.random() > 0.5) { // Simulate some products being fixed
          return {
            ...product,
            qualityScores: {
              ...product.qualityScores,
              overall: Math.min(100, product.qualityScores.overall + 5)
            }
          };
        }
        return product;
      });
      
      setProducts(updatedProducts);
      setIsLoading(false);
      
      // Remove the applied recommendation
      setAiRecommendations(prev => prev.filter(r => r.id !== recommendationId));
      
      // Show success message
      alert(`Successfully applied fix: ${recommendation.title}`);
    }, 2000);
  };

  const applyBulkFix = () => {
    const autoApplicable = aiRecommendations.filter(r => r.autoApply);
    if (autoApplicable.length === 0) {
      alert('No auto-fixable recommendations available');
      return;
    }

    if (confirm(`Apply ${autoApplicable.length} auto-fixes?`)) {
      setIsLoading(true);
      // Simulate bulk fix application
      setTimeout(() => {
        setAiRecommendations(prev => prev.filter(r => !r.autoApply));
        setIsLoading(false);
        alert(`Applied ${autoApplicable.length} fixes successfully`);
      }, 3000);
    }
  };

  // Custom Rules Management
  const addCustomRule = (rule: any) => {
    setCustomRules([...customRules, rule]);
  };

  const removeCustomRule = (ruleId: string) => {
    setCustomRules(customRules.filter(rule => rule.id !== ruleId));
  };

  // Product Selection and Navigation
  const navigateToProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setActiveTab('product-detail');
    }
  };

  // Priority Score Calculation
  const calculatePriorityScore = (issue: Issue): number => {
    const priorityWeights = { high: 3, medium: 2, low: 1 };
    const typeWeights = { error: 3, warning: 2, info: 1 };
    return priorityWeights[issue.priority] * typeWeights[issue.type];
  };

  // Render Components
  const renderDashboardOverview = () => (
    <div className="space-y-6">
      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catalog Quality Score</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.catalogQualityScore}/100</div>
            <Progress value={dashboardMetrics.catalogQualityScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              +2.5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SKU Completeness</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.completenessPercentage}%</div>
            <Progress value={dashboardMetrics.completenessPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {dashboardMetrics.totalProducts} products, {dashboardMetrics.totalSKUs} SKUs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardMetrics.issuesByPriority.high + dashboardMetrics.issuesByPriority.medium}
            </div>
            <div className="flex space-x-2 mt-2">
              <Badge variant="destructive">High: {dashboardMetrics.issuesByPriority.high}</Badge>
              <Badge variant="default">Medium: {dashboardMetrics.issuesByPriority.medium}</Badge>
              <Badge variant="outline">Low: {dashboardMetrics.issuesByPriority.low}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Fix Ready</CardTitle>
            <div className="h-4 w-4 rounded-full bg-purple-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {aiRecommendations.filter(r => r.autoApply).length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {aiRecommendations.length} total recommendations
            </p>
            <Button size="sm" className="mt-2" onClick={applyBulkFix}>
              Apply All Auto-Fixes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quality Score Trend</CardTitle>
            <CardDescription>Last 30 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="qualityScore" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="completeness" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Category-wise Quality Distribution</CardTitle>
            <CardDescription>Average scores by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardMetrics.categoryDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgQualityScore" fill="#8884d8" name="Quality Score" />
                <Bar dataKey="completeness" fill="#82ca9d" name="Completeness" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Issues and AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues & Alerts</CardTitle>
            <CardDescription>Real-time issue detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {realTimeAlerts.map((alert, index) => (
                <Alert key={alert.id} variant={alert.type === 'error' ? 'destructive' : 'default'}>
                  <div className="flex items-center justify-between">
                    <div>
                      <AlertTitle className="flex items-center">
                        <span className={`h-2 w-2 rounded-full mr-2 ${
                          alert.priority === 'high' ? 'bg-red-500' :
                          alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></span>
                        {alert.title}
                      </AlertTitle>
                      <AlertDescription>
                        {alert.description}
                      </AlertDescription>
                    </div>
                    <Badge variant={getBadgeVariant(alert.type)}>
                      {alert.module}
                    </Badge>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Fix Recommendations</CardTitle>
            <CardDescription>Automated fix suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={getImpactBadgeVariant(rec.impact)}>
                          {rec.impact} impact
                        </Badge>
                        <Badge variant="outline">
                          {rec.affectedProducts} products
                        </Badge>
                        <Badge variant={rec.autoApply ? 'default' : 'outline'}>
                          {rec.autoApply ? 'Auto-fixable' : 'Manual review'}
                        </Badge>
                      </div>
                    </div>
                    {rec.autoApply && (
                      <Button size="sm" onClick={() => applyAutoFix(rec.id)}>
                        Apply Fix
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Generate comprehensive quality reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleExport('csv')} variant="outline">
              <i className="fas fa-file-csv mr-2"></i>
              Export CSV
            </Button>
            <Button onClick={() => handleExport('excel')} variant="outline">
              <i className="fas fa-file-excel mr-2"></i>
              Export Excel
            </Button>
            <Button onClick={() => handleExport('pdf')} variant="outline">
              <i className="fas fa-file-pdf mr-2"></i>
              Export PDF
            </Button>
            <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV Format</SelectItem>
                <SelectItem value="excel">Excel Format</SelectItem>
                <SelectItem value="pdf">PDF Format</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProductCompletenessChecker = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Completeness Checker</CardTitle>
          <CardDescription>Validates essential fields for each SKU</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="missing-fields">Missing Fields</TabsTrigger>
              <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Completeness Score</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl font-bold text-blue-600">
                      {dashboardMetrics.completenessPercentage}%
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Across all products
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Field Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {['Product Name', 'Description', 'Category', 'Price', 'SKU'].map((field) => (
                        <div key={field} className="flex justify-between items-center">
                          <span className="text-sm">{field}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={85 + Math.random() * 15} className="w-24" />
                            <span className="text-sm font-medium">
                              {Math.round(85 + Math.random() * 15)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-bolt mr-2"></i>
                      Fix All Missing Names
                    </Button>
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-magic mr-2"></i>
                      Generate Missing Descriptions
                    </Button>
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-sync mr-2"></i>
                      Sync Inventory Status
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="missing-fields">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Missing Fields</TableHead>
                    <TableHead>Completeness</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.slice(0, 5).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.sku}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {Math.random() > 0.7 && <Badge variant="outline">Description</Badge>}
                          {Math.random() > 0.5 && <Badge variant="outline">GTIN</Badge>}
                          {Math.random() > 0.8 && <Badge variant="outline">Inventory</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={product.qualityScores.completeness} className="w-24" />
                          <span>{product.qualityScores.completeness}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="ai-suggestions">
              <div className="space-y-4">
                <Alert>
                  <i className="fas fa-robot mr-2"></i>
                  <AlertTitle>AI Suggestions Available</AlertTitle>
                  <AlertDescription>
                    AI can generate missing data for 15 products
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.slice(0, 4).map((product) => (
                    <Card key={product.id}>
                      <CardHeader>
                        <CardTitle className="text-sm">{product.sku}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Label>Suggested Description</Label>
                            <Textarea 
                              defaultValue="Premium quality product with excellent features..."
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Suggested GTIN</Label>
                            <Input defaultValue="123456789012" />
                          </div>
                          <Button size="sm" className="w-full">
                            <i className="fas fa-check mr-2"></i>
                            Apply Suggestions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  const renderImageQualityChecker = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="fas fa-camera mr-2"></i>
            Image Quality Checker (AI Powered)
          </CardTitle>
          <CardDescription>Computer vision analysis of product images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Image Analysis Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Avg. Resolution</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-2xl font-bold">1920x1280</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Blur Detection</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-2xl font-bold text-green-600">92%</div>
                        <p className="text-xs text-muted-foreground">Clear images</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Background Uniformity</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-muted-foreground">Consistent backgrounds</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Lighting Quality</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-2xl font-bold text-yellow-600">78%</div>
                        <p className="text-xs text-muted-foreground">Needs improvement</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Image Issues Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={[
                        { issue: 'Low Resolution', count: 12 },
                        { issue: 'Blurry', count: 8 },
                        { issue: 'Poor Lighting', count: 23 },
                        { issue: 'Watermark', count: 5 },
                        { issue: 'No Background', count: 17 },
                        { issue: 'Missing Angles', count: 31 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="issue" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>AI-Enhanced Image Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Original Image</Label>
                        <div className="border rounded p-4 mt-2">
                          <div className="h-40 bg-gray-100 flex items-center justify-center">
                            <i className="fas fa-image text-4xl text-gray-300"></i>
                          </div>
                          <div className="mt-2 text-sm">
                            <p><Badge variant="destructive">Issues:</Badge> Poor lighting, No model shot</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>AI Enhanced Preview</Label>
                        <div className="border rounded p-4 mt-2">
                          <div className="h-40 bg-gray-100 flex items-center justify-center">
                            <i className="fas fa-magic text-4xl text-purple-300"></i>
                          </div>
                          <div className="mt-2 text-sm">
                            <p><Badge variant="secondary">Improved:</Badge> Better lighting, Added model</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <i className="fas fa-download mr-2"></i>
                        Download Enhanced Version
                      </Button>
                      <Button>
                        <i className="fas fa-check mr-2"></i>
                        Apply to All Similar Images
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Upload Image for Analysis</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 mt-2 text-center">
                        <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-muted-foreground">Drop image here or click to upload</p>
                        <Input type="file" className="mt-4" accept="image/*" />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Auto-Fix Settings</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Auto-enhance lighting</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Remove watermarks</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Add white background</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Optimize for web</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <i className="fas fa-robot mr-2"></i>
                      Run AI Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Brand Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      <span className="text-sm">White background required</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      <span className="text-sm">Minimum 1000px width</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-times-circle text-red-500 mr-2"></i>
                      <span className="text-sm">No text overlays</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      <span className="text-sm">Multiple angles required</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Products Needing Image Improvements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Image Quality Score</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={product.qualityScores.images} className="w-24" />
                      <span>{product.qualityScores.images}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.qualityScores.images < 70 && (
                        <Badge variant="destructive">Low Quality</Badge>
                      )}
                      {product.media.images.length < 3 && (
                        <Badge variant="default">Few Images</Badge>
                      )}
                      {!product.media.virtualTryOnCompatible && (
                        <Badge variant="outline">No VTO</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm">
                      <i className="fas fa-wand-magic-sparkles mr-2"></i>
                      Enhance
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderMediaCompletenessChecker = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="fas fa-photo-video mr-2"></i>
            Media Completeness Checker
          </CardTitle>
          <CardDescription>Ensures rich media assets are available and optimized</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Media Health Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Media Score</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-2xl font-bold text-blue-600">78/100</div>
                        <Progress value={78} className="mt-2" />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Missing Images</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-2xl font-bold text-red-600">45</div>
                        <p className="text-xs text-muted-foreground">Products</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">No Videos</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-2xl font-bold text-orange-600">68</div>
                        <p className="text-xs text-muted-foreground">Products</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">360° Images</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <p className="text-xs text-muted-foreground">Available</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Media Types Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Images Only', value: 45 },
                                { name: 'With Videos', value: 22 },
                                { name: 'With 360°', value: 12 },
                                { name: 'VTO Compatible', value: 8 }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={(entry) => `${entry.name}: ${entry.value}`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#8884d8" />
                              <Cell fill="#82ca9d" />
                              <Cell fill="#ffc658" />
                              <Cell fill="#ff8042" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Image Coverage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={[
                            { type: 'Single Image', count: 23 },
                            { type: '2-3 Images', count: 45 },
                            { type: '4-5 Images', count: 28 },
                            { type: '6+ Images', count: 12 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recommended Media Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="images">
                    <TabsList>
                      <TabsTrigger value="images">Missing Images</TabsTrigger>
                      <TabsTrigger value="videos">Video Content</TabsTrigger>
                      <TabsTrigger value="interactive">Interactive Media</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="images" className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Current Images</TableHead>
                            <TableHead>Required Images</TableHead>
                            <TableHead>Missing Shots</TableHead>
                            <TableHead>Priority</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { sku: 'TSHIRT-BLK-M', current: 1, required: 5, missing: ['Back', 'Side', 'Detail', 'Model'], priority: 'High' },
                            { sku: 'JEANS-BLUE-32', current: 2, required: 6, missing: ['Back', 'Fit', 'Detail', 'Fabric'], priority: 'High' },
                            { sku: 'SHOES-RUN-10', current: 3, required: 5, missing: ['Bottom', 'Side'], priority: 'Medium' },
                            { sku: 'WATCH-GOLD', current: 4, required: 5, missing: ['Wrist Shot'], priority: 'Low' }
                          ].map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.sku}</TableCell>
                              <TableCell>{item.current}</TableCell>
                              <TableCell>{item.required}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {item.missing.map((shot, idx) => (
                                    <Badge key={idx} variant="outline">{shot}</Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={getPriorityBadgeVariant(item.priority)}>
                                  {item.priority}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      
                      <div className="flex justify-end">
                        <Button>
                          <i className="fas fa-image mr-2"></i>
                          Generate Image Requirements Report
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="videos">
                      <Alert className="mb-4">
                        <i className="fas fa-video mr-2"></i>
                        <AlertTitle>Video Content Impact</AlertTitle>
                        <AlertDescription>
                          Products with videos have 85% higher conversion rates
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Video Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                <li className="flex items-center">
                                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                  <span>Product demonstration (30-60 sec)</span>
                                </li>
                                <li className="flex items-center">
                                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                  <span>Usage scenarios</span>
                                </li>
                                <li className="flex items-center">
                                  <i className="fas fa-times-circle text-red-500 mr-2"></i>
                                  <span>Customer testimonials</span>
                                </li>
                                <li className="flex items-center">
                                  <i className="fas fa-times-circle text-red-500 mr-2"></i>
                                  <span>How-to guides</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <Button className="w-full" variant="outline">
                                <i className="fas fa-plus mr-2"></i>
                                Add Video to Top 10 Products
                              </Button>
                              <Button className="w-full" variant="outline">
                                <i className="fas fa-robot mr-2"></i>
                                Generate AI Video Scripts
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="interactive">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>360° Product Views</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Products with 360° views:</span>
                                <Badge variant="secondary">12</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Recommended for:</span>
                                <Badge variant="outline">Electronics</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Cost to add:</span>
                                <Badge variant="outline">$$$</Badge>
                              </div>
                              <Button className="w-full">
                                <i className="fas fa-sync-alt mr-2"></i>
                                View 360° Integration Guide
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>Virtual Try-On (VTO)</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">VTO Compatible:</span>
                                <Badge variant="secondary">8 products</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Recommended for:</span>
                                <Badge variant="outline">Apparel & Accessories</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">ROI Increase:</span>
                                <Badge variant="secondary">+40%</Badge>
                              </div>
                              <Button className="w-full" variant="outline">
                                <i className="fas fa-user mr-2"></i>
                                Enable VTO for Catalog
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Media Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Minimum Requirements</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Images per product:</span>
                          <Badge variant="default">5+ recommended</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Video content:</span>
                          <Badge variant="outline">Optional but preferred</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">360° views:</span>
                          <Badge variant="outline">Premium products only</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Model vs Flat lay:</span>
                          <Badge variant="default">Both required</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-2">Coverage Analysis</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Model Shots</span>
                            <span>65% coverage</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Flat Lay Shots</span>
                            <span>88% coverage</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Detail Shots</span>
                            <span>42% coverage</span>
                          </div>
                          <Progress value={42} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Lifestyle Shots</span>
                            <span>28% coverage</span>
                          </div>
                          <Progress value={28} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold">Quick Media Fixes</h4>
                      <Button className="w-full" variant="outline">
                        <i className="fas fa-bolt mr-2"></i>
                        Add Missing Base Images
                      </Button>
                      <Button className="w-full" variant="outline">
                        <i className="fas fa-sync-alt mr-2"></i>
                        Standardize Image Sizes
                      </Button>
                      <Button className="w-full" variant="outline">
                        <i className="fas fa-users mr-2"></i>
                        Add Model Shots
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Media Upload Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag & drop media files or click to upload
                      </p>
                      <div className="space-y-2">
                        <Input type="file" multiple accept="image/*,video/*" />
                        <p className="text-xs text-muted-foreground">
                          Supports: JPG, PNG, MP4, GIF (Max: 100MB each)
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Assign to Products</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select products" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="selected">Selected Products</SelectItem>
                          <SelectItem value="category">By Category</SelectItem>
                          <SelectItem value="missing">Products Missing Media</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full">
                      <i className="fas fa-upload mr-2"></i>
                      Upload & Process Media
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Media Quality Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Conversion Impact</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-green-600">+85%</div>
                <p className="text-xs text-muted-foreground">With videos vs without</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Return Rate</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-red-600">-35%</div>
                <p className="text-xs text-muted-foreground">With 360° views</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Time on Page</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-blue-600">+2.3x</div>
                <p className="text-xs text-muted-foreground">With interactive media</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">SEO Impact</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-purple-600">+40%</div>
                <p className="text-xs text-muted-foreground">With rich media</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAttributeValidation = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Attribute & Metadata Validation</CardTitle>
          <CardDescription>Validates product attributes and metadata completeness</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Attribute Health</TabsTrigger>
              <TabsTrigger value="missing">Missing Attributes</TabsTrigger>
              <TabsTrigger value="inconsistent">Inconsistencies</TabsTrigger>
              <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Size', 'Color', 'Material', 'Brand', 'Fit', 'Fabric Care', 'SEO Meta', 'ALT Tags'].map((attr) => (
                  <Card key={attr}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">{attr}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">
                          {Math.floor(70 + Math.random() * 25)}%
                        </div>
                        <Badge variant={getBadgeVariant(
                          Math.random() > 0.7 ? "destructive" :
                          Math.random() > 0.4 ? "warning" : "success"
                        )}>
                          {Math.random() > 0.7 ? "Poor" :
                           Math.random() > 0.4 ? "Fair" : "Good"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Attribute Consistency Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={[
                      { attribute: 'Completeness', score: 85 },
                      { attribute: 'Accuracy', score: 78 },
                      { attribute: 'Consistency', score: 92 },
                      { attribute: 'Standardization', score: 65 },
                      { attribute: 'SEO Readiness', score: 88 },
                      { attribute: 'Marketplace Ready', score: 72 }
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="attribute" />
                      <PolarRadiusAxis />
                      <Radar name="Attributes" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="missing">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Missing Attributes</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Auto-fix Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.sku}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {Math.random() > 0.6 && <div className="text-sm">• Missing color variations</div>}
                          {Math.random() > 0.5 && <div className="text-sm">• No fabric care instructions</div>}
                          {Math.random() > 0.7 && <div className="text-sm">• Missing technical specs</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityBadgeVariant(
                          Math.random() > 0.7 ? "high" :
                          Math.random() > 0.5 ? "medium" : "low"
                        )}>
                          {Math.random() > 0.7 ? "High" :
                           Math.random() > 0.5 ? "Medium" : "Low"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch checked={Math.random() > 0.3} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="inconsistent">
              <Alert className="mb-4">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                <AlertTitle>Inconsistencies Detected</AlertTitle>
                <AlertDescription>
                  Found 23 products with conflicting attribute values
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible>
                <AccordionItem value="color-mismatch">
                  <AccordionTrigger>Color Label Mismatches (12 products)</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Products labeled as "Navy Blue" but images show "Royal Blue"</p>
                      <Button size="sm">Standardize Color Names</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="material-conflict">
                  <AccordionTrigger>Material Conflicts (8 products)</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Attributes show "100% Cotton" but description mentions "polyester blend"</p>
                      <Button size="sm">Review Material Specifications</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="size-inconsistency">
                  <AccordionTrigger>Size Standardization Issues (15 products)</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Mixed size formats: "M", "Medium", "MED" used interchangeably</p>
                      <Button size="sm">Standardize Size Labels</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="suggestions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Attribute Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Current Tags</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="default">casual</Badge>
                          <Badge variant="default">cotton</Badge>
                          <Badge variant="default">basic</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <Label>AI Suggested Tags</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">summer-wear</Badge>
                          <Badge variant="outline">everyday-essential</Badge>
                          <Badge variant="outline">breathable</Badge>
                          <Badge variant="outline">lightweight</Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm">Accept All</Button>
                        <Button size="sm" variant="outline">Review</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Metadata Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Current Meta Title</Label>
                        <Input defaultValue="Premium Cotton T-Shirt" />
                      </div>
                      
                      <div>
                        <Label>AI Optimized Title</Label>
                        <Input value="Premium 100% Cotton T-Shirt for Men | Comfort & Style | BrandName" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Includes keywords: cotton, t-shirt, men, premium
                        </p>
                      </div>
                      
                      <Button className="w-full">
                        <i className="fas fa-robot mr-2"></i>
                        Apply AI Suggestions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  const renderSEOChecker = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Optimization Checker</CardTitle>
          <CardDescription>Validates SEO readiness and provides optimization suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">SEO Score</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-3xl font-bold text-green-600">82/100</div>
                    <Progress value={82} className="mt-2" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Missing Elements</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-3xl font-bold text-orange-600">23</div>
                    <p className="text-sm text-muted-foreground">Products need SEO fixes</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>SEO Elements Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Element</TableHead>
                        <TableHead>Compliance</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { element: 'Meta Titles', compliance: 92, issues: 8, priority: 'High' },
                        { element: 'Meta Descriptions', compliance: 78, issues: 22, priority: 'High' },
                        { element: 'ALT Tags', compliance: 65, issues: 35, priority: 'Medium' },
                        { element: 'Keywords', compliance: 88, issues: 12, priority: 'Medium' },
                        { element: 'Rich Schema', compliance: 45, issues: 55, priority: 'Low' },
                        { element: 'Canonical URLs', compliance: 92, issues: 8, priority: 'Low' }
                      ].map((item) => (
                        <TableRow key={item.element}>
                          <TableCell className="font-medium">{item.element}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={item.compliance} className="w-24" />
                              <span>{item.compliance}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{item.issues} products</TableCell>
                          <TableCell>
                            <Badge variant={getPriorityBadgeVariant(item.priority)}>
                              {item.priority}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick SEO Fixes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-robot mr-2"></i>
                      Generate Missing Meta Descriptions
                    </Button>
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-key mr-2"></i>
                      Optimize Keywords
                    </Button>
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-image mr-2"></i>
                      Add ALT Text to Images
                    </Button>
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-sitemap mr-2"></i>
                      Generate Rich Schema
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h4 className="font-semibold mb-2">SEO Guidelines</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
                        Meta title: 50-60 characters
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
                        Meta description: 150-160 characters
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-times text-red-500 mr-2 mt-0.5"></i>
                        No duplicate titles
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
                        Include primary keyword
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>AI Content Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Current Title</Label>
                      <Input value="Blue T-Shirt" className="mt-1" readOnly />
                    </div>
                    
                    <div>
                      <Label>AI Optimized Title</Label>
                      <Input value="Premium Blue Cotton T-Shirt for Men | Soft & Comfortable | Summer Wear" className="mt-1" />
                    </div>
                    
                    <div>
                      <Label>Keywords Added</Label>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline">blue t-shirt</Badge>
                        <Badge variant="outline">cotton t-shirt</Badge>
                        <Badge variant="outline">men's clothing</Badge>
                        <Badge variant="outline">summer wear</Badge>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <i className="fas fa-magic mr-2"></i>
                      Apply to 15 Similar Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Duplicate Content Detection</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <i className="fas fa-copy mr-2"></i>
            <AlertTitle>Duplicate Titles Found</AlertTitle>
            <AlertDescription>
              8 products have identical or near-identical titles
            </AlertDescription>
          </Alert>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Duplicate Group</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Similarity Score</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { group: 'Premium T-Shirt Variations', products: 4, similarity: 92 },
                { group: 'Blue Jeans Collection', products: 3, similarity: 88 },
                { group: 'Winter Jackets', products: 2, similarity: 95 }
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.group}</TableCell>
                  <TableCell>{item.products} products</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.similarity} className="w-24" />
                      <span>{item.similarity}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <i className="fas fa-ellipsis-v"></i>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <i className="fas fa-edit mr-2"></i>
                          Rewrite Titles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <i className="fas fa-robot mr-2"></i>
                          AI Generate Unique
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <i className="fas fa-trash-alt mr-2"></i>
                          Mark for Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderDuplicateDetection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="fas fa-copy mr-2"></i>
            Duplicate & Similar Product Detection
          </CardTitle>
          <CardDescription>AI-powered detection of duplicate and similar products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Duplicate Clusters</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-center">
                    <div className="text-3xl font-bold text-red-600">8</div>
                    <p className="text-sm text-muted-foreground">Clusters found</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Similar Products</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-center">
                    <div className="text-3xl font-bold text-orange-600">23</div>
                    <p className="text-sm text-muted-foreground">Potential duplicates</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Duplicate Product Clusters</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {[1, 2, 3].map((cluster) => (
                      <AccordionItem key={cluster} value={`cluster-${cluster}`}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive">Cluster #{cluster}</Badge>
                            <span>T-Shirt Variations ({cluster * 2} products)</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div className="flex gap-4">
                              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center">
                                <i className="fas fa-tshirt"></i>
                              </div>
                              <div>
                                <h4 className="font-semibold">Premium Cotton T-Shirt</h4>
                                <p className="text-sm text-muted-foreground">SKU: TSHIRT-BLK-M, TSHIRT-BLACK-MED</p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant="outline">Similarity: 94%</Badge>
                                  <Badge variant="outline">Visual Match: 89%</Badge>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Merge Suggestions</Label>
                                <div className="mt-2 space-y-2">
                                  <div className="flex items-center">
                                    <Checkbox id={`merge-${cluster}`} />
                                    <label htmlFor={`merge-${cluster}`} className="ml-2 text-sm">
                                      Merge as variants
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <Checkbox id={`delete-${cluster}`} />
                                    <label htmlFor={`delete-${cluster}`} className="ml-2 text-sm">
                                      Delete duplicate
                                    </label>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <Label>Conflicting Attributes</Label>
                                <div className="mt-2 text-sm">
                                  <p>• Price: $29.99 vs $31.99</p>
                                  <p>• Color: Black vs Charcoal</p>
                                  <p>• Inventory: 150 vs 120</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm">
                                <i className="fas fa-compress-alt mr-2"></i>
                                Merge Products
                              </Button>
                              <Button size="sm" variant="outline">
                                <i className="fas fa-edit mr-2"></i>
                                Edit Separately
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Detection Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Similarity Threshold</Label>
                      <Slider 
                        defaultValue={[85]}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>70% (Loose)</span>
                        <span>85% (Default)</span>
                        <span>95% (Strict)</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Check Visual Similarity</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Check Title Similarity</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Check Attribute Overlap</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-merge Variants</span>
                        <Switch />
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <i className="fas fa-search mr-2"></i>
                      Run Detection Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Variant Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      <AlertTitle>Variant Issues</AlertTitle>
                      <AlertDescription>
                        12 products may need variant grouping
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Missing variant images</span>
                        <Badge variant="destructive">8</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Inconsistent attributes</span>
                        <Badge variant="default">15</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Duplicate variants</span>
                        <Badge variant="destructive">5</Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-cogs mr-2"></i>
                      Fix Variant Issues
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderComplianceChecker = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Checker</CardTitle>
          <CardDescription>Ensures catalog follows industry and marketplace guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="marketplace">
            <TabsList>
              <TabsTrigger value="marketplace">Marketplace Rules</TabsTrigger>
              <TabsTrigger value="brand">Brand Guidelines</TabsTrigger>
              <TabsTrigger value="legal">Legal Compliance</TabsTrigger>
              <TabsTrigger value="violations">Violations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="marketplace" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Amazon', score: 92, issues: 8 },
                  { name: 'Shopify', score: 88, issues: 12 },
                  { name: 'Flipkart', score: 85, issues: 15 },
                  { name: 'Magento', score: 95, issues: 5 }
                ].map((marketplace) => (
                  <Card key={marketplace.name}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">{marketplace.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="text-2xl font-bold">{marketplace.score}%</div>
                      <Progress value={marketplace.score} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {marketplace.issues} compliance issues
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Marketplace Specific Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Marketplace</TableHead>
                        <TableHead>Requirement</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Non-compliant Products</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { marketplace: 'Amazon', requirement: 'Minimum 5 images', status: 'Compliant', count: 0 },
                        { marketplace: 'Amazon', requirement: 'GTIN/UPC required', status: 'Non-compliant', count: 15 },
                        { marketplace: 'Shopify', requirement: 'SEO meta tags', status: 'Partial', count: 8 },
                        { marketplace: 'Flipkart', requirement: 'Video content', status: 'Non-compliant', count: 23 },
                        { marketplace: 'Magento', requirement: 'Rich snippets', status: 'Compliant', count: 0 }
                      ].map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.marketplace}</TableCell>
                          <TableCell>{item.requirement}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.count} products</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="brand" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Photography Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Required Specifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">White background only</span>
                          <Badge variant="secondary">95%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Minimum 2000px width</span>
                          <Badge variant="default">78%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">No watermarks or logos</span>
                          <Badge variant="secondary">99%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Consistent lighting</span>
                          <Badge variant="destructive">65%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Model diversity required</span>
                          <Badge variant="default">72%</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Naming Conventions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          <span className="text-sm">BrandName_ProductName_Color_Size.jpg</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-times text-red-500 mr-2"></i>
                          <span className="text-sm">No spaces in filenames</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          <span className="text-sm">Use hyphens not underscores</span>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <i className="fas fa-file-export mr-2"></i>
                        Download Brand Guidelines
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="legal">
              <Card>
                <CardHeader>
                  <CardTitle>Legal & Health Claims Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive" className="mb-4">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    <AlertTitle>Restricted Keywords Found</AlertTitle>
                    <AlertDescription>
                      7 products contain prohibited health claims
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Prohibited Claims</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          'cures diseases',
                          'medical grade',
                          'FDA approved',
                          'doctor recommended',
                          '100% safe',
                          'no side effects',
                          'instant results',
                          'miracle'
                        ].map((claim) => (
                          <div key={claim} className="flex items-center">
                            <i className="fas fa-ban text-red-500 mr-2"></i>
                            <span className="text-sm">{claim}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-2">Required Disclaimers</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
                          <span className="text-sm">Results may vary disclaimer</span>
                        </div>
                        <div className="flex items-start">
                          <i className="fas fa-times-circle text-red-500 mr-2 mt-0.5"></i>
                          <span className="text-sm">Consult physician warning</span>
                        </div>
                        <div className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
                          <span className="text-sm">Not for medical use statement</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button>
                      <i className="fas fa-gavel mr-2"></i>
                      Generate Compliance Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="violations">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Violations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Violation Type</TableHead>
                        <TableHead>Marketplace</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { sku: 'TSHIRT-BLK-M', violation: 'Missing GTIN', marketplace: 'Amazon', severity: 'High' },
                        { sku: 'JEANS-BLUE-32', violation: 'Insufficient images', marketplace: 'Flipkart', severity: 'Medium' },
                        { sku: 'SHOES-RUN-10', violation: 'Prohibited claim', marketplace: 'All', severity: 'Critical' },
                        { sku: 'WATCH-GOLD', violation: 'Incorrect category', marketplace: 'Shopify', severity: 'Low' },
                        { sku: 'BAG-LTHR-BLK', violation: 'Missing video', marketplace: 'Amazon', severity: 'Medium' }
                      ].map((violation, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{violation.sku}</TableCell>
                          <TableCell>{violation.violation}</TableCell>
                          <TableCell>{violation.marketplace}</TableCell>
                          <TableCell>
                            <Badge variant={getPriorityBadgeVariant(violation.severity)}>
                              {violation.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <i className="fas fa-wrench mr-2"></i>
                              Fix
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  const renderRuleEngine = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rule-Based Validation Engine</CardTitle>
          <CardDescription>Configure custom validation rules for your catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rule Name</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Violations</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: 'Title Format', condition: 'Must contain color + size', violations: 23, status: 'Active' },
                        { name: 'Image Count', condition: 'Minimum 3 images required', violations: 45, status: 'Active' },
                        { name: 'Description Length', condition: '70+ words required', violations: 18, status: 'Active' },
                        { name: 'Price Format', condition: 'Must be in USD', violations: 2, status: 'Inactive' },
                        { name: 'SEO Meta', condition: 'Meta description 150-160 chars', violations: 32, status: 'Active' }
                      ].map((rule, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{rule.name}</TableCell>
                          <TableCell>{rule.condition}</TableCell>
                          <TableCell>
                            <Badge variant={
                              rule.violations > 30 ? 'destructive' :
                              rule.violations > 10 ? 'default' : 'outline'
                            }>
                              {rule.violations}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={rule.status === 'Active' ? 'secondary' : 'outline'}>
                              {rule.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <i className="fas fa-ellipsis-v"></i>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <i className="fas fa-edit mr-2"></i>
                                  Edit Rule
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <i className="fas fa-toggle-on mr-2"></i>
                                  Toggle Status
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <i className="fas fa-trash-alt mr-2"></i>
                                  Delete Rule
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Rule Violations Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { rule: 'Title Format', violations: 23, autoFixed: 15 },
                      { rule: 'Image Count', violations: 45, autoFixed: 12 },
                      { rule: 'Description Length', violations: 18, autoFixed: 8 },
                      { rule: 'Price Format', violations: 2, autoFixed: 2 },
                      { rule: 'SEO Meta', violations: 32, autoFixed: 20 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="rule" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="violations" name="Total Violations" fill="#f97316" />
                      <Bar dataKey="autoFixed" name="Auto-fixed" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Rule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Rule Name</Label>
                      <Input placeholder="e.g., Title must contain brand" />
                    </div>
                    
                    <div>
                      <Label>Field to Validate</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="title">Product Title</SelectItem>
                          <SelectItem value="description">Description</SelectItem>
                          <SelectItem value="price">Price</SelectItem>
                          <SelectItem value="images">Images</SelectItem>
                          <SelectItem value="attributes">Attributes</SelectItem>
                          <SelectItem value="seo">SEO Metadata</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contains">Must contain</SelectItem>
                          <SelectItem value="not-contain">Must not contain</SelectItem>
                          <SelectItem value="min-length">Minimum length</SelectItem>
                          <SelectItem value="max-length">Maximum length</SelectItem>
                          <SelectItem value="required">Required field</SelectItem>
                          <SelectItem value="format">Specific format</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Value/Pattern</Label>
                      <Input placeholder="e.g., ^[A-Z].*$" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="auto-fix" />
                        <label htmlFor="auto-fix" className="ml-2 text-sm">
                          Enable auto-fix for this rule
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="notify" />
                        <label htmlFor="notify" className="ml-2 text-sm">
                          Send notifications for violations
                        </label>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <i className="fas fa-plus mr-2"></i>
                      Create Rule
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Auto-Fix Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable auto-fix globally</span>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold">Auto-fix Options</h4>
                      <div className="flex items-center">
                        <Checkbox id="fix-titles" defaultChecked />
                        <label htmlFor="fix-titles" className="ml-2 text-sm">
                          Auto-generate missing titles
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="fix-descriptions" />
                        <label htmlFor="fix-descriptions" className="ml-2 text-sm">
                          Auto-write descriptions
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="fix-images" />
                        <label htmlFor="fix-images" className="ml-2 text-sm">
                          Auto-enhance images
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="fix-seo" defaultChecked />
                        <label htmlFor="fix-seo" className="ml-2 text-sm">
                          Auto-optimize SEO
                        </label>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-play mr-2"></i>
                      Run Auto-fix Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTrendAnalysis = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trend Analysis & Insights</CardTitle>
          <CardDescription>Catalog quality improvement over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Quality Score Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="qualityScore" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="completeness" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Issues Resolution Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="issues" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="fixedIssues" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Categories with Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dashboardMetrics.categoryDistribution.slice().sort((a, b) => b.issuesCount - a.issuesCount)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="issuesCount" fill="#f97316" />
                    <Bar dataKey="highPriorityIssues" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Improving Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dashboardMetrics.categoryDistribution.slice().sort((a, b) => b.avgQualityScore - a.avgQualityScore)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgQualityScore" fill="#10b981" />
                    <Bar dataKey="completeness" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Detailed Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="images">
                <TabsList>
                  <TabsTrigger value="images">Image Issues</TabsTrigger>
                  <TabsTrigger value="attributes">Attribute Issues</TabsTrigger>
                  <TabsTrigger value="seo">SEO Trends</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="images">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="qualityScore" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="attributes">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Most common attribute issues:</span>
                      <Badge variant="default">Missing color variations</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Improving attributes:</span>
                      <Badge variant="secondary">SEO metadata</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Worsening attributes:</span>
                      <Badge variant="destructive">Technical specs</Badge>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="seo">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="qualityScore" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="compliance">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Compliance rate improvement:</span>
                      <Badge variant="secondary">+12% this month</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Most common violations:</span>
                      <Badge variant="destructive">Missing GTIN</Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  const renderPriorityScoring = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Priority Scoring System</CardTitle>
          <CardDescription>Ranks issues based on business impact and urgency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Priority Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-red-50 border-red-200">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm text-red-700">High Priority</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-red-700">{dashboardMetrics.issuesByPriority.high}</div>
                        <p className="text-xs text-red-600 mt-1">Hurting conversions</p>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center text-sm">
                            <i className="fas fa-shopping-cart text-red-500 mr-2"></i>
                            <span>Missing product images</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <i className="fas fa-tags text-red-500 mr-2"></i>
                            <span>Incorrect pricing</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <i className="fas fa-ban text-red-500 mr-2"></i>
                            <span>Compliance violations</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm text-yellow-700">Medium Priority</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-yellow-700">{dashboardMetrics.issuesByPriority.medium}</div>
                        <p className="text-xs text-yellow-600 mt-1">Affecting SEO & discovery</p>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center text-sm">
                            <i className="fas fa-search text-yellow-500 mr-2"></i>
                            <span>Poor SEO metadata</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <i className="fas fa-tag text-yellow-500 mr-2"></i>
                            <span>Missing attributes</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <i className="fas fa-image text-yellow-500 mr-2"></i>
                            <span>Low quality images</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm text-green-700">Low Priority</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-green-700">{dashboardMetrics.issuesByPriority.low}</div>
                        <p className="text-xs text-green-600 mt-1">Minor inconsistencies</p>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center text-sm">
                            <i className="fas fa-palette text-green-500 mr-2"></i>
                            <span>Color naming variations</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <i className="fas fa-ruler text-green-500 mr-2"></i>
                            <span>Size format differences</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <i className="fas fa-font text-green-500 mr-2"></i>
                            <span>Formatting inconsistencies</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Priority-Based Issue List</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Priority</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Estimated Fix Time</TableHead>
                        <TableHead>Business Impact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { priority: 'High', issue: 'Missing GTIN codes', impact: 'Blocked from marketplaces', time: '15 min', business: 'Revenue loss' },
                        { priority: 'High', issue: 'No product images', impact: 'Zero conversion rate', time: '30 min', business: 'Lost sales' },
                        { priority: 'Medium', issue: 'Poor SEO titles', impact: 'Low search visibility', time: '45 min', business: 'Reduced traffic' },
                        { priority: 'Medium', issue: 'Missing descriptions', impact: 'Poor user experience', time: '60 min', business: 'Higher bounce rate' },
                        { priority: 'Low', issue: 'Color name variations', impact: 'Minor inconsistency', time: '20 min', business: 'Brand consistency' }
                      ].map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge variant={getPriorityBadgeVariant(item.priority)}>
                              {item.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{item.issue}</TableCell>
                          <TableCell>{item.impact}</TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell>{item.business}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Priority Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Priority Calculation Algorithm</Label>
                      <Select defaultValue="business-impact">
                        <SelectTrigger>
                          <SelectValue placeholder="Select algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business-impact">Business Impact Based</SelectItem>
                          <SelectItem value="conversion-impact">Conversion Impact Based</SelectItem>
                          <SelectItem value="seo-impact">SEO Impact Based</SelectItem>
                          <SelectItem value="custom">Custom Weights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Impact Weights</h4>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-sm">Conversion Impact</Label>
                          <Slider defaultValue={[80]} max={100} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">SEO Impact</Label>
                          <Slider defaultValue={[60]} max={100} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Compliance Impact</Label>
                          <Slider defaultValue={[90]} max={100} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">User Experience Impact</Label>
                          <Slider defaultValue={[70]} max={100} className="mt-1" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold">Automation</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-prioritize new issues</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Send high-priority alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-schedule high priority fixes</span>
                        <Switch />
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <i className="fas fa-save mr-2"></i>
                      Save Priority Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-fire mr-2"></i>
                      View All High Priority Issues
                    </Button>
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-bolt mr-2"></i>
                      Fix Top 10 High Priority
                    </Button>
                    <Button className="w-full" variant="outline">
                      <i className="fas fa-chart-line mr-2"></i>
                      Generate Priority Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Add these modules to your CatalogueQualityChecker.tsx file

const renderAITaggingModule = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>
          <i className="fas fa-brain mr-2"></i>
          AI Tagging & Categorization
        </CardTitle>
        <CardDescription>AI-powered automatic tagging, categorization and attribute generation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Tagging Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Auto-tagged Products</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <p className="text-xs text-muted-foreground">Products tagged</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Accuracy Score</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <Progress value={92} className="mt-2" />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Untagged Products</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="text-2xl font-bold text-orange-600">34</div>
                      <p className="text-xs text-muted-foreground">Need attention</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Categories Generated</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="text-2xl font-bold text-purple-600">23</div>
                      <p className="text-xs text-muted-foreground">Auto-categorized</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Tag Confidence Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                          { confidence: 'High (>90%)', count: 85 },
                          { confidence: 'Medium (70-90%)', count: 45 },
                          { confidence: 'Low (<70%)', count: 12 },
                          { confidence: 'Needs Review', count: 8 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="confidence" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Tag Types Generated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Product Type', value: 35 },
                              { name: 'Style', value: 28 },
                              { name: 'Material', value: 18 },
                              { name: 'Season', value: 12 },
                              { name: 'Occasion', value: 7 }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name}: ${entry.value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#8884d8" />
                            <Cell fill="#82ca9d" />
                            <Cell fill="#ffc658" />
                            <Cell fill="#ff8042" />
                            <Cell fill="#0088fe" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>AI Tagging Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="product">
                  <TabsList>
                    <TabsTrigger value="product">Product Tags</TabsTrigger>
                    <TabsTrigger value="category">Categories</TabsTrigger>
                    <TabsTrigger value="attributes">Attributes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="product" className="space-y-4">
                    <div className="space-y-4">
                      {products.slice(0, 3).map((product) => (
                        <Card key={product.id}>
                          <CardHeader className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-sm">{product.sku}</CardTitle>
                                <p className="text-xs text-muted-foreground">{product.name}</p>
                              </div>
                              <Badge variant="secondary">AI Suggestions</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="space-y-3">
                              <div>
                                <Label>Current Tags</Label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {product.attributes.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="outline">{tag}</Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <Label>AI Suggested Tags</Label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  <Badge variant="default">premium</Badge>
                                  <Badge variant="default">essential</Badge>
                                  <Badge variant="default">everyday-wear</Badge>
                                  <Badge variant="default">comfort</Badge>
                                  <Badge variant="default">versatile</Badge>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button size="sm">
                                  <i className="fas fa-check mr-2"></i>
                                  Accept All
                                </Button>
                                <Button size="sm" variant="outline">
                                  <i className="fas fa-edit mr-2"></i>
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Button className="w-full">
                      <i className="fas fa-robot mr-2"></i>
                      Generate Tags for All Untagged Products
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="category">
                    <div className="space-y-4">
                      <Alert>
                        <i className="fas fa-sitemap mr-2"></i>
                        <AlertTitle>Category Suggestions</AlertTitle>
                        <AlertDescription>
                          AI can suggest better category placements for 15 products
                        </AlertDescription>
                      </Alert>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Current Category</TableHead>
                            <TableHead>Suggested Category</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { sku: 'TSHIRT-BLK-M', current: 'Apparel → T-Shirts', suggested: 'Apparel → Basics → T-Shirts', confidence: 94 },
                            { sku: 'JEANS-BLUE-32', current: 'Apparel → Bottoms', suggested: 'Apparel → Denim → Jeans', confidence: 88 },
                            { sku: 'SHOES-RUN-10', current: 'Footwear', suggested: 'Footwear → Athletic → Running', confidence: 92 },
                            { sku: 'WATCH-GOLD', current: 'Accessories', suggested: 'Accessories → Watches → Luxury', confidence: 85 }
                          ].map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.sku}</TableCell>
                              <TableCell>{item.current}</TableCell>
                              <TableCell>{item.suggested}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress value={item.confidence} className="w-24" />
                                  <span>{item.confidence}%</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">
                                  <i className="fas fa-check mr-2"></i>
                                  Apply
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="attributes">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Attribute Generation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <Label>Product Description</Label>
                              <Textarea 
                                defaultValue="Premium cotton t-shirt with crew neck and short sleeves"
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label>AI Generated Attributes</Label>
                              <div className="space-y-2 mt-2 p-3 border rounded">
                                <div className="flex justify-between">
                                  <span className="text-sm">Material:</span>
                                  <Badge variant="outline">100% Cotton</Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Fit:</span>
                                  <Badge variant="outline">Regular</Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Neck:</span>
                                  <Badge variant="outline">Crew Neck</Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Sleeve:</span>
                                  <Badge variant="outline">Short Sleeve</Badge>
                                </div>
                              </div>
                            </div>
                            
                            <Button className="w-full">
                              <i className="fas fa-magic mr-2"></i>
                              Generate Attributes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Bulk Attribute Generation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Select Products for Bulk Update</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product group" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="untagged">All Untagged Products</SelectItem>
                                  <SelectItem value="category">By Category</SelectItem>
                                  <SelectItem value="missing">Products Missing Attributes</SelectItem>
                                  <SelectItem value="all">All Products</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Attributes to Generate</Label>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Checkbox id="material" defaultChecked />
                                  <label htmlFor="material" className="ml-2 text-sm">Material Composition</label>
                                </div>
                                <div className="flex items-center">
                                  <Checkbox id="care" defaultChecked />
                                  <label htmlFor="care" className="ml-2 text-sm">Care Instructions</label>
                                </div>
                                <div className="flex items-center">
                                  <Checkbox id="season" />
                                  <label htmlFor="season" className="ml-2 text-sm">Seasonality</label>
                                </div>
                                <div className="flex items-center">
                                  <Checkbox id="style" />
                                  <label htmlFor="style" className="ml-2 text-sm">Style Tags</label>
                                </div>
                              </div>
                            </div>
                            
                            <Button className="w-full">
                              <i className="fas fa-bolt mr-2"></i>
                              Generate Bulk Attributes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>AI Tagging Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>AI Model</Label>
                    <Select defaultValue="gpt-4">
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (Most Accurate)</SelectItem>
                        <SelectItem value="gpt-3.5">GPT-3.5 (Fast)</SelectItem>
                        <SelectItem value="claude">Claude (Balanced)</SelectItem>
                        <SelectItem value="custom">Custom Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Tag Generation Options</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-generate missing tags</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-categorize products</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Generate SEO keywords</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-translate tags</span>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Tagging Rules</h4>
                    <div>
                      <Label className="text-sm">Minimum tag confidence</Label>
                      <Slider defaultValue={[80]} max={100} step={5} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Maximum tags per product</Label>
                      <Slider defaultValue={[10]} max={20} step={1} className="mt-1" />
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <i className="fas fa-save mr-2"></i>
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Tag Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Most Common Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="default">casual</Badge>
                      <Badge variant="default">cotton</Badge>
                      <Badge variant="default">summer</Badge>
                      <Badge variant="default">basic</Badge>
                      <Badge variant="default">comfort</Badge>
                      <Badge variant="default">everyday</Badge>
                      <Badge variant="default">modern</Badge>
                      <Badge variant="default">versatile</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Tag Coverage</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Products with tags:</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Average tags per product:</span>
                        <span>5.2</span>
                      </div>
                      <Progress value={52} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Unique tags in catalog:</span>
                        <span>156</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <i className="fas fa-chart-pie mr-2"></i>
                    View Tag Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Tagging Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Search Lift</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-green-600">+45%</div>
              <p className="text-xs text-muted-foreground">With AI tags vs without</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Category Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <p className="text-xs text-muted-foreground">AI vs manual categorization</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Time Saved</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-purple-600">12.5 hrs</div>
              <p className="text-xs text-muted-foreground">Per week with auto-tagging</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Conversion Impact</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-green-600">+18%</div>
              <p className="text-xs text-muted-foreground">Well-tagged products</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);

const renderFindabilityScoreModule = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>
          <i className="fas fa-binoculars mr-2"></i>
          Findability Score
        </CardTitle>
        <CardDescription>Measures how easily customers can find your products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Overall Findability</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-3xl font-bold text-blue-600">78/100</div>
                  <Progress value={78} className="mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Internal Search</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-green-600">85</div>
                  <p className="text-xs text-muted-foreground">Score</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">SEO Visibility</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-orange-600">72</div>
                  <p className="text-xs text-muted-foreground">Score</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-red-600">65</div>
                  <p className="text-xs text-muted-foreground">Score</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Findability Score Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-search text-blue-500"></i>
                        <span className="font-medium">Search Optimization</span>
                      </div>
                      <Badge variant="secondary">85/100</Badge>
                    </div>
                    <Progress value={85} />
                    <div className="text-sm text-muted-foreground">
                      Keywords, titles, descriptions, search relevance
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-sitemap text-green-500"></i>
                        <span className="font-medium">Navigation & Structure</span>
                      </div>
                      <Badge variant="default">65/100</Badge>
                    </div>
                    <Progress value={65} />
                    <div className="text-sm text-muted-foreground">
                      Category placement, breadcrumbs, filters
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-chart-line text-purple-500"></i>
                        <span className="font-medium">SEO Performance</span>
                      </div>
                      <Badge variant="default">72/100</Badge>
                    </div>
                    <Progress value={72} />
                    <div className="text-sm text-muted-foreground">
                      Meta tags, URL structure, site speed
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-tags text-orange-500"></i>
                        <span className="font-medium">Tagging & Attributes</span>
                      </div>
                      <Badge variant="secondary">82/100</Badge>
                    </div>
                    <Progress value={82} />
                    <div className="text-sm text-muted-foreground">
                      Product attributes, filters, faceted search
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-link text-red-500"></i>
                        <span className="font-medium">Internal Linking</span>
                      </div>
                      <Badge variant="destructive">58/100</Badge>
                    </div>
                    <Progress value={58} />
                    <div className="text-sm text-muted-foreground">
                      Cross-linking, related products, recommendations
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Findability Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Jan', findability: 68, search: 72, seo: 65 },
                    { month: 'Feb', findability: 71, search: 75, seo: 68 },
                    { month: 'Mar', findability: 73, search: 78, seo: 70 },
                    { month: 'Apr', findability: 76, search: 80, seo: 73 },
                    { month: 'May', findability: 78, search: 85, seo: 72 },
                    { month: 'Jun', findability: 78, search: 85, seo: 72 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="findability" stroke="#3b82f6" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="search" stroke="#10b981" />
                    <Line type="monotone" dataKey="seo" stroke="#f59e0b" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert variant="destructive">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    <AlertTitle>Priority Issues</AlertTitle>
                    <AlertDescription>
                      Fix these to improve findability quickly
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">Missing Internal Links</p>
                        <p className="text-xs text-muted-foreground">23 products</p>
                      </div>
                      <Button size="sm">
                        <i className="fas fa-wrench mr-2"></i>
                        Fix
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">Poor Category Placement</p>
                        <p className="text-xs text-muted-foreground">15 products</p>
                      </div>
                      <Button size="sm">
                        <i className="fas fa-wrench mr-2"></i>
                        Fix
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">Weak Search Keywords</p>
                        <p className="text-xs text-muted-foreground">42 products</p>
                      </div>
                      <Button size="sm">
                        <i className="fas fa-wrench mr-2"></i>
                        Fix
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">Missing Attributes</p>
                        <p className="text-xs text-muted-foreground">18 products</p>
                      </div>
                      <Button size="sm">
                        <i className="fas fa-wrench mr-2"></i>
                        Fix
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <i className="fas fa-bolt mr-2"></i>
                    Apply All Quick Fixes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Findability Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Top Performing Categories</h4>
                    <div className="space-y-2">
                      {[
                        { category: 'Electronics', score: 92 },
                        { category: 'Home Appliances', score: 88 },
                        { category: 'Books', score: 85 },
                        { category: 'Beauty', score: 82 }
                      ].map((item) => (
                        <div key={item.category} className="flex items-center justify-between">
                          <span className="text-sm">{item.category}</span>
                          <Badge variant="secondary">{item.score}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Needs Improvement</h4>
                    <div className="space-y-2">
                      {[
                        { category: 'Furniture', score: 62 },
                        { category: 'Clothing', score: 65 },
                        { category: 'Sports', score: 68 }
                      ].map((item) => (
                        <div key={item.category} className="flex items-center justify-between">
                          <span className="text-sm">{item.category}</span>
                          <Badge variant="destructive">{item.score}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <i className="fas fa-download mr-2"></i>
                    Download Findability Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Products with Low Findability Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Findability Score</TableHead>
              <TableHead>Primary Issue</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { sku: 'FURN-SOFA-GRY', score: 45, issue: 'Poor SEO & No keywords', impact: 'High' },
              { sku: 'CLOTH-DRESS-RED', score: 52, issue: 'Wrong category', impact: 'High' },
              { sku: 'SPORT-BALL-BSK', score: 58, issue: 'Missing attributes', impact: 'Medium' },
              { sku: 'TOYS-ROBO-BLU', score: 62, issue: 'Weak description', impact: 'Medium' },
              { sku: 'KITCH-KNIFE-SET', score: 65, issue: 'No internal links', impact: 'Low' }
            ].map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.sku}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.score} className="w-24" />
                    <span>{item.score}</span>
                  </div>
                </TableCell>
                <TableCell>{item.issue}</TableCell>
                <TableCell>
                  <Badge variant={getPriorityBadgeVariant(item.impact)}>
                    {item.impact}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <i className="fas fa-ellipsis-v"></i>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <i className="fas fa-edit mr-2"></i>
                        Optimize SEO
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <i className="fas fa-sitemap mr-2"></i>
                        Fix Category
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <i className="fas fa-tags mr-2"></i>
                        Add Attributes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <i className="fas fa-robot mr-2"></i>
                        AI Optimize
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

const renderRecommendationReadinessModule = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>
          <i className="fas fa-lightbulb mr-2"></i>
          Recommendation Readiness
        </CardTitle>
        <CardDescription>Ensures products are optimized for recommendation engines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Recommendation Score</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-3xl font-bold text-blue-600">82/100</div>
                  <Progress value={82} className="mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Ready for AI Recs</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <p className="text-xs text-muted-foreground">Products ready</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Needs Optimization</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-orange-600">34</div>
                  <p className="text-xs text-muted-foreground">Products</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">CTR Improvement</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-purple-600">+32%</div>
                  <p className="text-xs text-muted-foreground">Optimized products</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Engine Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Content-Based Filtering</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rich product descriptions</span>
                        <Badge variant="secondary">85% ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Complete attributes</span>
                        <Badge variant="secondary">78% ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">High-quality images</span>
                        <Badge variant="destructive">62% ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Semantic tags</span>
                        <Badge variant="default">45% ready</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Collaborative Filtering</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Purchase history data</span>
                        <Badge variant="secondary">92% ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">User behavior tracking</span>
                        <Badge variant="secondary">88% ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rating & review data</span>
                        <Badge variant="destructive">58% ready</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">User segmentation</span>
                        <Badge variant="default">72% ready</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>AI Recommendation Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content">
                  <TabsList>
                    <TabsTrigger value="content">Content Optimization</TabsTrigger>
                    <TabsTrigger value="similarity">Similarity Analysis</TabsTrigger>
                    <TabsTrigger value="personalization">Personalization</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4">
                    <Alert>
                      <i className="fas fa-robot mr-2"></i>
                      <AlertTitle>AI Content Enhancement</AlertTitle>
                      <AlertDescription>
                        AI can optimize 45 products for better recommendations
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Description Enhancement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <Label>Current Description</Label>
                              <Textarea 
                                defaultValue="Blue cotton t-shirt"
                                className="mt-1 h-20"
                                readOnly
                              />
                            </div>
                            
                            <div>
                              <Label>AI Enhanced Description</Label>
                              <Textarea 
                                defaultValue="Premium navy blue 100% cotton crew neck t-shirt with soft jersey knit fabric. Perfect for casual wear, layering, or everyday comfort. Features a regular fit, short sleeves, and reinforced seams for durability. Ideal for summer outfits, weekend casual looks, or as a versatile wardrobe basic."
                                className="mt-1 h-32"
                              />
                            </div>
                            
                            <Button size="sm">
                              <i className="fas fa-check mr-2"></i>
                              Apply Enhancement
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Semantic Tag Generation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <Label>AI Generated Semantic Tags</Label>
                              <div className="flex flex-wrap gap-1 mt-2">
                                <Badge variant="default">casual-wear</Badge>
                                <Badge variant="default">summer-essential</Badge>
                                <Badge variant="default">cotton-blend</Badge>
                                <Badge variant="default">everyday-basic</Badge>
                                <Badge variant="default">crew-neck</Badge>
                                <Badge variant="default">versatile</Badge>
                                <Badge variant="default">breathable</Badge>
                                <Badge variant="default">comfort-fit</Badge>
                              </div>
                            </div>
                            
                            <div>
                              <Label>Recommendation Contexts</Label>
                              <div className="space-y-2 mt-2">
                                <div className="flex items-center">
                                  <Checkbox id="workwear" />
                                  <label htmlFor="workwear" className="ml-2 text-sm">Workwear combinations</label>
                                </div>
                                <div className="flex items-center">
                                  <Checkbox id="casual" defaultChecked />
                                  <label htmlFor="casual" className="ml-2 text-sm">Casual outfits</label>
                                </div>
                                <div className="flex items-center">
                                  <Checkbox id="layering" defaultChecked />
                                  <label htmlFor="layering" className="ml-2 text-sm">Layering pieces</label>
                                </div>
                                <div className="flex items-center">
                                  <Checkbox id="seasonal" />
                                  <label htmlFor="seasonal" className="ml-2 text-sm">Seasonal collections</label>
                                </div>
                              </div>
                            </div>
                            
                            <Button size="sm" className="w-full">
                              <i className="fas fa-save mr-2"></i>
                              Save Tags & Contexts
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="similarity">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Visual Similarity</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Color similarity:</span>
                                <Badge variant="secondary">85%</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Style similarity:</span>
                                <Badge variant="secondary">78%</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Pattern matching:</span>
                                <Badge variant="destructive">45%</Badge>
                              </div>
                              <Button size="sm" className="w-full mt-2">
                                <i className="fas fa-sync-alt mr-2"></i>
                                Recalculate Similarity
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Attribute Similarity</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Material match:</span>
                                <Badge variant="secondary">92%</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Price range:</span>
                                <Badge variant="secondary">88%</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Usage context:</span>
                                <Badge variant="default">65%</Badge>
                              </div>
                              <Button size="sm" className="w-full mt-2">
                                <i className="fas fa-cogs mr-2"></i>
                                Optimize Attributes
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Alert variant="destructive">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        <AlertTitle>Similarity Gap Detected</AlertTitle>
                        <AlertDescription>
                          12 products have poor similarity scores for recommendations
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="personalization">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Personalization Factors</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Checkbox id="demographics" defaultChecked />
                              <label htmlFor="demographics" className="ml-2 text-sm">Demographic data</label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="behavior" defaultChecked />
                              <label htmlFor="behavior" className="ml-2 text-sm">User behavior</label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="preferences" />
                              <label htmlFor="preferences" className="ml-2 text-sm">Explicit preferences</label>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Checkbox id="context" defaultChecked />
                              <label htmlFor="context" className="ml-2 text-sm">Contextual data</label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="seasonal" defaultChecked />
                              <label htmlFor="seasonal" className="ml-2 text-sm">Seasonal trends</label>
                            </div>
                            <div className="flex items-center">
                              <Checkbox id="location" />
                              <label htmlFor="location" className="ml-2 text-sm">Location data</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <i className="fas fa-user-cog mr-2"></i>
                        Configure Personalization Engine
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Current Performance</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Click-through Rate (CTR):</span>
                        <span className="font-medium">3.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Conversion Rate:</span>
                        <span className="font-medium">1.8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Order Value (AOV):</span>
                        <span className="font-medium">$85.50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue Lift:</span>
                        <span className="font-medium text-green-600">+28%</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Optimization Targets</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Target CTR:</span>
                        <span className="font-medium">4.5%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target Conversion:</span>
                        <span className="font-medium">2.5%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target AOV:</span>
                        <span className="font-medium">$95.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Quick Actions</h4>
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-chart-line mr-2"></i>
                      View Performance Report
                    </Button>
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-bolt mr-2"></i>
                      Run A/B Tests
                    </Button>
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-sliders-h mr-2"></i>
                      Tune Algorithms
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recommendation Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">Frequently Bought Together</p>
                      <p className="text-xs text-muted-foreground">Ready: 92%</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">Customers Also Viewed</p>
                      <p className="text-xs text-muted-foreground">Ready: 85%</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">Similar Products</p>
                      <p className="text-xs text-muted-foreground">Ready: 78%</p>
                    </div>
                    <Badge variant="default">Needs Work</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">Personalized Recommendations</p>
                      <p className="text-xs text-muted-foreground">Ready: 65%</p>
                    </div>
                    <Badge variant="destructive">Limited</Badge>
                  </div>
                  
                  <Button className="w-full">
                    <i className="fas fa-play mr-2"></i>
                    Activate All Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Products Ready for Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-green-700">Fully Optimized</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-green-700">156</div>
              <p className="text-xs text-green-600 mt-1">Ready for all recommendation types</p>
              <div className="mt-2">
                <Button size="sm" variant="outline" className="w-full border-green-300 text-green-700">
                  <i className="fas fa-check mr-2"></i>
                  View Products
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-yellow-700">Partially Ready</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-yellow-700">45</div>
              <p className="text-xs text-yellow-600 mt-1">Need minor optimizations</p>
              <div className="mt-2">
                <Button size="sm" variant="outline" className="w-full border-yellow-300 text-yellow-700">
                  <i className="fas fa-wrench mr-2"></i>
                  Optimize Now
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="p-4">
              <CardTitle className="text-sm text-red-700">Not Ready</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-red-700">23</div>
              <p className="text-xs text-red-600 mt-1">Major optimizations needed</p>
              <div className="mt-2">
                <Button size="sm" variant="outline" className="w-full border-red-300 text-red-700">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Fix Priority
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);

const renderConversionReadinessModule = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>
          <i className="fas fa-shopping-cart mr-2"></i>
          Conversion Readiness
        </CardTitle>
        <CardDescription>Ensures products are optimized for maximum conversion rates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Conversion Score</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-3xl font-bold text-blue-600">76/100</div>
                  <Progress value={76} className="mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Estimated Lift</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-green-600">+42%</div>
                  <p className="text-xs text-muted-foreground">Potential improvement</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">High Priority</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-red-600">28</div>
                  <p className="text-xs text-muted-foreground">Products</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Revenue Impact</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-purple-600">$25K</div>
                  <p className="text-xs text-muted-foreground">Monthly potential</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-2">
                    <div className="text-center">
                      <div className="h-10 bg-blue-100 rounded-t-lg flex items-center justify-center">
                        <span className="text-sm font-medium">Impressions</span>
                      </div>
                      <div className="h-12 bg-blue-50 rounded-b-lg flex items-center justify-center">
                        <span className="text-xl font-bold">100%</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-10 bg-green-100 rounded-t-lg flex items-center justify-center">
                        <span className="text-sm font-medium">Clicks</span>
                      </div>
                      <div className="h-10 bg-green-50 rounded-b-lg flex items-center justify-center">
                        <span className="text-xl font-bold">3.2%</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">-96.8%</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-10 bg-yellow-100 rounded-t-lg flex items-center justify-center">
                        <span className="text-sm font-medium">Add to Cart</span>
                      </div>
                      <div className="h-8 bg-yellow-50 rounded-b-lg flex items-center justify-center">
                        <span className="text-xl font-bold">1.8%</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">-43.8%</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-10 bg-orange-100 rounded-t-lg flex items-center justify-center">
                        <span className="text-sm font-medium">Checkout</span>
                      </div>
                      <div className="h-6 bg-orange-50 rounded-b-lg flex items-center justify-center">
                        <span className="text-xl font-bold">1.2%</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">-33.3%</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-10 bg-red-100 rounded-t-lg flex items-center justify-center">
                        <span className="text-sm font-medium">Purchase</span>
                      </div>
                      <div className="h-4 bg-red-50 rounded-b-lg flex items-center justify-center">
                        <span className="text-xl font-bold">0.8%</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">-33.3%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Optimization Opportunities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Click-through Rate</span>
                          <Badge variant="destructive">Low</Badge>
                        </div>
                        <Progress value={32} />
                        <p className="text-xs text-muted-foreground">
                          Improve product titles, images, and pricing
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Cart Abandonment</span>
                          <Badge variant="destructive">High</Badge>
                        </div>
                        <Progress value={67} />
                        <p className="text-xs text-muted-foreground">
                          Add trust signals, simplify checkout
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Conversion Drivers Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="visual">
                  <TabsList>
                    <TabsTrigger value="visual">Visual Elements</TabsTrigger>
                    <TabsTrigger value="content">Content & Trust</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing & Value</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="visual" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Image Impact Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Image quality score:</span>
                              <Badge variant="secondary">78/100</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Number of images:</span>
                              <Badge variant="destructive">2.3 avg</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Model shots available:</span>
                              <Badge variant="destructive">45%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">360° views:</span>
                              <Badge variant="destructive">12%</Badge>
                            </div>
                            <Button className="w-full">
                              <i className="fas fa-image mr-2"></i>
                              Optimize Product Images
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Video Content Impact</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Products with video:</span>
                              <Badge variant="destructive">18%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">CTR improvement:</span>
                              <Badge variant="secondary">+85%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Conversion lift:</span>
                              <Badge variant="secondary">+72%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Return rate reduction:</span>
                              <Badge variant="secondary">-35%</Badge>
                            </div>
                            <Button className="w-full">
                              <i className="fas fa-video mr-2"></i>
                              Add Product Videos
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="content" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Content Quality</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Description length:</span>
                              <Badge variant="default">45 words avg</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Bulleted features:</span>
                              <Badge variant="destructive">62% missing</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Benefit-oriented:</span>
                              <Badge variant="destructive">38%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Mobile-optimized:</span>
                              <Badge variant="secondary">85%</Badge>
                            </div>
                            <Button className="w-full">
                              <i className="fas fa-edit mr-2"></i>
                              Optimize Product Content
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Trust Signals</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Customer reviews:</span>
                              <Badge variant="destructive">58% missing</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Trust badges:</span>
                              <Badge variant="destructive">72% missing</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Social proof:</span>
                              <Badge variant="destructive">65% missing</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Guarantees/warranty:</span>
                              <Badge variant="destructive">45% missing</Badge>
                            </div>
                            <Button className="w-full">
                              <i className="fas fa-shield-alt mr-2"></i>
                              Add Trust Elements
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Pricing Strategy</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Competitive pricing:</span>
                              <Badge variant="secondary">78% optimal</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Discount visibility:</span>
                              <Badge variant="destructive">42% missing</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Value perception:</span>
                              <Badge variant="default">65/100</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Payment options:</span>
                              <Badge variant="secondary">4 options avg</Badge>
                            </div>
                            <Button className="w-full">
                              <i className="fas fa-tag mr-2"></i>
                              Optimize Pricing
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Shipping & Returns</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Free shipping:</span>
                              <Badge variant="destructive">35% missing</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Clear return policy:</span>
                              <Badge variant="destructive">58% missing</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Delivery estimates:</span>
                              <Badge variant="destructive">42% missing</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Stock availability:</span>
                              <Badge variant="secondary">92% accurate</Badge>
                            </div>
                            <Button className="w-full">
                              <i className="fas fa-truck mr-2"></i>
                              Improve Shipping Info
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Conversion Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Visual Appeal</span>
                      <span className="font-medium">68/100</span>
                    </div>
                    <Progress value={68} />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Content Quality</span>
                      <span className="font-medium">72/100</span>
                    </div>
                    <Progress value={72} />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Trust & Credibility</span>
                      <span className="font-medium">58/100</span>
                    </div>
                    <Progress value={58} />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Value Proposition</span>
                      <span className="font-medium">65/100</span>
                    </div>
                    <Progress value={65} />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Urgency & Scarcity</span>
                      <span className="font-medium">45/100</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Quick Wins</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <i className="fas fa-bolt mr-2"></i>
                        Add Trust Badges
                      </Button>
                      <Button variant="outline" className="w-full">
                        <i className="fas fa-bolt mr-2"></i>
                        Optimize Pricing Display
                      </Button>
                      <Button variant="outline" className="w-full">
                        <i className="fas fa-bolt mr-2"></i>
                        Add Clear CTAs
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>AI Conversion Optimizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable AI Optimization</span>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Optimization Areas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="pricing-ai" defaultChecked />
                        <label htmlFor="pricing-ai" className="ml-2 text-sm">Dynamic pricing</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="content-ai" defaultChecked />
                        <label htmlFor="content-ai" className="ml-2 text-sm">Content optimization</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="image-ai" />
                        <label htmlFor="image-ai" className="ml-2 text-sm">Image enhancement</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="cta-ai" defaultChecked />
                        <label htmlFor="cta-ai" className="ml-2 text-sm">CTA optimization</label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Performance Targets</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Target conversion rate:</span>
                        <span className="font-medium">2.5%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target AOV:</span>
                        <span className="font-medium">$95.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target revenue lift:</span>
                        <span className="font-medium text-green-600">+35%</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <i className="fas fa-play mr-2"></i>
                    Run AI Optimization
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>High-Impact Conversion Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert variant="destructive">
            <i className="fas fa-fire mr-2"></i>
            <AlertTitle>Critical Issues Found</AlertTitle>
            <AlertDescription>
              28 products have severe conversion blockers
            </AlertDescription>
          </Alert>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Impact Score</TableHead>
                <TableHead>Revenue Loss</TableHead>
                <TableHead>Fix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { sku: 'TSHIRT-BLK-M', issue: 'No product images', impact: 95, loss: '$1,200/mo' },
                { sku: 'JEANS-BLUE-32', issue: 'Missing sizing chart', impact: 88, loss: '$850/mo' },
                { sku: 'SHOES-RUN-10', issue: 'No customer reviews', impact: 82, loss: '$720/mo' },
                { sku: 'WATCH-GOLD', issue: 'Poor product description', impact: 78, loss: '$650/mo' },
                { sku: 'BAG-LTHR-BLK', issue: 'Unclear shipping info', impact: 72, loss: '$580/mo' }
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.sku}</TableCell>
                  <TableCell>{item.issue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.impact} className="w-24" />
                      <span>{item.impact}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-red-600 font-medium">{item.loss}</TableCell>
                  <TableCell>
                    <Button size="sm">
                      <i className="fas fa-wrench mr-2"></i>
                      Fix Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-end">
            <Button>
              <i className="fas fa-file-export mr-2"></i>
              Export Conversion Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Update the modules array in the CatalogueQualityChecker component to include these new modules:
// Replace the existing modules array with this updated version:

const modules = useMemo(() => [
  { id: 'overview', name: 'Dashboard Overview', icon: 'fas fa-tachometer-alt', render: renderDashboardOverview },
  { id: 'completeness', name: 'Product Completeness', icon: 'fas fa-clipboard-check', render: renderProductCompletenessChecker },
  { id: 'attributes', name: 'Attribute Validation', icon: 'fas fa-tags', render: renderAttributeValidation },
  { id: 'images', name: 'Image Quality', icon: 'fas fa-camera', render: renderImageQualityChecker },
  { id: 'media', name: 'Media Completeness', icon: 'fas fa-photo-video', render: renderMediaCompletenessChecker },
  { id: 'tagging', name: 'AI Tagging', icon: 'fas fa-brain', render: renderAITaggingModule },
  { id: 'duplicates', name: 'Duplicate Detection', icon: 'fas fa-copy', render: renderDuplicateDetection },
  { id: 'seo', name: 'SEO Checker', icon: 'fas fa-search', render: renderSEOChecker },
  { id: 'searchability', name: 'Findability Score', icon: 'fas fa-binoculars', render: renderFindabilityScoreModule },
  { id: 'recommendations', name: 'Recommendation Readiness', icon: 'fas fa-lightbulb', render: renderRecommendationReadinessModule },
  { id: 'conversion', name: 'Conversion Readiness', icon: 'fas fa-shopping-cart', render: renderConversionReadinessModule },
  { id: 'compliance', name: 'Compliance Checker', icon: 'fas fa-gavel', render: renderComplianceChecker },
  { id: 'rules', name: 'Rule Engine', icon: 'fas fa-cogs', render: renderRuleEngine },
  { id: 'trends', name: 'Trend Analysis', icon: 'fas fa-chart-line', render: renderTrendAnalysis },
  { id: 'priority', name: 'Priority Scoring', icon: 'fas fa-flag', render: renderPriorityScoring },
  { id: 'marketplace', name: 'Marketplace Sync', icon: 'fas fa-store', render: () => <div>Marketplace Sync Module</div> },
  { id: 'variants', name: 'Variant Optimization', icon: 'fas fa-layer-group', render: () => <div>Variant Optimization Module</div> },
  { id: 'style', name: 'Style Analysis', icon: 'fas fa-palette', render: () => <div>Style Analysis Module</div> },
  { id: 'export', name: 'Export Reports', icon: 'fas fa-file-export', render: () => <div>Export Reports Module</div> },
], []);

  

  // SIDEBAR COMPONENT
  const renderSidebar = () => (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'} hidden lg:block`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <i className="fas fa-clipboard-check text-xl text-blue-600"></i>
                <span className="font-bold">Quality Checker</span>
              </div>
            )}
            {!sidebarOpen && (
              <div className="mx-auto">
                <i className="fas fa-clipboard-check text-xl text-blue-600"></i>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex"
            >
              <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-gray-500`}></i>
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-1">
            {modules.map((module) => (
              <Button
                key={module.id}
                variant={activeTab === module.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${sidebarOpen ? 'px-4' : 'px-2'} transition-all`}
                onClick={() => setActiveTab(module.id)}
              >
                <i className={`${module.icon} ${sidebarOpen ? 'mr-3' : 'mx-auto'} text-lg`}></i>
                {sidebarOpen && <span className="truncate">{module.name}</span>}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className={`space-y-2 ${sidebarOpen ? '' : 'flex flex-col items-center'}`}>
            <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
              <span className={`text-sm ${sidebarOpen ? '' : 'hidden'}`}>Auto-Fix</span>
              <Switch checked={autoFixEnabled} onCheckedChange={setAutoFixEnabled} />
            </div>
            {sidebarOpen && (
              <Button className="w-full" onClick={applyBulkFix}>
                <i className="fas fa-bolt mr-2"></i>
                Apply Auto-Fixes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // MOBILE MENU
  const renderMobileMenu = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
          <i className="fas fa-bars"></i>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-2">
              <i className="fas fa-clipboard-check text-2xl text-blue-600"></i>
              <span className="font-bold text-lg">Quality Checker</span>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1">
              {modules.map((module) => (
                <Button
                  key={module.id}
                  variant={activeTab === module.id ? "secondary" : "ghost"}
                  className="w-full justify-start px-4"
                  onClick={() => {
                    setActiveTab(module.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <i className={`${module.icon} mr-3`}></i>
                  {module.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );

  // MAIN CONTENT
  const renderMainContent = () => {
    const activeModule = modules.find(m => m.id === activeTab);
    
    return (
      <div className={`min-h-screen bg-gray-50 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeModule?.name || 'Catalog Quality Dashboard'}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {activeModule?.id === 'overview' 
                    ? 'Monitor and improve your product catalog quality' 
                    : `Analyze and optimize ${activeModule?.name.toLowerCase()}`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{dashboardMetrics.catalogQualityScore}</div>
                    <div className="text-xs text-gray-500">Quality Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{dashboardMetrics.issuesByPriority.high}</div>
                    <div className="text-xs text-gray-500">High Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{aiRecommendations.filter(r => r.autoApply).length}</div>
                    <div className="text-xs text-gray-500">Auto-Fixes</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <i className="fas fa-robot mr-2"></i>
                        AI Assistant
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>AI Auto-Fix Assistant</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Enable Auto-Fix</span>
                          <Switch checked={autoFixEnabled} onCheckedChange={setAutoFixEnabled} />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <h4 className="font-semibold">Available Fixes</h4>
                          {aiRecommendations
                            .filter(r => r.autoApply)
                            .map(rec => (
                              <div key={rec.id} className="flex items-center justify-between p-2 border rounded">
                                <span className="text-sm">{rec.title}</span>
                                <Button size="sm" onClick={() => applyAutoFix(rec.id)}>
                                  Apply
                                </Button>
                              </div>
                            ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={applyBulkFix} disabled={!autoFixEnabled}>
                          <i className="fas fa-bolt mr-2"></i>
                          Apply All Auto-Fixes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <i className="fas fa-download mr-2"></i>
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleExport('csv')}>
                        <i className="fas fa-file-csv mr-2"></i>
                        Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport('excel')}>
                        <i className="fas fa-file-excel mr-2"></i>
                        Export as Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport('pdf')}>
                        <i className="fas fa-file-pdf mr-2"></i>
                        Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                <p className="text-lg">Loading dashboard...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {realTimeAlerts.length > 0 && (
                <Alert variant="destructive" className="animate-pulse">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  <AlertTitle>Real-time Alert</AlertTitle>
                  <AlertDescription>
                    {realTimeAlerts[0].title} - {realTimeAlerts[0].description}
                  </AlertDescription>
                </Alert>
              )}

              {activeModule ? activeModule.render() : renderDashboardOverview()}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="relative min-h-screen bg-gray-50">
      {renderMobileMenu()}
      {renderSidebar()}
      {renderMainContent()}
      
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setMobileMenuOpen(true)}
        >
          <i className="fas fa-bars"></i>
        </Button>
      </div>
    </div>
  );
};

export default CatalogueQualityChecker;