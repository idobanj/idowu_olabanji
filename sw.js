const CACHE_NAME = "portfolio-cache-v2";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/screen.css",
  "/index.js",
  "/site.webmanifest",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/favicon.ico",
  "/offline.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : undefined)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  // Show offline fallback for navigation requests when network fails
  if (request.mode === "navigate" || (request.method === "GET" && request.headers.get("accept")?.includes("text/html"))) {
    event.respondWith(
      (async () => {
        try {
          // Try network first for latest content
          const networkResponse = await fetch(request);
          return networkResponse;
        } catch {
          // If offline, return cached page or offline fallback
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(request);
          return cached || (await cache.match("/offline.html"));
        }
      })()
    );
    return;
  }

  // For other requests: cache-first with network fallback
  event.respondWith(
    caches.match(request).then((response) => response || fetch(request))
  );
});
