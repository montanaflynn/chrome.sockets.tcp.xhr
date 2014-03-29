.. _api:
.. toctree::
   :hidden:

   index

***************
Reference Guide
***************

.. WARNING:: This documentation does not reflect the active state of the library, but rather the intended end state, some properties/methods may not function as described here.

Properties
==========

.. csv-table::
   :header: "Attribute", "Type", "Description"
   :widths: 20, 20, 10

+-------------------+-------------------+-----------------------------------------------------------+
| Attribute         | Type              | Description                                               |
+===================+===================+===========================================================+
| **readyState**    | `unsigned short`  | The state of the request. (see :ref:`readystate`).        |
+-------------------+-------------------+-----------------------------------------------------------+
| **response**      | `mixed`           | The response entity body according to `responseType`.     |
|                   |                   | This is `null` if the request is not complete or was not  |
|                   |                   | successful.                                               |
+-------------------+-------------------+-----------------------------------------------------------+
| **responseText**  | `DOMString`       | The response to the request as text, or `null` if the     |
|                   |                   | request was unsuccessful or has not yet been sent.        |
+-------------------+-------------------+-----------------------------------------------------------+
| **responseType**  | `String`          | Can be set to change the response type.                   |
|                   |                   | (see :ref:`responsetype`).                                |
+-------------------+-------------------+-----------------------------------------------------------+
| **responseXML**   | `Document`        | The response to the request as a DOM Document object,     |
|                   |                   | or `null` if the request was unsuccessful, has not yet    |
|                   |                   | been sent, or cannot be parsed as XML or HTML.            |
+-------------------+-------------------+-----------------------------------------------------------+
| **status**        | `unsigned short`  | The HTTP result code.                                     |
+-------------------+-------------------+-----------------------------------------------------------+
| **statusText**    | `String`          | The response string returned by the HTTP server.          |
+-------------------+-------------------+-----------------------------------------------------------+
| **timeout**       | `unsigned long`   | The number of milliseconds a request can take before      |
|                   |                   | automatically being terminated. A default value of `0`    |
|                   |                   | means there is no timeout.                                |
+-------------------+-------------------+-----------------------------------------------------------+

.. _readystate:

readyState Values
-----------------

| Value            | State              | Description                                                     |
| ---------------- | ------------------ | --------------------------------------------------------------- |
| **<kbd>0</kbd>** | `UNSENT`           | `open()` has not been called yet.                               |
| **<kbd>1</kbd>** | `OPENED`           | `send()` has not been called yet.                               |
| **<kbd>2</kbd>** | `HEADERS_RECEIVED` | `send()` has been called, and headers and status are available. |
| **<kbd>3</kbd>** | `LOADING`          | Downloading; responseText holds partial data.                   |
| **<kbd>4<kbd>**  | `DONE`             | The operation is complete.                                      |

### responseType Values

| Value                      | Data type of response property       |
| -------------------------- | ------------------------------------ |
| **<kbd>text</kbd>**        | `String` (this is the default)       |
| **<kbd>arraybuffer</kbd>** | `ArrayBuffer`                        |
| **<kbd>blob</kbd>**        | `Blob`                               |
| **<kbd>document</kbd>**    | `Document`                           |
| **<kbd>json</kbd>**        | `Object` (parsed from a JSON string) |

## Methods

| Method | Returns | Description |
| ------ | ------- | ------------|
<a name="method-constructor"></a>**<kbd>constructor()</kbd>**                         | `ChromeSocketsXMLHttpRequest` | Initiates a new instance. |
<a name="method-abort"></a>**<kbd>abort()</kbd>**                                     | `void`   | Aborts the request if it has already been sent. |
<a name="method-getallresponseheaders"></a>**<kbd>getAllResponseHeaders()</kbd>**     | `String` | Returns all the response headers as a string, or `null` if no response has been received. |
<a name="method-getresponseheader"></a>**<kbd>getResponseHeader(header)</kbd>**       | `String` | Returns the string containing the text of the specified `header`, or `null` if either the response has not yet been received or the header doesn't exist in the response. |
<a name="method-open"></a>**<kbd>open(method, url)</kbd>**                            | `void`   | Initializes a request with the parameters: `method` *(The HTTP method to use)*, and `url` *(The URL to send the request to)* |
<a name="method-overridemimetype"></a>**<kbd>overrideMimeType(mime)</kbd>**           | `void`   | Overrides the MIME type returned by the server. |
<a name="method-send"></a>**<kbd>send(data)</kbd>**                                   | `void`   | Sends the request. `data` can be one of: `ArrayBuffer`, `ArrayBufferView`, `Blob`, `Document`, `String`., `FormData` |
<a name="method-sendrequestheader"></a>**<kbd>setRequestHeader(header, value)</kbd>** | `void`   | Sets the value of an HTTP request header. If this method is called several times with the same header, the values are merged into one single request header. |
<a name="method-setmaxredirects"></a>**<kbd>setMaxRedirects(value)</kbd>** | `void`   | Sets the maximum number of redirects to follow. |



## Events

you can listen to **<kbd>ChromeSocketsXMLHttpRequest</kbd>** events via standard `addEventListener` APIs in addition to setting `on*` properties to a handler function.

| Name | Description | Arguments |
| ---- | ----------- | --------- |
<a name="event-readystatechange"></a>**<kbd>readystatechange</kbd>** | invoked whenever the readyState attribute changes.
<a name="event-timeout"></a>**<kbd>timeout</kbd>**                   | Invoked whenever the request times out.
<a name="event-upload"></a>**<kbd>upload</kbd>**                     | Invoked to track the upload process.
<a name="event-abort"></a>**<kbd>abort</kbd>**                       | Invoked if the operation is canceled by the user.
<a name="event-error"></a>**<kbd>error</kbd>**                       | Invoked if the operation fails to complete due to an error. | `Object error` | 
<a name="event-load"></a>**<kbd>load</kbd>**                         | Invoked when the operation is successfully completed.
<a name="event-start"></a>**<kbd>loadstart</kbd>**                   | Invoked exactly once when the operation begins.
<a name="event-loadend"></a>**<kbd>loadend</kbd>**                   | Invoked when the operation is completed for any reason; it will always follow a an `abort`, `error`, or `load` event.
<a name="event-progress"></a>**<kbd>progress</kbd>**                 | Invoked zero or more times, after the `loadstart` event, but before any `abort`, `error`, or `load` events occur.
<a name="event-beforeredirect"></a>**<kbd>beforeredirect</kbd>**     | Invoked before a redirect. | `String redirectUrl`, `Array responseHeaders`, `String statusText` | 
