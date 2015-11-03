var hashCount = 0;
var startTime = performance.now();

setTimeout(run, 1000);

function run() {
  setStatus('calculating...');
  for(var i = 0; i <= settings.numberOfHashes; i++) {
    CryptoJS.SHA3(CryptoJS.SHA3(i + 'foo'));
    hashCount++;
  }
  done();
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
