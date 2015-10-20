module.exports = Promise;

/**
 * Promise constructor
 * @constructor
 */
function Promise(runFn) {
  this.thens = [];
  this.PENDING = 0;
  this.RESOLVED = 1;
  this.REJECTED = 2;
  this.state = this.PENDING;

  if (runFn) {
    runFn(resolve.bind(this), reject.bind(this));
  }
}

/**
 * Return a new promise that is in the resolved state
 * @returns {Promise}
 */
Promise.resolve = function (value) {
  return new Promise(function (resolve, reject) {
    resolve(value);
  });
};

/**
 * Return a new promise that is in the rejected state
 * @returns {Promise}
 */
Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason);
  });
};

/**
 * Helper: wait for all promises to be resolveed
 * @param {Array} promises Array of promisies to await
 */
Promise.all = function (promises) {
  var resolveCount  = 0;
  var resolveValues = [];
  var resolveB;
  var rejectB;

  var b = new Promise(function (resolve, reject) {
    resolveB = resolve;
    rejectB = reject;
  });

  promises.forEach(function (p, idx) {
    p.then(function (value) {
      resolveCount++;
      resolveValues[idx] = value;

      if (resolveCount === promises.length) {
        resolveB(resolveValues);
      }
    }, function (error) {
      rejectB(error);
    });
  });

  return b;
};


/**
 * Promises/A+ compatible then() method
 * @param {Function} onResolved - function to call when promise is resolveed
 * @param {Function} onRejected - function to call when promise is rejected
 * @returns {Object} a new promise
 */
Promise.prototype.then = function (onResolved, onRejected) {
  var resolveSelf;
  var rejectSelf;

  var p = new Promise(function (resolve, reject) {
    resolveSelf = resolve;
    rejectSelf = reject;
  });

  var then = { onResolved: onResolved, onRejected: onRejected, p: p, resolveP: resolveSelf, rejectP: rejectSelf };

  if (this.state === this.RESOLVED) {
    setTimeout(function () {
      doResolve.call(this, then);
    }.bind(this), 0);
  } else if (this.state === this.REJECTED) {
    setTimeout(function () {
      doReject.call(this, then);
    }.bind(this), 0);
  }

  this.thens.push(then);
  return p;
};

/**
 * Resolve this promise
 * @param {Object} value the value to resolve with
 */
function resolve(value) {
  this.value = value;

  if (this.state !== this.PENDING) {
    return;
  }

  this.state = this.RESOLVED;

  this.thens.forEach(function (then) {
    doResolve.call(this, then);
  }, this);
};

/**
 * Reject this promise
 * @param {Object} reason the reason for rejection
 */
function reject(reason) {
  this.reason = reason;

  if (this.state !== this.PENDING) {
    return;
  }

  this.state = this.REJECTED;

  this.thens.forEach(function (then) {
    doReject.call(this, then);
  }, this);
};

/**
 * Resolve the promise
 * @param {Object} then contains handlers and promise
 */
function doResolve(then) {
  var retVal, onResolved, p;

  onResolved = then.onResolved;
  p = then.p;

  try {
    if (typeof onResolved === 'function') {
      retVal = onResolved(this.value);
    } else {
      then.resolveP(this.value);
    }

    if (retVal && typeof retVal.then === 'function') {
      retVal.then(function (value) {
        then.resolveP(value);
      }, function (reason) {
        then.rejectP(reason);
      });
    } else {
      then.resolveP(retVal);
    }
  } catch (e) {
    then.rejectP(e);
  }
}

/**
 * Reject the promise
 * @param {Object} then contains handlers and promise
 */
function doReject(then) {
  var retVal, onRejected, p;

  onRejected = then.onRejected;
  p = then.p;

  try {
    if (typeof onRejected === 'function') {
      retVal = onRejected(this.reason);
    } else {
      then.rejectP(this.reason);
    }

    if (retVal && typeof retVal.then === 'function') {
      retVal.then(function (value) {
        then.resolveP(value);
      }, function (reason) {
        then.rejectP(reason);
      });
    } else {
      then.resolveP(retVal);
    }
  } catch(e) {
    then.rejectP(e);
  }
}
