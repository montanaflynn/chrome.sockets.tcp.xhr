var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    console.info('[onreadystatechange]', this.readyState);

    if (this.readyState === this.DONE) {
        console.info('[response status]', this.statusText);
        console.info('[response]', this.responseText);
    }
};

xhr.addEventListener('load', function (e) {
    console.error('[onload]', xhr.readyState);
});

xhr.addEventListener('error', function (error) {
    console.info('[onerror]', error);
});

xhr.addEventListener('progress', function () {
    console.info('[onprogress]');
});

xhr.addEventListener('timeout', function () {
    console.error('[ontimeout]', 'The request for timed out.');
});

//xhr.open('GET', 'http://httpconsole.com:80/request?foo=bar');
xhr.open('GET', 'http://httpconsole.local/redirect');
xhr.setRequestHeader('X-Requested-With', 'chrome.sockets.tcp.xhr');
xhr.send(null);
