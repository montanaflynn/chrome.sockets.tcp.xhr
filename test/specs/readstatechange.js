describe('XMLHttpRequest Compatibility: event [readystatechange]', function() {
    var xhr = new chrome.sockets.tcp.xhr();

    beforeEach(function(done) {
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                done();
            }
        });
    });

    xhr.open('GET', 'http://httpconsole.com/text/Hello%20World');
    xhr.send(null);

    it ('should work get a successful response', function (done) {
        expect(xhr.statusText).toBe('200 OK');
        expect(xhr.responseText).toBe('Hello World');
        done();
    });
});
