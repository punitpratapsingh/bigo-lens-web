// TagCompletenessChecker.tsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Text } from '@react-three/drei';
import { 
  BarChart3 as BarChartIcon, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  Tag, 
  Image as ImageIcon, 
  Globe, 
  Languages, 
  Database, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Upload, 
  RefreshCw, 
  Settings, 
  FileText, 
  Percent, 
  BarChart as BarChartLucide, 
  PieChart as PieChartIcon, 
  Grid, 
  List, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  Link, 
  ExternalLink, 
  Shield, 
  Target, 
  Zap, 
  Brain, 
  Sparkles, 
  Cpu, 
  UploadCloud, 
  Grid3X3, 
  Table as TableIcon, 
  Columns, 
  Layers, 
  Hash, 
  Type, 
  Users, 
  Star, 
  Heart, 
  ShoppingCart, 
  DollarSign, 
  Package, 
  Truck, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Camera, 
  Headphones, 
  Watch, 
  Home, 
  Shirt, 
  Clock,
  Calendar,
  Gem, 
  Book, 
  Music, 
  Gamepad, 
  Coffee, 
  Wine, 
  Car, 
  Bike 
} from 'lucide-react';
import * as d3 from 'd3';
import { sankey } from 'd3-sankey';

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

// Charts - Using aliases to avoid conflicts
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ComposedChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap,
} from 'recharts';

// ============ TYPES AND INTERFACES ============

interface Product {
  id: string;
  sku: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  tags: string[];
  attributes: Record<string, any>;
  images: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  variants?: Variant[];
  inventory: {
    quantity: number;
    stockStatus: 'in_stock' | 'out_of_stock' | 'low_stock';
  };
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  salesData?: {
    unitsSold: number;
    revenue: number;
    conversionRate: number;
    returnRate: number;
  };
  aiMetadata?: {
    imageLabels: string[];
    descriptionSentiment: number;
    predictedCategory: string;
    confidence: number;
  };
}

interface Variant {
  id: string;
  sku: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  attributes: Record<string, string>;
  inventory: number;
  images: string[];
}

interface AttributeSchema {
  category: string;
  mandatoryAttributes: string[];
  recommendedAttributes: string[];
  optionalAttributes: string[];
  attributeTypes: Record<string, {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    format?: string;
    options?: string[];
    validation?: {
      min?: number;
      max?: number;
      pattern?: string;
      required?: boolean;
    };
  }>;
}

interface BenchmarkComparison {
  industryAvg: number;
  competitorAvg: number;
  categoryAvg: number;
  yourScore?: number;
  top10Percentile?: number;
  bottom10Percentile?: number;
  missingAttributes?: string[];
  competitorScores?: Array<{
    name: string;
    score: number;
    completeness: number;
  }>;
}

interface TagCompletenessScore {
  productId: string;
  sku: string;
  title: string;
  category: string;
  completenessScore: number;
  mandatoryScore: number;
  seoScore: number;
  attributeScore: number;
  imageScore: number;
  missingAttributes: string[];
  incorrectAttributes: Array<{
    attribute: string;
    value: any;
    issue: string;
    suggestedValue?: any;
  }>;
  warnings: string[];
  suggestions: Array<{
    type: 'add' | 'modify' | 'remove';
    attribute: string;
    suggestion: string;
    impact: 'high' | 'medium' | 'low';
    confidence: number;
  }>;
  benchmarkComparison: BenchmarkComparison;
}

interface TagIssue {
  id: string;
  type: 'missing' | 'duplicate' | 'incorrect' | 'inconsistent' | 'format' | 'redundant';
  severity: 'critical' | 'high' | 'medium' | 'low';
  attribute: string;
  productId: string;
  sku: string;
  description: string;
  suggestedFix: string;
  impact: {
    searchVisibility: number;
    conversion: number;
    seo: number;
  };
  autoFixable: boolean;
}

interface BenchmarkData {
  category: string;
  industryAvg: number;
  top10Percentile: number;
  bottom10Percentile: number;
  yourScore: number;
  missingAttributes: string[];
  competitorScores: Array<{
    name: string;
    score: number;
    completeness: number;
  }>;
}

interface MarketplaceRule {
  platform: 'amazon' | 'flipkart' | 'myntra' | 'shopify' | 'ebay' | 'walmart';
  requiredAttributes: string[];
  formattingRules: Record<string, any>;
  prohibitedAttributes: string[];
  validationRules: Array<{
    attribute: string;
    rule: string;
    errorMessage: string;
  }>;
}

interface AIPrediction {
  attribute: string;
  predictedValue: string | number | boolean | string[];
  confidence: number;
  source: 'image' | 'description' | 'similar_products' | 'category';
  alternatives: Array<{
    value: any;
    confidence: number;
  }>;
}

interface ClusterAnalysis {
  clusterId: string;
  name: string;
  products: string[];
  commonMissingAttributes: string[];
  completenessScore: number;
  size: number;
  centroid: Record<string, any>;
  recommendations: string[];
}

interface HealthTrend {
  date: string;
  completenessScore: number;
  productsAnalyzed: number;
  criticalIssues: number;
  autoFixedIssues: number;
  avgFixTime: number;
}

interface BulkAuditResult {
  totalProducts: number;
  analyzedProducts: number;
  avgCompletenessScore: number;
  criticalIssues: number;
  autoFixableIssues: number;
  estimatedTimeToFix: number;
  categoryBreakdown: Record<string, {
    count: number;
    avgScore: number;
    issues: number;
  }>;
  topIssues: Array<{
    issue: string;
    count: number;
    impact: number;
  }>;
}

// ============ 3D VISUALIZATION COMPONENTS ============

