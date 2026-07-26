/**
 * Service Worker for PWA support
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'ivan-os-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/app.js',
  '/src/styles/main.css',
  '/src/styles/components.css',
  '/src/styles/responsive.css',
  '/src/modules/state.js',
  '/src/modules/events.js',
  '/src/modules/dom.js',
  '/src/modules/utils.js'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache on network error
        return caches.match(request).then((response) => {
          return response || new Response('Offline', { status: 503 });
        });
      })
  );
});
