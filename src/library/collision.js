export function isCollide(bullet, zombie) {
  // https://stackoverflow.com/questions/16792841/detect-if-user-clicks-inside-a-circle
  return Math.sqrt((zombie.x-bullet.x)*(zombie.x-bullet.x) +
                   (zombie.y-bullet.y)*(zombie.y-bullet.y)) < 5;
}