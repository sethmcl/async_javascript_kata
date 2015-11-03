importScripts('lib/crypto.js');

self.onmessage = function (message) {
  if (message.data.action === 'calculate') {
    postMessage({ results: calculateHashes(message.data.start, message.data.end) });
  }
};

function calculateHashes(start, end) {
  var results = {};

  for(var i = start; i <= end; i++) {
    results[i] = CryptoJS.SHA3(CryptoJS.SHA3(i + 'foo'));
  }

  return results;
}
