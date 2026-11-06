const CACHE_NAME = "timafocus-v0.3.0";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/script.js",
    "/manifest.json",
    "/service-worker.js",
    "/assets/favicon.png",
    "/assets/icon.png"
];

// Installation
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Aktivierung und alte Caches löschen
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

// Dateien aus dem Cache laden
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
