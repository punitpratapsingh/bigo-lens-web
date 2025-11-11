import { Target, Users, Lightbulb, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Democratizing visual AI for e-commerce businesses of all sizes",
    },
    {
      icon: Users,
      title: "Customer-First",
      description: "Your success is our success. We're here to support your growth",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pushing the boundaries of what's possible with computer vision",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality AI products",
    },
  ];

  const stats = [
    { number: "10M+", label: "Images Processed Daily" },
    { number: "500+", label: "Enterprise Customers" },
    { number: "99.9%", label: "Uptime SLA" },
    { number: "50+", label: "Team Members" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transforming E-commerce with Visual AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the future of product discovery and catalog management through cutting-edge computer vision technology.
          </p>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-4">
                Founded in 2020, big O Lens was born from a simple observation: e-commerce businesses were struggling to manage massive product catalogs and deliver intuitive shopping experiences.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our founding team of AI researchers and e-commerce veterans set out to solve this problem using state-of-the-art computer vision technology. Today, we power visual search and intelligent product tagging for hundreds of leading brands worldwide.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that every business should have access to enterprise-grade AI tools, and we're committed to making visual AI accessible, affordable, and easy to integrate.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground">Meet the people building big O Lens</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Sarah Chen", role: "CEO & Co-Founder", image: "SC" },
              { name: "Michael Rodriguez", role: "CTO & Co-Founder", image: "MR" },
              { name: "Emily Watson", role: "Head of Product", image: "EW" },
            ].map((member) => (
              <Card key={member.name} className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {member.image}
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
