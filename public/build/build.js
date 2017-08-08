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

var post = exports.post = function post(url, data) {
    return fetch(url, {
        method: 'post',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)

    }).catch(function (erroSend) {
        console.warn('Erro ao enviar mensagem: ' + erroSend);
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

var _commentsList = __webpack_require__(4);

var _commentsList2 = _interopRequireDefault(_commentsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import errosTypes from './components/errors-list'


function createPosts(postList) {
    var outputPosts = [];

    return outputPosts = postList.map(function (post, index) {

        return '<article class="post-content">\n                <h2 class="title">' + post.title + '</h2>\n\n                <p class="text">' + (post.content.substr(0, 130) + "...") + '</p>\n                \n                <a data-content="read-more" href="/posts/' + post.id + '" class="more">Leia Mais</a>\n            </article>\n                        ';
    });
};

function createContentSingle(local) {

    var $containerMain = document.querySelector('[data-content="main"]');

    $containerMain.innerHTML += '\n    <section class="single-page" data-content="single">\n        <!-- Conte\xFAdo inserido de forma din\xE2mica quando chamado -->\n    </section>';

    var $containerSingle = document.querySelector('[data-content="single"]');

    (0, _fetch.get)(local).then(function (full) {
        $containerSingle.innerHTML += (0, _singlePage2.default)(full);
        return full;
    }).then(function (commentsAll) {
        var $containerComments = document.querySelector('[data-content="user-comment"]');

        (0, _fetch.get)('/posts/' + commentsAll.id + '/comments').then(function (comment) {
            $containerComments.innerHTML = (0, _commentsList2.default)(comment);
        });

        document.forms[0].send.addEventListener("click", function () {
            var COMMENTS_FORM = {
                username: document.forms[0].username.value,
                message: document.forms[0].message.value
            };

            (0, _fetch.post)('/posts/' + commentsAll.id + '/comments', {
                author: COMMENTS_FORM.username,
                content: COMMENTS_FORM.message
            });
        });
    });
}

(0, _fetch.get)("/posts").then(function (posts) {
    return createPosts(posts);
}).then(function (postArray) {

    var $containerPosts = document.querySelector('[data-content="content-posts"]');

    $containerPosts.innerHTML = postArray.join('');

    document.querySelectorAll('[data-content="read-more"]').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            $containerPosts.remove();
            createContentSingle(element.href);
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

exports.default = function (fullPost) {
    return "\n  <h2 class=\"title\">" + fullPost.title + "</h2>\n\n  <p class=\"content\">" + fullPost.content + "</p>\n\n  <span class=\"heading\"><b>Coment\xE1rios:</b></span>\n\n    <div class=\"user-comment\" data-content=\"user-comment\">\n    </div>\n\n<form class=\"comments\" action=\"\">\n    <input required class=\"username\" type=\"text\" name=\"username\" placeholder=\"Insira seu nome\">\n\n    <textarea required placeholder=\"Insira seu coment\xE1rio\" name=\"message\" class=\"message\"></textarea>\n\n    <input type=\"submit\" value=\"Postar seu coment\xE1rio\" class=\"send\" name=\"send\">\n</form>\n\n";
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (comment) {
    var outputComments = [];

    return outputComments = comment.map(function (posted) {
        return '<span class="username">' + posted.author + '</span>\n\n        <p class="comment">' + posted.content + '</p>\n';
    }).join('');
};

var _fetch = __webpack_require__(0);

/***/ })
/******/ ]);