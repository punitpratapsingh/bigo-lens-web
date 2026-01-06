// File: src/app/product-clustering/page.tsx
// COMPLETE Advanced AI Product Clustering Dashboard with ALL 10 Functionalities

'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, ZAxis, CartesianGrid, Tooltip as RechartsTooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart,
  Area, Sankey, RadialBarChart, RadialBar, FunnelChart, Funnel,
  LabelList, SunburstChart, Treemap
} from 'recharts';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter
} from '@/components/ui/card';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Slider
} from '@/components/ui/slider';
import {
  Button
} from '@/components/ui/button';
import {
  Input
} from '@/components/ui/input';
import {
  Textarea
} from '@/components/ui/textarea';
import {
  Switch
} from '@/components/ui/switch';
import {
  Badge
} from '@/components/ui/badge';
import {
  Progress
} from '@/components/ui/progress';
import {
  Alert, AlertDescription, AlertTitle
} from '@/components/ui/alert';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Label as UiLabel
} from '@/components/ui/label';
import {
  Separator
} from '@/components/ui/separator';
import {
  RadioGroup, RadioGroupItem
} from '@/components/ui/radio-group';
import {
  Checkbox
} from '@/components/ui/checkbox';
import {
  ScrollArea
} from '@/components/ui/scroll-area';
import {
  toast
} from 'sonner';
import {
  Loader2, Zap, Brain, Eye, Filter, Settings, Play, Pause,
  RefreshCw, Download, Upload, Search, Grid, List, BarChart3,
  PieChart as PieChartIcon, Network, Sparkles, Cpu, Database,
  Shield, TrendingUp, Layers, Tag, Hash, Palette, Type, Users,
  BarChart as BarChartIcon, LineChart as LineChartIcon,
  ScatterChart as ScatterChartIcon, Globe, Server, Image,
  FileText, GitBranch, CpuIcon, ShoppingCart, CreditCard,
  Package, Target, AlertCircle, CheckCircle, XCircle, ArrowUpRight,
  ArrowDownRight, Clock, Calendar, BarChart4, ChevronRight, Info,
  HelpCircle, ExternalLink, Copy, EyeOff, MoreHorizontal, Maximize2,
  Minimize2, RotateCcw, AlertTriangle, StopCircle, UploadCloud,
  DownloadCloud, DatabaseIcon, MemoryStick, HardDrive, NetworkIcon,
  ShieldCheck, ShieldAlert, Wifi, WifiOff, Activity, Thermometer,
  Gauge, Battery, BatteryFull, BatteryCharging, Cloud, CloudOff,
  ServerIcon, Terminal, Code, Bug, TestTube, Beaker, FlaskConical,
  Microscope, Rocket, Satellite, Orbit, Globe2, Map as MapIcon, Navigation,
  Compass, Lightbulb, LightbulbOff, Sun, Moon, Star, SparklesIcon,
  Lock, Unlock, Key, Fingerprint, Scan, QrCode, Barcode, Bell,
  BellOff, Megaphone, Volume2, VolumeX, MessageSquare, Mail, Inbox,
  Send, Paperclip, File, Folder, FolderOpen, Archive, Trash2, Save,
  Edit, Copy as CopyIcon, Share, Link, Unlink, Grid3X3, Columns,
  Rows, Layout, Sidebar, SidebarClose, Menu, X, Plus, Minus, Divide,
  Percent, Equal, ChevronUp,
  ChevronDown, ChevronLeft, ChevronRight as ChevronRightIcon,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Move, RotateCw as RotateCwIcon,
  ZoomIn, ZoomOut, Home, Settings as SettingsIcon, User, Users as UsersIcon,
  Building, Factory, Store, ShoppingBag, Truck, Package2, Box,
  PackageOpen, Layers2, Grid3x3, Hash as HashIcon, Type as TypeIcon,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List as ListIcon,
  CheckSquare, Square, Circle, Hexagon, Octagon, Triangle, Diamond,
  Pentagon, Octagon as OctagonIcon, Star as StarIcon, Heart, Flag,
  Bookmark, Tag as TagIcon, Hash as HashIcon2, DollarSign, Euro,
  PoundSterling, Bitcoin, CreditCard as CreditCardIcon, Wallet,
  TrendingUp as TrendingUpIcon, TrendingDown, BarChart2,
  LineChart as LineChartIcon2, PieChart as PieChartIcon2, Smartphone,
  Tablet, Monitor, Laptop, Printer, Camera, Video, Mic, Headphones,
  Speaker, Wifi as WifiIcon, Bluetooth, Radio, SatelliteDish,
  Cpu as CpuIcon2, HardDrive as HardDriveIcon,
  Database as DatabaseIcon2, Server as ServerIcon2, Router,
  Network as NetworkIcon2, Cloud as CloudIcon,
  CloudRain, CloudSnow, CloudLightning, Sun as SunIcon, Moon as MoonIcon,
  Wind, Droplets, Thermometer as ThermometerIcon, Waves, Umbrella, Leaf,
  TreePine, Flower2, Sprout, TreeDeciduous, Mountain, Tent,
  Home as HomeIcon, Building2, Factory as FactoryIcon, Warehouse,
  Store as StoreIcon, Hospital, School, Church, Castle,
  TowerControl, Ship, Plane, Car, Bike, Bus, Train, Truck as TruckIcon,
  Rocket as RocketIcon, Satellite as SatelliteIcon, Globe as GlobeIcon,
  MapPin, Navigation2, Compass as CompassIcon, Flag as FlagIcon,
  Trophy, Medal, Crown, Award, Target as TargetIcon, Crosshair,
  CircleDot, Hexagon as HexagonIcon, Octagon as OctagonIcon2,
  Diamond as DiamondIcon, Star as StarIcon2, Heart as HeartIcon,
  Bell as BellIcon, AlarmClock, Timer, Watch, CalendarDays,
  Clock as ClockIcon, Hourglass, Calendar as CalendarIcon,
  Folder as FolderIcon, FolderOpen as FolderOpenIcon, File as FileIcon,
  FileText as FileTextIcon, FileCode, FileSpreadsheet, FileImage,
  FileAudio, FileVideo, FileArchive, FileSignature, FileCheck,
  FileX, FilePlus, FileMinus, FileQuestion, FileWarning, FileInput,
  FileOutput, FileSearch, FileBarChart, FilePieChart, FileStack,
  FileKey, FileLock, FileUp, FileDown, FileHeart, FileClock,
  FolderPlus, FolderMinus, FolderSearch, FolderLock,
  FolderKanban, FolderGit, FolderGit2, FolderTree, FolderSync,
  FolderX, FolderCheck, Book, BookOpen, BookMarked, BookUp,
  BookDown, Notebook, NotebookText, NotepadText, StickyNote,
  Newspaper, Clipboard, ClipboardCheck, ClipboardCopy, ClipboardEdit,
  ClipboardList, ClipboardX, ClipboardPaste, CalendarCheck,
  CalendarX, CalendarPlus, CalendarMinus, CalendarRange,
  CalendarSearch, CalendarClock, AlarmSmoke, AlarmClockCheck,
  AlarmClockOff, TimerReset, TimerOff, WatchIcon,
  HourglassIcon, Clock1, Clock2, Clock3, Clock4,
  Clock5, Clock6, Clock7, Clock8, Clock9, Clock10, Clock11,
  Clock12, Users2, ServerCog, BrainCircuit, ShieldHalf,
  Cpu as Cpu3, Zap as Zap2, Brain as Brain2, Atom, GitMerge,
  GitPullRequest, GitCompare, GitCommit, GitBranch as GitBranch2,
  GitFork, GitPullRequestClosed, GitMerge as GitMerge2,
  Share2, Repeat, RefreshCcw as RefreshCcw2, Rotate3D,
  Layers3, Filter as Filter2, Sliders, ToggleLeft, ToggleRight,
  ToggleLeft as ToggleLeft2, ToggleRight as ToggleRight2,
  ChevronUp as ChevronUp2, ChevronDown as ChevronDown2,
  ChevronLeft as ChevronLeft2, ChevronRight as ChevronRightIcon2,
  ArrowUpCircle, ArrowDownCircle, ArrowLeftCircle, ArrowRightCircle,
  Move as Move2, RotateCcw as RotateCcw2, ZoomIn as ZoomIn2,
  ZoomOut as ZoomOut2, Maximize as Maximize2Icon,
  Minimize as Minimize2Icon, ExternalLink as ExternalLink2,
  Link as Link2, Unlink as Unlink2, Share as Share2Icon,
  Upload as Upload2, Download as Download2, Copy as Copy2,
  FileUp as FileUp2, FileDown as FileDown2, FolderUp, FolderDown,
  FolderInput, FolderOutput, FolderX as FolderX2, FolderCheck as FolderCheck2,
  FolderPlus as FolderPlus2, FolderMinus as FolderMinus2,
  FolderSearch as FolderSearch2, FolderKey, FolderLock as FolderLock2,
  FolderOpen as FolderOpen3, Target as Target2, TrendingUp as TrendingUp2,
  GitCompareArrows, GitPullRequest as GitPullRequest2,
  GitCommit as GitCommit2, GitMerge as GitMerge3,
  GitBranch as GitBranch3, GitFork as GitFork2,
  GitPullRequestClosed as GitPullRequestClosed2,
  GitCompareArrows as GitCompareArrows2, GitPullRequestDraft
} from 'lucide-react';
import { format, subHours, subDays, addDays, subMonths } from 'date-fns';

// ========== ADVANCED TYPES ==========

// 1. Multimodal Fusion
interface CrossModalAttention {
  visionToTextAttention: number[][];
  textToVisionAttention: number[][];
  attributeAttentionWeights: number[];
  temporalAttention: number[][];
}

interface EnhancedEmbedding {
  coarseEmbedding: number[];
  mediumEmbedding: number[];
  fineEmbedding: number[];
  temporalEmbedding: number[][];
  embeddingVariance: number[];
  confidenceScores: {
    vision: number;
    text: number;
    attributes: number;
    behavior: number;
  };
}

// 2. Hierarchical Clustering
interface HierarchicalCluster {
  level: 'macro' | 'meso' | 'micro';
  parentId: string | null;
  children: string[];
  distinguishingFeatures: string[];
  noveltyScore: number;
  stabilityScore: number;
  depth: number;
}

