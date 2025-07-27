import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Store,
  Truck,
  MessageCircle,
  MapPin,
  User,
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Marketplace", href: "/marketplace", icon: Store },
    { name: "Find Suppliers", href: "/map", icon: MapPin },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Messages", href: "/messages", icon: MessageCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-supplier text-supplier-foreground">
              <Store className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">
              FreshConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6 md:ml-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden md:flex md:items-center md:space-x-2">
              <Button variant="outline" asChild>
                <Link to="/vendor-signup">
                  <Truck className="mr-2 h-4 w-4" />
                  I'm a Vendor
                </Link>
              </Button>
              <Button asChild>
                <Link to="/supplier-signup">
                  <Store className="mr-2 h-4 w-4" />
                  I'm a Supplier
                </Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:flex"
            >
              <Link to="/profile">
                <User className="h-4 w-4" />
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 text-sm font-medium transition-colors hover:text-primary py-2",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-4 border-t space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link
                    to="/vendor-signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    I'm a Vendor
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link
                    to="/supplier-signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Store className="mr-2 h-4 w-4" />
                    I'm a Supplier
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-supplier text-supplier-foreground">
                  <Store className="h-4 w-4" />
                </div>
                <span className="font-semibold">FreshConnect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting street food vendors with quality suppliers for fresh
                ingredients.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">For Vendors</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/vendor-signup"
                    className="hover:text-foreground transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace"
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Suppliers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works-vendor"
                    className="hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">For Suppliers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/supplier-signup"
                    className="hover:text-foreground transition-colors"
                  >
                    Join Now
                  </Link>
                </li>
                <li>
                  <Link
                    to="/supplier-dashboard"
                    className="hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works-supplier"
                    className="hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FreshConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
