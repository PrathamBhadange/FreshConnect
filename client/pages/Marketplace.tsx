import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
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

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [viewMode, setViewMode] = useState<"suppliers" | "products">(
    "suppliers",
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Handle URL search parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Mock data - in real app, this would come from API
  const mockSuppliers: Supplier[] = [
    {
      id: "1",
      name: "Fresh Valley Farms",
      description:
        "Premium organic fruits and vegetables directly from our farms",
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
      description:
        "Authentic Indian spices and masalas for street food vendors",
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
          image: "/placeholder.svg",
          category: "Spices",
          fresh: false,
        },
        {
          id: "5",
          name: "Red Chili Powder",
          price: 200,
          unit: "kg",
          stock: 75,
          image: "/placeholder.svg",
          category: "Spices",
          fresh: false,
        },
        {
          id: "6",
          name: "Turmeric Powder",
          price: 150,
          unit: "kg",
          stock: 100,
          image: "/placeholder.svg",
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
      image: "/placeholder.svg",
      location: "Dairy Colony, Delhi",
      products: [
        {
          id: "7",
          name: "Fresh Milk",
          price: 55,
          unit: "liter",
          stock: 300,
          image: "/placeholder.svg",
          category: "Dairy",
          fresh: true,
        },
        {
          id: "8",
          name: "Paneer",
          price: 280,
          unit: "kg",
          stock: 40,
          image: "/placeholder.svg",
          category: "Dairy",
          fresh: true,
        },
        {
          id: "9",
          name: "Curd",
          price: 60,
          unit: "kg",
          stock: 80,
          image: "/placeholder.svg",
          category: "Dairy",
          fresh: true,
        },
      ],
    },
  ];

  const categories = [
    { id: "all", name: "All Categories", icon: <Store className="h-4 w-4" /> },
    { id: "fruits", name: "Fruits", icon: <Apple className="h-4 w-4" /> },
    {
      id: "vegetables",
      name: "Vegetables",
      icon: <Carrot className="h-4 w-4" />,
    },
    { id: "spices", name: "Spices", icon: <ChefHat className="h-4 w-4" /> },
    { id: "grains", name: "Grains", icon: <Wheat className="h-4 w-4" /> },
    { id: "dairy", name: "Dairy", icon: <Milk className="h-4 w-4" /> },
    { id: "meat", name: "Meat & Fish", icon: <Fish className="h-4 w-4" /> },
  ];

  const filteredSuppliers = mockSuppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      supplier.categories.some((cat) =>
        cat.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    return matchesSearch && matchesCategory;
  });

  const allProducts = mockSuppliers.flatMap((supplier) =>
    supplier.products.map((product) => ({
      ...product,
      supplierName: supplier.name,
      supplierId: supplier.id,
    })),
  );

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Cart management functions
  const addToCart = (product: Product & { supplierName: string; supplierId: string }) => {
    setCart(prev => {
      const existingItem = prev.find(item =>
        item.productId === product.id && item.supplierId === product.supplierId
      );

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prev.map(item =>
            item.productId === product.id && item.supplierId === product.supplierId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          alert(`Only ${product.stock} ${product.unit} available in stock`);
          return prev;
        }
      } else {
        return [...prev, {
          productId: product.id,
          supplierId: product.supplierId,
          quantity: 1,
          product
        }];
      }
    });
  };

  const removeFromCart = (productId: string, supplierId: string) => {
    setCart(prev => {
      const existingItem = prev.find(item =>
        item.productId === productId && item.supplierId === supplierId
      );

      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.productId === productId && item.supplierId === supplierId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter(item =>
          !(item.productId === productId && item.supplierId === supplierId)
        );
      }
    });
  };

  const getCartQuantity = (productId: string, supplierId: string) => {
    const item = cart.find(item =>
      item.productId === productId && item.supplierId === supplierId
    );
    return item?.quantity || 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Discover fresh ingredients from verified suppliers
        </p>
      </div>

      {/* Search and Filters */}
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

          <div className="flex gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
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
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="delivery">Delivery Time</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "suppliers" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("suppliers")}
          >
            <Store className="mr-2 h-4 w-4" />
            Suppliers ({filteredSuppliers.length})
          </Button>
          <Button
            variant={viewMode === "products" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("products")}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Products ({filteredProducts.length})
          </Button>

          {/* Cart Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCart(!showCart)}
            className="relative"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
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
            onClick={() => setSelectedCategory(category.id)}
            className="h-9"
          >
            {category.icon}
            <span className="ml-2">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setShowCart(false)}>
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
                            <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                            <p className="text-xs text-muted-foreground">{item.product.supplierName}</p>
                            <p className="text-sm font-medium">₹{item.product.price}/{item.product.unit}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => removeFromCart(item.productId, item.supplierId)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
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
                            <p className="font-semibold">₹{item.product.price * item.quantity}</p>
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
      {viewMode === "suppliers" ? (
        /* Suppliers View */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card
              key={supplier.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
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
              className="overflow-hidden hover:shadow-lg transition-shadow"
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
                      onClick={() => removeFromCart(product.id, product.supplierId)}
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
                      disabled={getCartQuantity(product.id, product.supplierId) >= product.stock}
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
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {(viewMode === "suppliers" ? filteredSuppliers : filteredProducts)
        .length === 0 && (
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
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
