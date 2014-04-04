(function (window) {
    'use strict';

    window.chrome = {
        sockets: {
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
                            'Hello World',
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
    };
})(this);
