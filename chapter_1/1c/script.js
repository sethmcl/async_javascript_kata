var inputEl = document.querySelector('#n');
var formEl = document.querySelector('form');

formEl.addEventListener('submit', calculate);

function calculate(e) {
  e.preventDefault();

  var n = parseInt(inputEl.value, 10);

  try {
    factorial(n, function (result) {
        alert(n + '! = ' + result);
    });
  } catch (e) {
    alert('error: ' + e.message);
  }
}

function factorial(n, callback, result) {
  setTimeout(function () {
    result = result || n;

    if (n < 1) {
        throw new Error('n must be greater than or equal to 1');
    }

    if (n === 1) {
        callback(result);
    } else {
        result *= (n - 1);
        factorial(n - 1, callback, result);
    }
  }, 0);
}
