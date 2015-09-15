var sinon  = require('sinon');
var assert = require('assert');
var Events = require('../Events');

describe('Events', function () {

  describe('register one event handler', function () {
    var instance, handlerFn, ctx;

    before(function () {
      instance = new Events();
      handlerFn = sinon.spy();
      ctx = { type: 'my object' };

      instance.on('myEvent', handlerFn, ctx, 'lewis', 'michael');
      instance.trigger('myEvent', 'seth');
      instance.trigger('myEvent', 'seth', 'ariya');
    });

    it('should invoke callback', function () {
      assert(handlerFn.callCount === 2, 'Event handler callback was not invoked twice');
    });

    it('should invoke callback with correct context', function () {
      assert(handlerFn.thisValues[0] === ctx, 'Event handler callback was not invoked with correct context');
    });

    it('should invoke callback with correct number of args', function () {
      assert(handlerFn.args.length === 2, 'Event handler callback invoked with incorrect number of args');
    });

    it('should invoke callback with correct first arg', function () {
      assert(handlerFn.args[1][0] === 'lewis', 'Event handler callback arg 1 is incorrect');
    });

    it('should invoke callback with correct second arg', function () {
      assert(handlerFn.args[1][1] === 'michael', 'Event handler callback arg 2 is incorrect');
    });

    it('should invoke callback with correct first trigger arg', function () {
      assert(handlerFn.args[1][2] === 'seth', 'Event handler trigger arg 1 is incorrect');
    });

    it('should invoke callback with correct second trigger arg', function () {
      assert(handlerFn.args[1][3] === 'ariya', 'Event handler trigger arg 2 is incorrect');
    });
  });

  describe('register multiple event handlers', function () {
    var instance, handlerFn1, handlerFn2;

    before(function () {
      instance = new Events();
      handlerFn1 = sinon.spy();
      handlerFn2 = sinon.spy();

      instance.on('myEvent', handlerFn1, null, 'lewis');
      instance.on('myEvent', handlerFn2, null, 'seth');

      instance.trigger('myEvent');
    });

    it('should have invoked first handler', function () {
      assert(handlerFn1.callCount === 1, 'Event handler callback 1 was not invoked');
    });

    it('should have invoked first handler with correct arg count', function () {
      assert(handlerFn1.args[0].length === 1, 'Event handler callback 1 was not invoked with correct arg count');
    });

    it('should have invoked first handler with correct first arg', function () {
      assert(handlerFn1.args[0][0] === 'lewis', 'Event handler callback 1 was not invoked with correct arg');
    });

    it('should have invoked second handler', function () {
      assert(handlerFn2.callCount === 1, 'Event handler callback 2 was not invoked');
    });

    it('should have invoked second handler with correct arg count', function () {
      assert(handlerFn2.args[0].length === 1, 'Event handler callback 2 was not invoked with correct arg count');
    });

    it('should have invoked second handler with correct first arg', function () {
      assert(handlerFn2.args[0][0] === 'seth', 'Event handler callback 2 was not invoked with correct arg');
    });
  });

  describe('register an event handler to fire once', function () {
    var instance, handlerFn;

    before(function () {
      instance = new Events();
      handlerFn = sinon.spy();

      instance.once('myEvent', handlerFn);
      instance.trigger('myEvent');
      instance.trigger('myEvent');
    });

    it('should have invoked handler once', function () {
      assert(handlerFn.callCount === 1, 'Event handler callback was not invoked one and only one time');
    });
  });

  describe('remove one event handler', function () {
    var instance, handlerFn1, handlerFn2;

    before(function () {
      instance = new Events();
      handlerFn1 = sinon.spy();
      handlerFn2 = sinon.spy();

      instance.on('myEvent', handlerFn1);
      instance.on('myEvent', handlerFn2)
      instance.trigger('myEvent');
      instance.off('myEvent', handlerFn1);
      instance.trigger('myEvent');
      instance.off('myEvent');
      instance.trigger('myEvent');
    });

    it('should have invoked first handler one time', function () {
      assert(handlerFn1.callCount === 1, 'First event handler callback was not invoked once and only once');
    });

    it('should have invoked second handler twice', function () {
      assert(handlerFn2.callCount === 2, 'Second event handler callback was not invoked twice and only twice');
    });
  });

  describe('remove all event handlers', function () {
    var instance, handlerFn1, handlerFn2;

    before(function () {
      instance = new Events();
      handlerFn1 = sinon.spy();
      handlerFn2 = sinon.spy();

      instance.on('myEvent', handlerFn1);
      instance.on('myEvent', handlerFn2);
      instance.trigger('myEvent');
      instance.off('myEvent');
      instance.trigger('myEvent');
    });

    it('should have invoked handler 1 one time', function () {
      assert(handlerFn1.callCount === 1, 'Event handler 1 callback was not invoked once and only once');
    });

    it('should have invoked handler 2 one time', function () {
      assert(handlerFn2.callCount === 1, 'Event handler 2 callback was not invoked once and only once');
    });
  });
});
