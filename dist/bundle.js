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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_keyboard__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_collision__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Enemy__ = __webpack_require__(4);







let player = new __WEBPACK_IMPORTED_MODULE_3__Player__["a" /* default */](100, 100, '😲', 3);
let bullets = [];
let zombies = [];

let UP = Object(__WEBPACK_IMPORTED_MODULE_1__library_keyboard__["a" /* keyboard */])(87);
let DOWN = Object(__WEBPACK_IMPORTED_MODULE_1__library_keyboard__["a" /* keyboard */])(83);
let LEFT = Object(__WEBPACK_IMPORTED_MODULE_1__library_keyboard__["a" /* keyboard */])(65);
let RIGHT = Object(__WEBPACK_IMPORTED_MODULE_1__library_keyboard__["a" /* keyboard */])(68);

UP.press = () => player.move('UP');
DOWN.press = () => player.move('DOWN');
LEFT.press = () => player.move('LEFT');
RIGHT.press = () => player.move('RIGHT');

__WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].addEventListener('mousedown', function(event) {
  let target = {x: event.x, y: event.y};
  bullets.push(player.shoot(target));
});

setInterval(function() {
  // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  let x = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width) + 0;
  let y = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].height) + 0;
  let zombie = new __WEBPACK_IMPORTED_MODULE_4__Enemy__["a" /* default */](x, y, '🧟', 1);
  zombies.push(zombie);
}, 1000);

function draw() {
  __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].clearRect(0, 0, window.innerWidth, window.innerHeight);

  bullets.forEach((bullet, index) => {
    if (bullet.x > 0 && bullet.x < __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width && bullet.y > 0 && bullet.y < __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width) {
      bullet.move();
      bullet.draw();
    } else {
      bullets.splice(index, 1);
    }
  });

  zombies.forEach(zombie => {
    zombie.follow(player);
    zombie.draw();
  });

  Object(__WEBPACK_IMPORTED_MODULE_2__library_collision__["a" /* collisionDetection */])(bullets, zombies);

  player.move();
  player.draw();
  
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bullet__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor(x, y, emoji, speed) {
    this.x = x;
    this.y = y;
    this.emoji = emoji;
    this.speed = speed;
  }

  move(direction) {
    switch (direction) {
      case 'LEFT':
        this.x -= this.speed;
        break;
      case 'RIGHT':
        this.x += this.speed;
        break;
      case 'UP':
        this.y -= this.speed;
        break;
      case 'DOWN':
        this.y += this.speed;
        break;
    }
  }

  shoot(target) {
    // https://gist.github.com/conorbuck/2606166
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
    let angle = Math.atan2(this.y - target.y, this.x - target.x);
    document.getElementById('shot').play();
    return new __WEBPACK_IMPORTED_MODULE_1__Bullet__["a" /* default */](this.x, this.y, 20, angle);
  }

  draw() {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].font = '40px Mono';
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillText(this.emoji, this.x, this.y);
  }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(6);


/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor(x, y, speed, angle) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
  }

  move() {
    this.x -= Math.cos(this.angle) * this.speed;
    this.y -= Math.sin(this.angle) * this.speed;
  }

  draw() {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillRect(this.x, this.y, 3, 3);
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(6);


/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor(x, y, emoji, speed) {
    this.x = x;
    this.y = y;
    this.emoji = emoji;
    this.speed = speed;
  }

  draw() {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].font = '40px Mono';
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillText(this.emoji, this.x, this.y);
  }

  follow(victim) {
    let angle = Math.atan2(this.y - victim.y, this.x - victim.x);
    this.x -= Math.cos(angle) * this.speed;
    this.y -= Math.sin(angle) * this.speed;
  }
});

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ctx; });
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
canvas.getContext('2d').scale(2,2);

const ctx = canvas.getContext('2d');



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = keyboard;
function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
  //Prevent the event's default behavior //(such as browser window scrolling)
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };
  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  //Return the `key` object
  return key; 
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = collisionDetection;
function collisionDetection(bullets, zombies) {
  bullets.forEach((bullet, bulletIndex) => {
    zombies.forEach((zombie, zombieIndex) => {
      // https://stackoverflow.com/questions/16792841/detect-if-user-clicks-inside-a-circle
      if ( Math.sqrt((zombie.x-bullet.x)*(zombie.x-bullet.x) + (zombie.y-bullet.y)*(zombie.y-bullet.y)) < 40 ) {
        zombies.splice(zombieIndex, 1);
        bullets.splice(bulletIndex, 1);
      }
    });
  });
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGU1YzYwMTA2NTE1N2ZlOGQyMTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnVsbGV0LmpzIiwid2VicGFjazovLy8uL3NyYy9FbmVteS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlicmFyeS9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcnkva2V5Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcnkvY29sbGlzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0RvQjtBQUNIO0FBQ1U7O0FBRTNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNEI7Ozs7Ozs7OztBQzNEb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7OztBQ3hDb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDbEJvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7OztBQ3BCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGE7QUFDQSxDOzs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDRlNWM2MDEwNjUxNTdmZThkMjE5IiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9saWJyYXJ5L2NhbnZhcyc7XG5pbXBvcnQge2tleWJvYXJkfSBmcm9tICcuL2xpYnJhcnkva2V5Ym9hcmQnO1xuaW1wb3J0IHtjb2xsaXNpb25EZXRlY3Rpb259IGZyb20gJy4vbGlicmFyeS9jb2xsaXNpb24nO1xuXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcbmltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15JztcblxubGV0IHBsYXllciA9IG5ldyBQbGF5ZXIoMTAwLCAxMDAsICfwn5iyJywgMyk7XG5sZXQgYnVsbGV0cyA9IFtdO1xubGV0IHpvbWJpZXMgPSBbXTtcblxubGV0IFVQID0ga2V5Ym9hcmQoODcpO1xubGV0IERPV04gPSBrZXlib2FyZCg4Myk7XG5sZXQgTEVGVCA9IGtleWJvYXJkKDY1KTtcbmxldCBSSUdIVCA9IGtleWJvYXJkKDY4KTtcblxuVVAucHJlc3MgPSAoKSA9PiBwbGF5ZXIubW92ZSgnVVAnKTtcbkRPV04ucHJlc3MgPSAoKSA9PiBwbGF5ZXIubW92ZSgnRE9XTicpO1xuTEVGVC5wcmVzcyA9ICgpID0+IHBsYXllci5tb3ZlKCdMRUZUJyk7XG5SSUdIVC5wcmVzcyA9ICgpID0+IHBsYXllci5tb3ZlKCdSSUdIVCcpO1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IHRhcmdldCA9IHt4OiBldmVudC54LCB5OiBldmVudC55fTtcbiAgYnVsbGV0cy5wdXNoKHBsYXllci5zaG9vdCh0YXJnZXQpKTtcbn0pO1xuXG5zZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk1OTk3NS9nZW5lcmF0ZS1yYW5kb20tbnVtYmVyLWJldHdlZW4tdHdvLW51bWJlcnMtaW4tamF2YXNjcmlwdFxuICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCkgKyAwO1xuICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy5oZWlnaHQpICsgMDtcbiAgbGV0IHpvbWJpZSA9IG5ldyBFbmVteSh4LCB5LCAn8J+nnycsIDEpO1xuICB6b21iaWVzLnB1c2goem9tYmllKTtcbn0sIDEwMDApO1xuXG5mdW5jdGlvbiBkcmF3KCkge1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIGJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0LCBpbmRleCkgPT4ge1xuICAgIGlmIChidWxsZXQueCA+IDAgJiYgYnVsbGV0LnggPCBjYW52YXMud2lkdGggJiYgYnVsbGV0LnkgPiAwICYmIGJ1bGxldC55IDwgY2FudmFzLndpZHRoKSB7XG4gICAgICBidWxsZXQubW92ZSgpO1xuICAgICAgYnVsbGV0LmRyYXcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVsbGV0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSk7XG5cbiAgem9tYmllcy5mb3JFYWNoKHpvbWJpZSA9PiB7XG4gICAgem9tYmllLmZvbGxvdyhwbGF5ZXIpO1xuICAgIHpvbWJpZS5kcmF3KCk7XG4gIH0pO1xuXG4gIGNvbGxpc2lvbkRldGVjdGlvbihidWxsZXRzLCB6b21iaWVzKTtcblxuICBwbGF5ZXIubW92ZSgpO1xuICBwbGF5ZXIuZHJhdygpO1xuICBcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xufVxuXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2xpYnJhcnkvY2FudmFzJztcbmltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGVtb2ppLCBzcGVlZCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmVtb2ppID0gZW1vamk7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICB9XG5cbiAgbW92ZShkaXJlY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSAnTEVGVCc6XG4gICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1JJR0hUJzpcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVVAnOlxuICAgICAgICB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdET1dOJzpcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNob290KHRhcmdldCkge1xuICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2Nvbm9yYnVjay8yNjA2MTY2XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWF0aC9hdGFuMlxuICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy55IC0gdGFyZ2V0LnksIHRoaXMueCAtIHRhcmdldC54KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdCcpLnBsYXkoKTtcbiAgICByZXR1cm4gbmV3IEJ1bGxldCh0aGlzLngsIHRoaXMueSwgMjAsIGFuZ2xlKTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgY3R4LmZvbnQgPSAnNDBweCBNb25vJztcbiAgICBjdHguZmlsbFRleHQodGhpcy5lbW9qaSwgdGhpcy54LCB0aGlzLnkpO1xuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvUGxheWVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y2FudmFzLCBjdHh9IGZyb20gJy4vbGlicmFyeS9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHNwZWVkLCBhbmdsZSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgICB0aGlzLnggLT0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkO1xuICAgIHRoaXMueSAtPSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgMywgMyk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9CdWxsZXQuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9saWJyYXJ5L2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgZW1vamksIHNwZWVkKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZW1vamkgPSBlbW9qaTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIGN0eC5mb250ID0gJzQwcHggTW9ubyc7XG4gICAgY3R4LmZpbGxUZXh0KHRoaXMuZW1vamksIHRoaXMueCwgdGhpcy55KTtcbiAgfVxuXG4gIGZvbGxvdyh2aWN0aW0pIHtcbiAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMueSAtIHZpY3RpbS55LCB0aGlzLnggLSB2aWN0aW0ueCk7XG4gICAgdGhpcy54IC09IE1hdGguY29zKGFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gICAgdGhpcy55IC09IE1hdGguc2luKGFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9FbmVteS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIDI7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogMjtcbmNhbnZhcy5zdHlsZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JztcbmNhbnZhcy5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnO1xuY2FudmFzLmdldENvbnRleHQoJzJkJykuc2NhbGUoMiwyKTtcblxuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbmV4cG9ydCB7Y2FudmFzLCBjdHh9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYnJhcnkvY2FudmFzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiBrZXlib2FyZChrZXlDb2RlKSB7XG4gIGxldCBrZXkgPSB7fTtcbiAga2V5LmNvZGUgPSBrZXlDb2RlO1xuICBrZXkuaXNEb3duID0gZmFsc2U7XG4gIGtleS5pc1VwID0gdHJ1ZTtcbiAga2V5LnByZXNzID0gdW5kZWZpbmVkO1xuICBrZXkucmVsZWFzZSA9IHVuZGVmaW5lZDtcbiAgLy9UaGUgYGRvd25IYW5kbGVyYFxuICBrZXkuZG93bkhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBrZXkuY29kZSkge1xuICAgICAgaWYgKGtleS5pc1VwICYmIGtleS5wcmVzcykga2V5LnByZXNzKCk7XG4gICAgICBrZXkuaXNEb3duID0gdHJ1ZTtcbiAgICAgIGtleS5pc1VwID0gZmFsc2U7XG4gICAgfVxuICAvL1ByZXZlbnQgdGhlIGV2ZW50J3MgZGVmYXVsdCBiZWhhdmlvciAvLyhzdWNoIGFzIGJyb3dzZXIgd2luZG93IHNjcm9sbGluZylcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIC8vVGhlIGB1cEhhbmRsZXJgXG4gIGtleS51cEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBrZXkuY29kZSkge1xuICAgICAgaWYgKGtleS5pc0Rvd24gJiYga2V5LnJlbGVhc2UpIGtleS5yZWxlYXNlKCk7XG4gICAgICBrZXkuaXNEb3duID0gZmFsc2U7XG4gICAgICBrZXkuaXNVcCA9IHRydWU7XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG4gIC8vQXR0YWNoIGV2ZW50IGxpc3RlbmVyc1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImtleWRvd25cIiwga2V5LmRvd25IYW5kbGVyLmJpbmQoa2V5KSwgZmFsc2VcbiAgKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJrZXl1cFwiLCBrZXkudXBIYW5kbGVyLmJpbmQoa2V5KSwgZmFsc2VcbiAgKTtcbiAgLy9SZXR1cm4gdGhlIGBrZXlgIG9iamVjdFxuICByZXR1cm4ga2V5OyBcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWJyYXJ5L2tleWJvYXJkLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb25EZXRlY3Rpb24oYnVsbGV0cywgem9tYmllcykge1xuICBidWxsZXRzLmZvckVhY2goKGJ1bGxldCwgYnVsbGV0SW5kZXgpID0+IHtcbiAgICB6b21iaWVzLmZvckVhY2goKHpvbWJpZSwgem9tYmllSW5kZXgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2NzkyODQxL2RldGVjdC1pZi11c2VyLWNsaWNrcy1pbnNpZGUtYS1jaXJjbGVcbiAgICAgIGlmICggTWF0aC5zcXJ0KCh6b21iaWUueC1idWxsZXQueCkqKHpvbWJpZS54LWJ1bGxldC54KSArICh6b21iaWUueS1idWxsZXQueSkqKHpvbWJpZS55LWJ1bGxldC55KSkgPCA0MCApIHtcbiAgICAgICAgem9tYmllcy5zcGxpY2Uoem9tYmllSW5kZXgsIDEpO1xuICAgICAgICBidWxsZXRzLnNwbGljZShidWxsZXRJbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYnJhcnkvY29sbGlzaW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=