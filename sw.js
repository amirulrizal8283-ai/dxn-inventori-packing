// DXN DC Sendayan – Inventori Packing : Service Worker
// Tukar nombor versi setiap kali index.html dikemas kini supaya telefon ambil versi baharu.
const CACHE = 'dxn-inventori-v1';
const SHELL = ['./', './index.html', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Data Google Sheet sentiasa diambil terus (live) — tidak di-cache
  if (url.hostname.endsWith('google.com') || e.request.method !== 'GET') return;
  // Fail app: network dahulu, fallback ke cache bila luar talian
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok && url.origin === location.origin) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match('./index.html')))
  );
});
