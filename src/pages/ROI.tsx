// roi-dashboard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  PieChart, Pie, BarChart, Bar, LineChart, Line, RadarChart, Radar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Cell, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import pptxgen from 'pptxgenjs';

// Types
interface ROIInputs {
  // Core Financial
  netProfit: number;
  totalInvestment: number;
  costSavings: number;
  initialInvestment: number;
  annualCashInflow: number;
  discountRate: number;
  cashFlows: number[];
  
  // Marketing
  marketingRevenue: number;
  marketingCost: number;
  salesCost: number;
  newCustomers: number;
  averageOrderValue: number;
  purchaseFrequency: number;
  customerLifespan: number;
  adRevenue: number;
  adSpend: number;
  conversionRateAfter: number;
  conversionRateBefore: number;
  brandValue: number;
  brandInvestment: number;
  
  // Technology & AI
  hoursSaved: number;
  costPerHour: number;
  aiToolCost: number;
  downtimeReduced: number;
  revenuePerHour: number;
  outputAfterAI: number;
  previousOutput: number;
  operationalEfficiencyGain: number;
  deploymentCost: number;
  modelAccuracyImprovement: number;
  dataPreparationCost: number;
  
  // Operational
  outputPerHourAfter: number;
  outputPerHourBefore: number;
  errorsReduced: number;
  costPerError: number;
  automationCost: number;
  totalHoursSaved: number;
  employeeCostPerHour: number;
  unitsCompletedAfter: number;
  unitsCompletedBefore: number;
  actualOutput: number;
  maximumOutput: number;
  
  // Customer Experience
  repeatPurchaseRevenue: number;
  cxTechInvestment: number;
  retentionAfter: number;
  retentionBefore: number;
  ahtBefore: number;
  ahtAfter: number;
  customersSaved: number;
  customerLifetimeValue: number;
  supportCostSavings: number;
  aiSupportInvestment: number;
  
  // HR & Employee
  trainingBenefits: number;
  trainingCost: number;
  tasksCompletedAfter: number;
  tasksCompletedBefore: number;
  employeesRetained: number;
  costToReplace: number;
  hrInitiativeCost: number;
  productivityGains: number;
  employeeExperienceInvestment: number;
  
  // Project Management
  valueDelivered: number;
  totalProjectCost: number;
  earnedValue: number;
  plannedValue: number;
  actualCost: number;
  lossAvoided: number;
  riskControlsCost: number;
  
  // Industry Specific
  searchConversionsIncrease: number;
  manualWritingHoursSaved: number;
  timeBeforeTagging: number;
  timeAfterAI: number;
  returnsBefore: number;
  returnsAfter: number;
  aovAfterAI: number;
  aovBefore: number;
  visualSearchImplementationCost: number;
  virtualTryOnCost: number;
  smartTaggingCost: number;
  recommendationEngineCost: number;
  
  // Strategic & Growth
  revenueNewInitiatives: number;
  rndCost: number;
  marketShareGrowth: number;
  competitiveAdvantageValue: number;
  marketExpansionRevenue: number;
  marketExpansionCost: number;
  innovationRevenue: number;
  innovationCost: number;
  
  // ESG & Compliance
  esgSavings: number;
  sustainabilityIncentives: number;
  sustainabilityCost: number;
  complianceSavings: number;
  riskReductionValue: number;
  carbonCreditValue: number;
  regulatoryPenaltyAvoidance: number;
  
  // Data Quality
  valueBetterDecisions: number;
  dataImprovementCost: number;
  dataQualityScoreAfter: number;
  dataQualityScoreBefore: number;
  modelAccuracyAfter: number;
  modelAccuracyBefore: number;
  insightGenerationValue: number;
  
  // Productivity & Time-to-Market
  revenueFasterLaunch: number;
  timeSavedCost: number;
  developmentTimeBefore: number;
  developmentTimeAfter: number;
  productivityHoursSaved: number;
  processTimeBefore: number;
  processTimeAfter: number;
  campaignLaunchTimeBefore: number;
  campaignLaunchTimeAfter: number;
}

interface ROIResults {
  // Core Financial
  standardROI: number;
  costReductionROI: number;
  paybackPeriod: number;
  npv: number;
  irr: number;
  profitabilityIndex: number;
  
  // Marketing
  marketingROI: number;
  brandROI: number;
  roas: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  conversionRateLift: number;
  
  // Technology & AI
  automationROI: number;
  aiTrainingROI: number;
  systemUptimeROI: number;
  deploymentROI: number;
  
  // Operational
  efficiencyROI: number;
  errorReductionROI: number;
  timeSavingsROI: number;
  utilizationRate: number;
  
  // Customer Experience
  npsImpactROI: number;
  churnReductionROI: number;
  customerSupportROI: number;
  
  // HR & People
  trainingROI: number;
  attritionReductionROI: number;
  employeeExperienceROI: number;
  
  // Project & Execution
  strategicROI: number;
  schedulePerformance: number;
  costPerformance: number;
  riskReductionROI: number;
  
  // Industry Specific
  visualSearchROI: number;
  virtualTryOnROI: number;
  smartTaggingROI: number;
  productRecommendationROI: number;
  
  // Strategic & Growth
  innovationROI: number;
  marketShareGrowthROI: number;
  competitiveAdvantageROI: number;
  marketExpansionROI: number;
  
  // ESG & Compliance
  esgROI: number;
  riskMitigationROI: number;
  complianceSavingsROI: number;
  sustainabilityROI: number;
  
  // Data Quality & Insight
  dataQualityROI: number;
  modelAccuracyROI: number;
  decisionImpactROI: number;
  insightGenerationROI: number;
  
  // Productivity & Time-to-Market
  timeToMarketROI: number;
  productivityGainsROI: number;
  processSpeedupROI: number;
  developmentSpeedROI: number;
}

interface ROICategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  metrics: string[];
  definition: string;
  features: string[];
  steps: string[];
  formula: string;
  importance: string;
}

interface FilterState {
  timeRange: string;
  category: string;
  channel: string;
  market: string;
  compareWithLastMonth: boolean;
  showIndustryBenchmarks: boolean;
  enableAIPredictions: boolean;
}

interface AIPrediction {
  predictedROI: number;
  confidence: number;
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
  timeline: string;
}

