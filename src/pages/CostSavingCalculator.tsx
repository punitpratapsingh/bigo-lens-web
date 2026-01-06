import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar as RechartsBar,
  Line as RechartsLine,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine
} from 'recharts';
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Tag,
  Image,
  ShoppingCart,
  Target,
  BarChart3,
  RefreshCw,
  Download,
  Share2,
  Settings,
  Zap,
  Brain,
  Cpu,
  Database,
  Cloud,
  Shield,
  Clock,
  Calendar,
  Layers,
  Filter,
  Search,
  Globe,
  Truck,
  Warehouse,
  CreditCard,
  Smartphone,
  Award,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Plus,
  Minus,
  Trash2,
  Edit2,
  Save,
  Upload,
  Printer,
  Mail,
  FileText,
  Home,
  Bell,
  User,
  Menu,
  X,
  Activity,
  Heart,
  Sparkles,
  Rocket,
  ShoppingBag,
  Percent,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Map,
  Building,
  Factory,
  Store,
  MessageCircle,
  Phone,
  Wifi,
  Server,
  MemoryStick,
  Network,
  MapPin,
  Navigation,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  RadioTower,
  SatelliteDish,
  Cctv,
  Shield as ShieldIcon,
  Key,
  Fingerprint,
  QrCode,
  Scan,
  ShieldAlert,
  AlertOctagon,
  CheckCircle2,
  Ban,
  HardDrive,
  Monitor,
  Tv,
  Headphones,
  Speaker,
  Tablet,
  Watch,
  Battery,
  Signal,
  Volume2,
  Camera,
  Video,
  Mic,
  Radio,
  Bluetooth,
  Compass,
  Mountain,
  Waves,
  Trees,
  Leaf,
  Flower,
  Droplet,
  Flame,
  Snowflake,
  Umbrella,
  Thermometer,
  CloudRain,
  CloudSun,
  CloudLightning,
  Sunrise,
  Sunset,
  Moon,
  Wind,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  Minimize2,
  PlayCircle,
  PauseCircle,
  SkipForward,
  SkipBack,
  RotateCw,
  AlertOctagon as AlertOctagonIcon,
  GitBranch,
  Cpu as CpuIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Zap as ZapIcon,
  Users as UsersIcon,
  ShoppingCart as ShoppingCartIcon,
  Target as TargetIcon,
  Package as PackageIcon,
  Truck as TruckIcon,
  Search as SearchIcon,
  Percent as PercentIcon,
  Bell as BellIcon,
  Mail as MailIcon,
  MessageSquare,
  Grid,
  List,
  Folder,
  DownloadCloud,
  UploadCloud,
  Filter as FilterIcon,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  X as XIcon,
  Moon as MoonIcon,
  Sun as SunIcon,
  ThermometerSun,
  Droplets,
  Wind as WindIcon,
  Cloud as CloudIcon2,
  Umbrella as UmbrellaIcon,
  Thermometer as ThermometerIcon,
  Gauge,
  PieChart as PieChartIcon2,
  ScatterChart as ScatterChartIcon,
  AreaChart as AreaChartIcon,
  BarChart2,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Activity as ActivityIcon,
  AlertCircle as AlertCircleIcon,
  Award as AwardIcon,
  Star as StarIcon,
  Crown,
  Coins,
  Wallet,
  CreditCard as CreditCardIcon,
  Building as BuildingIcon,
  Factory as FactoryIcon,
  Store as StoreIcon,
  Smartphone as SmartphoneIcon,
  Headphones as HeadphonesIcon,
  Speaker as SpeakerIcon,
  Monitor as MonitorIcon,
  Tv as TvIcon,
  Watch as WatchIcon,
  Camera as CameraIcon,
  Video as VideoIcon,
  Mic as MicIcon,
  Bluetooth as BluetoothIcon,
  Wifi as WifiIcon,
  Battery as BatteryIcon,
  Signal as SignalIcon,
  Volume2 as Volume2Icon,
  Cpu as CpuIcon2,
  HardDrive as HardDriveIcon,
  MemoryStick as MemoryStickIcon,
  Server as ServerIcon,
  Database as DatabaseIcon2,
  Network as NetworkIcon,
  SatelliteDish as SatelliteDishIcon,
  RadioTower as RadioTowerIcon,
  Cctv as CctvIcon,
  Shield as ShieldIcon2,
  Key as KeyIcon,
  Fingerprint as FingerprintIcon,
  QrCode as QrCodeIcon,
  Scan as ScanIcon,
  ScanFace,
  EyeClosed,
  LockKeyhole,
  UnlockKeyhole,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert as ShieldAlertIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle2 as CheckCircle2Icon,
  XCircle as XCircleIcon,
  HelpCircle as HelpCircleIcon,
  Info as InfoIcon,
  Ban as BanIcon,
  Radio as RadioIcon,
  Satellite,
  MapPin as MapPinIcon,
  Navigation as NavigationIcon,
  Compass as CompassIcon,
  Mountain as MountainIcon,
  Waves as WavesIcon,
  Trees as TreesIcon,
  Leaf as LeafIcon,
  Flower as FlowerIcon,
  Feather,
  Flame as FlameIcon,
  Snowflake as SnowflakeIcon,
  Umbrella as UmbrellaIcon2,
  CloudRain as CloudRainIcon,
  CloudSun as CloudSunIcon,
  CloudLightning as CloudLightningIcon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Moon as MoonIcon2,
  Wind as WindIcon2,
  Thermometer as ThermometerIcon2,
  Droplet as DropletIcon,
  CameraOff,
  VideoOff,
  MicOff,
  MonitorOff,
  BatteryCharging,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  SignalHigh,
  SignalMedium,
  SignalLow,
  SignalZero,
  VolumeX,
  Volume1,
  WifiOff,
  BluetoothOff,
  MapPinOff,
  NavigationOff,
  ShieldOff,
  EyeOff as EyeOffIcon2,
  Eye as EyeIcon,
  Heart as HeartIcon,
  Sparkles as SparklesIcon,
  Rocket as RocketIcon,
  Zap as ZapIcon2,
  Brain as BrainIcon,
  Cpu as CpuIcon3,
  Database as DatabaseIcon3,
  Cloud as CloudIcon3,
  Server as ServerIcon2,
  Truck as TruckIcon2,
  Warehouse as WarehouseIcon,
  ShoppingBag as ShoppingBagIcon,
  Tag as TagIcon,
  Image as ImageIcon,
  Filter as FilterIcon2,
  Layers as LayersIcon,
  GitMerge,
  GitPullRequest,
  GitCommit,
  GitCompare,
  GitBranch as GitBranchIcon
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
);

// Types
interface CostSavingCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  baseSaving: number;
  maxSaving: number;
  confidence: number;
  features: CostSavingFeature[];
}

interface CostSavingFeature {
  id: string;
  name: string;
  description: string;
  formula: string;
  variables: Array<{
    id: string;
    name: string;
    description: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
  }>;
  baseValue: number;
  currentValue: number;
  minValue: number;
  maxValue: number;
  unit: string;
  impact: number;
  roi: number;
  implementationTime: number;
  implementationCost: number;
  annualSaving: number;
}

interface IndustryBenchmark {
  name: string;
  operational: number;
  catalog: number;
  returns: number;
  marketing: number;
  inventory: number;
  pricing: number;
  clv: number;
  recommendations: number;
  search: number;
  infrastructure: number;
}

interface TimelinePoint {
  month: number;
  savings: number;
  cumulative: number;
  investment: number;
  roi: number;
}

interface SimulationResult {
  scenario: string;
  totalSavings: number;
  roi: number;
  paybackMonths: number;
  confidence: number;
}

// Advanced mathematical functions
const calculateExponentialDecay = (value: number, decayRate: number, time: number): number => {
  return value * Math.exp(-decayRate * time);
};

const calculateMonteCarloValue = (baseValue: number, volatility: number, iterations: number = 1000): number => {
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    sum += baseValue * randomFactor;
  }
  return sum / iterations;
};

const calculateLogisticGrowth = (capacity: number, growthRate: number, time: number): number => {
  return capacity / (1 + Math.exp(-growthRate * time));
};

const calculateSigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x));
};

