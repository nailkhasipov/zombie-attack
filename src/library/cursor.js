import {canvas, ctx} from './canvas';

export function makeCursor() {
  let cursor = {
    x: 0,
    y: 0,
    draw: function() {
      ctx.fillStyle = "#000";
      ctx.fillRect(this.x, this.y, 1, 1);
    },
    getPosition: function(e) {
      return getMousePos(canvas, e);
    },
    click: undefined,
    clickHandler(event) {
        if (this.click) this.click();
    }
  }

  window.addEventListener(
      'click', cursor.clickHandler.bind(cursor), false  
  );

  window.addEventListener('mousemove', function(e) {
    let pos = getMousePos(canvas, e);
    cursor.x = pos.x;
    cursor.y = pos.y;
  });

  return cursor;
}

function  getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect(), // abs. size of element
  scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
  scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}