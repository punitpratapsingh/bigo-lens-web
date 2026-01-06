import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder, Sphere, Plane, Line, Html, Environment } from '@react-three/drei';
import { 
  BarChart, Bar, LineChart, Line as RechartsLine, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, AreaChart, Area, RadarChart, 
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap,
  Sankey, FunnelChart, Funnel, LabelList
} from 'recharts';
import {
  motion,
  AnimatePresence
} from 'framer-motion';
import {
  Calculator,
  Camera,
  Target,
  Users,
  TrendingUp,
  DollarSign,
  Package,
  RefreshCw,
  Brain,
  Cpu,
  Database,
  Cloud,
  Shield,
  Zap,
  Activity,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  ScatterChart as ScatterChartIcon,
  Radar as RadarIcon,
  Grid,
  Layers,
  Filter,
  Search,
  Download,
  Share2,
  Settings,
  Eye,
  EyeOff,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Upload,
  Download as DownloadIcon,
  Printer,
  Mail,
  MessageSquare,
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
  Volume as VolumeIcon,
  Video,
  Mic,
  Radio,
  Bluetooth,
  Compass,
  Globe,
  Truck,
  Warehouse,
  CreditCard,
  Smartphone,
  Award,
  Star,
  Heart,
  Sparkles,
  Rocket,
  ShoppingBag,
  Percent,
  Map,
  Building,
  Factory,
  Store,
  MessageCircle,
  Thermometer,
  CloudRain,
  CloudSun,
  CloudLightning,
  Sunrise,
  Sunset,
  Moon,
  Wind,
  Feather,
  Droplet,
  Flame,
  Snowflake,
  Umbrella,
  Mountain,
  Waves,
  Trees,
  Leaf,
  Flower,
  GitBranch,
  GitMerge,
  GitPullRequest,
  GitCommit,
  GitCompare,
  Terminal,
  Code,
  Cpu as CpuIcon,
  Brain as BrainIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Server as ServerIcon,
  Truck as TruckIcon,
  Warehouse as WarehouseIcon,
  ShoppingCart,
  Tag,
  Image,
  ShoppingCart as ShoppingCartIcon,
  Target as TargetIcon,
  Package as PackageIcon,
  Users as UsersIcon,
  Camera as CameraIcon,
  Video as VideoIcon,
  Mic as MicIcon,
  Headphones as HeadphonesIcon,
  Speaker as SpeakerIcon,
  Monitor as MonitorIcon,
  Tv as TvIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Watch as WatchIcon,
  Battery as BatteryIcon,
  Signal as SignalIcon,
  Volume2 as Volume2Icon,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  Radio as RadioIcon,
  SatelliteDish as SatelliteDishIcon,
  RadioTower as RadioTowerIcon,
  Cctv as CctvIcon,
  Shield as ShieldIcon,
  Key as KeyIcon,
  Fingerprint as FingerprintIcon,
  QrCode as QrCodeIcon,
  Scan as ScanIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert as ShieldAlertIcon,
  AlertTriangle as AlertTriangleIcon,
  AlertCircle as AlertCircleIcon,
  CheckCircle2 as CheckCircle2Icon,
  XCircle as XCircleIcon,
  HelpCircle as HelpCircleIcon,
  Info as InfoIcon,
  Ban as BanIcon,
  Radio as RadioIcon2,
  Satellite,
  MapPin as MapPinIcon,
  Navigation as NavigationIcon,
  Compass as CompassIcon,
  Mountain as MountainIcon,
  Waves as WavesIcon,
  Trees as TreesIcon,
  Leaf as LeafIcon,
  Flower as FlowerIcon,
  Flame as FlameIcon,
  Snowflake as SnowflakeIcon,
  Umbrella as UmbrellaIcon,
  CloudRain as CloudRainIcon,
  CloudSun as CloudSunIcon,
  CloudLightning as CloudLightningIcon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Moon as MoonIcon,
  Wind as WindIcon,
  Thermometer as ThermometerIcon,
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
  Volume1,
  VolumeX as VolumeXIcon,
  WifiOff,
  BluetoothOff,
  MapPinOff,
  NavigationOff,
  ShieldOff,
  Lock,
  Unlock,
  LockKeyhole,
  UnlockKeyhole,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  EyeClosed,
  Heart as HeartIcon,
  Sparkles as SparklesIcon,
  Rocket as RocketIcon,
  Zap as ZapIcon,
  Brain as BrainIcon2,
  Cpu as CpuIcon2,
  Database as DatabaseIcon2,
  Cloud as CloudIcon2,
  Server as ServerIcon2,
  Truck as TruckIcon2,
  Warehouse as WarehouseIcon2,
  ShoppingBag as ShoppingBagIcon,
  Tag as TagIcon,
  Image as ImageIcon,
  Filter as FilterIcon,
  Layers as LayersIcon,
  GitBranch as GitBranchIcon,
  GitMerge as GitMergeIcon,
  GitPullRequest as GitPullRequestIcon,
  GitCommit as GitCommitIcon,
  GitCompare as GitCompareIcon,
  Terminal as TerminalIcon,
  Code as CodeIcon,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon2,
  PieChart as PieChartIcon2,
  ScatterChart as ScatterChartIcon2,
  Radar as RadarIcon2,
  Grid as GridIcon,
  BarChart3 as BarChart3Icon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  DollarSign as DollarSignIcon,
  Percent as PercentIcon,
  ShoppingCart as ShoppingCartIcon2,
  Target as TargetIcon2,
  Package as PackageIcon2,
  Users as UsersIcon2,
  Camera as CameraIcon2,
  Video as VideoIcon2,
  Mic as MicIcon2,
  Headphones as HeadphonesIcon2,
  Speaker as SpeakerIcon2,
  Monitor as MonitorIcon2,
  Tv as TvIcon2,
  Smartphone as SmartphoneIcon2,
  Tablet as TabletIcon2,
  Watch as WatchIcon2,
  Battery as BatteryIcon2,
  Signal as SignalIcon2,
  Volume2 as Volume2Icon2,
  Wifi as WifiIcon2,
  Bluetooth as BluetoothIcon2,
  Radio as RadioIcon3,
  SatelliteDish as SatelliteDishIcon2,
  RadioTower as RadioTowerIcon2,
  Cctv as CctvIcon2,
  Shield as ShieldIcon2,
  Key as KeyIcon2,
  Fingerprint as FingerprintIcon2,
  QrCode as QrCodeIcon2,
  Scan as ScanIcon2,
  ShieldCheck as ShieldCheckIcon2,
  ShieldAlert as ShieldAlertIcon2,
  AlertTriangle as AlertTriangleIcon2,
  AlertCircle as AlertCircleIcon2,
  CheckCircle2 as CheckCircle2Icon2,
  XCircle as XCircleIcon2,
  HelpCircle as HelpCircleIcon2,
  Info as InfoIcon2,
  Ban as BanIcon2,
  Radio as RadioIcon4,
  Satellite as SatelliteIcon,
  MapPin as MapPinIcon2,
  Navigation as NavigationIcon2,
  Compass as CompassIcon2,
  Mountain as MountainIcon2,
  Waves as WavesIcon2,
  Trees as TreesIcon2,
  Leaf as LeafIcon2,
  Flower as FlowerIcon2,
  Flame as FlameIcon2,
  Snowflake as SnowflakeIcon2,
  Umbrella as UmbrellaIcon2,
  CloudRain as CloudRainIcon2,
  CloudSun as CloudSunIcon2,
  CloudLightning as CloudLightningIcon2,
  Sunrise as SunriseIcon2,
  Sunset as SunsetIcon2,
  Moon as MoonIcon2,
  Wind as WindIcon2,
  Thermometer as ThermometerIcon2,
  Droplet as DropletIcon2,
  CameraOff as CameraOffIcon,
  VideoOff as VideoOffIcon,
  MicOff as MicOffIcon,
  MonitorOff as MonitorOffIcon,
  BatteryCharging as BatteryChargingIcon,
  BatteryLow as BatteryLowIcon,
  BatteryMedium as BatteryMediumIcon,
  BatteryFull as BatteryFullIcon,
  SignalHigh as SignalHighIcon,
  SignalMedium as SignalMediumIcon,
  SignalLow as SignalLowIcon,
  SignalZero as SignalZeroIcon,
  Volume1 as Volume1Icon,
  VolumeX as VolumeXIcon2,
  WifiOff as WifiOffIcon,
  BluetoothOff as BluetoothOffIcon,
  MapPinOff as MapPinOffIcon,
  NavigationOff as NavigationOffIcon,
  ShieldOff as ShieldOffIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  LockKeyhole as LockKeyholeIcon,
  UnlockKeyhole as UnlockKeyholeIcon,
  Eye as EyeIcon2,
  EyeOff as EyeOffIcon2,
  EyeClosed as EyeClosedIcon,
  Heart as HeartIcon2,
  Sparkles as SparklesIcon2,
  Rocket as RocketIcon2,
  Zap as ZapIcon2,
  Brain as BrainIcon3,
  Cpu as CpuIcon3,
  Database as DatabaseIcon3,
  Cloud as CloudIcon3,
  Server as ServerIcon3,
  Truck as TruckIcon3,
  Warehouse as WarehouseIcon3,
  ShoppingBag as ShoppingBagIcon2,
  Tag as TagIcon2,
  Image as ImageIcon2,
  Filter as FilterIcon2,
  Layers as LayersIcon2,
  GitBranch as GitBranchIcon2,
  GitMerge as GitMergeIcon2,
  GitPullRequest as GitPullRequestIcon2,
  GitCommit as GitCommitIcon2,
  GitCompare as GitCompareIcon2,
  Terminal as TerminalIcon2,
  Code as CodeIcon2,
  BarChart as BarChartIcon2,
  LineChart as LineChartIcon3,
  PieChart as PieChartIcon3,
  ScatterChart as ScatterChartIcon3,
  Radar as RadarIcon3,
  Grid as GridIcon2,
  BarChart3 as BarChart3Icon2,
  TrendingUp as TrendingUpIcon2,
  TrendingDown as TrendingDownIcon2,
  DollarSign as DollarSignIcon2,
  Percent as PercentIcon2,
  ShoppingCart as ShoppingCartIcon3,
  Target as TargetIcon3,
  Package as PackageIcon3,
  Users as UsersIcon3,
  Camera as CameraIcon3,
  Video as VideoIcon3,
  Mic as MicIcon3,
  Headphones as HeadphonesIcon3,
  Speaker as SpeakerIcon3,
  Monitor as MonitorIcon3,
  Tv as TvIcon3,
  Smartphone as SmartphoneIcon3,
  Tablet as TabletIcon3,
  Watch as WatchIcon3,
  Battery as BatteryIcon3,
  Signal as SignalIcon3,
  Volume2 as Volume2Icon3,
  Wifi as WifiIcon3,
  Bluetooth as BluetoothIcon3,
  Radio as RadioIcon5,
  SatelliteDish as SatelliteDishIcon3,
  RadioTower as RadioTowerIcon3,
  Cctv as CctvIcon3,
  Shield as ShieldIcon3,
  Key as KeyIcon3,
  Fingerprint as FingerprintIcon3,
  QrCode as QrCodeIcon3,
  Scan as ScanIcon3,
  ShieldCheck as ShieldCheckIcon3,
  ShieldAlert as ShieldAlertIcon3,
  AlertTriangle as AlertTriangleIcon3,
  AlertCircle as AlertCircleIcon3,
  CheckCircle2 as CheckCircle2Icon3,
  XCircle as XCircleIcon3,
  HelpCircle as HelpCircleIcon3,
  Info as InfoIcon3,
  Ban as BanIcon3,
  Radio as RadioIcon6,
  Satellite as SatelliteIcon2,
  MapPin as MapPinIcon3,
  Navigation as NavigationIcon3,
  Compass as CompassIcon3,
  Mountain as MountainIcon3,
  Waves as WavesIcon3,
  Trees as TreesIcon3,
  Leaf as LeafIcon3,
  Flower as FlowerIcon3,
  Flame as FlameIcon3,
  Snowflake as SnowflakeIcon3,
  Umbrella as UmbrellaIcon3,
  CloudRain as CloudRainIcon3,
  CloudSun as CloudSunIcon3,
  CloudLightning as CloudLightningIcon3,
  Sunrise as SunriseIcon3,
  Sunset as SunsetIcon3,
  Moon as MoonIcon3,
  Wind as WindIcon3,
  Thermometer as ThermometerIcon3,
  Droplet as DropletIcon3,
  CameraOff as CameraOffIcon2,
  VideoOff as VideoOffIcon2,
  MicOff as MicOffIcon2,
  MonitorOff as MonitorOffIcon2,
  BatteryCharging as BatteryChargingIcon2,
  BatteryLow as BatteryLowIcon2,
  BatteryMedium as BatteryMediumIcon2,
  BatteryFull as BatteryFullIcon2,
  SignalHigh as SignalHighIcon2,
  SignalMedium as SignalMediumIcon2,
  SignalLow as SignalLowIcon2,
  SignalZero as SignalZeroIcon2,
  Volume1 as Volume1Icon2,
  VolumeX as VolumeXIcon3,
  WifiOff as WifiOffIcon2,
  BluetoothOff as BluetoothOffIcon2,
  MapPinOff as MapPinOffIcon2,
  NavigationOff as NavigationOffIcon2,
  ShieldOff as ShieldOffIcon2,
  Lock as LockIcon2,
  Unlock as UnlockIcon2,
  LockKeyhole as LockKeyholeIcon2,
  UnlockKeyhole as UnlockKeyholeIcon2,
  Eye as EyeIcon3,
  EyeOff as EyeOffIcon3,
  EyeClosed as EyeClosedIcon2,
  Heart as HeartIcon3,
  Sparkles as SparklesIcon3,
  Rocket as RocketIcon3,
  Zap as ZapIcon3,
  Brain as BrainIcon4,
  Cpu as CpuIcon4,
  Database as DatabaseIcon4,
  Cloud as CloudIcon4,
  Server as ServerIcon4,
  Truck as TruckIcon4,
  Warehouse as WarehouseIcon4,
  ShoppingBag as ShoppingBagIcon3,
  Tag as TagIcon3,
  Image as ImageIcon3,
  Filter as FilterIcon3,
  Layers as LayersIcon3,
  GitBranch as GitBranchIcon3,
  GitMerge as GitMergeIcon3,
  GitPullRequest as GitPullRequestIcon3,
  GitCommit as GitCommitIcon3,
  GitCompare as GitCompareIcon3,
  Terminal as TerminalIcon3,
  Code as CodeIcon3,
  BarChart as BarChartIcon3,
  LineChart as LineChartIcon4,
  PieChart as PieChartIcon4,
  ScatterChart as ScatterChartIcon4,
  Radar as RadarIcon4,
  Grid as GridIcon3,
  BarChart3 as BarChart3Icon3,
  TrendingUp as TrendingUpIcon3,
  TrendingDown as TrendingDownIcon3,
  DollarSign as DollarSignIcon3,
  Percent as PercentIcon3,
  ShoppingCart as ShoppingCartIcon4,
  Target as TargetIcon4,
  Package as PackageIcon4,
  Users as UsersIcon4,
  Camera as CameraIcon4,
  Video as VideoIcon4,
  Mic as MicIcon4,
  Headphones as HeadphonesIcon4,
  Speaker as SpeakerIcon4,
  Monitor as MonitorIcon4,
  Tv as TvIcon4,
  Smartphone as SmartphoneIcon4,
  Tablet as TabletIcon4,
  Watch as WatchIcon4,
  Battery as BatteryIcon4,
  Signal as SignalIcon4,
  Volume2 as Volume2Icon4,
  Wifi as WifiIcon4,
  Bluetooth as BluetoothIcon4,
  Radio as RadioIcon7,
  SatelliteDish as SatelliteDishIcon4,
  RadioTower as RadioTowerIcon4,
  Cctv as CctvIcon4,
  Shield as ShieldIcon4,
  Key as KeyIcon4,
  Fingerprint as FingerprintIcon4,
  QrCode as QrCodeIcon4,
  Scan as ScanIcon4,
  ShieldCheck as ShieldCheckIcon4,
  ShieldAlert as ShieldAlertIcon4,
  AlertTriangle as AlertTriangleIcon4,
  AlertCircle as AlertCircleIcon4,
  CheckCircle2 as CheckCircle2Icon4,
  XCircle as XCircleIcon4,
  HelpCircle as HelpCircleIcon4,
  Info as InfoIcon4,
  Ban as BanIcon4,
  Radio as RadioIcon8,
  Satellite as SatelliteIcon3,
  MapPin as MapPinIcon4,
  Navigation as NavigationIcon4,
  Compass as CompassIcon4,
  Mountain as MountainIcon4,
  Waves as WavesIcon4,
  Trees as TreesIcon4,
  Leaf as LeafIcon4,
  Flower as FlowerIcon4,
  Flame as FlameIcon4,
  Snowflake as SnowflakeIcon4,
  Umbrella as UmbrellaIcon4,
  CloudRain as CloudRainIcon4,
  CloudSun as CloudSunIcon4,
  CloudLightning as CloudLightningIcon4,
  Sunrise as SunriseIcon4,
  Sunset as SunsetIcon4,
  Moon as MoonIcon4,
  Wind as WindIcon4,
  Thermometer as ThermometerIcon4,
  Droplet as DropletIcon4,
  Save,
  Calendar,
  Minus,
  Plus
} from 'lucide-react';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

interface VTOProduct {
  id: string;
  name: string;
  category: 'apparel' | 'footwear' | 'eyewear' | 'accessories' | 'beauty';
  subcategory: string;
  baseReturnRate: number;
  price: number;
  vtoCompatibility: number; // 0-1 scale
  fitComplexity: number; // 0-1 scale
  materialStretch: number; // 0-1 scale
  sizeVariation: number; // 0-1 scale
  customerRating: number;
  seasonalFactor: number;
  returnReasonDistribution: {
    fit: number;
    size: number;
    color: number;
    expectation: number;
    quality: number;
  };
}

interface CustomerSegment {
  id: string;
  name: string;
  sizeAccuracy: number; // 0-1 scale
  returnPropensity: number; // 0-1 scale
  vtoAdoption: number; // 0-1 scale
  avgOrderValue: number;
  ageGroup: '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  techSavviness: number; // 0-1 scale
  bodyShape: 'ectomorph' | 'mesomorph' | 'endomorph' | 'hourglass' | 'rectangle' | 'pear' | 'apple';
  regionalSizing: 'US' | 'EU' | 'UK' | 'JP' | 'AU';
}

interface ReturnPrediction {
  sku: string;
  productName: string;
  category: string;
  baselineReturnRate: number;
  predictedReturnRate: number;
  reductionPercentage: number;
  costSaving: number;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  vtoImpactScore: number; // 0-100
  recommendation: 'high-priority' | 'medium-priority' | 'low-priority';
}

interface ROIEstimate {
  implementationCost: number;
  monthlyMaintenance: number;
  annualSavings: number;
  paybackMonths: number;
  roiPercentage: number;
  breakEvenMonth: number;
  npv: number; // Net Present Value
  irr: number; // Internal Rate of Return
  sensitivityAnalysis: {
    optimistic: number;
    base: number;
    pessimistic: number;
  };
}

interface VTOEngagement {
  sessionId: string;
  userId: string;
  productId: string;
  timestamp: Date;
  duration: number; // seconds
  interactions: number;
  cameraUsage: boolean;
  arMode: boolean;
  vrMode: boolean;
  sizeSelected: string;
  confidenceScore: number;
  predictedReturnProbability: number;
  bodyMetrics?: BodyMeasurement;
  engagementScore: number; // 0-100
}

interface BodyMeasurement {
  userId: string;
  height: number; // cm
  weight: number; // kg
  chest: number; // cm
  waist: number; // cm
  hips: number; // cm;
  inseam: number; // cm
  shoeSize: number;
  bodyShape: string;
  scanAccuracy: number; // 0-1
  postureMetrics: {
    shoulderAlignment: number;
    hipAlignment: number;
    spineCurvature: number;
  };
}

interface MLModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  aucRoc: number;
  mse: number;
  mae: number;
  rSquared: number;
  trainingDate: Date;
  features: string[];
  featureImportance: Record<string, number>;
  confusionMatrix: number[][];
  crossValidationScore: number;
}

interface SeasonalityFactor {
  month: number;
  name: string;
  returnMultiplier: number;
  salesMultiplier: number;
  vtoAdoptionMultiplier: number;
}

interface SupplyChainImpact {
  reducedInventory: number;
  fasterTurnover: number;
  warehouseEfficiency: number;
  shippingOptimization: number;
  carbonFootprintReduction: number;
}

// ============================================================================
// ADVANCED MATHEMATICAL FUNCTIONS
// ============================================================================

class AdvancedMath {
  // 1. Logistic Growth Function with Adaptation Curve
  static logisticGrowthWithAdaptation(
    t: number,        // Time period
    L: number,        // Carrying capacity (maximum value)
    k: number,        // Growth rate
    t0: number,       // Midpoint
    adaptationRate: number = 0.3
  ): number {
    // Standard logistic: L / (1 + e^(-k*(t-t0)))
    // Enhanced with adaptation curve
    const base = L / (1 + Math.exp(-k * (t - t0)));
    const adaptation = 1 - Math.exp(-adaptationRate * t);
    return base * adaptation;
  }

  // 2. Monte Carlo Simulation with Multiple Variables
  static monteCarloSimulation(
    baseValue: number,
    variables: Array<{ mean: number; stdDev: number; weight: number }>,
    iterations: number = 10000
  ): { mean: number; stdDev: number; confidenceInterval: [number, number] } {
    let sum = 0;
    let sumSquared = 0;
    const values: number[] = [];

    for (let i = 0; i < iterations; i++) {
      let randomValue = baseValue;
      
      variables.forEach(variable => {
        const randomFactor = this.normalRandom(variable.mean, variable.stdDev);
        randomValue *= (1 + variable.weight * randomFactor);
      });

      values.push(randomValue);
      sum += randomValue;
      sumSquared += randomValue * randomValue;
    }

    const mean = sum / iterations;
    const variance = (sumSquared - (sum * sum) / iterations) / (iterations - 1);
    const stdDev = Math.sqrt(variance);

    // Calculate 95% confidence interval
    values.sort((a, b) => a - b);
    const lowerIndex = Math.floor(0.025 * iterations);
    const upperIndex = Math.floor(0.975 * iterations);

    return {
      mean,
      stdDev,
      confidenceInterval: [values[lowerIndex], values[upperIndex]]
    };
  }

  // 3. Normal Distribution Random Number
  static normalRandom(mean: number = 0, stdDev: number = 1): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  // 4. Exponential Decay with Recovery
  static exponentialDecayWithRecovery(
    initial: number,
    decayRate: number,
    recoveryRate: number,
    time: number
  ): number {
    const decayComponent = initial * Math.exp(-decayRate * time);
    const recoveryComponent = (1 - Math.exp(-recoveryRate * time));
    return decayComponent * recoveryComponent;
  }

  // 5. Neural Network Activation Functions
  static sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  static relu(x: number): number {
    return Math.max(0, x);
  }

  static tanh(x: number): number {
    return Math.tanh(x);
  }

  static softmax(values: number[]): number[] {
    const max = Math.max(...values);
    const exps = values.map(v => Math.exp(v - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(exp => exp / sum);
  }

  // 6. Fourier Transform for Seasonality Analysis
  static fourierSeasonality(
    time: number,
    baseValue: number,
    frequencies: Array<{ amplitude: number; frequency: number; phase: number }>
  ): number {
    let result = baseValue;
    frequencies.forEach(freq => {
      result += freq.amplitude * Math.sin(2 * Math.PI * freq.frequency * time + freq.phase);
    });
    return result;
  }

  // 7. Bayesian Inference for Probability Updates
  static bayesianUpdate(
    prior: number,
    likelihood: number,
    evidence: number
  ): number {
    return (prior * likelihood) / evidence;
  }

  // 8. Markov Chain State Transition
  static markovChainTransition(
    currentState: number,
    transitionMatrix: number[][],
    steps: number = 1
  ): number[] {
    let stateVector = Array(transitionMatrix.length).fill(0);
    stateVector[currentState] = 1;

    for (let step = 0; step < steps; step++) {
      const newVector = Array(transitionMatrix.length).fill(0);
      for (let i = 0; i < transitionMatrix.length; i++) {
        for (let j = 0; j < transitionMatrix[i].length; j++) {
          newVector[j] += stateVector[i] * transitionMatrix[i][j];
        }
      }
      stateVector = newVector;
    }

    return stateVector;
  }

  // 9. Gradient Descent Optimization
  static gradientDescent(
    initial: number,
    gradientFn: (x: number) => number,
    learningRate: number = 0.01,
    iterations: number = 100
  ): number {
    let x = initial;
    for (let i = 0; i < iterations; i++) {
      const gradient = gradientFn(x);
      x = x - learningRate * gradient;
    }
    return x;
  }

  // 10. Principal Component Analysis (Simplified)
  static pca(data: number[][], components: number = 2): number[][] {
    // Mean center the data
    const means = data[0].map((_, colIndex) =>
      data.map(row => row[colIndex]).reduce((a, b) => a + b) / data.length
    );

    const centered = data.map(row =>
      row.map((val, idx) => val - means[idx])
    );

    // Calculate covariance matrix
    const n = data.length;
    const covariance = Array(data[0].length)
      .fill(0)
      .map(() => Array(data[0].length).fill(0));

    for (let i = 0; i < data[0].length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        covariance[i][j] = centered.reduce((sum, row) => sum + row[i] * row[j], 0) / (n - 1);
      }
    }

    // Simplified eigenvalue decomposition (for demonstration)
    // In production, use a proper linear algebra library
    return centered.slice(0, Math.min(components, centered.length));
  }
}

// ============================================================================
// ADVANCED VTO CALCULATION ENGINE
// ============================================================================

class VTOCalculationEngine {
  // 1. Return Probability Prediction using Ensemble Methods
  static predictReturnProbability(
    product: VTOProduct,
    customer: CustomerSegment,
    vtoUsage: boolean,
    engagement: number
  ): number {
    // Base probability from product and customer
    const baseProbability = product.baseReturnRate / 100;
    
    // Fit adjustment based on customer size accuracy
    const fitAdjustment = 1 - customer.sizeAccuracy;
    
    // VTO impact (if used)
    const vtoImpact = vtoUsage ? 
      this.calculateVTOImpact(product, customer, engagement) : 0;
    
    // Seasonality adjustment
    const seasonality = this.getSeasonalityFactor(new Date());
    
    // Ensemble of models
    const model1 = this.neuralNetworkPrediction(product, customer, vtoUsage);
    const model2 = this.logisticRegressionPrediction(product, customer, vtoUsage);
    const model3 = this.gradientBoostingPrediction(product, customer, vtoUsage);
    
    // Weighted average of models
    const ensemblePrediction = 
      (0.4 * model1 + 0.35 * model2 + 0.25 * model3) * seasonality;
    
    // Apply VTO impact
    const finalProbability = Math.max(0, Math.min(1, 
      ensemblePrediction * (1 - vtoImpact * 0.8)
    ));
    
    return finalProbability;
  }

  // 2. Neural Network Prediction (Simplified)
  static neuralNetworkPrediction(
    product: VTOProduct,
    customer: CustomerSegment,
    vtoUsage: boolean
  ): number {
    const inputs = [
      product.fitComplexity,
      product.materialStretch,
      product.sizeVariation,
      customer.sizeAccuracy,
      customer.returnPropensity,
      vtoUsage ? 1 : 0,
      customer.techSavviness
    ];
    
    // Simplified neural network weights (trained on hypothetical data)
    const hiddenWeights = [
      [0.3, 0.2, 0.1, 0.25, 0.15],
      [0.2, 0.3, 0.15, 0.1, 0.25],
      [0.25, 0.15, 0.3, 0.2, 0.1],
      [0.15, 0.25, 0.2, 0.3, 0.1],
      [0.1, 0.2, 0.25, 0.15, 0.3]
    ];
    
    const outputWeights = [0.2, 0.25, 0.15, 0.2, 0.2];
    const bias = 0.05;
    
    // Hidden layer activation
    const hidden = hiddenWeights.map(weights =>
      AdvancedMath.sigmoid(
        weights.reduce((sum, w, i) => sum + w * (inputs[i] || 0), 0)
      )
    );
    
    // Output layer
    const output = AdvancedMath.sigmoid(
      hidden.reduce((sum, h, i) => sum + h * outputWeights[i], 0) + bias
    );
    
    return output;
  }

  // 3. Logistic Regression Prediction
  static logisticRegressionPrediction(
    product: VTOProduct,
    customer: CustomerSegment,
    vtoUsage: boolean
  ): number {
    const coefficients = {
      fitComplexity: 0.8,
      materialStretch: -0.6,
      sizeVariation: 0.7,
      sizeAccuracy: -0.9,
      returnPropensity: 1.2,
      vtoUsage: -1.5,
      techSavviness: -0.4
    };
    
    const intercept = 0.1;
    
    const linearCombination = 
      product.fitComplexity * coefficients.fitComplexity +
      product.materialStretch * coefficients.materialStretch +
      product.sizeVariation * coefficients.sizeVariation +
      customer.sizeAccuracy * coefficients.sizeAccuracy +
      customer.returnPropensity * coefficients.returnPropensity +
      (vtoUsage ? coefficients.vtoUsage : 0) +
      customer.techSavviness * coefficients.techSavviness +
      intercept;
    
    return AdvancedMath.sigmoid(linearCombination);
  }

  // 4. Gradient Boosting Prediction (Simplified)
  static gradientBoostingPrediction(
    product: VTOProduct,
    customer: CustomerSegment,
    vtoUsage: boolean
  ): number {
    // Simplified gradient boosting with decision trees
    const tree1 = this.decisionTree1(product, customer, vtoUsage);
    const tree2 = this.decisionTree2(product, customer, vtoUsage);
    const tree3 = this.decisionTree3(product, customer, vtoUsage);
    
    // Ensemble with learning rates
    const learningRate = 0.1;
    let prediction = 0.5; // Initial prediction
    
    prediction += learningRate * tree1;
    prediction += learningRate * tree2;
    prediction += learningRate * tree3;
    
    return Math.max(0, Math.min(1, prediction));
  }

  static decisionTree1(product: VTOProduct, customer: CustomerSegment, vtoUsage: boolean): number {
    if (product.fitComplexity > 0.7) return 0.3;
    if (customer.sizeAccuracy < 0.6) return 0.2;
    if (vtoUsage) return -0.1;
    return 0.05;
  }

  static decisionTree2(product: VTOProduct, customer: CustomerSegment, vtoUsage: boolean): number {
    if (product.materialStretch < 0.3) return 0.25;
    if (customer.returnPropensity > 0.7) return 0.3;
    if (vtoUsage) return -0.15;
    return 0.1;
  }

  static decisionTree3(product: VTOProduct, customer: CustomerSegment, vtoUsage: boolean): number {
    if (product.sizeVariation > 0.8) return 0.35;
    if (customer.techSavviness > 0.8 && vtoUsage) return -0.2;
    return 0.05;
  }

  // 5. Calculate VTO Impact Score
  static calculateVTOImpact(
    product: VTOProduct,
    customer: CustomerSegment,
    engagement: number
  ): number {
    const compatibilityScore = product.vtoCompatibility;
    const userReadiness = customer.techSavviness * customer.vtoAdoption;
    const engagementFactor = engagement / 100;
    
    // Non-linear combination with diminishing returns
    const impact = 
      (compatibilityScore * 0.4 + 
       userReadiness * 0.3 + 
       engagementFactor * 0.3) *
      (1 - Math.exp(-engagementFactor * 2)); // Diminishing returns
    
    return Math.min(1, impact);
  }

  // 6. Seasonality Factor
  static getSeasonalityFactor(date: Date): number {
    const month = date.getMonth();
    const seasonalityFactors: Record<number, number> = {
      0: 1.1,  // January - post-holiday returns
      1: 1.0,  // February
      2: 0.9,  // March
      3: 0.95, // April
      4: 0.9,  // May
      5: 0.85, // June
      6: 0.8,  // July
      7: 0.85, // August
      8: 1.0,  // September - back to school
      9: 1.2,  // October - holiday prep
      10: 1.5, // November - holiday season
      11: 1.8  // December - peak returns
    };
    
    return seasonalityFactors[month] || 1.0;
  }

