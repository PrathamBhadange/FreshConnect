import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  ArrowRight,
  Leaf,
  Star,
  Users,
  ShoppingCart,
  Truck,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  Apple,
  Carrot,
  ChefHat,
  Milk,
  Fish,
  Wheat,
  Store,
  TrendingUp,
  Shield,
  Zap,
  Package,
  DollarSign,
  Timer,
  Target,
  Sparkles,
} from "lucide-react";

export default function IndexEnhanced() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentAnimationText, setCurrentAnimationText] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Animation texts for bulk purchasing
  const animationTexts = [
    "Purchase bulk vegetables through verified suppliers to vendors",
    "Get fresh fruits through trusted networks to vendors",
    "Source quality spices through direct connections to vendors", 
    "Buy dairy products through local farms to vendors",
    "Obtain organic produce through sustainable suppliers to vendors",
    "Secure meat & seafood through reliable distributors to vendors"
  ];

  // Animate text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentAnimationText((prev) => (prev + 1) % animationTexts.length);
        setIsAnimating(false);
      }, 500); // Half second for fade out, then fade in
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [animationTexts.length]);

  // Close suggestions when clicking outside
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

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/marketplace");
    }
  };

  const categories = [
    {
      id: "vegetables",
      name: "Fresh Vegetables",
      icon: <Carrot className="h-6 w-6" />,
      description: "Farm-fresh vegetables delivered daily",
      color: "bg-green-500",
      gradient: "from-green-400 to-green-600",
    },
    {
      id: "fruits",
      name: "Fresh Fruits",
      icon: <Apple className="h-6 w-6" />,
      description: "Seasonal fruits from local orchards",
      color: "bg-red-500",
      gradient: "from-red-400 to-red-600",
    },
    {
      id: "spices",
      name: "Spices & Masalas",
      icon: <ChefHat className="h-6 w-6" />,
      description: "Authentic spices for street food",
      color: "bg-orange-500",
      gradient: "from-orange-400 to-orange-600",
    },
    {
      id: "dairy",
      name: "Dairy Products",
      icon: <Milk className="h-6 w-6" />,
      description: "Fresh milk and dairy essentials",
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: "grains",
      name: "Grains & Cereals",
      icon: <Wheat className="h-6 w-6" />,
      description: "Quality grains and cereals",
      color: "bg-yellow-500",
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      id: "meat",
      name: "Meat & Seafood",
      icon: <Fish className="h-6 w-6" />,
      description: "Fresh meat and seafood",
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600",
    },
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Verified Suppliers",
      description: "All suppliers are verified for quality and reliability",
      color: "text-green-600",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Get your orders delivered within 30-60 minutes",
      color: "text-blue-600",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Direct Communication",
      description: "Chat directly with suppliers for custom orders",
      color: "text-purple-600",
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Easy Ordering",
      description: "Simple ordering process with multiple payment options",
      color: "text-orange-600",
    },
  ];

  const stats = [
    { label: "Active Suppliers", value: "500+", icon: <Store className="h-6 w-6" /> },
    { label: "Happy Vendors", value: "2,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Daily Orders", value: "1,500+", icon: <Package className="h-6 w-6" /> },
    { label: "Cities Covered", value: "25+", icon: <MapPin className="h-6 w-6" /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Fresh White/Green Background */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-white via-green-50 to-green-100">
        {/* Fresh Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-white/90 to-green-100/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-green-200/20 via-transparent to-green-300/10"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Vegetables Animation */}
        <div className="absolute inset-0 z-5">
          {/* Tomato */}
          <div className="absolute top-20 left-10 animate-bounce opacity-60" style={{animationDuration: '3s'}}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3 6 1.5 1.5 3 3 3 6s1.5 4.5 3 4.5 3-2 3-4.5-1.5-4.5-3-6c1.5-1.5 3-3.5 3-6 0-3.5-2.5-6-6-6z"/>
              </svg>
            </div>
          </div>

          {/* Carrot */}
          <div className="absolute top-1/4 right-16 animate-bounce opacity-60" style={{animationDelay: '1s', animationDuration: '4s'}}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
              <Carrot className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Leafy Green */}
          <div className="absolute top-1/3 left-1/4 animate-bounce opacity-60" style={{animationDelay: '2s', animationDuration: '3.5s'}}>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
              <Leaf className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Apple */}
          <div className="absolute bottom-1/3 right-1/4 animate-bounce opacity-60" style={{animationDelay: '0.5s', animationDuration: '3.8s'}}>
            <div className="w-13 h-13 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
              <Apple className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Onion */}
          <div className="absolute bottom-20 left-16 animate-bounce opacity-60" style={{animationDelay: '1.5s', animationDuration: '4.2s'}}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
          </div>

          {/* Chili Pepper */}
          <div className="absolute top-3/4 right-12 animate-bounce opacity-60" style={{animationDelay: '2.5s', animationDuration: '3.2s'}}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Corn */}
          <div className="absolute bottom-1/4 left-12 animate-bounce opacity-60" style={{animationDelay: '3s', animationDuration: '3.6s'}}>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
              <Wheat className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Eggplant */}
          <div className="absolute top-2/3 left-1/3 animate-bounce opacity-60" style={{animationDelay: '4s', animationDuration: '4.5s'}}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c-2 0-4 1-4 3v8c0 4 2 6 4 6s4-2 4-6V5c0-2-2-3-4-3z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 border border-green-200">
              <Sparkles className="mr-1 h-3 w-3" />
              Connecting Fresh • Building Communities
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-gray-900">
              Fresh Ingredients,
              <span className="text-green-600 block">Bulk Solutions</span>
            </h1>

            {/* Animated Bulk Purchasing Text */}
            <div className="mt-8 h-16 flex items-center justify-center">
              <div className={`text-lg leading-8 text-green-700 max-w-3xl mx-auto font-medium transition-all duration-500 ${
                isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-5 w-5 text-green-600 animate-pulse" />
                  <span className="capitalize">{animationTexts[currentAnimationText]}</span>
                  <Zap className="h-5 w-5 text-green-600 animate-pulse" />
                </div>
              </div>
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-700 max-w-2xl mx-auto">
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
                      const allSuggestions = [
                        "Fresh tomatoes",
                        "Organic vegetables",
                        "Spices and masalas",
                        "Dairy products",
                        "Bulk vegetables",
                        "Street food ingredients",
                        "Fresh fruits",
                        "Cooking oils",
                      ];

                      const filtered = allSuggestions.filter((suggestion) =>
                        suggestion.toLowerCase().includes(value.toLowerCase())
                      );

                      setSuggestions(filtered.slice(0, 5));
                      setShowSuggestions(true);
                    } else {
                      setShowSuggestions(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                      setShowSuggestions(false);
                    }
                  }}
                  className="pl-10 bg-white border border-green-200 text-gray-900 shadow-lg focus:ring-2 focus:ring-green-300"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-green-200 rounded-lg shadow-xl z-50">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-2 text-left hover:bg-green-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          handleSearch(suggestion);
                          setShowSuggestions(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-green-600" />
                          <span className="text-gray-900">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={() => handleSearch()}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white shadow-xl"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300">
                <MapPin className="mr-2 h-4 w-4" />
                Find Nearby Suppliers
              </Button>
              <Button variant="outline" className="bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300">
                <Package className="mr-2 h-4 w-4" />
                Bulk Orders
              </Button>
              <Button variant="outline" className="bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300">
                <Timer className="mr-2 h-4 w-4" />
                Express Delivery
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute bottom-10 left-1/4 animate-pulse opacity-30">
          <div className="flex items-center gap-2 text-white">
            <Package className="h-6 w-6" />
            <span className="text-sm font-medium">Bulk Orders</span>
          </div>
        </div>
        <div className="absolute bottom-20 right-1/4 animate-pulse opacity-30" style={{animationDelay: '1s'}}>
          <div className="flex items-center gap-2 text-white">
            <DollarSign className="h-6 w-6" />
            <span className="text-sm font-medium">Best Prices</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Leaf className="mr-1 h-3 w-3" />
              Fresh Categories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover fresh ingredients across multiple categories from verified
              suppliers in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className="group cursor-pointer border-2 hover:border-green-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() =>
                  navigate(`/marketplace?category=${category.id}`)
                }
              >
                <CardHeader className="pb-3">
                  <div className={`inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <CardTitle className="group-hover:text-green-600 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600 group-hover:text-green-700">
                    <span>Browse products</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <CheckCircle className="mr-1 h-3 w-3" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Built for Street Food Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to source fresh ingredients and grow your
              street food business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className={`inline-flex w-16 h-16 items-center justify-center rounded-full bg-gray-100 mb-4 ${feature.color} mx-auto`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of vendors and suppliers already using FreshConnect
              to build better businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/vendor-signup">
                  <Truck className="mr-2 h-5 w-5" />
                  I'm a Vendor
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600" asChild>
                <Link to="/supplier-signup">
                  <Store className="mr-2 h-5 w-5" />
                  I'm a Supplier
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Star className="mr-1 h-3 w-3" />
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Street Food Vendor",
                content: "FreshConnect helped me find reliable suppliers and reduce my costs by 30%. The bulk ordering feature is amazing!",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                role: "Vegetable Supplier",
                content: "I've expanded my customer base significantly through this platform. The direct communication feature makes business so much easier.",
                rating: 5,
              },
              {
                name: "Mohammed Ali",
                role: "Spice Vendor",
                content: "Quality ingredients delivered on time, every time. This platform has transformed how I run my street food business.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
