var startBtn = document.querySelector('#start-loop');
var listEl = document.querySelector('ul');

startBtn.addEventListener('click', startLoop);

function startLoop() {
  reset();

  for (var i = 1; i < 5; i++) {
    setTimeout(function () {
      print(i);
    }, i * 1000);
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
