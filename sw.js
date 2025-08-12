function swLog(...args) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'SW_LOG', payload: args });
        });
    });
}

self.addEventListener('fetch', event => {
    const url = event.request.url;

    if (url.endsWith('.ts') || url.endsWith('.m3u8')) {
        swLog('Intercepted HLS request:', url);
    }
});
