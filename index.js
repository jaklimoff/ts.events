"use strict";
var EventDispatcher = (function () {
    function EventDispatcher() {
        this._listeners = [];
        this._maxListeners = null;
    }
    EventDispatcher.prototype.addListener = function (event, listener) {
        return this.on(event, listener);
    };
    EventDispatcher.prototype.dispatch = function (event) {
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
        return this.emit.apply(this, [event].concat(a));
    };
    EventDispatcher.prototype.emit = function (event) {
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
        var listeners = this._listeners.filter(function (item) { return item.event === event; });
        listeners.forEach(function (item) { return item.listener.apply({}, a || []); });
        // TODO: Add ability to use `once` lsitener
        // this._listeners = listeners.filter(item => !item.once);
        // return listeners.length !== 0 ? true : false;
        return true;
    };
    EventDispatcher.prototype.getMaxListeners = function () {
        return this._maxListeners === null ? EventDispatcher.defaultMaxListeners : this._maxListeners;
    };
    EventDispatcher.prototype.listenerCount = function (event) {
        return this._listeners.filter(function (item) { return item.event === event; })
            .length;
    };
    EventDispatcher.prototype.listeners = function (event) {
        return this._filterMatchingEvents(event)
            .map(function (item) { return item.listener; })
            .reverse();
    };
    EventDispatcher.prototype.on = function (event, listener) {
        this._register(event, listener, false);
        return this;
    };
    EventDispatcher.prototype.once = function (event, listener) {
        this._register(event, listener, false);
        return this;
    };
    EventDispatcher.prototype.removeAllListeners = function (event) {
        this._listeners = this._filterNonMatchingEvents(event);
        return this;
    };
    EventDispatcher.prototype.removeListener = function (event, listener) {
        this._listeners = this._listeners.filter(function (item) {
            return !((item.event === event) && (item.listener === listener));
        });
        return this;
    };
    EventDispatcher.prototype.setMaxListeners = function (thresshold) {
        this._maxListeners = thresshold;
        return this;
    };
    EventDispatcher.prototype._filterMatchingEvents = function (event) {
        return this._listeners.filter(function (item) { return item.event === event; });
    };
    EventDispatcher.prototype._filterNonMatchingEvents = function (event) {
        return this._listeners.filter(function (item) { return item.event !== event; });
    };
    EventDispatcher.prototype._register = function (event, listener, once) {
        !this._checkListenerLimitReached(event) && this._listeners.indexOf(listener) == -1 && this._listeners.unshift({ event: event, listener: listener, once: once });
        return;
    };
    EventDispatcher.prototype._returnListenerLimit = function () {
        return this._maxListeners === null ? EventDispatcher.defaultMaxListeners : this._maxListeners;
    };
    EventDispatcher.prototype._checkListenerLimitReached = function (event) {
        var limitReached = this.listenerCount(event) === this._returnListenerLimit() ? true : false;
        limitReached && console.log("Listener Limit Reached");
        return limitReached;
    };
    EventDispatcher.defaultMaxListeners = 10;
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
