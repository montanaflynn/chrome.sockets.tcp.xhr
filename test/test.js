test('initiate', function() {
    var xhr = new chrome.sockets.tcp.xhr();

    ok(xhr instanceof chrome.sockets.tcp.xhr, 'created instance of chrome.sockets.tcp.xhr');
});

asyncTest('readystatechange event', function() {
    var xhr = new chrome.sockets.tcp.xhr();

    // xhr.onreadystatechange = function() {
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            equal(this.statusText, '200 OK', 'correct status text');
            equal(this.responseText, '<html><body>Hello World</body></html>', 'correct response body');
            start();
        }
    });

    xhr.open('GET', 'http://httpconsole.com');
    xhr.setRequestHeader('User-Agent', 'curl/7.32.0');
    xhr.send(null);
});

asyncTest('load event', function() {
    var xhr = new chrome.sockets.tcp.xhr();

    // xhr.onload = function (e) {
    xhr.addEventListener('load', function (e) {
        equal(xhr.readyState, 4, 'readyState == 4 when load event is triggered');
        start();
    });

    xhr.open('GET', 'http://httpconsole.com');
    xhr.send(null);
});
/*
asyncTest('error event', function() {
    var xhr = new chrome.sockets.tcp.xhr();

    // xhr.onerror = function (error) {
    xhr.addEventListener('error', function (error) {
        console.error('[error]', error);
        start();
    });

    xhr.open('GET', 'http://httpconsole.com');
    xhr.send(null);
});

asyncTest('timeout event', function() {
    var xhr = new chrome.sockets.tcp.xhr();

    // xhr.ontimeout = function () {
    xhr.addEventListener('timeout', function () {
        console.error('[timeout]', 'The request for timed out.');
        start();
    });

    xhr.open('GET', 'http://httpconsole.com');
    xhr.send(null);
});
*/

asyncTest('beforeredirect event', function() {
    var xhr = new chrome.sockets.tcp.xhr();


    xhr.addEventListener('beforeredirect', function (redirectUrl, responseHeaders, statusText) {
        console.group('[beforeredirect]');
        console.info('redirectUrl:', redirectUrl);
        console.info('statusLine', statusText);
        console.info('responseHeaders:', responseHeaders);
        console.groupEnd();
        start();
    });

    xhr.open('GET', 'http://httpconsole.com/redirect');
    xhr.send(null);
});
