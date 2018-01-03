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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ctx; });
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



/***/ }),
/* 1 */
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
    // event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    // event.preventDefault();
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_cursor__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_keyboard__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_collision__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Player__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Enemy__ = __webpack_require__(7);








let cursor = Object(__WEBPACK_IMPORTED_MODULE_1__library_cursor__["a" /* makeCursor */])();

let pause = false;
let SPACE = Object(__WEBPACK_IMPORTED_MODULE_2__library_keyboard__["a" /* keyboard */])(32);
SPACE.press = () => pause = !pause;

let player = new __WEBPACK_IMPORTED_MODULE_4__Player__["a" /* default */](10, 10, 0.5);
let bullets = [];
let zombies = [];

cursor.click = () => bullets.push(player.shoot(cursor.getPosition(event)));

generateZombies();

function draw() {
  __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width, __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].height);
  
  cursor.draw();
  player.draw();
  zombies.forEach(zombie => zombie.draw());
  bullets.forEach((bullet, index) => bullet.draw());

  if (!pause) {
    player.move();
    moveBullets();
    moveZombies();
    Object(__WEBPACK_IMPORTED_MODULE_3__library_collision__["a" /* collisionDetection */])(bullets, zombies);
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function moveBullets() {
  bullets.forEach((bullet, index) => {
    if (bullet.x > 0 && bullet.x < __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width && bullet.y > 0 && bullet.y < __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width) {
      bullet.move();
      bullet.draw();
    } else {
      bullets.splice(index, 1);
    }
  });
}

function moveZombies() {
  zombies.forEach(zombie => {
    zombie.follow(player);
  });
}

function generateZombies() {
  setInterval(function() {
    if (!pause) {
      let x = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width) + 0;
      let y = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].height) + 0;
      let zombie = new __WEBPACK_IMPORTED_MODULE_5__Enemy__["a" /* default */](x, y, 0.1);
      zombies.push(zombie);
    }
  }, 1000);
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeCursor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


function makeCursor() {
  let cursor = {
    x: 0,
    y: 0,
    draw: function() {
      __WEBPACK_IMPORTED_MODULE_0__canvas__["b" /* ctx */].fillStyle = "#000";
      __WEBPACK_IMPORTED_MODULE_0__canvas__["b" /* ctx */].fillRect(this.x, this.y, 1, 1);
    },
    getPosition: function(e) {
      return getMousePos(__WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* canvas */], e);
    },
    click: undefined,
    clickHandler(event) {
        if (this.click) this.click();
    }
  }

  window.addEventListener(
      'click', cursor.clickHandler.bind(cursor), false  
  );

  window.addEventListener('mousemove', function(e) {
    let pos = getMousePos(__WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* canvas */], e);
    cursor.x = pos.x;
    cursor.y = pos.y;
  });

  return cursor;
}

function  getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect(), // abs. size of element
  scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
  scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = collisionDetection;
function collisionDetection(bullets, zombies) {
  bullets.forEach((bullet, bulletIndex) => {
    zombies.forEach((zombie, zombieIndex) => {
      // https://stackoverflow.com/questions/16792841/detect-if-user-clicks-inside-a-circle
      if ( Math.sqrt((zombie.x-bullet.x)*(zombie.x-bullet.x) + (zombie.y-bullet.y)*(zombie.y-bullet.y)) < 5 ) {
        zombies.splice(zombieIndex, 1);
        bullets.splice(bulletIndex, 1);
      }
    });
  });
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_keyboard__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bullet__ = __webpack_require__(6);




/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = {
      up: false,
      down: false,
      left: false,
      right: false
    }

    let UP = Object(__WEBPACK_IMPORTED_MODULE_1__library_keyboard__["a" /* keyboard */])(87);
    let DOWN = Object(__WEBPACK_IMPORTED_MODULE_1__library_keyboard__["a" /* keyboard */])(83);
    let LEFT = Object(__WEBPACK_IMPORTED_MODULE_1__library_keyboard__["a" /* keyboard */])(65);
    let RIGHT = Object(__WEBPACK_IMPORTED_MODULE_1__library_keyboard__["a" /* keyboard */])(68);

    UP.press = () => this.direction.up = true;
    DOWN.press = () => this.direction.down = true;
    LEFT.press = () => this.direction.left = true;
    RIGHT.press = () => this.direction.right = true;

    UP.release = () => this.direction.up = false;
    DOWN.release = () => this.direction.down = false;
    LEFT.release = () => this.direction.left = false;
    RIGHT.release = () => this.direction.right = false;
  }

  move() {
    if (this.direction.up) this.y -= this.speed;
    if (this.direction.down) this.y += this.speed;
    if (this.direction.right) this.x += this.speed;
    if (this.direction.left) this.x -= this.speed;
  }

  shoot(target) {
    // https://gist.github.com/conorbuck/2606166
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
    let angle = Math.atan2(this.y - target.y, this.x - target.x);
    document.getElementById('shot').play();
    return new __WEBPACK_IMPORTED_MODULE_2__Bullet__["a" /* default */](this.x, this.y, 3, angle);
  }

  draw() {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillStyle = "#000";
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillRect(this.x, this.y, 5, 5);
  }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(0);


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
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillRect(this.x, this.y, 1, 1);
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw() {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillStyle = "#33cc33";
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillRect(this.x, this.y, 5, 5);
  }

  follow(victim) {
    let angle = Math.atan2(this.y - victim.y, this.x - victim.x);
    this.x -= Math.cos(angle) * this.speed;
    this.y -= Math.sin(angle) * this.speed;
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2VmYjMyNjNmNGI1ZTQxNTJkYTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcnkvY2FudmFzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWJyYXJ5L2tleWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9saWJyYXJ5L2N1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlicmFyeS9jb2xsaXNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnVsbGV0LmpzIiwid2VicGFjazovLy8uL3NyYy9FbmVteS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7QUNwQ29CO0FBQ0Q7QUFDRjtBQUNVOztBQUUzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQzs7Ozs7Ozs7O0FDcEVvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQzs7Ozs7Ozs7OztBQ1ZvQjtBQUNIO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7OztBQ25Eb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDbEJvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdlZmIzMjYzZjRiNWU0MTUyZGE3IiwiY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbmV4cG9ydCB7Y2FudmFzLCBjdHh9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYnJhcnkvY2FudmFzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiBrZXlib2FyZChrZXlDb2RlKSB7XG4gIGxldCBrZXkgPSB7fTtcbiAga2V5LmNvZGUgPSBrZXlDb2RlO1xuICBrZXkuaXNEb3duID0gZmFsc2U7XG4gIGtleS5pc1VwID0gdHJ1ZTtcbiAga2V5LnByZXNzID0gdW5kZWZpbmVkO1xuICBrZXkucmVsZWFzZSA9IHVuZGVmaW5lZDtcbiAgLy9UaGUgYGRvd25IYW5kbGVyYFxuICBrZXkuZG93bkhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBrZXkuY29kZSkge1xuICAgICAgaWYgKGtleS5pc1VwICYmIGtleS5wcmVzcykga2V5LnByZXNzKCk7XG4gICAgICBrZXkuaXNEb3duID0gdHJ1ZTtcbiAgICAgIGtleS5pc1VwID0gZmFsc2U7XG4gICAgfVxuICAvL1ByZXZlbnQgdGhlIGV2ZW50J3MgZGVmYXVsdCBiZWhhdmlvciAvLyhzdWNoIGFzIGJyb3dzZXIgd2luZG93IHNjcm9sbGluZylcbiAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIC8vVGhlIGB1cEhhbmRsZXJgXG4gIGtleS51cEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBrZXkuY29kZSkge1xuICAgICAgaWYgKGtleS5pc0Rvd24gJiYga2V5LnJlbGVhc2UpIGtleS5yZWxlYXNlKCk7XG4gICAgICBrZXkuaXNEb3duID0gZmFsc2U7XG4gICAgICBrZXkuaXNVcCA9IHRydWU7XG4gICAgfVxuICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG4gIC8vQXR0YWNoIGV2ZW50IGxpc3RlbmVyc1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImtleWRvd25cIiwga2V5LmRvd25IYW5kbGVyLmJpbmQoa2V5KSwgZmFsc2VcbiAgKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJrZXl1cFwiLCBrZXkudXBIYW5kbGVyLmJpbmQoa2V5KSwgZmFsc2VcbiAgKTtcbiAgLy9SZXR1cm4gdGhlIGBrZXlgIG9iamVjdFxuICByZXR1cm4ga2V5OyBcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWJyYXJ5L2tleWJvYXJkLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y2FudmFzLCBjdHh9IGZyb20gJy4vbGlicmFyeS9jYW52YXMnO1xuaW1wb3J0IHttYWtlQ3Vyc29yfSBmcm9tICcuL2xpYnJhcnkvY3Vyc29yJztcbmltcG9ydCB7a2V5Ym9hcmR9IGZyb20gJy4vbGlicmFyeS9rZXlib2FyZCc7XG5pbXBvcnQge2NvbGxpc2lvbkRldGVjdGlvbn0gZnJvbSAnLi9saWJyYXJ5L2NvbGxpc2lvbic7XG5cbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXknO1xuXG5sZXQgY3Vyc29yID0gbWFrZUN1cnNvcigpO1xuXG5sZXQgcGF1c2UgPSBmYWxzZTtcbmxldCBTUEFDRSA9IGtleWJvYXJkKDMyKTtcblNQQUNFLnByZXNzID0gKCkgPT4gcGF1c2UgPSAhcGF1c2U7XG5cbmxldCBwbGF5ZXIgPSBuZXcgUGxheWVyKDEwLCAxMCwgMC41KTtcbmxldCBidWxsZXRzID0gW107XG5sZXQgem9tYmllcyA9IFtdO1xuXG5jdXJzb3IuY2xpY2sgPSAoKSA9PiBidWxsZXRzLnB1c2gocGxheWVyLnNob290KGN1cnNvci5nZXRQb3NpdGlvbihldmVudCkpKTtcblxuZ2VuZXJhdGVab21iaWVzKCk7XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgXG4gIGN1cnNvci5kcmF3KCk7XG4gIHBsYXllci5kcmF3KCk7XG4gIHpvbWJpZXMuZm9yRWFjaCh6b21iaWUgPT4gem9tYmllLmRyYXcoKSk7XG4gIGJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0LCBpbmRleCkgPT4gYnVsbGV0LmRyYXcoKSk7XG5cbiAgaWYgKCFwYXVzZSkge1xuICAgIHBsYXllci5tb3ZlKCk7XG4gICAgbW92ZUJ1bGxldHMoKTtcbiAgICBtb3ZlWm9tYmllcygpO1xuICAgIGNvbGxpc2lvbkRldGVjdGlvbihidWxsZXRzLCB6b21iaWVzKTtcbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuXG5mdW5jdGlvbiBtb3ZlQnVsbGV0cygpIHtcbiAgYnVsbGV0cy5mb3JFYWNoKChidWxsZXQsIGluZGV4KSA9PiB7XG4gICAgaWYgKGJ1bGxldC54ID4gMCAmJiBidWxsZXQueCA8IGNhbnZhcy53aWR0aCAmJiBidWxsZXQueSA+IDAgJiYgYnVsbGV0LnkgPCBjYW52YXMud2lkdGgpIHtcbiAgICAgIGJ1bGxldC5tb3ZlKCk7XG4gICAgICBidWxsZXQuZHJhdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWxsZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gbW92ZVpvbWJpZXMoKSB7XG4gIHpvbWJpZXMuZm9yRWFjaCh6b21iaWUgPT4ge1xuICAgIHpvbWJpZS5mb2xsb3cocGxheWVyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlWm9tYmllcygpIHtcbiAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFwYXVzZSkge1xuICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjYW52YXMud2lkdGgpICsgMDtcbiAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodCkgKyAwO1xuICAgICAgbGV0IHpvbWJpZSA9IG5ldyBFbmVteSh4LCB5LCAwLjEpO1xuICAgICAgem9tYmllcy5wdXNoKHpvbWJpZSk7XG4gICAgfVxuICB9LCAxMDAwKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y2FudmFzLCBjdHh9IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VDdXJzb3IoKSB7XG4gIGxldCBjdXJzb3IgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIGRyYXc6IGZ1bmN0aW9uKCkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCAxLCAxKTtcbiAgICB9LFxuICAgIGdldFBvc2l0aW9uOiBmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZ2V0TW91c2VQb3MoY2FudmFzLCBlKTtcbiAgICB9LFxuICAgIGNsaWNrOiB1bmRlZmluZWQsXG4gICAgY2xpY2tIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNsaWNrKSB0aGlzLmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLCBjdXJzb3IuY2xpY2tIYW5kbGVyLmJpbmQoY3Vyc29yKSwgZmFsc2UgIFxuICApO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgbGV0IHBvcyA9IGdldE1vdXNlUG9zKGNhbnZhcywgZSk7XG4gICAgY3Vyc29yLnggPSBwb3MueDtcbiAgICBjdXJzb3IueSA9IHBvcy55O1xuICB9KTtcblxuICByZXR1cm4gY3Vyc29yO1xufVxuXG5mdW5jdGlvbiAgZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcbiAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIC8vIGFicy4gc2l6ZSBvZiBlbGVtZW50XG4gIHNjYWxlWCA9IGNhbnZhcy53aWR0aCAvIHJlY3Qud2lkdGgsICAgIC8vIHJlbGF0aW9uc2hpcCBiaXRtYXAgdnMuIGVsZW1lbnQgZm9yIFhcbiAgc2NhbGVZID0gY2FudmFzLmhlaWdodCAvIHJlY3QuaGVpZ2h0OyAgLy8gcmVsYXRpb25zaGlwIGJpdG1hcCB2cy4gZWxlbWVudCBmb3IgWVxuXG4gIHJldHVybiB7XG4gICAgeDogKGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0KSAqIHNjYWxlWCwgICAvLyBzY2FsZSBtb3VzZSBjb29yZGluYXRlcyBhZnRlciB0aGV5IGhhdmVcbiAgICB5OiAoZXZ0LmNsaWVudFkgLSByZWN0LnRvcCkgKiBzY2FsZVkgICAgIC8vIGJlZW4gYWRqdXN0ZWQgdG8gYmUgcmVsYXRpdmUgdG8gZWxlbWVudFxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGlicmFyeS9jdXJzb3IuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdGlvbihidWxsZXRzLCB6b21iaWVzKSB7XG4gIGJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0LCBidWxsZXRJbmRleCkgPT4ge1xuICAgIHpvbWJpZXMuZm9yRWFjaCgoem9tYmllLCB6b21iaWVJbmRleCkgPT4ge1xuICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY3OTI4NDEvZGV0ZWN0LWlmLXVzZXItY2xpY2tzLWluc2lkZS1hLWNpcmNsZVxuICAgICAgaWYgKCBNYXRoLnNxcnQoKHpvbWJpZS54LWJ1bGxldC54KSooem9tYmllLngtYnVsbGV0LngpICsgKHpvbWJpZS55LWJ1bGxldC55KSooem9tYmllLnktYnVsbGV0LnkpKSA8IDUgKSB7XG4gICAgICAgIHpvbWJpZXMuc3BsaWNlKHpvbWJpZUluZGV4LCAxKTtcbiAgICAgICAgYnVsbGV0cy5zcGxpY2UoYnVsbGV0SW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWJyYXJ5L2NvbGxpc2lvbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2xpYnJhcnkvY2FudmFzJztcbmltcG9ydCB7a2V5Ym9hcmR9IGZyb20gJy4vbGlicmFyeS9rZXlib2FyZCc7XG5pbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBzcGVlZCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSB7XG4gICAgICB1cDogZmFsc2UsXG4gICAgICBkb3duOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlXG4gICAgfVxuXG4gICAgbGV0IFVQID0ga2V5Ym9hcmQoODcpO1xuICAgIGxldCBET1dOID0ga2V5Ym9hcmQoODMpO1xuICAgIGxldCBMRUZUID0ga2V5Ym9hcmQoNjUpO1xuICAgIGxldCBSSUdIVCA9IGtleWJvYXJkKDY4KTtcblxuICAgIFVQLnByZXNzID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24udXAgPSB0cnVlO1xuICAgIERPV04ucHJlc3MgPSAoKSA9PiB0aGlzLmRpcmVjdGlvbi5kb3duID0gdHJ1ZTtcbiAgICBMRUZULnByZXNzID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24ubGVmdCA9IHRydWU7XG4gICAgUklHSFQucHJlc3MgPSAoKSA9PiB0aGlzLmRpcmVjdGlvbi5yaWdodCA9IHRydWU7XG5cbiAgICBVUC5yZWxlYXNlID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24udXAgPSBmYWxzZTtcbiAgICBET1dOLnJlbGVhc2UgPSAoKSA9PiB0aGlzLmRpcmVjdGlvbi5kb3duID0gZmFsc2U7XG4gICAgTEVGVC5yZWxlYXNlID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24ubGVmdCA9IGZhbHNlO1xuICAgIFJJR0hULnJlbGVhc2UgPSAoKSA9PiB0aGlzLmRpcmVjdGlvbi5yaWdodCA9IGZhbHNlO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24udXApIHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuICAgIGlmICh0aGlzLmRpcmVjdGlvbi5kb3duKSB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24ucmlnaHQpIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIGlmICh0aGlzLmRpcmVjdGlvbi5sZWZ0KSB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgfVxuXG4gIHNob290KHRhcmdldCkge1xuICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2Nvbm9yYnVjay8yNjA2MTY2XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWF0aC9hdGFuMlxuICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy55IC0gdGFyZ2V0LnksIHRoaXMueCAtIHRhcmdldC54KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdCcpLnBsYXkoKTtcbiAgICByZXR1cm4gbmV3IEJ1bGxldCh0aGlzLngsIHRoaXMueSwgMywgYW5nbGUpO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCA1LCA1KTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2xpYnJhcnkvY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBzcGVlZCwgYW5nbGUpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgdGhpcy54IC09IE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZDtcbiAgICB0aGlzLnkgLT0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICBjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIDEsIDEpO1xuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQnVsbGV0LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y2FudmFzLCBjdHh9IGZyb20gJy4vbGlicmFyeS9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHNwZWVkKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzMzY2MzM1wiO1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgNSwgNSk7XG4gIH1cblxuICBmb2xsb3codmljdGltKSB7XG4gICAgbGV0IGFuZ2xlID0gTWF0aC5hdGFuMih0aGlzLnkgLSB2aWN0aW0ueSwgdGhpcy54IC0gdmljdGltLngpO1xuICAgIHRoaXMueCAtPSBNYXRoLmNvcyhhbmdsZSkgKiB0aGlzLnNwZWVkO1xuICAgIHRoaXMueSAtPSBNYXRoLnNpbihhbmdsZSkgKiB0aGlzLnNwZWVkO1xuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvRW5lbXkuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==