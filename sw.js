/* sw.js — Service Worker ya Broskie Boutique */

const VERSION = 'v2';
const PRECACHE = `broskie-precache-VERSION`;
const RUNTIME = `broskie-runtime-{VERSION}`;
const OFFLINE_URL = '/Broskie-boutique/offline.html';
const FALLBACK_IMAGE = '/Broskie-boutique/fallback.png';

const PRECACHE_ASSETS = [
  '/',
  '/Broskie-boutique/index.html',
  '/Broskie-boutique/offline.html',
  '/Broskie-boutique/manifest.json',
  '/Broskie-boutique/style.css',
  '/Broskie-boutique/script.js',
  '/Broskie-boutique/icons/icon-72.png',
  '/Broskie-boutique/icons/icon-96.png',
  '/Broskie-boutique/icons/icon-128.png',
  '/Broskie-boutique/icons/icon-192.png',
  '/Broskie-boutique/icons/icon-256.png',
  '/Broskie-boutique/icons/icon-384.png',
  '/Broskie-boutique/icons/icon-512.png',
  '/Broskie-boutique/screenshots/home.png',
  '/Broskie-boutique/screenshots/catalogue.png',
  FALLBACK_IMAGE
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(PRECACHE);
    await cache.addAll(PRECACHE_ASSETS);
    await self.skipWaiting();
    console.log('[SW] Installed and precached');
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
 await Promise.all(
      keys.filter(key => key.startsWith('broskie-') && key !== PRECACHE && key !== RUNTIME)
          .map(key => caches.delete(key))
    );
    await self.clients.claim();
    console.log('[SW] Activated and old caches cleaned');
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') return;

  // Handle page navigation requests (Network first, fallback offline page)
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(RUNTIME);
        cache.put(request, response.clone());
        return response;
      } catch (error) {
        return await caches.match(OFFLINE_URL);
      }
    })());
    return;
  }

  // CSS/JS/worker files — stale-while-revalidate strategy
  if (['style', 'script', 'worker'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, `RUNTIME-assets`));
    return;
  

  // Images — cache-first strategy with fallback image
  if (request.destination === 'image') 
    event.respondWith((async () => 
      const cache = await caches.open(`{RUNTIME}-images`);
      const cachedResponse = await cache.match(request);if (cachedResponse) return cachedResponse;
      try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      } catch (error) {
        return await caches.match(FALLBACK_IMAGE);
      }
    })());
    return;
  }

  // Default fetch handler: try cache first, then network
  event.respondWith((async () => {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request).catch(() =>
      new Response('Resource ntiboneka.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' }
      })
    );
  })());
});

// Helper function: stale-while-revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  const networkResponsePromise = fetch(request).then(response => {
    cache.put(request, response.clone());
    return response;
  }).catch(() => cachedResponse);
  return cachedResponse || networkResponsePromise;
}
