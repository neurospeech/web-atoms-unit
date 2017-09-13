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
        var Tests;
        (function (Tests) {
            var Atom = window["Atom"];
            var SampleTest = /** @class */ (function (_super) {
                __extends(SampleTest, _super);
                function SampleTest() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.data = {};
                    return _this;
                }
                SampleTest.prototype.atomSet = function () {
                    Atom.set(this, "data.firstName", "s");
                    Unit.Assert.equals(this.data.firstName, "s");
                };
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
                    Unit.Test("Atom.set")
                ], SampleTest.prototype, "atomSet", null);
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
//# sourceMappingURL=tests.js.map