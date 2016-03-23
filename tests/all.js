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
