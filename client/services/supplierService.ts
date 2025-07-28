interface SupplierFormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  
  // Shop/Business Information
  shopName: string;
  businessType: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  
  // Business Details
  gstNumber: string;
  fssaiLicense: string;
  bankAccount: string;
  ifscCode: string;
  
  // Operational Details
  operatingHours: string;
  deliveryRadius: string;
  minimumOrder: string;
  categories: string[];
  
  // Terms
  agreeToTerms: boolean;
  agreeToQuality: boolean;
}

interface RegisteredSupplier {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  categories: string[];
  products: any[];
  verified: boolean;
  image: string;
  location: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  operatingHours: string;
  deliveryRadius: string;
  registeredAt: string;
}

// Simulate a storage service (in real app would use database)
class SupplierStorageService {
  private readonly STORAGE_KEY = 'freshconnect_registered_suppliers';

  // Get all registered suppliers
  getRegisteredSuppliers(): RegisteredSupplier[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load registered suppliers:', error);
      return [];
    }
  }

  // Register a new supplier
  registerSupplier(formData: SupplierFormData): RegisteredSupplier {
    const newSupplier: RegisteredSupplier = {
      id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: formData.shopName,
      description: formData.description || `${formData.businessType} providing quality products`,
      rating: 4.5, // Default new supplier rating
      reviews: 0,
      distance: this.calculateDistance(formData.city),
      deliveryTime: this.calculateDeliveryTime(formData.deliveryRadius),
      categories: this.mapCategoriesForDisplay(formData.categories),
      products: this.generateDefaultProducts(formData.categories),
      verified: true, // Auto-verify for demo
      image: this.getSupplierImage(formData.categories),
      location: `${formData.city}, ${formData.state}`,
      ownerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      businessType: formData.businessType,
      operatingHours: formData.operatingHours,
      deliveryRadius: formData.deliveryRadius,
      registeredAt: new Date().toISOString()
    };

    // Save to storage
    const existing = this.getRegisteredSuppliers();
    const updated = [...existing, newSupplier];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));

    return newSupplier;
  }

  private calculateDistance(city: string): string {
    // Simple distance calculation based on city (in real app would use geolocation)
    const distances = {
      'Delhi': '2.5 km',
      'Mumbai': '3.2 km', 
      'Bangalore': '4.1 km',
      'Chennai': '3.8 km',
      'Kolkata': '2.9 km',
      'Hyderabad': '3.5 km',
      'Pune': '4.2 km'
    };
    return distances[city as keyof typeof distances] || `${(Math.random() * 5 + 1).toFixed(1)} km`;
  }

  private calculateDeliveryTime(radius: string): string {
    const radiusNum = parseInt(radius.replace(/\D/g, '')) || 10;
    const baseTime = Math.max(20, radiusNum * 2);
    return `${baseTime}-${baseTime + 15} min`;
  }

  private mapCategoriesForDisplay(categories: string[]): string[] {
    const mapping: { [key: string]: string } = {
      'Fresh Vegetables': 'Vegetables',
      'Fresh Fruits': 'Fruits',
      'Spices & Masalas': 'Spices',
      'Dairy Products': 'Dairy',
      'Grains & Cereals': 'Grains',
      'Meat & Seafood': 'Meat',
      'Organic Produce': 'Organic',
      'Herbs': 'Herbs',
      'Dry Fruits': 'Dry Fruits',
      'Oil & Ghee': 'Oil'
    };

    return categories.map(cat => mapping[cat] || cat);
  }

  private generateDefaultProducts(categories: string[]): any[] {
    const productTemplates: { [key: string]: any[] } = {
      'Fresh Vegetables': [
        {
          id: 'veg_1',
          name: 'Fresh Tomatoes',
          price: 45,
          unit: 'kg',
          stock: 100,
          image: 'https://images.unsplash.com/photo-1546470427-227e13439cd0?w=300&h=300&fit=crop&crop=center',
          category: 'Vegetables',
          fresh: true
        },
        {
          id: 'veg_2',
          name: 'Organic Onions',
          price: 38,
          unit: 'kg', 
          stock: 150,
          image: 'https://images.unsplash.com/photo-1508313880080-c4bec8ca91a4?w=300&h=300&fit=crop&crop=center',
          category: 'Vegetables',
          fresh: true
        }
      ],
      'Fresh Fruits': [
        {
          id: 'fruit_1',
          name: 'Fresh Apples',
          price: 125,
          unit: 'kg',
          stock: 80,
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop&crop=center',
          category: 'Fruits',
          fresh: true
        },
        {
          id: 'fruit_2',
          name: 'Sweet Oranges',
          price: 95,
          unit: 'kg',
          stock: 120,
          image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop&crop=center',
          category: 'Fruits',
          fresh: true
        }
      ],
      'Spices & Masalas': [
        {
          id: 'spice_1',
          name: 'Garam Masala',
          price: 300,
          unit: 'kg',
          stock: 50,
          image: 'https://images.unsplash.com/photo-1599909533047-f58b8d68fa44?w=300&h=300&fit=crop&crop=center',
          category: 'Spices',
          fresh: false
        }
      ],
      'Dairy Products': [
        {
          id: 'dairy_1',
          name: 'Fresh Milk',
          price: 60,
          unit: 'liter',
          stock: 200,
          image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&crop=center',
          category: 'Dairy',
          fresh: true
        }
      ]
    };

    let products: any[] = [];
    categories.forEach(category => {
      const templates = productTemplates[category];
      if (templates) {
        products.push(...templates.map(product => ({
          ...product,
          id: `${Date.now()}_${product.id}_${Math.random().toString(36).substring(2, 5)}`
        })));
      }
    });

    return products.length > 0 ? products : [
      {
        id: `default_${Date.now()}`,
        name: 'Quality Product',
        price: 100,
        unit: 'kg',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&crop=center',
        category: 'General',
        fresh: true
      }
    ];
  }

  private getSupplierImage(categories: string[]): string {
    const images: { [key: string]: string } = {
      'Fresh Vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center',
      'Fresh Fruits': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop&crop=center',
      'Spices & Masalas': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop&crop=center',
      'Dairy Products': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=300&fit=crop&crop=center',
      'Grains & Cereals': 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop&crop=center'
    };

    for (const category of categories) {
      if (images[category]) {
        return images[category];
      }
    }

    return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center';
  }

  // Get a specific supplier by ID
  getSupplierById(id: string): RegisteredSupplier | null {
    const suppliers = this.getRegisteredSuppliers();
    return suppliers.find(supplier => supplier.id === id) || null;
  }

  // Clear all registered suppliers (for testing)
  clearAllSuppliers(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const supplierService = new SupplierStorageService();
export type { SupplierFormData, RegisteredSupplier };
