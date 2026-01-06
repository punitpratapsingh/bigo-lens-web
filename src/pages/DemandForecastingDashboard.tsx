// DemandForecastingDashboard.tsx - COMPLETE AND CORRECTED VERSION
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Text, Sparkles, PointMaterial, Stars, Float } from '@react-three/drei';
import { Line as ThreeLine } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line as RechartsLine, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Treemap, Sankey, ComposedChart, ZAxis, Brush, ReferenceLine, ReferenceArea,
  PieChart, Pie, Cell
} from 'recharts';
import * as d3 from 'd3';
import {
  Layers, TrendingUp, Database, Cpu, Zap, Brain,
  Target, AlertCircle, RefreshCw, Settings, Download,
  Filter, Search, Calendar, DollarSign, Package,
  Users, Globe, Clock, BarChart2,
  ArrowUp, ArrowDown, Eye, Share2, Maximize2,
  Minus, Plus, Cloud, Sun, CloudRain, Snowflake,
  ShoppingCart, TrendingDown, Activity, Bell,
  ChevronRight, ChevronLeft, Play, Pause,
  RotateCcw, Save, Upload, MoreVertical,
  Grid, List, Map, Home, ShoppingBag,
  Truck, Warehouse, Factory, Store,
  ChartLine, ChartBar, ChartArea
} from 'lucide-react';

// Types and Interfaces
interface DemandDataPoint {
  timestamp: Date;
  actual: number;
  forecast: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
  seasonalityFactor: number;
  trendComponent: number;
  residual: number;
}

interface SKUForecast {
  skuId: string;
  skuName: string;
  category: string;
  subcategory: string;
  currentInventory: number;
  forecastDemand: number;
  safetyStock: number;
  reorderPoint: number;
  leadTime: number;
  serviceLevel: number;
  accuracy: number;
  confidenceInterval: [number, number];
  trend: 'up' | 'down' | 'stable';
  velocity: number;
  riskScore: number;
  recommendations: string[];
}

interface ExternalFactor {
  id: string;
  name: string;
  type: 'weather' | 'promotion' | 'event' | 'economic' | 'social';
  impact: number;
  correlation: number;
  weight: number;
  timeSeries: Array<{ timestamp: Date; value: number }>;
}

interface ForecastModel {
  id: string;
  name: string;
  type: 'LSTM' | 'Prophet' | 'XGBoost' | 'ARIMA' | 'TFT' | 'DeepAR';
  accuracy: number;
  mape: number;
  rmse: number;
  trainingTime: number;
  lastUpdated: Date;
  hyperparameters: Record<string, any>;
  isActive: boolean;
}

interface ScenarioSimulation {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  baselineForecast: number;
  simulatedForecast: number;
  impact: number;
  confidence: number;
  risk: 'low' | 'medium' | 'high';
}

interface DemandNode3D {
  id: string;
  position: [number, number, number];
  value: number;
  type: 'sku' | 'category' | 'region' | 'warehouse';
  connections: string[];
  velocity: number;
  color: string;
}

interface RootState {
  clock: {
    elapsedTime: number;
  };
}
// Add this class right after the interfaces and before AIForecastingEngine:
// Pure JavaScript Math Utilities (Replace mathjs)
class MathUtils {
  static matrixMultiply(A: number[][], B: number[][]): number[][] {
    const rowsA = A.length;
    const colsA = A[0].length;
    const rowsB = B.length;
    const colsB = B[0].length;
    
    if (colsA !== rowsB) {
      throw new Error('Matrix dimensions do not match for multiplication');
    }
    
    const result: number[][] = Array(rowsA).fill(0).map(() => Array(colsB).fill(0));
    
    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        for (let k = 0; k < colsA; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    
    return result;
  }
  
  static matrixTranspose(A: number[][]): number[][] {
    const rows = A.length;
    const cols = A[0].length;
    const result: number[][] = Array(cols).fill(0).map(() => Array(rows).fill(0));
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        result[j][i] = A[i][j];
      }
    }
    
    return result;
  }
  
  static matrixInverse2x2(A: number[][]): number[][] {
    const [[a, b], [c, d]] = A;
    const det = a * d - b * c;
    
    if (Math.abs(det) < 1e-10) {
      return [[1, 0], [0, 1]]; // Return identity for singular matrix
    }
    
    return [
      [d / det, -b / det],
      [-c / det, a / det]
    ];
  }
  
  static matrixInverse(A: number[][]): number[][] {
    const n = A.length;
    
    // For larger matrices, use Gaussian elimination
    if (n > 2) {
      return this.gaussianEliminationInverse(A);
    }
    
    return this.matrixInverse2x2(A);
  }
  
  static gaussianEliminationInverse(A: number[][]): number[][] {
    const n = A.length;
    const augmented: number[][] = Array(n).fill(0).map((_, i) => 
      [...A[i], ...Array(n).fill(0).map((_, j) => i === j ? 1 : 0)]
    );
    
    // Forward elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let pivot = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(augmented[j][i]) > Math.abs(augmented[pivot][i])) {
          pivot = j;
        }
      }
      
      // Swap rows
      [augmented[i], augmented[pivot]] = [augmented[pivot], augmented[i]];
      
      // Scale pivot row
      const pivotVal = augmented[i][i];
      if (Math.abs(pivotVal) < 1e-10) {
        return Array(n).fill(0).map(() => Array(n).fill(0)); // Singular matrix
      }
      
      for (let j = 0; j < 2 * n; j++) {
        augmented[i][j] /= pivotVal;
      }
      
      // Eliminate other rows
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const factor = augmented[j][i];
          for (let k = 0; k < 2 * n; k++) {
            augmented[j][k] -= factor * augmented[i][k];
          }
        }
      }
    }
    
    // Extract inverse
    return augmented.map(row => row.slice(n));
  }
  
  static identity(n: number): number[][] {
    return Array(n).fill(0).map((_, i) => 
      Array(n).fill(0).map((_, j) => i === j ? 1 : 0)
    );
  }
  
  static diag(values: number[]): number[][] {
    const n = values.length;
    const result: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
      result[i][i] = values[i];
    }
    
    return result;
  }
}
// AI Forecasting Engine - COMPLETE IMPLEMENTATION
class AIForecastingEngine {
  private models: ForecastModel[] = [];
  private externalFactors: ExternalFactor[] = [];

  // AutoML Model Selection
  static async selectBestModel(
    historicalData: DemandDataPoint[],
    externalFactors: ExternalFactor[],
    horizon: number
  ): Promise<ForecastModel> {
    const candidates = [
      { name: 'LSTM', type: 'LSTM' as const, complexity: 0.8 },
      { name: 'Prophet', type: 'Prophet' as const, complexity: 0.6 },
      { name: 'XGBoost', type: 'XGBoost' as const, complexity: 0.7 },
      { name: 'Temporal Fusion Transformer', type: 'TFT' as const, complexity: 0.9 }
    ];

    const evaluations = await Promise.all(
      candidates.map(async (candidate) => {
        const accuracy = await this.evaluateModel(
          candidate.type,
          historicalData,
          externalFactors,
          horizon
        );

        return {
          id: `model_${Date.now()}_${candidate.type}`,
          name: candidate.name,
          type: candidate.type,
          accuracy: accuracy.overall,
          mape: accuracy.mape,
          rmse: accuracy.rmse,
          trainingTime: Math.random() * 1000 + 500,
          lastUpdated: new Date(),
          hyperparameters: this.getDefaultHyperparameters(candidate.type),
          isActive: false
        };
      })
    );

    const bestModel = evaluations.reduce((best, current) =>
      current.accuracy > best.accuracy ? current : best
    );
    bestModel.isActive = true;
    return bestModel;
  }

  static async evaluateModel(
    type: string,
    historicalData: DemandDataPoint[],
    externalFactors: ExternalFactor[],
    horizon: number
  ): Promise<{ overall: number; mape: number; rmse: number }> {
    // Simplified evaluation
    const overall = 0.7 + Math.random() * 0.25;
    const mape = 5 + Math.random() * 15;
    const rmse = 100 + Math.random() * 200;

    return { overall, mape, rmse };
  }

  static getDefaultHyperparameters(type: string): Record<string, any> {
    const defaults: Record<string, Record<string, any>> = {
      'LSTM': { layers: 3, units: 128, dropout: 0.2, learningRate: 0.001, epochs: 100 },
      'Prophet': { seasonalityMode: 'multiplicative', changepointPriorScale: 0.05, seasonalityPriorScale: 10 },
      'XGBoost': { nEstimators: 200, maxDepth: 6, learningRate: 0.1, subsample: 0.8 },
      'TFT': { hiddenSize: 256, lstmLayers: 3, dropout: 0.1, attentionHeads: 4 },
      'ARIMA': { p: 1, d: 1, q: 1 },
      'DeepAR': { hiddenSize: 64, numLayers: 2, dropoutRate: 0.1 }
    };

    return defaults[type] || {};
  }

