// PersonalizationMaturityScore.tsx - Complete Implementation
import React, { useState, useEffect } from 'react';
import '/src/PersonalizationMaturityScore.css';

// ====================== Types & Interfaces ======================
interface PersonalizationMaturityScore {
  overall: {
    score: number;
    maturityLevel: 'foundational' | 'intermediate' | 'advanced' | 'cutting-edge' | 'transformative';
    readinessIndex: number;
    estimatedLift: {
      conversion: number;
      aov: number;
      retention: number;
      ltv: number;
    };
    timeToValue: string;
    implementationComplexity: 'low' | 'medium' | 'high' | 'very-high';
  };
  
  dataReadiness: DataReadinessMetrics;
  segmentationIntelligence: SegmentationIntelligenceMetrics;
  personalizationEngine: PersonalizationEngineMetrics;
  channelCoverage: ChannelCoverageMetrics;
  recommendationMaturity: RecommendationMaturityMetrics;
  behavioralTriggers: BehavioralTriggerMetrics;
  experimentationReadiness: ExperimentationReadinessMetrics;
  aiAutomation: AIAutomationMetrics;
  governanceCompliance: GovernanceComplianceMetrics;
  roiImpact: ROIImpactMetrics;
  multimodalIntelligence: MultimodalIntelligenceMetrics;
  predictiveJourney: PredictiveJourneyMetrics;
  realTimeSegmentation: RealTimeSegmentationMetrics;
  generativeCapability: GenerativeCapabilityMetrics;
  contextAwareness: ContextAwarenessMetrics;
  emotionalModeling: EmotionalModelingMetrics;
  zeroPartyData: ZeroPartyDataMetrics;
  multiObjectiveOptimization: MultiObjectiveOptimizationMetrics;
  realTimeDecisioning: RealTimeDecisioningMetrics;
  privacyCompliance: PrivacyComplianceMetrics;
  crossChannelCohesion: CrossChannelCohesionMetrics;
  adaptiveExperimentation: AdaptiveExperimentationMetrics;
  implementationRoadmap: ImplementationRoadmap;
  competitiveBenchmarks: CompetitiveBenchmarks;
}

interface DataReadinessMetrics {
  score: number;
  dataQuality: {
    completeness: number;
    accuracy: number;
    consistency: number;
    timeliness: number;
  };
  dataDepth: {
    demographic: number;
    behavioral: number;
    transactional: number;
    psychographic: number;
  };
  dataFreshness: {
    realTime: number;
    hourly: number;
    daily: number;
    weekly: number;
  };
  dataUnification: {
    cdpIntegration: boolean;
    identityResolution: number;
    singleCustomerView: boolean;
    dataSilos: number;
  };
  recommendations: string[];
}

interface SegmentationIntelligenceMetrics {
  score: number;
  sophisticationLevel: 'rule-based' | 'behavioral' | 'predictive' | 'real-time' | 'adaptive';
  segments: Array<{
    type: string;
    count: number;
    accuracy: number;
    usageRate: number;
  }>;
  capabilities: {
    ruleBased: boolean;
    behavioral: boolean;
    predictive: boolean;
    realTime: boolean;
    microSegments: boolean;
  };
  segmentPerformance: Array<{
    segment: string;
    conversionRate: number;
    aov: number;
    retention: number;
  }>;
}

interface PersonalizationEngineMetrics {
  score: number;
  capabilities: {
    dynamicContent: boolean;
    adaptiveRecommendations: boolean;
    contextualExperiences: boolean;
    journeyOrchestration: boolean;
    realTimeDecisioning: boolean;
  };
  performance: {
    latency: number;
    throughput: number;
    accuracy: number;
    coverage: number;
  };
  contentTypes: Array<{
    type: string;
    personalized: boolean;
    effectiveness: number;
  }>;
}

interface ChannelCoverageMetrics {
  score: number;
  channels: Array<{
    channel: string;
    coverage: number;
    sophistication: number;
    integration: number;
  }>;
  consistencyScore: number;
  omnichannelScore: number;
  gaps: Array<{
    channel: string;
    gap: string;
    impact: number;
  }>;
}

interface RecommendationMaturityMetrics {
  score: number;
  algorithmTypes: {
    static: boolean;
    heuristic: boolean;
    collaborative: boolean;
    contentBased: boolean;
    machineLearning: boolean;
    deepLearning: boolean;
    reinforcementLearning: boolean;
  };
  performance: {
    clickThroughRate: number;
    conversionRate: number;
    revenuePerRec: number;
    diversityScore: number;
  };
  recommendationTypes: Array<{
    type: string;
    active: boolean;
    performance: number;
  }>;
}

interface BehavioralTriggerMetrics {
  score: number;
  trackingCapabilities: {
    realTimeEvents: boolean;
    userActions: boolean;
    systemEvents: boolean;
    crossDevice: boolean;
  };
  triggers: Array<{
    type: string;
    active: boolean;
    effectiveness: number;
    automationLevel: number;
  }>;
  workflows: Array<{
    workflow: string;
    complexity: number;
    automation: number;
    results: number;
  }>;
}

interface ExperimentationReadinessMetrics {
  score: number;
  capabilities: {
    abTesting: boolean;
    multivariate: boolean;
    multiArmedBandits: boolean;
    upliftModeling: boolean;
    personalizationTesting: boolean;
  };
  infrastructure: {
    tooling: number;
    velocity: number;
    statisticalRigor: number;
    analysisDepth: number;
  };
  successRate: number;
}

interface AIAutomationMetrics {
  score: number;
  decisioning: {
    automated: boolean;
    optimization: boolean;
    selfLearning: boolean;
    explainable: boolean;
  };
  contentGeneration: {
    automated: boolean;
    personalized: boolean;
    dynamic: boolean;
    quality: number;
  };
  journeyOrchestration: {
    automated: boolean;
    adaptive: boolean;
    predictive: boolean;
    crossChannel: boolean;
  };
  automationLevel: number;
}

interface GovernanceComplianceMetrics {
  score: number;
  privacy: {
    gdprCompliant: boolean;
    ccpaCompliant: boolean;
    consentManagement: boolean;
    dataMinimization: boolean;
  };
  ethical: {
    biasMonitoring: boolean;
    fairnessTesting: boolean;
    transparency: boolean;
    accountability: boolean;
  };
  policies: Array<{
    policy: string;
    implemented: boolean;
    enforcement: number;
  }>;
  audits: {
    frequency: string;
    lastAudit: string;
    findings: number;
  };
}

interface ROIImpactMetrics {
  score: number;
  estimatedUplift: {
    conversion: number;
    aov: number;
    frequency: number;
    ltv: number;
    retention: number;
  };
  roiProjection: {
    investment: number;
    annualReturn: number;
    paybackPeriod: string;
    roi: number;
  };
  impactAreas: Array<{
    area: string;
    impact: number;
    timeline: string;
  }>;
}

// Advanced Features Interfaces
interface MultimodalIntelligenceMetrics {
  score: number;
  modalities: {
    text: boolean;
    image: boolean;
    behavioral: boolean;
    voice: boolean;
    visualEmbeddings: boolean;
    video: boolean;
  };
  integrationLevel: number;
  effectiveness: {
    search: number;
    recommendations: number;
    catalog: number;
    discovery: number;
  };
  useCases: Array<{
    useCase: string;
    implemented: boolean;
    performance: number;
  }>;
}

interface PredictiveJourneyMetrics {
  score: number;
  journeyStages: Array<{
    stage: string;
    predictionAccuracy: number;
    interventionEffectiveness: number;
  }>;
  modelingApproach: {
    sequenceModeling: boolean;
    transformers: boolean;
    reinforcementLearning: boolean;
    timeSeries: boolean;
  };
  forecastAccuracy: number;
  interventions: Array<{
    journeyPoint: string;
    intervention: string;
    successRate: number;
  }>;
}

interface RealTimeSegmentationMetrics {
  score: number;
  capabilities: {
    streamingEvents: boolean;
    millisecondCreation: boolean;
    ephemeralSegments: boolean;
    dynamicAttributes: boolean;
  };
  performance: {
    latency: number;
    segmentLifespan: number;
    accuracy: number;
    coverage: number;
  };
  microSegmentTypes: Array<{
    type: string;
    active: boolean;
    size: number;
  }>;
}

interface GenerativeCapabilityMetrics {
  score: number;
  capabilities: {
    dynamicCopy: boolean;
    productDescriptions: boolean;
    landingPages: boolean;
    curatedBundles: boolean;
    emailContent: boolean;
  };
  quality: {
    relevance: number;
    personalization: number;
    conversionImpact: number;
    brandAlignment: number;
  };
  automationLevel: number;
}

interface ContextAwarenessMetrics {
  score: number;
  contextSignals: {
    time: boolean;
    location: boolean;
    device: boolean;
    affinity: boolean;
    priceSensitivity: boolean;
    inventory: boolean;
    weather: boolean;
  };
  signalQuality: number;
  integrationDepth: number;
  useCases: Array<{
    context: string;
    useCase: string;
    effectiveness: number;
  }>;
}

interface EmotionalModelingMetrics {
  score: number;
  capabilities: {
    visualPreference: boolean;
    emotionalPatterns: boolean;
    aestheticEmbeddings: boolean;
    moodDetection: boolean;
  };
  modelingApproach: {
    vlms: boolean;
    sentimentAnalysis: boolean;
    behavioralClusters: boolean;
    neuralNetworks: boolean;
  };
  accuracy: number;
}

interface ZeroPartyDataMetrics {
  score: number;
  collectionMethods: {
    surveys: boolean;
    quizzes: boolean;
    preferenceCenters: boolean;
    interactiveTools: boolean;
  };
  activation: {
    integration: number;
    freshness: number;
    coverage: number;
    effectiveness: number;
  };
  dataQuality: number;
}

interface MultiObjectiveOptimizationMetrics {
  score: number;
  objectives: Array<{
    objective: string;
    weight: number;
    optimized: boolean;
  }>;
  optimizationApproach: {
    reinforcementLearning: boolean;
    multiObjectiveAlgorithms: boolean;
    constraintOptimization: boolean;
  };
  performance: {
    engagement: number;
    conversion: number;
    profitability: number;
    balanceScore: number;
  };
}

interface RealTimeDecisioningMetrics {
  score: number;
  infrastructure: {
    latency: number;
    throughput: number;
    scalability: number;
    reliability: number;
  };
  capabilities: {
    sub100ms: boolean;
    highThroughput: boolean;
    faultTolerant: boolean;
    distributed: boolean;
  };
  performanceMetrics: {
    p99Latency: number;
    errorRate: number;
    availability: number;
  };
}

interface PrivacyComplianceMetrics {
  score: number;
  technologies: {
    differentialPrivacy: boolean;
    federatedLearning: boolean;
    onDevice: boolean;
    homomorphicEncryption: boolean;
  };
  practices: {
    dataMinimization: boolean;
    purposeLimitation: boolean;
    storageLimitation: boolean;
    anonymization: boolean;
  };
  complianceScore: number;
}

interface CrossChannelCohesionMetrics {
  score: number;
  channels: Array<{
    channel: string;
    alignment: number;
    consistency: number;
    integration: number;
  }>;
  omnichannelScore: number;
  gaps: Array<{
    channelPair: string;
    gap: string;
    impact: number;
  }>;
}

interface AdaptiveExperimentationMetrics {
  score: number;
  capabilities: {
    multiArmedBandits: boolean;
    bayesianTesting: boolean;
    upliftModeling: boolean;
    personalizedTesting: boolean;
  };
  performance: {
    testVelocity: number;
    learningRate: number;
    optimizationSpeed: number;
  };
  automationLevel: number;
}

interface ImplementationRoadmap {
  phases: Array<{
    phase: number;
    name: string;
    duration: string;
    cost: number;
    capabilities: string[];
    impact: number;
  }>;
  timeline: {
    totalDuration: string;
    totalCost: number;
    roiTimeline: string;
    criticalPath: string[];
  };
}

interface CompetitiveBenchmarks {
  competitors: Array<{
    name: string;
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
    gap: number;
  }>;
  industryAverage: number;
  topPercentile: number;
  gapAnalysis: Array<{
    area: string;
    yourScore: number;
    industryAvg: number;
    topPerformer: number;
  }>;
}