const ROIDashboard: React.FC = () => {
  // State
  const [inputs, setInputs] = useState<ROIInputs>({
    // Core Financial
    netProfit: 150000,
    totalInvestment: 100000,
    costSavings: 120000,
    initialInvestment: 100000,
    annualCashInflow: 30000,
    discountRate: 0.1,
    cashFlows: [30000, 35000, 40000, 45000, 50000],
    
    // Marketing
    marketingRevenue: 200000,
    marketingCost: 80000,
    salesCost: 40000,
    newCustomers: 500,
    averageOrderValue: 150,
    purchaseFrequency: 3,
    customerLifespan: 5,
    adRevenue: 120000,
    adSpend: 40000,
    conversionRateAfter: 4.5,
    conversionRateBefore: 3.2,
    brandValue: 200000,
    brandInvestment: 80000,
    
    // Technology & AI
    hoursSaved: 2000,
    costPerHour: 45,
    aiToolCost: 50000,
    downtimeReduced: 120,
    revenuePerHour: 250,
    outputAfterAI: 1200,
    previousOutput: 800,
    operationalEfficiencyGain: 75000,
    deploymentCost: 60000,
    modelAccuracyImprovement: 15,
    dataPreparationCost: 25000,
    
    // Operational
    outputPerHourAfter: 25,
    outputPerHourBefore: 18,
    errorsReduced: 500,
    costPerError: 50,
    automationCost: 75000,
    totalHoursSaved: 1500,
    employeeCostPerHour: 40,
    unitsCompletedAfter: 1200,
    unitsCompletedBefore: 800,
    actualOutput: 850,
    maximumOutput: 1000,
    
    // Customer Experience
    repeatPurchaseRevenue: 180000,
    cxTechInvestment: 60000,
    retentionAfter: 85,
    retentionBefore: 72,
    ahtBefore: 8.5,
    ahtAfter: 5.2,
    customersSaved: 150,
    customerLifetimeValue: 1200,
    supportCostSavings: 90000,
    aiSupportInvestment: 35000,
    
    // HR & Employee
    trainingBenefits: 80000,
    trainingCost: 25000,
    tasksCompletedAfter: 1200,
    tasksCompletedBefore: 850,
    employeesRetained: 12,
    costToReplace: 45000,
    hrInitiativeCost: 150000,
    productivityGains: 120000,
    employeeExperienceInvestment: 70000,
    
    // Project Management
    valueDelivered: 350000,
    totalProjectCost: 200000,
    earnedValue: 180000,
    plannedValue: 200000,
    actualCost: 190000,
    lossAvoided: 120000,
    riskControlsCost: 40000,
    
    // Industry Specific
    searchConversionsIncrease: 25000,
    manualWritingHoursSaved: 800,
    timeBeforeTagging: 40,
    timeAfterAI: 8,
    returnsBefore: 12,
    returnsAfter: 6,
    aovAfterAI: 185,
    aovBefore: 145,
    visualSearchImplementationCost: 50000,
    virtualTryOnCost: 75000,
    smartTaggingCost: 30000,
    recommendationEngineCost: 60000,
    
    // Strategic & Growth
    revenueNewInitiatives: 300000,
    rndCost: 150000,
    marketShareGrowth: 15,
    competitiveAdvantageValue: 200000,
    marketExpansionRevenue: 180000,
    marketExpansionCost: 90000,
    innovationRevenue: 220000,
    innovationCost: 110000,
    
    // ESG & Compliance
    esgSavings: 75000,
    sustainabilityIncentives: 25000,
    sustainabilityCost: 60000,
    complianceSavings: 50000,
    riskReductionValue: 80000,
    carbonCreditValue: 15000,
    regulatoryPenaltyAvoidance: 100000,
    
    // Data Quality
    valueBetterDecisions: 180000,
    dataImprovementCost: 45000,
    dataQualityScoreAfter: 92,
    dataQualityScoreBefore: 68,
    modelAccuracyAfter: 94,
    modelAccuracyBefore: 78,
    insightGenerationValue: 120000,
    
    // Productivity & Time-to-Market
    revenueFasterLaunch: 150000,
    timeSavedCost: 50000,
    developmentTimeBefore: 180,
    developmentTimeAfter: 120,
    productivityHoursSaved: 2000,
    processTimeBefore: 40,
    processTimeAfter: 25,
    campaignLaunchTimeBefore: 14,
    campaignLaunchTimeAfter: 7,
  });

  const [results, setResults] = useState<ROIResults>({
    standardROI: 0,
    costReductionROI: 0,
    paybackPeriod: 0,
    npv: 0,
    irr: 0,
    profitabilityIndex: 0,
    marketingROI: 0,
    brandROI: 0,
    roas: 0,
    customerAcquisitionCost: 0,
    customerLifetimeValue: 0,
    conversionRateLift: 0,
    automationROI: 0,
    aiTrainingROI: 0,
    systemUptimeROI: 0,
    deploymentROI: 0,
    efficiencyROI: 0,
    errorReductionROI: 0,
    timeSavingsROI: 0,
    utilizationRate: 0,
    npsImpactROI: 0,
    churnReductionROI: 0,
    customerSupportROI: 0,
    trainingROI: 0,
    attritionReductionROI: 0,
    employeeExperienceROI: 0,
    strategicROI: 0,
    schedulePerformance: 0,
    costPerformance: 0,
    riskReductionROI: 0,
    visualSearchROI: 0,
    virtualTryOnROI: 0,
    smartTaggingROI: 0,
    productRecommendationROI: 0,
    innovationROI: 0,
    marketShareGrowthROI: 0,
    competitiveAdvantageROI: 0,
    marketExpansionROI: 0,
    esgROI: 0,
    riskMitigationROI: 0,
    complianceSavingsROI: 0,
    sustainabilityROI: 0,
    dataQualityROI: 0,
    modelAccuracyROI: 0,
    decisionImpactROI: 0,
    insightGenerationROI: 0,
    timeToMarketROI: 0,
    productivityGainsROI: 0,
    processSpeedupROI: 0,
    developmentSpeedROI: 0,
  });

  const [activeCategory, setActiveCategory] = useState<string>('core-financial');
  const [filters, setFilters] = useState<FilterState>({
    timeRange: '30days',
    category: 'all',
    channel: 'all',
    market: 'all',
    compareWithLastMonth: true,
    showIndustryBenchmarks: true,
    enableAIPredictions: true
  });
  const [aiPredictions, setAIPredictions] = useState<AIPrediction | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [workflowBreakdown, setWorkflowBreakdown] = useState<boolean>(false);
  
  const dashboardRef = useRef<HTMLDivElement>(null);

  // ROI Categories
  const roiCategories: ROICategory[] = [
    {
      id: 'core-financial',
      name: 'Core Financial ROI',
      description: 'Traditional financial metrics and investment analysis',
      icon: '💰',
      color: 'from-blue-900 to-blue-700',
      gradient: 'bg-gradient-to-r from-blue-900 to-blue-700',
      metrics: ['Standard ROI', 'Cost Reduction ROI', 'Payback Period', 'NPV', 'IRR', 'Profitability Index'],
      definition: 'Measures the profitability and financial viability of investments using traditional accounting and finance principles.',
      features: ['Time value of money calculations', 'Risk-adjusted return analysis', 'Benchmarking against industry standards'],
      steps: ['Identify investment costs', 'Calculate expected returns', 'Apply discount rates', 'Compute financial metrics'],
      formula: 'ROI = (Net Profit / Total Investment) × 100%',
      importance: 'Foundation for all investment decisions'
    },
    {
      id: 'business-marketing',
      name: 'Business & Marketing ROI',
      description: 'Marketing, brand, and strategic growth investments',
      icon: '📊',
      color: 'from-purple-900 to-purple-700',
      gradient: 'bg-gradient-to-r from-purple-900 to-purple-700',
      metrics: ['Marketing ROI', 'Brand ROI', 'ROAS', 'CLV/CAC', 'Conversion Rate Lift'],
      definition: 'Evaluates the effectiveness of marketing expenditures and customer acquisition strategies.',
      features: ['Multi-channel attribution', 'Customer lifetime value tracking', 'Campaign performance optimization'],
      steps: ['Track marketing spend', 'Attribute revenue', 'Calculate acquisition costs', 'Optimize marketing mix'],
      formula: 'Marketing ROI = (Revenue - Marketing Cost) / Marketing Cost × 100%',
      importance: 'Critical for marketing budget optimization'
    },
    {
      id: 'technology-ai',
      name: 'Technology & AI ROI',
      description: 'AI, automation, and technology infrastructure investments',
      icon: '🤖',
      color: 'from-cyan-800 to-cyan-600',
      gradient: 'bg-gradient-to-r from-cyan-800 to-cyan-600',
      metrics: ['Automation ROI', 'AI Training ROI', 'System Uptime ROI', 'Deployment ROI'],
      definition: 'Quantifies returns from technology implementations and AI solutions.',
      features: ['Automation efficiency measurement', 'AI model performance tracking', 'System reliability monitoring'],
      steps: ['Identify automation opportunities', 'Calculate current costs', 'Implement solutions', 'Measure improvements'],
      formula: 'Automation ROI = (Hours Saved × Cost per Hour) / Tool Cost × 100%',
      importance: 'Essential for technology investment justification'
    },
    {
      id: 'operations',
      name: 'Operational ROI',
      description: 'Efficiency, productivity, and process optimization',
      icon: '⚙️',
      color: 'from-blue-800 to-cyan-700',
      gradient: 'bg-gradient-to-r from-blue-800 to-cyan-700',
      metrics: ['Efficiency ROI', 'Error Reduction ROI', 'Time Savings ROI', 'Utilization Rate'],
      definition: 'Measures improvements in operational processes and efficiency gains.',
      features: ['Process efficiency tracking', 'Error rate monitoring', 'Resource utilization optimization'],
      steps: ['Map processes', 'Identify inefficiencies', 'Implement improvements', 'Measure performance'],
      formula: 'Efficiency Gain = (Output After - Output Before) / Output Before × 100%',
      importance: 'Critical for operational excellence'
    },
    {
      id: 'customer',
      name: 'Customer ROI',
      description: 'Customer experience and support investments',
      icon: '👥',
      color: 'from-purple-800 to-pink-700',
      gradient: 'bg-gradient-to-r from-purple-800 to-pink-700',
      metrics: ['NPS Impact ROI', 'Churn Reduction ROI', 'Customer Support ROI'],
      definition: 'Evaluates returns from customer experience improvements and retention initiatives.',
      features: ['Customer satisfaction measurement', 'Retention rate tracking', 'Support efficiency monitoring'],
      steps: ['Measure satisfaction', 'Implement improvements', 'Track retention', 'Calculate revenue impact'],
      formula: 'CX ROI = (Retention Revenue - CX Investment) / CX Investment × 100%',
      importance: 'Essential for customer-centric strategy'
    },
    {
      id: 'hr-people',
      name: 'HR & People ROI',
      description: 'Employee experience and workforce optimization',
      icon: '👨‍💼',
      color: 'from-cyan-700 to-blue-600',
      gradient: 'bg-gradient-to-r from-cyan-700 to-blue-600',
      metrics: ['Training ROI', 'Attrition Reduction ROI', 'Employee Experience ROI'],
      definition: 'Measures returns from human capital investments and development programs.',
      features: ['Training effectiveness measurement', 'Employee productivity tracking', 'Retention cost analysis'],
      steps: ['Identify training needs', 'Implement programs', 'Measure improvements', 'Calculate ROI'],
      formula: 'Training ROI = (Benefits - Training Cost) / Training Cost × 100%',
      importance: 'Critical for talent management'
    },
    {
      id: 'project-execution',
      name: 'Project & Execution ROI',
      description: 'Project management and delivery performance',
      icon: '🚀',
      color: 'from-blue-700 to-purple-600',
      gradient: 'bg-gradient-to-r from-blue-700 to-purple-600',
      metrics: ['Strategic ROI', 'Schedule Performance', 'Cost Performance', 'Risk Mitigation'],
      definition: 'Evaluates the success and financial returns of specific projects and initiatives.',
      features: ['Project value tracking', 'Delivery efficiency measurement', 'Strategic alignment assessment'],
      steps: ['Define objectives', 'Track costs and timelines', 'Measure delivered value', 'Calculate ROI'],
      formula: 'Project ROI = (Value Delivered - Project Cost) / Project Cost × 100%',
      importance: 'Essential for project portfolio management'
    },
    {
      id: 'industry-specific',
      name: 'Industry-Specific ROI',
      description: 'E-commerce, retail, and vertical-specific calculations',
      icon: '🏪',
      color: 'from-purple-600 to-cyan-500',
      gradient: 'bg-gradient-to-r from-purple-600 to-cyan-500',
      metrics: ['Visual Search ROI', 'Virtual Try-On ROI', 'Smart Tagging ROI', 'Product Recommendations'],
      definition: 'Specialized ROI calculations for e-commerce, retail, and specific industry verticals.',
      features: ['Visual commerce optimization', 'Personalization impact', 'Conversion rate improvement', 'Return reduction'],
      steps: ['Implement industry-specific tech', 'Track conversion metrics', 'Measure revenue impact', 'Calculate vertical ROI'],
      formula: 'Visual Search ROI = Revenue Increase / Implementation Cost',
      importance: 'Critical for competitive advantage in specific markets'
    },
    {
      id: 'strategic-growth',
      name: 'Strategic & Growth ROI',
      description: 'Innovation, market expansion, and competitive advantage',
      icon: '📈',
      color: 'from-blue-700 to-purple-600',
      gradient: 'bg-gradient-to-r from-blue-700 to-purple-600',
      metrics: ['Innovation ROI', 'Market Share Growth', 'Competitive Advantage', 'Market Expansion ROI'],
      definition: 'Measures returns from strategic initiatives, innovation, and market growth investments.',
      features: ['Innovation pipeline valuation', 'Market share analysis', 'Competitive positioning', 'Expansion strategy ROI'],
      steps: ['Identify growth opportunities', 'Invest in strategic initiatives', 'Track market metrics', 'Calculate strategic returns'],
      formula: 'Innovation ROI = Revenue from New Products / R&D Investment',
      importance: 'Essential for long-term business growth and sustainability'
    },
    {
      id: 'esg-compliance',
      name: 'ESG & Compliance ROI',
      description: 'Sustainability, risk management, and compliance investments',
      icon: '🌱',
      color: 'from-cyan-600 to-green-500',
      gradient: 'bg-gradient-to-r from-cyan-600 to-green-500',
      metrics: ['ESG ROI', 'Risk Mitigation ROI', 'Compliance Savings', 'Sustainability ROI'],
      definition: 'Evaluates returns from environmental, social, governance initiatives and compliance programs.',
      features: ['Sustainability impact measurement', 'Risk reduction valuation', 'Compliance cost optimization', 'ESG performance tracking'],
      steps: ['Implement ESG programs', 'Track regulatory compliance', 'Measure risk reduction', 'Calculate sustainability returns'],
      formula: 'ESG ROI = (Savings + Incentives + Risk Avoidance) / ESG Investment',
      importance: 'Critical for regulatory compliance, risk management, and corporate responsibility'
    },
    {
      id: 'data-quality',
      name: 'Data Quality & Insight ROI',
      description: 'Data improvement and analytics investments',
      icon: '📊',
      color: 'from-blue-600 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-600 to-cyan-500',
      metrics: ['Data Quality ROI', 'Model Accuracy ROI', 'Decision Impact', 'Insight Generation ROI'],
      definition: 'Measures returns from data quality improvements, analytics investments, and insights-driven decision making.',
      features: ['Data quality improvement tracking', 'Analytics model performance', 'Decision-making impact assessment', 'Insight value measurement'],
      steps: ['Invest in data infrastructure', 'Implement quality controls', 'Track model performance', 'Measure decision improvements'],
      formula: 'Data ROI = Value from Better Decisions / Data Investment',
      importance: 'Essential for data-driven decision making and AI implementation success'
    },
    {
      id: 'productivity-time',
      name: 'Productivity & Time-to-Market ROI',
      description: 'Speed, efficiency, and time optimization metrics',
      icon: '⏱️',
      color: 'from-purple-600 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-600 to-pink-500',
      metrics: ['Time-to-Market ROI', 'Productivity Gains', 'Process Speedup', 'Development Speed ROI'],
      definition: 'Evaluates returns from productivity improvements, time optimization, and speed-to-market enhancements.',
      features: ['Time efficiency measurement', 'Productivity gain tracking', 'Process acceleration analysis', 'Development speed optimization'],
      steps: ['Identify time bottlenecks', 'Implement efficiency improvements', 'Track time savings', 'Calculate speed returns'],
      formula: 'Time-to-Market ROI = Revenue from Faster Launch / Time Optimization Cost',
      importance: 'Critical for competitive agility and operational efficiency'
    }
  ];

  // Calculate ALL ROIs
  useEffect(() => {
    calculateAllROIs();
    generateAIPredictions();
  }, [inputs, filters]);

  const calculateAllROIs = (): void => {
    // Core Financial
    const standardROI = inputs.totalInvestment > 0 ? (inputs.netProfit / inputs.totalInvestment) * 100 : 0;
    const costReductionROI = inputs.totalInvestment > 0 ? ((inputs.costSavings - inputs.totalInvestment) / inputs.totalInvestment) * 100 : 0;
    const paybackPeriod = inputs.annualCashInflow > 0 ? inputs.initialInvestment / inputs.annualCashInflow : 0;
    const npv = -inputs.initialInvestment + (inputs.annualCashInflow / inputs.discountRate) * (1 - Math.pow(1 + inputs.discountRate, -5));
    const irr = inputs.annualCashInflow > 0 ? (1 / paybackPeriod) * 100 : 0;
    const profitabilityIndex = inputs.initialInvestment > 0 ? (npv + inputs.initialInvestment) / inputs.initialInvestment : 0;

    // Marketing
    const marketingROI = inputs.marketingCost > 0 ? ((inputs.marketingRevenue - inputs.marketingCost) / inputs.marketingCost) * 100 : 0;
    const brandROI = inputs.brandInvestment > 0 ? inputs.brandValue / inputs.brandInvestment : 0;
    const roas = inputs.adSpend > 0 ? inputs.adRevenue / inputs.adSpend : 0;
    const customerAcquisitionCost = inputs.newCustomers > 0 ? (inputs.marketingCost + inputs.salesCost) / inputs.newCustomers : 0;
    const customerLifetimeValue = inputs.averageOrderValue * inputs.purchaseFrequency * inputs.customerLifespan;
    const conversionRateLift = inputs.conversionRateBefore > 0 ? ((inputs.conversionRateAfter - inputs.conversionRateBefore) / inputs.conversionRateBefore) * 100 : 0;

    // Technology & AI
    const automationROI = inputs.aiToolCost > 0 ? (inputs.hoursSaved * inputs.costPerHour / inputs.aiToolCost) * 100 : 0;
    const aiTrainingROI = inputs.dataPreparationCost > 0 ? inputs.modelAccuracyImprovement / inputs.dataPreparationCost : 0;
    const systemUptimeROI = inputs.downtimeReduced * inputs.revenuePerHour;
    const deploymentROI = inputs.deploymentCost > 0 ? inputs.operationalEfficiencyGain / inputs.deploymentCost : 0;

    // Operational
    const efficiencyROI = inputs.outputPerHourBefore > 0 ? (inputs.outputPerHourAfter / inputs.outputPerHourBefore - 1) * 100 : 0;
    const errorReductionROI = inputs.automationCost > 0 ? (inputs.errorsReduced * inputs.costPerError) / inputs.automationCost : 0;
    const timeSavingsROI = inputs.totalInvestment > 0 ? (inputs.totalHoursSaved * inputs.employeeCostPerHour / inputs.totalInvestment) * 100 : 0;
    const utilizationRate = inputs.maximumOutput > 0 ? inputs.actualOutput / inputs.maximumOutput : 0;

    // Customer Experience
    const npsImpactROI = inputs.cxTechInvestment > 0 ? inputs.repeatPurchaseRevenue / inputs.cxTechInvestment : 0;
    const churnReductionROI = inputs.customersSaved * inputs.customerLifetimeValue;
    const customerSupportROI = inputs.aiSupportInvestment > 0 ? inputs.supportCostSavings / inputs.aiSupportInvestment : 0;

    // HR & People
    const trainingROI = inputs.trainingCost > 0 ? (inputs.trainingBenefits - inputs.trainingCost) / inputs.trainingCost : 0;
    const attritionReductionROI = inputs.hrInitiativeCost > 0 ? (inputs.employeesRetained * inputs.costToReplace) / inputs.hrInitiativeCost : 0;
    const employeeExperienceROI = inputs.employeeExperienceInvestment > 0 ? inputs.productivityGains / inputs.employeeExperienceInvestment : 0;

    // Project & Execution
    const strategicROI = inputs.totalProjectCost > 0 ? inputs.valueDelivered / inputs.totalProjectCost : 0;
    const schedulePerformance = inputs.plannedValue > 0 ? inputs.earnedValue / inputs.plannedValue : 0;
    const costPerformance = inputs.actualCost > 0 ? inputs.earnedValue / inputs.actualCost : 0;
    const riskMitigationROI = inputs.riskControlsCost > 0 ? inputs.lossAvoided / inputs.riskControlsCost : 0;

    // Industry Specific
    const visualSearchROI = inputs.visualSearchImplementationCost > 0 ? inputs.searchConversionsIncrease / inputs.visualSearchImplementationCost : 0;
    const virtualTryOnROI = inputs.virtualTryOnCost > 0 ? ((inputs.returnsBefore - inputs.returnsAfter) * inputs.averageOrderValue) / inputs.virtualTryOnCost : 0;
    const smartTaggingROI = inputs.smartTaggingCost > 0 ? (inputs.manualWritingHoursSaved * inputs.costPerHour) / inputs.smartTaggingCost : 0;
    const productRecommendationROI = inputs.recommendationEngineCost > 0 ? ((inputs.aovAfterAI - inputs.aovBefore) * 1000) / inputs.recommendationEngineCost : 0;

    // Strategic & Growth
    const innovationROI = inputs.innovationCost > 0 ? inputs.innovationRevenue / inputs.innovationCost : 0;
    const marketShareGrowthROI = inputs.marketShareGrowth * 5000;
    const competitiveAdvantageROI = inputs.competitiveAdvantageValue;
    const marketExpansionROI = inputs.marketExpansionCost > 0 ? inputs.marketExpansionRevenue / inputs.marketExpansionCost : 0;

   // ESG & Compliance
const esgROI = inputs.sustainabilityCost > 0 ? (inputs.esgSavings + inputs.sustainabilityIncentives) / inputs.sustainabilityCost : 0;
const riskReductionROI = inputs.riskReductionValue; // ✅ Remove the "2"
const complianceSavingsROI = inputs.complianceSavings;
const sustainabilityROI = inputs.sustainabilityCost > 0 ? (inputs.carbonCreditValue + inputs.regulatoryPenaltyAvoidance) / inputs.sustainabilityCost : 0;

    const dataQualityROI = inputs.dataImprovementCost > 0 ? inputs.valueBetterDecisions / inputs.dataImprovementCost : 0;
    const modelAccuracyROI = inputs.modelAccuracyAfter - inputs.modelAccuracyBefore;
    const decisionImpactROI = inputs.valueBetterDecisions;
    const insightGenerationROI = inputs.insightGenerationValue;

    // Productivity & Time-to-Market
    const timeToMarketROI = inputs.timeSavedCost > 0 ? inputs.revenueFasterLaunch / inputs.timeSavedCost : 0;
    const productivityGainsROI = inputs.productivityHoursSaved * inputs.costPerHour;
    const processSpeedupROI = inputs.processTimeBefore > 0 ? ((inputs.processTimeBefore - inputs.processTimeAfter) / inputs.processTimeBefore) * 100 : 0;
    const developmentSpeedROI = inputs.developmentTimeBefore > 0 ? ((inputs.developmentTimeBefore - inputs.developmentTimeAfter) / inputs.developmentTimeBefore) * 100 : 0;

    setResults({
      standardROI,
      costReductionROI,
      paybackPeriod,
      npv,
      irr,
      profitabilityIndex,
      marketingROI,
      brandROI,
      roas,
      customerAcquisitionCost,
      customerLifetimeValue,
      conversionRateLift,
      automationROI,
      aiTrainingROI,
      systemUptimeROI,
      deploymentROI,
      efficiencyROI,
      errorReductionROI,
      timeSavingsROI,
      utilizationRate,
      npsImpactROI,
      churnReductionROI,
      customerSupportROI,
      trainingROI,
      attritionReductionROI,
      employeeExperienceROI,
      strategicROI,
      riskMitigationROI,
      schedulePerformance,
      costPerformance,
      visualSearchROI,
      virtualTryOnROI,
      smartTaggingROI,
      productRecommendationROI,
      innovationROI,
      marketShareGrowthROI,
      competitiveAdvantageROI,
      marketExpansionROI,
      esgROI,
      riskReductionROI,
      complianceSavingsROI,
      sustainabilityROI,
      dataQualityROI,
      modelAccuracyROI,
      decisionImpactROI,
      insightGenerationROI,
      timeToMarketROI,
      productivityGainsROI,
      processSpeedupROI,
      developmentSpeedROI,
    });
  };

  const generateAIPredictions = (): void => {
    if (filters.enableAIPredictions) {
      const prediction: AIPrediction = {
        predictedROI: results.standardROI * 1.15,
        confidence: 0.87,
        recommendations: [
          'Optimize marketing spend allocation across channels',
          'Implement automation in high-volume customer service processes',
          'Focus on high-ROI customer segments for retention',
          'Improve data quality for better decision-making insights',
          'Accelerate time-to-market for new product launches'
        ],
        riskLevel: results.standardROI > 25 ? 'low' : results.standardROI > 15 ? 'medium' : 'high',
        timeline: '3-6 months'
      };
      setAIPredictions(prediction);
    }
  };

  const handleInputChange = (field: keyof ROIInputs, value: string): void => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleFilterChange = (key: keyof FilterState, value: any): void => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleMetric = (metric: string): void => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  // Chart Data
  const performanceData = [
    { name: 'Financial', value: results.standardROI, lastMonth: results.standardROI * 0.85 },
    { name: 'Marketing', value: results.marketingROI, lastMonth: results.marketingROI * 0.9 },
    { name: 'Technology', value: results.automationROI, lastMonth: results.automationROI * 0.8 },
    { name: 'Operations', value: results.efficiencyROI, lastMonth: results.efficiencyROI * 0.95 },
    { name: 'Customer', value: results.npsImpactROI * 100, lastMonth: results.npsImpactROI * 85 },
    { name: 'HR', value: results.trainingROI * 100, lastMonth: results.trainingROI * 90 },
    { name: 'Projects', value: results.strategicROI * 100, lastMonth: results.strategicROI * 88 },
    { name: 'Industry', value: results.visualSearchROI * 100, lastMonth: results.visualSearchROI * 85 },
    { name: 'Strategic', value: results.innovationROI * 100, lastMonth: results.innovationROI * 80 },
    { name: 'ESG', value: results.esgROI * 100, lastMonth: results.esgROI * 75 },
    { name: 'Data', value: results.dataQualityROI * 100, lastMonth: results.dataQualityROI * 82 },
    { name: 'Productivity', value: results.timeToMarketROI * 100, lastMonth: results.timeToMarketROI * 78 },
  ];

  const categoryDistribution = roiCategories.map(category => ({
    name: category.name.split(' ')[0],
    value: performanceData.find(p => p.name.toLowerCase().includes(category.name.split(' ')[0].toLowerCase()))?.value || 0
  }));

  const timeSeriesData = [
    { month: 'Jan', current: 15, lastYear: 12 },
    { month: 'Feb', current: 18, lastYear: 14 },
    { month: 'Mar', current: 22, lastYear: 16 },
    { month: 'Apr', current: 25, lastYear: 18 },
    { month: 'May', current: 28, lastYear: 20 },
    { month: 'Jun', current: results.standardROI, lastYear: 22 },
  ];

  const industryBenchmarks = [
    { industry: 'Technology', benchmark: 35, yourROI: results.standardROI },
    { industry: 'Fashion', benchmark: 28, yourROI: results.marketingROI },
    { industry: 'E-commerce', benchmark: 32, yourROI: results.visualSearchROI * 100 },
    { industry: 'Manufacturing', benchmark: 22, yourROI: results.efficiencyROI },
    { industry: 'Healthcare', benchmark: 25, yourROI: results.trainingROI * 100 },
    { industry: 'Finance', benchmark: 30, yourROI: results.dataQualityROI * 100 },
  ];

  // Export Functions
  const exportToPDF = async (): Promise<void> => {
    if (!dashboardRef.current) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Cover Page
    pdf.setFillColor(30, 58, 138);
    pdf.rect(0, 0, 210, 297, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(32);
    pdf.text('COMPREHENSIVE ROI DASHBOARD', 105, 120, { align: 'center' });
    pdf.setFontSize(16);
    pdf.text('Complete Business Investment Analysis Report', 105, 140, { align: 'center' });
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 160, { align: 'center' });
    
    // Executive Summary
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.text('EXECUTIVE SUMMARY', 20, 30);
    
    pdf.setFontSize(12);
    let yPos = 50;
    pdf.text(`Overall Financial ROI: ${results.standardROI.toFixed(2)}%`, 20, yPos);
    yPos += 10;
    pdf.text(`Marketing ROI: ${results.marketingROI.toFixed(2)}%`, 20, yPos);
    yPos += 10;
    pdf.text(`Technology ROI: ${results.automationROI.toFixed(2)}%`, 20, yPos);
    yPos += 10;
    pdf.text(`Strategic Growth ROI: ${results.innovationROI.toFixed(2)}`, 20, yPos);
    yPos += 10;
    pdf.text(`ESG ROI: ${results.esgROI.toFixed(2)}`, 20, yPos);
    yPos += 10;
    pdf.text(`Data Quality ROI: ${results.dataQualityROI.toFixed(2)}`, 20, yPos);
    
    // Dashboard Overview
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text('DASHBOARD OVERVIEW', 20, 20);
    
    const canvas = await html2canvas(dashboardRef.current);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 30, 190, 150);
    
    // Recommendations
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text('STRATEGIC RECOMMENDATIONS', 20, 20);
    pdf.setFontSize(10);
    
    const recommendations = aiPredictions?.recommendations || [
      'Optimize high-cost, low-return investments across all categories',
      'Reallocate budget to high-performing strategic initiatives',
      'Implement automation in operational processes',
      'Focus on data quality improvements for better insights',
      'Accelerate time-to-market for competitive advantage'
    ];
    
    yPos = 40;
    recommendations.forEach(rec => {
      pdf.text(`• ${rec}`, 20, yPos);
      yPos += 8;
    });
    
    pdf.save(`Complete-ROI-Report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportToExcel = (): void => {
    const data = [
      ['Category', 'ROI (%)', 'Last Month', 'Industry Benchmark', 'Status'],
      ['Financial', results.standardROI, results.standardROI * 0.85, 25, results.standardROI >= 25 ? 'Excellent' : 'Needs Improvement'],
      ['Marketing', results.marketingROI, results.marketingROI * 0.9, 30, results.marketingROI >= 30 ? 'Excellent' : 'Needs Improvement'],
      ['Technology', results.automationROI, results.automationROI * 0.8, 35, results.automationROI >= 35 ? 'Excellent' : 'Needs Improvement'],
      ['Strategic Growth', results.innovationROI * 100, results.innovationROI * 80, 40, results.innovationROI >= 0.4 ? 'Excellent' : 'Needs Improvement'],
      ['ESG', results.esgROI * 100, results.esgROI * 75, 30, results.esgROI >= 0.3 ? 'Excellent' : 'Needs Improvement'],
      ['Data Quality', results.dataQualityROI * 100, results.dataQualityROI * 82, 35, results.dataQualityROI >= 0.35 ? 'Excellent' : 'Needs Improvement'],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ROI Analysis');
    XLSX.writeFile(wb, `Complete-ROI-Analysis-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPPT = async (): Promise<void> => {
    const ppt = new pptxgen();
    
    // Title Slide
    const titleSlide = ppt.addSlide();
    titleSlide.background = { fill: '1F2937' };
    titleSlide.addText('Complete ROI Dashboard', {
      x: 0.5,
      y: 1.5,
      w: '90%',
      h: 1.5,
      align: 'center',
      fontSize: 32,
      bold: true,
      color: 'FFFFFF'
    });
    titleSlide.addText('Comprehensive Business Investment Analysis', {
      x: 0.5,
      y: 3,
      w: '90%',
      align: 'center',
      fontSize: 18,
      color: '06B6D4'
    });

    // Summary Slide
    const summarySlide = ppt.addSlide();
    summarySlide.addText('Executive Summary', { x: 0.5, y: 0.5, fontSize: 24, bold: true });
    summarySlide.addText(`Overall ROI: ${results.standardROI.toFixed(2)}%`, { x: 0.5, y: 1.5, fontSize: 14 });
    summarySlide.addText(`Marketing ROI: ${results.marketingROI.toFixed(2)}%`, { x: 0.5, y: 2, fontSize: 14 });
    summarySlide.addText(`Strategic Growth: ${results.innovationROI.toFixed(2)}`, { x: 0.5, y: 2.5, fontSize: 14 });
    summarySlide.addText(`ESG Performance: ${results.esgROI.toFixed(2)}`, { x: 0.5, y: 3, fontSize: 14 });
    summarySlide.addText(`Data Quality ROI: ${results.dataQualityROI.toFixed(2)}`, { x: 0.5, y: 3.5, fontSize: 14 });

    ppt.writeFile({ fileName: `Complete-ROI-Presentation-${new Date().toISOString().split('T')[0]}.pptx` });
  };

  // Get current category
  const currentCategory = roiCategories.find(cat => cat.id === activeCategory);

  // Render Input Panel for ALL categories
  const renderCategoryInputs = (): JSX.Element => {
    const inputStyles = "w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";
    
    switch (activeCategory) {
      case 'core-financial':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Net Profit ($)</label>
              <input type="number" value={inputs.netProfit} onChange={(e) => handleInputChange('netProfit', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Total Investment ($)</label>
              <input type="number" value={inputs.totalInvestment} onChange={(e) => handleInputChange('totalInvestment', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Annual Cash Inflow ($)</label>
              <input type="number" value={inputs.annualCashInflow} onChange={(e) => handleInputChange('annualCashInflow', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'business-marketing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Marketing Revenue ($)</label>
              <input type="number" value={inputs.marketingRevenue} onChange={(e) => handleInputChange('marketingRevenue', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Marketing Cost ($)</label>
              <input type="number" value={inputs.marketingCost} onChange={(e) => handleInputChange('marketingCost', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Ad Spend ($)</label>
              <input type="number" value={inputs.adSpend} onChange={(e) => handleInputChange('adSpend', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'technology-ai':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Hours Saved</label>
              <input type="number" value={inputs.hoursSaved} onChange={(e) => handleInputChange('hoursSaved', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Cost Per Hour ($)</label>
              <input type="number" value={inputs.costPerHour} onChange={(e) => handleInputChange('costPerHour', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">AI Tool Cost ($)</label>
              <input type="number" value={inputs.aiToolCost} onChange={(e) => handleInputChange('aiToolCost', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'operations':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Output Per Hour (After)</label>
              <input type="number" value={inputs.outputPerHourAfter} onChange={(e) => handleInputChange('outputPerHourAfter', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Output Per Hour (Before)</label>
              <input type="number" value={inputs.outputPerHourBefore} onChange={(e) => handleInputChange('outputPerHourBefore', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Errors Reduced</label>
              <input type="number" value={inputs.errorsReduced} onChange={(e) => handleInputChange('errorsReduced', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'customer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Repeat Purchase Revenue ($)</label>
              <input type="number" value={inputs.repeatPurchaseRevenue} onChange={(e) => handleInputChange('repeatPurchaseRevenue', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">CX Tech Investment ($)</label>
              <input type="number" value={inputs.cxTechInvestment} onChange={(e) => handleInputChange('cxTechInvestment', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Customers Saved</label>
              <input type="number" value={inputs.customersSaved} onChange={(e) => handleInputChange('customersSaved', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'hr-people':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Training Benefits ($)</label>
              <input type="number" value={inputs.trainingBenefits} onChange={(e) => handleInputChange('trainingBenefits', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Training Cost ($)</label>
              <input type="number" value={inputs.trainingCost} onChange={(e) => handleInputChange('trainingCost', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Employees Retained</label>
              <input type="number" value={inputs.employeesRetained} onChange={(e) => handleInputChange('employeesRetained', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'project-execution':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Value Delivered ($)</label>
              <input type="number" value={inputs.valueDelivered} onChange={(e) => handleInputChange('valueDelivered', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Total Project Cost ($)</label>
              <input type="number" value={inputs.totalProjectCost} onChange={(e) => handleInputChange('totalProjectCost', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Loss Avoided ($)</label>
              <input type="number" value={inputs.lossAvoided} onChange={(e) => handleInputChange('lossAvoided', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'industry-specific':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Search Conversions Increase ($)</label>
              <input type="number" value={inputs.searchConversionsIncrease} onChange={(e) => handleInputChange('searchConversionsIncrease', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Visual Search Cost ($)</label>
              <input type="number" value={inputs.visualSearchImplementationCost} onChange={(e) => handleInputChange('visualSearchImplementationCost', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Virtual Try-On Cost ($)</label>
              <input type="number" value={inputs.virtualTryOnCost} onChange={(e) => handleInputChange('virtualTryOnCost', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'strategic-growth':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Innovation Revenue ($)</label>
              <input type="number" value={inputs.innovationRevenue} onChange={(e) => handleInputChange('innovationRevenue', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">R&D Cost ($)</label>
              <input type="number" value={inputs.rndCost} onChange={(e) => handleInputChange('rndCost', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Market Share Growth (%)</label>
              <input type="number" value={inputs.marketShareGrowth} onChange={(e) => handleInputChange('marketShareGrowth', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'esg-compliance':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">ESG Savings ($)</label>
              <input type="number" value={inputs.esgSavings} onChange={(e) => handleInputChange('esgSavings', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Sustainability Cost ($)</label>
              <input type="number" value={inputs.sustainabilityCost} onChange={(e) => handleInputChange('sustainabilityCost', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Compliance Savings ($)</label>
              <input type="number" value={inputs.complianceSavings} onChange={(e) => handleInputChange('complianceSavings', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'data-quality':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Value from Better Decisions ($)</label>
              <input type="number" value={inputs.valueBetterDecisions} onChange={(e) => handleInputChange('valueBetterDecisions', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Data Improvement Cost ($)</label>
              <input type="number" value={inputs.dataImprovementCost} onChange={(e) => handleInputChange('dataImprovementCost', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Data Quality Score (Before)</label>
              <input type="number" value={inputs.dataQualityScoreBefore} onChange={(e) => handleInputChange('dataQualityScoreBefore', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      case 'productivity-time':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Revenue from Faster Launch ($)</label>
              <input type="number" value={inputs.revenueFasterLaunch} onChange={(e) => handleInputChange('revenueFasterLaunch', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Time Saved Cost ($)</label>
              <input type="number" value={inputs.timeSavedCost} onChange={(e) => handleInputChange('timeSavedCost', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Development Time Before (days)</label>
              <input type="number" value={inputs.developmentTimeBefore} onChange={(e) => handleInputChange('developmentTimeBefore', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Investment Cost ($)</label>
              <input type="number" value={inputs.totalInvestment} onChange={(e) => handleInputChange('totalInvestment', e.target.value)} className={inputStyles} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Expected Benefits ($)</label>
              <input type="number" value={inputs.netProfit} onChange={(e) => handleInputChange('netProfit', e.target.value)} className={inputStyles} />
            </div>
          </div>
        );
    }
  };

  // Render Results for ALL categories
  const renderCategoryResults = (): JSX.Element => {
    const getResultsForCategory = () => {
      switch (activeCategory) {
        case 'core-financial':
          return [
            { name: 'Standard ROI', value: results.standardROI, format: '%' },
            { name: 'Cost Reduction ROI', value: results.costReductionROI, format: '%' },
            { name: 'Payback Period', value: results.paybackPeriod, format: ' years' },
            { name: 'NPV', value: results.npv, format: '$' },
            { name: 'IRR', value: results.irr, format: '%' },
            { name: 'Profitability Index', value: results.profitabilityIndex, format: '' }
          ];
        case 'business-marketing':
          return [
            { name: 'Marketing ROI', value: results.marketingROI, format: '%' },
            { name: 'Brand ROI', value: results.brandROI, format: '' },
            { name: 'ROAS', value: results.roas, format: 'x' },
            { name: 'Customer LTV', value: results.customerLifetimeValue, format: '$' },
            { name: 'CAC', value: results.customerAcquisitionCost, format: '$' },
            { name: 'Conversion Lift', value: results.conversionRateLift, format: '%' }
          ];
        case 'technology-ai':
          return [
            { name: 'Automation ROI', value: results.automationROI, format: '%' },
            { name: 'AI Training ROI', value: results.aiTrainingROI, format: '' },
            { name: 'System Uptime ROI', value: results.systemUptimeROI, format: '$' },
            { name: 'Deployment ROI', value: results.deploymentROI, format: '' }
          ];
        case 'operations':
          return [
            { name: 'Efficiency ROI', value: results.efficiencyROI, format: '%' },
            { name: 'Error Reduction ROI', value: results.errorReductionROI, format: '' },
            { name: 'Time Savings ROI', value: results.timeSavingsROI, format: '%' },
            { name: 'Utilization Rate', value: results.utilizationRate, format: '%' }
          ];
        case 'customer':
          return [
            { name: 'NPS Impact ROI', value: results.npsImpactROI, format: '' },
            { name: 'Churn Reduction ROI', value: results.churnReductionROI, format: '$' },
            { name: 'Customer Support ROI', value: results.customerSupportROI, format: '' }
          ];
        case 'hr-people':
          return [
            { name: 'Training ROI', value: results.trainingROI, format: '' },
            { name: 'Attrition Reduction ROI', value: results.attritionReductionROI, format: '' },
            { name: 'Employee Experience ROI', value: results.employeeExperienceROI, format: '' }
          ];
        case 'project-execution':
          return [
            { name: 'Strategic ROI', value: results.strategicROI, format: '' },
            { name: 'Schedule Performance', value: results.schedulePerformance, format: '' },
            { name: 'Cost Performance', value: results.costPerformance, format: '' },
            { name: 'Risk Mitigation ROI', value: results.riskMitigationROI, format: '' }
          ];
        case 'industry-specific':
          return [
            { name: 'Visual Search ROI', value: results.visualSearchROI, format: '' },
            { name: 'Virtual Try-On ROI', value: results.virtualTryOnROI, format: '' },
            { name: 'Smart Tagging ROI', value: results.smartTaggingROI, format: '' },
            { name: 'Product Recommendation ROI', value: results.productRecommendationROI, format: '' }
          ];
        case 'strategic-growth':
          return [
            { name: 'Innovation ROI', value: results.innovationROI, format: '' },
            { name: 'Market Share Growth ROI', value: results.marketShareGrowthROI, format: '$' },
            { name: 'Competitive Advantage ROI', value: results.competitiveAdvantageROI, format: '$' },
            { name: 'Market Expansion ROI', value: results.marketExpansionROI, format: '' }
          ];
        case 'esg-compliance':
          return [
            { name: 'ESG ROI', value: results.esgROI, format: '' },
            { name: 'Risk Mitigation ROI', value: results.riskMitigationROI, format: '$' },
            { name: 'Compliance Savings ROI', value: results.complianceSavingsROI, format: '$' },
            { name: 'Sustainability ROI', value: results.sustainabilityROI, format: '' }
          ];
        case 'data-quality':
          return [
            { name: 'Data Quality ROI', value: results.dataQualityROI, format: '' },
            { name: 'Model Accuracy ROI', value: results.modelAccuracyROI, format: '% points' },
            { name: 'Decision Impact ROI', value: results.decisionImpactROI, format: '$' },
            { name: 'Insight Generation ROI', value: results.insightGenerationROI, format: '' }
          ];
        case 'productivity-time':
          return [
            { name: 'Time-to-Market ROI', value: results.timeToMarketROI, format: '' },
            { name: 'Productivity Gains ROI', value: results.productivityGainsROI, format: '$' },
            { name: 'Process Speedup ROI', value: results.processSpeedupROI, format: '%' },
            { name: 'Development Speed ROI', value: results.developmentSpeedROI, format: '%' }
          ];
        default:
          return [];
      }
    };

    const resultsData = getResultsForCategory();

    return (
      <div className="space-y-4">
        {resultsData.map((result, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
            <span className="text-gray-300">{result.name}</span>
            <span className="text-cyan-400 font-bold text-xl">
              {result.format === '$' && '$'}
              {result.value.toFixed(2)}
              {result.format === '%' && '%'}
              {result.format === ' years' && ' years'}
              {result.format === 'x' && 'x'}
              {result.format === '% points' && '% points'}
              {!['$', '%', ' years', 'x', '% points'].includes(result.format) && result.format}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Top Spacing for Navigation */}
      <div className="h-20"></div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-800 border-b border-cyan-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Complete ROI Dashboard</h1>
              <p className="text-cyan-200">All 12 Categories - Comprehensive Business Investment Analysis</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={exportToPDF}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                📄 PDF
              </button>
              <button
                onClick={exportToExcel}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                📊 Excel
              </button>
              <button
                onClick={exportToPPT}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                🎯 PPT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <select 
              value={filters.timeRange}
              onChange={(e) => handleFilterChange('timeRange', e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.compareWithLastMonth}
                onChange={(e) => handleFilterChange('compareWithLastMonth', e.target.checked)}
                className="rounded bg-gray-700 border-gray-600"
              />
              <span className="text-gray-300">Compare with Last Month</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.showIndustryBenchmarks}
                onChange={(e) => handleFilterChange('showIndustryBenchmarks', e.target.checked)}
                className="rounded bg-gray-700 border-gray-600"
              />
              <span className="text-gray-300">Show Industry Benchmarks</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.enableAIPredictions}
                onChange={(e) => handleFilterChange('enableAIPredictions', e.target.checked)}
                className="rounded bg-gray-700 border-gray-600"
              />
              <span className="text-gray-300">AI Predictions</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div ref={dashboardRef} className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg p-6">
              <div className="text-2xl font-bold">${(inputs.netProfit / 1000).toFixed(0)}K</div>
              <div className="text-blue-100">Net Profit</div>
              <div className="text-lg font-semibold mt-2">{results.standardROI.toFixed(1)}% ROI</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-6">
              <div className="text-2xl font-bold">{results.marketingROI.toFixed(1)}%</div>
              <div className="text-purple-100">Marketing ROI</div>
              <div className="text-lg font-semibold mt-2">{results.roas.toFixed(1)}x ROAS</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg p-6">
              <div className="text-2xl font-bold">{results.efficiencyROI.toFixed(1)}%</div>
              <div className="text-green-100">Operational Efficiency</div>
              <div className="text-lg font-semibold mt-2">{results.utilizationRate.toFixed(1)}% Utilization</div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-lg p-6">
              <div className="text-2xl font-bold">{results.innovationROI.toFixed(1)}</div>
              <div className="text-orange-100">Innovation ROI</div>
              <div className="text-lg font-semibold mt-2">{inputs.marketShareGrowth}% Market Growth</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Category Navigation */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">ROI Categories</h3>
                <div className="space-y-2">
                  {roiCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeCategory === category.id 
                          ? 'bg-cyan-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm opacity-75">{category.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Predictions */}
              {aiPredictions && filters.enableAIPredictions && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">AI Predictions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Predicted ROI:</span>
                      <span className="text-cyan-400 font-bold">{aiPredictions.predictedROI.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Confidence:</span>
                      <span className="text-green-400 font-bold">{(aiPredictions.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Risk Level:</span>
                      <span className={`font-bold ${
                        aiPredictions.riskLevel === 'low' ? 'text-green-400' :
                        aiPredictions.riskLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {aiPredictions.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Current Category Info */}
              {currentCategory && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{currentCategory.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{currentCategory.name}</h2>
                      <p className="text-gray-300">{currentCategory.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Definition</h4>
                      <p className="text-gray-300 text-sm">{currentCategory.definition}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Formula</h4>
                      <code className="text-cyan-400 text-sm bg-gray-900 p-2 rounded block">
                        {currentCategory.formula}
                      </code>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Section */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {currentCategory?.name} Inputs
                </h3>
                {renderCategoryInputs()}
              </div>

              {/* Results Section */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {currentCategory?.name} Results
                </h3>
                {renderCategoryResults()}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">ROI Performance by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Legend />
                      <Bar dataKey="value" fill="#06b6d4" name="Current" radius={[4, 4, 0, 0]} />
                      {filters.compareWithLastMonth && (
                        <Bar dataKey="lastMonth" fill="#8b5cf6" name="Last Month" radius={[4, 4, 0, 0]} />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">ROI Trends Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="current" 
                        stroke="#06b6d4" 
                        name="Current Year" 
                        strokeWidth={2}
                        dot={{ fill: '#06b6d4' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lastYear" 
                        stroke="#8b5cf6" 
                        name="Last Year" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#8b5cf6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[
                            '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', 
                            '#ef4444', '#8b5cf6', '#06b6d4', '#10b981',
                            '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'
                          ][index % 12]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {filters.showIndustryBenchmarks && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Industry Benchmarks</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={industryBenchmarks}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="industry" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                          labelStyle={{ color: '#F3F4F6' }}
                        />
                        <Legend />
                        <Bar dataKey="benchmark" fill="#6b7280" name="Industry Benchmark" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="yourROI" fill="#06b6d4" name="Your ROI" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* AI Recommendations */}
              {aiPredictions && filters.enableAIPredictions && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">AI Recommendations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiPredictions.recommendations.map((rec, index) => (
                      <div key={index} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <span className="text-cyan-400 text-lg">💡</span>
                          <p className="text-gray-300">{rec}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-cyan-900 bg-opacity-20 rounded-lg">
                    <p className="text-cyan-300 text-sm">
                      <strong>Timeline:</strong> {aiPredictions.timeline} | 
                      <strong> Confidence:</strong> {(aiPredictions.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIDashboard;