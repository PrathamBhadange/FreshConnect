import { toast } from '@/components/ui/use-toast';

export interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Success notifications
export const showSuccess = (message: string, options?: NotificationOptions) => {
  toast({
    title: options?.title || "Success",
    description: message,
    duration: options?.duration || 5000,
    className: "border-green-200 bg-green-50",
  });
};

// Error notifications
export const showError = (message: string, options?: NotificationOptions) => {
  toast({
    title: options?.title || "Error",
    description: message,
    duration: options?.duration || 8000,
    variant: "destructive",
  });
};

// Warning notifications
export const showWarning = (message: string, options?: NotificationOptions) => {
  toast({
    title: options?.title || "Warning",
    description: message,
    duration: options?.duration || 6000,
    className: "border-yellow-200 bg-yellow-50",
  });
};

// Info notifications
export const showInfo = (message: string, options?: NotificationOptions) => {
  toast({
    title: options?.title || "Information",
    description: message,
    duration: options?.duration || 5000,
    className: "border-blue-200 bg-blue-50",
  });
};

// Specific business notifications
export const notifications = {
  // Supplier notifications
  supplierRegistered: (supplierName: string) => 
    showSuccess(`Welcome ${supplierName}! Your supplier account has been created successfully.`, {
      title: "Registration Complete",
      duration: 7000
    }),

  supplierUpdated: () => 
    showSuccess("Your store information has been updated successfully.", {
      title: "Store Updated"
    }),

  // Order notifications
  orderPlaced: (orderTotal: number, supplierName: string) => 
    showSuccess(`Order placed successfully! Total: ₹${orderTotal}`, {
      title: "Order Confirmed",
      description: `You will receive a confirmation call from ${supplierName} shortly.`,
      duration: 8000
    }),

  orderCancelled: () => 
    showInfo("Your order has been cancelled.", {
      title: "Order Cancelled"
    }),

  // Cart notifications
  itemAdded: (itemName: string) => 
    showSuccess(`${itemName} added to cart`, {
      duration: 3000
    }),

  cartCleared: () => 
    showInfo("Cart has been cleared", {
      duration: 3000
    }),

  // Message notifications
  messageSent: (recipientName: string) => 
    showSuccess(`Message sent to ${recipientName}`, {
      title: "Message Delivered",
      duration: 4000
    }),

  // Follow/Bookmark notifications
  supplierFollowed: (supplierName: string) => 
    showSuccess(`You are now following ${supplierName}`, {
      duration: 4000
    }),

  supplierUnfollowed: (supplierName: string) => 
    showInfo(`You unfollowed ${supplierName}`, {
      duration: 4000
    }),

  supplierBookmarked: (supplierName: string) => 
    showSuccess(`${supplierName} bookmarked`, {
      duration: 4000
    }),

  supplierUnbookmarked: (supplierName: string) => 
    showInfo(`${supplierName} removed from bookmarks`, {
      duration: 4000
    }),

  // Error notifications
  networkError: () => 
    showError("Network connection error. Please check your internet connection.", {
      title: "Connection Failed"
    }),

  validationError: (errors: string[]) => 
    showError(errors.join(', '), {
      title: "Validation Error",
      duration: 8000
    }),

  serverError: () => 
    showError("Something went wrong on our end. Please try again later.", {
      title: "Server Error"
    }),

  // Loading states
  dataLoading: () => 
    showInfo("Loading data...", {
      duration: 2000
    }),

  // Feature notifications
  featureComingSoon: (feature: string) => 
    showInfo(`${feature} feature is coming soon!`, {
      title: "Coming Soon",
      duration: 5000
    }),

  // Stock notifications
  lowStock: (productName: string, stock: number) => 
    showWarning(`${productName} is running low (${stock} remaining)`, {
      title: "Low Stock Alert",
      duration: 6000
    }),

  outOfStock: (productName: string) => 
    showError(`${productName} is currently out of stock`, {
      title: "Out of Stock",
      duration: 6000
    }),

  // Delivery notifications
  deliveryScheduled: (deliveryTime: string) => 
    showSuccess(`Delivery scheduled for ${deliveryTime}`, {
      title: "Delivery Confirmed",
      duration: 7000
    }),

  // Payment notifications
  paymentSuccess: (amount: number) => 
    showSuccess(`Payment of ₹${amount} processed successfully`, {
      title: "Payment Successful",
      duration: 6000
    }),

  paymentFailed: () => 
    showError("Payment failed. Please try again or use a different payment method.", {
      title: "Payment Failed"
    }),

  // Share notifications
  linkCopied: () => 
    showSuccess("Link copied to clipboard!", {
      duration: 3000
    }),

  shareSuccess: () => 
    showSuccess("Shared successfully!", {
      duration: 3000
    })
};

// Batch notifications for multiple actions
export const showBatchNotification = (
  type: 'success' | 'error' | 'warning' | 'info',
  items: string[],
  action?: string
) => {
  const message = items.length === 1 
    ? `${action || 'Action completed for'} ${items[0]}`
    : `${action || 'Action completed for'} ${items.length} items`;

  switch (type) {
    case 'success':
      showSuccess(message);
      break;
    case 'error':
      showError(message);
      break;
    case 'warning':
      showWarning(message);
      break;
    case 'info':
      showInfo(message);
      break;
  }
};

// Progressive notifications for long operations
export const progressiveNotification = {
  start: (message: string) => {
    showInfo(`${message}...`, { duration: 2000 });
    return Date.now().toString();
  },
  
  update: (message: string) => {
    showInfo(message, { duration: 2000 });
  },
  
  complete: (message: string) => {
    showSuccess(message);
  },
  
  error: (message: string) => {
    showError(message);
  }
};