const TagCompleteness3D: React.FC<{ 
  data: TagCompletenessScore[],
  onProductSelect: (productId: string) => void 
}> = ({ data, onProductSelect }) => {
  const meshRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  const points = useMemo(() => {
    return data.map((score, index) => {
      const angle = (index / data.length) * Math.PI * 2;
      const radius = 10 + (score.completenessScore / 100) * 5;
      
      return {
        position: [
          Math.cos(angle) * radius,
          (score.completenessScore / 100) * 10,
          Math.sin(angle) * radius
        ] as [number, number, number],
        color: score.completenessScore > 90 ? 0x00ff00 : 
               score.completenessScore > 70 ? 0xff9900 : 
               0xff0000,
        size: 0.5 + (score.completenessScore / 100) * 1.5,
        score,
        rotation: [0, angle, 0] as [number, number, number]
      };
    });
  }, [data]);

  return (
    <group ref={meshRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
      
      {/* Central core representing perfect completeness */}
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
        <Html distanceFactor={10} position={[0, 3, 0]}>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg border border-green-300">
            <div className="text-sm font-bold">100% Complete</div>
            <div className="text-xs">Target Score</div>
          </div>
        </Html>
      </mesh>
      
      {/* Product points */}
      {points.map((point, index) => (
        <group key={index} position={point.position} rotation={point.rotation}>
          <mesh onClick={() => onProductSelect(point.score.productId)}>
            <sphereGeometry args={[point.size, 16, 16]} />
            <meshStandardMaterial 
              color={point.color}
              emissive={point.color}
              emissiveIntensity={0.2}
              roughness={0.3}
              metalness={0.1}
            />
            <Html distanceFactor={15}>
              <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-gray-800 truncate">{point.score.sku}</div>
                  <Badge className={`ml-2 ${
                    point.score.completenessScore > 90 ? 'bg-green-100 text-green-800' :
                    point.score.completenessScore > 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {point.score.completenessScore}%
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 truncate">{point.score.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Missing: {point.score.missingAttributes.length} attributes
                </div>
                <div className="mt-1">
                  <Progress 
                    value={point.score.completenessScore} 
                    className="h-1"
                  />
                </div>
              </div>
            </Html>
          </mesh>
          
          {/* Connection line to center */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  0, 0, 0,
                  -point.position[0] / 2, -point.position[1] / 2, -point.position[2] / 2
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#94a3b8" opacity={0.3} transparent />
          </line>
        </group>
      ))}
      
      {/* Grid floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="#1e293b"
          opacity={0.2}
          transparent
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
      
      {/* Axes */}
      <group>
        {/* X-axis */}
        <mesh position={[20, 0, 0]}>
          <boxGeometry args={[40, 0.1, 0.1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Y-axis */}
        <mesh position={[0, 10, 0]}>
          <boxGeometry args={[0.1, 20, 0.1]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        {/* Z-axis */}
        <mesh position={[0, 0, 20]}>
          <boxGeometry args={[0.1, 0.1, 40]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        
        {/* Axis labels */}
        <Html position={[22, 0, 0]}>
          <div className="text-xs font-bold text-red-500">Category Distribution</div>
        </Html>
        <Html position={[0, 12, 0]}>
          <div className="text-xs font-bold text-green-500">Completeness Score</div>
        </Html>
        <Html position={[0, 0, 22]}>
          <div className="text-xs font-bold text-blue-500">SEO Impact</div>
        </Html>
      </group>
      
      {/* Floating tags representing missing attributes */}
      <Points count={50} />
    </group>
  );
};

const Points: React.FC<{ count: number }> = ({ count }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const points = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#fbbf24" transparent opacity={0.6} />
    </points>
  );
};

const AttributeNetworkGraph: React.FC<{ 
  attributes: string[],
  relationships: Array<{ source: string; target: string; strength: number }>
}> = ({ attributes, relationships }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !attributes.length) return;
    
    const width = containerRef.current.clientWidth;
    const height = 500;
    
    // Clear previous SVG
    d3.select(containerRef.current).selectAll('*').remove();
    
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    // Create nodes and links
    const nodes = attributes.map(attr => ({ id: attr, group: 1 }));
    const links = relationships.map(rel => ({
      source: rel.source,
      target: rel.target,
      value: rel.strength
    }));
    
    // Create force simulation
    const simulation = (d3 as any).forceSimulation(nodes)
      .force('link', (d3 as any).forceLink(links).id((d: any) => d.id).distance(100).strength(0.5))
      .force('charge', (d3 as any).forceManyBody().strength(-300))
      .force('center', (d3 as any).forceCenter(width / 2, height / 2));
    
    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => Math.sqrt(d.value) * 2);
    
    // Create nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('fill', (d: any) => (d3 as any).interpolateRainbow(d.group / 10))
      .call((d3 as any).drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
    
    // Add labels
    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((d: any) => d.id)
      .attr('font-size', '10px')
      .attr('dx', 12)
      .attr('dy', 4);
    
    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      
      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
      
      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });
    
    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
  }, [attributes, relationships]);
  
  return <div ref={containerRef} className="w-full h-[500px] rounded-lg border border-gray-200" />;
};

// ============ MAIN COMPONENT ============

// ============ MAIN COMPONENT ============

const TagCompletenessChecker: React.FC = () => {
  // ============ MOCK DATA GENERATORS & HELPERS ============
  // Define all non-hook helpers FIRST, before any state or hooks
  
  const getMandatoryAttributes = (category: string): string[] => {
    const baseAttributes = ['title', 'description', 'category', 'price', 'brand'];
    
    const categorySpecific: Record<string, string[]> = {
      'Apparel': ['color', 'size', 'material', 'fit', 'care_instructions'],
      'Footwear': ['color', 'size', 'material', 'sole_type', 'closure_type', 'heel_height'],
      'Electronics': ['color', 'dimensions', 'weight', 'warranty', 'power_source'],
      'Home & Kitchen': ['color', 'dimensions', 'material', 'care_instructions', 'assembly_required'],
      'Beauty & Personal Care': ['color', 'volume', 'ingredients', 'skin_type', 'scent'],
      'Sports & Outdoors': ['color', 'size', 'material', 'activity_type', 'weather_resistance'],
      'Books': ['author', 'publisher', 'isbn', 'pages', 'language'],
      'Toys & Games': ['color', 'material', 'age_range', 'battery_required', 'pieces_count']
    };
    
    return [...baseAttributes, ...(categorySpecific[category] || [])];
  };
  
  const hasAttribute = (product: Product | null, attribute: string): boolean => {
    if (!product) return false;
    
    if (attribute === 'title') return !!product.title && product.title.trim().length > 0;
    if (attribute === 'description') return !!product.description && product.description.trim().length > 50;
    if (attribute === 'category') return !!product.category;
    if (attribute === 'price') return product.price > 0;
    if (attribute === 'brand') return !!product.brand;
    
    return product.attributes[attribute] !== undefined && 
           product.attributes[attribute] !== null && 
           product.attributes[attribute] !== '';
  };
  
  const calculateSeoScore = (product: Product): number => {
    let score = 0;
    
    if (product.seo.title && product.seo.title.length > 30 && product.seo.title.length < 60) {
      score += 25;
    } else if (product.seo.title) {
      score += 15;
    }
    
    if (product.seo.description && product.seo.description.length > 120 && product.seo.description.length < 160) {
      score += 25;
    } else if (product.seo.description) {
      score += 15;
    }
    
    if (product.seo.keywords && product.seo.keywords.length >= 5) {
      score += 25;
    } else if (product.seo.keywords && product.seo.keywords.length > 0) {
      score += 15;
    }
    
    if (product.images.length >= 3) {
      score += 25;
    } else if (product.images.length > 0) {
      score += 15;
    }
    
    return score;
  };
  
  const calculateAttributeScore = (product: Product): number => {
    const allAttributes = Object.keys(product.attributes);
    const totalPossible = getMandatoryAttributes(product.category).length + 5;
    const filledCount = allAttributes.length;
    
    return Math.min(100, (filledCount / totalPossible) * 100);
  };
  
  const calculateImageScore = (product: Product): number => {
    if (product.images.length >= 5) return 100;
    if (product.images.length >= 3) return 80;
    if (product.images.length >= 1) return 60;
    return 0;
  };
  
  const detectIncorrectAttributes = (product: Product): Array<{
    attribute: string;
    value: any;
    issue: string;
    suggestedValue?: any;
  }> => {
    const issues: Array<{
      attribute: string;
      value: any;
      issue: string;
      suggestedValue?: any;
    }> = [];
    
    const tagCounts: Record<string, number> = {};
    product.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    Object.entries(tagCounts)
      .filter(([_, count]) => count > 1)
      .forEach(([tag]) => {
        issues.push({
          attribute: 'tags',
          value: tag,
          issue: 'Duplicate tag',
          suggestedValue: undefined
        });
      });
    
    Object.entries(product.attributes).forEach(([attr, value]) => {
      if (typeof value === 'string') {
        if (/[!@#$%^&*()_+=\[\]{};':"\\|,.<>?]/.test(value)) {
          issues.push({
            attribute: attr,
            value,
            issue: 'Contains special symbols',
            suggestedValue: value.replace(/[!@#$%^&*()_+=\[\]{};':"\\|,.<>?]/g, '')
          });
        }
        
        if (/^\d{10,}$/.test(value)) {
          issues.push({
            attribute: attr,
            value,
            issue: 'Suspicious long numeric value',
            suggestedValue: undefined
          });
        }
      }
    });
    
    return issues;
  };
  
  const generateWarnings = (product: Product): string[] => {
    const warnings: string[] = [];
    
    if (!product.seo.title || product.seo.title.length < 30) {
      warnings.push('SEO title is too short');
    }
    
    if (!product.seo.description || product.seo.description.length < 120) {
      warnings.push('Meta description is too short');
    }
    
    if (product.images.length < 3) {
      warnings.push('Insufficient product images');
    }
    
    if (product.description.length < 100) {
      warnings.push('Product description is too brief');
    }
    
    const mandatoryAttributes = getMandatoryAttributes(product.category);
    const missingMandatory = mandatoryAttributes.filter(attr => !hasAttribute(product, attr));
    
    if (missingMandatory.length > 0) {
      warnings.push(`Missing ${missingMandatory.length} mandatory attributes`);
    }
    
    return warnings;
  };
  
  const generateSuggestions = (product: Product): Array<{
    type: 'add' | 'modify' | 'remove';
    attribute: string;
    suggestion: string;
    impact: 'high' | 'medium' | 'low';
    confidence: number;
  }> => {
    const suggestions: Array<{
      type: 'add' | 'modify' | 'remove';
      attribute: string;
      suggestion: string;
      impact: 'high' | 'medium' | 'low';
      confidence: number;
    }> = [];
    
    const mandatoryAttributes = getMandatoryAttributes(product.category);
    mandatoryAttributes
      .filter(attr => !hasAttribute(product, attr))
      .forEach(attr => {
        suggestions.push({
          type: 'add',
          attribute: attr,
          suggestion: `Add missing mandatory attribute: ${attr}`,
          impact: 'high',
          confidence: 0.95
        });
      });
    
    if (!product.seo.title || product.seo.title.length < 40) {
      suggestions.push({
        type: 'modify',
        attribute: 'seo_title',
        suggestion: 'Optimize SEO title to include brand and keywords (60 chars max)',
        impact: 'high',
        confidence: 0.9
      });
    }
    
    if (product.images.length < 5) {
      suggestions.push({
        type: 'add',
        attribute: 'images',
        suggestion: 'Add more product images (recommended: 5+ images)',
        impact: 'medium',
        confidence: 0.85
      });
    }
    
    if (product.tags.length < 8) {
      suggestions.push({
        type: 'add',
        attribute: 'tags',
        suggestion: 'Add more relevant tags for better discoverability',
        impact: 'medium',
        confidence: 0.8
      });
    }
    
    return suggestions;
  };

  const generateTagIssues = (products: Product[], scores: TagCompletenessScore[]): TagIssue[] => {
    const issues: TagIssue[] = [];
    
    products.forEach(product => {
      const score = scores.find(s => s.productId === product.id);
      if (!score) return;
      
      score.missingAttributes.forEach(attr => {
        issues.push({
          id: `MISS-${product.id}-${attr}`,
          type: 'missing',
          severity: 'critical',
          attribute: attr,
          productId: product.id,
          sku: product.sku,
          description: `Missing mandatory attribute: ${attr}`,
          suggestedFix: `Add ${attr} attribute with appropriate value`,
          impact: {
            searchVisibility: 0.3 + Math.random() * 0.4,
            conversion: 0.2 + Math.random() * 0.3,
            seo: 0.4 + Math.random() * 0.3
          },
          autoFixable: Math.random() > 0.7
        });
      });
      
      const tagCounts: Record<string, number> = {};
      product.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
      
      Object.entries(tagCounts)
        .filter(([_, count]) => count > 1)
        .forEach(([tag]) => {
          issues.push({
            id: `DUP-${product.id}-${tag}`,
            type: 'duplicate',
            severity: 'low',
            attribute: 'tags',
            productId: product.id,
            sku: product.sku,
            description: `Duplicate tag found: "${tag}"`,
            suggestedFix: `Remove duplicate "${tag}" tag`,
            impact: {
              searchVisibility: 0.1,
              conversion: 0.05,
              seo: 0.1
            },
            autoFixable: true
          });
        });
      
      Object.entries(product.attributes).forEach(([attr, value]) => {
        if (typeof value === 'string') {
          if (/[!@#$%^&*()_+=\[\]{};':"\\|,.<>?]/.test(value)) {
            issues.push({
              id: `FMT-${product.id}-${attr}`,
              type: 'format',
              severity: 'medium',
              attribute: attr,
              productId: product.id,
              sku: product.sku,
              description: `Attribute "${attr}" contains special symbols: ${value}`,
              suggestedFix: `Clean value: ${value.replace(/[!@#$%^&*()_+=\[\]{};':"\\|,.<>?]/g, '')}`,
              impact: {
                searchVisibility: 0.15,
                conversion: 0.1,
                seo: 0.2
              },
              autoFixable: true
            });
          }
        }
      });
    });
    
    return issues;
  };

  const generateClusters = (scores: TagCompletenessScore[]): ClusterAnalysis[] => {
    const clustersByMissingAttrs: Record<string, ClusterAnalysis> = {};
    
    scores.forEach(score => {
      const missingKey = score.missingAttributes.sort().join(',');
      
      if (!clustersByMissingAttrs[missingKey]) {
        clustersByMissingAttrs[missingKey] = {
          clusterId: `CLUSTER-${Object.keys(clustersByMissingAttrs).length + 1}`,
          name: `Missing: ${score.missingAttributes.slice(0, 3).join(', ')}${score.missingAttributes.length > 3 ? '...' : ''}`,
          products: [],
          commonMissingAttributes: score.missingAttributes,
          completenessScore: score.completenessScore,
          size: 0,
          centroid: {},
          recommendations: []
        };
      }
      
      clustersByMissingAttrs[missingKey].products.push(score.productId);
      clustersByMissingAttrs[missingKey].size += 1;
      clustersByMissingAttrs[missingKey].completenessScore = 
        (clustersByMissingAttrs[missingKey].completenessScore + score.completenessScore) / 2;
    });
    
    return Object.values(clustersByMissingAttrs).map(cluster => ({
      ...cluster,
      recommendations: generateClusterRecommendations(cluster)
    }));
  };

  const generateClusterRecommendations = (cluster: ClusterAnalysis): string[] => {
    const recommendations: string[] = [];
    
    if (cluster.commonMissingAttributes.length > 0) {
      recommendations.push(`Bulk add: ${cluster.commonMissingAttributes.slice(0, 3).join(', ')}`);
    }
    
    if (cluster.size > 10) {
      recommendations.push('Create template for these products');
    }
    
    if (cluster.completenessScore < 70) {
      recommendations.push('Priority fix needed');
    }
    
    return recommendations;
  };

  const generateHealthTrends = (): HealthTrend[] => {
    const trends: HealthTrend[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      trends.push({
        date: date.toISOString().split('T')[0],
        completenessScore: 60 + Math.random() * 20 + (i * 2),
        productsAnalyzed: Math.floor(100 + Math.random() * 50),
        criticalIssues: Math.floor(20 - i * 2 + Math.random() * 5),
        autoFixedIssues: Math.floor(10 + i * 1 + Math.random() * 5),
        avgFixTime: 5 + Math.random() * 10
      });
    }
    
    return trends;
  };

  const generateAIPredictions = (product: Product): AIPrediction[] => {
    const predictions: AIPrediction[] = [];
    
    const mandatoryAttributes = getMandatoryAttributes(product.category);
    mandatoryAttributes
      .filter(attr => !hasAttribute(product, attr))
      .forEach(attr => {
        let predictedValue: any = '';
        let confidence = 0.8 + Math.random() * 0.2;
        
        switch (attr) {
          case 'material':
            predictedValue = ['Cotton', 'Polyester', 'Leather', 'Silk'][Math.floor(Math.random() * 4)];
            break;
          case 'color':
            predictedValue = ['Black', 'White', 'Blue', 'Red'][Math.floor(Math.random() * 4)];
            break;
          case 'size':
            predictedValue = ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)];
            break;
          default:
            predictedValue = 'Sample Value';
        }
        
        predictions.push({
          attribute: attr,
          predictedValue,
          confidence,
          source: Math.random() > 0.5 ? 'image' : 'description',
          alternatives: [
            { value: 'Alternative 1', confidence: confidence - 0.1 },
            { value: 'Alternative 2', confidence: confidence - 0.2 }
          ]
        });
      });
    
    return predictions;
  };

  // Now define callbacks after all non-hook helpers
  const generateProducts = useCallback((count: number): Product[] => {
    const categories = [
      'Apparel', 'Footwear', 'Electronics', 'Home & Kitchen', 
      'Beauty & Personal Care', 'Sports & Outdoors', 'Books', 'Toys & Games'
    ];
    
    const subcategories: Record<string, string[]> = {
      'Apparel': ['T-Shirts', 'Jeans', 'Dresses', 'Jackets', 'Sweaters', 'Activewear'],
      'Footwear': ['Sneakers', 'Boots', 'Sandals', 'Formal Shoes', 'Sports Shoes'],
      'Electronics': ['Smartphones', 'Laptops', 'Headphones', 'Wearables', 'Tablets'],
      'Home & Kitchen': ['Cookware', 'Furniture', 'Decor', 'Bedding', 'Lighting'],
      'Beauty & Personal Care': ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Tools'],
      'Sports & Outdoors': ['Fitness', 'Camping', 'Cycling', 'Yoga', 'Team Sports'],
      'Books': ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Business'],
      'Toys & Games': ['Action Figures', 'Board Games', 'Puzzles', 'Educational Toys']
    };

    const brands = ['Nike', 'Adidas', 'Apple', 'Samsung', 'Levis', 'Zara', 'Sony', 'Bosch'];
    
    return Array.from({ length: count }, (_, i) => {
      const category = categories[i % categories.length];
      const subcat = subcategories[category]?.[i % 5] || 'General';
      const brand = brands[i % brands.length];
      
      const hasMissingAttributes = Math.random() > 0.3;
      const missingCount = hasMissingAttributes ? Math.floor(Math.random() * 5) : 0;
      
      const attributes: Record<string, any> = {
        color: ['Black', 'White', 'Blue', 'Red', 'Green'][i % 5],
        size: ['S', 'M', 'L', 'XL'][i % 4],
        material: ['Cotton', 'Polyester', 'Leather', 'Silk'][i % 4],
        weight: `${0.5 + Math.random() * 5}kg`,
        dimensions: `${20 + Math.random() * 50}x${30 + Math.random() * 40}x${5 + Math.random() * 20}cm`
      };
      
      // Simulate missing attributes
      if (missingCount > 0) {
        const allAttributes = ['color', 'size', 'material', 'weight', 'dimensions', 'brand', 'style', 'pattern'];
        for (let j = 0; j < missingCount && j < allAttributes.length; j++) {
          delete attributes[allAttributes[j]];
        }
      }
      
      return {
        id: `PROD${String(i + 1).padStart(4, '0')}`,
        sku: `SKU-${brand.substring(0, 3).toUpperCase()}-${String(i + 1000)}`,
        title: `${brand} ${subcat} ${i + 1}`,
        description: `Premium ${subcat.toLowerCase()} from ${brand}. High quality materials and craftsmanship.`,
        category,
        subcategory: subcat,
        brand,
        price: 19.99 + Math.random() * 200,
        compareAtPrice: Math.random() > 0.5 ? 29.99 + Math.random() * 100 : undefined,
        tags: [category, subcat, brand, attributes.color, attributes.material].filter(Boolean),
        attributes,
        images: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, imgIdx) => 
          `https://picsum.photos/400/300?random=${i}${imgIdx}`
        ),
        seo: {
          title: `${brand} ${subcat} - Buy Online | StoreName`,
          description: `Shop ${brand} ${subcat.toLowerCase()} at best prices. Free shipping available.`,
          keywords: [brand, subcat, category, attributes.color, attributes.material]
        },
        variants: Math.random() > 0.7 ? Array.from({ length: 3 }, (_, vIdx) => ({
          id: `VAR${i}${vIdx}`,
          sku: `SKU-${brand.substring(0, 3).toUpperCase()}-${String(i + 1000)}-${vIdx + 1}`,
          title: `${attributes.color} - ${['S', 'M', 'L'][vIdx]}`,
          price: 19.99 + Math.random() * 50,
          attributes: {
            color: attributes.color,
            size: ['S', 'M', 'L'][vIdx]
          },
          inventory: Math.floor(Math.random() * 100),
          images: [`https://picsum.photos/400/300?random=${i}${vIdx}`]
        })) : undefined,
        inventory: {
          quantity: Math.floor(Math.random() * 500),
          stockStatus: Math.random() > 0.8 ? 'out_of_stock' : 
                       Math.random() > 0.6 ? 'low_stock' : 'in_stock'
        },
        status: Math.random() > 0.2 ? 'active' : 'draft',
        createdAt: new Date(Date.now() - Math.random() * 10000000000),
        updatedAt: new Date(),
        salesData: Math.random() > 0.3 ? {
          unitsSold: Math.floor(Math.random() * 1000),
          revenue: Math.floor(Math.random() * 50000),
          conversionRate: 0.01 + Math.random() * 0.05,
          returnRate: 0.01 + Math.random() * 0.1
        } : undefined,
        aiMetadata: Math.random() > 0.5 ? {
          imageLabels: ['fashion', 'clothing', attributes.color, 'model', 'studio'],
          descriptionSentiment: 0.7 + Math.random() * 0.3,
          predictedCategory: category,
          confidence: 0.8 + Math.random() * 0.2
        } : undefined
      };
    });
  }, []);
  // Generate benchmark comparison for a category and score
  const generateBenchmarkComparison = (category: string, completenessScore: number): BenchmarkComparison => {
    const industryAvg = 72 + Math.floor(Math.random() * 7 - 3); // small variation
    const competitorAvg = Math.max(0, Math.min(100, industryAvg + Math.floor(Math.random() * 10 - 2)));
    const categoryAvg = Math.round((industryAvg + competitorAvg) / 2);
    const top10Percentile = Math.min(100, categoryAvg + 15);
    const bottom10Percentile = Math.max(0, categoryAvg - 30);
    const mandatory = getMandatoryAttributes(category);
    const missingAttributes = mandatory.slice(0, Math.min(5, Math.floor(Math.random() * mandatory.length)));
    const competitorScores = [
      { name: 'Competitor A', score: Math.min(100, categoryAvg + 8), completeness: Math.min(100, categoryAvg + 8) },
      { name: 'Competitor B', score: Math.max(0, categoryAvg - 5), completeness: Math.max(0, categoryAvg - 5) }
    ];

    return {
      category,
      industryAvg,
      top10Percentile,
      bottom10Percentile,
      yourScore: completenessScore,
      missingAttributes,
      competitorScores,
      categoryAvg,
      competitorAvg
    } as BenchmarkComparison;
  };

  const generateCompletenessScores = useCallback((products: Product[]): TagCompletenessScore[] => {
    return products.map(product => {
      const mandatoryAttributes = getMandatoryAttributes(product.category);
      const hasMandatoryAttributes = mandatoryAttributes.map(attr => hasAttribute(product, attr));
      
      const mandatoryScore = (hasMandatoryAttributes.filter(Boolean).length / mandatoryAttributes.length) * 100;
      const seoScore = calculateSeoScore(product);
      const attributeScore = calculateAttributeScore(product);
      const imageScore = calculateImageScore(product);
      
      const completenessScore = Math.round(
        (mandatoryScore * 0.4) + (seoScore * 0.3) + (attributeScore * 0.2) + (imageScore * 0.1)
      );
      
      const missingAttributes = mandatoryAttributes.filter(attr => !hasAttribute(product, attr));
      const incorrectAttributes = detectIncorrectAttributes(product);
      const warnings = generateWarnings(product);
      const suggestions = generateSuggestions(product);
      const benchmarkComparison = generateBenchmarkComparison(product.category, completenessScore);
      
      return {
        productId: product.id,
        sku: product.sku,
        title: product.title,
        category: product.category,
        completenessScore,
        mandatoryScore,
        seoScore,
        attributeScore,
        imageScore,
        missingAttributes,
        incorrectAttributes,
        warnings,
        suggestions,
        benchmarkComparison
      };
    });
  }, []);

  // ============ STATE MANAGEMENT ============
  
  const [selectedTab, setSelectedTab] = useState<string>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedScore, setSelectedScore] = useState<TagCompletenessScore | null>(null);
  const [bulkAuditProgress, setBulkAuditProgress] = useState<number>(0);
  const [isAuditRunning, setIsAuditRunning] = useState<boolean>(false);
  const [aiSuggestions, setAiSuggestions] = useState<AIPrediction[]>([]);
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | '3d'>('grid');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [completenessScores, setCompletenessScores] = useState<TagCompletenessScore[]>([]);
  const [tagIssues, setTagIssues] = useState<TagIssue[]>([]);
  const [clusters, setClusters] = useState<ClusterAnalysis[]>([]);
  const [healthTrends, setHealthTrends] = useState<HealthTrend[]>([]);
  const [bulkAuditResult, setBulkAuditResult] = useState<BulkAuditResult | null>(null);

  // ============ EFFECT: Load Data ============
  // ============ EFFECT: Load Data ============
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      try {
        const mockProducts = generateProducts(100);
        setProducts(mockProducts);
        
        const scores = generateCompletenessScores(mockProducts);
        setCompletenessScores(scores);
        
        const issues = generateTagIssues(mockProducts, scores);
        setTagIssues(issues);
        
        const generatedClusters = generateClusters(scores);
        setClusters(generatedClusters);
        
        const trends = generateHealthTrends();
        setHealthTrends(trends);
        
        if (mockProducts.length > 0) {
          const aiSuggestions = generateAIPredictions(mockProducts[0]);
          setAiSuggestions(aiSuggestions);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [generateProducts, generateCompletenessScores]);

  // Define all remaining feature and helper functions below state declarations
  
  // 1. Attribute Coverage Score
  const calculateCategoryCoverage = (category: string) => {
    const categoryProducts = completenessScores.filter(score => 
      selectedCategory === 'all' || score.category === category
    );
    
    if (categoryProducts.length === 0) return null;
    
    const avgScore = categoryProducts.reduce((sum, score) => sum + score.completenessScore, 0) / categoryProducts.length;
    
    return {
      average: Math.round(avgScore),
      distribution: {
        excellent: categoryProducts.filter(s => s.completenessScore >= 90).length,
        good: categoryProducts.filter(s => s.completenessScore >= 70 && s.completenessScore < 90).length,
        fair: categoryProducts.filter(s => s.completenessScore >= 50 && s.completenessScore < 70).length,
        poor: categoryProducts.filter(s => s.completenessScore < 50).length
      }
    };
  };
  
  // 2. Mandatory Attribute Detection
  const detectMissingMandatoryAttributes = () => {
    const missingByCategory: Record<string, Array<{ attribute: string; count: number; products: string[] }>> = {};
    
    completenessScores.forEach(score => {
      if (!missingByCategory[score.category]) {
        missingByCategory[score.category] = [];
      }
      
      score.missingAttributes.forEach(attr => {
        const existing = missingByCategory[score.category].find(item => item.attribute === attr);
        if (existing) {
          existing.count += 1;
          existing.products.push(score.productId);
        } else {
          missingByCategory[score.category].push({
            attribute: attr,
            count: 1,
            products: [score.productId]
          });
        }
      });
    });
    
    return missingByCategory;
  };
  
  // 3. Category-Specific Tag Templates
  const getCategoryTemplate = (category: string): AttributeSchema => {
    const templates: Record<string, AttributeSchema> = {
      'Apparel': {
        category: 'Apparel',
        mandatoryAttributes: ['title', 'description', 'category', 'brand', 'price', 'color', 'size', 'material', 'fit'],
        recommendedAttributes: ['pattern', 'care_instructions', 'season', 'occasion', 'style'],
        optionalAttributes: ['weight', 'dimensions', 'country_of_origin', 'fabric_type', 'closure_type'],
        attributeTypes: {
          'color': { type: 'string', options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple'] },
          'size': { type: 'string', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
          'material': { type: 'string', options: ['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Denim'] },
          'fit': { type: 'string', options: ['Slim', 'Regular', 'Loose', 'Oversized'] }
        }
      },
      'Footwear': {
        category: 'Footwear',
        mandatoryAttributes: ['title', 'description', 'category', 'brand', 'price', 'color', 'size', 'material', 'sole_type'],
        recommendedAttributes: ['closure_type', 'heel_height', 'width', 'season', 'activity_type'],
        optionalAttributes: ['weight', 'dimensions', 'country_of_origin', 'water_resistance'],
        attributeTypes: {
          'size': { type: 'number', validation: { min: 1, max: 15 } },
          'sole_type': { type: 'string', options: ['Rubber', 'Leather', 'Synthetic', 'EVA'] },
          'closure_type': { type: 'string', options: ['Lace-up', 'Slip-on', 'Buckle', 'Velcro'] }
        }
      },
      'Electronics': {
        category: 'Electronics',
        mandatoryAttributes: ['title', 'description', 'category', 'brand', 'price', 'color', 'model', 'warranty'],
        recommendedAttributes: ['dimensions', 'weight', 'power_source', 'connectivity', 'compatibility'],
        optionalAttributes: ['accessories_included', 'country_of_origin', 'certifications'],
        attributeTypes: {
          'warranty': { type: 'string', options: ['1 Year', '2 Years', 'Lifetime'] },
          'power_source': { type: 'string', options: ['Battery', 'AC/DC', 'USB'] }
        }
      }
    };
    
    return templates[category] || {
      category,
      mandatoryAttributes: ['title', 'description', 'category', 'brand', 'price'],
      recommendedAttributes: [],
      optionalAttributes: [],
      attributeTypes: {}
    };
  };
  
  // 4. SEO Metadata Validation
  const validateSeoMetadata = (product: Product) => {
    const issues: Array<{ type: string; description: string; severity: 'high' | 'medium' | 'low' }> = [];
    
    // Check SEO title
    if (!product.seo.title || product.seo.title.length < 30) {
      issues.push({ 
        type: 'seo_title', 
        description: 'SEO title is too short (min 30 chars)', 
        severity: 'high' 
      });
    } else if (product.seo.title.length > 60) {
      issues.push({ 
        type: 'seo_title', 
        description: 'SEO title is too long (max 60 chars)', 
        severity: 'medium' 
      });
    }
    
    // Check meta description
    if (!product.seo.description || product.seo.description.length < 120) {
      issues.push({ 
        type: 'meta_description', 
        description: 'Meta description is too short (min 120 chars)', 
        severity: 'high' 
      });
    } else if (product.seo.description.length > 160) {
      issues.push({ 
        type: 'meta_description', 
        description: 'Meta description is too long (max 160 chars)', 
        severity: 'medium' 
      });
    }
    
    // Check keywords
    if (!product.seo.keywords || product.seo.keywords.length < 3) {
      issues.push({ 
        type: 'keywords', 
        description: 'Insufficient keywords (min 3 recommended)', 
        severity: 'medium' 
      });
    }
    
    // Check image alt text (simulated)
    if (product.images.length > 0 && !product.seo.title.includes(product.title)) {
      issues.push({ 
        type: 'image_alt', 
        description: 'Consider adding descriptive alt text to images', 
        severity: 'low' 
      });
    }
    
    return {
      score: 100 - (issues.length * 10),
      issues,
      suggestions: [
        'Include primary keyword in SEO title',
        'Use compelling call-to-action in meta description',
        'Add relevant long-tail keywords'
      ]
    };
  };
  
  // 5. Duplicate Tag Detection
  const findDuplicateTags = () => {
    const duplicates: Array<{ tag: string; count: number; products: string[] }> = [];
    const tagOccurrences: Record<string, { count: number; products: string[] }> = {};
    
    products.forEach(product => {
      product.tags.forEach(tag => {
        if (!tagOccurrences[tag]) {
          tagOccurrences[tag] = { count: 0, products: [] };
        }
        tagOccurrences[tag].count += 1;
        tagOccurrences[tag].products.push(product.id);
      });
    });
    
    // Find tags used across multiple products (potential duplicates)
    Object.entries(tagOccurrences)
      .filter(([_, data]) => data.count > 1)
      .forEach(([tag, data]) => {
        duplicates.push({
          tag,
          count: data.count,
          products: data.products
        });
      });
    
    return duplicates;
  };
  
  // 6. Incorrect Attribute Classification
  const detectMisclassifiedAttributes = () => {
    const misclassifications: Array<{
      productId: string;
      sku: string;
      attribute: string;
      value: any;
      expectedType: string;
      issue: string;
    }> = [];
    
    products.forEach(product => {
      const template = getCategoryTemplate(product.category);
      
      Object.entries(product.attributes).forEach(([attr, value]) => {
        const attrConfig = template.attributeTypes[attr];
        if (attrConfig) {
          // Check type
          if (attrConfig.type === 'string' && typeof value !== 'string') {
            misclassifications.push({
              productId: product.id,
              sku: product.sku,
              attribute: attr,
              value,
              expectedType: 'string',
              issue: 'Value should be text'
            });
          } else if (attrConfig.type === 'number' && typeof value !== 'number') {
            // Try to parse as number
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
              misclassifications.push({
                productId: product.id,
                sku: product.sku,
                attribute: attr,
                value,
                expectedType: 'number',
                issue: 'Value should be numeric'
              });
            }
          }
          
          // Check against options if available
          if (attrConfig.options && !attrConfig.options.includes(value)) {
            misclassifications.push({
              productId: product.id,
              sku: product.sku,
              attribute: attr,
              value,
              expectedType: `One of: ${attrConfig.options.join(', ')}`,
              issue: 'Value not in allowed options'
            });
          }
        }
      });
    });
    
    return misclassifications;
  };
  
  // 7. Tag Normalization
  const normalizeTags = (tags: string[]): string[] => {
    const normalized: string[] = [];
    const colorMap: Record<string, string> = {
      'blu': 'Blue',
      'navy': 'Blue',
      'dark blue': 'Blue',
      'light blue': 'Blue',
      'red': 'Red',
      'crimson': 'Red',
      'scarlet': 'Red',
      'green': 'Green',
      'emerald': 'Green',
      'lime': 'Green',
      'black': 'Black',
      'jet black': 'Black',
      'white': 'White',
      'ivory': 'White',
      'cream': 'White'
    };
    
    const materialMap: Record<string, string> = {
      'poly cotton': 'Polycotton',
      'poly-cotton': 'Polycotton',
      'cotton poly': 'Polycotton',
      'leatherette': 'Faux Leather',
      'pleather': 'Faux Leather',
      'syn leather': 'Synthetic Leather'
    };
    
    tags.forEach(tag => {
      let normalizedTag = tag.trim();
      
      // Normalize color
      if (colorMap[normalizedTag.toLowerCase()]) {
        normalizedTag = colorMap[normalizedTag.toLowerCase()];
      }
      
      // Normalize material
      if (materialMap[normalizedTag.toLowerCase()]) {
        normalizedTag = materialMap[normalizedTag.toLowerCase()];
      }
      
      // Capitalize first letter of each word
      normalizedTag = normalizedTag
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      // Remove special characters
      normalizedTag = normalizedTag.replace(/[^\w\s-]/g, '');
      
      if (!normalized.includes(normalizedTag)) {
        normalized.push(normalizedTag);
      }
    });
    
    return normalized;
  };
  
  // 8. Formatting Consistency Check
  const checkFormattingConsistency = () => {
    const formattingIssues: Array<{
      productId: string;
      sku: string;
      attribute: string;
      value: any;
      issue: string;
      suggestion: string;
    }> = [];
    
    products.forEach(product => {
      Object.entries(product.attributes).forEach(([attr, value]) => {
        if (typeof value === 'string') {
          const strValue = value as string;
          
          // Check for proper capitalization
          if (strValue !== strValue.charAt(0).toUpperCase() + strValue.slice(1).toLowerCase()) {
            formattingIssues.push({
              productId: product.id,
              sku: product.sku,
              attribute: attr,
              value: strValue,
              issue: 'Inconsistent capitalization',
              suggestion: strValue.charAt(0).toUpperCase() + strValue.slice(1).toLowerCase()
            });
          }
          
          // Check for special symbols
          if (/[!@#$%^&*()_+=\[\]{};':"\\|,.<>?]/.test(strValue)) {
            formattingIssues.push({
              productId: product.id,
              sku: product.sku,
              attribute: attr,
              value: strValue,
              issue: 'Contains special symbols',
              suggestion: strValue.replace(/[!@#$%^&*()_+=\[\]{};':"\\|,.<>?]/g, '')
            });
          }
          
          // Check for long numeric entries
          if (/^\d{10,}$/.test(strValue)) {
            formattingIssues.push({
              productId: product.id,
              sku: product.sku,
              attribute: attr,
              value: strValue,
              issue: 'Suspicious long numeric value',
              suggestion: 'Verify if this is correct'
            });
          }
        }
      });
      
      // Check title formatting
      if (product.title !== product.title.trim()) {
        formattingIssues.push({
          productId: product.id,
          sku: product.sku,
          attribute: 'title',
          value: product.title,
          issue: 'Title has trailing/leading spaces',
          suggestion: product.title.trim()
        });
      }
    });
    
    return formattingIssues;
  };
  
  // 9. Multi-language Attribute Detection
  const detectMultiLanguageInconsistencies = () => {
    const inconsistencies: Array<{
      productId: string;
      sku: string;
      attribute: string;
      englishValue: string;
      otherLanguageValue: string;
      language: string;
    }> = [];
    
    // Simulate multi-language data
    products.slice(0, 10).forEach(product => {
      if (Math.random() > 0.7) {
        inconsistencies.push({
          productId: product.id,
          sku: product.sku,
          attribute: 'color',
          englishValue: 'Blue',
          otherLanguageValue: 'Azul',
          language: 'Spanish'
        });
      }
    });
    
    return inconsistencies;
  };
  
  // 10. Attribute Redundancy Pruning
  const findRedundantAttributes = () => {
    const redundancies: Array<{
      productId: string;
      sku: string;
      attributes: string[];
      reason: string;
      suggestion: string;
    }> = [];
    
    products.forEach(product => {
      const attrs = Object.keys(product.attributes);
      
      // Check for similar attributes
      if (attrs.includes('color') && attrs.includes('colour')) {
        redundancies.push({
          productId: product.id,
          sku: product.sku,
          attributes: ['color', 'colour'],
          reason: 'Duplicate attribute names (US/UK spelling)',
          suggestion: 'Remove "colour", keep "color"'
        });
      }
      
      if (attrs.includes('material') && attrs.includes('fabric')) {
        redundancies.push({
          productId: product.id,
          sku: product.sku,
          attributes: ['material', 'fabric'],
          reason: 'Redundant attributes',
          suggestion: 'Merge into "material" attribute'
        });
      }
      
      // Check for irrelevant attributes
      const category = product.category;
      const irrelevantAttrs: Record<string, string[]> = {
        'Apparel': ['battery_type', 'screen_size'],
        'Electronics': ['fabric_type', 'care_instructions'],
        'Footwear': ['paper_type', 'author']
      };
      
      if (irrelevantAttrs[category]) {
        attrs.forEach(attr => {
          if (irrelevantAttrs[category].includes(attr)) {
            redundancies.push({
              productId: product.id,
              sku: product.sku,
              attributes: [attr],
              reason: `Irrelevant attribute for ${category}`,
              suggestion: `Remove "${attr}" attribute`
            });
          }
        });
      }
    });
    
    return redundancies;
  };
  
  // 11. AI Attribute Prediction
  const predictMissingAttributes = (product: Product): AIPrediction[] => {
    return generateAIPredictions(product);
  };
  
  // 12. Category Benchmark Comparison
  const getCategoryBenchmark = (category: string) => {
    const categoryScores = completenessScores.filter(s => s.category === category);
    const avgScore = categoryScores.reduce((sum, s) => sum + s.completenessScore, 0) / categoryScores.length;
    
    return {
      yourScore: Math.round(avgScore),
      industryAverage: 72,
      topCompetitorScore: 89,
      benchmarkGap: Math.round(avgScore) - 72,
      recommendations: [
        'Add missing mandatory attributes',
        'Optimize SEO metadata',
        'Standardize attribute formatting'
      ]
    };
  };
  
  // 13. Searchability Impact Score
  const calculateSearchImpact = (product: Product) => {
    let impact = 100;
    const score = completenessScores.find(s => s.productId === product.id);
    
    if (!score) return 100;
    
    // Deduct for missing mandatory attributes
    impact -= score.missingAttributes.length * 10;
    
    // Deduct for poor SEO
    if (score.seoScore < 70) {
      impact -= 15;
    }
    
    // Deduct for insufficient tags
    if (product.tags.length < 5) {
      impact -= 10;
    }
    
    // Deduct for missing images
    if (product.images.length < 3) {
      impact -= 5;
    }
    
    return Math.max(0, Math.round(impact));
  };
  
  // 14. Conversion Impact Estimator
  const estimateConversionImpact = (product: Product) => {
    const baseConversion = 3.0; // 3% base conversion
    let impact = baseConversion;
    const score = completenessScores.find(s => s.productId === product.id);
    
    if (!score) return baseConversion;
    
    // Impact of completeness
    const completenessImpact = (score.completenessScore / 100) * 2.0; // Up to 2% impact
    
    // Impact of SEO
    const seoImpact = (score.seoScore / 100) * 1.5; // Up to 1.5% impact
    
    // Impact of images
    const imageImpact = (score.imageScore / 100) * 1.0; // Up to 1% impact
    
    impact = baseConversion + completenessImpact + seoImpact + imageImpact;
    
    return Math.min(10, Math.round(impact * 10) / 10); // Max 10%
  };
  
  // 15. Automated Tag Clustering
  const analyzeTagClusters = () => {
    return clusters;
  };
  
  // 16. Attribute Confidence Score
  const calculateAttributeConfidence = (product: Product, attribute: string) => {
    const confidenceFactors: Array<{ factor: string; score: number }> = [];
    let totalScore = 0;
    
    const value = product.attributes[attribute];
    
    // Source reliability
    if (product.aiMetadata && product.aiMetadata.confidence > 0.8) {
      confidenceFactors.push({ factor: 'AI Source', score: 90 });
    } else {
      confidenceFactors.push({ factor: 'Manual Entry', score: 70 });
    }
    
    // Semantic correctness
    const template = getCategoryTemplate(product.category);
    const attrConfig = template.attributeTypes[attribute];
    if (attrConfig) {
      if (attrConfig.options && attrConfig.options.includes(value)) {
        confidenceFactors.push({ factor: 'Valid Option', score: 95 });
      } else {
        confidenceFactors.push({ factor: 'Custom Value', score: 60 });
      }
    }
    
    // Format consistency
    if (typeof value === 'string' && value === value.trim()) {
      confidenceFactors.push({ factor: 'Clean Format', score: 85 });
    }
    
    // Calculate average
    if (confidenceFactors.length > 0) {
      totalScore = confidenceFactors.reduce((sum, factor) => sum + factor.score, 0) / confidenceFactors.length;
    }
    
    return {
      score: Math.round(totalScore),
      factors: confidenceFactors,
      recommendations: totalScore < 70 ? ['Verify attribute value', 'Check against category template'] : []
    };
  };
  
  // 17. Marketplace Compliance Checker
  const checkMarketplaceCompliance = (product: Product | null, marketplace: string) => {
    const rules: Record<string, MarketplaceRule> = {
      'amazon': {
        platform: 'amazon',
        requiredAttributes: ['title', 'brand', 'manufacturer', 'price', 'bullet_points'],
        formattingRules: {
          title: { maxLength: 200, case: 'Title Case' },
          bullet_points: { minCount: 3, maxLength: 500 }
        },
        prohibitedAttributes: ['phone_number', 'email', 'url'],
        validationRules: [
          { attribute: 'price', rule: '> 0', errorMessage: 'Price must be greater than 0' }
        ]
      },
      'shopify': {
        platform: 'shopify',
        requiredAttributes: ['title', 'description', 'price', 'images'],
        formattingRules: {
          title: { maxLength: 255 },
          description: { minLength: 100 }
        },
        prohibitedAttributes: [],
        validationRules: []
      }
    };
    
    const rule = rules[marketplace];
    if (!rule || !product) return { compliant: true, issues: [], score: 100 };
    
    const issues: Array<{ type: string; description: string }> = [];
    
    // Check required attributes
    rule.requiredAttributes.forEach(attr => {
      if (!hasAttribute(product, attr)) {
        issues.push({
          type: 'missing_required',
          description: `Missing required attribute for ${marketplace}: ${attr}`
        });
      }
    });
    
    // Check formatting
    if (rule.formattingRules.title && product.title.length > rule.formattingRules.title.maxLength) {
      issues.push({
        type: 'formatting',
        description: `Title too long for ${marketplace} (max ${rule.formattingRules.title.maxLength} chars)`
      });
    }
    
    // Check prohibited attributes
    rule.prohibitedAttributes.forEach(attr => {
      if (product.attributes[attr]) {
        issues.push({
          type: 'prohibited',
          description: `Prohibited attribute for ${marketplace}: ${attr}`
        });
      }
    });
    
    return {
      compliant: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : Math.max(0, 100 - (issues.length * 20))
    };
  };
  
  // 18. Bulk Product Tag Audit
  const runBulkAudit = () => {
    setIsAuditRunning(true);
    setBulkAuditProgress(0);
    
    const interval = setInterval(() => {
      setBulkAuditProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAuditRunning(false);
          
          // Generate results
          const result: BulkAuditResult = {
            totalProducts: products.length,
            analyzedProducts: products.length,
            avgCompletenessScore: Math.round(completenessScores.reduce((sum, s) => sum + s.completenessScore, 0) / completenessScores.length),
            criticalIssues: tagIssues.filter(i => i.severity === 'critical').length,
            autoFixableIssues: tagIssues.filter(i => i.autoFixable).length,
            estimatedTimeToFix: tagIssues.filter(i => i.severity === 'critical').length * 5, // 5 minutes per issue
            categoryBreakdown: {},
            topIssues: []
          };
          
          // Category breakdown
          const categories = [...new Set(completenessScores.map(s => s.category))];
          categories.forEach(category => {
            const categoryScores = completenessScores.filter(s => s.category === category);
            const categoryIssues = tagIssues.filter(i => {
              const product = products.find(p => p.id === i.productId);
              return product?.category === category;
            });
            
            result.categoryBreakdown[category] = {
              count: categoryScores.length,
              avgScore: Math.round(categoryScores.reduce((sum, s) => sum + s.completenessScore, 0) / categoryScores.length),
              issues: categoryIssues.length
            };
          });
          
          // Top issues
          const issueCounts: Record<string, number> = {};
          tagIssues.forEach(issue => {
            issueCounts[issue.type] = (issueCounts[issue.type] || 0) + 1;
          });
          
          result.topIssues = Object.entries(issueCounts)
            .map(([type, count]) => ({
              issue: type,
              count,
              impact: count * 10 // Simple impact calculation
            }))
            .sort((a, b) => b.impact - a.impact)
            .slice(0, 5);
          
          setBulkAuditResult(result);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    
    return () => clearInterval(interval);
  };
  
  // 19. Tag Health Trend Analysis
  const getHealthTrends = () => {
    return healthTrends;
  };
  
  // 20. AI-Based Attribute Generation
  const generateNewAttributes = (product: Product) => {
    const newAttributes: Array<{
      attribute: string;
      value: any;
      confidence: number;
      source: string;
      businessValue: 'high' | 'medium' | 'low';
    }> = [];
    
    // Based on category
    switch (product.category) {
      case 'Apparel':
        newAttributes.push(
          { attribute: 'sustainable_material', value: true, confidence: 0.8, source: 'Trend Analysis', businessValue: 'high' },
          { attribute: 'care_instructions', value: 'Machine wash cold', confidence: 0.9, source: 'Similar Products', businessValue: 'medium' },
          { attribute: 'fit_guide', value: 'True to size', confidence: 0.85, source: 'Customer Reviews', businessValue: 'high' }
        );
        break;
      case 'Electronics':
        newAttributes.push(
          { attribute: 'energy_efficiency', value: 'A++', confidence: 0.75, source: 'Regulatory', businessValue: 'high' },
          { attribute: 'connectivity', value: ['Bluetooth 5.0', 'Wi-Fi 6'], confidence: 0.9, source: 'Specifications', businessValue: 'medium' },
          { attribute: 'compatibility', value: 'iOS & Android', confidence: 0.95, source: 'Technical Specs', businessValue: 'high' }
        );
        break;
    }
    
    // Based on user behavior (simulated)
    if (product.salesData && product.salesData.unitsSold > 100) {
      newAttributes.push({
        attribute: 'bestseller',
        value: true,
        confidence: 0.95,
        source: 'Sales Data',
        businessValue: 'high'
      });
    }
    
    return newAttributes;
  };
  
  // ============ FILTERED DATA ============
  
  const filteredScores = useMemo(() => {
    if (!completenessScores.length) return [];
    
    let filtered = completenessScores;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(score => score.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(score => 
        score.sku.toLowerCase().includes(query) ||
        score.title.toLowerCase().includes(query) ||
        score.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [completenessScores, selectedCategory, searchQuery]);
  
  const categories = [...new Set(completenessScores.map(score => score.category))];
  
  
  // ============ UI COMPONENTS ============
  
  const ScoreCard: React.FC<{
    title: string;
    value: number;
    change?: number;
    icon: React.ReactNode;
    color: 'green' | 'blue' | 'yellow' | 'red' | 'purple';
    format?: 'percent' | 'number' | 'currency';
  }> = ({ title, value, change, icon, color, format = 'percent' }) => {
    const colorClasses = {
      green: 'bg-green-500 text-green-100',
      blue: 'bg-blue-500 text-blue-100',
      yellow: 'bg-yellow-500 text-yellow-100',
      red: 'bg-red-500 text-red-100',
      purple: 'bg-purple-500 text-purple-100'
    };
    
    const formatValue = (val: number) => {
      switch (format) {
        case 'percent': return `${val}%`;
        case 'currency': return `$${val.toLocaleString()}`;
        default: return val.toLocaleString();
      }
    };
    
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <h3 className="text-3xl font-bold mt-2">{formatValue(value)}</h3>
              {change !== undefined && (
                <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  <span className="text-sm font-medium">{Math.abs(change)}%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last month</span>
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
  
  const ProductCard: React.FC<{ 
    product: Product | undefined; 
    score: TagCompletenessScore;
    onClick: () => void;
  }> = ({ product, score, onClick }) => {
    if (!product) return null;
    
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-sm font-medium truncate">{product.sku}</CardTitle>
              <CardDescription className="truncate">{product.title}</CardDescription>
            </div>
            <Badge className={`${
              score.completenessScore > 90 ? 'bg-green-100 text-green-800' :
              score.completenessScore > 70 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {score.completenessScore}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{product.category}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium">{product.brand}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium">${product.price.toFixed(2)}</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Completeness</span>
                <span>{score.completenessScore}%</span>
              </div>
              <Progress value={score.completenessScore} className="h-2" />
            </div>
            {score.missingAttributes.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-red-600 font-medium">
                  Missing: {score.missingAttributes.length} attributes
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // ============ RENDER ============
  
   const overallStats = useMemo(() => {
    if (completenessScores.length === 0) {
      return {
        avgScore: 0,
        criticalIssues: 0,
        autoFixable: 0,
        searchImpact: 0,
        productsAnalyzed: 0
      };
    }
    
    const avgScore = completenessScores.reduce((sum, s) => sum + s.completenessScore, 0) / completenessScores.length;
    const criticalIssues = tagIssues.filter(i => i.severity === 'critical').length;
    const autoFixable = tagIssues.filter(i => i.autoFixable).length;
    const searchImpact = completenessScores.reduce((sum, s) => {
      const product = products.find(p => p.id === s.productId);
      return sum + (product ? calculateSearchImpact(product) : 0);
    }, 0) / completenessScores.length;
    
    return {
      avgScore: Math.round(avgScore),
      criticalIssues,
      autoFixable,
      searchImpact: Math.round(searchImpact),
      productsAnalyzed: completenessScores.length
    };
  }, [completenessScores, tagIssues, products]);
  
  const coverageData = useMemo(() => {
    return categories.map(category => {
      const coverage = calculateCategoryCoverage(category);
      if (!coverage) return null;
      
      return {
        category,
        coverage: coverage.average,
        excellent: coverage.distribution.excellent,
        good: coverage.distribution.good,
        fair: coverage.distribution.fair,
        poor: coverage.distribution.poor
      };
    }).filter(Boolean);
  }, [categories]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Tag className="h-8 w-8 text-blue-600" />
              Tag Completeness Checker
              <Badge className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                AI-Powered v3.0
              </Badge>
            </h1>
            <p className="text-gray-600 mt-2">
              Complete solution for e-commerce metadata quality management with 20+ advanced features
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={viewMode} onValueChange={(value: string) => {
              if (value === 'grid' || value === 'list' || value === '3d') {
                setViewMode(value);
              }
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid View</SelectItem>
                <SelectItem value="list">List View</SelectItem>
                <SelectItem value="3d">3D View</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={runBulkAudit} disabled={isAuditRunning}>
              {isAuditRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Auditing {bulkAuditProgress}%
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Run Bulk Audit
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products by SKU, title, or category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Key Metrics */}
        {overallStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <ScoreCard
              title="Avg Completeness Score"
              value={overallStats.avgScore}
              change={2.5}
              icon={<Percent className="h-6 w-6" />}
              color="blue"
            />
            
            <ScoreCard
              title="Critical Issues"
              value={overallStats.criticalIssues}
              change={-10.2}
              icon={<AlertTriangle className="h-6 w-6" />}
              color="red"
              format="number"
            />
            
            <ScoreCard
              title="Auto-Fixable Issues"
              value={overallStats.autoFixable}
              change={15.3}
              icon={<CheckCircle className="h-6 w-6" />}
              color="green"
              format="number"
            />
            
            <ScoreCard
              title="Search Impact Score"
              value={overallStats.searchImpact}
              change={3.8}
              icon={<Search className="h-6 w-6" />}
              color="purple"
            />
          </div>
        )}
      </div>
      
      {/* Main Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
            <BarChartIcon className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-white">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="3d" className="data-[state=active]:bg-white">
            <Globe className="h-4 w-4 mr-2" />
            3D View
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-white">
            <Brain className="h-4 w-4 mr-2" />
            AI Features
          </TabsTrigger>
          <TabsTrigger value="bulk" className="data-[state=active]:bg-white">
            <Database className="h-4 w-4 mr-2" />
            Bulk Audit
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Completeness Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tag Completeness Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={healthTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="completenessScore" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Completeness Score"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="criticalIssues" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Critical Issues"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categories.map(category => ({
                          name: category,
                          value: completenessScores.filter(s => s.category === category).length
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categories.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={(d3 as any).schemeCategory10[index % 10]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Top Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Top Tagging Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['missing', 'duplicate', 'format', 'incorrect'].map((type, index) => {
                  const issues = tagIssues.filter(i => i.type === type);
                  const count = issues.length;
                  const autoFixable = issues.filter(i => i.autoFixable).length;
                  
                  return (
                    <Card key={type} className="bg-gradient-to-br from-gray-50 to-white">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-2 rounded-lg ${
                            type === 'missing' ? 'bg-red-100' :
                            type === 'duplicate' ? 'bg-yellow-100' :
                            type === 'format' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            {type === 'missing' ? <AlertTriangle className="h-5 w-5 text-red-600" /> :
                             type === 'duplicate' ? <Copy className="h-5 w-5 text-yellow-600" /> :
                             type === 'format' ? <Type className="h-5 w-5 text-blue-600" /> :
                             <Filter className="h-5 w-5 text-purple-600" />}
                          </div>
                          <Badge className={
                            count > 20 ? 'bg-red-100 text-red-800' :
                            count > 10 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {count} issues
                          </Badge>
                        </div>
                        <h4 className="font-bold capitalize">{type} Attributes</h4>
                        <p className="text-sm text-gray-600 mt-2">
                          {type === 'missing' ? 'Mandatory attributes not filled' :
                           type === 'duplicate' ? 'Repeated tags or values' :
                           type === 'format' ? 'Inconsistent formatting' :
                           'Attributes in wrong fields'}
                        </p>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Auto-fixable:</span>
                            <span className="font-semibold">{autoFixable}</span>
                          </div>
                          <Progress value={(autoFixable / Math.max(1, count)) * 100} className="h-2 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Product Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Tagging Health
                <Badge variant="outline" className="ml-2">
                  {filteredScores.length} products
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredScores.slice(0, 12).map(score => {
                    const product = products.find(p => p.id === score.productId);
                    if (!product) return null;
                    
                    return (
                      <ProductCard
                        key={score.productId}
                        product={product}
                        score={score}
                        onClick={() => {
                          setSelectedProduct(product);
                          setSelectedScore(score);
                        }}
                      />
                    );
                  })}
                </div>
              ) : viewMode === 'list' ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Completeness</TableHead>
                      <TableHead>Missing Attributes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredScores.slice(0, 10).map(score => {
                      const product = products.find(p => p.id === score.productId);
                      if (!product) return null;
                      
                      return (
                        <TableRow key={score.productId}>
                          <TableCell className="font-medium">{score.sku}</TableCell>
                          <TableCell>{score.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{score.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Progress value={score.completenessScore} className="h-2 w-24 mr-2" />
                              <span className="font-semibold">{score.completenessScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {score.missingAttributes.length > 0 ? (
                              <Badge variant="outline" className="bg-red-50 text-red-700">
                                {score.missingAttributes.length} missing
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Complete
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => {
                              setSelectedProduct(product);
                              setSelectedScore(score);
                            }}>
                              Analyze
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="h-[600px] rounded-lg border border-gray-200">
                  {filteredScores.length > 0 ? (
                    <Canvas camera={{ position: [0, 15, 30], fov: 50 }}>
                      <color attach="background" args={['#f8fafc']} />
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} intensity={1} />
                      <TagCompleteness3D 
                        data={filteredScores.slice(0, 30)} 
                        onProductSelect={(productId) => {
                          const product = products.find(p => p.id === productId);
                          const score = filteredScores.find(s => s.productId === productId);
                          if (product && score) {
                            setSelectedProduct(product);
                            setSelectedScore(score);
                          }
                        }}
                      />
                      <OrbitControls 
                        enableZoom={true}
                        enablePan={true}
                        enableRotate={true}
                      />
                    </Canvas>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-600">No data available for 3D visualization</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Coverage Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartLucide className="h-5 w-5" />
                  Category Coverage Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={coverageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="excellent" stackId="a" fill="#10b981" name="Excellent (90-100%)" />
                    <Bar dataKey="good" stackId="a" fill="#fbbf24" name="Good (70-89%)" />
                    <Bar dataKey="fair" stackId="a" fill="#f97316" name="Fair (50-69%)" />
                    <Bar dataKey="poor" stackId="a" fill="#ef4444" name="Poor (<50%)" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Missing Attributes Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Missing Mandatory Attributes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(detectMissingMandatoryAttributes()).map(([category, attributes]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{category}</h4>
                      <div className="space-y-2">
                        {attributes.slice(0, 3).map(attr => (
                          <div key={attr.attribute} className="flex justify-between items-center">
                            <span className="text-sm">{attr.attribute}</span>
                            <Badge variant="outline" className="bg-red-50 text-red-700">
                              {attr.count} products
                            </Badge>
                          </div>
                        ))}
                        {attributes.length > 3 && (
                          <p className="text-xs text-gray-500">+{attributes.length - 3} more attributes...</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Advanced Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Tag Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="seo">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="seo">SEO Validation</TabsTrigger>
                  <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
                  <TabsTrigger value="formatting">Formatting</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="seo" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SEO Score</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Suggestions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.slice(0, 5).map(product => {
                        const seoValidation = validateSeoMetadata(product);
                        return (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.sku}</TableCell>
                            <TableCell>
                              <Badge className={
                                seoValidation.score > 80 ? 'bg-green-100 text-green-800' :
                                seoValidation.score > 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {seoValidation.score}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {seoValidation.issues.slice(0, 2).map((issue, idx) => (
                                  <Badge key={idx} variant="outline" className={
                                    issue.severity === 'high' ? 'bg-red-50 text-red-700' :
                                    issue.severity === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                                    'bg-blue-50 text-blue-700'
                                  }>
                                    {issue.type}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {seoValidation.suggestions.slice(0, 2).join(', ')}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="duplicates">
                  <div className="space-y-4">
                    {findDuplicateTags().slice(0, 5).map((dup, idx) => (
                      <Card key={idx}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">"{dup.tag}"</h4>
                              <p className="text-sm text-gray-600">Used in {dup.count} products</p>
                            </div>
                            <Button size="sm" variant="outline">Merge Tags</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="formatting">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Attribute</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Suggestion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {checkFormattingConsistency().slice(0, 5).map((issue, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{issue.sku}</TableCell>
                          <TableCell>{issue.attribute}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                              {issue.issue}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{issue.suggestion}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="compliance">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['amazon', 'shopify', 'flipkart', 'myntra'].map(marketplace => {
                      const product = products.length > 0 ? products[0] : null;
                      if (!product) return null;
                      
                      const compliance = checkMarketplaceCompliance(product, marketplace);
                      
                      return (
                        <Card key={marketplace}>
                          <CardHeader>
                            <CardTitle className="capitalize">{marketplace}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Compliance Score:</span>
                                <Badge className={
                                  compliance.score > 80 ? 'bg-green-100 text-green-800' :
                                  compliance.score > 60 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }>
                                  {compliance.score}%
                                </Badge>
                              </div>
                              {compliance.issues.length > 0 && (
                                <div className="mt-3">
                                  <h4 className="font-medium text-sm mb-2">Issues:</h4>
                                  <ul className="space-y-1 text-sm text-gray-600">
                                    {compliance.issues.slice(0, 2).map((issue, idx) => (
                                      <li key={idx}>• {issue.description}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* AI Features Tab */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Tagging Assistant
              </CardTitle>
              <CardDescription>
                Intelligent attribute prediction and generation using multimodal AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="font-semibold mb-4">AI Predictions for Selected Product</h4>
                  
                  {selectedProduct && aiSuggestions.length > 0 ? (
                    <div className="space-y-4">
                      {aiSuggestions.map((prediction, idx) => (
                        <Card key={idx} className="border-l-4 border-l-blue-500">
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-bold">{prediction.attribute}</h5>
                                <p className="text-sm text-gray-600 capitalize">Source: {prediction.source.replace('_', ' ')}</p>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800">
                                Confidence: {(prediction.confidence * 100).toFixed(1)}%
                              </Badge>
                            </div>
                            
                            <div className="mt-3">
                              <p className="text-sm font-medium">Predicted Value:</p>
                              <p className="text-lg font-semibold mt-1">
                                {typeof prediction.predictedValue === 'string' 
                                  ? prediction.predictedValue
                                  : JSON.stringify(prediction.predictedValue)}
                              </p>
                            </div>
                            
                            {prediction.alternatives.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-medium">Alternatives:</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {prediction.alternatives.map((alt, altIdx) => (
                                    <Badge key={altIdx} variant="outline" className="bg-gray-100">
                                      {alt.value} ({(alt.confidence * 100).toFixed(0)}%)
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex gap-2 mt-4">
                              <Button size="sm">Apply</Button>
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="ghost">Ignore</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Select a product to see AI predictions</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">AI Model Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Attribute Prediction</span>
                            <span>94.2%</span>
                          </div>
                          <Progress value={94.2} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Image Recognition</span>
                            <span>89.7%</span>
                          </div>
                          <Progress value={89.7} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>SEO Optimization</span>
                            <span>91.5%</span>
                          </div>
                          <Progress value={91.5} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Auto-Generated Attributes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedProduct ? (
                        <div className="space-y-2">
                          {generateNewAttributes(selectedProduct).slice(0, 3).map((attr, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <p className="text-sm font-medium">{attr.attribute}</p>
                                <p className="text-xs text-gray-600">{attr.source}</p>
                              </div>
                              <Badge className={
                                attr.businessValue === 'high' ? 'bg-green-100 text-green-800' :
                                attr.businessValue === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }>
                                {attr.businessValue}
                              </Badge>
                            </div>
                          ))}
                          <Button size="sm" className="w-full mt-2" variant="outline">
                            Generate More
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 text-center py-4">
                          Select a product first
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Bulk Audit Tab */}
        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Bulk Product Tag Audit
              </CardTitle>
              <CardDescription>
                Scan and analyze thousands of products for tagging issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAuditRunning ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Running Bulk Audit</h3>
                    <p className="text-gray-600">Analyzing {products.length} products for tagging issues...</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{bulkAuditProgress}%</span>
                    </div>
                    <Progress value={bulkAuditProgress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">
                        {Math.round((bulkAuditProgress / 100) * products.length)}
                      </div>
                      <div className="text-sm text-blue-600">Products Analyzed</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">
                        {Math.round((bulkAuditProgress / 100) * tagIssues.filter(i => i.autoFixable).length)}
                      </div>
                      <div className="text-sm text-green-600">Auto-Fixable Issues Found</div>
                    </div>
                  </div>
                </div>
              ) : bulkAuditResult ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">{bulkAuditResult.avgCompletenessScore}%</div>
                      <div className="text-sm text-blue-600">Avg Completeness</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-700">{bulkAuditResult.criticalIssues}</div>
                      <div className="text-sm text-red-600">Critical Issues</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">{bulkAuditResult.autoFixableIssues}</div>
                      <div className="text-sm text-green-600">Auto-Fixable</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-700">{bulkAuditResult.estimatedTimeToFix}m</div>
                      <div className="text-sm text-yellow-600">Est. Fix Time</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Category Breakdown</h4>
                    <div className="space-y-2">
                      {Object.entries(bulkAuditResult.categoryBreakdown).map(([category, data]) => (
                        <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{category}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{data.count} products</span>
                            <Badge className={
                              data.avgScore > 80 ? 'bg-green-100 text-green-800' :
                              data.avgScore > 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {data.avgScore}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Top Issues Found</h4>
                    <div className="space-y-2">
                      {bulkAuditResult.topIssues.map((issue, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="capitalize">
                              {issue.issue}
                            </Badge>
                            <span className="text-sm text-gray-600">{issue.count} occurrences</span>
                          </div>
                          <span className="font-medium">Impact: {issue.impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Full Report
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Run Again
                    </Button>
                    <Button variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Apply Auto-Fixes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Database className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Audit Your Products</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Run a comprehensive audit on all your products to identify tagging issues, SEO problems, and compliance violations.
                  </p>
                  <Button size="lg" onClick={runBulkAudit}>
                    <Database className="h-5 w-5 mr-2" />
                    Start Bulk Audit
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    Estimated time: {Math.round(products.length * 0.5)} seconds for {products.length} products
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Tagging Health Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BarChartIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Completeness Report</h4>
                        <p className="text-sm text-gray-600">Detailed completeness analysis</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-4" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Issues Report</h4>
                        <p className="text-sm text-gray-600">All identified issues</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-4" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download CSV
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Trend Analysis</h4>
                        <p className="text-sm text-gray-600">Monthly health trends</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-4" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Complete Product Data</h4>
                          <p className="text-sm text-gray-600">All products with full metadata</p>
                        </div>
                        <Button size="sm">Export JSON</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Issues Summary</h4>
                          <p className="text-sm text-gray-600">Concise issues report</p>
                        </div>
                        <Button size="sm">Export CSV</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">SEO Audit Report</h4>
                          <p className="text-sm text-gray-600">SEO metrics and suggestions</p>
                        </div>
                        <Button size="sm">Export PDF</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Weekly Health Report</h4>
                          <p className="text-sm text-gray-600">Every Monday at 9:00 AM</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Monthly Benchmark</h4>
                          <p className="text-sm text-gray-600">1st of every month</p>
                        </div>
                        <Switch checked={false} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Critical Issues Alert</h4>
                          <p className="text-sm text-gray-600">Real-time notifications</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <Button className="w-full mt-4" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure Report Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => {
        setSelectedProduct(null);
        setSelectedScore(null);
      }}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {selectedProduct?.title}
              <Badge variant="outline">{selectedProduct?.sku}</Badge>
            </DialogTitle>
            <DialogDescription>
              Complete tag analysis and suggestions for improvement
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && selectedScore && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{selectedScore.completenessScore}%</div>
                  <div className="text-sm text-blue-600">Completeness</div>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">{selectedScore.missingAttributes.length}</div>
                  <div className="text-sm text-red-600">Missing Attributes</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-700">{selectedScore.warnings.length}</div>
                  <div className="text-sm text-yellow-600">Warnings</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{selectedScore.suggestions.length}</div>
                  <div className="text-sm text-green-600">Suggestions</div>
                </div>
              </div>
              
              {/* Category Template */}
              <div>
                <h4 className="font-semibold mb-3">Category Template</h4>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-sm text-gray-600 mb-2">Mandatory Attributes</h5>
                        <div className="space-y-1">
                          {getMandatoryAttributes(selectedProduct.category).map(attr => (
                            <div key={attr} className="flex items-center gap-2">
                              {selectedScore.missingAttributes.includes(attr) ? (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              <span className={`text-sm ${
                                selectedScore.missingAttributes.includes(attr) ? 'text-red-600' : 'text-gray-700'
                              }`}>
                                {attr}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm text-gray-600 mb-2">Current Attributes</h5>
                        <div className="space-y-1">
                          {Object.entries(selectedProduct.attributes).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="font-medium">{key}:</span>{' '}
                              <span className="text-gray-600">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm text-gray-600 mb-2">Impact Analysis</h5>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Search Visibility</span>
                              <span>{calculateSearchImpact(selectedProduct)}%</span>
                            </div>
                            <Progress value={calculateSearchImpact(selectedProduct)} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Conversion Impact</span>
                              <span>{estimateConversionImpact(selectedProduct)}%</span>
                            </div>
                            <Progress value={estimateConversionImpact(selectedProduct) * 10} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Suggestions */}
              {selectedScore.suggestions.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">AI Suggestions</h4>
                  <div className="space-y-3">
                    {selectedScore.suggestions.map((suggestion, idx) => (
                      <Card key={idx} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge className="capitalize">{suggestion.type}</Badge>
                                <Badge className={
                                  suggestion.impact === 'high' ? 'bg-red-100 text-red-800' :
                                  suggestion.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }>
                                  {suggestion.impact} impact
                                </Badge>
                              </div>
                              <p className="mt-2 font-medium">{suggestion.attribute}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              {(suggestion.confidence * 100).toFixed(0)}% confidence
                            </Badge>
                          </div>
                          <p className="text-gray-600">{suggestion.suggestion}</p>
                          <Button size="sm" className="mt-3">Apply Suggestion</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Benchmark Comparison */}
              <div>
                <h4 className="font-semibold mb-3">Benchmark Comparison</h4>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-700">{selectedScore.benchmarkComparison.yourScore || selectedScore.completenessScore}%</div>
                          <div className="text-sm text-blue-600">Your Score</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-700">{Math.round(selectedScore.benchmarkComparison.industryAvg)}%</div>
                          <div className="text-sm text-gray-600">Industry Avg</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-700">{Math.round(selectedScore.benchmarkComparison.top10Percentile || 85)}%</div>
                          <div className="text-sm text-green-600">Top 10%</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-700">{Math.round(selectedScore.benchmarkComparison.bottom10Percentile || 40)}%</div>
                          <div className="text-sm text-red-600">Bottom 10%</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="font-medium mb-2">Missing vs Industry Standard:</h5>
                        <div className="space-y-2">
                          {(selectedScore.benchmarkComparison.missingAttributes || []).map(attr => (
                            <div key={attr} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span className="text-sm text-red-600">{attr}</span>
                              <span className="text-xs text-gray-500">(Commonly provided by competitors)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setSelectedProduct(null);
                  setSelectedScore(null);
                }}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="secondary">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Apply All Fixes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagCompletenessChecker;