import {canvas, ctx} from './library/canvas';

export default class {
  constructor(x, y, emoji, speed) {
    this.x = x;
    this.y = y;
    this.emoji = emoji;
    this.speed = speed;
  }

  draw() {
    ctx.font = '40px Mono';
    ctx.fillText(this.emoji, this.x, this.y);
  }

  follow(victim) {
    let angle = Math.atan2(this.y - victim.y, this.x - victim.x);
    this.x -= Math.cos(angle) * this.speed;
    this.y -= Math.sin(angle) * this.speed;
  }
}