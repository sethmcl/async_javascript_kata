var inputEl = document.querySelector('#n');
var formEl = document.querySelector('form');

formEl.addEventListener('submit', calculate);

function calculate(e) {
  e.preventDefault();

  var n = parseInt(inputEl.value, 10);

  factorial(n, function (err, result) {
    if (err) {
      return alert('error: ' + err.message);
    }

    alert(n + '! = ' + result);
  });
}

function factorial(n, callback, result) {
  setTimeout(function () {
    result = result || n;

    if (n < 1) {
        return callback(new Error('n must be greater than or equal to 1'));
    }

    if (n === 1) {
        callback(null, result);
    } else {
        result *= (n - 1);
        factorial(n - 1, callback, result);
    }
  }, 0);
}
