var sinon   = require('sinon');
var assert  = require('assert');
var Promise = require('../Promise.js');

describe('Promise library', function () {
  describe('resolve', function () {
    it('should invoke the resolve callback', function (done) {
      var callbackResolve = function (value) {
        assert.equal(value, 42);
        done();
      };

      new Promise(function (resolve, reject) {
        resolve(42);
      }).then(callbackResolve, null);

    });
  });

  describe('resolve', function () {
    it('should invoke the reject callback', function (done) {
      var callbackReject = function (value) {
        assert.equal(value, 42);
        done();
      };

      new Promise(function (resolve, reject) {
        reject(42);
      }).then(null, callbackReject);

    });

    it('should work with chained promises', function (done) {
      new Promise(function (resolve, reject) {
        resolve(42);
      }).then(function (val) {
        return new Promise(function (resolve, reject) {
          resolve(val);
        });
      }).then(function (val) {
        assert.equal(val, 42);
        done();
      });
    });
  });

  describe('helper methods', function () {
    it('Promise.reject() should return a rejected promise', function (done) {
      var p = Promise.reject(new Error('An error'));
      p.then(null, function (err) {
        assert.equal(err.message, 'An error');
        done();
      });
    });

    it('Promise.resolve() should return a resolved promise', function (done) {
      var p = Promise.resolve(42);
      p.then(function (value) {
        assert.equal(value, 42);
        done();
      }, null);
    });

    it('Promise.all() should wait for all promises to complete', function (done) {
      var promise1 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 100, 1);
      });

      var promise2 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 50, 2);
      });

      Promise
        .all([promise1, promise2])
        .then(function (values) {
          assert.equal(values[0], 1);
          assert.equal(values[1], 2);
        })
        .then(done, done);
    });
  });
});
