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
                    events: {},
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
                        headers: [],
                        headersText: null
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
             * http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-unsent
             */
            UNSENT: {
                enumerable: false,
                writable: true,
                value: 0
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-opened
             */
            OPENED: {
                enumerable: false,
                writable: true,
                value: 1
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-headers_received
             * TODO: time in milliseconds.
             */
            HEADERS_RECEIVED: {
                enumerable: false,
                writable: true,
                value: 2
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-loading
             * TODO: time in milliseconds.
             */
            LOADING: {
                enumerable: false,
                writable: true,
                value: 3
            },

            /**
             * http://www.w3.org/TR/XMLHttpRequest/#dom-xmlhttprequest-done
             */
            DONE: {
                enumerable: false,
                writable: true,
                value: 4
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

                    this.dispatchEvent('readystatechange');
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
        this.readyState = this.OPENED;

        this.setRequestHeader('Host', this.options.uri[2]);
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.setRequestHeader = function (header, value) {
        if (this.readyState !== this.OPENED || this.options.inprogress === true) {
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
        // If the state is not OPENED, throw an "InvalidStateError" exception.
        // If the send() flag is set, throw an "InvalidStateError" exception.
        if (this.readyState !== this.OPENED || this.options.inprogress === true) {
            throw new TypeError('InvalidStateError');
        }

        // If the request method is GET or HEAD, set data to null
        if (['GET', 'HEADER'].indexOf(this.options.method.toUpperCase()) !== -1) {
            data = null;
        }

        // If data is null, do not include a request entity body and go to the next step.
        if (data !== null) {
            var encoding = null;
            var mimetype = null;


            if (data instanceof ArrayBufferView) {
                // Let the request entity body be the raw data represented by data.
            } else if (data instanceof Blob) {
                // if the object's type attribute is not the empty string let mime type be its value.

                // Let the request entity body be the raw data represented by data.
            } else if (data instanceof HTMLElement) {
                // Let encoding be "UTF-8".
                encoding = 'UTF-8';

                // If data is an HTML document, let mime type be "text/html"
                // or let mime type be "application/xml" otherwise.
                mimetype = 'text/html';

                // Then append ";charset=UTF-8" to mime type.

                //Let the request entity body be data, serialized, converted to Unicode, and utf-8 encoded. Re-throw any exception serializing throws.
            } else if (data instanceof FormData) {
                // Let the request entity body be the result of running the multipart/form-data encoding algorithm with data as form data set and with utf-8 as the explicit character encoding.

                //Let mime type be the concatenation of "multipart/form-data;", a U+0020 SPACE character, "boundary=", and the multipart/form-data boundary string generated by the multipart/form-data encoding algorithm.
            } else if (typeof(data) === 'string') {
                // Let encoding be "UTF-8".

                // Let mime type be "text/plain;charset=UTF-8".

                // Let the request entity body be data, utf-8 encoded.
            }

            this.options.data = data;
        }

        // If a Content-Type header is in author request headers and its value is a valid MIME type that has a charset parameter whose value is not a case-insensitive match for encoding, and encoding is not null, set all the charset parameters of that Content-Type header to encoding.

        // If no Content-Type header is in author request headers and mime type is not null, append a Content-Type header with value mime type to author request headers.

        // Unset the error flag, upload complete flag and upload events flag.

        // If there is no request entity body or if it is empty, set the upload complete flag.

        // Set the send() flag.
        this.options.inprogress = true;

        // Fire a progress event named loadstart.
        this.dispatchEvent('loadstart');

        // continue with sockets setup
        var socketProperties = {
            persistent: false,
            name: 'chrome.sockets.tcp.xhr'
        };

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
        return this.options.response.headers[header];
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.getAllResponseHeaders = function () {
        return this.options.response.headersText;
    };

    /**
     * http://www.w3.org/TR/XMLHttpRequest/#the-overridemimetype()-method
     */
    ChromeSocketsXMLHttpRequest.prototype.overrideMimeType = function (mimetype) {
    };



    ChromeSocketsXMLHttpRequest.prototype.sendAsBinary = function (body) {
    };

    ChromeSocketsXMLHttpRequest.prototype.addEventListener = function (name, callback) {
        if (this.options.events[name]) {
            this.options.events[name].push(callback);
        } else {
            this.options.events[name] = new Array(callback);
        }

        return this;
    };

    ChromeSocketsXMLHttpRequest.prototype.removeEventListener = function(name, callback) {
        if (this.options.events[name]) {
            var i = this.options.events[name].indexOf(callback);
            if (i > -1) {
                this.options.events[name].splice(i, 1);
            } else {
                return false;
            }

            return true;
        } else {
            return false;
        }
    };

    ChromeSocketsXMLHttpRequest.prototype.dispatchEvent = function(name) {
        var args = arguments;

        if (this.hasOwnProperty('on' + name)) {
            if (this['on' + name]) {
                this['on' + name].apply(this, Array.prototype.slice.call(args));
            }
        }

        if (!this.options.events[name]) {
            console.log(name);
            return false;
        }

        this.options.events[name].forEach(function (event) {
            event.apply(this, Array.prototype.slice.call(args));
        }.bind(this));
    };

    /**
     * chrome.sockets.tcp events
     */
    ChromeSocketsXMLHttpRequest.prototype.onCreate = function (createInfo) {
        if (!this.options.inprogress) {
            return;
        }

        var port = this.options.uri[3] ? this.options.uri[3] : 80;

        this.options.createInfo = createInfo;

        chrome.sockets.tcp.connect(createInfo.socketId, this.options.uri[2], parseInt(port, null), this.onConnect.bind(this));
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
            this.generateMessage().toArrayBuffer(function sendMessage (buffer) {
                chrome.sockets.tcp.send(this.options.createInfo.socketId, buffer, this.onSend.bind(this));
            }.bind(this));
        }
    };

    ChromeSocketsXMLHttpRequest.prototype.onSend = function (sendInfo) {
        if (sendInfo.resultCode < 0) {
            this.error({error: 'sending error'});
            this.disconnect();
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

        info.data.toString(this.parseResponse.bind(this));
    };

    /**
     * internal methods
     */
    ChromeSocketsXMLHttpRequest.prototype.parseResponse = function (response) {
        // detect CRLFx2 position
        var responseMatch = response.match(/\r\n\r\n/);

        // slice the headers up to CRLFx2
        this.options.response.headersText = response.slice(0, responseMatch.index);

        // slice the body right after CRLFx2 and set the response object
        this.responseText = response.slice(responseMatch.index + 4);

        // parse headers
        var headerLines = this.options.response.headersText.split('\r\n');
        var statusLine = headerLines.shift();

        var statusLineMatch = statusLine.match(/(HTTP\/\d\.\d)\s+((\d+)\s+.*)/);

        if (statusLineMatch) {
            this.status = statusLineMatch[3];
            this.statusText = statusLineMatch[2];
        }

        headerLines.forEach(function (headerLine) {
            // detect CRLFx2 position
            var headerLineMatch = headerLine.match(/:/);

            // sanity check
            if (headerLineMatch) {
                // slice the header line at the colon and trim output
                var header = headerLine.slice(0, headerLineMatch.index).replace(/^\s+/g, '').replace(/\s+$/g, '');
                var value = headerLine.slice(0, headerLineMatch.index + 1).replace(/^\s+/g, '').replace(/\s+$/g, '');

                this.options.response.headers[header] = value;
            }
        }.bind(this));

        this.processResponse();
    };

    ChromeSocketsXMLHttpRequest.prototype.processResponse = function () {

        // If the response has an HTTP status code of 301, 302, 303, 307, or 308
        // TODO: implement infinite loop precautions
        if ([301, 302, 303, 307, 308].indexOf(this.status) !== -1) {
            // TODO: follow redirect!
        }

        // set readyState to HEADERS_RECEIVED
        this.readyState = this.HEADERS_RECEIVED;
        // set readyState to LOADING
        this.readyState = this.LOADING;

        // TODO: set the response entity body according to responseType, as an ArrayBuffer, Blob, Document, JavaScript object (for "json"), or string.
        this.response = this.responseText;

        // set readyState to DONE
        this.readyState = this.DONE;

        // Fire a progress event named "progress".
        this.dispatchEvent('progress');

        // Fire a progress event named load.
        this.dispatchEvent('load');

        // Fire a progress event named loadend
        this.dispatchEvent('loadend');
    };

    ChromeSocketsXMLHttpRequest.prototype.generateMessage = function () {
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
        if (this.readyState === this.OPENED) {
            this.disconnect();
            this.options.timer.expired = true;
            this.error({error: 'TimeoutError'});

            if (this.ontimeout) {
                this.ontimeout();
            }
        }
    };

    /**
     * internal methods
     * TODO: consider removing from global objects
     */
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
