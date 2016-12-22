export interface IListener {
    <T>(arg?: T[]): void;
}

export interface IEventDispatcher {
    /** Add listener for particular event type */
    addListener(event: string, listener: IListener): IEventDispatcher;
    emit(event: string, ...a: any[]): boolean;
    dispatch(event: string, ...a: any[]): boolean;
    getMaxListeners(): number;
    listenerCount(event: string): number;
    /** List of the listeners for particular event */
    listeners(event: string): Array<IListener>;
    /** Add listener for particular event type */
    on(event: string, listener: IListener): IEventDispatcher;
    /** Add listener for particular event type, called only once */
    once(event: string, listener: IListener): IEventDispatcher;
    removeAllListeners(event: string): IEventDispatcher;
    removeListener(event: string, listener: IListener): IEventDispatcher;
    setMaxListeners(thressholds: number): IEventDispatcher;
}

export class EventDispatcher implements IEventDispatcher {
    public static defaultMaxListeners: number = 10;
    protected _listeners: any[] = [];
    private _maxListeners: number = null;
    public addListener(event: string, listener): IEventDispatcher {
        return this.on(event, listener);
    }
    public dispatch(event: string, ...a: any[]): boolean {
        return this.emit.apply(this, [event].concat(a))
    }
    public emit(event: string, ...a: any[]): boolean {
        let listeners = this._listeners.filter(item => item.event === event);
        listeners.forEach(item => item.listener.apply({}, a || []));
        // TODO: Add ability to use `once` lsitener
        // this._listeners = listeners.filter(item => !item.once);
        // return listeners.length !== 0 ? true : false;
        return true;
    }
    public getMaxListeners(): number {
        return this._maxListeners === null ? EventDispatcher.defaultMaxListeners : this._maxListeners;
    }
    public listenerCount(event: string): number {
        return this._listeners.filter(item => item.event === event)
            .length;
    }
    public listeners(event: string): Array<IListener> {
        return this._filterMatchingEvents(event)
            .map(item => item.listener)
            .reverse();
    }

    public on(event: string, listener: IListener ): IEventDispatcher {
        this._register(event, listener, false);
        return this;
    }

    public once(event: string, listener: IListener ): IEventDispatcher {
        this._register(event, listener, false);
        return this;
    }

    public removeAllListeners(event: string): IEventDispatcher {
        this._listeners = this._filterNonMatchingEvents(event);
        return this;
    }
    public removeListener(event: string, listener: IListener): IEventDispatcher {
        this._listeners = this._listeners.filter(item =>
            !((item.event === event) && (item.listener === listener))
        );
        return this;
    }
    public setMaxListeners(thresshold: number): IEventDispatcher {
        this._maxListeners = thresshold;
        return this;
    }
    private _filterMatchingEvents(event: string): any[] {
        return this._listeners.filter( item => item.event === event);
    }
    private _filterNonMatchingEvents(event: string): any[] {
        return this._listeners.filter(item => item.event !== event);
    }
    private _register(event: string, listener: IListener, once: boolean): void {
        !this._checkListenerLimitReached(event) && this._listeners.indexOf(listener) == -1 && this._listeners.unshift({event, listener, once});
        return;
    }
    private _returnListenerLimit(): number {
        return this._maxListeners === null ? EventDispatcher.defaultMaxListeners : this._maxListeners;
    }
    private _checkListenerLimitReached(event: string): boolean {
        let limitReached = this.listenerCount(event) === this._returnListenerLimit() ? true : false;
        limitReached && console.log("Listener Limit Reached");
        return limitReached;
    }
}
