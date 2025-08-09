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
  Package,
  Timer,
  Sparkles,
} from "lucide-react";

export default function IndexEnhanced() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
      gradient: "from-green-400 to-green-600",
    },
    {
      id: "fruits",
      name: "Fresh Fruits",
      icon: <Apple className="h-6 w-6" />,
      description: "Seasonal fruits from local orchards",
      gradient: "from-red-400 to-red-600",
    },
    {
      id: "spices",
      name: "Spices & Masalas",
      icon: <ChefHat className="h-6 w-6" />,
      description: "Authentic spices for street food",
      gradient: "from-orange-400 to-orange-600",
    },
    {
      id: "dairy",
      name: "Dairy Products",
      icon: <Milk className="h-6 w-6" />,
      description: "Fresh milk and dairy essentials",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: "grains",
      name: "Grains & Cereals",
      icon: <Wheat className="h-6 w-6" />,
      description: "Quality grains and cereals",
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      id: "meat",
      name: "Meat & Seafood",
      icon: <Fish className="h-6 w-6" />,
      description: "Fresh meat and seafood",
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
    {
      label: "Active Suppliers",
      value: "500+",
      icon: <Store className="h-6 w-6" />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      label: "Happy Vendors",
      value: "2,000+",
      icon: <Users className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      label: "Daily Orders",
      value: "1,500+",
      icon: <Package className="h-6 w-6" />,
      gradient: "from-purple-500 to-violet-600",
    },
    {
      label: "Cities Covered",
      value: "25+",
      icon: <MapPin className="h-6 w-6" />,
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-emerald-50 via-white to-green-100">
        {/* Clean Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white/95 to-green-100/90"></div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-white/80 text-green-800 border border-green-200"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="font-semibold">
                Connecting Fresh • Building Communities
              </span>
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-green-900 mb-6">
              <span className="bg-gradient-to-r from-green-800 via-emerald-800 to-green-900 bg-clip-text text-transparent">
                Fresh Ingredients,
              </span>
              <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Bulk Solutions
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-green-800 max-w-3xl mx-auto font-medium">
              The marketplace that connects street food vendors with quality
              suppliers. Get fresh ingredients delivered, chat with suppliers,
              and grow your business with{" "}
              <span className="text-emerald-600 font-bold">confidence</span>.
            </p>

            {/* Search Bar */}
            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
              ref={searchRef}
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-600" />
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
                        suggestion.toLowerCase().includes(value.toLowerCase()),
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
                  className="pl-12 pr-4 py-3 text-lg bg-white/90 border border-green-200 text-green-900 shadow-lg focus:ring-2 focus:ring-green-300/50 rounded-xl"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 border border-emerald-200 rounded-xl shadow-2xl z-50">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-3 text-left hover:bg-emerald-50 first:rounded-t-xl last:rounded-b-xl transition-colors flex items-center gap-3"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          handleSearch(suggestion);
                          setShowSuggestions(false);
                        }}
                      >
                        <Search className="h-4 w-4 text-emerald-600" />
                        <span className="text-green-900 font-medium">
                          {suggestion}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={() => handleSearch()}
                size="lg"
                className="px-6 py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Now
              </Button>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                className="bg-white/80 text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Find Nearby Suppliers
              </Button>
              <Button
                variant="outline"
                className="bg-white/80 text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300"
              >
                <Package className="mr-2 h-4 w-4" />
                Bulk Orders
              </Button>
              <Button
                variant="outline"
                className="bg-white/80 text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300"
              >
                <Timer className="mr-2 h-4 w-4" />
                Express Delivery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 via-white to-green-50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-green-900 mb-2 group-hover:text-green-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-green-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-green-100 text-green-800 border border-green-200"
            >
              <Leaf className="mr-1 h-3 w-3" />
              Fresh Categories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-green-900">
              Shop by Category
            </h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">
              Discover fresh ingredients across multiple categories from
              verified suppliers in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className="group cursor-pointer border-2 border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => navigate(`/marketplace?category=${category.id}`)}
              >
                <CardHeader className="pb-3">
                  <div
                    className={`inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <CardTitle className="group-hover:text-green-600 transition-colors text-green-800">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    {category.description}
                  </CardDescription>
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-green-100 text-green-800 border border-green-200"
            >
              <CheckCircle className="mr-1 h-3 w-3" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-green-900">
              Built for Street Food Success
            </h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">
              Everything you need to source fresh ingredients and grow your
              street food business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border border-green-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div
                    className={`inline-flex w-16 h-16 items-center justify-center rounded-full bg-green-100 mb-4 ${feature.color} mx-auto`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-green-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-700 mb-10 font-medium">
              Join thousands of vendors and suppliers already using FreshConnect
              to build better businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/vendor-signup">
                  <Truck className="mr-2 h-5 w-5" />
                  I'm a Vendor
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
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
            <Badge
              variant="secondary"
              className="mb-4 bg-green-100 text-green-800 border border-green-200"
            >
              <Star className="mr-1 h-3 w-3" />
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-green-900">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Street Food Vendor",
                content:
                  "FreshConnect helped me find reliable suppliers and reduce my costs by 30%. The bulk ordering feature is amazing!",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                role: "Vegetable Supplier",
                content:
                  "I've expanded my customer base significantly through this platform. The direct communication feature makes business so much easier.",
                rating: 5,
              },
              {
                name: "Mohammed Ali",
                role: "Spice Vendor",
                content:
                  "Quality ingredients delivered on time, every time. This platform has transformed how I run my street food business.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border border-green-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-green-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-green-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-green-600">{testimonial.role}</p>
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