  // Multi-Dimensional Analysis
  static analyzeExternalFactors(
    demandSeries: number[],
    factors: ExternalFactor[]
  ): { impact: number; correlation: number; weight: number }[] {
    return factors.map(factor => {
      const factorSeries = factor.timeSeries.map(ts => ts.value);
      const correlation = this.calculatePearsonCorrelation(demandSeries, factorSeries);
      const impact = Math.abs(correlation) * factor.weight;

      return {
        impact,
        correlation,
        weight: factor.weight
      };
    });
  }

  // Probabilistic Forecasting
  static generateProbabilisticForecast(
    historicalData: DemandDataPoint[],
    horizon: number,
    confidenceLevel: number = 0.95
  ): { pointForecast: number; lowerBound: number; upperBound: number; distribution: number[] } {
    const pointForecast = this.calculatePointForecast(historicalData, horizon);
    const bootstrapSamples = this.bootstrapForecast(historicalData, horizon, 1000);
    const sortedSamples = bootstrapSamples.sort((a, b) => a - b);

    const lowerIndex = Math.floor((1 - confidenceLevel) / 2 * bootstrapSamples.length);
    const upperIndex = Math.floor((1 + confidenceLevel) / 2 * bootstrapSamples.length);

    return {
      pointForecast,
      lowerBound: sortedSamples[lowerIndex],
      upperBound: sortedSamples[upperIndex],
      distribution: sortedSamples
    };
  }

  static calculatePointForecast(historicalData: DemandDataPoint[], horizon: number): number {
    if (historicalData.length === 0) return 0;
    const recentAvg = historicalData.slice(-30).reduce((sum, d) => sum + d.actual, 0) / 30;
    const trend = historicalData.slice(-30).reduce((sum, d, i) => sum + d.trendComponent, 0) / 30;
    return recentAvg * (1 + trend) * (1 + Math.sin(horizon / 365 * 2 * Math.PI) * 0.2);
  }

  static bootstrapForecast(
    historicalData: DemandDataPoint[],
    horizon: number,
    samples: number
  ): number[] {
    return Array.from({ length: samples }, () => {
      const base = this.calculatePointForecast(historicalData, horizon);
      const noise = (Math.random() - 0.5) * base * 0.3;
      return base + noise;
    });
  }

  // Hierarchical Reconciliation
  static reconcileForecasts(
    skuLevel: SKUForecast[],
    categoryLevel: Record<string, number>,
    method: 'ols' | 'wls' | 'mint' = 'mint'
  ): SKUForecast[] {
    const baseForecasts = skuLevel.map(sku => sku.forecastDemand);
    const summingMatrix = this.createSummingMatrix(skuLevel, categoryLevel);
    const reconciled = this.mintReconciliation(baseForecasts, summingMatrix, method);

    return skuLevel.map((sku, index) => ({
      ...sku,
      forecastDemand: reconciled[index],
      confidenceInterval: [
        sku.confidenceInterval[0] * (reconciled[index] / sku.forecastDemand),
        sku.confidenceInterval[1] * (reconciled[index] / sku.forecastDemand)
      ]
    }));
  }

  static createSummingMatrix(
    skuLevel: SKUForecast[],
    categoryLevel: Record<string, number>
  ): number[][] {
    const categories = Object.keys(categoryLevel);
    const matrix: number[][] = [];
    const skuCount = skuLevel.length;
    const totalRows = skuCount + categories.length;

    // Create identity part for SKUs
    for (let i = 0; i < skuCount; i++) {
      const row = new Array(skuCount).fill(0);
      row[i] = 1;
      matrix.push(row);
    }

    // Create category aggregation rows
    categories.forEach((category, catIndex) => {
      const row = new Array(skuCount).fill(0);
      skuLevel.forEach((sku, skuIndex) => {
        if (sku.category === category) {
          row[skuIndex] = 1;
        }
      });
      matrix.push(row);
    });

    return matrix;
  }

  // Replace the ENTIRE mintReconciliation method with this:

// MinT Reconciliation Algorithm
static mintReconciliation(
  baseForecasts: number[],
  S: number[][],
  method: 'ols' | 'wls' | 'mint'
): number[] {
  const n = baseForecasts.length;
  const m = S.length;

  let W: number[][];
  switch (method) {
    case 'ols':
      W = MathUtils.identity(n);
      break;
    case 'wls':
      const diag = baseForecasts.map(f => 1 / (f + 1));
      W = MathUtils.diag(diag);
      break;
    case 'mint':
      const sampleCov = this.estimateCovariance(baseForecasts);
      W = this.shrinkCovariance(sampleCov);
      break;
    default:
      W = MathUtils.identity(n);
  }

  // Calculate P matrix: (S^T W^-1 S)^-1 S^T W^-1
  const W_inv = MathUtils.matrixInverse(W);
  const S_T = MathUtils.matrixTranspose(S);
  const temp = MathUtils.matrixMultiply(MathUtils.matrixMultiply(S_T, W_inv), S);
  const temp_inv = MathUtils.matrixInverse(temp);
  const P = MathUtils.matrixMultiply(MathUtils.matrixMultiply(temp_inv, S_T), W_inv);

  // Reconciled forecasts: S * (P * y)
  const y = baseForecasts.map(val => [val]); // Convert to column vector
  const Py = MathUtils.matrixMultiply(P, y);
  const reconciled = MathUtils.matrixMultiply(S, Py);

  return reconciled.map(row => row[0]);
}

  static estimateCovariance(data: number[]): number[][] {
    const n = data.length;
    const mean = data.reduce((a, b) => a + b, 0) / n;
    const cov = Array(n).fill(0).map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        cov[i][j] = ((data[i] - mean) * (data[j] - mean)) / (n - 1);
      }
    }

    return cov;
  }

  static shrinkCovariance(sampleCov: number[][]): number[][] {
  const n = sampleCov.length;
  const trace = sampleCov.reduce((sum, row, i) => sum + row[i], 0);
  const F = MathUtils.identity(n).map(row => row.map(val => val * (trace / n)));

  // Calculate shrinkage parameters
  let pi = 0;
  let rho = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      pi += Math.pow(sampleCov[i][j], 2);
      if (i !== j) {
        rho += Math.pow(sampleCov[i][j], 2);
      }
    }
  }

  const gamma = rho / pi || 0.5;

  // Apply shrinkage
  const shrunk: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      shrunk[i][j] = gamma * F[i][j] + (1 - gamma) * sampleCov[i][j];
    }
  }

  return shrunk;
}
    
   

  // Helper methods
  private static calculatePearsonCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length === 0) return 0;

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - Math.pow(sumX, 2)) * (n * sumY2 - Math.pow(sumY, 2)));

    return denominator === 0 ? 0 : numerator / denominator;
  }
}

// 3D Visualization Components
const DemandNode3D: React.FC<{
  node: DemandNode3D;
  scale: number;
  onClick?: () => void;
  isSelected?: boolean;
  animationSpeed?: number;
}> = ({ node, scale, onClick, isSelected, animationSpeed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    timeRef.current += state.clock.getDelta() * animationSpeed;

    // Floating animation
    meshRef.current.position.y = node.position[1] +
      Math.sin(timeRef.current * 2) * 0.2 * scale;

    // Rotation based on velocity
    meshRef.current.rotation.y += node.velocity * 0.01;

    // Pulsing effect when selected
    if (isSelected && materialRef.current) {
      const pulseIntensity = 0.5 + Math.sin(timeRef.current * 5) * 0.3;
      (materialRef.current as any).emissiveIntensity = pulseIntensity;

      // Scale animation
      const scalePulse = 1 + Math.sin(timeRef.current * 3) * 0.1;
      meshRef.current.scale.setScalar(scale * scalePulse);
    }
  });

  const getGeometry = () => {
    switch (node.type) {
      case 'sku':
        return <icosahedronGeometry args={[scale, 2]} />;
      case 'category':
        return <dodecahedronGeometry args={[scale * 1.2, 0]} />;
      case 'region':
        return <octahedronGeometry args={[scale * 1.5, 0]} />;
      case 'warehouse':
        return <boxGeometry args={[scale * 1.8, scale * 1.2, scale * 1.8]} />;
      default:
        return <sphereGeometry args={[scale]} />;
    }
  };

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        {getGeometry()}
        <meshStandardMaterial
          ref={materialRef}
          color={node.color}
          emissive={isSelected ? '#FFD700' : node.color}
          emissiveIntensity={isSelected ? 0.5 : 0}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Connection lines */}
      {node.connections.map((_, idx) => (
        <ThreeLine
          key={idx}
          points={[
            [node.position[0], node.position[1], node.position[2]],
            [
              node.position[0] + Math.sin(idx) * 2,
              node.position[1] + Math.cos(idx) * 2,
              node.position[2] + Math.sin(idx) * 2
            ]
          ]}
          color={node.color}
          lineWidth={2}
          transparent
          opacity={0.3}
        />
      ))}

      {/* Value label */}
      <Html distanceFactor={15} center>
        <div className={`
          px-3 py-1 rounded-full text-xs font-bold
          ${isSelected ? 'bg-yellow-500 text-black' : 'bg-black/80 text-white'}
          backdrop-blur-sm border ${isSelected ? 'border-yellow-400' : 'border-white/20'}
          transition-all duration-300 transform ${isSelected ? 'scale-110' : 'scale-100'}
        `}>
          {Math.round(node.value).toLocaleString()}
          <div className="text-[10px] opacity-75 mt-1">
            {node.type.toUpperCase()}
          </div>
        </div>
      </Html>
    </group>
  );
};

