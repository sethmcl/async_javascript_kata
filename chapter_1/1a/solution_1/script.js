var startBtn = document.querySelector('#start-loop');
var listEl = document.querySelector('ul');

startBtn.addEventListener('click', startLoop);

function startLoop() {
  reset();

  for (var i = 1; i < 5; i++) {
    // create a closure with an immediately invoked function expression (IIFE)
    // see: https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
    (function (j) {
      setTimeout(function () {
        print(j);
      }, j * 1000);
    })(i);
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
