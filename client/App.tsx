import "./global.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import SupplierStore from "./pages/SupplierStore";
import SupplierStoreEnhanced from "./pages/SupplierStoreEnhanced";
import Messages from "./pages/Messages";
import Map from "./pages/Map";
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierSignup from "./pages/SupplierSignup";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import {
  MapPin,
  MessageCircle,
  ShoppingCart,
  User,
  Truck,
  Store,
} from "lucide-react";

const queryClient = new QueryClient();

// Error Boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="mt-2 text-gray-600">
            Please check the console for details.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/marketplace"
              element={
                <Layout>
                  <Marketplace />
                </Layout>
              }
            />
            <Route
              path="/supplier/:supplierId"
              element={
                <Layout>
                  <SupplierStoreEnhanced />
                </Layout>
              }
            />
            <Route
              path="/map"
              element={
                <Layout>
                  <Map />
                </Layout>
              }
            />
            <Route
              path="/orders"
              element={
                <Layout>
                  <PlaceholderPage
                    title="My Orders"
                    description="Track your orders and order history"
                    icon={<ShoppingCart className="h-12 w-12 text-primary" />}
                  />
                </Layout>
              }
            />
            <Route
              path="/messages"
              element={
                <Layout>
                  <Messages />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <PlaceholderPage
                    title="Profile"
                    description="Manage your account settings"
                    icon={<User className="h-12 w-12 text-primary" />}
                  />
                </Layout>
              }
            />
            <Route
              path="/vendor-signup"
              element={
                <Layout>
                  <PlaceholderPage
                    title="Vendor Registration"
                    description="Join as a street food vendor"
                    icon={<Truck className="h-12 w-12 text-vendor" />}
                  />
                </Layout>
              }
            />
            <Route
              path="/supplier-signup"
              element={
                <Layout>
                  <SupplierSignup />
                </Layout>
              }
            />
            <Route
              path="/supplier-dashboard"
              element={
                <Layout>
                  <SupplierDashboard />
                </Layout>
              }
            />
            <Route
              path="/how-it-works-vendor"
              element={
                <Layout>
                  <PlaceholderPage
                    title="How It Works - Vendors"
                    description="Learn how to get started as a vendor"
                    icon={<Truck className="h-12 w-12 text-vendor" />}
                  />
                </Layout>
              }
            />
            <Route
              path="/how-it-works-supplier"
              element={
                <Layout>
                  <PlaceholderPage
                    title="How It Works - Suppliers"
                    description="Learn how to get started as a supplier"
                    icon={<Store className="h-12 w-12 text-supplier" />}
                  />
                </Layout>
              }
            />
            <Route
              path="/help"
              element={
                <Layout>
                  <PlaceholderPage
                    title="Help Center"
                    description="Get support and answers to common questions"
                  />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <PlaceholderPage
                    title="Contact Us"
                    description="Get in touch with our support team"
                  />
                </Layout>
              }
            />
            <Route
              path="/terms"
              element={
                <Layout>
                  <PlaceholderPage
                    title="Terms of Service"
                    description="Read our terms and conditions"
                  />
                </Layout>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
