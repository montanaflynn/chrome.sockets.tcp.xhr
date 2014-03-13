# chrome.sockets.tcp.xhr
[![Build Status](https://travis-ci.org/codeinchaos/chrome.sockets.tcp.xhr.png?branch=master)](https://travis-ci.org/codeinchaos/chrome.sockets.tcp.xhr)
[![Dependency Status](https://david-dm.org/codeinchaos/chrome.sockets.tcp.xhr.png)](https://david-dm.org/codeinchaos/chrome.sockets.tcp.xhr#info=Dependencies)
[![devDependency Status](https://david-dm.org/codeinchaos/chrome.sockets.tcp.xhr/dev-status.png)](https://david-dm.org/codeinchaos/chrome.sockets.tcp.xhr#info=devDependencies)
[![Total views](https://sourcegraph.com/api/repos/github.com/codeinchaos/chrome.sockets.tcp.xhr/counters/views.png)](https://sourcegraph.com/github.com/codeinchaos/chrome.sockets.tcp.xhr)

an `XHR` polyfill using `chrome.sockets.tcp` for Chrome Apps

## TO DO

- HTTPS support
- Full Compatibility with XMLHttpRequest

## Table of contents

- [Quick start](#quick-start)
- [Change Log](#changelog)
- [Documentation](#documentation)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Compiling](#compiling)
- [Contributing](#contributing)
- [Community](#community)
- [Donating](#donating)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)

## Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/releases).
- Clone the repo: `git clone git@github.com:codeinchaos/chrome.sockets.tcp.xhr.git`.
- Install with [Bower](http://bower.io): `bower install chrome.sockets.tcp.xhr`.
- Install with [NPM](http://npmjs.org): `npm install chrome.sockets.tcp.xhr`.

### What's included

Within the download you'll find the following files, providing both compiled and minified variations:

```
HTTPArchive.js/
└── dist
    ├── chrome.sockets.tcp.xhr.js
    └── chrome.sockets.tcp.xhr.min.js
```

### Sample Usage

making a simple XHR request with sockets:

```javascript
var xhr = new chrome.sockets.tcp.xhr();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4){
        console.info(xhr.responseText);
    }
};

xhr.onerror = function (error) {
    console.info(error);
};


xhr.open('GET', 'http://google.com:80');
xhr.setRequestHeader('X-Requested-With', 'chrome.sockets.tcp.xhr');
xhr.send(null);
```

## Change Log
* v0.0.0 still in development

## Documentation

Refer to the [Wiki](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/wiki) for detailed API documentation.

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/blob/master/CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/issues/new).

## Compiling [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

chrome.sockets.tcp.xhr uses [Grunt](http://gruntjs.com/). If you haven't used Grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

### Available Grunt commands

| Function  | Command       | Description                                                                                                                               |
| --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Build     | `grunt`       | Run `grunt` to run tests locally and compile the JavaScript files into `/dist`.                                                           |
| Tests     | `grunt test`  | Runs [JSHint](http://jshint.com) and [QUnit](http://qunitjs.com/) tests headlessly in [PhantomJS](http://phantomjs.org/) (used for CI).   |
| Watch     | `grunt watch` | This is a convenience method for watching just Less files and automatically building them whenever you save.                              |

### Troubleshooting dependencies

Should you encounter problems with installing dependencies or running Grunt commands, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

## Contributing

Please read through our [contributing guidelines](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

More over, if your pull request contains JavaScript patches or features, you must include relevant unit tests.

Editor preferences are available in the [editor config](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

## Community

Keep track of development and updates.

- Follow [@ahmadnassri](http://twitter.com/ahmadnassri) & [@codeinchaos](http://twitter.com/codeinchaos) on Twitter.
- Tweet [@codeinchaos](http://twitter.com/codeinchaos) with any questions/personal support requests.
- Implementation help may be found at Stack Overflow (tagged [`chrome.sockets.tcp.xhr`](http://stackoverflow.com/questions/tagged/chrome.sockets.tcp.xhr)).
- Read and subscribe to [My Blog](http://blog.ahmadnassri.com).

## Donating
Donations are welcome to help support the continuous development of this project.
- [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UJ2B2BTK9VLRS)

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, chrome.sockets.tcp.xhr is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

- Breaking backward compatibility **bumps the major** while resetting minor and patch
- New additions without breaking backward compatibility **bumps the minor** while resetting the patch
- Bug fixes and misc changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.

## Authors

**Ahmad Nassri**

- Twitter: [@AhmadNassri](http://twitter.com/ahmadnassri)
- Website: [ahmadnassri.com](http://ahmadnassri.com)

## License

Licensed under [the MIT license](LICENSE-MIT).
