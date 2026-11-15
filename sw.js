/* ==========================================================================
   Jason Xi — service worker
   GitHub Pages cannot set custom cache headers. Navigations are network-first,
   so the HTML is never served from a stale cache.
   ========================================================================== */

const BUILD = "2026.11.15.13";
const CACHE = `xb-offline-${BUILD}`;
const OFFLINE_EN = new URL("offline.html", self.registration.scope).href;
const OFFLINE_ZH = new URL("zh/offline.html", self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll([OFFLINE_EN, OFFLINE_ZH]))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;

  event.respondWith(
    fetch(event.request, { cache: "no-store" }).catch(async () => {
      const path = new URL(event.request.url).pathname;
      const isChinese = path === "/zh" || path.startsWith("/zh/");
      const offline = await caches.match(isChinese ? OFFLINE_ZH : OFFLINE_EN);
      if (offline) return offline;

      return new Response(
        isChinese
          ? "你離線了。請在連線恢復後再試一次。"
          : "You are offline. Please try again when the connection returns.",
        {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }
      );
    })
  );
});
