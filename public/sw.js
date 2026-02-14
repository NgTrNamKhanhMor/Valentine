// Service Worker for image caching
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
    event.respondWith(
      caches.open('img-cache').then(cache => {
        return cache.match(event.request).then(response => {
          if (response) return response;
          return fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});