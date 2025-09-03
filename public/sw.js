const COVER_CACHE_NAME = 'book-covers';
const FALLBACK_IMAGE = '/covers/placeholder.png';
// const FALLBACK_IMAGE_URL = 'https://placekitten.com/g/1200/1200';

self.addEventListener('install', (event) => {
    const { waitUntil } = event;
    waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', (event) => {
    const { waitUntil } = event;
    waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', (event) => {
    const { request, respondWith } = event;
    if (request.method !== 'GET') return;
  
    const isImage = request.destination === 'image' || /\.(png|jpg|jpeg|webp|avif|gif|svg)$/i.test(new URL(request.url).pathname);
    if (!isImage) return;
  
    respondWith((async () => {
      const cache = await caches.open(COVER_CACHE_NAME);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })());
  });
