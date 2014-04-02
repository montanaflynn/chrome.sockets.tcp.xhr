.. toctree::
   :hidden:

   api

**********************
chrome.sockets.tcp.xhr
**********************

Getting Started
===============

To create an instance of **ChromeSocketsXMLHttpRequest**, simply do this:

.. code-block:: javascript
    :linenos:

    var myRequest = new chrome.sockets.tcp.xhr();

Or for convenience you can use ``ChromeSocketsXMLHttpRequest``:

.. code-block:: javascript
    :linenos:

    var myRequest = new ChromeSocketsXMLHttpRequest();

XMLHttpRequest Level 2
======================

While currently, not fully compatible with the entire spec of `XMLHttpRequest Level 2 <http://www.w3.org/TR/XMLHttpRequest2/>`_ the library serves as a functional drop-in replacement for most XHR web operations.

Further compatibility with the spec is in progress, please refer to the `Release History <https://github.com/codeinchaos/chrome.sockets.tcp.xhr/releases>`_ for the latest ChangeLog, and to the :doc:`api` for detailed API documentation.

Full Example
============

.. code-block:: javascript
    :linenos:

    var xhr = new chrome.sockets.tcp.xhr();

    // xhr.onreadystatechange = function() {
    xhr.addEventListener('readystatechange', function () {
        console.info('[readystatechange]', this.readyState);

        if (this.readyState === this.DONE) {
            console.info('[response status]', this.statusText);
            console.info('[response]', this.responseText);
        }
    });

    // xhr.onload = function (e) {
    xhr.addEventListener('load', function (e) {
        console.info('[load]', xhr.readyState);
    });

    // xhr.onerror = function (error) {
    xhr.addEventListener('error', function (error) {
        console.error('[error]', error);
    });

    // xhr.onprogress = function () {
    xhr.addEventListener('progress', function () {
        console.info('[progress]');
    });

    // xhr.ontimeout = function () {
    xhr.addEventListener('timeout', function () {
        console.error('[timeout]', 'The request for timed out.');
    });

    xhr.addEventListener('beforeredirect', function (redirectUrl, responseHeaders, statusText) {
        console.info('[beforeredirect]', statusText, redirectUrl);
    });

    xhr.open('GET', 'http://google.com:80');
    xhr.setRequestHeader('X-Requested-With', 'chrome.sockets.tcp.xhr');
    xhr.send(null);
