var assert = require('assert');
var Events = require('../Events');
var module = require('../');

describe('Module', function () {
  it('should be an instance of Events', function () {
    assert(module instanceof Events === true, 'Module is not an instance of Events');
  });
});
