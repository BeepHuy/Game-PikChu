/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/App.ts":
/*!*****************************!*\
  !*** ./src/frontend/App.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _controllers_GameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/GameController */ "./src/frontend/controllers/GameController.ts");
/* harmony import */ var _models_GameItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/GameItem */ "./src/frontend/models/GameItem.ts");


const rootElement = document.querySelector('#app');
var gameApp = null;
if (rootElement) {
    gameApp = new _controllers_GameController__WEBPACK_IMPORTED_MODULE_0__.GameController([
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(1, '', '1.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(1, '', '2.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(3, '', '3.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(4, '', '4.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(5, '', '5.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(6, '', '6.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(7, '', '7.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(8, '', '8.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(9, '', '9.png'),
        new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(10, '', '10.png'),
    ], rootElement);
    gameApp.renderGameBoard();
}


/***/ }),

/***/ "./src/frontend/controllers/GameController.ts":
/*!****************************************************!*\
  !*** ./src/frontend/controllers/GameController.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameController": () => (/* binding */ GameController)
/* harmony export */ });
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/esm/index.js");
/* harmony import */ var _models_GameItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/GameItem */ "./src/frontend/models/GameItem.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class GameController {
    constructor(items, element) {
        this.element = element;
        this.items = []; // lưu danh sach game
        this.initGame(items);
    }
    // gán các thành phần o game
    initGame(initData) {
        for (const item of initData) {
            this.items.push(item);
            this.items.push(new _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItem(item.id, item.divId, item.image));
        }
        let id = 1;
        this.items.forEach(it => {
            it.status = _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Close;
            it.divId = 'd' + id;
            id++;
        });
    }
    // (gọi) khi reset game
    reinitGame() {
        this.items.forEach(item => {
            item.status = _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Close;
            item.isMatched = false;
        });
        this.shuffle();
    }
    // Check xem người dùng thắng game hay ko
    isWinGame() {
        return this.items.filter(item => item.status === _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Open).length === this.items.length;
    }
    // Hiên thị giao diện web
    renderHTML(rootElement, item) {
        // <div class="col-2 gameItem m-2 p1 text-center">
        //     <img src="images/1.png" alt="" class="img-fluid">
        // </div>
        const divItem = document.createElement('div');
        divItem.className = 'col-2 gameItem m-2 p1 text-center';
        divItem.id = item.divId;
        divItem.addEventListener('click', this.processGameItemClicked);
        const imgItem = document.createElement('img');
        imgItem.src = `images/${item.image}`;
        imgItem.className = 'img-fluid invisible';
        item.imageElement = imgItem;
        divItem.appendChild(imgItem);
        rootElement.appendChild(divItem);
    }
    renderResetButton(rooElement) {
        let button = rooElement.querySelector('button#reset');
        if (button) {
            button.addEventListener('click', this.processResetButtonClicked);
        }
    }
    // Show all o game
    renderGameBoard() {
        this.shuffle();
        let boardDiv = this.element.querySelector('#board');
        if (boardDiv) {
            this.items.forEach(it => {
                this.renderHTML(boardDiv, it);
            });
        }
        this.renderResetButton(this.element);
    }
    // kiểm tra sự trùng lặp các thành phần trong Game
    isMatched(id, imgElement) {
        let openedItems = this.items.filter(item => {
            if (item.status === _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Open && !item.isMatched) {
                return item;
            }
        });
        if (openedItems.length == 2) {
            let checkMatchedFilter = openedItems.filter(item => item.id == id);
            if (checkMatchedFilter.length < 2) {
                openedItems.forEach(item => {
                    this.changeMatchedBackgroud(item.imageElement, false);
                });
                setTimeout(() => openedItems.forEach(item => {
                    if (item.imageElement) {
                        item.imageElement.className = 'img-fluid invisible';
                        item.status = _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Close;
                        item.isMatched = false;
                        this.changeMatchedBackgroud(item.imageElement);
                    }
                }), 500);
            }
            else {
                openedItems.forEach(item => {
                    item.isMatched = true;
                    this.changeMatchedBackgroud(item.imageElement);
                });
                return true;
            }
        }
        return false;
    }
    // thay đổi màu nền
    changeMatchedBackgroud(imaElement, isMatched = true) {
        if (imaElement === null || imaElement === void 0 ? void 0 : imaElement.parentElement) {
            if (isMatched) {
                imaElement.parentElement.className = 'col-2 gameItem m-1 p-1 text-center';
            }
            else {
                imaElement.parentElement.className =
                    'col-2 gameItem m-1 p-1 text-center unmatched';
            }
        }
    }
    processGameItemClicked(event) {
        let element = event.target;
        if (element.tagName === 'img') {
            element = element.parentElement;
        }
        for (const item of this.items) {
            if (item.divId == (element === null || element === void 0 ? void 0 : element.id) && !item.isMatched
                && item.status === _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Close) {
                item.status = _models_GameItem__WEBPACK_IMPORTED_MODULE_1__.GameItemStatus.Open;
                let imgElement = element.querySelector('img');
                if (imgElement) {
                    imgElement.className = 'img-fluid visible';
                    this.isMatched(item.id, imgElement);
                }
            }
        }
    }
    processResetButtonClicked(event) {
        this.reinitGame();
        const boardElement = document.querySelector('#board');
        boardElement.innerHTML = '';
        this.renderGameBoard();
    }
    shuffle() {
        this.items = lodash__WEBPACK_IMPORTED_MODULE_2___default().shuffle(this.items);
    }
}
__decorate([
    autobind_decorator__WEBPACK_IMPORTED_MODULE_0__["default"]
], GameController.prototype, "processGameItemClicked", null);
__decorate([
    autobind_decorator__WEBPACK_IMPORTED_MODULE_0__["default"]
], GameController.prototype, "processResetButtonClicked", null);


/***/ }),

/***/ "./src/frontend/models/GameItem.ts":
/*!*****************************************!*\
  !*** ./src/frontend/models/GameItem.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameItem": () => (/* binding */ GameItem),
/* harmony export */   "GameItemStatus": () => (/* binding */ GameItemStatus)
/* harmony export */ });
var GameItemStatus;
(function (GameItemStatus) {
    GameItemStatus[GameItemStatus["Open"] = 0] = "Open";
    GameItemStatus[GameItemStatus["Close"] = 1] = "Close";
})(GameItemStatus || (GameItemStatus = {}));
class GameItem {
    constructor(id, divId, image, status = GameItemStatus.Close, isMatched = false, imageElement = null) {
        this.id = id;
        this.divId = divId;
        this.image = image;
        this.status = status;
        this.isMatched = isMatched;
        this.imageElement = imageElement;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkpd05505_assingment_typescript"] = self["webpackChunkpd05505_assingment_typescript"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_autobind-decorator_lib_esm_index_js-node_modules_lodash_lodash_js"], () => (__webpack_require__("./src/frontend/App.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map