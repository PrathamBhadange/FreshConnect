// Service Worker for FreshConnect
// Provides offline functionality and caching

const CACHE_NAME = 'freshconnect-v1.0.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/suppliers/,
  /\/api\/products/,
  /\/api\/categories/
];

// Image cache patterns
const IMAGE_CACHE_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
  /images\.unsplash\.com/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('Service Worker: Activation failed', error);
      })
  );
});

// Fetch event - intercept network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    handleFetch(request)
      .catch((error) => {
        console.error('Service Worker: Fetch failed', error);
        return getOfflinePage(request);
      })
  );
});

// Handle fetch requests with caching strategy
async function handleFetch(request) {
  const url = new URL(request.url);

  // Static files - Cache First
  if (STATIC_FILES.some(file => url.pathname === file)) {
    return cacheFirst(request, STATIC_CACHE);
  }

  // Images - Cache First with expiration
  if (IMAGE_CACHE_PATTERNS.some(pattern => pattern.test(url.href))) {
    return cacheFirstWithExpiration(request, DYNAMIC_CACHE, 24 * 60 * 60 * 1000); // 24 hours
  }

  // API requests - Network First
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    return networkFirstWithTimeout(request, DYNAMIC_CACHE, 5000); // 5 second timeout
  }

  // HTML pages - Network First with cache fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    return networkFirstWithTimeout(request, DYNAMIC_CACHE, 3000); // 3 second timeout
  }

  // Default - Network First
  return networkFirst(request, DYNAMIC_CACHE);
}

// Cache First strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.status === 200) {
    cache.put(request, response.clone());
  }
  
  return response;
}

// Cache First with expiration
async function cacheFirstWithExpiration(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    const dateHeader = cached.headers.get('date');
    if (dateHeader) {
      const cachedDate = new Date(dateHeader);
      const now = new Date();
      if (now.getTime() - cachedDate.getTime() < maxAge) {
        return cached;
      }
    }
  }

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return cached || new Response('Offline', { status: 503 });
  }
}

// Network First strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Network First with timeout
async function networkFirstWithTimeout(request, cacheName, timeout) {
  try {
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeout)
      )
    ]);
    
    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Get offline page for failed requests
async function getOfflinePage(request) {
  if (request.headers.get('accept')?.includes('text/html')) {
    const cache = await caches.open(STATIC_CACHE);
    return cache.match('/') || new Response('Offline', { status: 503 });
  }
  
  return new Response('Offline', { status: 503 });
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'supplier-registration') {
    event.waitUntil(syncSupplierRegistration());
  }
  
  if (event.tag === 'order-submission') {
    event.waitUntil(syncOrderSubmission());
  }
});

// Sync supplier registration when online
async function syncSupplierRegistration() {
  try {
    const registrations = await getStoredData('pending-registrations');
    
    for (const registration of registrations) {
      try {
        const response = await fetch('/api/suppliers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registration.data)
        });
        
        if (response.ok) {
          await removeStoredData('pending-registrations', registration.id);
          await notifyUser('Registration submitted successfully!');
        }
      } catch (error) {
        console.error('Failed to sync registration:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Sync order submission when online
async function syncOrderSubmission() {
  try {
    const orders = await getStoredData('pending-orders');
    
    for (const order of orders) {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order.data)
        });
        
        if (response.ok) {
          await removeStoredData('pending-orders', order.id);
          await notifyUser('Order submitted successfully!');
        }
      } catch (error) {
        console.error('Failed to sync order:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handler
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: data.data,
    actions: data.actions || [],
    requireInteraction: true,
    tag: data.tag || 'default'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data;
  let url = '/';

  if (data && data.url) {
    url = data.url;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Utility functions for IndexedDB operations
async function getStoredData(storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('freshconnect-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const getRequest = store.getAll();
      
      getRequest.onsuccess = () => resolve(getRequest.result || []);
      getRequest.onerror = () => reject(getRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };
  });
}

async function removeStoredData(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('freshconnect-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}

async function notifyUser(message) {
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'SYNC_SUCCESS',
      message: message
    });
  });
}

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'refresh-content') {
    event.waitUntil(refreshContent());
  }
});

async function refreshContent() {
  try {
    // Refresh critical content
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = [
      '/api/suppliers',
      '/api/products/featured',
      '/api/categories'
    ];
    
    for (const url of requests) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
        }
      } catch (error) {
        console.log('Failed to refresh:', url);
      }
    }
  } catch (error) {
    console.error('Periodic sync failed:', error);
  }
}

console.log('Service Worker: Script loaded successfully');