// 3. Temporal Evolution
interface TemporalCluster {
  birth: Date;
  evolution: {
    timestamp: Date;
    centroid: number[];
    size: number;
    dominantFeatures: string[];
    metrics: {
      silhouetteScore: number;
      daviesBouldin: number;
    };
  }[];
  death?: Date;
  trends: {
    growthRate: number;
    featureDrift: number[];
    seasonality: {
      pattern: 'weekly' | 'monthly' | 'seasonal';
      amplitude: number;
      phase: number;
    };
  };
  predictedState: {
    futureCentroid: number[];
    predictedSize: number;
    confidence: number;
    timeline: Date;
  };
}

// 4. Intent-Aware Clustering
interface UserIntent {
  type: 'visual_search' | 'text_search' | 'price_comparison' | 'trend_discovery' | 'browsing';
  confidence: number;
  query?: string;
  sessionContext: SessionContext;
}

interface SessionContext {
  userHistory: string[];
  currentSessionProducts: string[];
  inferredPreferences: {
    stylePreferences: string[];
    priceSensitivity: number;
    brandAffinity: string[];
  };
}

// 5. Causal Inference
interface CausalImpact {
  treatment: 'price_change' | 'image_update' | 'description_rewrite' | 'feature_addition';
  effect: {
    clusterLevelImpact: number;
    individualProductImpact: Map<string, number>;
    confidenceIntervals: [number, number];
    statisticalSignificance: number;
  };
  attribution: {
    featureContributions: Map<string, number>;
    interactionEffects: Map<string, number>;
    mediationEffects: Map<string, number>;
  };
  counterfactuals: Counterfactual[];
}

interface Counterfactual {
  scenario: string;
  predictedOutcome: number;
  confidence: number;
  recommendations: string[];
}

// 6. Predictive Capabilities
interface DemandForecast {
  clusterId: string;
  predictions: {
    shortTerm: {
      nextWeek: number;
      nextMonth: number;
      confidence: number;
    };
    longTerm: {
      nextQuarter: number;
      nextYear: number;
      seasonalityPattern: string;
    };
  };
  drivers: {
    trendContribution: number;
    seasonalityContribution: number;
    externalFactorContribution: number;
  };
  anomalies: Anomaly[];
}

interface Anomaly {
  type: 'outlier' | 'novelty' | 'drift' | 'opportunity';
  severity: number;
  location: {
    clusterId?: string;
    productId?: string;
    featureSpace: number[];
  };
  explanation: string;
  recommendedAction: string;
  timestamp: Date;
}

// 7. Federated Learning
interface FederatedClient {
  id: string;
  dataSize: number;
  privacyBudget: number;
  lastUpdate: Date;
  contribution: number;
}

interface FederatedUpdate {
  clientId: string;
  parameters: number[];
  privacyNoise: number;
  timestamp: Date;
}

// 8. Generative Capabilities
interface GeneratedContent {
  type: 'description' | 'image' | 'attributes' | 'title';
  content: string;
  style: string;
  relevance: number;
  originality: number;
}

interface StyleTransfer {
  sourceCluster: string;
  targetCluster: string;
  transferStrength: number;
  generatedVariants: GeneratedVariant[];
}

interface GeneratedVariant {
  productId: string;
  styleAttributes: Record<string, any>;
  predictedImpact: number;
}

// 9. Explainable AI
interface ClusterExplanation {
  summary: string;
  keyFeatures: {
    feature: string;
    importance: number;
    value: string | number;
    comparison: 'higher' | 'lower' | 'unique';
    contribution: number;
  }[];
  whatMakesItDifferent: string[];
  closestNeighbors: {
    cluster: string;
    similarity: number;
    keyDifferences: string[];
  }[];
  drivers: {
    feature: string;
    causalImpact: number;
    confidence: number;
    evidence: string[];
  }[];
  whatIfScenarios: WhatIfScenario[];
}

interface WhatIfScenario {
  scenario: string;
  predictedChange: number;
  confidence: number;
  recommendations: string[];
}

// 10. Reinforcement Learning
interface RLState {
  clusteringMetrics: {
    silhouetteScore: number;
    daviesBouldin: number;
    calinskiHarabasz: number;
  };
  businessMetrics: {
    revenueImpact: number;
    conversionImpact: number;
    customerSatisfaction: number;
  };
  computationalCost: {
    trainingTime: number;
    inferenceTime: number;
    memoryUsage: number;
  };
}

interface RLAction {
  algorithm: 'hdbscan' | 'kmeans' | 'spectral' | 'dbscan' | 'optics';
  parameters: {
    minSamples: number;
    epsilon: number;
    minClusterSize: number;
    nClusters?: number;
  };
  embeddingWeights: {
    vision: number;
    text: number;
    attributes: number;
    behavior: number;
  };
}

interface RLReward {
  total: number;
  components: {
    clusteringQuality: number;
    businessImpact: number;
    computationalEfficiency: number;
    stability: number;
  };
}

// Enhanced Product Type
interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  brand: string;
  views: number;
  clicks: number;
  purchases: number;
  conversionRate: number;
  clusterId: string;
  embedding: number[];
  visionEmbedding: number[];
  textEmbedding: number[];
  attributes: Record<string, any>;
  behavioralSignals: {
    dwellTime: number;
    returns: number;
    bounceRate: number;
  };
  enhancedEmbedding?: EnhancedEmbedding;
  crossModalAttention?: CrossModalAttention;
}

// Enhanced Cluster Type
interface Cluster {
  id: string;
  name: string;
  type: 'style' | 'functional' | 'price' | 'occasion' | 'behavioral';
  productCount: number;
  revenue: number;
  growth: number;
  conversionRate: number;
  returnRate: number;
  avgPrice: number;
  color: string;
  metadata: {
    dominantCategory: string;
    priceRange: [number, number];
    avgRating: number;
    styleKeywords: string[];
    attributes: Record<string, any>;
  };
  centroid: number[];
  radius: number;
  density: number;
  
  // Advanced functionalities
  hierarchicalInfo?: HierarchicalCluster;
  temporalInfo?: TemporalCluster;
  userIntent?: UserIntent;
  causalImpacts?: CausalImpact[];
  demandForecast?: DemandForecast;
  anomalies?: Anomaly[];
  federatedInfo?: {
    clients: FederatedClient[];
    lastAggregation: Date;
  };
  generatedContent?: GeneratedContent[];
  styleTransfers?: StyleTransfer[];
  explanation?: ClusterExplanation;
  rlConfig?: {
    state: RLState;
    action: RLAction;
    reward: RLReward;
  };
}

// ========== ADVANCED CALCULATION FUNCTIONS ==========

// 1. Multimodal Fusion Calculations
const calculateMultimodalMetrics = (products: Product[]) => {
  const totalProducts = products.length;
  const productsWithEnhancedEmbeddings = products.filter(p => p.enhancedEmbedding).length;
  const productsWithAttention = products.filter(p => p.crossModalAttention).length;
  
  // Calculate average confidence scores
  const avgConfidences = {
    vision: 0,
    text: 0,
    attributes: 0,
    behavior: 0
  };
  
  products.forEach(p => {
    if (p.enhancedEmbedding) {
      avgConfidences.vision += p.enhancedEmbedding.confidenceScores.vision;
      avgConfidences.text += p.enhancedEmbedding.confidenceScores.text;
      avgConfidences.attributes += p.enhancedEmbedding.confidenceScores.attributes;
      avgConfidences.behavior += p.enhancedEmbedding.confidenceScores.behavior;
    }
  });
  
  const count = productsWithEnhancedEmbeddings || 1;
  Object.keys(avgConfidences).forEach(key => {
    avgConfidences[key as keyof typeof avgConfidences] /= count;
  });
  
  // Calculate attention strength
  let avgAttentionStrength = 0;
  products.forEach(p => {
    if (p.crossModalAttention) {
      const visionToText = p.crossModalAttention.visionToTextAttention.flat().reduce((a, b) => a + b, 0);
      const textToVision = p.crossModalAttention.textToVisionAttention.flat().reduce((a, b) => a + b, 0);
      avgAttentionStrength += (visionToText + textToVision) / 2;
    }
  });
  avgAttentionStrength /= productsWithAttention || 1;
  
  return {
    totalProducts,
    productsWithEnhancedEmbeddings,
    productsWithAttention,
    coverage: (productsWithEnhancedEmbeddings / totalProducts) * 100,
    avgConfidences,
    avgAttentionStrength,
    fusionQuality: (avgConfidences.vision * 0.3 + avgConfidences.text * 0.3 + 
                   avgConfidences.attributes * 0.2 + avgConfidences.behavior * 0.2) * 100
  };
};

// 2. Hierarchical Clustering Calculations
const calculateHierarchicalMetrics = (clusters: Cluster[]) => {
  const hierarchicalClusters = clusters.filter(c => c.hierarchicalInfo);
  const levels = {
    macro: hierarchicalClusters.filter(c => c.hierarchicalInfo?.level === 'macro').length,
    meso: hierarchicalClusters.filter(c => c.hierarchicalInfo?.level === 'meso').length,
    micro: hierarchicalClusters.filter(c => c.hierarchicalInfo?.level === 'micro').length
  };
  
  const avgNovelty = hierarchicalClusters.reduce((sum, c) => 
    sum + (c.hierarchicalInfo?.noveltyScore || 0), 0) / hierarchicalClusters.length || 0;
  
  const avgStability = hierarchicalClusters.reduce((sum, c) => 
    sum + (c.hierarchicalInfo?.stabilityScore || 0), 0) / hierarchicalClusters.length || 0;
  
  const treeDepth = Math.max(...hierarchicalClusters.map(c => c.hierarchicalInfo?.depth || 0));
  
  return {
    totalHierarchicalClusters: hierarchicalClusters.length,
    levels,
    avgNovelty: avgNovelty * 100,
    avgStability: avgStability * 100,
    treeDepth,
    hierarchyQuality: (avgNovelty * 0.4 + avgStability * 0.6) * 100
  };
};

