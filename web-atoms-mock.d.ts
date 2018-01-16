declare namespace WebAtoms {
    class AtomControl {
        _element: HTMLElement;
        constructor(e: HTMLElement);
        init(): void;
    }
}
declare namespace WebAtoms {
    class AtomUI {
        static parseValue(val: any): any;
        static parseUrl(url: string): any;
    }
}
declare namespace WebAtoms {
    class AtomUri {
        hash: any;
        query: any;
        path: string;
        port: string;
        protocol: string;
        host: string;
        constructor(url: string);
    }
}
declare class AtomPromise {
    aborted: boolean;
    success: Array<() => void>;
    fails: Array<(f: any) => void>;
    failed(f: (x: any) => void): void;
    then(f: () => void): void;
    _value: any;
    value(): any;
    resolved: boolean;
    abort(throwIfResolved: boolean): void;
    invoke(r: any, f: any): void;
}
declare var Atom: any;
declare class Dispatcher {
    head: any;
    tail: any;
    callLater(f: () => void): void;
    run(): void;
}
declare var AtomDate: any;
declare class AtomEnumerator {
    a: any;
    i: number;
    constructor(a: any);
    next(): boolean;
    current(): any;
    currentIndex(): number;
}
declare var AtomBinder: {
    getClone: (dupeObj: any) => any;
    setValue: (target: any, key: any, value: any) => void;
    refreshValue: (target: any, key: any, oldValue: any, value: any) => void;
    getValue: (target: any, key: any) => any;
    add_WatchHandler: (target: any, key: any, handler: any) => void;
    get_WatchHandler: (target: any, key: any) => any;
    remove_WatchHandler: (target: any, key: any, handler: any) => void;
    invokeItemsEvent: (target: any, mode: any, index: any, item: any) => void;
    clear: (ary: any) => void;
    addItem: (ary: any, item: any) => void;
    insertItem: (ary: any, index: any, item: any) => void;
    addItems: (ary: any, items: any) => void;
    removeItem: (ary: any, item: any) => void;
    removeAtIndex: (ary: any, i: any) => void;
    refreshItems: (ary: any) => void;
    add_CollectionChanged: (target: any, handler: any) => void;
    remove_CollectionChanged: (target: any, handler: any) => void;
    setError: (target: any, key: any, message: any) => void;
};
