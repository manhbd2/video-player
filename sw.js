self.addEventListener('fetch', event => {
    const url = event.request.url;

    if (url.endsWith('.ts') || url.endsWith('.m3u8')) {
        alert(url);
        console.log('Intercepted HLS request:', url);
    }
});
