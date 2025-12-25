function swLog(...args) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'SW_LOG', payload: args });
        });
    });
}

self.addEventListener('fetch', event => {
    if (event.request.url.includes('.m3u8')) {
        swLog('Intercepted HLS request:', event.request.url);
    }
});
