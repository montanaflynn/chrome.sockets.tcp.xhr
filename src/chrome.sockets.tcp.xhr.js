(function () {
    'use strict';

    var ChromeSocketsXMLHttpRequest = chrome.sockets.tcp.xhr = function () {
        Object.defineProperties(this, {
            options: {
                enumerable: false,
                writable: true,
                value: {
                    uri: null,
                    data: null,
                    method: null,
                    createInfo: null,
                    inprogress: false,
                    timer: {
                        id: null,
                        expired: false
                    },
                    headers: {
                        'Connection': 'close',
                        'Accept-Encoding': 'identity',
                        'Content-Length': 0
                    },
                    response: {
                        headers: null,
                        responseText: null
                    }
                }
            },

            props: {
                enumerable: false,
                configurable: false,
                value: {
                    readyState: 0,
                }
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-timeout-attribute
             * TODO: time in milliseconds.
             */
            timeout: {
                enumerable: true,
                writable: true,
                value: 0
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-withcredentials-attribute
             */
            withCredentials: {
                enumerable: true,
                writable: true,
                value: false
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-upload-attribute
             */
            upload: {
                enumerable: true,
                writable: true,
                value: null
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-status-attribute
             */
            status: {
                enumerable: true,
                writable: true,
                value: 0
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-statustext-attribute
             */
            statusText: {
                enumerable: true,
                writable: true,
                value: null
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-responsetype-attribute
             */
            responseType: {
                enumerable: true,
                writable: true,
                value: ''
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-response-attribute
             */
            response: {
                enumerable: true,
                writable: true,
                value: null
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-responsetext-attribute
             */
            responseText: {
                enumerable: true,
                writable: true,
                value: null
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#the-responsexml-attribute
             */
            responseXML: {
                enumerable: true,
                writable: true,
                value: null
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#event-handlers
             */
            onreadystatechange: {
                enumerable: true,
                writable: true,
                value: null
            },

            onloadstart: {
                enumerable: true,
                writable: true,
                value: null
            },

            onprogress: {
                enumerable: true,
                writable: true,
                value: null
            },

            onabort: {
                enumerable: true,
                writable: true,
                value: null
            },

            onerror: {
                enumerable: true,
                writable: true,
                value: null
            },

            onload: {
                enumerable: true,
                writable: true,
                value: null
            },

            ontimeout: {
                enumerable: true,
                writable: true,
                value: null
            },

            onloadend: {
                enumerable: true,
                writable: true,
                value: null
            },

            readyState: {
                enumerable: true,

                get: function () {
                    return this.props.readyState;
                },

                set: function (value) {
                    this.props.readyState = value;

                    if (this.onreadystatechange) {
                        this.onreadystatechange(this.props.readyState);
                    }
                }
            }
        });
    };

    /**
     * Regular Expression for URL validation
     * Modified: added capturing groups
     *
     * Author: Diego Perini
     * Updated: 2010/12/05
     * License: MIT
     *
     * Copyright (c) 2010-2013 Diego Perini (http://www.iport.it)
     *
     * https://gist.github.com/dperini/729294
     */
    ChromeSocketsXMLHttpRequest.prototype.regex = new RegExp(
        '^' +
            // protocol identifier
            '(?:(https?|ftp)://)' +
            // user:pass authentication
            '(?:\\S+(?::\\S*)?@)?' +
            '(' +
                // IP address exclusion
                // private & local networks
                '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
                '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
                '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
                // IP address dotted notation octets
                // excludes loopback network 0.0.0.0
                // excludes reserved space >= 224.0.0.0
                // excludes network & broacast addresses
                // (first & last IP address of each class)
                '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
                '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
                '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
            '|' +
                // host name
                '(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)' +
                // domain name
                '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*' +
                // TLD identifier
                '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
            ')' +
            // port number
            '(?::(\\d{2,5}))?' +
            // resource path
            '(/[^\\s]*)?' +
        '$', 'i'
    );

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-open()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.open = function (method, url) {
        this.options.method = method;
        this.options.uri = this.regex.exec(url);

        // check if the method is valid
        if (!this.options.method) {
            throw new TypeError('method is not a valid HTTP method');
        }

        // check if the URI parsed properly
        if (this.options.uri === null) {
            throw new TypeError('url cannot be parsed');
        }

        // set readyState to OPENED
        this.readyState = 1;

        this.setRequestHeader('Host', this.options.uri[2]);
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.setRequestHeader = function (header, value) {
        if (this.readyState !== 1 || this.options.inprogress === true) {
            throw new TypeError('InvalidStateError');
        }

        if (!header) {
            throw new TypeError('header is not a valid HTTP header field name');
        }

        if (!value && value.length !== 0) {
            throw new TypeError('value is not a valid HTTP header field value.');
        }

        // TODO: If header is in the headers list, append ",", followed by U+0020, followed by value.
        this.options.headers[header] = value;
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-send()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.send = function (data) {
        var socketProperties = {
            persistent: false,
            name: 'chrome.sockets.tcp.xhr'
        };

        this.options.inprogress = true;
        this.options.data = data || null;

        chrome.sockets.tcp.create(socketProperties, this.onCreate.bind(this));

        if (this.timeout > 0) {
            this.options.timer.id = setTimeout(this.expireTimer.bind(this), this.timeout);
        }
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-abort()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.abort = function () {
        this.disconnect();
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.getResponseHeader = function (header) {
        // TODO: use regex
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.getAllResponseHeaders = function () {
        return this.options.response.headers;
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-overridemimetype()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.overrideMimeType = function (mimetype) {
    };



    ChromeSocketsXMLHttpRequest.prototype.sendAsBinary = function (body) {
    };


    ChromeSocketsXMLHttpRequest.prototype.onCreate = function (createInfo) {
        if (!this.options.inprogress) {
            return;
        }

        var port = this.options.uri[3] ? this.options.uri[3] : 80;

        this.options.createInfo = createInfo;

        chrome.sockets.tcp.connect(createInfo.socketId, this.options.uri[2], parseInt(port), this.onConnect.bind(this));
    };

    ChromeSocketsXMLHttpRequest.prototype.onConnect = function (result) {
        if (!this.options.inprogress) {
            return;
        }

        if (this.options.timer.expired) {
            return;
        } else if (result < 0) {
            this.error({
                error: 'connection error',
                code: result
            });
        } else {
            // assign recieve listner
            chrome.sockets.tcp.onReceive.addListener(this.onReceive.bind(this));

            // send message as ArrayBuffer
            this.getMessage().toArrayBuffer(function sendMessage (buffer) {
                chrome.sockets.tcp.send(this.options.createInfo.socketId, buffer, this.onSend.bind(this));
            }.bind(this));
        }
    };

    ChromeSocketsXMLHttpRequest.prototype.onReceive = function (info) {
        if (!this.options.inprogress) {
            return;
        }

        if (info.socketId !== this.options.createInfo.socketId) {
            return;
        }

        // immediatly disconnect on first respond
        this.disconnect();

        info.data.toString(function (response) {
            // detect CRLFx2 position
            var match = response.match(/\r\n\r\n/);

            // slice the headers up to CRLFx2
            this.options.response.headers = response.slice(0, match.index);

            // set readyState to HEADERS_RECEIVED
            this.readyState = 2;

            // slice the body right after CRLFx2
            this.options.response.responseText = response.slice(match.index + 4);

            // set the response object
            this.responseText = this.options.response.responseText;

            // set readyState to LOADING
            this.readyState = 3;

            // TODO: set the response entity body according to responseType, as an ArrayBuffer, Blob, Document, JavaScript object (for "json"), or string.
            this.response = this.responseText;

            // TODO: parse headers to get status, statusText

            // set readyState to DONE
            this.readyState = 4;

            //console.log('headers: ', this.options.response.headers);
            //console.log('body: ', this.options.response.responseText);
        }.bind(this));
    };

    ChromeSocketsXMLHttpRequest.prototype.getMessage = function () {
        var headers = [];

        // add missing parts to header
        headers.push(this.options.method + ' ' + this.options.uri[4] + ' HTTP/1.1');

        for (var name in this.options.headers) {
            headers.push(name + ': ' + this.options.headers[name]);
        }

        return headers.join('\r\n') + '\r\n\r\n' + this.options.data;
    };

    ChromeSocketsXMLHttpRequest.prototype.error = function (error) {
        if (this.options.inprogress) {
            this.disconnect();
        }

        if (this.onerror) {
            this.onerror(error);
        }
    };

    ChromeSocketsXMLHttpRequest.prototype.disconnect = function () {
        this.options.inprogress = false;

        if (this.options.createInfo !== null) {
            chrome.sockets.tcp.disconnect(this.options.createInfo.socketId);
            chrome.sockets.tcp.close(this.options.createInfo.socketId);
            this.options.createInfo = null;
        }
    };

    ChromeSocketsXMLHttpRequest.prototype.expireTimer = function () {
        if (this.responseText === null) {
            this.disconnect();
            this.options.timer.expired = true;
            this.error({error: 'timeout'});

            if (this.ontimeout) {
                this.ontimeout();
            }
        }
    };

    ChromeSocketsXMLHttpRequest.prototype.onSend = function (sendInfo) {
        if (sendInfo.resultCode < 0) {
            this.error({error: 'sending error'});
            this.disconnect();
        }
    };




    ArrayBuffer.prototype.toString = function (callback) {
        var blob = new Blob([this]);
        var reader = new FileReader();

        reader.onload = function (e) {
            callback(e.target.result);
        };

        reader.readAsText(blob);
    };

    String.prototype.toArrayBuffer = function (callback) {
        var blob = new Blob([this]);
        var reader = new FileReader();

        reader.onload = function (e) {
            callback(e.target.result);
        };

        reader.readAsArrayBuffer(blob);
    };
})();
