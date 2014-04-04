describe('XMLHttpRequest Initialize', function() {
    'use strict';

    var xhr = new chrome.sockets.tcp.xhr();

    it('should initiate an instance of chrome.sockets.tcp.xhr', function() {
        expect(xhr instanceof chrome.sockets.tcp.xhr).toBe(true);
    });
});


/* OLD QUNIT TESTS

asyncTest('load event', function() {
    var xhr = new chrome.sockets.tcp.xhr();

    // xhr.onload = function (e) {


    xhr.open('GET', 'http://httpconsole.com');
    xhr.send(null);
});

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

*/
