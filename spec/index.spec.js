"use strict";
var index_1 = require("../index");
describe("Base actions with dispatcher:", function () {
    var callbacks, ed = null;
    beforeEach(function () {
        callbacks = {
            onDispatchEvent1: function (e) { },
            onDispatchEvent2: function (e) { }
        };
        spyOn(callbacks, "onDispatchEvent1");
        spyOn(callbacks, "onDispatchEvent2");
        ed = new index_1.EventDispatcher();
        ed.addListener('event1', callbacks.onDispatchEvent1);
        ed.on('event2', callbacks.onDispatchEvent2);
    });
    it("add listener", function () {
        ed.on('event3', callbacks.onDispatchEvent2);
        expect(ed.allListeners().length).toBe(3);
    });
    it("dispatch without listeners", function () {
        ed.emit('event3');
        ed.addListener('event3', callbacks.onDispatchEvent1);
        ed.emit('event3');
        expect(callbacks.onDispatchEvent1).toHaveBeenCalled();
    });
    it("duplicated listeners", function () {
        ed.addListener('event1', callbacks.onDispatchEvent1);
        ed.on('event2', callbacks.onDispatchEvent2);
        ed.once('event3', callbacks.onDispatchEvent2);
        ed.on('event3', callbacks.onDispatchEvent2);
        expect(ed.allListeners().length).toBe(3);
        expect(ed.listeners('event3')[0]['once']).toBe(false);
    });
    it(".once() listener", function () {
        ed.once('event3', callbacks.onDispatchEvent1);
        ed.emit('event3');
        expect(callbacks.onDispatchEvent1).toHaveBeenCalled();
        expect(ed.allListeners().length).toBe(2);
    });
    it("if dispatcher works", function () {
        ed.emit('event1');
        expect(callbacks.onDispatchEvent1).toHaveBeenCalled();
        expect(callbacks.onDispatchEvent2).not.toHaveBeenCalled();
        ed.dispatch('event2');
        expect(callbacks.onDispatchEvent2).toHaveBeenCalled();
    });
});
