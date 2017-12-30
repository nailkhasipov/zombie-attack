import {canvas, ctx} from './library/canvas';
import Bullet from './Bullet';

export default class {
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
    return new Bullet(this.x, this.y, 20, angle);
  }

  draw() {
    ctx.font = '40px Mono';
    ctx.fillText(this.emoji, this.x, this.y);
  }
}