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
  Heart,
  Gift,
  Award,
  Flame,
} from "lucide-react";

export default function IndexEnhanced() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentAnimationText, setCurrentAnimationText] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentAnimationText((prev) => (prev + 1) % animationTexts.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

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
      hoverGradient: "from-green-500 to-green-700",
    },
    {
      id: "fruits",
      name: "Fresh Fruits",
      icon: <Apple className="h-6 w-6" />,
      description: "Seasonal fruits from local orchards",
      color: "bg-red-500",
      gradient: "from-red-400 to-red-600",
      hoverGradient: "from-red-500 to-red-700",
    },
    {
      id: "spices",
      name: "Spices & Masalas",
      icon: <ChefHat className="h-6 w-6" />,
      description: "Authentic spices for street food",
      color: "bg-orange-500",
      gradient: "from-orange-400 to-orange-600",
      hoverGradient: "from-orange-500 to-orange-700",
    },
    {
      id: "dairy",
      name: "Dairy Products",
      icon: <Milk className="h-6 w-6" />,
      description: "Fresh milk and dairy essentials",
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-600",
      hoverGradient: "from-blue-500 to-blue-700",
    },
    {
      id: "grains",
      name: "Grains & Cereals",
      icon: <Wheat className="h-6 w-6" />,
      description: "Quality grains and cereals",
      color: "bg-yellow-500",
      gradient: "from-yellow-400 to-yellow-600",
      hoverGradient: "from-yellow-500 to-yellow-700",
    },
    {
      id: "meat",
      name: "Meat & Seafood",
      icon: <Fish className="h-6 w-6" />,
      description: "Fresh meat and seafood",
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600",
      hoverGradient: "from-purple-500 to-purple-700",
    },
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Verified Suppliers",
      description: "All suppliers are verified for quality and reliability",
      color: "text-green-600",
      bgGradient: "from-green-100 to-green-200",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Get your orders delivered within 30-60 minutes",
      color: "text-blue-600",
      bgGradient: "from-blue-100 to-blue-200",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Direct Communication",
      description: "Chat directly with suppliers for custom orders",
      color: "text-purple-600",
      bgGradient: "from-purple-100 to-purple-200",
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Easy Ordering",
      description: "Simple ordering process with multiple payment options",
      color: "text-orange-600",
      bgGradient: "from-orange-100 to-orange-200",
    },
  ];

  const stats = [
    { 
      label: "Active Suppliers", 
      value: "500+", 
      icon: <Store className="h-6 w-6" />,
      gradient: "from-green-500 to-emerald-600"
    },
    { 
      label: "Happy Vendors", 
      value: "2,000+", 
      icon: <Users className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-600"
    },
    { 
      label: "Daily Orders", 
      value: "1,500+", 
      icon: <Package className="h-6 w-6" />,
      gradient: "from-purple-500 to-violet-600"
    },
    { 
      label: "Cities Covered", 
      value: "25+", 
      icon: <MapPin className="h-6 w-6" />,
      gradient: "from-orange-500 to-red-600"
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Enhanced Background */}
      <section className="relative py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-green-100">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Primary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white/95 to-green-100/90"></div>
          
          {/* Gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-200/20 via-emerald-300/10 to-teal-200/15"></div>

          {/* Radial gradients for depth */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-green-300/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-emerald-400/25 to-transparent rounded-full blur-3xl"></div>
          
          {/* Interactive mouse follow effect */}
          <div 
            className="absolute w-64 h-64 bg-gradient-radial from-green-300/20 to-transparent rounded-full blur-2xl transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: `${mousePosition.x - 128}px`,
              top: `${mousePosition.y - 128}px`,
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
          
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #059669 2px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Mini Realistic Floating Vegetables, Fruits & Groceries */}
        <div className="absolute inset-0 z-5 opacity-60">
          {/* Tomato */}
          <div className="absolute top-20 left-10 animate-bounce" style={{animationDuration: '3s'}}>
            <div className="text-2xl transform hover:scale-110 transition-all duration-300" title="Fresh Tomato">
              🍅
            </div>
          </div>

          {/* Carrot */}
          <div className="absolute top-1/4 right-16 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
            <div className="text-2xl transform hover:scale-110 transition-all duration-300" title="Fresh Carrot">
              🥕
            </div>
          </div>

          {/* Broccoli */}
          <div className="absolute top-1/3 left-1/4 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>
            <div className="text-2xl transform hover:scale-110 transition-all duration-300" title="Fresh Broccoli">
              🥦
            </div>
          </div>

          {/* Apple */}
          <div className="absolute bottom-1/3 right-1/4 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.8s'}}>
            <div className="text-2xl transform hover:scale-110 transition-all duration-300" title="Fresh Apple">
              🍎
            </div>
          </div>

          {/* Onion */}
          <div className="absolute bottom-20 left-16 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.2s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Onion">
              🧅
            </div>
          </div>

          {/* Bell Pepper */}
          <div className="absolute top-3/4 right-12 animate-bounce" style={{animationDelay: '2.5s', animationDuration: '3.2s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Bell Pepper">
              🫑
            </div>
          </div>

          {/* Corn */}
          <div className="absolute bottom-1/4 left-12 animate-bounce" style={{animationDelay: '3s', animationDuration: '3.6s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Corn">
              🌽
            </div>
          </div>

          {/* Eggplant */}
          <div className="absolute top-2/3 left-1/3 animate-bounce" style={{animationDelay: '4s', animationDuration: '4.5s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Eggplant">
              🍆
            </div>
          </div>

          {/* Banana */}
          <div className="absolute top-16 right-1/3 animate-bounce" style={{animationDelay: '0.8s', animationDuration: '3.4s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Banana">
              🍌
            </div>
          </div>

          {/* Orange */}
          <div className="absolute bottom-1/2 left-8 animate-bounce" style={{animationDelay: '1.8s', animationDuration: '4.1s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Orange">
              🍊
            </div>
          </div>

          {/* Grapes */}
          <div className="absolute top-1/2 right-20 animate-bounce" style={{animationDelay: '2.2s', animationDuration: '3.7s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Grapes">
              🍇
            </div>
          </div>

          {/* Potato */}
          <div className="absolute bottom-2/3 right-8 animate-bounce" style={{animationDelay: '3.5s', animationDuration: '3.9s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Potato">
              🥔
            </div>
          </div>

          {/* Avocado */}
          <div className="absolute top-1/5 left-20 animate-bounce" style={{animationDelay: '1.2s', animationDuration: '4.3s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Avocado">
              🥑
            </div>
          </div>

          {/* Cucumber */}
          <div className="absolute bottom-1/5 right-1/3 animate-bounce" style={{animationDelay: '2.8s', animationDuration: '3.3s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Cucumber">
              🥒
            </div>
          </div>

          {/* Strawberry */}
          <div className="absolute top-3/5 left-6 animate-bounce" style={{animationDelay: '0.3s', animationDuration: '4.4s'}}>
            <div className="text-xl transform hover:scale-110 transition-all duration-300" title="Fresh Strawberry">
              🍓
            </div>
          </div>

          {/* Lemon */}
          <div className="absolute bottom-3/5 left-1/5 animate-bounce" style={{animationDelay: '3.2s', animationDuration: '3.1s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Fresh Lemon">
              🍋
            </div>
          </div>

          {/* Pineapple */}
          <div className="absolute top-4/5 right-1/5 animate-bounce" style={{animationDelay: '1.7s', animationDuration: '4.6s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Fresh Pineapple">
              🍍
            </div>
          </div>

          {/* Bread */}
          <div className="absolute top-1/6 right-6 animate-bounce" style={{animationDelay: '2.9s', animationDuration: '3.8s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Fresh Bread">
              🍞
            </div>
          </div>

          {/* Milk */}
          <div className="absolute bottom-1/6 left-1/2 animate-bounce" style={{animationDelay: '0.7s', animationDuration: '4.0s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Fresh Milk">
              🥛
            </div>
          </div>

          {/* Cheese */}
          <div className="absolute top-2/5 right-1/2 animate-bounce" style={{animationDelay: '3.7s', animationDuration: '3.5s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Fresh Cheese">
              🧀
            </div>
          </div>

          {/* Rice */}
          <div className="absolute bottom-2/5 right-4 animate-bounce" style={{animationDelay: '1.3s', animationDuration: '4.2s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Rice">
              🍚
            </div>
          </div>

          {/* Chili */}
          <div className="absolute top-1/8 left-1/2 animate-bounce" style={{animationDelay: '2.1s', animationDuration: '3.6s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Spicy Chili">
              🌶️
            </div>
          </div>

          {/* Garlic */}
          <div className="absolute bottom-1/8 left-4 animate-bounce" style={{animationDelay: '3.4s', animationDuration: '4.1s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Fresh Garlic">
              🧄
            </div>
          </div>

          {/* Coconut */}
          <div className="absolute top-7/8 left-1/6 animate-bounce" style={{animationDelay: '0.9s', animationDuration: '3.7s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Fresh Coconut">
              🥥
            </div>
          </div>

          {/* Mango */}
          <div className="absolute top-1/7 right-1/4 animate-bounce" style={{animationDelay: '2.6s', animationDuration: '4.3s'}}>
            <div className="text-lg transform hover:scale-110 transition-all duration-300" title="Fresh Mango">
              🥭
            </div>
          </div>
        </div>



        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 bg-white/80 text-emerald-800 border border-emerald-200 backdrop-blur-sm shadow-lg">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="font-semibold">Connecting Fresh • Building Communities</span>
              <Heart className="ml-2 h-4 w-4 text-red-500" />
            </Badge>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-green-800 to-emerald-900 bg-clip-text text-transparent">
                Fresh Ingredients,
              </span>
              <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Bulk Solutions
              </span>
            </h1>

            {/* Enhanced Animated Bulk Purchasing Text */}
            <div className="mt-4 h-12 flex items-center justify-center">
              <div className={`text-xl leading-8 text-emerald-700 max-w-4xl mx-auto font-semibold transition-all duration-700 ${
                isAnimating ? 'opacity-0 transform translate-y-6 scale-95' : 'opacity-100 transform translate-y-0 scale-100'
              }`}>
                <div className="flex items-center justify-center gap-2 p-2 bg-white/60 rounded-xl backdrop-blur-sm border border-green-200/50 shadow-lg">
                  <Target className="h-4 w-4 text-emerald-600" />
                  <span className="capitalize bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent">
                    {animationTexts[currentAnimationText]}
                  </span>
                  <Zap className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-base leading-6 text-gray-700 max-w-2xl mx-auto font-medium">
              The marketplace that connects street food vendors with quality
              suppliers. Get fresh ingredients delivered, chat with suppliers,
              and grow your business with <span className="text-emerald-600 font-bold">confidence</span>.
            </p>

            {/* Enhanced Search Bar */}
            <div
              className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto"
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
                  className="pl-10 pr-3 py-2 text-base bg-white/90 border border-emerald-200 text-gray-900 shadow-lg focus:ring-2 focus:ring-emerald-300/50 rounded-xl backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                />

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 border-2 border-emerald-200 rounded-2xl shadow-2xl z-50 backdrop-blur-sm">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full px-6 py-3 text-left hover:bg-emerald-50 first:rounded-t-2xl last:rounded-b-2xl transition-all duration-200 flex items-center gap-3"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          handleSearch(suggestion);
                          setShowSuggestions(false);
                        }}
                      >
                        <Search className="h-4 w-4 text-emerald-600" />
                        <span className="text-gray-900 font-medium">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={() => handleSearch()}
                size="default"
                className="px-4 py-2 text-base bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Now
              </Button>
            </div>

            {/* Enhanced Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button variant="outline" className="bg-white/80 text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                <MapPin className="mr-2 h-4 w-4" />
                Find Nearby Suppliers
              </Button>
              <Button variant="outline" className="bg-white/80 text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                <Package className="mr-2 h-4 w-4" />
                Bulk Orders
              </Button>
              <Button variant="outline" className="bg-white/80 text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                <Timer className="mr-2 h-4 w-4" />
                Express Delivery
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Information Elements */}
        <div className="absolute bottom-10 left-1/4 opacity-70">
          <div className="flex items-center gap-3 text-emerald-600 bg-white/90 rounded-full px-6 py-3 shadow-2xl backdrop-blur-sm border border-emerald-200/50">
            <Package className="h-6 w-6" />
            <span className="text-sm font-bold">Bulk Orders</span>
            <Gift className="h-5 w-5 text-orange-500" />
          </div>
        </div>
        <div className="absolute bottom-20 right-1/4 opacity-70">
          <div className="flex items-center gap-3 text-emerald-600 bg-white/90 rounded-full px-6 py-3 shadow-2xl backdrop-blur-sm border border-emerald-200/50">
            <DollarSign className="h-6 w-6" />
            <span className="text-sm font-bold">Best Prices</span>
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
        </div>
        <div className="absolute top-1/2 right-8 opacity-70">
          <div className="flex items-center gap-3 text-emerald-600 bg-white/90 rounded-full px-6 py-3 shadow-2xl backdrop-blur-sm border border-emerald-200/50">
            <Leaf className="h-6 w-6" />
            <span className="text-sm font-bold">Fresh Daily</span>
            <Flame className="h-5 w-5 text-red-500" />
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-8 bg-gradient-to-r from-emerald-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-green-100/30"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.gradient} text-white rounded-xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                  <div className="relative z-10">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50"></div>
        <div className="container relative z-10">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-3 bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Leaf className="mr-2 h-4 w-4" />
              Fresh Categories
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3 bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Discover fresh ingredients across multiple categories from verified
              suppliers in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className="group cursor-pointer border-2 hover:border-emerald-300 transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={() =>
                  navigate(`/marketplace?category=${category.id}`)
                }
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex w-10 h-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} group-hover:${category.hoverGradient} text-white mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    <div className="relative z-10">{category.icon}</div>
                  </div>
                  <CardTitle className="group-hover:text-emerald-600 transition-colors duration-300 text-base">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-emerald-600 group-hover:text-emerald-700 font-semibold">
                    <span>Browse products</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-10 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 to-green-100/30"></div>
        <div className="container relative z-10">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-3 bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle className="mr-2 h-4 w-4" />
              Why Choose Us
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3 bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
              Built for Street Food Success
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Everything you need to source fresh ingredients and grow your
              street food business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className={`inline-flex w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.bgGradient} mb-3 ${feature.color} mx-auto group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/50 to-green-800/50"></div>
        <div className="container text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-3 sm:text-3xl">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base text-white/90 mb-6 font-medium">
              Join thousands of vendors and suppliers already using FreshConnect
              to build better businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="default" variant="secondary" className="px-4 py-2 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link to="/vendor-signup">
                  <Truck className="mr-2 h-6 w-6" />
                  I'm a Vendor
                </Link>
              </Button>
              <Button size="default" variant="outline" className="px-4 py-2 text-base font-semibold border border-white text-white hover:bg-white hover:text-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link to="/supplier-signup">
                  <Store className="mr-2 h-6 w-6" />
                  I'm a Supplier
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50"></div>
        <div className="container relative z-10">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-3 bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Star className="mr-2 h-4 w-4" />
              Success Stories
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3 bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-3 text-sm font-medium">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold text-base">{testimonial.name}</p>
                    <p className="text-sm text-emerald-600 font-medium">{testimonial.role}</p>
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
