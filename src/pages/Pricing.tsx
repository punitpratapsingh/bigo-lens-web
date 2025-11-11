import { Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 10,000 searches/month",
        "Basic auto-tagging",
        "Email support",
        "API access",
        "1 user seat",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "$299",
      description: "For growing e-commerce businesses",
      features: [
        "Up to 100,000 searches/month",
        "Advanced auto-tagging",
        "Priority support",
        "Full API access",
        "5 user seats",
        "Custom recommendations",
        "Advanced analytics",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale operations",
      features: [
        "Unlimited searches",
        "Custom AI model training",
        "24/7 dedicated support",
        "Unlimited API access",
        "Unlimited user seats",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const addons = [
    {
      name: "Additional Users",
      price: "$20/user/month",
      description: "Add more team members to your workspace",
    },
    {
      name: "Extra API Calls",
      price: "$50/10k calls",
      description: "Scale beyond your plan limits",
    },
    {
      name: "Custom Model Training",
      price: "Contact us",
      description: "Train models on your specific product catalog",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 relative ${
                  plan.popular ? "border-primary border-2 shadow-glow" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                    {plan.price !== "Custom" && (
                      <span className="text-lg text-muted-foreground font-normal">/month</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Add-ons</h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Customize your plan with additional features
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {addons.map((addon) => (
                <Card key={addon.name} className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{addon.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{addon.price}</p>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Can I change plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                },
                {
                  q: "What happens after my free trial?",
                  a: "After your 14-day free trial, you'll be automatically enrolled in your chosen plan. You can cancel anytime before the trial ends.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No, there are no setup fees or hidden costs. You only pay the monthly subscription.",
                },
              ].map((faq) => (
                <Card key={faq.q} className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team is here to help you find the perfect plan for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">Schedule a Call</Button>
              <Button size="lg" variant="outline">Contact Sales</Button>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
