const CACHENAME = 'mws-v1';
const filesToCache = [
'.',
'index.html',
'404.html',
'hitung.html',
'Asset/css/add2style.css',
'Asset/css/mygrid.css',
'Asset/js/add2numbers.js'
];

self.addEventListener('install', event => {
console.log('Persiapan Cache');
event.waitUntil(
caches.open(CACHENAME)
.then(cache => {
return cache.addAll(filesToCache);
})
);
});

self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then( ada_response => {
if (ada_response) {
return ada_response;
}
// Back to jaringan
else {
return fetch(event.request)
}
})
.catch(error => {
return new Response("oow " + error);
})
);
});