var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WebAtoms;
(function (WebAtoms) {
    var Unit;
    (function (Unit) {
        var TestContext = /** @class */ (function () {
            function TestContext() {
                this.logs = [];
                this.errors = [];
            }
            TestContext.prototype.log = function (a) {
                this.logs.push(a);
            };
            TestContext.prototype.error = function (a) {
                this.errors.push(a);
            };
            TestContext.prototype.reset = function () {
                this.logs.length = 0;
                this.errors.length = 0;
            };
            return TestContext;
        }());
        Unit.TestContext = TestContext;
        var TestMethod = /** @class */ (function () {
            function TestMethod(desc, name, category, target) {
                this.description = desc;
                this.name = name;
                this.category = category;
                this.testClass = target;
            }
            return TestMethod;
        }());
        Unit.TestMethod = TestMethod;
        var TestItem = /** @class */ (function () {
            function TestItem() {
            }
            TestItem.prototype.init = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 0];
                    });
                });
            };
            TestItem.prototype.dispose = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, 0];
                    });
                });
            };
            TestItem.prototype.delay = function (n) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, n);
                });
            };
            return TestItem;
        }());
        Unit.TestItem = TestItem;
    })(Unit = WebAtoms.Unit || (WebAtoms.Unit = {}));
})(WebAtoms || (WebAtoms = {}));
var WebAtoms;
(function (WebAtoms) {
    var Unit;
    (function (Unit) {
        var TestRunner = /** @class */ (function () {
            function TestRunner() {
                this.tests = [];
                this.executed = [];
            }
            Object.defineProperty(TestRunner, "instance", {
                get: function () {
                    if (!TestRunner._instance) {
                        TestRunner._instance = new TestRunner();
                    }
                    return TestRunner._instance;
                },
                enumerable: true,
                configurable: true
            });
            TestRunner.prototype.printAll = function () {
                // var results = this.executed.sort((a,b)=>{
                //     return a.testClass.category.localeCompare(b.testClass.category);
                // });
                // var results = results.sort((a,b)=>{
                //     return a.description.localeCompare(b.description);
                // });
                for (var _i = 0, _a = this.executed; _i < _a.length; _i++) {
                    var result = _a[_i];
                    if (result.error) {
                        console.error(result.category + " > " + result.description + " failed " + result.error.message + ".");
                        console.error("\t", result.error);
                    }
                    else {
                        console.log(result.category + " > " + result.description + " succeeded.");
                    }
                }
            };
            TestRunner.prototype.runTest = function (f, target) {
                return new Promise(function (resolve, reject) {
                    var t = f.apply(target);
                    if (t && t.then) {
                        t.then(function (v) {
                            resolve(v);
                        });
                        t.catch(function (e) {
                            reject(e);
                        });
                        return;
                    }
                    resolve();
                });
            };
            TestRunner.prototype.run = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var peek, test, fx, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (this.tests.length == 0) {
                                    this.printAll();
                                    return [2 /*return*/];
                                }
                                peek = this.tests.shift();
                                this.executed.push(peek);
                                test = new peek.testClass;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, 5, 7]);
                                return [4 /*yield*/, test.init()];
                            case 2:
                                _a.sent();
                                fx = test[peek.name];
                                return [4 /*yield*/, this.runTest(fx, test)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 7];
                            case 4:
                                e_1 = _a.sent();
                                peek.error = e_1;
                                return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, test.dispose()];
                            case 6:
                                _a.sent();
                                return [7 /*endfinally*/];
                            case 7: return [4 /*yield*/, this.run()];
                            case 8:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return TestRunner;
        }());
        Unit.TestRunner = TestRunner;
    })(Unit = WebAtoms.Unit || (WebAtoms.Unit = {}));
})(WebAtoms || (WebAtoms = {}));
// setTimeout(()=>{
//     WebAtoms.Unit.TestRunner.instance.run();
// },100); 
var WebAtoms;
(function (WebAtoms) {
    var Unit;
    (function (Unit) {
        var AssertError = /** @class */ (function () {
            function AssertError(message) {
                this.message = message;
            }
            return AssertError;
        }());
        Unit.AssertError = AssertError;
    })(Unit = WebAtoms.Unit || (WebAtoms.Unit = {}));
})(WebAtoms || (WebAtoms = {}));
var WebAtoms;
(function (WebAtoms) {
    var Unit;
    (function (Unit) {
        var Assert = /** @class */ (function () {
            function Assert() {
            }
            Assert.equals = function (expected, result, msg) {
                if (result !== expected) {
                    Assert.throw(msg || "Expected " + expected + ", found " + result);
                }
            };
            Assert.doesNotEqual = function (expected, result, msg) {
                if (result === expected)
                    Assert.throw(msg || "Not Expected " + expected + ", found " + result);
            };
            Assert.throws = function (expected, f, msg) {
                try {
                    f();
                    Assert.throw(msg || "Expected " + expected + ", no exception was thrown.");
                }
                catch (e) {
                    if (e.message != expected) {
                        Assert.throw(msg || "Expected error " + expected + ", found " + e.message);
                    }
                }
            };
            Assert.throwsAsync = function (expected, f, msg) {
                return __awaiter(this, void 0, void 0, function () {
                    var e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, f()];
                            case 1:
                                _a.sent();
                                Assert.throw(msg || "Expected " + expected + ", no exception was thrown.");
                                return [3 /*break*/, 3];
                            case 2:
                                e_2 = _a.sent();
                                if (e_2.message != expected) {
                                    Assert.throw(msg || "Expected error " + expected + ", found " + e_2.message);
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            Assert.isTrue = function (b, msg) {
                if (b !== true)
                    Assert.throw(msg || "Expected isTrue");
            };
            Assert.isFalse = function (b, msg) {
                if (b !== false)
                    Assert.throw(msg || "Expected isFalse");
            };
            Assert.throw = function (message) {
                throw new Unit.AssertError(message);
            };
            return Assert;
        }());
        Unit.Assert = Assert;
    })(Unit = WebAtoms.Unit || (WebAtoms.Unit = {}));
})(WebAtoms || (WebAtoms = {}));
var WebAtoms;
(function (WebAtoms) {
    var Unit;
    (function (Unit) {
        function Category(name) {
            return function (target) {
                //target.testCategory = name;
                //return target;
                // save a reference to the original constructor
                var original = target;
                // a utility function to generate instances of a class
                function construct(constructor, args) {
                    var c = function () {
                        return constructor.apply(this, args);
                    };
                    c.prototype = constructor.prototype;
                    return new c();
                }
                // the new constructor behaviour
                var f = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    this.testCategory = name;
                    return construct(original, args);
                };
                // copy prototype so intanceof operator still works
                f.prototype = original.prototype;
                // return new constructor (will override original)
                return f;
            };
        }
        Unit.Category = Category;
    })(Unit = WebAtoms.Unit || (WebAtoms.Unit = {}));
})(WebAtoms || (WebAtoms = {}));
var WebAtoms;
(function (WebAtoms) {
    var Unit;
    (function (Unit) {
        function Test(name) {
            return function (target, propertyKey, descriptor) {
                //console.log(`Test called for ${target.constructor.name} in ${propertyKey}`)
                Unit.TestRunner.instance.tests.push(new Unit.TestMethod(name || propertyKey, propertyKey, target.constructor.name, target.constructor));
            };
        }
        Unit.Test = Test;
    })(Unit = WebAtoms.Unit || (WebAtoms.Unit = {}));
})(WebAtoms || (WebAtoms = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WebAtoms;
(function (WebAtoms) {
    var Unit;
    (function (Unit) {
        var Tests;
        (function (Tests) {
            var SampleTest = /** @class */ (function (_super) {
                __extends(SampleTest, _super);
                function SampleTest() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SampleTest.prototype.add = function () {
                    Unit.Assert.equals(4, 2 + 2);
                    Unit.Assert.doesNotEqual(5, 2 + 2);
                };
                SampleTest.prototype.divide = function (a, b) {
                    if (b == 0) {
                        throw new Error("Division by zero");
                    }
                    return a / b;
                };
                SampleTest.prototype.divideByZero = function () {
                    var _this = this;
                    Unit.Assert.throws('Division by zero', function () {
                        _this.divide(1, 0);
                    });
                };
                // async...
                SampleTest.prototype.asyncTest = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // this.delay(100) is inbuilt
                                // function, you can use any
                                // promise to await
                                return [4 /*yield*/, this.delay(100)];
                                case 1:
                                    // this.delay(100) is inbuilt
                                    // function, you can use any
                                    // promise to await
                                    _a.sent();
                                    Unit.Assert.equals(2, 2);
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                SampleTest.prototype.asyncThrows = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // catches exception on 
                                // asynchronous result
                                return [4 /*yield*/, Unit.Assert.throwsAsync('Division by zero', function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.delay(100)];
                                                case 1:
                                                    _a.sent();
                                                    this.divide(1, 0);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                                case 1:
                                    // catches exception on 
                                    // asynchronous result
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                __decorate([
                    Unit.Test("Add")
                ], SampleTest.prototype, "add", null);
                __decorate([
                    Unit.Test("Divide by zero")
                ], SampleTest.prototype, "divideByZero", null);
                __decorate([
                    Unit.Test("Async test")
                ], SampleTest.prototype, "asyncTest", null);
                __decorate([
                    Unit.Test("Async throws")
                ], SampleTest.prototype, "asyncThrows", null);
                SampleTest = __decorate([
                    Unit.Category("Sample")
                ], SampleTest);
                return SampleTest;
            }(Unit.TestItem));
        })(Tests = Unit.Tests || (Unit.Tests = {}));
    })(Unit = WebAtoms.Unit || (WebAtoms.Unit = {}));
})(WebAtoms || (WebAtoms = {}));
//# sourceMappingURL=index.js.map