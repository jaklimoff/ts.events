"use strict";
var index_1 = require("../index");
describe("Base actions with dispatcher", function () {
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
    it("Check add listener", function () {
        expect(ed['_listeners'].length).toBe(2);
    });
    it("Check if dispatcher works", function () {
        ed.emit('event1');
        expect(callbacks.onDispatchEvent1).toHaveBeenCalled();
        expect(callbacks.onDispatchEvent2).not.toHaveBeenCalled();
        ed.dispatch('event2');
        expect(callbacks.onDispatchEvent2).toHaveBeenCalled();
    });
});
