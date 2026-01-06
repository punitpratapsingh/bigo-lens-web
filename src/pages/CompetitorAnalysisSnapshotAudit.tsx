import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MUIGrid from '@mui/material/Grid';
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tooltip,
  CircularProgress,
  Badge,
  Rating,
  Switch,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert as MuiAlert,
  Fab,
  Zoom,
  Fade,
  Slide
} from '@mui/material';

// Backwards-compatible Grid wrapper: maps `size={{ xs, sm, md, lg }}`
// to the MUI Grid props (xs, sm, md, lg) so older file markup keeps working.
const Grid: React.FC<any> = (props) => {
  const { size, ...rest } = props as any;
  const mapped: any = { ...rest };
  if (size && typeof size === 'object') {
    if (size.xs !== undefined) mapped.xs = size.xs;
    if (size.sm !== undefined) mapped.sm = size.sm;
    if (size.md !== undefined) mapped.md = size.md;
    if (size.lg !== undefined) mapped.lg = size.lg;
  }
  return <MUIGrid {...mapped} />;
};
import {
  ExpandMore,
  CheckCircle,
  Warning,
  Error,
  Info,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  ShoppingCart,
  Search,
  LocalShipping,
  Star,
  Share,
  Build,
  Lightbulb,
  Download,
  Refresh,
  CompareArrows,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline,
  AttachMoney,
  Tag,
  Category,
  Palette,
  Speed,
  Security,
  ThumbUp,
  ThumbDown,
  Visibility,
  VisibilityOff,
  ArrowForward,
  AddCircle,
  RemoveCircle,
  DataArray,
  AutoGraph,
  Psychology,
  RocketLaunch,
  Insights,
  Dashboard,
  TableView,
  GridView,
  FilterList,
  Sort,
  MoreVert,
  ExpandCircleDown,
  ChevronRight,
  Computer,
  Smartphone,
  Store,
  Public,
  Analytics,
  Cloud,
  Api,
  IntegrationInstructions,
  Code,
  Terminal,
  DataObject,
  Dataset,
  Schema,
  Polyline,
  Hub,
  Link,
  NetworkPing,
  PsychologyAlt,
  ModelTraining,
  AutoFixHigh,
  Assistant,
  Chat,
  SupportAgent,
  ConnectedTv,
  CameraAlt,
  FaceRetouchingNatural,
  Style,
  Checkroom,
  PaletteOutlined,
  ColorLens,
  Gradient,
  Contrast,
  Texture,
  Pattern,
  Looks,
  DesignServices,
  Brush,
  Draw,
  Architecture,
  Engineering,
  PrecisionManufacturing,
  Handyman,
  BuildCircle,
  Devices,
  ImportantDevices,
  DeviceHub,
  Sensors,
  SensorOccupied,
  Radar as RadarIcon,
  QrCode,
  Biotech,
  Memory,
  Storage,
  SdStorage,
  SdCard,
  SimCard,
  SsidChart,
  AccountTree,
  ForkRight,
  ForkLeft,
  Merge,
  AccountTreeOutlined,
  SchemaOutlined,
  PolylineOutlined,
  HubOutlined,
  ExpandLess,
  KeyboardArrowDown,
  KeyboardArrowUp,
  OpenInNew,
  ContentCopy,
  Save,
  Print,
  Share as ShareIcon,
  Notifications,
  Settings,
  Help,
  Menu,
  Close,
  ArrowBack,
  ArrowDropDown,
  ArrowDropUp,
  Done,
  Cancel,
  Edit,
  Delete,
  Add,
  Remove,
  PlayArrow,
  Pause,
  Stop,
  SkipNext,
  SkipPrevious,
  FastForward,
  FastRewind,
  VolumeUp,
  VolumeOff,
  Mic,
  Headset,
  Videocam,
  PhotoCamera,
  Image as ImageIcon,
  Slideshow,
  Theaters,
  MusicNote,
  GraphicEq,
  Equalizer,
  Tune,
  FilterCenterFocus,
  Crop,
  RotateLeft,
  RotateRight,
  Flip,
  Colorize,
  Brush as BrushIcon,
  FormatPaint,
  FormatColorFill,
  FormatSize,
  Title as TitleIcon,
  TextFields,
  Notes,
  ShortText,
  Subject,
  LineWeight,
  BorderAll,
  BorderClear,
  BorderOuter,
  BorderInner,
  BorderTop,
  BorderBottom,
  BorderLeft,
  BorderRight,
  BorderVertical,
  BorderHorizontal,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatColorText,
  FormatListBulleted,
  FormatListNumbered,
  FormatIndentIncrease,
  FormatIndentDecrease,
  FormatLineSpacing,
  FormatClear,
  FormatQuote,
  FormatShapes,
  Functions,
  Subscript,
  Superscript,
  WrapText,
  Link as LinkIcon,
  InsertLink,
  InsertPhoto,
  InsertChart,
  InsertDriveFile,
  InsertEmoticon,
  AttachFile,
  CloudUpload,
  CloudDownload,
  CloudDone,
  CloudOff,
  Folder,
  FolderOpen,
  CreateNewFolder,
  DriveFileMove,
  FileCopy,
  Description,
  FolderShared,
  GridOn,
  GridOff,
  ViewModule,
  ViewStream,
  ViewDay,
  ViewWeek,
  ViewAgenda,
  ViewCarousel,
  ViewColumn,
  ViewComfy,
  ViewCompact,
  ViewHeadline,
  ViewList,
  ViewQuilt
} from '@mui/icons-material';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

// Types and Interfaces
interface Competitor {
  id: string;
  name: string;
  url: string;
  marketShare: number;
  traffic: number;
  monthlyVisits: number;
  alexaRank: number;
  platform: string;
  founded: number;
  employees: number;
  headquarters: string;
  rating: number;
  logoColor: string;
}

interface SKUAnalysis {
  competitorId: string;
  totalSKUs: number;
  categories: Array<{
    name: string;
    count: number;
    yourCount: number;
    gap: number;
  }>;
  styleVariety: number;
  colorVariety: number;
  fitVariety: number;
  newArrivalsLast30Days: number;
  averageProductImages: number;
  categoryCoverage: number;
}

interface PriceAnalysis {
  competitorId: string;
  categoryPrices: Array<{
    category: string;
    avgPrice: number;
    yourAvgPrice: number;
    difference: number;
    discountFrequency: number;
    priceCompetitiveness: 'high' | 'medium' | 'low';
  }>;
  bestsellerPriceCluster: Array<{
    priceRange: string;
    count: number;
    yourCount: number;
    marketShare: number;
  }>;
  markupTrend: 'increasing' | 'decreasing' | 'stable';
  priceElasticity: number;
  dynamicPricing: boolean;
}

interface SEOAnalysis {
  competitorId: string;
  metaTitleLength: number;
  metaDescriptionLength: number;
  keywordDensity: number;
  h1Optimization: number;
  h2Optimization: number;
  longTailOpportunities: string[];
  topRankingKeywords: Array<{
    keyword: string;
    position: number;
    volume: number;
    difficulty: number;
    opportunityScore: number;
  }>;
  backlinkCount: number;
  domainAuthority: number;
}

interface ContentAnalysis {
  competitorId: string;
  imageQuality: 'high' | 'medium' | 'low';
  imagesPerProduct: number;
  lifestylePhotoRatio: number;
  videoUsage: boolean;
  videoCount: number;
  attributeCompleteness: number;
  descriptionLength: number;
  readabilityScore: number;
  taggingAccuracy: number;
  missingTags: string[];
  contentScore: number;
}

interface SearchAnalysis {
  competitorId: string;
  searchRelevancy: number;
  filters: string[];
  missingFilters: string[];
  personalization: boolean;
  autoSuggestions: string[];
  rankingPatterns: Array<{
    factor: string;
    weight: number;
    yourScore: number;
    competitorScore: number;
  }>;
  searchAbandonmentRisk: number;
}

interface AITechnologyAnalysis {
  competitorId: string;
  visualSearch: boolean;
  virtualTryOn: boolean;
  aiPersonalization: boolean;
  aiRecommendations: boolean;
  arPreview: boolean;
  aiStylingTools: boolean;
  chatShopping: boolean;
  aiAdoptionScore: number;
  techStack: string[];
}

interface FunnelAnalysis {
  competitorId: string;
  pdpPerformance: number;
  addToCartSteps: number;
  checkoutSteps: number;
  paymentMethods: string[];
  trustSignals: string[];
  pageLoadSpeed: number;
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
  conversionRate: number;
  cartAbandonmentRate: number;
}

interface ShippingAnalysis {
  competitorId: string;
  deliverySpeed: number;
  shippingCost: number;
  freeShippingThreshold: number | null;
  returnPeriod: number;
  returnEase: 'easy' | 'medium' | 'hard';
  refundPolicy: 'refund' | 'exchange' | 'both';
  packagingScore: number;
  sustainabilityScore: number;
}

interface ReviewAnalysis {
  competitorId: string;
  avgRating: number;
  reviewCount: number;
  positiveThemes: string[];
  negativeThemes: string[];
  commonComplaints: string[];
  imageReviews: boolean;
  sentimentScore: number;
  responseRate: number;
}

interface SocialAnalysis {
  competitorId: string;
  instagram: {
    followers: number;
    engagement: number;
    posts: number;
    growthRate: number;
  };
  tiktok: {
    followers: number;
    engagement: number;
    videos: number;
    growthRate: number;
  };
  youtube: {
    subscribers: number;
    engagement: number;
    videos: number;
    growthRate: number;
  };
  influencerCollabs: number;
  contentQuality: 'high' | 'medium' | 'low';
  trendAdoption: 'fast' | 'medium' | 'slow';
  socialMomentum: number;
}

interface TechStackAnalysis {
  competitorId: string;
  cms: string;
  ecommercePlatform: string;
  aiModules: string[];
  analyticsTools: string[];
  reviewSystem: string;
  recommendationEngine: string;
  loyaltySystem: string;
  paymentProcessors: string[];
}

interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  overallScore: number;
}

interface GapExploitationPlan {
  featuresToAdd: Array<{name: string, impact: number, effort: number, priority: number}>;
  categoriesToExpand: Array<{name: string, opportunity: number, competition: number, priority: number}>;
  pricingAdjustments: Array<{category: string, adjustment: string, impact: number, priority: number}>;
  seoOpportunities: Array<{keyword: string, volume: number, difficulty: number, priority: number}>;
  catalogFixes: Array<{issue: string, fix: string, impact: number, priority: number}>;
  aiTechnologies: Array<{technology: string, adoptionRate: number, roi: number, priority: number}>;
  conversionBoosters: Array<{action: string, expectedImpact: number, effort: number, priority: number}>;
}

interface AuditState {
  selectedCompetitors: string[];
  analysisDate: Date;
  isLoading: boolean;
  progress: number;
  activeTab: number;
  exportFormat: 'pdf' | 'excel' | 'json' | 'csv';
  aiInsights: boolean;
  realTimeUpdates: boolean;
  compareMode: 'grid' | 'detail' | 'radar';
  timeRange: '7d' | '30d' | '90d' | '1y';
}

// Mock Data Generators
const generateCompetitors = (): Competitor[] => [
  { id: 'comp1', name: 'FashionForward', url: 'fashionforward.com', marketShare: 35, traffic: 8500000, monthlyVisits: 12500000, alexaRank: 1250, platform: 'Shopify Plus', founded: 2015, employees: 250, headquarters: 'San Francisco, CA', rating: 4.5, logoColor: '#FF6B6B' },
  { id: 'comp2', name: 'StyleHaven', url: 'stylehaven.com', marketShare: 28, traffic: 7200000, monthlyVisits: 9800000, alexaRank: 1850, platform: 'Magento', founded: 2012, employees: 180, headquarters: 'New York, NY', rating: 4.3, logoColor: '#4ECDC4' },
  { id: 'comp3', name: 'UrbanThreads', url: 'urbanthreads.com', marketShare: 22, traffic: 5800000, monthlyVisits: 8200000, alexaRank: 2450, platform: 'Custom React', founded: 2018, employees: 120, headquarters: 'Austin, TX', rating: 4.7, logoColor: '#45B7D1' },
  { id: 'comp4', name: 'EliteWear', url: 'elitewear.com', marketShare: 15, traffic: 4200000, monthlyVisits: 6500000, alexaRank: 3200, platform: 'BigCommerce', founded: 2010, employees: 95, headquarters: 'Miami, FL', rating: 4.2, logoColor: '#96CEB4' },
];

const generateSKUAnalysis = (competitorId: string): SKUAnalysis => ({
  competitorId,
  totalSKUs: faker.number.int({ min: 5000, max: 25000 }),
  categories: Array.from({ length: 12 }, (_, i) => ({
    name: faker.commerce.department(),
    count: faker.number.int({ min: 100, max: 2000 }),
    yourCount: faker.number.int({ min: 50, max: 1500 }),
    gap: faker.number.int({ min: -500, max: 500 })
  })),
  styleVariety: faker.number.int({ min: 10, max: 100 }),
  colorVariety: faker.number.int({ min: 5, max: 50 }),
  fitVariety: faker.number.int({ min: 3, max: 20 }),
  newArrivalsLast30Days: faker.number.int({ min: 100, max: 1000 }),
  averageProductImages: faker.number.float({ min: 3, max: 8, multipleOf: 0.1 }),
  categoryCoverage: faker.number.float({ min: 0.6, max: 0.95, multipleOf: 0.01 })
});

const generatePriceAnalysis = (competitorId: string): PriceAnalysis => ({
  competitorId,
  categoryPrices: Array.from({ length: 8 }, (_, i) => ({
    category: faker.commerce.department(),
    avgPrice: faker.number.float({ min: 25, max: 250, multipleOf: 0.01 }),
    yourAvgPrice: faker.number.float({ min: 20, max: 280, multipleOf: 0.01 }),
    difference: faker.number.float({ min: -50, max: 50, multipleOf: 0.01 }),
    discountFrequency: faker.number.float({ min: 0.1, max: 0.5, multipleOf: 0.01 }),
    priceCompetitiveness: faker.helpers.arrayElement(['high', 'medium', 'low'])
  })),
  bestsellerPriceCluster: [
    { priceRange: '$0-50', count: faker.number.int({ min: 100, max: 500 }), yourCount: faker.number.int({ min: 80, max: 400 }), marketShare: 0.25 },
    { priceRange: '$51-100', count: faker.number.int({ min: 200, max: 800 }), yourCount: faker.number.int({ min: 150, max: 600 }), marketShare: 0.45 },
    { priceRange: '$101-200', count: faker.number.int({ min: 150, max: 400 }), yourCount: faker.number.int({ min: 100, max: 300 }), marketShare: 0.20 },
    { priceRange: '$201+', count: faker.number.int({ min: 50, max: 200 }), yourCount: faker.number.int({ min: 30, max: 150 }), marketShare: 0.10 },
  ],
  markupTrend: faker.helpers.arrayElement(['increasing', 'decreasing', 'stable']),
  priceElasticity: faker.number.float({ min: 0.5, max: 2.5, multipleOf: 0.1 }),
  dynamicPricing: faker.datatype.boolean()
});

// Main Component
const CompetitorAnalysisSnapshotAudit: React.FC = () => {
  const [competitors] = useState<Competitor[]>(generateCompetitors());
  const [auditState, setAuditState] = useState<AuditState>({
    selectedCompetitors: ['comp1', 'comp2', 'comp3'],
    analysisDate: new Date(),
    isLoading: false,
    progress: 0,
    activeTab: 0,
    exportFormat: 'pdf',
    aiInsights: true,
    realTimeUpdates: true,
    compareMode: 'grid',
    timeRange: '30d'
  });

  const [skuAnalysis, setSkuAnalysis] = useState<Record<string, SKUAnalysis>>({});
  const [priceAnalysis, setPriceAnalysis] = useState<Record<string, PriceAnalysis>>({});
  const [swot, setSwot] = useState<SWOT>({
    strengths: [
      'Strong brand recognition in target demographic (25-45 age group)',
      'Superior product quality and premium materials',
      'Excellent customer service ratings (4.8/5)',
      'Innovative sustainable practices and eco-friendly packaging',
      'High customer loyalty with 45% repeat purchase rate'
    ],
    weaknesses: [
      'Limited category coverage compared to competitors (28% gap in athleisure)',
      'Higher price points in key categories (15-20% above market average)',
      'Slower shipping times in certain regions (3-5 days vs 2-day avg)',
      'Less advanced AI/ML features for personalization',
      'Mobile app conversion rate 30% lower than web'
    ],
    opportunities: [
      'Expand into athleisure category (28% market gap, $2.5B opportunity)',
      'Implement visual search technology (competitor adoption: 60%)',
      'Optimize for mobile-first shopping (45% of traffic)',
      'Develop subscription box service (predicted 15% revenue growth)',
      'Expand to European markets (35% less competition)'
    ],
    threats: [
      'Aggressive pricing from new direct-to-consumer brands',
      'Supply chain disruptions affecting inventory levels',
      'Increasing customer acquisition costs (up 40% YoY)',
      'Regulatory changes in key markets affecting shipping',
      'Rising raw material costs impacting margins'
    ],
    overallScore: 72
  });

  const [gapPlan, setGapPlan] = useState<GapExploitationPlan>({
    featuresToAdd: [
      {name: 'Visual Search with AI-powered recommendations', impact: 8.5, effort: 7, priority: 1},
      {name: 'Virtual Try-On for apparel and accessories', impact: 9.0, effort: 8, priority: 2},
      {name: 'AR Product Preview in home environment', impact: 7.5, effort: 6, priority: 3},
      {name: 'AI-powered personalized styling assistant', impact: 8.0, effort: 7, priority: 4},
      {name: 'Chat-based shopping concierge', impact: 6.5, effort: 5, priority: 5}
    ],
    categoriesToExpand: [
      {name: 'Athleisure (28% market gap identified)', opportunity: 85, competition: 45, priority: 1},
      {name: 'Sustainable/Eco-friendly collections', opportunity: 78, competition: 35, priority: 2},
      {name: 'Plus-size extended range', opportunity: 72, competition: 40, priority: 3},
      {name: 'Premium accessories line', opportunity: 65, competition: 55, priority: 4},
      {name: 'Collaboration with emerging designers', opportunity: 60, competition: 30, priority: 5}
    ],
    pricingAdjustments: [
      {category: 'Bestsellers', adjustment: 'Implement dynamic pricing', impact: 12, priority: 1},
      {category: 'Accessories', adjustment: 'Introduce bundle pricing', impact: 8, priority: 2},
      {category: 'Clearance', adjustment: 'Competitive price matching', impact: 15, priority: 3},
      {category: 'New Arrivals', adjustment: 'Time-limited flash sales', impact: 10, priority: 4},
      {category: 'Loyalty Members', adjustment: 'Personalized pricing', impact: 7, priority: 5}
    ],
    seoOpportunities: [
      {keyword: 'sustainable fashion', volume: 45000, difficulty: 65, priority: 1},
      {keyword: 'athleisure wear women', volume: 82000, difficulty: 78, priority: 2},
      {keyword: 'plus size clothing', volume: 32000, difficulty: 45, priority: 3},
      {keyword: 'designer collaborations', volume: 18000, difficulty: 52, priority: 4},
      {keyword: 'ethical clothing brands', volume: 29000, difficulty: 58, priority: 5}
    ],
    catalogFixes: [
      {issue: 'Low image count (4 vs 8 avg)', fix: 'Increase product images', impact: 9, priority: 1},
      {issue: 'Missing 360° views', fix: 'Add 360° product views', impact: 8, priority: 2},
      {issue: 'Inconsistent attributes', fix: 'Standardize taxonomy', impact: 7, priority: 3},
      {issue: 'No video content', fix: 'Add product videos', impact: 8, priority: 4},
      {issue: 'Poor lifestyle ratio', fix: 'Improve photo ratio to 60/40', impact: 6, priority: 5}
    ],
    aiTechnologies: [
      {technology: 'Visual search and similarity engine', adoptionRate: 60, roi: 35, priority: 1},
      {technology: 'Predictive inventory forecasting', adoptionRate: 45, roi: 28, priority: 2},
      {technology: 'Personalized outfit recommendations', adoptionRate: 55, roi: 32, priority: 3},
      {technology: 'Sentiment analysis on reviews', adoptionRate: 40, roi: 22, priority: 4},
      {technology: 'ChatGPT-powered customer service', adoptionRate: 35, roi: 25, priority: 5}
    ],
    conversionBoosters: [
      {action: 'Reduce checkout steps from 5 to 3', expectedImpact: 25, effort: 6, priority: 1},
      {action: 'Add Apple Pay/Google Pay options', expectedImpact: 18, effort: 4, priority: 2},
      {action: 'Implement exit-intent popups', expectedImpact: 15, effort: 3, priority: 3},
      {action: 'Improve page load speed by 40%', expectedImpact: 22, effort: 7, priority: 4},
      {action: 'Add trust badges and social proof', expectedImpact: 12, effort: 2, priority: 5}
    ]
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  // Initialize analysis data
  useEffect(() => {
    const skuData: Record<string, SKUAnalysis> = {};
    const priceData: Record<string, PriceAnalysis> = {};
    
    competitors.forEach(comp => {
      skuData[comp.id] = generateSKUAnalysis(comp.id);
      priceData[comp.id] = generatePriceAnalysis(comp.id);
    });
    
    setSkuAnalysis(skuData);
    setPriceAnalysis(priceData);
  }, [competitors]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setAuditState(prev => ({ ...prev, activeTab: newValue }));
  };

  const runAnalysis = () => {
    setAuditState(prev => ({ ...prev, isLoading: true, progress: 0 }));
    
    const interval = setInterval(() => {
      setAuditState(prev => {
        const newProgress = prev.progress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setSnackbar({
            open: true,
            message: 'Analysis completed successfully!',
            severity: 'success'
          });
          return { ...prev, isLoading: false, progress: 100, analysisDate: new Date() };
        }
        return { ...prev, progress: newProgress };
      });
    }, 300);
  };

  const calculateCategoryGaps = () => {
    const gaps: Array<{ category: string; opportunity: number; competitors: string[] }> = [];
    
    Object.values(skuAnalysis).forEach(analysis => {
      analysis.categories.forEach(cat => {
        if (cat.gap > 100) {
          const existing = gaps.find(g => g.category === cat.name);
          if (existing) {
            existing.competitors.push(analysis.competitorId);
          } else {
            gaps.push({
              category: cat.name,
              opportunity: cat.gap,
              competitors: [analysis.competitorId]
            });
          }
        }
      });
    });
    
    return gaps.sort((a, b) => b.opportunity - a.opportunity);
  };

  const getCompetitorColor = (id: string) => {
    const comp = competitors.find(c => c.id === id);
    return comp?.logoColor || '#666';
  };

  const renderCatalogDepthAnalysis = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🛍️ 1. Catalog Depth & Coverage Analysis</Typography>
            <Chip label="Live" color="success" size="small" />
          </Box>
        }
        subheader="Total SKU count vs. competitors, category coverage gaps, style/fit/color variety, new arrivals frequency"
        action={
          <Chip 
            icon={<DataArray />} 
            label="SKU Intelligence" 
            color="primary" 
            variant="outlined"
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarChartIcon /> 📊 SKU Distribution Comparison
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <Bar
                data={{
                  labels: competitors.map(c => c.name),
                  datasets: [
                    {
                      label: 'Total SKUs',
                      data: Object.values(skuAnalysis).map(a => a.totalSKUs),
                      backgroundColor: competitors.map(c => c.logoColor),
                      borderColor: competitors.map(c => c.logoColor),
                      borderWidth: 1,
                      borderRadius: 4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' as const },
                    title: { display: true, text: 'SKU Count Comparison' }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of SKUs'
                      }
                    }
                  }
                }}
              />
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Category /> 🔍 Category Coverage Gaps
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'action.hover' }}>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell align="right"><strong>Your SKUs</strong></TableCell>
                    <TableCell align="right"><strong>Avg Competitor</strong></TableCell>
                    <TableCell align="right"><strong>Gap</strong></TableCell>
                    <TableCell align="right"><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calculateCategoryGaps().slice(0, 5).map((gap, index) => (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:hover': { bgcolor: 'action.hover' },
                        ...(gap.opportunity > 300 && { bgcolor: 'error.lighter' })
                      }}
                    >
                      <TableCell>
                        <Chip 
                          label={gap.category} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontWeight: 'medium' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {skuAnalysis[gap.competitors[0]]?.categories.find(c => c.name === gap.category)?.yourCount || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {Math.round(gap.opportunity / gap.competitors.length)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={`+${gap.opportunity}`} 
                          color={gap.opportunity > 400 ? 'error' : gap.opportunity > 200 ? 'warning' : 'info'}
                          size="small"
                          icon={gap.opportunity > 300 ? <Warning /> : undefined}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button 
                          size="small" 
                          startIcon={<AddCircle />}
                          variant="outlined"
                          color="primary"
                        >
                          Expand
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Palette /> 🎨 Variety Analysis
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Style Variety Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
                    <Rating value={4} readOnly precision={0.5} />
                  </Box>
                  <Typography variant="h4" color="primary">
                    8.2/10
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Vs. Competitor Avg: 7.5
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    New Arrivals (30 days)
                  </Typography>
                  <Typography variant="h3" color="secondary" sx={{ my: 1 }}>
                    {Object.values(skuAnalysis)[0]?.newArrivalsLast30Days || 0}
                  </Typography>
                  <Chip 
                    label="+15% MoM" 
                    color="success" 
                    size="small"
                    variant="outlined"
                  />
                </Paper>
              </Grid>
              
              <Grid size={{ xs: 12, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Color & Fit Options
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 2 }}>
                    <Chip 
                      icon={<Palette />}
                      label={`${Object.values(skuAnalysis)[0]?.colorVariety || 0} Colors`}
                      variant="outlined"
                    />
                    <Chip 
                      icon={<Checkroom />}
                      label={`${Object.values(skuAnalysis)[0]?.fitVariety || 0} Fits`}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="caption" color="success.main">
                    +15% above market average
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Category Coverage
                  </Typography>
                  <CircularProgress 
                    variant="determinate" 
                    value={(skuAnalysis['comp1']?.categoryCoverage || 0) * 100} 
                    size={80}
                    thickness={4}
                    color="success"
                    sx={{ my: 1 }}
                  />
                  <Typography variant="h6">
                    {((skuAnalysis['comp1']?.categoryCoverage || 0) * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Market Average: 82%
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Alert 
              severity="info" 
              icon={<Insights />}
              action={
                <Button color="inherit" size="small">
                  View Detailed Report
                </Button>
              }
            >
              <Typography variant="subtitle2">
                <strong>Key Findings:</strong> Missing categories in Athleisure (28% gap, $2.5B opportunity), 
                Sustainable Collections (22% gap), and Plus-size (18% gap). Opportunity to add 500+ SKUs in these segments.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderPricePositioningBenchmark = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🎯 2. Price Positioning Benchmark</Typography>
            <Chip label="Dynamic" color="warning" size="small" />
          </Box>
        }
        subheader="Average price comparison by category, discount strategy, markup trends, price elasticity"
        action={
          <Chip 
            icon={<AttachMoney />} 
            label="Pricing Intelligence" 
            color="secondary" 
            variant="outlined"
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Timeline /> 📈 Price Comparison by Category
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={{
                  labels: priceAnalysis[competitors[0].id]?.categoryPrices.map(p => p.category) || [],
                  datasets: [
                    {
                      label: 'Your Price',
                      data: priceAnalysis[competitors[0].id]?.categoryPrices.map(p => p.yourAvgPrice) || [],
                      backgroundColor: 'rgba(54, 162, 235, 0.8)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 2,
                      borderRadius: 4
                    },
                    {
                      label: 'Competitor Avg',
                      data: priceAnalysis[competitors[0].id]?.categoryPrices.map(p => p.avgPrice) || [],
                      backgroundColor: 'rgba(255, 99, 132, 0.8)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 2,
                      borderRadius: 4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Category Price Positioning' }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Price ($)'
                      }
                    }
                  }
                }}
              />
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUp /> 💰 Price Competitiveness
            </Typography>
            <List dense>
              {priceAnalysis[competitors[0].id]?.categoryPrices.slice(0, 4).map((cat, index) => (
                <ListItem 
                  key={index}
                  sx={{ 
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <ListItemIcon>
                    {cat.difference > 0 ? (
                      <TrendingUp color="error" />
                    ) : (
                      <TrendingDown color="success" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight="medium">
                        {cat.category}
                      </Typography>
                    }
                    secondary={`${cat.difference > 0 ? '+' : ''}${cat.difference.toFixed(1)}%`}
                  />
                  <Chip
                    label={cat.difference > 0 ? 'Overpriced' : 'Competitive'}
                    color={cat.difference > 0 ? 'error' : 'success'}
                    size="small"
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}>
              <Typography variant="caption">
                <strong>Insight:</strong> Consider dynamic pricing for categories with &gt;10% price gap
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarChartIcon /> 🎪 Bestseller Price Clusters
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Box sx={{ height: 250 }}>
                  <Bar
                    data={{
                      labels: priceAnalysis[competitors[0].id]?.bestsellerPriceCluster.map(p => p.priceRange) || [],
                      datasets: [
                        {
                          label: 'Your Bestsellers',
                          data: priceAnalysis[competitors[0].id]?.bestsellerPriceCluster.map(p => p.yourCount) || [],
                          backgroundColor: 'rgba(75, 192, 192, 0.8)',
                          borderColor: 'rgba(75, 192, 192, 1)',
                          borderWidth: 1,
                          borderRadius: 4
                        },
                        {
                          label: 'Market Bestsellers',
                          data: priceAnalysis[competitors[0].id]?.bestsellerPriceCluster.map(p => p.count) || [],
                          backgroundColor: 'rgba(153, 102, 255, 0.8)',
                          borderColor: 'rgba(153, 102, 255, 1)',
                          borderWidth: 1,
                          borderRadius: 4
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'top' },
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Market Share by Price Range
                </Typography>
                {priceAnalysis[competitors[0].id]?.bestsellerPriceCluster.map((cluster, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption">{cluster.priceRange}</Typography>
                      <Typography variant="caption" fontWeight="bold">
                        {(cluster.marketShare * 100).toFixed(0)}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={cluster.marketShare * 100}
                      color={
                        cluster.priceRange === '$51-100' ? 'success' :
                        cluster.priceRange === '$101-200' ? 'info' :
                        cluster.priceRange === '$0-50' ? 'warning' : 'secondary'
                      }
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    🎯 Dynamic Pricing Opportunities
                  </Typography>
                  <List dense>
                    {[
                      'Implement real-time competitor price tracking',
                      'Use AI for demand-based pricing adjustments',
                      'Set up automated repricing rules for top 100 SKUs',
                      'Create price alert system for key competitors'
                    ].map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    ⚠️ Risk Areas
                  </Typography>
                  <List dense>
                    {[
                      {category: 'Premium Denim', risk: 'High', detail: '25% above market'},
                      {category: 'Designer Dresses', risk: 'Medium', detail: '18% above market'},
                      {category: 'Accessories', risk: 'Low', detail: 'Competitive pricing'}
                    ].map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Warning color={item.risk === 'High' ? 'error' : item.risk === 'Medium' ? 'warning' : 'success'} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.category}
                          secondary={item.detail}
                        />
                        <Chip 
                          label={item.risk} 
                          size="small"
                          color={item.risk === 'High' ? 'error' : item.risk === 'Medium' ? 'warning' : 'success'}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderSEOIntelligence = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🧠 3. SEO & Keyword Intelligence</Typography>
            <Chip label="AI-Powered" color="info" size="small" />
          </Box>
        }
        subheader="Meta optimization, keyword density, H1/H2 optimization, long-tail opportunities"
        action={
          <Chip 
            icon={<Search />} 
            label="SEO Audit" 
            color="info" 
            variant="outlined"
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              🔎 SEO Health Score
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
              <CircularProgress 
                variant="determinate" 
                value={78} 
                size={200} 
                thickness={4}
                color="success"
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h2" component="div" color="primary.main">
                  78%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Overall Score
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Vs. Competitor Avg</Typography>
                <Typography variant="body2" fontWeight="bold">72%</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Last Month</Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">+5%</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Industry Avg</Typography>
                <Typography variant="body2" fontWeight="bold">68%</Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom>
              📈 Keyword Opportunities
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ bgcolor: 'action.hover' }}>
                  <TableRow>
                    <TableCell><strong>Keyword Cluster</strong></TableCell>
                    <TableCell align="right"><strong>Volume</strong></TableCell>
                    <TableCell align="right"><strong>Difficulty</strong></TableCell>
                    <TableCell align="right"><strong>Your Rank</strong></TableCell>
                    <TableCell align="right"><strong>Comp. Rank</strong></TableCell>
                    <TableCell align="right"><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { cluster: 'Sustainable Fashion', volume: 45000, difficulty: 65, yourRank: 8, compRank: 3, opportunity: 85 },
                    { cluster: 'Athleisure Wear', volume: 82000, difficulty: 78, yourRank: 12, compRank: 5, opportunity: 92 },
                    { cluster: 'Plus Size Clothing', volume: 32000, difficulty: 45, yourRank: 5, compRank: 2, opportunity: 75 },
                    { cluster: 'Designer Collaborations', volume: 18000, difficulty: 52, yourRank: 15, compRank: 4, opportunity: 68 },
                    { cluster: 'Ethical Clothing', volume: 29000, difficulty: 58, yourRank: 10, compRank: 3, opportunity: 82 },
                  ].map((row, index) => (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:hover': { bgcolor: 'action.hover' },
                        ...(row.opportunity > 80 && { bgcolor: 'success.lighter' })
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip label={row.cluster} size="small" />
                          {row.opportunity > 80 && (
                            <Chip label="High" color="success" size="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {row.volume.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={row.difficulty} 
                            color={row.difficulty > 70 ? 'error' : row.difficulty > 40 ? 'warning' : 'success'}
                            sx={{ width: 60, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2" width={25}>
                            {row.difficulty}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.yourRank} 
                          size="small" 
                          variant="outlined"
                          color={row.yourRank <= 3 ? 'success' : row.yourRank <= 10 ? 'warning' : 'error'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.compRank} 
                          size="small" 
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button 
                          size="small" 
                          startIcon={<AutoGraph />}
                          variant="contained"
                          color="primary"
                        >
                          Optimize
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Quick Wins & Recommendations
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    🚀 Immediate Actions
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Fix meta descriptions under 120 chars" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Add schema markup to product pages" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Optimize image alt tags (missing 45%)" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle2" color="secondary" gutterBottom>
                    📝 Content Opportunities
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Edit color="info" />
                      </ListItemIcon>
                      <ListItemText primary="Create long-form style guides" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Edit color="info" />
                      </ListItemIcon>
                      <ListItemText primary="Develop product comparison pages" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Edit color="info" />
                      </ListItemIcon>
                      <ListItemText primary="Add customer story content" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle2" color="success" gutterBottom>
                    🔗 Technical SEO
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Build color="warning" />
                      </ListItemIcon>
                      <ListItemText primary="Improve page speed (current: 3.2s)" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Build color="warning" />
                      </ListItemIcon>
                      <ListItemText primary="Fix crawl errors (42 found)" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Build color="warning" />
                      </ListItemIcon>
                      <ListItemText primary="Mobile optimization audit" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderCatalogQualityBenchmark = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">📸 4. Catalog Quality & Content Benchmark</Typography>
            <Chip label="Quality Audit" color="primary" size="small" />
          </Box>
        }
        subheader="Product image quality, lifestyle vs studio photos, video usage, attribute completeness"
            action={
          <Chip 
            icon={<ImageIcon />} 
            label="Content Score: 78%" 
            color="success" 
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              🖼️ Image & Media Analysis
            </Typography>
            <Grid container spacing={2}>
              {[
                { metric: 'Avg Images/Product', value: '4.2', competitor: '6.8', gap: '-38%', icon: <CameraAlt /> },
                { metric: 'Lifestyle Ratio', value: '45%', competitor: '65%', gap: '-20%', icon: <Style /> },
                { metric: 'Video Usage', value: '12%', competitor: '38%', gap: '-26%', icon: <Videocam /> },
                { metric: '360° Views', value: '8%', competitor: '25%', gap: '-17%', icon: <RotateLeft /> },
              ].map((item, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {item.icon}
                      <Typography variant="subtitle2">{item.metric}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <Typography variant="h5">{item.value}</Typography>
                      <Chip 
                        label={item.gap} 
                        size="small"
                        color={parseFloat(item.gap) < -20 ? 'error' : 'warning'}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Competitor: {item.competitor}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              📝 Content Quality Scorecard
            </Typography>
            <Box sx={{ height: 250, mt: 2 }}>
              <Radar
                data={{
                  labels: ['Image Quality', 'Description Length', 'Attribute Completeness', 'Tag Accuracy', 'Readability', 'Video Content'],
                  datasets: [
                    {
                      label: 'Your Store',
                      data: [78, 65, 82, 74, 68, 45],
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 2,
                      pointBackgroundColor: 'rgba(54, 162, 235, 1)'
                    },
                    {
                      label: 'Competitor Avg',
                      data: [85, 72, 78, 82, 75, 62],
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 2,
                      pointBackgroundColor: 'rgba(255, 99, 132, 1)'
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        stepSize: 20
                      }
                    }
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Improvement Recommendations
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, bgcolor: 'info.lighter' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    🚀 High Priority Fixes
                  </Typography>
                  <List dense>
                    {[
                      'Increase minimum images per product to 6',
                      'Add product demonstration videos for top 100 SKUs',
                      'Implement 360° view for premium products',
                      'Standardize attribute taxonomy across all products'
                    ].map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <RocketLaunch color="error" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, bgcolor: 'warning.lighter' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    📈 Quick Wins
                  </Typography>
                  <List dense>
                    {[
                      'Add lifestyle photos for all bestsellers',
                      'Improve product description readability score',
                      'Add missing product attributes (size, material, care)',
                      'Implement consistent image sizing and cropping'
                    ].map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <TrendingUp color="warning" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderSearchDiscoveryBenchmark = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🔍 5. Search & Discovery Benchmark</Typography>
            <Chip label="UX Audit" color="info" size="small" />
          </Box>
        }
        subheader="Search relevancy, auto-suggestions, filters, product ranking patterns, personalization"
        action={
          <Chip 
            icon={<Search />} 
            label="Search Score: 82%" 
            color="success" 
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              🔎 Search Experience Comparison
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ bgcolor: 'action.hover' }}>
                  <TableRow>
                    <TableCell><strong>Feature</strong></TableCell>
                    <TableCell align="center"><strong>Your Store</strong></TableCell>
                    <TableCell align="center"><strong>Comp. Avg</strong></TableCell>
                    <TableCell align="center"><strong>Gap</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { feature: 'Search Relevancy', yourScore: 78, compScore: 85, gap: -7 },
                    { feature: 'Auto-Suggestions', yourScore: 65, compScore: 82, gap: -17 },
                    { feature: 'Filter Options', yourScore: 12, compScore: 18, gap: -6 },
                    { feature: 'Personalization', yourScore: 45, compScore: 68, gap: -23 },
                    { feature: 'Mobile Search', yourScore: 72, compScore: 78, gap: -6 },
                    { feature: 'Voice Search', yourScore: 15, compScore: 32, gap: -17 },
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2">{row.feature}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={`${row.yourScore}%`}
                          size="small"
                          color={row.yourScore >= 80 ? 'success' : row.yourScore >= 60 ? 'warning' : 'error'}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{row.compScore}%</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={row.gap > 0 ? `+${row.gap}` : row.gap}
                          size="small"
                          color={row.gap >= 0 ? 'success' : row.gap >= -10 ? 'warning' : 'error'}
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Missing Filters & Features
            </Typography>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" color="error" gutterBottom>
                ❌ Filters Competitors Have That You Don't:
              </Typography>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                {[
                  'Sustainability Rating',
                  'Body Type Fit',
                  'Occasion',
                  'Climate/Style',
                  'Trend Score',
                  'Customer Rating Filter',
                  'Price Per Wear',
                  'Color Family',
                  'Pattern Type',
                  'Material Composition'
                ].map((filter, index) => (
                  <Grid size={{ xs: 6 }} key={index}>
                    <Chip 
                      label={filter}
                      size="small"
                      color="error"
                      variant="outlined"
                      sx={{ mb: 0.5 }}
                    />
                  </Grid>
                ))}
              </Grid>
              
              <Typography variant="subtitle2" color="success" gutterBottom sx={{ mt: 2 }}>
                ✅ Recommendations:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <AddCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Add sustainability and ethical filters" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AddCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Implement personalized search ranking" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AddCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Add voice search capabilities" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              📊 Search Performance Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Search Abandonment Rate
                  </Typography>
                  <Typography variant="h3" color="error" sx={{ my: 1 }}>
                    42%
                  </Typography>
                  <Typography variant="caption">
                    (Industry avg: 35%)
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Zero-Result Searches
                  </Typography>
                  <Typography variant="h3" color="warning" sx={{ my: 1 }}>
                    18%
                  </Typography>
                  <Typography variant="caption">
                    (Target: &lt; 10%)
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Search-to-Purchase Rate
                  </Typography>
                  <Typography variant="h3" color="success" sx={{ my: 1 }}>
                    3.8%
                  </Typography>
                  <Typography variant="caption">
                    (Industry avg: 2.5%)
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderAITechnologyBenchmark = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🤖 6. Visual & AI Technology Benchmark</Typography>
            <Chip label="Tech Audit" color="secondary" size="small" />
          </Box>
        }
        subheader="Visual search, virtual try-on, AI personalization, AR preview, chat shopping"
        action={
          <Chip 
            icon={<Psychology />} 
            label="AI Adoption: 45%" 
            color="warning" 
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              🏆 AI Feature Adoption Matrix
            </Typography>
            <Grid container spacing={2}>
              {[
                { feature: 'Visual Search', yourAdoption: false, compAdoption: 65, impact: 85, icon: <CameraAlt /> },
                { feature: 'Virtual Try-On', yourAdoption: false, compAdoption: 45, impact: 92, icon: <FaceRetouchingNatural /> },
                { feature: 'AI Personalization', yourAdoption: true, compAdoption: 72, impact: 88, icon: <Psychology /> },
                { feature: 'AR Product Preview', yourAdoption: false, compAdoption: 38, impact: 78, icon: <ViewInAr /> },
                { feature: 'AI Styling Tools', yourAdoption: false, compAdoption: 28, impact: 82, icon: <Style /> },
                { feature: 'Chat Shopping', yourAdoption: true, compAdoption: 55, impact: 75, icon: <Chat /> },
                { feature: 'Predictive Search', yourAdoption: true, compAdoption: 68, impact: 80, icon: <Search /> },
                { feature: 'Smart Recommendations', yourAdoption: true, compAdoption: 85, impact: 90, icon: <AutoGraph /> },
              ].map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Paper sx={{ p: 2, height: '100%', position: 'relative' }}>
                    {item.yourAdoption && (
                      <Chip 
                        label="✓ Implemented" 
                        size="small" 
                        color="success"
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                      />
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      {item.icon}
                      <Typography variant="subtitle2">{item.feature}</Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Competitor Adoption
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.compAdoption}
                        color={item.compAdoption > 60 ? 'success' : item.compAdoption > 40 ? 'warning' : 'error'}
                        sx={{ height: 6, borderRadius: 3, mb: 0.5 }}
                      />
                      <Typography variant="body2" align="right">
                        {item.compAdoption}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Business Impact
                      </Typography>
                      <Typography variant="h6" color={item.impact > 80 ? 'success.main' : 'warning.main'}>
                        {item.impact}/100
                      </Typography>
                    </Box>
                    {!item.yourAdoption && (
                      <Button 
                        size="small" 
                        startIcon={<AddCircle />}
                        sx={{ mt: 1 }}
                        fullWidth
                      >
                        Add Feature
                      </Button>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Priority Implementation Roadmap
            </Typography>
            <Stepper orientation="vertical">
              <Step active={true}>
                <StepLabel
                  icon={<Avatar sx={{ bgcolor: 'error.main' }}>1</Avatar>}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Virtual Try-On (3-4 months)
                  </Typography>
                  <Typography variant="body2">
                    Expected impact: 25% increase in conversion, 40% reduction in returns
                  </Typography>
                </StepLabel>
                <StepContent>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Partner with Zyler or Vue.ai" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Implement for top 500 apparel items" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Mobile-first implementation" />
                    </ListItem>
                  </List>
                </StepContent>
              </Step>
              <Step active={true}>
                <StepLabel
                  icon={<Avatar sx={{ bgcolor: 'warning.main' }}>2</Avatar>}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Visual Search (2-3 months)
                  </Typography>
                  <Typography variant="body2">
                    Expected impact: 15% increase in engagement, 8% lift in AOV
                  </Typography>
                </StepLabel>
              </Step>
              <Step active={true}>
                <StepLabel
                  icon={<Avatar sx={{ bgcolor: 'info.main' }}>3</Avatar>}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    AI Personalization Engine (4-6 months)
                  </Typography>
                  <Typography variant="body2">
                    Expected impact: 30% increase in repeat purchases
                  </Typography>
                </StepLabel>
              </Step>
            </Stepper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Alert severity="warning" icon={<RocketLaunch />}>
              <Typography variant="subtitle2">
                <strong>Urgent:</strong> 65% of competitors have implemented visual search. 
                Delaying this feature could result in losing 15-20% of mobile traffic to competitors.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderConversionFunnelBenchmark = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">📈 7. Conversion Funnel Benchmark</Typography>
            <Chip label="CRO Audit" color="success" size="small" />
          </Box>
        }
        subheader="PDP performance, checkout friction, payment methods, trust signals, page speed"
        action={
          <Chip 
            icon={<TrendingUp />} 
            label="Conversion: 2.8%" 
            color={2.8 > 3 ? 'success' : 2.8 > 2.5 ? 'warning' : 'error'}
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              🏗️ Funnel Comparison
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <Line
                data={{
                  labels: ['Visitors', 'PDP Views', 'Add to Cart', 'Checkout Start', 'Purchase'],
                  datasets: [
                    {
                      label: 'Your Store',
                      data: [100, 65, 28, 15, 2.8],
                      borderColor: 'rgb(54, 162, 235)',
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                      tension: 0.4
                    },
                    {
                      label: 'Competitor Avg',
                      data: [100, 72, 35, 22, 4.2],
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      tension: 0.4
                    },
                    {
                      label: 'Industry Top 10%',
                      data: [100, 85, 48, 32, 6.5],
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: 'rgba(75, 192, 192, 0.5)',
                      tension: 0.4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: '% of Visitors'
                      }
                    }
                  }
                }}
              />
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              ⚡ Page Speed & Core Web Vitals
            </Typography>
            <Grid container spacing={2}>
              {[
                { metric: 'LCP (s)', yourScore: 3.2, target: 2.5, status: 'warning', icon: <Speed /> },
                { metric: 'FID (ms)', yourScore: 85, target: 100, status: 'success', icon: <Memory /> },
                { metric: 'CLS', yourScore: 0.18, target: 0.1, status: 'error', icon: <TrendingDown /> },
                { metric: 'Page Load', yourScore: 4.1, target: 3.0, status: 'warning', icon: <Timeline /> },
              ].map((item, index) => (
                <Grid size={{ xs: 6 }} key={index}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {item.icon}
                      <Typography variant="subtitle2">{item.metric}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <Typography 
                        variant="h6" 
                        color={
                          item.status === 'success' ? 'success.main' :
                          item.status === 'warning' ? 'warning.main' : 'error.main'
                        }
                      >
                        {item.yourScore}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Target: {item.target}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                🛡️ Trust Signals Comparison
              </Typography>
              <Grid container spacing={1}>
                {[
                  { signal: 'SSL Badge', yourStore: true, compAvg: 100 },
                  { signal: 'Trustpilot', yourStore: true, compAvg: 85 },
                  { signal: 'Social Proof', yourStore: false, compAvg: 72 },
                  { signal: 'Money-back Guarantee', yourStore: true, compAvg: 68 },
                  { signal: 'Free Returns', yourStore: true, compAvg: 92 },
                  { signal: 'Live Chat', yourStore: false, compAvg: 65 },
                ].map((item, index) => (
                  <Grid size={{ xs: 6 }} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.yourStore ? (
                        <CheckCircle fontSize="small" color="success" />
                      ) : (
                        <Error fontSize="small" color="error" />
                      )}
                      <Typography variant="body2">{item.signal}</Typography>
                      <Chip 
                        label={`${item.compAvg}%`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Checkout Optimization Opportunities
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, bgcolor: 'error.lighter' }}>
                  <Typography variant="subtitle2" color="error" gutterBottom>
                    ❌ High Friction Points
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><RemoveCircle color="error" /></ListItemIcon>
                      <ListItemText primary="5-step checkout (vs 2-3 steps)" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><RemoveCircle color="error" /></ListItemIcon>
                      <ListItemText primary="Mandatory account creation" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><RemoveCircle color="error" /></ListItemIcon>
                      <ListItemText primary="Limited payment options" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, bgcolor: 'warning.lighter' }}>
                  <Typography variant="subtitle2" color="warning" gutterBottom>
                    ⚠️ Medium Priority
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Warning color="warning" /></ListItemIcon>
                      <ListItemText primary="Slow checkout page load (4.1s)" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Warning color="warning" /></ListItemIcon>
                      <ListItemText primary="No guest checkout option" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Warning color="warning" /></ListItemIcon>
                      <ListItemText primary="Missing progress indicator" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, bgcolor: 'success.lighter' }}>
                  <Typography variant="subtitle2" color="success" gutterBottom>
                    ✅ Quick Wins
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><AddCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Add Apple/Google Pay" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AddCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Implement 1-click checkout" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AddCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Add trust badges above fold" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderShippingReturnsComparison = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">📦 8. Shipping, Delivery & Returns Comparison</Typography>
            <Chip label="Logistics" color="primary" size="small" />
          </Box>
        }
        subheader="Delivery speeds, shipping costs, return policies, packaging experience"
        action={
          <Chip 
            icon={<LocalShipping />} 
            label="Shipping Score: 76%" 
            color="info" 
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom>
              🚚 Delivery Speed Comparison
            </Typography>
            <Box sx={{ height: 250, mt: 2 }}>
              <Bar
                data={{
                  labels: ['Standard', 'Express', 'Same Day', 'International'],
                  datasets: [
                    {
                      label: 'Your Store (Days)',
                      data: [5, 2, 0, 10],
                      backgroundColor: 'rgba(54, 162, 235, 0.8)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                    },
                    {
                      label: 'Competitor Avg (Days)',
                      data: [3.5, 1.5, 0.8, 7],
                      backgroundColor: 'rgba(255, 99, 132, 0.8)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  indexAxis: 'y',
                  plugins: {
                    legend: { position: 'top' },
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Days'
                      }
                    }
                  }
                }}
              />
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              💰 Shipping Cost Analysis
            </Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Free Shipping Threshold</Typography>
                <Typography variant="body2" fontWeight="bold">$75</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Competitor Avg</Typography>
                <Typography variant="body2" color="success.main">$50</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Industry Best</Typography>
                <Typography variant="body2" color="info.main">$35</Typography>
              </Box>
              <Alert severity="warning">
                Consider lowering to $50 to match 65% of competitors
              </Alert>
            </Paper>
            
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                📦 Return Policy Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <CircularProgress variant="determinate" value={68} size={60} />
                <Box>
                  <Typography variant="h5">68%</Typography>
                  <Typography variant="caption">Competitor Avg: 78%</Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary">
                30-day returns (vs 45-day avg), $5 restocking fee
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Policy Improvement Recommendations
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle2" color="error" gutterBottom>
                    ⚠️ Critical Issues
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Error color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="$5 restocking fee" 
                        secondary="90% of competitors have free returns"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Error color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="30-day return window" 
                        secondary="Industry average: 45 days"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Error color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="No free return shipping" 
                        secondary="Hurting conversion by 18%"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle2" color="warning" gutterBottom>
                    📈 Improvement Opportunities
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><AddCircle color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Offer free returns over $50" 
                        secondary="Expected conversion lift: 12%"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AddCircle color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Extend return window to 45 days" 
                        secondary="Reduces purchase hesitation"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AddCircle color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Add return portal" 
                        secondary="Improves customer experience"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle2" color="success" gutterBottom>
                    ✅ Competitive Advantages
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Eco-friendly packaging" 
                        secondary="85% customer satisfaction"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Real-time tracking" 
                        secondary="Industry standard"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Multiple carrier options" 
                        secondary="Flexibility for customers"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Alert severity="info">
              <Typography variant="subtitle2">
                <strong>ROI Analysis:</strong> Eliminating the restocking fee and extending the return window 
                to 45 days is projected to increase conversions by 15-20% with a 25% reduction in cart abandonment.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderReviewSentimentAnalysis = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">⭐ 9. Review & Rating Sentiment Analysis</Typography>
            <Chip label="Sentiment AI" color="warning" size="small" />
          </Box>
        }
        subheader="Average ratings, positive/negative themes, common complaints, sentiment scores"
        action={
          <Chip 
            icon={<Star />} 
            label="Avg Rating: 4.5/5" 
            color="success" 
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              📊 Rating Distribution vs Competitors
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <Bar
                data={{
                  labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                  datasets: [
                    {
                      label: 'Your Store',
                      data: [2, 3, 8, 25, 62],
                      backgroundColor: 'rgba(54, 162, 235, 0.8)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                    },
                    {
                      label: 'Competitor Avg',
                      data: [4, 5, 12, 30, 49],
                      backgroundColor: 'rgba(255, 99, 132, 0.8)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: '% of Reviews'
                      }
                    }
                  }
                }}
              />
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              🎭 Sentiment Analysis by Category
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ bgcolor: 'action.hover' }}>
                  <TableRow>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell align="right"><strong>Your Score</strong></TableCell>
                    <TableCell align="right"><strong>Comp. Avg</strong></TableCell>
                    <TableCell align="center"><strong>Sentiment</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { category: 'Product Quality', yourScore: 8.5, compScore: 7.8, sentiment: 'positive' },
                    { category: 'Fit & Sizing', yourScore: 7.2, compScore: 7.5, sentiment: 'neutral' },
                    { category: 'Material Comfort', yourScore: 8.8, compScore: 8.0, sentiment: 'positive' },
                    { category: 'Delivery Speed', yourScore: 6.5, compScore: 7.2, sentiment: 'negative' },
                    { category: 'Packaging', yourScore: 9.0, compScore: 7.5, sentiment: 'positive' },
                    { category: 'Customer Service', yourScore: 8.2, compScore: 7.8, sentiment: 'positive' },
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2">{row.category}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.yourScore.toFixed(1)}
                          size="small"
                          color={
                            row.yourScore >= 8.5 ? 'success' :
                            row.yourScore >= 7.5 ? 'warning' : 'error'
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">{row.compScore.toFixed(1)}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        {row.sentiment === 'positive' ? (
                          <ThumbUp fontSize="small" color="success" />
                        ) : row.sentiment === 'negative' ? (
                          <ThumbDown fontSize="small" color="error" />
                        ) : (
                          <TrendingFlat fontSize="small" color="warning" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              🔍 Top Complaint Themes & Solutions
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, bgcolor: 'error.lighter' }}>
                  <Typography variant="subtitle2" color="error" gutterBottom>
                    ⚠️ Top 3 Negative Themes
                  </Typography>
                  {[
                    {
                      theme: 'Slow Delivery Times',
                      frequency: '28% of negative reviews',
                      example: '"Took 2 weeks to arrive"',
                      solution: 'Partner with additional carriers, offer expedited shipping options'
                    },
                    {
                      theme: 'Sizing Inconsistency',
                      frequency: '22% of negative reviews',
                      example: '"Runs small, size chart inaccurate"',
                      solution: 'Improve size charts, add fit predictor, provide garment measurements'
                    },
                    {
                      theme: 'Return Process Difficult',
                      frequency: '18% of negative reviews',
                      example: '"Restocking fee is unfair"',
                      solution: 'Eliminate restocking fees, simplify return process'
                    }
                  ].map((item, index) => (
                    <Accordion key={index} sx={{ mb: 1 }}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography fontWeight="medium">{item.theme}</Typography>
                        <Chip label={item.frequency} size="small" color="error" sx={{ ml: 2 }} />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Example:</strong> {item.example}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Solution:</strong> {item.solution}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2, bgcolor: 'success.lighter' }}>
                  <Typography variant="subtitle2" color="success" gutterBottom>
                    🌟 Top 3 Positive Themes
                  </Typography>
                  {[
                    {
                      theme: 'Product Quality',
                      frequency: '45% of positive reviews',
                      example: '"Material is premium and durable"',
                      leverage: 'Highlight in marketing, create quality assurance content'
                    },
                    {
                      theme: 'Eco-Friendly Packaging',
                      frequency: '38% of positive reviews',
                      example: '"Love the sustainable packaging"',
                      leverage: 'Market as key differentiator, expand sustainability efforts'
                    },
                    {
                      theme: 'Customer Service',
                      frequency: '32% of positive reviews',
                      example: '"Support team was amazing"',
                      leverage: 'Share success stories, train team on best practices'
                    }
                  ].map((item, index) => (
                    <Accordion key={index} sx={{ mb: 1 }}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography fontWeight="medium">{item.theme}</Typography>
                        <Chip label={item.frequency} size="small" color="success" sx={{ ml: 2 }} />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Example:</strong> {item.example}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Leverage:</strong> {item.leverage}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Alert severity="info" icon={<Psychology />}>
              <Typography variant="subtitle2">
                <strong>AI Insight:</strong> Addressing the top 3 complaint themes could improve 
                overall rating from 4.5 to 4.7 and reduce returns by 25-30%.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderSocialBrandingPresence = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">💬 10. Social & Branding Presence</Typography>
            <Chip label="Social Audit" color="secondary" size="small" />
          </Box>
        }
        subheader="Engagement rates, influencer collaborations, content quality, trend adoption"
        action={
          <Chip 
            icon={<Share />} 
            label="Social Score: 68%" 
            color="warning" 
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              📱 Platform Performance Comparison
            </Typography>
            <Grid container spacing={2}>
              {[
                { platform: 'Instagram', followers: '125K', engagement: '3.2%', growth: '+12%', icon: <InstagramIcon /> },
                { platform: 'TikTok', followers: '85K', engagement: '8.5%', growth: '+45%', icon: <TikTokIcon /> },
                { platform: 'YouTube', followers: '42K', engagement: '1.8%', growth: '+8%', icon: <YouTubeIcon /> },
                { platform: 'Pinterest', followers: '68K', engagement: '2.1%', growth: '+15%', icon: <PinterestIcon /> },
              ].map((item, index) => (
                <Grid size={{ xs: 6 }} key={index}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      {item.icon}
                      <Typography variant="subtitle2">{item.platform}</Typography>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Followers
                      </Typography>
                      <Typography variant="h6">{item.followers}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Engagement
                        </Typography>
                        <Typography variant="body2">{item.engagement}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Growth
                        </Typography>
                        <Typography variant="body2" color="success.main">
                          {item.growth}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              🏆 Social Momentum Score
            </Typography>
            <Box sx={{ height: 250, mt: 2 }}>
              <Radar
                data={{
                  labels: ['Engagement Rate', 'Growth Speed', 'Content Quality', 'Influencer Collabs', 'Trend Adoption', 'Community Size'],
                  datasets: [
                    {
                      label: 'Your Brand',
                      data: [65, 72, 68, 45, 58, 62],
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 2
                    },
                    {
                      label: 'Competitor Avg',
                      data: [72, 68, 75, 62, 65, 78],
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 2
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        stepSize: 20
                      }
                    }
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              👥 Influencer & Content Strategy
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="error" gutterBottom>
                    ❌ Content Gaps Identified
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><RemoveCircle color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="Limited UGC (User Generated Content)" 
                        secondary="Only 15% of content vs 45% avg"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><RemoveCircle color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="No TikTok series or trends" 
                        secondary="Missing 65% of Gen Z audience"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><RemoveCircle color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="Influencer diversity gap" 
                        secondary="88% of influencers in same niche"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="success" gutterBottom>
                    🚀 Growth Opportunities
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><AddCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Launch UGC campaign with rewards" 
                        secondary="Expected: 3x more content"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AddCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="TikTok styling challenge series" 
                        secondary="Target: 50M+ impressions"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AddCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Diversify influencer partnerships" 
                        secondary="Include micro & nano influencers"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              📊 Competitor Content Analysis
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ bgcolor: 'action.hover' }}>
                  <TableRow>
                    <TableCell><strong>Competitor</strong></TableCell>
                    <TableCell align="center"><strong>Post Frequency</strong></TableCell>
                    <TableCell align="center"><strong>Engagement Rate</strong></TableCell>
                    <TableCell align="center"><strong>Video Content %</strong></TableCell>
                    <TableCell align="center"><strong>Influencer Posts/Month</strong></TableCell>
                    <TableCell align="center"><strong>Hashtag Strategy</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {competitors.map((comp, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ bgcolor: comp.logoColor, width: 24, height: 24, fontSize: 12 }}>
                            {comp.name[0]}
                          </Avatar>
                          <Typography variant="body2">{comp.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label="Daily" size="small" color="info" />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{faker.number.float({ min: 2.5, max: 8.5, multipleOf: 0.1 })}%</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{faker.number.int({ min: 40, max: 80 })}%</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{faker.number.int({ min: 8, max: 25 })}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={faker.helpers.arrayElement(['Strong', 'Moderate', 'Weak'])}
                          size="small"
                          color={faker.helpers.arrayElement(['success', 'warning', 'error'])}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderTechStackComparison = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🛠️ 11. Tech Stack Comparison</Typography>
            <Chip label="Technical Audit" color="primary" size="small" />
          </Box>
        }
        subheader="CMS, ecommerce platforms, AI modules, analytics tools, recommendation engines"
        action={
          <Chip 
            icon={<Build />} 
            label="Tech Score: 72%" 
            color="info" 
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              🏗️ Platform & Infrastructure
            </Typography>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Your Tech Stack
              </Typography>
              <Grid container spacing={1}>
                {[
                  { category: 'Ecommerce Platform', value: 'Shopify Plus', score: 85 },
                  { category: 'CMS', value: 'Custom React', score: 78 },
                  { category: 'Payment Processor', value: 'Stripe + PayPal', score: 90 },
                  { category: 'Hosting', value: 'AWS', score: 88 },
                  { category: 'CDN', value: 'Cloudflare', score: 82 },
                  { category: 'Analytics', value: 'Google Analytics 4', score: 75 },
                ].map((item, index) => (
                  <Grid size={{ xs: 6 }} key={index}>
                    <Paper sx={{ p: 1.5, height: '100%' }}>
                      <Typography variant="caption" color="text.secondary">
                        {item.category}
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {item.value}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.score}
                        color={item.score >= 85 ? 'success' : item.score >= 70 ? 'warning' : 'error'}
                        sx={{ height: 4, mt: 0.5 }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              🤖 AI & Advanced Features
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ bgcolor: 'action.hover' }}>
                  <TableRow>
                    <TableCell><strong>Technology</strong></TableCell>
                    <TableCell align="center"><strong>Your Store</strong></TableCell>
                    <TableCell align="center"><strong>Comp. Avg</strong></TableCell>
                    <TableCell align="center"><strong>Priority</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { tech: 'Recommendation Engine', yourStore: true, compAvg: 85, priority: 'Medium' },
                    { tech: 'Personalization AI', yourStore: true, compAvg: 72, priority: 'High' },
                    { tech: 'Visual Search', yourStore: false, compAvg: 65, priority: 'Critical' },
                    { tech: 'Chatbot/Assistant', yourStore: true, compAvg: 55, priority: 'Low' },
                    { tech: 'Predictive Analytics', yourStore: false, compAvg: 48, priority: 'Medium' },
                    { tech: 'AR/VR Features', yourStore: false, compAvg: 38, priority: 'High' },
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2">{row.tech}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        {row.yourStore ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Cancel color="error" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={`${row.compAvg}%`}
                          size="small"
                          color={row.compAvg >= 70 ? 'success' : row.compAvg >= 50 ? 'warning' : 'error'}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={row.priority}
                          size="small"
                          color={
                            row.priority === 'Critical' ? 'error' :
                            row.priority === 'High' ? 'warning' :
                            row.priority === 'Medium' ? 'info' : 'default'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Technology Adoption Recommendations
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, bgcolor: 'error.lighter' }}>
                  <Typography variant="subtitle2" color="error" gutterBottom>
                    🚨 Critical Gaps
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Error color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="Missing visual search" 
                        secondary="65% of competitors have it"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Error color="error" /></ListItemIcon>
                      <ListItemText 
                        primary="Limited personalization" 
                        secondary="Basic segmentation only"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, bgcolor: 'warning.lighter' }}>
                  <Typography variant="subtitle2" color="warning" gutterBottom>
                    📈 High-ROI Additions
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><AddCircle color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Implement Algolia search" 
                        secondary="Expected: +25% search conversion"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AddCircle color="warning" /></ListItemIcon>
                      <ListItemText 
                        primary="Add dynamic pricing engine" 
                        secondary="Expected: +12% revenue"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, bgcolor: 'success.lighter' }}>
                  <Typography variant="subtitle2" color="success" gutterBottom>
                    🏆 Competitive Advantages
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Modern tech stack" 
                        secondary="React, AWS, microservices"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Strong hosting/CDN" 
                        secondary="Fast and reliable"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Alert severity="info" icon={<Code />}>
              <Typography variant="subtitle2">
                <strong>Integration Opportunity:</strong> Consider adding Segment for customer data 
                unification and Braze for omni-channel marketing automation to compete with enterprise competitors.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderQuickSWOT = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🧩 12. Quick SWOT Summary</Typography>
            <Chip label="AI-Generated" color="warning" size="small" />
          </Box>
        }
        subheader="AI-generated board-level strategic summary based on comprehensive analysis"
        action={
          <Chip 
            icon={<Psychology />} 
            label="Overall Score: 72%" 
            color="info" 
          />
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, bgcolor: 'success.light', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ThumbUp color="success" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Strengths
                </Typography>
              </Box>
              <List dense>
                {swot.strengths.map((item, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, bgcolor: 'error.light', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ThumbDown color="error" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Weaknesses
                </Typography>
              </Box>
              <List dense>
                {swot.weaknesses.map((item, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Error color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, bgcolor: 'info.light', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="info" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Opportunities
                </Typography>
              </Box>
              <List dense>
                {swot.opportunities.map((item, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Lightbulb color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, bgcolor: 'warning.light', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Warning color="warning" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Threats
                </Typography>
              </Box>
              <List dense>
                {swot.threats.map((item, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Warning color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 2, bgcolor: 'primary.lighter' }}>
              <Typography variant="h6" gutterBottom>
                🎯 Strategic Recommendations
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Immediate Actions (Next 30 Days)
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><RocketLaunch color="error" /></ListItemIcon>
                      <ListItemText primary="Lower free shipping threshold to $50" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><RocketLaunch color="error" /></ListItemIcon>
                      <ListItemText primary="Eliminate restocking fees" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><RocketLaunch color="error" /></ListItemIcon>
                      <ListItemText primary="Launch TikTok UGC campaign" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Quarterly Initiatives
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CalendarToday sx={{ color: "info.main" }} /></ListItemIcon>
                      <ListItemText primary="Implement visual search technology" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CalendarToday sx={{ color: "info.main" }} /></ListItemIcon>
                      <ListItemText primary="Expand into athleisure category" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CalendarToday sx={{ color: "info.main" }} /></ListItemIcon>
                      <ListItemText primary="Develop virtual try-on feature" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderGapExploitationPlan = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">🎁 BONUS: AI-Generated Competitor Gap Exploitation Plan</Typography>
            <Chip label="Killer Feature" color="error" size="small" />
          </Box>
        }
        subheader="Based on all data analysis, the system generates actionable recommendations"
        action={
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<Download />}
            onClick={() => {
              setSnackbar({
                open: true,
                message: 'Downloading implementation roadmap...',
                severity: 'success'
              });
            }}
          >
            Export Roadmap
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <Stepper orientation="vertical">
          <Step active={true} completed={false}>
            <StepLabel
              icon={<Avatar sx={{ bgcolor: 'error.main' }}>1</Avatar>}
            >
              <Typography variant="h6">
                Top 5 Features to Add (ROI Priority)
              </Typography>
            </StepLabel>
            <StepContent>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell><strong>Feature</strong></TableCell>
                      <TableCell align="center"><strong>Impact Score</strong></TableCell>
                      <TableCell align="center"><strong>Effort Level</strong></TableCell>
                      <TableCell align="center"><strong>ROI Priority</strong></TableCell>
                      <TableCell align="center"><strong>Timeline</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gapPlan.featuresToAdd.map((feature, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Typography variant="body2">{feature.name}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={`${feature.impact}/10`}
                            size="small"
                            color={feature.impact >= 8.5 ? 'success' : feature.impact >= 7.5 ? 'warning' : 'info'}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={`${feature.effort}/10`}
                            size="small"
                            color={feature.effort >= 8 ? 'error' : feature.effort >= 6 ? 'warning' : 'success'}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={`P${feature.priority}`}
                            size="small"
                            color={
                              feature.priority === 1 ? 'error' :
                              feature.priority === 2 ? 'warning' :
                              feature.priority === 3 ? 'info' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {feature.priority <= 2 ? 'Q2 2024' : 'Q3 2024'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AutoFixHigh />}
                  onClick={() => {
                    setSnackbar({
                      open: true,
                      message: 'Generating detailed implementation plan...',
                      severity: 'info'
                    });
                  }}
                >
                  Generate Implementation Plan
                </Button>
              </Box>
            </StepContent>
          </Step>
          
          <Step active={true} completed={false}>
            <StepLabel
              icon={<Avatar sx={{ bgcolor: 'warning.main' }}>2</Avatar>}
            >
              <Typography variant="h6">
                Top 5 Categories to Expand (Market Opportunity)
              </Typography>
            </StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                {gapPlan.categoriesToExpand.map((category, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2">{category.name}</Typography>
                        <Chip 
                          label={`P${category.priority}`}
                          size="small"
                          color={category.priority <= 2 ? 'error' : 'warning'}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption">Opportunity Score</Typography>
                        <Typography variant="body2" fontWeight="bold">{category.opportunity}/100</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption">Competition Level</Typography>
                        <Typography variant="body2">{category.competition}/100</Typography>
                      </Box>
                      <Button 
                        size="small" 
                        startIcon={<AddCircle />}
                        sx={{ mt: 1 }}
                        fullWidth
                      >
                        Start Expansion
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </StepContent>
          </Step>
          
          <Step active={true} completed={false}>
            <StepLabel
              icon={<Avatar sx={{ bgcolor: 'info.main' }}>3</Avatar>}
            >
              <Typography variant="h6">
                Top 5 Pricing Adjustments (Revenue Impact)
              </Typography>
            </StepLabel>
            <StepContent>
              <List>
                {gapPlan.pricingAdjustments.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ChevronRight />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2">
                          <strong>{item.category}:</strong> {item.adjustment}
                        </Typography>
                      }
                      secondary={`Expected revenue impact: ${item.impact}%`}
                    />
                    <Chip 
                      label={`Priority ${item.priority}`} 
                      size="small" 
                      color={item.priority === 1 ? 'error' : item.priority === 2 ? 'warning' : 'default'}
                    />
                  </ListItem>
                ))}
              </List>
            </StepContent>
          </Step>
        </Stepper>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            🎯 Implementation Timeline & Resource Allocation
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Immediate (30 days)
                </Typography>
                <Typography variant="h4" color="error" sx={{ my: 1 }}>
                  3 Projects
                </Typography>
                <Typography variant="caption">
                  Quick wins with high ROI
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Short-term (90 days)
                </Typography>
                <Typography variant="h4" color="warning" sx={{ my: 1 }}>
                  5 Projects
                </Typography>
                <Typography variant="caption">
                  Medium effort, high impact
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Long-term (6-12 months)
                </Typography>
                <Typography variant="h4" color="success" sx={{ my: 1 }}>
                  7 Projects
                </Typography>
                <Typography variant="caption">
                  Strategic investments
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Alert severity="success" icon={<Insights />}>
            <Typography variant="subtitle2">
              <strong>Total Projected Impact:</strong> Implementing these recommendations could 
              increase revenue by 35-45%, improve conversion rate by 25%, and reduce customer 
              acquisition costs by 18% within 12 months.
            </Typography>
          </Alert>
        </Box>
      </CardContent>
    </Card>
  );

  const renderDashboardView = () => (
    <>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Overall Score
            </Typography>
            <CircularProgress 
              variant="determinate" 
              value={72} 
              size={80}
              thickness={4}
              color="warning"
              sx={{ my: 1 }}
            />
            <Typography variant="h4">72%</Typography>
            <Typography variant="caption" color="text.secondary">
              Vs. Competitor Avg: 68%
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Critical Gaps
            </Typography>
            <Typography variant="h2" color="error" sx={{ my: 1 }}>
              12
            </Typography>
            <Typography variant="caption">
              Needs immediate attention
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Opportunities
            </Typography>
            <Typography variant="h2" color="success" sx={{ my: 1 }}>
              28
            </Typography>
            <Typography variant="caption">
              High-ROI improvements
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Projected Revenue Impact
            </Typography>
            <Typography variant="h2" color="primary" sx={{ my: 1 }}>
              42%
            </Typography>
            <Typography variant="caption">
              With full implementation
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {renderCatalogDepthAnalysis()}
      {renderPricePositioningBenchmark()}
      {renderSEOIntelligence()}
      {renderCatalogQualityBenchmark()}
      {renderSearchDiscoveryBenchmark()}
      {renderAITechnologyBenchmark()}
      {renderConversionFunnelBenchmark()}
      {renderShippingReturnsComparison()}
      {renderReviewSentimentAnalysis()}
      {renderSocialBrandingPresence()}
      {renderTechStackComparison()}
      {renderQuickSWOT()}
      {renderGapExploitationPlan()}
    </>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ my: 2 }}>
        {/* Header */}
        <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                🕵️‍♂️ Competitor Analysis Snapshot Audit
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                Comprehensive 13-module audit with AI-generated insights and gap exploitation plan
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'white', width: 60, height: 60 }}>
              <Analytics sx={{ fontSize: 40, color: '#667eea' }} />
            </Avatar>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {competitors.map(comp => (
              <Chip
                key={comp.id}
                label={comp.name}
                avatar={<Avatar sx={{ bgcolor: comp.logoColor }}>{comp.name[0]}</Avatar>}
                color={auditState.selectedCompetitors.includes(comp.id) ? 'primary' : 'default'}
                onClick={() => {
                  const newSelection = auditState.selectedCompetitors.includes(comp.id)
                    ? auditState.selectedCompetitors.filter(id => id !== comp.id)
                    : [...auditState.selectedCompetitors, comp.id];
                  setAuditState(prev => ({ ...prev, selectedCompetitors: newSelection }));
                }}
                variant={auditState.selectedCompetitors.includes(comp.id) ? 'filled' : 'outlined'}
                sx={{ color: 'white', borderColor: 'white' }}
              />
            ))}
          </Box>
        </Paper>

        {/* Controls */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  onClick={runAnalysis}
                  disabled={auditState.isLoading}
                  fullWidth
                >
                  {auditState.isLoading ? `Analyzing... ${auditState.progress}%` : 'Run Analysis'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => {
                    setSnackbar({
                      open: true,
                      message: `Exporting report as ${auditState.exportFormat.toUpperCase()}...`,
                      severity: 'info'
                    });
                  }}
                >
                  Export
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Export Format</InputLabel>
                <Select
                  value={auditState.exportFormat}
                  label="Export Format"
                  onChange={(e) => setAuditState(prev => ({ ...prev, exportFormat: e.target.value as any }))}
                >
                  <MenuItem value="pdf">PDF Report</MenuItem>
                  <MenuItem value="excel">Excel Sheet</MenuItem>
                  <MenuItem value="csv">CSV Data</MenuItem>
                  <MenuItem value="json">JSON Data</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={auditState.aiInsights}
                      onChange={(e) => setAuditState(prev => ({ ...prev, aiInsights: e.target.checked }))}
                    />
                  }
                  label="AI Insights"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={auditState.realTimeUpdates}
                      onChange={(e) => setAuditState(prev => ({ ...prev, realTimeUpdates: e.target.checked }))}
                    />
                  }
                  label="Real-time"
                />
              </Box>
            </Grid>
          </Grid>
          
          {auditState.isLoading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress variant="determinate" value={auditState.progress} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                Analyzing competitor data... {auditState.progress}%
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Main Content */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={auditState.activeTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<Dashboard />} label="Dashboard" />
            <Tab icon={<Category />} label="Catalog Depth" />
            <Tab icon={<AttachMoney />} label="Pricing" />
            <Tab icon={<Search />} label="SEO" />
            <Tab icon={<ImageIcon />} label="Content" />
            <Tab icon={<Psychology />} label="AI Tech" />
            <Tab icon={<TrendingUp />} label="Funnel" />
            <Tab icon={<LocalShipping />} label="Shipping" />
            <Tab icon={<Star />} label="Reviews" />
            <Tab icon={<Share />} label="Social" />
            <Tab icon={<Build />} label="Tech Stack" />
            <Tab icon={<Insights />} label="SWOT" />
            <Tab icon={<RocketLaunch />} label="Gap Plan" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 2 }}>
          {auditState.activeTab === 0 && renderDashboardView()}
          {auditState.activeTab === 1 && renderCatalogDepthAnalysis()}
          {auditState.activeTab === 2 && renderPricePositioningBenchmark()}
          {auditState.activeTab === 3 && renderSEOIntelligence()}
          {auditState.activeTab === 4 && renderCatalogQualityBenchmark()}
          {auditState.activeTab === 5 && renderAITechnologyBenchmark()}
          {auditState.activeTab === 6 && renderConversionFunnelBenchmark()}
          {auditState.activeTab === 7 && renderShippingReturnsComparison()}
          {auditState.activeTab === 8 && renderReviewSentimentAnalysis()}
          {auditState.activeTab === 9 && renderSocialBrandingPresence()}
          {auditState.activeTab === 10 && renderTechStackComparison()}
          {auditState.activeTab === 11 && renderQuickSWOT()}
          {auditState.activeTab === 12 && renderGapExploitationPlan()}
        </Box>

        {/* Footer */}
        <Paper sx={{ p: 2, mt: 4, bgcolor: 'background.default' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Last updated: {auditState.analysisDate.toLocaleString()} • 
              AI Insights: {auditState.aiInsights ? 'Enabled' : 'Disabled'} • 
              Real-time: {auditState.realTimeUpdates ? 'On' : 'Off'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Analysis ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert 
          elevation={6} 
          variant="filled" 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

// Custom icon components (you can replace these with actual icons)
const InstagramIcon: React.FC<any> = (_props) => <span>📷</span>;
const TikTokIcon: React.FC<any> = (_props) => <span>🎵</span>;
const YouTubeIcon: React.FC<any> = (_props) => <span>▶️</span>;
const PinterestIcon: React.FC<any> = (_props) => <span>📌</span>;
const ViewInAr: React.FC<any> = (_props) => <span>👓</span>;
const CalendarToday: React.FC<any> = (_props) => <span>📅</span>;

export default CompetitorAnalysisSnapshotAudit;





