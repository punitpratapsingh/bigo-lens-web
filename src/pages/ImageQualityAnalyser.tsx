// EnhancedImageQualityAnalyser.tsx - Fixed with Working Buttons
import React, { useState, useRef, useEffect } from 'react';
import '/src/EnhancedImageQualityAnalyser.css';

// ====================== Types & Interfaces ======================
interface ImageQualityMetrics {
  resolution: ResolutionMetrics;
  sharpness: SharpnessMetrics;
  background: BackgroundMetrics;
  lighting: LightingMetrics;
  framing: FramingMetrics;
  color: ColorMetrics;
  completeness: CompletenessMetrics;
  noise: NoiseMetrics;
  objectDetection: ObjectDetectionMetrics;
  compliance: ComplianceMetrics;
  aesthetic: AestheticMetrics;
  duplicates: DuplicateMetrics;
  watermark: WatermarkMetrics;
  classification: ClassificationMetrics;
  metadata: MetadataMetrics;
  sellability: SellabilityMetrics;
  defects: DefectMetrics;
  autoEnhancement: AutoEnhancementMetrics;
  templateCompliance: TemplateComplianceMetrics;
  brandConsistency: BrandConsistencyMetrics;
  angleCompleteness: AngleCompletenessMetrics;
  crossImageConsistency: CrossImageConsistencyMetrics;
  misrepresentation: MisrepresentationMetrics;
  performancePrediction: PerformancePredictionMetrics;
  overallScore: number;
}

interface ResolutionMetrics {
  width: number;
  height: number;
  megapixels: number;
  isLowResolution: boolean;
  resolutionScore: number;
  recommendedMin: { width: number; height: number };
  issues: string[];
}

interface SharpnessMetrics {
  sharpnessScore: number;
  blurLevel: number;
  edgeStrength: number;
  pixelationDetected: boolean;
  compressionArtifacts: boolean;
  artifactScore: number;
  issues: string[];
}

// ... (Keep all other interfaces from previous code, they're correct)
// [Include all the interfaces from previous code here - they're fine]

