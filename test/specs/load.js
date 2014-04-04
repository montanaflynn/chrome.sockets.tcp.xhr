describe('XMLHttpRequest Compatibility: event [load]', function() {
    var xhr = new chrome.sockets.tcp.xhr();

    beforeEach(function(done) {
        xhr.addEventListener('load', function (e) {
            done();
        });
    });

    xhr.open('GET', 'http://httpconsole.com/text/Hello%20World');
    xhr.send(null);

    it ('should work get a successful response', function (done) {
        expect(xhr.readyState).toBe(xhr.DONE);
        done();
    });
});
