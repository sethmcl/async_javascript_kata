var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var x = 100;
var y = 100;
var speed = 1;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, y, 50, 50);
  x += speed;

  if (x > canvas.width - 50) {
    x = canvas.width - 50;
    speed *= -1;
  } else if (x < 0) {
    x = 0;
    speed *= -1;
  }

  window.requestAnimationFrame(render, 0);
}

render();
