// SearchAbandonmentRisk.tsx - Complete Fixed Implementation
import React, { useState, useEffect, useRef } from 'react';
import '/src/SearchAbandonmentRisk.css';

// ====================== Types & Interfaces ======================
interface SearchAbandonmentMetrics {
  overallScore: AbandonmentScore;
  zeroResult: ZeroResultMetrics;
  relevance: RelevanceMetrics;
  queryIntent: QueryIntentMetrics;
  searchSpeed: SearchSpeedMetrics;
  metadata: MetadataMetrics;
  imageSearch: ImageSearchMetrics;
  facets: FacetMetrics;
  revenue: RevenueMetrics;
  nlp: NLPMetrics;
  multiModal: MultiModalMetrics;
  searchJourney: SearchJourneyMetrics;
  ux: UXMetrics;
  errorPatterns: ErrorPatterns;
  queryClusters: QueryClusters;
  visualGaps: VisualGapMetrics;
  predictive: PredictiveMetrics;
  heatmap: HeatmapMetrics;
  funnel: FunnelMetrics;
  coverage: CoverageMetrics;
  competitive: CompetitiveMetrics;
  replay: ReplayMetrics;
  catalogImpact: CatalogImpactMetrics;
  queryRewrite: QueryRewriteMetrics;
  semanticDrift: SemanticDriftMetrics;
  queryEquity: QueryEquityMetrics;
  personalization: PersonalizationMetrics;
  experimentation: ExperimentationMetrics;
  realTime: RealTimeMetrics;
}

interface AbandonmentScore {
  score: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  breakdown: {
    zeroResultWeight: number;
    relevanceWeight: number;
    speedWeight: number;
    metadataWeight: number;
    facetsWeight: number;
  };
  topIssues: string[];
  estimatedRevenueRecovery: number;
  improvementPriority: 'immediate' | 'high' | 'medium' | 'low';
}

interface ZeroResultMetrics {
  zeroResultRate: number;
  monthlyZeroQueries: number;
  topFailedQueries: Array<{
    query: string;
    count: number;
    category: string;
    estimatedLoss: number;
    suggestedFix: string;
  }>;
  categoryBreakdown: Array<{
    category: string;
    zeroResultRate: number;
    queryVolume: number;
    impact: number;
  }>;
  revenueLost: number;
  potentialRecovery: number;
}

interface RevenueMetrics {
  monthlyTraffic: number;
  averageOrderValue: number;
  conversionRate: number;
  abandonmentRate: number;
  estimatedMonthlyLoss: number;
  potentialRecovery: {
    fromZeroResults: number;
    fromRelevance: number;
    fromSpeed: number;
    total: number;
  };
  roiAnalysis: {
    investment: number;
    return: number;
    paybackPeriod: number;
  };
}

interface RelevanceMetrics {
  score: number;
  top5MatchAccuracy: number;
  semanticErrors: number;
  wrongCategoryRate: number;
  visualSimilarityAccuracy: number;
  relevanceBreakdown: Array<{
    queryType: string;
    accuracy: number;
    sampleQuery: string;
  }>;
}

interface QueryIntentMetrics {
  score: number;
  styleUnderstanding: number;
  synonymAccuracy: number;
  attributeUnderstanding: number;
  multiAttributeAccuracy: number;
  intentClusters: Array<{
    intent: string;
    volume: number;
    successRate: number;
    examples: string[];
  }>;
}

interface SearchSpeedMetrics {
  score: number;
  averageLatency: number;
  p95Latency: number;
  autocompleteSpeed: number;
  recommendationSpeed: number;
  speedThresholds: {
    optimal: number;
    warning: number;
    critical: number;
  };
  bottlenecks: string[];
}

interface MetadataMetrics {
  score: number;
  missingTags: number;
  missingAttributes: number;
  titleQuality: number;
  descriptionQuality: number;
  altTextCoverage: number;
  categoryCoverage: Array<{
    category: string;
    completeness: number;
    missingFields: string[];
  }>;
}

interface ImageSearchMetrics {
  score: number;
  readiness: number;
  imageClarity: number;
  productVisibility: number;
  backgroundNoise: number;
  catalogUniformity: number;
  visualSearchCompatibility: number;
  missingVisualTags: number;
}

interface FacetMetrics {
  score: number;
  relevance: number;
  completeness: number;
  deadEnds: number;
  missingAttributes: string[];
  usageEffectiveness: number;
  facetBreakdown: Array<{
    facet: string;
    usage: number;
    effectiveness: number;
    issues: string[];
  }>;
}

interface NLPMetrics {
  score: number;
  spellCorrection: number;
  autoSuggestSuccess: number;
  semanticCoverage: number;
  languageSupport: number;
  queryExpansion: number;
}

interface MultiModalMetrics {
  score: number;
  imageSearch: boolean;
  videoSearch: boolean;
  voiceSearch: boolean;
  crossCategory: boolean;
  readinessScore: number;
  implementationComplexity: 'low' | 'medium' | 'high';
}

interface SearchJourneyMetrics {
  dropoffPoints: Array<{
    stage: string;
    dropoffRate: number;
    estimatedLoss: number;
    causes: string[];
  }>;
  funnelVisualization: {
    stages: string[];
    conversionRates: number[];
    dropoffRates: number[];
  };
}

interface UXMetrics {
  score: number;
  mobileAccessibility: number;
  searchBarClarity: number;
  ctaPlacement: number;
  autoFillBehavior: number;
  mobileResponsiveness: number;
  uxIssues: string[];
}

interface ErrorPatterns {
  worstOffenders: Array<{
    query: string;
    errorType: string;
    frequency: number;
    impact: number;
    fixPriority: 'critical' | 'high' | 'medium';
  }>;
  patternAnalysis: Array<{
    pattern: string;
    affectedQueries: number;
    rootCause: string;
    suggestedFix: string;
  }>;
}

interface QueryClusters {
  intentClusters: Array<{
    name: string;
    queryCount: number;
    failureRate: number;
    revenueImpact: number;
    representativeQueries: string[];
  }>;
  highFailureClusters: Array<{
    clusterId: string;
    failureRate: number;
    commonIssues: string[];
    suggestedActions: string[];
  }>;
  topicMap: Array<{
    topic: string;
    subTopics: string[];
    queryVolume: number;
    successRate: number;
  }>;
}

interface VisualGapMetrics {
  detectedGaps: Array<{
    query: string;
    catalogMatch: boolean;
    visualSimilarity: number;
    inventoryGap: boolean;
    suggestedProducts: string[];
  }>;
  gapAnalysis: {
    styleGaps: number;
    colorGaps: number;
    sizeGaps: number;
    materialGaps: number;
  };
}

interface PredictiveMetrics {
  scenarios: Array<{
    improvement: number;
    revenueGain: number;
    conversionLift: number;
    aovLift: number;
    implementationCost: number;
    roi: number;
  }>;
  simulationResults: {
    baseline: number;
    optimized: number;
    improvement: number;
  };
}

interface HeatmapMetrics {
  clickPatterns: Array<{
    area: string;
    clicks: number;
    engagement: number;
    dropoff: number;
  }>;
  userPersonas: Array<{
    persona: string;
    behaviorPattern: string;
    dropoffPoints: string[];
    successRate: number;
  }>;
}

interface FunnelMetrics {
  stages: Array<{
    stage: string;
    users: number;
    dropoff: number;
    revenueLoss: number;
    issues: string[];
  }>;
  totalLoss: number;
}

interface CoverageMetrics {
  pcdiScore: number;
  attributeCoverage: number;
  categoryCoverage: number;
  imageFeatureCoverage: number;
  embeddingQuality: number;
  coverageGaps: Array<{
    area: string;
    coverage: number;
    impact: number;
  }>;
}

interface CompetitiveMetrics {
  benchmarks: Array<{
    metric: string;
    yourScore: number;
    industryAvg: number;
    top10Avg: number;
    gap: number;
  }>;
  competitorAnalysis: Array<{
    competitor: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  }>;
}

interface ReplayMetrics {
  replays: Array<{
    userId: string;
    query: string;
    timestamp: string;
    duration: number;
    outcome: 'success' | 'failure' | 'partial';
    events: Array<{
      action: string;
      timestamp: string;
      details: string;
    }>;
  }>;
}

interface CatalogImpactMetrics {
  score: number;
  missingAttributesImpact: number;
  incompleteImagesImpact: number;
  poorTitlesImpact: number;
  recommendations: string[];
}

interface QueryRewriteMetrics {
  score: number;
  spellCorrectionAccuracy: number;
  synonymHandling: number;
  longQueryHandling: number;
  voiceQueryHandling: number;
}

interface SemanticDriftMetrics {
  detectedDrifts: Array<{
    date: string;
    magnitude: number;
    affectedQueries: number;
    cause: string;
  }>;
  stabilityScore: number;
}

interface QueryEquityMetrics {
  score: number;
  nicheCoverage: number;
  longTailSuccess: number;
  minorityCategorySupport: number;
  rareStyleSupport: number;
  equityGaps: string[];
}

interface PersonalizationMetrics {
  readiness: number;
  rankingSupport: boolean;
  behaviorTracking: boolean;
  purchaseHistory: boolean;
  visualAffinity: boolean;
  priceSensitivity: boolean;
  score: number;
}

interface ExperimentationMetrics {
  suggestedTests: Array<{
    testId: string;
    variation: string;
    predictedImpact: number;
    sampleSize: number;
    duration: number;
    confidence: number;
    description: string;
    keyMetrics: string[];
    technicalComplexity: string;
    implementationTime: string;
    cost: string;
    successFactors: string[];
  }>;
  predictionAccuracy: number;
}

interface RealTimeMetrics {
  anomalies: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: string;
    duration: number;
    impact: number;
  }>;
  uptime: number;
  performanceScore: number;
}

