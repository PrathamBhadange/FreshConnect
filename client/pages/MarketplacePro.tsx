import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { supplierService, type RegisteredSupplier } from "@/services/supplierService";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingOverlay, SupplierCardSkeleton, ProductCardSkeleton } from "@/components/LoadingStates";
import { notifications, showError, showSuccess } from "@/utils/notifications";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Truck,
  MessageCircle,
  ShoppingCart,
  Store,
  Leaf,
  Apple,
  Carrot,
  Wheat,
  Fish,
  Milk,
  ChefHat,
  CheckCircle,
  Eye,
  Plus,
  Minus,
  X,
  AlertTriangle,
  Wifi,
  WifiOff,
  RefreshCw,
  SlidersHorizontal,
  TrendingUp,
  Zap,
  Shield,
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  categories: string[];
  products: Product[];
  verified: boolean;
  image: string;
  location: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  image: string;
  category: string;
  fresh: boolean;
}

interface CartItem {
  productId: string;
  supplierId: string;
  quantity: number;
  product: Product & { supplierName: string };
}

// Custom hook for network status
const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Custom hook for search debouncing
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function MarketplacePro() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"suppliers" | "products">("suppliers");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [registeredSuppliers, setRegisteredSuppliers] = useState<RegisteredSupplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isOnline = useNetworkStatus();

  // Load data with error handling and retry logic
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const loadedSuppliers = supplierService.getRegisteredSuppliers();
      setRegisteredSuppliers(loadedSuppliers);
      
      console.log(`Loaded ${loadedSuppliers.length} registered suppliers`);
    } catch (err) {
      console.error('Failed to load suppliers:', err);
      setError('Failed to load suppliers. Please try again.');
      notifications.serverError();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize data and handle URL parameters
  useEffect(() => {
    const searchParam = searchParams.get("search");
    const categoryParam = searchParams.get("category");

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    loadData();
  }, [searchParams, loadData]);

  // Retry mechanism
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    loadData();
  }, [loadData]);

  // Mock data with enhanced features
  const mockSuppliers: Supplier[] = useMemo(() => [
    {
      id: "1",
      name: "Fresh Valley Farms",
      description: "Premium organic fruits and vegetables directly from our farms",
      rating: 4.8,
      reviews: 124,
      distance: "2.3 km",
      deliveryTime: "30-45 min",
      categories: ["Fruits", "Vegetables"],
      verified: true,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center",
      location: "Sector 15, Gurgaon",
      products: [
        {
          id: "1",
          name: "Fresh Tomatoes",
          price: 40,
          unit: "kg",
          stock: 150,
          image: "https://images.unsplash.com/photo-1546470427-227e13439cd0?w=300&h=300&fit=crop&crop=center",
          category: "Vegetables",
          fresh: true,
        },
        {
          id: "2",
          name: "Organic Onions",
          price: 35,
          unit: "kg",
          stock: 200,
          image: "https://images.unsplash.com/photo-1508313880080-c4bec8ca91a4?w=300&h=300&fit=crop&crop=center",
          category: "Vegetables",
          fresh: true,
        },
        {
          id: "3",
          name: "Fresh Apples",
          price: 120,
          unit: "kg",
          stock: 80,
          image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop&crop=center",
          category: "Fruits",
          fresh: true,
        },
      ],
    },
    {
      id: "2",
      name: "Spice Kingdom",
      description: "Authentic Indian spices and masalas for street food vendors",
      rating: 4.9,
      reviews: 89,
      distance: "1.8 km",
      deliveryTime: "20-30 min",
      categories: ["Spices", "Masalas"],
      verified: true,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop&crop=center",
      location: "Old Delhi Market",
      products: [
        {
          id: "4",
          name: "Garam Masala",
          price: 280,
          unit: "kg",
          stock: 50,
          image: "https://images.unsplash.com/photo-1599909533047-f58b8d68fa44?w=300&h=300&fit=crop&crop=center",
          category: "Spices",
          fresh: false,
        },
        {
          id: "5",
          name: "Red Chili Powder",
          price: 200,
          unit: "kg",
          stock: 75,
          image: "https://images.unsplash.com/photo-1505253213348-cd54c92b37ed?w=300&h=300&fit=crop&crop=center",
          category: "Spices",
          fresh: false,
        },
      ],
    },
    {
      id: "3",
      name: "Metro Dairy Products",
      description: "Fresh dairy products delivered daily from local farms",
      rating: 4.7,
      reviews: 156,
      distance: "3.1 km",
      deliveryTime: "45-60 min",
      categories: ["Dairy", "Milk"],
      verified: true,
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=300&fit=crop&crop=center",
      location: "Dairy Colony, Delhi",
      products: [
        {
          id: "7",
          name: "Fresh Milk",
          price: 55,
          unit: "liter",
          stock: 300,
          image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&crop=center",
          category: "Dairy",
          fresh: true,
        },
        {
          id: "8",
          name: "Paneer",
          price: 280,
          unit: "kg",
          stock: 40,
          image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&crop=center",
          category: "Dairy",
          fresh: true,
        },
      ],
    },
  ], []);

  const categories = useMemo(() => [
    { id: "all", name: "All Categories", icon: <Store className="h-4 w-4" /> },
    { id: "fruits", name: "Fruits", icon: <Apple className="h-4 w-4" /> },
    { id: "vegetables", name: "Vegetables", icon: <Carrot className="h-4 w-4" /> },
    { id: "spices", name: "Spices", icon: <ChefHat className="h-4 w-4" /> },
    { id: "grains", name: "Grains", icon: <Wheat className="h-4 w-4" /> },
    { id: "dairy", name: "Dairy", icon: <Milk className="h-4 w-4" /> },
    { id: "meat", name: "Meat & Fish", icon: <Fish className="h-4 w-4" /> },
  ], []);

  // Combine mock and registered suppliers
  const allSuppliers = useMemo(() => [...mockSuppliers, ...registeredSuppliers], [mockSuppliers, registeredSuppliers]);

  // Advanced filtering and sorting
  const filteredSuppliers = useMemo(() => {
    let filtered = allSuppliers.filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        supplier.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "all" ||
        supplier.categories.some((cat) =>
          cat.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      
      const matchesRating =
        ratingFilter === "all" ||
        (ratingFilter === "4+" && supplier.rating >= 4) ||
        (ratingFilter === "4.5+" && supplier.rating >= 4.5);

      return matchesSearch && matchesCategory && matchesRating;
    });

    // Sort suppliers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "delivery":
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allSuppliers, debouncedSearchQuery, selectedCategory, ratingFilter, sortBy]);

  const allProducts = useMemo(() => 
    allSuppliers.flatMap((supplier) =>
      supplier.products.map((product) => ({
        ...product,
        supplierName: supplier.name,
        supplierId: supplier.id,
      }))
    ), [allSuppliers]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase().includes(selectedCategory.toLowerCase());
      
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "low" && product.price <= 50) ||
        (priceRange === "medium" && product.price > 50 && product.price <= 150) ||
        (priceRange === "high" && product.price > 150);

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProducts, debouncedSearchQuery, selectedCategory, priceRange, sortBy]);

  // Cart management with error handling
  const addToCart = useCallback((product: Product & { supplierName: string; supplierId: string }) => {
    try {
      setCart((prev) => {
        const existingItem = prev.find(
          (item) =>
            item.productId === product.id &&
            item.supplierId === product.supplierId
        );

        if (existingItem) {
          if (existingItem.quantity < product.stock) {
            notifications.itemAdded(product.name);
            return prev.map((item) =>
              item.productId === product.id &&
              item.supplierId === product.supplierId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            showError(`Only ${product.stock} ${product.unit} available in stock`);
            return prev;
          }
        } else {
          notifications.itemAdded(product.name);
          return [
            ...prev,
            {
              productId: product.id,
              supplierId: product.supplierId,
              quantity: 1,
              product,
            },
          ];
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError('Failed to add item to cart');
    }
  }, []);

  const removeFromCart = useCallback((productId: string, supplierId: string) => {
    try {
      setCart((prev) => {
        const existingItem = prev.find(
          (item) =>
            item.productId === productId && item.supplierId === supplierId
        );

        if (existingItem && existingItem.quantity > 1) {
          return prev.map((item) =>
            item.productId === productId && item.supplierId === supplierId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prev.filter(
            (item) =>
              !(item.productId === productId && item.supplierId === supplierId)
          );
        }
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      showError('Failed to remove item from cart');
    }
  }, []);

  const getCartQuantity = useCallback((productId: string, supplierId: string) => {
    const item = cart.find(
      (item) => item.productId === productId && item.supplierId === supplierId
    );
    return item?.quantity || 0;
  }, [cart]);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getTotalAmount = useCallback(() => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setShowCart(false);
    notifications.cartCleared();
  }, []);

  // Error state
  if (error && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button size="sm" variant="outline" onClick={handleRetry}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        {/* Network Status Indicator */}
        {!isOnline && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              You're currently offline. Some features may not be available.
            </AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
              <p className="text-muted-foreground mt-2">
                Discover fresh ingredients from verified suppliers
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isOnline ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Wifi className="h-4 w-4" />
                  <span>Online</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-yellow-600">
                  <WifiOff className="h-4 w-4" />
                  <span>Offline</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <LoadingOverlay isLoading={isLoading} message="Loading marketplace...">
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center space-x-2">
                          {category.icon}
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Distance</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="rating">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4" />
                        <span>Rating</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="delivery">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Delivery Time</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="reviews">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Most Reviewed</span>
                      </div>
                    </SelectItem>
                    {viewMode === "products" && (
                      <>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>

                {viewMode === "suppliers" && (
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4+">4+ Stars</SelectItem>
                      <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {viewMode === "products" && (
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Under ₹50</SelectItem>
                      <SelectItem value="medium">₹50 - ₹150</SelectItem>
                      <SelectItem value="high">Above ₹150</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "suppliers" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setViewMode("suppliers");
                    console.log(`Switched to suppliers view: ${filteredSuppliers.length} suppliers`);
                  }}
                  className="transition-all duration-200"
                >
                  <Store className="mr-2 h-4 w-4" />
                  Suppliers ({filteredSuppliers.length})
                </Button>
                <Button
                  variant={viewMode === "products" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setViewMode("products");
                    console.log(`Switched to products view: ${filteredProducts.length} products`);
                  }}
                  className="transition-all duration-200"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Products ({filteredProducts.length})
                </Button>

                {/* Clear Filters Button */}
                {(selectedCategory !== "all" || searchQuery.trim() || ratingFilter !== "all" || priceRange !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                      setRatingFilter("all");
                      setPriceRange("all");
                      console.log("Filters cleared");
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Cart Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowCart(!showCart);
                  console.log(`Cart ${showCart ? 'closed' : 'opened'}: ${getTotalItems()} items`);
                }}
                className={`relative transition-all duration-200 ${
                  getTotalItems() > 0 ? 'ring-2 ring-orange-200 bg-orange-50' : ''
                }`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs animate-pulse">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category.id);
                  console.log(`Filtering by ${category.name}`);
                }}
                className={`h-9 transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'shadow-md ring-2 ring-primary/20'
                    : 'hover:shadow-sm'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
                {selectedCategory === category.id && (
                  <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                    ✓
                  </span>
                )}
              </Button>
            ))}
          </div>
        </LoadingOverlay>

        {/* Cart Sidebar */}
        {showCart && (
          <div
            className="fixed inset-0 z-50 bg-black/20"
            onClick={() => setShowCart(false)}
          >
            <div
              className="fixed right-0 top-0 h-full w-96 bg-background border-l shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Shopping Cart</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCart(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setShowCart(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <Card key={`${item.supplierId}-${item.productId}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm truncate">
                                {item.product.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {item.product.supplierName}
                              </p>
                              <p className="text-sm font-medium">
                                ₹{item.product.price}/{item.product.unit}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() =>
                                  removeFromCart(item.productId, item.supplierId)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => addToCart(item.product)}
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ₹{item.product.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <div className="border-t pt-4 space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total ({getTotalItems()} items)</span>
                        <span>₹{getTotalAmount()}</span>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full" size="lg">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Proceed to Checkout
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={clearCart}
                        >
                          Clear Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SupplierCardSkeleton key={i} />
            ))}
          </div>
        ) : viewMode === "suppliers" ? (
          /* Suppliers View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="aspect-video relative bg-muted">
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="object-cover w-full h-full"
                  />
                  {supplier.verified && (
                    <Badge className="absolute top-3 right-3 bg-green-500">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      <Zap className="mr-1 h-3 w-3" />
                      Fast Delivery
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {supplier.description}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{supplier.rating}</span>
                      <span>({supplier.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{supplier.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{supplier.deliveryTime}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {supplier.categories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium">Popular Products:</div>
                    {supplier.products.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="flex items-center gap-2">
                          {product.fresh && (
                            <Leaf className="h-3 w-3 text-green-500" />
                          )}
                          {product.name}
                        </span>
                        <span className="font-medium">
                          ₹{product.price}/{product.unit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link to={`/supplier/${supplier.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Store
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/messages?supplier=${supplier.id}`}>
                        <MessageCircle className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Products View */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={`${product.supplierId}-${product.id}`}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="aspect-square relative bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  {product.fresh && (
                    <Badge
                      className="absolute top-2 right-2 bg-green-500"
                      size="sm"
                    >
                      <Leaf className="mr-1 h-2 w-2" />
                      Fresh
                    </Badge>
                  )}
                  {product.stock <= 10 && (
                    <Badge
                      className="absolute top-2 left-2 bg-red-500"
                      size="sm"
                    >
                      Low Stock
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.supplierName}
                  </p>

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    <span className="text-xs text-muted-foreground">
                      /{product.unit}
                    </span>
                  </div>

                  <div className="text-xs text-muted-foreground mb-3">
                    Stock: {product.stock} {product.unit}
                  </div>

                  {getCartQuantity(product.id, product.supplierId) > 0 ? (
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          removeFromCart(product.id, product.supplierId)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-medium">
                        {getCartQuantity(product.id, product.supplierId)}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => addToCart(product)}
                        disabled={
                          getCartQuantity(product.id, product.supplierId) >=
                          product.stock
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="mr-2 h-3 w-3" />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (viewMode === "suppliers" ? filteredSuppliers : filteredProducts).length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No {viewMode} found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setRatingFilter("all");
                setPriceRange("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
