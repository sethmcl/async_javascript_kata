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
    runFn(this.resolve.bind(this), this.reject.bind(this));
  }
}

/**
 * Helper: wait for all promises to be resolveed
 * @param {Array} promises Array of promisies to await
 */
Promise.all = function (promises) {
  var resolveCount  = 0;
  var resolveValues = [];
  var b             = new Promise();

  promises.forEach(function (p, idx) {
    p.then(function (value) {
      resolveCount++;
      resolveValues[idx] = value;

      if (resolveCount === promises.length) {
        b.resolve(resolveValues);
      }
    }, function (error) {
      b.reject(error);
    });
  });

  return b;
};


// Define Promise properties
Object.defineProperties(Promise.prototype, {
  isResolved: {
    get: function () {
      return this.state === this.RESOLVED;
    }
  },
  isRejected: {
    get: function () {
      return this.state === this.REJECTED;
    }
  },
  isPending: {
    get: function () {
      return this.state === this.PENDING;
    }
  },
  promise: {
    get: function () {
      return {
        then: this.then.bind(this)
      }
    }
  }
});

/**
 * Promises/A+ compatible then() method
 * @param {Function} onResolved - function to call when promise is resolveed
 * @param {Function} onRejected - function to call when promise is rejected
 * @returns {Object} a new promise
 */
Promise.prototype.then = function (onResolved, onRejected) {
  var p = new Promise();
  var then = { onResolved: onResolved, onRejected: onRejected, p: p };

  if (this.isResolved) {
    setTimeout(function () {
      doResolve.call(this, then);
    }.bind(this), 0);
  } else if (this.isRejected) {
    setTimeout(function () {
      doReject.call(this, then);
    }.bind(this), 0);
  }

  this.thens.push(then);
  return p.promise;
};

/**
 * Resolve this promise
 * @param {Object} value the value to resolve with
 */
Promise.prototype.resolve = function (value) {
  this.value = value;

  if (!this.isPending) {
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
Promise.prototype.reject = function (reason) {
  this.reason = reason;

  if (!this.isPending) {
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
      p.resolve(this.value);
    }

    if (retVal && typeof retVal.then === 'function') {
      retVal.then(function (value) {
        p.resolve(value);
      }, function (reason) {
        p.reject(reason);
      });
    } else {
      p.resolve(retVal);
    }
  } catch (e) {
    p.reject(e);
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
      p.reject(this.reason);
    }

    if (retVal && typeof retVal.then === 'function') {
      retVal.then(function (value) {
        p.resolve(value);
      }, function (reason) {
        p.reject(reason);
      });
    } else {
      p.resolve(retVal);
    }
  } catch(e) {
    p.reject(e);
  }
}