// ====================== Main Component ======================
const SearchAbandonmentRisk: React.FC = () => {
  // State Management
  const [metrics, setMetrics] = useState<SearchAbandonmentMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [simulationMode, setSimulationMode] = useState<boolean>(false);
  const [simulationImprovement, setSimulationImprovement] = useState<number>(20);
  
  // Revenue Estimator State
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(1000000);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(85);
  const [conversionRate, setConversionRate] = useState<number>(2.5);
  const [abandonmentRate, setAbandonmentRate] = useState<number>(42);
  
  // A/B Test State
  const [runningTests, setRunningTests] = useState<Record<string, boolean>>({});
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  
  // Chart Data State
  const [chartData, setChartData] = useState<any>(null);
  
  // Initialize Mock Data
  useEffect(() => {
    const initializeData = () => {
      const mockMetrics: SearchAbandonmentMetrics = {
        overallScore: {
          score: 68,
          riskLevel: 'medium',
          breakdown: {
            zeroResultWeight: 25,
            relevanceWeight: 20,
            speedWeight: 15,
            metadataWeight: 20,
            facetsWeight: 20
          },
          topIssues: [
            '42% zero-result queries in fashion category',
            'Slow search response (1.8s average)',
            'Missing color/material tags for 65% products',
            'Poor mobile search UX causing 35% dropoff'
          ],
          estimatedRevenueRecovery: 285000,
          improvementPriority: 'high'
        },
        zeroResult: {
          zeroResultRate: 18.5,
          monthlyZeroQueries: 12500,
          topFailedQueries: [
            {
              query: 'oversized beige hoodie',
              count: 842,
              category: 'fashion',
              estimatedLoss: 42000,
              suggestedFix: 'Add "oversized" and "beige" tags to existing hoodies'
            },
            {
              query: 'ergonomic gaming chair',
              count: 521,
              category: 'furniture',
              estimatedLoss: 31000,
              suggestedFix: 'Create "ergonomic" category and tag relevant chairs'
            },
            {
              query: 'waterproof hiking boots',
              count: 389,
              category: 'footwear',
              estimatedLoss: 28500,
              suggestedFix: 'Add "waterproof" attribute to hiking boots'
            },
            {
              query: 'wireless noise cancelling headphones',
              count: 312,
              category: 'electronics',
              estimatedLoss: 45000,
              suggestedFix: 'Improve synonym mapping for "noise cancelling"'
            }
          ],
          categoryBreakdown: [
            {
              category: 'Fashion',
              zeroResultRate: 24.2,
              queryVolume: 45000,
              impact: 85
            },
            {
              category: 'Electronics',
              zeroResultRate: 12.5,
              queryVolume: 32000,
              impact: 65
            },
            {
              category: 'Home & Kitchen',
              zeroResultRate: 15.8,
              queryVolume: 28000,
              impact: 72
            },
            {
              category: 'Beauty',
              zeroResultRate: 8.9,
              queryVolume: 18000,
              impact: 45
            }
          ],
          revenueLost: 1250000,
          potentialRecovery: 312500
        },
        revenue: {
          monthlyTraffic: 1000000,
          averageOrderValue: 85,
          conversionRate: 2.5,
          abandonmentRate: 42,
          estimatedMonthlyLoss: 1250000,
          potentialRecovery: {
            fromZeroResults: 312500,
            fromRelevance: 300000,
            fromSpeed: 125000,
            total: 737500
          },
          roiAnalysis: {
            investment: 50000,
            return: 8850000,
            paybackPeriod: 1.8
          }
        },
        relevance: {
          score: 72,
          top5MatchAccuracy: 68,
          semanticErrors: 15,
          wrongCategoryRate: 8.2,
          visualSimilarityAccuracy: 75,
          relevanceBreakdown: [
            {
              queryType: 'Style-based',
              accuracy: 65,
              sampleQuery: 'boho dress'
            },
            {
              queryType: 'Attribute-based',
              accuracy: 78,
              sampleQuery: 'red cotton shirt'
            },
            {
              queryType: 'Multi-attribute',
              accuracy: 52,
              sampleQuery: 'black waterproof hiking shoes'
            },
            {
              queryType: 'Brand-specific',
              accuracy: 88,
              sampleQuery: 'nike air max'
            }
          ]
        },
        queryIntent: {
          score: 75,
          styleUnderstanding: 68,
          synonymAccuracy: 82,
          attributeUnderstanding: 79,
          multiAttributeAccuracy: 58,
          intentClusters: [
            {
              intent: 'Style Search',
              volume: 15420,
              successRate: 65,
              examples: ['boho dress', 'minimal sneakers', 'vintage jacket']
            },
            {
              intent: 'Attribute Search',
              volume: 23450,
              successRate: 78,
              examples: ['red heels', 'cotton shirt', 'leather bag']
            },
            {
              intent: 'Multi-Attribute',
              volume: 8920,
              successRate: 52,
              examples: ['black waterproof hiking shoes', 'large ergonomic office chair']
            }
          ]
        },
        searchSpeed: {
          score: 62,
          averageLatency: 1.8,
          p95Latency: 3.2,
          autocompleteSpeed: 0.45,
          recommendationSpeed: 1.2,
          speedThresholds: {
            optimal: 0.5,
            warning: 1.0,
            critical: 2.0
          },
          bottlenecks: [
            'Database query optimization needed',
            'Image processing latency',
            'External API calls slow'
          ]
        },
        metadata: {
          score: 65,
          missingTags: 35,
          missingAttributes: 42,
          titleQuality: 72,
          descriptionQuality: 68,
          altTextCoverage: 45,
          categoryCoverage: [
            {
              category: 'Fashion',
              completeness: 58,
              missingFields: ['material', 'fit', 'style']
            },
            {
              category: 'Electronics',
              completeness: 82,
              missingFields: ['warranty', 'specifications']
            },
            {
              category: 'Home & Kitchen',
              completeness: 71,
              missingFields: ['dimensions', 'material', 'care instructions']
            },
            {
              category: 'Beauty',
              completeness: 68,
              missingFields: ['skin type', 'ingredients', 'volume']
            }
          ]
        },
        imageSearch: {
          score: 45,
          readiness: 35,
          imageClarity: 72,
          productVisibility: 68,
          backgroundNoise: 42,
          catalogUniformity: 58,
          visualSearchCompatibility: 25,
          missingVisualTags: 65
        },
        facets: {
          score: 71,
          relevance: 68,
          completeness: 62,
          deadEnds: 15,
          missingAttributes: ['material', 'fit', 'style', 'occasion'],
          usageEffectiveness: 58,
          facetBreakdown: [
            {
              facet: 'Color',
              usage: 85,
              effectiveness: 72,
              issues: ['Too many similar shades', 'Missing color families']
            },
            {
              facet: 'Size',
              usage: 92,
              effectiveness: 88,
              issues: []
            },
            {
              facet: 'Price',
              usage: 78,
              effectiveness: 82,
              issues: ['Price ranges too broad']
            }
          ]
        },
        nlp: {
          score: 78,
          spellCorrection: 82,
          autoSuggestSuccess: 75,
          semanticCoverage: 72,
          languageSupport: 65,
          queryExpansion: 68
        },
        multiModal: {
          score: 35,
          imageSearch: false,
          videoSearch: false,
          voiceSearch: false,
          crossCategory: true,
          readinessScore: 45,
          implementationComplexity: 'high'
        },
        searchJourney: {
          dropoffPoints: [
            {
              stage: 'Search Query',
              dropoffRate: 15,
              estimatedLoss: 187500,
              causes: ['Complex queries', 'Misspellings', 'Unsupported formats']
            },
            {
              stage: 'Results Page',
              dropoffRate: 42,
              estimatedLoss: 525000,
              causes: ['Zero results', 'Poor relevance', 'Slow loading']
            },
            {
              stage: 'Product Page',
              dropoffRate: 25,
              estimatedLoss: 312500,
              causes: ['Incomplete information', 'Poor images', 'No reviews']
            }
          ],
          funnelVisualization: {
            stages: ['Search', 'Results', 'Click', 'Add to Cart', 'Purchase'],
            conversionRates: [100, 85, 43, 18, 15],
            dropoffRates: [15, 42, 25, 3, 3]
          }
        },
        ux: {
          score: 68,
          mobileAccessibility: 72,
          searchBarClarity: 82,
          ctaPlacement: 65,
          autoFillBehavior: 58,
          mobileResponsiveness: 75,
          uxIssues: [
            'Search bar too small on mobile',
            'Autocomplete appears too slowly',
            'No voice search option',
            'Filters hidden behind too many clicks'
          ]
        },
        errorPatterns: {
          worstOffenders: [
            {
              query: 'black top',
              errorType: 'zero-results',
              frequency: 1250,
              impact: 62500,
              fixPriority: 'critical'
            },
            {
              query: 'running shoes men',
              errorType: 'wrong-category',
              frequency: 892,
              impact: 44600,
              fixPriority: 'high'
            },
            {
              query: 'cotton bedsheet king size',
              errorType: 'missing-variant',
              frequency: 521,
              impact: 26050,
              fixPriority: 'high'
            }
          ],
          patternAnalysis: [
            {
              pattern: 'Color + generic term',
              affectedQueries: 3250,
              rootCause: 'Missing color tags',
              suggestedFix: 'Add color attributes to all products'
            },
            {
              pattern: 'Multiple attributes',
              affectedQueries: 1892,
              rootCause: 'Poor multi-attribute handling',
              suggestedFix: 'Implement AND logic for attributes'
            }
          ]
        },
        queryClusters: {
          intentClusters: [
            {
              name: 'Style Intent',
              queryCount: 15420,
              failureRate: 24.5,
              revenueImpact: 85,
              representativeQueries: ['boho dress', 'minimal sneakers', 'vintage jacket']
            },
            {
              name: 'Attribute Intent',
              queryCount: 23450,
              failureRate: 18.2,
              revenueImpact: 75,
              representativeQueries: ['red heels', 'cotton shirt', 'leather bag']
            },
            {
              name: 'Multi-Attribute Intent',
              queryCount: 8920,
              failureRate: 42.8,
              revenueImpact: 65,
              representativeQueries: ['black waterproof hiking shoes', 'large ergonomic office chair']
            }
          ],
          highFailureClusters: [
            {
              clusterId: 'CF-001',
              failureRate: 42.8,
              commonIssues: ['Missing attributes', 'Poor synonym mapping', 'No visual search'],
              suggestedActions: ['Add missing product attributes', 'Improve synonym dictionary', 'Implement visual search']
            }
          ],
          topicMap: [
            {
              topic: 'Clothing',
              subTopics: ['Dresses', 'Tops', 'Bottoms', 'Outerwear'],
              queryVolume: 45000,
              successRate: 72
            },
            {
              topic: 'Footwear',
              subTopics: ['Sneakers', 'Boots', 'Sandals', 'Formal'],
              queryVolume: 28000,
              successRate: 78
            }
          ]
        },
        visualGaps: {
          detectedGaps: [
            {
              query: 'oversized beige hoodie',
              catalogMatch: false,
              visualSimilarity: 0.35,
              inventoryGap: true,
              suggestedProducts: ['regular hoodie in beige', 'oversized hoodie in grey']
            }
          ],
          gapAnalysis: {
            styleGaps: 42,
            colorGaps: 28,
            sizeGaps: 35,
            materialGaps: 31
          }
        },
        predictive: {
          scenarios: [
            { improvement: 10, revenueGain: 125000, conversionLift: 12, aovLift: 5, implementationCost: 25000, roi: 500 },
            { improvement: 20, revenueGain: 285000, conversionLift: 18, aovLift: 8, implementationCost: 50000, roi: 570 },
            { improvement: 30, revenueGain: 420000, conversionLift: 25, aovLift: 12, implementationCost: 75000, roi: 560 },
            { improvement: 40, revenueGain: 580000, conversionLift: 32, aovLift: 15, implementationCost: 100000, roi: 580 }
          ],
          simulationResults: {
            baseline: 1250000,
            optimized: 685000,
            improvement: 45
          }
        },
        heatmap: {
          clickPatterns: [
            { area: 'Top Results', clicks: 85, engagement: 72, dropoff: 15 },
            { area: 'Filters', clicks: 45, engagement: 62, dropoff: 38 },
            { area: 'Images', clicks: 78, engagement: 82, dropoff: 22 },
            { area: 'Pagination', clicks: 25, engagement: 35, dropoff: 65 }
          ],
          userPersonas: [
            {
              persona: 'Style Explorer',
              behaviorPattern: 'Browses multiple categories, uses style terms',
              dropoffPoints: ['No style filters', 'Poor visual results'],
              successRate: 58
            },
            {
              persona: 'Precision Shopper',
              behaviorPattern: 'Uses specific attributes, compares options',
              dropoffPoints: ['Missing attributes', 'Incomplete specs'],
              successRate: 72
            }
          ]
        },
        funnel: {
          stages: [
            {
              stage: 'Search Query',
              users: 1000000,
              dropoff: 150000,
              revenueLoss: 187500,
              issues: ['Complex queries', 'Misspellings']
            },
            {
              stage: 'Results Page',
              users: 850000,
              dropoff: 357000,
              revenueLoss: 525000,
              issues: ['Zero results', 'Poor relevance']
            },
            {
              stage: 'Product Click',
              users: 493000,
              dropoff: 123250,
              revenueLoss: 312500,
              issues: ['Incomplete info', 'Poor images']
            }
          ],
          totalLoss: 1250000
        },
        coverage: {
          pcdiScore: 68,
          attributeCoverage: 62,
          categoryCoverage: 75,
          imageFeatureCoverage: 45,
          embeddingQuality: 58,
          coverageGaps: [
            { area: 'Visual Features', coverage: 45, impact: 85 },
            { area: 'Text Attributes', coverage: 68, impact: 72 },
            { area: 'User Behavior', coverage: 35, impact: 65 }
          ]
        },
        competitive: {
          benchmarks: [
            { metric: 'Zero-Result Rate', yourScore: 18.5, industryAvg: 12.2, top10Avg: 8.5, gap: 6.3 },
            { metric: 'Search Speed', yourScore: 1.8, industryAvg: 1.2, top10Avg: 0.8, gap: 1.0 },
            { metric: 'Relevance Score', yourScore: 72, industryAvg: 78, top10Avg: 85, gap: -13 },
            { metric: 'Mobile Search UX', yourScore: 65, industryAvg: 72, top10Avg: 88, gap: -23 }
          ],
          competitorAnalysis: [
            {
              competitor: 'Amazon',
              strengths: ['Advanced semantic search', 'Excellent relevance ranking', 'Comprehensive filters'],
              weaknesses: ['Complex interface', 'Too many ads'],
              recommendations: ['Improve query understanding', 'Add more search facets']
            },
            {
              competitor: 'Myntra',
              strengths: ['Excellent visual search', 'Style-based filtering', 'Good mobile experience'],
              weaknesses: ['Limited attribute search', 'Poor long-tail support'],
              recommendations: ['Implement visual search', 'Add style attributes']
            }
          ]
        },
        replay: {
          replays: [
            {
              userId: 'U-001',
              query: 'blue kurta set',
              timestamp: '2024-01-15 14:30:00',
              duration: 3,
              outcome: 'failure',
              events: [
                { action: 'typed query', timestamp: '14:30:00', details: 'User typed "blue kurta set"' },
                { action: 'zero results', timestamp: '14:30:01', details: 'No results found' },
                { action: 'left site', timestamp: '14:30:03', details: 'User exited without further action' }
              ]
            }
          ]
        },
        catalogImpact: {
          score: 62,
          missingAttributesImpact: 85,
          incompleteImagesImpact: 72,
          poorTitlesImpact: 68,
          recommendations: [
            'Add missing product attributes',
            'Improve product image quality',
            'Optimize product titles for search'
          ]
        },
        queryRewrite: {
          score: 75,
          spellCorrectionAccuracy: 82,
          synonymHandling: 72,
          longQueryHandling: 65,
          voiceQueryHandling: 35
        },
        semanticDrift: {
          detectedDrifts: [
            {
              date: '2024-01-10',
              magnitude: 0.15,
              affectedQueries: 1250,
              cause: 'Data import changed product categorization'
            }
          ],
          stabilityScore: 88
        },
        queryEquity: {
          score: 71,
          nicheCoverage: 65,
          longTailSuccess: 58,
          minorityCategorySupport: 72,
          rareStyleSupport: 62,
          equityGaps: ['Niche fashion styles', 'Specialized electronics', 'Regional products']
        },
        personalization: {
          readiness: 45,
          rankingSupport: false,
          behaviorTracking: true,
          purchaseHistory: true,
          visualAffinity: false,
          priceSensitivity: false,
          score: 58
        },
        experimentation: {
          suggestedTests: [
            {
              testId: 'VISUAL-001',
              variation: 'Add Visual Search',
              predictedImpact: 18.5,
              sampleSize: 5000,
              duration: 14,
              confidence: 0.92,
              description: 'Implement AI-powered visual search allowing users to search with images',
              keyMetrics: ['Search conversion', 'Time on site', 'Mobile engagement'],
              technicalComplexity: 'Medium',
              implementationTime: '3-4 weeks',
              cost: '$25,000',
              successFactors: [
                'High-quality product images',
                'Mobile-optimized interface',
                'Fast image processing'
              ]
            },
            {
              testId: 'META-001',
              variation: 'Improve Metadata Tags',
              predictedImpact: 12.3,
              sampleSize: 8000,
              duration: 21,
              confidence: 0.87,
              description: 'Enhance product metadata with AI-generated tags and attributes',
              keyMetrics: ['Zero-result reduction', 'Search relevance', 'Filter usage'],
              technicalComplexity: 'Low',
              implementationTime: '2-3 weeks',
              cost: '$15,000',
              successFactors: [
                'Complete product catalog',
                'Clear attribute taxonomy',
                'Regular maintenance'
              ]
            },
            {
              testId: 'SPEED-001',
              variation: 'Optimize Search Speed',
              predictedImpact: 8.7,
              sampleSize: 10000,
              duration: 7,
              confidence: 0.95,
              description: 'Reduce search latency through query optimization and caching',
              keyMetrics: ['Bounce rate', 'Search completion', 'User satisfaction'],
              technicalComplexity: 'High',
              implementationTime: '4-6 weeks',
              cost: '$35,000',
              successFactors: [
                'Efficient database indexing',
                'CDN implementation',
                'Query optimization'
              ]
            }
          ],
          predictionAccuracy: 92
        },
        realTime: {
          anomalies: [
            {
              type: 'Query Spike Failure',
              severity: 'high',
              timestamp: '2024-01-15 10:30:00',
              duration: 45,
              impact: 8500
            },
            {
              type: 'Relevance Regression',
              severity: 'medium',
              timestamp: '2024-01-14 15:20:00',
              duration: 120,
              impact: 4200
            }
          ],
          uptime: 99.8,
          performanceScore: 92
        }
      };

      setMetrics(mockMetrics);
      
      // Initialize chart data
      setChartData({
        zeroResultTrend: [22.5, 21.8, 20.2, 19.5, 18.8, 18.5, 18.2],
        revenueImpact: [1250000, 312500, 300000, 125000, 737500],
        relevanceBreakdown: [65, 78, 52, 88],
        speedMetrics: [1.8, 3.2, 0.45, 1.2]
      });
      
      setLoading(false);
    };

    initializeData();
  }, []);

  // Utility Functions
  const getRiskColor = (score: number) => {
    if (score >= 80) return '#4caf50'; // Good
    if (score >= 60) return '#ff9800'; // Warning
    if (score >= 40) return '#ff5722'; // Poor
    return '#f44336'; // Critical
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'Low';
    if (score >= 60) return 'Medium';
    if (score >= 40) return 'High';
    return 'Critical';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Revenue Calculation Functions
  const calculateMonthlyLoss = () => {
    const potentialCustomers = monthlyTraffic * (abandonmentRate / 100);
    const lostConversions = potentialCustomers * (conversionRate / 100);
    return lostConversions * averageOrderValue;
  };

  const calculateRecoverableRevenue = () => {
    const totalLoss = calculateMonthlyLoss();
    return totalLoss * 0.35; // 35% recoverable
  };

  const handleRevenueUpdate = () => {
    if (!metrics) return;
    
    const updatedMetrics = {
      ...metrics,
      revenue: {
        ...metrics.revenue,
        monthlyTraffic,
        averageOrderValue,
        conversionRate,
        abandonmentRate,
        estimatedMonthlyLoss: calculateMonthlyLoss(),
        potentialRecovery: {
          ...metrics.revenue.potentialRecovery,
          total: calculateRecoverableRevenue()
        }
      }
    };
    
    setMetrics(updatedMetrics);
    
    // Show success notification
    showNotification('Revenue calculations updated successfully!', 'success');
  };

  // A/B Test Functions
  const handleRunTest = (testId: string) => {
    // Mark test as running
    setRunningTests(prev => ({ ...prev, [testId]: true }));
    
    // Simulate test execution
    setTimeout(() => {
      const results = {
        'VISUAL-001': {
          actualImpact: 19.2,
          confidence: 0.94,
          pValue: 0.012,
          sampleSize: 5000,
          status: 'completed',
          revenueImpact: 28500
        },
        'META-001': {
          actualImpact: 11.8,
          confidence: 0.89,
          pValue: 0.021,
          sampleSize: 8000,
          status: 'running',
          revenueImpact: 18900
        },
        'SPEED-001': {
          actualImpact: 9.1,
          confidence: 0.96,
          pValue: 0.008,
          sampleSize: 10000,
          status: 'scheduled',
          revenueImpact: 12500
        }
      };
      
      setTestResults(prev => ({ ...prev, [testId]: results[testId as keyof typeof results] }));
      setRunningTests(prev => ({ ...prev, [testId]: false }));
      
      showNotification(`Test ${testId} executed successfully! Results available.`, 'success');
    }, 2000);
  };

  // Notification System
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  // Export Functions
  const exportReport = (format: 'pdf' | 'csv' | 'json') => {
    if (!metrics) return;
    
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
      case 'json':
        content = JSON.stringify(metrics, null, 2);
        filename = `search-abandonment-report-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
        break;
      case 'csv':
        // Create CSV content
        content = 'Metric,Value,Impact\n';
        content += `Overall Score,${metrics.overallScore.score},${metrics.overallScore.riskLevel}\n`;
        content += `Zero-Result Rate,${metrics.zeroResult.zeroResultRate}%,High\n`;
        content += `Monthly Revenue Loss,${formatCurrency(metrics.zeroResult.revenueLost)},Critical\n`;
        content += `Recoverable Revenue,${formatCurrency(metrics.overallScore.estimatedRevenueRecovery)},High\n`;
        filename = `search-abandonment-report-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
        break;
      case 'pdf':
        // In a real app, this would generate a PDF
        showNotification('PDF generation would require a PDF library integration', 'info');
        return;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`${format.toUpperCase()} report downloaded successfully!`, 'success');
  };

  // Render Components
  const renderOverview = () => {
    if (!metrics) return null;

    return (
      <div className="overview-container">
        <div className="score-header">
          <div className="main-score">
            <div className="score-circle" style={{ borderColor: getRiskColor(metrics.overallScore.score) }}>
              <span className="score-value">{metrics.overallScore.score}</span>
              <span className="score-label">Search Abandonment Score</span>
            </div>
            <div className="risk-indicator" style={{ backgroundColor: getRiskColor(metrics.overallScore.score) }}>
              {getRiskLevel(metrics.overallScore.score)} Risk
            </div>
          </div>
          
          <div className="revenue-impact">
            <h3>💰 Revenue Impact</h3>
            <div className="impact-numbers">
              <div className="impact-item">
                <span className="impact-label">Monthly Loss</span>
                <span className="impact-value loss">
                  {formatCurrency(metrics.zeroResult.revenueLost)}
                </span>
              </div>
              <div className="impact-item">
                <span className="impact-label">Recoverable</span>
                <span className="impact-value recovery">
                  {formatCurrency(metrics.overallScore.estimatedRevenueRecovery)}
                </span>
              </div>
              <div className="impact-item">
                <span className="impact-label">Annual Loss</span>
                <span className="impact-value loss">
                  {formatCurrency(metrics.zeroResult.revenueLost * 12)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="key-metrics">
          <div className="metric-card" onClick={() => setActiveTab('zero-results')}>
            <h4>🔍 Zero-Result Rate</h4>
            <div className="metric-value">{formatPercentage(metrics.zeroResult.zeroResultRate)}</div>
            <div className="metric-trend negative">↑ 2.1% from last month</div>
            <div className="metric-detail">{metrics.zeroResult.monthlyZeroQueries.toLocaleString()} failed queries</div>
          </div>
          
          <div className="metric-card" onClick={() => setActiveTab('relevance')}>
            <h4>🎯 Relevance Score</h4>
            <div className="metric-value">{metrics.relevance.score}/100</div>
            <div className="metric-trend positive">↑ 5% with fixes</div>
            <div className="metric-detail">{metrics.relevance.wrongCategoryRate}% wrong categories</div>
          </div>
          
          <div className="metric-card" onClick={() => setActiveTab('speed')}>
            <h4>⚡ Search Speed</h4>
            <div className="metric-value">{metrics.searchSpeed.averageLatency}s</div>
            <div className="metric-trend warning">↑ 0.4s slower than optimal</div>
            <div className="metric-detail">P95: {metrics.searchSpeed.p95Latency}s</div>
          </div>
          
          <div className="metric-card" onClick={() => setActiveTab('metadata')}>
            <h4>🏷️ Metadata</h4>
            <div className="metric-value">{metrics.metadata.score}%</div>
            <div className="metric-trend negative">Missing {metrics.metadata.missingTags}% tags</div>
            <div className="metric-detail">{metrics.metadata.missingAttributes}% missing attributes</div>
          </div>
        </div>

        <div className="top-issues">
          <h3>🚨 Top Issues to Fix</h3>
          <div className="issues-list">
            {metrics.overallScore.topIssues.map((issue, index) => (
              <div key={index} className="issue-item">
                <span className="issue-rank">#{index + 1}</span>
                <span className="issue-text">{issue}</span>
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => {
                    // Navigate to relevant tab based on issue
                    if (issue.includes('zero-result')) setActiveTab('zero-results');
                    else if (issue.includes('Slow search')) setActiveTab('speed');
                    else if (issue.includes('Missing')) setActiveTab('metadata');
                    else setActiveTab('overview');
                  }}
                >
                  Fix Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3>⚡ Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => setActiveTab('revenue')}>
              <span className="action-icon">💰</span>
              <span className="action-text">Calculate Revenue Impact</span>
            </button>
            <button className="action-btn" onClick={() => setActiveTab('predictor')}>
              <span className="action-icon">🧪</span>
              <span className="action-text">Run A/B Test</span>
            </button>
            <button className="action-btn" onClick={() => exportReport('csv')}>
              <span className="action-icon">📊</span>
              <span className="action-text">Export Report</span>
            </button>
            <button className="action-btn" onClick={() => setActiveTab('simulation')}>
              <span className="action-icon">🔮</span>
              <span className="action-text">Simulate Improvements</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderRevenueEstimator = () => {
    const monthlyLoss = calculateMonthlyLoss();
    const recoverableRevenue = calculateRecoverableRevenue();
    const roi = ((recoverableRevenue * 12) / 50000) * 100;
    const paybackMonths = 50000 / (recoverableRevenue / 12);

    return (
      <div className="revenue-estimator">
        <div className="estimator-header">
          <h2>💰 Revenue Loss Estimator</h2>
          <p>See exactly how much search abandonment is costing your business</p>
        </div>

        <div className="input-panel">
          <div className="input-group">
            <label>Monthly Search Traffic</label>
            <input 
              type="number" 
              value={monthlyTraffic}
              onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
              min="1000"
              step="1000"
            />
            <div className="input-hint">Number of monthly search queries</div>
          </div>
          
          <div className="input-group">
            <label>Average Order Value (AOV)</label>
            <input 
              type="number" 
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(Number(e.target.value))}
              min="1"
              step="1"
            />
            <div className="input-hint">Average purchase value in $</div>
          </div>
          
          <div className="input-group">
            <label>Current Conversion Rate</label>
            <div className="input-with-suffix">
              <input 
                type="number" 
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                min="0.1"
                step="0.1"
              />
              <span className="suffix">%</span>
            </div>
            <div className="input-hint">Search-to-purchase conversion rate</div>
          </div>
          
          <div className="input-group">
            <label>Search Abandonment Rate</label>
            <div className="input-with-suffix">
              <input 
                type="number" 
                value={abandonmentRate}
                onChange={(e) => setAbandonmentRate(Number(e.target.value))}
                min="1"
                max="100"
                step="1"
              />
              <span className="suffix">%</span>
            </div>
            <div className="input-hint">% of searches that don't convert</div>
          </div>
          
          <div className="input-actions">
            <button className="btn btn-primary" onClick={handleRevenueUpdate}>
              🔄 Update Calculations
            </button>
            <button className="btn btn-outline" onClick={() => {
              setMonthlyTraffic(1000000);
              setAverageOrderValue(85);
              setConversionRate(2.5);
              setAbandonmentRate(42);
              showNotification('Reset to default values', 'info');
            }}>
              ↺ Reset to Defaults
            </button>
          </div>
        </div>

        <div className="loss-breakdown">
          <div className="loss-card">
            <h4>📉 Current Monthly Loss</h4>
            <div className="loss-amount total">
              {formatCurrency(monthlyLoss)}
            </div>
            <div className="loss-subtitle">Revenue lost due to search abandonment</div>
            
            <div className="loss-details">
              <div className="detail-item">
                <div className="detail-label">
                  <span className="dot zero"></span>
                  Zero-Result Queries:
                </div>
                <div className="detail-value">
                  {formatCurrency(monthlyLoss * 0.6)}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">
                  <span className="dot relevance"></span>
                  Poor Relevance:
                </div>
                <div className="detail-value">
                  {formatCurrency(monthlyLoss * 0.25)}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">
                  <span className="dot speed"></span>
                  Slow Search:
                </div>
                <div className="detail-value">
                  {formatCurrency(monthlyLoss * 0.15)}
                </div>
              </div>
            </div>
            
            <div className="loss-summary">
              <div className="summary-item">
                <span>Annual Loss:</span>
                <span className="summary-value loss">
                  {formatCurrency(monthlyLoss * 12)}
                </span>
              </div>
              <div className="summary-item">
                <span>Lost Customers:</span>
                <span className="summary-value">
                  {Math.round(monthlyTraffic * (abandonmentRate / 100) * (conversionRate / 100)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="recovery-card">
            <h4>📈 Potential Recovery</h4>
            <div className="recovery-amount total">
              {formatCurrency(recoverableRevenue)}
            </div>
            <div className="recovery-subtitle">Revenue recoverable with optimizations</div>
            
            <div className="recovery-details">
              <div className="detail-item">
                <div className="detail-label">
                  <span className="icon">🎯</span>
                  Fix Zero Results:
                </div>
                <div className="detail-value">
                  {formatCurrency(recoverableRevenue * 0.4)}
                  <span className="improvement">+12% conversion</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">
                  <span className="icon">🔍</span>
                  Improve Relevance:
                </div>
                <div className="detail-value">
                  {formatCurrency(recoverableRevenue * 0.35)}
                  <span className="improvement">+8% conversion</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">
                  <span className="icon">⚡</span>
                  Speed Optimization:
                </div>
                <div className="detail-value">
                  {formatCurrency(recoverableRevenue * 0.25)}
                  <span className="improvement">+5% conversion</span>
                </div>
              </div>
            </div>
            
            <div className="recovery-summary">
              <div className="summary-item">
                <span>Annual Recovery:</span>
                <span className="summary-value recovery">
                  {formatCurrency(recoverableRevenue * 12)}
                </span>
              </div>
              <div className="summary-item">
                <span>Additional Customers:</span>
                <span className="summary-value">
                  {Math.round(recoverableRevenue / averageOrderValue).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="roi-analysis">
          <h3>📊 ROI Analysis</h3>
          <div className="roi-grid">
            <div className="roi-card">
              <div className="roi-icon">💼</div>
              <h4>Investment Required</h4>
              <div className="roi-value">{formatCurrency(50000)}</div>
              <div className="roi-desc">Implementation & Development</div>
              <div className="roi-breakdown">
                <div>• Development: $35,000</div>
                <div>• Testing: $10,000</div>
                <div>• Training: $5,000</div>
              </div>
            </div>
            
            <div className="roi-card">
              <div className="roi-icon">📈</div>
              <h4>Annual Return</h4>
              <div className="roi-value">{formatCurrency(recoverableRevenue * 12)}</div>
              <div className="roi-desc">Recovered Revenue</div>
              <div className="roi-breakdown">
                <div>• Year 1: {formatCurrency(recoverableRevenue * 12)}</div>
                <div>• Year 2: {formatCurrency(recoverableRevenue * 12 * 1.15)}</div>
                <div>• Year 3: {formatCurrency(recoverableRevenue * 12 * 1.3)}</div>
              </div>
            </div>
            
            <div className="roi-card">
              <div className="roi-icon">💰</div>
              <h4>ROI</h4>
              <div className="roi-value" style={{ color: roi > 500 ? '#4caf50' : '#2196f3' }}>
                {roi.toFixed(0)}%
              </div>
              <div className="roi-desc">First Year Return</div>
              <div className="roi-breakdown">
                <div>• For every $1 invested</div>
                <div>• Get back ${(roi/100).toFixed(2)}</div>
                <div>• Net profit: {formatCurrency((recoverableRevenue * 12) - 50000)}</div>
              </div>
            </div>
            
            <div className="roi-card">
              <div className="roi-icon">⏱️</div>
              <h4>Payback Period</h4>
              <div className="roi-value">{paybackMonths.toFixed(1)} months</div>
              <div className="roi-desc">Time to break even</div>
              <div className="roi-breakdown">
                <div>• Month 1-2: Investment</div>
                <div>• Month {paybackMonths.toFixed(0)}: Break even</div>
                <div>• Month 12+: Pure profit</div>
              </div>
            </div>
          </div>
          
          <div className="roi-conclusion">
            <h4>🎯 Investment Recommendation</h4>
            <div className="recommendation-card positive">
              <div className="recommendation-icon">✅</div>
              <div className="recommendation-content">
                <h5>HIGHLY RECOMMENDED</h5>
                <p>With a {roi.toFixed(0)}% ROI and {paybackMonths.toFixed(1)} month payback period, 
                this investment will generate significant returns. The recovered revenue in Year 1 
                alone covers the investment {((recoverableRevenue * 12) / 50000).toFixed(1)} times over.</p>
                <div className="recommendation-actions">
                  <button className="btn btn-success" onClick={() => exportReport('pdf')}>
                    📋 Generate Business Case
                  </button>
                  <button className="btn btn-outline" onClick={() => exportReport('csv')}>
                    📊 Download ROI Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAIPredictor = () => {
    if (!metrics) return null;

    return (
      <div className="ai-predictor">
        <div className="predictor-header">
          <h2>🧪 AI-Powered A/B Test Predictor</h2>
          <p className="subtitle">AI designs and predicts search optimization experiments with detailed impact analysis</p>
        </div>

        <div className="test-recommendations">
          <h3>🎯 Recommended Experiments</h3>
          <p className="section-description">These tests are prioritized by predicted impact and confidence level</p>
          
          <div className="tests-grid">
            {metrics.experimentation.suggestedTests.map((test, index) => {
              const isRunning = runningTests[test.testId];
              const hasResults = testResults[test.testId];
              
              return (
                <div key={index} className={`test-card ${test.testId === 'VISUAL-001' ? 'featured' : ''}`}>
                  <div className="test-badge">
                    <span className="test-id">{test.testId}</span>
                    <span className="confidence-badge" style={{
                      backgroundColor: test.confidence > 0.9 ? '#4caf50' : 
                                       test.confidence > 0.85 ? '#ff9800' : '#f44336'
                    }}>
                      {Math.round(test.confidence * 100)}% confidence
                    </span>
                  </div>
                  
                  <div className="test-main">
                    <h4>{test.variation}</h4>
                    <p className="test-description">{test.description}</p>
                    
                    <div className="test-stats">
                      <div className="stat-card">
                        <div className="stat-icon">📈</div>
                        <div className="stat-content">
                          <div className="stat-label">Predicted Impact</div>
                          <div className="stat-value">+{test.predictedImpact}%</div>
                          {hasResults && (
                            <div className="stat-subtext">
                              Actual: +{hasResults.actualImpact}%
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                          <div className="stat-label">Sample Size</div>
                          <div className="stat-value">{test.sampleSize.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-content">
                          <div className="stat-label">Duration</div>
                          <div className="stat-value">{test.duration} days</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="test-details">
                      <div className="detail-section">
                        <h5>📊 Key Metrics to Track</h5>
                        <div className="metric-tags">
                          {test.keyMetrics.map((metric, mIndex) => (
                            <span key={mIndex} className="metric-tag">{metric}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="detail-section">
                        <h5>⚙️ Implementation Details</h5>
                        <div className="implementation-details">
                          <div className="detail-item">
                            <span className="detail-label">Complexity:</span>
                            <span className={`detail-value complexity-${test.technicalComplexity.toLowerCase()}`}>
                              {test.technicalComplexity}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Time:</span>
                            <span className="detail-value">{test.implementationTime}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Cost:</span>
                            <span className="detail-value">{test.cost}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="detail-section">
                        <h5>✅ Success Factors</h5>
                        <ul className="success-factors">
                          {test.successFactors.map((factor, fIndex) => (
                            <li key={fIndex}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="test-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleRunTest(test.testId)}
                        disabled={isRunning}
                      >
                        {isRunning ? (
                          <>
                            <span className="spinner-small"></span>
                            Running Test...
                          </>
                        ) : (
                          '🚀 Run This Test'
                        )}
                      </button>
                      <button className="btn btn-outline">
                        📋 View Test Plan
                      </button>
                      {hasResults && (
                        <button className="btn btn-success">
                          📊 View Results
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {test.testId === 'VISUAL-001' && (
                    <div className="featured-banner">
                      <span className="featured-icon">⭐</span>
                      <span>Highest predicted impact</span>
                    </div>
                  )}
                  
                  {hasResults && (
                    <div className="test-results">
                      <h5>📈 Test Results</h5>
                      <div className="results-grid">
                        <div className="result-item">
                          <span>Actual Impact:</span>
                          <span className="result-value">+{hasResults.actualImpact}%</span>
                        </div>
                        <div className="result-item">
                          <span>Confidence:</span>
                          <span>{Math.round(hasResults.confidence * 100)}%</span>
                        </div>
                        <div className="result-item">
                          <span>p-value:</span>
                          <span>{hasResults.pValue}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="prediction-accuracy">
          <h3>🎯 Prediction Accuracy & Methodology</h3>
          <div className="accuracy-content">
            <div className="accuracy-metrics">
              <div className="accuracy-card">
                <div className="accuracy-icon">📊</div>
                <div className="accuracy-value">92%</div>
                <div className="accuracy-label">Historical Accuracy</div>
                <div className="accuracy-desc">Across 250+ tests</div>
              </div>
              
              <div className="accuracy-card">
                <div className="accuracy-icon">💰</div>
                <div className="accuracy-value">87%</div>
                <div className="accuracy-label">Revenue Prediction</div>
                <div className="accuracy-desc">±5% margin of error</div>
              </div>
              
              <div className="accuracy-card">
                <div className="accuracy-icon">📈</div>
                <div className="accuracy-value">94%</div>
                <div className="accuracy-label">Conversion Prediction</div>
                <div className="accuracy-desc">±3% margin of error</div>
              </div>
              
              <div className="accuracy-card">
                <div className="accuracy-icon">🎯</div>
                <div className="accuracy-value">89%</div>
                <div className="accuracy-label">Statistical Significance</div>
                <div className="accuracy-desc">p 0.05 achieved</div>
              </div>
            </div>
            
            <div className="methodology">
              <h4>🔬 Methodology</h4>
              <p>Our AI predictor uses machine learning trained on:</p>
              <ul>
                <li><strong>Historical A/B test data</strong> from 500+ ecommerce sites</li>
                <li><strong>Industry benchmarks</strong> for search optimization</li>
                <li><strong>Technical implementation</strong> complexity analysis</li>
                <li><strong>User behavior</strong> pattern recognition</li>
              </ul>
              <div className="confidence-levels">
                <div className="confidence-level">
                  <span className="level-dot high"></span>
                  <span>High Confidence (90%): Strong historical evidence</span>
                </div>
                <div className="confidence-level">
                  <span className="level-dot medium"></span>
                  <span>Medium Confidence (85-90%): Good evidence, some variation</span>
                </div>
                <div className="confidence-level">
                  <span className="level-dot low"></span>
                  <span>Low Confidence (85%)Limited data, higher risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="test-planning">
          <h3>📋 Test Planning & Setup</h3>
          <div className="planning-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h5>Define Hypothesis</h5>
                <p>Clear statement of what you expect to improve</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h5>Set Up Tracking</h5>
                <p>Implement analytics and event tracking</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h5>Create Variations</h5>
                <p>Develop different versions to test</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h5>Run & Monitor</h5>
                <p>Execute test and monitor performance</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h5>Analyze Results</h5>
                <p>Review data and make decisions</p>
              </div>
            </div>
          </div>
          
          <div className="planning-actions">
            <button className="btn btn-primary" onClick={() => exportReport('pdf')}>
              📋 Generate Test Plan Template
            </button>
            <button className="btn btn-outline">
              🎯 Schedule Consultation
            </button>
            <button className="btn btn-secondary" onClick={() => exportReport('csv')}>
              📊 View Sample Reports
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderZeroResultAnalysis = () => {
    if (!metrics) return null;

    return (
      <div className="zero-result-analysis">
        <div className="analysis-header">
          <h2>🔍 Zero-Result Query Analyzer</h2>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-value">{formatPercentage(metrics.zeroResult.zeroResultRate)}</span>
              <span className="stat-label">Zero-Result Rate</span>
            </div>
            <div className="stat">
              <span className="stat-value">{metrics.zeroResult.monthlyZeroQueries.toLocaleString()}</span>
              <span className="stat-label">Monthly Zero Queries</span>
            </div>
            <div className="stat">
              <span className="stat-value loss">{formatCurrency(metrics.zeroResult.revenueLost)}</span>
              <span className="stat-label">Monthly Revenue Loss</span>
            </div>
            <div className="stat">
              <span className="stat-value recovery">{formatCurrency(metrics.zeroResult.potentialRecovery)}</span>
              <span className="stat-label">Recoverable Revenue</span>
            </div>
          </div>
        </div>

        <div className="top-failed-queries">
          <h3>🚫 Worst Performing Queries</h3>
          <table className="queries-table">
            <thead>
              <tr>
                <th>Query</th>
                <th>Frequency</th>
                <th>Category</th>
                <th>Estimated Loss</th>
                <th>Suggested Fix</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {metrics.zeroResult.topFailedQueries.map((query, index) => (
                <tr key={index}>
                  <td className="query-text">{query.query}</td>
                  <td className="query-count">{query.count}</td>
                  <td><span className="category-tag">{query.category}</span></td>
                  <td className="loss-amount">{formatCurrency(query.estimatedLoss)}</td>
                  <td className="suggestion">{query.suggestedFix}</td>
                  <td>
                    <span className={`priority-badge ${index === 0 ? 'critical' : 'high'}`}>
                      {index === 0 ? 'Critical' : 'High'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => {
                        // Implement fix suggestion
                        showNotification(`Implementing fix for: ${query.query}`, 'info');
                      }}
                    >
                      Apply Fix
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="category-breakdown">
          <h3>📊 Category-Level Breakdown</h3>
          <div className="category-grid">
            {metrics.zeroResult.categoryBreakdown.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-header">
                  <h4>{category.category}</h4>
                  <span className="rate-badge" style={{ 
                    backgroundColor: category.zeroResultRate > 20 ? '#f44336' : 
                                   category.zeroResultRate > 15 ? '#ff9800' : '#ffc107'
                  }}>
                    {formatPercentage(category.zeroResultRate)}
                  </span>
                </div>
                <div className="category-stats">
                  <div className="stat-line">
                    <span>Query Volume:</span>
                    <span>{category.queryVolume.toLocaleString()}</span>
                  </div>
                  <div className="stat-line">
                    <span>Impact Score:</span>
                    <span>{category.impact}/100</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min(category.zeroResultRate * 3, 100)}%`,
                        backgroundColor: category.zeroResultRate > 20 ? '#f44336' : 
                                       category.zeroResultRate > 15 ? '#ff9800' : '#ffc107'
                      }}
                    />
                  </div>
                </div>
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => {
                    // Focus on this category
                    showNotification(`Focusing on ${category.category} improvements`, 'info');
                  }}
                >
                  Focus Category
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // NEW: Relevance Analysis Render Function
  const renderRelevanceAnalysis = () => {
    if (!metrics) return null;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>🎯 Relevance Analysis</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value" style={{ color: getRiskColor(metrics.relevance.score) }}>
                {metrics.relevance.score}/100
              </div>
              <div className="stat-label">Overall Relevance Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.relevance.top5MatchAccuracy}%</div>
              <div className="stat-label">Top 5 Match Accuracy</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.relevance.wrongCategoryRate}%</div>
              <div className="stat-label">Wrong Category Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.relevance.visualSimilarityAccuracy}%</div>
              <div className="stat-label">Visual Similarity</div>
            </div>
          </div>
        </div>

        <div className="section-content">
          <div className="metrics-grid">
            <div className="metric-card large">
              <h3>📊 Relevance Breakdown by Query Type</h3>
              <div className="breakdown-list">
                {metrics.relevance.relevanceBreakdown.map((item, index) => (
                  <div key={index} className="breakdown-item">
                    <div className="breakdown-header">
                      <span className="query-type">{item.queryType}</span>
                      <span className="accuracy-score">{item.accuracy}%</span>
                    </div>
                    <div className="sample-query">"{item.sampleQuery}"</div>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${item.accuracy}%`,
                            backgroundColor: item.accuracy > 80 ? '#4caf50' : 
                                          item.accuracy > 60 ? '#ff9800' : '#f44336'
                          }}
                        />
                      </div>
                      <div className="progress-labels">
                        <span>Poor</span>
                        <span>Good</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                    <div className="recommendation">
                      {item.accuracy < 70 ? 'Needs improvement' : item.accuracy < 85 ? 'Good' : 'Excellent'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="metric-card">
              <h3>⚡ Quick Insights</h3>
              <div className="insights-list">
                <div className="insight-item negative">
                  <div className="insight-icon">⚠️</div>
                  <div className="insight-content">
                    <div className="insight-title">Multi-attribute queries struggle</div>
                    <div className="insight-desc">Only {metrics.relevance.relevanceBreakdown[2].accuracy}% accuracy for complex queries</div>
                  </div>
                </div>
                <div className="insight-item positive">
                  <div className="insight-icon">✅</div>
                  <div className="insight-content">
                    <div className="insight-title">Brand queries perform well</div>
                    <div className="insight-desc">{metrics.relevance.relevanceBreakdown[3].accuracy}% accuracy for brand searches</div>
                  </div>
                </div>
                <div className="insight-item warning">
                  <div className="insight-icon">🎯</div>
                  <div className="insight-content">
                    <div className="insight-title">Style-based queries need work</div>
                    <div className="insight-desc">{metrics.relevance.relevanceBreakdown[0].accuracy}% accuracy for style searches</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>🔧 Improvement Recommendations</h3>
              <ul className="recommendations-list">
                <li>
                  <strong>Improve style understanding:</strong> Train models on fashion/style terminology
                </li>
                <li>
                  <strong>Enhance multi-attribute handling:</strong> Implement AND/OR logic for multiple filters
                </li>
                <li>
                  <strong>Expand synonym database:</strong> Add more synonyms for common terms
                </li>
                <li>
                  <strong>Visual search integration:</strong> Allow users to search by image similarity
                </li>
              </ul>
              <div className="improvement-actions">
                <button className="btn btn-primary btn-sm">
                  🚀 Implement Recommendations
                </button>
                <button className="btn btn-outline btn-sm">
                  📋 View Detailed Plan
                </button>
              </div>
            </div>
          </div>

          <div className="comparison-section">
            <h3>📈 Impact Analysis</h3>
            <div className="impact-grid">
              <div className="impact-card">
                <div className="impact-icon">💰</div>
                <h4>Revenue Impact</h4>
                <div className="impact-value">{formatCurrency(metrics.revenue.potentialRecovery.fromRelevance)}</div>
                <div className="impact-desc">Recoverable with 20% relevance improvement</div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">👥</div>
                <h4>Customer Impact</h4>
                <div className="impact-value">+18%</div>
                <div className="impact-desc">Expected conversion lift</div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">⏱️</div>
                <h4>Implementation Time</h4>
                <div className="impact-value">4-6 weeks</div>
                <div className="impact-desc">For initial improvements</div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">📊</div>
                <h4>ROI</h4>
                <div className="impact-value">580%</div>
                <div className="impact-desc">First year return on investment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NEW: Speed Analysis Render Function
  const renderSpeedAnalysis = () => {
    if (!metrics) return null;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>⚡ Search Speed Analysis</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value" style={{ color: getRiskColor(metrics.searchSpeed.score) }}>
                {metrics.searchSpeed.score}/100
              </div>
              <div className="stat-label">Speed Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.searchSpeed.averageLatency}s</div>
              <div className="stat-label">Average Latency</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.searchSpeed.p95Latency}s</div>
              <div className="stat-label">P95 Latency</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.searchSpeed.autocompleteSpeed}s</div>
              <div className="stat-label">Autocomplete Speed</div>
            </div>
          </div>
        </div>

        <div className="section-content">
          <div className="metrics-grid">
            <div className="metric-card large">
              <h3>📊 Speed Performance Analysis</h3>
              <div className="speed-metrics">
                <div className="speed-metric">
                  <div className="metric-header">
                    <span className="metric-title">Average Search Latency</span>
                    <span className="metric-value">{metrics.searchSpeed.averageLatency}s</span>
                  </div>
                  <div className="comparison">
                    <span className="comparison-label">
                      {metrics.searchSpeed.averageLatency > metrics.searchSpeed.speedThresholds.warning ? 
                        `⚠️ ${(metrics.searchSpeed.averageLatency - metrics.searchSpeed.speedThresholds.optimal).toFixed(1)}s slower than optimal` : 
                        '✅ Within optimal range'}
                    </span>
                  </div>
                  <div className="thresholds">
                    <div className="threshold optimal">
                      <span>Optimal:</span>
                      <span>{metrics.searchSpeed.speedThresholds.optimal}s</span>
                    </div>
                    <div className="threshold warning">
                      <span>Warning:</span>
                      <span>{metrics.searchSpeed.speedThresholds.warning}s</span>
                    </div>
                    <div className="threshold critical">
                      <span>Critical:</span>
                      <span>{metrics.searchSpeed.speedThresholds.critical}s</span>
                    </div>
                  </div>
                </div>

                <div className="speed-metric">
                  <div className="metric-header">
                    <span className="metric-title">P95 Latency (95th percentile)</span>
                    <span className="metric-value">{metrics.searchSpeed.p95Latency}s</span>
                  </div>
                  <div className="comparison">
                    <span className={`comparison-label ${metrics.searchSpeed.p95Latency > metrics.searchSpeed.speedThresholds.critical ? 'critical' : 
                                      metrics.searchSpeed.p95Latency > metrics.searchSpeed.speedThresholds.warning ? 'warning' : 'good'}`}>
                      {metrics.searchSpeed.p95Latency > metrics.searchSpeed.speedThresholds.critical ? 
                        '🔴 Critical - users are abandoning' : 
                        metrics.searchSpeed.p95Latency > metrics.searchSpeed.speedThresholds.warning ? 
                        '🟡 Warning - some users affected' : 
                        '✅ Good - most users satisfied'}
                    </span>
                  </div>
                </div>

                <div className="speed-metric">
                  <div className="metric-header">
                    <span className="metric-title">Autocomplete Speed</span>
                    <span className="metric-value">{metrics.searchSpeed.autocompleteSpeed}s</span>
                  </div>
                  <div className="comparison">
                    <span className={`comparison-label ${metrics.searchSpeed.autocompleteSpeed > 0.5 ? 'warning' : 'good'}`}>
                      {metrics.searchSpeed.autocompleteSpeed > 0.5 ? 
                        '🟡 Should be under 0.5s for instant feel' : 
                        '✅ Excellent - feels instant'}
                    </span>
                  </div>
                </div>

                <div className="speed-metric">
                  <div className="metric-header">
                    <span className="metric-title">Recommendation Speed</span>
                    <span className="metric-value">{metrics.searchSpeed.recommendationSpeed}s</span>
                  </div>
                  <div className="comparison">
                    <span className={`comparison-label ${metrics.searchSpeed.recommendationSpeed > 1.5 ? 'warning' : 'good'}`}>
                      {metrics.searchSpeed.recommendationSpeed > 1.5 ? 
                        '🟡 Could be faster - affects UX' : 
                        '✅ Good - responsive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>🚨 Identified Bottlenecks</h3>
              <div className="bottlenecks-list">
                {metrics.searchSpeed.bottlenecks.map((bottleneck, index) => (
                  <div key={index} className="bottleneck-item">
                    <div className="bottleneck-icon">⚡</div>
                    <div className="bottleneck-content">
                      <div className="bottleneck-title">{bottleneck}</div>
                      <div className="bottleneck-priority">
                        {index === 0 ? 'High Priority' : index === 1 ? 'Medium Priority' : 'Low Priority'}
                      </div>
                    </div>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => showNotification(`Investigating: ${bottleneck}`, 'info')}
                    >
                      Investigate
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="metric-card">
              <h3>📈 Performance Targets</h3>
              <div className="targets-list">
                <div className="target-item">
                  <div className="target-label">Current Average</div>
                  <div className="target-value">{metrics.searchSpeed.averageLatency}s</div>
                  <div className="target-goal">
                    <span>Goal: {metrics.searchSpeed.speedThresholds.optimal}s</span>
                    <span className="target-difference">
                      {metrics.searchSpeed.averageLatency > metrics.searchSpeed.speedThresholds.optimal ? 
                        `+${(metrics.searchSpeed.averageLatency - metrics.searchSpeed.speedThresholds.optimal).toFixed(1)}s` : 
                        '✓ Achieved'}
                    </span>
                  </div>
                </div>
                <div className="target-item">
                  <div className="target-label">P95 Latency</div>
                  <div className="target-value">{metrics.searchSpeed.p95Latency}s</div>
                  <div className="target-goal">
                    <span>Goal: {metrics.searchSpeed.speedThresholds.warning}s</span>
                    <span className="target-difference">
                      {metrics.searchSpeed.p95Latency > metrics.searchSpeed.speedThresholds.warning ? 
                        `+${(metrics.searchSpeed.p95Latency - metrics.searchSpeed.speedThresholds.warning).toFixed(1)}s` : 
                        '✓ Achieved'}
                    </span>
                  </div>
                </div>
                <div className="target-item">
                  <div className="target-label">Autocomplete</div>
                  <div className="target-value">{metrics.searchSpeed.autocompleteSpeed}s</div>
                  <div className="target-goal">
                    <span>Goal: 0.3s</span>
                    <span className="target-difference">
                      {metrics.searchSpeed.autocompleteSpeed > 0.3 ? 
                        `+${(metrics.searchSpeed.autocompleteSpeed - 0.3).toFixed(2)}s` : 
                        '✓ Achieved'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="improvement-section">
            <h3>🔧 Optimization Recommendations</h3>
            <div className="recommendations-grid">
              <div className="recommendation-card">
                <div className="rec-icon">💾</div>
                <h4>Implement Caching</h4>
                <p>Cache frequent search results to reduce database load</p>
                <div className="rec-impact">
                  <span>Impact: High</span>
                  <span>Time: 2 weeks</span>
                </div>
              </div>
              <div className="recommendation-card">
                <div className="rec-icon">⚡</div>
                <h4>Query Optimization</h4>
                <p>Optimize database queries and add proper indexing</p>
                <div className="rec-impact">
                  <span>Impact: High</span>
                  <span>Time: 3 weeks</span>
                </div>
              </div>
              <div className="recommendation-card">
                <div className="rec-icon">🌐</div>
                <h4>CDN Integration</h4>
                <p>Use CDN for static assets and search API</p>
                <div className="rec-impact">
                  <span>Impact: Medium</span>
                  <span>Time: 1 week</span>
                </div>
              </div>
              <div className="recommendation-card">
                <div className="rec-icon">🔍</div>
                <h4>Load Testing</h4>
                <p>Implement comprehensive load testing</p>
                <div className="rec-impact">
                  <span>Impact: Medium</span>
                  <span>Time: 2 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NEW: Metadata Analysis Render Function
  const renderMetadataAnalysis = () => {
    if (!metrics) return null;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>🏷️ Metadata Quality Analysis</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value" style={{ color: getRiskColor(metrics.metadata.score) }}>
                {metrics.metadata.score}%
              </div>
              <div className="stat-label">Metadata Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.metadata.missingTags}%</div>
              <div className="stat-label">Missing Tags</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.metadata.missingAttributes}%</div>
              <div className="stat-label">Missing Attributes</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{metrics.metadata.altTextCoverage}%</div>
              <div className="stat-label">Alt Text Coverage</div>
            </div>
          </div>
        </div>

        <div className="section-content">
          <div className="metrics-grid">
            <div className="metric-card large">
              <h3>📊 Category-Level Metadata Coverage</h3>
              <div className="category-coverage-grid">
                {metrics.metadata.categoryCoverage.map((category, index) => (
                  <div key={index} className="coverage-card">
                    <div className="coverage-header">
                      <h4>{category.category}</h4>
                      <div className="coverage-score" style={{ 
                        color: category.completeness > 80 ? '#4caf50' : 
                               category.completeness > 60 ? '#ff9800' : '#f44336'
                      }}>
                        {category.completeness}%
                      </div>
                    </div>
                    <div className="coverage-bar">
                      <div 
                        className="coverage-fill" 
                        style={{ 
                          width: `${category.completeness}%`,
                          backgroundColor: category.completeness > 80 ? '#4caf50' : 
                                         category.completeness > 60 ? '#ff9800' : '#f44336'
                        }}
                      />
                    </div>
                    <div className="missing-fields">
                      <div className="missing-title">Missing Fields:</div>
                      <div className="field-tags">
                        {category.missingFields.map((field, fieldIndex) => (
                          <span key={fieldIndex} className="field-tag">{field}</span>
                        ))}
                      </div>
                    </div>
                    <div className="coverage-actions">
                      <button className="btn btn-sm btn-outline">
                        Prioritize
                      </button>
                      <button className="btn btn-sm btn-primary">
                        Fix Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="metric-card">
              <h3>📋 Overall Metadata Quality</h3>
              <div className="quality-metrics">
                <div className="quality-item">
                  <div className="quality-label">Title Quality</div>
                  <div className="quality-value">{metrics.metadata.titleQuality}/100</div>
                  <div className="quality-bar">
                    <div 
                      className="quality-fill" 
                      style={{ 
                        width: `${metrics.metadata.titleQuality}%`,
                        backgroundColor: metrics.metadata.titleQuality > 80 ? '#4caf50' : 
                                       metrics.metadata.titleQuality > 60 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
                <div className="quality-item">
                  <div className="quality-label">Description Quality</div>
                  <div className="quality-value">{metrics.metadata.descriptionQuality}/100</div>
                  <div className="quality-bar">
                    <div 
                      className="quality-fill" 
                      style={{ 
                        width: `${metrics.metadata.descriptionQuality}%`,
                        backgroundColor: metrics.metadata.descriptionQuality > 80 ? '#4caf50' : 
                                       metrics.metadata.descriptionQuality > 60 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
                <div className="quality-item">
                  <div className="quality-label">Alt Text Coverage</div>
                  <div className="quality-value">{metrics.metadata.altTextCoverage}%</div>
                  <div className="quality-bar">
                    <div 
                      className="quality-fill" 
                      style={{ 
                        width: `${metrics.metadata.altTextCoverage}%`,
                        backgroundColor: metrics.metadata.altTextCoverage > 80 ? '#4caf50' : 
                                       metrics.metadata.altTextCoverage > 60 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <h3>💡 Quick Actions</h3>
              <div className="quick-actions-list">
                <button className="action-btn full">
                  <span className="action-icon">🤖</span>
                  <span className="action-text">Run AI Tag Generation</span>
                  <span className="action-desc">Auto-generate tags for {metrics.metadata.missingTags}% products</span>
                </button>
                <button className="action-btn full">
                  <span className="action-icon">📋</span>
                  <span className="action-text">Bulk Edit Attributes</span>
                  <span className="action-desc">Fix {metrics.metadata.missingAttributes}% missing attributes</span>
                </button>
                <button className="action-btn full">
                  <span className="action-icon">🖼️</span>
                  <span className="action-text">Add Alt Text</span>
                  <span className="action-desc">Cover {100 - metrics.metadata.altTextCoverage}% missing alt text</span>
                </button>
              </div>
            </div>
          </div>

          <div className="impact-section">
            <h3>📈 Business Impact</h3>
            <div className="impact-cards">
              <div className="impact-card">
                <div className="impact-icon">💰</div>
                <div className="impact-content">
                  <h4>Revenue Impact</h4>
                  <div className="impact-value">{formatCurrency(125000)}</div>
                  <div className="impact-desc">Monthly loss due to poor metadata</div>
                </div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">🔍</div>
                <div className="impact-content">
                  <h4>Search Performance</h4>
                  <div className="impact-value">+25%</div>
                  <div className="impact-desc">Expected search relevance improvement</div>
                </div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">👥</div>
                <div className="impact-content">
                  <h4>Conversion Impact</h4>
                  <div className="impact-value">+15%</div>
                  <div className="impact-desc">Expected conversion rate improvement</div>
                </div>
              </div>
              <div className="impact-card">
                <div className="impact-icon">⏱️</div>
                <div className="impact-content">
                  <h4>Implementation</h4>
                  <div className="impact-value">3-4 weeks</div>
                  <div className="impact-desc">Time to implement improvements</div>
                </div>
              </div>
            </div>
          </div>

          <div className="recommendations-section">
            <h3>🔧 Detailed Recommendations</h3>
            <div className="recommendations-grid">
              <div className="recommendation">
                <div className="rec-icon">🏷️</div>
                <div className="rec-content">
                  <h4>Automated Tagging System</h4>
                  <p>Implement AI-powered tag generation for all products</p>
                  <div className="rec-details">
                    <span>Impact: High</span>
                    <span>Cost: $15,000</span>
                    <span>Time: 3 weeks</span>
                  </div>
                </div>
              </div>
              <div className="recommendation">
                <div className="rec-icon">📊</div>
                <div className="rec-content">
                  <h4>Quality Scoring</h4>
                  <p>Create metadata quality score for each product</p>
                  <div className="rec-details">
                    <span>Impact: Medium</span>
                    <span>Cost: $8,000</span>
                    <span>Time: 2 weeks</span>
                  </div>
                </div>
              </div>
              <div className="recommendation">
                <div className="rec-icon">🔄</div>
                <div className="rec-content">
                  <h4>Bulk Editing Tools</h4>
                  <p>Enable bulk metadata updates for similar products</p>
                  <div className="rec-details">
                    <span>Impact: High</span>
                    <span>Cost: $10,000</span>
                    <span>Time: 2 weeks</span>
                  </div>
                </div>
              </div>
              <div className="recommendation">
                <div className="rec-icon">✅</div>
                <div className="rec-content">
                  <h4>Validation Rules</h4>
                  <p>Set up validation rules for required attributes</p>
                  <div className="rec-details">
                    <span>Impact: Medium</span>
                    <span>Cost: $5,000</span>
                    <span>Time: 1 week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'revenue': return renderRevenueEstimator();
      case 'predictor': return renderAIPredictor();
      case 'zero-results': return renderZeroResultAnalysis();
      case 'relevance': return renderRelevanceAnalysis();
      case 'speed': return renderSpeedAnalysis();
      case 'metadata': return renderMetadataAnalysis();
      default: return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3>Analyzing Search Abandonment Risk...</h3>
        <p>AI is analyzing thousands of search queries and catalog items</p>
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
          <div className="loading-stats">
            <span>Analyzed 12,500 search queries</span>
            <span>Processing 8,200 product items</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-abandonment-risk">
      <header className="app-header">
        <h1>🔍 Search Abandonment Risk Calculator</h1>
        <p className="subtitle">
          AI-powered analysis of search abandonment risks with revenue impact forecasting
        </p>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>📊 Navigation</h3>
            <button 
              className={`sidebar-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview Dashboard
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'zero-results' ? 'active' : ''}`}
              onClick={() => setActiveTab('zero-results')}
            >
              🔍 Zero-Result Analysis
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'revenue' ? 'active' : ''}`}
              onClick={() => setActiveTab('revenue')}
            >
              💰 Revenue Estimator
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'predictor' ? 'active' : ''}`}
              onClick={() => setActiveTab('predictor')}
            >
              🧪 A/B Test Predictor
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'relevance' ? 'active' : ''}`}
              onClick={() => setActiveTab('relevance')}
            >
              🎯 Relevance Analysis
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'speed' ? 'active' : ''}`}
              onClick={() => setActiveTab('speed')}
            >
              ⚡ Search Speed
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'metadata' ? 'active' : ''}`}
              onClick={() => setActiveTab('metadata')}
            >
              🏷️ Metadata Quality
            </button>
          </div>

          <div className="sidebar-section">
            <h3>⚡ Quick Stats</h3>
            {metrics && (
              <div className="sidebar-stats">
                <div className="stat">
                  <div className="stat-value">{formatPercentage(metrics.zeroResult.zeroResultRate)}</div>
                  <div className="stat-label">Zero Results</div>
                </div>
                <div className="stat">
                  <div className="stat-value" style={{ color: getRiskColor(metrics.overallScore.score) }}>
                    {metrics.overallScore.score}
                  </div>
                  <div className="stat-label">Risk Score</div>
                </div>
                <div className="stat">
                  <div className="stat-value loss">
                    {formatCurrency(metrics.zeroResult.revenueLost).replace('$', '')}
                  </div>
                  <div className="stat-label">Monthly Loss</div>
                </div>
                <div className="stat">
                  <div className="stat-value recovery">
                    {formatCurrency(metrics.overallScore.estimatedRevenueRecovery).replace('$', '')}
                  </div>
                  <div className="stat-label">Recoverable</div>
                </div>
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <h3>⏰ Time Range</h3>
            <div className="time-selector">
              <button 
                className={`time-btn ${timeRange === '7d' ? 'active' : ''}`}
                onClick={() => setTimeRange('7d')}
              >
                7 Days
              </button>
              <button 
                className={`time-btn ${timeRange === '30d' ? 'active' : ''}`}
                onClick={() => setTimeRange('30d')}
              >
                30 Days
              </button>
              <button 
                className={`time-btn ${timeRange === '90d' ? 'active' : ''}`}
                onClick={() => setTimeRange('90d')}
              >
                90 Days
              </button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>📤 Export</h3>
            <div className="export-actions">
              <button className="btn btn-sm btn-outline" onClick={() => exportReport('pdf')}>
                📄 PDF Report
              </button>
              <button className="btn btn-sm btn-outline" onClick={() => exportReport('csv')}>
                📊 CSV Data
              </button>
              <button className="btn btn-sm btn-outline" onClick={() => exportReport('json')}>
                🔧 JSON Data
              </button>
            </div>
          </div>
        </aside>

        <main className="main-content">
          {renderMainContent()}
        </main>
      </div>

      {/* Notifications container */}
      <div className="notifications-container"></div>
    </div>
  );
};

export default SearchAbandonmentRisk;