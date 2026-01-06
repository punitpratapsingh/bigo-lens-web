// ProductCompatibility.tsx
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line as ThreeLine, Text, Sky, Stars } from '@react-three/drei';
import {
  LineChart, Line as RechartsLine, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Treemap, Sankey, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Simple icon replacement components
const FilterIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🔍</span>;
const TrendingUpIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📈</span>;
const UsersIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>👥</span>;
const PackageIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📦</span>;
const ShoppingBagIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🛍️</span>;
const StarIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⭐</span>;
const AlertCircleIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⚠️</span>;
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>✅</span>;
const XIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>✕</span>;
const RefreshCwIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🔄</span>;
const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⚙️</span>;
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>👁️</span>;
const Share2Icon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>↗️</span>;
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📥</span>;
const CopyIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📋</span>;
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🔎</span>;
const GridIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⏹️</span>;
const ListIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>≡</span>;
const BarChart2Icon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📊</span>;
const PieChartIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📈</span>;
const ActivityIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📈</span>;
const TargetIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🎯</span>;
const LayersIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📋</span>;
const HeartIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>❤️</span>;
const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🛒</span>;
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⏰</span>;
const DollarSignIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>💰</span>;
const PercentIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>%</span>;
const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>↑</span>;
const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>↓</span>;
const MinusIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>-</span>;
const Maximize2Icon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⛶</span>;
const Minimize2Icon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🗕</span>;
const ZapIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⚡</span>;
const CpuIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>💻</span>;
const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🌐</span>;
const ApertureIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📸</span>;
const DatabaseIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🗄️</span>;
const ChipIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>💾</span>;
const ColorLensIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🎨</span>;
const TextureIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🧵</span>;
const StyleIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>👔</span>;
const AccessTimeIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⏰</span>;
const WhatshotIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🔥</span>;
const NewReleasesIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🆕</span>;
const LocalOfferIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🏷️</span>;
const InventoryIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📦</span>;
const AssessmentIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📋</span>;
const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📈</span>;
const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📊</span>;
const CompareIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⚖️</span>;
const AutoGraphIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🤖</span>;
const InsightsIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>💡</span>;
const PrecisionManufacturingIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⚙️</span>;
const PaletteIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🎨</span>;
const CategoryIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📁</span>;
const FilterAltIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🔍</span>;
const SortIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⇅</span>;
const GroupWorkIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>👥</span>;
const LabelIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🏷️</span>;
const MemoryIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🧠</span>;
const PsychologyIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🧠</span>;
const WorkspacesIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📊</span>;
const HubIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🔗</span>;
const SchemaIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📐</span>;
const PolymerIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🔗</span>;
const AccountTreeIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🌳</span>;
const ColorSwatchIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🎨</span>;
const AdjustmentsHorizontalIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>⚙️</span>;
const ChartLineIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📈</span>;
const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📊</span>;
const ChartPieIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🥧</span>;
const ChartAreaIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📊</span>;
const ChartDotsIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📊</span>;
const ChartArcsIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📈</span>;
const ChartBubbleIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🫧</span>;
const GraphIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>📊</span>;
const NetworkIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🔗</span>;
const TopologyFullHierarchyIcon: React.FC<{ className?: string }> = ({ className }) => <span className={className}>🌐</span>;

// Types and Interfaces (same as before)
interface Product {
  id: string;
  name: string;
  category: 'top' | 'bottom' | 'footwear' | 'accessory' | 'dress' | 'outerwear';
  subcategory: string;
  color: string;
  colorHex: string;
  pattern: 'solid' | 'striped' | 'printed' | 'floral' | 'geometric' | 'abstract';
  texture: 'cotton' | 'denim' | 'leather' | 'silk' | 'wool' | 'knit' | 'polyester' | 'velvet';
  fit: 'slim' | 'regular' | 'oversized' | 'tailored' | 'relaxed' | 'athletic';
  brand: string;
  price: number;
  season: string[];
  occasion: string[];
  style: string[];
  size: string[];
  compatibilityScore?: number;
  embeddings?: {
    visual: number[];
    textual: number[];
    behavioral: number[];
    attribute: number[];
  };
  imageUrl?: string;
  inventory?: number;
  returnRate?: number;
  popularity?: number;
  views: number;
  purchases: number;
  rating?: number;
  sustainabilityScore?: number;
  materialComposition?: Record<string, number>;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;
  tags: string[];
  createdAt: Date;
  lastUpdated: Date;
  styleCluster?: number;
  priceTier: 'budget' | 'mid' | 'premium' | 'luxury';
  targetDemographics?: {
    ageRange: [number, number];
    gender: string[];
    incomeLevel: string;
  };
}

interface CompatibilityScore {
  productId1: string;
  productId2: string;
  overallScore: number;
  visualScore: number;
  semanticScore: number;
  attributeScore: number;
  behavioralScore: number;
  trendScore: number;
  sustainabilityScore: number;
  explanation: string[];
  confidence: number;
  coPurchaseCount: number;
  bundleConversionRate: number;
  returnRate: number;
  similarityMetrics?: {
    colorDistance: number;
    patternSimilarity: number;
    textureHarmony: number;
    styleAlignment: number;
    occasionMatch: number;
    seasonOverlap: number;
    priceCompatibility: number;
    brandAffinity: number;
  };
}

interface Outfit {
  id: string;
  name: string;
  description: string;
  products: Product[];
  totalScore: number;
  visualCohesion: number;
  styleConsistency: number;
  occasion: string;
  season: string;
  style: string;
  priceRange: [number, number];
  completeness: number;
  popularity: number;
  conversionRate: number;
  returnRate: number;
  dwellTime: number;
  generatedBy: 'ai' | 'stylist' | 'user';
  tags: string[];
  createdAt: Date;
  lastGenerated?: Date;
  confidenceScore: number;
  sustainabilityImpact?: number;
  trendRelevance: number;
  userRatings?: Array<{
    userId: string;
    rating: number;
    feedback: string;
  }>;
  performanceMetrics?: {
    clickThroughRate: number;
    addToCartRate: number;
    purchaseRate: number;
    averageOrderValue: number;
    revenueGenerated: number;
  };
}

interface CompatibilityGraph {
  nodes: Array<{
    id: string;
    name: string;
    category: string;
    group: number;
    size: number;
    color: string;
    properties: {
      popularity: number;
      price: number;
      returnRate: number;
      compatibilityStrength: number;
    };
    position?: { x: number; y: number; z: number };
  }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
    type: 'visual' | 'semantic' | 'attribute' | 'behavioral' | 'trend';
    color: string;
    opacity: number;
    curvature: number;
    label?: string;
  }>;
}

interface UserPreference {
  userId: string;
  preferredColors: string[];
  colorPalette: string[];
  preferredBrands: string[];
  brandAffinity: Record<string, number>;
  preferredStyles: string[];
  styleWeights: Record<string, number>;
  sizeProfile: Record<string, string>;
  bodyType: 'hourglass' | 'rectangle' | 'triangle' | 'inverted_triangle' | 'apple' | 'pear';
  stylePersona: 'minimalist' | 'bohemian' | 'streetwear' | 'classic' | 'edgy' | 'romantic' | 'sporty' | 'elegant';
  budgetRange: [number, number];
  priceSensitivity: number;
  sustainabilityImportance: number;
  pastOutfits: string[];
  interactions: Array<{
    productId: string;
    outfitId?: string;
    action: 'view' | 'add_to_cart' | 'purchase' | 'return' | 'wishlist' | 'share';
    timestamp: Date;
    duration?: number;
  }>;
  feedbackHistory: Array<{
    type: 'positive' | 'negative' | 'neutral';
    content: string;
    timestamp: Date;
  }>;
  socialInfluences?: {
    following: string[];
    influencers: string[];
    styleCommunities: string[];
  };
}

interface TrendData {
  trendingColors: Array<{ color: string; hex: string; score: number; trend: 'up' | 'down' | 'stable' }>;
  trendingStyles: Array<{ style: string; score: number; velocity: number; momentum: number }>;
  trendingCombinations: Array<{ products: string[]; score: number; adoptionRate: number }>;
  seasonalFactors: Record<string, number>;
  influencerSignals: Array<{ 
    influencer: string; 
    products: string[]; 
    impact: number;
    reach: number;
    engagement: number;
  }>;
  runwaySignals: Array<{
    event: string;
    collection: string;
    trends: string[];
    confidence: number;
  }>;
  socialMediaTrends: Array<{
    platform: string;
    hashtag: string;
    volume: number;
    growth: number;
  }>;
  marketTrends: Array<{
    category: string;
    trend: 'growing' | 'declining' | 'stable';
    growthRate: number;
    marketShare: number;
  }>;
}

