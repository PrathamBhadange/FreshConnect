import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import SupplierStore from "./pages/SupplierStore";
import Messages from "./pages/Messages";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { MapPin, MessageCircle, ShoppingCart, User, Truck, Store } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
          <Route path="/supplier/:supplierId" element={<Layout><SupplierStore /></Layout>} />
          <Route path="/map" element={<Layout><PlaceholderPage title="Find Suppliers" description="Locate nearby suppliers with real-time locations and stock" icon={<MapPin className="h-12 w-12 text-primary" />} /></Layout>} />
          <Route path="/orders" element={<Layout><PlaceholderPage title="My Orders" description="Track your orders and order history" icon={<ShoppingCart className="h-12 w-12 text-primary" />} /></Layout>} />
          <Route path="/messages" element={<Layout><Messages /></Layout>} />
          <Route path="/profile" element={<Layout><PlaceholderPage title="Profile" description="Manage your account settings" icon={<User className="h-12 w-12 text-primary" />} /></Layout>} />
          <Route path="/vendor-signup" element={<Layout><PlaceholderPage title="Vendor Registration" description="Join as a street food vendor" icon={<Truck className="h-12 w-12 text-vendor" />} /></Layout>} />
          <Route path="/supplier-signup" element={<Layout><PlaceholderPage title="Supplier Registration" description="Register as a fresh produce supplier" icon={<Store className="h-12 w-12 text-supplier" />} /></Layout>} />
          <Route path="/supplier-dashboard" element={<Layout><PlaceholderPage title="Supplier Dashboard" description="Manage your products and orders" icon={<Store className="h-12 w-12 text-supplier" />} /></Layout>} />
          <Route path="/how-it-works-vendor" element={<Layout><PlaceholderPage title="How It Works - Vendors" description="Learn how to get started as a vendor" icon={<Truck className="h-12 w-12 text-vendor" />} /></Layout>} />
          <Route path="/how-it-works-supplier" element={<Layout><PlaceholderPage title="How It Works - Suppliers" description="Learn how to get started as a supplier" icon={<Store className="h-12 w-12 text-supplier" />} /></Layout>} />
          <Route path="/help" element={<Layout><PlaceholderPage title="Help Center" description="Get support and answers to common questions" /></Layout>} />
          <Route path="/contact" element={<Layout><PlaceholderPage title="Contact Us" description="Get in touch with our support team" /></Layout>} />
          <Route path="/terms" element={<Layout><PlaceholderPage title="Terms of Service" description="Read our terms and conditions" /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
