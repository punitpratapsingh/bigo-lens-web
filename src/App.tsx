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
import VirtualTryOn from "@/pages/VirtualTryOn";
import MultiObjectClassification from "@/pages/MultiObjectClassification";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Blogs from "@/pages/blogs";
import Newsletter from "@/pages/newsletter";
import Publications from "@/pages/publications";
import CaseStudies from "@/pages/CaseStudies";
import ROICalculator from "@/pages/ROI";
import Events from "./pages/events";
import WhyBigOLens from "@/pages/whyBigO";
import Demo from "@/pages/demo";
import CustomerReviews from "@/pages/TheWallOfLove";
import Products from "@/pages/Products";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Login from "@/pages/login";
import SignUp from "@/pages/signUp";
import ForgotPassword from "@/pages/ForgotPassword";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ChatBot from "./pages/ChatBot";

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
          <Route path="/solutions/virtual-try-on" element={<VirtualTryOn />} />
          <Route path="/solutions/multi-object-classification" element={<MultiObjectClassification />} />
          <Route path="/login/signUp/terms-of-service" element={<TermsOfService />} />
          <Route path="/login/signUp/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/resources/blogs" element={<Blogs />} />
          <Route path="/about/TheWallOfLove" element={<CustomerReviews />} />
          <Route path="/resources/newsletters" element={<Newsletter />} />
          <Route path="/resources/case-studies" element={<CaseStudies />} />
          <Route path="/resources/events" element={<Events/>}/>
          <Route path="/resources/publications" element={<Publications />} />
          <Route path="/resources/roi-calculator" element={<ROICalculator />} />
          <Route path="/about/whyBigO" element={<WhyBigOLens />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
        {/* FOOTER AT BOTTOM */}
        
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
