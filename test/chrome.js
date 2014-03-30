// polyfill for PhantomJS (https://github.com/ariya/phantomjs/issues/10522)
if (Function.prototype.bind === undefined) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

String.prototype.toArrayBuffer = function (callback) {
    var blob = new Blob([this]);
    var reader = new FileReader();

    reader.onload = function (e) {
        callback(e.target.result);
    };

    reader.readAsArrayBuffer(blob);
};

if (chrome === undefined) {
    var chrome = {};
}

if (chrome.sockets === undefined) {
    chrome.sockets = {
        tcp: {
            create: function (socketProperties, onCreate) {
                onCreate({socketId: 1});
            },

            connect: function (socketId, host, port, onConnect) {
                onConnect(1);
            },

            send: function (socketId, buffer, onSend) {
                onSend({
                    resultCode: 1
                });

                this.onReceive.callListener();
            },

            onReceive: {
                callListener: function() {
                    var data = [
                        'HTTP/1.1 200 OK',
                        'Date: Sat, 29 Mar 2014 23:55:03 GMT',
                        'Expires: -1',
                        'Cache-Control: private, max-age=0',
                        'Content-Type: text/html; charset=ISO-8859-1',
                        'Connection: close',
                        '',
                        '<html><body>Hello World</body></html>',
                    ];

                    data.join('\r\n').toArrayBuffer(function (data) {
                        this.onReceive({
                            socketId: 1,
                            data: data
                        });
                    }.bind(this));
                },

                addListener: function (onReceive) {
                    this.onReceive = onReceive;
                }
            },

            disconnect: function () {},

            close: function () {}
        }
    }
}