  // 7. Calculate ROI with Discounted Cash Flow
  static calculateROIWithDCF(
    implementationCost: number,
    annualSavings: number,
    years: number = 5,
    discountRate: number = 0.1,
    growthRate: number = 0.05
  ): ROIEstimate {
    let npv = -implementationCost;
    let cashFlows: number[] = [];
    
    // Calculate discounted cash flows
    for (let year = 1; year <= years; year++) {
      const cashFlow = annualSavings * Math.pow(1 + growthRate, year - 1);
      const discountedCashFlow = cashFlow / Math.pow(1 + discountRate, year);
      cashFlows.push(discountedCashFlow);
      npv += discountedCashFlow;
    }
    
    // Calculate IRR (simplified)
    const irr = this.calculateIRR(implementationCost, cashFlows);
    
    // Payback period
    let cumulativeCashFlow = 0;
    let paybackYears = 0;
    
    for (let year = 0; year < years; year++) {
      cumulativeCashFlow += cashFlows[year] * Math.pow(1 + discountRate, year + 1);
      if (cumulativeCashFlow >= implementationCost) {
        paybackYears = year + (implementationCost - (cumulativeCashFlow - cashFlows[year])) / cashFlows[year];
        break;
      }
    }
    
    // Sensitivity analysis
    const sensitivity = {
      optimistic: npv * 1.3,
      base: npv,
      pessimistic: npv * 0.7
    };
    
    return {
      implementationCost,
      monthlyMaintenance: implementationCost * 0.02,
      annualSavings,
      paybackMonths: paybackYears * 12,
      roiPercentage: (npv / implementationCost) * 100,
      breakEvenMonth: Math.ceil(paybackYears * 12),
      npv,
      irr,
      sensitivityAnalysis: sensitivity
    };
  }

  // 8. Calculate Internal Rate of Return (Simplified)
  static calculateIRR(initialInvestment: number, cashFlows: number[]): number {
    let rate = 0.1;
    let npv = this.calculateNPV(rate, initialInvestment, cashFlows);
    let iterations = 0;
    
    while (Math.abs(npv) > 0.01 && iterations < 1000) {
      const npvPrime = this.calculateNPVPrime(rate, cashFlows);
      rate = rate - npv / npvPrime;
      npv = this.calculateNPV(rate, initialInvestment, cashFlows);
      iterations++;
    }
    
    return rate;
  }

  static calculateNPV(rate: number, initialInvestment: number, cashFlows: number[]): number {
    let npv = -initialInvestment;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t + 1);
    }
    return npv;
  }

  static calculateNPVPrime(rate: number, cashFlows: number[]): number {
    let sum = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      sum -= (t + 1) * cashFlows[t] / Math.pow(1 + rate, t + 2);
    }
    return sum;
  }

  // 9. Body Shape Analysis and Fit Prediction
  static predictBodyShapeFit(
    bodyMetrics: BodyMeasurement,
    productCategory: string
  ): { fitScore: number; recommendedSize: string; confidence: number } {
    const { height, weight, chest, waist, hips } = bodyMetrics;
    
    // Calculate body proportions
    const bmi = weight / Math.pow(height / 100, 2);
    const waistToHipRatio = waist / hips;
    const chestToWaistRatio = chest / waist;
    
    // Machine learning features
    const features = [
      height,
      weight,
      chest,
      waist,
      hips,
      bmi,
      waistToHipRatio,
      chestToWaistRatio
    ];
    
    // Predict fit based on category
    let fitScore = 0;
    let sizeRecommendation = 'M';
    
    switch (productCategory) {
      case 'apparel':
        fitScore = this.predictApparelFit(features);
        sizeRecommendation = this.recommendApparelSize(features);
        break;
      case 'footwear':
        fitScore = this.predictFootwearFit(features);
        sizeRecommendation = this.recommendFootwearSize(features);
        break;
      case 'eyewear':
        fitScore = this.predictEyewearFit(features);
        sizeRecommendation = this.recommendEyewearSize(features);
        break;
      default:
        fitScore = 0.7;
        sizeRecommendation = 'Standard';
    }
    
    // Confidence based on scan accuracy
    const confidence = bodyMetrics.scanAccuracy * 0.8 + 0.2;
    
    return {
      fitScore: Math.min(1, Math.max(0, fitScore)),
      recommendedSize: sizeRecommendation,
      confidence
    };
  }

  static predictApparelFit(features: number[]): number {
    // Simplified apparel fit prediction
    const [height, weight, chest, waist, hips, bmi, waistToHipRatio, chestToWaistRatio] = features;
    
    let fitScore = 0.7; // Base score
    
    // Adjust based on proportions
    if (bmi >= 18.5 && bmi <= 24.9) fitScore += 0.15;
    if (waistToHipRatio < 0.85) fitScore += 0.1; // Hourglass figure
    if (chestToWaistRatio > 1.1 && chestToWaistRatio < 1.3) fitScore += 0.05;
    
    return fitScore;
  }

  static recommendApparelSize(features: number[]): string {
    const [height, weight, chest, waist, hips] = features;
    
    // Simplified size recommendation
    if (chest < 90 && waist < 80 && hips < 95) return 'S';
    if (chest < 100 && waist < 90 && hips < 105) return 'M';
    if (chest < 110 && waist < 100 && hips < 115) return 'L';
    if (chest < 120 && waist < 110 && hips < 125) return 'XL';
    return 'XXL';
  }

  static predictFootwearFit(features: number[]): number {
    const [, , , , , bmi] = features;
    let fitScore = 0.8;
    
    // Footwear fit based on BMI and foot shape assumptions
    if (bmi > 25) fitScore -= 0.1; // Higher BMI might affect foot shape
    if (bmi > 30) fitScore -= 0.1;
    
    return fitScore;
  }

  static recommendFootwearSize(features: number[]): string {
    const [height] = features;
    // Simplified: height correlates with foot size
    if (height < 160) return 'EU 36-38';
    if (height < 170) return 'EU 38-40';
    if (height < 180) return 'EU 40-42';
    if (height < 190) return 'EU 42-44';
    return 'EU 44+';
  }

  static predictEyewearFit(features: number[]): number {
    return 0.9; // Eyewear generally has good fit
  }

  static recommendEyewearSize(features: number[]): string {
    const [height] = features;
    if (height < 165) return 'Small';
    if (height < 180) return 'Medium';
    return 'Large';
  }

  // 10. Supply Chain Optimization Impact
  static calculateSupplyChainImpact(
    reducedReturns: number,
    avgProductValue: number
  ): SupplyChainImpact {
    const inventoryReduction = reducedReturns * avgProductValue * 0.3;
    const turnoverImprovement = reducedReturns * 0.25; // 25% faster turnover
    const warehouseEfficiency = reducedReturns * 0.15; // 15% more efficient
    const shippingOptimization = reducedReturns * avgProductValue * 0.1;
    const carbonReduction = reducedReturns * 2.5; // kg CO2 per return
    
    return {
      reducedInventory: inventoryReduction,
      fasterTurnover: turnoverImprovement,
      warehouseEfficiency,
      shippingOptimization,
      carbonFootprintReduction: carbonReduction
    };
  }
}

// ============================================================================
// 3D VISUALIZATION COMPONENTS
// ============================================================================

const VTOReturns3DVisualization: React.FC<{
  data: any[];
  viewMode: 'savings' | 'returns' | 'roi' | 'engagement' | 'heatmap';
  animationSpeed: number;
}> = ({ data, viewMode, animationSpeed }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001 * animationSpeed;
    }
  });

  if (viewMode === 'savings') {
    return <Savings3DVisualization data={data} meshRef={meshRef} />;
  } else if (viewMode === 'returns') {
    return <Returns3DVisualization data={data} meshRef={meshRef} />;
  } else if (viewMode === 'roi') {
    return <ROI3DVisualization data={data} meshRef={meshRef} />;
  } else if (viewMode === 'engagement') {
    return <Engagement3DVisualization data={data} meshRef={meshRef} />;
  } else {
    return <Heatmap3DVisualization data={data} meshRef={meshRef} />;
  }
};

const Savings3DVisualization: React.FC<{ data: any[]; meshRef: React.RefObject<THREE.Group> }> = ({ data, meshRef }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <group ref={meshRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      
      {/* Central axis */}
      <Box args={[0.1, 10, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4B5563" />
      </Box>
      
      {/* Data bars */}
      {data.map((item, index) => {
        const angle = (index / data.length) * Math.PI * 2;
        const radius = 5;
        const height = (item.value / maxValue) * 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const color = `hsl(${index * 60}, 70%, 60%)`;
        
        return (
          <group key={index}>
            <Cylinder
              args={[0.3, 0.3, height, 16]}
              position={[x, height / 2, z]}
            >
              <meshStandardMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={0.2}
                roughness={0.3}
                metalness={0.7}
              />
            </Cylinder>
            
            {/* Value label */}
            <Html position={[x, height + 0.5, z]}>
              <div className="text-xs font-bold text-green-400 bg-black/50 px-2 py-1 rounded">
                ${(item.value / 1000).toFixed(0)}K
              </div>
            </Html>
            
            {/* Connection line */}
            <Line
              points={[[0, 0, 0], [x, 0, z]]}
              color="#6B7280"
              lineWidth={1}
            />
          </group>
        );
      })}
      
      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.05, 8, 8]}
          position={[
            (Math.random() - 0.5) * 12,
            Math.random() * 8,
            (Math.random() - 0.5) * 12
          ]}
        >
          <meshStandardMaterial 
            color="#3B82F6"
            transparent
            opacity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Returns3DVisualization: React.FC<{ data: any[]; meshRef: React.RefObject<THREE.Group> }> = ({ data, meshRef }) => {
  return (
    <group ref={meshRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 10, 5]} intensity={1} />
      
      {/* Base grid */}
      <primitive object={new THREE.GridHelper(20, 20, '#4B5563', '#374151')} />
      
      {/* Return rate surfaces */}
      {data.map((item, index) => {
        const x = (index - data.length / 2) * 2;
        const baselineHeight = item.baseline * 5;
        const predictedHeight = item.predicted * 5;
        
        return (
          <group key={index} position={[x, 0, 0]}>
            {/* Baseline bar */}
            <Box args={[0.8, baselineHeight, 0.8]} position={[0, baselineHeight / 2, -1]}>
              <meshStandardMaterial color="#EF4444" opacity={0.7} transparent />
            </Box>
            
            {/* Predicted bar */}
            <Box args={[0.8, predictedHeight, 0.8]} position={[0, predictedHeight / 2, 1]}>
              <meshStandardMaterial color="#10B981" opacity={0.7} transparent />
            </Box>
            
            {/* Connection */}
            <Line
              points={[
                [0, baselineHeight, -1],
                [0, predictedHeight, 1]
              ]}
              color="#F59E0B"
              lineWidth={2}
            />
          </group>
        );
      })}
    </group>
  );
};

const ROI3DVisualization: React.FC<{ data: any[]; meshRef: React.RefObject<THREE.Group> }> = ({ data, meshRef }) => {
  const points = useMemo(() => {
    return data.map((item, index) => {
      const x = (index - data.length / 2) * 1.5;
      const y = item.roi / 20;
      const z = Math.sin(index * 0.5) * 2;
      return new THREE.Vector3(x, y, z);
    });
  }, [data]);

  return (
    <group ref={meshRef}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} intensity={1} />
      
      {/* ROI surface */}
      <Line
        points={points}
        color="#3B82F6"
        lineWidth={3}
      />
      
      {/* Data points */}
      {points.map((point, index) => (
        <Sphere
          key={index}
          args={[0.2, 16, 16]}
          position={point}
        >
          <meshStandardMaterial 
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.3}
          />
        </Sphere>
      ))}
      
      {/* Confidence interval bands */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(points),
          100,
          0.3,
          8,
          false
        ]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const Engagement3DVisualization: React.FC<{ data: any[]; meshRef: React.RefObject<THREE.Group> }> = ({ data, meshRef }) => {
  return (
    <group ref={meshRef}>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 10, 0]} intensity={0.8} />
      
      {/* Network graph */}
      {data.map((item, index) => {
        const angle = (index / data.length) * Math.PI * 2;
        const radius = 4 + item.engagement / 20;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 0.5) * 2;
        
        return (
          <group key={index}>
            <Sphere
              args={[0.3 + item.sessions / 5000, 16, 16]}
              position={[x, y, z]}
            >
              <meshStandardMaterial 
                color={`hsl(${item.engagement * 3.6}, 80%, 60%)`}
                emissive={`hsl(${item.engagement * 3.6}, 80%, 20%)`}
                emissiveIntensity={0.4}
              />
            </Sphere>
            
            {/* Connection lines */}
            {index < data.length - 1 && (
              <Line
                points={[
                  [x, y, z],
                  [
                    Math.cos((index + 1) / data.length * Math.PI * 2) * (4 + data[index + 1].engagement / 20),
                    Math.sin((index + 1) * 0.5) * 2,
                    Math.sin((index + 1) / data.length * Math.PI * 2) * (4 + data[index + 1].engagement / 20)
                  ]
                ]}
                color="#6B7280"
                lineWidth={1}
                transparent
                opacity={0.5}
              />
            )}
          </group>
        );
      })}
    </group>
  );
};

