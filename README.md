# chrome.sockets.tcp.xhr ![GitHub version][github-image]

[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![devDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Total views][sourcegraph-image]][sourcegraph-url]

an `XMLHttpRequest` drop-in replacement using [chrome.sockets.tcp](http://developer.chrome.com/apps/sockets_tcp) for [Chrome Apps](http://developer.chrome.com/apps/about_apps)

**NOTE: This is still in pre-release stage, use at your own risk, cannot gaurantee functionality**

## Table of contents

- [Quick start](#quick-start)
- [ChangeLog](#changelog)
- [Documentation](#documentation)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Compiling](#compiling-)
- [Contributing](#contributing)
- [Contribute and Earn](#contribute-and-earn)
- [Donating](#donating)
- [Community](#community)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)

## Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/releases).
- Clone the repo: 
  ```bash
git clone git@github.com:codeinchaos/chrome.sockets.tcp.xhr.git
```

- Install with [Bower](http://bower.io) [![Bower version][bower-image]][bower-url]
  ```bash
bower install chrome.sockets.tcp.xhr
```

- Install with [NPM](http://npmjs.org) [![NPM version][npm-image]][npm-url]
  ```bash
npm install chrome.sockets.tcp.xhr
```

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

## ChangeLog
refer to the [releases](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/releases) section for a detailed ChangeLog

## Documentation

Refer to the [Wiki](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/wiki) for detailed API documentation.

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/codeinchaos/chrome.sockets.tcp.xhr/issues/new).

## Compiling [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

This project uses [Grunt](http://gruntjs.com/). If you haven't used Grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

### Available Grunt commands

| Function  | Command       | Description                                                                                                                               |
| --------- | ------------- | --------------------------------------------- |
| Build     | `grunt`       | Compiles.                                     |
| Tests     | `grunt test`  | Runs tests.                                   |
| Watch     | `grunt watch` | This is a convenience method for watching.    |

### Troubleshooting dependencies

Should you encounter problems with installing dependencies or running Grunt commands, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

More over, if your pull request contains JavaScript patches or features, you must include relevant unit tests.

Editor preferences are available in the [editor config](.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

### Contribute and Earn

Donate bitcoins to this project or make commits and get tips for it. If your commit is accepted by project maintainer and there are bitcoins on its balance, you will get a tip!

[![tip for next commit][tip4commit-image]][tip4commit-url]

## Donating

Donations are welcome to help support the continuous development of this project.

[![GitTip][gittip-image]][gittip-url]
[![PayPal][paypal-image]][paypal-url]

## Community

Keep track of development and updates.

- Follow [@AhmadNassri](http://twitter.com/ahmadnassri) & [@CodeInChaos](http://twitter.com/codeinchaos) on Twitter.
- Tweet [@CodeInChaos](http://twitter.com/codeinchaos) with any questions/personal support requests.
- Implementation help may be found at Stack Overflow (tagged [`chrome.sockets.tcp.xhr`](http://stackoverflow.com/questions/tagged/chrome.sockets.tcp.xhr)).
- Read and subscribe to [My Blog](http://ahmadnassri.com).

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, this project is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

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

Licensed under [the MIT license](LICENSE).

[github-image]: https://badge.fury.io/gh/codeinchaos%2Fchrome.sockets.tcp.xhr.png
[bower-url]: http://badge.fury.io/bo/chrome.sockets.tcp.xhr
[bower-image]: https://badge.fury.io/bo/chrome.sockets.tcp.xhr.png
[npm-url]: http://badge.fury.io/js/chrome.sockets.tcp.xhr
[npm-image]: https://badge.fury.io/js/chrome.sockets.tcp.xhr.png
[travis-url]: https://travis-ci.org/codeinchaos/chrome.sockets.tcp.xhr
[travis-image]: https://travis-ci.org/codeinchaos/chrome.sockets.tcp.xhr.png?branch=master
[codeclimate-url]: https://codeclimate.com/github/codeinchaos/chrome.sockets.tcp.xhr
[codeclimate-image]: https://codeclimate.com/github/codeinchaos/chrome.sockets.tcp.xhr.png
[daviddm-url]: https://david-dm.org/codeinchaos/chrome.sockets.tcp.xhr
[daviddm-image]: https://david-dm.org/codeinchaos/chrome.sockets.tcp.xhr.png
[daviddm-dev-url]: https://david-dm.org/codeinchaos/chrome.sockets.tcp.xhr#info=devDependencies
[daviddm-dev-image]: https://david-dm.org/codeinchaos/chrome.sockets.tcp.xhr/dev-status.png
[coveralls-url]: https://coveralls.io/r/codeinchaos/chrome.sockets.tcp.xhr
[coveralls-image]: https://coveralls.io/repos/codeinchaos/chrome.sockets.tcp.xhr/badge.png
[sourcegraph-url]: https://sourcegraph.com/github.com/codeinchaos/chrome.sockets.tcp.xhr
[sourcegraph-image]: https://sourcegraph.com/api/repos/github.com/codeinchaos/chrome.sockets.tcp.xhr/counters/views.png
[gittip-url]: https://www.gittip.com/ahmadnassri/
[gittip-image]: http://img.shields.io/gittip/ahmadnassri.svg
[paypal-url]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UJ2B2BTK9VLRS&on0=project&os0=chrome.sockets.tcp.xhr
[paypal-image]: http://img.shields.io/badge/PayPal-Donate-green.svg
[tip4commit-url]: http://tip4commit.com/projects/639
[tip4commit-image]: http://tip4commit.com/projects/639.svg
