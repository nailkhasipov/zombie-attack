import {canvas, ctx} from './library/canvas';

export default class {
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
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}