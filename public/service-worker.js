const version = 4;

let staticName = `staticCache-${version}`;
let imgName = "imageCache";

let assets = ["/offline-downloads"];

self.addEventListener("install", function (event) {
  console.log(`Version ${version} installed`);
  // self.skipWaiting();
  //build a cache
  event?.waitUntil(
    caches.open(staticName).then(function (cache) {
      //addAll == fetch() + put()
      return cache.addAll(assets).then(
        () => {
          console.log(`${staticName} has been updated`);
        },
        () => {
          console.log("Failed to update");
        }
      );
    })
  );
});

self.addEventListener("activate", function (event) {
  //when the service worker has been activated to replace the new one
  console.log("activated");
  //delete old versions of the caches
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("fetch for request: ", event.request);

  //version-1
  //pass-through
  // event.respondWith(fetch(ev.request));

  //version-2
  //check the caches first for the file, if missing do a fetch
  // event.respondWith(
  //   caches.match(event.request).then((cacheRes) => {
  //     if (cacheRes === undefined) {
  //       console.log(`MISSING: ${event.request.url}`);
  //     }

  //     return cacheRes || fetch(event.request);
  //   })
  // );

  //version-3
  //Check cache, if not present fetch, add response to cache
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(event.request).then((fetchResponse) => {
          return caches.open("dynamicName").then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    })
  );
});

// // self.addEventListener("fetch", function (event) {
// //   event.respondWith(
// //     caches.match(event.request).then(function (response) {
// //       return response || fetch(event.request);
// //     })
// //   );
// // });
// //
