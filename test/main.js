/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
    var options = {
        id: 'chrome.sockets.tcp.xhr',
        bounds: {
            width: 800,
            height: 800
        }
    };

    chrome.app.window.create('index.html', options);
});
