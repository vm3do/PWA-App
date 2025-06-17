const cacheName = "pwa-cache2";
// URLs
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("caching files");
        cache.addAll(assets);
      })
      .catch((err) => {
        console.log("error caching: " + err);
      })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {

      return Promise.all(

        keys.filter((key) => key !== cacheName)
            .map((key) => caches.delete(key))

      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  //   console.log("service worker fetched data", evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request).then(fetchReq => {
        caches.put(evt.request.url, fetchReq.clone());
        return fetchReq;

      });
    })
  );
});