interface AnalyticsData {
  outfitPerformance: Array<{
    outfitId: string;
    ctr: number;
    conversionRate: number;
    avgOrderValue: number;
    returnRate: number;
    dwellTime: number;
    revenue: number;
    profitMargin: number;
  }>;
  compatibilityGaps: Array<{
    category: string;
    subcategory: string;
    gapScore: number;
    opportunity: string;
    potentialRevenue: number;
    urgency: 'high' | 'medium' | 'low';
  }>;
  topCombinations: Array<{
    products: string[];
    score: number;
    revenue: number;
    frequency: number;
    returnRate: number;
    profitMargin: number;
  }>;
  lowPerformingPairs: Array<{
    products: string[];
    returnRate: number;
    issue: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    recommendedAction: string;
  }>;
  userBehavior: {
    segmentation: Record<string, number>;
    conversionFunnel: Array<{ stage: string; rate: number; dropoff: number }>;
    retentionMetrics: {
      dailyActiveUsers: number;
      weeklyRetention: number;
      monthlyRetention: number;
    };
  };
  businessImpact: {
    aovIncrease: number;
    returnReduction: number;
    customerSatisfaction: number;
    inventoryTurnover: number;
    revenueAttribution: number;
  };
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  recommendation: string;
  metrics: {
    current: number;
    target: number;
    improvement: number;
  };
  relatedProducts: string[];
  timeframe: 'immediate' | 'short_term' | 'long_term';
}

// Advanced 3D Components (same as before)
const ProductNode3D: React.FC<{
  product: Product;
  position: [number, number, number];
  scale: number;
  onClick?: () => void;
  isSelected?: boolean;
  isHovered?: boolean;
  animation?: 'float' | 'pulse' | 'rotate' | 'none';
}> = ({ product, position, scale, onClick, isSelected, isHovered, animation = 'float' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      if (animation === 'float') {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.rotation.y += 0.01;
      } else if (animation === 'pulse') {
        const scaleFactor = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.scale.setScalar(scale * scaleFactor);
      } else if (animation === 'rotate') {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      }
      
      if (isHovered) {
        meshRef.current.position.y = position[1] + 0.2;
      }
      
      if (materialRef.current) {
        if (isSelected) {
          materialRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
        } else if (isHovered) {
          materialRef.current.emissiveIntensity = 0.3;
        } else {
          materialRef.current.emissiveIntensity = 0;
        }
      }
    }
  });

  const getShape = () => {
    const shapeSize = scale * 0.5;
    switch (product.category) {
      case 'top':
        return <boxGeometry args={[shapeSize * 1.2, shapeSize, shapeSize * 0.8]} />;
      case 'bottom':
        return <cylinderGeometry args={[shapeSize * 0.8, shapeSize * 0.8, shapeSize * 1.5, 8]} />;
      case 'footwear':
        return <coneGeometry args={[shapeSize, shapeSize * 1.2, 6]} />;
      case 'accessory':
        return <sphereGeometry args={[shapeSize]} />;
      case 'dress':
        return <torusGeometry args={[shapeSize * 0.8, shapeSize * 0.3, 16, 100]} />;
      case 'outerwear':
        return <octahedronGeometry args={[shapeSize]} />;
      default:
        return <boxGeometry args={[shapeSize, shapeSize, shapeSize]} />;
    }
  };

  const getTexture = () => {
    switch (product.texture) {
      case 'leather':
        return { roughness: 0.3, metalness: 0.7 };
      case 'silk':
        return { roughness: 0.1, metalness: 0.2 };
      case 'denim':
        return { roughness: 0.8, metalness: 0.1 };
      case 'wool':
        return { roughness: 0.6, metalness: 0 };
      case 'cotton':
        return { roughness: 0.5, metalness: 0 };
      default:
        return { roughness: 0.4, metalness: 0.2 };
    }
  };

  const textureProps = getTexture();

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        {getShape()}
        <meshStandardMaterial
          ref={materialRef}
          color={product.colorHex || '#3498DB'}
          emissive={isSelected ? '#FFD700' : isHovered ? '#FF9F43' : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : isHovered ? 0.3 : 0}
          {...textureProps}
          envMapIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <Html distanceFactor={10} center>
        <div className={`
          px-2 py-1 rounded text-xs font-medium whitespace-nowrap
          ${isSelected ? 'bg-yellow-500 text-black' : 'bg-black/80 text-white'}
          transition-all duration-200
          ${isHovered ? 'scale-110' : 'scale-100'}
        `}>
          {product.name}
          <div className="text-xs opacity-75">
            ${product.price} • {product.compatibilityScore?.toFixed(0)}%
          </div>
        </div>
      </Html>
    </group>
  );
};

const CompatibilityEdge3D: React.FC<{
  from: [number, number, number];
  to: [number, number, number];
  strength: number;
  type: string;
  label?: string;
  animated?: boolean;
}> = ({ from, to, strength, type, label, animated = true }) => {
  const curve = useMemo(() => {
    const points = [];
    const midPoint = [
      (from[0] + to[0]) / 2,
      (from[1] + to[1]) / 2 + 1,
      (from[2] + to[2]) / 2
    ];
    
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const x = (1 - t) * (1 - t) * from[0] + 2 * (1 - t) * t * midPoint[0] + t * t * to[0];
      const y = (1 - t) * (1 - t) * from[1] + 2 * (1 - t) * t * midPoint[1] + t * t * to[1];
      const z = (1 - t) * (1 - t) * from[2] + 2 * (1 - t) * t * midPoint[2] + t * t * to[2];
      points.push(new THREE.Vector3(x, y, z));
    }
    
    return new THREE.CatmullRomCurve3(points);
  }, [from, to]);

  const getColor = () => {
    switch (type) {
      case 'visual': return '#FF6B6B';
      case 'semantic': return '#4ECDC4';
      case 'attribute': return '#45B7D1';
      case 'behavioral': return '#9B59B6';
      case 'trend': return '#F7DC6F';
      default: return '#95A5A6';
    }
  };

  return (
    <>
      <ThreeLine
        points={curve.getPoints(20)}
        color={getColor()}
        lineWidth={Math.max(1, strength * 5)}
        transparent
        opacity={0.6}
      />
      
      {label && (
        <Html
          position={[
            (from[0] + to[0]) / 2,
            (from[1] + to[1]) / 2 + 1.5,
            (from[2] + to[2]) / 2
          ]}
        >
          <div className="text-xs bg-black/70 text-white px-2 py-1 rounded">
            {label}
          </div>
        </Html>
      )}
    </>
  );
};

const NeuralNetworkVisualization: React.FC<{
  layers: number[][];
  activations: number[][];
}> = ({ layers, activations }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!groupRef.current) return;
    
    groupRef.current.clear();
    
    const maxNeurons = Math.max(...layers.map(l => l.length));
    const layerSpacing = 3;
    const neuronSpacing = 1;
    
    // Create layers
    layers.forEach((layer, layerIndex) => {
      const yOffset = (maxNeurons - layer.length) * neuronSpacing / 2;
      
      layer.forEach((weight, neuronIndex) => {
        // Create neuron
        const neuronGeometry = new THREE.SphereGeometry(0.2 + weight * 0.3, 16, 16);
        const neuronMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(weight, 0.7, 0.5),
          emissive: new THREE.Color().setHSL(weight, 0.5, 0.2),
          emissiveIntensity: 0.5
        });
        const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
        
        neuron.position.set(
          layerIndex * layerSpacing,
          neuronIndex * neuronSpacing - yOffset,
          0
        );
        
        groupRef.current!.add(neuron);
        
        // Create connections to next layer
        if (layerIndex < layers.length - 1) {
          const nextLayer = layers[layerIndex + 1];
          const nextYOffset = (maxNeurons - nextLayer.length) * neuronSpacing / 2;
          
          nextLayer.forEach((nextWeight, nextNeuronIndex) => {
            const connectionStrength = (weight + nextWeight) / 2;
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(
                layerIndex * layerSpacing,
                neuronIndex * neuronSpacing - yOffset,
                0
              ),
              new THREE.Vector3(
                (layerIndex + 1) * layerSpacing,
                nextNeuronIndex * neuronSpacing - nextYOffset,
                0
              )
            ]);
            
            const lineMaterial = new THREE.LineBasicMaterial({
              color: new THREE.Color().setHSL(connectionStrength, 0.5, 0.5),
              transparent: true,
              opacity: connectionStrength * 0.3
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            groupRef.current!.add(line);
          });
        }
      });
    });
  }, [layers, activations]);

  return <group ref={groupRef} />;
};

// AI Compatibility Engine (same as before)
class AICompatibilityEngine {
  static calculateColorHarmony(color1: string, color2: string): number {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ] : [0, 0, 0];
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    const rMean = (rgb1[0] + rgb2[0]) / 2;
    const rDiff = rgb1[0] - rgb2[0];
    const gDiff = rgb1[1] - rgb2[1];
    const bDiff = rgb1[2] - rgb2[2];
    
    const colorDistance = Math.sqrt(
      (2 + rMean) * rDiff * rDiff +
      4 * gDiff * gDiff +
      (2 + (1 - rMean)) * bDiff * bDiff
    );
    
    const maxDistance = Math.sqrt(3);
    const harmony = 1 - (colorDistance / maxDistance);
    
    const hue1 = Math.atan2(Math.sqrt(3) * (rgb1[1] - rgb1[2]), 2 * rgb1[0] - rgb1[1] - rgb1[2]);
    const hue2 = Math.atan2(Math.sqrt(3) * (rgb2[1] - rgb2[2]), 2 * rgb2[0] - rgb2[1] - rgb2[2]);
    const hueDiff = Math.abs(hue1 - hue2);
    
    let harmonyMultiplier = 1;
    if (hueDiff < Math.PI / 6) harmonyMultiplier = 0.7;
    else if (hueDiff > Math.PI * 5/6) harmonyMultiplier = 0.9;
    else if (Math.abs(hueDiff - Math.PI / 3) < Math.PI / 12) harmonyMultiplier = 0.95;
    else if (Math.abs(hueDiff - Math.PI / 2) < Math.PI / 12) harmonyMultiplier = 0.85;
    
    return Math.max(0, Math.min(1, harmony * harmonyMultiplier));
  }

  static calculatePatternCompatibility(pattern1: string, pattern2: string): number {
    const patternHierarchy = {
      'solid': 0,
      'striped': 1,
      'geometric': 2,
      'floral': 3,
      'abstract': 4,
      'printed': 5
    };
    
    const level1 = patternHierarchy[pattern1 as keyof typeof patternHierarchy] || 0;
    const level2 = patternHierarchy[pattern2 as keyof typeof patternHierarchy] || 0;
    
    const levelDiff = Math.abs(level1 - level2);
    
    if (pattern1 === 'solid' || pattern2 === 'solid') {
      return 0.8;
    } else if (pattern1 === pattern2) {
      return levelDiff === 0 ? 0.6 : 0.4;
    } else if (levelDiff <= 1) {
      return 0.7;
    } else {
      return 0.3;
    }
  }

  static calculateTextureHarmony(texture1: string, texture2: string): number {
    const textureGroups = {
      'natural': ['cotton', 'wool', 'silk', 'linen'],
      'structured': ['denim', 'leather', 'canvas'],
      'soft': ['velvet', 'cashmere', 'fleece'],
      'technical': ['polyester', 'nylon', 'spandex']
    };
    
    const findGroup = (texture: string) => {
      for (const [group, textures] of Object.entries(textureGroups)) {
        if (textures.includes(texture)) return group;
      }
      return 'other';
    };
    
    const group1 = findGroup(texture1);
    const group2 = findGroup(texture2);
    
    if (group1 === group2) {
      return 0.9;
    } else if (
      (group1 === 'natural' && group2 === 'soft') ||
      (group1 === 'structured' && group2 === 'technical')
    ) {
      return 0.8;
    } else {
      return 0.5;
    }
  }

  static calculateStyleMatch(styles1: string[], styles2: string[]): number {
    if (styles1.length === 0 || styles2.length === 0) return 0.5;
    
    const intersection = styles1.filter(style => styles2.includes(style));
    const union = [...new Set([...styles1, ...styles2])];
    
    const jaccard = intersection.length / union.length;
    
    const styleWeights: Record<string, number> = {
      'minimalist': 1.2,
      'streetwear': 1.1,
      'bohemian': 1.0,
      'classic': 1.3,
      'edgy': 0.9,
      'romantic': 0.8,
      'sporty': 1.0,
      'elegant': 1.2
    };
    
    const weightedIntersection = intersection.reduce((sum, style) => 
      sum + (styleWeights[style] || 1), 0
    );
    
    return Math.min(1, jaccard * (weightedIntersection / intersection.length || 1));
  }

  static calculateFitCompatibility(fit1: string, fit2: string): number {
    const fitMatrix: Record<string, Record<string, number>> = {
      'slim': { 'slim': 0.9, 'regular': 0.8, 'oversized': 0.3, 'tailored': 0.85, 'relaxed': 0.4, 'athletic': 0.7 },
      'regular': { 'slim': 0.8, 'regular': 0.9, 'oversized': 0.6, 'tailored': 0.8, 'relaxed': 0.7, 'athletic': 0.8 },
      'oversized': { 'slim': 0.3, 'regular': 0.6, 'oversized': 0.4, 'tailored': 0.2, 'relaxed': 0.9, 'athletic': 0.3 },
      'tailored': { 'slim': 0.85, 'regular': 0.8, 'oversized': 0.2, 'tailored': 0.95, 'relaxed': 0.3, 'athletic': 0.6 },
      'relaxed': { 'slim': 0.4, 'regular': 0.7, 'oversized': 0.9, 'tailored': 0.3, 'relaxed': 0.9, 'athletic': 0.5 },
      'athletic': { 'slim': 0.7, 'regular': 0.8, 'oversized': 0.3, 'tailored': 0.6, 'relaxed': 0.5, 'athletic': 0.95 }
    };
    
    return fitMatrix[fit1]?.[fit2] || 0.5;
  }

  static calculatePriceCompatibility(price1: number, price2: number): number {
    const ratio = Math.min(price1, price2) / Math.max(price1, price2);
    const priceDiff = Math.abs(price1 - price2);
    
    if (priceDiff < 50) return 0.9;
    else if (priceDiff < 100) return 0.7;
    else if (priceDiff < 200) return 0.5;
    else if (priceDiff < 500) return 0.3;
    else return 0.1;
  }

  static checkCategoryCompatibility(cat1: string, cat2: string): { compatible: boolean; score: number; reason: string } {
    const rules = {
      'top-bottom': { compatible: true, score: 0.9, reason: 'Standard pairing' },
      'top-dress': { compatible: false, score: 0.1, reason: 'Dress already complete' },
      'bottom-dress': { compatible: false, score: 0.1, reason: 'Dress doesn\'t need bottoms' },
      'top-outerwear': { compatible: true, score: 0.8, reason: 'Layering' },
      'bottom-footwear': { compatible: true, score: 0.9, reason: 'Standard pairing' },
      'accessory-any': { compatible: true, score: 0.7, reason: 'Accessory complements' },
      'top-top': { compatible: false, score: 0.1, reason: 'Multiple tops conflict' },
      'bottom-bottom': { compatible: false, score: 0.1, reason: 'Multiple bottoms conflict' }
    };
    
    const key = [cat1, cat2].sort().join('-');
    return rules[key as keyof typeof rules] || { compatible: true, score: 0.5, reason: 'Neutral compatibility' };
  }

  static calculateCompatibility(product1: Product, product2: Product): CompatibilityScore {
    const colorHarmony = this.calculateColorHarmony(product1.colorHex || '#000000', product2.colorHex || '#000000');
    const patternCompatibility = this.calculatePatternCompatibility(product1.pattern, product2.pattern);
    const textureHarmony = this.calculateTextureHarmony(product1.texture, product2.texture);
    const visualScore = (colorHarmony * 0.5 + patternCompatibility * 0.3 + textureHarmony * 0.2) * 100;

    const styleMatch = this.calculateStyleMatch(product1.style, product2.style);
    const occasionOverlap = product1.occasion.filter(o => product2.occasion.includes(o)).length / 
                           Math.max(product1.occasion.length, product2.occasion.length, 1);
    const seasonOverlap = product1.season.filter(s => product2.season.includes(s)).length / 
                         Math.max(product1.season.length, product2.season.length, 1);
    const semanticScore = (styleMatch * 0.4 + occasionOverlap * 0.4 + seasonOverlap * 0.2) * 100;

    const categoryComp = this.checkCategoryCompatibility(product1.category, product2.category);
    const fitCompatibility = this.calculateFitCompatibility(product1.fit, product2.fit);
    const priceCompatibility = this.calculatePriceCompatibility(product1.price, product2.price);
    const attributeScore = (categoryComp.score * 0.4 + fitCompatibility * 0.3 + priceCompatibility * 0.3) * 100;

    const behavioralScore = (Math.random() * 0.5 + 0.5) * 100;

    const overallScore = 
      visualScore * 0.35 +
      semanticScore * 0.25 +
      attributeScore * 0.20 +
      behavioralScore * 0.20;

    const explanations = this.generateExplanations(
      product1, product2, 
      { visualScore, semanticScore, attributeScore, behavioralScore }
    );

    return {
      productId1: product1.id,
      productId2: product2.id,
      overallScore,
      visualScore,
      semanticScore,
      attributeScore,
      behavioralScore,
      trendScore: (Math.random() * 0.3 + 0.7) * 100,
      sustainabilityScore: (Math.random() * 0.4 + 0.6) * 100,
      explanation: explanations,
      confidence: Math.random() * 0.2 + 0.8,
      coPurchaseCount: Math.floor(Math.random() * 100),
      bundleConversionRate: Math.random() * 0.3,
      returnRate: Math.random() * 0.2
    };
  }

  static generateExplanations(p1: Product, p2: Product, scores: any): string[] {
    const explanations: string[] = [];
    
    if (scores.visualScore > 80) {
      explanations.push(`Strong visual harmony: ${p1.color} complements ${p2.color}`);
    } else if (scores.visualScore < 40) {
      explanations.push(`Potential visual clash: ${p1.color} and ${p2.color} may not pair well`);
    }
    
    if (scores.semanticScore > 75) {
      const sharedStyles = p1.style.filter(s => p2.style.includes(s));
      if (sharedStyles.length > 0) {
        explanations.push(`Shared style direction: ${sharedStyles.join(', ')}`);
      }
    }
    
    if (scores.attributeScore > 70) {
      explanations.push(`Good fit alignment: ${p1.fit} works well with ${p2.fit}`);
    }
    
    if (p1.brand === p2.brand) {
      explanations.push(`Brand cohesion: Both from ${p1.brand}`);
    }
    
    if (explanations.length === 0) {
      explanations.push('Neutral compatibility - safe combination');
    }
    
    return explanations.slice(0, 3);
  }
}

