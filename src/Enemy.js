import {canvas, ctx} from './library/canvas';

export default class {
  constructor(x, y, image, speed) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = image;
    this.health = 100;
    this.speed = speed;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y);
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
}

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
    ctx.fillStyle = "#ac3232";
    ctx.fillRect(this.x, this.y, 1, 1);
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