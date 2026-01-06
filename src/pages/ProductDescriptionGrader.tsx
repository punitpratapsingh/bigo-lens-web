// ProductDescriptionGrader.tsx - Complete Product Description Quality Analyzer
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Alert, AlertDescription, AlertTitle,
} from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area
} from 'recharts';

// Types and Interfaces
interface DescriptionAnalysis {
  id: string;
  sku: string;
  productName: string;
  originalDescription: string;
  category: string;
  brand: string;
  
  // Overall Score
  overallScore: number;
  scoreBreakdown: ScoreBreakdown;
  
  // Content Quality
  readabilityScore: number;
  fleschKincaidGrade: number;
  grammarScore: number;
  clarityScore: number;
  
  // Information Completeness
  completenessScore: number;
  missingElements: string[];
  presentElements: string[];
  
  // SEO Analysis
  seoScore: number;
  keywordDensity: number;
  keywordCoverage: number;
  searchIntentMatch: number;
  suggestedKeywords: string[];
  lsiKeywords: string[];
  
  // Conversion & Persuasion
  persuasionScore: number;
  emotionalTriggers: string[];
  uspScore: number;
  trustElements: string[];
  
  // Brand Voice
  brandVoiceScore: number;
  brandTone: string;
  toneDeviations: string[];
  
  // Formatting
  formattingScore: number;
  structureScore: number;
  scannabilityScore: number;
  
  // Legal Compliance
  complianceScore: number;
  riskFlags: RiskFlag[];
  
  // Image Consistency
  imageConsistencyScore: number;
  imageTextMatches: ImageTextMatch[];
  mismatches: string[];
  
  // AI Suggestions
  aiSuggestions: AISuggestion[];
  improvedDescription: string;
  attributeSuggestions: AttributeSuggestion[];
  
  // Benchmarking
  competitorScore: number;
  categoryBenchmark: number;
  historicalImprovement: number;
  
  // Generated at
  analyzedAt: string;
  version: number;
}

interface ScoreBreakdown {
  contentQuality: number;
  seo: number;
  conversion: number;
  compliance: number;
  consistency: number;
}

interface RiskFlag {
  type: 'over-promise' | 'medical-claim' | 'trademark' | 'restricted-term' | 'legal';
  severity: 'low' | 'medium' | 'high';
  message: string;
  suggestedFix: string;
}

interface ImageTextMatch {
  attribute: string;
  matchScore: number;
  imageValue: string;
  textValue: string;
  status: 'match' | 'partial' | 'mismatch';
}

interface AISuggestion {
  type: 'rewrite' | 'seo' | 'persuasion' | 'clarity' | 'completeness';
  priority: 'low' | 'medium' | 'high';
  description: string;
  before: string;
  after: string;
  impact: number;
}

interface AttributeSuggestion {
  attribute: string;
  currentValue?: string;
  suggestedValue: string;
  confidence: number;
  reason: string;
}

interface CompetitorBenchmark {
  competitor: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
}

interface HistoricalData {
  date: string;
  score: number;
  improvements: string[];
}

