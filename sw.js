function swLog(url) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'SW_LOG', payload: url });
        });
    });
}

self.addEventListener('fetch', event => {
    if (event.request.url.includes('.m3u8')) {
        swLog(event.request.url);
    }
});
