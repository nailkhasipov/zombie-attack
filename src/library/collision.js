export function isCollide(bullet, zombie) {
  return Math.sqrt((zombie.x-bullet.x)*(zombie.x-bullet.x) +
                   (zombie.y-bullet.y)*(zombie.y-bullet.y)) < 5;
}