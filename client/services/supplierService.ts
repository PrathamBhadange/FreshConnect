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
  
  // Payment Details
  upiId: string;
  qrCodeData: string;
  acceptedPaymentMethods: string[];
  
  // Terms
  agreeToTerms: boolean;
  agreeToQuality: boolean;
}

interface ProductWithDiscount {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  stock: number;
  image: string;
  category: string;
  fresh: boolean;
  description?: string;
  discount?: {
    percentage: number;
    validUntil?: string;
    minQuantity?: number;
    type: 'percentage' | 'fixed' | 'bulk';
  };
  bulkPricing?: {
    minQuantity: number;
    price: number;
    discount: number;
  }[];
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
  products: ProductWithDiscount[];
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
  paymentInfo: {
    upiId: string;
    qrCodeData: string;
    acceptedPaymentMethods: string[];
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      accountHolderName: string;
    };
  };
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
      products: this.generateDefaultProductsWithDiscounts(formData.categories),
      verified: true, // Auto-verify for demo
      image: this.getSupplierImage(formData.categories),
      location: `${formData.city}, ${formData.state}`,
      ownerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      businessType: formData.businessType,
      operatingHours: formData.operatingHours,
      deliveryRadius: formData.deliveryRadius,
      registeredAt: new Date().toISOString(),
      paymentInfo: {
        upiId: formData.upiId,
        qrCodeData: formData.qrCodeData || this.generateQRCodeData(formData.upiId, formData.shopName),
        acceptedPaymentMethods: formData.acceptedPaymentMethods,
        bankDetails: formData.bankAccount && formData.ifscCode ? {
          accountNumber: formData.bankAccount,
          ifscCode: formData.ifscCode,
          accountHolderName: formData.fullName
        } : undefined
      }
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

  private generateDefaultProductsWithDiscounts(categories: string[]): ProductWithDiscount[] {
    const productTemplates: { [key: string]: ProductWithDiscount[] } = {
      'Fresh Vegetables': [
        {
          id: 'veg_1',
          name: 'Fresh Tomatoes',
          price: 34,
          originalPrice: 40,
          unit: 'kg',
          stock: 100,
          image: 'https://images.unsplash.com/photo-1546470427-227e13439cd0?w=300&h=300&fit=crop&crop=center',
          category: 'Vegetables',
          fresh: true,
          discount: {
            percentage: 15,
            validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'percentage'
          },
          bulkPricing: [
            { minQuantity: 10, price: 32, discount: 20 },
            { minQuantity: 25, price: 30, discount: 25 }
          ]
        },
        {
          id: 'veg_2',
          name: 'Organic Onions',
          price: 30,
          originalPrice: 35,
          unit: 'kg', 
          stock: 150,
          image: 'https://images.unsplash.com/photo-1508313880080-c4bec8ca91a4?w=300&h=300&fit=crop&crop=center',
          category: 'Vegetables',
          fresh: true,
          discount: {
            percentage: 14,
            type: 'percentage'
          },
          bulkPricing: [
            { minQuantity: 15, price: 28, discount: 20 },
            { minQuantity: 30, price: 26, discount: 26 }
          ]
        }
      ],
      'Fresh Fruits': [
        {
          id: 'fruit_1',
          name: 'Fresh Apples',
          price: 105,
          originalPrice: 125,
          unit: 'kg',
          stock: 80,
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop&crop=center',
          category: 'Fruits',
          fresh: true,
          discount: {
            percentage: 16,
            validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'percentage'
          },
          bulkPricing: [
            { minQuantity: 5, price: 100, discount: 20 },
            { minQuantity: 10, price: 95, discount: 24 }
          ]
        },
        {
          id: 'fruit_2',
          name: 'Sweet Oranges',
          price: 80,
          originalPrice: 95,
          unit: 'kg',
          stock: 120,
          image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop&crop=center',
          category: 'Fruits',
          fresh: true,
          discount: {
            percentage: 16,
            type: 'percentage'
          }
        }
      ],
      'Spices & Masalas': [
        {
          id: 'spice_1',
          name: 'Garam Masala',
          price: 255,
          originalPrice: 300,
          unit: 'kg',
          stock: 50,
          image: 'https://images.unsplash.com/photo-1599909533047-f58b8d68fa44?w=300&h=300&fit=crop&crop=center',
          category: 'Spices',
          fresh: false,
          discount: {
            percentage: 15,
            type: 'percentage'
          },
          bulkPricing: [
            { minQuantity: 2, price: 240, discount: 20 },
            { minQuantity: 5, price: 225, discount: 25 }
          ]
        }
      ],
      'Dairy Products': [
        {
          id: 'dairy_1',
          name: 'Fresh Milk',
          price: 52,
          originalPrice: 60,
          unit: 'liter',
          stock: 200,
          image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&crop=center',
          category: 'Dairy',
          fresh: true,
          discount: {
            percentage: 13,
            minQuantity: 5,
            type: 'bulk'
          }
        }
      ]
    };

    let products: ProductWithDiscount[] = [];
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
        price: 85,
        originalPrice: 100,
        unit: 'kg',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&crop=center',
        category: 'General',
        fresh: true,
        discount: {
          percentage: 15,
          type: 'percentage'
        }
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

  private generateQRCodeData(upiId: string, merchantName: string): string {
    // Generate UPI QR code data format
    if (!upiId) return '';
    
    const amount = ''; // Amount will be filled during payment
    const transactionId = `TXN${Date.now()}`;
    const note = `Payment to ${merchantName}`;
    
    // UPI QR Code format
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&tn=${encodeURIComponent(note)}&mc=0000&tid=${transactionId}&tr=${transactionId}`;
  }

  // Get a specific supplier by ID
  getSupplierById(id: string): RegisteredSupplier | null {
    const suppliers = this.getRegisteredSuppliers();
    return suppliers.find(supplier => supplier.id === id) || null;
  }

  // Update supplier payment info
  updateSupplierPaymentInfo(supplierId: string, paymentInfo: any): boolean {
    try {
      const suppliers = this.getRegisteredSuppliers();
      const supplierIndex = suppliers.findIndex(supplier => supplier.id === supplierId);
      
      if (supplierIndex !== -1) {
        suppliers[supplierIndex].paymentInfo = { ...suppliers[supplierIndex].paymentInfo, ...paymentInfo };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(suppliers));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update payment info:', error);
      return false;
    }
  }

  // Clear all registered suppliers (for testing)
  clearAllSuppliers(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const supplierService = new SupplierStorageService();
export type { SupplierFormData, RegisteredSupplier, ProductWithDiscount };
