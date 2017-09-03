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
    }
    class TestItem {
        init(): Promise<any>;
        dispose(): Promise<any>;
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
    class AssertError implements Error {
        name: string;
        message: string;
        constructor(message: string);
    }
}
declare namespace WebAtoms.Unit {
    class Assert {
        static equals(result: any, expected: any): void;
    }
}
declare namespace WebAtoms.Unit {
    function Category(name: string): (target: any) => any;
}
declare namespace WebAtoms.Unit {
    function Test(name?: string): (target: TestItem, propertyKey: string, descriptor: any) => void;
}
declare namespace WebAtoms.Unit.Tests {
}
