var xhr = new chrome.sockets.tcp.xhr();

// xhr.onreadystatechange = function() {
xhr.addEventListener('readystatechange', function () {
    console.info('[onreadystatechange]', this.readyState);

    if (this.readyState === this.DONE) {
        console.info('[response status]', this.statusText);
        console.info('[response]', this.responseText);
    }
});

// xhr.onload = function (e) {
xhr.addEventListener('load', function (e) {
    console.info('[onload]', xhr.readyState);
});

// xhr.onerror = function (error) {
xhr.addEventListener('error', function (error) {
    console.error('[onerror]', error);
});

// xhr.onprogress = function () {
xhr.addEventListener('progress', function () {
    console.info('[onprogress]');
});

// xhr.ontimeout = function () {
xhr.addEventListener('timeout', function () {
    console.error('[ontimeout]', 'The request for timed out.');
});

//xhr.open('GET', 'http://httpconsole.com:80/request?foo=bar');
xhr.open('GET', 'http://google.com:80');
xhr.setRequestHeader('X-Requested-With', 'chrome.sockets.tcp.xhr');
xhr.send(null);
