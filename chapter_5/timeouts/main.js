var hashCount = 0;
var startTime = performance.now();

var chunkSize = 1000;
var current = 0;

setStatus('calculating...');
run();

function run() {
  var max = Math.min(current + chunkSize, settings.numberOfHashes);
  // var max = settings.numberOfHashes;

  for(var i = current; i <= max; i++) {
    CryptoJS.SHA3(CryptoJS.SHA3(i + 'foo'));
    hashCount++;
  }

  current = i;

  if (current >= settings.numberOfHashes) {
    done();
  } else {
    requestAnimationFrame(run);
  }
}

function done() {
  var duration = performance.now() - startTime;
  var message = [
    'All done! Calculated ' + hashCount + ' hashes',
    'Time: ' + duration + 'ms'
  ].join('\n');

  setStatus(message);
}

function setStatus(message) {
  document.querySelector('textarea').value = message;
}
