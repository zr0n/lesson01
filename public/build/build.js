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

var _postsRecent = __webpack_require__(2);

var _postsRecent2 = _interopRequireDefault(_postsRecent);

var _singlePage = __webpack_require__(3);

var _singlePage2 = _interopRequireDefault(_singlePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPosts(postList) {
    var outputPosts = [];

    return outputPosts = postList.map(function (post, index) {

        return '<article class="post-content">\n                <h2 class="title">' + post.title + '</h2>\n\n                <p class="text">' + (post.content.substr(0, 130) + "...") + '</p>\n                \n                <a data-content="read-more" href="/posts/' + (index + 1) + '" class="more">Leia Mais</a>\n            </article>\n                        ';
    });
};

(0, _fetch.get)("/posts").then(function (posts) {
    return createPosts(posts);
}).then(function (postArray) {

    var $containerPosts = document.querySelector('[data-content="content-posts"]');
    var $containerMain = document.querySelector('[data-content="main"]');

    $containerPosts.innerHTML = postArray.join('');

    document.querySelectorAll('[data-content="read-more"]').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            $containerPosts.remove();
            $containerMain.innerHTML += (0, _singlePage2.default)();
            //$containerPosts.innerHTML = postArray.map(e => e = "").join('')
        });
    });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fetch = __webpack_require__(0);

function createList(list) {
    var outputList = [];

    var lastFive = list.slice(list.length - 5);

    return outputList = lastFive.map(function (current) {
        return '<li class="latest">' + current.title + '</li>';
    });
}

(0, _fetch.get)("/posts").then(function (listPost) {
    return createList(listPost);
}).then(function (item) {
    var $containerList = document.querySelector('[data-content="list-posts"]');
    $containerList.innerHTML = item.join('');
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return "\n        <section class=\"single-page\">\n    <p class=\"content\"></p>\n    <form action=\"\">\n        <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\"></textarea>\n        <button></button>\n    </form>\n</section>\n";
};

/***/ })
/******/ ]);