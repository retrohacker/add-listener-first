add-listener-first
==================

A module which allows you to add a listener to the beginning of an EventEmitter's list of handled events. Barring future displacement, this ensures that your listener will be called before all others.

# Why?

If your application does any top-level logging, you may be hooking into `process.on([SIGNAL]` or `process.on(`. Often times, listeners for these signals include `process.exit` to gracefully shutdown the application with a meaningful error code. If these listeners are tirggered prior to your logging logic, your application will shutdown before your logging happens. This module ensures that your listener will be executed first, barring future displacement.

# Example

```js
var addListenerFirst = require('add-listener-first')
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
```

```text
Listener 2: I was run first!
Listener 1: But I was added first!
```
