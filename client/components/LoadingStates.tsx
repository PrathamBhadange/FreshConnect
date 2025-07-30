import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Truck, Store } from 'lucide-react';

// Full page loading spinner
export const PageLoader: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  </div>
);

// Compact loading spinner
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  };
  
  return (
    <Loader2 className={`animate-spin text-primary ${sizeClasses[size]} ${className}`} />
  );
};

// Skeleton loader for supplier cards
export const SupplierCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden">
    <div className="aspect-video">
      <Skeleton className="h-full w-full" />
    </div>
    <CardHeader className="pb-3">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex gap-4 mt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex gap-1 mb-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-16" />
      </div>
    </CardContent>
  </Card>
);

// Skeleton loader for product cards
export const ProductCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden">
    <div className="aspect-square">
      <Skeleton className="h-full w-full" />
    </div>
    <CardContent className="p-4">
      <Skeleton className="h-5 w-3/4 mb-1" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-8" />
      </div>
      <Skeleton className="h-4 w-20 mb-3" />
      <Skeleton className="h-9 w-full" />
    </CardContent>
  </Card>
);

// Loading state for lists
export const ListLoader: React.FC<{ 
  count?: number; 
  type?: 'supplier' | 'product';
  className?: string;
}> = ({ count = 6, type = 'supplier', className = '' }) => (
  <div className={`grid gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i}>
        {type === 'supplier' ? <SupplierCardSkeleton /> : <ProductCardSkeleton />}
      </div>
    ))}
  </div>
);

// Loading overlay for specific components
export const LoadingOverlay: React.FC<{ 
  isLoading: boolean; 
  children: React.ReactNode;
  message?: string;
}> = ({ isLoading, children, message = "Loading..." }) => (
  <div className="relative">
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    )}
  </div>
);

// Branded loading screen
export const BrandedLoader: React.FC<{ message?: string }> = ({ message = "Loading FreshConnect..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
    <div className="text-center">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white animate-pulse">
          <Store className="h-8 w-8" />
        </div>
        <span className="text-3xl font-bold text-foreground">FreshConnect</span>
      </div>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <LoadingSpinner size="lg" />
        <span className="text-muted-foreground">{message}</span>
      </div>
      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Store className="h-4 w-4" />
          <span>Connecting suppliers</span>
        </div>
        <div className="flex items-center space-x-1">
          <Truck className="h-4 w-4" />
          <span>Loading fresh ingredients</span>
        </div>
      </div>
    </div>
  </div>
);

// Button loading state
export const ButtonLoader: React.FC<{ 
  isLoading: boolean; 
  children: React.ReactNode;
  loadingText?: string;
}> = ({ isLoading, children, loadingText }) => (
  <>
    {isLoading ? (
      <>
        <LoadingSpinner size="sm" className="mr-2" />
        {loadingText || children}
      </>
    ) : (
      children
    )}
  </>
);