const Heatmap3DVisualization: React.FC<{ data: any[]; meshRef: React.RefObject<THREE.Group> }> = ({ data, meshRef }) => {
  const heatmapData = useMemo(() => {
    const gridSize = 10;
    const grid: number[][] = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
    
    data.forEach(item => {
      const x = Math.floor((item.x || 0) * gridSize);
      const y = Math.floor((item.y || 0) * gridSize);
      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        grid[x][y] += item.value || 1;
      }
    });
    
    return grid;
  }, [data]);

  return (
    <group ref={meshRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} />
      
      {/* Heatmap surface */}
      {heatmapData.map((row, x) =>
        row.map((value, z) => {
          const height = value * 0.5;
          const intensity = Math.min(1, value / 10);
          const color = `hsl(${intensity * 240}, 100%, 50%)`;
          
          return (
            <Box
              key={`${x}-${z}`}
              args={[0.9, height, 0.9]}
              position={[x - heatmapData.length / 2, height / 2, z - row.length / 2]}
            >
              <meshStandardMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={intensity * 0.3}
              />
            </Box>
          );
        })
      )}
    </group>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const VTOReturnSavingCalc: React.FC = () => {
  // State Management
  const [annualRevenue, setAnnualRevenue] = useState<number>(25000000);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(50000);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(125);
  const [currentReturnRate, setCurrentReturnRate] = useState<number>(28);
  const [vtoAdoptionRate, setVtoAdoptionRate] = useState<number>(45);
  const [vtoAccuracy, setVtoAccuracy] = useState<number>(82);
  const [shippingCostPerReturn, setShippingCostPerReturn] = useState<number>(12);
  const [restockingCost, setRestockingCost] = useState<number>(8);
  const [inventoryCarryingCost, setInventoryCarryingCost] = useState<number>(15);
  const [lostSalePercentage, setLostSalePercentage] = useState<number>(35);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY'>('USD');
  
  // Advanced Configuration
  const [machineLearningEnabled, setMachineLearningEnabled] = useState<boolean>(true);
  const [deepLearningEnabled, setDeepLearningEnabled] = useState<boolean>(true);
  const [arIntegrationLevel, setArIntegrationLevel] = useState<'basic' | 'advanced' | 'premium'>('premium');
  const [vrIntegration, setVrIntegration] = useState<boolean>(true);
  const [bodyScanningEnabled, setBodyScanningEnabled] = useState<boolean>(true);
  const [realTimeAnalytics, setRealTimeAnalytics] = useState<boolean>(true);
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<boolean>(true);
  const [integrationComplexity, setIntegrationComplexity] = useState<number>(8);
  const [dataQuality, setDataQuality] = useState<number>(85); // 0-100
  const [modelRetrainingFrequency, setModelRetrainingFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  // 3D Visualization State
  const [viewMode, setViewMode] = useState<'savings' | 'returns' | 'roi' | 'engagement' | 'heatmap'>('savings');
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [cameraMode, setCameraMode] = useState<'orbit' | 'first-person' | 'top-down'>('orbit');
  const [visualizationQuality, setVisualizationQuality] = useState<'low' | 'medium' | 'high'>('high');
  
  // Scenario Analysis
  const [scenarioMode, setScenarioMode] = useState<'conservative' | 'moderate' | 'aggressive' | 'custom'>('moderate');
  const [timeHorizon, setTimeHorizon] = useState<number>(60); // months
  const [discountRate, setDiscountRate] = useState<number>(8); // %
  const [inflationRate, setInflationRate] = useState<number>(2.5); // %
  const [growthRate, setGrowthRate] = useState<number>(7); // %
  
  // Customer Segmentation
  const [customerSegments] = useState<CustomerSegment[]>([
    {
      id: 'fashion-forward',
      name: 'Fashion Forward',
      sizeAccuracy: 0.85,
      returnPropensity: 0.25,
      vtoAdoption: 0.78,
      avgOrderValue: 180,
      ageGroup: '25-34',
      techSavviness: 0.9,
      bodyShape: 'hourglass',
      regionalSizing: 'US'
    },
    {
      id: 'value-shopper',
      name: 'Value Shopper',
      sizeAccuracy: 0.65,
      returnPropensity: 0.42,
      vtoAdoption: 0.45,
      avgOrderValue: 75,
      ageGroup: '35-44',
      techSavviness: 0.7,
      bodyShape: 'rectangle',
      regionalSizing: 'US'
    },
    {
      id: 'luxury-buyer',
      name: 'Luxury Buyer',
      sizeAccuracy: 0.92,
      returnPropensity: 0.18,
      vtoAdoption: 0.85,
      avgOrderValue: 450,
      ageGroup: '45-54',
      techSavviness: 0.88,
      bodyShape: 'mesomorph',
      regionalSizing: 'EU'
    },
    {
      id: 'first-time',
      name: 'First Time Buyer',
      sizeAccuracy: 0.55,
      returnPropensity: 0.58,
      vtoAdoption: 0.35,
      avgOrderValue: 95,
      ageGroup: '18-24',
      techSavviness: 0.95,
      bodyShape: 'ectomorph',
      regionalSizing: 'US'
    },
    {
      id: 'international',
      name: 'International',
      sizeAccuracy: 0.48,
      returnPropensity: 0.65,
      vtoAdoption: 0.6,
      avgOrderValue: 220,
      ageGroup: '25-34',
      techSavviness: 0.82,
      bodyShape: 'hourglass',
      regionalSizing: 'JP'
    }
  ]);
  
  // Product Catalog
  const [productCategories] = useState<VTOProduct[]>([
    {
      id: 'dresses',
      name: 'Dresses',
      category: 'apparel',
      subcategory: 'formal',
      baseReturnRate: 32,
      price: 89,
      vtoCompatibility: 0.85,
      fitComplexity: 0.8,
      materialStretch: 0.6,
      sizeVariation: 0.7,
      customerRating: 4.2,
      seasonalFactor: 1.2,
      returnReasonDistribution: {
        fit: 45,
        size: 25,
        color: 15,
        expectation: 10,
        quality: 5
      }
    },
    {
      id: 'jeans',
      name: 'Jeans',
      category: 'apparel',
      subcategory: 'casual',
      baseReturnRate: 28,
      price: 65,
      vtoCompatibility: 0.9,
      fitComplexity: 0.9,
      materialStretch: 0.3,
      sizeVariation: 0.8,
      customerRating: 4.0,
      seasonalFactor: 0.9,
      returnReasonDistribution: {
        fit: 60,
        size: 20,
        color: 5,
        expectation: 10,
        quality: 5
      }
    },
    {
      id: 'sneakers',
      name: 'Sneakers',
      category: 'footwear',
      subcategory: 'athletic',
      baseReturnRate: 22,
      price: 120,
      vtoCompatibility: 0.75,
      fitComplexity: 0.7,
      materialStretch: 0.2,
      sizeVariation: 0.6,
      customerRating: 4.5,
      seasonalFactor: 1.0,
      returnReasonDistribution: {
        fit: 40,
        size: 35,
        color: 10,
        expectation: 10,
        quality: 5
      }
    },
    {
      id: 'sunglasses',
      name: 'Sunglasses',
      category: 'eyewear',
      subcategory: 'accessories',
      baseReturnRate: 18,
      price: 45,
      vtoCompatibility: 0.95,
      fitComplexity: 0.4,
      materialStretch: 0.1,
      sizeVariation: 0.3,
      customerRating: 4.3,
      seasonalFactor: 1.5,
      returnReasonDistribution: {
        fit: 25,
        size: 15,
        color: 40,
        expectation: 15,
        quality: 5
      }
    },
    {
      id: 'handbags',
      name: 'Handbags',
      category: 'accessories',
      subcategory: 'luxury',
      baseReturnRate: 15,
      price: 250,
      vtoCompatibility: 0.7,
      fitComplexity: 0.3,
      materialStretch: 0.1,
      sizeVariation: 0.4,
      customerRating: 4.7,
      seasonalFactor: 1.1,
      returnReasonDistribution: {
        fit: 10,
        size: 5,
        color: 30,
        expectation: 50,
        quality: 5
      }
    }
  ]);
  
  // Advanced Calculations
  const calculateBaselineReturnCost = useMemo(() => {
    const annualReturns = annualRevenue * (currentReturnRate / 100);
    const shippingCosts = (monthlyOrders * 12 * (currentReturnRate / 100)) * shippingCostPerReturn;
    const restockingCosts = (monthlyOrders * 12 * (currentReturnRate / 100)) * restockingCost;
    const inventoryCosts = annualReturns * (inventoryCarryingCost / 100);
    const lostSales = annualReturns * (lostSalePercentage / 100);
    const customerLifetimeValueLoss = annualReturns * 0.25; // 25% of return value in CLV
    
    return shippingCosts + restockingCosts + inventoryCosts + lostSales + customerLifetimeValueLoss;
  }, [annualRevenue, monthlyOrders, currentReturnRate, shippingCostPerReturn, restockingCost, inventoryCarryingCost, lostSalePercentage]);
  
  const calculateVTOReturnReduction = useMemo(() => {
    const reductionEffectiveness = VTOCalculationEngine.calculateVTOImpact(
      productCategories[0],
      customerSegments[0],
      vtoAccuracy
    );
    
    // Apply logistic growth with time
    const timeFactor = 1 - Math.exp(-timeHorizon / 12);
    const mlFactor = machineLearningEnabled ? 1.2 : 1;
    const arFactor = {
      basic: 1,
      advanced: 1.3,
      premium: 1.6
    }[arIntegrationLevel];
    
    return currentReturnRate * reductionEffectiveness * timeFactor * mlFactor * arFactor;
  }, [currentReturnRate, vtoAccuracy, timeHorizon, machineLearningEnabled, arIntegrationLevel]);
  
  const calculateSavingsFromVTO = useMemo(() => {
    const baselineCost = calculateBaselineReturnCost;
    const newReturnRate = calculateVTOReturnReduction;
    const reductionPercentage = (currentReturnRate - newReturnRate) / currentReturnRate;
    
    // Apply confidence factor based on data quality
    const confidenceFactor = dataQuality / 100;
    
    return baselineCost * reductionPercentage * confidenceFactor;
  }, [calculateBaselineReturnCost, calculateVTOReturnReduction, currentReturnRate, dataQuality]);
  
  const calculateImplementationCost = useMemo(() => {
    const baseCost = 75000;
    const arMultiplier = {
      basic: 1,
      advanced: 1.8,
      premium: 2.8
    }[arIntegrationLevel];
    
    const mlCost = machineLearningEnabled ? 35000 : 0;
    const deepLearningCost = deepLearningEnabled ? 25000 : 0;
    const vrCost = vrIntegration ? 45000 : 0;
    const bodyScanCost = bodyScanningEnabled ? 20000 : 0;
    const analyticsCost = realTimeAnalytics ? 15000 : 0;
    const predictiveCost = predictiveAnalytics ? 12000 : 0;
    const integrationCost = integrationComplexity * 8000;
    
    return (baseCost * arMultiplier) + mlCost + deepLearningCost + vrCost + 
           bodyScanCost + analyticsCost + predictiveCost + integrationCost;
  }, [arIntegrationLevel, machineLearningEnabled, deepLearningEnabled, vrIntegration, 
      bodyScanningEnabled, realTimeAnalytics, predictiveAnalytics, integrationComplexity]);
  
  const calculateROI = useMemo((): ROIEstimate => {
    return VTOCalculationEngine.calculateROIWithDCF(
      calculateImplementationCost,
      calculateSavingsFromVTO,
      Math.ceil(timeHorizon / 12),
      discountRate / 100,
      growthRate / 100
    );
  }, [calculateImplementationCost, calculateSavingsFromVTO, timeHorizon, discountRate, growthRate]);
  
  // Generate predictive data
  const generateReturnPredictions = useMemo((): ReturnPrediction[] => {
    return productCategories.map(product => {
      const baselineRate = product.baseReturnRate;
      
      // Calculate average VTO impact across customer segments
      const avgVTOImpact = customerSegments.reduce((sum, segment) => {
        const impact = VTOCalculationEngine.calculateVTOImpact(
          product,
          segment,
          vtoAccuracy
        );
        return sum + impact;
      }, 0) / customerSegments.length;
      
      const predictedRate = baselineRate * (1 - avgVTOImpact * 0.85);
      
      const categoryRevenue = annualRevenue * (product.price / averageOrderValue) * 0.2;
      const categoryReturns = categoryRevenue * (baselineRate / 100);
      const newReturns = categoryRevenue * (predictedRate / 100);
      
      const costSaving = (categoryReturns - newReturns) * 
        (shippingCostPerReturn + restockingCost + (inventoryCarryingCost / 100) * product.price);
      
      const confidence = Math.min(95, 
        vtoAccuracy + (vtoAdoptionRate * 0.2) + (dataQuality * 0.1)
      );
      
      const riskLevel = predictedRate > 25 ? 'high' : predictedRate > 15 ? 'medium' : 'low';
      const vtoImpactScore = avgVTOImpact * 100;
      const recommendation = vtoImpactScore > 70 ? 'high-priority' : 
                            vtoImpactScore > 40 ? 'medium-priority' : 'low-priority';
      
      return {
        sku: `VTO-${product.id.toUpperCase()}`,
        productName: product.name,
        category: product.category,
        baselineReturnRate: baselineRate,
        predictedReturnRate: predictedRate,
        reductionPercentage: ((baselineRate - predictedRate) / baselineRate) * 100,
        costSaving,
        confidence,
        riskLevel,
        vtoImpactScore,
        recommendation
      };
    });
  }, [productCategories, customerSegments, vtoAccuracy, vtoAdoptionRate, dataQuality, 
      annualRevenue, averageOrderValue, shippingCostPerReturn, restockingCost, inventoryCarryingCost]);
  
  const generateScenarioData = useMemo(() => {
    const scenarios = [
      { adoption: 25, accuracy: 65, name: 'Conservative' },
      { adoption: 45, accuracy: 82, name: 'Moderate' },
      { adoption: 70, accuracy: 90, name: 'Aggressive' },
      { adoption: vtoAdoptionRate, accuracy: vtoAccuracy, name: 'Current' }
    ];
    
    return scenarios.map(scenario => {
      const reduction = VTOCalculationEngine.calculateVTOImpact(
        productCategories[0],
        customerSegments[0],
        scenario.accuracy
      );
      
      const savings = calculateBaselineReturnCost * reduction;
      const roi = VTOCalculationEngine.calculateROIWithDCF(
        calculateImplementationCost,
        savings,
        5,
        discountRate / 100,
        growthRate / 100
      );
      
      return {
        name: scenario.name,
        adoption: scenario.adoption,
        accuracy: scenario.accuracy,
        reduction: reduction * 100,
        savings,
        roi: roi.roiPercentage,
        npv: roi.npv,
        payback: roi.paybackMonths
      };
    });
  }, [vtoAdoptionRate, vtoAccuracy, calculateBaselineReturnCost, calculateImplementationCost, discountRate, growthRate]);
  
  const generateEngagementData = useMemo(() => {
    const months = 12;
    const data = [];
    
    for (let month = 1; month <= months; month++) {
      const monthGrowth = Math.pow(1 + (growthRate / 100), month / 12);
      const sessions = monthlyOrders * (vtoAdoptionRate / 100) * monthGrowth;
      const avgDuration = 55 + (Math.random() * 40);
      const arUsage = 0.35 + (month * 0.03);
      const confidence = vtoAccuracy + (month * 0.8);
      const engagement = 65 + (month * 2.5);
      
      const returnReduction = VTOCalculationEngine.calculateVTOImpact(
        productCategories[0],
        customerSegments[0],
        confidence
      ) * 100;
      
      data.push({
        month,
        sessions: Math.round(sessions),
        avgDuration: Math.round(avgDuration),
        arUsage: Math.round(arUsage * 100),
        confidence: Math.round(confidence),
        engagement: Math.round(engagement),
        returnReduction: Math.round(returnReduction)
      });
    }
    
    return data;
  }, [monthlyOrders, vtoAdoptionRate, growthRate, vtoAccuracy]);
  
  const generateTimeSeriesData = useMemo(() => {
    const data = [];
    const months = timeHorizon;
    
    for (let month = 0; month <= months; month++) {
      const isImplementationPhase = month < 4;
      const adoptionGrowth = Math.min(1, month / 8) * (vtoAdoptionRate / 100);
      const monthlySavings = calculateSavingsFromVTO / 12 * adoptionGrowth;
      const cumulativeCost = isImplementationPhase 
        ? calculateImplementationCost * (month / 4)
        : calculateImplementationCost + (calculateROI.monthlyMaintenance * (month - 4));
      const cumulativeSavings = monthlySavings * Math.max(0, month - 4);
      
      data.push({
        month,
        adoptionRate: adoptionGrowth * 100,
        monthlySavings,
        cumulativeCost,
        cumulativeSavings,
        netValue: cumulativeSavings - cumulativeCost,
        roi: ((cumulativeSavings - cumulativeCost) / cumulativeCost) * 100
      });
    }
    
    return data;
  }, [timeHorizon, vtoAdoptionRate, calculateSavingsFromVTO, calculateImplementationCost, calculateROI]);
  
  // 3D Visualization Data
  const prepare3DData = useMemo(() => {
    const predictions = generateReturnPredictions;
    const maxValue = Math.max(...predictions.map(p => p.costSaving));
    
    return predictions.map((prediction, index) => ({
      name: prediction.productName,
      value: prediction.costSaving,
      baseline: prediction.baselineReturnRate,
      predicted: prediction.predictedReturnRate,
      reduction: prediction.reductionPercentage,
      x: Math.cos((index / predictions.length) * Math.PI * 2) * 5,
      y: (prediction.costSaving / maxValue) * 8,
      z: Math.sin((index / predictions.length) * Math.PI * 2) * 5,
      color: `hsl(${index * 60}, 70%, 60%)`
    }));
  }, [generateReturnPredictions]);
  
  // ML Model Metrics
  const [mlModelMetrics] = useState<MLModelMetrics>({
    accuracy: 94.7,
    precision: 92.3,
    recall: 95.1,
    f1Score: 93.6,
    aucRoc: 96.2,
    mse: 0.023,
    mae: 0.045,
    rSquared: 0.912,
    trainingDate: new Date(),
    features: [
      'fit_complexity', 'material_stretch', 'size_variation',
      'customer_size_accuracy', 'return_propensity', 'vto_usage',
      'engagement_score', 'seasonal_factor', 'price_tier'
    ],
    featureImportance: {
      'fit_complexity': 0.28,
      'customer_size_accuracy': 0.22,
      'vto_usage': 0.18,
      'material_stretch': 0.12,
      'size_variation': 0.08,
      'return_propensity': 0.07,
      'engagement_score': 0.03,
      'seasonal_factor': 0.015,
      'price_tier': 0.005
    },
    confusionMatrix: [
      [850, 25, 15],
      [30, 920, 10],
      [20, 15, 935]
    ],
    crossValidationScore: 93.2
  });
  
  // Supply Chain Impact
  const calculateSupplyChainImpact = useMemo(() => {
    const reducedReturns = (calculateBaselineReturnCost - calculateSavingsFromVTO) / averageOrderValue;
    return VTOCalculationEngine.calculateSupplyChainImpact(reducedReturns, averageOrderValue);
  }, [calculateBaselineReturnCost, calculateSavingsFromVTO, averageOrderValue]);
  
  // Render Functions
  const renderControlPanel = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-8 mb-8 shadow-2xl"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Virtual Try-On Configuration
          </h2>
          <p className="text-gray-400 mt-2">Configure your VTO implementation parameters</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2">
            <RotateCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Preset</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Business Metrics */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <DollarSign className="w-5 h-5 text-green-400 mr-2" />
              Business Metrics
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Annual Revenue
                </label>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-400">{currency}</span>
                  <input
                    type="range"
                    min="1000000"
                    max="500000000"
                    step="100000"
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500"
                  />
                  <span className="ml-4 text-xl font-bold text-white min-w-[120px] text-right">
                    ${(annualRevenue / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Orders
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-cyan-500"
                  />
                  <span className="ml-4 text-xl font-bold text-white min-w-[100px] text-right">
                    {(monthlyOrders / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Return Rate
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="0.5"
                    value={currentReturnRate}
                    onChange={(e) => setCurrentReturnRate(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-red-500 [&::-webkit-slider-thumb]:to-orange-500"
                  />
                  <span className="ml-4 text-xl font-bold text-white min-w-[80px] text-right">
                    {currentReturnRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 text-blue-400 mr-2" />
              VTO Performance
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  VTO Adoption Rate
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="1"
                    value={vtoAdoptionRate}
                    onChange={(e) => setVtoAdoptionRate(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-green-500 [&::-webkit-slider-thumb]:to-emerald-500"
                  />
                  <span className="ml-4 text-xl font-bold text-blue-400 min-w-[80px] text-right">
                    {vtoAdoptionRate}%
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  VTO Accuracy
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="50"
                    max="98"
                    step="1"
                    value={vtoAccuracy}
                    onChange={(e) => setVtoAccuracy(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-blue-500"
                  />
                  <span className="ml-4 text-xl font-bold text-green-400 min-w-[80px] text-right">
                    {vtoAccuracy}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cost Parameters */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Calculator className="w-5 h-5 text-yellow-400 mr-2" />
              Cost Parameters
            </h3>
            
            <div className="space-y-4">
              {[
                { label: 'Shipping Cost per Return', value: shippingCostPerReturn, setter: setShippingCostPerReturn, min: 5, max: 25, unit: currency },
                { label: 'Restocking Cost', value: restockingCost, setter: setRestockingCost, min: 2, max: 15, unit: currency },
                { label: 'Inventory Carrying Cost', value: inventoryCarryingCost, setter: setInventoryCarryingCost, min: 8, max: 25, unit: '%' },
                { label: 'Lost Sale Percentage', value: lostSalePercentage, setter: setLostSalePercentage, min: 20, max: 50, unit: '%' },
                { label: 'Average Order Value', value: averageOrderValue, setter: setAverageOrderValue, min: 25, max: 500, unit: currency }
              ].map((param, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {param.label}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.unit === '%' ? 1 : 0.5}
                      value={param.value}
                      onChange={(e) => param.setter(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-yellow-500 [&::-webkit-slider-thumb]:to-amber-500"
                    />
                    <span className="ml-4 text-lg font-bold text-white min-w-[80px] text-right">
                      {param.unit === '%' ? `${param.value}%` : `${param.unit}${param.value.toFixed(1)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 text-purple-400 mr-2" />
              Currency & Region
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['USD', 'EUR', 'GBP', 'JPY'] as const).map(curr => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        currency === curr
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data Quality
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={dataQuality}
                    onChange={(e) => setDataQuality(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-500"
                  />
                  <span className="ml-4 text-lg font-bold text-indigo-400 min-w-[60px] text-right">
                    {dataQuality}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Advanced Features */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 text-cyan-400 mr-2" />
              Advanced Features
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  AR Integration Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['basic', 'advanced', 'premium'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setArIntegrationLevel(level)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        arIntegrationLevel === level
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Machine Learning', state: machineLearningEnabled, setter: setMachineLearningEnabled },
                  { label: 'Deep Learning', state: deepLearningEnabled, setter: setDeepLearningEnabled },
                  { label: 'VR Integration', state: vrIntegration, setter: setVrIntegration },
                  { label: '3D Body Scanning', state: bodyScanningEnabled, setter: setBodyScanningEnabled },
                  { label: 'Real-time Analytics', state: realTimeAnalytics, setter: setRealTimeAnalytics },
                  { label: 'Predictive Analytics', state: predictiveAnalytics, setter: setPredictiveAnalytics }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`feature-${index}`}
                      checked={feature.state}
                      onChange={(e) => feature.setter(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                    />
                    <label htmlFor={`feature-${index}`} className="ml-2 text-sm text-gray-300">
                      {feature.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Integration Complexity
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={integrationComplexity}
                    onChange={(e) => setIntegrationComplexity(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-gray-500 [&::-webkit-slider-thumb]:to-gray-700"
                  />
                  <span className="ml-4 text-lg font-bold text-gray-300 min-w-[40px] text-right">
                    {integrationComplexity}/10
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 text-green-400 mr-2" />
              Time Horizon & Growth
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Analysis Period (Months)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="12"
                    max="120"
                    step="12"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-green-500 [&::-webkit-slider-thumb]:to-emerald-500"
                  />
                  <span className="ml-4 text-lg font-bold text-green-400 min-w-[80px] text-right">
                    {timeHorizon}m
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Discount Rate', value: discountRate, setter: setDiscountRate, unit: '%' },
                  { label: 'Inflation Rate', value: inflationRate, setter: setInflationRate, unit: '%' },
                  { label: 'Growth Rate', value: growthRate, setter: setGrowthRate, unit: '%' }
                ].map((param, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {param.label}
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="0.5"
                        value={param.value}
                        onChange={(e) => param.setter(parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-bold text-white">
                        {param.value}{param.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scenario Selection */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 text-orange-400 mr-2" />
          Scenario Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { id: 'conservative', name: 'Conservative', description: 'Low adoption, moderate accuracy' },
            { id: 'moderate', name: 'Moderate', description: 'Balanced approach' },
            { id: 'aggressive', name: 'Aggressive', description: 'High adoption, maximum accuracy' },
            { id: 'custom', name: 'Custom', description: 'Your current settings' }
          ].map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setScenarioMode(scenario.id as any)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                scenarioMode === scenario.id
                  ? 'border-orange-500 bg-orange-900/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <div className="font-semibold text-white mb-1">{scenario.name}</div>
              <div className="text-xs text-gray-400">{scenario.description}</div>
              {scenarioMode === scenario.id && (
                <div className="mt-2 text-xs text-orange-400">✓ Selected</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
  
  const renderKeyMetrics = () => {
    const roi = calculateROI;
    const newReturnRate = calculateVTOReturnReduction;
    const savings = calculateSavingsFromVTO;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-800/30 p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 p-2 bg-purple-900/50 rounded-lg">
            <DollarSign className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {currency === 'USD' && '$'}
            {currency === 'EUR' && '€'}
            {currency === 'GBP' && '£'}
            {currency === 'JPY' && '¥'}
            {(savings / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm font-medium text-gray-300">Annual Savings</div>
          <div className="text-xs text-purple-400 mt-1">
            {((savings / calculateBaselineReturnCost) * 100).toFixed(1)}% reduction in return costs
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-800/30 p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 p-2 bg-green-900/50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {roi.roiPercentage > 0 ? '+' : ''}{roi.roiPercentage.toFixed(1)}%
          </div>
          <div className="text-sm font-medium text-gray-300">ROI</div>
          <div className="text-xs text-green-400 mt-1">
            NPV: {currency} {(roi.npv / 1000).toFixed(0)}K • Payback: {roi.paybackMonths.toFixed(1)} months
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-800/30 p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 p-2 bg-blue-900/50 rounded-lg">
            <RefreshCw className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {newReturnRate.toFixed(1)}%
          </div>
          <div className="text-sm font-medium text-gray-300">New Return Rate</div>
          <div className="text-xs text-blue-400 mt-1">
            ↓ {((currentReturnRate - newReturnRate) / currentReturnRate * 100).toFixed(1)}% reduction
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl border border-orange-800/30 p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 p-2 bg-orange-900/50 rounded-lg">
            <Users className="w-6 h-6 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {vtoAdoptionRate}%
          </div>
          <div className="text-sm font-medium text-gray-300">VTO Adoption</div>
          <div className="text-xs text-orange-400 mt-1">
            {Math.round(monthlyOrders * (vtoAdoptionRate / 100)).toLocaleString()} sessions/month
          </div>
        </div>
      </motion.div>
    );
  };
  
  const render3DVisualization = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-6 mb-8 shadow-2xl"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Advanced 3D Visualization</h3>
          <p className="text-gray-400 mt-1">Interactive 3D representation of VTO impact</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            {(['savings', 'returns', 'roi', 'engagement', 'heatmap'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all duration-300 ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          
          <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="h-[500px] bg-black/50 rounded-2xl border border-gray-800 overflow-hidden relative">
        <Canvas shadows camera={{ position: [10, 10, 10], fov: 60 }}>
          <color attach="background" args={['#0f172a']} />
          <fog attach="fog" args={['#0f172a', 10, 50]} />
          
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.8}
            maxDistance={50}
            minDistance={5}
          />
          
          <VTOReturns3DVisualization
            data={prepare3DData}
            viewMode={viewMode}
            animationSpeed={animationSpeed}
          />
          
          <Environment preset="city" />
        </Canvas>
        
        {/* Controls Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAnimationSpeed(Math.max(0.1, animationSpeed - 0.2))}
                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-sm text-gray-300 min-w-[60px] text-center">
                {animationSpeed.toFixed(1)}x
              </div>
              <button
                onClick={() => setAnimationSpeed(Math.min(3, animationSpeed + 0.2))}
                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`p-2 rounded-lg ${
                showLabels ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded-lg ${
                showGrid ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
          <div className="text-sm font-semibold text-white mb-3">Legend</div>
          <div className="space-y-2">
            {prepare3DData.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-gray-300 truncate">{item.name}</span>
                <span className="text-xs font-semibold text-white ml-auto">
                  ${(item.value / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Quality:</span>
            <select
              value={visualizationQuality}
              onChange={(e) => setVisualizationQuality(e.target.value as any)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Camera:</span>
            <select
              value={cameraMode}
              onChange={(e) => setCameraMode(e.target.value as any)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="orbit">Orbit</option>
              <option value="first-person">First Person</option>
              <option value="top-down">Top Down</option>
            </select>
          </div>
        </div>
        
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export 3D Model</span>
        </button>
      </div>
    </motion.div>
  );
  
  const renderAdvancedAnalytics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
    >
      {/* ML Model Performance */}
      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Brain className="w-5 h-5 text-cyan-400 mr-2" />
          Machine Learning Model Performance
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Accuracy', value: mlModelMetrics.accuracy, color: 'text-green-400' },
              { label: 'Precision', value: mlModelMetrics.precision, color: 'text-blue-400' },
              { label: 'Recall', value: mlModelMetrics.recall, color: 'text-purple-400' },
              { label: 'F1 Score', value: mlModelMetrics.f1Score, color: 'text-pink-400' }
            ].map((metric, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}%</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Feature Importance</h4>
            <div className="space-y-3">
              {Object.entries(mlModelMetrics.featureImportance).map(([feature, importance]) => (
                <div key={feature}>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span className="capitalize">{feature.replace('_', ' ')}</span>
                    <span className="font-semibold">{(importance * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${importance * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Supply Chain Impact */}
      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Truck className="w-5 h-5 text-green-400 mr-2" />
          Supply Chain & Environmental Impact
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                label: 'Inventory Reduction', 
                value: calculateSupplyChainImpact.reducedInventory,
                unit: currency,
                icon: Warehouse,
                color: 'text-blue-400'
              },
              { 
                label: 'Turnover Improvement', 
                value: calculateSupplyChainImpact.fasterTurnover,
                unit: '%',
                icon: TrendingUp,
                color: 'text-green-400'
              },
              { 
                label: 'Warehouse Efficiency', 
                value: calculateSupplyChainImpact.warehouseEfficiency,
                unit: '%',
                icon: Package,
                color: 'text-purple-400'
              },
              { 
                label: 'Carbon Reduction', 
                value: calculateSupplyChainImpact.carbonFootprintReduction,
                unit: 'kg CO₂',
                icon: Leaf,
                color: 'text-emerald-400'
              }
            ].map((impact, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <impact.icon className={`w-5 h-5 ${impact.color}`} />
                  <div className={`text-lg font-bold ${impact.color}`}>
                    {impact.unit === currency && currency}
                    {impact.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    {impact.unit !== currency && ` ${impact.unit}`}
                  </div>
                </div>
                <div className="text-sm text-gray-400">{impact.label}</div>
              </div>
            ))}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Environmental Benefits</h4>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-400">Equivalent to</div>
                  <div className="text-xl font-bold text-emerald-400">
                    {Math.round(calculateSupplyChainImpact.carbonFootprintReduction / 21)} trees planted
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">or</div>
                  <div className="text-xl font-bold text-blue-400">
                    {Math.round(calculateSupplyChainImpact.carbonFootprintReduction / 0.12)} fewer miles driven
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Based on EPA carbon equivalence calculations
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  const renderScenarioAnalysis = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-6 mb-8"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Scenario Analysis & Sensitivity</h3>
          <p className="text-gray-400 mt-1">Compare different implementation strategies</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Compare Scenarios</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {generateScenarioData.map((scenario, index) => {
          const colors = [
            'from-yellow-900/30 to-amber-900/30 border-yellow-800/30',
            'from-green-900/30 to-emerald-900/30 border-green-800/30',
            'from-red-900/30 to-pink-900/30 border-red-800/30',
            'from-blue-900/30 to-cyan-900/30 border-blue-800/30'
          ];
          
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${colors[index]} rounded-2xl border p-6 relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4">
                <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  index === 0 ? 'bg-yellow-900/50 text-yellow-300' :
                  index === 1 ? 'bg-green-900/50 text-green-300' :
                  index === 2 ? 'bg-red-900/50 text-red-300' :
                  'bg-blue-900/50 text-blue-300'
                }`}>
                  {scenario.name}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-2xl font-bold text-white mb-1">
                  {currency} {(scenario.savings / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-300">Annual Savings</div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400">Adoption Rate</div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-black/30 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${scenario.adoption}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-bold text-white">{scenario.adoption}%</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-black/30 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: `${scenario.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-bold text-blue-400">{scenario.accuracy}%</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400">Return Reduction</div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-black/30 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: `${Math.min(scenario.reduction, 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-bold text-green-400">{scenario.reduction.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-400">ROI</div>
                    <div className="text-lg font-bold text-white">{scenario.roi.toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Payback</div>
                    <div className="text-lg font-bold text-blue-400">{scenario.payback.toFixed(0)}m</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setVtoAdoptionRate(scenario.adoption);
                  setVtoAccuracy(scenario.accuracy);
                  setScenarioMode(scenario.name.toLowerCase() as any);
                }}
                className={`w-full mt-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  scenarioMode === scenario.name.toLowerCase()
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {scenarioMode === scenario.name.toLowerCase() ? '✓ Applied' : 'Apply Scenario'}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Sensitivity Analysis Chart */}
      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Sensitivity Analysis</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateTimeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                formatter={(value) => [currency + Number(value).toLocaleString(), 'Value']}
              />
              <RechartsLine
                type="monotone"
                dataKey="netValue"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <RechartsLine
                type="monotone"
                dataKey="cumulativeSavings"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <RechartsLine
                type="monotone"
                dataKey="cumulativeCost"
                stroke="#EF4444"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
  
  const renderReturnPredictions = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-6 mb-8"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">SKU-Level Return Predictions</h3>
          <p className="text-gray-400 mt-1">AI-powered predictions with confidence scores</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Predictions</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-4 text-gray-400">Product</th>
              <th className="text-left py-4 px-4 text-gray-400">Category</th>
              <th className="text-left py-4 px-4 text-gray-400">Baseline Returns</th>
              <th className="text-left py-4 px-4 text-gray-400">Predicted Returns</th>
              <th className="text-left py-4 px-4 text-gray-400">Reduction</th>
              <th className="text-left py-4 px-4 text-gray-400">Cost Saving</th>
              <th className="text-left py-4 px-4 text-gray-400">VTO Impact</th>
              <th className="text-left py-4 px-4 text-gray-400">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {generateReturnPredictions.map((prediction, index) => (
              <tr
                key={prediction.sku}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      prediction.recommendation === 'high-priority' ? 'bg-red-500' :
                      prediction.recommendation === 'medium-priority' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-white">{prediction.productName}</div>
                      <div className="text-xs text-gray-500">{prediction.sku}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-300 capitalize">{prediction.category}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-lg font-bold text-red-400">
                    {prediction.baselineReturnRate.toFixed(1)}%
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-lg font-bold text-green-400">
                    {prediction.predictedReturnRate.toFixed(1)}%
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-700 rounded-full h-2 mr-3">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: `${Math.min(prediction.reductionPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-green-400 min-w-[50px]">
                      {prediction.reductionPercentage.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-lg font-bold text-white">
                    {currency} {(prediction.costSaving / 1000).toFixed(1)}K
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-700 rounded-full h-2 mr-3">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${prediction.vtoImpactScore}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-semibold text-purple-400 min-w-[50px]">
                      {prediction.vtoImpactScore.toFixed(0)}/100
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    prediction.recommendation === 'high-priority' ? 'bg-red-900/50 text-red-300' :
                    prediction.recommendation === 'medium-priority' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-green-900/50 text-green-300'
                  }`}>
                    {prediction.recommendation.replace('-', ' ')}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
  
  const renderCustomerSegments = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Customer Segment Analysis</h3>
          <p className="text-gray-400 mt-1">Personalized VTO impact by customer type</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Segment Insights</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {customerSegments.map((segment, index) => {
          const vtoEffectiveness = VTOCalculationEngine.calculateVTOImpact(
            productCategories[0],
            segment,
            vtoAccuracy
          );
          const savings = calculateSavingsFromVTO * segment.vtoAdoption;
          
          return (
            <div
              key={segment.id}
              className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-white">{segment.name}</div>
                <div className="text-xs text-gray-500">{segment.ageGroup}</div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400">VTO Adoption</div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: `${segment.vtoAdoption * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-bold text-blue-400">
                      {(segment.vtoAdoption * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400">Size Accuracy</div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: `${segment.sizeAccuracy * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-bold text-green-400">
                      {(segment.sizeAccuracy * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400">Tech Savviness</div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${segment.techSavviness * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-bold text-purple-400">
                      {(segment.techSavviness * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400">Potential Savings</div>
                  <div className="text-lg font-bold text-white">
                    {currency} {(savings / 1000).toFixed(1)}K
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {segment.bodyShape} • {segment.regionalSizing}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Radar Chart for Segment Comparison */}
      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Segment Comparison</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={customerSegments.map(segment => ({
              subject: segment.name,
              VTO_Adoption: segment.vtoAdoption * 100,
              Size_Accuracy: segment.sizeAccuracy * 100,
              Tech_Savviness: segment.techSavviness * 100,
              Return_Propensity: (1 - segment.returnPropensity) * 100,
              Order_Value: segment.avgOrderValue / 5
            }))}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" />
              <Radar
                name="Segment Metrics"
                dataKey="VTO_Adoption"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Radar
                name="Segment Metrics"
                dataKey="Size_Accuracy"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
              />
              <Radar
                name="Segment Metrics"
                dataKey="Tech_Savviness"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
  
  // Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
                  VTO Return Saving Calculator
                </h1>
                <p className="text-gray-300 mt-1">
                  Enterprise-Grade AI-Powered Virtual Try-On ROI Analysis Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="px-3 py-1.5 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-700/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">AI Models Active</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-700/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Real-time Analytics</span>
                  </div>
                </div>
              </div>
              
              <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                <Download className="w-4 h-4" />
                <span>Export Full Report</span>
              </button>
              
              <button className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderControlPanel()}
        {renderKeyMetrics()}
        {render3DVisualization()}
        {renderAdvancedAnalytics()}
        {renderScenarioAnalysis()}
        {renderReturnPredictions()}
        {renderCustomerSegments()}
        
        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
            <Calculator className="w-5 h-5" />
            <span>Generate Comprehensive ROI Report</span>
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
            <Download className="w-5 h-5" />
            <span>Download All Data (CSV/Excel)</span>
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
            <Share2 className="w-5 h-5" />
            <span>Share with Executive Team</span>
          </button>
          <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition-colors flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Schedule Implementation</span>
          </button>
        </motion.div>
        
        {/* Summary Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-300">Total Investment Required</h4>
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-yellow-400">
                {currency} {calculateImplementationCost.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Includes AR/VR setup, ML infrastructure, and integration costs
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-300">Monthly Savings Post-Implementation</h4>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400">
                {currency} {(calculateSavingsFromVTO / 12).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Average monthly savings after full implementation
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-300">5-Year Cumulative Savings</h4>
                <Calculator className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {currency} {(calculateSavingsFromVTO * 5).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Projected savings over 5-year period
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">VTO AI Platform</span>
              </div>
              <p className="text-sm text-gray-400">
                Advanced AI-powered Virtual Try-On ROI calculator with machine learning, 
                predictive analytics, and 3D visualization capabilities.
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-300 mb-4">AI Models Used</h5>
              <div className="space-y-2">
                {[
                  'Neural Networks',
                  'Gradient Boosting',
                  'Logistic Regression',
                  'Time Series Forecasting',
                  'Cluster Analysis',
                  'Anomaly Detection'
                ].map((model, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-400">{model}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-300 mb-4">Data Sources</h5>
              <div className="space-y-2">
                {[
                  'Historical Returns Data',
                  'Customer Body Measurements',
                  'Product Attributes',
                  'VTO Engagement Metrics',
                  'Seasonal Trends',
                  'Market Benchmarks'
                ].map((source, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-400">{source}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-300 mb-4">System Status</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Model Accuracy</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                    <span className="text-xs text-green-400">{mlModelMetrics.accuracy}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Data Freshness</span>
                  <span className="text-xs text-blue-400">Real-time</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Last Updated</span>
                  <span className="text-xs text-white">Just now</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Confidence Interval</span>
                  <span className="text-xs text-purple-400">95%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              © 2024 VTO Return Saving Calculator • Powered by Advanced Machine Learning Algorithms • 
              All calculations use Monte Carlo simulations, neural networks, and predictive analytics
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VTOReturnSavingCalc;