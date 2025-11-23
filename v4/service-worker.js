// Service Workerの更新
const CACHE_NAME = "bible-viewer-v2.0.0"; // バージョンを上げて古いキャッシュを破棄させる
const urlsToCache = [
  "./",
  "./index.html",
  "./script.js",
  "./style.css",
  "../v2.png",
  // CSVファイルはここから削除し、IndexedDBで管理します
];

// インストール
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// フェッチ
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// アクティベート
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
