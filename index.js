"use strict";
var EventDispatcher = (function () {
    function EventDispatcher() {
        this._listeners = {};
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
        var listeners = this._listeners[event];
        if (listeners) {
            listeners.forEach(function (item) { return item.listener.apply({}, a || []); });
            this._listeners[event] = this._listeners[event].filter(function (item) { return !item.once; });
        }
        return this;
    };
    EventDispatcher.prototype.listenerCount = function (event) {
        return this._listeners[event].length;
    };
    EventDispatcher.prototype.listeners = function (event) {
        return this._listeners[event];
    };
    EventDispatcher.prototype.on = function (event, listener) {
        this._register(event, listener, false);
        return this;
    };
    EventDispatcher.prototype.once = function (event, listener) {
        this._register(event, listener, true);
        return this;
    };
    EventDispatcher.prototype.removeAllListeners = function (event) {
        this._listeners[event] = [];
        return this;
    };
    EventDispatcher.prototype.removeListener = function (event, listener) {
        this._listeners[event] = this._listeners[event].filter(function (item) {
            return !((item.event === event) && (item.listener === listener));
        });
        return this;
    };
    EventDispatcher.prototype._register = function (event, listener, once) {
        var alreadyExist = false;
        if (this._listeners[event]) {
            for (var _i = 0, _a = this._listeners[event]; _i < _a.length; _i++) {
                var iList = _a[_i];
                if (iList.listener == listener) {
                    alreadyExist = true;
                    if (iList.once && !once) {
                        iList.once = once;
                    }
                }
            }
        }
        else {
            this._listeners[event] = [];
        }
        !alreadyExist && this._listeners[event].unshift({ event: event, listener: listener, once: once });
    };
    EventDispatcher.prototype.allListeners = function () {
        var allList = [];
        for (var key in this._listeners) {
            allList = allList.concat(this._listeners[key]);
        }
        return allList;
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
