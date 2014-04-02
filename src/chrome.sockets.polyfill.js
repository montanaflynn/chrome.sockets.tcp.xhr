(function () {
    'use strict';

    // only applicable for chromium < 33
    if (chrome.socket !== undefined) {
        chrome.socket.polyfill = {
            tcp: {
                create: function(type, options, callback) {
                    return chrome.socket.create('tcp', options, callback);
                },

                connect: function (socketId, peerAddress, peerPort, callback) {
                    return chrome.socket.connect(socketId, peerAddress, peerPort, callback);
                },

                onReceive: {
                    addListener: function () {
                    }
                },

                send: function (socketId, data, callback) {
                    return chrome.socket.write(socketId, data, callback);
                },

                disconnect: function (socketId) {
                    return chrome.socket.disconnect(socketId);
                },

                close: function (socketId) {
                    return chrome.socket.destroy(socketId);
                }
            }
        };

        if (chrome.sockets === undefined) {
            chrome.sockets = chrome.socket.polyfill;
        }
    }
})();
