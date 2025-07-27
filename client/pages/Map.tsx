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
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState("Delhi");
  const [autoLocationEnabled, setAutoLocationEnabled] = useState(false);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  // Generate suppliers based on user location or search query
  const generateSuppliersForLocation = (centerLat: number, centerLng: number, locationName: string) => {
    const baseSuppliers = [
      {
        name: "Fresh Valley Farms",
        description: "Premium organic fruits and vegetables",
        categories: ["Fruits", "Vegetables"],
        stockItems: [
          { name: "Tomatoes", available: true, quantity: 150, unit: "kg" },
          { name: "Onions", available: true, quantity: 200, unit: "kg" },
          { name: "Apples", available: true, quantity: 80, unit: "kg" },
          { name: "Bananas", available: false, quantity: 0, unit: "kg" }
        ]
      },
      {
        name: "Spice Kingdom",
        description: "Authentic Indian spices and masalas",
        categories: ["Spices", "Masalas"],
        stockItems: [
          { name: "Garam Masala", available: true, quantity: 50, unit: "kg" },
          { name: "Red Chili Powder", available: true, quantity: 75, unit: "kg" },
          { name: "Turmeric", available: true, quantity: 100, unit: "kg" },
          { name: "Coriander Seeds", available: true, quantity: 60, unit: "kg" }
        ]
      },
      {
        name: "Local Dairy Products",
        description: "Fresh dairy products delivered daily",
        categories: ["Dairy", "Milk"],
        stockItems: [
          { name: "Fresh Milk", available: true, quantity: 300, unit: "liters" },
          { name: "Paneer", available: true, quantity: 40, unit: "kg" },
          { name: "Curd", available: true, quantity: 80, unit: "kg" },
          { name: "Butter", available: true, quantity: 20, unit: "kg" }
        ]
      },
      {
        name: "Green Leaf Organics",
        description: "Certified organic produce and herbs",
        categories: ["Vegetables", "Herbs"],
        stockItems: [
          { name: "Organic Spinach", available: true, quantity: 25, unit: "kg" },
          { name: "Fresh Mint", available: true, quantity: 15, unit: "bunches" },
          { name: "Organic Carrots", available: true, quantity: 40, unit: "kg" },
          { name: "Cilantro", available: true, quantity: 30, unit: "bunches" }
        ]
      },
      {
        name: "Premium Fruits Co.",
        description: "Fresh seasonal fruits and exotic varieties",
        categories: ["Fruits"],
        stockItems: [
          { name: "Mangoes", available: true, quantity: 60, unit: "kg" },
          { name: "Grapes", available: true, quantity: 45, unit: "kg" },
          { name: "Oranges", available: true, quantity: 90, unit: "kg" },
          { name: "Pomegranates", available: true, quantity: 30, unit: "kg" }
        ]
      },
      {
        name: "Veggie Mart",
        description: "Fresh vegetables at wholesale prices",
        categories: ["Vegetables"],
        stockItems: [
          { name: "Potatoes", available: true, quantity: 300, unit: "kg" },
          { name: "Cauliflower", available: true, quantity: 50, unit: "kg" },
          { name: "Cabbage", available: true, quantity: 80, unit: "kg" },
          { name: "Green Peas", available: false, quantity: 0, unit: "kg" }
        ]
      }
    ];

    return baseSuppliers.map((supplier, index) => {
      // Generate random coordinates within 20km radius of center
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 0.2; // ~20km radius in degrees
      const lat = centerLat + radius * Math.cos(angle);
      const lng = centerLng + radius * Math.sin(angle);

      const distance = calculateDistance(centerLat, centerLng, lat, lng);
      const deliveryTime = distance < 2 ? "20-30 min" :
                          distance < 5 ? "30-45 min" :
                          distance < 10 ? "45-60 min" : "60-90 min";

      return {
        id: `${index + 1}`,
        ...supplier,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 200) + 50,
        distance: `${distance.toFixed(1)} km`,
        deliveryTime,
        verified: Math.random() > 0.2, // 80% chance of being verified
        image: "/placeholder.svg",
        location: `${locationName} Area ${index + 1}`,
        coordinates: { lat, lng },
        phone: `+91 9876${String(543210 + index).slice(-6)}`,
        operatingHours: "6:00 AM - 8:00 PM",
        lastUpdated: new Date(Date.now() - Math.random() * 30 * 60 * 1000) // Random time within last 30 minutes
      };
    });
  };

  // Get location name from coordinates (mock implementation)
  const getLocationName = async (lat: number, lng: number) => {
    // Mock location detection based on major Indian cities
    const locations = [
      { name: "Delhi", lat: 28.6139, lng: 77.2090 },
      { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
      { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
      { name: "Chennai", lat: 13.0827, lng: 80.2707 },
      { name: "Pune", lat: 18.5204, lng: 73.8567 },
      { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
      { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
      { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
      { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
      { name: "Nashik", lat: 19.9975, lng: 73.7898 }
    ];

    let closestLocation = locations[0];
    let minDistance = calculateDistance(lat, lng, locations[0].lat, locations[0].lng);

    for (const location of locations) {
      const distance = calculateDistance(lat, lng, location.lat, location.lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestLocation = location;
      }
    }

    return closestLocation.name;
  };

  // Auto-detect location on mount
  useEffect(() => {
    const autoDetectLocation = () => {
      if (navigator.geolocation && !userLocation && !searchQuery.trim()) {
        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(location);
            setMapCenter(location);
            setAutoLocationEnabled(true);

            const locationName = await getLocationName(location.lat, location.lng);
            setCurrentLocationName(locationName);
            setIsLoadingLocation(false);
          },
          (error) => {
            console.log("Auto-location failed:", error.message);
            setIsLoadingLocation(false);
            setCurrentLocationName("Delhi");
          },
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 300000
          }
        );
      }
    };

    autoDetectLocation();
  }, []);

  // Load suppliers based on location
  useEffect(() => {
    const loadSuppliers = async () => {
      let lat = mapCenter.lat;
      let lng = mapCenter.lng;
      let locationName = currentLocationName;

      // If user has a location, use that
      if (userLocation) {
        lat = userLocation.lat;
        lng = userLocation.lng;
        locationName = await getLocationName(lat, lng);
        setCurrentLocationName(locationName);
      }
      // If there's a search query, try to match it to a city
      else if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const cityMap: { [key: string]: { lat: number; lng: number; name: string } } = {
          'delhi': { lat: 28.6139, lng: 77.2090, name: 'Delhi' },
          'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
          'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
          'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
          'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune' },
          'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad' },
          'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
          'ahmedabad': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad' },
          'jaipur': { lat: 26.9124, lng: 75.7873, name: 'Jaipur' },
          'nashik': { lat: 19.9975, lng: 73.7898, name: 'Nashik' }
        };

        if (cityMap[query]) {
          lat = cityMap[query].lat;
          lng = cityMap[query].lng;
          locationName = cityMap[query].name;
          setMapCenter({ lat, lng });
          setCurrentLocationName(locationName);
        }
      }

      const generatedSuppliers = generateSuppliersForLocation(lat, lng, locationName);

      // Sort by distance
      const sortedSuppliers = generatedSuppliers.sort((a, b) => {
        const distanceA = parseFloat(a.distance.replace(' km', ''));
        const distanceB = parseFloat(b.distance.replace(' km', ''));
        return distanceA - distanceB;
      });

      setSuppliers(sortedSuppliers);
    };

    loadSuppliers();
  }, [userLocation, searchQuery, mapCenter, currentLocationName]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setMapCenter(location);
          setAutoLocationEnabled(true);

          // Get location name and show confirmation
          const locationName = await getLocationName(location.lat, location.lng);
          setCurrentLocationName(locationName);
          setIsLoadingLocation(false);

          // Clear search query when using location
          setSearchQuery("");
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          let errorMessage = "Unable to get your location. ";

          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Location access was denied. Please enable location permissions.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out.";
              break;
            default:
              errorMessage += "An unknown error occurred.";
              break;
          }

          alert(errorMessage + " Showing suppliers for Delhi area.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      alert("Geolocation is not supported by this browser. Showing suppliers for Delhi area.");
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Find Suppliers</h1>
            <p className="text-muted-foreground mt-2">
              {isLoadingLocation ? (
                "Detecting your location..."
              ) : userLocation ? (
                `Showing suppliers near ${currentLocationName}`
              ) : searchQuery ? (
                `Showing suppliers in ${currentLocationName}`
              ) : (
                "Locate nearby suppliers with real-time locations and stock"
              )}
            </p>
          </div>

          {/* Location Status */}
          <div className="text-right">
            {userLocation && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Navigation className="mr-1 h-3 w-3" />
                Location Enabled
              </Badge>
            )}
            {isLoadingLocation && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <RotateCcw className="mr-1 h-3 w-3 animate-spin" />
                Detecting...
              </Badge>
            )}
          </div>
        </div>
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
