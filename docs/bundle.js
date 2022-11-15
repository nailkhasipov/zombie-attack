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

let player = new __WEBPACK_IMPORTED_MODULE_4__Player__["a" /* default */](10, 10, 'player.png', 0.5);
let bullets = [];
let zombies = [];
let blood = [];

cursor.click = () => bullets.push(player.shoot(cursor.getPosition(event)));

generateZombies();

function draw() {
  __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].width, __WEBPACK_IMPORTED_MODULE_0__library_canvas__["a" /* canvas */].height);

  cursor.draw();
  blood.forEach((drop) => drop.draw());
  player.draw();
  zombies.forEach(zombie => zombie.draw());
  bullets.forEach((bullet, index) => bullet.draw());

  if (!pause) {
    player.move();
    moveBullets();
    moveZombies();
    blood.forEach((drop) => drop.move());

    bullets.forEach((bullet, bulletIndex) => {
      zombies.forEach((zombie, zombieIndex) => {
        if (Object(__WEBPACK_IMPORTED_MODULE_3__library_collision__["a" /* isCollide */])(bullet, zombie)) {
          blood = blood.concat(zombie.hit(bullet.angle));
          if (zombie.health < 0) zombies.splice(zombieIndex, 1);
          bullets.splice(bulletIndex, 1);
        }
      });
    });

    zombies.forEach((zombie, zombieIndex) => {
      if (Object(__WEBPACK_IMPORTED_MODULE_3__library_collision__["a" /* isCollide */])(player, zombie)) {
        alert('GAME OVER');
        document.location.reload();
      }
    });
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
      let zombie = new __WEBPACK_IMPORTED_MODULE_5__Enemy__["a" /* default */](x, y, 'zombie.png', 0.1);
      zombies.push(zombie);
    }
  }, 3000);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = isCollide;
function isCollide(bullet, zombie) {
  // https://stackoverflow.com/questions/16792841/detect-if-user-clicks-inside-a-circle
  return Math.sqrt((zombie.x-bullet.x)*(zombie.x-bullet.x) +
                   (zombie.y-bullet.y)*(zombie.y-bullet.y)) < 5;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_keyboard__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bullet__ = __webpack_require__(6);




/* harmony default export */ __webpack_exports__["a"] = (class {
  constructor(x, y, image, speed) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = image;
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
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].drawImage(this.img, this.x, this.y);
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
  constructor(x, y, image, speed) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = image;
    this.health = 100;
    this.speed = speed;
  }

  draw() {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].drawImage(this.img, this.x, this.y);
  }

  hit(angle) {
    this.health -= 30;

    let drops = [];
    for (let i = 0; i < 3; i++) {
      let drop = new Drop(this.x, this.y, angle);
      drops.push(drop);
    }
    return drops;
  }

  follow(victim) {
    let angle = Math.atan2(this.y - victim.y, this.x - victim.x);
    this.x -= Math.cos(angle) * this.speed;
    this.y -= Math.sin(angle) * this.speed;
  }
});