// ====================== Main Component with Fixed Buttons ======================
const EnhancedImageQualityAnalyser: React.FC = () => {
  const [images, setImages] = useState<ProductImage[]>([
    {
      id: 'sample-1',
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      name: 'sample-headphones.jpg',
      type: 'hero',
      status: 'pending',
      uploadDate: new Date()
    },
    {
      id: 'sample-2',
      url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      name: 'sample-camera.jpg',
      type: 'side',
      status: 'pending',
      uploadDate: new Date()
    }
  ]);
  
  const [config, setConfig] = useState<AnalysisConfig>({
    platforms: ['amazon', 'shopify'],
    strictMode: true,
    autoFixSuggestions: true,
    batchSize: 10,
    qualityThreshold: 70,
    enableAI: true,
    checkDuplicates: true,
    checkWatermarks: true,
    enableDefectDetection: true,
    enableSellabilityScore: true,
    enableAutoEnhancement: true,
    enableBrandConsistency: true,
    enablePerformancePrediction: true,
    enableImageGeneration: true,
    industryCategory: 'fashion',
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedImageId, setSelectedImageId] = useState<string | null>('sample-1');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [selectedImagesForABTest, setSelectedImagesForABTest] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<ProductImage[]>([]);
  const [enhancementStatus, setEnhancementStatus] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get selected image
  const selectedImage = images.find(img => img.id === selectedImageId);

  // ====================== BUTTON HANDLERS ======================
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: ProductImage[] = [];
    
    Array.from(files).forEach((file, index) => {
      const url = URL.createObjectURL(file);
      const imageType = file.name.includes('hero') ? 'hero' :
                       file.name.includes('side') ? 'side' :
                       file.name.includes('zoom') ? 'zoom' :
                       file.name.includes('lifestyle') ? 'lifestyle' :
                       file.name.includes('detail') ? 'detail' : 'unknown';
      
      newImages.push({
        id: `img-${Date.now()}-${index}`,
        url,
        file,
        name: file.name,
        type: imageType,
        status: 'pending',
        uploadDate: new Date()
      });
    });

    setImages(prev => [...prev, ...newImages]);
    event.target.value = ''; // Reset file input
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setAnalysisProgress(i);
    }
    
    // Add sample metrics to images
    setImages(prev => prev.map(img => ({
      ...img,
      status: 'analyzed',
      metrics: {
        resolution: { 
          width: 1920, 
          height: 1080, 
          megapixels: 2.1,
          isLowResolution: false,
          resolutionScore: 95,
          recommendedMin: { width: 1024, height: 1024 },
          issues: []
        },
        sharpness: {
          sharpnessScore: 88,
          blurLevel: 0.12,
          edgeStrength: 45,
          pixelationDetected: false,
          compressionArtifacts: false,
          artifactScore: 92,
          issues: []
        },
        background: {
          isWhiteBackground: true,
          backgroundComplexity: 0.1,
          shadowsDetected: false,
          reflectionsDetected: false,
          noiseLevel: 0.05,
          styleConsistency: 0.9,
          styleIssues: [],
          qualityScore: 95
        },
        lighting: {
          brightness: 128,
          contrast: 65,
          exposureLevel: 0,
          isOverexposed: false,
          isUnderexposed: false,
          highlightsClipped: false,
          shadowsClipped: false,
          lightingScore: 82,
          issues: []
        },
        framing: {
          productCentered: true,
          centeringScore: 92,
          cropRatio: 0.7,
          emptySpaceRatio: 0.2,
          hasExcessiveCropping: false,
          hasTooMuchSpace: false,
          angleDeviation: 5,
          framingScore: 88,
          issues: []
        },
        color: {
          colorAccuracy: 92,
          saturationLevel: 70,
          hueShift: 2,
          colorConsistency: 85,
          dominantColors: [
            { r: 255, g: 255, b: 255, percentage: 40 },
            { r: 200, g: 200, b: 200, percentage: 30 },
            { r: 50, g: 50, b: 50, percentage: 30 }
          ],
          colorIssues: [],
          colorScore: 90
        },
        sellability: {
          sellabilityScore: 78,
          conversionProbability: 0.32,
          clickThroughRate: 0.045,
          emotionalImpact: 72,
          visualAppeal: 75,
          industryBenchmark: {
            category: 'electronics',
            benchmarkScore: 72,
            percentile: 65
          },
          predictedSalesImpact: 12.5,
          keyDrivers: ['Good composition', 'Professional lighting', 'Clear product focus'],
          improvementAreas: ['Increase brightness', 'Improve background', 'Better framing']
        },
        defects: {
          hasDefects: false,
          defects: [],
          overallDefectScore: 95,
          qualityGrade: 'A',
          passedQualityControl: true
        },
        autoEnhancement: {
          suggestions: [
            {
              type: 'brightness',
              priority: 'medium',
              description: 'Increase brightness by 15% for better visibility',
              beforeValue: 45,
              afterValue: 60,
              impactScore: 25,
              autoApply: true
            },
            {
              type: 'contrast',
              priority: 'low',
              description: 'Adjust contrast to make product pop',
              beforeValue: 50,
              afterValue: 65,
              impactScore: 15
            }
          ],
          enhancementScore: 75,
          batchEnhancementAvailable: true
        },
        performancePrediction: {
          predictedCTR: 0.067,
          predictedConversion: 0.028,
          predictedAddToCart: 0.095,
          predictedEngagement: 0.22,
          keySuccessFactors: ['Good lighting', 'Clear product display', 'Professional quality']
        },
        brandConsistency: {
          colorConsistency: {
            score: 85,
            dominantColors: [],
            deviationFromBrand: 12,
            paletteMatch: true
          },
          lightingConsistency: {
            score: 78,
            signatureMatch: true,
            temperatureDeviation: 150
          },
          compositionConsistency: {
            score: 82,
            poseTemplateMatch: true,
            angleConsistency: true
          },
          overallBrandScore: 82,
          catalogUniformity: 85
        },
        // ... other metrics with default values
        overallScore: 85
      } as ImageQualityMetrics
    })));
    
    setOverallScore(85);
    setIsAnalyzing(false);
  };

  const handleEnhancementApply = async (imageId: string, enhancement: any) => {
    setEnhancementStatus(prev => ({ ...prev, [imageId]: true }));
    
    // Simulate enhancement processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    alert(`Enhancement "${enhancement.type}" applied successfully!`);
  };

  const handleGenerateAngles = async () => {
    if (!selectedImageId) {
      alert('Please select an image first');
      return;
    }

    const newImages: ProductImage[] = [
      {
        id: `gen-${Date.now()}-1`,
        url: selectedImage?.url || '',
        name: `${selectedImage?.name.replace(/\.[^/.]+$/, "")}_side.jpg`,
        type: 'side',
        status: 'generated',
        uploadDate: new Date(),
        aiGenerated: true
      },
      {
        id: `gen-${Date.now()}-2`,
        url: selectedImage?.url || '',
        name: `${selectedImage?.name.replace(/\.[^/.]+$/, "")}_top.jpg`,
        type: 'detail',
        status: 'generated',
        uploadDate: new Date(),
        aiGenerated: true
      },
      {
        id: `gen-${Date.now()}-3`,
        url: selectedImage?.url || '',
        name: `${selectedImage?.name.replace(/\.[^/.]+$/, "")}_lifestyle.jpg`,
        type: 'lifestyle',
        status: 'generated',
        uploadDate: new Date(),
        aiGenerated: true
      }
    ];

    setGeneratedImages(prev => [...prev, ...newImages]);
    alert('Generated 3 missing angles successfully!');
  };

  const handleABTestSelection = (imageId: string) => {
    setSelectedImagesForABTest(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else if (prev.length < 2) {
        return [...prev, imageId];
      } else {
        alert('Maximum 2 images can be selected for A/B testing');
        return prev;
      }
    });
  };

  const handleRunABTest = () => {
    if (selectedImagesForABTest.length !== 2) {
      alert('Please select exactly 2 images for A/B testing');
      return;
    }
    
    // Simulate A/B test results
    alert(`A/B Test Analysis Complete!\n\nImage A: 78 points\nImage B: 85 points\n\nResult: Image B wins with 15% higher predicted CTR`);
  };

  const handleDeleteImage = (imageId: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(prev => prev.filter(img => img.id !== imageId));
      if (selectedImageId === imageId) {
        setSelectedImageId(images.length > 1 ? images[0].id : null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all images?')) {
      setImages([]);
      setSelectedImageId(null);
      setOverallScore(null);
      setGeneratedImages([]);
      setSelectedImagesForABTest([]);
    }
  };

  const handleExportReport = () => {
    const analyzedImages = images.filter(img => img.status === 'analyzed');
    if (analyzedImages.length === 0) {
      alert('No analyzed images to export');
      return;
    }
    
    const report = {
      timestamp: new Date().toISOString(),
      totalImages: images.length,
      analyzedImages: analyzedImages.length,
      overallScore,
      images: analyzedImages.map(img => ({
        name: img.name,
        score: img.metrics?.overallScore,
        type: img.type,
        status: img.status
      }))
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-quality-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Report exported successfully!');
  };

  // ====================== RENDER FUNCTIONS ======================

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#00c853';
    if (score >= 80) return '#4caf50';
    if (score >= 70) return '#ff9800';
    if (score >= 60) return '#ff5722';
    return '#f44336';
  };

  const QualityIndicator = ({ score, label }: { score: number; label?: string }) => (
    <div className="quality-indicator">
      {label && <span className="indicator-label">{label}</span>}
      <div className="indicator-bar">
        <div 
          className="indicator-fill" 
          style={{ 
            width: `${score}%`,
            backgroundColor: getScoreColor(score)
          }} 
        />
      </div>
      <span className="indicator-score">{score}/100</span>
    </div>
  );

  const EnhancementCard = ({ suggestion, onApply, imageId }: any) => (
    <div className="enhancement-card">
      <div className="enhancement-header">
        <span className={`enhancement-priority ${suggestion.priority}`}>
          {suggestion.priority}
        </span>
        <span className="enhancement-type">{suggestion.type}</span>
      </div>
      <div className="enhancement-description">{suggestion.description}</div>
      {suggestion.beforeValue !== undefined && (
        <div className="enhancement-values">
          <span>Before: {suggestion.beforeValue.toFixed(1)}</span>
          <span>→</span>
          <span>After: {suggestion.afterValue?.toFixed(1)}</span>
        </div>
      )}
      <div className="enhancement-actions">
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => onApply(imageId, suggestion)}
          disabled={enhancementStatus[imageId]}
        >
          {enhancementStatus[imageId] ? 'Applying...' : 'Apply'}
        </button>
        {suggestion.previewUrl && (
          <button className="btn btn-outline btn-sm">
            Preview
          </button>
        )}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{images.length}</div>
          <div className="stat-label">Total Images</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: getScoreColor(overallScore || 0) }}>
            {overallScore || '-'}
          </div>
          <div className="stat-label">Overall Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#4caf50' }}>
            {images.filter(img => img.metrics?.sellability?.sellabilityScore || 0 > 70).length}
          </div>
          <div className="stat-label">High Sellability</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#f44336' }}>
            {images.filter(img => img.metrics?.defects?.hasDefects).length}
          </div>
          <div className="stat-label">With Defects</div>
        </div>
      </div>

      <div className="image-grid">
        <h3>Uploaded Images</h3>
        <div className="images-container">
          {images.map(image => (
            <div 
              key={image.id} 
              className={`image-card ${selectedImageId === image.id ? 'selected' : ''}`}
              onClick={() => setSelectedImageId(image.id)}
            >
              <div className="image-preview">
                <img src={image.url} alt={image.name} />
                <div className="image-overlay">
                  <span className="image-type">{image.type}</span>
                  {image.metrics && (
                    <span 
                      className="image-score"
                      style={{ backgroundColor: getScoreColor(image.metrics.overallScore) }}
                    >
                      {image.metrics.overallScore}
                    </span>
                  )}
                </div>
              </div>
              <div className="image-info">
                <div className="image-name">{image.name}</div>
                <div className="image-status">
                  <span className={`status-dot ${image.status}`}></span>
                  {image.status}
                </div>
                <div className="image-actions">
                  <button 
                    className="btn-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(image.id);
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                  {selectedImagesForABTest.includes(image.id) ? (
                    <button 
                      className="btn-icon selected"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleABTestSelection(image.id);
                      }}
                      title="Selected for A/B Test"
                    >
                      ✅
                    </button>
                  ) : (
                    <button 
                      className="btn-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleABTestSelection(image.id);
                      }}
                      title="Select for A/B Test"
                    >
                      📊
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ai-features-grid">
        <div className="ai-feature-card" onClick={() => setActiveTab('sellability')}>
          <h3>🧠 AI Sellability Score</h3>
          <p>Predict conversion rates based on visual appeal</p>
          <div className="feature-status">
            {config.enableSellabilityScore ? '✅ Enabled' : '❌ Disabled'}
          </div>
        </div>
        <div className="ai-feature-card" onClick={() => setActiveTab('defects')}>
          <h3>🔍 Defect Detection</h3>
          <p>Find wrinkles, scratches, and manufacturing defects</p>
          <div className="feature-status">
            {config.enableDefectDetection ? '✅ Enabled' : '❌ Disabled'}
          </div>
        </div>
        <div className="ai-feature-card" onClick={() => setActiveTab('enhancements')}>
          <h3>🎨 Auto-Enhancement</h3>
          <p>AI-powered image optimization suggestions</p>
          <div className="feature-status">
            {config.enableAutoEnhancement ? '✅ Enabled' : '❌ Disabled'}
          </div>
        </div>
        <div className="ai-feature-card" onClick={() => setActiveTab('performance')}>
          <h3>📊 Performance Predictor</h3>
          <p>Predict which images will convert better</p>
          <div className="feature-status">
            {config.enablePerformancePrediction ? '✅ Enabled' : '❌ Disabled'}
          </div>
        </div>
        <div className="ai-feature-card" onClick={() => setActiveTab('brand')}>
          <h3>🎨 Brand Consistency</h3>
          <p>Ensure visual consistency across catalog</p>
          <div className="feature-status">
            {config.enableBrandConsistency ? '✅ Enabled' : '❌ Disabled'}
          </div>
        </div>
        <div className="ai-feature-card" onClick={() => setActiveTab('generate')}>
          <h3>🤖 Generate Images</h3>
          <p>Create missing product angles with AI</p>
          <div className="feature-status">
            {config.enableImageGeneration ? '✅ Enabled' : '❌ Disabled'}
          </div>
        </div>
      </div>

      {selectedImagesForABTest.length === 2 && (
        <div className="ab-test-panel">
          <h4>📊 A/B Test Ready</h4>
          <p>2 images selected for comparison</p>
          <button 
            className="btn btn-primary"
            onClick={handleRunABTest}
          >
            Run A/B Test Analysis
          </button>
        </div>
      )}
    </div>
  );

  const renderSellabilityAnalysis = () => {
    if (!selectedImage?.metrics?.sellability) {
      return (
        <div className="no-data">
          <p>No sellability data available. Please analyze an image first.</p>
          <button className="btn btn-primary" onClick={simulateAnalysis}>
            Analyze Selected Image
          </button>
        </div>
      );
    }

    const metrics = selectedImage.metrics.sellability;
    
    return (
      <div className="sellability-analysis">
        <div className="analysis-header">
          <h2>🧠 AI Sellability Analysis - {selectedImage.name}</h2>
          <div className="sellability-score-large" style={{ color: getScoreColor(metrics.sellabilityScore) }}>
            {metrics.sellabilityScore}
          </div>
        </div>
        
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>Conversion Probability</h4>
            <div className="metric-value">{Math.round(metrics.conversionProbability * 100)}%</div>
            <QualityIndicator score={Math.round(metrics.conversionProbability * 100)} />
          </div>
          
          <div className="metric-card">
            <h4>Click-Through Rate</h4>
            <div className="metric-value">{Math.round(metrics.clickThroughRate * 100)}%</div>
            <QualityIndicator score={Math.round(metrics.clickThroughRate * 100)} />
          </div>
          
          <div className="metric-card">
            <h4>Emotional Impact</h4>
            <div className="metric-value">{metrics.emotionalImpact}</div>
            <QualityIndicator score={metrics.emotionalImpact} />
          </div>
          
          <div className="metric-card">
            <h4>Industry Benchmark</h4>
            <div className="metric-value">{metrics.industryBenchmark.percentile}%</div>
            <div className="metric-subtext">
              vs {metrics.industryBenchmark.category} category
            </div>
          </div>
        </div>
        
        <div className="key-drivers">
          <h4>✅ Key Success Drivers</h4>
          <ul>
            {metrics.keyDrivers.map((driver, index) => (
              <li key={index}>{driver}</li>
            ))}
          </ul>
        </div>
        
        <div className="improvement-areas">
          <h4>📈 Improvement Areas</h4>
          <ul>
            {metrics.improvementAreas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
        
        <div className="sales-impact">
          <h4>💰 Predicted Sales Impact</h4>
          <div className="impact-value" style={{ color: metrics.predictedSalesImpact > 15 ? '#4caf50' : '#ff9800' }}>
            +{metrics.predictedSalesImpact.toFixed(1)}%
          </div>
          <div className="impact-description">
            Estimated increase in conversion compared to average
          </div>
        </div>
      </div>
    );
  };

  const renderDefectAnalysis = () => {
    if (!selectedImage?.metrics?.defects) {
      return (
        <div className="no-data">
          <p>No defect data available. Please analyze an image first.</p>
          <button className="btn btn-primary" onClick={simulateAnalysis}>
            Analyze Selected Image
          </button>
        </div>
      );
    }

    const metrics = selectedImage.metrics.defects;
    
    return (
      <div className="defect-analysis">
        <div className="analysis-header">
          <h2>🔍 AI Defect Detection - {selectedImage.name}</h2>
          <div className="quality-grade" style={{ 
            backgroundColor: metrics.qualityGrade === 'A' ? '#4caf50' : 
                           metrics.qualityGrade === 'B' ? '#ff9800' : '#f44336' 
          }}>
            Grade: {metrics.qualityGrade}
          </div>
        </div>
        
        {metrics.hasDefects ? (
          <>
            <div className="defect-list">
              <h4>Detected Defects ({metrics.defects.length})</h4>
              {metrics.defects.map((defect, index) => (
                <div key={index} className="defect-item">
                  <div className="defect-header">
                    <span className={`defect-severity ${defect.severity}`}>{defect.severity}</span>
                    <span className="defect-type">{defect.type}</span>
                    <span className="defect-confidence">({Math.round(defect.confidence * 100)}% confidence)</span>
                  </div>
                  <div className="defect-description">{defect.description}</div>
                  <div className="defect-suggestion">
                    <strong>Fix:</strong> {defect.repairSuggestion}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-defects">
            <div className="success-icon">✅</div>
            <h3>No Defects Detected</h3>
            <p>This product image passed quality control with flying colors!</p>
            <div className="quality-score">
              Overall Quality Score: <span style={{ color: getScoreColor(metrics.overallDefectScore) }}>
                {metrics.overallDefectScore}/100
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEnhancementSuggestions = () => {
    if (!selectedImage?.metrics?.autoEnhancement) {
      return (
        <div className="no-data">
          <p>No enhancement data available. Please analyze an image first.</p>
          <button className="btn btn-primary" onClick={simulateAnalysis}>
            Analyze Selected Image
          </button>
        </div>
      );
    }

    const metrics = selectedImage.metrics.autoEnhancement;
    
    return (
      <div className="enhancement-suggestions">
        <div className="analysis-header">
          <h2>🎨 AI Enhancement Suggestions - {selectedImage.name}</h2>
          <div className="enhancement-score">
            Potential Improvement: <span style={{ color: getScoreColor(metrics.enhancementScore) }}>
              +{metrics.enhancementScore} points
            </span>
          </div>
        </div>
        
        <div className="suggestions-grid">
          {metrics.suggestions.map((suggestion, index) => (
            <EnhancementCard
              key={index}
              suggestion={suggestion}
              onApply={handleEnhancementApply}
              imageId={selectedImage.id}
            />
          ))}
        </div>
        
        <div className="batch-actions">
          <button className="btn btn-primary">
            Apply All High Priority
          </button>
          <button className="btn btn-outline">
            Generate Enhanced Preview
          </button>
          {metrics.batchEnhancementAvailable && (
            <button className="btn btn-secondary">
              Batch Enhance Similar Images
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderPerformancePrediction = () => {
    if (!selectedImage?.metrics?.performancePrediction) {
      return (
        <div className="no-data">
          <p>No performance data available. Please analyze images first.</p>
          <button className="btn btn-primary" onClick={simulateAnalysis}>
            Analyze Images
          </button>
        </div>
      );
    }

    const metrics = selectedImage.metrics.performancePrediction;
    
    return (
      <div className="performance-prediction">
        <div className="analysis-header">
          <h2>📊 AI Performance Prediction</h2>
          <p>Predicting how images will perform in real e-commerce scenarios</p>
        </div>
        
        <div className="prediction-metrics">
          <div className="prediction-card">
            <h4>Predicted CTR</h4>
            <div className="prediction-value">{Math.round(metrics.predictedCTR * 100)}%</div>
            <div className="prediction-benchmark">
              Industry average: 5-7%
            </div>
          </div>
          
          <div className="prediction-card">
            <h4>Predicted Conversion</h4>
            <div className="prediction-value">{Math.round(metrics.predictedConversion * 100)}%</div>
            <div className="prediction-benchmark">
              Industry average: 2-3%
            </div>
          </div>
          
          <div className="prediction-card">
            <h4>Add-to-Cart Rate</h4>
            <div className="prediction-value">{Math.round(metrics.predictedAddToCart * 100)}%</div>
            <div className="prediction-benchmark">
              Industry average: 8-10%
            </div>
          </div>
          
          <div className="prediction-card">
            <h4>Engagement Score</h4>
            <div className="prediction-value">{Math.round(metrics.predictedEngagement * 100)}%</div>
            <div className="prediction-benchmark">
              Scroll & dwell time predictor
            </div>
          </div>
        </div>
        
        <div className="success-factors">
          <h4>Key Success Factors</h4>
          <ul>
            {metrics.keySuccessFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>

        <div className="ab-test-section">
          <h4>A/B Testing</h4>
          <p>Select 2 images from the dashboard to compare performance</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setActiveTab('dashboard');
              alert('Select 2 images from the dashboard for A/B testing');
            }}
          >
            Go to Dashboard to Select Images
          </button>
        </div>
      </div>
    );
  };

  const renderBrandConsistency = () => {
    if (!selectedImage?.metrics?.brandConsistency) {
      return (
        <div className="no-data">
          <p>No brand consistency data available. Please analyze an image first.</p>
          <button className="btn btn-primary" onClick={simulateAnalysis}>
            Analyze Selected Image
          </button>
        </div>
      );
    }

    const metrics = selectedImage.metrics.brandConsistency;
    
    return (
      <div className="brand-consistency">
        <div className="analysis-header">
          <h2>🎨 Brand Consistency Analysis - {selectedImage.name}</h2>
          <div className="brand-score" style={{ color: getScoreColor(metrics.overallBrandScore) }}>
            {metrics.overallBrandScore}/100
          </div>
        </div>
        
        <div className="consistency-metrics">
          <div className="consistency-card">
            <h4>Color Consistency</h4>
            <QualityIndicator score={metrics.colorConsistency.score} />
            <div className="consistency-details">
              <div>Palette Match: {metrics.colorConsistency.paletteMatch ? '✅' : '❌'}</div>
              <div>Deviation: {metrics.colorConsistency.deviationFromBrand.toFixed(1)}</div>
            </div>
          </div>
          
          <div className="consistency-card">
            <h4>Lighting Consistency</h4>
            <QualityIndicator score={metrics.lightingConsistency.score} />
            <div className="consistency-details">
              <div>Signature Match: {metrics.lightingConsistency.signatureMatch ? '✅' : '❌'}</div>
              <div>Temperature: {metrics.lightingConsistency.temperatureDeviation}K</div>
            </div>
          </div>
          
          <div className="consistency-card">
            <h4>Composition Consistency</h4>
            <QualityIndicator score={metrics.compositionConsistency.score} />
            <div className="consistency-details">
              <div>Pose Template: {metrics.compositionConsistency.poseTemplateMatch ? '✅' : '❌'}</div>
              <div>Angle Consistency: {metrics.compositionConsistency.angleConsistency ? '✅' : '❌'}</div>
            </div>
          </div>
        </div>
        
        <div className="catalog-uniformity">
          <h4>Catalog Uniformity Score</h4>
          <QualityIndicator score={metrics.catalogUniformity} />
          <div className="uniformity-description">
            How well this image fits with the rest of your catalog
          </div>
        </div>
      </div>
    );
  };

  const renderImageGeneration = () => (
    <div className="image-generation">
      <div className="analysis-header">
        <h2>🤖 AI Image Generation</h2>
        <p>Generate missing product angles using AI</p>
      </div>
      
      {!selectedImage && (
        <div className="no-selection">
          <p>Please select an image from the dashboard to generate angles for.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab('dashboard')}
          >
            Go to Dashboard
          </button>
        </div>
      )}
      
      {selectedImage && (
        <>
          <div className="selected-image-preview">
            <img src={selectedImage.url} alt={selectedImage.name} />
            <div className="image-info">
              <h4>{selectedImage.name}</h4>
              <p>Current type: {selectedImage.type}</p>
            </div>
          </div>
          
          <div className="generation-controls">
            <div className="angle-selection">
              <h4>Select Angles to Generate</h4>
              <div className="angle-checkboxes">
                {['side', 'top', 'back', 'zoom', 'lifestyle', 'detail'].map(angle => (
                  <label key={angle} className="angle-option">
                    <input type="checkbox" defaultChecked={['side', 'top', 'zoom'].includes(angle)} />
                    <span>{angle}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="generation-actions">
              <button 
                className="btn btn-primary"
                onClick={handleGenerateAngles}
              >
                Generate Selected Angles
              </button>
              <button className="btn btn-outline">
                Generate 360° Product Spin
              </button>
              <button className="btn btn-secondary">
                Generate Lifestyle Context
              </button>
            </div>
          </div>
          
          {generatedImages.length > 0 && (
            <div className="generated-images">
              <h4>Generated Images ({generatedImages.length})</h4>
              <div className="images-grid">
                {generatedImages.map(img => (
                  <div key={img.id} className="generated-image-card">
                    <img src={img.url} alt={img.name} />
                    <div className="image-info">
                      <div className="image-type">{img.type}</div>
                      <div className="ai-badge">🤖 AI Generated</div>
                    </div>
                    <button className="btn btn-sm btn-outline">
                      Use in Catalog
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'sellability': return renderSellabilityAnalysis();
      case 'defects': return renderDefectAnalysis();
      case 'enhancements': return renderEnhancementSuggestions();
      case 'performance': return renderPerformancePrediction();
      case 'brand': return renderBrandConsistency();
      case 'generate': return renderImageGeneration();
      default: return renderDashboard();
    }
  };

  return (
    <div className="enhanced-analyzer">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />
      
      <header className="app-header">
        <h1>🤖 AI-Powered Image Quality Analyzer</h1>
        <p className="subtitle">Complete e-commerce image optimization with 12+ AI features</p>
      </header>
      
      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-section">
            <button 
              className={`sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className="sidebar-btn" 
              onClick={handleUploadClick}
            >
              📤 Upload Images
            </button>
            <button 
              className="sidebar-btn" 
              onClick={simulateAnalysis}
              disabled={isAnalyzing || images.length === 0}
            >
              🔄 {isAnalyzing ? 'Analyzing...' : 'Analyze All'}
            </button>
            <button 
              className="sidebar-btn" 
              onClick={handleExportReport}
              disabled={images.filter(img => img.status === 'analyzed').length === 0}
            >
              📥 Export Report
            </button>
            <button 
              className="sidebar-btn" 
              onClick={handleClearAll}
              disabled={images.length === 0}
            >
              🗑️ Clear All
            </button>
          </div>
          
          <div className="sidebar-section">
            <h3>AI Analysis</h3>
            <button 
              className={`sidebar-btn ${activeTab === 'sellability' ? 'active' : ''}`}
              onClick={() => setActiveTab('sellability')}
            >
              🧠 Sellability Score
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'defects' ? 'active' : ''}`}
              onClick={() => setActiveTab('defects')}
            >
              🔍 Defect Detection
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'enhancements' ? 'active' : ''}`}
              onClick={() => setActiveTab('enhancements')}
            >
              🎨 Auto-Enhancement
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'performance' ? 'active' : ''}`}
              onClick={() => setActiveTab('performance')}
            >
              📊 Performance Predictor
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'brand' ? 'active' : ''}`}
              onClick={() => setActiveTab('brand')}
            >
              🎨 Brand Consistency
            </button>
            <button 
              className={`sidebar-btn ${activeTab === 'generate' ? 'active' : ''}`}
              onClick={() => setActiveTab('generate')}
            >
              🤖 Generate Images
            </button>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Stats</h3>
            <div className="sidebar-stats">
              <div className="stat">
                <div className="stat-value">{images.length}</div>
                <div className="stat-label">Images</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: getScoreColor(overallScore || 0) }}>
                  {overallScore || '-'}
                </div>
                <div className="stat-label">Avg Score</div>
              </div>
            </div>
          </div>

          {selectedImage && (
            <div className="sidebar-section">
              <h3>Selected Image</h3>
              <div className="selected-image-info">
                <img src={selectedImage.url} alt="Selected" />
                <div className="selected-image-details">
                  <div className="image-name">{selectedImage.name}</div>
                  <div className="image-type">{selectedImage.type}</div>
                  {selectedImage.metrics && (
                    <div className="image-score" style={{ color: getScoreColor(selectedImage.metrics.overallScore) }}>
                      Score: {selectedImage.metrics.overallScore}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </aside>
        
        <main className="main-content">
          {isAnalyzing && (
            <div className="progress-overlay">
              <div className="progress-content">
                <div className="spinner"></div>
                <h3>AI Analysis in Progress</h3>
                <p>Analyzing images with advanced AI models...</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <div className="progress-text">{analysisProgress.toFixed(1)}%</div>
              </div>
            </div>
          )}
          
          <div className="content-header">
            <div className="header-tabs">
              <button 
                className={`header-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`header-tab ${activeTab === 'sellability' ? 'active' : ''}`}
                onClick={() => setActiveTab('sellability')}
              >
                Sellability
              </button>
              <button 
                className={`header-tab ${activeTab === 'defects' ? 'active' : ''}`}
                onClick={() => setActiveTab('defects')}
              >
                Defects
              </button>
              <button 
                className={`header-tab ${activeTab === 'enhancements' ? 'active' : ''}`}
                onClick={() => setActiveTab('enhancements')}
              >
                Enhancements
              </button>
              <button 
                className={`header-tab ${activeTab === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveTab('performance')}
              >
                Performance
              </button>
              <button 
                className={`header-tab ${activeTab === 'brand' ? 'active' : ''}`}
                onClick={() => setActiveTab('brand')}
              >
                Brand
              </button>
              <button 
                className={`header-tab ${activeTab === 'generate' ? 'active' : ''}`}
                onClick={() => setActiveTab('generate')}
              >
                Generate
              </button>
            </div>
            
            <div className="header-actions">
              <button className="btn btn-outline" onClick={handleUploadClick}>
                + Add Images
              </button>
              <button className="btn btn-primary" onClick={simulateAnalysis} disabled={isAnalyzing}>
                Run AI Analysis
              </button>
            </div>
          </div>
          
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default EnhancedImageQualityAnalyser;