// 3. Temporal Evolution Calculations
const calculateTemporalMetrics = (clusters: Cluster[]) => {
  const temporalClusters = clusters.filter(c => c.temporalInfo);
  
  const metrics = temporalClusters.reduce((acc, cluster) => {
    if (!cluster.temporalInfo) return acc;
    
    const evolution = cluster.temporalInfo.evolution;
    if (evolution.length < 2) return acc;
    
    // Calculate growth rate
    const firstSize = evolution[0].size;
    const lastSize = evolution[evolution.length - 1].size;
    const growthRate = ((lastSize - firstSize) / firstSize) * 100;
    
    // Calculate drift magnitude
    const driftMagnitude = cluster.temporalInfo.trends.featureDrift.reduce((sum, d) => sum + Math.abs(d), 0);
    
    // Calculate prediction confidence
    const predictionConfidence = cluster.temporalInfo.predictedState?.confidence || 0;
    
    return {
      totalGrowth: acc.totalGrowth + growthRate,
      totalDrift: acc.totalDrift + driftMagnitude,
      totalConfidence: acc.totalConfidence + predictionConfidence,
      count: acc.count + 1
    };
  }, { totalGrowth: 0, totalDrift: 0, totalConfidence: 0, count: 0 });
  
  const avgGrowth = metrics.totalGrowth / (metrics.count || 1);
  const avgDrift = metrics.totalDrift / (metrics.count || 1);
  const avgConfidence = metrics.totalConfidence / (metrics.count || 1);
  
  return {
    totalTemporalClusters: temporalClusters.length,
    avgGrowth,
    avgDrift,
    avgConfidence: avgConfidence * 100,
    temporalStability: (1 - Math.min(avgDrift, 1)) * 100,
    predictionAccuracy: avgConfidence * 100
  };
};

// 4. Intent-Aware Calculations
const calculateIntentMetrics = (clusters: Cluster[]) => {
  const intentClusters = clusters.filter(c => c.userIntent);
  
  const intentDistribution = {
    visual_search: 0,
    text_search: 0,
    price_comparison: 0,
    trend_discovery: 0,
    browsing: 0
  };
  
  let totalConfidence = 0;
  
  intentClusters.forEach(cluster => {
    if (cluster.userIntent) {
      intentDistribution[cluster.userIntent.type]++;
      totalConfidence += cluster.userIntent.confidence;
    }
  });
  
  // Calculate diversity score
  const total = intentClusters.length;
  const diversity = Object.values(intentDistribution).reduce((score, count) => {
    const proportion = count / total;
    return score - (proportion > 0 ? proportion * Math.log(proportion) : 0);
  }, 0) / Math.log(Object.keys(intentDistribution).length);
  
  const avgConfidence = totalConfidence / (intentClusters.length || 1);
  
  return {
    totalIntentClusters: intentClusters.length,
    intentDistribution,
    avgConfidence: avgConfidence * 100,
    intentDiversity: diversity * 100,
    personalizationScore: (avgConfidence * 0.7 + diversity * 0.3) * 100
  };
};

// 5. Causal Inference Calculations
const calculateCausalMetrics = (clusters: Cluster[]) => {
  const causalClusters = clusters.filter(c => c.causalImpacts && c.causalImpacts.length > 0);
  
  const impactAnalysis = causalClusters.reduce((acc, cluster) => {
    if (!cluster.causalImpacts) return acc;
    
    cluster.causalImpacts.forEach(impact => {
      acc.totalImpact += Math.abs(impact.effect.clusterLevelImpact);
      acc.totalSignificance += impact.effect.statisticalSignificance;
      acc.treatments.add(impact.treatment);
    });
    
    return {
      ...acc,
      count: acc.count + cluster.causalImpacts.length
    };
  }, { totalImpact: 0, totalSignificance: 0, treatments: new Set<string>(), count: 0 });
  
  const avgImpact = impactAnalysis.totalImpact / (impactAnalysis.count || 1);
  const avgSignificance = impactAnalysis.totalSignificance / (impactAnalysis.count || 1);
  const treatmentDiversity = impactAnalysis.treatments.size;
  
  return {
    totalCausalClusters: causalClusters.length,
    totalTreatments: impactAnalysis.count,
    uniqueTreatments: treatmentDiversity,
    avgImpact: avgImpact * 100,
    avgSignificance: avgSignificance * 100,
    causalPower: (avgImpact * 0.6 + avgSignificance * 0.4) * 100
  };
};

// 6. Predictive Analytics Calculations
const calculatePredictiveMetrics = (clusters: Cluster[]) => {
  const predictiveClusters = clusters.filter(c => c.demandForecast);
  
  const forecastMetrics = predictiveClusters.reduce((acc, cluster) => {
    if (!cluster.demandForecast) return acc;
    
    const forecast = cluster.demandForecast;
    acc.totalConfidence += forecast.predictions.shortTerm.confidence;
    acc.totalAnomalies += forecast.anomalies?.length || 0;
    acc.seasonalClusters += forecast.predictions.longTerm.seasonalityPattern !== 'Consistent' ? 1 : 0;
    
    return acc;
  }, { totalConfidence: 0, totalAnomalies: 0, seasonalClusters: 0, count: predictiveClusters.length });
  
  const avgConfidence = forecastMetrics.totalConfidence / (forecastMetrics.count || 1);
  const avgAnomaliesPerCluster = forecastMetrics.totalAnomalies / (forecastMetrics.count || 1);
  const seasonalRatio = forecastMetrics.seasonalClusters / (forecastMetrics.count || 1);
  
  return {
    totalPredictiveClusters: predictiveClusters.length,
    avgConfidence: avgConfidence * 100,
    totalAnomalies: forecastMetrics.totalAnomalies,
    avgAnomaliesPerCluster,
    seasonalClusters: forecastMetrics.seasonalClusters,
    seasonalRatio: seasonalRatio * 100,
    predictivePower: (avgConfidence * 0.8 + (1 - Math.min(avgAnomaliesPerCluster / 10, 1)) * 0.2) * 100
  };
};

// 7. Federated Learning Calculations
const calculateFederatedMetrics = (clusters: Cluster[]) => {
  const federatedClusters = clusters.filter(c => c.federatedInfo);
  
  const metrics = federatedClusters.reduce((acc, cluster) => {
    if (!cluster.federatedInfo) return acc;
    
    const info = cluster.federatedInfo;
    acc.totalClients += info.clients.length;
    acc.totalPrivacy += info.clients.reduce((sum, client) => sum + client.privacyBudget, 0);
    acc.totalContribution += info.clients.reduce((sum, client) => sum + client.contribution, 0);
    acc.totalDataSize += info.clients.reduce((sum, client) => sum + client.dataSize, 0);
    
    return acc;
  }, { totalClients: 0, totalPrivacy: 0, totalContribution: 0, totalDataSize: 0, count: federatedClusters.length });
  
  const avgClientsPerCluster = metrics.totalClients / (metrics.count || 1);
  const avgPrivacy = metrics.totalPrivacy / (metrics.totalClients || 1);
  const avgContribution = metrics.totalContribution / (metrics.totalClients || 1);
  const avgDataSize = metrics.totalDataSize / (metrics.totalClients || 1);
  
  return {
    totalFederatedClusters: federatedClusters.length,
    totalClients: metrics.totalClients,
    avgClientsPerCluster,
    avgPrivacy,
    avgContribution: avgContribution * 100,
    avgDataSize,
    privacyScore: avgPrivacy * 100,
    collaborationScore: (avgContribution * 0.7 + (avgClientsPerCluster / 10) * 0.3) * 100
  };
};

// 8. Generative AI Calculations
const calculateGenerativeMetrics = (clusters: Cluster[]) => {
  const generativeClusters = clusters.filter(c => c.generatedContent && c.generatedContent.length > 0);
  
  const metrics = generativeClusters.reduce((acc, cluster) => {
    if (!cluster.generatedContent) return acc;
    
    const content = cluster.generatedContent;
    acc.totalContent += content.length;
    acc.totalRelevance += content.reduce((sum, c) => sum + c.relevance, 0);
    acc.totalOriginality += content.reduce((sum, c) => sum + c.originality, 0);
    
    const types = new Set(content.map(c => c.type));
    acc.uniqueTypes += types.size;
    
    if (cluster.styleTransfers && cluster.styleTransfers.length > 0) {
      acc.styleTransfers += cluster.styleTransfers.length;
    }
    
    return acc;
  }, { totalContent: 0, totalRelevance: 0, totalOriginality: 0, uniqueTypes: 0, styleTransfers: 0, count: generativeClusters.length });
  
  const avgContentPerCluster = metrics.totalContent / (metrics.count || 1);
  const avgRelevance = metrics.totalRelevance / (metrics.totalContent || 1);
  const avgOriginality = metrics.totalOriginality / (metrics.totalContent || 1);
  const avgTypesPerCluster = metrics.uniqueTypes / (metrics.count || 1);
  
  return {
    totalGenerativeClusters: generativeClusters.length,
    totalContent: metrics.totalContent,
    avgContentPerCluster,
    avgRelevance: avgRelevance * 100,
    avgOriginality: avgOriginality * 100,
    uniqueTypes: metrics.uniqueTypes,
    styleTransfers: metrics.styleTransfers,
    creativityScore: (avgRelevance * 0.4 + avgOriginality * 0.6) * 100,
    diversityScore: (avgTypesPerCluster / 4) * 100
  };
};

// 9. Explainable AI Calculations
const calculateExplainableMetrics = (clusters: Cluster[]) => {
  const explainableClusters = clusters.filter(c => c.explanation);
  
  const metrics = explainableClusters.reduce((acc, cluster) => {
    if (!cluster.explanation) return acc;
    
    const explanation = cluster.explanation;
    
    // Feature importance
    const avgFeatureImportance = explanation.keyFeatures.reduce((sum, f) => sum + f.importance, 0) / 
                                 explanation.keyFeatures.length;
    
    // Driver confidence
    const avgDriverConfidence = explanation.drivers.reduce((sum, d) => sum + d.confidence, 0) / 
                                explanation.drivers.length;
    
    // Scenario analysis
    const avgScenarioConfidence = explanation.whatIfScenarios.reduce((sum, s) => sum + s.confidence, 0) / 
                                  explanation.whatIfScenarios.length;
    
    acc.totalFeatureImportance += avgFeatureImportance;
    acc.totalDriverConfidence += avgDriverConfidence;
    acc.totalScenarioConfidence += avgScenarioConfidence;
    acc.totalFeatures += explanation.keyFeatures.length;
    acc.totalDrivers += explanation.drivers.length;
    acc.totalScenarios += explanation.whatIfScenarios.length;
    
    return acc;
  }, { totalFeatureImportance: 0, totalDriverConfidence: 0, totalScenarioConfidence: 0, 
       totalFeatures: 0, totalDrivers: 0, totalScenarios: 0, count: explainableClusters.length });
  
  const avgFeatureImportance = metrics.totalFeatureImportance / (metrics.count || 1);
  const avgDriverConfidence = metrics.totalDriverConfidence / (metrics.count || 1);
  const avgScenarioConfidence = metrics.totalScenarioConfidence / (metrics.count || 1);
  const avgFeaturesPerCluster = metrics.totalFeatures / (metrics.count || 1);
  const avgDriversPerCluster = metrics.totalDrivers / (metrics.count || 1);
  const avgScenariosPerCluster = metrics.totalScenarios / (metrics.count || 1);
  
  return {
    totalExplainableClusters: explainableClusters.length,
    avgFeatureImportance: avgFeatureImportance * 100,
    avgDriverConfidence: avgDriverConfidence * 100,
    avgScenarioConfidence: avgScenarioConfidence * 100,
    avgFeaturesPerCluster,
    avgDriversPerCluster,
    avgScenariosPerCluster,
    interpretabilityScore: (avgFeatureImportance * 0.3 + avgDriverConfidence * 0.4 + avgScenarioConfidence * 0.3) * 100,
    completenessScore: ((avgFeaturesPerCluster / 10) * 0.4 + (avgDriversPerCluster / 5) * 0.3 + (avgScenariosPerCluster / 3) * 0.3) * 100
  };
};

// 10. Reinforcement Learning Calculations
const calculateRLMetrics = (clusters: Cluster[]) => {
  const rlClusters = clusters.filter(c => c.rlConfig);
  
  const metrics = rlClusters.reduce((acc, cluster) => {
    if (!cluster.rlConfig) return acc;
    
    const config = cluster.rlConfig;
    
    // Clustering metrics
    const clusteringQuality = config.state.clusteringMetrics.silhouetteScore;
    
    // Business metrics
    const businessImpact = config.state.businessMetrics.revenueImpact;
    
    // Computational metrics
    const computationalEfficiency = 1 / (config.state.computationalCost.inferenceTime / 1000);
    
    // Reward components
    const rewardQuality = config.reward.components.clusteringQuality;
    const rewardBusiness = config.reward.components.businessImpact;
    const rewardEfficiency = config.reward.components.computationalEfficiency;
    const rewardStability = config.reward.components.stability;
    
    acc.totalClusteringQuality += clusteringQuality;
    acc.totalBusinessImpact += businessImpact;
    acc.totalComputationalEfficiency += computationalEfficiency;
    acc.totalReward += config.reward.total;
    acc.totalRewardQuality += rewardQuality;
    acc.totalRewardBusiness += rewardBusiness;
    acc.totalRewardEfficiency += rewardEfficiency;
    acc.totalRewardStability += rewardStability;
    
    return acc;
  }, { totalClusteringQuality: 0, totalBusinessImpact: 0, totalComputationalEfficiency: 0, 
       totalReward: 0, totalRewardQuality: 0, totalRewardBusiness: 0, totalRewardEfficiency: 0,
       totalRewardStability: 0, count: rlClusters.length });
  
  const avgClusteringQuality = metrics.totalClusteringQuality / (metrics.count || 1);
  const avgBusinessImpact = metrics.totalBusinessImpact / (metrics.count || 1);
  const avgComputationalEfficiency = metrics.totalComputationalEfficiency / (metrics.count || 1);
  const avgReward = metrics.totalReward / (metrics.count || 1);
  const avgRewardQuality = metrics.totalRewardQuality / (metrics.count || 1);
  const avgRewardBusiness = metrics.totalRewardBusiness / (metrics.count || 1);
  const avgRewardEfficiency = metrics.totalRewardEfficiency / (metrics.count || 1);
  const avgRewardStability = metrics.totalRewardStability / (metrics.count || 1);
  
  return {
    totalRLClusters: rlClusters.length,
    avgClusteringQuality: avgClusteringQuality * 100,
    avgBusinessImpact: avgBusinessImpact * 100,
    avgComputationalEfficiency,
    avgReward,
    avgRewardQuality,
    avgRewardBusiness,
    avgRewardEfficiency,
    avgRewardStability,
    optimizationScore: (avgReward * 100) / 10, // Normalize to 0-100
    balanceScore: ((avgRewardQuality + avgRewardBusiness + avgRewardEfficiency + avgRewardStability) / 4) * 100
  };
};

// ========== ADVANCED VISUALIZATION COMPONENTS ==========

