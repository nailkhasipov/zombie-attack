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
SPACE.press = () => {pause = !pause};

let player = new __WEBPACK_IMPORTED_MODULE_4__Player__["a" /* default */](10, 10, 0.5);
let bullets = [];
let zombies = [];

cursor.click = function() {
  let target = cursor.getPosition(event);
  bullets.push(player.shoot(target));
}

generateZombies();

function draw() {
  if (!pause) {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width, __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].height);

    cursor.draw();
    drawBullets();
    drawZombies();
    Object(__WEBPACK_IMPORTED_MODULE_3__library_collision__["a" /* collisionDetection */])(bullets, zombies);

    player.move();
    player.draw();
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function drawBullets() {
  bullets.forEach((bullet, index) => {
    if (bullet.x > 0 && bullet.x < __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width && bullet.y > 0 && bullet.y < __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width) {
      bullet.move();
      bullet.draw();
    } else {
      bullets.splice(index, 1);
    }
  });
}


function drawZombies() {
  zombies.forEach(zombie => {
    zombie.follow(player);
    zombie.draw();
  });
}

function generateZombies() {
  setInterval(function() {
    let x = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width) + 0;
    let y = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].height) + 0;
    let zombie = new __WEBPACK_IMPORTED_MODULE_5__Enemy__["a" /* default */](x, y, 0.1);
    zombies.push(zombie);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDZlNTYxNzcwNjczMzFlOGE3MDgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcnkvY2FudmFzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWJyYXJ5L2tleWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9saWJyYXJ5L2N1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlicmFyeS9jb2xsaXNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnVsbGV0LmpzIiwid2VicGFjazovLy8uL3NyYy9FbmVteS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7QUNwQ29CO0FBQ0Q7QUFDRjtBQUNVOztBQUUzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQzs7Ozs7Ozs7O0FDckVvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQzs7Ozs7Ozs7OztBQ1ZvQjtBQUNIO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7OztBQ25Eb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDbEJvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ2ZTU2MTc3MDY3MzMxZThhNzA4IiwiY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbmV4cG9ydCB7Y2FudmFzLCBjdHh9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYnJhcnkvY2FudmFzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiBrZXlib2FyZChrZXlDb2RlKSB7XG4gIGxldCBrZXkgPSB7fTtcbiAga2V5LmNvZGUgPSBrZXlDb2RlO1xuICBrZXkuaXNEb3duID0gZmFsc2U7XG4gIGtleS5pc1VwID0gdHJ1ZTtcbiAga2V5LnByZXNzID0gdW5kZWZpbmVkO1xuICBrZXkucmVsZWFzZSA9IHVuZGVmaW5lZDtcbiAgLy9UaGUgYGRvd25IYW5kbGVyYFxuICBrZXkuZG93bkhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBrZXkuY29kZSkge1xuICAgICAgaWYgKGtleS5pc1VwICYmIGtleS5wcmVzcykga2V5LnByZXNzKCk7XG4gICAgICBrZXkuaXNEb3duID0gdHJ1ZTtcbiAgICAgIGtleS5pc1VwID0gZmFsc2U7XG4gICAgfVxuICAvL1ByZXZlbnQgdGhlIGV2ZW50J3MgZGVmYXVsdCBiZWhhdmlvciAvLyhzdWNoIGFzIGJyb3dzZXIgd2luZG93IHNjcm9sbGluZylcbiAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIC8vVGhlIGB1cEhhbmRsZXJgXG4gIGtleS51cEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBrZXkuY29kZSkge1xuICAgICAgaWYgKGtleS5pc0Rvd24gJiYga2V5LnJlbGVhc2UpIGtleS5yZWxlYXNlKCk7XG4gICAgICBrZXkuaXNEb3duID0gZmFsc2U7XG4gICAgICBrZXkuaXNVcCA9IHRydWU7XG4gICAgfVxuICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG4gIC8vQXR0YWNoIGV2ZW50IGxpc3RlbmVyc1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImtleWRvd25cIiwga2V5LmRvd25IYW5kbGVyLmJpbmQoa2V5KSwgZmFsc2VcbiAgKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJrZXl1cFwiLCBrZXkudXBIYW5kbGVyLmJpbmQoa2V5KSwgZmFsc2VcbiAgKTtcbiAgLy9SZXR1cm4gdGhlIGBrZXlgIG9iamVjdFxuICByZXR1cm4ga2V5OyBcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWJyYXJ5L2tleWJvYXJkLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y2FudmFzLCBjdHh9IGZyb20gJy4vbGlicmFyeS9jYW52YXMnO1xuaW1wb3J0IHttYWtlQ3Vyc29yfSBmcm9tICcuL2xpYnJhcnkvY3Vyc29yJztcbmltcG9ydCB7a2V5Ym9hcmR9IGZyb20gJy4vbGlicmFyeS9rZXlib2FyZCc7XG5pbXBvcnQge2NvbGxpc2lvbkRldGVjdGlvbn0gZnJvbSAnLi9saWJyYXJ5L2NvbGxpc2lvbic7XG5cbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXknO1xuXG5sZXQgY3Vyc29yID0gbWFrZUN1cnNvcigpO1xuXG5sZXQgcGF1c2UgPSBmYWxzZTtcbmxldCBTUEFDRSA9IGtleWJvYXJkKDMyKTtcblNQQUNFLnByZXNzID0gKCkgPT4ge3BhdXNlID0gIXBhdXNlfTtcblxubGV0IHBsYXllciA9IG5ldyBQbGF5ZXIoMTAsIDEwLCAwLjUpO1xubGV0IGJ1bGxldHMgPSBbXTtcbmxldCB6b21iaWVzID0gW107XG5cbmN1cnNvci5jbGljayA9IGZ1bmN0aW9uKCkge1xuICBsZXQgdGFyZ2V0ID0gY3Vyc29yLmdldFBvc2l0aW9uKGV2ZW50KTtcbiAgYnVsbGV0cy5wdXNoKHBsYXllci5zaG9vdCh0YXJnZXQpKTtcbn1cblxuZ2VuZXJhdGVab21iaWVzKCk7XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gIGlmICghcGF1c2UpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBjdXJzb3IuZHJhdygpO1xuICAgIGRyYXdCdWxsZXRzKCk7XG4gICAgZHJhd1pvbWJpZXMoKTtcbiAgICBjb2xsaXNpb25EZXRlY3Rpb24oYnVsbGV0cywgem9tYmllcyk7XG5cbiAgICBwbGF5ZXIubW92ZSgpO1xuICAgIHBsYXllci5kcmF3KCk7XG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG59XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcblxuZnVuY3Rpb24gZHJhd0J1bGxldHMoKSB7XG4gIGJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0LCBpbmRleCkgPT4ge1xuICAgIGlmIChidWxsZXQueCA+IDAgJiYgYnVsbGV0LnggPCBjYW52YXMud2lkdGggJiYgYnVsbGV0LnkgPiAwICYmIGJ1bGxldC55IDwgY2FudmFzLndpZHRoKSB7XG4gICAgICBidWxsZXQubW92ZSgpO1xuICAgICAgYnVsbGV0LmRyYXcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVsbGV0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gZHJhd1pvbWJpZXMoKSB7XG4gIHpvbWJpZXMuZm9yRWFjaCh6b21iaWUgPT4ge1xuICAgIHpvbWJpZS5mb2xsb3cocGxheWVyKTtcbiAgICB6b21iaWUuZHJhdygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVab21iaWVzKCkge1xuICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCkgKyAwO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodCkgKyAwO1xuICAgIGxldCB6b21iaWUgPSBuZXcgRW5lbXkoeCwgeSwgMC4xKTtcbiAgICB6b21iaWVzLnB1c2goem9tYmllKTtcbiAgfSwgMTAwMCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2NhbnZhcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlQ3Vyc29yKCkge1xuICBsZXQgY3Vyc29yID0ge1xuICAgIHg6IDAsXG4gICAgeTogMCxcbiAgICBkcmF3OiBmdW5jdGlvbigpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgMSwgMSk7XG4gICAgfSxcbiAgICBnZXRQb3NpdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGdldE1vdXNlUG9zKGNhbnZhcywgZSk7XG4gICAgfSxcbiAgICBjbGljazogdW5kZWZpbmVkLFxuICAgIGNsaWNrSGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5jbGljaykgdGhpcy5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2NsaWNrJywgY3Vyc29yLmNsaWNrSGFuZGxlci5iaW5kKGN1cnNvciksIGZhbHNlICBcbiAgKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuICAgIGxldCBwb3MgPSBnZXRNb3VzZVBvcyhjYW52YXMsIGUpO1xuICAgIGN1cnNvci54ID0gcG9zLng7XG4gICAgY3Vyc29yLnkgPSBwb3MueTtcbiAgfSk7XG5cbiAgcmV0dXJuIGN1cnNvcjtcbn1cblxuZnVuY3Rpb24gIGdldE1vdXNlUG9zKGNhbnZhcywgZXZ0KSB7XG4gIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCAvLyBhYnMuIHNpemUgb2YgZWxlbWVudFxuICBzY2FsZVggPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoLCAgICAvLyByZWxhdGlvbnNoaXAgYml0bWFwIHZzLiBlbGVtZW50IGZvciBYXG4gIHNjYWxlWSA9IGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodDsgIC8vIHJlbGF0aW9uc2hpcCBiaXRtYXAgdnMuIGVsZW1lbnQgZm9yIFlcblxuICByZXR1cm4ge1xuICAgIHg6IChldnQuY2xpZW50WCAtIHJlY3QubGVmdCkgKiBzY2FsZVgsICAgLy8gc2NhbGUgbW91c2UgY29vcmRpbmF0ZXMgYWZ0ZXIgdGhleSBoYXZlXG4gICAgeTogKGV2dC5jbGllbnRZIC0gcmVjdC50b3ApICogc2NhbGVZICAgICAvLyBiZWVuIGFkanVzdGVkIHRvIGJlIHJlbGF0aXZlIHRvIGVsZW1lbnRcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYnJhcnkvY3Vyc29yLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb25EZXRlY3Rpb24oYnVsbGV0cywgem9tYmllcykge1xuICBidWxsZXRzLmZvckVhY2goKGJ1bGxldCwgYnVsbGV0SW5kZXgpID0+IHtcbiAgICB6b21iaWVzLmZvckVhY2goKHpvbWJpZSwgem9tYmllSW5kZXgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2NzkyODQxL2RldGVjdC1pZi11c2VyLWNsaWNrcy1pbnNpZGUtYS1jaXJjbGVcbiAgICAgIGlmICggTWF0aC5zcXJ0KCh6b21iaWUueC1idWxsZXQueCkqKHpvbWJpZS54LWJ1bGxldC54KSArICh6b21iaWUueS1idWxsZXQueSkqKHpvbWJpZS55LWJ1bGxldC55KSkgPCA1ICkge1xuICAgICAgICB6b21iaWVzLnNwbGljZSh6b21iaWVJbmRleCwgMSk7XG4gICAgICAgIGJ1bGxldHMuc3BsaWNlKGJ1bGxldEluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGlicmFyeS9jb2xsaXNpb24uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9saWJyYXJ5L2NhbnZhcyc7XG5pbXBvcnQge2tleWJvYXJkfSBmcm9tICcuL2xpYnJhcnkva2V5Ym9hcmQnO1xuaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgc3BlZWQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuZGlyZWN0aW9uID0ge1xuICAgICAgdXA6IGZhbHNlLFxuICAgICAgZG93bjogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZVxuICAgIH1cblxuICAgIGxldCBVUCA9IGtleWJvYXJkKDg3KTtcbiAgICBsZXQgRE9XTiA9IGtleWJvYXJkKDgzKTtcbiAgICBsZXQgTEVGVCA9IGtleWJvYXJkKDY1KTtcbiAgICBsZXQgUklHSFQgPSBrZXlib2FyZCg2OCk7XG5cbiAgICBVUC5wcmVzcyA9ICgpID0+IHRoaXMuZGlyZWN0aW9uLnVwID0gdHJ1ZTtcbiAgICBET1dOLnByZXNzID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24uZG93biA9IHRydWU7XG4gICAgTEVGVC5wcmVzcyA9ICgpID0+IHRoaXMuZGlyZWN0aW9uLmxlZnQgPSB0cnVlO1xuICAgIFJJR0hULnByZXNzID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24ucmlnaHQgPSB0cnVlO1xuXG4gICAgVVAucmVsZWFzZSA9ICgpID0+IHRoaXMuZGlyZWN0aW9uLnVwID0gZmFsc2U7XG4gICAgRE9XTi5yZWxlYXNlID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24uZG93biA9IGZhbHNlO1xuICAgIExFRlQucmVsZWFzZSA9ICgpID0+IHRoaXMuZGlyZWN0aW9uLmxlZnQgPSBmYWxzZTtcbiAgICBSSUdIVC5yZWxlYXNlID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24ucmlnaHQgPSBmYWxzZTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uLnVwKSB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24uZG93bikgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uLnJpZ2h0KSB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24ubGVmdCkgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gIH1cblxuICBzaG9vdCh0YXJnZXQpIHtcbiAgICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9jb25vcmJ1Y2svMjYwNjE2NlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hdGgvYXRhbjJcbiAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMueSAtIHRhcmdldC55LCB0aGlzLnggLSB0YXJnZXQueCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3QnKS5wbGF5KCk7XG4gICAgcmV0dXJuIG5ldyBCdWxsZXQodGhpcy54LCB0aGlzLnksIDMsIGFuZ2xlKTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgNSwgNSk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9QbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9saWJyYXJ5L2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgc3BlZWQsIGFuZ2xlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIHRoaXMueCAtPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gICAgdGhpcy55IC09IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZDtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCAxLCAxKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0J1bGxldC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2xpYnJhcnkvY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBzcGVlZCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMzM2NjMzNcIjtcbiAgICBjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIDUsIDUpO1xuICB9XG5cbiAgZm9sbG93KHZpY3RpbSkge1xuICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy55IC0gdmljdGltLnksIHRoaXMueCAtIHZpY3RpbS54KTtcbiAgICB0aGlzLnggLT0gTWF0aC5jb3MoYW5nbGUpICogdGhpcy5zcGVlZDtcbiAgICB0aGlzLnkgLT0gTWF0aC5zaW4oYW5nbGUpICogdGhpcy5zcGVlZDtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0VuZW15LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=