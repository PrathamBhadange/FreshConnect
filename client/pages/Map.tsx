import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { 
  MapPin, 
  Search, 
  Filter,
  Navigation,
  Star,
  Clock,
  Store,
  Truck,
  Eye,
  MessageCircle,
  Phone,
  CheckCircle,
  Leaf,
  RotateCcw
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
  verified: boolean;
  image: string;
  location: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  operatingHours: string;
  stockItems: { name: string; available: boolean; quantity: number; unit: string }[];
  lastUpdated: Date;
}

export default function Map() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Mock data for suppliers
  useEffect(() => {
    const mockSuppliers: Supplier[] = [
      {
        id: "1",
        name: "Fresh Valley Farms",
        description: "Premium organic fruits and vegetables",
        rating: 4.8,
        reviews: 124,
        distance: "2.3 km",
        deliveryTime: "30-45 min",
        categories: ["Fruits", "Vegetables"],
        verified: true,
        image: "/placeholder.svg",
        location: "Sector 15, Gurgaon",
        coordinates: { lat: 28.4595, lng: 77.0266 },
        phone: "+91 98765 43210",
        operatingHours: "6:00 AM - 8:00 PM",
        stockItems: [
          { name: "Tomatoes", available: true, quantity: 150, unit: "kg" },
          { name: "Onions", available: true, quantity: 200, unit: "kg" },
          { name: "Apples", available: true, quantity: 80, unit: "kg" },
          { name: "Bananas", available: false, quantity: 0, unit: "kg" }
        ],
        lastUpdated: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago
      },
      {
        id: "2",
        name: "Spice Kingdom",
        description: "Authentic Indian spices and masalas",
        rating: 4.9,
        reviews: 89,
        distance: "1.8 km",
        deliveryTime: "20-30 min",
        categories: ["Spices", "Masalas"],
        verified: true,
        image: "/placeholder.svg",
        location: "Old Delhi Market",
        coordinates: { lat: 28.6506, lng: 77.2334 },
        phone: "+91 98765 43211",
        operatingHours: "7:00 AM - 9:00 PM",
        stockItems: [
          { name: "Garam Masala", available: true, quantity: 50, unit: "kg" },
          { name: "Red Chili Powder", available: true, quantity: 75, unit: "kg" },
          { name: "Turmeric", available: true, quantity: 100, unit: "kg" },
          { name: "Coriander Seeds", available: true, quantity: 60, unit: "kg" }
        ],
        lastUpdated: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
      },
      {
        id: "3",
        name: "Metro Dairy Products",
        description: "Fresh dairy products delivered daily",
        rating: 4.7,
        reviews: 156,
        distance: "3.1 km",
        deliveryTime: "45-60 min",
        categories: ["Dairy", "Milk"],
        verified: true,
        image: "/placeholder.svg",
        location: "Dairy Colony, Delhi",
        coordinates: { lat: 28.5355, lng: 77.3910 },
        phone: "+91 98765 43212",
        operatingHours: "5:00 AM - 10:00 PM",
        stockItems: [
          { name: "Fresh Milk", available: true, quantity: 300, unit: "liters" },
          { name: "Paneer", available: true, quantity: 40, unit: "kg" },
          { name: "Curd", available: true, quantity: 80, unit: "kg" },
          { name: "Butter", available: false, quantity: 0, unit: "kg" }
        ],
        lastUpdated: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
      },
      {
        id: "4",
        name: "Green Leaf Organics",
        description: "Certified organic produce and herbs",
        rating: 4.6,
        reviews: 78,
        distance: "4.2 km",
        deliveryTime: "60-90 min",
        categories: ["Vegetables", "Herbs"],
        verified: true,
        image: "/placeholder.svg",
        location: "Noida Sector 18",
        coordinates: { lat: 28.5678, lng: 77.3261 },
        phone: "+91 98765 43213",
        operatingHours: "6:00 AM - 7:00 PM",
        stockItems: [
          { name: "Organic Spinach", available: true, quantity: 25, unit: "kg" },
          { name: "Fresh Mint", available: true, quantity: 15, unit: "bunches" },
          { name: "Organic Carrots", available: true, quantity: 40, unit: "kg" },
          { name: "Cilantro", available: true, quantity: 30, unit: "bunches" }
        ],
        lastUpdated: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
      }
    ];

    setSuppliers(mockSuppliers);
  }, []);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Showing default area.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || 
                           supplier.categories.some(cat => cat.toLowerCase().includes(categoryFilter.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just updated";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const MapView = () => (
    <div className="relative h-96 bg-muted rounded-lg overflow-hidden border">
      {/* Custom Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
        <svg className="w-full h-full opacity-10" viewBox="0 0 400 300">
          {/* Road patterns */}
          <path d="M0 150 L400 150" stroke="#666" strokeWidth="2" />
          <path d="M200 0 L200 300" stroke="#666" strokeWidth="2" />
          <path d="M0 75 L400 75" stroke="#666" strokeWidth="1" />
          <path d="M0 225 L400 225" stroke="#666" strokeWidth="1" />
          <path d="M100 0 L100 300" stroke="#666" strokeWidth="1" />
          <path d="M300 0 L300 300" stroke="#666" strokeWidth="1" />
        </svg>
      </div>

      {/* User Location */}
      {userLocation && (
        <div 
          className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"
          style={{
            left: `${50}%`,
            top: `${50}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Supplier Markers */}
      {filteredSuppliers.map((supplier, index) => (
        <div
          key={supplier.id}
          className={cn(
            "absolute w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110",
            selectedSupplier === supplier.id && "scale-125 z-10"
          )}
          style={{
            left: `${20 + (index * 15) % 60}%`,
            top: `${20 + (index * 12) % 60}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={() => setSelectedSupplier(supplier.id)}
        >
          <div className={cn(
            "w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold",
            supplier.verified ? "bg-supplier" : "bg-gray-500"
          )}>
            <Store className="h-4 w-4" />
          </div>
          {supplier.verified && (
            <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500 bg-white rounded-full" />
          )}
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={getCurrentLocation}
          className="bg-white shadow-lg"
        >
          <Navigation className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setMapCenter({ lat: 28.6139, lng: 77.2090 });
            setSelectedSupplier(null);
          }}
          className="bg-white shadow-lg"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected Supplier Info */}
      {selectedSupplier && (
        <div className="absolute bottom-4 left-4 right-4">
          {(() => {
            const supplier = suppliers.find(s => s.id === selectedSupplier);
            if (!supplier) return null;
            return (
              <Card className="shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{supplier.name}</h3>
                      <p className="text-sm text-muted-foreground">{supplier.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{supplier.rating}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-sm">{supplier.distance}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/supplier/${supplier.id}`}>
                          <Eye className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find Suppliers</h1>
        <p className="text-muted-foreground mt-2">Locate nearby suppliers with real-time locations and stock</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search suppliers or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="spices">Spices</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="herbs">Herbs</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={getCurrentLocation} variant="outline">
              <Navigation className="mr-2 h-4 w-4" />
              My Location
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <MapView />
        </div>

        {/* Suppliers List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Nearby Suppliers</h2>
            <Badge variant="secondary">{filteredSuppliers.length} found</Badge>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredSuppliers.map((supplier) => (
              <Card 
                key={supplier.id} 
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md",
                  selectedSupplier === supplier.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedSupplier(supplier.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{supplier.name}</h3>
                      {supplier.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{supplier.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">{supplier.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{supplier.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{supplier.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Stock Status</span>
                      <span className="text-xs text-muted-foreground">
                        Updated {getTimeAgo(supplier.lastUpdated)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {supplier.stockItems.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            item.available ? "bg-green-500" : "bg-red-500"
                          )} />
                          <span className={cn(
                            "truncate",
                            !item.available && "line-through text-muted-foreground"
                          )}>
                            {item.name}
                          </span>
                          {item.available && (
                            <span className="text-muted-foreground">
                              ({item.quantity})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link to={`/supplier/${supplier.id}`}>
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No suppliers found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or location
              </p>
              <Button onClick={getCurrentLocation}>
                <Navigation className="mr-2 h-4 w-4" />
                Update Location
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
