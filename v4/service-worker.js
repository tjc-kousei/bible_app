const CACHE_NAME = "bible-viewer-v1.0.0";
const urlsToCache = [
  "./",
  "./index.html",
  "./script.js",
  "./style.css",
  "../v2.png",
  // CSVファイルもキャッシュに追加
  "../Data(hira).csv",
  "../chinese_compact.csv",
];

// インストール: 初回アクセス時にリソースをキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// フェッチ: リソース要求時にキャッシュを優先して利用
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュにあればそれを返す
      if (response) {
        return response;
      }
      // なければネットワークから取得
      return fetch(event.request);
    })
  );
});

// アクティベート: 古いキャッシュを削除
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
