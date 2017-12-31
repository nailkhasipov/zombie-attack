import {canvas, ctx} from './library/canvas';
import {keyboard} from './library/keyboard';
import Bullet from './Bullet';

export default class {
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

    let UP = keyboard(87);
    let DOWN = keyboard(83);
    let LEFT = keyboard(65);
    let RIGHT = keyboard(68);

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
    return new Bullet(this.x, this.y, 3, angle);
  }

  draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(this.x, this.y, 5, 5);
  }
}