// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Phone validation (Indian format)
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// PIN code validation (Indian)
export const isValidPinCode = (pincode: string): boolean => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

// GST number validation
export const isValidGSTNumber = (gst: string): boolean => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst.toUpperCase());
};

// FSSAI license validation
export const isValidFSSAILicense = (fssai: string): boolean => {
  const fssaiRegex = /^[0-9]{14}$/;
  return fssaiRegex.test(fssai);
};

// IFSC code validation
export const isValidIFSCCode = (ifsc: string): boolean => {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc.toUpperCase());
};

// Bank account number validation
export const isValidBankAccount = (account: string): boolean => {
  const accountRegex = /^[0-9]{9,18}$/;
  return accountRegex.test(account);
};

// Price validation
export const isValidPrice = (price: string | number): boolean => {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(priceNum) && priceNum > 0 && priceNum <= 100000;
};

// Stock validation
export const isValidStock = (stock: string | number): boolean => {
  const stockNum = typeof stock === 'string' ? parseInt(stock) : stock;
  return !isNaN(stockNum) && stockNum >= 0 && stockNum <= 10000;
};

// Text validation
export const isValidText = (text: string, minLength = 2, maxLength = 100): boolean => {
  const trimmed = text.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
};

// Address validation
export const isValidAddress = (address: string): boolean => {
  return isValidText(address, 10, 500);
};

// Operating hours validation
export const isValidOperatingHours = (hours: string): boolean => {
  const hoursRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)\s?-\s?(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
  return hoursRegex.test(hours.trim());
};

// Delivery radius validation
export const isValidDeliveryRadius = (radius: string): boolean => {
  const radiusRegex = /^[0-9]+(\.[0-9]+)?\s?(km|kilometers?)$/i;
  return radiusRegex.test(radius.trim());
};

// Form validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Supplier form validation
export const validateSupplierForm = (formData: any): ValidationResult => {
  const errors: string[] = [];

  // Personal Information
  if (!isValidText(formData.fullName)) {
    errors.push('Full name must be 2-100 characters long');
  }
  if (!isValidEmail(formData.email)) {
    errors.push('Please enter a valid email address');
  }
  if (!isValidPhoneNumber(formData.phone)) {
    errors.push('Please enter a valid Indian phone number');
  }

  // Shop Information
  if (!isValidText(formData.shopName)) {
    errors.push('Shop name must be 2-100 characters long');
  }
  if (!formData.businessType) {
    errors.push('Please select a business type');
  }
  if (!isValidAddress(formData.address)) {
    errors.push('Address must be 10-500 characters long');
  }
  if (!isValidText(formData.city)) {
    errors.push('City name is required');
  }

  // Optional validations
  if (formData.pincode && !isValidPinCode(formData.pincode)) {
    errors.push('Please enter a valid PIN code');
  }
  if (formData.gstNumber && !isValidGSTNumber(formData.gstNumber)) {
    errors.push('Please enter a valid GST number');
  }
  if (formData.fssaiLicense && !isValidFSSAILicense(formData.fssaiLicense)) {
    errors.push('Please enter a valid FSSAI license number');
  }
  if (formData.bankAccount && !isValidBankAccount(formData.bankAccount)) {
    errors.push('Please enter a valid bank account number');
  }
  if (formData.ifscCode && !isValidIFSCCode(formData.ifscCode)) {
    errors.push('Please enter a valid IFSC code');
  }

  // Operational Details
  if (formData.operatingHours && !isValidOperatingHours(formData.operatingHours)) {
    errors.push('Please enter valid operating hours (e.g., 9:00 AM - 6:00 PM)');
  }
  if (formData.deliveryRadius && !isValidDeliveryRadius(formData.deliveryRadius)) {
    errors.push('Please enter valid delivery radius (e.g., 10 km)');
  }
  if (formData.minimumOrder && !isValidPrice(formData.minimumOrder)) {
    errors.push('Minimum order amount must be a valid price');
  }
  if (!formData.categories || formData.categories.length === 0) {
    errors.push('Please select at least one product category');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Product validation
export const validateProduct = (productData: any): ValidationResult => {
  const errors: string[] = [];

  if (!isValidText(productData.name)) {
    errors.push('Product name must be 2-100 characters long');
  }
  if (!isValidPrice(productData.price)) {
    errors.push('Price must be a valid amount between ₹1 and ₹100,000');
  }
  if (!productData.unit) {
    errors.push('Unit is required (e.g., kg, liter, piece)');
  }
  if (!isValidStock(productData.stock)) {
    errors.push('Stock must be a valid number between 0 and 10,000');
  }
  if (!productData.category) {
    errors.push('Product category is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitization functions
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<[^>]*>/g, ''); // Remove HTML tags
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('91')) {
    return `+${cleaned}`;
  }
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  return phone;
};

export const formatGSTNumber = (gst: string): string => {
  return gst.toUpperCase().replace(/\s/g, '');
};

export const formatIFSCCode = (ifsc: string): string => {
  return ifsc.toUpperCase().replace(/\s/g, '');
};

// Real-time validation helpers
export const getFieldError = (field: string, value: any, validators: Record<string, (val: any) => boolean>): string => {
  for (const [validatorName, validator] of Object.entries(validators)) {
    if (!validator(value)) {
      return getErrorMessage(field, validatorName);
    }
  }
  return '';
};

const getErrorMessage = (field: string, validatorName: string): string => {
  const messages: Record<string, Record<string, string>> = {
    email: {
      isValidEmail: 'Please enter a valid email address'
    },
    phone: {
      isValidPhoneNumber: 'Please enter a valid phone number'
    },
    name: {
      isValidText: 'Name must be 2-100 characters long'
    },
    price: {
      isValidPrice: 'Price must be between ₹1 and ₹100,000'
    },
    stock: {
      isValidStock: 'Stock must be between 0 and 10,000'
    }
  };

  return messages[field]?.[validatorName] || `Invalid ${field}`;
};
