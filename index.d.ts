declare namespace WebAtoms.Unit {
    class TestContext {
        logs: Array<any>;
        errors: Array<any>;
        log(a: any): void;
        error(a: any): void;
        reset(): void;
    }
    class TestMethod {
        constructor(desc: any, name: string, category: string, target: any);
        name: string;
        category: string;
        description: any;
        testClass: any;
        error: any;
        logText: string;
    }
    class TestItem {
        logText: string;
        init(): Promise<any>;
        dispose(): Promise<any>;
        log(text: string): void;
        delay(n: number): Promise<any>;
    }
}
declare namespace WebAtoms.Unit {
    class TestRunner {
        private static _instance;
        static readonly instance: TestRunner;
        constructor();
        tests: Array<TestMethod>;
        executed: Array<TestMethod>;
        printAll(): void;
        runTest(f: any, target: any): Promise<any>;
        run(): Promise<any>;
    }
}
declare namespace WebAtoms.Unit {
}
declare namespace WebAtoms.Unit {
    class Assert {
        static equals(expected: any, result: any, msg?: string): void;
        static doesNotEqual(expected: any, result: any, msg?: string): void;
        static throws(expected: string, f: () => any, msg?: string): void;
        static throwsAsync(expected: string, f: () => Promise<any>, msg?: string): Promise<any>;
        static isTrue(b: boolean, msg?: string): void;
        static isFalse(b: boolean, msg?: string): void;
        static throw(message: string): void;
    }
}
declare namespace WebAtoms.Unit {
    function Category(name: string): (target: any) => any;
}
declare namespace WebAtoms.Unit {
    function Test(name?: string): (target: TestItem, propertyKey: string, descriptor: any) => void;
}
