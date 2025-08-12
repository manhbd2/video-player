self.addEventListener('fetch', event => {
    const url = event.request.url;

    if (url.endsWith('.ts') || url.endsWith('.m3u8')) {
        console.log('Intercepted HLS request:', url);
    }
});
