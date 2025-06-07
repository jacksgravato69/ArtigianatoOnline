self.addEventListener("install", event => {
  console.log("Service Worker installato");
  event.waitUntil(
    caches.open("static-v1").then(cache => {
        //Qui ci metto i file più importanti, così da poterla farla funzionare anche offline
      return cache.addAll([
        "/",
        "../index.html",
        "../index.js",
        "/public/css/style.css",
        "/manifest.json"
    ]);
    })
  );
});

self.addEventListener("activate", event => {

  console.log("Service Worker attivato");
  
});

self.addEventListener("fetch", event => {

  console.log("Richiesta intercettata:", event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {

      return response || fetch(event.request);

    })
  );

});