if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
}
/*

if(window.caches){
    console.log('Tenemos caches')
    caches.open('prueba');

    caches.open('prueba-v2');

    caches.has('prueba')
        .then( (result)=>{
            console.log(result)
        });
    
    caches.open('cache-v1')
        .then((cache) =>{
          //  cache.add('/index.html');

            cache.addAll([
                '/index.html', 
                '/css/page.css',
                'images/inicio.jpg'
            ]).then(()=>{
              //  cache.delete('/css/page.css') //time
                cache.put('index.html', new Response('Actualizado desde cache'))
            
            });

            cache.match('index.html')
                .then((res) => {
                    res.text().then((text)=>{console.log(text)});
                    console.log(res)
                })
    });

    caches.keys().then((keys)=>{
            console.log(keys);
    });
}*/