// 1. Multimodal Fusion Dashboard
const MultimodalFusionDashboard: React.FC<{
  products: Product[];
  clusters: Cluster[];
}> = ({ products, clusters }) => {
  const metrics = calculateMultimodalMetrics(products);
  
  const confidenceData = Object.entries(metrics.avgConfidences).map(([modality, score]) => ({
    modality: modality.charAt(0).toUpperCase() + modality.slice(1),
    score: score * 100,
    fill: modality === 'vision' ? '#8884d8' :
          modality === 'text' ? '#82ca9d' :
          modality === 'attributes' ? '#ffc658' : '#ff7300'
  }));
  
  const fusionMetrics = [
    { name: 'Coverage', value: metrics.coverage.toFixed(1), unit: '%' },
    { name: 'Fusion Quality', value: metrics.fusionQuality.toFixed(1), unit: '%' },
    { name: 'Attention Strength', value: (metrics.avgAttentionStrength * 100).toFixed(1), unit: '%' },
    { name: 'Enhanced Products', value: metrics.productsWithEnhancedEmbeddings.toString() }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers2 className="h-5 w-5" />
          Multimodal Fusion Dashboard
        </CardTitle>
        <CardDescription>
          Cross-modal attention and embedding fusion analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fusionMetrics.map((metric) => (
            <Card key={metric.name}>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{metric.value}{metric.unit}</div>
                <div className="text-sm text-muted-foreground">{metric.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Confidence Scores Radar */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Modality Confidence Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={confidenceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="modality" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Confidence"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <RechartsTooltip formatter={(value) => [`${value}%`, 'Confidence']} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Attention Heatmap Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Cross-Modal Attention Preview</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Vision → Text Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="flex gap-1">
                      {Array.from({ length: 16 }).map((_, j) => (
                        <div
                          key={j}
                          className="w-3 h-3 rounded-sm"
                          style={{
                            backgroundColor: `rgba(59, 130, 246, ${Math.random() * 0.8 + 0.2})`,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Text → Vision Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="flex gap-1">
                      {Array.from({ length: 16 }).map((_, j) => (
                        <div
                          key={j}
                          className="w-3 h-3 rounded-sm"
                          style={{
                            backgroundColor: `rgba(16, 185, 129, ${Math.random() * 0.8 + 0.2})`,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Multi-scale Embedding Distribution */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Embedding Scale Distribution</h3>
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Coarse Embeddings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32D</div>
                <Progress value={100} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Medium Embeddings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">64D</div>
                <Progress value={100} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Fine Embeddings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128D</div>
                <Progress value={100} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 2. Hierarchical Clustering Dashboard
const HierarchicalClusteringDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculateHierarchicalMetrics(clusters);
  
  const levelData = [
    { name: 'Macro', value: metrics.levels.macro, fill: '#8884d8' },
    { name: 'Meso', value: metrics.levels.meso, fill: '#82ca9d' },
    { name: 'Micro', value: metrics.levels.micro, fill: '#ffc658' }
  ];
  
  const treeData = {
    name: 'Root',
    children: clusters.slice(0, 5).map(cluster => ({
      name: cluster.name,
      size: cluster.productCount,
      color: cluster.color,
      children: clusters.slice(5, 10).filter(c => 
        c.hierarchicalInfo?.parentId === cluster.id
      ).map(child => ({
        name: child.name,
        size: child.productCount,
        color: child.color
      }))
    }))
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch2 className="h-5 w-5" />
          Hierarchical Clustering Dashboard
        </CardTitle>
        <CardDescription>
          Multi-resolution cluster hierarchy and analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalHierarchicalClusters}</div>
              <div className="text-sm text-muted-foreground">Hierarchical Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.treeDepth}</div>
              <div className="text-sm text-muted-foreground">Tree Depth</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgNovelty.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Novelty</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgStability.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Stability</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Distribution */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Cluster Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={levelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {levelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Hierarchy Quality Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hierarchy Quality Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Hierarchy Quality</span>
                <span className="text-sm font-medium">{metrics.hierarchyQuality.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.hierarchyQuality} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Novelty Score</span>
                <span className="text-sm font-medium">{metrics.avgNovelty.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgNovelty} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Stability Score</span>
                <span className="text-sm font-medium">{metrics.avgStability.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgStability} className="h-2" />
            </div>
          </div>
        </div>

        {/* Tree Structure Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hierarchy Structure Preview</h3>
          <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="space-y-2">
              {clusters.slice(0, 3).map(cluster => (
                <div key={cluster.id} className="space-y-1">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cluster.color }} />
                    <span className="font-medium">{cluster.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {cluster.hierarchicalInfo?.level || 'macro'}
                    </Badge>
                  </div>
                  {clusters.slice(3, 6).filter(c => c.hierarchicalInfo?.parentId === cluster.id).map(child => (
                    <div key={child.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded ml-6">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: child.color }} />
                      <span className="text-sm">{child.name}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {child.hierarchicalInfo?.level || 'meso'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 3. Temporal Evolution Dashboard
const TemporalEvolutionDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculateTemporalMetrics(clusters);
  
  const evolutionData = clusters
    .filter(c => c.temporalInfo && c.temporalInfo.evolution.length > 0)
    .slice(0, 5)
    .flatMap(cluster => 
      cluster.temporalInfo!.evolution.map((e, i) => ({
        cluster: cluster.name,
        time: format(e.timestamp, 'MMM d'),
        size: e.size,
        silhouette: e.metrics.silhouetteScore * 100,
        index: i
      }))
    );

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Temporal Evolution Dashboard
        </CardTitle>
        <CardDescription>
          Cluster evolution, drift detection, and future predictions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalTemporalClusters}</div>
              <div className="text-sm text-muted-foreground">Temporal Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgGrowth.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Growth</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgDrift.toFixed(3)}</div>
              <div className="text-sm text-muted-foreground">Avg Feature Drift</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.predictionAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Evolution Timeline */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Cluster Evolution Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="size"
                stroke="#8884d8"
                name="Cluster Size"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="silhouette"
                stroke="#82ca9d"
                name="Silhouette Score"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stability Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Temporal Stability Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Temporal Stability</span>
                <span className="text-sm font-medium">{metrics.temporalStability.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.temporalStability} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Feature Drift Control</span>
                <span className="text-sm font-medium">{(100 - metrics.avgDrift * 100).toFixed(1)}%</span>
              </div>
              <Progress value={100 - metrics.avgDrift * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Prediction Confidence</span>
                <span className="text-sm font-medium">{metrics.avgConfidence.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgConfidence} className="h-2" />
            </div>
          </div>
        </div>

        {/* Seasonality Patterns */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Seasonality Detection</h3>
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Weekly Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.filter(c => c.temporalInfo?.trends.seasonality.pattern === 'weekly').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Monthly Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.filter(c => c.temporalInfo?.trends.seasonality.pattern === 'monthly').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Seasonal Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.filter(c => c.temporalInfo?.trends.seasonality.pattern === 'seasonal').length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 4. Intent-Aware Clustering Dashboard
const IntentAwareClusteringDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculateIntentMetrics(clusters);
  
  const intentData = Object.entries(metrics.intentDistribution).map(([intent, count]) => ({
    intent: intent.replace('_', ' ').toUpperCase(),
    count,
    percentage: (count / metrics.totalIntentClusters) * 100,
    color: intent === 'visual_search' ? '#8884d8' :
           intent === 'text_search' ? '#82ca9d' :
           intent === 'price_comparison' ? '#ffc658' :
           intent === 'trend_discovery' ? '#ff7300' : '#387908'
  }));

  const weightProfiles = {
    visual_search: { vision: 0.6, text: 0.2, attributes: 0.1, behavior: 0.1 },
    text_search: { vision: 0.2, text: 0.6, attributes: 0.1, behavior: 0.1 },
    price_comparison: { vision: 0.1, text: 0.2, attributes: 0.5, behavior: 0.2 },
    trend_discovery: { vision: 0.3, text: 0.2, attributes: 0.2, behavior: 0.3 },
    browsing: { vision: 0.3, text: 0.3, attributes: 0.2, behavior: 0.2 }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target2 className="h-5 w-5" />
          Intent-Aware Clustering Dashboard
        </CardTitle>
        <CardDescription>
          User intent detection and adaptive clustering
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalIntentClusters}</div>
              <div className="text-sm text-muted-foreground">Intent Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgConfidence.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.intentDiversity.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Intent Diversity</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.personalizationScore.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Personalization Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Intent Distribution */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Intent Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={intentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="intent" />
              <YAxis />
              <RechartsTooltip formatter={(value) => [`${value}`, 'Clusters']} />
              <Bar dataKey="count" fill="#8884d8">
                {intentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weight Profiles */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Intent Weight Profiles</h3>
          <Tabs defaultValue="visual_search">
            <TabsList className="grid grid-cols-5">
              {Object.keys(weightProfiles).map(intent => (
                <TabsTrigger key={intent} value={intent}>
                  {intent.split('_')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(weightProfiles).map(([intent, weights]) => (
              <TabsContent key={intent} value={intent} className="mt-4">
                <div className="space-y-3">
                  {Object.entries(weights).map(([modality, weight]) => (
                    <div key={modality} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{modality}</span>
                      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${weight * 100}%` }}
                        />
                      </div>
                      <span className="text-sm w-12 text-right">{(weight * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Personalization Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Personalization Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Personalization Score</span>
                <span className="text-sm font-medium">{metrics.personalizationScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.personalizationScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Intent Detection Confidence</span>
                <span className="text-sm font-medium">{metrics.avgConfidence.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgConfidence} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Context Awareness</span>
                <span className="text-sm font-medium">{metrics.intentDiversity.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.intentDiversity} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 5. Causal Inference Dashboard
const CausalInferenceDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculateCausalMetrics(clusters);
  
  const treatmentData = clusters
    .filter(c => c.causalImpacts && c.causalImpacts.length > 0)
    .slice(0, 5)
    .flatMap(cluster => 
      cluster.causalImpacts!.map(impact => ({
        cluster: cluster.name,
        treatment: impact.treatment.replace('_', ' ').toUpperCase(),
        impact: Math.abs(impact.effect.clusterLevelImpact * 100),
        significance: impact.effect.statisticalSignificance * 100,
        color: cluster.color
      }))
    );

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitMerge className="h-5 w-5" />
          Causal Inference Dashboard
        </CardTitle>
        <CardDescription>
          Treatment effect analysis and attribution modeling
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalCausalClusters}</div>
              <div className="text-sm text-muted-foreground">Causal Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.uniqueTreatments}</div>
              <div className="text-sm text-muted-foreground">Unique Treatments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgImpact.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Impact</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgSignificance.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Significance</div>
            </CardContent>
          </Card>
        </div>

        {/* Treatment Impact Analysis */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Treatment Impact Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="impact" 
                name="Impact %" 
                domain={[0, 30]}
              />
              <YAxis 
                type="number" 
                dataKey="significance" 
                name="Significance %" 
                domain={[0, 100]}
              />
              <RechartsTooltip />
              <Scatter name="Treatments" data={treatmentData} fill="#8884d8">
                {treatmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Causal Power Analysis */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Causal Power Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Causal Power</span>
                <span className="text-sm font-medium">{metrics.causalPower.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.causalPower} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Treatment Impact</span>
                <span className="text-sm font-medium">{metrics.avgImpact.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgImpact} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Statistical Significance</span>
                <span className="text-sm font-medium">{metrics.avgSignificance.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgSignificance} className="h-2" />
            </div>
          </div>
        </div>

        {/* Treatment Types */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Treatment Type Distribution</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Price Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.reduce((count, cluster) => 
                    count + (cluster.causalImpacts?.filter(i => i.treatment === 'price_change').length || 0), 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Image Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.reduce((count, cluster) => 
                    count + (cluster.causalImpacts?.filter(i => i.treatment === 'image_update').length || 0), 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Description Rewrites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.reduce((count, cluster) => 
                    count + (cluster.causalImpacts?.filter(i => i.treatment === 'description_rewrite').length || 0), 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Feature Additions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.reduce((count, cluster) => 
                    count + (cluster.causalImpacts?.filter(i => i.treatment === 'feature_addition').length || 0), 0)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 6. Predictive Analytics Dashboard
const PredictiveAnalyticsDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculatePredictiveMetrics(clusters);
  
  const forecastData = clusters
    .filter(c => c.demandForecast)
    .slice(0, 5)
    .map(cluster => ({
      name: cluster.name,
      nextWeek: cluster.demandForecast!.predictions.shortTerm.nextWeek,
      nextMonth: cluster.demandForecast!.predictions.shortTerm.nextMonth,
      nextQuarter: cluster.demandForecast!.predictions.longTerm.nextQuarter,
      confidence: cluster.demandForecast!.predictions.shortTerm.confidence * 100,
      color: cluster.color
    }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp2 className="h-5 w-5" />
          Predictive Analytics Dashboard
        </CardTitle>
        <CardDescription>
          Demand forecasting and anomaly detection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalPredictiveClusters}</div>
              <div className="text-sm text-muted-foreground">Predictive Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgConfidence.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalAnomalies}</div>
              <div className="text-sm text-muted-foreground">Total Anomalies</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.seasonalRatio.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Seasonal Clusters</div>
            </CardContent>
          </Card>
        </div>

        {/* Demand Forecasts */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Demand Forecast Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="nextWeek" fill="#8884d8" name="Next Week" />
              <Bar dataKey="nextMonth" fill="#82ca9d" name="Next Month" />
              <Bar dataKey="nextQuarter" fill="#ffc658" name="Next Quarter" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Predictive Power Analysis */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Predictive Power Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Predictive Power</span>
                <span className="text-sm font-medium">{metrics.predictivePower.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.predictivePower} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Forecast Confidence</span>
                <span className="text-sm font-medium">{metrics.avgConfidence.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgConfidence} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Anomaly Detection</span>
                <span className="text-sm font-medium">
                  {Math.max(0, 100 - metrics.avgAnomaliesPerCluster * 10).toFixed(1)}%
                </span>
              </div>
              <Progress value={Math.max(0, 100 - metrics.avgAnomaliesPerCluster * 10)} className="h-2" />
            </div>
          </div>
        </div>

        {/* Seasonality Analysis */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Seasonality Patterns</h3>
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">High Summer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.filter(c => 
                    c.demandForecast?.predictions.longTerm.seasonalityPattern === 'High summer'
                  ).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Winter Peak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.filter(c => 
                    c.demandForecast?.predictions.longTerm.seasonalityPattern === 'Winter peak'
                  ).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Consistent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.filter(c => 
                    c.demandForecast?.predictions.longTerm.seasonalityPattern === 'Consistent'
                  ).length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 7. Federated Learning Dashboard
const FederatedLearningDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculateFederatedMetrics(clusters);
  
  const clientData = clusters
    .filter(c => c.federatedInfo)
    .slice(0, 5)
    .flatMap(cluster => 
      cluster.federatedInfo!.clients.map(client => ({
        cluster: cluster.name,
        client: client.id,
        dataSize: client.dataSize,
        privacyBudget: client.privacyBudget,
        contribution: client.contribution * 100,
        color: cluster.color
      }))
    );

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Federated Learning Dashboard
        </CardTitle>
        <CardDescription>
          Distributed clustering with privacy preservation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalFederatedClusters}</div>
              <div className="text-sm text-muted-foreground">Federated Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalClients}</div>
              <div className="text-sm text-muted-foreground">Total Clients</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgPrivacy.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Avg Privacy (ε)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgContribution.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Contribution</div>
            </CardContent>
          </Card>
        </div>

        {/* Client Distribution */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Client Contribution Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="dataSize" 
                name="Data Size" 
                domain={[0, 10000]}
              />
              <YAxis 
                type="number" 
                dataKey="contribution" 
                name="Contribution %" 
                domain={[0, 100]}
              />
              <RechartsTooltip />
              <Scatter name="Clients" data={clientData} fill="#8884d8">
                {clientData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Collaboration Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Collaboration Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Collaboration Score</span>
                <span className="text-sm font-medium">{metrics.collaborationScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.collaborationScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Privacy Protection</span>
                <span className="text-sm font-medium">{metrics.privacyScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.privacyScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Client Participation</span>
                <span className="text-sm font-medium">{metrics.avgClientsPerCluster.toFixed(1)}</span>
              </div>
              <Progress value={metrics.avgClientsPerCluster * 10} className="h-2" />
            </div>
          </div>
        </div>

        {/* Data Distribution */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Data Distribution Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Average Data Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(metrics.avgDataSize).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">samples per client</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Privacy Budget Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.avgPrivacy.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">average ε</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 8. Generative AI Dashboard
const GenerativeAIDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculateGenerativeMetrics(clusters);
  
  const contentData = clusters
    .filter(c => c.generatedContent && c.generatedContent.length > 0)
    .slice(0, 5)
    .map(cluster => ({
      name: cluster.name,
      content: cluster.generatedContent!.length,
      relevance: cluster.generatedContent!.reduce((sum, c) => sum + c.relevance, 0) / 
                cluster.generatedContent!.length * 100,
      originality: cluster.generatedContent!.reduce((sum, c) => sum + c.originality, 0) / 
                  cluster.generatedContent!.length * 100,
      color: cluster.color
    }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generative AI Dashboard
        </CardTitle>
        <CardDescription>
          AI-generated content and style transfer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalGenerativeClusters}</div>
              <div className="text-sm text-muted-foreground">Generative Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalContent}</div>
              <div className="text-sm text-muted-foreground">Total Content</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgRelevance.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Relevance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgOriginality.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Originality</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Quality Analysis */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Content Quality Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="relevance" 
                name="Relevance %" 
                domain={[0, 100]}
              />
              <YAxis 
                type="number" 
                dataKey="originality" 
                name="Originality %" 
                domain={[0, 100]}
              />
              <RechartsTooltip />
              <Scatter name="Clusters" data={contentData} fill="#8884d8">
                {contentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Creativity Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Creativity Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Creativity Score</span>
                <span className="text-sm font-medium">{metrics.creativityScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.creativityScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Content Relevance</span>
                <span className="text-sm font-medium">{metrics.avgRelevance.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgRelevance} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Content Originality</span>
                <span className="text-sm font-medium">{metrics.avgOriginality.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgOriginality} className="h-2" />
            </div>
          </div>
        </div>

        {/* Content Types */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Generated Content Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Descriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.reduce((count, cluster) => 
                    count + (cluster.generatedContent?.filter(c => c.type === 'description').length || 0), 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Titles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.reduce((count, cluster) => 
                    count + (cluster.generatedContent?.filter(c => c.type === 'title').length || 0), 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.reduce((count, cluster) => 
                    count + (cluster.generatedContent?.filter(c => c.type === 'attributes').length || 0), 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clusters.reduce((count, cluster) => 
                    count + (cluster.generatedContent?.filter(c => c.type === 'image').length || 0), 0)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 9. Explainable AI Dashboard
const ExplainableAIDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculateExplainableMetrics(clusters);
  
  const featureData = clusters
    .filter(c => c.explanation)
    .slice(0, 5)
    .flatMap(cluster => 
      cluster.explanation!.keyFeatures.slice(0, 3).map(feature => ({
        cluster: cluster.name,
        feature: feature.feature,
        importance: feature.importance * 100,
        contribution: feature.contribution * 100,
        color: cluster.color
      }))
    );

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain2 className="h-5 w-5" />
          Explainable AI Dashboard
        </CardTitle>
        <CardDescription>
          Interpretable clustering and feature importance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalExplainableClusters}</div>
              <div className="text-sm text-muted-foreground">Explainable Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgFeatureImportance.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Feature Importance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgDriverConfidence.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Driver Confidence</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.interpretabilityScore.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Interpretability Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Importance Analysis */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Feature Importance Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="feature" />
              <YAxis />
              <RechartsTooltip formatter={(value) => [`${value}%`, 'Importance']} />
              <Bar dataKey="importance" fill="#8884d8" name="Importance %">
                {featureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Interpretability Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Interpretability Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Interpretability Score</span>
                <span className="text-sm font-medium">{metrics.interpretabilityScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.interpretabilityScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Completeness Score</span>
                <span className="text-sm font-medium">{metrics.completenessScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.completenessScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Feature Coverage</span>
                <span className="text-sm font-medium">{metrics.avgFeaturesPerCluster.toFixed(1)}</span>
              </div>
              <Progress value={metrics.avgFeaturesPerCluster * 10} className="h-2" />
            </div>
          </div>
        </div>

        {/* Explanation Components */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explanation Components</h3>
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalExplainableClusters * metrics.avgFeaturesPerCluster}</div>
                <div className="text-sm text-muted-foreground">total features identified</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Causal Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalExplainableClusters * metrics.avgDriversPerCluster}</div>
                <div className="text-sm text-muted-foreground">total drivers identified</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">What-If Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalExplainableClusters * metrics.avgScenariosPerCluster}</div>
                <div className="text-sm text-muted-foreground">total scenarios analyzed</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 10. Reinforcement Learning Dashboard
const ReinforcementLearningDashboard: React.FC<{
  clusters: Cluster[];
}> = ({ clusters }) => {
  const metrics = calculateRLMetrics(clusters);
  
  const rewardData = [
    { component: 'Clustering Quality', value: metrics.avgRewardQuality * 100, fill: '#8884d8' },
    { component: 'Business Impact', value: metrics.avgRewardBusiness * 100, fill: '#82ca9d' },
    { component: 'Computational Efficiency', value: metrics.avgRewardEfficiency * 100, fill: '#ffc658' },
    { component: 'Stability', value: metrics.avgRewardStability * 100, fill: '#ff7300' }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu3 className="h-5 w-5" />
          Reinforcement Learning Dashboard
        </CardTitle>
        <CardDescription>
          AI-powered optimization of clustering parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.totalRLClusters}</div>
              <div className="text-sm text-muted-foreground">RL Optimized Clusters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgClusteringQuality.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Clustering Quality</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.avgBusinessImpact.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Business Impact</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metrics.optimizationScore.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Optimization Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Reward Component Analysis */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Reward Component Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={rewardData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="component" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Reward Components"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <RechartsTooltip formatter={(value) => [`${value}%`, 'Score']} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Optimization Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Optimization Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Optimization Score</span>
                <span className="text-sm font-medium">{metrics.optimizationScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.optimizationScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Balance Score</span>
                <span className="text-sm font-medium">{metrics.balanceScore.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.balanceScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Computational Efficiency</span>
                <span className="text-sm font-medium">{metrics.avgComputationalEfficiency.toFixed(2)}</span>
              </div>
              <Progress value={metrics.avgComputationalEfficiency * 100} className="h-2" />
            </div>
          </div>
        </div>

        {/* Algorithm Distribution */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Optimized Algorithm Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['hdbscan', 'kmeans', 'spectral', 'dbscan', 'optics'].map(algorithm => (
              <Card key={algorithm}>
                <CardHeader>
                  <CardTitle className="text-sm">{algorithm.toUpperCase()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {clusters.filter(c => c.rlConfig?.action.algorithm === algorithm).length}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ========== MAIN DASHBOARD COMPONENT ==========

export default function CompleteAdvancedProductClusteringDashboard() {
  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'healthy' | 'degraded' | 'error' | 'processing'>('healthy');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeView, setActiveView] = useState<
    'multimodal' | 'hierarchical' | 'temporal' | 'intent' | 'causal' | 
    'predictive' | 'federated' | 'generative' | 'xai' | 'rl'
  >('multimodal');

  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<any[]>([]);

  // Generate Complete Advanced Data
  const generateAdvancedData = useCallback(() => {
    setIsLoading(true);
    
    // Generate products with advanced features
    const categories = ['Apparel', 'Electronics', 'Home', 'Beauty', 'Sports', 'Accessories'];
    const brands = ['Nike', 'Apple', 'IKEA', 'Sephora', 'Adidas', 'Samsung', 'Zara', 'Lululemon', 'Gucci', 'Amazon'];
    const styles = ['streetwear', 'luxury', 'minimal', 'bohemian', 'sporty', 'vintage', 'modern', 'classic'];
    
    // Generate 1000 products with advanced embeddings
    const newProducts: Product[] = Array.from({ length: 1000 }, (_, i) => {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const style = styles[Math.floor(Math.random() * styles.length)];
      const price = Math.floor(Math.random() * 1000) + 10;
      const views = Math.floor(Math.random() * 10000);
      const purchases = Math.floor(Math.random() * views * 0.1);
      const conversionRate = purchases / Math.max(views, 1);
      
      // Generate enhanced embeddings for 70% of products
      const hasEnhancedEmbedding = Math.random() > 0.3;
      const hasAttention = Math.random() > 0.4;
      
      return {
        id: `prod_${Date.now()}_${i}`,
        title: `${brand} ${style} ${category} ${i + 1}`,
        category,
        price,
        brand,
        views,
        clicks: Math.floor(Math.random() * views * 0.3),
        purchases,
        conversionRate,
        clusterId: `cluster_${Math.floor(Math.random() * 8)}`,
        embedding: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
        visionEmbedding: Array.from({ length: 512 }, () => Math.random() * 2 - 1),
        textEmbedding: Array.from({ length: 768 }, () => Math.random() * 2 - 1),
        attributes: {
          style,
          color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
          material: ['Cotton', 'Polyester', 'Silk', 'Wool'][Math.floor(Math.random() * 4)],
          size: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)],
          season: ['Spring', 'Summer', 'Fall', 'Winter'][Math.floor(Math.random() * 4)]
        },
        behavioralSignals: {
          dwellTime: Math.random() * 300,
          returns: Math.floor(Math.random() * 10),
          bounceRate: Math.random()
        },
        enhancedEmbedding: hasEnhancedEmbedding ? {
          coarseEmbedding: Array.from({ length: 32 }, () => Math.random() * 2 - 1),
          mediumEmbedding: Array.from({ length: 64 }, () => Math.random() * 2 - 1),
          fineEmbedding: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
          temporalEmbedding: Array.from({ length: 5 }, () => Array.from({ length: 32 }, () => Math.random() * 2 - 1)),
          embeddingVariance: Array.from({ length: 128 }, () => Math.random() * 0.1),
          confidenceScores: {
            vision: 0.7 + Math.random() * 0.3,
            text: 0.8 + Math.random() * 0.2,
            attributes: 0.6 + Math.random() * 0.4,
            behavior: 0.5 + Math.random() * 0.5
          }
        } : undefined,
        crossModalAttention: hasAttention ? {
          visionToTextAttention: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Math.random())),
          textToVisionAttention: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Math.random())),
          attributeAttentionWeights: Array.from({ length: 5 }, () => Math.random()),
          temporalAttention: Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.random()))
        } : undefined
      };
    });

    // Generate 8 clusters with ALL advanced functionalities
    const clusterTypes: Cluster['type'][] = ['style', 'functional', 'price', 'occasion', 'behavioral'];
    const clusterColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFA07A'];
    const clusterNames = ['Luxury Fashion', 'Streetwear', 'Sport Activewear', 'Casual Wear', 
                         'Formal Attire', 'Accessories', 'Electronics', 'Home Decor'];
    
    const newClusters: Cluster[] = clusterNames.map((name, i) => {
      const clusterProducts = newProducts.filter(p => p.clusterId === `cluster_${i}`);
      const revenue = clusterProducts.reduce((sum, p) => sum + (p.price * p.purchases), 0);
      const avgPrice = clusterProducts.reduce((sum, p) => sum + p.price, 0) / clusterProducts.length || 0;
      const conversionRate = clusterProducts.reduce((sum, p) => sum + p.conversionRate, 0) / clusterProducts.length || 0;
      
      // Determine which advanced features this cluster has (70% chance for each)
      const hasHierarchical = Math.random() > 0.3;
      const hasTemporal = Math.random() > 0.3;
      const hasIntent = Math.random() > 0.3;
      const hasCausal = Math.random() > 0.4;
      const hasPredictive = Math.random() > 0.3;
      const hasFederated = Math.random() > 0.5;
      const hasGenerative = Math.random() > 0.4;
      const hasExplainable = Math.random() > 0.2;
      const hasRL = Math.random() > 0.5;
      
      return {
        id: `cluster_${i}`,
        name,
        type: clusterTypes[i % clusterTypes.length],
        productCount: clusterProducts.length,
        revenue,
        growth: Math.random() * 20 - 5,
        conversionRate,
        returnRate: Math.random() * 0.05,
        avgPrice,
        color: clusterColors[i % clusterColors.length],
        metadata: {
          dominantCategory: categories[Math.floor(Math.random() * categories.length)],
          priceRange: [Math.floor(avgPrice * 0.5), Math.floor(avgPrice * 1.5)] as [number, number],
          avgRating: Math.random() * 2 + 3,
          styleKeywords: [styles[Math.floor(Math.random() * styles.length)], styles[Math.floor(Math.random() * styles.length)]],
          attributes: {}
        },
        centroid: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
        radius: Math.random() * 3 + 1,
        density: Math.random(),
        
        // Advanced functionalities with 70% probability each
        hierarchicalInfo: hasHierarchical ? {
          level: i < 2 ? 'macro' : i < 5 ? 'meso' : 'micro',
          parentId: i < 2 ? null : `cluster_${Math.floor(i / 2)}`,
          children: i < 4 ? [`cluster_${i * 2 + 1}`, `cluster_${i * 2 + 2}`].filter(id => parseInt(id.split('_')[1]) < 8) : [],
          distinguishingFeatures: [styles[Math.floor(Math.random() * styles.length)], 'quality', 'price_point'],
          noveltyScore: Math.random(),
          stabilityScore: 0.7 + Math.random() * 0.3,
          depth: i < 2 ? 0 : i < 5 ? 1 : 2
        } : undefined,
        
        temporalInfo: hasTemporal ? {
          birth: subDays(new Date(), 30),
          evolution: Array.from({ length: 12 }, (_, j) => ({
            timestamp: subDays(new Date(), 30 - j * 3),
            centroid: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
            size: Math.max(10, clusterProducts.length * (0.8 + Math.random() * 0.4)),
            dominantFeatures: [styles[Math.floor(Math.random() * styles.length)], styles[Math.floor(Math.random() * styles.length)]],
            metrics: {
              silhouetteScore: 0.7 + Math.random() * 0.3,
              daviesBouldin: 0.5 + Math.random() * 0.5
            }
          })),
          trends: {
            growthRate: Math.random() * 0.2 - 0.1,
            featureDrift: Array.from({ length: 5 }, () => Math.random() * 0.1 - 0.05),
            seasonality: {
              pattern: ['weekly', 'monthly', 'seasonal'][Math.floor(Math.random() * 3)] as any,
              amplitude: Math.random(),
              phase: Math.random() * Math.PI * 2
            }
          },
          predictedState: {
            futureCentroid: Array.from({ length: 128 }, () => Math.random() * 2 - 1),
            predictedSize: clusterProducts.length * (1 + Math.random() * 0.3),
            confidence: 0.6 + Math.random() * 0.4,
            timeline: addDays(new Date(), 30)
          }
        } : undefined,
        
        userIntent: hasIntent ? {
          type: ['visual_search', 'text_search', 'price_comparison', 'trend_discovery', 'browsing'][Math.floor(Math.random() * 5)] as any,
          confidence: 0.7 + Math.random() * 0.3,
          sessionContext: {
            userHistory: Array.from({ length: 5 }, () => `prod_${Math.floor(Math.random() * 100)}`),
            currentSessionProducts: Array.from({ length: 3 }, () => `prod_${Math.floor(Math.random() * 100)}`),
            inferredPreferences: {
              stylePreferences: [styles[Math.floor(Math.random() * styles.length)]],
              priceSensitivity: Math.random(),
              brandAffinity: [brands[Math.floor(Math.random() * brands.length)]]
            }
          }
        } : undefined,
        
        causalImpacts: hasCausal ? [
          {
            treatment: 'price_change',
            effect: {
              clusterLevelImpact: Math.random() * 0.2 - 0.1,
              individualProductImpact: new (Map as any)([['prod_1', 0.1], ['prod_2', 0.05]]),
              confidenceIntervals: [Math.random() * 0.1, Math.random() * 0.1 + 0.1] as [number, number],
              statisticalSignificance: 0.9 + Math.random() * 0.1
            },
            attribution: {
              featureContributions: new (Map as any)([['price', 0.6], ['quality', 0.3], ['brand', 0.1]]),
              interactionEffects: new (Map as any)([['price:quality', 0.1], ['price:brand', 0.05]]),
              mediationEffects: new (Map as any)([['quality→price', 0.2]])
            },
            counterfactuals: [
              {
                scenario: 'Reduce price by 15%',
                predictedOutcome: 0.25,
                confidence: 0.8,
                recommendations: ['Implement gradual price reduction', 'Monitor conversion rate']
              }
            ]
          }
        ] : undefined,
        
        demandForecast: hasPredictive ? {
          clusterId: `cluster_${i}`,
          predictions: {
            shortTerm: {
              nextWeek: Math.floor(Math.random() * 1000),
              nextMonth: Math.floor(Math.random() * 5000),
              confidence: 0.7 + Math.random() * 0.3
            },
            longTerm: {
              nextQuarter: Math.floor(Math.random() * 15000),
              nextYear: Math.floor(Math.random() * 50000),
              seasonalityPattern: ['High summer', 'Winter peak', 'Consistent'][Math.floor(Math.random() * 3)]
            }
          },
          drivers: {
            trendContribution: Math.random() * 0.4,
            seasonalityContribution: Math.random() * 0.4,
            externalFactorContribution: Math.random() * 0.2
          },
          anomalies: Array.from({ length: Math.floor(Math.random() * 3) }, (_, idx) => ({
            type: ['outlier', 'novelty', 'drift', 'opportunity'][Math.floor(Math.random() * 4)] as any,
            severity: Math.random() * 10,
            location: {
              clusterId: `cluster_${i}`,
              productId: `prod_${Math.floor(Math.random() * 100)}`,
              featureSpace: Array.from({ length: 3 }, () => Math.random())
            },
            explanation: `Anomaly detected in ${['pricing', 'style', 'demand', 'quality'][Math.floor(Math.random() * 4)]} patterns`,
            recommendedAction: ['Investigate', 'Capitalize', 'Monitor', 'Adjust'][Math.floor(Math.random() * 4)],
            timestamp: subHours(new Date(), Math.floor(Math.random() * 24))
          }))
        } : undefined,
        
        federatedInfo: hasFederated ? {
          clients: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, idx) => ({
            id: `client_${idx}`,
            dataSize: Math.floor(Math.random() * 5000) + 1000,
            privacyBudget: 0.5 + Math.random() * 0.5,
            lastUpdate: subDays(new Date(), Math.floor(Math.random() * 7)),
            contribution: Math.random()
          })),
          lastAggregation: subHours(new Date(), Math.floor(Math.random() * 12))
        } : undefined,
        
        generatedContent: hasGenerative ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, idx) => ({
          type: ['description', 'title', 'attributes', 'image'][Math.floor(Math.random() * 4)] as any,
          content: `Generated content for ${name} cluster`,
          style: styles[Math.floor(Math.random() * styles.length)],
          relevance: 0.7 + Math.random() * 0.3,
          originality: 0.6 + Math.random() * 0.4
        })) : undefined,
        
        styleTransfers: hasGenerative && Math.random() > 0.7 ? Array.from({ length: 1 }, (_, idx) => ({
          sourceCluster: `cluster_${(i + 1) % 8}`,
          targetCluster: `cluster_${i}`,
          transferStrength: Math.random(),
          generatedVariants: Array.from({ length: 2 }, (_, vIdx) => ({
            productId: `prod_${Math.floor(Math.random() * 100)}`,
            styleAttributes: { style: styles[Math.floor(Math.random() * styles.length)] },
            predictedImpact: Math.random()
          }))
        })) : undefined,
        
        explanation: hasExplainable ? {
          summary: `This cluster groups products with similar ${clusterTypes[i % clusterTypes.length]} characteristics. Products here share ${styles[Math.floor(Math.random() * styles.length)]} style elements and are typically priced in the $${Math.floor(avgPrice * 0.8)}-$${Math.floor(avgPrice * 1.2)} range.`,
          keyFeatures: [
            { feature: 'price', importance: 0.8, value: `$${avgPrice.toFixed(0)}`, comparison: 'higher' as const, contribution: 0.4 },
            { feature: 'style', importance: 0.7, value: styles[Math.floor(Math.random() * styles.length)], comparison: 'unique' as const, contribution: 0.3 },
            { feature: 'brand', importance: 0.6, value: brands[Math.floor(Math.random() * brands.length)], comparison: 'higher' as const, contribution: 0.2 },
            { feature: 'quality', importance: 0.5, value: 'Premium', comparison: 'higher' as const, contribution: 0.1 }
          ],
          whatMakesItDifferent: [
            'Higher price point compared to similar products',
            'Strong brand association',
            'Consistent quality ratings',
            'Lower return rates'
          ],
          closestNeighbors: [
            { cluster: `cluster_${(i + 1) % 8}`, similarity: 0.7, keyDifferences: ['Price', 'Brand'] },
            { cluster: `cluster_${(i + 2) % 8}`, similarity: 0.6, keyDifferences: ['Style', 'Category'] }
          ],
          drivers: [
            { feature: 'price', causalImpact: 0.3, confidence: 0.8, evidence: ['Price elasticity analysis', 'Historical data'] },
            { feature: 'brand', causalImpact: 0.25, confidence: 0.9, evidence: ['Brand recognition studies'] },
            { feature: 'quality', causalImpact: 0.2, confidence: 0.7, evidence: ['Customer reviews', 'Return rates'] }
          ],
          whatIfScenarios: [
            {
              scenario: 'Increase marketing budget by 20%',
              predictedChange: 0.15,
              confidence: 0.75,
              recommendations: ['Focus on social media', 'Create targeted campaigns']
            }
          ]
        } : undefined,
        
        rlConfig: hasRL ? {
          state: {
            clusteringMetrics: {
              silhouetteScore: 0.7 + Math.random() * 0.3,
              daviesBouldin: 0.4 + Math.random() * 0.4,
              calinskiHarabasz: 200 + Math.random() * 300
            },
            businessMetrics: {
              revenueImpact: Math.random() * 0.3,
              conversionImpact: Math.random() * 0.2,
              customerSatisfaction: 0.6 + Math.random() * 0.4
            },
            computationalCost: {
              trainingTime: 100 + Math.random() * 200,
              inferenceTime: 10 + Math.random() * 20,
              memoryUsage: 500 + Math.random() * 500
            }
          },
          action: {
            algorithm: ['hdbscan', 'kmeans', 'spectral', 'dbscan', 'optics'][Math.floor(Math.random() * 5)] as any,
            parameters: {
              minSamples: Math.floor(Math.random() * 5) + 2,
              epsilon: Math.random() * 2,
              minClusterSize: Math.floor(Math.random() * 10) + 3,
              nClusters: i + 2
            },
            embeddingWeights: {
              vision: Math.random(),
              text: Math.random(),
              attributes: Math.random(),
              behavior: Math.random()
            }
          },
          reward: {
            total: Math.random() * 10,
            components: {
              clusteringQuality: Math.random(),
              businessImpact: Math.random(),
              computationalEfficiency: Math.random(),
              stability: Math.random()
            }
          }
        } : undefined
      };
    });

    // Generate performance metrics
    const newPerformanceMetrics = Array.from({ length: 24 }, (_, i) => ({
      timestamp: subHours(new Date(), 23 - i),
      clusteringAccuracy: 0.85 + Math.random() * 0.15,
      multimodalFusion: 0.9 + Math.random() * 0.1,
      hierarchicalQuality: 0.8 + Math.random() * 0.2,
      temporalStability: 0.7 + Math.random() * 0.3,
      causalAccuracy: 0.75 + Math.random() * 0.25,
      predictivePower: 0.8 + Math.random() * 0.2,
      federatedLearning: 0.7 + Math.random() * 0.3,
      generativeAI: 0.8 + Math.random() * 0.2,
      explainableAI: 0.85 + Math.random() * 0.15,
      reinforcementLearning: 0.75 + Math.random() * 0.25
    }));

    setProducts(newProducts);
    setClusters(newClusters);
    setPerformanceMetrics(newPerformanceMetrics);
    setSystemStatus('healthy');
    
    setIsLoading(false);
    toast.success('Advanced data generated with all 10 functionalities');
  }, []);

  // Initialize Data
  useEffect(() => {
    generateAdvancedData();
  }, [generateAdvancedData]);

  // Auto Refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      generateAdvancedData();
    }, 60000);

    return () => clearInterval(interval);
  }, [autoRefresh, generateAdvancedData]);

  // Calculate overall system metrics
  const systemMetrics = useMemo(() => {
    const multimodalMetrics = calculateMultimodalMetrics(products);
    const hierarchicalMetrics = calculateHierarchicalMetrics(clusters);
    const temporalMetrics = calculateTemporalMetrics(clusters);
    const intentMetrics = calculateIntentMetrics(clusters);
    const causalMetrics = calculateCausalMetrics(clusters);
    const predictiveMetrics = calculatePredictiveMetrics(clusters);
    const federatedMetrics = calculateFederatedMetrics(clusters);
    const generativeMetrics = calculateGenerativeMetrics(clusters);
    const explainableMetrics = calculateExplainableMetrics(clusters);
    const rlMetrics = calculateRLMetrics(clusters);
    
    return {
      multimodal: multimodalMetrics.fusionQuality,
      hierarchical: hierarchicalMetrics.hierarchyQuality,
      temporal: temporalMetrics.temporalStability,
      intent: intentMetrics.personalizationScore,
      causal: causalMetrics.causalPower,
      predictive: predictiveMetrics.predictivePower,
      federated: federatedMetrics.collaborationScore,
      generative: generativeMetrics.creativityScore,
      explainable: explainableMetrics.interpretabilityScore,
      rl: rlMetrics.optimizationScore
    };
  }, [products, clusters]);

  // Render active dashboard
  const renderActiveDashboard = () => {
    switch (activeView) {
      case 'multimodal':
        return <MultimodalFusionDashboard products={products} clusters={clusters} />;
      case 'hierarchical':
        return <HierarchicalClusteringDashboard clusters={clusters} />;
      case 'temporal':
        return <TemporalEvolutionDashboard clusters={clusters} />;
      case 'intent':
        return <IntentAwareClusteringDashboard clusters={clusters} />;
      case 'causal':
        return <CausalInferenceDashboard clusters={clusters} />;
      case 'predictive':
        return <PredictiveAnalyticsDashboard clusters={clusters} />;
      case 'federated':
        return <FederatedLearningDashboard clusters={clusters} />;
      case 'generative':
        return <GenerativeAIDashboard clusters={clusters} />;
      case 'xai':
        return <ExplainableAIDashboard clusters={clusters} />;
      case 'rl':
        return <ReinforcementLearningDashboard clusters={clusters} />;
      default:
        return <MultimodalFusionDashboard products={products} clusters={clusters} />;
    }
  };

  // Navigation items for all 10 functionalities
  const navItems = [
    { id: 'multimodal', label: 'Multimodal Fusion', icon: Layers2, color: '#8884d8' },
    { id: 'hierarchical', label: 'Hierarchical', icon: GitBranch2, color: '#82ca9d' },
    { id: 'temporal', label: 'Temporal', icon: Clock, color: '#ffc658' },
    { id: 'intent', label: 'Intent-Aware', icon: Target2, color: '#ff7300' },
    { id: 'causal', label: 'Causal', icon: GitMerge, color: '#387908' },
    { id: 'predictive', label: 'Predictive', icon: TrendingUp2, color: '#8884d8' },
    { id: 'federated', label: 'Federated', icon: Network, color: '#82ca9d' },
    { id: 'generative', label: 'Generative AI', icon: Sparkles, color: '#ffc658' },
    { id: 'xai', label: 'Explainable AI', icon: Brain2, color: '#ff7300' },
    { id: 'rl', label: 'RL Optimization', icon: Cpu3, color: '#387908' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 md:p-6">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Advanced AI Product Clustering Platform
            </h1>
            <p className="text-muted-foreground mt-2">
              10 Advanced Functionalities with Real Calculations and Analytics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge
              variant={systemStatus === 'healthy' ? 'default' :
                       systemStatus === 'degraded' ? 'secondary' : 'destructive'}
              className="text-sm"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  systemStatus === 'healthy' ? 'bg-green-500' :
                  systemStatus === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span>System: {systemStatus.toUpperCase()}</span>
              </div>
            </Badge>
            
            <Button
              variant="default"
              onClick={generateAdvancedData}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Advanced Data
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Advanced Navigation */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map(({ id, label, icon: Icon, color }) => (
              <Button
                key={id}
                variant={activeView === id ? "default" : "outline"}
                onClick={() => setActiveView(id as 'multimodal' | 'hierarchical' | 'temporal' | 'intent' | 'causal' | 'predictive' | 'federated' | 'generative' | 'xai' | 'rl')}
                className="flex items-center gap-2"
                style={activeView === id ? { backgroundColor: color } : {}}
              >
                <Icon className="h-4 w-4" />
                {label}
                <Badge variant="secondary" className="ml-2">
                  {systemMetrics[id as keyof typeof systemMetrics]?.toFixed(0)}%
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - System Overview */}
        <div className="lg:col-span-1 space-y-6">
          {/* System Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(ts) => format(new Date(ts), 'HH:mm')}
                  />
                  <YAxis />
                  <RechartsTooltip
                    labelFormatter={(label) => format(new Date(label), 'HH:mm')}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="multimodalFusion"
                    stroke="#8884d8"
                    name="Multimodal Fusion"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="hierarchicalQuality"
                    stroke="#82ca9d"
                    name="Hierarchical Quality"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="temporalStability"
                    stroke="#ffc658"
                    name="Temporal Stability"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Functionality Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Functionality Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(systemMetrics).map(([key, score]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-medium">{score.toFixed(1)}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border rounded">
                  <div className="text-2xl font-bold">{products.length.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Products</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-2xl font-bold">{clusters.length}</div>
                  <div className="text-sm text-muted-foreground">Clusters</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-2xl font-bold">
                    {products.filter(p => p.enhancedEmbedding).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Enhanced Products</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="text-2xl font-bold">
                    {clusters.filter(c => c.temporalInfo).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Temporal Clusters</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Area */}
        <div className="lg:col-span-2">
          {renderActiveDashboard()}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>All 10 advanced functionalities active</span>
            </div>
            <span>•</span>
            <span>Last updated: {format(new Date(), 'MMM d, HH:mm:ss')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              id="auto-refresh"
            />
            <UiLabel htmlFor="auto-refresh" className="text-sm">
              Auto-refresh
            </UiLabel>
          </div>
        </div>
      </footer>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg font-medium">Generating Advanced Data...</p>
            <p className="text-muted-foreground mt-2">
              Creating products and clusters with all 10 advanced functionalities
            </p>
          </div>
        </div>
      )}
    </div>
  );
}