var xhr = new chrome.sockets.tcp.xhr();

// xhr.onreadystatechange = function() {
xhr.addEventListener('readystatechange', function () {
    console.info('[readystatechange]', this.readyState);

    if (this.readyState === this.DONE) {
        console.info('[response status]', this.statusText);
        console.info('[response]', this.responseText);
    }
});

// xhr.onload = function (e) {
xhr.addEventListener('load', function (e) {
    console.info('[load]', xhr.readyState);
});

// xhr.onerror = function (error) {
xhr.addEventListener('error', function (error) {
    console.error('[error]', error);
});

// xhr.onprogress = function () {
xhr.addEventListener('progress', function () {
    console.info('[progress]');
});

// xhr.ontimeout = function () {
xhr.addEventListener('timeout', function () {
    console.error('[timeout]', 'The request for timed out.');
});

xhr.addEventListener('beforeredirect', function (redirectUrl, responseHeaders, statusText) {
    console.group('[beforeredirect]');
    console.info('redirectUrl:', redirectUrl);
    console.info('statusLine', statusText);
    console.info('responseHeaders:', responseHeaders);
    console.groupEnd();
});

xhr.open('GET', 'http://google.com:80');
//xhr.open('GET', 'http://google.asgasgscom:80');
//xhr.open('GET', 'http://httpconsole.local:80/redirect?foo=bar');
xhr.setRequestHeader('X-Requested-With', 'chrome.sockets.tcp.xhr');
xhr.send(null);
