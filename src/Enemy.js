import {canvas, ctx} from './library/canvas';

export default class {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = "#33cc33";
    ctx.fillRect(this.x, this.y, 5, 5);
  }

  follow(victim) {
    let angle = Math.atan2(this.y - victim.y, this.x - victim.x);
    this.x -= Math.cos(angle) * this.speed;
    this.y -= Math.sin(angle) * this.speed;
  }
}