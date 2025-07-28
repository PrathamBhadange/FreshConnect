import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  MessageCircle,
  ShoppingCart,
  Phone,
  Mail,
  CheckCircle,
  Leaf,
  Plus,
  Minus,
  Info,
  Truck,
  Store,
  Heart,
  Share2,
  Bookmark,
  Edit3,
  Settings,
  MoreVertical,
  Users,
  Award,
  ThumbsUp,
  TrendingUp,
  Shield,
  Gift,
  Zap,
  Target,
  Camera,
  Bell,
  Menu,
  X,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  image: string;
  category: string;
  fresh: boolean;
  description?: string;
}

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
  phone: string;
  email: string;
  operatingHours: string;
  minimumOrder: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

export default function SupplierStoreEnhanced() {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isSupplierMenuOpen, setIsSupplierMenuOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockSupplier: Supplier = {
      id: supplierId || "1",
      name: "Fresh Valley Farms",
      description:
        "Premium organic fruits and vegetables directly from our farms. We've been serving the Delhi NCR region for over 15 years with the freshest produce.",
      rating: 4.8,
      reviews: 124,
      distance: "2.3 km",
      deliveryTime: "30-45 min",
      categories: ["Fruits", "Vegetables", "Herbs"],
      verified: true,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center",
      location: "Sector 15, Gurgaon, Haryana",
      phone: "+91 98765 43210",
      email: "orders@freshvalleyfarms.com",
      operatingHours: "6:00 AM - 8:00 PM",
      minimumOrder: 500,
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
          description:
            "Fresh, ripe tomatoes perfect for curries and salads. Grown without pesticides.",
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
          description:
            "Premium quality organic onions, essential for every Indian kitchen.",
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
          description:
            "Crisp and sweet apples, perfect for fruit chats and desserts.",
        },
        {
          id: "4",
          name: "Green Chilies",
          price: 60,
          unit: "kg",
          stock: 50,
          image: "https://images.unsplash.com/photo-1583788392651-c0ac0e365aea?w=300&h=300&fit=crop&crop=center",
          category: "Vegetables",
          fresh: true,
          description:
            "Spicy green chilies that add heat to your street food preparations.",
        },
        {
          id: "5",
          name: "Fresh Coriander",
          price: 20,
          unit: "bunch",
          stock: 100,
          image: "https://images.unsplash.com/photo-1583523386036-5c566e5c5e5e?w=300&h=300&fit=crop&crop=center",
          category: "Herbs",
          fresh: true,
          description: "Fresh coriander leaves for garnishing and flavoring.",
        },
        {
          id: "6",
          name: "Potatoes",
          price: 25,
          unit: "kg",
          stock: 300,
          image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop&crop=center",
          category: "Vegetables",
          fresh: true,
          description:
            "High-quality potatoes perfect for aloo tikki, samosas, and more.",
        },
      ],
    };
    setSupplier(mockSupplier);
  }, [supplierId]);

  const categories = [
    "all",
    ...Array.from(new Set(supplier?.products.map((p) => p.category) || [])),
  ];

  const filteredProducts =
    supplier?.products.filter(
      (product) =>
        selectedCategory === "all" || product.category === selectedCategory,
    ) || [];

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      return prev.filter((item) => item.productId !== productId);
    });
  };

  const getCartQuantity = (productId: string) => {
    return cart.find((item) => item.productId === productId)?.quantity || 0;
  };

  const getTotalAmount = () => {
    if (!supplier) return 0;
    return cart.reduce((total, item) => {
      const product = supplier.products.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (!supplier) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      {/* Supplier Header */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={supplier.image} alt={supplier.name} />
                  <AvatarFallback>
                    <Store className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{supplier.name}</h1>
                      {supplier.verified && (
                        <Badge className="bg-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-lg">
                      {supplier.description}
                    </p>
                  </div>

                  {/* Amazon-style Action Icons */}
                  <div className="flex items-center gap-2">
                    {/* Supplier Menu */}
                    <DropdownMenu open={isSupplierMenuOpen} onOpenChange={setIsSupplierMenuOpen}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Menu className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{supplier.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">Supplier Options</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsEditMode(true)}>
                          <Edit3 className="mr-2 h-4 w-4" />
                          Edit Store
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('View Analytics')}>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Manage Inventory')}>
                          <Settings className="mr-2 h-4 w-4" />
                          Manage Inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowNotifications(!showNotifications)}>
                          <Bell className="mr-2 h-4 w-4" />
                          Notifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => console.log('Store Settings')}>
                          <Shield className="mr-2 h-4 w-4" />
                          Store Settings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Interactive Icons */}
                    <TooltipProvider>
                      <div className="flex gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => {
                                setIsFollowing(!isFollowing);
                                console.log(isFollowing ? 'Unfollowed supplier' : 'Following supplier');
                              }}
                              className={isFollowing ? 'bg-red-50 text-red-600 border-red-200' : ''}
                            >
                              <Heart className={`h-4 w-4 ${isFollowing ? 'fill-current' : ''}`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isFollowing ? 'Unfollow' : 'Follow'} this supplier</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => {
                                setIsBookmarked(!isBookmarked);
                                console.log(isBookmarked ? 'Removed bookmark' : 'Bookmarked supplier');
                              }}
                              className={isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                            >
                              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isBookmarked ? 'Remove bookmark' : 'Bookmark'} this supplier</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => {
                                navigator.share && navigator.share({
                                  title: supplier.name,
                                  text: supplier.description,
                                  url: window.location.href,
                                }) || console.log('Shared supplier store');
                              }}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Share this supplier</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>

                    <Dialog
                      open={isMessageDialogOpen}
                      onOpenChange={setIsMessageDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Send Message to {supplier.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                              id="subject"
                              placeholder="Order inquiry..."
                              value={messageSubject}
                              onChange={(e) =>
                                setMessageSubject(e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Hi, I'm interested in placing a bulk order..."
                              rows={4}
                              value={messageContent}
                              onChange={(e) =>
                                setMessageContent(e.target.value)
                              }
                            />
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => {
                              if (
                                messageSubject.trim() &&
                                messageContent.trim()
                              ) {
                                alert(
                                  `Message sent to ${supplier.name}!\n\nSubject: ${messageSubject}\nMessage: ${messageContent}`,
                                );
                                setMessageSubject("");
                                setMessageContent("");
                                setIsMessageDialogOpen(false);
                              } else {
                                alert(
                                  "Please fill in both subject and message.",
                                );
                              }
                            }}
                          >
                            Send Message
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => {
                        if (supplier?.phone) {
                          window.open(`tel:${supplier.phone}`, "_self");
                        } else {
                          alert("Phone number not available");
                        }
                      }}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </div>
                </div>

                {/* Enhanced Stats with Amazon-style metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{supplier.rating}</span>
                    <span className="text-muted-foreground">
                      ({supplier.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{supplier.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{supplier.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Min ₹{supplier.minimumOrder}</span>
                  </div>
                </div>

                {/* Additional Amazon-style Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="font-medium">98%</span>
                    <span className="text-muted-foreground">Positive</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">2.5k+</span>
                    <span className="text-muted-foreground">Orders</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-600">
                    <Award className="h-4 w-4" />
                    <span className="font-medium">Top Rated</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Zap className="h-4 w-4" />
                    <span className="font-medium">Fast Delivery</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {supplier.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Store Dialog */}
      {isEditMode && (
        <Dialog open={isEditMode} onOpenChange={setIsEditMode}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Edit Store Information
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName" 
                    defaultValue={supplier.name}
                    placeholder="Enter store name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input 
                    id="storeEmail" 
                    type="email"
                    defaultValue={supplier.email}
                    placeholder="Enter email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Description</Label>
                <Textarea 
                  id="storeDescription" 
                  defaultValue={supplier.description}
                  placeholder="Describe your store..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input 
                    id="storePhone" 
                    defaultValue={supplier.phone}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeHours">Operating Hours</Label>
                  <Input 
                    id="storeHours" 
                    defaultValue={supplier.operatingHours}
                    placeholder="e.g., 9:00 AM - 6:00 PM"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeLocation">Location</Label>
                <Input 
                  id="storeLocation" 
                  defaultValue={supplier.location}
                  placeholder="Enter complete address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Minimum Order (₹)</Label>
                  <Input 
                    id="minOrder" 
                    type="number"
                    defaultValue={supplier.minimumOrder}
                    placeholder="500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Input 
                    id="deliveryTime" 
                    defaultValue={supplier.deliveryTime}
                    placeholder="e.g., 30-45 min"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Store Photo</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Upload New Photo
                  </Button>
                  <span className="text-sm text-muted-foreground">JPG, PNG up to 5MB</span>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log('Store information updated');
                  setIsEditMode(false);
                  alert('✅ Store information updated successfully!');
                }}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed right-4 top-20 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowNotifications(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">New Order Received</span>
              </div>
              <p className="text-xs text-green-600 mt-1">Order #1234 for ₹850 from vendor XYZ</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="flex items-center gap-2 text-blue-800">
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">Stock Alert</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">Tomatoes running low (15kg remaining)</p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded">
              <div className="flex items-center gap-2 text-orange-800">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">New Review</span>
              </div>
              <p className="text-xs text-orange-600 mt-1">5-star review from satisfied customer</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Products Section */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              {/* Category Filter */}
              <div className="mb-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Products" : category}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square relative bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                      {product.fresh && (
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          <Leaf className="mr-1 h-2 w-2" />
                          Fresh
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-lg">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{product.unit}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground mb-4">
                        Stock: {product.stock} {product.unit}
                      </div>

                      {getCartQuantity(product.id) > 0 ? (
                        <div className="flex items-center justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium">
                            {getCartQuantity(product.id)}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToCart(product.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => addToCart(product.id)}
                        >
                          <ShoppingCart className="mr-2 h-3 w-3" />
                          Add to Cart
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{supplier.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{supplier.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{supplier.operatingHours}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">
                        Delivery Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          <span>Delivery Time: {supplier.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          <span>Minimum Order: ₹{supplier.minimumOrder}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Reviews feature coming soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart ({getTotalItems()})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const product = supplier.products.find(
                      (p) => p.id === item.productId,
                    );
                    if (!product) return null;

                    return (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ₹{product.price}/{product.unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                            onClick={() => addToCart(item.productId)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total: ₹{getTotalAmount()}</span>
                    </div>
                    {getTotalAmount() < supplier.minimumOrder && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Minimum order: ₹{supplier.minimumOrder}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    disabled={getTotalAmount() < supplier.minimumOrder}
                    onClick={() => {
                      if (cart.length === 0) {
                        alert(
                          "Your cart is empty. Please add some items first.",
                        );
                        return;
                      }
                      if (getTotalAmount() < supplier.minimumOrder) {
                        alert(
                          `Minimum order amount is ₹${supplier.minimumOrder}. Please add more items.`,
                        );
                        return;
                      }

                      const orderDetails = cart
                        .map((item) => {
                          const product = supplier.products.find(
                            (p) => p.id === item.productId,
                          );
                          return `${product?.name} x ${item.quantity} = ₹${product ? product.price * item.quantity : 0}`;
                        })
                        .join("\n");

                      alert(
                        `Order placed successfully!\n\nOrder Details:\n${orderDetails}\n\nTotal: ₹${getTotalAmount()}\n\nYou will receive a confirmation call from ${supplier.name} shortly.`,
                      );
                      setCart([]);
                      setIsOrderPlaced(true);

                      // Reset success message after 3 seconds
                      setTimeout(() => setIsOrderPlaced(false), 3000);
                    }}
                  >
                    {isOrderPlaced ? "Order Placed! ✓" : "Place Order"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
