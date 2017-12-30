import {canvas, ctx} from './library/canvas';
import {keyboard} from './library/keyboard';
import {collisionDetection} from './library/collision';

import Player from './Player';
import Enemy from './Enemy';

let player = new Player(100, 100, '😲', 3);
let bullets = [];
let zombies = [];

let UP = keyboard(87);
let DOWN = keyboard(83);
let LEFT = keyboard(65);
let RIGHT = keyboard(68);

UP.press = () => player.move('UP');
DOWN.press = () => player.move('DOWN');
LEFT.press = () => player.move('LEFT');
RIGHT.press = () => player.move('RIGHT');

canvas.addEventListener('mousedown', function(event) {
  let target = {x: event.x, y: event.y};
  bullets.push(player.shoot(target));
});

setInterval(function() {
  // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  let x = Math.floor(Math.random() * canvas.width) + 0;
  let y = Math.floor(Math.random() * canvas.height) + 0;
  let zombie = new Enemy(x, y, '🧟', 1);
  zombies.push(zombie);
}, 1000);

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

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