class Drop {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = toRadians(toDegrees(angle) + getRandomInt(-30, 30));
    this.velocity = getRandomInt(5, 20);
  }

  move() {
    if (this.velocity >= 0) {
      this.x -= Math.cos(this.angle) * 1;
      this.y -= Math.sin(this.angle) * 1;
      this.velocity -= 1;
    }
  }

  draw() {
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillStyle = "#ac3232";
    __WEBPACK_IMPORTED_MODULE_0__library_canvas__["b" /* ctx */].fillRect(this.x, this.y, 1, 1);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzE1ZjY3ZWIxZWVmM2NiNzQwZWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnJhcnkvY2FudmFzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWJyYXJ5L2tleWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9saWJyYXJ5L2N1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlicmFyeS9jb2xsaXNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQnVsbGV0LmpzIiwid2VicGFjazovLy8uL3NyYy9FbmVteS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7QUNwQ29CO0FBQ0Q7QUFDRjtBQUNxQjs7QUFFdEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEM7Ozs7Ozs7OztBQ3ZGb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQ0pvQjtBQUNIO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDcERvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7QUNsQm9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzE1ZjY3ZWIxZWVmM2NiNzQwZWQiLCJjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuZXhwb3J0IHtjYW52YXMsIGN0eH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGlicmFyeS9jYW52YXMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIGtleWJvYXJkKGtleUNvZGUpIHtcbiAgbGV0IGtleSA9IHt9O1xuICBrZXkuY29kZSA9IGtleUNvZGU7XG4gIGtleS5pc0Rvd24gPSBmYWxzZTtcbiAga2V5LmlzVXAgPSB0cnVlO1xuICBrZXkucHJlc3MgPSB1bmRlZmluZWQ7XG4gIGtleS5yZWxlYXNlID0gdW5kZWZpbmVkO1xuICAvL1RoZSBgZG93bkhhbmRsZXJgXG4gIGtleS5kb3duSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IGtleS5jb2RlKSB7XG4gICAgICBpZiAoa2V5LmlzVXAgJiYga2V5LnByZXNzKSBrZXkucHJlc3MoKTtcbiAgICAgIGtleS5pc0Rvd24gPSB0cnVlO1xuICAgICAga2V5LmlzVXAgPSBmYWxzZTtcbiAgICB9XG4gIC8vUHJldmVudCB0aGUgZXZlbnQncyBkZWZhdWx0IGJlaGF2aW9yIC8vKHN1Y2ggYXMgYnJvd3NlciB3aW5kb3cgc2Nyb2xsaW5nKVxuICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgLy9UaGUgYHVwSGFuZGxlcmBcbiAga2V5LnVwSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IGtleS5jb2RlKSB7XG4gICAgICBpZiAoa2V5LmlzRG93biAmJiBrZXkucmVsZWFzZSkga2V5LnJlbGVhc2UoKTtcbiAgICAgIGtleS5pc0Rvd24gPSBmYWxzZTtcbiAgICAgIGtleS5pc1VwID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfTtcbiAgLy9BdHRhY2ggZXZlbnQgbGlzdGVuZXJzXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwia2V5ZG93blwiLCBrZXkuZG93bkhhbmRsZXIuYmluZChrZXkpLCBmYWxzZVxuICApO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImtleXVwXCIsIGtleS51cEhhbmRsZXIuYmluZChrZXkpLCBmYWxzZVxuICApO1xuICAvL1JldHVybiB0aGUgYGtleWAgb2JqZWN0XG4gIHJldHVybiBrZXk7IFxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYnJhcnkva2V5Ym9hcmQuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9saWJyYXJ5L2NhbnZhcyc7XG5pbXBvcnQge21ha2VDdXJzb3J9IGZyb20gJy4vbGlicmFyeS9jdXJzb3InO1xuaW1wb3J0IHtrZXlib2FyZH0gZnJvbSAnLi9saWJyYXJ5L2tleWJvYXJkJztcbmltcG9ydCB7Y29sbGlzaW9uRGV0ZWN0aW9uLCBpc0NvbGxpZGV9IGZyb20gJy4vbGlicmFyeS9jb2xsaXNpb24nO1xuXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcbmltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15JztcblxubGV0IGN1cnNvciA9IG1ha2VDdXJzb3IoKTtcblxubGV0IHBhdXNlID0gZmFsc2U7XG5sZXQgU1BBQ0UgPSBrZXlib2FyZCgzMik7XG5TUEFDRS5wcmVzcyA9ICgpID0+IHBhdXNlID0gIXBhdXNlO1xuXG5sZXQgcGxheWVyID0gbmV3IFBsYXllcigxMCwgMTAsICdwbGF5ZXIucG5nJywgMC41KTtcbmxldCBidWxsZXRzID0gW107XG5sZXQgem9tYmllcyA9IFtdO1xubGV0IGJsb29kID0gW107XG5cbmN1cnNvci5jbGljayA9ICgpID0+IGJ1bGxldHMucHVzaChwbGF5ZXIuc2hvb3QoY3Vyc29yLmdldFBvc2l0aW9uKGV2ZW50KSkpO1xuXG5nZW5lcmF0ZVpvbWJpZXMoKTtcblxuZnVuY3Rpb24gZHJhdygpIHtcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gIGN1cnNvci5kcmF3KCk7XG4gIGJsb29kLmZvckVhY2goKGRyb3ApID0+IGRyb3AuZHJhdygpKTtcbiAgcGxheWVyLmRyYXcoKTtcbiAgem9tYmllcy5mb3JFYWNoKHpvbWJpZSA9PiB6b21iaWUuZHJhdygpKTtcbiAgYnVsbGV0cy5mb3JFYWNoKChidWxsZXQsIGluZGV4KSA9PiBidWxsZXQuZHJhdygpKTtcblxuICBpZiAoIXBhdXNlKSB7XG4gICAgcGxheWVyLm1vdmUoKTtcbiAgICBtb3ZlQnVsbGV0cygpO1xuICAgIG1vdmVab21iaWVzKCk7XG4gICAgYmxvb2QuZm9yRWFjaCgoZHJvcCkgPT4gZHJvcC5tb3ZlKCkpO1xuXG4gICAgYnVsbGV0cy5mb3JFYWNoKChidWxsZXQsIGJ1bGxldEluZGV4KSA9PiB7XG4gICAgICB6b21iaWVzLmZvckVhY2goKHpvbWJpZSwgem9tYmllSW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGlzQ29sbGlkZShidWxsZXQsIHpvbWJpZSkpIHtcbiAgICAgICAgICBibG9vZCA9IGJsb29kLmNvbmNhdCh6b21iaWUuaGl0KGJ1bGxldC5hbmdsZSkpO1xuICAgICAgICAgIGlmICh6b21iaWUuaGVhbHRoIDwgMCkgem9tYmllcy5zcGxpY2Uoem9tYmllSW5kZXgsIDEpO1xuICAgICAgICAgIGJ1bGxldHMuc3BsaWNlKGJ1bGxldEluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB6b21iaWVzLmZvckVhY2goKHpvbWJpZSwgem9tYmllSW5kZXgpID0+IHtcbiAgICAgIGlmIChpc0NvbGxpZGUocGxheWVyLCB6b21iaWUpKSB7XG4gICAgICAgIGFsZXJ0KCdHQU1FIE9WRVInKTtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG59XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcblxuZnVuY3Rpb24gbW92ZUJ1bGxldHMoKSB7XG4gIGJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0LCBpbmRleCkgPT4ge1xuICAgIGlmIChidWxsZXQueCA+IDAgJiYgYnVsbGV0LnggPCBjYW52YXMud2lkdGggJiYgYnVsbGV0LnkgPiAwICYmIGJ1bGxldC55IDwgY2FudmFzLndpZHRoKSB7XG4gICAgICBidWxsZXQubW92ZSgpO1xuICAgICAgYnVsbGV0LmRyYXcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVsbGV0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vdmVab21iaWVzKCkge1xuICB6b21iaWVzLmZvckVhY2goem9tYmllID0+IHtcbiAgICB6b21iaWUuZm9sbG93KHBsYXllcik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVpvbWJpZXMoKSB7XG4gIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIGlmICghcGF1c2UpIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoKSArIDA7XG4gICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy5oZWlnaHQpICsgMDtcbiAgICAgIGxldCB6b21iaWUgPSBuZXcgRW5lbXkoeCwgeSwgJ3pvbWJpZS5wbmcnLCAwLjEpO1xuICAgICAgem9tYmllcy5wdXNoKHpvbWJpZSk7XG4gICAgfVxuICB9LCAzMDAwKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7Y2FudmFzLCBjdHh9IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VDdXJzb3IoKSB7XG4gIGxldCBjdXJzb3IgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIGRyYXc6IGZ1bmN0aW9uKCkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCAxLCAxKTtcbiAgICB9LFxuICAgIGdldFBvc2l0aW9uOiBmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZ2V0TW91c2VQb3MoY2FudmFzLCBlKTtcbiAgICB9LFxuICAgIGNsaWNrOiB1bmRlZmluZWQsXG4gICAgY2xpY2tIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNsaWNrKSB0aGlzLmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLCBjdXJzb3IuY2xpY2tIYW5kbGVyLmJpbmQoY3Vyc29yKSwgZmFsc2UgIFxuICApO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgbGV0IHBvcyA9IGdldE1vdXNlUG9zKGNhbnZhcywgZSk7XG4gICAgY3Vyc29yLnggPSBwb3MueDtcbiAgICBjdXJzb3IueSA9IHBvcy55O1xuICB9KTtcblxuICByZXR1cm4gY3Vyc29yO1xufVxuXG5mdW5jdGlvbiAgZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcbiAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIC8vIGFicy4gc2l6ZSBvZiBlbGVtZW50XG4gIHNjYWxlWCA9IGNhbnZhcy53aWR0aCAvIHJlY3Qud2lkdGgsICAgIC8vIHJlbGF0aW9uc2hpcCBiaXRtYXAgdnMuIGVsZW1lbnQgZm9yIFhcbiAgc2NhbGVZID0gY2FudmFzLmhlaWdodCAvIHJlY3QuaGVpZ2h0OyAgLy8gcmVsYXRpb25zaGlwIGJpdG1hcCB2cy4gZWxlbWVudCBmb3IgWVxuXG4gIHJldHVybiB7XG4gICAgeDogKGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0KSAqIHNjYWxlWCwgICAvLyBzY2FsZSBtb3VzZSBjb29yZGluYXRlcyBhZnRlciB0aGV5IGhhdmVcbiAgICB5OiAoZXZ0LmNsaWVudFkgLSByZWN0LnRvcCkgKiBzY2FsZVkgICAgIC8vIGJlZW4gYWRqdXN0ZWQgdG8gYmUgcmVsYXRpdmUgdG8gZWxlbWVudFxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGlicmFyeS9jdXJzb3IuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIGlzQ29sbGlkZShidWxsZXQsIHpvbWJpZSkge1xuICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjc5Mjg0MS9kZXRlY3QtaWYtdXNlci1jbGlja3MtaW5zaWRlLWEtY2lyY2xlXG4gIHJldHVybiBNYXRoLnNxcnQoKHpvbWJpZS54LWJ1bGxldC54KSooem9tYmllLngtYnVsbGV0LngpICtcbiAgICAgICAgICAgICAgICAgICAoem9tYmllLnktYnVsbGV0LnkpKih6b21iaWUueS1idWxsZXQueSkpIDwgNTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWJyYXJ5L2NvbGxpc2lvbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2xpYnJhcnkvY2FudmFzJztcbmltcG9ydCB7a2V5Ym9hcmR9IGZyb20gJy4vbGlicmFyeS9rZXlib2FyZCc7XG5pbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBpbWFnZSwgc3BlZWQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5pbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLmltZy5zcmMgPSBpbWFnZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSB7XG4gICAgICB1cDogZmFsc2UsXG4gICAgICBkb3duOiBmYWxzZSxcbiAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgcmlnaHQ6IGZhbHNlXG4gICAgfVxuXG4gICAgbGV0IFVQID0ga2V5Ym9hcmQoODcpO1xuICAgIGxldCBET1dOID0ga2V5Ym9hcmQoODMpO1xuICAgIGxldCBMRUZUID0ga2V5Ym9hcmQoNjUpO1xuICAgIGxldCBSSUdIVCA9IGtleWJvYXJkKDY4KTtcblxuICAgIFVQLnByZXNzID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24udXAgPSB0cnVlO1xuICAgIERPV04ucHJlc3MgPSAoKSA9PiB0aGlzLmRpcmVjdGlvbi5kb3duID0gdHJ1ZTtcbiAgICBMRUZULnByZXNzID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24ubGVmdCA9IHRydWU7XG4gICAgUklHSFQucHJlc3MgPSAoKSA9PiB0aGlzLmRpcmVjdGlvbi5yaWdodCA9IHRydWU7XG5cbiAgICBVUC5yZWxlYXNlID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24udXAgPSBmYWxzZTtcbiAgICBET1dOLnJlbGVhc2UgPSAoKSA9PiB0aGlzLmRpcmVjdGlvbi5kb3duID0gZmFsc2U7XG4gICAgTEVGVC5yZWxlYXNlID0gKCkgPT4gdGhpcy5kaXJlY3Rpb24ubGVmdCA9IGZhbHNlO1xuICAgIFJJR0hULnJlbGVhc2UgPSAoKSA9PiB0aGlzLmRpcmVjdGlvbi5yaWdodCA9IGZhbHNlO1xuICB9XG5cbiAgbW92ZSgpIHtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24udXApIHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuICAgIGlmICh0aGlzLmRpcmVjdGlvbi5kb3duKSB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24ucmlnaHQpIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIGlmICh0aGlzLmRpcmVjdGlvbi5sZWZ0KSB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgfVxuXG4gIHNob290KHRhcmdldCkge1xuICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2Nvbm9yYnVjay8yNjA2MTY2XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWF0aC9hdGFuMlxuICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy55IC0gdGFyZ2V0LnksIHRoaXMueCAtIHRhcmdldC54KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdCcpLnBsYXkoKTtcbiAgICByZXR1cm4gbmV3IEJ1bGxldCh0aGlzLngsIHRoaXMueSwgMywgYW5nbGUpO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngsIHRoaXMueSk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9QbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9saWJyYXJ5L2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgc3BlZWQsIGFuZ2xlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIHRoaXMueCAtPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gICAgdGhpcy55IC09IE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZDtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCAxLCAxKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0J1bGxldC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL2xpYnJhcnkvY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBpbWFnZSwgc3BlZWQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5pbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLmltZy5zcmMgPSBpbWFnZTtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIHRoaXMueCwgdGhpcy55KTtcbiAgfVxuXG4gIGhpdChhbmdsZSkge1xuICAgIHRoaXMuaGVhbHRoIC09IDMwO1xuXG4gICAgbGV0IGRyb3BzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGxldCBkcm9wID0gbmV3IERyb3AodGhpcy54LCB0aGlzLnksIGFuZ2xlKTtcbiAgICAgIGRyb3BzLnB1c2goZHJvcCk7XG4gICAgfVxuICAgIHJldHVybiBkcm9wcztcbiAgfVxuXG4gIGZvbGxvdyh2aWN0aW0pIHtcbiAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMueSAtIHZpY3RpbS55LCB0aGlzLnggLSB2aWN0aW0ueCk7XG4gICAgdGhpcy54IC09IE1hdGguY29zKGFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gICAgdGhpcy55IC09IE1hdGguc2luKGFuZ2xlKSAqIHRoaXMuc3BlZWQ7XG4gIH1cbn1cblxuY2xhc3MgRHJvcCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIGFuZ2xlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuYW5nbGUgPSB0b1JhZGlhbnModG9EZWdyZWVzKGFuZ2xlKSArIGdldFJhbmRvbUludCgtMzAsIDMwKSk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IGdldFJhbmRvbUludCg1LCAyMCk7XG4gIH1cblxuICBtb3ZlKCkge1xuICAgIGlmICh0aGlzLnZlbG9jaXR5ID49IDApIHtcbiAgICAgIHRoaXMueCAtPSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIDE7XG4gICAgICB0aGlzLnkgLT0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiAxO1xuICAgICAgdGhpcy52ZWxvY2l0eSAtPSAxO1xuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2FjMzIzMlwiO1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgMSwgMSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxuXG5mdW5jdGlvbiB0b0RlZ3JlZXMgKGFuZ2xlKSB7XG4gIHJldHVybiBhbmdsZSAqICgxODAgLyBNYXRoLlBJKTtcbn1cblxuZnVuY3Rpb24gdG9SYWRpYW5zIChhbmdsZSkge1xuICByZXR1cm4gYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvRW5lbXkuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==