let CACHE_NAME = 'sw-v1'
var urlsToCache = [
  '/404.html',
  '/apple-touch-icon-152x152-precomposed.png',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-v1').then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});



self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
      .then((cached) => {
        var networked = fetch(event.request)
          .then((response) => {
            let cacheCopy = response.clone()
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, cacheCopy))
            return response;
          })
          .catch(() => caches.match(offlinePage));
        return cached || networked;
      })
    )
  }
  return;
});