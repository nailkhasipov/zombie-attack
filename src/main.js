import {canvas, ctx} from './library/canvas';
import {makeCursor} from './library/cursor';
import {keyboard} from './library/keyboard';
import {collisionDetection, isCollide} from './library/collision';

import Player from './Player';
import Enemy from './Enemy';

let cursor = makeCursor();

let pause = false;
let SPACE = keyboard(32);
SPACE.press = () => pause = !pause;

let player = new Player(10, 10, 'player.png', 0.5);
let bullets = [];
let zombies = [];
let blood = [];

cursor.click = () => bullets.push(player.shoot(cursor.getPosition(event)));

generateZombies();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        if (isCollide(bullet, zombie)) {
          blood = blood.concat(zombie.hit(bullet.angle));
          if (zombie.health < 0) zombies.splice(zombieIndex, 1);
          bullets.splice(bulletIndex, 1);
        }
      });
    });

    zombies.forEach((zombie, zombieIndex) => {
      if (isCollide(player, zombie)) {
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
    if (bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.width) {
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
      let x = Math.floor(Math.random() * canvas.width) + 0;
      let y = Math.floor(Math.random() * canvas.height) + 0;
      let zombie = new Enemy(x, y, 'zombie.png', 0.1);
      zombies.push(zombie);
    }
  }, 3000);
}