var button = document.querySelector('button');

button.addEventListener('click', loop);

function loop() {
  for (var i = 0; i < 1000 * 500; i++) {
    console.log('my favorite number is %s', i);
  }
}
