import { Search, Tag, TrendingUp, BarChart3, Zap, Shield, Globe, Cpu } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Products = () => {
  const products = [
    {
      id: "lenssearch",
      icon: Search,
      name: "LensSearch",
      tagline: "Visual Search, Redefined",
      description: "Enable customers to search your catalog using images. Upload a photo and find visually similar products instantly.",
      features: [
        "Reverse image search",
        "Real-time similarity matching",
        "Multi-product detection",
        "Cross-category search",
      ],
      color: "from-primary to-accent",
    },
    {
      id: "lenstag",
      icon: Tag,
      name: "LensTag",
      tagline: "Intelligent Auto-Tagging",
      description: "Automatically tag and categorize products with AI-powered recognition. Save hours on manual product data entry.",
      features: [
        "Automated attribute extraction",
        "Multi-label classification",
        "Custom taxonomy support",
        "Batch processing",
      ],
      color: "from-accent to-primary",
    },
    {
      id: "lensrecom",
      icon: TrendingUp,
      name: "LensRecom",
      tagline: "Smart Recommendations",
      description: "Deliver personalized product recommendations based on visual similarity and customer behavior patterns.",
      features: [
        "Visual similarity engine",
        "Behavioral analysis",
        "Cross-sell optimization",
        "A/B testing built-in",
      ],
      color: "from-primary to-accent",
    },
    {
      id: "lensanalytics",
      icon: BarChart3,
      name: "LensAnalytics",
      tagline: "Insights That Matter",
      description: "Comprehensive analytics dashboard to track search patterns, product performance, and customer insights.",
      features: [
        "Real-time dashboards",
        "Visual search trends",
        "Product performance metrics",
        "Custom reporting",
      ],
      color: "from-accent to-primary",
    },
  ];

  const capabilities = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process millions of images in seconds",
    },
    {
      icon: Shield,
      title: "Enterprise Ready",
      description: "SOC 2 compliant with 99.9% uptime",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "CDN-powered for worldwide performance",
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "State-of-the-art computer vision models",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Visual AI Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete suite of visual AI tools designed to transform your e-commerce experience
          </p>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 py-16 space-y-24">
          {products.map((product, index) => (
            <div
              key={product.id}
              id={product.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="flex-1">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-2">{product.name}</h2>
                <p className="text-xl text-accent font-semibold mb-4">{product.tagline}</p>
                <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button size="lg" variant="default">
                  Learn More
                </Button>
              </div>

              <div className="flex-1">
                <Card className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 border-2 flex items-center justify-center">
                  <product.icon className="w-32 h-32 text-primary/20" />
                </Card>
              </div>
            </div>
          ))}
        </section>

        {/* Capabilities Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Scale</h2>
            <p className="text-xl text-muted-foreground">Enterprise-grade infrastructure powering your visual AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability) => (
              <Card key={capability.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <capability.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Store?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with a 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">Start Free Trial</Button>
              <Button size="lg" variant="outline">Schedule Demo</Button>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
