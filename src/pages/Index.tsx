import { ArrowRight, Search, Tag, TrendingUp, BarChart3, CheckCircle2, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const products = [
    {
      icon: Search,
      name: "LensSearch",
      description: "Visual search powered by AI. Let customers find products using images.",
      color: "from-primary to-accent",
    },
    {
      icon: Tag,
      name: "LensTag",
      description: "Automated product tagging and categorization at scale.",
      color: "from-accent to-primary",
    },
    {
      icon: TrendingUp,
      name: "LensRecom",
      description: "Personalized product recommendations based on visual similarity.",
      color: "from-primary to-accent",
    },
    {
      icon: BarChart3,
      name: "LensAnalytics",
      description: "Deep insights into search patterns and product performance.",
      color: "from-accent to-primary",
    },
  ];

  const features = [
    "99.9% accuracy rate",
    "Real-time processing",
    "Easy API integration",
    "Scalable infrastructure",
    "24/7 support",
    "SOC 2 compliant",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Visual AI Technology" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-primary">
              Visual AI for E-commerce
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Transform your product catalog with cutting-edge computer vision. 
              Search, tag, recommend, and analyze with big O Lens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default" className="text-lg">
                Start Free Trial <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Schedule Demo
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10M+", label: "Images Processed" },
              { number: "500+", label: "Brands" },
              { number: "99.9%", label: "Accuracy" },
              { number: "<100ms", label: "Response Time" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Visual AI Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Four powerful products working together to revolutionize your e-commerce experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <Card key={product.name} className="p-8 hover:shadow-xl transition-shadow group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <Link to="/products" className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline">
                Explore All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose big O Lens?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade infrastructure built for modern e-commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Sub-100ms response times with global CDN distribution",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "SOC 2 certified with end-to-end encryption",
              },
              {
                icon: CheckCircle2,
                title: "Easy Integration",
                description: "RESTful APIs with SDKs for major platforms",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 shadow-glow">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Store?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of leading brands using big O Lens to power their visual AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default" className="text-lg">
                Start Free Trial
              </Button>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-lg">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
