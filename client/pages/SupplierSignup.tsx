import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supplierService } from "@/services/supplierService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Truck,
  IndianRupee,
  User,
  Building,
  FileText,
  CheckCircle,
  ArrowRight,
  Upload
} from "lucide-react";

export default function SupplierSignup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",

    // Shop/Business Information
    shopName: "",
    businessType: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Business Details
    gstNumber: "",
    fssaiLicense: "",
    bankAccount: "",
    ifscCode: "",

    // Operational Details
    operatingHours: "",
    deliveryRadius: "",
    minimumOrder: "",
    categories: [] as string[],

    // Payment Details
    upiId: "",
    qrCodeData: "",
    acceptedPaymentMethods: [] as string[],

    // Terms
    agreeToTerms: false,
    agreeToQuality: false
  });

  const categories = [
    "Fresh Vegetables", "Fresh Fruits", "Spices & Masalas", 
    "Dairy Products", "Grains & Cereals", "Meat & Seafood",
    "Organic Produce", "Herbs", "Dry Fruits", "Oil & Ghee"
  ];

  const states = [
    "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", 
    "Rajasthan", "Uttar Pradesh", "West Bengal", "Punjab", "Haryana"
  ];

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handlePaymentMethodToggle = (method: string) => {
    setFormData(prev => ({
      ...prev,
      acceptedPaymentMethods: prev.acceptedPaymentMethods.includes(method)
        ? prev.acceptedPaymentMethods.filter(m => m !== method)
        : [...prev.acceptedPaymentMethods, method]
    }));
  };

  const generateQRCode = () => {
    if (formData.upiId && formData.shopName) {
      const qrData = `upi://pay?pa=${formData.upiId}&pn=${encodeURIComponent(formData.shopName)}&mc=0000`;
      setFormData(prev => ({ ...prev, qrCodeData: qrData }));
      alert("QR Code generated successfully! Vendors will see this QR code for payments.");
    } else {
      alert("Please enter UPI ID and Shop Name first.");
    }
  };

  const handleSubmit = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        // Register the supplier using the storage service
        const registeredSupplier = supplierService.registerSupplier(formData);
        console.log("Supplier registered successfully:", registeredSupplier);

        alert(`🎉 Registration Successful!\n\nWelcome to FreshConnect, ${formData.shopName}!\nYour supplier account has been created and you're now visible to vendors.\n\nSupplier ID: ${registeredSupplier.id}\n\nWhat's next:\n• You'll appear in marketplace search results\n• Vendors can now discover your products\n• Start receiving orders from local vendors`);

        // Navigate to dashboard with the new supplier ID
        navigate(`/supplier-dashboard?id=${registeredSupplier.id}`);
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      }
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.phone;
      case 2:
        return formData.shopName && formData.businessType && formData.address && formData.city;
      case 3:
        return formData.operatingHours && formData.deliveryRadius && formData.categories.length > 0;
      case 4:
        return formData.upiId && formData.acceptedPaymentMethods.length > 0;
      case 5:
        return formData.agreeToTerms && formData.agreeToQuality;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="h-12 w-12 mx-auto text-supplier mb-2" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>
            
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Store className="h-12 w-12 mx-auto text-supplier mb-2" />
              <h2 className="text-2xl font-bold">Shop Information</h2>
              <p className="text-muted-foreground">Details about your business</p>
            </div>
            
            <div>
              <Label htmlFor="shopName">Shop/Business Name *</Label>
              <Input
                id="shopName"
                placeholder="Fresh Valley Farms"
                value={formData.shopName}
                onChange={(e) => setFormData({...formData, shopName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wholesale">Wholesale Supplier</SelectItem>
                  <SelectItem value="farmer">Direct Farmer</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="retailer">Retail Shop</SelectItem>
                  <SelectItem value="cooperative">Farmer Cooperative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your business, specialties, and what makes you unique..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="address">Complete Address *</Label>
              <Textarea
                id="address"
                placeholder="Shop/Warehouse address with landmarks"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Delhi"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  placeholder="110001"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="font-semibold">Business Documents (Optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gst">GST Number</Label>
                  <Input
                    id="gst"
                    placeholder="22AAAAA0000A1Z5"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="fssai">FSSAI License</Label>
                  <Input
                    id="fssai"
                    placeholder="12345678901234"
                    value={formData.fssaiLicense}
                    onChange={(e) => setFormData({...formData, fssaiLicense: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Truck className="h-12 w-12 mx-auto text-supplier mb-2" />
              <h2 className="text-2xl font-bold">Operational Details</h2>
              <p className="text-muted-foreground">How you operate your business</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hours">Operating Hours *</Label>
                <Input
                  id="hours"
                  placeholder="6:00 AM - 8:00 PM"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="radius">Delivery Radius *</Label>
                <Input
                  id="radius"
                  placeholder="10 km"
                  value={formData.deliveryRadius}
                  onChange={(e) => setFormData({...formData, deliveryRadius: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="minOrder">Minimum Order Amount (₹)</Label>
              <Input
                id="minOrder"
                placeholder="500"
                value={formData.minimumOrder}
                onChange={(e) => setFormData({...formData, minimumOrder: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Product Categories * (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.categories.map(category => (
                  <Badge key={category} variant="secondary">{category}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="font-semibold">Banking Details (Optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bank">Bank Account Number</Label>
                  <Input
                    id="bank"
                    placeholder="1234567890"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input
                    id="ifsc"
                    placeholder="SBIN0001234"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
              <h2 className="text-2xl font-bold">Review & Confirm</h2>
              <p className="text-muted-foreground">Please review your information</p>
            </div>
            
            <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
              <div>
                <h3 className="font-semibold">{formData.shopName}</h3>
                <p className="text-muted-foreground">{formData.businessType}</p>
              </div>
              <div>
                <p className="text-sm"><strong>Owner:</strong> {formData.fullName}</p>
                <p className="text-sm"><strong>Contact:</strong> {formData.phone} • {formData.email}</p>
                <p className="text-sm"><strong>Location:</strong> {formData.city}, {formData.state}</p>
                <p className="text-sm"><strong>Hours:</strong> {formData.operatingHours}</p>
              </div>
              <div>
                <p className="text-sm"><strong>Categories:</strong></p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.categories.map(category => (
                    <Badge key={category} variant="outline" className="text-xs">{category}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: !!checked})}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <span className="text-supplier underline">Terms of Service</span> and <span className="text-supplier underline">Privacy Policy</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quality"
                  checked={formData.agreeToQuality}
                  onCheckedChange={(checked) => setFormData({...formData, agreeToQuality: !!checked})}
                />
                <Label htmlFor="quality" className="text-sm">
                  I commit to providing fresh, quality products as per FreshConnect standards
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-supplier text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-supplier' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Step {currentStep} of 4: {
              currentStep === 1 ? 'Personal Information' :
              currentStep === 2 ? 'Shop Information' :
              currentStep === 3 ? 'Operational Details' : 'Review & Confirm'
            }
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="p-8">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="flex items-center gap-2"
            >
              {currentStep === 4 ? (
                <>Complete Registration <CheckCircle className="h-4 w-4" /></>
              ) : (
                <>Next <ArrowRight className="h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
