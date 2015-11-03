var worker = new SharedWorker('shared-worker.js');

// worker.port.start();

worker.port.onmessage = function (message) {
  log = document.querySelector('textarea');
  log.value = message.data + '\n' + log.value;
};

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  var text = document.querySelector('form input[name="message"]').value;
  worker.port.postMessage(text);
});
