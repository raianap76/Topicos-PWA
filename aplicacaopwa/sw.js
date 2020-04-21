self.addEventListener('install', function(event) {
  console.log('SW: instalado!', event);
  //caches.delete('cache');
  //caches.delete('Mycache');
  caches.open('Mycache').then(function(cache){
    cache.addAll([
      '/'
    ]);
  });
})

self.addEventListener('activate', function(event) {
  console.log('SW: ativado!', event);
}) 

self.addEventListener('fetch', function(event){
  let resposta = caches.open('Mycache').then(function(cache){
    return cache.match(event.request).then(function(recurso){
      if(recurso){
        console.log(`Servindo ${event.request.url} do cache`);
        return recurso;
      }
      console.log(`Servindo conteudo.html da web`);
      return fetch(event.request).then(function(recurso){
        cache.put(event.request,recurso.clone());
        return recurso;
      });
    });
  });
  event.respondWith(resposta);
});
