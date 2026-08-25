// KOAJ – Service Worker
var CACHE = 'koaj-v3';
var ARCHIVOS = [
  '/Koajo/',
  '/Koajo/login.html',
  '/Koajo/index.html',
  '/Koajo/style.css',
  '/Koajo/script.js',
  '/Koajo/icon.svg',
  '/Koajo/icon-192.png',
  '/Koajo/icon-512.png',
  '/Koajo/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ARCHIVOS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(res) {
      return res || fetch(e.request);
    })
  );
});
