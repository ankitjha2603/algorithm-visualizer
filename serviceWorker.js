const staticCacheName = 'ankit-kumar-Jha-static-v2.1.0';
const assets = [
"/",
"/index.html",

"/assets/js/main.js",

"assets/img/hero-banner.png",
"assets/img/portfolio.svg",
"assets/img/profile-pic.jpg",
"assets/img/projects/advance-web-scraper-amazon.png",
"assets/img/projects/algorithm-visualizer.png",
"assets/img/projects/hotstar-clone.png",
"assets/img/projects/snake-game.png",

"/assets/css/style.css",
"/assets/vendor/aos/aos.css",
"/assets/vendor/bootstrap/css/bootstrap.min.css",
"/assets/vendor/bootstrap-icons/bootstrap-icons.css",
"/assets/vendor/boxicons/css/boxicons.min.css",
"/assets/vendor/glightbox/css/glightbox.min.css",
"/assets/vendor/aos/aos.js"
];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      return cache.addAll(assets)
      .catch(err =>{
        console.error('Error adding files to cache',err);
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
