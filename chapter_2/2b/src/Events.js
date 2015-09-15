module.exports = Events;

/**
 * See http://usejsdoc.org/ for more information about writing jsdoc comments
 * @constructor
 */
function Events() {
}

/**
 * Listen to an event
 *
 * @param {string} eventName Name of the event
 * @param {function} handlerFn Callback function
 * @param {object} ctx Callback context
 * @param {...*} [boundArg] Argument to pass to handlerFn when it is called
 */
Events.prototype.on = function (eventName, handlerFn, ctx, boundArg) {
};

/**
 * Listen to an event, and automatically unregister the handler after
 * the event fires.
 *
 * @param {string} eventName Name of the event
 * @param {function} handlerFn Callback function
 * @param {object} ctx Callback context
 * @param {...*} [boundArg] Argument to pass to handlerFn when it is called
 */
Events.prototype.once = function (eventName, handlerFn, ctx, boundArg) {
};

/**
 * Stop listening to an event. If a handlerFn parameter is provided, this event handler
 * is unregistered. If no handler is provided, then ALL handlers for this event will be
 * unregistered.
 *
 * @param {string} eventName Name of the event
 * @param {function} [handlerFn] Callback function
 */
Events.prototype.off = function (eventName, handlerFn) {
};

/**
 * Trigger an event
 * @param {string} eventName
 * @param {...*} [arg] Argument to pass to event handler functions
 */
Events.prototype.trigger = function (eventName, arg) {
};


