/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
var get = exports.get = function get(url) {
        return fetch(url).then(function (responseJson) {
                return responseJson.json();
        });
};

var post = exports.post = function post() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/config";
        var data = arguments[1];

        return fetch(url, {
                method: 'post',

                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                        data: data
                })
        });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fetch = __webpack_require__(0);

var _posts = __webpack_require__(2);

var _posts2 = _interopRequireDefault(_posts);

var _postsRecent = __webpack_require__(3);

var _postsRecent2 = _interopRequireDefault(_postsRecent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _posts2.default)();
(0, _postsRecent2.default)();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetch = __webpack_require__(0);

exports.default = (0, _fetch.get)("/posts").then(function (post) {

  var $containerPosts = document.querySelector("[data-content='content-posts']");

  var outputPosts = [];

  post.forEach(function (posts, index) {
    outputPosts.push("\n  <article class=\"post-content\">\n                <h2 class=\"title\">" + posts.title + "</h2>\n\n                <p class=\"text\">" + posts.content + "</p>\n                \n                <a href=\"/posts/" + index + "\" class=\"more\">Leia Mais</a>\n            </article>\n");
  });

  $containerPosts.innerHTML = outputPosts.join(' ');
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fetch = __webpack_require__(0);

(0, _fetch.get)("/posts").then(function (listPost) {
    var $containerList = document.querySelector('[data-content="list-posts"]');

    var outputList = [];

    var lastFive = listPost.slice(listPost.length - 5);

    lastFive.forEach(function (current) {
        outputList.push('<li class="latest">' + current.title + '</li>\n');

        $containerList.innerHTML = outputList.join(' ');
    });
});

/***/ })
/******/ ]);