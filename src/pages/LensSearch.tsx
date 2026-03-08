import { motion } from "framer-motion";
import { Search, Eye, Camera, ShoppingBag, Globe, Zap, Image, FileText, Map, Maximize, CheckCircle, ArrowRight, TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const platforms = [
  {
    name: "Google Lens",
    desc: "Introduced in 2017, Google Lens allows users to capture images to gain information — identify plants, search for handbags, learn about locations, or translate signs. Used over 10 billion times a month, it's one of the most popular visual search platforms with advanced capabilities through Google Photos, Google App, and Google Assistant.",
    icon: Search,
  },
  {
    name: "Pinterest Lens",
    desc: "With over 600 million searches per month, Pinterest Lens lets users search for products and ideas through images. Introduced in 2017, it's popular for discovering fashion inspiration, home décor ideas, and recipes. Its 'shop the look' feature allows users to find, save, and purchase products directly.",
    icon: Camera,
  },
  {
    name: "Amazon StyleSnap",
    desc: "Introduced in 2019 by Amazon Fashion, StyleSnap allows users to click pictures of products and upload them to find similar items. Initially designed for fashion, it expanded to furnishings in 2020 and is now integrating with Instagram for a seamless shopping experience.",
    icon: ShoppingBag,
  },
  {
    name: "Snapchat Camera Search",
    desc: "Released in 2018, Snapchat Camera Search lets users search for products on Amazon by recognizing objects or barcodes. The Snapchat Scan feature uses image recognition and Augmented Reality (AR) technologies, transforming Snapchat into a visual search platform.",
    icon: Eye,
  },
  {
    name: "Bing Visual Search",
    desc: "Available on the Bing app and website, Bing Visual Search uses deep learning algorithms to identify images and offer results. Introduced in 2009 by Microsoft, it allows users to search for similar products, plants, animals, or locations.",
    icon: Globe,
  },
];

const benefits = [
  {
    icon: Users,
    title: "Gain the Attention of the Next Generation",
    desc: "The human mind processes visual images faster than textual data. Visual search is more popular among younger generations who discover brands on social media. Most Gen-Z shoppers purchase products directly from such platforms, making visual search a game-changer for brand engagement.",
  },
  {
    icon: TrendingUp,
    title: "Establish a Relationship with New Clients",
    desc: "Visual discovery helps customers develop an emotional connection which leads to less price sensitivity. It's especially helpful when users can't describe a product — providing visual information makes your website more customer-friendly and builds lasting relationships.",
  },
  {
    icon: ShoppingBag,
    title: "Sell to Clients Who've Already Decided",
    desc: "Visual information plays a crucial role in the customer journey and influences purchase decisions. Websites with highly optimized content attract more customers who have already decided to buy, especially those searching on Amazon StyleSnap or Pinterest Lens.",
  },
  {
    icon: DollarSign,
    title: "Boost Your Income",
    desc: "Shopping through visual search improves conversion rates by 64%. The visual search market is expected to reach $77 billion by 2025. Early adopters of visual search will have a significant edge over competitors.",
  },
];

const techniques = [
  {
    icon: FileText,
    title: "Implement Structured Data",
    desc: "Structured data makes it easier for search engines to understand your images. It provides semantic meanings to assets and enables search engines to recognize your website content for visual searches.",
  },
  {
    icon: Image,
    title: "Insert Alternative Text",
    desc: "Alt text helps search engines understand image context and makes it easier for users to discover your content. Ensure it's short, well-written, and contains SEO-optimized keywords.",
  },
  {
    icon: FileText,
    title: "Use Expressive Filenames",
    desc: "Search engines crawl image file names. Instead of leaving defaults like IMG_56124.jpg, rename files descriptively to help search engines understand your content.",
  },
  {
    icon: Map,
    title: "Have a Graphic Sitemap",
    desc: "Image sitemaps enhance visibility to search engines, especially for JavaScript-loaded images. Organize visuals structurally so search engines can catalog, crawl, and index them seamlessly.",
  },
  {
    icon: Maximize,
    title: "Optimize Image Size & Formats",
    desc: "Use high-quality images with proper formats and small file sizes for faster loading. Google Images supports GIF, BMP, PNG, SVG, JPEG, and WebP formats.",
  },
];

const considerations = [
  "Improve your website speed",
  "Ensure your website is accessible",
  "Optimize your site content",
  "Ensure that the images used are original",
  "Improve the overall performance of your website",
  "Use high-resolution images",
];

const LensSearch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Visual Search Technology</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Complete Guide to{" "}
              <span className="text-primary">Visual Search</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Search engines have transformed the way we seek information. But search has evolved beyond text — voice search and visual search are now popular methods of searching online. Discover how visual search impacts customer engagement and buying decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/demo")}>
                Try LensSearch <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/contact")}>
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Visual Search */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What is Visual Search?</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Visual search allows users to search for information using images instead of typing a text or keyword. This option is especially useful when people don't know how to describe what they are looking for using accurate words. Using screenshots, photographs, or Internet images and uploading them to search engines like Google Lens or Amazon StyleSnap, online shoppers can find the products they wish to buy.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Visual search uses artificial intelligence and works by combining <strong className="text-foreground">computer vision</strong> and <strong className="text-foreground">machine learning</strong>. When users take a photograph of something they are looking for, the software identifies the image and offers similar search results.
              </p>
            </motion.div>

            {/* Visual vs Image Search */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="mt-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visual Search vs Image Search</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Visual Search</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Uses media as primary input and identifies objects through machine learning, image recognition, and computer vision technologies. Searches are carried out using images only.
                  </p>
                </Card>
                <Card className="p-6 border-accent/20 bg-accent/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Search className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold">Image Search</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Text-based queries using keywords or URLs. Provides results based on text-based metadata related to the image, like the file name or alt tags.
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Visual Search Platforms</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leading platforms that are shaping the future of visual search technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {platforms.map((p, i) => (
              <motion.div key={p.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="p-6 h-full hover:shadow-glow transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <p.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{p.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Websites Benefit from Visual Search</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              As computer vision and machine learning become more capable, visual search provides a lucrative opportunity for retailers to increase discovery and conversion rates.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5">
                    <b.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats highlight */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            {[
              { value: "64%", label: "Conversion Rate Increase" },
              { value: "$77B", label: "Market by 2025" },
              { value: "10B+", label: "Google Lens Monthly Searches" },
              { value: "600M+", label: "Pinterest Lens Monthly Searches" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Techniques */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Techniques for Visual Search</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              To gain greater visibility on visual search engines, ensure your website has optimized images with these best practices.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {techniques.map((t, i) => (
              <motion.div key={t.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="p-6 flex gap-5 items-start hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <t.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Considerations */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-4xl mx-auto mt-16">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
              <h3 className="text-2xl font-bold mb-6">Additional Elements to Consider</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {considerations.map((c) => (
                  <div key={c} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{c}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want Your eCommerce Site to Rank Higher?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Optimize, rank, and flourish your online store's performance with our award-winning visual search strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/demo")}>
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LensSearch;
