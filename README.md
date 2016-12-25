[![Build Status](https://travis-ci.org/jaklimoff/ts.events.svg?branch=master)](https://travis-ci.org/jaklimoff/ts.events)

# ts.events
![Typescript Events](http://www.fairydelldesigns.co.uk/events%20banner_v_Variation_550%20x%20217-1.jpg)


My own modest vision of how should events work. I use this package in my projects and trying my best to keep it updated and optimized.


Here is the simple example how to addListener to event and the dispatch that event:

```typescript
let dispatcher = new EventDispatcher();
dispatcher.addListener('event1', () => console.log("Called!"));

dispatcher.dispatch("event1");        
```


You also can use several events:

```typescript
let dispatcher = new EventDispatcher();
dispatcher.addListener('onSomeEvent', () => console.log("Called event1!"));
dispatcher.addListener('OnOtherEvent', () => console.log("Called event1!"));
```

You also can add event listener only `once`:

```typescript
let dispatcher = new EventDispatcher();
dispatcher.once('event1', () => console.log("Called!"));

dispatcher.dispatch("event1");        

console.log(dispatcher.listeners('event1').length) // 0
```
