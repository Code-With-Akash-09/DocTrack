// DocTrack Service Worker
const CACHE_NAME = "doctrack-v1";

const STATIC_ASSETS = [
    "/",
    "/manifest.json",
    "/logo.png",
];

// Install: cache static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch: network-first strategy, fall back to cache
self.addEventListener("fetch", (event) => {
    // Skip non-GET requests and chrome-extension URLs
    if (event.request.method !== "GET" || event.request.url.startsWith("chrome-extension")) {
        return;
    }

    // Skip API routes — always go to network
    if (event.request.url.includes("/api/")) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Cache a copy of the successful response
                if (response && response.status === 200) {
                    const cloned = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, cloned);
                    });
                }
                return response;
            })
            .catch(() => {
                // Fall back to cache on network failure
                return caches.match(event.request);
            })
    );
});
