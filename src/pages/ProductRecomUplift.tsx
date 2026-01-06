// ProductRecomUplift.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Treemap,
  Sankey,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import {
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Eye,
  Target,
  Zap,
  Brain,
  BarChart3,
  PieChart as PieChartIcon,
  Filter,
  Download,
  RefreshCw,
  Settings,
  ChevronRight,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  User,
  Star,
  Award,
  Crown,
  Shield,
  Lock,
  Unlock,
  Rocket,
  Sparkles,
  LineChart as LineChartIcon,
  BarChart4,
  Gauge,
  Calculator,
  ClipboardList,
  ChartBar,
  ChartLine,
  ChartPie,
  ChartArea,
  ChartScatter,
  ChartCandlestick,
  ChartNoAxesColumn,
  Activity,
  Target as TargetIcon,
  Percent,
  Timer,
  Layers,
  Package,
  Tag,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Info,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Save,
  Share2,
  Bell,
  BellOff,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Database,
  Cpu,
  Cloud,
  Server,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
} from 'lucide-react';
import { format } from 'date-fns';
import * as d3 from 'd3';

// ============ TYPES AND INTERFACES ============

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  cost: number;
  margin: number;
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  tags: string[];
  attributes: Record<string, any>;
  images: string[];
  seoScore: number;
  popularity: number;
  conversionRate: number;
  avgRating: number;
  reviewCount: number;
  returnRate: number;
  seasonality: number;
  trendScore: number;
  competitiveIndex: number;
  cannibalizationRisk: number;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  avgLTV: number;
  avgOrderValue: number;
  purchaseFrequency: number;
  retentionRate: number;
  churnRisk: number;
  persona: string[];
  preferences: string[];
  behaviorPatterns: string[];
  deviceUsage: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  geoDistribution: Record<string, number>;
  valueTier: 'high' | 'medium' | 'low';
}

interface RecommendationStrategy {
  id: string;
  name: string;
  type: 'similar_items' | 'frequently_bought' | 'personalized' | 'trending' | 'bundles' | 'upsell' | 'cross_sell';
  description: string;
  algorithm: string;
  weight: number;
  performance: {
    ctr: number;
    cvr: number;
    aovUplift: number;
    gmvUplift: number;
  };
  complexity: 'low' | 'medium' | 'high';
  implementationCost: number;
  roi: number;
  cannibalizationRisk: number;
}

interface UpliftPrediction {
  id: string;
  productId: string;
  segmentId: string;
  strategyId: string;
  baselineMetrics: {
    ctr: number;
    cvr: number;
    aov: number;
    gmv: number;
    clv: number;
  };
  predictedUplift: {
    ctr: number; // percentage uplift
    cvr: number;
    aov: number;
    gmv: number;
    clv: number;
    total: number; // weighted total uplift
  };
  confidence: number;
  factors: Array<{
    factor: string;
    impact: number;
    explanation: string;
  }>;
  timeframe: 'immediate' | '7d' | '30d' | '90d' | 'annual';
  seasonalityAdjustment: number;
  competitiveIndex: number;
  cannibalizationRisk: number;
}

interface FunnelStage {
  stage: string;
  visitors: number;
  conversions: number;
  dropOff: number;
  upliftPotential: number;
  recommendations: RecommendationStrategy[];
  estimatedUplift: number;
}

interface RevenueImpact {
  baselineRevenue: number;
  predictedRevenue: number;
  upliftRevenue: number;
  roi: number;
  paybackPeriod: number; // in days
  costBenefitRatio: number;
  monthlyProjection: Array<{
    month: string;
    baseline: number;
    predicted: number;
    uplift: number;
    cumulative: number;
  }>;
}

interface ElasticityModel {
  productId: string;
  priceElasticity: number;
  demandCurve: Array<{
    price: number;
    demand: number;
  }>;
  optimalPrice: number;
  revenueAtOptimal: number;
  recommendationImpact: number;
}

interface PersonalizationDepth {
  userId: string;
  depthScore: number;
  identityBased: number;
  behaviorBased: number;
  preferenceBased: number;
  contextBased: number;
  recommendationRelevance: number;
  upliftMultiplier: number;
}

