const CACHE_NAME = 'study-admin-cache-v1';
const urlsToCache = [
    './index.html',
    './style.css',
    './pwa-icon.png',
    './manifest.json'
];

// インストール時にキャッシュする
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// フェッチ時の挙動 (Network First, フォールバックとして Cache)
self.addEventListener('fetch', (event) => {
    // APIリクエストなどはキャッシュせず直接ネットワークへ
    if (event.request.url.includes('runaaa0712.weblike.jp') || event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // レスポンスが正常ならキャッシュを更新
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                return response;
            })
            .catch(() => {
                // ネットワークエラー時はキャッシュを返す
                return caches.match(event.request);
            })
    );
});

// 古いキャッシュの削除
self.addEventListener('activate', (event) => {
    const cacheAllowlist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