// Main Component
const AdvancedCostSavingCalculator: React.FC = () => {
  // State Management
  const [activeCategory, setActiveCategory] = useState<string>('operational');
  const [companySize, setCompanySize] = useState<'small' | 'medium' | 'large' | 'enterprise'>('medium');
  const [annualRevenue, setAnnualRevenue] = useState<number>(5000000);
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(100000);
  const [skuCount, setSkuCount] = useState<number>(5000);
  const [teamSize, setTeamSize] = useState<number>(50);
  const [currentReturnRate, setCurrentReturnRate] = useState<number>(15);
  const [currentConversionRate, setCurrentConversionRate] = useState<number>(2.5);
  const [currentAOV, setCurrentAOV] = useState<number>(85);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY'>('USD');
  const [confidenceLevel, setConfidenceLevel] = useState<number>(90);
  const [simulationMode, setSimulationMode] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [viewMode, setViewMode] = useState<'summary' | 'detailed' | 'comparison'>('summary');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);
  const [timeHorizon, setTimeHorizon] = useState<number>(36); // months

  // Industry Benchmarks
  const industryBenchmarks: IndustryBenchmark[] = [
    {
      name: 'Fashion & Apparel',
      operational: 35,
      catalog: 40,
      returns: 45,
      marketing: 28,
      inventory: 25,
      pricing: 22,
      clv: 32,
      recommendations: 35,
      search: 30,
      infrastructure: 42
    },
    {
      name: 'Electronics',
      operational: 42,
      catalog: 48,
      returns: 18,
      marketing: 32,
      inventory: 35,
      pricing: 28,
      clv: 38,
      recommendations: 42,
      search: 36,
      infrastructure: 45
    },
    {
      name: 'Home & Garden',
      operational: 28,
      catalog: 35,
      returns: 22,
      marketing: 25,
      inventory: 30,
      pricing: 20,
      clv: 28,
      recommendations: 32,
      search: 26,
      infrastructure: 38
    },
    {
      name: 'Beauty & Cosmetics',
      operational: 38,
      catalog: 45,
      returns: 25,
      marketing: 35,
      inventory: 28,
      pricing: 25,
      clv: 35,
      recommendations: 38,
      search: 32,
      infrastructure: 40
    }
  ];

  // Currency conversion rates
  const currencyRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 150
  };

  const convertCurrency = (amount: number): number => {
    return amount * currencyRates[currency];
  };

  // 1. OPERATIONAL COST SAVINGS - Advanced Calculations
  const calculateOperationalSavings = () => {
    const base = 125000;
    
    // Company size multiplier (exponential scaling)
    const sizeMultiplier = {
      small: 0.3,
      medium: 1.0,
      large: 3.2,
      enterprise: 8.5
    }[companySize];
    
    // Team efficiency factor (logarithmic scaling)
    const teamFactor = Math.log10(teamSize) / Math.log10(50);
    
    // Automation potential (logistic growth function)
    const automationPotential = calculateSigmoid(teamSize / 50 - 0.5) * 0.8 + 0.1;
    
    // Process efficiency gain (exponential decay of inefficiencies)
    const efficiencyGain = 1 - calculateExponentialDecay(0.4, 0.2, teamSize / 100);
    
    // Learning curve effect (80% learning curve)
    const learningCurve = Math.pow(0.8, Math.log2(teamSize / 10));
    
    // Risk adjustment based on confidence level
    const riskAdjustment = confidenceLevel / 100;
    
    // Calculate using advanced formula
    const savings = base * 
      sizeMultiplier * 
      teamFactor * 
      automationPotential * 
      efficiencyGain * 
      learningCurve * 
      riskAdjustment;
    
    // Add Monte Carlo simulation for uncertainty
    const monteCarloSavings = calculateMonteCarloValue(savings, 0.15);
    
    return Math.round(convertCurrency(monteCarloSavings));
  };

  const operationalFeatures: CostSavingFeature[] = [
    {
      id: 'ai-automation',
      name: 'AI Automation',
      description: 'Automation of manual tasks using AI/ML',
      formula: 'Hours × Rate × Efficiency_Gain × Learning_Curve',
      variables: [
        { id: 'automation-hours', name: 'Monthly Hours', description: 'Hours spent on manual tasks', value: 500, min: 100, max: 2000, step: 50, unit: 'hours' },
        { id: 'hourly-rate', name: 'Hourly Rate', description: 'Average hourly cost', value: 35, min: 15, max: 75, step: 5, unit: currency },
        { id: 'automation-rate', name: 'Automation %', description: 'Percentage automatable', value: 65, min: 30, max: 90, step: 5, unit: '%' }
      ],
      baseValue: 136500,
      currentValue: 136500,
      minValue: 25000,
      maxValue: 350000,
      unit: currency,
      impact: 4.2,
      roi: 3.8,
      implementationTime: 12,
      implementationCost: 45000,
      annualSaving: 136500
    },
    {
      id: 'workforce-optimization',
      name: 'Workforce Optimization',
      description: 'Optimizing team size and efficiency',
      formula: 'FTE × Salary × Optimization_Rate × Productivity_Gain',
      variables: [
        { id: 'fte-count', name: 'FTE Count', description: 'Full-time equivalent positions', value: teamSize, min: 5, max: 500, step: 5, unit: 'FTE' },
        { id: 'avg-salary', name: 'Average Salary', description: 'Average annual salary', value: 65000, min: 30000, max: 150000, step: 5000, unit: currency },
        { id: 'optimization-rate', name: 'Optimization %', description: 'Potential optimization', value: 20, min: 5, max: 40, step: 2, unit: '%' }
      ],
      baseValue: 845000,
      currentValue: 845000,
      minValue: 150000,
      maxValue: 2000000,
      unit: currency,
      impact: 8.5,
      roi: 2.8,
      implementationTime: 18,
      implementationCost: 120000,
      annualSaving: 845000
    }
  ];

  // 2. CATALOG OPTIMIZATION - Advanced Calculations
  const calculateCatalogSavings = () => {
    const base = 85000;
    
    // SKU complexity factor (power law)
    const skuComplexity = Math.pow(skuCount / 1000, 0.7);
    
    // Catalog quality score (inverse relationship)
    const qualityDeficit = 1 - (skuCount > 10000 ? 0.6 : 0.7);
    
    // Image optimization potential (logistic growth)
    const imageOptimization = calculateSigmoid(skuCount / 2000 - 2) * 0.4 + 0.1;
    
    // Attribute completeness (exponential improvement)
    const attributeImprovement = 1 - calculateExponentialDecay(0.5, 0.3, skuCount / 5000);
    
    // Duplicate reduction (power law)
    const duplicateReduction = Math.pow(0.3, Math.log10(skuCount / 100));
    
    // Calculate using advanced formula
    const savings = base * 
      skuComplexity * 
      qualityDeficit * 
      (imageOptimization + attributeImprovement + duplicateReduction) / 3 *
      (confidenceLevel / 100);
    
    return Math.round(convertCurrency(savings));
  };

  const catalogFeatures: CostSavingFeature[] = [
    {
      id: 'sku-optimization',
      name: 'SKU Optimization',
      description: 'Reducing duplicate and low-performing SKUs',
      formula: 'SKUs × Cost_Per_SKU × Reduction_Rate × Impact_Factor',
      variables: [
        { id: 'total-skus', name: 'Total SKUs', description: 'Number of stock keeping units', value: skuCount, min: 100, max: 50000, step: 100, unit: 'SKUs' },
        { id: 'cost-per-sku', name: 'Cost per SKU', description: 'Annual cost per SKU', value: 250, min: 50, max: 1000, step: 50, unit: currency },
        { id: 'reduction-rate', name: 'Reduction %', description: 'Optimizable SKUs', value: 25, min: 10, max: 50, step: 5, unit: '%' }
      ],
      baseValue: 312500,
      currentValue: 312500,
      minValue: 5000,
      maxValue: 1250000,
      unit: currency,
      impact: 3.8,
      roi: 4.2,
      implementationTime: 9,
      implementationCost: 75000,
      annualSaving: 312500
    },
    {
      id: 'content-enrichment',
      name: 'Content Enrichment',
      description: 'Improving product information and images',
      formula: 'Products × Content_Cost × Quality_Improvement × Conversion_Impact',
      variables: [
        { id: 'products-count', name: 'Products', description: 'Products needing enrichment', value: skuCount, min: 100, max: 50000, step: 100, unit: 'products' },
        { id: 'content-cost', name: 'Content Cost', description: 'Cost per product enrichment', value: 15, min: 5, max: 50, step: 5, unit: currency },
        { id: 'quality-gain', name: 'Quality Gain', description: 'Expected quality improvement', value: 40, min: 15, max: 70, step: 5, unit: '%' }
      ],
      baseValue: 300000,
      currentValue: 300000,
      minValue: 7500,
      maxValue: 1750000,
      unit: currency,
      impact: 4.5,
      roi: 3.5,
      implementationTime: 6,
      implementationCost: 45000,
      annualSaving: 300000
    }
  ];

  // 3. RETURN RATE REDUCTION - Advanced Calculations
  const calculateReturnSavings = () => {
    const base = 150000;
    
    // Revenue-based scaling (logarithmic)
    const revenueFactor = Math.log10(annualRevenue / 100000) / 2;
    
    // Return rate factor (non-linear impact)
    const returnFactor = Math.pow(currentReturnRate / 10, 1.5);
    
    // AI reduction potential (sigmoid function)
    const reductionPotential = calculateSigmoid((30 - currentReturnRate) / 10) * 0.5 + 0.25;
    
    // Logistics cost factor (economies of scale)
    const logisticsFactor = 1 - Math.exp(-annualRevenue / 10000000);
    
    // Customer satisfaction impact (exponential)
    const satisfactionImpact = Math.exp(-currentReturnRate / 20);
    
    // Calculate using advanced formula
    const savings = base * 
      revenueFactor * 
      returnFactor * 
      reductionPotential * 
      logisticsFactor * 
      satisfactionImpact *
      (confidenceLevel / 100);
    
    // Current return loss calculation
    const returnLoss = annualRevenue * (currentReturnRate / 100) * 0.35; // 35% of returned value is lost
    
    return Math.round(convertCurrency(Math.min(savings, returnLoss * reductionPotential)));
  };

  const returnFeatures: CostSavingFeature[] = [
    {
      id: 'fit-prediction',
      name: 'Fit & Size Prediction',
      description: 'AI-powered size recommendations',
      formula: 'Returns × Average_Value × Reduction_Rate × Value_Recovery',
      variables: [
        { id: 'monthly-returns', name: 'Monthly Returns', description: 'Number of returns per month', value: 1250, min: 100, max: 10000, step: 100, unit: 'returns' },
        { id: 'avg-return-value', name: 'Average Value', description: 'Average value per return', value: 85, min: 25, max: 250, step: 10, unit: currency },
        { id: 'reduction-potential', name: 'Reduction %', description: 'Reduction potential', value: 35, min: 15, max: 60, step: 5, unit: '%' }
      ],
      baseValue: 446250,
      currentValue: 446250,
      minValue: 4500,
      maxValue: 1800000,
      unit: currency,
      impact: 4.8,
      roi: 5.2,
      implementationTime: 12,
      implementationCost: 85000,
      annualSaving: 446250
    },
    {
      id: 'virtual-tryon',
      name: 'Virtual Try-On',
      description: 'AR/VR for product visualization',
      formula: 'Traffic × TryOn_Rate × Conversion_Lift × AOV_Increase',
      variables: [
        { id: 'daily-traffic', name: 'Daily Traffic', description: 'Average daily visitors', value: 3333, min: 100, max: 100000, step: 100, unit: 'visitors' },
        { id: 'tryon-rate', name: 'Try-On Rate', description: 'Percentage using try-on', value: 25, min: 5, max: 50, step: 5, unit: '%' },
        { id: 'conversion-lift', name: 'Conversion Lift', description: 'Increase in conversion', value: 18, min: 5, max: 40, step: 2, unit: '%' }
      ],
      baseValue: 216000,
      currentValue: 216000,
      minValue: 15000,
      maxValue: 1500000,
      unit: currency,
      impact: 3.2,
      roi: 4.8,
      implementationTime: 15,
      implementationCost: 95000,
      annualSaving: 216000
    }
  ];

  // 4. MARKETING & ADVERTISING - Advanced Calculations
  const calculateMarketingSavings = () => {
    const base = 95000;
    
    // Traffic scaling (power law)
    const trafficScale = Math.pow(monthlyTraffic / 10000, 0.6);
    
    // Conversion optimization (logistic growth)
    const conversionOptimization = calculateSigmoid(currentConversionRate - 1) * 0.4;
    
    // Ad waste reduction (exponential decay)
    const wasteReduction = 1 - calculateExponentialDecay(0.35, 0.15, monthlyTraffic / 50000);
    
    // Personalization impact (logarithmic)
    const personalizationImpact = Math.log10(monthlyTraffic / 1000) * 0.2;
    
    // Attribution improvement (sigmoid)
    const attributionGain = calculateSigmoid(monthlyTraffic / 50000) * 0.3;
    
    // Calculate using advanced formula
    const savings = base * 
      trafficScale * 
      (conversionOptimization + wasteReduction + personalizationImpact + attributionGain) *
      (confidenceLevel / 100);
    
    // Current ad waste calculation
    const adWaste = annualRevenue * 0.2 * 0.35; // 35% waste on 20% ad spend
    
    return Math.round(convertCurrency(Math.min(savings, adWaste * wasteReduction)));
  };

  const marketingFeatures: CostSavingFeature[] = [
    {
      id: 'personalization',
      name: 'Personalization Engine',
      description: 'AI-driven personalized marketing',
      formula: 'Customers × Personalization_Rate × Conversion_Lift × Revenue_Per_Customer',
      variables: [
        { id: 'customer-base', name: 'Customer Base', description: 'Active customer base', value: 25000, min: 1000, max: 500000, step: 1000, unit: 'customers' },
        { id: 'personalization-rate', name: 'Personalization %', description: 'Targetable customers', value: 60, min: 20, max: 90, step: 5, unit: '%' },
        { id: 'conversion-lift', name: 'Conversion Lift', description: 'Expected lift', value: 22, min: 8, max: 50, step: 2, unit: '%' }
      ],
      baseValue: 330000,
      currentValue: 330000,
      minValue: 16000,
      maxValue: 2250000,
      unit: currency,
      impact: 4.2,
      roi: 3.9,
      implementationTime: 10,
      implementationCost: 85000,
      annualSaving: 330000
    },
    {
      id: 'ai-content',
      name: 'AI Content Generation',
      description: 'Automated ad copy and creatives',
      formula: 'Campaigns × Content_Cost × Automation_Rate × Quality_Multiplier',
      variables: [
        { id: 'monthly-campaigns', name: 'Monthly Campaigns', description: 'Marketing campaigns per month', value: 50, min: 5, max: 500, step: 5, unit: 'campaigns' },
        { id: 'content-cost', name: 'Content Cost', description: 'Cost per campaign content', value: 500, min: 100, max: 2000, step: 50, unit: currency },
        { id: 'automation-rate', name: 'Automation %', description: 'Content automatable', value: 70, min: 30, max: 95, step: 5, unit: '%' }
      ],
      baseValue: 210000,
      currentValue: 210000,
      minValue: 10500,
      maxValue: 1140000,
      unit: currency,
      impact: 3.5,
      roi: 4.5,
      implementationTime: 8,
      implementationCost: 47000,
      annualSaving: 210000
    }
  ];

  // 5. INVENTORY & SUPPLY CHAIN - Advanced Calculations
  const calculateInventorySavings = () => {
    const base = 110000;
    
    // SKU complexity factor (square root scaling)
    const skuFactor = Math.sqrt(skuCount / 1000);
    
    // Demand forecasting accuracy (logistic improvement)
    const forecastingAccuracy = calculateSigmoid(skuCount / 5000) * 0.4 + 0.3;
    
    // Holding cost reduction (exponential decay)
    const holdingReduction = 1 - calculateExponentialDecay(0.25, 0.2, skuCount / 10000);
    
    // Logistics optimization (power law)
    const logisticsOptimization = Math.pow(skuCount / 10000, -0.3);
    
    // Stockout reduction (sigmoid)
    const stockoutReduction = calculateSigmoid(skuCount / 2000) * 0.35;
    
    // Calculate using advanced formula
    const savings = base * 
      skuFactor * 
      (forecastingAccuracy + holdingReduction + logisticsOptimization + stockoutReduction) *
      (confidenceLevel / 100);
    
    // Current holding cost
    const holdingCost = annualRevenue * 0.12; // 12% holding cost
    
    return Math.round(convertCurrency(Math.min(savings, holdingCost * holdingReduction)));
  };

  const inventoryFeatures: CostSavingFeature[] = [
    {
      id: 'demand-forecasting',
      name: 'Demand Forecasting',
      description: 'AI-powered inventory prediction',
      formula: 'Inventory_Value × Holding_Cost × Accuracy_Improvement × Stockout_Reduction',
      variables: [
        { id: 'inventory-value', name: 'Inventory Value', description: 'Total inventory value', value: 1500000, min: 50000, max: 10000000, step: 50000, unit: currency },
        { id: 'holding-cost', name: 'Holding Cost', description: 'Annual holding cost %', value: 12, min: 5, max: 25, step: 1, unit: '%' },
        { id: 'accuracy-gain', name: 'Accuracy Gain', description: 'Forecasting improvement', value: 35, min: 15, max: 60, step: 5, unit: '%' }
      ],
      baseValue: 630000,
      currentValue: 630000,
      minValue: 2625,
      maxValue: 1800000,
      unit: currency,
      impact: 5.2,
      roi: 4.8,
      implementationTime: 14,
      implementationCost: 130000,
      annualSaving: 630000
    },
    {
      id: 'warehouse-optimization',
      name: 'Warehouse Optimization',
      description: 'AI-driven warehouse management',
      formula: 'Warehouse_Cost × Efficiency_Gain × Space_Optimization × Labor_Reduction',
      variables: [
        { id: 'warehouse-cost', name: 'Warehouse Cost', description: 'Annual warehouse costs', value: 450000, min: 50000, max: 3000000, step: 50000, unit: currency },
        { id: 'efficiency-gain', name: 'Efficiency Gain', description: 'Expected efficiency gain', value: 25, min: 10, max: 45, step: 5, unit: '%' },
        { id: 'space-optimization', name: 'Space Optimization', description: 'Storage space optimization', value: 20, min: 5, max: 40, step: 5, unit: '%' }
      ],
      baseValue: 202500,
      currentValue: 202500,
      minValue: 5000,
      maxValue: 1350000,
      unit: currency,
      impact: 3.8,
      roi: 3.2,
      implementationTime: 16,
      implementationCost: 65000,
      annualSaving: 202500
    }
  ];

  // 6. DYNAMIC PRICING - Advanced Calculations
  const calculatePricingSavings = () => {
    const base = 75000;
    
    // Revenue scaling (logarithmic)
    const revenueScale = Math.log10(annualRevenue / 100000) / 2;
    
    // Price elasticity factor (inverse relationship)
    const elasticityFactor = 2.0 / (1 + Math.exp(-annualRevenue / 5000000));
    
    // Optimization potential (sigmoid)
    const optimizationPotential = calculateSigmoid(annualRevenue / 10000000) * 0.4 + 0.1;
    
    // Competitive factor (power law)
    const competitiveFactor = Math.pow(annualRevenue / 1000000, 0.2);
    
    // Seasonality adjustment (sine wave approximation)
    const seasonalityAdjustment = 1 + 0.2 * Math.sin(annualRevenue / 1000000);
    
    // Calculate using advanced formula
    const savings = base * 
      revenueScale * 
      elasticityFactor * 
      optimizationPotential * 
      competitiveFactor * 
      seasonalityAdjustment *
      (confidenceLevel / 100);
    
    // Current margin improvement potential
    const marginUplift = annualRevenue * 0.4 * 0.18; // 18% improvement on 40% margin
    
    return Math.round(convertCurrency(Math.min(savings, marginUplift)));
  };

  const pricingFeatures: CostSavingFeature[] = [
    {
      id: 'price-optimization',
      name: 'Price Optimization',
      description: 'Dynamic pricing based on market signals',
      formula: 'Revenue × Margin × Optimization_Rate × Elasticity_Factor',
      variables: [
        { id: 'monthly-revenue', name: 'Monthly Revenue', description: 'Average monthly revenue', value: 416667, min: 10000, max: 5000000, step: 10000, unit: currency },
        { id: 'current-margin', name: 'Current Margin', description: 'Gross margin percentage', value: 40, min: 20, max: 70, step: 5, unit: '%' },
        { id: 'optimization-rate', name: 'Optimization %', description: 'Price optimization potential', value: 18, min: 5, max: 35, step: 2, unit: '%' }
      ],
      baseValue: 300000,
      currentValue: 300000,
      minValue: 1000,
      maxValue: 6125000,
      unit: currency,
      impact: 4.8,
      roi: 6.2,
      implementationTime: 8,
      implementationCost: 48000,
      annualSaving: 300000
    },
    {
      id: 'discount-optimization',
      name: 'Discount Optimization',
      description: 'AI-driven discount strategies',
      formula: 'Discount_Budget × Waste_Reduction × ROI_Improvement × Conversion_Lift',
      variables: [
        { id: 'discount-budget', name: 'Discount Budget', description: 'Annual discount budget', value: 250000, min: 10000, max: 2000000, step: 10000, unit: currency },
        { id: 'waste-rate', name: 'Waste Rate', description: 'Current discount waste', value: 35, min: 10, max: 60, step: 5, unit: '%' },
        { id: 'waste-reduction', name: 'Waste Reduction', description: 'Reduction potential', value: 55, min: 20, max: 80, step: 5, unit: '%' }
      ],
      baseValue: 48125,
      currentValue: 48125,
      minValue: 700,
      maxValue: 960000,
      unit: currency,
      impact: 3.2,
      roi: 5.8,
      implementationTime: 6,
      implementationCost: 8300,
      annualSaving: 48125
    }
  ];

  // 7. CUSTOMER LIFETIME VALUE - Advanced Calculations
  const calculateCLVSavings = () => {
    const base = 65000;
    
    // Customer base scaling (logarithmic)
    const customerScale = Math.log10(monthlyTraffic / 100) / 2;
    
    // Retention improvement (sigmoid)
    const retentionImprovement = calculateSigmoid(monthlyTraffic / 50000) * 0.4;
    
    // Churn reduction (exponential decay)
    const churnReduction = 1 - calculateExponentialDecay(0.3, 0.25, monthlyTraffic / 100000);
    
    // Win-back potential (power law)
    const winbackPotential = Math.pow(monthlyTraffic / 10000, 0.3) * 0.25;
    
    // Loyalty impact (logistic growth)
    const loyaltyImpact = calculateLogisticGrowth(0.35, 0.5, monthlyTraffic / 50000);
    
    // Calculate using advanced formula
    const savings = base * 
      customerScale * 
      (retentionImprovement + churnReduction + winbackPotential + loyaltyImpact) *
      (confidenceLevel / 100);
    
    // Current churn cost
    const churnCost = annualRevenue * 0.15; // 15% revenue lost to churn
    
    return Math.round(convertCurrency(Math.min(savings, churnCost * churnReduction)));
  };

  const clvFeatures: CostSavingFeature[] = [
    {
      id: 'retention-optimization',
      name: 'Retention Optimization',
      description: 'AI-powered customer retention',
      formula: 'Customer_Base × LTV × Retention_Lift × Revenue_Impact',
      variables: [
        { id: 'customer-base', name: 'Customer Base', description: 'Total customer base', value: 50000, min: 1000, max: 1000000, step: 1000, unit: 'customers' },
        { id: 'avg-ltv', name: 'Avg LTV', description: 'Average lifetime value', value: 450, min: 50, max: 2000, step: 50, unit: currency },
        { id: 'retention-lift', name: 'Retention Lift', description: 'Expected retention improvement', value: 22, min: 8, max: 45, step: 2, unit: '%' }
      ],
      baseValue: 4950000,
      currentValue: 4950000,
      minValue: 880,
      maxValue: 9000000,
      unit: currency,
      impact: 5.5,
      roi: 4.8,
      implementationTime: 12,
      implementationCost: 1030000,
      annualSaving: 4950000
    },
    {
      id: 'win-back',
      name: 'Win-Back Campaigns',
      description: 'Re-engaging lost customers',
      formula: 'Lost_Customers × Winback_Rate × LTV_Recovery × Campaign_Efficiency',
      variables: [
        { id: 'lost-customers', name: 'Lost Customers', description: 'Churned customers per year', value: 7500, min: 100, max: 100000, step: 100, unit: 'customers' },
        { id: 'winback-rate', name: 'Winback Rate', description: 'Expected winback rate', value: 15, min: 5, max: 30, step: 2, unit: '%' },
        { id: 'recovery-value', name: 'Recovery Value', description: 'Average recovered value', value: 300, min: 100, max: 800, step: 50, unit: currency }
      ],
      baseValue: 337500,
      currentValue: 337500,
      minValue: 750,
      maxValue: 2400000,
      unit: currency,
      impact: 3.8,
      roi: 4.2,
      implementationTime: 9,
      implementationCost: 80000,
      annualSaving: 337500
    }
  ];

  // 8. RECOMMENDATION ENGINE - Advanced Calculations
  const calculateRecommendationSavings = () => {
    const base = 55000;
    
    // Traffic scaling (logarithmic)
    const trafficScale = Math.log10(monthlyTraffic / 1000) / 1.5;
    
    // Conversion uplift (sigmoid)
    const conversionUplift = calculateSigmoid(currentConversionRate - 1) * 0.3;
    
    // AOV increase (logistic growth)
    const aovIncrease = calculateLogisticGrowth(0.35, 0.6, currentAOV / 50);
    
    // Cross-sell potential (power law)
    const crossSellPotential = Math.pow(skuCount / 1000, 0.4) * 0.25;
    
    // Personalization impact (exponential)
    const personalizationImpact = 1 - Math.exp(-monthlyTraffic / 50000);
    
    // Calculate using advanced formula
    const savings = base * 
      trafficScale * 
      (conversionUplift + aovIncrease + crossSellPotential + personalizationImpact) *
      (confidenceLevel / 100);
    
    // Current cross-sell revenue potential
    const crossSellRevenue = annualRevenue * 0.15; // 15% from cross-sell
    
    return Math.round(convertCurrency(Math.min(savings, crossSellRevenue * 0.32)));
  };

  const recommendationFeatures: CostSavingFeature[] = [
    {
      id: 'cross-sell',
      name: 'Cross-Sell Optimization',
      description: 'AI-powered product recommendations',
      formula: 'Orders × CrossSell_Rate × Average_Uplift × Margin',
      variables: [
        { id: 'monthly-orders', name: 'Monthly Orders', description: 'Average monthly orders', value: 2500, min: 100, max: 50000, step: 100, unit: 'orders' },
        { id: 'crosssell-rate', name: 'Cross-Sell Rate', description: 'Cross-sell success rate', value: 25, min: 5, max: 50, step: 5, unit: '%' },
        { id: 'avg-uplift', name: 'Average Uplift', description: 'Additional value per order', value: 35, min: 10, max: 100, step: 5, unit: currency }
      ],
      baseValue: 262500,
      currentValue: 262500,
      minValue: 500,
      maxValue: 2500000,
      unit: currency,
      impact: 4.2,
      roi: 5.5,
      implementationTime: 10,
      implementationCost: 47500,
      annualSaving: 262500
    },
    {
      id: 'aov-boost',
      name: 'AOV Boost',
      description: 'Increasing average order value',
      formula: 'Orders × Current_AOV × AOV_Lift × Margin_Impact',
      variables: [
        { id: 'monthly-orders', name: 'Monthly Orders', description: 'Average monthly orders', value: 2500, min: 100, max: 50000, step: 100, unit: 'orders' },
        { id: 'current-aov', name: 'Current AOV', description: 'Average order value', value: currentAOV, min: 20, max: 500, step: 10, unit: currency },
        { id: 'aov-lift', name: 'AOV Lift', description: 'Expected AOV increase', value: 18, min: 5, max: 40, step: 2, unit: '%' }
      ],
      baseValue: 270000,
      currentValue: 270000,
      minValue: 1000,
      maxValue: 6000000,
      unit: currency,
      impact: 3.8,
      roi: 4.8,
      implementationTime: 8,
      implementationCost: 56000,
      annualSaving: 270000
    }
  ];

  // 9. SEARCH & DISCOVERY - Advanced Calculations
  const calculateSearchSavings = () => {
    const base = 45000;
    
    // Traffic scaling (square root)
    const trafficScale = Math.sqrt(monthlyTraffic / 10000);
    
    // Abandonment reduction (exponential decay)
    const abandonmentReduction = 1 - calculateExponentialDecay(0.35, 0.25, monthlyTraffic / 50000);
    
    // Query optimization (logistic growth)
    const queryOptimization = calculateLogisticGrowth(0.3, 0.7, monthlyTraffic / 20000);
    
    // Discovery improvement (power law)
    const discoveryImprovement = Math.pow(skuCount / 1000, 0.3) * 0.2;
    
    // Intent matching (sigmoid)
    const intentMatching = calculateSigmoid(monthlyTraffic / 30000) * 0.25;
    
    // Calculate using advanced formula
    const savings = base * 
      trafficScale * 
      (abandonmentReduction + queryOptimization + discoveryImprovement + intentMatching) *
      (confidenceLevel / 100);
    
    // Current search abandonment loss
    const abandonmentLoss = annualRevenue * 0.35 * 0.25; // 25% of 35% abandoned search revenue
    
    return Math.round(convertCurrency(Math.min(savings, abandonmentLoss)));
  };

  const searchFeatures: CostSavingFeature[] = [
    {
      id: 'search-abandonment',
      name: 'Search Abandonment Reduction',
      description: 'Reducing lost searches',
      formula: 'Searches × Abandonment_Rate × Recovery_Rate × Average_Value',
      variables: [
        { id: 'monthly-searches', name: 'Monthly Searches', description: 'Total search queries', value: 150000, min: 1000, max: 5000000, step: 1000, unit: 'searches' },
        { id: 'abandonment-rate', name: 'Abandonment Rate', description: 'Search abandonment rate', value: 35, min: 10, max: 60, step: 5, unit: '%' },
        { id: 'recovery-rate', name: 'Recovery Rate', description: 'Recoverable searches', value: 25, min: 10, max: 50, step: 5, unit: '%' }
      ],
      baseValue: 1312500,
      currentValue: 1312500,
      minValue: 2500,
      maxValue: 3750000,
      unit: currency,
      impact: 4.5,
      roi: 5.2,
      implementationTime: 11,
      implementationCost: 252000,
      annualSaving: 1312500
    },
    {
      id: 'query-optimization',
      name: 'Query Optimization',
      description: 'Improving search relevance',
      formula: 'Searches × Conversion_Lift × Value_Per_Conversion × Improvement_Rate',
      variables: [
        { id: 'monthly-searches', name: 'Monthly Searches', description: 'Total search queries', value: 150000, min: 1000, max: 5000000, step: 1000, unit: 'searches' },
        { id: 'conversion-lift', name: 'Conversion Lift', description: 'Expected conversion improvement', value: 15, min: 5, max: 35, step: 2, unit: '%' },
        { id: 'conversion-value', name: 'Conversion Value', description: 'Average conversion value', value: 85, min: 25, max: 250, step: 10, unit: currency }
      ],
      baseValue: 1912500,
      currentValue: 1912500,
      minValue: 10625,
      maxValue: 14875000,
      unit: currency,
      impact: 3.9,
      roi: 4.8,
      implementationTime: 9,
      implementationCost: 400000,
      annualSaving: 1912500
    }
  ];

  // 10. INFRASTRUCTURE EFFICIENCY - Advanced Calculations
  const calculateInfrastructureSavings = () => {
    const base = 35000;
    
    // Traffic scaling (logarithmic)
    const trafficScale = Math.log10(monthlyTraffic / 1000);
    
    // Compute optimization (exponential decay)
    const computeOptimization = 1 - calculateExponentialDecay(0.4, 0.3, monthlyTraffic / 50000);
    
    // Caching efficiency (logistic growth)
    const cachingEfficiency = calculateLogisticGrowth(0.35, 0.8, monthlyTraffic / 20000);
    
    // Energy reduction (power law)
    const energyReduction = Math.pow(monthlyTraffic / 10000, -0.2) * 0.25;
    
    // Server consolidation (sigmoid)
    const serverConsolidation = calculateSigmoid(monthlyTraffic / 50000) * 0.3;
    
    // Calculate using advanced formula
    const savings = base * 
      trafficScale * 
      (computeOptimization + cachingEfficiency + energyReduction + serverConsolidation) *
      (confidenceLevel / 100);
    
    // Current infrastructure cost
    const infraCost = annualRevenue * 0.08; // 8% infrastructure cost
    
    return Math.round(convertCurrency(Math.min(savings, infraCost * 0.4)));
  };

  const infrastructureFeatures: CostSavingFeature[] = [
    {
      id: 'compute-optimization',
      name: 'Compute Optimization',
      description: 'AI workload optimization',
      formula: 'Compute_Cost × Optimization_Rate × Efficiency_Gain × Scaling_Benefit',
      variables: [
        { id: 'compute-cost', name: 'Compute Cost', description: 'Annual compute costs', value: 200000, min: 10000, max: 2000000, step: 10000, unit: currency },
        { id: 'optimization-rate', name: 'Optimization %', description: 'Optimization potential', value: 40, min: 15, max: 70, step: 5, unit: '%' },
        { id: 'efficiency-gain', name: 'Efficiency Gain', description: 'Performance improvement', value: 35, min: 10, max: 60, step: 5, unit: '%' }
      ],
      baseValue: 280000,
      currentValue: 280000,
      minValue: 600,
      maxValue: 840000,
      unit: currency,
      impact: 4.2,
      roi: 6.8,
      implementationTime: 7,
      implementationCost: 41000,
      annualSaving: 280000
    },
    {
      id: 'caching-efficiency',
      name: 'Caching Efficiency',
      description: 'Intelligent caching strategies',
      formula: 'Traffic × Cache_Hit_Improvement × Cost_Per_Request × Request_Reduction',
      variables: [
        { id: 'monthly-requests', name: 'Monthly Requests', description: 'Total API requests', value: 10000000, min: 100000, max: 100000000, step: 100000, unit: 'requests' },
        { id: 'cache-hit-rate', name: 'Cache Hit Rate', description: 'Current cache hit rate', value: 65, min: 30, max: 90, step: 5, unit: '%' },
        { id: 'improvement-rate', name: 'Improvement %', description: 'Cache hit improvement', value: 25, min: 10, max: 50, step: 5, unit: '%' }
      ],
      baseValue: 195000,
      currentValue: 195000,
      minValue: 9750,
      maxValue: 48750000,
      unit: currency,
      impact: 3.5,
      roi: 7.2,
      implementationTime: 5,
      implementationCost: 27000,
      annualSaving: 195000
    }
  ];

  // Complete categories array with features
  const categories: CostSavingCategory[] = [
    {
      id: 'operational',
      name: 'Operational Cost Savings',
      description: 'AI-driven automation and workforce optimization',
      icon: Cpu,
      color: 'from-blue-600 to-cyan-500',
      baseSaving: 125000,
      maxSaving: 350000,
      confidence: 85,
      features: operationalFeatures
    },
    {
      id: 'catalog',
      name: 'Catalog Optimization',
      description: 'SKU management and content quality improvements',
      icon: Package,
      color: 'from-purple-600 to-pink-500',
      baseSaving: 85000,
      maxSaving: 220000,
      confidence: 80,
      features: catalogFeatures
    },
    {
      id: 'returns',
      name: 'Return Rate Reduction',
      description: 'Reducing product returns through AI recommendations',
      icon: RefreshCw,
      color: 'from-green-600 to-emerald-500',
      baseSaving: 150000,
      maxSaving: 420000,
      confidence: 75,
      features: returnFeatures
    },
    {
      id: 'marketing',
      name: 'Marketing & Advertising',
      description: 'AI-optimized campaigns and copy generation',
      icon: Target,
      color: 'from-orange-600 to-yellow-500',
      baseSaving: 95000,
      maxSaving: 280000,
      confidence: 82,
      features: marketingFeatures
    },
    {
      id: 'inventory',
      name: 'Inventory & Supply Chain',
      description: 'Demand forecasting and logistics optimization',
      icon: Truck,
      color: 'from-red-600 to-rose-500',
      baseSaving: 110000,
      maxSaving: 310000,
      confidence: 78,
      features: inventoryFeatures
    },
    {
      id: 'pricing',
      name: 'Dynamic Pricing',
      description: 'Revenue optimization through smart pricing',
      icon: DollarSign,
      color: 'from-indigo-600 to-violet-500',
      baseSaving: 75000,
      maxSaving: 190000,
      confidence: 70,
      features: pricingFeatures
    },
    {
      id: 'clv',
      name: 'Customer Lifetime Value',
      description: 'Retention and win-back optimization',
      icon: Users,
      color: 'from-cyan-600 to-blue-500',
      baseSaving: 65000,
      maxSaving: 170000,
      confidence: 73,
      features: clvFeatures
    },
    {
      id: 'recommendations',
      name: 'Recommendation Engine',
      description: 'Cross-sell and upsell optimization',
      icon: TrendingUp,
      color: 'from-pink-600 to-rose-500',
      baseSaving: 55000,
      maxSaving: 140000,
      confidence: 77,
      features: recommendationFeatures
    },
    {
      id: 'search',
      name: 'Search & Discovery',
      description: 'Search abandonment and query optimization',
      icon: Search,
      color: 'from-amber-600 to-orange-500',
      baseSaving: 45000,
      maxSaving: 120000,
      confidence: 74,
      features: searchFeatures
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure Efficiency',
      description: 'Computational and caching optimizations',
      icon: Server,
      color: 'from-gray-600 to-slate-500',
      baseSaving: 35000,
      maxSaving: 90000,
      confidence: 85,
      features: infrastructureFeatures
    }
  ];

  // Calculate total savings across all categories
  const calculateTotalSavings = (): number => {
    const savings = {
      operational: calculateOperationalSavings(),
      catalog: calculateCatalogSavings(),
      returns: calculateReturnSavings(),
      marketing: calculateMarketingSavings(),
      inventory: calculateInventorySavings(),
      pricing: calculatePricingSavings(),
      clv: calculateCLVSavings(),
      recommendations: calculateRecommendationSavings(),
      search: calculateSearchSavings(),
      infrastructure: calculateInfrastructureSavings()
    };
    
    return Object.values(savings).reduce((total, saving) => total + saving, 0);
  };

  // Generate ROI timeline data
  const generateROITimeline = (): TimelinePoint[] => {
    const timeline: TimelinePoint[] = [];
    const totalSavings = calculateTotalSavings();
    const monthlySavings = totalSavings / 12;
    const totalInvestment = categories.reduce((sum, category) => {
      return sum + category.features.reduce((s, feature) => s + feature.implementationCost, 0);
    }, 0) * 0.7; // 70% of implementation costs
    
    let cumulative = -totalInvestment;
    
    for (let month = 0; month <= timeHorizon; month++) {
      if (month > 0) {
        cumulative += monthlySavings * Math.min(1, month / 6); // Ramp-up period
      }
      
      timeline.push({
        month,
        savings: month > 0 ? monthlySavings * Math.min(1, month / 6) : 0,
        cumulative,
        investment: month === 0 ? totalInvestment : 0,
        roi: cumulative / totalInvestment
      });
    }
    
    return timeline;
  };

  // Generate savings breakdown data
  const generateSavingsBreakdown = () => {
    const savings = {
      operational: calculateOperationalSavings(),
      catalog: calculateCatalogSavings(),
      returns: calculateReturnSavings(),
      marketing: calculateMarketingSavings(),
      inventory: calculateInventorySavings(),
      pricing: calculatePricingSavings(),
      clv: calculateCLVSavings(),
      recommendations: calculateRecommendationSavings(),
      search: calculateSearchSavings(),
      infrastructure: calculateInfrastructureSavings()
    };
    
    return Object.entries(savings).map(([key, value]) => ({
      name: categories.find(c => c.id === key)?.name || key,
      value,
      color: categories.find(c => c.id === key)?.color.split(' ')[0].replace('from-', '') || 'gray'
    }));
  };

  // Generate simulation results
  const generateSimulationResults = (): SimulationResult[] => {
    const baseSavings = calculateTotalSavings();
    
    return [
      {
        scenario: 'Conservative',
        totalSavings: baseSavings * 0.7,
        roi: 2.8,
        paybackMonths: 18,
        confidence: 75
      },
      {
        scenario: 'Moderate',
        totalSavings: baseSavings,
        roi: 4.2,
        paybackMonths: 12,
        confidence: 85
      },
      {
        scenario: 'Aggressive',
        totalSavings: baseSavings * 1.3,
        roi: 5.8,
        paybackMonths: 8,
        confidence: 65
      }
    ];
  };

  // Render category details
  const renderCategoryDetails = () => {
    const category = categories.find(c => c.id === activeCategory);
    if (!category) return null;

    const savings = {
      operational: calculateOperationalSavings(),
      catalog: calculateCatalogSavings(),
      returns: calculateReturnSavings(),
      marketing: calculateMarketingSavings(),
      inventory: calculateInventorySavings(),
      pricing: calculatePricingSavings(),
      clv: calculateCLVSavings(),
      recommendations: calculateRecommendationSavings(),
      search: calculateSearchSavings(),
      infrastructure: calculateInfrastructureSavings()
    }[activeCategory];

    return (
      <div className="bg-gray-800/30 rounded-2xl border border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
              <category.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{category.name}</h2>
              <p className="text-gray-400">{category.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">
              {currency === 'USD' && '$'}
              {currency === 'EUR' && '€'}
              {currency === 'GBP' && '£'}
              {currency === 'JPY' && '¥'}
              {savings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Annual Savings</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Key Drivers</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Company Size Impact</span>
                    <span className="font-semibold">
                      {companySize.charAt(0).toUpperCase() + companySize.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      style={{ width: `${{
                        small: 25,
                        medium: 50,
                        large: 75,
                        enterprise: 100
                      }[companySize]}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Scale Factor</span>
                    <span className="font-semibold">
                      {activeCategory === 'operational' && 'Team Size'}
                      {activeCategory === 'catalog' && 'SKU Count'}
                      {activeCategory === 'returns' && 'Revenue × Return Rate'}
                      {activeCategory === 'marketing' && 'Traffic × Conversion'}
                      {activeCategory === 'inventory' && '√SKU Count'}
                      {activeCategory === 'pricing' && 'Revenue'}
                      {activeCategory === 'clv' && 'Traffic'}
                      {activeCategory === 'recommendations' && 'Conversion × AOV'}
                      {activeCategory === 'search' && 'Traffic'}
                      {activeCategory === 'infrastructure' && 'log(Traffic)'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      style={{ width: `${Math.min((
                        activeCategory === 'operational' ? (teamSize / 200) * 100 :
                        activeCategory === 'catalog' ? (skuCount / 50000) * 100 :
                        activeCategory === 'returns' ? (annualRevenue * currentReturnRate / 5000000) * 100 :
                        activeCategory === 'marketing' ? (monthlyTraffic * currentConversionRate / 250000) * 100 :
                        activeCategory === 'inventory' ? (Math.sqrt(skuCount / 5000) * 100) :
                        activeCategory === 'pricing' ? (annualRevenue / 20000000) * 100 :
                        activeCategory === 'clv' ? (monthlyTraffic / 500000) * 100 :
                        activeCategory === 'recommendations' ? (currentConversionRate * currentAOV / 500) * 100 :
                        activeCategory === 'search' ? (monthlyTraffic / 500000) * 100 :
                        activeCategory === 'infrastructure' ? (Math.log10(monthlyTraffic / 1000) * 20) : 50
                      ), 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Improvement Potential</span>
                    <span className="font-semibold">
                      {activeCategory === 'operational' && '85%'}
                      {activeCategory === 'catalog' && '40%'}
                      {activeCategory === 'returns' && '45%'}
                      {activeCategory === 'marketing' && '28%'}
                      {activeCategory === 'inventory' && '25%'}
                      {activeCategory === 'pricing' && '18%'}
                      {activeCategory === 'clv' && '30%'}
                      {activeCategory === 'recommendations' && '32%'}
                      {activeCategory === 'search' && '25%'}
                      {activeCategory === 'infrastructure' && '40%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${
                        activeCategory === 'operational' ? 85 :
                        activeCategory === 'catalog' ? 40 :
                        activeCategory === 'returns' ? 45 :
                        activeCategory === 'marketing' ? 28 :
                        activeCategory === 'inventory' ? 25 :
                        activeCategory === 'pricing' ? 18 :
                        activeCategory === 'clv' ? 30 :
                        activeCategory === 'recommendations' ? 32 :
                        activeCategory === 'search' ? 25 :
                        activeCategory === 'infrastructure' ? 40 : 0
                      }%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Implementation Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Time to Implement</span>
                  <span className="text-white font-semibold">
                    {activeCategory === 'operational' && '8-12 weeks'}
                    {activeCategory === 'catalog' && '6-8 weeks'}
                    {activeCategory === 'returns' && '12-16 weeks'}
                    {activeCategory === 'marketing' && '8-10 weeks'}
                    {activeCategory === 'inventory' && '10-14 weeks'}
                    {activeCategory === 'pricing' && '6-8 weeks'}
                    {activeCategory === 'clv' && '12-16 weeks'}
                    {activeCategory === 'recommendations' && '8-12 weeks'}
                    {activeCategory === 'search' && '6-8 weeks'}
                    {activeCategory === 'infrastructure' && '4-6 weeks'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ROI Multiplier</span>
                  <span className="text-green-400 font-semibold">
                    {activeCategory === 'operational' && '3.8x'}
                    {activeCategory === 'catalog' && '4.2x'}
                    {activeCategory === 'returns' && '4.5x'}
                    {activeCategory === 'marketing' && '3.5x'}
                    {activeCategory === 'inventory' && '3.2x'}
                    {activeCategory === 'pricing' && '4.8x'}
                    {activeCategory === 'clv' && '4.0x'}
                    {activeCategory === 'recommendations' && '3.9x'}
                    {activeCategory === 'search' && '3.7x'}
                    {activeCategory === 'infrastructure' && '5.2x'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Confidence Level</span>
                  <span className="text-blue-400 font-semibold">{category.confidence}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Advanced Metrics</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Monthly Impact</div>
                    <div className="text-2xl font-bold text-white">
                      {currency === 'USD' && '$'}
                      {currency === 'EUR' && '€'}
                      {currency === 'GBP' && '£'}
                      {currency === 'JPY' && '¥'}
                      {(savings / 12).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">% of Revenue</div>
                    <div className="text-2xl font-bold text-green-400">
                      {((savings / annualRevenue) * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">Algorithm Complexity</div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                        style={{ width: `${category.confidence}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-white">{category.confidence}/100</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
              <div className="space-y-2">
                {category.features.map(feature => (
                  <div key={feature.id} className="flex justify-between items-center p-2 hover:bg-gray-800/50 rounded">
                    <div>
                      <div className="text-sm text-white">{feature.name}</div>
                      <div className="text-xs text-gray-400">{feature.description}</div>
                    </div>
                    <div className="text-sm font-semibold text-green-400">
                      {currency === 'USD' && '$'}
                      {currency === 'EUR' && '€'}
                      {currency === 'GBP' && '£'}
                      {currency === 'JPY' && '¥'}
                      {feature.annualSaving.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render simulation comparison
  const renderSimulationComparison = () => {
    const results = generateSimulationResults();
    
    return (
      <div className="bg-gray-800/30 rounded-2xl border border-gray-700 p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Scenario Simulation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <div 
              key={result.scenario}
              className={`rounded-xl p-6 border-2 ${
                simulationMode === result.scenario.toLowerCase() 
                  ? 'border-blue-500 bg-blue-900/20' 
                  : 'border-gray-700 bg-gray-900/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  index === 0 ? 'bg-yellow-900/50 text-yellow-300' :
                  index === 1 ? 'bg-green-900/50 text-green-300' :
                  'bg-red-900/50 text-red-300'
                }`}>
                  {result.scenario}
                </div>
                <div className="text-sm text-gray-400">{result.confidence}% confidence</div>
              </div>
              
              <div className="text-2xl font-bold text-white mb-2">
                {currency === 'USD' && '$'}
                {currency === 'EUR' && '€'}
                {currency === 'GBP' && '£'}
                {currency === 'JPY' && '¥'}
                {(result.totalSavings / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-400 mb-4">Annual Savings</div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">ROI</span>
                  <span className="text-green-400 font-semibold">{result.roi.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payback</span>
                  <span className="text-blue-400 font-semibold">{result.paybackMonths} months</span>
                </div>
              </div>
              
              <button
                onClick={() => setSimulationMode(result.scenario.toLowerCase() as any)}
                className={`w-full mt-4 py-2 rounded-lg font-medium transition-all ${
                  simulationMode === result.scenario.toLowerCase()
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {simulationMode === result.scenario.toLowerCase() ? 'Selected' : 'Select Scenario'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render ROI timeline chart
  const renderROITimelineChart = () => {
    const timelineData = generateROITimeline();
    const breakeven = timelineData.find(point => point.cumulative >= 0);
    
    return (
      <div className="bg-gray-800/30 rounded-2xl border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-6">ROI Timeline Projection</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timelineData}>
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
                label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <RechartsTooltip 
                formatter={(value, name) => {
                  if (name === 'cumulative') return [`$${Number(value).toLocaleString()}`, 'Cumulative ROI'];
                  if (name === 'savings') return [`$${Number(value).toLocaleString()}`, 'Monthly Savings'];
                  return [value, name];
                }}
                labelFormatter={(label) => `Month ${label}`}
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #4B5563',
                  borderRadius: '8px'
                }}
              />
              <RechartsBar 
                dataKey="savings" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                opacity={0.6}
              />
              <RechartsLine 
                type="monotone" 
                dataKey="cumulative" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              {breakeven && (
                <ReferenceLine 
                  x={breakeven.month} 
                  stroke="#EF4444" 
                  strokeDasharray="3 3"
                  label={{ 
                    value: 'Breakeven', 
                    position: 'top', 
                    fill: '#EF4444',
                    fontSize: 12 
                  }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {breakeven && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-300">Breakeven achieved in Month {breakeven.month}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render savings breakdown chart
  const renderSavingsBreakdownChart = () => {
    const breakdownData = generateSavingsBreakdown();
    
    return (
      <div className="bg-gray-800/30 rounded-2xl border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Savings Breakdown</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={(entry) => `${entry.name}: ${((entry.value / calculateTotalSavings()) * 100).toFixed(1)}%`}
              >
                {breakdownData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#color-${index})`} 
                  />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Annual Savings']}
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #4B5563',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Render industry benchmarks
  const renderIndustryBenchmarks = () => {
    return (
      <div className="bg-gray-800/30 rounded-2xl border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Industry Benchmarks</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Industry</th>
                <th className="text-left py-3 px-4 text-gray-400">Operational</th>
                <th className="text-left py-3 px-4 text-gray-400">Catalog</th>
                <th className="text-left py-3 px-4 text-gray-400">Returns</th>
                <th className="text-left py-3 px-4 text-gray-400">Marketing</th>
                <th className="text-left py-3 px-4 text-gray-400">Inventory</th>
              </tr>
            </thead>
            <tbody>
              {industryBenchmarks.map((benchmark, index) => (
                <tr key={benchmark.name} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-3 px-4 font-medium text-white">{benchmark.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          style={{ width: `${benchmark.operational}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{benchmark.operational}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${benchmark.catalog}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{benchmark.catalog}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${benchmark.returns}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{benchmark.returns}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
                          style={{ width: `${benchmark.marketing}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{benchmark.marketing}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
                          style={{ width: `${benchmark.inventory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{benchmark.inventory}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Calculate totals
  const totalSavings = calculateTotalSavings();
  const monthlySavings = totalSavings / 12;
  const totalInvestment = categories.reduce((sum, category) => {
    return sum + category.features.reduce((s, feature) => s + feature.implementationCost, 0);
  }, 0) * 0.7;
  const roi = ((totalSavings - totalInvestment) / totalInvestment) * 100;
  const paybackMonths = totalInvestment / monthlySavings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Advanced AI Cost Saving Calculator
                </h1>
                <p className="text-sm text-gray-400">Enterprise-Grade Financial Optimization Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-sm font-medium transition-all flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share Analysis</span>
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <div className="mb-8 bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Business Configuration</h2>
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showAdvanced ? 'Hide Advanced' : 'Show Advanced'}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Company Size */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Company Size</label>
              <div className="flex space-x-1">
                {['small', 'medium', 'large', 'enterprise'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setCompanySize(size as any)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      companySize === size
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Revenue */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Annual Revenue
              </label>
              <div className="flex items-center space-x-2">
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="bg-gray-700 text-white px-2 py-1.5 rounded-md text-sm"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
                <input
                  type="number"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                  className="flex-1 bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm"
                  min="10000"
                  step="10000"
                />
              </div>
            </div>

            {/* Monthly Traffic */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Monthly Traffic
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={monthlyTraffic}
                  onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                  className="flex-1 bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm"
                  min="1000"
                  step="1000"
                />
                <span className="ml-2 text-sm text-gray-400">visitors</span>
              </div>
            </div>

            {/* SKU Count */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SKU Count
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={skuCount}
                  onChange={(e) => setSkuCount(Number(e.target.value))}
                  className="flex-1 bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm"
                  min="100"
                  step="100"
                />
                <span className="ml-2 text-sm text-gray-400">products</span>
              </div>
            </div>
          </div>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-800">
              {/* Team Size */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Size
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="flex-1 bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm"
                    min="1"
                    step="1"
                  />
                  <span className="ml-2 text-sm text-gray-400">people</span>
                </div>
              </div>

              {/* Return Rate */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Return Rate
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={currentReturnRate}
                    onChange={(e) => setCurrentReturnRate(Number(e.target.value))}
                    className="flex-1 bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="ml-2 text-sm text-gray-400">%</span>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Conversion Rate
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={currentConversionRate}
                    onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                    className="flex-1 bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm"
                    min="0.1"
                    max="10"
                    step="0.1"
                  />
                  <span className="ml-2 text-sm text-gray-400">%</span>
                </div>
              </div>

              {/* AOV */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Average Order Value
                </label>
                <div className="flex items-center">
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="bg-gray-700 text-white px-2 py-1.5 rounded-md text-sm mr-2"
                  >
                    <option value="USD">$</option>
                    <option value="EUR">€</option>
                    <option value="GBP">£</option>
                    <option value="JPY">¥</option>
                  </select>
                  <input
                    type="number"
                    value={currentAOV}
                    onChange={(e) => setCurrentAOV(Number(e.target.value))}
                    className="flex-1 bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm"
                    min="10"
                    step="1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-800/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-blue-400" />
              <div className="px-3 py-1 bg-blue-900/50 rounded-full">
                <span className="text-sm font-medium text-blue-300">Annual</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {currency === 'USD' && '$'}
              {currency === 'EUR' && '€'}
              {currency === 'GBP' && '£'}
              {currency === 'JPY' && '¥'}
              {(totalSavings / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-400">Total Annual Savings</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-800/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div className="px-3 py-1 bg-green-900/50 rounded-full">
                <span className="text-sm font-medium text-green-300">{roi.toFixed(1)}%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {roi.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Return on Investment</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-800/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-purple-400" />
              <div className="px-3 py-1 bg-purple-900/50 rounded-full">
                <span className="text-sm font-medium text-purple-300">{paybackMonths.toFixed(1)} mo</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {paybackMonths.toFixed(1)} mo
            </div>
            <div className="text-sm text-gray-400">Payback Period</div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-2xl border border-amber-800/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-amber-400" />
              <div className="px-3 py-1 bg-amber-900/50 rounded-full">
                <span className="text-sm font-medium text-amber-300">{confidenceLevel}%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {confidenceLevel}%
            </div>
            <div className="text-sm text-gray-400">Confidence Level</div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Select Cost Saving Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const savings = {
                operational: calculateOperationalSavings(),
                catalog: calculateCatalogSavings(),
                returns: calculateReturnSavings(),
                marketing: calculateMarketingSavings(),
                inventory: calculateInventorySavings(),
                pricing: calculatePricingSavings(),
                clv: calculateCLVSavings(),
                recommendations: calculateRecommendationSavings(),
                search: calculateSearchSavings(),
                infrastructure: calculateInfrastructureSavings()
              }[category.id];
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-4 rounded-xl border transition-all transform hover:scale-[1.02] ${
                    activeCategory === category.id
                      ? `border-transparent bg-gradient-to-br ${category.color}`
                      : 'border-gray-700 bg-gray-900/50 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Icon className={`w-8 h-8 ${
                      activeCategory === category.id ? 'text-white' : 'text-gray-400'
                    }`} />
                    <div>
                      <div className={`font-semibold text-sm ${
                        activeCategory === category.id ? 'text-white' : 'text-gray-300'
                      }`}>
                        {category.name.split(' ')[0]}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {currency === 'USD' && '$'}
                        {currency === 'EUR' && '€'}
                        {currency === 'GBP' && '£'}
                        {currency === 'JPY' && '¥'}
                        {(savings / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Details */}
        <div className="mb-8">
          {renderCategoryDetails()}
        </div>

        {/* Simulation Comparison */}
        {renderSimulationComparison()}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {renderROITimelineChart()}
          {renderSavingsBreakdownChart()}
        </div>

        {/* Industry Benchmarks */}
        {renderIndustryBenchmarks()}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-medium transition-all flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Generate Detailed Report</span>
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download CSV Data</span>
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-medium transition-all flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Analysis</span>
          </button>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Customize Calculations</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Advanced AI Cost Saving Calculator • Powered by Machine Learning Algorithms • Real-time Analytics</p>
            <p className="mt-2">
              Using advanced mathematical models including Monte Carlo simulations, logistic growth functions, and exponential decay algorithms
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdvancedCostSavingCalculator;