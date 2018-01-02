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








let pause = false;
let SPACE = Object(__WEBPACK_IMPORTED_MODULE_2__library_keyboard__["a" /* keyboard */])(32);
SPACE.press = () => {pause = !pause};

let player = new __WEBPACK_IMPORTED_MODULE_4__Player__["a" /* default */](10, 10, 0.5);
let bullets = [];
let zombies = [];

//@TODO move to cursor lib
__WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].addEventListener('mousedown', function(event) {
  let target = __WEBPACK_IMPORTED_MODULE_1__library_cursor__["a" /* cursor */].getPosition(event);
  bullets.push(player.shoot(target));
});

generateZombies();

function draw() {
  if (!pause) {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width, __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].height);

    __WEBPACK_IMPORTED_MODULE_1__library_cursor__["a" /* cursor */].draw();
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cursor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(0);


let cursor = {
  x: 0,
  y: 0,
  draw: function() {
    __WEBPACK_IMPORTED_MODULE_0__canvas__["b" /* ctx */].fillStyle = "#000";
    __WEBPACK_IMPORTED_MODULE_0__canvas__["b" /* ctx */].fillRect(this.x, this.y, 1, 1);
  },
  getPosition: function(e) {
    return getMousePos(__WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* canvas */], e);
  }
};

window.addEventListener('mousemove', function(e) {
  let pos = getMousePos(__WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* canvas */], e);
  cursor.x = pos.x;
  cursor.y = pos.y;
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTc1NjA4NjBhMzQ3ZDQ1MGY4NTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcnkvY2FudmFzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWJyYXJ5L2tleWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9saWJyYXJ5L2N1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlicmFyeS9jb2xsaXNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnVsbGV0LmpzIiwid2VicGFjazovLy8uL3NyYy9FbmVteS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7QUNwQ29CO0FBQ0w7QUFDRTtBQUNVOztBQUUzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEM7Ozs7Ozs7OztBQ3BFb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILEM7Ozs7Ozs7Ozs7QUNWb0I7QUFDSDtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7QUNuRG9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7OztBQ2xCb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5NzU2MDg2MGEzNDdkNDUwZjg1OCIsImNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5leHBvcnQge2NhbnZhcywgY3R4fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWJyYXJ5L2NhbnZhcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24ga2V5Ym9hcmQoa2V5Q29kZSkge1xuICBsZXQga2V5ID0ge307XG4gIGtleS5jb2RlID0ga2V5Q29kZTtcbiAga2V5LmlzRG93biA9IGZhbHNlO1xuICBrZXkuaXNVcCA9IHRydWU7XG4gIGtleS5wcmVzcyA9IHVuZGVmaW5lZDtcbiAga2V5LnJlbGVhc2UgPSB1bmRlZmluZWQ7XG4gIC8vVGhlIGBkb3duSGFuZGxlcmBcbiAga2V5LmRvd25IYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0ga2V5LmNvZGUpIHtcbiAgICAgIGlmIChrZXkuaXNVcCAmJiBrZXkucHJlc3MpIGtleS5wcmVzcygpO1xuICAgICAga2V5LmlzRG93biA9IHRydWU7XG4gICAgICBrZXkuaXNVcCA9IGZhbHNlO1xuICAgIH1cbiAgLy9QcmV2ZW50IHRoZSBldmVudCdzIGRlZmF1bHQgYmVoYXZpb3IgLy8oc3VjaCBhcyBicm93c2VyIHdpbmRvdyBzY3JvbGxpbmcpXG4gICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfTtcblxuICAvL1RoZSBgdXBIYW5kbGVyYFxuICBrZXkudXBIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0ga2V5LmNvZGUpIHtcbiAgICAgIGlmIChrZXkuaXNEb3duICYmIGtleS5yZWxlYXNlKSBrZXkucmVsZWFzZSgpO1xuICAgICAga2V5LmlzRG93biA9IGZhbHNlO1xuICAgICAga2V5LmlzVXAgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuICAvL0F0dGFjaCBldmVudCBsaXN0ZW5lcnNcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJrZXlkb3duXCIsIGtleS5kb3duSGFuZGxlci5iaW5kKGtleSksIGZhbHNlXG4gICk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwia2V5dXBcIiwga2V5LnVwSGFuZGxlci5iaW5kKGtleSksIGZhbHNlXG4gICk7XG4gIC8vUmV0dXJuIHRoZSBga2V5YCBvYmplY3RcbiAgcmV0dXJuIGtleTsgXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGlicmFyeS9rZXlib2FyZC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2xpYnJhcnkvY2FudmFzJztcbmltcG9ydCB7Y3Vyc29yfSBmcm9tICcuL2xpYnJhcnkvY3Vyc29yJztcbmltcG9ydCB7a2V5Ym9hcmR9IGZyb20gJy4vbGlicmFyeS9rZXlib2FyZCc7XG5pbXBvcnQge2NvbGxpc2lvbkRldGVjdGlvbn0gZnJvbSAnLi9saWJyYXJ5L2NvbGxpc2lvbic7XG5cbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXknO1xuXG5sZXQgcGF1c2UgPSBmYWxzZTtcbmxldCBTUEFDRSA9IGtleWJvYXJkKDMyKTtcblNQQUNFLnByZXNzID0gKCkgPT4ge3BhdXNlID0gIXBhdXNlfTtcblxubGV0IHBsYXllciA9IG5ldyBQbGF5ZXIoMTAsIDEwLCAwLjUpO1xubGV0IGJ1bGxldHMgPSBbXTtcbmxldCB6b21iaWVzID0gW107XG5cbi8vQFRPRE8gbW92ZSB0byBjdXJzb3IgbGliXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbGV0IHRhcmdldCA9IGN1cnNvci5nZXRQb3NpdGlvbihldmVudCk7XG4gIGJ1bGxldHMucHVzaChwbGF5ZXIuc2hvb3QodGFyZ2V0KSk7XG59KTtcblxuZ2VuZXJhdGVab21iaWVzKCk7XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gIGlmICghcGF1c2UpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBjdXJzb3IuZHJhdygpO1xuICAgIGRyYXdCdWxsZXRzKCk7XG4gICAgZHJhd1pvbWJpZXMoKTtcbiAgICBjb2xsaXNpb25EZXRlY3Rpb24oYnVsbGV0cywgem9tYmllcyk7XG5cbiAgICBwbGF5ZXIubW92ZSgpO1xuICAgIHBsYXllci5kcmF3KCk7XG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG59XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcblxuZnVuY3Rpb24gZHJhd0J1bGxldHMoKSB7XG4gIGJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0LCBpbmRleCkgPT4ge1xuICAgIGlmIChidWxsZXQueCA+IDAgJiYgYnVsbGV0LnggPCBjYW52YXMud2lkdGggJiYgYnVsbGV0LnkgPiAwICYmIGJ1bGxldC55IDwgY2FudmFzLndpZHRoKSB7XG4gICAgICBidWxsZXQubW92ZSgpO1xuICAgICAgYnVsbGV0LmRyYXcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVsbGV0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gZHJhd1pvbWJpZXMoKSB7XG4gIHpvbWJpZXMuZm9yRWFjaCh6b21iaWUgPT4ge1xuICAgIHpvbWJpZS5mb2xsb3cocGxheWVyKTtcbiAgICB6b21iaWUuZHJhdygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVab21iaWVzKCkge1xuICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCkgKyAwO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodCkgKyAwO1xuICAgIGxldCB6b21iaWUgPSBuZXcgRW5lbXkoeCwgeSwgMC4xKTtcbiAgICB6b21iaWVzLnB1c2goem9tYmllKTtcbiAgfSwgMTAwMCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2NhbnZhcyc7XG5cbmV4cG9ydCBsZXQgY3Vyc29yID0ge1xuICB4OiAwLFxuICB5OiAwLFxuICBkcmF3OiBmdW5jdGlvbigpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCAxLCAxKTtcbiAgfSxcbiAgZ2V0UG9zaXRpb246IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gZ2V0TW91c2VQb3MoY2FudmFzLCBlKTtcbiAgfVxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgbGV0IHBvcyA9IGdldE1vdXNlUG9zKGNhbnZhcywgZSk7XG4gIGN1cnNvci54ID0gcG9zLng7XG4gIGN1cnNvci55ID0gcG9zLnk7XG59KTtcblxuZnVuY3Rpb24gIGdldE1vdXNlUG9zKGNhbnZhcywgZXZ0KSB7XG4gIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCAvLyBhYnMuIHNpemUgb2YgZWxlbWVudFxuICBzY2FsZVggPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoLCAgICAvLyByZWxhdGlvbnNoaXAgYml0bWFwIHZzLiBlbGVtZW50IGZvciBYXG4gIHNjYWxlWSA9IGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodDsgIC8vIHJlbGF0aW9uc2hpcCBiaXRtYXAgdnMuIGVsZW1lbnQgZm9yIFlcblxuICByZXR1cm4ge1xuICAgIHg6IChldnQuY2xpZW50WCAtIHJlY3QubGVmdCkgKiBzY2FsZVgsICAgLy8gc2NhbGUgbW91c2UgY29vcmRpbmF0ZXMgYWZ0ZXIgdGhleSBoYXZlXG4gICAgeTogKGV2dC5jbGllbnRZIC0gcmVjdC50b3ApICogc2NhbGVZICAgICAvLyBiZWVuIGFkanVzdGVkIHRvIGJlIHJlbGF0aXZlIHRvIGVsZW1lbnRcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYnJhcnkvY3Vyc29yLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb25EZXRlY3Rpb24oYnVsbGV0cywgem9tYmllcykge1xuICBidWxsZXRzLmZvckVhY2goKGJ1bGxldCwgYnVsbGV0SW5kZXgpID0+IHtcbiAgICB6b21iaWVzLmZvckVhY2goKHpvbWJpZSwgem9tYmllSW5kZXgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2NzkyODQxL2RldGVjdC1pZi11c2VyLWNsaWNrcy1pbnNpZGUtYS1jaXJjbGVcbiAgICAgIGlmICggTWF0aC5zcXJ0KCh6b21iaWUueC1idWxsZXQueCkqKHpvbWJpZS54LWJ1bGxldC54KSArICh6b21iaWUueS1idWxsZXQueSkqKHpvbWJpZS55LWJ1bGxldC55KSkgPCA1ICkge1xuICAgICAgICB6b21iaWVzLnNwbGljZSh6b21iaWVJbmRleCwgMSk7XG4gICAgICAgIGJ1bGxldHMuc3BsaWNlKGJ1bGxldEluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGlicmFyeS9jb2xsaXNpb24uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9saWJyYXJ5L2NhbnZhcyc7XG5pbXBvcnQge2tleWJvYXJkfSBmcm9tICcuL2xpYnJhcnkva2V5Ym9hcmQnO1xuaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgc3BlZWQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuZGlyZWN0aW9uID0ge1xuICAgICAgdXA6IGZhbHNlLFxuICAgICAgZG93bjogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHJpZ2h0OiBmYWxzZVxuICAgIH1cblxuICAgIGxldCBVUCA9IGtleWJvYXJkKDg3KTtcbiAgICBsZXQgRE9XTiA9IGtleWJvYXJkKDgzKTtcbiAgICBsZXQgTEVGVCA9IGtleWJvYXJkKDY1KTtcbiAgICBsZXQgUklHSFQgPSBrZXlib2FyZCg2OCk7XG5cbiAgICBVUC5wcmVzcyA9ICgpID0+IHRoaXMuZGlyZWN0aW9uLnVwID0gdHJ1ZTtcbiAgICBET1dOLnByZXNzID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24uZG93biA9IHRydWU7XG4gICAgTEVGVC5wcmVzcyA9ICgpID0+IHRoaXMuZGlyZWN0aW9uLmxlZnQgPSB0cnVlO1xuICAgIFJJR0hULnByZXNzID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24ucmlnaHQgPSB0cnVlO1xuXG4gICAgVVAucmVsZWFzZSA9ICgpID0+IHRoaXMuZGlyZWN0aW9uLnVwID0gZmFsc2U7XG4gICAgRE9XTi5yZWxlYXNlID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24uZG93biA9IGZhbHNlO1xuICAgIExFRlQucmVsZWFzZSA9ICgpID0+IHRoaXMuZGlyZWN0aW9uLmxlZnQgPSBmYWxzZTtcbiAgICBSSUdIVC5yZWxlYXNlID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24ucmlnaHQgPSBmYWxzZTtcbiAgfVxuXG4gIG1vdmUoKSB7XG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uLnVwKSB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24uZG93bikgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uLnJpZ2h0KSB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24ubGVmdCkgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gIH1cblxuICBzaG9vdCh0YXJnZXQpIHtcbiAgICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9jb25vcmJ1Y2svMjYwNjE2NlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hdGgvYXRhbjJcbiAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMueSAtIHRhcmdldC55LCB0aGlzLnggLSB0YXJnZXQueCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3QnKS5wbGF5KCk7XG4gICAgcmV0dXJuIG5ldyBCdWxsZXQodGhpcy54LCB0aGlzLnksIDMsIGFuZ2xlKTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgNSwgNSk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9QbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9saWJyYXJ5L2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgc3BlZWQsIGFuZ2xlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIHRoaXMueCAtPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gICAgdGhpcy55IC09IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZDtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCAxLCAxKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0J1bGxldC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2xpYnJhcnkvY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBzcGVlZCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMzM2NjMzNcIjtcbiAgICBjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIDUsIDUpO1xuICB9XG5cbiAgZm9sbG93KHZpY3RpbSkge1xuICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy55IC0gdmljdGltLnksIHRoaXMueCAtIHZpY3RpbS54KTtcbiAgICB0aGlzLnggLT0gTWF0aC5jb3MoYW5nbGUpICogdGhpcy5zcGVlZDtcbiAgICB0aGlzLnkgLT0gTWF0aC5zaW4oYW5nbGUpICogdGhpcy5zcGVlZDtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0VuZW15LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=