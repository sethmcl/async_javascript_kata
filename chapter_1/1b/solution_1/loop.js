var button = document.querySelector('button');

button.addEventListener('click', loop);

function loop() {
  var initial = 0;
  var chunkSize = 10;
  var max = 1000 * 500;

  loopChunk(initial, chunkSize, max);
}

function loopChunk(i, chunkSize, max) {
  var limit = Math.min(i + chunkSize, max);

  for (i; i < limit; i++) {
    console.log('my favorite number is %s', i);
  }

  setTimeout(loopChunk.bind(null, i, chunkSize, max), 4);
}
