import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Store,
  Truck,
  MapPin,
  MessageCircle,
  Clock,
  Shield,
  Star,
  ArrowRight,
  Search,
  Users,
  TrendingUp,
  CheckCircle,
  Leaf,
  Zap,
  Heart,
} from "lucide-react";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search functionality
  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery.trim();
    if (searchTerm) {
      // Navigate to marketplace with search query
      navigate(`/marketplace?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  // Handle clicks outside search to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const features = [
    {
      icon: <Store className="h-6 w-6" />,
      title: "Quality Suppliers",
      description:
        "Verified suppliers offering fresh, high-quality ingredients",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location-Based",
      description: "Find suppliers near you with real-time location tracking",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Direct Communication",
      description:
        "Chat directly with suppliers to discuss orders and requirements",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-Time Stock",
      description: "Live inventory updates so you know what's available",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing for all transactions",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Business Growth",
      description: "Tools and insights to help grow your street food business",
    },
  ];

  const categories = [
    {
      name: "Fruits",
      count: "150+ suppliers",
      color: "bg-red-100 text-red-700",
    },
    {
      name: "Vegetables",
      count: "200+ suppliers",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Spices",
      count: "80+ suppliers",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      name: "Grains",
      count: "60+ suppliers",
      color: "bg-amber-100 text-amber-700",
    },
    {
      name: "Dairy",
      count: "45+ suppliers",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Meat",
      count: "30+ suppliers",
      color: "bg-pink-100 text-pink-700",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Street Food Vendor",
      content:
        "FreshConnect helped me find reliable suppliers for my chaat stall. The quality is consistently good and prices are fair.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Vegetable Supplier",
      content:
        "As a supplier, this platform connected me with so many local vendors. My business has grown 300% in just 6 months!",
      rating: 5,
    },
    {
      name: "Maya Patel",
      role: "Dosa Cart Owner",
      content:
        "The real-time stock updates are a game changer. I never run out of ingredients during peak hours anymore.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header with Logo */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-supplier text-supplier-foreground">
              <Store className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">
              FreshConnect
            </span>
          </div>

          <div className="flex items-center space-x-4">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=1920&h=1080&fit=crop&crop=center&q=80"
            alt="Fresh vegetables and produce background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-supplier/20 via-transparent to-fresh/10"></div>
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Leaf className="mr-1 h-3 w-3" />
              Connecting Fresh • Building Communities
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-white drop-shadow-lg">
              Fresh Ingredients,
              <span className="text-green-400 block">Direct Connection</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/90 max-w-2xl mx-auto drop-shadow">
              The marketplace that connects street food vendors with quality
              suppliers. Get fresh ingredients delivered, chat with suppliers,
              and grow your business.
            </p>

            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              ref={searchRef}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers, products..."
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);

                    if (value.length > 0) {
                      // Generate suggestions based on input
                      const allSuggestions = [
                        "Fresh tomatoes",
                        "Organic vegetables",
                        "Spices and masalas",
                        "Fresh fruits",
                        "Dairy products",
                        "Green vegetables",
                        "Fresh herbs",
                        "Seasonal fruits",
                        "Premium spices",
                        "Organic produce",
                        "Local suppliers near me",
                        "Fresh Valley Farms",
                        "Spice Kingdom",
                        "Wholesale vegetables",
                        "Street food ingredients",
                      ];

                      const filtered = allSuggestions
                        .filter((suggestion) =>
                          suggestion
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                        )
                        .slice(0, 5);

                      setSuggestions(filtered);
                      setShowSuggestions(filtered.length > 0);
                    } else {
                      setShowSuggestions(false);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  onFocus={() => {
                    if (searchQuery.length > 0 && suggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  className="pl-10"
                />

                {/* Search Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                          handleSearch(suggestion);
                        }}
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span>{suggestion}</span>
                      </button>
                    ))}

                    {searchQuery && (
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2 border-t font-medium text-primary"
                        onClick={() => {
                          handleSearch();
                        }}
                      >
                        <ArrowRight className="h-4 w-4" />
                        <span>Search for "{searchQuery}"</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <Button
                size="lg"
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
              >
                <span>Search</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/marketplace">
                  <span>Explore All</span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                onClick={() => {
                  alert('🎉 Demo Payment Successful!\n\nPayment Method: UPI\nAmount: ₹500\nTransaction ID: TXN123456789\n\nThank you for using FreshConnect!');
                }}
              >
                <svg width="24" height="24" className="lucide lucide-credit-card mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <line x1="2" x2="22" y1="10" y2="10"/>
                </svg>
                Demo Payment
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">500+</div>
                <div className="text-sm text-white/80">
                  Active Suppliers
                </div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-400">1000+</div>
                <div className="text-sm text-white/80">
                  Street Food Vendors
                </div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">10k+</div>
                <div className="text-sm text-white/80">
                  Orders Completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-4 text-muted-foreground">
              Find suppliers for all your ingredient needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  navigate(`/marketplace?category=${category.name.toLowerCase()}`);
                }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3",
                      category.color,
                    )}
                  >
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose FreshConnect?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to run a successful street food business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-supplier/10 text-supplier">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-4 text-muted-foreground">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* For Vendors */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-vendor text-vendor-foreground text-lg font-semibold mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">For Vendors</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-vendor text-vendor-foreground flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Sign Up & Verify</h4>
                    <p className="text-sm text-muted-foreground">
                      Create your vendor account and verify your business
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-vendor text-vendor-foreground flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Find Suppliers</h4>
                    <p className="text-sm text-muted-foreground">
                      Browse local suppliers and their available products
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-vendor text-vendor-foreground flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Order & Grow</h4>
                    <p className="text-sm text-muted-foreground">
                      Place orders, chat with suppliers, and grow your business
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Suppliers */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-supplier text-supplier-foreground text-lg font-semibold mb-4">
                  <Store className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">For Suppliers</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supplier text-supplier-foreground flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Join Platform</h4>
                    <p className="text-sm text-muted-foreground">
                      Register as a supplier and list your products
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supplier text-supplier-foreground flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Manage Inventory</h4>
                    <p className="text-sm text-muted-foreground">
                      Update stock levels and product availability in real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supplier text-supplier-foreground flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Fulfill Orders</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive orders from vendors and grow your customer base
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              What Our Users Say
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of happy vendors and suppliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-supplier to-supplier/80">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-supplier-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-4 text-supplier-foreground/80 text-lg">
              Join thousands of vendors and suppliers already using FreshConnect
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/vendor-signup">
                  <Truck className="mr-2 h-5 w-5" />
                  Start as Vendor
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white text-supplier border-white hover:bg-white/90"
              >
                <Link to="/supplier-signup">
                  <Store className="mr-2 h-5 w-5" />
                  Join as Supplier
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container">
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
