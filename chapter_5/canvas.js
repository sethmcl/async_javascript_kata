(function () {

  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var x = 0;
  var y = 100;

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
  render();

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, 50, 50);

    if (x >= canvas.width) {
      x = 0;
    } else {
      x++;
    }

    requestAnimationFrame(render);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }


}());
