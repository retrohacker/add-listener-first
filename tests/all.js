var addListenerFirst = require('../index.js')
var EventEmitter = require('events')
var test = require('tape')

// This function doesn't need to be async because EventEmitter doesn't yield
// the event loop, meaning all emitters will be run syncronously before the
// calling context continues execution
test('Listeners maintain proper order', function(t) {
  // We create 3 listeners. We add one directly then the other two in reverse
  // order using `addListenerFirst` and ensure they are called in the correct
  // order.
  t.plan(3)

  //listeners_triggered keeps track of the order listeners are called
  // in
  var listeners_triggered = 0
  // Functions are named by the order they should be called, not the order
  // they are added
  function first () {
    // post-increment and assert we are the first called
    t.equal(listeners_triggered++,0,'first is called first')
  }

  function second () {
    // post-increment and assert we are the second called
    t.equal(listeners_triggered++,1,'second is called second')
  }

  function third () {
    // post-increment and assert we are the third called
    t.equal(listeners_triggered++,2,'third is called third')
  }

  // Create a new EventEmitter and attach all of our events to it
  var emitter = new EventEmitter()

  // Define the event we will respond to
  var event = 'WOO'
  emitter.on(event, third)
  addListenerFirst(emitter,event,second)
  addListenerFirst(emitter,event,first)
  emitter.emit(event)
})

// We want to ensure that this library  can add an event listener on an
// EventEmitter since it could be a potential edge case.
test('addListenerFirst works on empty emitter', function(t) {
  // We need to make sure the function is called
  t.plan(1)
  function toBeCalled () {
    t.ok(true, 'Callback was called!')
  }

  // Create a new emitter, add it, and then trigger the event
  var emitter = new EventEmitter()
  var event = 'WOO'
  emitter.on(event, toBeCalled)
  emitter.emit(event)
})

// We want to ensure that if we pass in an object that isn't an EventEmitter,
// this module does not crash the system. By design, this module will not throw
// and simply returns null if an invalid object is passed in, no attempt to
// work with the object will be made
test('Handle invalid object like a champ', function(t) {

  // We create a single function stub that should never be called according to
  // this modules contract. We will use this to enssure our function exits
  // as intended
  function doNotCall() {
    t.fail('Should not have attempted to add a listener')
    // Allow for chaining just in case
    return falseEmitter
  }

  // Lets create a fake event listener, check to see if the module throws
  // or if it attempts to add a listener to the object.
  var falseEmitter = {}
  falseEmitter.on = doNotCall
  falseEmitter.once = doNotCall
  falseEmitter.listeners = doNotCall
  falseEmitter.addListener = doNotCall
  falseEmitter.emit = doNotCall
  falseEmitter.getMaxListeners = doNotCall
  falseEmitter.setMaxListeners = doNotCall
  falseEmitter.listenerCount = doNotCall
  falseEmitter.removeAllListeners = doNotCall
  addListenerFirst(falseEmitter, 'WOO', function() {
    t.fail('This function should not be called, something strange has happend')
  })
  t.end()
})
