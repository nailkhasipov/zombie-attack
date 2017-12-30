export function collisionDetection(bullets, zombies) {
  bullets.forEach((bullet, bulletIndex) => {
    zombies.forEach((zombie, zombieIndex) => {
      // https://stackoverflow.com/questions/16792841/detect-if-user-clicks-inside-a-circle
      if ( Math.sqrt((zombie.x-bullet.x)*(zombie.x-bullet.x) + (zombie.y-bullet.y)*(zombie.y-bullet.y)) < 40 ) {
        zombies.splice(zombieIndex, 1);
        bullets.splice(bulletIndex, 1);
      }
    });
  });
}