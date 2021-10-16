self.addEventListener('install', () => {
    console.log('SW: Instalado');
});

self.addEventListener('fetch', e => {
/*
    const respOffHTML = new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Practica 3 </title>
    </head>
    <body>  
    <h1>Bienvenido a la pagina off</h1>

    </body>
    </html>
    `,
    {
        headers:{
            'Content-Type':'text/html'
        }
    });
*/
    const respOffFile = fetch('pages/ViewOffline.html');

    const resp = fetch(e.request)

        .catch(() => {
            console.log('SW: Error en la petición')
            return respOffFile
        });

    //console.log(e.request.url);
    e.respondWith(resp);
        
});