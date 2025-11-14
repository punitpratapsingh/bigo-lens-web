import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";

// Pages
import Index from "@/pages/Index";
import ProductDiscovery from "@/pages/ProductDiscovery";
import AITagging from "@/pages/AITagging";
import DescriptionGeneration from "@/pages/DescriptionGeneration";
import ProductRecommendation from "@/pages/ProductRecommendation";
import Personalization from "@/pages/Personalization";
import ImgtoVideo from "@/pages/ImgtoVideo";
import Blogs from "@/pages/blogs";
import Newsletter from "@/pages/newsletter";
import Publications from "@/pages/publications";
import CaseStudies from "@/pages/CaseStudies";
import ROICalculator from "@/pages/ROI";
import WhyBigOLens from "@/pages/whyBigO";
import Demo from "@/pages/demo";
import Products from "@/pages/Products";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Login from "@/pages/login";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* NAVBAR AT TOP */}
        <Navbar />

        {/* ALL ROUTES */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/solutions/product-discovery" element={<ProductDiscovery />} />
          <Route path="/solutions/auto-tagging" element={<AITagging />} />
          <Route path="/solutions/description-generation" element={<DescriptionGeneration />} />
          <Route path="/solutions/recommendation" element={<ProductRecommendation />} />
          <Route path="/solutions/personalization" element={<Personalization />} />
          <Route path="/solutions/imgtovideo" element={<ImgtoVideo />} />

          <Route path="/resources/blogs" element={<Blogs />} />
          <Route path="/resources/newsletters" element={<Newsletter />} />
          <Route path="/resources/case-studies" element={<CaseStudies />} />
          <Route path="/resources/publications" element={<Publications />} />
          <Route path="/resources/roi-calculator" element={<ROICalculator />} />

          <Route path="/whyBigO" element={<WhyBigOLens />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* FOOTER AT BOTTOM */}
        
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
