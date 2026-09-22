/* The installed shell is cached atomically, including Vite's hashed JS/CSS assets. */
const CACHE = 'iron-system-shell-v7-1';
const ROOT = new URL('./', self.location).href;
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const response = await fetch(ROOT, {cache:'reload'});
    if(!response.ok) throw new Error('Shell fetch failed');
    const html = await response.clone().text();
    const assets = [...html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g)].map(match => new URL(match[1], ROOT).href);
    await cache.addAll([...assets, new URL('icon.svg',ROOT).href, new URL('icon-192.png',ROOT).href, new URL('icon-512.png',ROOT).href, new URL('manifest.webmanifest',ROOT).href]);
    await cache.put(ROOT,response);
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for(const key of await caches.keys()) if(key.startsWith('iron-system-shell-') && key!==CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if(event.request.mode==='navigate') return (await cache.match(ROOT)) || fetch(event.request);
    // Static same-origin assets are identical for module and pre-cache Origin headers.
    return (await cache.match(event.request, {ignoreVary:true})) || fetch(event.request);
  })());
});
