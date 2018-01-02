import {canvas, ctx} from './library/canvas';
import {cursor} from './library/cursor';
import {keyboard} from './library/keyboard';
import {collisionDetection} from './library/collision';

import Player from './Player';
import Enemy from './Enemy';

let pause = false;
let SPACE = keyboard(32);
SPACE.press = () => {pause = !pause};

let player = new Player(10, 10, 0.5);
let bullets = [];
let zombies = [];

//@TODO move to cursor lib
canvas.addEventListener('mousedown', function(event) {
  let target = cursor.getPosition(event);
  bullets.push(player.shoot(target));
});

generateZombies();

function draw() {
  if (!pause) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cursor.draw();
    drawBullets();
    drawZombies();
    collisionDetection(bullets, zombies);

    player.move();
    player.draw();
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function drawBullets() {
  bullets.forEach((bullet, index) => {
    if (bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.width) {
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
    let x = Math.floor(Math.random() * canvas.width) + 0;
    let y = Math.floor(Math.random() * canvas.height) + 0;
    let zombie = new Enemy(x, y, 0.1);
    zombies.push(zombie);
  }, 1000);
}