// Main Dashboard Component
const ProductCompatibilityDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [compatibilityGraph, setCompatibilityGraph] = useState<CompatibilityGraph>({ nodes: [], links: [] });
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [trendData, setTrendData] = useState<TrendData>({
    trendingColors: [],
    trendingStyles: [],
    trendingCombinations: [],
    seasonalFactors: {},
    influencerSignals: [],
    runwaySignals: [],
    socialMediaTrends: [],
    marketTrends: []
  });
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    outfitPerformance: [],
    compatibilityGaps: [],
    topCombinations: [],
    lowPerformingPairs: [],
    userBehavior: {
      segmentation: {},
      conversionFunnel: [],
      retentionMetrics: {
        dailyActiveUsers: 0,
        weeklyRetention: 0,
        monthlyRetention: 0
      }
    },
    businessImpact: {
      aovIncrease: 0,
      returnReduction: 0,
      customerSatisfaction: 0,
      inventoryTurnover: 0,
      revenueAttribution: 0
    }
  });
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [viewMode, setViewMode] = useState<'graph' | 'outfits' | 'analytics' | 'ai' | 'trends'>('graph');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationParams, setGenerationParams] = useState({
    occasion: '',
    season: '',
    style: '',
    budget: [0, 1000] as [number, number],
    includeAccessories: true,
    personalize: true,
    creativityLevel: 'balanced' as 'conservative' | 'balanced' | 'creative',
    sustainabilityFocus: false
  });

  // Generate sample data (same as before)
  useEffect(() => {
    const generateSampleProducts = (count: number): Product[] => {
      const categories: Product['category'][] = ['top', 'bottom', 'footwear', 'accessory', 'dress', 'outerwear'];
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#9B59B6', '#F7DC6F', '#2C3E50', '#E74C3C', '#1ABC9C'];
      const patterns: Product['pattern'][] = ['solid', 'striped', 'printed', 'floral', 'geometric', 'abstract'];
      const textures: Product['texture'][] = ['cotton', 'denim', 'leather', 'silk', 'wool', 'knit', 'polyester', 'velvet'];
      const fits: Product['fit'][] = ['slim', 'regular', 'oversized', 'tailored', 'relaxed', 'athletic'];
      const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Luxury Co.', 'Urban Wear'];
      const occasions: string[][] = [['casual'], ['formal'], ['party'], ['office'], ['casual', 'office'], ['party', 'formal']];
      const styles: string[][] = [['minimalist'], ['streetwear'], ['bohemian'], ['classic'], ['edgy'], ['romantic']];
      const seasons: string[][] = [['spring'], ['summer'], ['fall'], ['winter'], ['spring', 'summer'], ['fall', 'winter']];
      const priceTiers: Product['priceTier'][] = ['budget', 'mid', 'premium', 'luxury'];
      
      return Array.from({ length: count }, (_, i) => ({
        id: `prod_${i}`,
        name: `${brands[i % brands.length]} ${categories[i % categories.length]} ${i}`,
        category: categories[i % categories.length],
        subcategory: ['t-shirt', 'jeans', 'sneakers', 'bag', 'dress', 'jacket'][i % 6],
        color: ['red', 'blue', 'green', 'black', 'white', 'beige', 'navy', 'gray'][i % 8],
        colorHex: colors[i % colors.length],
        pattern: patterns[i % patterns.length],
        texture: textures[i % textures.length],
        fit: fits[i % fits.length],
        brand: brands[i % brands.length],
        price: [49, 79, 129, 199, 299, 499][i % 6],
        season: seasons[i % seasons.length],
        occasion: occasions[i % occasions.length],
        style: styles[i % styles.length],
        size: ['S', 'M', 'L', 'XL'],
        compatibilityScore: Math.random() * 100,
        embeddings: {
          visual: Array.from({ length: 128 }, () => Math.random()),
          textual: Array.from({ length: 64 }, () => Math.random()),
          behavioral: Array.from({ length: 32 }, () => Math.random()),
          attribute: Array.from({ length: 16 }, () => Math.random())
        },
        inventory: Math.floor(Math.random() * 100),
        returnRate: Math.random() * 0.3,
        popularity: Math.random(),
        views: Math.floor(Math.random() * 1000),
        purchases: Math.floor(Math.random() * 100),
        rating: Math.random() * 2 + 3,
        sustainabilityScore: Math.random() * 100,
        materialComposition: { 'cotton': 80, 'polyester': 20 },
        dimensions: { length: 70, width: 50, height: 5 },
        weight: 0.5,
        tags: ['new', 'trending', 'sustainable'],
        createdAt: new Date(Date.now() - Math.random() * 1000000000),
        lastUpdated: new Date(),
        styleCluster: i % 5,
        priceTier: priceTiers[i % priceTiers.length],
        targetDemographics: {
          ageRange: [18, 35] as [number, number],
          gender: ['unisex'],
          incomeLevel: 'middle'
        }
      }));
    };

    const generateCompatibilityGraph = (products: Product[]): CompatibilityGraph => {
      const nodes = products.slice(0, 30).map((p, i) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        group: i % 6,
        size: (p.popularity || 0) * 3 + 1,
        color: p.colorHex,
        properties: {
          popularity: p.popularity || 0,
          price: p.price,
          returnRate: p.returnRate || 0,
          compatibilityStrength: Math.random()
        },
        position: {
          x: Math.cos((i / 30) * Math.PI * 2) * 10,
          y: Math.sin((i / 30) * Math.PI * 4) * 3,
          z: Math.sin((i / 30) * Math.PI * 2) * 10
        }
      }));

      const links: CompatibilityGraph['links'] = [];
      const linkTypes = ['visual', 'semantic', 'attribute', 'behavioral', 'trend'];
      
      for (let i = 0; i < 50; i++) {
        const sourceIdx = Math.floor(Math.random() * nodes.length);
        const targetIdx = Math.floor(Math.random() * nodes.length);
        
        if (sourceIdx !== targetIdx) {
          const strength = Math.random();
          const type = linkTypes[i % linkTypes.length];
          
          links.push({
            source: nodes[sourceIdx].id,
            target: nodes[targetIdx].id,
            value: strength,
            type: type as any,
            color: {
              'visual': '#FF6B6B',
              'semantic': '#4ECDC4',
              'attribute': '#45B7D1',
              'behavioral': '#9B59B6',
              'trend': '#F7DC6F'
            }[type],
            opacity: 0.3 + strength * 0.4,
            curvature: Math.random() * 0.5,
            label: strength > 0.7 ? 'Strong' : strength > 0.4 ? 'Medium' : 'Weak'
          });
        }
      }

      return { nodes, links };
    };

    const generateSampleOutfits = (products: Product[]): Outfit[] => {
      return Array.from({ length: 12 }, (_, i) => {
        const selectedProducts = products
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 3) + 2);
        
        const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
        const avgScore = selectedProducts.reduce((sum, p) => sum + (p.compatibilityScore || 0), 0) / selectedProducts.length;
        
        return {
          id: `outfit_${i}`,
          name: ['Urban Chic', 'Office Elegance', 'Weekend Casual', 'Evening Glam', 'Minimalist Style', 'Bohemian Dreams'][i % 6],
          description: 'A beautifully coordinated outfit for any occasion',
          products: selectedProducts,
          totalScore: avgScore * 0.9 + Math.random() * 10,
          visualCohesion: Math.random() * 100,
          styleConsistency: Math.random() * 100,
          occasion: ['casual', 'formal', 'party', 'office'][i % 4],
          season: ['spring', 'summer', 'fall', 'winter'][i % 4],
          style: ['minimalist', 'streetwear', 'bohemian', 'classic'][i % 4],
          priceRange: [Math.min(...selectedProducts.map(p => p.price)), totalPrice] as [number, number],
          completeness: selectedProducts.length >= 3 ? 100 : (selectedProducts.length / 3) * 100,
          popularity: Math.random(),
          conversionRate: Math.random() * 0.2,
          returnRate: Math.random() * 0.1,
          dwellTime: Math.random() * 60 + 30,
          generatedBy: ['ai', 'stylist', 'user'][i % 3] as 'ai' | 'stylist' | 'user',
          tags: ['new', 'trending', 'editor-pick'],
          createdAt: new Date(Date.now() - Math.random() * 1000000000),
          confidenceScore: Math.random() * 0.2 + 0.8,
          sustainabilityImpact: Math.random() * 100,
          trendRelevance: Math.random() * 100,
          performanceMetrics: {
            clickThroughRate: Math.random() * 0.1,
            addToCartRate: Math.random() * 0.05,
            purchaseRate: Math.random() * 0.02,
            averageOrderValue: totalPrice * (1 + Math.random() * 0.5),
            revenueGenerated: totalPrice * Math.random() * 100
          }
        };
      });
    };

    const sampleProducts = generateSampleProducts(100);
    setProducts(sampleProducts);
    setCompatibilityGraph(generateCompatibilityGraph(sampleProducts));
    setOutfits(generateSampleOutfits(sampleProducts));

    // Generate trend data
    setTrendData({
      trendingColors: [
        { color: 'Earthy Green', hex: '#2ECC71', score: 0.95, trend: 'up' },
        { color: 'Sky Blue', hex: '#3498DB', score: 0.88, trend: 'up' },
        { color: 'Warm Beige', hex: '#F7DC6F', score: 0.82, trend: 'stable' },
        { color: 'Deep Burgundy', hex: '#922B21', score: 0.78, trend: 'up' }
      ],
      trendingStyles: [
        { style: 'Minimalist', score: 0.92, velocity: 0.12, momentum: 0.85 },
        { style: 'Streetwear', score: 0.87, velocity: 0.08, momentum: 0.78 },
        { style: 'Sustainable', score: 0.85, velocity: 0.15, momentum: 0.92 },
        { style: 'Vintage', score: 0.79, velocity: 0.05, momentum: 0.65 }
      ],
      trendingCombinations: [
        { products: ['prod_1', 'prod_2', 'prod_3'], score: 0.94, adoptionRate: 0.32 },
        { products: ['prod_4', 'prod_5'], score: 0.89, adoptionRate: 0.28 },
        { products: ['prod_6', 'prod_7', 'prod_8'], score: 0.86, adoptionRate: 0.24 }
      ],
      seasonalFactors: {
        'spring': 0.85,
        'summer': 0.92,
        'fall': 0.78,
        'winter': 0.65
      },
      influencerSignals: [
        { influencer: '@styleguide', products: ['prod_1', 'prod_4'], impact: 0.89, reach: 1500000, engagement: 0.045 },
        { influencer: '@fashionista', products: ['prod_2', 'prod_3'], impact: 0.76, reach: 850000, engagement: 0.032 }
      ],
      runwaySignals: [
        { event: 'Paris Fashion Week', collection: 'Spring/Summer 2024', trends: ['oversized', 'monochrome'], confidence: 0.92 },
        { event: 'Milan Fashion Week', collection: 'Fall/Winter 2024', trends: ['layering', 'texture'], confidence: 0.87 }
      ],
      socialMediaTrends: [
        { platform: 'Instagram', hashtag: '#minimaliststyle', volume: 245000, growth: 0.23 },
        { platform: 'TikTok', hashtag: '#streetwear', volume: 1850000, growth: 0.45 }
      ],
      marketTrends: [
        { category: 'sustainable', trend: 'growing', growthRate: 0.28, marketShare: 0.15 },
        { category: 'athleisure', trend: 'stable', growthRate: 0.08, marketShare: 0.22 },
        { category: 'formalwear', trend: 'declining', growthRate: -0.12, marketShare: 0.18 }
      ]
    });

    // Generate analytics data
    setAnalytics({
      outfitPerformance: Array.from({ length: 10 }, (_, i) => ({
        outfitId: `outfit_${i}`,
        ctr: Math.random() * 0.1,
        conversionRate: Math.random() * 0.2,
        avgOrderValue: Math.random() * 200 + 100,
        returnRate: Math.random() * 0.1,
        dwellTime: Math.random() * 60 + 30,
        revenue: Math.random() * 5000 + 1000,
        profitMargin: Math.random() * 0.3 + 0.2
      })),
      compatibilityGaps: [
        { category: 'tops', subcategory: 'blouses', gapScore: 0.72, opportunity: 'Need more sustainable casual blouses', potentialRevenue: 25000, urgency: 'high' },
        { category: 'bottoms', subcategory: 'skirts', gapScore: 0.58, opportunity: 'Limited formal skirt options for workwear', potentialRevenue: 18000, urgency: 'medium' },
        { category: 'footwear', subcategory: 'heels', gapScore: 0.65, opportunity: 'More comfortable heel options needed', potentialRevenue: 32000, urgency: 'high' }
      ],
      topCombinations: [
        { products: ['prod_1', 'prod_2', 'prod_3'], score: 0.95, revenue: 125000, frequency: 320, returnRate: 0.08, profitMargin: 0.42 },
        { products: ['prod_4', 'prod_5'], score: 0.92, revenue: 89000, frequency: 245, returnRate: 0.12, profitMargin: 0.38 },
        { products: ['prod_6', 'prod_7', 'prod_8'], score: 0.88, revenue: 67000, frequency: 187, returnRate: 0.15, profitMargin: 0.35 }
      ],
      lowPerformingPairs: [
        { products: ['prod_9', 'prod_10'], returnRate: 0.42, issue: 'Color and pattern clash causing high returns', severity: 'critical', recommendedAction: 'Remove pairing suggestions' },
        { products: ['prod_11', 'prod_12'], returnRate: 0.35, issue: 'Fit mismatch - oversized top with oversized bottom', severity: 'high', recommendedAction: 'Adjust compatibility algorithm' },
        { products: ['prod_13', 'prod_14'], returnRate: 0.28, issue: 'Style inconsistency - formal with casual', severity: 'medium', recommendedAction: 'Add style validation' }
      ],
      userBehavior: {
        segmentation: {
          'minimalist': 0.32,
          'streetwear': 0.28,
          'bohemian': 0.18,
          'classic': 0.22
        },
        conversionFunnel: [
          { stage: 'view', rate: 1.0, dropoff: 0 },
          { stage: 'click', rate: 0.45, dropoff: 0.55 },
          { stage: 'add_to_cart', rate: 0.18, dropoff: 0.27 },
          { stage: 'purchase', rate: 0.12, dropoff: 0.06 }
        ],
        retentionMetrics: {
          dailyActiveUsers: 12500,
          weeklyRetention: 0.65,
          monthlyRetention: 0.42
        }
      },
      businessImpact: {
        aovIncrease: 0.28,
        returnReduction: 0.32,
        customerSatisfaction: 4.5,
        inventoryTurnover: 3.2,
        revenueAttribution: 0.18
      }
    });

    // Generate AI insights
    setAiInsights([
      {
        id: 'insight_1',
        type: 'opportunity',
        title: 'Sustainable Fashion Gap',
        description: 'High demand for sustainable tops with limited compatible bottoms',
        confidence: 0.92,
        impact: 'high',
        recommendation: 'Source 3-4 sustainable bottom styles to complete outfits',
        metrics: { current: 0.32, target: 0.65, improvement: 0.33 },
        relatedProducts: ['prod_1', 'prod_4', 'prod_7'],
        timeframe: 'short_term'
      },
      {
        id: 'insight_2',
        type: 'optimization',
        title: 'Return Rate Reduction',
        description: 'Certain color combinations showing 42% higher return rates',
        confidence: 0.88,
        impact: 'high',
        recommendation: 'Adjust color compatibility algorithm weights',
        metrics: { current: 0.42, target: 0.25, improvement: 0.17 },
        relatedProducts: ['prod_9', 'prod_10'],
        timeframe: 'immediate'
      },
      {
        id: 'insight_3',
        type: 'trend',
        title: 'Minimalist Style Surge',
        description: 'Minimalist outfits showing 28% higher conversion rates',
        confidence: 0.85,
        impact: 'medium',
        recommendation: 'Increase minimalist outfit generation by 40%',
        metrics: { current: 0.32, target: 0.45, improvement: 0.13 },
        relatedProducts: ['prod_2', 'prod_5', 'prod_8'],
        timeframe: 'short_term'
      }
    ]);
  }, []);

  // Generate outfits with AI
  const generateOutfits = useCallback(async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const filteredProducts = products.filter(p => 
      p.price >= generationParams.budget[0] &&
      p.price <= generationParams.budget[1] &&
      (generationParams.occasion === '' || p.occasion.includes(generationParams.occasion)) &&
      (generationParams.season === '' || p.season.includes(generationParams.season)) &&
      (generationParams.style === '' || p.style.includes(generationParams.style))
    );
    
    const creativityFactor = {
      'conservative': 0.3,
      'balanced': 0.5,
      'creative': 0.7
    }[generationParams.creativityLevel];
    
    const newOutfits: Outfit[] = Array.from({ length: 6 }, (_, i) => {
      const baseProducts = filteredProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 2) + 2);
      
      let selectedProducts = [...baseProducts];
      if (generationParams.includeAccessories && Math.random() > 0.3) {
        const accessories = products.filter(p => p.category === 'accessory');
        if (accessories.length > 0) {
          selectedProducts.push(accessories[Math.floor(Math.random() * accessories.length)]);
        }
      }
      
      const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
      const avgCompatibility = selectedProducts.reduce((sum, p) => {
        const compatScores = selectedProducts
          .filter(q => q.id !== p.id)
          .map(q => AICompatibilityEngine.calculateCompatibility(p, q).overallScore);
        return sum + (compatScores.length > 0 ? compatScores.reduce((a, b) => a + b, 0) / compatScores.length : 0);
      }, 0) / Math.max(selectedProducts.length - 1, 1);
      
      const creativityBoost = 1 + creativityFactor * (Math.random() * 0.4 - 0.2);
      
      return {
        id: `gen_${Date.now()}_${i}`,
        name: ['AI Generated Look', 'Smart Outfit', 'Style Recommendation', 'Perfect Pairing'][i % 4],
        description: 'Generated by AI compatibility engine',
        products: selectedProducts,
        totalScore: Math.min(100, avgCompatibility * creativityBoost),
        visualCohesion: Math.random() * 100,
        styleConsistency: Math.random() * 100,
        occasion: generationParams.occasion || 'casual',
        season: generationParams.season || 'all-season',
        style: generationParams.style || 'mixed',
        priceRange: [Math.min(...selectedProducts.map(p => p.price)), totalPrice] as [number, number],
        completeness: selectedProducts.length >= 3 ? 100 : (selectedProducts.length / 3) * 100,
        popularity: Math.random(),
        conversionRate: Math.random() * 0.2,
        returnRate: Math.random() * 0.1,
        dwellTime: Math.random() * 60 + 30,
        generatedBy: 'ai',
        tags: ['ai-generated', 'new'],
        createdAt: new Date(),
        confidenceScore: 0.8 + Math.random() * 0.15,
        sustainabilityImpact: generationParams.sustainabilityFocus ? Math.random() * 30 + 70 : Math.random() * 100,
        trendRelevance: Math.random() * 100
      };
    });
    
    setOutfits(prev => [...newOutfits, ...prev.slice(0, 12)]);
    setIsGenerating(false);
  }, [products, generationParams]);

  // Calculate compatibility matrix
  const calculateCompatibilityMatrix = useCallback((products: Product[]) => {
    const matrix: number[][] = [];
    
    for (let i = 0; i < Math.min(10, products.length); i++) {
      matrix[i] = [];
      for (let j = 0; j < Math.min(10, products.length); j++) {
        if (i === j) {
          matrix[i][j] = 100;
        } else {
          const score = AICompatibilityEngine.calculateCompatibility(products[i], products[j]);
          matrix[i][j] = score.overallScore;
        }
      }
    }
    
    return matrix;
  }, []);

  // 3D Scene Component
  const CompatibilityGraph3D: React.FC = () => {
    const { camera } = useThree();
    
    useEffect(() => {
      camera.position.set(15, 10, 15);
      camera.lookAt(0, 0, 0);
    }, [camera]);
    
    return (
      <>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.3} color="#3498DB" />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#E74C3C" />
        
        {/* Grid floor */}
        <gridHelper args={[50, 50, '#4A5568', '#2D3748']} rotation={[Math.PI / 2, 0, 0]} />
        
        {/* Product nodes */}
        {compatibilityGraph.nodes.slice(0, 20).map((node, i) => {
          const position: [number, number, number] = node.position 
            ? [node.position.x, node.position.y, node.position.z]
            : [
                Math.cos((i / 20) * Math.PI * 2) * 8,
                Math.sin((i / 20) * Math.PI * 4) * 2,
                Math.sin((i / 20) * Math.PI * 2) * 8
              ];
          
          const product = products.find(p => p.id === node.id);
          if (!product) return null;
          
          return (
            <ProductNode3D
              key={node.id}
              product={product}
              position={position}
              scale={node.size}
              onClick={() => setSelectedProduct(product)}
              isSelected={selectedProduct?.id === product.id}
              animation="float"
            />
          );
        })}
        
        {/* Compatibility edges */}
        {compatibilityGraph.links.slice(0, 30).map((link, i) => {
          const sourceNode = compatibilityGraph.nodes.find(n => n.id === link.source);
          const targetNode = compatibilityGraph.nodes.find(n => n.id === link.target);
          
          if (!sourceNode || !targetNode) return null;
          
          const sourcePosition = sourceNode.position || { x: 0, y: 0, z: 0 };
          const targetPosition = targetNode.position || { x: 0, y: 0, z: 0 };
          
          return (
            <CompatibilityEdge3D
              key={`${link.source}-${link.target}-${i}`}
              from={[sourcePosition.x, sourcePosition.y, sourcePosition.z]}
              to={[targetPosition.x, targetPosition.y, targetPosition.z]}
              strength={link.value}
              type={link.type}
              label={link.label}
              animated={true}
            />
          );
        })}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        
        {/* Neural network visualization in the background */}
        <NeuralNetworkVisualization
          layers={[
            Array.from({ length: 8 }, () => Math.random()),
            Array.from({ length: 6 }, () => Math.random()),
            Array.from({ length: 4 }, () => Math.random()),
            Array.from({ length: 2 }, () => Math.random())
          ]}
          activations={[]}
        />
      </>
    );
  };

  // Dashboard Components
  const CompatibilityGraphPanel = () => {
    const compatibilityMatrix = calculateCompatibilityMatrix(products.slice(0, 8));
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Graph */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">3D Compatibility Graph</h3>
                <p className="text-gray-400 text-sm">Interactive visualization of product relationships</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2">
                  <FilterIcon /> Filter
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2">
                  <DownloadIcon /> Export
                </button>
              </div>
            </div>
            
            <div className="h-[500px] rounded-lg overflow-hidden bg-gray-950">
              <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                <CompatibilityGraph3D />
              </Canvas>
            </div>
          </div>
          
          {/* Graph Stats */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Graph Statistics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Nodes</span>
                  <span className="text-white font-bold">{compatibilityGraph.nodes.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Edges</span>
                  <span className="text-white font-bold">{compatibilityGraph.links.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Compatibility</span>
                  <span className="text-green-400 font-bold">84.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Graph Density</span>
                  <span className="text-white font-bold">0.42</span>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Edge Types</h4>
              <div className="space-y-3">
                {[
                  { type: 'Visual', color: '#FF6B6B', desc: 'Color, pattern, texture harmony' },
                  { type: 'Semantic', color: '#4ECDC4', desc: 'Style, occasion, season match' },
                  { type: 'Attribute', color: '#45B7D1', desc: 'Fit, size, fabric compatibility' },
                  { type: 'Behavioral', color: '#9B59B6', desc: 'Purchase patterns, user behavior' },
                  { type: 'Trend', color: '#F7DC6F', desc: 'Trend relevance and momentum' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                    <div>
                      <div className="text-white font-medium">{item.type}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Compatibility Matrix */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Compatibility Heatmap</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 text-gray-400"></th>
                  {products.slice(0, 8).map((product, i) => (
                    <th key={i} className="text-center p-2 text-gray-400 text-sm">
                      {product.name.substring(0, 10)}...
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compatibilityMatrix.map((row, i) => (
                  <tr key={i}>
                    <td className="p-2 text-gray-400 text-sm">
                      {products[i]?.name.substring(0, 10)}...
                    </td>
                    {row.map((score, j) => (
                      <td key={j} className="p-2">
                        <div className={`
                          text-center py-1 rounded text-xs font-medium
                          ${score >= 90 ? 'bg-green-900/30 text-green-400' : 
                            score >= 70 ? 'bg-blue-900/30 text-blue-400' : 
                            score >= 50 ? 'bg-yellow-900/30 text-yellow-400' : 
                            'bg-red-900/30 text-red-400'}
                        `}>
                          {Math.round(score)}%
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

    const OutfitGenerationPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Generation Controls */}
        <div className="lg:col-span-1 bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-6">Generate Outfits</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Occasion</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                value={generationParams.occasion}
                onChange={(e) => setGenerationParams(prev => ({ ...prev, occasion: e.target.value }))}
              >
                <option value="">Any Occasion</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="office">Office</option>
                <option value="party">Party</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Season</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                value={generationParams.season}
                onChange={(e) => setGenerationParams(prev => ({ ...prev, season: e.target.value }))}
              >
                <option value="">All Seasons</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Style</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                value={generationParams.style}
                onChange={(e) => setGenerationParams(prev => ({ ...prev, style: e.target.value }))}
              >
                <option value="">Any Style</option>
                <option value="minimalist">Minimalist</option>
                <option value="streetwear">Streetwear</option>
                <option value="bohemian">Bohemian</option>
                <option value="classic">Classic</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Budget: ${generationParams.budget[0]} - ${generationParams.budget[1]}
              </label>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="50"
                value={generationParams.budget[1]}
                onChange={(e) => setGenerationParams(prev => ({ 
                  ...prev, 
                  budget: [prev.budget[0], parseInt(e.target.value)] 
                }))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-300">
                <input 
                  type="checkbox" 
                  checked={generationParams.includeAccessories}
                  onChange={(e) => setGenerationParams(prev => ({ 
                    ...prev, 
                    includeAccessories: e.target.checked 
                  }))}
                  className="rounded bg-gray-700"
                />
                Include Accessories
              </label>
              
              <label className="flex items-center gap-2 text-gray-300">
                <input 
                  type="checkbox" 
                  checked={generationParams.sustainabilityFocus}
                  onChange={(e) => setGenerationParams(prev => ({ 
                    ...prev, 
                    sustainabilityFocus: e.target.checked 
                  }))}
                  className="rounded bg-gray-700"
                />
                Sustainability Focus
              </label>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Creativity Level</label>
              <div className="flex gap-2">
                {(['conservative', 'balanced', 'creative'] as const).map(level => (
                  <button
                    key={level}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                      generationParams.creativityLevel === level 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                    onClick={() => setGenerationParams(prev => ({ ...prev, creativityLevel: level }))}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={generateOutfits}
              disabled={isGenerating}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                isGenerating 
                  ? 'bg-blue-800 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCwIcon className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ZapIcon />
                  Generate Outfits
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Outfit Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.slice(0, 6).map(outfit => (
              <motion.div
                key={outfit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-colors"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{outfit.name}</h4>
                      <p className="text-gray-400 text-sm">{outfit.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        outfit.totalScore >= 90 ? 'bg-green-900/30 text-green-400' :
                        outfit.totalScore >= 70 ? 'bg-blue-900/30 text-blue-400' :
                        'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {Math.round(outfit.totalScore)}% Match
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {outfit.generatedBy === 'ai' ? '🤖 AI' : '👨‍🎨 Stylist'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Products in outfit */}
                  <div className="flex gap-2 mb-4">
                    {outfit.products.slice(0, 4).map(product => (
                      <div 
                        key={product.id}
                        className="relative group"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div 
                          className="w-12 h-12 rounded-lg border border-gray-700"
                          style={{ backgroundColor: product.colorHex }}
                        />
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {product.name}
                        </div>
                      </div>
                    ))}
                    {outfit.products.length > 4 && (
                      <div className="w-12 h-12 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 text-xs">
                        +{outfit.products.length - 4}
                      </div>
                    )}
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-gray-400 text-xs">Price</div>
                      <div className="text-white font-semibold">
                        ${outfit.priceRange[0]}-{outfit.priceRange[1]}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-xs">Return Rate</div>
                      <div className="text-white font-semibold">
                        {(outfit.returnRate * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-xs">Trend</div>
                      <div className="text-white font-semibold">
                        {Math.round(outfit.trendRelevance)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {outfit.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedOutfit(outfit)}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2"
                    >
                      <EyeIcon />
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Outfit Performance</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.outfitPerformance.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="outfitId" stroke="#9CA3AF" tickFormatter={(val) => val.substring(0, 8)} />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                labelStyle={{ color: '#E5E7EB' }}
              />
              <Legend />
              <RechartsLine type="monotone" dataKey="conversionRate" stroke="#3B82F6" name="Conversion Rate" />
              <RechartsLine type="monotone" dataKey="ctr" stroke="#10B981" name="CTR" />
              <RechartsLine type="monotone" dataKey="avgOrderValue" stroke="#F59E0B" name="Avg Order Value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const AnalyticsPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Combinations */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Top Performing Combinations</h4>
          <div className="space-y-4">
            {analytics.topCombinations.map((combo, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl text-gray-500">#{i + 1}</div>
                  <div>
                    <div className="text-white font-medium">
                      {combo.products.slice(0, 3).map(p => p.substring(0, 6)).join(' + ')}
                      {combo.products.length > 3 && '...'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      ${combo.revenue.toLocaleString()} revenue
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">
                    {Math.round(combo.score * 100)}%
                  </div>
                  <div className="text-gray-400 text-sm">
                    {combo.frequency} purchases
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Compatibility Gaps */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Compatibility Gaps</h4>
          <div className="space-y-4">
            {analytics.compatibilityGaps.map((gap, i) => (
              <div key={i} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-white font-medium">{gap.category} - {gap.subcategory}</div>
                    <div className="text-gray-400 text-sm">{gap.opportunity}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    gap.urgency === 'high' ? 'bg-red-900/30 text-red-400' :
                    gap.urgency === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-blue-900/30 text-blue-400'
                  }`}>
                    {gap.urgency.toUpperCase()}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Gap Score: {Math.round(gap.gapScore * 100)}%</span>
                  <span className="text-green-400">${gap.potentialRevenue.toLocaleString()} potential</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Business Impact */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Business Impact</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={[
              { metric: 'AOV Increase', value: analytics.businessImpact.aovIncrease * 100, fullMark: 100 },
              { metric: 'Return Reduction', value: analytics.businessImpact.returnReduction * 100, fullMark: 100 },
              { metric: 'Satisfaction', value: analytics.businessImpact.customerSatisfaction * 20, fullMark: 100 },
              { metric: 'Inventory Turnover', value: analytics.businessImpact.inventoryTurnover * 25, fullMark: 100 },
              { metric: 'Revenue Attribution', value: analytics.businessImpact.revenueAttribution * 100, fullMark: 100 },
            ]}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" />
              <Radar 
                name="Impact" 
                dataKey="value" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Value']}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const AIIntelligencePanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {aiInsights.map(insight => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-xl border ${
              insight.type === 'opportunity' ? 'border-green-500/30 bg-green-900/10' :
              insight.type === 'risk' ? 'border-red-500/30 bg-red-900/10' :
              insight.type === 'trend' ? 'border-blue-500/30 bg-blue-900/10' :
              'border-yellow-500/30 bg-yellow-900/10'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                  insight.type === 'opportunity' ? 'bg-green-900/30 text-green-400' :
                  insight.type === 'risk' ? 'bg-red-900/30 text-red-400' :
                  insight.type === 'trend' ? 'bg-blue-900/30 text-blue-400' :
                  'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                </div>
                <h4 className="text-xl font-bold text-white mt-2">{insight.title}</h4>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  insight.confidence >= 0.9 ? 'text-green-400' :
                  insight.confidence >= 0.8 ? 'text-blue-400' :
                  'text-yellow-400'
                }`}>
                  {Math.round(insight.confidence * 100)}%
                </div>
                <div className="text-xs text-gray-400">Confidence</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">{insight.description}</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Potential Improvement</span>
                  <span className="text-green-400">+{Math.round(insight.metrics.improvement * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${insight.metrics.target * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Current: {Math.round(insight.metrics.current * 100)}%</span>
                  <span>Target: {Math.round(insight.metrics.target * 100)}%</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400 mb-2">Recommendation</div>
                <div className="text-white">{insight.recommendation}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {insight.relatedProducts.slice(0, 2).map(productId => (
                    <span key={productId} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                      {productId.substring(0, 6)}
                    </span>
                  ))}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  insight.timeframe === 'immediate' ? 'bg-red-900/30 text-red-400' :
                  insight.timeframe === 'short_term' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-green-900/30 text-green-400'
                }`}>
                  {insight.timeframe.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Neural Network Visualization */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">AI Neural Network</h4>
        <div className="h-64 rounded-lg overflow-hidden bg-gray-950">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <NeuralNetworkVisualization
              layers={[
                Array.from({ length: 8 }, () => Math.random()),
                Array.from({ length: 12 }, () => Math.random()),
                Array.from({ length: 8 }, () => Math.random()),
                Array.from({ length: 4 }, () => Math.random())
              ]}
              activations={[]}
            />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      </div>
    </div>
  );

  const TrendAnalysisPanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Colors */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Trending Colors</h4>
          <div className="space-y-4">
            {trendData.trendingColors.map((color, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg border border-gray-700"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <div className="text-white font-medium">{color.color}</div>
                    <div className="text-gray-400 text-sm">{color.hex}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">
                    {Math.round(color.score * 100)}%
                  </div>
                  <div className={`text-sm flex items-center justify-end gap-1 ${
                    color.trend === 'up' ? 'text-green-400' :
                    color.trend === 'down' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {color.trend === 'up' ? <ArrowUpIcon /> : 
                     color.trend === 'down' ? <ArrowDownIcon /> : 
                     <MinusIcon />}
                    {color.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trending Styles */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Trending Styles</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData.trendingStyles}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="style" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }}
                  formatter={(value) => [`${Math.round(Number(value) * 100)}%`, 'Score']}
                />
                <Bar 
  dataKey="score" 
  fill="#3B82F6" 
  radius={[4, 4, 0, 0]}
>
  {trendData.trendingStyles.map((entry, index) => (
    <Cell 
      key={`cell-${index}`}
      fill={entry.velocity > 0.1 ? '#10B981' : entry.velocity < 0 ? '#EF4444' : '#3B82F6'}
      style={{ strokeWidth: 2, stroke: '#1F2937' }}  // ✅ FIXED - Now it's an object
    />
  ))}
</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Market Trends */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Market Trends</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendData.marketTrends.map((trend, i) => (
            <div key={i} className="p-6 bg-gray-800/30 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-white font-bold text-2xl">
                    {trend.category.charAt(0).toUpperCase() + trend.category.slice(1)}
                  </div>
                  <div className={`text-sm px-3 py-1 rounded-full inline-block mt-2 ${
                    trend.trend === 'growing' ? 'bg-green-900/30 text-green-400' :
                    trend.trend === 'declining' ? 'bg-red-900/30 text-red-400' :
                    'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {trend.trend.toUpperCase()}
                  </div>
                </div>
                <div className={`text-3xl font-bold ${
                  trend.growthRate > 0.15 ? 'text-green-400' :
                  trend.growthRate < 0 ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {trend.growthRate > 0 ? '+' : ''}{Math.round(trend.growthRate * 100)}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Market Share</span>
                  <span className="text-white">{Math.round(trend.marketShare * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${trend.marketShare * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="text-gray-400 text-sm mb-2">Recommendation</div>
                <div className="text-white">
                  {trend.trend === 'growing' ? 'Increase inventory and marketing' :
                   trend.trend === 'declining' ? 'Reduce inventory, focus on clearance' :
                   'Maintain current levels with monitoring'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">AI Product Compatibility Dashboard</h1>
              <p className="text-gray-400">Intelligent outfit generation and compatibility analysis</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search products, outfits..."
                  className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg w-64"
                />
              </div>
              
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2">
                <SettingsIcon />
                Settings
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'graph', label: '3D Graph', icon: <NetworkIcon /> },
              { key: 'outfits', label: 'Outfit Generator', icon: <ShoppingBagIcon /> },
              { key: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
              { key: 'ai', label: 'AI Insights', icon: <AutoGraphIcon /> },
              { key: 'trends', label: 'Trend Analysis', icon: <TrendingUpIcon /> }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setViewMode(item.key as any)}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                  viewMode === item.key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Products', value: products.length, icon: <PackageIcon />, color: 'blue' },
              { label: 'Generated Outfits', value: outfits.length, icon: <ShoppingBagIcon />, color: 'green' },
              { label: 'Avg Compatibility', value: '84.2%', icon: <TrendingUpIcon />, color: 'purple' },
              { label: 'Business Impact', value: '+28%', icon: <DollarSignIcon />, color: 'yellow' }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                    <div className="text-3xl font-bold text-white mt-2">{stat.value}</div>
                  </div>
                  <div className={`text-2xl ${
                    stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'green' ? 'text-green-500' :
                    stat.color === 'purple' ? 'text-purple-500' :
                    'text-yellow-500'
                  }`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {viewMode === 'graph' && <CompatibilityGraphPanel />}
              {viewMode === 'outfits' && <OutfitGenerationPanel />}
              {viewMode === 'analytics' && <AnalyticsPanel />}
              {viewMode === 'ai' && <AIIntelligencePanel />}
              {viewMode === 'trends' && <TrendAnalysisPanel />}
            </motion.div>
          </AnimatePresence>

          {/* Selected Product/Outfit Sidebar */}
          <AnimatePresence>
            {(selectedProduct || selectedOutfit) && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="fixed right-0 top-0 h-full w-96 bg-gray-900 border-l border-gray-800 shadow-2xl z-50 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-white">
                      {selectedProduct ? 'Product Details' : 'Outfit Details'}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setSelectedOutfit(null);
                      }}
                      className="p-2 hover:bg-gray-800 rounded-lg"
                    >
                      <XIcon />
                    </button>
                  </div>

                  {selectedProduct && (
                    <div className="space-y-6">
                      <div>
                        <div 
                          className="w-full h-48 rounded-lg mb-4"
                          style={{ backgroundColor: selectedProduct.colorHex }}
                        />
                        <h4 className="text-2xl font-bold text-white">{selectedProduct.name}</h4>
                        <div className="text-gray-400">{selectedProduct.brand} • {selectedProduct.category}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-sm">Price</div>
                          <div className="text-white font-bold text-xl">${selectedProduct.price}</div>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-sm">Compatibility</div>
                          <div className="text-white font-bold text-xl">
                            {selectedProduct.compatibilityScore ? Math.round(selectedProduct.compatibilityScore) : 'N/A'}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-gray-400 text-sm mb-2">Attributes</div>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: 'Style', value: selectedProduct.style.join(', ') },
                              { label: 'Fit', value: selectedProduct.fit },
                              { label: 'Texture', value: selectedProduct.texture },
                              { label: 'Pattern', value: selectedProduct.pattern }
                            ].map((attr, i) => (
                              <div key={i} className="px-3 py-2 bg-gray-800 rounded-lg">
                                <div className="text-gray-400 text-xs">{attr.label}</div>
                                <div className="text-white">{attr.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-400 text-sm mb-2">Performance</div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Views</span>
                              <span className="text-white">{selectedProduct.views.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Purchases</span>
                              <span className="text-white">{selectedProduct.purchases.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Return Rate</span>
                              <span className="text-red-400">
                                {selectedProduct.returnRate ? `${(selectedProduct.returnRate * 100).toFixed(1)}%` : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedOutfit && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-2xl font-bold text-white">{selectedOutfit.name}</h4>
                        <p className="text-gray-400 mt-2">{selectedOutfit.description}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                          <div className="text-gray-400 text-sm">Overall Score</div>
                          <div className={`text-3xl font-bold ${
                            selectedOutfit.totalScore >= 90 ? 'text-green-400' :
                            selectedOutfit.totalScore >= 70 ? 'text-blue-400' :
                            'text-yellow-400'
                          }`}>
                            {Math.round(selectedOutfit.totalScore)}%
                          </div>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                          <div className="text-gray-400 text-sm">Trend Relevance</div>
                          <div className="text-3xl font-bold text-purple-400">
                            {Math.round(selectedOutfit.trendRelevance)}%
                          </div>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                          <div className="text-gray-400 text-sm">Generated By</div>
                          <div className="text-3xl">
                            {selectedOutfit.generatedBy === 'ai' ? '🤖' : 
                             selectedOutfit.generatedBy === 'stylist' ? '👨‍🎨' : '👤'}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-400 text-sm mb-3">Products in Outfit</div>
                        <div className="space-y-3">
                          {selectedOutfit.products.map(product => (
                            <div 
                              key={product.id}
                              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 cursor-pointer"
                              onClick={() => setSelectedProduct(product)}
                            >
                              <div 
                                className="w-12 h-12 rounded"
                                style={{ backgroundColor: product.colorHex }}
                              />
                              <div className="flex-1">
                                <div className="text-white">{product.name}</div>
                                <div className="text-gray-400 text-sm">${product.price} • {product.category}</div>
                              </div>
                              <div className="text-gray-400">
                                →
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-800">
                        <h5 className="text-lg font-semibold text-white mb-4">Performance Metrics</h5>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedOutfit.performanceMetrics && Object.entries(selectedOutfit.performanceMetrics).map(([key, value]) => (
                            <div key={key} className="bg-gray-800/30 p-3 rounded-lg">
                              <div className="text-gray-400 text-sm capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <div className="text-white font-bold">
                                {typeof value === 'number' && key.includes('Rate') ? `${(value * 100).toFixed(1)}%` :
                                 typeof value === 'number' && key.includes('Value') ? `$${value.toLocaleString()}` :
                                 typeof value === 'number' ? value.toLocaleString() : value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>AI Product Compatibility Dashboard • Powered by Three.js & TensorFlow.js • Real-time outfit generation</p>
          <p className="mt-2">Data updates every 5 minutes • Last updated: {new Date().toLocaleTimeString()}</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductCompatibilityDashboard;