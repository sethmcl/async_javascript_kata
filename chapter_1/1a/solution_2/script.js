var startBtn = document.querySelector('#start-loop');
var listEl = document.querySelector('ul');

startBtn.addEventListener('click', startLoop);

function startLoop() {
  reset();

  for (var i = 1; i < 5; i++) {
    // pass argument value to setTimeout callback
    // see: https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout
    setTimeout(function (j) {
      print(j);
    }, i * 1000, i);
  }

}

function print(i) {
  var li = document.createElement('li');
  li.innerHTML = i;
  listEl.appendChild(li);
}

function reset() {
  listEl.innerHTML = '';
}