// ====================== Main Component ======================
const PersonalizationMaturityScore: React.FC = () => {
  // State Management
  const [score, setScore] = useState<PersonalizationMaturityScore | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  
  // Initialize Mock Data
  useEffect(() => {
    const initializeData = () => {
      const mockScore: PersonalizationMaturityScore = {
        overall: {
          score: 68,
          maturityLevel: 'intermediate',
          readinessIndex: 72,
          estimatedLift: {
            conversion: 18.5,
            aov: 12.3,
            retention: 25.7,
            ltv: 42.8
          },
          timeToValue: '4-6 months',
          implementationComplexity: 'high'
        },
        
        dataReadiness: {
          score: 72,
          dataQuality: {
            completeness: 75,
            accuracy: 82,
            consistency: 68,
            timeliness: 63
          },
          dataDepth: {
            demographic: 85,
            behavioral: 62,
            transactional: 78,
            psychographic: 35
          },
          dataFreshness: {
            realTime: 25,
            hourly: 45,
            daily: 78,
            weekly: 92
          },
          dataUnification: {
            cdpIntegration: true,
            identityResolution: 68,
            singleCustomerView: true,
            dataSilos: 42
          },
          recommendations: [
            'Implement real-time data streaming pipeline',
            'Enhance behavioral data collection',
            'Improve identity resolution accuracy',
            'Reduce data silos by 30%'
          ]
        },
        
        segmentationIntelligence: {
          score: 65,
          sophisticationLevel: 'behavioral',
          segments: [
            { type: 'Demographic', count: 15, accuracy: 82, usageRate: 45 },
            { type: 'Behavioral', count: 28, accuracy: 68, usageRate: 62 },
            { type: 'Purchase History', count: 12, accuracy: 85, usageRate: 38 },
            { type: 'Engagement Level', count: 8, accuracy: 72, usageRate: 25 }
          ],
          capabilities: {
            ruleBased: true,
            behavioral: true,
            predictive: false,
            realTime: false,
            microSegments: false
          },
          segmentPerformance: [
            { segment: 'High Value', conversionRate: 8.5, aov: 185, retention: 42 },
            { segment: 'Cart Abandoners', conversionRate: 4.2, aov: 92, retention: 18 },
            { segment: 'New Users', conversionRate: 2.8, aov: 65, retention: 28 },
            { segment: 'Lapsing Users', conversionRate: 1.5, aov: 75, retention: 12 }
          ]
        },
        
        personalizationEngine: {
          score: 58,
          capabilities: {
            dynamicContent: true,
            adaptiveRecommendations: false,
            contextualExperiences: false,
            journeyOrchestration: false,
            realTimeDecisioning: false
          },
          performance: {
            latency: 450,
            throughput: 1200,
            accuracy: 72,
            coverage: 45
          },
          contentTypes: [
            { type: 'Product Recommendations', personalized: true, effectiveness: 68 },
            { type: 'Email Content', personalized: true, effectiveness: 62 },
            { type: 'Website Banners', personalized: false, effectiveness: 0 },
            { type: 'Push Notifications', personalized: true, effectiveness: 58 },
            { type: 'Search Results', personalized: false, effectiveness: 0 }
          ]
        },
        
        channelCoverage: {
          score: 62,
          channels: [
            { channel: 'Web', coverage: 85, sophistication: 68, integration: 75 },
            { channel: 'Mobile App', coverage: 72, sophistication: 62, integration: 68 },
            { channel: 'Email', coverage: 78, sophistication: 58, integration: 82 },
            { channel: 'Push Notifications', coverage: 65, sophistication: 48, integration: 55 },
            { channel: 'SMS', coverage: 35, sophistication: 28, integration: 32 },
            { channel: 'Paid Ads', coverage: 42, sophistication: 35, integration: 38 }
          ],
          consistencyScore: 68,
          omnichannelScore: 58,
          gaps: [
            { channel: 'Mobile App', gap: 'No contextual personalization', impact: 75 },
            { channel: 'Paid Ads', gap: 'Limited retargeting personalization', impact: 65 },
            { channel: 'Email', gap: 'Static segmentation only', impact: 55 }
          ]
        },
        
        recommendationMaturity: {
          score: 52,
          algorithmTypes: {
            static: true,
            heuristic: true,
            collaborative: false,
            contentBased: false,
            machineLearning: false,
            deepLearning: false,
            reinforcementLearning: false
          },
          performance: {
            clickThroughRate: 3.8,
            conversionRate: 2.5,
            revenuePerRec: 1.85,
            diversityScore: 42
          },
          recommendationTypes: [
            { type: 'Popular Products', active: true, performance: 62 },
            { type: 'Recently Viewed', active: true, performance: 58 },
            { type: 'Frequently Bought Together', active: false, performance: 0 },
            { type: 'Personalized Recommendations', active: false, performance: 0 },
            { type: 'Trending Items', active: true, performance: 45 }
          ]
        },
        
        behavioralTriggers: {
          score: 48,
          trackingCapabilities: {
            realTimeEvents: false,
            userActions: true,
            systemEvents: false,
            crossDevice: false
          },
          triggers: [
            { type: 'Cart Abandonment', active: true, effectiveness: 65, automationLevel: 75 },
            { type: 'Browse Abandonment', active: false, effectiveness: 0, automationLevel: 0 },
            { type: 'Price Drop Alert', active: true, effectiveness: 58, automationLevel: 62 },
            { type: 'Back in Stock', active: false, effectiveness: 0, automationLevel: 0 },
            { type: 'Personalized Replenishment', active: false, effectiveness: 0, automationLevel: 0 }
          ],
          workflows: [
            { workflow: 'Welcome Series', complexity: 65, automation: 85, results: 72 },
            { workflow: 'Re-engagement', complexity: 58, automation: 62, results: 48 },
            { workflow: 'Cross-sell', complexity: 42, automation: 35, results: 38 },
            { workflow: 'Upsell', complexity: 35, automation: 28, results: 32 }
          ]
        },
        
        experimentationReadiness: {
          score: 45,
          capabilities: {
            abTesting: true,
            multivariate: false,
            multiArmedBandits: false,
            upliftModeling: false,
            personalizationTesting: false
          },
          infrastructure: {
            tooling: 58,
            velocity: 42,
            statisticalRigor: 68,
            analysisDepth: 55
          },
          successRate: 35
        },
        
        aiAutomation: {
          score: 38,
          decisioning: {
            automated: false,
            optimization: false,
            selfLearning: false,
            explainable: false
          },
          contentGeneration: {
            automated: false,
            personalized: false,
            dynamic: false,
            quality: 0
          },
          journeyOrchestration: {
            automated: false,
            adaptive: false,
            predictive: false,
            crossChannel: false
          },
          automationLevel: 25
        },
        
        governanceCompliance: {
          score: 82,
          privacy: {
            gdprCompliant: true,
            ccpaCompliant: true,
            consentManagement: true,
            dataMinimization: true
          },
          ethical: {
            biasMonitoring: false,
            fairnessTesting: false,
            transparency: true,
            accountability: true
          },
          policies: [
            { policy: 'Data Retention Policy', implemented: true, enforcement: 85 },
            { policy: 'Consent Management', implemented: true, enforcement: 78 },
            { policy: 'Bias Mitigation', implemented: false, enforcement: 0 },
            { policy: 'Algorithmic Transparency', implemented: false, enforcement: 0 }
          ],
          audits: {
            frequency: 'Quarterly',
            lastAudit: '2024-01-15',
            findings: 3
          }
        },
        
        roiImpact: {
          score: 65,
          estimatedUplift: {
            conversion: 18.5,
            aov: 12.3,
            frequency: 8.7,
            ltv: 42.8,
            retention: 25.7
          },
          roiProjection: {
            investment: 250000,
            annualReturn: 1250000,
            paybackPeriod: '6 months',
            roi: 500
          },
          impactAreas: [
            { area: 'Search Personalization', impact: 85, timeline: 'Q2 2024' },
            { area: 'Email Personalization', impact: 75, timeline: 'Q3 2024' },
            { area: 'Recommendation Engine', impact: 90, timeline: 'Q4 2024' },
            { area: 'Cross-channel Consistency', impact: 65, timeline: 'Q1 2025' }
          ]
        },
        
        // Advanced Features
        multimodalIntelligence: {
          score: 28,
          modalities: {
            text: true,
            image: false,
            behavioral: true,
            voice: false,
            visualEmbeddings: false,
            video: false
          },
          integrationLevel: 35,
          effectiveness: {
            search: 25,
            recommendations: 18,
            catalog: 12,
            discovery: 8
          },
          useCases: [
            { useCase: 'Visual Search', implemented: false, performance: 0 },
            { useCase: 'Voice Commerce', implemented: false, performance: 0 },
            { useCase: 'Behavioral Recommendations', implemented: true, performance: 48 },
            { useCase: 'Text-based Personalization', implemented: true, performance: 62 }
          ]
        },
        
        predictiveJourney: {
          score: 22,
          journeyStages: [
            { stage: 'Awareness', predictionAccuracy: 35, interventionEffectiveness: 28 },
            { stage: 'Consideration', predictionAccuracy: 42, interventionEffectiveness: 35 },
            { stage: 'Purchase', predictionAccuracy: 58, interventionEffectiveness: 45 },
            { stage: 'Post-Purchase', predictionAccuracy: 38, interventionEffectiveness: 32 },
            { stage: 'Churn Risk', predictionAccuracy: 25, interventionEffectiveness: 18 }
          ],
          modelingApproach: {
            sequenceModeling: false,
            transformers: false,
            reinforcementLearning: false,
            timeSeries: true
          },
          forecastAccuracy: 38,
          interventions: [
            { journeyPoint: 'Cart Abandonment', intervention: 'Discount Offer', successRate: 42 },
            { journeyPoint: 'Product View', intervention: 'Related Products', successRate: 38 },
            { journeyPoint: 'Churn Risk', intervention: 'Win-back Campaign', successRate: 25 }
          ]
        },
        
        realTimeSegmentation: {
          score: 18,
          capabilities: {
            streamingEvents: false,
            millisecondCreation: false,
            ephemeralSegments: false,
            dynamicAttributes: false
          },
          performance: {
            latency: 0,
            segmentLifespan: 0,
            accuracy: 0,
            coverage: 0
          },
          microSegmentTypes: [
            { type: 'Real-time Intent', active: false, size: 0 },
            { type: 'Session-based', active: false, size: 0 },
            { type: 'Event-triggered', active: false, size: 0 }
          ]
        },
        
        generativeCapability: {
          score: 15,
          capabilities: {
            dynamicCopy: false,
            productDescriptions: false,
            landingPages: false,
            curatedBundles: false,
            emailContent: false
          },
          quality: {
            relevance: 0,
            personalization: 0,
            conversionImpact: 0,
            brandAlignment: 0
          },
          automationLevel: 0
        },
        
        contextAwareness: {
          score: 42,
          contextSignals: {
            time: true,
            location: false,
            device: true,
            affinity: false,
            priceSensitivity: false,
            inventory: false,
            weather: false
          },
          signalQuality: 58,
          integrationDepth: 45,
          useCases: [
            { context: 'Time of Day', useCase: 'Email Send Time Optimization', effectiveness: 65 },
            { context: 'Device Type', useCase: 'Mobile Optimization', effectiveness: 58 },
            { context: 'Location', useCase: 'Localized Content', effectiveness: 0 }
          ]
        },
        
        emotionalModeling: {
          score: 12,
          capabilities: {
            visualPreference: false,
            emotionalPatterns: false,
            aestheticEmbeddings: false,
            moodDetection: false
          },
          modelingApproach: {
            vlms: false,
            sentimentAnalysis: false,
            behavioralClusters: false,
            neuralNetworks: false
          },
          accuracy: 0
        },
        
        zeroPartyData: {
          score: 35,
          collectionMethods: {
            surveys: true,
            quizzes: false,
            preferenceCenters: true,
            interactiveTools: false
          },
          activation: {
            integration: 42,
            freshness: 58,
            coverage: 35,
            effectiveness: 28
          },
          dataQuality: 65
        },
        
        multiObjectiveOptimization: {
          score: 18,
          objectives: [
            { objective: 'Engagement', weight: 40, optimized: true },
            { objective: 'Conversion', weight: 35, optimized: true },
            { objective: 'Profitability', weight: 25, optimized: false },
            { objective: 'Retention', weight: 20, optimized: false }
          ],
          optimizationApproach: {
            reinforcementLearning: false,
            multiObjectiveAlgorithms: false,
            constraintOptimization: false
          },
          performance: {
            engagement: 65,
            conversion: 58,
            profitability: 0,
            balanceScore: 28
          }
        },
        
        realTimeDecisioning: {
          score: 25,
          infrastructure: {
            latency: 450,
            throughput: 1200,
            scalability: 42,
            reliability: 78
          },
          capabilities: {
            sub100ms: false,
            highThroughput: false,
            faultTolerant: true,
            distributed: false
          },
          performanceMetrics: {
            p99Latency: 1200,
            errorRate: 1.8,
            availability: 99.5
          }
        },
        
        privacyCompliance: {
          score: 68,
          technologies: {
            differentialPrivacy: false,
            federatedLearning: false,
            onDevice: false,
            homomorphicEncryption: false
          },
          practices: {
            dataMinimization: true,
            purposeLimitation: true,
            storageLimitation: true,
            anonymization: false
          },
          complianceScore: 82
        },
        
        crossChannelCohesion: {
          score: 55,
          channels: [
            { channel: 'Web → Email', alignment: 68, consistency: 58, integration: 65 },
            { channel: 'App → Push', alignment: 62, consistency: 52, integration: 58 },
            { channel: 'Email → SMS', alignment: 35, consistency: 28, integration: 32 },
            { channel: 'Ads → Web', alignment: 42, consistency: 38, integration: 45 }
          ],
          omnichannelScore: 48,
          gaps: [
            { channelPair: 'Web → App', gap: 'Inconsistent user experience', impact: 75 },
            { channelPair: 'Email → Push', gap: 'Message timing misalignment', impact: 62 },
            { channelPair: 'Ads → Landing Pages', gap: 'Messaging disconnect', impact: 68 }
          ]
        },
        
        adaptiveExperimentation: {
          score: 28,
          capabilities: {
            multiArmedBandits: false,
            bayesianTesting: false,
            upliftModeling: false,
            personalizedTesting: false
          },
          performance: {
            testVelocity: 35,
            learningRate: 0,
            optimizationSpeed: 0
          },
          automationLevel: 18
        },
        
        implementationRoadmap: {
          phases: [
            {
              phase: 1,
              name: 'Foundation & Data',
              duration: '3 months',
              cost: 75000,
              capabilities: ['Enhanced data collection', 'CDP integration', 'Basic segmentation'],
              impact: 25
            },
            {
              phase: 2,
              name: 'Core Personalization',
              duration: '4 months',
              cost: 125000,
              capabilities: ['Advanced segmentation', 'Recommendation engine', 'Email personalization'],
              impact: 45
            },
            {
              phase: 3,
              name: 'Advanced Capabilities',
              duration: '5 months',
              cost: 200000,
              capabilities: ['Predictive modeling', 'Cross-channel orchestration', 'Real-time decisioning'],
              impact: 75
            },
            {
              phase: 4,
              name: 'AI & Automation',
              duration: '6 months',
              cost: 300000,
              capabilities: ['Generative AI', 'Self-optimizing systems', 'Full automation'],
              impact: 95
            }
          ],
          timeline: {
            totalDuration: '18 months',
            totalCost: 700000,
            roiTimeline: '12 months',
            criticalPath: ['CDP Implementation', 'ML Platform Setup', 'Cross-channel Integration']
          }
        },
        
        competitiveBenchmarks: {
          competitors: [
            {
              name: 'Amazon',
              overallScore: 92,
              strengths: ['AI-powered recommendations', 'Real-time personalization', 'Cross-channel integration'],
              weaknesses: ['Privacy concerns', 'Complexity'],
              gap: 24
            },
            {
              name: 'Netflix',
              overallScore: 88,
              strengths: ['Content personalization', 'Predictive algorithms', 'User experience'],
              weaknesses: ['Limited commerce features', 'Single vertical'],
              gap: 20
            },
            {
              name: 'Spotify',
              overallScore: 85,
              strengths: ['Discovery algorithms', 'Playlist personalization', 'User engagement'],
              weaknesses: ['Monetization personalization', 'Commerce features'],
              gap: 17
            }
          ],
          industryAverage: 58,
          topPercentile: 82,
          gapAnalysis: [
            { area: 'AI Automation', yourScore: 38, industryAvg: 45, topPerformer: 85 },
            { area: 'Real-time Capabilities', yourScore: 25, industryAvg: 38, topPerformer: 88 },
            { area: 'Cross-channel', yourScore: 55, industryAvg: 52, topPerformer: 82 },
            { area: 'Predictive Modeling', yourScore: 22, industryAvg: 35, topPerformer: 78 }
          ]
        }
      };
      
      setScore(mockScore);
      setLoading(false);
    };
    
    initializeData();
  }, []);
  
  // Utility Functions
  const getMaturityColor = (score: number) => {
    if (score >= 80) return '#4caf50'; // Cutting-edge
    if (score >= 60) return '#2196f3'; // Advanced
    if (score >= 40) return '#ff9800'; // Intermediate
    if (score >= 20) return '#ff5722'; // Foundational
    return '#f44336'; // Basic
  };
  
  const getMaturityLevel = (score: number) => {
    if (score >= 80) return 'Cutting-edge';
    if (score >= 60) return 'Advanced';
    if (score >= 40) return 'Intermediate';
    if (score >= 20) return 'Foundational';
    return 'Basic';
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
  
  // Render Components
  const renderOverview = () => {
    if (!score) return null;
    
    return (
      <div className="overview-container">
        <div className="score-header">
          <div className="main-score">
            <div className="score-circle" style={{ borderColor: getMaturityColor(score.overall.score) }}>
              <span className="score-value">{score.overall.score}</span>
              <span className="score-label">Personalization Maturity Score</span>
            </div>
            <div className="maturity-indicator" style={{ backgroundColor: getMaturityColor(score.overall.score) }}>
              {score.overall.maturityLevel.toUpperCase()}
            </div>
          </div>
          
          <div className="impact-metrics">
            <h3>📈 Estimated Impact</h3>
            <div className="impact-grid">
              <div className="impact-card">
                <div className="impact-value" style={{ color: '#4caf50' }}>
                  +{formatPercentage(score.overall.estimatedLift.conversion)}
                </div>
                <div className="impact-label">Conversion Rate</div>
              </div>
              <div className="impact-card">
                <div className="impact-value" style={{ color: '#2196f3' }}>
                  +{formatPercentage(score.overall.estimatedLift.aov)}
                </div>
                <div className="impact-label">Average Order Value</div>
              </div>
              <div className="impact-card">
                <div className="impact-value" style={{ color: '#9c27b0' }}>
                  +{formatPercentage(score.overall.estimatedLift.retention)}
                </div>
                <div className="impact-label">Customer Retention</div>
              </div>
              <div className="impact-card">
                <div className="impact-value" style={{ color: '#ff9800' }}>
                  +{formatPercentage(score.overall.estimatedLift.ltv)}
                </div>
                <div className="impact-label">Lifetime Value</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="key-metrics">
          <h3>🔍 Core Capabilities Assessment</h3>
          <div className="metrics-grid">
            <div className="metric-card" onClick={() => setActiveTab('data-readiness')}>
              <div className="metric-header">
                <span className="metric-icon">📊</span>
                <span className="metric-title">Data Readiness</span>
              </div>
              <div className="metric-value" style={{ color: getMaturityColor(score.dataReadiness.score) }}>
                {score.dataReadiness.score}/100
              </div>
              <div className="metric-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${score.dataReadiness.score}%`,
                      backgroundColor: getMaturityColor(score.dataReadiness.score)
                    }}
                  />
                </div>
              </div>
              <div className="metric-details">
                <span>Data Quality: {score.dataReadiness.dataQuality.accuracy}%</span>
                <span>Unification: {score.dataReadiness.dataUnification.identityResolution}%</span>
              </div>
            </div>
            
            <div className="metric-card" onClick={() => setActiveTab('segmentation')}>
              <div className="metric-header">
                <span className="metric-icon">🎯</span>
                <span className="metric-title">Segmentation Intelligence</span>
              </div>
              <div className="metric-value" style={{ color: getMaturityColor(score.segmentationIntelligence.score) }}>
                {score.segmentationIntelligence.score}/100
              </div>
              <div className="metric-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${score.segmentationIntelligence.score}%`,
                      backgroundColor: getMaturityColor(score.segmentationIntelligence.score)
                    }}
                  />
                </div>
              </div>
              <div className="metric-details">
                <span>Level: {score.segmentationIntelligence.sophisticationLevel}</span>
                <span>Segments: {score.segmentationIntelligence.segments.length}</span>
              </div>
            </div>
            
            <div className="metric-card" onClick={() => setActiveTab('engine')}>
              <div className="metric-header">
                <span className="metric-icon">⚙️</span>
                <span className="metric-title">Personalization Engine</span>
              </div>
              <div className="metric-value" style={{ color: getMaturityColor(score.personalizationEngine.score) }}>
                {score.personalizationEngine.score}/100
              </div>
              <div className="metric-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${score.personalizationEngine.score}%`,
                      backgroundColor: getMaturityColor(score.personalizationEngine.score)
                    }}
                  />
                </div>
              </div>
              <div className="metric-details">
                <span>Latency: {score.personalizationEngine.performance.latency}ms</span>
                <span>Coverage: {score.personalizationEngine.performance.coverage}%</span>
              </div>
            </div>
            
            <div className="metric-card" onClick={() => setActiveTab('channels')}>
              <div className="metric-header">
                <span className="metric-icon">📱</span>
                <span className="metric-title">Channel Coverage</span>
              </div>
              <div className="metric-value" style={{ color: getMaturityColor(score.channelCoverage.score) }}>
                {score.channelCoverage.score}/100
              </div>
              <div className="metric-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${score.channelCoverage.score}%`,
                      backgroundColor: getMaturityColor(score.channelCoverage.score)
                    }}
                  />
                </div>
              </div>
              <div className="metric-details">
                <span>Channels: {score.channelCoverage.channels.length}</span>
                <span>Consistency: {score.channelCoverage.consistencyScore}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="advanced-capabilities">
          <h3>🚀 Advanced Capabilities</h3>
          <div className="capabilities-grid">
            <div className="capability-card" onClick={() => setActiveTab('multimodal')}>
              <div className="capability-header">
                <span className="capability-icon">🎭</span>
                <h4>Multimodal Intelligence</h4>
              </div>
              <div className="capability-score" style={{ color: getMaturityColor(score.multimodalIntelligence.score) }}>
                {score.multimodalIntelligence.score}/100
              </div>
              <div className="capability-details">
                <div className="modality-tags">
                  <span className={`tag ${score.multimodalIntelligence.modalities.text ? 'active' : 'inactive'}`}>Text</span>
                  <span className={`tag ${score.multimodalIntelligence.modalities.image ? 'active' : 'inactive'}`}>Image</span>
                  <span className={`tag ${score.multimodalIntelligence.modalities.voice ? 'active' : 'inactive'}`}>Voice</span>
                  <span className={`tag ${score.multimodalIntelligence.modalities.visualEmbeddings ? 'active' : 'inactive'}`}>Visual</span>
                </div>
              </div>
            </div>
            
            <div className="capability-card" onClick={() => setActiveTab('generative')}>
              <div className="capability-header">
                <span className="capability-icon">🤖</span>
                <h4>Generative AI</h4>
              </div>
              <div className="capability-score" style={{ color: getMaturityColor(score.generativeCapability.score) }}>
                {score.generativeCapability.score}/100
              </div>
              <div className="capability-details">
                <div className="capability-status">
                  <span className="status-text">
                    {score.generativeCapability.score > 50 ? 'Implemented' : 'Not Implemented'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="capability-card" onClick={() => setActiveTab('predictive-journey')}>
              <div className="capability-header">
                <span className="capability-icon">🗺️</span>
                <h4>Predictive Journey</h4>
              </div>
              <div className="capability-score" style={{ color: getMaturityColor(score.predictiveJourney.score) }}>
                {score.predictiveJourney.score}/100
              </div>
              <div className="capability-details">
                <div className="accuracy-display">
                  <span>Accuracy: {score.predictiveJourney.forecastAccuracy}%</span>
                </div>
              </div>
            </div>
            
            <div className="capability-card" onClick={() => setActiveTab('real-time')}>
              <div className="capability-header">
                <span className="capability-icon">⚡</span>
                <h4>Real-time Decisioning</h4>
              </div>
              <div className="capability-score" style={{ color: getMaturityColor(score.realTimeDecisioning.score) }}>
                {score.realTimeDecisioning.score}/100
              </div>
              <div className="capability-details">
                <div className="latency-display">
                  <span>Latency: {score.realTimeDecisioning.infrastructure.latency}ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>⚡ Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => setActiveTab('roadmap')}>
              <span className="action-icon">🗺️</span>
              <span className="action-text">View Implementation Roadmap</span>
            </button>
            <button className="action-btn" onClick={() => setActiveTab('roi')}>
              <span className="action-icon">💰</span>
              <span className="action-text">Calculate ROI Impact</span>
            </button>
            <button className="action-btn" onClick={() => setActiveTab('competitive')}>
              <span className="action-icon">🏆</span>
              <span className="action-text">Compare with Competitors</span>
            </button>
            <button className="action-btn" onClick={() => showNotification('Report exported successfully!', 'success')}>
              <span className="action-icon">📊</span>
              <span className="action-text">Export Maturity Report</span>
            </button>
          </div>
        </div>
        
        <div className="recommendations-preview">
          <h3>💡 Top Recommendations</h3>
          <div className="recommendations-list">
            {score.dataReadiness.recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="recommendation-item">
                <span className="recommendation-rank">#{index + 1}</span>
                <span className="recommendation-text">{rec}</span>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => showNotification(`Prioritizing: ${rec}`, 'info')}
                >
                  Prioritize
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderDataReadiness = () => {
    if (!score) return null;
    
    const data = score.dataReadiness;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>📊 Data Readiness Assessment</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
                {data.score}/100
              </div>
              <div className="stat-label">Overall Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.dataQuality.accuracy}%</div>
              <div className="stat-label">Data Accuracy</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.dataUnification.identityResolution}%</div>
              <div className="stat-label">Identity Resolution</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.dataSilos ? data.dataSilos : 42}%</div>
              <div className="stat-label">Data Silos</div>
            </div>
          </div>
        </div>
        
        <div className="section-content">
          <div className="metrics-grid">
            <div className="metric-card large">
              <h3>📈 Data Quality Metrics</h3>
              <div className="quality-metrics">
                <div className="quality-item">
                  <div className="quality-header">
                    <span className="quality-label">Completeness</span>
                    <span className="quality-value">{data.dataQuality.completeness}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${data.dataQuality.completeness}%`,
                        backgroundColor: data.dataQuality.completeness > 80 ? '#4caf50' : 
                                       data.dataQuality.completeness > 60 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
                
                <div className="quality-item">
                  <div className="quality-header">
                    <span className="quality-label">Accuracy</span>
                    <span className="quality-value">{data.dataQuality.accuracy}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${data.dataQuality.accuracy}%`,
                        backgroundColor: data.dataQuality.accuracy > 90 ? '#4caf50' : 
                                       data.dataQuality.accuracy > 75 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
                
                <div className="quality-item">
                  <div className="quality-header">
                    <span className="quality-label">Consistency</span>
                    <span className="quality-value">{data.dataQuality.consistency}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${data.dataQuality.consistency}%`,
                        backgroundColor: data.dataQuality.consistency > 80 ? '#4caf50' : 
                                       data.dataQuality.consistency > 60 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
                
                <div className="quality-item">
                  <div className="quality-header">
                    <span className="quality-label">Timeliness</span>
                    <span className="quality-value">{data.dataQuality.timeliness}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${data.dataQuality.timeliness}%`,
                        backgroundColor: data.dataQuality.timeliness > 80 ? '#4caf50' : 
                                       data.dataQuality.timeliness > 60 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="metric-card">
              <h3>🎯 Data Depth Analysis</h3>
              <div className="depth-metrics">
                <div className="depth-item">
                  <div className="depth-label">Demographic Data</div>
                  <div className="depth-value">{data.dataDepth.demographic}%</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${data.dataDepth.demographic}%`,
                        backgroundColor: data.dataDepth.demographic > 80 ? '#4caf50' : '#ff9800'
                      }}
                    />
                  </div>
                </div>
                
                <div className="depth-item">
                  <div className="depth-label">Behavioral Data</div>
                  <div className="depth-value">{data.dataDepth.behavioral}%</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${data.dataDepth.behavioral}%`,
                        backgroundColor: data.dataDepth.behavioral > 70 ? '#4caf50' : 
                                       data.dataDepth.behavioral > 50 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
                
                <div className="depth-item">
                  <div className="depth-label">Transactional Data</div>
                  <div className="depth-value">{data.dataDepth.transactional}%</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${data.dataDepth.transactional}%`,
                        backgroundColor: data.dataDepth.transactional > 80 ? '#4caf50' : '#ff9800'
                      }}
                    />
                  </div>
                </div>
                
                <div className="depth-item">
                  <div className="depth-label">Psychographic Data</div>
                  <div className="depth-value">{data.dataDepth.psychographic}%</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${data.dataDepth.psychographic}%`,
                        backgroundColor: data.dataDepth.psychographic > 50 ? '#ff9800' : '#f44336'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="metric-card">
              <h3>⏱️ Data Freshness</h3>
              <div className="freshness-metrics">
                <div className="freshness-item">
                  <div className="freshness-label">Real-time</div>
                  <div className="freshness-value">{data.dataFreshness.realTime}%</div>
                  <div className="freshness-status">
                    <span className={`status-badge ${data.dataFreshness.realTime > 50 ? 'good' : 'poor'}`}>
                      {data.dataFreshness.realTime > 50 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>
                
                <div className="freshness-item">
                  <div className="freshness-label">Hourly</div>
                  <div className="freshness-value">{data.dataFreshness.hourly}%</div>
                  <div className="freshness-status">
                    <span className={`status-badge ${data.dataFreshness.hourly > 60 ? 'good' : 'warning'}`}>
                      {data.dataFreshness.hourly > 60 ? 'Good' : 'Moderate'}
                    </span>
                  </div>
                </div>
                
                <div className="freshness-item">
                  <div className="freshness-label">Daily</div>
                  <div className="freshness-value">{data.dataFreshness.daily}%</div>
                  <div className="freshness-status">
                    <span className={`status-badge ${data.dataFreshness.daily > 80 ? 'good' : 'warning'}`}>
                      {data.dataFreshness.daily > 80 ? 'Excellent' : 'Good'}
                    </span>
                  </div>
                </div>
                
                <div className="freshness-item">
                  <div className="freshness-label">Weekly</div>
                  <div className="freshness-value">{data.dataFreshness.weekly}%</div>
                  <div className="freshness-status">
                    <span className="status-badge good">Excellent</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="metric-card large">
              <h3>🔗 Data Unification Status</h3>
              <div className="unification-status">
                <div className="status-grid">
                  <div className="status-item">
                    <div className="status-icon">🔄</div>
                    <div className="status-content">
                      <div className="status-title">CDP Integration</div>
                      <div className="status-value">
                        <span className={`badge ${data.dataUnification.cdpIntegration ? 'success' : 'warning'}`}>
                          {data.dataUnification.cdpIntegration ? 'Implemented' : 'Not Implemented'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="status-item">
                    <div className="status-icon">👤</div>
                    <div className="status-content">
                      <div className="status-title">Identity Resolution</div>
                      <div className="status-value">{data.dataUnification.identityResolution}%</div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${data.dataUnification.identityResolution}%`,
                            backgroundColor: data.dataUnification.identityResolution > 80 ? '#4caf50' : 
                                           data.dataUnification.identityResolution > 60 ? '#ff9800' : '#f44336'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="status-item">
                    <div className="status-icon">👁️</div>
                    <div className="status-content">
                      <div className="status-title">Single Customer View</div>
                      <div className="status-value">
                        <span className={`badge ${data.dataUnification.singleCustomerView ? 'success' : 'warning'}`}>
                          {data.dataUnification.singleCustomerView ? 'Available' : 'Partial'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="status-item">
                    <div className="status-icon">🏢</div>
                    <div className="status-content">
                      <div className="status-title">Data Silos</div>
                      <div className="status-value">{data.dataUnification.dataSilos}%</div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${data.dataUnification.dataSilos}%`,
                            backgroundColor: data.dataUnification.dataSilos < 30 ? '#4caf50' : 
                                           data.dataUnification.dataSilos < 50 ? '#ff9800' : '#f44336'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="recommendations-section">
            <h3>💡 Recommendations & Action Items</h3>
            <div className="recommendations-list">
              {data.recommendations.map((recommendation, index) => (
                <div key={index} className="recommendation-card">
                  <div className="recommendation-header">
                    <span className="recommendation-priority">Priority {index + 1}</span>
                    <span className="recommendation-impact">Impact: High</span>
                  </div>
                  <div className="recommendation-content">
                    <p>{recommendation}</p>
                  </div>
                  <div className="recommendation-actions">
                    <button className="btn btn-sm btn-primary">
                      📋 Create Action Plan
                    </button>
                    <button className="btn btn-sm btn-outline">
                      🎯 Estimate Impact
                    </button>
                    <button className="btn btn-sm btn-outline">
                      ⏱️ Set Timeline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="implementation-guide">
            <h3>🛠️ Implementation Guide</h3>
            <div className="guide-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Audit Existing Data Sources</h4>
                  <p>Identify all data sources, their quality, and integration points</p>
                  <div className="step-details">
                    <span>Duration: 2 weeks</span>
                    <span>Effort: Medium</span>
                  </div>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Implement Real-time Data Pipeline</h4>
                  <p>Set up streaming infrastructure for behavioral data</p>
                  <div className="step-details">
                    <span>Duration: 4 weeks</span>
                    <span>Effort: High</span>
                  </div>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Enhance Identity Resolution</h4>
                  <p>Improve cross-device and cross-channel user matching</p>
                  <div className="step-details">
                    <span>Duration: 3 weeks</span>
                    <span>Effort: Medium</span>
                  </div>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Reduce Data Silos</h4>
                  <p>Integrate disconnected data sources into unified CDP</p>
                  <div className="step-details">
                    <span>Duration: 6 weeks</span>
                    <span>Effort: High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderSegmentationIntelligence = () => {
    if (!score) return null;
    
    const data = score.segmentationIntelligence;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>🎯 Segmentation Intelligence Score</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
                {data.score}/100
              </div>
              <div className="stat-label">Overall Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.segments.length}</div>
              <div className="stat-label">Active Segments</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.sophisticationLevel}</div>
              <div className="stat-label">Sophistication Level</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">4/5</div>
              <div className="stat-label">Capabilities Implemented</div>
            </div>
          </div>
        </div>
        
        <div className="section-content">
          <div className="metrics-grid">
            <div className="metric-card large">
              <h3>📊 Segmentation Capabilities</h3>
              <div className="capabilities-grid">
                <div className="capability-item">
                  <div className="capability-header">
                    <span className="capability-name">Rule-based Segmentation</span>
                    <span className={`capability-status ${data.capabilities.ruleBased ? 'active' : 'inactive'}`}>
                      {data.capabilities.ruleBased ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  <div className="capability-description">
                    Static segmentation based on explicit rules and attributes
                  </div>
                </div>
                
                <div className="capability-item">
                  <div className="capability-header">
                    <span className="capability-name">Behavioral Segmentation</span>
                    <span className={`capability-status ${data.capabilities.behavioral ? 'active' : 'inactive'}`}>
                      {data.capabilities.behavioral ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  <div className="capability-description">
                    Dynamic segments based on user actions and behavior patterns
                  </div>
                </div>
                
                <div className="capability-item">
                  <div className="capability-header">
                    <span className="capability-name">Predictive Segmentation</span>
                    <span className={`capability-status ${data.capabilities.predictive ? 'active' : 'inactive'}`}>
                      {data.capabilities.predictive ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  <div className="capability-description">
                    ML-powered segments predicting future behavior and intent
                  </div>
                </div>
                
                <div className="capability-item">
                  <div className="capability-header">
                    <span className="capability-name">Real-time Segmentation</span>
                    <span className={`capability-status ${data.capabilities.realTime ? 'active' : 'inactive'}`}>
                      {data.capabilities.realTime ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  <div className="capability-description">
                    Instant segment creation based on live user actions
                  </div>
                </div>
                
                <div className="capability-item">
                  <div className="capability-header">
                    <span className="capability-name">Micro-segments</span>
                    <span className={`capability-status ${data.capabilities.microSegments ? 'active' : 'inactive'}`}>
                      {data.capabilities.microSegments ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  <div className="capability-description">
                    Highly granular segments for hyper-personalization
                  </div>
                </div>
              </div>
            </div>
            
            <div className="metric-card">
              <h3>📈 Segment Performance</h3>
              <div className="segment-performance">
                {data.segmentPerformance.map((segment, index) => (
                  <div key={index} className="performance-item">
                    <div className="segment-name">{segment.segment}</div>
                    <div className="performance-metrics">
                      <div className="metric">
                        <span className="metric-label">CVR</span>
                        <span className="metric-value">{segment.conversionRate}%</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">AOV</span>
                        <span className="metric-value">${segment.aov}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Retention</span>
                        <span className="metric-value">{segment.retention}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="metric-card">
              <h3>🎯 Active Segments</h3>
              <div className="active-segments">
                {data.segments.map((segment, index) => (
                  <div key={index} className="segment-item">
                    <div className="segment-header">
                      <span className="segment-type">{segment.type}</span>
                      <span className="segment-count">{segment.count} segments</span>
                    </div>
                    <div className="segment-stats">
                      <div className="stat">
                        <span className="stat-label">Accuracy</span>
                        <span className="stat-value">{segment.accuracy}%</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Usage</span>
                        <span className="stat-value">{segment.usageRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="sophistication-path">
            <h3>🔼 Sophistication Path</h3>
            <div className="path-steps">
              <div className={`path-step ${data.sophisticationLevel === 'rule-based' ? 'current' : ''} ${data.sophisticationLevel === 'rule-based' || data.capabilities.ruleBased ? 'completed' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Rule-based</h4>
                  <p>Static segmentation based on explicit rules</p>
                </div>
              </div>
              
              <div className={`path-step ${data.sophisticationLevel === 'behavioral' ? 'current' : ''} ${data.sophisticationLevel === 'behavioral' || data.capabilities.behavioral ? 'completed' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Behavioral</h4>
                  <p>Dynamic segments based on user behavior</p>
                </div>
              </div>
              
              <div className={`path-step ${data.sophisticationLevel === 'predictive' ? 'current' : ''} ${data.sophisticationLevel === 'predictive' || data.capabilities.predictive ? 'completed' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Predictive</h4>
                  <p>ML-powered future behavior prediction</p>
                </div>
              </div>
              
              <div className={`path-step ${data.sophisticationLevel === 'real-time' ? 'current' : ''} ${data.sophisticationLevel === 'real-time' || data.capabilities.realTime ? 'completed' : ''}`}>
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Real-time</h4>
                  <p>Instant segmentation based on live actions</p>
                </div>
              </div>
              
              <div className={`path-step ${data.sophisticationLevel === 'adaptive' ? 'current' : ''}`}>
                <div className="step-number">5</div>
                <div className="step-content">
                  <h4>Adaptive</h4>
                  <p>Self-optimizing, continuously learning segments</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="recommendations-section">
            <h3>🚀 Advancement Recommendations</h3>
            <div className="recommendations-grid">
              <div className="recommendation-card">
                <div className="rec-icon">🤖</div>
                <div className="rec-content">
                  <h4>Implement Predictive Segmentation</h4>
                  <p>Add ML models to predict customer intent and future behavior</p>
                  <div className="rec-impact">
                    <span>Impact: High</span>
                    <span>Timeline: 8 weeks</span>
                  </div>
                </div>
              </div>
              
              <div className="recommendation-card">
                <div className="rec-icon">⚡</div>
                <div className="rec-content">
                  <h4>Enable Real-time Segmentation</h4>
                  <p>Set up streaming infrastructure for instant segment creation</p>
                  <div className="rec-impact">
                    <span>Impact: Medium</span>
                    <span>Timeline: 6 weeks</span>
                  </div>
                </div>
              </div>
              
              <div className="recommendation-card">
                <div className="rec-icon">🎯</div>
                <div className="rec-content">
                  <h4>Create Micro-segments</h4>
                  <p>Develop highly granular segments for hyper-personalization</p>
                  <div className="rec-impact">
                    <span>Impact: Medium</span>
                    <span>Timeline: 4 weeks</span>
                  </div>
                </div>
              </div>
              
              <div className="recommendation-card">
                <div className="rec-icon">📊</div>
                <div className="rec-content">
                  <h4>Improve Segment Analytics</h4>
                  <p>Enhance tracking and analysis of segment performance</p>
                  <div className="rec-impact">
                    <span>Impact: Low</span>
                    <span>Timeline: 2 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderPersonalizationEngine = () => {
    if (!score) return null;
    
    const data = score.personalizationEngine;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>⚙️ Personalization Engine Capability Index</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
                {data.score}/100
              </div>
              <div className="stat-label">Capability Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.performance.latency}ms</div>
              <div className="stat-label">Response Latency</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.performance.coverage}%</div>
              <div className="stat-label">User Coverage</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.performance.accuracy}%</div>
              <div className="stat-label">Prediction Accuracy</div>
            </div>
          </div>
        </div>
        
        <div className="section-content">
          <div className="metrics-grid">
            <div className="metric-card large">
              <h3>🔧 Engine Capabilities</h3>
              <div className="capabilities-assessment">
                <div className="capability-row">
                  <div className="capability-name">Dynamic Content Delivery</div>
                  <div className="capability-status">
                    <span className={`status-badge ${data.capabilities.dynamicContent ? 'success' : 'warning'}`}>
                      {data.capabilities.dynamicContent ? '✅ Implemented' : '❌ Not Implemented'}
                    </span>
                  </div>
                  <div className="capability-impact">Impact: High</div>
                </div>
                
                <div className="capability-row">
                  <div className="capability-name">Adaptive Recommendations</div>
                  <div className="capability-status">
                    <span className={`status-badge ${data.capabilities.adaptiveRecommendations ? 'success' : 'warning'}`}>
                      {data.capabilities.adaptiveRecommendations ? '✅ Implemented' : '❌ Not Implemented'}
                    </span>
                  </div>
                  <div className="capability-impact">Impact: Very High</div>
                </div>
                
                <div className="capability-row">
                  <div className="capability-name">Contextual Experiences</div>
                  <div className="capability-status">
                    <span className={`status-badge ${data.capabilities.contextualExperiences ? 'success' : 'warning'}`}>
                      {data.capabilities.contextualExperiences ? '✅ Implemented' : '❌ Not Implemented'}
                    </span>
                  </div>
                  <div className="capability-impact">Impact: High</div>
                </div>
                
                <div className="capability-row">
                  <div className="capability-name">Journey Orchestration</div>
                  <div className="capability-status">
                    <span className={`status-badge ${data.capabilities.journeyOrchestration ? 'success' : 'warning'}`}>
                      {data.capabilities.journeyOrchestration ? '✅ Implemented' : '❌ Not Implemented'}
                    </span>
                  </div>
                  <div className="capability-impact">Impact: Medium</div>
                </div>
                
                <div className="capability-row">
                  <div className="capability-name">Real-time Decisioning</div>
                  <div className="capability-status">
                    <span className={`status-badge ${data.capabilities.realTimeDecisioning ? 'success' : 'warning'}`}>
                      {data.capabilities.realTimeDecisioning ? '✅ Implemented' : '❌ Not Implemented'}
                    </span>
                  </div>
                  <div className="capability-impact">Impact: Very High</div>
                </div>
              </div>
            </div>
            
            <div className="metric-card">
              <h3>📊 Performance Metrics</h3>
              <div className="performance-metrics">
                <div className="performance-item">
                  <div className="metric-header">
                    <span className="metric-name">Response Latency</span>
                    <span className="metric-value">{data.performance.latency}ms</span>
                  </div>
                  <div className="metric-assessment">
                    <span className={`assessment ${data.performance.latency < 100 ? 'good' : data.performance.latency < 500 ? 'warning' : 'poor'}`}>
                      {data.performance.latency < 100 ? 'Excellent' : 
                       data.performance.latency < 500 ? 'Acceptable' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>
                
                <div className="performance-item">
                  <div className="metric-header">
                    <span className="metric-name">Throughput</span>
                    <span className="metric-value">{data.performance.throughput}/sec</span>
                  </div>
                  <div className="metric-assessment">
                    <span className={`assessment ${data.performance.throughput > 1000 ? 'good' : data.performance.throughput > 500 ? 'warning' : 'poor'}`}>
                      {data.performance.throughput > 1000 ? 'High' : 
                       data.performance.throughput > 500 ? 'Moderate' : 'Low'}
                    </span>
                  </div>
                </div>
                
                <div className="performance-item">
                  <div className="metric-header">
                    <span className="metric-name">Prediction Accuracy</span>
                    <span className="metric-value">{data.performance.accuracy}%</span>
                  </div>
                  <div className="metric-assessment">
                    <span className={`assessment ${data.performance.accuracy > 80 ? 'good' : data.performance.accuracy > 60 ? 'warning' : 'poor'}`}>
                      {data.performance.accuracy > 80 ? 'High' : 
                       data.performance.accuracy > 60 ? 'Moderate' : 'Low'}
                    </span>
                  </div>
                </div>
                
                <div className="performance-item">
                  <div className="metric-header">
                    <span className="metric-name">User Coverage</span>
                    <span className="metric-value">{data.performance.coverage}%</span>
                  </div>
                  <div className="metric-assessment">
                    <span className={`assessment ${data.performance.coverage > 80 ? 'good' : data.performance.coverage > 50 ? 'warning' : 'poor'}`}>
                      {data.performance.coverage > 80 ? 'Wide' : 
                       data.performance.coverage > 50 ? 'Moderate' : 'Limited'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="metric-card">
              <h3>📝 Content Personalization</h3>
              <div className="content-types">
                {data.contentTypes.map((content, index) => (
                  <div key={index} className="content-item">
                    <div className="content-header">
                      <span className="content-name">{content.type}</span>
                      <span className={`content-status ${content.personalized ? 'personalized' : 'not-personalized'}`}>
                        {content.personalized ? 'Personalized' : 'Not Personalized'}
                      </span>
                    </div>
                    <div className="content-effectiveness">
                      <span className="effectiveness-label">Effectiveness</span>
                      <span className="effectiveness-value">{content.effectiveness}%</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${content.effectiveness}%`,
                            backgroundColor: content.effectiveness > 70 ? '#4caf50' : 
                                           content.effectiveness > 40 ? '#ff9800' : '#f44336'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="improvement-roadmap">
            <h3>🛣️ Engine Enhancement Roadmap</h3>
            <div className="roadmap-steps">
              <div className="roadmap-step">
                <div className="step-header">
                  <div className="step-phase">Phase 1</div>
                  <div className="step-duration">4 weeks</div>
                </div>
                <div className="step-content">
                  <h4>Implement Adaptive Recommendations</h4>
                  <p>Add machine learning algorithms for personalized product suggestions</p>
                  <div className="step-impact">
                    <span>Expected Impact: +15% conversion</span>
                  </div>
                </div>
                <button className="btn btn-sm btn-primary">Start Implementation</button>
              </div>
              
              <div className="roadmap-step">
                <div className="step-header">
                  <div className="step-phase">Phase 2</div>
                  <div className="step-duration">6 weeks</div>
                </div>
                <div className="step-content">
                  <h4>Enable Real-time Decisioning</h4>
                  <p>Set up low-latency infrastructure for instant personalization</p>
                  <div className="step-impact">
                    <span>Expected Impact: +12% engagement</span>
                  </div>
                </div>
                <button className="btn btn-sm btn-outline">Plan</button>
              </div>
              
              <div className="roadmap-step">
                <div className="step-header">
                  <div className="step-phase">Phase 3</div>
                  <div className="step-duration">8 weeks</div>
                </div>
                <div className="step-content">
                  <h4>Add Journey Orchestration</h4>
                  <p>Implement cross-channel journey management and automation</p>
                  <div className="step-impact">
                    <span>Expected Impact: +20% retention</span>
                  </div>
                </div>
                <button className="btn btn-sm btn-outline">Schedule</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Add more render functions for other sections...
  
  const renderROIImpact = () => {
    if (!score) return null;
    
    const data = score.roiImpact;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>💰 ROI Predictive Impact Score</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
                {data.score}/100
              </div>
              <div className="stat-label">ROI Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{formatCurrency(data.roiProjection.annualReturn)}</div>
              <div className="stat-label">Annual Return</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.roiProjection.roi}%</div>
              <div className="stat-label">ROI</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.roiProjection.paybackPeriod}</div>
              <div className="stat-label">Payback Period</div>
            </div>
          </div>
        </div>
        
        <div className="section-content">
          <div className="roi-analysis">
            <div className="roi-breakdown">
              <h3>📈 Estimated Uplift by Metric</h3>
              <div className="uplift-grid">
                <div className="uplift-card">
                  <div className="uplift-icon">🔄</div>
                  <div className="uplift-content">
                    <div className="uplift-metric">Conversion Rate</div>
                    <div className="uplift-value">+{data.estimatedUplift.conversion}%</div>
                    <div className="uplift-impact">High Impact</div>
                  </div>
                </div>
                
                <div className="uplift-card">
                  <div className="uplift-icon">💰</div>
                  <div className="uplift-content">
                    <div className="uplift-metric">Average Order Value</div>
                    <div className="uplift-value">+{data.estimatedUplift.aov}%</div>
                    <div className="uplift-impact">Medium Impact</div>
                  </div>
                </div>
                
                <div className="uplift-card">
                  <div className="uplift-icon">📅</div>
                  <div className="uplift-content">
                    <div className="uplift-metric">Purchase Frequency</div>
                    <div className="uplift-value">+{data.estimatedUplift.frequency}%</div>
                    <div className="uplift-impact">Medium Impact</div>
                  </div>
                </div>
                
                <div className="uplift-card">
                  <div className="uplift-icon">👥</div>
                  <div className="uplift-content">
                    <div className="uplift-metric">Customer Retention</div>
                    <div className="uplift-value">+{data.estimatedUplift.retention}%</div>
                    <div className="uplift-impact">High Impact</div>
                  </div>
                </div>
                
                <div className="uplift-card">
                  <div className="uplift-icon">📊</div>
                  <div className="uplift-content">
                    <div className="uplift-metric">Lifetime Value</div>
                    <div className="uplift-value">+{data.estimatedUplift.ltv}%</div>
                    <div className="uplift-impact">Very High Impact</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="financial-projections">
              <h3>💵 Financial Projections</h3>
              <div className="projection-cards">
                <div className="projection-card investment">
                  <div className="projection-header">
                    <h4>Required Investment</h4>
                    <div className="projection-icon">💼</div>
                  </div>
                  <div className="projection-value">{formatCurrency(data.roiProjection.investment)}</div>
                  <div className="projection-breakdown">
                    <div className="breakdown-item">
                      <span>Technology</span>
                      <span>{formatCurrency(data.roiProjection.investment * 0.6)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Implementation</span>
                      <span>{formatCurrency(data.roiProjection.investment * 0.3)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Training</span>
                      <span>{formatCurrency(data.roiProjection.investment * 0.1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="projection-card return">
                  <div className="projection-header">
                    <h4>Annual Return</h4>
                    <div className="projection-icon">📈</div>
                  </div>
                  <div className="projection-value">{formatCurrency(data.roiProjection.annualReturn)}</div>
                  <div className="projection-breakdown">
                    <div className="breakdown-item">
                      <span>Conversion Uplift</span>
                      <span>{formatCurrency(data.roiProjection.annualReturn * 0.4)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>AOV Increase</span>
                      <span>{formatCurrency(data.roiProjection.annualReturn * 0.3)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Retention Improvement</span>
                      <span>{formatCurrency(data.roiProjection.annualReturn * 0.3)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="projection-card roi">
                  <div className="projection-header">
                    <h4>ROI Analysis</h4>
                    <div className="projection-icon">💰</div>
                  </div>
                  <div className="projection-value" style={{ color: data.roiProjection.roi > 400 ? '#4caf50' : '#2196f3' }}>
                    {data.roiProjection.roi}%
                  </div>
                  <div className="roi-details">
                    <div className="detail-item">
                      <span>Payback Period:</span>
                      <span>{data.roiProjection.paybackPeriod}</span>
                    </div>
                    <div className="detail-item">
                      <span>Net Profit Year 1:</span>
                      <span>{formatCurrency(data.roiProjection.annualReturn - data.roiProjection.investment)}</span>
                    </div>
                    <div className="detail-item">
                      <span>Profit per $1 invested:</span>
                      <span>${(data.roiProjection.roi / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="impact-timeline">
              <h3>🗓️ Impact Timeline</h3>
              <div className="timeline">
                {data.impactAreas.map((area, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-phase">
                      <div className="phase-name">{area.area}</div>
                      <div className="phase-timeline">{area.timeline}</div>
                    </div>
                    <div className="timeline-impact">
                      <div className="impact-value">{area.impact}% impact</div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${area.impact}%`,
                            backgroundColor: area.impact > 80 ? '#4caf50' : 
                                           area.impact > 60 ? '#2196f3' : '#ff9800'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="sensitivity-analysis">
            <h3>📊 Sensitivity Analysis</h3>
            <div className="sensitivity-scenarios">
              <div className="scenario conservative">
                <div className="scenario-header">
                  <h4>Conservative Scenario</h4>
                  <div className="scenario-probability">30% probability</div>
                </div>
                <div className="scenario-details">
                  <div className="detail">
                    <span>ROI:</span>
                    <span>{Math.round(data.roiProjection.roi * 0.7)}%</span>
                  </div>
                  <div className="detail">
                    <span>Annual Return:</span>
                    <span>{formatCurrency(data.roiProjection.annualReturn * 0.7)}</span>
                  </div>
                  <div className="detail">
                    <span>Payback:</span>
                    <span>8 months</span>
                  </div>
                </div>
              </div>
              
              <div className="scenario expected">
                <div className="scenario-header">
                  <h4>Expected Scenario</h4>
                  <div className="scenario-probability">50% probability</div>
                </div>
                <div className="scenario-details">
                  <div className="detail">
                    <span>ROI:</span>
                    <span>{data.roiProjection.roi}%</span>
                  </div>
                  <div className="detail">
                    <span>Annual Return:</span>
                    <span>{formatCurrency(data.roiProjection.annualReturn)}</span>
                  </div>
                  <div className="detail">
                    <span>Payback:</span>
                    <span>{data.roiProjection.paybackPeriod}</span>
                  </div>
                </div>
              </div>
              
              <div className="scenario optimistic">
                <div className="scenario-header">
                  <h4>Optimistic Scenario</h4>
                  <div className="scenario-probability">20% probability</div>
                </div>
                <div className="scenario-details">
                  <div className="detail">
                    <span>ROI:</span>
                    <span>{Math.round(data.roiProjection.roi * 1.3)}%</span>
                  </div>
                  <div className="detail">
                    <span>Annual Return:</span>
                    <span>{formatCurrency(data.roiProjection.annualReturn * 1.3)}</span>
                  </div>
                  <div className="detail">
                    <span>Payback:</span>
                    <span>4 months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="investment-recommendation">
            <div className="recommendation-card success">
              <div className="rec-icon">✅</div>
              <div className="rec-content">
                <h4>HIGHLY RECOMMENDED INVESTMENT</h4>
                <p>
                  With a {data.roiProjection.roi}% ROI and {data.roiProjection.paybackPeriod} payback period, 
                  this personalization initiative represents a highly attractive investment opportunity. 
                  The projected annual return of {formatCurrency(data.roiProjection.annualReturn)} significantly 
                  outweighs the {formatCurrency(data.roiProjection.investment)} investment required.
                </p>
                <div className="rec-actions">
                  <button className="btn btn-success">
                    📋 Generate Business Case
                  </button>
                  <button className="btn btn-outline">
                    📊 Download ROI Report
                  </button>
                  <button className="btn btn-primary">
                    🚀 Start Implementation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderImplementationRoadmap = () => {
    if (!score) return null;
    
    const data = score.implementationRoadmap;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>🗺️ Implementation Roadmap</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value">{data.timeline.totalDuration}</div>
              <div className="stat-label">Total Duration</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{formatCurrency(data.timeline.totalCost)}</div>
              <div className="stat-label">Total Investment</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.timeline.roiTimeline}</div>
              <div className="stat-label">ROI Timeline</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.phases.length}</div>
              <div className="stat-label">Phases</div>
            </div>
          </div>
        </div>
        
        <div className="section-content">
          <div className="phase-selector">
            <div className="selector-header">
              <h3>🎯 Select Implementation Phase</h3>
            </div>
            <div className="phase-buttons">
              {data.phases.map((phase) => (
                <button
                  key={phase.phase}
                  className={`phase-btn ${selectedPhase === phase.phase ? 'active' : ''}`}
                  onClick={() => setSelectedPhase(phase.phase)}
                >
                  <span className="phase-number">Phase {phase.phase}</span>
                  <span className="phase-name">{phase.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {data.phases.map((phase) => (
            selectedPhase === phase.phase && (
              <div key={phase.phase} className="phase-details">
                <div className="phase-header">
                  <div className="phase-title">
                    <h3>Phase {phase.phase}: {phase.name}</h3>
                    <div className="phase-meta">
                      <span className="meta-item duration">⏱️ {phase.duration}</span>
                      <span className="meta-item cost">💰 {formatCurrency(phase.cost)}</span>
                      <span className="meta-item impact">📈 {phase.impact}% Impact</span>
                    </div>
                  </div>
                  <div className="phase-progress">
                    <div className="progress-circle">
                      <div className="circle-background"></div>
                      <div 
                        className="circle-progress" 
                        style={{ 
                          transform: `rotate(${phase.impact * 3.6}deg)`,
                          borderColor: phase.impact > 80 ? '#4caf50' : 
                                      phase.impact > 60 ? '#2196f3' : '#ff9800'
                        }}
                      ></div>
                      <div className="circle-value">{phase.impact}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="phase-content">
                  <div className="capabilities-list">
                    <h4>🎯 Key Capabilities</h4>
                    <div className="capabilities-grid">
                      {phase.capabilities.map((capability, index) => (
                        <div key={index} className="capability-item">
                          <span className="capability-check">✓</span>
                          <span className="capability-text">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="timeline-details">
                    <h4>🗓️ Detailed Timeline</h4>
                    <div className="timeline-steps">
                      <div className="timeline-step">
                        <div className="step-week">Week 1-2</div>
                        <div className="step-content">
                          <h5>Planning & Requirements</h5>
                          <p>Define scope, requirements, and success metrics</p>
                        </div>
                      </div>
                      
                      <div className="timeline-step">
                        <div className="step-week">Week 3-6</div>
                        <div className="step-content">
                          <h5>Development & Implementation</h5>
                          <p>Build and integrate required components</p>
                        </div>
                      </div>
                      
                      <div className="timeline-step">
                        <div className="step-week">Week 7-8</div>
                        <div className="step-content">
                          <h5>Testing & Validation</h5>
                          <p>Test functionality and validate results</p>
                        </div>
                      </div>
                      
                      <div className="timeline-step">
                        <div className="step-week">Week 9-10</div>
                        <div className="step-content">
                          <h5>Deployment & Training</h5>
                          <p>Deploy to production and train teams</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="resource-requirements">
                    <h4>👥 Resource Requirements</h4>
                    <div className="resources-grid">
                      <div className="resource-item">
                        <div className="resource-role">👨‍💻 Engineering Lead</div>
                        <div className="resource-effort">Full-time for {phase.duration}</div>
                      </div>
                      <div className="resource-item">
                        <div className="resource-role">🎯 Data Scientist</div>
                        <div className="resource-effort">Part-time (50%)</div>
                      </div>
                      <div className="resource-item">
                        <div className="resource-role">📊 Analytics</div>
                        <div className="resource-effort">Part-time (25%)</div>
                      </div>
                      <div className="resource-item">
                        <div className="resource-role">🎨 UX/Design</div>
                        <div className="resource-effort">Part-time (25%)</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="success-metrics">
                    <h4>📈 Success Metrics</h4>
                    <div className="metrics-grid">
                      <div className="metric-item">
                        <div className="metric-name">User Coverage</div>
                        <div className="metric-target">Target: 80%</div>
                        <div className="metric-impact">Impact: High</div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-name">Accuracy Improvement</div>
                        <div className="metric-target">Target: +25%</div>
                        <div className="metric-impact">Impact: High</div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-name">Response Time</div>
                        <div className="metric-target">Target: 200ms</div>
                        <div className="metric-impact">Impact: Medium</div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-name">User Satisfaction</div>
                        <div className="metric-target">Target: +15%</div>
                        <div className="metric-impact">Impact: Medium</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="phase-actions">
                  <button className="btn btn-primary">
                    🚀 Start This Phase
                  </button>
                  <button className="btn btn-outline">
                    📋 Download Detailed Plan
                  </button>
                  <button className="btn btn-outline">
                    👥 Assign Resources
                  </button>
                  <button className="btn btn-outline">
                    📊 Set Up Tracking
                  </button>
                </div>
              </div>
            )
          ))}
          
          <div className="overall-timeline">
            <h3>📅 Overall Implementation Timeline</h3>
            <div className="timeline-view">
              {data.phases.map((phase) => (
                <div key={phase.phase} className="timeline-phase">
                  <div className="phase-bar" style={{ width: '25%' }}>
                    <div className="phase-label">
                      <span className="phase-name">Phase {phase.phase}</span>
                      <span className="phase-duration">{phase.duration}</span>
                    </div>
                    <div className="phase-progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${phase.impact}%`,
                          backgroundColor: phase.impact > 80 ? '#4caf50' : 
                                         phase.impact > 60 ? '#2196f3' : '#ff9800'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="critical-path">
            <h3>🔑 Critical Path Items</h3>
            <div className="path-items">
              {data.timeline.criticalPath.map((item, index) => (
                <div key={index} className="path-item">
                  <div className="item-number">{index + 1}</div>
                  <div className="item-content">
                    <h5>{item}</h5>
                    <p>Critical dependency for project success</p>
                  </div>
                  <div className="item-status">
                    <span className="status pending">Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderMultimodalIntelligence = () => {
    if (!score) return null;
    
    const data = score.multimodalIntelligence;
    
    return (
      <div className="analysis-section">
        <div className="section-header">
          <h2>🎭 Multimodal Personalization Intelligence</h2>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
                {data.score}/100
              </div>
              <div className="stat-label">Multimodal Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {Object.values(data.modalities).filter(Boolean).length}/6
              </div>
              <div className="stat-label">Modalities Active</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.integrationLevel}%</div>
              <div className="stat-label">Integration Level</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{data.effectiveness.search}%</div>
              <div className="stat-label">Search Effectiveness</div>
            </div>
          </div>
        </div>
        
        <div className="section-content">
          <div className="modalities-overview">
            <h3>🔊 Supported Modalities</h3>
            <div className="modalities-grid">
              <div className={`modality-card ${data.modalities.text ? 'active' : 'inactive'}`}>
                <div className="modality-icon">📝</div>
                <div className="modality-name">Text</div>
                <div className="modality-status">
                  {data.modalities.text ? '✅ Active' : '❌ Inactive'}
                </div>
                <div className="modality-description">
                  Natural language understanding and text-based personalization
                </div>
              </div>
              
              <div className={`modality-card ${data.modalities.image ? 'active' : 'inactive'}`}>
                <div className="modality-icon">🖼️</div>
                <div className="modality-name">Image</div>
                <div className="modality-status">
                  {data.modalities.image ? '✅ Active' : '❌ Inactive'}
                </div>
                <div className="modality-description">
                  Visual recognition and image-based recommendations
                </div>
              </div>
              
              <div className={`modality-card ${data.modalities.behavioral ? 'active' : 'inactive'}`}>
                <div className="modality-icon">📊</div>
                <div className="modality-name">Behavioral</div>
                <div className="modality-status">
                  {data.modalities.behavioral ? '✅ Active' : '❌ Inactive'}
                </div>
                <div className="modality-description">
                  User actions, patterns, and interaction data
                </div>
              </div>
              
              <div className={`modality-card ${data.modalities.voice ? 'active' : 'inactive'}`}>
                <div className="modality-icon">🎤</div>
                <div className="modality-name">Voice</div>
                <div className="modality-status">
                  {data.modalities.voice ? '✅ Active' : '❌ Inactive'}
                </div>
                <div className="modality-description">
                  Voice commands and audio-based interactions
                </div>
              </div>
              
              <div className={`modality-card ${data.modalities.visualEmbeddings ? 'active' : 'inactive'}`}>
                <div className="modality-icon">🎨</div>
                <div className="modality-name">Visual Embeddings</div>
                <div className="modality-status">
                  {data.modalities.visualEmbeddings ? '✅ Active' : '❌ Inactive'}
                </div>
                <div className="modality-description">
                  Deep visual understanding and aesthetic matching
                </div>
              </div>
              
              <div className={`modality-card ${data.modalities.video ? 'active' : 'inactive'}`}>
                <div className="modality-icon">🎥</div>
                <div className="modality-name">Video</div>
                <div className="modality-status">
                  {data.modalities.video ? '✅ Active' : '❌ Inactive'}
                </div>
                <div className="modality-description">
                  Video content analysis and recommendations
                </div>
              </div>
            </div>
          </div>
          
          <div className="effectiveness-analysis">
            <h3>📈 Effectiveness by Area</h3>
            <div className="effectiveness-grid">
              <div className="effectiveness-item">
                <div className="area-name">Search Personalization</div>
                <div className="area-score">{data.effectiveness.search}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${data.effectiveness.search}%`,
                      backgroundColor: data.effectiveness.search > 60 ? '#4caf50' : 
                                     data.effectiveness.search > 40 ? '#ff9800' : '#f44336'
                    }}
                  />
                </div>
              </div>
              
              <div className="effectiveness-item">
                <div className="area-name">Recommendations</div>
                <div className="area-score">{data.effectiveness.recommendations}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${data.effectiveness.recommendations}%`,
                      backgroundColor: data.effectiveness.recommendations > 60 ? '#4caf50' : 
                                     data.effectiveness.recommendations > 40 ? '#ff9800' : '#f44336'
                    }}
                  />
                </div>
              </div>
              
              <div className="effectiveness-item">
                <div className="area-name">Catalog Browsing</div>
                <div className="area-score">{data.effectiveness.catalog}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${data.effectiveness.catalog}%`,
                      backgroundColor: data.effectiveness.catalog > 60 ? '#4caf50' : 
                                     data.effectiveness.catalog > 40 ? '#ff9800' : '#f44336'
                    }}
                  />
                </div>
              </div>
              
              <div className="effectiveness-item">
                <div className="area-name">Product Discovery</div>
                <div className="area-score">{data.effectiveness.discovery}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${data.effectiveness.discovery}%`,
                      backgroundColor: data.effectiveness.discovery > 60 ? '#4caf50' : 
                                     data.effectiveness.discovery > 40 ? '#ff9800' : '#f44336'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="use-cases">
            <h3>🎯 Implemented Use Cases</h3>
            <div className="use-cases-grid">
              {data.useCases.map((useCase, index) => (
                <div key={index} className={`use-case-card ${useCase.implemented ? 'implemented' : 'planned'}`}>
                  <div className="use-case-header">
                    <h4>{useCase.useCase}</h4>
                    <span className={`status ${useCase.implemented ? 'active' : 'planned'}`}>
                      {useCase.implemented ? '✅ Live' : '📅 Planned'}
                    </span>
                  </div>
                  <div className="use-case-performance">
                    <span className="performance-label">Performance</span>
                    <span className="performance-value">{useCase.performance}%</span>
                  </div>
                  <div className="use-case-description">
                    {useCase.useCase === 'Visual Search' && 'Allow users to search using images instead of text'}
                    {useCase.useCase === 'Voice Commerce' && 'Enable voice-based shopping and search'}
                    {useCase.useCase === 'Behavioral Recommendations' && 'Personalize based on user behavior patterns'}
                    {useCase.useCase === 'Text-based Personalization' && 'Use NLP to understand and personalize text content'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="implementation-roadmap">
            <h3>🛣️ Multimodal Implementation Roadmap</h3>
            <div className="roadmap-steps">
              <div className="roadmap-step">
                <div className="step-phase">Phase 1</div>
                <div className="step-content">
                  <h4>Implement Visual Search</h4>
                  <p>Add image-based search capabilities using computer vision</p>
                  <div className="step-details">
                    <span>Timeline: 8 weeks</span>
                    <span>Impact: High</span>
                    <span>Cost: $50,000</span>
                  </div>
                </div>
                <button className="btn btn-sm btn-primary">Start Now</button>
              </div>
              
              <div className="roadmap-step">
                <div className="step-phase">Phase 2</div>
                <div className="step-content">
                  <h4>Add Voice Integration</h4>
                  <p>Implement voice-based interactions and commerce</p>
                  <div className="step-details">
                    <span>Timeline: 12 weeks</span>
                    <span>Impact: Medium</span>
                    <span>Cost: $75,000</span>
                  </div>
                </div>
                <button className="btn btn-sm btn-outline">Plan</button>
              </div>
              
              <div className="roadmap-step">
                <div className="step-phase">Phase 3</div>
                <div className="step-content">
                  <h4>Enhance Visual Embeddings</h4>
                  <p>Improve aesthetic matching and visual recommendations</p>
                  <div className="step-details">
                    <span>Timeline: 6 weeks</span>
                    <span>Impact: High</span>
                    <span>Cost: $40,000</span>
                  </div>
                </div>
                <button className="btn btn-sm btn-outline">Schedule</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderChannelCoverage = () => {
  if (!score) return null;
  
  const data = score.channelCoverage;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>📱 Channel Personalization Coverage</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
              {data.score}/100
            </div>
            <div className="stat-label">Coverage Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.channels.length}</div>
            <div className="stat-label">Channels Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.consistencyScore}%</div>
            <div className="stat-label">Consistency</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.omnichannelScore}%</div>
            <div className="stat-label">Omnichannel Score</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="metrics-grid">
          <div className="metric-card large">
            <h3>🌐 Channel Performance</h3>
            <div className="channel-performance">
              <table className="channel-table">
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th>Coverage</th>
                    <th>Sophistication</th>
                    <th>Integration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.channels.map((channel, index) => (
                    <tr key={index}>
                      <td className="channel-name">{channel.channel}</td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-value">{channel.coverage}%</div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ 
                                width: `${channel.coverage}%`,
                                backgroundColor: channel.coverage > 80 ? '#4caf50' : 
                                               channel.coverage > 60 ? '#ff9800' : '#f44336'
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>{channel.sophistication}/100</td>
                      <td>{channel.integration}/100</td>
                      <td>
                        <span className={`status-badge ${channel.coverage > 70 ? 'active' : 'inactive'}`}>
                          {channel.coverage > 70 ? 'Active' : 'Limited'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="metric-card">
            <h3>🎯 Coverage Gaps</h3>
            <div className="gaps-list">
              {data.gaps.map((gap, index) => (
                <div key={index} className="gap-item">
                  <div className="gap-header">
                    <span className="gap-channel">{gap.channel}</span>
                    <span className="gap-impact">Impact: {gap.impact}/100</span>
                  </div>
                  <div className="gap-description">{gap.gap}</div>
                  <div className="gap-actions">
                    <button className="btn btn-sm btn-primary">
                      Prioritize Fix
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="metric-card">
            <h3>📊 Coverage Summary</h3>
            <div className="coverage-summary">
              <div className="summary-item">
                <div className="summary-label">Web Coverage</div>
                <div className="summary-value">{data.channels.find(c => c.channel === 'Web')?.coverage || 0}%</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Mobile App Coverage</div>
                <div className="summary-value">{data.channels.find(c => c.channel === 'Mobile App')?.coverage || 0}%</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Email Coverage</div>
                <div className="summary-value">{data.channels.find(c => c.channel === 'Email')?.coverage || 0}%</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Overall Consistency</div>
                <div className="summary-value">{data.consistencyScore}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="recommendations-section">
          <h3>🚀 Improvement Recommendations</h3>
          <div className="recommendations-grid">
            <div className="recommendation-card">
              <div className="rec-icon">📱</div>
              <div className="rec-content">
                <h4>Enhance Mobile App Personalization</h4>
                <p>Add contextual personalization features to mobile app</p>
                <div className="rec-details">
                  <span>Impact: High</span>
                  <span>Timeline: 6 weeks</span>
                </div>
              </div>
            </div>
            <div className="recommendation-card">
              <div className="rec-icon">🎯</div>
              <div className="rec-content">
                <h4>Improve Cross-channel Consistency</h4>
                <p>Ensure consistent personalization across all channels</p>
                <div className="rec-details">
                  <span>Impact: Medium</span>
                  <span>Timeline: 8 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderRecommendationMaturity = () => {
  if (!score) return null;
  
  const data = score.recommendationMaturity;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>🤖 Recommendation System Maturity</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
              {data.score}/100
            </div>
            <div className="stat-label">Maturity Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.performance.clickThroughRate}%</div>
            <div className="stat-label">CTR</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.performance.conversionRate}%</div>
            <div className="stat-label">Conversion Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">${data.performance.revenuePerRec.toFixed(2)}</div>
            <div className="stat-label">Revenue per Rec</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="metrics-grid">
          <div className="metric-card large">
            <h3>🧠 Algorithm Types</h3>
            <div className="algorithms-grid">
              {Object.entries(data.algorithmTypes).map(([key, value]) => (
                <div key={key} className={`algorithm-card ${value ? 'active' : 'inactive'}`}>
                  <div className="algorithm-name">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="algorithm-status">
                    {value ? '✅ Implemented' : '❌ Not Implemented'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="metric-card">
            <h3>📈 Performance Metrics</h3>
            <div className="performance-metrics">
              <div className="performance-item">
                <div className="metric-name">Click-through Rate</div>
                <div className="metric-value">{data.performance.clickThroughRate}%</div>
                <div className="metric-trend positive">↑ 2.5% from last month</div>
              </div>
              <div className="performance-item">
                <div className="metric-name">Conversion Rate</div>
                <div className="metric-value">{data.performance.conversionRate}%</div>
                <div className="metric-trend positive">↑ 1.8% from last month</div>
              </div>
              <div className="performance-item">
                <div className="metric-name">Revenue per Recommendation</div>
                <div className="metric-value">${data.performance.revenuePerRec.toFixed(2)}</div>
                <div className="metric-trend positive">↑ $0.15 from last month</div>
              </div>
              <div className="performance-item">
                <div className="metric-name">Diversity Score</div>
                <div className="metric-value">{data.performance.diversityScore}/100</div>
                <div className="metric-trend warning">↓ 5% from last month</div>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <h3>🎯 Recommendation Types</h3>
            <div className="recommendation-types">
              {data.recommendationTypes.map((type, index) => (
                <div key={index} className={`type-item ${type.active ? 'active' : 'inactive'}`}>
                  <div className="type-name">{type.type}</div>
                  <div className="type-performance">{type.active ? `${type.performance}% performance` : 'Not active'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderBehavioralTriggers = () => {
  if (!score) return null;
  
  const data = score.behavioralTriggers;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>⚡ Behavioral Trigger System Evaluation</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
              {data.score}/100
            </div>
            <div className="stat-label">System Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.triggers.filter(t => t.active).length}</div>
            <div className="stat-label">Active Triggers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.workflows.length}</div>
            <div className="stat-label">Automated Workflows</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Math.round(data.triggers.filter(t => t.active).reduce((a, t) => a + t.effectiveness, 0) / data.triggers.filter(t => t.active).length)}%</div>
            <div className="stat-label">Avg Effectiveness</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="metrics-grid">
          <div className="metric-card large">
            <h3>🎯 Active Triggers</h3>
            <div className="triggers-list">
              {data.triggers.map((trigger, index) => (
                <div key={index} className={`trigger-item ${trigger.active ? 'active' : 'inactive'}`}>
                  <div className="trigger-header">
                    <span className="trigger-type">{trigger.type}</span>
                    <span className="trigger-status">{trigger.active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className="trigger-stats">
                    <div className="stat">
                      <span className="stat-label">Effectiveness:</span>
                      <span className="stat-value">{trigger.effectiveness}%</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Automation:</span>
                      <span className="stat-value">{trigger.automationLevel}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="metric-card">
            <h3>🔄 Automated Workflows</h3>
            <div className="workflows-list">
              {data.workflows.map((workflow, index) => (
                <div key={index} className="workflow-item">
                  <div className="workflow-name">{workflow.workflow}</div>
                  <div className="workflow-stats">
                    <div className="stat">
                      <span>Complexity: {workflow.complexity}/100</span>
                      <span>Automation: {workflow.automation}%</span>
                      <span>Results: {workflow.results}%</span>
                    </div>
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

const renderExperimentationReadiness = () => {
  if (!score) return null;
  
  const data = score.experimentationReadiness;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>🧪 Experimentation & Optimization Readiness</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
              {data.score}/100
            </div>
            <div className="stat-label">Readiness Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Object.values(data.capabilities).filter(Boolean).length}/5</div>
            <div className="stat-label">Capabilities</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.successRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.infrastructure.velocity}/100</div>
            <div className="stat-label">Test Velocity</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="metrics-grid">
          <div className="metric-card large">
            <h3>🔧 Experimentation Capabilities</h3>
            <div className="capabilities-list">
              <div className="capability-item">
                <span className="capability-name">A/B Testing</span>
                <span className={`capability-status ${data.capabilities.abTesting ? 'active' : 'inactive'}`}>
                  {data.capabilities.abTesting ? '✅ Available' : '❌ Not Available'}
                </span>
              </div>
              <div className="capability-item">
                <span className="capability-name">Multivariate Testing</span>
                <span className={`capability-status ${data.capabilities.multivariate ? 'active' : 'inactive'}`}>
                  {data.capabilities.multivariate ? '✅ Available' : '❌ Not Available'}
                </span>
              </div>
              <div className="capability-item">
                <span className="capability-name">Multi-armed Bandits</span>
                <span className={`capability-status ${data.capabilities.multiArmedBandits ? 'active' : 'inactive'}`}>
                  {data.capabilities.multiArmedBandits ? '✅ Available' : '❌ Not Available'}
                </span>
              </div>
              <div className="capability-item">
                <span className="capability-name">Uplift Modeling</span>
                <span className={`capability-status ${data.capabilities.upliftModeling ? 'active' : 'inactive'}`}>
                  {data.capabilities.upliftModeling ? '✅ Available' : '❌ Not Available'}
                </span>
              </div>
              <div className="capability-item">
                <span className="capability-name">Personalization Testing</span>
                <span className={`capability-status ${data.capabilities.personalizationTesting ? 'active' : 'inactive'}`}>
                  {data.capabilities.personalizationTesting ? '✅ Available' : '❌ Not Available'}
                </span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <h3>⚙️ Infrastructure Quality</h3>
            <div className="infrastructure-metrics">
              <div className="metric-item">
                <span className="metric-label">Tooling Maturity</span>
                <span className="metric-value">{data.infrastructure.tooling}/100</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${data.infrastructure.tooling}%` }}
                  />
                </div>
              </div>
              <div className="metric-item">
                <span className="metric-label">Test Velocity</span>
                <span className="metric-value">{data.infrastructure.velocity}/100</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${data.infrastructure.velocity}%` }}
                  />
                </div>
              </div>
              <div className="metric-item">
                <span className="metric-label">Statistical Rigor</span>
                <span className="metric-value">{data.infrastructure.statisticalRigor}/100</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${data.infrastructure.statisticalRigor}%` }}
                  />
                </div>
              </div>
              <div className="metric-item">
                <span className="metric-label">Analysis Depth</span>
                <span className="metric-value">{data.infrastructure.analysisDepth}/100</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${data.infrastructure.analysisDepth}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderPredictiveJourney = () => {
  if (!score) return null;
  
  const data = score.predictiveJourney;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>🗺️ Predictive Journey Mapping Score</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
              {data.score}/100
            </div>
            <div className="stat-label">Journey Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.forecastAccuracy}%</div>
            <div className="stat-label">Forecast Accuracy</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.journeyStages.length}</div>
            <div className="stat-label">Stages Tracked</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.interventions.length}</div>
            <div className="stat-label">Active Interventions</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="journey-stages">
          <h3>📍 Journey Stages Analysis</h3>
          <div className="stages-grid">
            {data.journeyStages.map((stage, index) => (
              <div key={index} className="stage-card">
                <div className="stage-header">
                  <h4>{stage.stage}</h4>
                  <div className="stage-score">{stage.predictionAccuracy}% accuracy</div>
                </div>
                <div className="stage-metrics">
                  <div className="metric">
                    <span className="metric-label">Prediction Accuracy</span>
                    <span className="metric-value">{stage.predictionAccuracy}%</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${stage.predictionAccuracy}%` }}
                      />
                    </div>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Intervention Effectiveness</span>
                    <span className="metric-value">{stage.interventionEffectiveness}%</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${stage.interventionEffectiveness}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderGenerativeAI = () => {
  if (!score) return null;
  
  const data = score.generativeCapability;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>🤖 Generative AI Capability Index</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
              {data.score}/100
            </div>
            <div className="stat-label">Generative AI Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Object.values(data.capabilities).filter(Boolean).length}/5</div>
            <div className="stat-label">Capabilities</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.quality.personalization}%</div>
            <div className="stat-label">Personalization Quality</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.automationLevel}%</div>
            <div className="stat-label">Automation Level</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="capabilities-section">
          <h3>🎨 Generative Capabilities</h3>
          <div className="generative-capabilities">
            <div className="capability-item">
              <div className="capability-name">Dynamic Copy Generation</div>
              <div className={`capability-status ${data.capabilities.dynamicCopy ? 'active' : 'inactive'}`}>
                {data.capabilities.dynamicCopy ? '✅ Active' : '❌ Inactive'}
              </div>
            </div>
            <div className="capability-item">
              <div className="capability-name">Personalized Product Descriptions</div>
              <div className={`capability-status ${data.capabilities.productDescriptions ? 'active' : 'inactive'}`}>
                {data.capabilities.productDescriptions ? '✅ Active' : '❌ Inactive'}
              </div>
            </div>
            <div className="capability-item">
              <div className="capability-name">Hyper-personalized Landing Pages</div>
              <div className={`capability-status ${data.capabilities.landingPages ? 'active' : 'inactive'}`}>
                {data.capabilities.landingPages ? '✅ Active' : '❌ Inactive'}
              </div>
            </div>
            <div className="capability-item">
              <div className="capability-name">AI-curated Bundles</div>
              <div className={`capability-status ${data.capabilities.curatedBundles ? 'active' : 'inactive'}`}>
                {data.capabilities.curatedBundles ? '✅ Active' : '❌ Inactive'}
              </div>
            </div>
            <div className="capability-item">
              <div className="capability-name">Email Content Generation</div>
              <div className={`capability-status ${data.capabilities.emailContent ? 'active' : 'inactive'}`}>
                {data.capabilities.emailContent ? '✅ Active' : '❌ Inactive'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderContextAwareness = () => {
  if (!score) return null;
  
  const data = score.contextAwareness;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>🌐 Context-Aware Personalization Layer</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
              {data.score}/100
            </div>
            <div className="stat-label">Context Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Object.values(data.contextSignals).filter(Boolean).length}/7</div>
            <div className="stat-label">Signals Used</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.signalQuality}%</div>
            <div className="stat-label">Signal Quality</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.integrationDepth}%</div>
            <div className="stat-label">Integration Depth</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="context-signals">
          <h3>📡 Context Signals</h3>
          <div className="signals-grid">
            {Object.entries(data.contextSignals).map(([signal, active]) => (
              <div key={signal} className={`signal-card ${active ? 'active' : 'inactive'}`}>
                <div className="signal-name">{signal}</div>
                <div className="signal-status">
                  {active ? '✅ Active' : '❌ Inactive'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderRealTimeDecisioning = () => {
  if (!score) return null;
  
  const data = score.realTimeDecisioning;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>⚡ Real-time Decisioning Infrastructure Audit</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(data.score) }}>
              {data.score}/100
            </div>
            <div className="stat-label">Infrastructure Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.infrastructure.latency}ms</div>
            <div className="stat-label">Average Latency</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.infrastructure.throughput}/sec</div>
            <div className="stat-label">Throughput</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.performanceMetrics.availability}%</div>
            <div className="stat-label">Availability</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="infrastructure-details">
          <h3>🏗️ Infrastructure Capabilities</h3>
          <div className="capabilities-grid">
            <div className="capability-item">
              <div className="capability-name">Sub-100ms Response</div>
              <div className={`capability-status ${data.capabilities.sub100ms ? 'active' : 'inactive'}`}>
                {data.capabilities.sub100ms ? '✅ Achieved' : '❌ Not Achieved'}
              </div>
            </div>
            <div className="capability-item">
              <div className="capability-name">High Throughput</div>
              <div className={`capability-status ${data.capabilities.highThroughput ? 'active' : 'inactive'}`}>
                {data.capabilities.highThroughput ? '✅ Available' : '❌ Limited'}
              </div>
            </div>
            <div className="capability-item">
              <div className="capability-name">Fault Tolerant</div>
              <div className={`capability-status ${data.capabilities.faultTolerant ? 'active' : 'inactive'}`}>
                {data.capabilities.faultTolerant ? '✅ Implemented' : '❌ Not Implemented'}
              </div>
            </div>
            <div className="capability-item">
              <div className="capability-name">Distributed System</div>
              <div className={`capability-status ${data.capabilities.distributed ? 'active' : 'inactive'}`}>
                {data.capabilities.distributed ? '✅ Distributed' : '❌ Centralized'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderCompetitiveBenchmarks = () => {
  if (!score) return null;
  
  const data = score.competitiveBenchmarks;
  
  return (
    <div className="analysis-section">
      <div className="section-header">
        <h2>🏆 Competitive Benchmarks</h2>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: getMaturityColor(score.overall.score) }}>
              {score.overall.score}/100
            </div>
            <div className="stat-label">Your Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.industryAverage}/100</div>
            <div className="stat-label">Industry Average</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.topPercentile}/100</div>
            <div className="stat-label">Top Performers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.topPercentile - score.overall.score}</div>
            <div className="stat-label">Gap to Top</div>
          </div>
        </div>
      </div>

      <div className="section-content">
        <div className="competitors-grid">
          <h3>🤼 Competitor Analysis</h3>
          <div className="competitors-list">
            {data.competitors.map((competitor, index) => (
              <div key={index} className="competitor-card">
                <div className="competitor-header">
                  <h4>{competitor.name}</h4>
                  <div className="competitor-score" style={{ color: getMaturityColor(competitor.overallScore) }}>
                    {competitor.overallScore}/100
                  </div>
                </div>
                <div className="competitor-gap">
                  <span>Gap: {competitor.gap} points</span>
                  <span className={`gap-status ${competitor.gap > 0 ? 'negative' : 'positive'}`}>
                    {competitor.gap > 0 ? 'Behind' : 'Ahead'}
                  </span>
                </div>
                <div className="competitor-strengths">
                  <h5>Strengths</h5>
                  <ul>
                    {competitor.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="competitor-weaknesses">
                  <h5>Weaknesses</h5>
                  <ul>
                    {competitor.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

  // Add remaining render functions for other advanced features...
  const renderMainContent = () => {
  switch (activeTab) {
    case 'overview': return renderOverview();
    case 'data-readiness': return renderDataReadiness();
    case 'segmentation': return renderSegmentationIntelligence();
    case 'engine': return renderPersonalizationEngine();
    case 'channels': return renderChannelCoverage();
    case 'recommendations': return renderRecommendationMaturity();
    case 'triggers': return renderBehavioralTriggers();
    case 'experimentation': return renderExperimentationReadiness();
    case 'multimodal': return renderMultimodalIntelligence();
    case 'predictive-journey': return renderPredictiveJourney();
    case 'generative': return renderGenerativeAI();
    case 'context': return renderContextAwareness();
    case 'real-time': return renderRealTimeDecisioning();
    case 'roi': return renderROIImpact();
    case 'roadmap': return renderImplementationRoadmap();
    case 'competitive': return renderCompetitiveBenchmarks();
    default: return renderOverview();
  }
};
 
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3>Analyzing Personalization Maturity...</h3>
        <p>AI is evaluating 20+ dimensions of personalization capabilities</p>
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '85%' }}></div>
          </div>
          <div className="loading-stats">
            <span>Assessed 15 capability areas</span>
            <span>Analyzed 200+ metrics</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="personalization-maturity-score">
      <header className="app-header">
        <h1>🎯 Personalization Maturity Score Calculator</h1>
        <p className="subtitle">
          Comprehensive assessment of 20+ personalization capabilities with AI-powered recommendations
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
              className={`sidebar-btn ${activeTab === 'data-readiness' ? 'active' : ''}`}
              onClick={() => setActiveTab('data-readiness')}
            >
              📊 Data Readiness Assessment
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'segmentation' ? 'active' : ''}`}
              onClick={() => setActiveTab('segmentation')}
            >
              🎯 Segmentation Intelligence Score
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'engine' ? 'active' : ''}`}
              onClick={() => setActiveTab('engine')}
            >
              ⚙️ Personalization Engine Capability
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'channels' ? 'active' : ''}`}
              onClick={() => setActiveTab('channels')}
            >
              📱 Channel Personalization Coverage
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              🤖 Recommendation System Maturity
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'triggers' ? 'active' : ''}`}
              onClick={() => setActiveTab('triggers')}
            >
              ⚡ Behavioral Trigger System
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'experimentation' ? 'active' : ''}`}
              onClick={() => setActiveTab('experimentation')}
            >
              🧪 Experimentation Readiness
            </button>
          </div>
          
          <div className="sidebar-section">
            <h3>🚀 Advanced Features</h3>
            <button 
              className={`sidebar-btn ${activeTab === 'multimodal' ? 'active' : ''}`}
              onClick={() => setActiveTab('multimodal')}
            >
              🎭 Multimodal Intelligence
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'predictive-journey' ? 'active' : ''}`}
              onClick={() => setActiveTab('predictive-journey')}
            >
              🗺️ Predictive Journey Mapping
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'generative' ? 'active' : ''}`}
              onClick={() => setActiveTab('generative')}
            >
              🤖 Generative AI Capability
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'context' ? 'active' : ''}`}
              onClick={() => setActiveTab('context')}
            >
              🌐 Context-Aware Personalization
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'real-time' ? 'active' : ''}`}
              onClick={() => setActiveTab('real-time')}
            >
              ⚡ Real-time Decisioning
            </button>
          </div>
          
          <div className="sidebar-section">
            <h3>💼 Business Impact</h3>
            <button 
              className={`sidebar-btn ${activeTab === 'roi' ? 'active' : ''}`}
              onClick={() => setActiveTab('roi')}
            >
              💰 ROI Impact Score
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
              onClick={() => setActiveTab('roadmap')}
            >
              🗺️ Implementation Roadmap
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'competitive' ? 'active' : ''}`}
              onClick={() => setActiveTab('competitive')}
            >
              🏆 Competitive Benchmarks
            </button>
          </div>
          
          <div className="sidebar-section">
            <h3>⚡ Quick Actions</h3>
            <div className="quick-actions-sidebar">
              <button className="btn btn-sm btn-primary" onClick={() => showNotification('Report generated!', 'success')}>
                📊 Generate Report
              </button>
              <button className="btn btn-sm btn-outline" onClick={() => showNotification('Action plan created', 'info')}>
                📋 Create Action Plan
              </button>
              <button className="btn btn-sm btn-outline" onClick={() => setActiveTab('roadmap')}>
                🗺️ View Roadmap
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

export default PersonalizationMaturityScore;