var history = [];

onconnect = function (e) {
  var port = e.ports[0];

  port.postMessage(history.length);

  port.onmessage = function (message) {
    var text = message.data;
    text += ' (from shared-worker)';
    history.push(text);
    port.postMessage(text);
    port.postMessage(history.length);
  };
};
