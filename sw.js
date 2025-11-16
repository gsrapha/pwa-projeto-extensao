const CACHE_NAME = "extensao-cache-v3";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./main.js",
  "./manifest.webmanifest",
  "./sw.js",
  "./screenshots/app-preview.png",
  "./js/libs/tailwind.js",
  "./js/libs/vue.global.prod.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
      .catch((err) => console.error("Erro ao adicionar arquivos ao cache:", err))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch(() => {
        if (event.request.destination === "image") {
          return caches.match("./screenshots/app-preview.png");
        }
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
