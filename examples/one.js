'use strict'
const addListenerFirst = require('../index.js')
const EventEmitter = require('events')

function listenerOne () {
  // eslint-disable-next-line no-console
  console.log('Listener 1: But I was added first!')
}

function listenerTwo () {
  // eslint-disable-next-line no-console
  console.log('Listener 2: I was run first!')
}

const emitter = new EventEmitter()
emitter.on('WOO!', listenerOne)
addListenerFirst(emitter, 'WOO!', listenerTwo)
emitter.emit('WOO!')