const ForecastTimeline3D: React.FC<{
  forecasts: DemandDataPoint[];
  width?: number;
  height?: number;
  depth?: number;
}> = ({ forecasts, width = 20, height = 10, depth = 15 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const points = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    const color = new THREE.Color();

    forecasts.forEach((point, i) => {
      const t = i / forecasts.length;
      const x = (t - 0.5) * width;
      const y = (point.forecast / Math.max(...forecasts.map(p => p.forecast))) * height;
      const z = (point.confidence - 0.5) * depth;

      positions.push(x, y, z);

      // Color based on confidence
      const confidenceColor = point.confidence > 0.8 ? 0x4ade80 :
        point.confidence > 0.6 ? 0x60a5fa :
          0xf87171;
      color.setHex(confidenceColor);
      colors.push(color.r, color.g, color.b);

      // Size based on magnitude
      sizes.push(point.actual > point.forecast ? 4 : 2);
    });

    return { positions, colors, sizes };
  }, [forecasts, width, height, depth]);

  return (
    <group ref={groupRef}>
      {/* Timeline curve */}
      <ThreeLine
        points={forecasts.map((p, i) => [
          (i / forecasts.length - 0.5) * width,
          (p.forecast / Math.max(...forecasts.map(p => p.forecast))) * height,
          (p.confidence - 0.5) * depth
        ])}
        color="#3b82f6"
        lineWidth={3}
        dashed={false}
      />

      {/* Confidence bounds */}
      <ThreeLine
        points={forecasts.flatMap((p, i) => [
          (i / forecasts.length - 0.5) * width,
          (p.lowerBound / Math.max(...forecasts.map(p => p.forecast))) * height,
          (p.confidence - 0.5) * depth
        ])}
        color="#93c5fd"
        lineWidth={1}
        transparent
        opacity={0.3}
      />

      {/* Data points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={forecasts.length}
            array={new Float32Array(points.positions)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={forecasts.length}
            array={new Float32Array(points.colors)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={forecasts.length}
            array={new Float32Array(points.sizes)}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Grid floor */}
      <gridHelper args={[width * 1.2, 20, '#4b5563', '#374151']} />
    </group>
  );
};

const NeuralNetworkVisualization3D: React.FC<{
  layers: number[][];
  activations: number[][];
  weights?: number[][][];
}> = ({ layers, activations, weights }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.clear();

    const maxNeurons = Math.max(...layers.map(l => l.length));
    const layerSpacing = 4;
    const neuronSpacing = 1.5;

    // Create neurons
    layers.forEach((layer, layerIndex) => {
      const yOffset = (maxNeurons - layer.length) * neuronSpacing / 2;

      layer.forEach((neuronValue, neuronIndex) => {
        // Neuron sphere
        const neuronGeometry = new THREE.SphereGeometry(
          0.3 + neuronValue * 0.5,
          16,
          16
        );

        const neuronMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(neuronValue, 0.8, 0.5),
          emissive: new THREE.Color().setHSL(neuronValue, 0.6, 0.2),
          emissiveIntensity: 0.6,
          roughness: 0.2,
          metalness: 0.8
        });

        const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);

        neuron.position.set(
          layerIndex * layerSpacing,
          neuronIndex * neuronSpacing - yOffset,
          0
        );

        // Pulsing animation based on activation
        const scale = 1 + Math.sin(Date.now() * 0.001 + neuronIndex) * neuronValue * 0.2;
        neuron.scale.setScalar(scale);

        groupRef.current!.add(neuron);

        // Create connections to next layer
        if (layerIndex < layers.length - 1) {
          const nextLayer = layers[layerIndex + 1];
          const nextYOffset = (maxNeurons - nextLayer.length) * neuronSpacing / 2;

          nextLayer.forEach((nextNeuronValue, nextNeuronIndex) => {
            const connectionStrength = weights?.[layerIndex]?.[neuronIndex]?.[nextNeuronIndex] ||
              (neuronValue + nextNeuronValue) / 2;

            if (Math.abs(connectionStrength) > 0.1) {
              const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(
                  layerIndex * layerSpacing,
                  neuronIndex * neuronSpacing - yOffset,
                  0
                ),
                new THREE.Vector3(
                  (layerIndex + 0.3) * layerSpacing,
                  (neuronIndex + nextNeuronIndex) / 2 * neuronSpacing - (yOffset + nextYOffset) / 2,
                  Math.sin(layerIndex) * 1
                ),
                new THREE.Vector3(
                  (layerIndex + 1) * layerSpacing,
                  nextNeuronIndex * neuronSpacing - nextYOffset,
                  0
                )
              ]);

              const points = curve.getPoints(20);
              const geometry = new THREE.BufferGeometry().setFromPoints(points);

              const material = new THREE.LineBasicMaterial({
                color: new THREE.Color().setHSL(
                  connectionStrength > 0 ? 0.3 : 0.0,
                  0.7,
                  Math.abs(connectionStrength) * 0.5
                ),
                transparent: true,
                opacity: Math.abs(connectionStrength) * 0.5,
                linewidth: Math.abs(connectionStrength) * 3
              });

              const line = new THREE.Line(geometry, material);
              groupRef.current!.add(line);
            }
          });
        }
      });
    });
  }, [layers, activations, weights]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
    </group>
  );
};

