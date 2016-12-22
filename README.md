# ts.events

Implementation for events in typescript, inspired by ActionScript3.0 events and NodeJS events.

```typescript
let dispatcher = new EventDispatcher();
dispatcher.addListener('event1', () => console.log("Called!"));

dispatcher.dispatch("event1");        
```
