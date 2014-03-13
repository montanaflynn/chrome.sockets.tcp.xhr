var xhr = new chrome.sockets.tcp.xhr();

xhr.onreadystatechange = function() {
    console.info('[onreadystatechange]', xhr.readyState);

    if (xhr.readyState === 4){
        console.info('[response]', xhr.responseText);
    }
};

xhr.onload = function (e) {
    console.error('[onload]', xhr.readyState);
};

xhr.onerror = function (error) {
    console.info('[onerror]', error);
};

xhr.onprogress = function () {
    console.info('[onprogress]');
};

xhr.ontimeout = function () {
    console.error('[ontimeout]', 'The request for timed out.');
};

//xhr.open('GET', 'http://httpconsole.com:80/request?foo=bar');
xhr.open('GET', 'http://google.com:80');
xhr.setRequestHeader('X-Requested-With', 'chrome.sockets.tcp.xhr');
xhr.send(null);
