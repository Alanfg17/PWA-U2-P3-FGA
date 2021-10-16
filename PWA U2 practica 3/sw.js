const CACHE_NAME = 'cache-v1'

console.log('SW: Limpio');
const CACHE_STATIC_NAME = 'static-v1'
const DYMAMIC_CACHE_NAME = 'dynamic-v1'
const CACHE_INMUTABLE_NAME = 'inmutable-v1'

function cleanCache(cacheName, sizeItems) {
    caches.open(cacheName)
        .then(cache => {
            cache.keys().then(keys => {
                console.log(keys)
                if (keys.length >= sizeItems) {
                    cache.delete(keys[0].then(() => {
                        cleanCache(cacheName, sizeItems)
                    }))
                }
            })

        })
}

self.addEventListener('install', (event) => {


    //crear el cache y almacenar nuestro APPSHELL

    const promesaCache = caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
            '/',
            'index.html',
            'css/page.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
            'images/inicio.jpg',
            'js/app.js'
        ]);

    });

    const promInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',

            ])
        });

    event.waitUntil(Promise.all([promesaCache, promInmutable]))
});


self.addEventListener('fetch', (event) => {

    //2.- Cacje with network fallback 
    //Primero va a buscar em cache y si no lo encunetra en red

    const respuestaCache = caches.match(event.request).then(response => {

        //respuesta de cache
        if (response) {
            //respuesta con cache
            return response
        }
        console.log("No esta en cache ", event.request.url);

        //voy a la red

        return fetch(event.request)
            .then(respNet => {
                caches.open(DYMAMIC_CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, respNet).then(ok => {
                            cleanCache(DYMAMIC_CACHE_NAME, 10)
                        })

                    })
                return respNet.clone()
            })
    });

    event.respondWith(respuestaCache);
    //1.- only cache
    //  event.respondWith(caches.match(event.req));
});