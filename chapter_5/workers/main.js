// var hash = CryptoJS.SHA3('foobar', { outputLength: 512 });
// var start = performance.now();
// for(var i = 100; i < 10000; i++) {
//   var hash = CryptoJS.SHA3(CryptoJS.SHA3(i + 'foo'));
//   // console.log(i);
//   console.log(hash.toString());
// }
// console.log(performance.now() - start);

var hashCount = 0;
var start = 0;
var current = 0;
var end = 1000 * 100;

var workers = [];
var finishedWorkers = [];
var workerCount = 4;

var startTime;
var endTime;

function begin() {
  setStatus('calculating...');
  startTime = performance.now();
  for (var i = 0; i < workerCount; i++) {
    workers[i] = new Worker('worker.js');
    workers[i].onmessage = onMessageFromWorker;
    workers[i].id = i;
    requestWork(workers[i]);
  }
}

function onMessageFromWorker(message) {
  var results = message.data.results;
  hashCount += Object.keys(results).length;

  if (current < end) {
    requestWork(this);
  } else {
    this.terminate();
    finishedWorkers.push(this);

    if (workers.length === finishedWorkers.length) {
      done();
    }
  }
};

function requestWork(worker) {
  var startAt = current;
  var endAt = Math.min(current + 1000, end);
  current = endAt + 1;

  worker.postMessage({
    action: 'calculate',
    start: startAt,
    end: endAt
  });
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

begin();
