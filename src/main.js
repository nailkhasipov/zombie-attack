import {canvas, ctx} from './library/canvas';
import {cursor} from './library/cursor';
import {collisionDetection} from './library/collision';

import Player from './Player';
import Enemy from './Enemy';

let player = new Player(10, 10, 0.5);
let bullets = [];
let zombies = [];

//@TODO move to cursor lib
canvas.addEventListener('mousedown', function(event) {
  let target = cursor.getPosition(event);
  bullets.push(player.shoot(target));
});

setInterval(function() {
  // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  let x = Math.floor(Math.random() * canvas.width) + 0;
  let y = Math.floor(Math.random() * canvas.height) + 0;
  let zombie = new Enemy(x, y, 0.1);
  zombies.push(zombie);
}, 1000);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cursor.draw();

  bullets.forEach((bullet, index) => {
    if (bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.width) {
      bullet.move();
      bullet.draw();
    } else {
      bullets.splice(index, 1);
    }
  });

  zombies.forEach(zombie => {
    zombie.follow(player);
    zombie.draw();
  });

  collisionDetection(bullets, zombies);

  player.move();
  player.draw();
  
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);