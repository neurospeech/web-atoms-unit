// Test dummy
// Do not use in live
var AtomPromise = /** @class */ (function () {
    function AtomPromise() {
        this.aborted = false;
        this.success = [];
        this.fails = [];
    }
    AtomPromise.prototype.failed = function (f) {
        this.fails.push(f);
    };
    AtomPromise.prototype.then = function (f) {
        this.success.push(f);
    };
    AtomPromise.prototype.value = function () {
        return this._value;
    };
    AtomPromise.prototype.abort = function (throwIfResolved) {
        this.aborted = true;
        if (this.resolved) {
            if (throwIfResolved) {
                throw new Error("Abort cannot be called after promise was resolved");
            }
        }
    };
    AtomPromise.prototype.invoke = function (r, f) {
        var _this = this;
        setTimeout(function () {
            _this.resolved = true;
            if (_this.aborted || f) {
                for (var _i = 0, _a = _this.fails; _i < _a.length; _i++) {
                    var fx1 = _a[_i];
                    fx1(f || "cancelled");
                }
            }
            else {
                _this._value = r;
                for (var _b = 0, _c = _this.success; _b < _c.length; _b++) {
                    var fx = _c[_b];
                    fx();
                }
            }
        }, 100);
    };
    return AtomPromise;
}());
var Atom = window["Atom"];
Atom.json = function (url, options) {
    var pr = new AtomPromise();
    return pr;
};
var AtomDate = window["AtomDate"];
var AtomEnumerator = /** @class */ (function () {
    function AtomEnumerator(a) {
        this.a = a;
        this.i = -1;
    }
    AtomEnumerator.prototype.next = function () {
        this.i++;
        return this.i < this.a.length;
    };
    AtomEnumerator.prototype.current = function () {
        return this.a[this.i];
    };
    AtomEnumerator.prototype.currentIndex = function () {
        return this.i;
    };
    return AtomEnumerator;
}());
Atom.refresh = function (item, property) {
    var hs = item._$_handlers;
    if (!hs)
        return;
    var hl = hs[property];
    if (!hl)
        return;
    for (var _i = 0, hl_1 = hl; _i < hl_1.length; _i++) {
        var f = hl_1[_i];
        f();
    }
};
Atom.get = function (item, property) {
    if (!item)
        return;
    for (var _i = 0, _a = property.split("."); _i < _a.length; _i++) {
        var p = _a[_i];
        item = AtomBinder.getValue(item, p);
        if (!item)
            break;
    }
    return item;
};
Atom.set = function (item, property, value) {
    if (!item)
        return;
    var last = null;
    var lastProperty = null;
    for (var _i = 0, _a = property.split("."); _i < _a.length; _i++) {
        var p = _a[_i];
        if (last) {
            last = AtomBinder.getValue(last, lastProperty);
            if (!last)
                return;
        }
        else {
            last = item;
        }
        lastProperty = p;
    }
    if (!last)
        return;
    AtomBinder.setValue(last, lastProperty, value);
};
window["Atom"] = Atom;
var AtomBinder = {
    getClone: function (dupeObj) {
        var retObj = {};
        if (typeof (dupeObj) == 'object') {
            if (typeof (dupeObj.length) != 'undefined')
                retObj = new Array();
            for (var objInd in dupeObj) {
                var val = dupeObj[objInd];
                if (val === undefined)
                    continue;
                if (val === null) {
                    retObj[objInd] = null;
                    continue;
                }
                if (/^\_\$\_/gi.test(objInd))
                    continue;
                var type = typeof (val);
                if (type == 'object') {
                    if (val.constructor == Date) {
                        retObj[objInd] = "/DateISO(" + AtomDate.toLocalTime(val) + ")/";
                    }
                    else {
                        retObj[objInd] = AtomBinder.getClone(val);
                    }
                }
                else if (type == 'string') {
                    retObj[objInd] = val;
                }
                else if (type == 'number') {
                    retObj[objInd] = val;
                }
                else if (type == 'boolean') {
                    ((val == true) ? retObj[objInd] = true : retObj[objInd] = false);
                }
                // else if (type == 'date') {
                //     retObj[objInd] = val.getTime();
                // }
            }
        }
        return retObj;
    },
    setValue: function (target, key, value) {
        if (!target && value === undefined)
            return;
        var oldValue = AtomBinder.getValue(target, key);
        if (oldValue === value)
            return;
        var f = target["set_" + key];
        if (f) {
            f.apply(target, [value]);
        }
        else {
            target[key] = value;
        }
        AtomBinder.refreshValue(target, key, oldValue, value);
    },
    refreshValue: function (target, key, oldValue, value) {
        var handlers = AtomBinder.get_WatchHandler(target, key);
        if (handlers == undefined || handlers == null)
            return;
        var ae = new AtomEnumerator(handlers);
        while (ae.next()) {
            var item = ae.current();
            item(target, key, oldValue, value);
        }
        if (target._$_watcher) {
            target._$_watcher._onRefreshValue(target, key);
        }
    },
    getValue: function (target, key) {
        if (target == null)
            return null;
        var f = target["get_" + key];
        if (f) {
            return f.apply(target);
        }
        return target[key];
    },
    add_WatchHandler: function (target, key, handler) {
        if (target == null)
            return;
        var handlers = AtomBinder.get_WatchHandler(target, key);
        handlers.push(handler);
    },
    get_WatchHandler: function (target, key) {
        if (target == null)
            return null;
        var handlers = target._$_handlers;
        if (!handlers) {
            handlers = {};
            target._$_handlers = handlers;
        }
        var handlersForKey = handlers[key];
        if (handlersForKey == undefined || handlersForKey == null) {
            handlersForKey = [];
            handlers[key] = handlersForKey;
        }
        return handlersForKey;
    },
    remove_WatchHandler: function (target, key, handler) {
        if (target == null)
            return;
        if (target._$_handlers === undefined || target._$_handlers === null)
            return;
        var handlersForKey = target._$_handlers[key];
        if (handlersForKey == undefined || handlersForKey == null)
            return;
        var ae = new AtomEnumerator(handlersForKey);
        while (ae.next()) {
            if (ae.current() == handler) {
                handlersForKey.splice(ae.currentIndex(), 1);
                return;
            }
        }
    },
    invokeItemsEvent: function (target, mode, index, item) {
        var key = "_items";
        var handlers = AtomBinder.get_WatchHandler(target, key);
        if (!handlers)
            return;
        var ae = new AtomEnumerator(handlers);
        while (ae.next()) {
            var obj = ae.current();
            obj(mode, index, item);
        }
        if (target._$_watcher) {
            target._$_watcher._onRefreshItems(target, mode, index, item);
        }
        AtomBinder.refreshValue(target, "length", undefined, undefined);
    },
    clear: function (ary) {
        ary.length = 0;
        AtomBinder.invokeItemsEvent(ary, "refresh", 0, null);
    },
    addItem: function (ary, item) {
        var l = ary.length;
        ary.push(item);
        AtomBinder.invokeItemsEvent(ary, "add", l, item);
    },
    insertItem: function (ary, index, item) {
        ary.splice(index, 0, item);
        AtomBinder.invokeItemsEvent(ary, "add", index, item);
    },
    addItems: function (ary, items) {
        var ae = new AtomEnumerator(items);
        while (ae.next()) {
            AtomBinder.addItem(ary, ae.current());
        }
    },
    removeItem: function (ary, item) {
        var i = ary.indexOf(item);
        if (i == -1)
            return;
        ary.splice(i, 1);
        AtomBinder.invokeItemsEvent(ary, "remove", i, item);
    },
    removeAtIndex: function (ary, i) {
        if (i == -1)
            return;
        var item = ary[i];
        ary.splice(i, 1);
        AtomBinder.invokeItemsEvent(ary, "remove", i, item);
    },
    refreshItems: function (ary) {
        AtomBinder.invokeItemsEvent(ary, "refresh", -1, null);
    },
    add_CollectionChanged: function (target, handler) {
        if (target == null)
            return;
        var key = "_items";
        var handlers = AtomBinder.get_WatchHandler(target, key);
        handlers.push(handler);
    },
    remove_CollectionChanged: function (target, handler) {
        if (target == null)
            return;
        if (!target._$_handlers)
            return;
        var key = "_items";
        var handlersForKey = target._$_handlers[key];
        if (handlersForKey == undefined || handlersForKey == null)
            return;
        var ae = new AtomEnumerator(handlersForKey);
        while (ae.next()) {
            if (ae.current() == handler) {
                handlersForKey.splice(ae.currentIndex(), 1);
                return;
            }
        }
    },
    setError: function (target, key, message) {
        var errors = AtomBinder.getValue(target, "__errors");
        if (!errors) {
            AtomBinder.setValue(target, "__errors", {});
        }
        AtomBinder.setValue(errors, key, message);
    }
};
//window["AtomBinder"] = AtomBinder;
for (var item in AtomBinder) {
    window["AtomBinder"][item] = AtomBinder[item];
}
//# sourceMappingURL=web-atoms-mock.js.map