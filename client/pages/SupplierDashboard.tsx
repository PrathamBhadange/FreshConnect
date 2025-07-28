import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Store, 
  Bell, 
  Package, 
  IndianRupee,
  MapPin,
  Clock,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  category: string;
  image: string;
  status: 'active' | 'low-stock' | 'out-of-stock';
}

interface Order {
  id: string;
  customerName: string;
  items: { productName: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  orderDate: Date;
  deliveryAddress: string;
}

export default function SupplierDashboard() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 40,
      unit: "kg",
      stock: 150,
      category: "Vegetables",
      image: "https://images.unsplash.com/photo-1546470427-227e13439cd0?w=300&h=300&fit=crop",
      status: 'active'
    },
    {
      id: "2",
      name: "Organic Onions",
      price: 35,
      unit: "kg",
      stock: 5,
      category: "Vegetables",
      image: "https://images.unsplash.com/photo-1508313880080-c4bec8ca91a4?w=300&h=300&fit=crop",
      status: 'low-stock'
    },
    {
      id: "3",
      name: "Fresh Apples",
      price: 120,
      unit: "kg",
      stock: 0,
      category: "Fruits",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
      status: 'out-of-stock'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Raj's Chaat Corner",
      items: [
        { productName: "Fresh Tomatoes", quantity: 10, price: 40 },
        { productName: "Organic Onions", quantity: 5, price: 35 }
      ],
      total: 575,
      status: 'pending',
      orderDate: new Date(Date.now() - 30 * 60 * 1000),
      deliveryAddress: "Shop 15, Street Food Market, Delhi"
    },
    {
      id: "ORD-002",
      customerName: "Mumbai Food Cart",
      items: [
        { productName: "Fresh Apples", quantity: 8, price: 120 }
      ],
      total: 960,
      status: 'confirmed',
      orderDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      deliveryAddress: "Cart 23, Marine Drive, Mumbai"
    }
  ]);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "",
    stock: "",
    category: "",
    image: ""
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order from Raj's Chaat Corner", type: "order", time: "2 min ago", read: false },
    { id: 2, message: "Organic Onions running low (5 kg left)", type: "stock", time: "15 min ago", read: false },
    { id: 3, message: "Payment received for Order #ORD-002", type: "payment", time: "1 hour ago", read: true }
  ]);

  const [marketInfo, setMarketInfo] = useState({
    name: "Fresh Valley Farms",
    location: "Sector 15, Gurgaon",
    description: "Premium organic fruits and vegetables",
    operatingHours: "6:00 AM - 8:00 PM",
    deliveryRadius: "10 km",
    minimumOrder: "500"
  });

  const [isEditMarketOpen, setIsEditMarketOpen] = useState(false);

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.unit && newProduct.stock && newProduct.category) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        unit: newProduct.unit,
        stock: parseInt(newProduct.stock),
        category: newProduct.category,
        image: newProduct.image || "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=300&h=300&fit=crop",
        status: parseInt(newProduct.stock) > 20 ? 'active' : parseInt(newProduct.stock) > 0 ? 'low-stock' : 'out-of-stock'
      };
      
      setProducts([...products, product]);
      setNewProduct({ name: "", price: "", unit: "", stock: "", category: "", image: "" });
      setIsAddProductOpen(false);
      alert("Product added successfully!");
    }
  };

  const confirmOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'confirmed' } : order
    ));
    alert("Order confirmed! Customer will be notified.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'low-stock': return 'bg-yellow-100 text-yellow-700';
      case 'out-of-stock': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'delivered': return <Package className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Supplier Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your products, orders, and market presence</p>
          </div>
          
          {/* Notifications */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500">
                {notifications.length}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold">₹1,535</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Products</p>
                <p className="text-2xl font-bold">{products.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">+23%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Information */}
        <div className="lg:col-span-3 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Market Information
                  </CardTitle>
                  <CardDescription>Manage your market presence and details</CardDescription>
                </div>
                <Dialog open={isEditMarketOpen} onOpenChange={setIsEditMarketOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Market
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Market Information</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="marketName">Market Name</Label>
                        <Input
                          id="marketName"
                          value={marketInfo.name}
                          onChange={(e) => setMarketInfo({...marketInfo, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={marketInfo.location}
                          onChange={(e) => setMarketInfo({...marketInfo, location: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={marketInfo.description}
                          onChange={(e) => setMarketInfo({...marketInfo, description: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="hours">Operating Hours</Label>
                          <Input
                            id="hours"
                            value={marketInfo.operatingHours}
                            onChange={(e) => setMarketInfo({...marketInfo, operatingHours: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="radius">Delivery Radius</Label>
                          <Input
                            id="radius"
                            value={marketInfo.deliveryRadius}
                            onChange={(e) => setMarketInfo({...marketInfo, deliveryRadius: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="minOrder">Minimum Order (₹)</Label>
                        <Input
                          id="minOrder"
                          value={marketInfo.minimumOrder}
                          onChange={(e) => setMarketInfo({...marketInfo, minimumOrder: e.target.value})}
                        />
                      </div>
                      <Button onClick={() => {
                        setIsEditMarketOpen(false);
                        alert("Market information updated successfully!");
                      }} className="w-full">
                        Update Market Info
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Market Name</span>
                  </div>
                  <p className="font-semibold">{marketInfo.name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Location</span>
                  </div>
                  <p className="font-semibold">{marketInfo.location}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Operating Hours</span>
                  </div>
                  <p className="font-semibold">{marketInfo.operatingHours}</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">{marketInfo.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>Delivery: {marketInfo.deliveryRadius}</span>
                  <span>Min Order: ₹{marketInfo.minimumOrder}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Products</CardTitle>
                  <CardDescription>Manage your product inventory</CardDescription>
                </div>
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                          id="productName"
                          placeholder="Fresh Vegetables"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="40"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="unit">Unit</Label>
                          <Input
                            id="unit"
                            placeholder="kg"
                            value={newProduct.unit}
                            onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          type="number"
                          placeholder="100"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Vegetables">Vegetables</SelectItem>
                            <SelectItem value="Fruits">Fruits</SelectItem>
                            <SelectItem value="Spices">Spices</SelectItem>
                            <SelectItem value="Dairy">Dairy</SelectItem>
                            <SelectItem value="Grains">Grains</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="image">Image URL (optional)</Label>
                        <Input
                          id="image"
                          placeholder="https://..."
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />
                      </div>
                      <Button onClick={addProduct} className="w-full">
                        Add Product
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price}/{product.unit} • Stock: {product.stock} {product.unit}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders & Notifications */}
        <div className="space-y-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>New orders from customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getOrderStatusIcon(order.status)}
                        <span className="font-semibold text-sm">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {order.orderDate.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {order.items.length} items �� ₹{order.total}
                    </p>
                    {order.status === 'pending' && (
                      <Button size="sm" onClick={() => confirmOrder(order.id)}>
                        Confirm Order
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className={`p-1 rounded ${
                      notification.type === 'order' ? 'bg-blue-100' :
                      notification.type === 'stock' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      {notification.type === 'order' ? <Package className="h-3 w-3" /> :
                       notification.type === 'stock' ? <AlertCircle className="h-3 w-3" /> :
                       <IndianRupee className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