// Sub-components for each tab
const OverviewTab: React.FC<{
  forecastChartData: any[];
  accuracyOverTime: any[];
  categoryBreakdown: any[];
  riskAnalysisData: any[];
  demandNodes: DemandNode3D[];
  viewMode: '2d' | '3d';
  onViewModeChange: (mode: '2d' | '3d') => void;
}> = ({
  forecastChartData,
    accuracyOverTime,
    categoryBreakdown,
    riskAnalysisData,
    demandNodes,
    viewMode,
    onViewModeChange
  }) => {
    return (
      <div className="space-y-6">
        {/* 3D/2D Toggle */}
        <div className="flex justify-end">
          <div className="inline-flex rounded-lg border border-gray-800 p-1">
            <button
              onClick={() => onViewModeChange('2d')}
              className={`px-4 py-2 rounded-md ${viewMode === '2d'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              2D View
            </button>
            <button
              onClick={() => onViewModeChange('3d')}
              className={`px-4 py-2 rounded-md ${viewMode === '3d'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              3D View
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: 3D Visualization */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-bold text-white mb-4">3D Demand Network</h3>
            <div className="h-[500px] rounded-lg overflow-hidden bg-gray-950">
              <Canvas shadows camera={{ position: [25, 15, 25], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <directionalLight
                  position={[10, 20, 15]}
                  intensity={0.8}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-10, 10, -10]} intensity={0.3} color="#3b82f6" />
                <pointLight position={[10, 5, 10]} intensity={0.4} color="#8b5cf6" />

                {/* Demand Nodes */}
                {demandNodes.map((node) => (
                  <DemandNode3D
                    key={node.id}
                    node={node}
                    scale={Math.log(node.value) / 10}
                    animationSpeed={0.5 + node.velocity * 0.5}
                  />
                ))}

                {/* Neural Network Visualization */}
                <NeuralNetworkVisualization3D
                  layers={[
                    Array.from({ length: 8 }, () => Math.random()),
                    Array.from({ length: 12 }, () => Math.random()),
                    Array.from({ length: 8 }, () => Math.random()),
                    Array.from({ length: 4 }, () => Math.random())
                  ]}
                  activations={[]}
                />

                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={10}
                  maxDistance={100}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                />

                {/* Grid Floor */}
                <gridHelper args={[40, 40, '#4b5563', '#374151']} />
              </Canvas>
            </div>
          </div>

          {/* Right Column: Key Metrics */}
          <div className="space-y-6">
            {/* Accuracy Over Time */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Forecast Accuracy</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #4b5563',
                        borderRadius: '0.5rem'
                      }}
                      formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Accuracy']}
                    />
                    <RechartsLine
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Demand by Category</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #4b5563',
                        borderRadius: '0.5rem'
                      }}
                      formatter={(value) => [Number(value).toLocaleString(), 'Demand']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Risk Analysis */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Risk Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  type="number"
                  dataKey="inventory"
                  name="Inventory Coverage"
                  stroke="#9ca3af"
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                />
                <YAxis
                  type="number"
                  dataKey="risk"
                  name="Risk Score"
                  stroke="#9ca3af"
                  domain={[0, 100]}
                />
                <ZAxis
                  type="number"
                  dataKey="accuracy"
                  range={[100, 1000]}
                  name="Accuracy"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value, name) => {
                    if (name === 'inventory') return [`${(Number(value) * 100).toFixed(1)}%`, 'Coverage'];
                    if (name === 'accuracy') return [`${Number(value).toFixed(1)}%`, 'Accuracy'];
                    return [value, name];
                  }}
                />
                <Scatter
                  name="SKUs"
                  data={riskAnalysisData}
                  fill="#8884d8"
                  shape={(props: any) => {
                    const { cx, cy, payload } = props;
                    const size = 8 + (payload.accuracy / 25);
                    const color = payload.risk > 70 ? '#ef4444' :
                      payload.risk > 40 ? '#f59e0b' :
                        '#10b981';

                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={size}
                        fill={color}
                        stroke="#1f2937"
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

const ForecastAnalysisTab: React.FC<{
  demandData: DemandDataPoint[];
  skuForecasts: SKUForecast[];
  externalFactors: ExternalFactor[];
  forecastHorizon: number;
  onHorizonChange: (horizon: 7 | 14 | 30 | 90) => void;
  confidenceLevel: number;
  onConfidenceChange: (level: number) => void;
  showUncertainty: boolean;
  onUncertaintyToggle: (show: boolean) => void;
}> = ({
  demandData,
    skuForecasts,
    externalFactors,
    forecastHorizon,
    onHorizonChange,
    confidenceLevel,
    onConfidenceChange,
    showUncertainty,
    onUncertaintyToggle
  }) => {
    const [selectedFactor, setSelectedFactor] = useState<string | null>(null);

    const forecastComparison = useMemo(() => {
      const recent = demandData.slice(-30);
      return recent.map((d, i) => ({
        day: i + 1,
        actual: d.actual,
        forecast: d.forecast,
        error: Math.abs(d.actual - d.forecast) / d.actual * 100,
        confidence: d.confidence * 100
      }));
    }, [demandData]);

    const factorImpact = useMemo(() => {
      return externalFactors.map(factor => ({
        name: factor.name,
        impact: factor.impact * 100,
        correlation: factor.correlation,
        weight: factor.weight * 100
      }));
    }, [externalFactors]);

    return (
      <div className="space-y-6">
        {/* Controls */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Forecast Horizon</label>
              <div className="flex gap-2">
                {([7, 14, 30, 90] as const).map((days) => (
                  <button
                    key={days}
                    onClick={() => onHorizonChange(days)}
                    className={`px-4 py-2 rounded-lg ${forecastHorizon === days
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                  >
                    {days} days
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Confidence Level: {Math.round(confidenceLevel * 100)}%
              </label>
              <input
                type="range"
                min="50"
                max="99"
                step="1"
                value={confidenceLevel * 100}
                onChange={(e) => onConfidenceChange(parseInt(e.target.value) / 100)}
                className="w-48"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={showUncertainty}
                  onChange={(e) => onUncertaintyToggle(e.target.checked)}
                  className="rounded bg-gray-700"
                />
                Show Uncertainty Bounds
              </label>
            </div>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forecast vs Actual */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Forecast vs Actual Demand</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={forecastComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #4b5563',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="actual" fill="#3b82f6" opacity={0.7} name="Actual Demand" />
                  <RechartsLine
                    type="monotone"
                    dataKey="forecast"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Forecast"
                  />
                  {showUncertainty && (
                    <Area
                      type="monotone"
                      dataKey="confidence"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.1}
                      strokeWidth={1}
                      name="Confidence"
                    />
                  )}
                  <ReferenceLine y={0} stroke="#4b5563" />
                  <Brush dataKey="day" height={30} stroke="#3b82f6" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* External Factors Impact */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-bold text-white mb-4">External Factors Impact</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={factorImpact}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="name" stroke="#9ca3af" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9ca3af" />
                  <Radar
                    name="Impact"
                    dataKey="impact"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Correlation"
                    dataKey="correlation"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #4b5563',
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value, name) => {
                      const val = Number(value);
                      if (name === 'correlation') return [val.toFixed(2), 'Correlation'];
                      return [`${val.toFixed(1)}%`, name];
                    }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SKU-Level Forecasts */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">SKU-Level Forecast Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-3 text-gray-400">SKU ID</th>
                  <th className="text-left p-3 text-gray-400">Name</th>
                  <th className="text-left p-3 text-gray-400">Forecast</th>
                  <th className="text-left p-3 text-gray-400">Accuracy</th>
                  <th className="text-left p-3 text-gray-400">Risk</th>
                  <th className="text-left p-3 text-gray-400">Trend</th>
                  <th className="text-left p-3 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skuForecasts.slice(0, 10).map((sku) => (
                  <tr key={sku.skuId} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="p-3">
                      <div className="font-mono text-sm">{sku.skuId}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{sku.skuName}</div>
                      <div className="text-xs text-gray-500">{sku.category}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold">{sku.forecastDemand.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        {sku.confidenceInterval[0].toLocaleString()} - {sku.confidenceInterval[1].toLocaleString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${sku.accuracy * 100}%` }}
                          />
                        </div>
                        <span className="text-sm">{(sku.accuracy * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${sku.riskScore > 70 ? 'bg-red-900/30 text-red-400' :
                          sku.riskScore > 40 ? 'bg-yellow-900/30 text-yellow-400' :
                            'bg-green-900/30 text-green-400'
                        }`}>
                        {Math.round(sku.riskScore)}/100
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {sku.trend === 'up' ? (
                          <ArrowUp className="text-green-400" size={16} />
                        ) : sku.trend === 'down' ? (
                          <ArrowDown className="text-red-400" size={16} />
                        ) : (
                          <Minus className="text-yellow-400" size={16} />
                        )}
                        <span className={`text-sm ${sku.trend === 'up' ? 'text-green-400' :
                            sku.trend === 'down' ? 'text-red-400' :
                              'text-yellow-400'
                          }`}>
                          {sku.trend}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

const ModelsTab: React.FC<{
  models: ForecastModel[];
  selectedModel: ForecastModel | null;
  onModelSelect: (model: ForecastModel) => void;
  onAutoML: () => void;
  isGenerating: boolean;
}> = ({ models, selectedModel, onModelSelect, onAutoML, isGenerating }) => {
  const [showHyperparameters, setShowHyperparameters] = useState(false);

  const modelComparison = models.map(model => ({
    name: model.name,
    accuracy: model.accuracy * 100,
    mape: model.mape,
    trainingTime: model.trainingTime,
    complexity: model.hyperparameters.layers || 1
  }));

  return (
    <div className="space-y-6">
      {/* Model Selection Header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">AI Model Management</h3>
            <p className="text-gray-400 mt-2">AutoML-driven model selection and optimization</p>
          </div>
          <button
            onClick={onAutoML}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-3 ${isGenerating
                ? 'bg-purple-800 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
              }`}
          >
            <Brain size={20} />
            {isGenerating ? 'Running AutoML...' : 'Run AutoML'}
          </button>
        </div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => onModelSelect(model)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedModel?.id === model.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-800 bg-gray-800/50 hover:border-gray-700'
                }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold text-white">{model.type}</div>
                  <div className="text-sm text-gray-400">{model.name}</div>
                </div>
                {model.isActive && (
                  <div className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">
                    Active
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-white font-bold">{(model.accuracy * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">MAPE</span>
                  <span className="text-white">{model.mape.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Training Time</span>
                  <span className="text-white">{model.trainingTime}s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Details */}
      {selectedModel && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Performance */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              {selectedModel.name} Performance
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #4b5563',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy (%)" />
                  <Bar dataKey="mape" fill="#ef4444" name="MAPE (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Model Details */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Model Details</h4>
              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 text-sm">Type</div>
                  <div className="text-white font-medium">{selectedModel.type}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Last Updated</div>
                  <div className="text-white">
                    {selectedModel.lastUpdated.toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">RMSE</div>
                  <div className="text-white">{selectedModel.rmse.toFixed(1)}</div>
                </div>
                <button
                  onClick={() => setShowHyperparameters(!showHyperparameters)}
                  className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
                >
                  {showHyperparameters ? 'Hide' : 'Show'} Hyperparameters
                </button>
              </div>
            </div>

            {showHyperparameters && (
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Hyperparameters</h4>
                <div className="space-y-2">
                  {Object.entries(selectedModel.hyperparameters).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400">{key}</span>
                      <span className="text-white">{JSON.stringify(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Model Architecture Visualization */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Neural Network Architecture</h4>
        <div className="h-96 rounded-lg overflow-hidden bg-gray-950">
          <Canvas>
            <NeuralNetworkVisualization3D
              layers={[
                Array.from({ length: 12 }, () => Math.random()),
                Array.from({ length: 24 }, () => Math.random()),
                Array.from({ length: 16 }, () => Math.random()),
                Array.from({ length: 8 }, () => Math.random()),
                Array.from({ length: 4 }, () => Math.random()),
                Array.from({ length: 1 }, () => Math.random())
              ]}
              activations={[]}
              weights={Array.from({ length: 5 }, () =>
                Array.from({ length: 12 }, () =>
                  Array.from({ length: 24 }, () => Math.random() * 2 - 1)
                )
              )}
            />
            <OrbitControls enableZoom={true} enablePan={true} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

const ScenariosTab: React.FC<{
  scenarios: ScenarioSimulation[];
  onRunScenario: (scenarioId: string) => void;
  simulationMode: boolean;
  isGenerating: boolean;
}> = ({ scenarios, onRunScenario, simulationMode, isGenerating }) => {
  const [newScenario, setNewScenario] = useState({
    name: '',
    description: '',
    priceChange: 0,
    promotionDiscount: 0,
    leadTimeChange: 0
  });

  const scenarioResults = scenarios.map(scenario => ({
    name: scenario.name,
    baseline: scenario.baselineForecast,
    simulated: scenario.simulatedForecast,
    impact: scenario.impact
  }));

  return (
    <div className="space-y-6">
      {/* Scenario Creation */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Create New Scenario</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Scenario Name</label>
            <input
              type="text"
              value={newScenario.name}
              onChange={(e) => setNewScenario(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
              placeholder="e.g., Price Increase 20%"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Price Change (%)</label>
            <input
              type="range"
              min="-50"
              max="50"
              value={newScenario.priceChange}
              onChange={(e) => setNewScenario(prev => ({ ...prev, priceChange: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-400">
              {newScenario.priceChange > 0 ? '+' : ''}{newScenario.priceChange}%
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Promotion Discount (%)</label>
            <input
              type="range"
              min="0"
              max="50"
              value={newScenario.promotionDiscount}
              onChange={(e) => setNewScenario(prev => ({ ...prev, promotionDiscount: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-400">
              {newScenario.promotionDiscount}% off
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Lead Time Change (days)</label>
            <input
              type="range"
              min="-30"
              max="30"
              value={newScenario.leadTimeChange}
              onChange={(e) => setNewScenario(prev => ({ ...prev, leadTimeChange: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-400">
              {newScenario.leadTimeChange > 0 ? '+' : ''}{newScenario.leadTimeChange} days
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Description</label>
          <textarea
            value={newScenario.description}
            onChange={(e) => setNewScenario(prev => ({ ...prev, description: e.target.value }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white h-24"
            placeholder="Describe the scenario and expected outcomes..."
          />
        </div>

        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium">
          Save Scenario
        </button>
      </div>

      {/* Scenario Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario List */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Scenario Simulations</h3>
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold text-white">{scenario.name}</div>
                    <div className="text-sm text-gray-400">{scenario.description}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${scenario.risk === 'high' ? 'bg-red-900/30 text-red-400' :
                      scenario.risk === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                        'bg-green-900/30 text-green-400'
                    }`}>
                    {scenario.risk.toUpperCase()} RISK
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Baseline</div>
                    <div className="text-white font-bold">
                      ${scenario.baselineForecast.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Simulated</div>
                    <div className="text-white font-bold">
                      ${scenario.simulatedForecast.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm">Impact</div>
                    <div className={`font-bold ${scenario.impact > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                      {scenario.impact > 0 ? '+' : ''}{scenario.impact.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-400">
                    Confidence: {(scenario.confidence * 100).toFixed(0)}%
                  </div>
                  <button
                    onClick={() => onRunScenario(scenario.id)}
                    disabled={isGenerating}
                    className={`px-4 py-2 rounded-lg text-sm ${isGenerating
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    {isGenerating ? 'Running...' : 'Run Simulation'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Visualization */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Scenario Impact Analysis</h4>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioResults}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                />
                <Legend />
                <Bar dataKey="baseline" fill="#3b82f6" name="Baseline Forecast" />
                <Bar dataKey="simulated" fill="#10b981" name="Simulated Forecast" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* What-If Analysis */}
      {simulationMode && (
        <div className="bg-gray-900 rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-blue-500" />
            <h3 className="text-xl font-bold text-white">Live Simulation Running</h3>
          </div>
          <div className="text-gray-300">
            AI is analyzing scenario impacts and generating recommendations...
          </div>
        </div>
      )}
    </div>
  );
};

const InventoryTab: React.FC<{
  skuForecasts: SKUForecast[];
  selectedSKU: string | null;
  onSKUSelect: (skuId: string | null) => void;
  onReconcile: () => void;
}> = ({ skuForecasts, selectedSKU, onSKUSelect, onReconcile }) => {
  const selectedSKUData = selectedSKU
    ? skuForecasts.find(sku => sku.skuId === selectedSKU)
    : null;

  const inventoryHealth = skuForecasts.map(sku => ({
    sku: sku.skuId,
    coverage: sku.currentInventory / sku.forecastDemand,
    serviceLevel: sku.serviceLevel * 100,
    risk: sku.riskScore,
    reorderUrgency: (sku.currentInventory - sku.reorderPoint) / sku.forecastDemand
  }));

  return (
    <div className="space-y-6">
      {/* Inventory Controls */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Inventory Optimization</h3>
            <p className="text-gray-400 mt-2">AI-powered inventory management and replenishment</p>
          </div>
          <button
            onClick={onReconcile}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-3"
          >
            <RefreshCw size={20} />
            Reconcile Hierarchy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-gray-400 text-sm">Stockout Risk</div>
            <div className="text-3xl font-bold text-red-400 mt-2">
              {skuForecasts.filter(s => s.currentInventory < s.reorderPoint).length}
            </div>
            <div className="text-sm text-gray-500 mt-1">SKUs below reorder point</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-gray-400 text-sm">Excess Inventory</div>
            <div className="text-3xl font-bold text-yellow-400 mt-2">
              {skuForecasts.filter(s => s.currentInventory > s.forecastDemand * 2).length}
            </div>
            <div className="text-sm text-gray-500 mt-1">SKUs with {'>'}2x coverage</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-gray-400 text-sm">Optimal SKUs</div>
            <div className="text-3xl font-bold text-green-400 mt-2">
              {skuForecasts.filter(s =>
                s.currentInventory >= s.reorderPoint &&
                s.currentInventory <= s.forecastDemand * 1.5
              ).length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Optimally stocked</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-gray-400 text-sm">Avg Service Level</div>
            <div className="text-3xl font-bold text-blue-400 mt-2">
              {Math.round(skuForecasts.reduce((sum, s) => sum + s.serviceLevel, 0) / skuForecasts.length * 100)}%
            </div>
            <div className="text-sm text-gray-500 mt-1">Across all SKUs</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SKU List */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">SKU Inventory Analysis</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-3 text-gray-400">SKU</th>
                    <th className="text-left p-3 text-gray-400">Inventory</th>
                    <th className="text-left p-3 text-gray-400">Forecast</th>
                    <th className="text-left p-3 text-gray-400">Coverage</th>
                    <th className="text-left p-3 text-gray-400">Status</th>
                    <th className="text-left p-3 text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skuForecasts.slice(0, 15).map((sku) => (
                    <tr
                      key={sku.skuId}
                      onClick={() => onSKUSelect(sku.skuId)}
                      className={`border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer ${selectedSKU === sku.skuId ? 'bg-blue-500/10' : ''
                        }`}
                    >
                      <td className="p-3">
                        <div className="font-mono text-sm">{sku.skuId}</div>
                        <div className="text-xs text-gray-500">{sku.skuName}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold">{sku.currentInventory.toLocaleString()}</div>
                      </td>
                      <td className="p-3">
                        <div>{sku.forecastDemand.toLocaleString()}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${sku.currentInventory < sku.reorderPoint ? 'bg-red-500' :
                                  sku.currentInventory > sku.forecastDemand * 1.5 ? 'bg-yellow-500' :
                                    'bg-green-500'
                                }`}
                              style={{ width: `${Math.min(100, (sku.currentInventory / sku.forecastDemand) * 100)}%` }}
                            />
                          </div>
                          <span className="text-sm">
                            {((sku.currentInventory / sku.forecastDemand) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${sku.currentInventory < sku.reorderPoint ? 'bg-red-900/30 text-red-400' :
                            sku.currentInventory > sku.forecastDemand * 2 ? 'bg-yellow-900/30 text-yellow-400' :
                              'bg-green-900/30 text-green-400'
                          }`}>
                          {sku.currentInventory < sku.reorderPoint ? 'Reorder Now' :
                            sku.currentInventory > sku.forecastDemand * 2 ? 'Excess Stock' :
                              'Optimal'}
                        </div>
                      </td>
                      <td className="p-3">
                        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected SKU Details */}
        <div className="space-y-6">
          {selectedSKUData ? (
            <>
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  {selectedSKUData.skuId} - {selectedSKUData.skuName}
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">Category</div>
                      <div className="text-white">{selectedSKUData.category}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Lead Time</div>
                      <div className="text-white">{selectedSKUData.leadTime} days</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-2">Inventory Status</div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Current Inventory</span>
                        <span className="text-white font-bold">
                          {selectedSKUData.currentInventory.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Reorder Point</span>
                        <span className="text-white">{selectedSKUData.reorderPoint.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Safety Stock</span>
                        <span className="text-white">{selectedSKUData.safetyStock.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-2">Recommendations</div>
                    <div className="space-y-2">
                      {selectedSKUData.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-3 bg-gray-800/30 rounded-lg text-sm">
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Reorder Calculator</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm">Days of Inventory</div>
                    <div className="text-3xl font-bold text-white">
                      {Math.round(selectedSKUData.currentInventory / selectedSKUData.forecastDemand * 30)}
                      <span className="text-sm text-gray-400 ml-2">days</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm">Recommended Order Quantity</div>
                    <div className="text-2xl font-bold text-green-400">
                      {Math.max(0, selectedSKUData.reorderPoint + selectedSKUData.safetyStock - selectedSKUData.currentInventory).toLocaleString()}
                      <span className="text-sm text-gray-400 ml-2">units</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="text-center py-12">
                <Package className="mx-auto text-gray-600 mb-4" size={48} />
                <div className="text-gray-400">Select an SKU to view details</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inventory Health Chart */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Inventory Health Dashboard</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                type="number"
                dataKey="coverage"
                name="Inventory Coverage"
                stroke="#9ca3af"
                domain={[0, 3]}
                tickFormatter={(value) => `${value}x`}
              />
              <YAxis
                type="number"
                dataKey="serviceLevel"
                name="Service Level"
                stroke="#9ca3af"
                domain={[80, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <ZAxis
                type="number"
                dataKey="risk"
                range={[100, 1000]}
                name="Risk Score"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #4b5563',
                  borderRadius: '0.5rem'
                }}
                formatter={(value, name) => {
                  if (name === 'coverage') return [`${Number(value).toFixed(2)}x`, 'Coverage'];
                  if (name === 'serviceLevel') return [`${Number(value).toFixed(1)}%`, 'Service Level'];
                  return [value, name];
                }}
              />
              <Scatter
                name="SKUs"
                data={inventoryHealth}
                fill="#8884d8"
                shape={(props: any) => {
                  const { cx, cy, payload } = props;
                  const size = 6 + (payload.risk / 25);
                  const color = payload.reorderUrgency < -0.2 ? '#ef4444' :
                    payload.reorderUrgency > 0.5 ? '#f59e0b' :
                      '#10b981';

                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={size}
                      fill={color}
                      stroke="#1f2937"
                      strokeWidth={2}
                    />
                  );
                }}
              />
              <ReferenceLine x={1} stroke="#3b82f6" strokeDasharray="3 3" />
              <ReferenceLine y={95} stroke="#10b981" strokeDasharray="3 3" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const AnalyticsTab: React.FC<{
  demandData: DemandDataPoint[];
  externalFactors: ExternalFactor[];
  skuForecasts: SKUForecast[];
  performanceMetrics: any;
}> = ({ demandData, externalFactors, skuForecasts, performanceMetrics }) => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');

  const timeSeriesAnalysis = demandData.slice(-60).map((d, i) => ({
    time: i,
    demand: d.actual,
    seasonality: d.seasonalityFactor * 1000,
    trend: d.trendComponent * 1000,
    residual: d.residual * 1000
  }));

  const forecastErrorDistribution = demandData.map(d => ({
    error: ((d.actual - d.forecast) / d.actual) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Advanced Analytics Header */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Advanced Analytics</h3>
            <p className="text-gray-400 mt-2">
              Deep dive into forecasting performance and AI model insights
            </p>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
            >
              <option value="accuracy">Forecast Accuracy</option>
              <option value="error">Error Distribution</option>
              <option value="seasonality">Seasonality Analysis</option>
              <option value="trend">Trend Analysis</option>
            </select>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
              Export Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Main Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series Decomposition */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Time Series Decomposition</h4>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Demand"
                />
                <Area
                  type="monotone"
                  dataKey="seasonality"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                  name="Seasonality"
                />
                <Area
                  type="monotone"
                  dataKey="trend"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                  name="Trend"
                />
                <Area
                  type="monotone"
                  dataKey="residual"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                  name="Residual"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Error Distribution */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Forecast Error Distribution</h4>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastErrorDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="error"
                  stroke="#9ca3af"
                  type="number"
                  domain={[-50, 50]}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Error']}
                />
                <Bar dataKey="error" fill="#ef4444" name="Forecast Error">
                  {forecastErrorDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.error < -20 ? '#dc2626' :
                          entry.error < -10 ? '#ef4444' :
                            entry.error < 10 ? '#3b82f6' :
                              entry.error < 20 ? '#8b5cf6' :
                                '#dc2626'
                      }
                    />
                  ))}
                </Bar>
                <ReferenceLine x={0} stroke="#10b981" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Factor Correlation Matrix */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Factor Correlation Matrix</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-3 text-gray-400"></th>
                {externalFactors.map((factor) => (
                  <th key={factor.id} className="p-3 text-gray-400 text-center">
                    {factor.name}
                  </th>
                ))}
                <th className="p-3 text-gray-400 text-center">Demand</th>
              </tr>
            </thead>
            <tbody>
              {externalFactors.map((factor, i) => (
                <tr key={factor.id} className="border-b border-gray-800/50">
                  <td className="p-3 text-gray-400">{factor.name}</td>
                  {externalFactors.map((otherFactor, j) => {
                    const correlation = i === j ? 1.0 : Math.abs(factor.correlation - otherFactor.correlation) / 2;
                    return (
                      <td key={j} className="p-3">
                        <div className={`
                          mx-auto w-16 h-8 rounded flex items-center justify-center text-xs font-medium
                          ${correlation > 0.7 ? 'bg-green-900/30 text-green-400' :
                            correlation > 0.4 ? 'bg-blue-900/30 text-blue-400' :
                              correlation > 0.2 ? 'bg-yellow-900/30 text-yellow-400' :
                                'bg-gray-800 text-gray-400'}
                        `}>
                          {correlation.toFixed(2)}
                        </div>
                      </td>
                    );
                  })}
                  <td className="p-3">
                    <div className={`
                      mx-auto w-16 h-8 rounded flex items-center justify-center text-xs font-medium
                      ${factor.correlation > 0.6 ? 'bg-green-900/30 text-green-400' :
                        factor.correlation > 0.3 ? 'bg-blue-900/30 text-blue-400' :
                          'bg-red-900/30 text-red-400'}
                    `}>
                      {factor.correlation.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Model Performance</h4>
          <div className="space-y-4">
            {Object.entries(performanceMetrics).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-white font-bold">
                  {typeof value === 'number' ? (key.includes('Accuracy') || key.includes('Coverage')
                    ? `${(Number(value) * 100).toFixed(1)}%`
                    : Number(value).toFixed(2))
                    : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">AI Insights & Recommendations</h4>
          <div className="space-y-4">
            {[
              {
                title: 'Seasonality Detection',
                insight: 'Strong weekly pattern detected with +15% weekend uplift',
                action: 'Adjust safety stock for weekend peaks',
                confidence: 92
              },
              {
                title: 'Promotion Effectiveness',
                insight: 'Discounts above 20% show diminishing returns',
                action: 'Optimize promotion strategy to 15-20% range',
                confidence: 87
              },
              {
                title: 'External Factor Impact',
                insight: 'Weather explains 35% of demand variance in Q1',
                action: 'Incorporate weather forecasts into planning',
                confidence: 78
              }
            ].map((insight, i) => (
              <div key={i} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-white">{insight.title}</div>
                  <div className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">
                    {insight.confidence}% confidence
                  </div>
                </div>
                <div className="text-gray-300 text-sm mb-2">{insight.insight}</div>
                <div className="text-blue-400 text-sm font-medium">{insight.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DemandForecastingDashboard: React.FC = () => {
  // State Management
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [forecastHorizon, setForecastHorizon] = useState<7 | 14 | 30 | 90>(30);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0.95);
  const [selectedModel, setSelectedModel] = useState<ForecastModel | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'forecast' | 'models' | 'scenarios' | 'inventory' | 'analytics'
  >('overview');
  const [selectedSKU, setSelectedSKU] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d');
  const [simulationMode, setSimulationMode] = useState(false);
  const [showUncertainty, setShowUncertainty] = useState(true);

  // Data States
  const [demandData, setDemandData] = useState<DemandDataPoint[]>([]);
  const [skuForecasts, setSkuForecasts] = useState<SKUForecast[]>([]);
  const [externalFactors, setExternalFactors] = useState<ExternalFactor[]>([]);
  const [forecastModels, setForecastModels] = useState<ForecastModel[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioSimulation[]>([]);
  const [demandNodes, setDemandNodes] = useState<DemandNode3D[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    overallAccuracy: 0.85,
    mape: 12.5,
    rmse: 156.7,
    bias: 0.05,
    coverage: 0.92,
    sharpness: 45.3
  });

  // Generate sample data
  useEffect(() => {
    generateSampleData();
    generate3DNodes();
    initializeModels();
    loadExternalFactors();
    generateScenarios();
    
    // Auto-refresh interval
    const interval = autoRefresh ? setInterval(() => {
      refreshForecasts();
    }, 30000) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const generateSampleData = () => {
    const now = new Date();
    const data: DemandDataPoint[] = [];

    // Generate 90 days of historical data
    for (let i = 90; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      const base = 1000;
      const seasonality = Math.sin((i / 365) * 2 * Math.PI) * 200;
      const trend = i * 2;
      const noise = (Math.random() - 0.5) * 150;

      const actual = base + seasonality + trend + noise;
      const confidence = 0.7 + Math.random() * 0.25;

      data.push({
        timestamp: date,
        actual,
        forecast: actual * (0.9 + Math.random() * 0.2),
        lowerBound: actual * (0.8 + Math.random() * 0.1),
        upperBound: actual * (1.1 + Math.random() * 0.2),
        confidence,
        seasonalityFactor: seasonality / base,
        trendComponent: trend / base,
        residual: noise / base
      });
    }

    setDemandData(data);

    // Generate SKU forecasts
    const skus: SKUForecast[] = Array.from({ length: 50 }, (_, i) => {
      const forecast = 1000 + Math.random() * 5000;
      const velocity = Math.random() * 2 - 1;

      return {
        skuId: `SKU-${1000 + i}`,
        skuName: `Product ${i + 1}`,
        category: ['Apparel', 'Electronics', 'Home', 'Beauty'][i % 4],
        subcategory: ['T-Shirts', 'Laptops', 'Furniture', 'Skincare'][i % 4],
        currentInventory: Math.round(Math.random() * 500),
        forecastDemand: Math.round(forecast),
        safetyStock: Math.round(forecast * 0.2),
        reorderPoint: Math.round(forecast * 0.3),
        leadTime: [3, 7, 14, 21][i % 4],
        serviceLevel: 0.85 + Math.random() * 0.1,
        accuracy: 0.7 + Math.random() * 0.25,
        confidenceInterval: [
          Math.round(forecast * (0.8 + Math.random() * 0.1)),
          Math.round(forecast * (1.1 + Math.random() * 0.2))
        ],
        trend: velocity > 0.3 ? 'up' : velocity < -0.3 ? 'down' : 'stable',
        velocity,
        riskScore: Math.random() * 100,
        recommendations: [
          velocity > 0 ? 'Increase safety stock' : 'Reduce inventory',
          'Optimize reorder point',
          'Review pricing strategy'
        ]
      };
    });

    setSkuForecasts(skus);
  };

  const generate3DNodes = () => {
    const nodes: DemandNode3D[] = [];

    // Generate SKU nodes
    for (let i = 0; i < 20; i++) {
      nodes.push({
        id: `sku_${i}`,
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 15
        ],
        value: 1000 + Math.random() * 4000,
        type: 'sku',
        connections: [],
        velocity: Math.random() * 2 - 1,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      });
    }

    // Generate category nodes
    const categories = ['Apparel', 'Electronics', 'Home', 'Beauty'];
    categories.forEach((cat, i) => {
      nodes.push({
        id: `cat_${i}`,
        position: [
          (i - 1.5) * 6,
          5,
          0
        ],
        value: 5000 + Math.random() * 15000,
        type: 'category',
        connections: nodes.slice(0, 5).map(n => n.id),
        velocity: Math.random() * 1 - 0.5,
        color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][i]
      });
    });

    setDemandNodes(nodes);
  };

  const initializeModels = () => {
    const models: ForecastModel[] = [
      {
        id: 'lstm_1',
        name: 'LSTM Deep Neural Network',
        type: 'LSTM',
        accuracy: 0.92,
        mape: 8.2,
        rmse: 124.5,
        trainingTime: 845,
        lastUpdated: new Date(),
        hyperparameters: {
          layers: 3,
          units: 128,
          dropout: 0.2,
          learningRate: 0.001,
          epochs: 100
        },
        isActive: true
      },
      {
        id: 'prophet_1',
        name: 'Facebook Prophet',
        type: 'Prophet',
        accuracy: 0.87,
        mape: 12.5,
        rmse: 187.3,
        trainingTime: 120,
        lastUpdated: new Date(Date.now() - 86400000),
        hyperparameters: {
          seasonalityMode: 'multiplicative',
          changepointPriorScale: 0.05,
          seasonalityPriorScale: 10
        },
        isActive: false
      },
      {
        id: 'xgboost_1',
        name: 'XGBoost Ensemble',
        type: 'XGBoost',
        accuracy: 0.89,
        mape: 10.8,
        rmse: 156.7,
        trainingTime: 320,
        lastUpdated: new Date(Date.now() - 43200000),
        hyperparameters: {
          nEstimators: 200,
          maxDepth: 6,
          learningRate: 0.1,
          subsample: 0.8
        },
        isActive: false
      },
      {
        id: 'tft_1',
        name: 'Temporal Fusion Transformer',
        type: 'TFT',
        accuracy: 0.94,
        mape: 6.8,
        rmse: 98.2,
        trainingTime: 1560,
        lastUpdated: new Date(),
        hyperparameters: {
          hiddenSize: 256,
          lstmLayers: 3,
          dropout: 0.1,
          attentionHeads: 4
        },
        isActive: false
      }
    ];

    setForecastModels(models);
    setSelectedModel(models[0]);
  };

  const loadExternalFactors = () => {
    const factors: ExternalFactor[] = [
      {
        id: 'weather',
        name: 'Weather Index',
        type: 'weather',
        impact: 0.35,
        correlation: 0.68,
        weight: 0.8,
        timeSeries: Array.from({ length: 90 }, (_, i) => ({
          timestamp: new Date(Date.now() - (90 - i) * 86400000),
          value: 0.5 + Math.sin(i / 7) * 0.3
        }))
      },
      {
        id: 'promotions',
        name: 'Promotional Activity',
        type: 'promotion',
        impact: 0.42,
        correlation: 0.72,
        weight: 0.9,
        timeSeries: Array.from({ length: 90 }, (_, i) => ({
          timestamp: new Date(Date.now() - (90 - i) * 86400000),
          value: i % 14 === 0 ? 1 : 0.2
        }))
      },
      {
        id: 'events',
        name: 'Major Events',
        type: 'event',
        impact: 0.28,
        correlation: 0.51,
        weight: 0.6,
        timeSeries: Array.from({ length: 90 }, (_, i) => ({
          timestamp: new Date(Date.now() - (90 - i) * 86400000),
          value: i % 30 === 0 ? 1 : 0.1
        }))
      },
      {
        id: 'social',
        name: 'Social Media Sentiment',
        type: 'social',
        impact: 0.31,
        correlation: 0.59,
        weight: 0.7,
        timeSeries: Array.from({ length: 90 }, (_, i) => ({
          timestamp: new Date(Date.now() - (90 - i) * 86400000),
          value: 0.6 + Math.random() * 0.4
        }))
      }
    ];

    setExternalFactors(factors);
  };

  const generateScenarios = () => {
    const scenarioList: ScenarioSimulation[] = [
      {
        id: 'price_drop_10',
        name: '10% Price Reduction',
        description: 'Simulate impact of 10% price reduction across all SKUs',
        parameters: { priceChange: -0.1, duration: 30 },
        baselineForecast: 125000,
        simulatedForecast: 152000,
        impact: 21.6,
        confidence: 0.85,
        risk: 'medium'
      },
      {
        id: 'promo_campaign',
        name: 'Major Promotion Campaign',
        description: 'Launch major promotional campaign with 25% discount',
        parameters: { discount: 0.25, marketingBudget: 50000 },
        baselineForecast: 125000,
        simulatedForecast: 198000,
        impact: 58.4,
        confidence: 0.78,
        risk: 'high'
      },
      {
        id: 'supply_chain_delay',
        name: 'Supply Chain Delay',
        description: '30-day lead time increase due to port congestion',
        parameters: { leadTimeIncrease: 30, stockoutCost: 25000 },
        baselineForecast: 125000,
        simulatedForecast: 98000,
        impact: -21.6,
        confidence: 0.92,
        risk: 'high'
      },
      {
        id: 'seasonal_peak',
        name: 'Holiday Season Peak',
        description: 'Projected holiday season demand surge',
        parameters: { seasonMultiplier: 1.8, duration: 45 },
        baselineForecast: 125000,
        simulatedForecast: 225000,
        impact: 80.0,
        confidence: 0.88,
        risk: 'low'
      }
    ];

    setScenarios(scenarioList);
  };

  const refreshForecasts = async () => {
    setIsGenerating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update forecasts with new data
    const updatedForecasts = skuForecasts.map(sku => ({
      ...sku,
      forecastDemand: Math.round(sku.forecastDemand * (0.95 + Math.random() * 0.1)),
      accuracy: Math.min(0.95, sku.accuracy + (Math.random() - 0.5) * 0.05),
      riskScore: Math.random() * 100
    }));

    setSkuForecasts(updatedForecasts);
    setIsGenerating(false);
  };

  const runAutoML = async () => {
    setIsGenerating(true);

    // Simulate AutoML process
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newModel = await AIForecastingEngine.selectBestModel(
      demandData,
      externalFactors,
      forecastHorizon
    );

    setForecastModels(prev => [...prev.filter(m => m.id !== newModel.id), newModel]);
    setSelectedModel(newModel);
    setIsGenerating(false);
  };

  const runScenario = async (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    setIsGenerating(true);
    setSimulationMode(true);

    // Simulate scenario calculation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update scenario with results
    const updatedScenarios = scenarios.map(s =>
      s.id === scenarioId
        ? { ...s, simulatedForecast: s.baselineForecast * (1 + Math.random() * 0.3) }
        : s
    );

    setScenarios(updatedScenarios);
    setIsGenerating(false);
  };

  const reconcileHierarchy = () => {
    const categoryTotals = skuForecasts.reduce((acc, sku) => {
      acc[sku.category] = (acc[sku.category] || 0) + sku.forecastDemand;
      return acc;
    }, {} as Record<string, number>);

    const reconciled = AIForecastingEngine.reconcileForecasts(
      skuForecasts,
      categoryTotals,
      'mint'
    );

    setSkuForecasts(reconciled);
  };

  // Chart data preparation
  const forecastChartData = useMemo(() => {
    return demandData.slice(-30).map(d => ({
      date: d.timestamp.toISOString().split('T')[0],
      actual: d.actual,
      forecast: d.forecast,
      lowerBound: d.lowerBound,
      upperBound: d.upperBound
    }));
  }, [demandData]);

  const accuracyOverTime = useMemo(() => {
    return demandData.slice(-30).map((d, i) => ({
      day: i + 1,
      accuracy: 1 - Math.abs(d.actual - d.forecast) / d.actual,
      mape: Math.abs(d.actual - d.forecast) / d.actual * 100
    }));
  }, [demandData]);

  const categoryBreakdown = useMemo(() => {
    const byCategory = skuForecasts.reduce((acc, sku) => {
      acc[sku.category] = (acc[sku.category] || 0) + sku.forecastDemand;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(byCategory).map(([name, value]) => ({
      name,
      value,
      fill: {
        'Apparel': '#3b82f6',
        'Electronics': '#8b5cf6',
        'Home': '#10b981',
        'Beauty': '#f59e0b'
      }[name] || '#6b7280'
    }));
  }, [skuForecasts]);

  const riskAnalysisData = useMemo(() => {
    return skuForecasts.map(sku => ({
      sku: sku.skuId,
      risk: sku.riskScore,
      accuracy: sku.accuracy * 100,
      velocity: sku.velocity,
      inventory: sku.currentInventory / sku.forecastDemand
    }));
  }, [skuForecasts]);

  // Main Dashboard Render
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-6 overflow-hidden">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Demand Forecasting Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Advanced multi-dimensional forecasting with real-time AI insights
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search SKUs, categories, forecasts..."
                className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg w-64 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={refreshForecasts}
              disabled={isGenerating}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${isGenerating
                  ? 'bg-blue-800 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              <RefreshCw className={isGenerating ? 'animate-spin' : ''} size={20} />
              {isGenerating ? 'Updating...' : 'Refresh'}
            </button>

            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 border-b border-gray-800 pb-2">
          {[
            { key: 'overview', label: 'Overview', icon: <Grid size={18} /> },
            { key: 'forecast', label: 'Forecast Analysis', icon: <TrendingUp size={18} /> },
            { key: 'models', label: 'AI Models', icon: <Brain size={18} /> },
            { key: 'scenarios', label: 'Scenario Planning', icon: <Target size={18} /> },
            { key: 'inventory', label: 'Inventory Optimization', icon: <Package size={18} /> },
            { key: 'analytics', label: 'Advanced Analytics', icon: <BarChart2 size={18} /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Forecast Accuracy',
            value: `${(performanceMetrics.overallAccuracy * 100).toFixed(1)}%`,
            icon: <Target className="text-blue-500" />,
            change: '+2.3%',
            trend: 'up' as const
          },
          {
            label: 'Total Forecast Demand',
            value: skuForecasts.reduce((sum, sku) => sum + sku.forecastDemand, 0).toLocaleString(),
            icon: <TrendingUp className="text-green-500" />,
            change: '+5.7%',
            trend: 'up' as const
          },
          {
            label: 'High-Risk SKUs',
            value: skuForecasts.filter(s => s.riskScore > 70).length.toString(),
            icon: <AlertCircle className="text-red-500" />,
            change: '-3',
            trend: 'down' as const
          },
          {
            label: 'Model Confidence',
            value: `${((selectedModel?.accuracy || 0) * 100).toFixed(1)}%`,
            icon: <Brain className="text-purple-500" />,
            change: 'Optimal',
            trend: 'stable' as const
          }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
                <div className="text-3xl font-bold text-white mt-2">{stat.value}</div>
                <div className={`text-sm flex items-center gap-1 mt-2 ${stat.trend === 'up' ? 'text-green-400' :
                    stat.trend === 'down' ? 'text-red-400' :
                      'text-yellow-400'
                  }`}>
                  {stat.trend === 'up' ? <ArrowUp size={16} /> :
                    stat.trend === 'down' ? <ArrowDown size={16} /> :
                      <Minus size={16} />}
                  {stat.change}
                </div>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          {activeTab === 'overview' && <OverviewTab
            forecastChartData={forecastChartData}
            accuracyOverTime={accuracyOverTime}
            categoryBreakdown={categoryBreakdown}
            riskAnalysisData={riskAnalysisData}
            demandNodes={demandNodes}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />}

          {activeTab === 'forecast' && <ForecastAnalysisTab
            demandData={demandData}
            skuForecasts={skuForecasts}
            externalFactors={externalFactors}
            forecastHorizon={forecastHorizon}
            onHorizonChange={setForecastHorizon}
            confidenceLevel={confidenceLevel}
            onConfidenceChange={setConfidenceLevel}
            showUncertainty={showUncertainty}
            onUncertaintyToggle={setShowUncertainty}
          />}

          {activeTab === 'models' && <ModelsTab
            models={forecastModels}
            selectedModel={selectedModel}
            onModelSelect={setSelectedModel}
            onAutoML={runAutoML}
            isGenerating={isGenerating}
          />}

          {activeTab === 'scenarios' && <ScenariosTab
            scenarios={scenarios}
            onRunScenario={runScenario}
            simulationMode={simulationMode}
            isGenerating={isGenerating}
          />}

          {activeTab === 'inventory' && <InventoryTab
            skuForecasts={skuForecasts}
            selectedSKU={selectedSKU}
            onSKUSelect={setSelectedSKU}
            onReconcile={reconcileHierarchy}
          />}

          {activeTab === 'analytics' && <AnalyticsTab
            demandData={demandData}
            externalFactors={externalFactors}
            skuForecasts={skuForecasts}
            performanceMetrics={performanceMetrics}
          />}
        </motion.main>
      </AnimatePresence>

      {/* Footer Controls */}
      <footer className="mt-8 pt-6 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <div className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleTimeString()} • Auto-refresh:
            <label className="inline-flex items-center ml-2">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="mr-2"
              />
              {autoRefresh ? 'On (30s)' : 'Off'}
            </label>
          </div>

          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2">
              <Download size={16} />
              Export Data
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2">
              <Share2 size={16} />
              Share Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemandForecastingDashboard;