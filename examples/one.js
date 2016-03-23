var addListenerFirst = require('../index.js')
var EventEmitter = require('events')

function listenerOne() {
  console.log('Listener 1: But I was added first!')
}

function listenerTwo() {
  console.log('Listener 2: I was run first!')
}

var emitter = new EventEmitter()
emitter.on('WOO!', listenerOne)
addListenerFirst(emitter,'WOO!',listenerTwo)
emitter.emit('WOO!')
