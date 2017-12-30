let info = {
  angle: 0
}

let infoWrapper = document.createElement('DIV');
infoWrapper.className = 'info';
document.body.appendChild(infoWrapper);

function drawInfo() {
  infoWrapper.innerHTML = info.angle;
}

window.addEventListener('mousemove', function(e) {
  angle = Math.atan2(player.y - e.y, player.x - e.x) * 180 / Math.PI;
  info.angle = angle;
});