// Main Component
const ProductDescriptionGrader: React.FC = () => {
  // State Management
  const [currentAnalysis, setCurrentAnalysis] = useState<DescriptionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [brandVoice, setBrandVoice] = useState('professional');
  const [category, setCategory] = useState('fashion');
  const [autoFixEnabled, setAutoFixEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [competitorBenchmarks, setCompetitorBenchmarks] = useState<CompetitorBenchmark[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [bulkResults, setBulkResults] = useState<DescriptionAnalysis[]>([]);

  // Sample product description for analysis
  const sampleDescription = `Premium Cotton T-Shirt - The ultimate comfort t-shirt made from 100% organic cotton. Perfect for everyday wear. Soft and breathable fabric keeps you cool all day long. Available in multiple sizes and colors. Machine washable.`;

  // Initialize with sample data
  useEffect(() => {
    loadSampleData();
    loadHistoricalData();
    loadCompetitorBenchmarks();
  }, []);

  const loadSampleData = () => {
    const analysis: DescriptionAnalysis = {
      id: 'analysis_001',
      sku: 'TSHIRT-BLK-M',
      productName: 'Premium Cotton T-Shirt',
      originalDescription: sampleDescription,
      category: 'fashion',
      brand: 'PremiumWear',
      
      overallScore: 72,
      scoreBreakdown: {
        contentQuality: 75,
        seo: 68,
        conversion: 70,
        compliance: 85,
        consistency: 62
      },
      
      readabilityScore: 78,
      fleschKincaidGrade: 8.2,
      grammarScore: 85,
      clarityScore: 72,
      
      completenessScore: 65,
      missingElements: ['Dimensions', 'Care instructions', 'Warranty', 'Use cases'],
      presentElements: ['Material', 'Features', 'Benefits'],
      
      seoScore: 68,
      keywordDensity: 1.8,
      keywordCoverage: 65,
      searchIntentMatch: 72,
      suggestedKeywords: ['organic cotton t-shirt', 'comfort t-shirt', 'breathable t-shirt', 'everyday wear'],
      lsiKeywords: ['soft fabric', 'natural material', 'casual wear', 'basic tee'],
      
      persuasionScore: 70,
      emotionalTriggers: ['comfort', 'everyday', 'perfect'],
      uspScore: 65,
      trustElements: ['100% organic', 'premium'],
      
      brandVoiceScore: 82,
      brandTone: 'professional',
      toneDeviations: ['Slightly too casual'],
      
      formattingScore: 75,
      structureScore: 68,
      scannabilityScore: 72,
      
      complianceScore: 85,
      riskFlags: [
        {
          type: 'over-promise',
          severity: 'low',
          message: '"ultimate comfort" could be considered over-promising',
          suggestedFix: 'Change to "excellent comfort" or "superior comfort"'
        }
      ],
      
      imageConsistencyScore: 62,
      imageTextMatches: [
        {
          attribute: 'color',
          matchScore: 85,
          imageValue: 'Black',
          textValue: 'Black',
          status: 'match'
        },
        {
          attribute: 'material',
          matchScore: 90,
          imageValue: 'Cotton',
          textValue: '100% organic cotton',
          status: 'match'
        },
        {
          attribute: 'fit',
          matchScore: 45,
          imageValue: 'Slim fit',
          textValue: 'Regular fit',
          status: 'mismatch'
        }
      ],
      mismatches: ['Fit type mismatch: image shows slim fit but description says regular fit'],
      
      aiSuggestions: [
        {
          type: 'seo',
          priority: 'high',
          description: 'Add more primary keywords',
          before: 'Premium Cotton T-Shirt',
          after: 'Premium 100% Organic Cotton T-Shirt for Men - Soft & Breathable',
          impact: 85
        },
        {
          type: 'completeness',
          priority: 'medium',
          description: 'Add missing product details',
          before: 'Available in multiple sizes',
          after: 'Available in sizes S-XXL with detailed size chart',
          impact: 75
        }
      ],
      improvedDescription: `Premium 100% Organic Cotton T-Shirt for Men

Experience ultimate comfort with our premium organic cotton t-shirt, crafted from 100% certified organic cotton for softness and breathability.

KEY FEATURES:
• 100% organic cotton fabric
• Breathable and moisture-wicking
• Reinforced seams for durability
• Tagless design for added comfort
• Machine washable, tumble dry low

PERFECT FOR:
• Everyday casual wear
• Layering under jackets
• Gym and active wear
• Weekend outings

SPECIFICATIONS:
• Material: 100% organic cotton
• Fit: Regular fit
• Care: Machine wash cold, tumble dry low
• Available in sizes: S, M, L, XL, XXL
• Colors: Black, White, Navy, Grey

Enjoy all-day comfort with our eco-friendly t-shirt that combines style, sustainability, and superior quality.`,
      attributeSuggestions: [
        {
          attribute: 'size',
          suggestedValue: 'S-XXL with size chart',
          confidence: 90,
          reason: 'Improves conversion and reduces returns'
        },
        {
          attribute: 'fit',
          suggestedValue: 'Slim fit (based on images)',
          confidence: 85,
          reason: 'Image analysis suggests slim fit'
        }
      ],
      
      competitorScore: 78,
      categoryBenchmark: 75,
      historicalImprovement: 12,
      
      analyzedAt: new Date().toISOString(),
      version: 1
    };
    
    setCurrentAnalysis(analysis);
  };

  const loadHistoricalData = () => {
    const data: HistoricalData[] = [];
    const now = new Date();
    
    for (let i = 90; i >= 0; i -= 10) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        score: 60 + Math.random() * 25 + (i / 10),
        improvements: i % 30 === 0 ? ['SEO optimization', 'Content expansion'] : ['Minor tweaks']
      });
    }
    
    setHistoricalData(data);
  };

  const loadCompetitorBenchmarks = () => {
    const benchmarks: CompetitorBenchmark[] = [
      {
        competitor: 'Brand A',
        score: 85,
        strengths: ['Strong SEO', 'Complete specs', 'Great formatting'],
        weaknesses: ['Weak emotional appeal', 'Limited keywords']
      },
      {
        competitor: 'Brand B',
        score: 78,
        strengths: ['Excellent persuasion', 'Great imagery'],
        weaknesses: ['Poor structure', 'Missing details']
      },
      {
        competitor: 'Brand C',
        score: 72,
        strengths: ['Good brand voice', 'Clear benefits'],
        weaknesses: ['Low SEO score', 'Incomplete information']
      },
      {
        competitor: 'Category Average',
        score: 75,
        strengths: ['Standard formatting', 'Basic SEO'],
        weaknesses: ['Lack of innovation', 'Generic descriptions']
      }
    ];
    
    setCompetitorBenchmarks(benchmarks);
  };

  // Analysis Functions
  const analyzeDescription = async (description: string, productName: string, sku: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate analysis based on input
    const newAnalysis: DescriptionAnalysis = {
      ...currentAnalysis!,
      id: `analysis_${Date.now()}`,
      sku: sku || currentAnalysis?.sku || 'NEW-PROD',
      productName: productName || currentAnalysis?.productName || 'New Product',
      originalDescription: description,
      analyzedAt: new Date().toISOString(),
      version: (currentAnalysis?.version || 0) + 1,
      overallScore: calculateOverallScore(description),
      completenessScore: calculateCompleteness(description),
      seoScore: calculateSEOScore(description),
      readabilityScore: calculateReadability(description)
    };
    
    setCurrentAnalysis(newAnalysis);
    setIsAnalyzing(false);
    
    // Add to history
    setHistoricalData(prev => [{
      date: new Date().toISOString().split('T')[0],
      score: newAnalysis.overallScore,
      improvements: ['New analysis']
    }, ...prev.slice(0, 9)]);
  };

  const calculateOverallScore = (text: string): number => {
    // Simplified scoring logic
    const words = text.split(' ').length;
    const sentences = text.split(/[.!?]+/).length - 1;
    const avgSentenceLength = words / Math.max(sentences, 1);
    
    let score = 50; // Base score
    
    // Adjust based on length
    if (words > 100) score += 10;
    else if (words > 50) score += 5;
    else if (words < 20) score -= 15;
    
    // Adjust based on sentence length
    if (avgSentenceLength > 25) score -= 10;
    else if (avgSentenceLength < 15) score += 5;
    
    // Keyword presence
    const keywords = ['premium', 'quality', 'comfort', 'durable', 'organic'];
    const keywordMatches = keywords.filter(kw => text.toLowerCase().includes(kw)).length;
    score += keywordMatches * 3;
    
    return Math.min(100, Math.max(0, score));
  };

  const calculateCompleteness = (text: string): number => {
    const checks = [
      'material', 'size', 'color', 'features', 'benefits',
      'care', 'warranty', 'specifications', 'use'
    ];
    
    const matches = checks.filter(check => 
      text.toLowerCase().includes(check)
    ).length;
    
    return Math.round((matches / checks.length) * 100);
  };

  const calculateSEOScore = (text: string): number => {
    let score = 50;
    
    // Check for common SEO elements
    if (text.length > 200) score += 10;
    if (text.includes('•') || text.includes('-')) score += 5; // Bullet points
    if (text.split('\n\n').length > 3) score += 5; // Paragraph structure
    
    // Keyword density check
    const words = text.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    score += Math.min(uniqueWords.size / words.length * 20, 20);
    
    return Math.min(100, score);
  };

  const calculateReadability = (text: string): number => {
    const words = text.split(' ').length;
    const sentences = text.split(/[.!?]+/).length - 1;
    const syllables = text.toLowerCase()
      .replace(/[^a-z]/g, '')
      .split('')
      .filter(char => 'aeiou'.includes(char)).length;
    
    if (words === 0 || sentences === 0) return 50;
    
    const flesch = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    
    // Convert Flesch score to 0-100 scale
    if (flesch >= 90) return 95; // Very easy
    if (flesch >= 80) return 85; // Easy
    if (flesch >= 70) return 75; // Fairly easy
    if (flesch >= 60) return 65; // Standard
    if (flesch >= 50) return 55; // Fairly difficult
    if (flesch >= 30) return 40; // Difficult
    return 25; // Very difficult
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreBorderColor = (score: number): string => {
    if (score >= 80) return 'border-green-200';
    if (score >= 60) return 'border-yellow-200';
    return 'border-red-200';
  };

  const handleBulkUpload = async (files: File[]) => {
    setBulkMode(true);
    setBulkFiles(files);
    
    // Simulate bulk analysis
    const results: DescriptionAnalysis[] = [];
    
    for (let i = 0; i < Math.min(files.length, 10); i++) {
      results.push({
        ...currentAnalysis!,
        id: `bulk_${i}`,
        sku: `SKU-${1000 + i}`,
        productName: `Product ${i + 1}`,
        originalDescription: `Sample description for product ${i + 1}`,
        overallScore: 60 + Math.random() * 30,
        analyzedAt: new Date().toISOString()
      });
    }
    
    setBulkResults(results);
  };

  const generateReport = () => {
    if (!currentAnalysis) return;
    
    const report = {
      analysis: currentAnalysis,
      generatedAt: new Date().toISOString(),
      summary: {
        strengths: [
          'Good readability',
          'Decent SEO foundation',
          'Clear brand voice'
        ],
        weaknesses: [
          'Missing product details',
          'Low keyword density',
          'Limited emotional appeal'
        ],
        recommendations: [
          'Add missing specifications',
          'Include more primary keywords',
          'Enhance benefit statements'
        ]
      }
    };
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `description-audit-${currentAnalysis.sku}-${new Date().toISOString().split('T')[0]}.json`);
    linkElement.click();
  };

  // Render Components
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Description Quality Score</span>
            <Badge variant="outline">v1.0</Badge>
          </CardTitle>
          <CardDescription>
            Combines readability, SEO strength, clarity, completeness, and conversion potential
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="col-span-1 lg:col-span-2">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-4 ${getScoreColor(currentAnalysis?.overallScore || 0)}`}>
                  {currentAnalysis?.overallScore || 0}/100
                </div>
                <Progress value={currentAnalysis?.overallScore || 0} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Poor</span>
                  <span>Average</span>
                  <span>Excellent</span>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Content Quality</span>
                    <span className="font-medium">{currentAnalysis?.scoreBreakdown.contentQuality || 0}%</span>
                  </div>
                  <Progress value={currentAnalysis?.scoreBreakdown.contentQuality || 0} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span className="text-sm">SEO & Discovery</span>
                    <span className="font-medium">{currentAnalysis?.scoreBreakdown.seo || 0}%</span>
                  </div>
                  <Progress value={currentAnalysis?.scoreBreakdown.seo || 0} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Conversion Potential</span>
                    <span className="font-medium">{currentAnalysis?.scoreBreakdown.conversion || 0}%</span>
                  </div>
                  <Progress value={currentAnalysis?.scoreBreakdown.conversion || 0} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="col-span-1 lg:col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <Card className={getScoreBorderColor(currentAnalysis?.readabilityScore || 0)}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Readability Score</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(currentAnalysis?.readabilityScore || 0)}`}>
                      {currentAnalysis?.readabilityScore || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Flesch-Kincaid: Grade {currentAnalysis?.fleschKincaidGrade || 0}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={getScoreBorderColor(currentAnalysis?.completenessScore || 0)}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Completeness</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(currentAnalysis?.completenessScore || 0)}`}>
                      {currentAnalysis?.completenessScore || 0}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentAnalysis?.missingElements?.length || 0} missing elements
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={getScoreBorderColor(currentAnalysis?.seoScore || 0)}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">SEO Optimization</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(currentAnalysis?.seoScore || 0)}`}>
                      {currentAnalysis?.seoScore || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Keyword density: {currentAnalysis?.keywordDensity || 0}%
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={getScoreBorderColor(currentAnalysis?.persuasionScore || 0)}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Persuasion Score</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(currentAnalysis?.persuasionScore || 0)}`}>
                      {currentAnalysis?.persuasionScore || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentAnalysis?.emotionalTriggers?.length || 0} emotional triggers
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    <i className="fas fa-robot mr-2"></i>
                    AI Rewrite
                  </Button>
                  <Button size="sm" variant="outline">
                    <i className="fas fa-search mr-2"></i>
                    SEO Optimize
                  </Button>
                  <Button size="sm" variant="outline">
                    <i className="fas fa-check-circle mr-2"></i>
                    Fix Completeness
                  </Button>
                  <Button size="sm" variant="outline">
                    <i className="fas fa-image mr-2"></i>
                    Check Image Consistency
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Improvement Tracking</CardTitle>
          <CardDescription>Score improvements, SEO impact, and click-through lift over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <RechartsTooltip />
              <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitor Benchmarking */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Benchmarking</CardTitle>
          <CardDescription>Your description vs. competitors or category standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Your Score</span>
                <Badge className="ml-2" variant="default">
                  {currentAnalysis?.overallScore || 0}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Category Benchmark</span>
                <Badge className="ml-2" variant="outline">
                  {currentAnalysis?.categoryBenchmark || 0}
                </Badge>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={competitorBenchmarks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="competitor" />
                <YAxis domain={[0, 100]} />
                <RechartsTooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Your Strengths</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Good readability
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Clear brand voice
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Legal compliance
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Areas to Improve</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                    Missing product details
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                    Low SEO optimization
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                    Image-text mismatches
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContentQuality = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readability Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Readability Score</CardTitle>
            <CardDescription>Flesch-Kincaid grade level, sentence clarity, jargon detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Overall Readability</span>
                  <Badge className="ml-2" variant={
                    (currentAnalysis?.readabilityScore || 0) >= 70 ? "default" : 
                    (currentAnalysis?.readabilityScore || 0) >= 50 ? "outline" : "destructive"
                  }>
                    {currentAnalysis?.readabilityScore || 0}/100
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Grade Level:</span>
                  <Badge className="ml-2" variant="outline">
                    {currentAnalysis?.fleschKincaidGrade || 0}
                  </Badge>
                </div>
              </div>
              
              <Progress value={currentAnalysis?.readabilityScore || 0} className="h-2" />
              
              <div className="space-y-2">
                <h4 className="font-semibold">Grammar & Fluency</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Grammar Score</span>
                  <Badge variant="secondary">{currentAnalysis?.grammarScore || 0}%</Badge>
                </div>
                <Progress value={currentAnalysis?.grammarScore || 0} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Clarity Score</span>
                  <Badge variant="secondary">{currentAnalysis?.clarityScore || 0}%</Badge>
                </div>
                <Progress value={currentAnalysis?.clarityScore || 0} className="h-2" />
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Complexity Detection</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Long sentences (25 words)</span>
                    <Badge variant="destructive">3 found</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Complex jargon terms</span>
                    <Badge variant="outline">2 found</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Passive voice usage</span>
                    <Badge variant="outline">Minimal</Badge>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                <i className="fas fa-magic mr-2"></i>
                Simplify Language
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Information Completeness */}
        <Card>
          <CardHeader>
            <CardTitle>Information Completeness Check</CardTitle>
            <CardDescription>Detects missing critical details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(currentAnalysis?.completenessScore || 0)}`}>
                  {currentAnalysis?.completenessScore || 0}%
                </div>
                <p className="text-sm text-muted-foreground">Complete information score</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Missing Elements</h4>
                <div className="space-y-2">
                  {currentAnalysis?.missingElements?.map((element, index) => (
                    <Alert key={index} variant="destructive" className="py-2">
                      <i className="fas fa-times-circle mr-2"></i>
                      <AlertDescription className="text-sm">{element}</AlertDescription>
                    </Alert>
                  ))}
                </div>
                
                <h4 className="font-semibold">Present Elements</h4>
                <div className="space-y-2">
                  {currentAnalysis?.presentElements?.map((element, index) => (
                    <Alert key={index} variant="default" className="py-2">
                      <i className="fas fa-check-circle mr-2 text-green-500"></i>
                      <AlertDescription className="text-sm">{element}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  <i className="fas fa-plus mr-2"></i>
                  Add Missing Details
                </Button>
                <Button>
                  <i className="fas fa-robot mr-2"></i>
                  AI Auto-complete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Redundancy & Fluff Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Redundancy & Fluff Analysis</CardTitle>
          <CardDescription>Repeated phrases, non-value words, overlong sentences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Repeated Phrases</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <p className="text-xs text-muted-foreground">Identified</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Non-value Words</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-red-600">12%</div>
                  <p className="text-xs text-muted-foreground">Of total words</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Sentence Length</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-green-600">18.2</div>
                  <p className="text-xs text-muted-foreground">Avg words/sentence</p>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Identified Issues</h4>
              <div className="space-y-2">
                {[
                  'Repeated use of "premium" (3 times)',
                  'Multiple filler words: "very", "really"',
                  'Sentence fragment: "Perfect for everyday wear."',
                  'Redundant phrase: "Soft and breathable fabric"'
                ].map((issue, index) => (
                  <div key={index} className="flex items-start p-2 border rounded">
                    <i className="fas fa-exclamation-triangle text-yellow-500 mr-2 mt-0.5"></i>
                    <span className="text-sm">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button className="w-full">
              <i className="fas fa-compress-alt mr-2"></i>
              Remove Fluff & Redundancies
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSEOAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Optimization Score */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Optimization Score</CardTitle>
            <CardDescription>Keyword coverage, density, search intent match</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(currentAnalysis?.seoScore || 0)}`}>
                  {currentAnalysis?.seoScore || 0}/100
                </div>
                <p className="text-sm text-muted-foreground">Overall SEO Score</p>
                <Progress value={currentAnalysis?.seoScore || 0} className="mt-2" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Keyword Density</span>
                    <span className="text-sm font-medium">{currentAnalysis?.keywordDensity || 0}%</span>
                  </div>
                  <Progress value={currentAnalysis?.keywordDensity || 0 * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">Optimal: 1-2%</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Keyword Coverage</span>
                    <span className="text-sm font-medium">{currentAnalysis?.keywordCoverage || 0}%</span>
                  </div>
                  <Progress value={currentAnalysis?.keywordCoverage || 0} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Search Intent Match</span>
                    <span className="text-sm font-medium">{currentAnalysis?.searchIntentMatch || 0}%</span>
                  </div>
                  <Progress value={currentAnalysis?.searchIntentMatch || 0} className="h-2" />
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Title/Meta Best Practices</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Title length (characters)</span>
                    <Badge variant="secondary">62/60</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Meta description length</span>
                    <Badge variant="destructive">180/160</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Primary keyword in title</span>
                    <Badge variant="default">Yes</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SERP Title Evaluation */}
        <Card>
          <CardHeader>
            <CardTitle>SERP Title / Subtitle Evaluation</CardTitle>
            <CardDescription>Length optimization and click-through potential</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Current Title</Label>
                <div className="p-3 border rounded mt-1 bg-gray-50">
                  <p className="font-medium">{currentAnalysis?.productName}</p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{currentAnalysis?.productName?.length || 0} characters</span>
                    <Badge variant={currentAnalysis?.productName && currentAnalysis.productName.length > 60 ? "destructive" : "secondary"}>
                      {currentAnalysis?.productName && currentAnalysis.productName.length > 60 ? "Too Long" : "Good"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Suggested Improved Title</Label>
                <div className="p-3 border rounded mt-1 bg-green-50 border-green-200">
                  <p className="font-medium text-green-700">
                    Premium 100% Organic Cotton T-Shirt for Men | Soft & Breathable
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>58 characters</span>
                    <Badge variant="secondary">Optimal</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Click-through Potential</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded">
                    <div className="text-2xl font-bold text-green-600">+35%</div>
                    <p className="text-xs text-muted-foreground">Estimated CTR improvement</p>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <div className="text-2xl font-bold text-blue-600">4.2/5</div>
                    <p className="text-xs text-muted-foreground">Engagement score</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                <i className="fas fa-check mr-2"></i>
                Apply Suggested Title
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tag & Attribute Coverage */}
      <Card>
        <CardHeader>
          <CardTitle>Tag & Attribute Coverage</CardTitle>
          <CardDescription>Checks if relevant tags are present</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { tag: 'Color', present: true, confidence: 85 },
                { tag: 'Category', present: true, confidence: 90 },
                { tag: 'Style', present: false, confidence: 45 },
                { tag: 'Material', present: true, confidence: 95 },
                { tag: 'Occasion', present: false, confidence: 30 },
                { tag: 'Use-case', present: true, confidence: 75 }
              ].map((item, index) => (
                <Card key={index} className={`${item.present ? 'border-green-200' : 'border-red-200'}`}>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">{item.tag}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 text-center">
                    <Badge variant={item.present ? "secondary" : "destructive"}>
                      {item.present ? "Present" : "Missing"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.confidence}% confidence
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">LSI Keyword Suggestions</h4>
              <div className="flex flex-wrap gap-2">
                {currentAnalysis?.lsiKeywords?.map((keyword, index) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
                {[
                  'soft fabric',
                  'natural material',
                  'casual wear',
                  'basic tee',
                  'everyday essential',
                  'comfort fit',
                  'breathable material',
                  'sustainable clothing'
                ].map((keyword, index) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <i className="fas fa-tags mr-2"></i>
                Add Missing Tags
              </Button>
              <Button>
                <i className="fas fa-robot mr-2"></i>
                AI Generate Tags
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConversionAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Persuasive Copy Score */}
        <Card>
          <CardHeader>
            <CardTitle>Persuasive Copy Score</CardTitle>
            <CardDescription>Emotional triggers, benefit explanations, social proof, trust elements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(currentAnalysis?.persuasionScore || 0)}`}>
                  {currentAnalysis?.persuasionScore || 0}/100
                </div>
                <p className="text-sm text-muted-foreground">Persuasion Effectiveness</p>
                <Progress value={currentAnalysis?.persuasionScore || 0} className="mt-2" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">USP Score</span>
                    <span className="text-sm font-medium">{currentAnalysis?.uspScore || 0}/100</span>
                  </div>
                  <Progress value={currentAnalysis?.uspScore || 0} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Emotional Appeal</span>
                    <span className="text-sm font-medium">65/100</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Benefit Clarity</span>
                    <span className="text-sm font-medium">72/100</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Emotional Triggers Found</h4>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis?.emotionalTriggers?.map((trigger, index) => (
                    <Badge key={index} variant="secondary">{trigger}</Badge>
                  ))}
                  {['Comfort', 'Confidence', 'Convenience', 'Quality', 'Value'].map((trigger, index) => (
                    <Badge key={index} variant="outline">{trigger}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Trust Elements</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { element: 'Material guarantee', present: true },
                    { element: 'Customer reviews', present: false },
                    { element: 'Quality certification', present: false },
                    { element: 'Return policy', present: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      {item.present ? (
                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      ) : (
                        <i className="fas fa-times-circle text-red-500 mr-2"></i>
                      )}
                      <span className="text-sm">{item.element}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brand Voice Matching */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Voice Matching</CardTitle>
            <CardDescription>Consistency with brand tone and flag deviations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Brand Voice Score</span>
                  <Badge className="ml-2" variant="secondary">
                    {currentAnalysis?.brandVoiceScore || 0}/100
                  </Badge>
                </div>
                <Select value={brandVoice} onValueChange={setBrandVoice}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Progress value={currentAnalysis?.brandVoiceScore || 0} />
              
              <div>
                <h4 className="font-semibold mb-2">Tone Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Current Tone</span>
                    <Badge variant="outline">{currentAnalysis?.brandTone || 'Professional'}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Target Tone</span>
                    <Badge variant="secondary">{brandVoice}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Match Score</span>
                    <Badge variant={
                      (currentAnalysis?.brandVoiceScore || 0) >= 80 ? "default" :
                      (currentAnalysis?.brandVoiceScore || 0) >= 60 ? "outline" : "destructive"
                    }>
                      {Math.round((currentAnalysis?.brandVoiceScore || 0) / 100 * 100)}%
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Tone Deviations</h4>
                <div className="space-y-2">
                  {currentAnalysis?.toneDeviations?.map((deviation, index) => (
                    <Alert key={index} variant="destructive" className="py-2">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      <AlertDescription className="text-sm">{deviation}</AlertDescription>
                    </Alert>
                  ))}
                  {[
                    'Sentence too casual for professional tone',
                    'Missing formal product specifications',
                    'Inconsistent terminology usage'
                  ].map((deviation, index) => (
                    <Alert key={index} variant="destructive" className="py-2">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      <AlertDescription className="text-sm">{deviation}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>
              
              <Button className="w-full">
                <i className="fas fa-voice mr-2"></i>
                Adjust to Brand Voice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formatting & Structure Evaluation */}
      <Card>
        <CardHeader>
          <CardTitle>Formatting & Structure Evaluation</CardTitle>
          <CardDescription>Best practice structure, bullets vs paragraphs, scannability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Formatting Score</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentAnalysis?.formattingScore || 0}</div>
                  <Progress value={currentAnalysis?.formattingScore || 0} className="mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Structure Score</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-green-600">{currentAnalysis?.structureScore || 0}</div>
                  <Progress value={currentAnalysis?.structureScore || 0} className="mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Scannability</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{currentAnalysis?.scannabilityScore || 0}</div>
                  <Progress value={currentAnalysis?.scannabilityScore || 0} className="mt-2" />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Structure Analysis</h4>
              <div className="space-y-2">
                {[
                  { section: 'Title/Header', present: true, score: 85 },
                  { section: 'Features/Bullets', present: true, score: 65 },
                  { section: 'Benefits Explanation', present: false, score: 30 },
                  { section: 'Usage/Applications', present: false, score: 25 },
                  { section: 'Specifications', present: false, score: 20 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center">
                      {item.present ? (
                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      ) : (
                        <i className="fas fa-times-circle text-red-500 mr-2"></i>
                      )}
                      <span className="text-sm">{item.section}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.score} className="w-20 h-2" />
                      <span className="text-sm font-medium">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <i className="fas fa-list-ul mr-2"></i>
                Add Bullet Points
              </Button>
              <Button>
                <i className="fas fa-sitemap mr-2"></i>
                Restructure Content
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLegalCompliance = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Claim Validation & Risk Flags</CardTitle>
          <CardDescription>Over-promises, medical/technical claims, trademark risks, restricted terminology</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Compliance Score</span>
                <Badge className="ml-2" variant="secondary">
                  {currentAnalysis?.complianceScore || 0}/100
                </Badge>
              </div>
              <Badge variant={
                (currentAnalysis?.complianceScore || 0) >= 90 ? "default" :
                (currentAnalysis?.complianceScore || 0) >= 70 ? "outline" : "destructive"
              }>
                {(currentAnalysis?.complianceScore || 0) >= 90 ? "Compliant" :
                 (currentAnalysis?.complianceScore || 0) >= 70 ? "Moderate Risk" : "High Risk"}
              </Badge>
            </div>
            
            <Progress value={currentAnalysis?.complianceScore || 0} />
            
            <div>
              <h4 className="font-semibold mb-2">Risk Flags Detected</h4>
              <div className="space-y-2">
                {currentAnalysis?.riskFlags?.map((flag, index) => (
                  <Alert key={index} variant={
                    flag.severity === 'high' ? 'destructive' :
                    flag.severity === 'medium' ? 'default' : 'default'
                  }>
                    <div className="flex items-start">
                      <i className={`fas fa-${
                        flag.severity === 'high' ? 'exclamation-triangle' :
                        flag.severity === 'medium' ? 'exclamation-circle' : 'info-circle'
                      } mr-2 mt-0.5`}></i>
                      <div>
                        <AlertTitle>{flag.type.replace('-', ' ').toUpperCase()}</AlertTitle>
                        <AlertDescription>
                          <p className="text-sm">{flag.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <strong>Suggested fix:</strong> {flag.suggestedFix}
                          </p>
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                ))}
                
                {[
                  {
                    type: 'medical-claim',
                    severity: 'high' as const,
                    message: '"Therapeutic comfort" could imply medical benefits',
                    suggestedFix: 'Change to "enhanced comfort" or "superior comfort"'
                  },
                  {
                    type: 'trademark',
                    severity: 'medium' as const,
                    message: '"Premium Cotton" might be trademarked in some regions',
                    suggestedFix: 'Add ® symbol or use descriptive alternatives'
                  }
                ].map((flag, index) => (
                  <Alert key={index} variant={flag.severity === 'high' ? 'destructive' : 'default'}>
                    <div className="flex items-start">
                      <i className={`fas fa-${
                        flag.severity === 'high' ? 'exclamation-triangle' :
                        flag.severity === 'medium' ? 'exclamation-circle' : 'info-circle'
                      } mr-2 mt-0.5`}></i>
                      <div>
                        <AlertTitle>{flag.type.replace('-', ' ').toUpperCase()}</AlertTitle>
                        <AlertDescription>
                          <p className="text-sm">{flag.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <strong>Suggested fix:</strong> {flag.suggestedFix}
                          </p>
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Restricted Terminology Check</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-red-600">Prohibited Terms</h5>
                  <div className="space-y-1">
                    {['cures', 'heals', 'medical grade', 'FDA approved', 'guaranteed results'].map((term, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <i className="fas fa-ban text-red-500 mr-2"></i>
                        <span>{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-green-600">Safe Alternatives</h5>
                  <div className="space-y-1">
                    {['promotes comfort', 'enhances', 'high quality', 'clinically tested', 'proven results'].map((term, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                        <span>{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="w-full">
              <i className="fas fa-gavel mr-2"></i>
              Auto-correct Compliance Issues
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderImageConsistency = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Image vs. Description Consistency</CardTitle>
          <CardDescription>AI-powered check of text matching product images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Consistency Score</span>
                <Badge className="ml-2" variant="secondary">
                  {currentAnalysis?.imageConsistencyScore || 0}/100
                </Badge>
              </div>
              <Badge variant={
                (currentAnalysis?.imageConsistencyScore || 0) >= 80 ? "default" :
                (currentAnalysis?.imageConsistencyScore || 0) >= 60 ? "outline" : "destructive"
              }>
                {(currentAnalysis?.imageConsistencyScore || 0) >= 80 ? "Consistent" :
                 (currentAnalysis?.imageConsistencyScore || 0) >= 60 ? "Partial Match" : "Mismatches Found"}
              </Badge>
            </div>
            
            <Progress value={currentAnalysis?.imageConsistencyScore || 0} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Image Upload</h4>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag & drop product images or click to upload
                  </p>
                  <Input type="file" multiple accept="image/*" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports: JPG, PNG, WEBP (Max: 10MB each)
                  </p>
                </div>
                
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Uploaded Images</h5>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-20 h-20 bg-gray-100 border rounded flex items-center justify-center">
                        <i className="fas fa-image text-gray-400"></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Attribute Matching Analysis</h4>
                <div className="space-y-2">
                  {currentAnalysis?.imageTextMatches?.map((match, index) => (
                    <Card key={index} className={
                      match.status === 'match' ? 'border-green-200' :
                      match.status === 'partial' ? 'border-yellow-200' : 'border-red-200'
                    }>
                      <CardHeader className="p-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm">{match.attribute}</CardTitle>
                          <Badge variant={
                            match.status === 'match' ? 'secondary' :
                            match.status === 'partial' ? 'outline' : 'destructive'
                          }>
                            {match.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">Image</p>
                            <p className="font-medium">{match.imageValue}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Text</p>
                            <p className="font-medium">{match.textValue}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs">Match Score</span>
                          <span className="text-xs font-medium">{match.matchScore}%</span>
                        </div>
                        <Progress value={match.matchScore} className="h-1 mt-1" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Mismatch Alerts</h4>
              <div className="space-y-2">
                {currentAnalysis?.mismatches?.map((mismatch, index) => (
                  <Alert key={index} variant="destructive">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    <AlertDescription className="text-sm">{mismatch}</AlertDescription>
                  </Alert>
                ))}
                {[
                  'Color mismatch: Image shows Navy Blue, description says Royal Blue',
                  'Pattern not mentioned: Image shows striped pattern',
                  'Missing visual attributes: Sleeve length not described'
                ].map((mismatch, index) => (
                  <Alert key={index} variant="destructive">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    <AlertDescription className="text-sm">{mismatch}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <i className="fas fa-sync-alt mr-2"></i>
                Re-analyze Images
              </Button>
              <Button>
                <i className="fas fa-edit mr-2"></i>
                Fix Description Mismatches
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAISuggestions = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auto-Generated Improved Description */}
        <Card>
          <CardHeader>
            <CardTitle>Auto-Generated Improved Description</CardTitle>
            <CardDescription>Full rewrite option, SEO-enhanced, brand voice aligned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Tabs defaultValue="original">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="original">Original</TabsTrigger>
                  <TabsTrigger value="improved">AI Improved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="original" className="space-y-2">
                  <div className="p-4 border rounded bg-gray-50">
                    <p className="text-sm whitespace-pre-line">{currentAnalysis?.originalDescription}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Score: {currentAnalysis?.overallScore || 0}/100
                  </div>
                </TabsContent>
                
                <TabsContent value="improved" className="space-y-2">
                  <div className="p-4 border rounded bg-green-50 border-green-200">
                    <p className="text-sm whitespace-pre-line text-green-800">{currentAnalysis?.improvedDescription}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Estimated improvement: +{Math.round(100 - (currentAnalysis?.overallScore || 0))} points
                    </div>
                    <Badge variant="secondary">AI Generated</Badge>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Rewrite Options</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Select defaultValue="seo">
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seo">SEO Optimized</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="benefits">Benefits-focused</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue={brandVoice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Brand voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="playful">Playful</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <i className="fas fa-redo mr-2"></i>
                  Regenerate
                </Button>
                <Button>
                  <i className="fas fa-check mr-2"></i>
                  Apply Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attribute Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Attribute Suggestions</CardTitle>
            <CardDescription>Size, fit, style, material, category, occasion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                {currentAnalysis?.attributeSuggestions?.map((suggestion, index) => (
                  <Card key={index}>
                    <CardHeader className="p-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">{suggestion.attribute}</CardTitle>
                        <Badge variant="secondary">{suggestion.confidence}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Current</p>
                          <p className="font-medium">{suggestion.currentValue || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Suggested</p>
                          <p className="font-medium text-green-600">{suggestion.suggestedValue}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{suggestion.reason}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Keyword Suggestions</h4>
                <div className="space-y-2">
                  <div>
                    <Label className="text-sm">Primary Keywords</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['organic cotton t-shirt', 'comfort t-shirt', 'premium basic tee'].map((kw, i) => (
                        <Badge key={i} variant="default">{kw}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm">Long-tail Keywords</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['men\'s organic cotton t-shirt', 'breathable everyday tee', 'soft premium basic shirt'].map((kw, i) => (
                        <Badge key={i} variant="outline">{kw}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                <i className="fas fa-check-double mr-2"></i>
                Apply All Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* A/B Copy Generator */}
      <Card>
        <CardHeader>
          <CardTitle>A/B Copy Generator</CardTitle>
          <CardDescription>Creates multiple improved versions automatically</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'SEO Focused', score: 85, focus: 'Keywords, meta optimization' },
                { title: 'Conversion Focused', score: 82, focus: 'Benefits, emotional appeal' },
                { title: 'Minimalist', score: 78, focus: 'Clarity, simplicity' },
                { title: 'Detailed', score: 88, focus: 'Completeness, specifications' },
                { title: 'Benefit-Driven', score: 84, focus: 'Customer benefits, value' },
                { title: 'Brand Voice', score: 80, focus: 'Tone consistency' }
              ].map((version, index) => (
                <Card key={index} className="hover:border-blue-300 cursor-pointer transition-colors">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">{version.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold">{version.score}</span>
                      <Badge variant="secondary">Score</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{version.focus}</p>
                    <Button size="sm" className="w-full mt-2">
                      <i className="fas fa-eye mr-2"></i>
                      Preview
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <i className="fas fa-plus mr-2"></i>
                Generate More Variants
              </Button>
              <Button>
                <i className="fas fa-sliders-h mr-2"></i>
                Run A/B Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBulkAnalysis = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Analysis Mode</CardTitle>
          <CardDescription>Upload 1,000+ product descriptions, generate scores + fixes in batch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <i className="fas fa-file-upload text-5xl text-gray-400 mb-6"></i>
              <p className="text-lg font-medium mb-2">Upload Product Descriptions</p>
              <p className="text-sm text-muted-foreground mb-6">
                Upload CSV, Excel, or JSON files with product descriptions
              </p>
              <Input 
                type="file" 
                multiple 
                accept=".csv,.xlsx,.xls,.json,.txt"
                onChange={(e) => e.target.files && handleBulkUpload(Array.from(e.target.files))}
                className="max-w-md mx-auto"
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supports: CSV, Excel, JSON, plain text. Max file size: 100MB
              </p>
            </div>
            
            {bulkMode && (
              <>
                <div>
                  <h4 className="font-semibold mb-2">Uploaded Files</h4>
                  <div className="space-y-2">
                    {bulkFiles.slice(0, 5).map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center">
                          <i className="fas fa-file text-gray-400 mr-2"></i>
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Badge variant="outline">{Math.round(file.size / 1024)}KB</Badge>
                      </div>
                    ))}
                    {bulkFiles.length > 5 && (
                      <div className="text-center text-sm text-muted-foreground">
                        +{bulkFiles.length - 5} more files
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Analysis Results</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Readability</TableHead>
                        <TableHead>SEO</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bulkResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{result.productName}</TableCell>
                          <TableCell>
                            <Badge variant={
                              result.overallScore >= 80 ? "default" :
                              result.overallScore >= 60 ? "outline" : "destructive"
                            }>
                              {result.overallScore}
                            </Badge>
                          </TableCell>
                          <TableCell>{result.readabilityScore}</TableCell>
                          <TableCell>{result.seoScore}</TableCell>
                          <TableCell>
                            <Badge variant="destructive">
                              {result.missingElements?.length || 0} missing
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Average Score</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(bulkResults.reduce((acc, r) => acc + r.overallScore, 0) / bulkResults.length)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Products Analyzed</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="text-2xl font-bold text-green-600">{bulkResults.length}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">Time Saved</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                      <div className="text-2xl font-bold text-purple-600">{bulkResults.length * 15} min</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline">
                    <i className="fas fa-download mr-2"></i>
                    Export Report (CSV)
                  </Button>
                  <Button variant="outline">
                    <i className="fas fa-file-pdf mr-2"></i>
                    Export Report (PDF)
                  </Button>
                  <Button>
                    <i className="fas fa-robot mr-2"></i>
                    Apply Bulk Fixes
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExports = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Downloadable Audit Report</CardTitle>
          <CardDescription>PDF/CSV reports with scores, insights, recommendations, before/after versions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:border-blue-300 cursor-pointer transition-colors" onClick={generateReport}>
                <CardHeader className="p-6">
                  <div className="text-center">
                    <i className="fas fa-file-pdf text-4xl text-red-500 mb-4"></i>
                    <CardTitle>PDF Report</CardTitle>
                    <CardDescription className="mt-2">
                      Comprehensive audit with visuals
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="hover:border-green-300 cursor-pointer transition-colors">
                <CardHeader className="p-6">
                  <div className="text-center">
                    <i className="fas fa-file-csv text-4xl text-green-500 mb-4"></i>
                    <CardTitle>CSV Export</CardTitle>
                    <CardDescription className="mt-2">
                      Raw data for analysis
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="hover:border-purple-300 cursor-pointer transition-colors">
                <CardHeader className="p-6">
                  <div className="text-center">
                    <i className="fas fa-file-excel text-4xl text-green-600 mb-4"></i>
                    <CardTitle>Excel Report</CardTitle>
                    <CardDescription className="mt-2">
                      Formatted for business review
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Report Contents</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {[
                    'Overall quality score',
                    'Score breakdown',
                    'Strengths & weaknesses',
                    'AI suggestions',
                    'Before/after comparison'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  {[
                    'Competitor benchmarking',
                    'Historical trends',
                    'Risk assessment',
                    'Implementation roadmap',
                    'ROI calculation'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Report Customization</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="include-charts" defaultChecked />
                      <label htmlFor="include-charts" className="ml-2 text-sm">Include charts</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="include-ai" defaultChecked />
                      <label htmlFor="include-ai" className="ml-2 text-sm">AI suggestions</label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="include-benchmarks" />
                      <label htmlFor="include-benchmarks" className="ml-2 text-sm">Competitor benchmarks</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="include-history" defaultChecked />
                      <label htmlFor="include-history" className="ml-2 text-sm">Historical data</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" size="lg" onClick={generateReport}>
                <i className="fas fa-download mr-2"></i>
                Generate & Download Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Main render
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Product Description Grader</h1>
            <p className="text-muted-foreground">
              AI-powered product description quality analyzer and optimizer
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              <i className="fas fa-bolt mr-2"></i>
              AI Powered
            </Badge>
            <Button variant="outline" onClick={generateReport}>
              <i className="fas fa-download mr-2"></i>
              Export Report
            </Button>
          </div>
        </div>

        {/* Product Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Analyze Product Description</CardTitle>
            <CardDescription>
              Paste your product description or upload product data for comprehensive analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Product Name</Label>
                  <Input 
                    placeholder="Enter product name"
                    defaultValue={currentAnalysis?.productName}
                  />
                </div>
                <div>
                  <Label>SKU</Label>
                  <Input 
                    placeholder="Enter SKU"
                    defaultValue={currentAnalysis?.sku}
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Product Description</Label>
                <Textarea 
                  placeholder="Paste your product description here..."
                  className="min-h-[200px] mt-2"
                  defaultValue={currentAnalysis?.originalDescription}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch checked={autoFixEnabled} onCheckedChange={setAutoFixEnabled} />
                    <Label className="text-sm">Auto-apply fixes</Label>
                  </div>
                  
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
  size="lg" 
  onClick={() => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    const nameInput = document.querySelector('input[placeholder="Enter product name"]') as HTMLInputElement;
    const skuInput = document.querySelector('input[placeholder="Enter SKU"]') as HTMLInputElement;
    
    analyzeDescription(
      textarea?.value || '',
      nameInput?.value || '',
      skuInput?.value || ''
    );
  }}
  disabled={isAnalyzing}
>
                  {isAnalyzing ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search mr-2"></i>
                      Analyze Description
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ScrollArea className="w-full">
            <TabsList className="grid grid-cols-6 lg:grid-cols-10 mb-6 min-w-max">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content Quality</TabsTrigger>
              <TabsTrigger value="seo">SEO & Discovery</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
              <TabsTrigger value="legal">Legal & Compliance</TabsTrigger>
              <TabsTrigger value="images">Image Consistency</TabsTrigger>
              <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Analysis</TabsTrigger>
              <TabsTrigger value="exports">Exports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </ScrollArea>
          
          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>
          
          <TabsContent value="content">
            {renderContentQuality()}
          </TabsContent>
          
          <TabsContent value="seo">
            {renderSEOAnalysis()}
          </TabsContent>
          
          <TabsContent value="conversion">
            {renderConversionAnalysis()}
          </TabsContent>
          
          <TabsContent value="legal">
            {renderLegalCompliance()}
          </TabsContent>
          
          <TabsContent value="images">
            {renderImageConsistency()}
          </TabsContent>
          
          <TabsContent value="ai">
            {renderAISuggestions()}
          </TabsContent>
          
          <TabsContent value="bulk">
            {renderBulkAnalysis()}
          </TabsContent>
          
          <TabsContent value="exports">
            {renderExports()}
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Settings</CardTitle>
                <CardDescription>Configure how the analyzer evaluates descriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Category-Specific Scoring Models</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Current Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="home">Home & Garden</SelectItem>
                            <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                            <SelectItem value="sports">Sports & Outdoors</SelectItem>
                            <SelectItem value="food">Food & Beverage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Scoring Weight</Label>
                        <Select defaultValue="balanced">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="seo-heavy">SEO Focused</SelectItem>
                            <SelectItem value="conversion-heavy">Conversion Focused</SelectItem>
                            <SelectItem value="compliance-heavy">Compliance Focused</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">AI Settings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable AI suggestions</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-apply low-risk fixes</span>
                        <Switch checked={autoFixEnabled} onCheckedChange={setAutoFixEnabled} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Multi-language support</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Zero-metadata recovery</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Brand Configuration</h4>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm">Brand Voice</Label>
                        <Select value={brandVoice} onValueChange={setBrandVoice}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="playful">Playful & Fun</SelectItem>
                            <SelectItem value="luxury">Luxury & Premium</SelectItem>
                            <SelectItem value="minimal">Minimal & Clean</SelectItem>
                            <SelectItem value="technical">Technical & Detailed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Brand Keywords</Label>
                        <Input placeholder="Enter brand-specific keywords (comma separated)" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <i className="fas fa-save mr-2"></i>
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Avg. Improvement</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-green-600">+28%</div>
              <p className="text-xs text-muted-foreground">With AI optimization</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Time Saved</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-blue-600">15min</div>
              <p className="text-xs text-muted-foreground">Per description</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">CTR Impact</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-purple-600">+35%</div>
              <p className="text-xs text-muted-foreground">Optimized descriptions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">SEO Lift</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-orange-600">+42%</div>
              <p className="text-xs text-muted-foreground">Organic visibility</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionGrader;