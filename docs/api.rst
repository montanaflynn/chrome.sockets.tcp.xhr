.. _api:
.. toctree::
   :hidden:

   index

***************
Reference Guide
***************

.. WARNING:: This documentation does not reflect the active state of the library, but rather the intended end state, some properties/methods may not function as described here.

.. _properties:

Properties
==========

+-------------------+---------------------+---------------------------------------------------+
| Attribute         | Type                | Description                                       |
+===================+=====================+===================================================+
| **readyState**    | ``unsigned short``  | The state of the request. (see :ref:`readystate`) |
+-------------------+---------------------+---------------------------------------------------+
| **response**      | ``mixed``           | The response entity body according to             |
|                   |                     | ``responseType``. This is ``null`` if the request |
|                   |                     | is not complete or was not successful.            |
+-------------------+---------------------+---------------------------------------------------+
| **responseText**  | ``DOMString``       | The response to the request as text, or ``null``  |
|                   |                     | if the request was unsuccessful or has not yet    |
|                   |                     | been sent.                                        |
+-------------------+---------------------+---------------------------------------------------+
| **responseType**  | ``String``          | Can be set to change the response type.           |
|                   |                     | (see :ref:`responsetype`).                        |
+-------------------+---------------------+---------------------------------------------------+
| **responseXML**   | ``Document``        | The response to the request as a DOM Document     |
|                   |                     | object, or `null` if the request was unsuccessful,|
|                   |                     | has not yet been sent, or cannot be parsed as XML |
|                   |                     | or HTML.                                          |
+-------------------+---------------------+---------------------------------------------------+
| **status**        | ``unsigned short``  | The HTTP result code.                             |
+-------------------+---------------------+---------------------------------------------------+
| **statusText**    | ``String``          | The response string returned by the HTTP server.  |
+-------------------+---------------------+---------------------------------------------------+
| **timeout**       | ``unsigned long``   | The number of milliseconds a request can take     |
|                   |                     | before automatically being terminated. A default  |
|                   |                     | value of ``0`` means there is no timeout.         |
+-------------------+---------------------+---------------------------------------------------+

.. _readystate:

readyState Values
-----------------

+-------+----------------------+------------------------------------------------------------------+
| Value | State                | Description                                                      |
+=======+======================+==================================================================+
| **0** | ``UNSENT``           | ``open()`` has not been called yet.                              |
+-------+----------------------+------------------------------------------------------------------+
| **1** | ``OPENED``           | ``send()`` has not been called yet.                              |
+-------+----------------------+------------------------------------------------------------------+
| **2** | ``HEADERS_RECEIVED`` | ``send()`` has been called, and headers and status are available.|
+-------+----------------------+------------------------------------------------------------------+
| **3** | ``LOADING``          | Downloading; responseText holds partial data.                    |
+-------+----------------------+------------------------------------------------------------------+
| **4** | ``DONE``             | The operation is complete.                                       |
+-------+----------------------+------------------------------------------------------------------+

.. _responseType:

responseType Values
-------------------

+-----------------+----------------------------------------+
| Value           | Data type of response property         |
+=================+========================================+
| **text**        | ``String`` (this is the default)       |
+-----------------+----------------------------------------+
| **arraybuffer** | ``ArrayBuffer``                        |
+-----------------+----------------------------------------+
| **blob**        | ``Blob``                               |
+-----------------+----------------------------------------+
| **document**    | ``Document``                           |
+-----------------+----------------------------------------+
| **json**        | ``Object`` (parsed from a JSON string) |
+-----------------+----------------------------------------+

.. _methods:

Available Methods
=================

.. function:: ChromeSocketsXMLHttpRequest()
   :noindex:

   Initiates a new instance.

   :rtype: ChromeSocketsXMLHttpRequest Instance

.. function:: abort()
   :noindex:

   Aborts the request if it has already been sent.

.. function:: getAllResponseHeaders()
   :noindex:

   Returns all the response headers as a string, or ``null`` if no response has been received. |

   :rtype: String | null

.. function:: getResponseHeader(header)
   :noindex:

   Returns the string containing the text of the specified ``header``, or ``null`` if either the response has not yet been received or the header doesn't exist in the response.

   :param header: HTTP Header name to retrieve
   :type header: string
   :rtype: String | null

.. function:: open(method, url)
   :noindex:

   Initializes a new request.

   :param method: HTTP Verb *(GET, POST, DELETE, etc ...)*
   :param url: The URL to send the request to
   :type method: string
   :type url: string

.. function:: overrideMimeType(mime)
   :noindex:

   Overrides the MIME type returned by the server.

   :param mime: Mime-Type to use
   :type mime: string

.. function:: send(data)
   :noindex:

   Sends the request.

   :param data: data to send
   :type data: ArrayBuffer | ArrayBufferView | Blob | Document | String | FormData

.. function:: setRequestHeader(header, value)
   :noindex:

   Sets the value of an HTTP request header. If this method is called several times with the same header, the values are merged into one single request header.

   :param header: HTTP Header name
   :param value: HTTP Header value
   :type header: string
   :type value: string

.. function:: setMaxRedirects(value)
   :noindex:

   Sets the maximum number of redirects to follow.

   :param value: maximum number of redirects
   :type value: Integer



Events
======

you can listen to **ChromeSocketsXMLHttpRequest** events via standard ``addEventListener`` APIs in addition to setting ``on*`` properties to a handler function. e.g.

.. code-block:: javascript
    :linenos:

    // xhr.onerror = function (error) {
    xhr.addEventListener('error', function (error) {
        console.error('[error]', error);
    });

.. function:: readystatechange

    invoked whenever the readyState attribute changes.

.. function:: timeout

    Invoked whenever the request times out.

.. function:: upload

    Invoked to track the upload process.

.. function:: abort

    Invoked if the operation is canceled by the user.

.. function:: error(error)

    Invoked if the operation fails to complete due to an error.

    :param error: error details
    :type error: Object

.. function:: load

    Invoked when the operation is successfully completed.

.. function:: loadstart

    Invoked exactly once when the operation begins.

.. function:: loadend

    Invoked when the operation is completed for any reason it will always follow a an ``abort``, ``error``, or ``load`` event.

.. function:: progress

    Invoked zero or more times, after the ``loadstart`` event, but before any ``abort``, ``error``, or ``load`` events occur.

.. function:: beforeredirect(redirectUrl, responseHeaders, redirectUrl)

    Invoked before a redirect.

    :param redirectUrl: The redirect URL
    :param responseHeaders: The redirect response headers
    :param statusText: the HTTP response status text
    :type redirectUrl: String
    :type responseHeaders: Array
    :type statusText: String
