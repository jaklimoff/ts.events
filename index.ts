export interface IListener {
    <T>(arg?: T[]): void;
}


export interface IEventDispatcher {
    /** Add listener for particular event type */
    addListener(event: string, listener: IListener): IEventDispatcher;
    emit(event: string, ...a: any[]): IEventDispatcher;
    dispatch(event: string, ...a: any[]): IEventDispatcher;
    listenerCount(event: string): number;
    allListeners(): Array<Object>;
    /** List of the listeners for particular event */
    listeners(event: string): Array<Object>;
    /** Add listener for particular event type */
    on(event: string, listener: IListener): IEventDispatcher;
    /** Add listener for particular event type, called only once */
    once(event: string, listener: IListener): IEventDispatcher;
    removeAllListeners(event: string): IEventDispatcher;
    removeListener(event: string, listener: IListener): IEventDispatcher;
}

export class EventDispatcher implements IEventDispatcher {
    protected _listeners: Object = {};

    public addListener(event: string, listener): IEventDispatcher {
        return this.on(event, listener);
    }

    public dispatch(event: string, ...a: any[]): EventDispatcher {
        return this.emit.apply(this, [event].concat(a))
    }

    public emit(event: string, ...a: any[]): EventDispatcher {
        let listeners = this._listeners[event];
        listeners.forEach(item => item.listener.apply({}, a || []));
        this._listeners[event] = this._listeners[event].filter(item => !item.once);
        return this;
    }

    public listenerCount(event: string): number {
        return this._listeners[event].length;
    }

    public listeners(event: string): Array<Object> {
        return this._listeners[event];
    }

    public on(event: string, listener: IListener): IEventDispatcher {
        this._register(event, listener, false);
        return this;
    }

    public once(event: string, listener: IListener): IEventDispatcher {
        this._register(event, listener, true);
        return this;
    }

    public removeAllListeners(event: string): IEventDispatcher {
        this._listeners[event] = [];
        return this;
    }

    public removeListener(event: string, listener: IListener): IEventDispatcher {
        this._listeners[event] = this._listeners[event].filter(item =>
            !((item.event === event) && (item.listener === listener))
        );
        return this;
    }

    private _register(event: string, listener: IListener, once: boolean): void {
        let alreadyExist:boolean = false;
        if (this._listeners[event]){
            for (let iList of this._listeners[event]) {
                if (iList.listener == listener) {
                    alreadyExist = true;
                    if (iList.once && !once) {
                        iList.once = once
                    }
                }
            }
        } else {
            this._listeners[event] = []
        }
        !alreadyExist && this._listeners[event].unshift({event, listener, once});
    }

    public allListeners(): Array<Object> {
        let allList: Array<Object> = [];
        for (let key in this._listeners) {
            allList = allList.concat(this._listeners[key])
        }
        return allList;
    }

}
