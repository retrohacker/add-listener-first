/*
 * add-listener-first
 *
 * A module which allows you to add a listener to the beginning of an
 * EventEmitter's list of handled events. Barring future
 * displacement, this ensures that your listener will be called before all
 * others.
 *
 * An example of where this is useful is when registering logging functions
 * against `process.on('[SIGNAL]'..` to ensure another handler doesn't call
 * `process.exit` before your listener gets a chance to log shutdown.
 */
var events = require('events')

// Expose the function
module.exports = function(eventEmitter, event,  listener) {
  // If eventEmitter doesn't have EventEmitter on its protocol chain, then
  // we have nothing to do.
  if(! (eventEmitter instanceof events.EventEmitter) ) {
    return null
  }

  // Lets get a list of the current listeners to add back
  var listeners = eventEmitter.listeners(event)

  // Lets remove them
  eventEmitter.removeAllListeners(event)

  // And add our listener back
  eventEmitter.on(event,listener)

  // Then replace all the removed listeners
  for(var i = 0; i < listeners.length; i++) {
    eventEmitter.on(event,listeners[i])
  }
}
