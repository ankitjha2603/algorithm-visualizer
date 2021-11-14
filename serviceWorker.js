const staticCacheName = 'algorithm-visulizer-static-v1.1.0';
const assets = [
  "algorithm-visualizer/serviceWorker.js",
  
  "/algorithm-visualizer/",
  "/algorithm-visualizer/index.html",

  "/algorithm-visualizer/assets/music/move.mp3",
  
  "/algorithm-visualizer/assets/css/style.css",
  "/algorithm-visualizer/assets/css/custom-right-click-menu.css",
  "/algorithm-visualizer/assets/css/nav.css",
  "/algorithm-visualizer/assets/css/sorting.css",
  "/algorithm-visualizer/assets/css/sudoku.css",
  "/algorithm-visualizer/assets/css/responsive.css",
  "/algorithm-visualizer/assets/css/nQueen.css",

  "/algorithm-visualizer/assets/js/function.js",
  "/algorithm-visualizer/assets/js/sorting.js",
  "/algorithm-visualizer/assets/js/binarySearch.js",
  "/algorithm-visualizer/assets/js/backtracking.js",
  "/algorithm-visualizer/assets/js/script.js",
  "/algorithm-visualizer/assets/js/windowEventListener.js",

  "/algorithm-visualizer/assets/img/chess-queen-svgrepo-com.svg",
  "/algorithm-visualizer/assets/img/icons8-disney-now.svg",
  "/algorithm-visualizer/assets/img/icons8-github.svg",
  "/algorithm-visualizer/assets/img/icons8-instagram.svg",
  "/algorithm-visualizer/assets/img/icons8-linkedin.svg",
  "/algorithm-visualizer/assets/img/icons8-refresh.svg",
  "/algorithm-visualizer/assets/img/icons8-stack-overflow.svg",
];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      return cache.addAll(assets)
        .catch(err => {
          console.error('Error adding files to cache', err);
        })
    })
  )
  console.info('SW installed');
  self.skipWaiting();
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
