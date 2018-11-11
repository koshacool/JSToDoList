const CACHE_NAME = 'network-or-cache-v1';

// eslint-disable-next-line no-undef
const { assets } = serviceWorkerOption;
const urlsToCache = [...assets, '/'];

self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
));

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {
        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        const fetchRequest = event.request.clone();

        // Make request to server to update cache
        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (response && response.status === 200
                || response &&  response.type === 'basic') {
              const responseToCache = response.clone();

              // Update chache
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
            }

            return response;
          })
          // Return value from cache when exists problem with network
          .catch(() => cacheResponse);
      })
  );
});

