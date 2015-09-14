### Asynchronous errors

Examine the code in `script.js`. Try loading `index.html` in your browser, and enter an invalid number, such as 0.

Why is the alert with the exception message not shown? How could you fix this so that the asynchronous error is handled correctly?

Try to eliminate the use of any try-catch statements, and instead communicate error situations with callback parameters, following the callback error pattern:
```javascript
function callback(err, result) {
  if (err) {
    // handle error, return
  }
  // handle result
}

doSomething(callback);
// if doSomething has an error, it should call callback(error)
// otherwise it should call callback(null, error)
```