interface ColdStartPrediction {
  productId: string;
  type: 'new_product' | 'new_user' | 'low_data';
  similarityScore: number;
  attributeEmbedding: number[];
  predictedUplift: number;
  confidence: number;
  closestMatches: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface CompetitiveBenchmark {
  metric: string;
  yourValue: number;
  industryAvg: number;
  top10Percentile: number;
  bottom10Percentile: number;
  competitorData: Array<{
    name: string;
    value: number;
  }>;
}

interface MultiObjectiveOptimization {
  objectives: Array<{
    name: string;
    weight: number;
    currentValue: number;
    targetValue: number;
    upliftImpact: number;
  }>;
  optimalStrategy: string;
  tradeOffs: Array<{
    objective1: string;
    objective2: string;
    correlation: number;
    conflict: boolean;
  }>;
  paretoFront: Array<{
    revenue: number;
    margin: number;
    satisfaction: number;
    strategy: string;
  }>;
}

interface RealTimeSignal {
  timestamp: Date;
  userId: string;
  signalType: 'scroll' | 'dwell' | 'click' | 'hover' | 'add_to_cart' | 'remove_from_cart' | 'wishlist' | 'share';
  intensity: number;
  intentScore: number;
  upliftAdjustment: number;
  recommendationAdjustment: number;
}

interface AttributionModel {
  model: 'first_click' | 'last_click' | 'linear' | 'time_decay' | 'position_based';
  touchpoints: Array<{
    touchpoint: string;
    contribution: number;
    upliftAttribution: number;
  }>;
  totalUplift: number;
  assistedConversions: number;
}

interface FraudDetection {
  sessionId: string;
  riskScore: number;
  botProbability: number;
  fraudIndicators: string[];
  upliftAdjustment: number;
  filteredUplift: number;
}

// ============ UPLIFT SCORING ENGINE ============

const calculateUpliftScore = (
  product: Product,
  segment: CustomerSegment,
  strategy: RecommendationStrategy,
  signals: RealTimeSignal[] = []
): UpliftPrediction => {
  // Base uplift calculation
  const baseCTR = 2.5 + (product.popularity * 0.1);
  const baseCVR = 1.2 + (product.conversionRate * 0.05);
  const baseAOV = 15 + (product.price * 0.2);
  const baseGMV = baseAOV * baseCVR;
  const baseCLV = segment.avgLTV * 0.3;

  // Strategy multipliers
  const strategyMultipliers = {
    similar_items: { ctr: 1.2, cvr: 1.15, aov: 1.1, gmv: 1.18, clv: 1.05 },
    frequently_bought: { ctr: 1.3, cvr: 1.25, aov: 1.2, gmv: 1.28, clv: 1.1 },
    personalized: { ctr: 1.5, cvr: 1.4, aov: 1.3, gmv: 1.45, clv: 1.2 },
    trending: { ctr: 1.4, cvr: 1.2, aov: 1.15, gmv: 1.25, clv: 1.08 },
    bundles: { ctr: 1.25, cvr: 1.35, aov: 1.5, gmv: 1.55, clv: 1.15 },
    upsell: { ctr: 1.15, cvr: 1.3, aov: 1.8, gmv: 1.65, clv: 1.18 },
    cross_sell: { ctr: 1.2, cvr: 1.25, aov: 1.25, gmv: 1.3, clv: 1.12 }
  };

  const multiplier = strategyMultipliers[strategy.type] || strategyMultipliers.personalized;

  // Segment adjustments
  const segmentMultiplier = {
    high: 1.3,
    medium: 1.0,
    low: 0.7
  }[segment.valueTier];

  // Product factors
  const productScore = (product.trendScore * 0.3 + product.popularity * 0.2 + 
                       (1 - product.cannibalizationRisk) * 0.2 + 
                       (1 - product.returnRate) * 0.1 + 
                       product.seoScore * 0.1 + 
                       product.avgRating * 0.1);

  // Real-time signal adjustments
  const signalBoost = signals.reduce((acc, signal) => {
    return acc + (signal.intensity * signal.upliftAdjustment * 0.01);
  }, 1);

  // Calculate uplifts
  const ctrUplift = (baseCTR * multiplier.ctr * segmentMultiplier * productScore * signalBoost) - baseCTR;
  const cvrUplift = (baseCVR * multiplier.cvr * segmentMultiplier * productScore * signalBoost) - baseCVR;
  const aovUplift = (baseAOV * multiplier.aov * segmentMultiplier * productScore * signalBoost) - baseAOV;
  const gmvUplift = (baseGMV * multiplier.gmv * segmentMultiplier * productScore * signalBoost) - baseGMV;
  const clvUplift = (baseCLV * multiplier.clv * segmentMultiplier * productScore * signalBoost) - baseCLV;

  // Confidence calculation
  const confidence = Math.min(0.95, 
    0.3 + (productScore * 0.3) + 
    (segment.size > 1000 ? 0.2 : segment.size > 100 ? 0.1 : 0) +
    (strategy.performance.ctr > 3 ? 0.15 : 0) +
    (signals.length > 0 ? 0.1 : 0)
  );

  return {
    id: `${product.id}-${segment.id}-${strategy.id}`,
    productId: product.id,
    segmentId: segment.id,
    strategyId: strategy.id,
    baselineMetrics: {
      ctr: baseCTR,
      cvr: baseCVR,
      aov: baseAOV,
      gmv: baseGMV,
      clv: baseCLV
    },
    predictedUplift: {
      ctr: ctrUplift,
      cvr: cvrUplift,
      aov: aovUplift,
      gmv: gmvUplift,
      clv: clvUplift,
      total: (ctrUplift * 0.2 + cvrUplift * 0.3 + aovUplift * 0.25 + gmvUplift * 0.15 + clvUplift * 0.1)
    },
    confidence,
    factors: [
      { factor: 'Product Popularity', impact: product.popularity * 0.3, explanation: 'High product popularity increases recommendation effectiveness' },
      { factor: 'Segment Value Tier', impact: segmentMultiplier, explanation: `${segment.valueTier} value customers respond better to recommendations` },
      { factor: 'Strategy Type', impact: Object.values(multiplier).reduce((a, b) => a + b) / 5, explanation: `${strategy.type} has proven effectiveness` },
      { factor: 'Real-time Signals', impact: signalBoost, explanation: `${signals.length} real-time signals detected` },
      { factor: 'Product Quality Score', impact: productScore, explanation: 'Based on ratings, SEO, and trend data' }
    ],
    timeframe: '30d',
    seasonalityAdjustment: product.seasonality,
    competitiveIndex: product.competitiveIndex,
    cannibalizationRisk: product.cannibalizationRisk
  };
};

// ============ MAIN COMPONENT ============

const ProductRecomUplift: React.FC = () => {
  // ============ STATE HOOKS ============
  const [viewMode, setViewMode] = useState<'overview' | 'segment' | 'product' | 'strategy' | 'simulation' | 'advanced'>('overview');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedStrategy, setSelectedStrategy] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'annual'>('30d');
  const [simulationMode, setSimulationMode] = useState<boolean>(false);
  const [simulationParams, setSimulationParams] = useState({
    budget: 100000,
    timeline: 90,
    riskTolerance: 0.5,
    objectives: ['revenue', 'margin', 'customer_satisfaction']
  });
  
  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [strategies, setStrategies] = useState<RecommendationStrategy[]>([]);
  const [upliftPredictions, setUpliftPredictions] = useState<UpliftPrediction[]>([]);
  const [funnelStages, setFunnelStages] = useState<FunnelStage[]>([]);
  const [revenueImpact, setRevenueImpact] = useState<RevenueImpact | null>(null);
  const [elasticityModels, setElasticityModels] = useState<ElasticityModel[]>([]);
  const [personalizationDepth, setPersonalizationDepth] = useState<PersonalizationDepth[]>([]);
  const [coldStartPredictions, setColdStartPredictions] = useState<ColdStartPrediction[]>([]);
  const [competitiveBenchmarks, setCompetitiveBenchmarks] = useState<CompetitiveBenchmark[]>([]);
  const [multiObjectiveOpt, setMultiObjectiveOpt] = useState<MultiObjectiveOptimization | null>(null);
  const [realTimeSignals, setRealTimeSignals] = useState<RealTimeSignal[]>([]);
  const [attributionModels, setAttributionModels] = useState<AttributionModel[]>([]);
  const [fraudDetections, setFraudDetections] = useState<FraudDetection[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  // ============ GENERATE MOCK DATA ============
  
  const generateMockData = useCallback(() => {
    setIsLoading(true);
    
    // Generate Products
    const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
      id: `PROD${String(i + 1).padStart(4, '0')}`,
      sku: `SKU-${['ELEC', 'APP', 'HOME', 'BEAU', 'SPRT'][i % 5]}-${String(i + 1000)}`,
      name: `Product ${i + 1} - ${['Smartphone', 'T-Shirt', 'Coffee Maker', 'Skincare Set', 'Yoga Mat'][i % 5]}`,
      category: ['Electronics', 'Apparel', 'Home', 'Beauty', 'Sports'][i % 5],
      subcategory: ['Mobile', 'Casual', 'Kitchen', 'Skincare', 'Fitness'][i % 5],
      brand: ['Apple', 'Nike', 'Nespresso', 'L\'Oreal', 'Nike'][i % 5],
      price: 99 + Math.random() * 900,
      cost: 50 + Math.random() * 400,
      margin: 0.2 + Math.random() * 0.4,
      stock: Math.floor(Math.random() * 1000),
      stockStatus: Math.random() > 0.8 ? 'out_of_stock' : Math.random() > 0.6 ? 'low_stock' : 'in_stock',
      tags: ['featured', 'new', 'trending', 'best-seller'].slice(0, Math.floor(Math.random() * 4)),
      attributes: {
        color: ['Black', 'White', 'Blue', 'Red'][Math.floor(Math.random() * 4)],
        size: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)],
        material: ['Cotton', 'Polyester', 'Metal', 'Glass'][Math.floor(Math.random() * 4)]
      },
      images: Array.from({ length: 3 }, (_, imgIdx) => 
        `https://picsum.photos/400/300?random=${i}${imgIdx}`
      ),
      seoScore: 0.5 + Math.random() * 0.5,
      popularity: 0.3 + Math.random() * 0.7,
      conversionRate: 0.01 + Math.random() * 0.1,
      avgRating: 3.5 + Math.random() * 1.5,
      reviewCount: Math.floor(Math.random() * 500),
      returnRate: 0.05 + Math.random() * 0.15,
      seasonality: 0.5 + Math.sin(i / 10) * 0.3,
      trendScore: 0.4 + Math.random() * 0.6,
      competitiveIndex: 0.6 + Math.random() * 0.4,
      cannibalizationRisk: 0.1 + Math.random() * 0.3
    }));
    
    // Generate Segments
    const mockSegments: CustomerSegment[] = [
      {
        id: 'seg1',
        name: 'High-Value Loyalists',
        description: 'Frequent purchasers with high LTV',
        size: 12500,
        avgLTV: 1250,
        avgOrderValue: 185,
        purchaseFrequency: 6.2,
        retentionRate: 0.85,
        churnRisk: 0.08,
        persona: ['affluent', 'tech-savvy', 'brand-loyal'],
        preferences: ['premium', 'new-releases', 'exclusive'],
        behaviorPatterns: ['mobile-first', 'quick-decider', 'reviews-reader'],
        deviceUsage: { mobile: 0.65, desktop: 0.3, tablet: 0.05 },
        geoDistribution: { 'US': 0.45, 'UK': 0.2, 'CA': 0.15, 'AU': 0.1, 'DE': 0.1 },
        valueTier: 'high'
      },
      {
        id: 'seg2',
        name: 'Bargain Hunters',
        description: 'Price-sensitive, promotion-driven',
        size: 45000,
        avgLTV: 320,
        avgOrderValue: 45,
        purchaseFrequency: 2.1,
        retentionRate: 0.45,
        churnRisk: 0.35,
        persona: ['value-conscious', 'deal-seeker', 'comparison-shopper'],
        preferences: ['discounts', 'bundles', 'clearance'],
        behaviorPatterns: ['cart-abandoner', 'price-comparer', 'long-session'],
        deviceUsage: { mobile: 0.4, desktop: 0.55, tablet: 0.05 },
        geoDistribution: { 'US': 0.6, 'IN': 0.15, 'BR': 0.1, 'MX': 0.1, 'UK': 0.05 },
        valueTier: 'low'
      },
      {
        id: 'seg3',
        name: 'Middle Market',
        description: 'Balanced value and quality seekers',
        size: 32000,
        avgLTV: 650,
        avgOrderValue: 95,
        purchaseFrequency: 3.8,
        retentionRate: 0.68,
        churnRisk: 0.18,
        persona: ['quality-focused', 'trust-based', 'research-oriented'],
        preferences: ['best-sellers', 'highly-rated', 'trusted-brands'],
        behaviorPatterns: ['research-heavy', 'review-dependent', 'multi-session'],
        deviceUsage: { mobile: 0.5, desktop: 0.45, tablet: 0.05 },
        geoDistribution: { 'US': 0.5, 'UK': 0.2, 'DE': 0.1, 'FR': 0.1, 'CA': 0.1 },
        valueTier: 'medium'
      },
      {
        id: 'seg4',
        name: 'Mobile-First Shoppers',
        description: 'Primarily shop via mobile devices',
        size: 28000,
        avgLTV: 520,
        avgOrderValue: 75,
        purchaseFrequency: 4.5,
        retentionRate: 0.72,
        churnRisk: 0.15,
        persona: ['mobile-native', 'impulse-buyer', 'social-influenced'],
        preferences: ['mobile-optimized', 'quick-checkout', 'social-proof'],
        behaviorPatterns: ['short-session', 'app-user', 'push-notification-responsive'],
        deviceUsage: { mobile: 0.85, desktop: 0.1, tablet: 0.05 },
        geoDistribution: { 'US': 0.4, 'UK': 0.15, 'JP': 0.15, 'KR': 0.1, 'SG': 0.1, 'AU': 0.1 },
        valueTier: 'medium'
      },
      {
        id: 'seg5',
        name: 'New Users',
        description: 'First-time or recent customers',
        size: 15000,
        avgLTV: 280,
        avgOrderValue: 65,
        purchaseFrequency: 1.2,
        retentionRate: 0.3,
        churnRisk: 0.45,
        persona: ['exploring', 'testing', 'uncertain'],
        preferences: ['onboarding', 'introductory-offers', 'social-proof'],
        behaviorPatterns: ['exploratory', 'hesitant', 'support-needing'],
        deviceUsage: { mobile: 0.55, desktop: 0.4, tablet: 0.05 },
        geoDistribution: { 'US': 0.35, 'UK': 0.15, 'CA': 0.1, 'AU': 0.1, 'DE': 0.1, 'FR': 0.1, 'JP': 0.1 },
        valueTier: 'low'
      }
    ];
    
    // Generate Strategies
    const mockStrategies: RecommendationStrategy[] = [
      {
        id: 'strat1',
        name: 'Deep Personalization Engine',
        type: 'personalized',
        description: 'AI-driven recommendations based on individual behavior and preferences',
        algorithm: 'Neural Collaborative Filtering + Transformer',
        weight: 0.35,
        performance: { ctr: 4.8, cvr: 3.2, aovUplift: 28, gmvUplift: 32 },
        complexity: 'high',
        implementationCost: 75000,
        roi: 4.2,
        cannibalizationRisk: 0.15
      },
      {
        id: 'strat2',
        name: 'Frequently Bought Together',
        type: 'frequently_bought',
        description: 'Recommend complementary products based on purchase patterns',
        algorithm: 'Market Basket Analysis (Apriori)',
        weight: 0.25,
        performance: { ctr: 3.5, cvr: 2.8, aovUplift: 22, gmvUplift: 26 },
        complexity: 'medium',
        implementationCost: 25000,
        roi: 5.8,
        cannibalizationRisk: 0.08
      },
      {
        id: 'strat3',
        name: 'Similar Items',
        type: 'similar_items',
        description: 'Show similar products to what user is viewing',
        algorithm: 'Cosine Similarity + Embeddings',
        weight: 0.2,
        performance: { ctr: 3.2, cvr: 2.1, aovUplift: 12, gmvUplift: 18 },
        complexity: 'low',
        implementationCost: 15000,
        roi: 6.5,
        cannibalizationRisk: 0.12
      },
      {
        id: 'strat4',
        name: 'Trending Products',
        type: 'trending',
        description: 'Show what\'s popular right now',
        algorithm: 'Time-series + Velocity Analysis',
        weight: 0.1,
        performance: { ctr: 4.1, cvr: 2.4, aovUplift: 8, gmvUplift: 15 },
        complexity: 'low',
        implementationCost: 12000,
        roi: 7.2,
        cannibalizationRisk: 0.05
      },
      {
        id: 'strat5',
        name: 'Smart Bundles',
        type: 'bundles',
        description: 'Create intelligent product bundles',
        algorithm: 'Clustering + Price Optimization',
        weight: 0.1,
        performance: { ctr: 2.8, cvr: 3.5, aovUplift: 42, gmvUplift: 38 },
        complexity: 'high',
        implementationCost: 45000,
        roi: 3.8,
        cannibalizationRisk: 0.18
      }
    ];
    
    // Generate Uplift Predictions
    const mockUpliftPredictions: UpliftPrediction[] = [];
    mockProducts.slice(0, 20).forEach(product => {
      mockSegments.forEach(segment => {
        mockStrategies.forEach(strategy => {
          const prediction = calculateUpliftScore(product, segment, strategy);
          mockUpliftPredictions.push(prediction);
        });
      });
    });
    
    // Generate Funnel Stages
    const mockFunnelStages: FunnelStage[] = [
      {
        stage: 'Discovery',
        visitors: 100000,
        conversions: 5000,
        dropOff: 95,
        upliftPotential: 35,
        recommendations: mockStrategies.slice(0, 2),
        estimatedUplift: 28
      },
      {
        stage: 'Product View',
        visitors: 5000,
        conversions: 1000,
        dropOff: 80,
        upliftPotential: 42,
        recommendations: mockStrategies.slice(1, 3),
        estimatedUplift: 32
      },
      {
        stage: 'Add to Cart',
        visitors: 1000,
        conversions: 400,
        dropOff: 60,
        upliftPotential: 38,
        recommendations: mockStrategies.slice(2, 4),
        estimatedUplift: 26
      },
      {
        stage: 'Checkout',
        visitors: 400,
        conversions: 320,
        dropOff: 20,
        upliftPotential: 25,
        recommendations: mockStrategies.slice(3, 5),
        estimatedUplift: 18
      },
      {
        stage: 'Purchase',
        visitors: 320,
        conversions: 320,
        dropOff: 0,
        upliftPotential: 15,
        recommendations: mockStrategies.slice(0, 1),
        estimatedUplift: 12
      }
    ];
    
    // Generate Revenue Impact
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(2024, i, 1).toLocaleString('default', { month: 'short' });
      const baseline = 250000 + Math.random() * 50000;
      const uplift = baseline * (0.15 + Math.random() * 0.1);
      return {
        month,
        baseline,
        predicted: baseline + uplift,
        uplift,
        cumulative: 0 // Initialize to 0, will be updated below
      };
    });
    
    // Calculate cumulative values
    monthlyData.forEach((item, i) => {
      item.cumulative = (i > 0 ? monthlyData[i - 1].cumulative : 0) + item.uplift;
    });
    
    const mockRevenueImpact: RevenueImpact = {
      baselineRevenue: monthlyData.reduce((sum, m) => sum + m.baseline, 0),
      predictedRevenue: monthlyData.reduce((sum, m) => sum + m.predicted, 0),
      upliftRevenue: monthlyData.reduce((sum, m) => sum + m.uplift, 0),
      roi: 4.8,
      paybackPeriod: 45,
      costBenefitRatio: 6.2,
      monthlyProjection: monthlyData
    };
    
    // Set all data
    setProducts(mockProducts);
    setSegments(mockSegments);
    setStrategies(mockStrategies);
    setUpliftPredictions(mockUpliftPredictions);
    setFunnelStages(mockFunnelStages);
    setRevenueImpact(mockRevenueImpact);
    
    setIsLoading(false);
  }, []);

  // ============ EFFECT HOOKS ============
  
  useEffect(() => {
    generateMockData();
    
    // Auto-refresh every 30 seconds if enabled
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        generateMockData();
      }, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [generateMockData, autoRefresh]);

  // ============ MEMOIZED CALCULATIONS ============
  
  const filteredPredictions = useMemo(() => {
    let filtered = upliftPredictions;
    
    if (selectedSegment !== 'all') {
      filtered = filtered.filter(p => p.segmentId === selectedSegment);
    }
    
    if (selectedProduct !== 'all') {
      filtered = filtered.filter(p => p.productId === selectedProduct);
    }
    
    if (selectedStrategy !== 'all') {
      filtered = filtered.filter(p => p.strategyId === selectedStrategy);
    }
    
    return filtered;
  }, [upliftPredictions, selectedSegment, selectedProduct, selectedStrategy]);

  const aggregatedUplift = useMemo(() => {
    if (filteredPredictions.length === 0) return null;
    
    const totalUplift = filteredPredictions.reduce((acc, pred) => acc + pred.predictedUplift.total, 0);
    const avgUplift = totalUplift / filteredPredictions.length;
    
    const byMetric = {
      ctr: filteredPredictions.reduce((acc, pred) => acc + pred.predictedUplift.ctr, 0) / filteredPredictions.length,
      cvr: filteredPredictions.reduce((acc, pred) => acc + pred.predictedUplift.cvr, 0) / filteredPredictions.length,
      aov: filteredPredictions.reduce((acc, pred) => acc + pred.predictedUplift.aov, 0) / filteredPredictions.length,
      gmv: filteredPredictions.reduce((acc, pred) => acc + pred.predictedUplift.gmv, 0) / filteredPredictions.length,
      clv: filteredPredictions.reduce((acc, pred) => acc + pred.predictedUplift.clv, 0) / filteredPredictions.length
    };
    
    const confidence = filteredPredictions.reduce((acc, pred) => acc + pred.confidence, 0) / filteredPredictions.length;
    
    return {
      average: avgUplift,
      total: totalUplift,
      byMetric,
      confidence,
      count: filteredPredictions.length
    };
  }, [filteredPredictions]);

  const segmentComparison = useMemo(() => {
    const comparison = segments.map(segment => {
      const segmentPredictions = upliftPredictions.filter(p => p.segmentId === segment.id);
      if (segmentPredictions.length === 0) return null;
      
      const avgUplift = segmentPredictions.reduce((acc, p) => acc + p.predictedUplift.total, 0) / segmentPredictions.length;
      const maxUplift = Math.max(...segmentPredictions.map(p => p.predictedUplift.total));
      const minUplift = Math.min(...segmentPredictions.map(p => p.predictedUplift.total));
      
      return {
        segment: segment.name,
        segmentId: segment.id,
        avgUplift,
        maxUplift,
        minUplift,
        size: segment.size,
        ltv: segment.avgLTV,
        valueTier: segment.valueTier,
        predictionCount: segmentPredictions.length
      };
    }).filter(Boolean);
    
    return comparison.sort((a, b) => b!.avgUplift - a!.avgUplift);
  }, [segments, upliftPredictions]);

  const strategyComparison = useMemo(() => {
    const comparison = strategies.map(strategy => {
      const strategyPredictions = upliftPredictions.filter(p => p.strategyId === strategy.id);
      if (strategyPredictions.length === 0) return null;
      
      const avgUplift = strategyPredictions.reduce((acc, p) => acc + p.predictedUplift.total, 0) / strategyPredictions.length;
      const avgConfidence = strategyPredictions.reduce((acc, p) => acc + p.confidence, 0) / strategyPredictions.length;
      
      return {
        strategy: strategy.name,
        strategyId: strategy.id,
        type: strategy.type,
        avgUplift,
        avgConfidence,
        roi: strategy.roi,
        cost: strategy.implementationCost,
        complexity: strategy.complexity,
        predictionCount: strategyPredictions.length
      };
    }).filter(Boolean);
    
    return comparison.sort((a, b) => b!.avgUplift - a!.avgUplift);
  }, [strategies, upliftPredictions]);

  const topOpportunities = useMemo(() => {
    const opportunities = upliftPredictions
      .sort((a, b) => b.predictedUplift.total * b.confidence - a.predictedUplift.total * a.confidence)
      .slice(0, 10)
      .map(pred => {
        const product = products.find(p => p.id === pred.productId);
        const segment = segments.find(s => s.id === pred.segmentId);
        const strategy = strategies.find(s => s.id === pred.strategyId);
        
        return {
          prediction: pred,
          product,
          segment,
          strategy,
          score: pred.predictedUplift.total * pred.confidence
        };
      });
    
    return opportunities.filter(opp => opp.product && opp.segment && opp.strategy);
  }, [upliftPredictions, products, segments, strategies]);

  // ============ COMPONENT DEFINITIONS ============
  
  const UpliftScoreCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    color = 'blue',
    format = 'percent',
    size = 'default'
  }: {
    title: string;
    value: number;
    change?: number;
    icon: React.ReactNode;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
    format?: 'percent' | 'currency' | 'number';
    size?: 'default' | 'large';
  }) => {
    const colorClasses = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      red: 'bg-red-500 text-white',
      yellow: 'bg-yellow-500 text-white',
      purple: 'bg-purple-500 text-white'
    };
    
    const formatValue = (val: number) => {
      if (format === 'percent') return `${val.toFixed(1)}%`;
      if (format === 'currency') return `$${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      return val.toLocaleString();
    };
    
    return (
      <Card className={`${size === 'large' ? 'col-span-2' : ''}`}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <h3 className={`mt-2 ${size === 'large' ? 'text-4xl' : 'text-3xl'} font-bold`}>
                {formatValue(value)}
              </h3>
              {change !== undefined && (
                <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  <span className="text-sm font-medium">{Math.abs(change).toFixed(1)}%</span>
                  <span className="text-sm text-gray-500 ml-2">vs baseline</span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const UpliftComparisonChart = () => {
    const data = [
      {
        name: 'Baseline',
        ctr: 2.5,
        cvr: 1.8,
        aov: 85,
        gmv: 152,
        clv: 420
      },
      {
        name: 'Rule-Based',
        ctr: 3.2,
        cvr: 2.1,
        aov: 92,
        gmv: 193,
        clv: 480
      },
      {
        name: 'AI-Powered',
        ctr: 4.8,
        cvr: 3.2,
        aov: 109,
        gmv: 349,
        clv: 625
      }
    ];
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Baseline vs AI-Driven Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ctr" fill="#3b82f6" name="CTR (%)" />
              <Bar dataKey="cvr" fill="#10b981" name="CVR (%)" />
              <Bar dataKey="aov" fill="#f59e0b" name="AOV ($)" />
              <Bar dataKey="gmv" fill="#8b5cf6" name="GMV ($)" />
              <Bar dataKey="clv" fill="#ef4444" name="CLV ($)" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">142%</div>
              <div className="text-sm text-blue-600">CTR Improvement</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">78%</div>
              <div className="text-sm text-green-600">Revenue Increase</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">49%</div>
              <div className="text-sm text-purple-600">CLV Growth</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const FunnelUpliftChart = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FunnelChart className="h-5 w-5" />
            Funnel-Stage Uplift Mapping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="visitors"
                  data={funnelStages}
                  nameKey="stage"
                  isAnimationActive
                >
                  <LabelList 
                    position="right" 
                    fill="#000" 
                    stroke="none" 
                    dataKey="stage" 
                  />
                  <LabelList 
                    position="center" 
                    fill="#fff" 
                    stroke="none" 
                    dataKey="upliftPotential" 
                    formatter={(value: number) => `${value}% uplift`}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 space-y-4">
            {funnelStages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">{stage.stage}</h4>
                  <p className="text-sm text-gray-600">{stage.visitors.toLocaleString()} visitors</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">
                    {stage.upliftPotential}% uplift potential
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">Estimated: ${(stage.estimatedUplift * 1000).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const SegmentUpliftMatrix = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Segment-Level Uplift Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segment</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Avg LTV</TableHead>
                  <TableHead>Avg Uplift</TableHead>
                  <TableHead>Max Uplift</TableHead>
                  <TableHead>Best Strategy</TableHead>
                  <TableHead>Revenue Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {segmentComparison.map((segment, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{segment?.segment}</div>
                      <Badge className={`mt-1 ${
                        segment?.valueTier === 'high' ? 'bg-purple-100 text-purple-800' :
                        segment?.valueTier === 'medium' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {segment?.valueTier}
                      </Badge>
                    </TableCell>
                    <TableCell>{segment?.size.toLocaleString()}</TableCell>
                    <TableCell>${segment?.ltv.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-semibold">{segment?.avgUplift.toFixed(1)}%</span>
                        <TrendingUp className="h-4 w-4 text-green-600 ml-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {segment?.maxUplift.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const segmentStrategies = strategies
                          .map(strat => {
                            const stratPredictions = upliftPredictions.filter(
                              p => p.segmentId === segment?.segmentId && p.strategyId === strat.id
                            );
                            const avgUplift = stratPredictions.reduce((acc, p) => acc + p.predictedUplift.total, 0) / stratPredictions.length;
                            return { strat, avgUplift };
                          })
                          .sort((a, b) => b.avgUplift - a.avgUplift);
                        
                        return segmentStrategies[0]?.strat.name || 'N/A';
                      })()}
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-green-700">
                        ${((segment?.avgUplift || 0) * (segment?.ltv || 0) * (segment?.size || 0) / 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const RevenueImpactCalculator = () => {
    if (!revenueImpact) return null;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Revenue Impact Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">
                ${revenueImpact.upliftRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-blue-600">Annual Uplift</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {revenueImpact.roi.toFixed(1)}x
              </div>
              <div className="text-sm text-green-600">ROI</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">
                {revenueImpact.paybackPeriod} days
              </div>
              <div className="text-sm text-yellow-600">Payback Period</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {revenueImpact.costBenefitRatio.toFixed(1)}:1
              </div>
              <div className="text-sm text-purple-600">Cost-Benefit Ratio</div>
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueImpact.monthlyProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                <Area 
                  type="monotone" 
                  dataKey="baseline" 
                  stackId="1" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  name="Baseline"
                />
                <Area 
                  type="monotone" 
                  dataKey="uplift" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  name="Uplift"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  };

  const StrategySimulation = () => {
    const [simulationResults, setSimulationResults] = useState<any>(null);
    
    const runSimulation = () => {
      const results = strategies.map(strategy => {
        const strategyPredictions = upliftPredictions.filter(p => p.strategyId === strategy.id);
        const avgUplift = strategyPredictions.reduce((acc, p) => acc + p.predictedUplift.total, 0) / strategyPredictions.length;
        
        const budget = simulationParams.budget * (strategy.weight || 0.2);
        const expectedRevenue = budget * avgUplift * 10;
        const profit = expectedRevenue - strategy.implementationCost;
        
        return {
          strategy: strategy.name,
          type: strategy.type,
          budget,
          implementationCost: strategy.implementationCost,
          expectedRevenue,
          profit,
          roi: profit / strategy.implementationCost,
          riskAdjustedReturn: profit * (1 - simulationParams.riskTolerance)
        };
      });
      
      setSimulationResults(results);
    };
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5" />
            Recommendation Strategy Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div>
              <Label>Simulation Budget</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider 
                  value={[simulationParams.budget / 1000]} 
                  onValueChange={(val) => setSimulationParams(prev => ({ ...prev, budget: val[0] * 1000 }))}
                  max={500}
                  step={10}
                />
                <span className="font-bold">${(simulationParams.budget / 1000).toFixed(0)}K</span>
              </div>
            </div>
            
            <div>
              <Label>Timeline (days)</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider 
                  value={[simulationParams.timeline]} 
                  onValueChange={(val) => setSimulationParams(prev => ({ ...prev, timeline: val[0] }))}
                  min={30}
                  max={365}
                  step={30}
                />
                <span className="font-bold">{simulationParams.timeline} days</span>
              </div>
            </div>
            
            <div>
              <Label>Risk Tolerance</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider 
                  value={[simulationParams.riskTolerance * 100]} 
                  onValueChange={(val) => setSimulationParams(prev => ({ ...prev, riskTolerance: val[0] / 100 }))}
                  max={100}
                  step={5}
                />
                <span className="font-bold">{(simulationParams.riskTolerance * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
          
          <Button onClick={runSimulation} className="w-full">
            <Rocket className="h-4 w-4 mr-2" />
            Run Simulation
          </Button>
          
          {simulationResults && (
            <div className="mt-6 space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Expected Revenue</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Risk-Adjusted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simulationResults.map((result: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.strategy}</TableCell>
                      <TableCell>${result.implementationCost.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="font-bold text-green-700">
                          ${result.expectedRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={result.roi > 3 ? 'bg-green-100 text-green-800' : result.roi > 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                          {result.roi.toFixed(1)}x
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">
                          ${result.riskAdjustedReturn.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const TopOpportunitiesTable = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Top Uplift Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topOpportunities.map((opportunity, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{opportunity.product?.sku}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {opportunity.segment?.name}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800">
                          {opportunity.strategy?.name}
                        </Badge>
                      </div>
                      <h4 className="font-bold mt-2">{opportunity.product?.name}</h4>
                      <p className="text-sm text-gray-600">{opportunity.product?.category} • {opportunity.product?.brand}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-700">
                        {opportunity.prediction.predictedUplift.total.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Uplift Score</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">
                        Confidence: {(opportunity.prediction.confidence * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-600">CTR</div>
                      <div className="text-lg font-bold">{opportunity.prediction.predictedUplift.ctr.toFixed(1)}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-600">CVR</div>
                      <div className="text-lg font-bold">{opportunity.prediction.predictedUplift.cvr.toFixed(1)}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-600">AOV</div>
                      <div className="text-lg font-bold">${opportunity.prediction.predictedUplift.aov.toFixed(0)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-600">GMV</div>
                      <div className="text-lg font-bold">${opportunity.prediction.predictedUplift.gmv.toFixed(0)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-600">CLV</div>
                      <div className="text-lg font-bold">${opportunity.prediction.predictedUplift.clv.toFixed(0)}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">Key Factors:</div>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.prediction.factors.slice(0, 3).map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50">
                          {factor.factor}: {factor.impact.toFixed(1)}x
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // ============ MAIN RENDER ============
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Loading Uplift Estimator...</h2>
          <p className="text-gray-600 mt-2">Initializing AI models and prediction engine</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Rocket className="h-8 w-8 text-blue-600" />
              Product Recommendation Uplift Estimator
              <Badge className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                AI-Powered
              </Badge>
            </h1>
            <p className="text-gray-600 mt-2">
              Predictive analytics engine estimating uplift from personalized recommendations
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Customer Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                {segments.map(segment => (
                  <SelectItem key={segment.id} value={segment.id}>{segment.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Strategies</SelectItem>
                {strategies.map(strategy => (
                  <SelectItem key={strategy.id} value={strategy.id}>{strategy.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Next 7 Days</SelectItem>
                <SelectItem value="30d">Next 30 Days</SelectItem>
                <SelectItem value="90d">Next 90 Days</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => setAutoRefresh(!autoRefresh)}>
              {autoRefresh ? (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Auto-Refresh On
                </>
              ) : (
                <>
                  <BellOff className="h-4 w-4 mr-2" />
                  Auto-Refresh Off
                </>
              )}
            </Button>
            
            <Button onClick={generateMockData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <Tabs value={viewMode} onValueChange={(value: string) => setViewMode(value as typeof viewMode)} className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">
              <Gauge className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="segment" className="data-[state=active]:bg-white">
              <Users className="h-4 w-4 mr-2" />
              Segments
            </TabsTrigger>
            <TabsTrigger value="product" className="data-[state=active]:bg-white">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="strategy" className="data-[state=active]:bg-white">
              <Brain className="h-4 w-4 mr-2" />
              Strategies
            </TabsTrigger>
            <TabsTrigger value="simulation" className="data-[state=active]:bg-white">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Simulation
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-white">
              <Zap className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Key Metrics */}
        {aggregatedUplift && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <UpliftScoreCard
              title="Avg Uplift Score"
              value={aggregatedUplift.average}
              change={aggregatedUplift.average}
              icon={<TrendingUp className="h-6 w-6" />}
              color="green"
              size="default"
            />
            
            <UpliftScoreCard
              title="CTR Uplift"
              value={aggregatedUplift.byMetric.ctr}
              change={aggregatedUplift.byMetric.ctr}
              icon={<Eye className="h-6 w-6" />}
              color="blue"
            />
            
            <UpliftScoreCard
              title="CVR Uplift"
              value={aggregatedUplift.byMetric.cvr}
              change={aggregatedUplift.byMetric.cvr}
              icon={<ShoppingCart className="h-6 w-6" />}
              color="purple"
            />
            
            <UpliftScoreCard
              title="AOV Uplift"
              value={aggregatedUplift.byMetric.aov}
              icon={<DollarSign className="h-6 w-6" />}
              color="yellow"
              format="currency"
            />
            
            <UpliftScoreCard
              title="GMV Uplift"
              value={aggregatedUplift.byMetric.gmv}
              icon={<BarChart3 className="h-6 w-6" />}
              color="green"
              format="currency"
            />
            
            <UpliftScoreCard
              title="CLV Uplift"
              value={aggregatedUplift.byMetric.clv}
              icon={<Users className="h-6 w-6" />}
              color="blue"
              format="currency"
            />
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {viewMode === 'overview' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UpliftComparisonChart />
              <FunnelUpliftChart />
            </div>
            
            <RevenueImpactCalculator />
            
            <SegmentUpliftMatrix />
            
            <TopOpportunitiesTable />
          </>
        )}
        
        {/* Segments Tab */}
        {viewMode === 'segment' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Segment Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={segmentComparison.map(s => ({
                      subject: s?.segment,
                      uplift: s?.avgUplift,
                      size: (s?.size || 0) / 1000,
                      ltv: (s?.ltv || 0) / 100,
                      confidence: 80
                    }))}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="Uplift" dataKey="uplift" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Radar name="Size (K)" dataKey="size" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Radar name="LTV (x100)" dataKey="ltv" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {segments.map(segment => (
                <Card key={segment.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{segment.name}</span>
                      <Badge className={
                        segment.valueTier === 'high' ? 'bg-purple-100 text-purple-800' :
                        segment.valueTier === 'medium' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {segment.valueTier} value
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Size</div>
                          <div className="text-lg font-bold">{segment.size.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Avg LTV</div>
                          <div className="text-lg font-bold">${segment.avgLTV.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Device Usage</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Mobile</span>
                            <span className="font-medium">{(segment.deviceUsage.mobile * 100).toFixed(0)}%</span>
                          </div>
                          <Progress value={segment.deviceUsage.mobile * 100} className="h-2" />
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Top Geographic Markets</div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(segment.geoDistribution)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 3)
                            .map(([country, share]) => (
                              <Badge key={country} variant="outline">
                                {country}: {(share * 100).toFixed(0)}%
                              </Badge>
                            ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Best Performing Strategies</div>
                        <div className="space-y-2">
                          {strategies
                            .map(strategy => {
                              const strategyPredictions = upliftPredictions.filter(
                                p => p.segmentId === segment.id && p.strategyId === strategy.id
                              );
                              const avgUplift = strategyPredictions.length > 0 
                                ? strategyPredictions.reduce((acc, p) => acc + p.predictedUplift.total, 0) / strategyPredictions.length
                                : 0;
                              return { strategy, avgUplift };
                            })
                            .sort((a, b) => b.avgUplift - a.avgUplift)
                            .slice(0, 2)
                            .map(({ strategy, avgUplift }) => (
                              <div key={strategy.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="text-sm font-medium">{strategy.name}</span>
                                <Badge className="bg-green-100 text-green-800">
                                  {avgUplift.toFixed(1)}% uplift
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Products Tab */}
        {viewMode === 'product' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product-Level Uplift Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Trend Score</TableHead>
                        <TableHead>Best Uplift</TableHead>
                        <TableHead>Best Segment</TableHead>
                        <TableHead>Revenue Potential</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.slice(0, 10).map(product => {
                        const productPredictions = upliftPredictions.filter(p => p.productId === product.id);
                        const bestPrediction = productPredictions.sort((a, b) => 
                          b.predictedUplift.total * b.confidence - a.predictedUplift.total * a.confidence
                        )[0];
                        
                        const bestSegment = bestPrediction ? segments.find(s => s.id === bestPrediction.segmentId) : null;
                        const bestStrategy = bestPrediction ? strategies.find(s => s.id === bestPrediction.strategyId) : null;
                        
                        const revenuePotential = bestPrediction 
                          ? (bestPrediction.predictedUplift.gmv * 1000) // Simplified calculation
                          : 0;
                        
                        return (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.sku}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge>{product.category}</Badge>
                            </TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Progress value={product.trendScore * 100} className="h-2 w-20" />
                                <span className="ml-2 text-sm">{(product.trendScore * 100).toFixed(0)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {bestPrediction ? (
                                <Badge className="bg-green-100 text-green-800">
                                  {bestPrediction.predictedUplift.total.toFixed(1)}%
                                </Badge>
                              ) : (
                                <span className="text-gray-500">N/A</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {bestSegment?.name || 'N/A'}
                            </TableCell>
                            <TableCell>
                              <div className="font-bold text-green-700">
                                ${revenuePotential.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Strategies Tab */}
        {viewMode === 'strategy' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {strategyComparison.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{strategy?.strategy}</span>
                      <Badge className={
                        strategy?.complexity === 'high' ? 'bg-red-100 text-red-800' :
                        strategy?.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {strategy?.complexity} complexity
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Avg Uplift</div>
                          <div className="text-2xl font-bold text-green-700">
                            {strategy?.avgUplift.toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">ROI</div>
                          <div className="text-2xl font-bold">
                            {strategy?.roi.toFixed(1)}x
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Implementation Cost</div>
                        <div className="text-lg font-bold">
                          ${strategy?.cost.toLocaleString()}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Confidence</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Prediction Confidence</span>
                            <span className="font-medium">{(strategy?.avgConfidence || 0 * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={(strategy?.avgConfidence || 0) * 100} className="h-2" />
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Best For Segments</div>
                        <div className="space-y-2">
                          {segments
                            .map(segment => {
                              const segmentPredictions = upliftPredictions.filter(
                                p => p.segmentId === segment.id && p.strategyId === strategy?.strategyId
                              );
                              const avgUplift = segmentPredictions.length > 0
                                ? segmentPredictions.reduce((acc, p) => acc + p.predictedUplift.total, 0) / segmentPredictions.length
                                : 0;
                              return { segment, avgUplift };
                            })
                            .sort((a, b) => b.avgUplift - a.avgUplift)
                            .slice(0, 2)
                            .map(({ segment, avgUplift }) => (
                              <div key={segment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="text-sm font-medium">{segment.name}</span>
                                <Badge className="bg-green-100 text-green-800">
                                  {avgUplift.toFixed(1)}% uplift
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Simulation Tab */}
        {viewMode === 'simulation' && (
          <div className="space-y-6">
            <StrategySimulation />
            
            <Card>
              <CardHeader>
                <CardTitle>Multi-Objective Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid />
                      <XAxis type="number" dataKey="revenue" name="Revenue" unit="k" />
                      <YAxis type="number" dataKey="margin" name="Margin" unit="%" />
                      <ZAxis type="number" dataKey="satisfaction" range={[60, 400]} name="Satisfaction" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter name="Strategy Options" data={[
                        { revenue: 120, margin: 35, satisfaction: 85, strategy: 'Personalized' },
                        { revenue: 95, margin: 42, satisfaction: 78, strategy: 'Bundles' },
                        { revenue: 85, margin: 38, satisfaction: 92, strategy: 'Similar Items' },
                        { revenue: 110, margin: 32, satisfaction: 88, strategy: 'Frequently Bought' },
                        { revenue: 75, margin: 45, satisfaction: 82, strategy: 'Trending' }
                      ]} fill="#3b82f6" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Advanced Tab */}
        {viewMode === 'advanced' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Ultra-Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Feature Cards */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="text-sm">Elasticity-Based Uplift</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Adjust uplift based on price sensitivity and demand curves</p>
                      <div className="mt-4">
                        <Badge className="bg-blue-100 text-blue-800">Price Sensitivity</Badge>
                        <Badge className="ml-2 bg-green-100 text-green-800">Demand Curves</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="text-sm">Personalization Depth Index</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Score how deeply personalization affects shoppers</p>
                      <div className="mt-4">
                        <Badge className="bg-purple-100 text-purple-800">Identity-Based</Badge>
                        <Badge className="ml-2 bg-pink-100 text-pink-800">Behavior-Based</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-sm">Cold-Start Predictor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Predict uplift for new products and users</p>
                      <div className="mt-4">
                        <Badge className="bg-green-100 text-green-800">Low-Data Environments</Badge>
                        <Badge className="ml-2 bg-yellow-100 text-yellow-800">Attribute Embeddings</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <CardTitle className="text-sm">Cannibalization Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Identify negative cross-effects on other products</p>
                      <div className="mt-4">
                        <Badge className="bg-red-100 text-red-800">High-Margin Protection</Badge>
                        <Badge className="ml-2 bg-orange-100 text-orange-800">Cross-Effect Analysis</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <CardTitle className="text-sm">Inventory Sync</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Adjust uplift based on stock levels</p>
                      <div className="mt-4">
                        <Badge className="bg-yellow-100 text-yellow-800">Overstock Liquidation</Badge>
                        <Badge className="ml-2 bg-blue-100 text-blue-800">Low-Stock Throttling</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-pink-500">
                    <CardHeader>
                      <CardTitle className="text-sm">Real-Time Signals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Dynamic uplift adjustment based on user behavior</p>
                      <div className="mt-4">
                        <Badge className="bg-pink-100 text-pink-800">Scroll Depth</Badge>
                        <Badge className="ml-2 bg-indigo-100 text-indigo-800">Dwell Time</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            <p>Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
            <p className="mt-1">Predictions: {upliftPredictions.length} • Confidence: {aggregatedUplift?.confidence ? (aggregatedUplift.confidence * 100).toFixed(1) : '0'}%</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Analysis
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>High Uplift (&gt;25%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Medium Uplift (15-25%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Low Uplift (&lt;15%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecomUplift;