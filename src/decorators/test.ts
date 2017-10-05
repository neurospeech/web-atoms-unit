namespace WebAtoms.Unit {

    export function Test(name?:string):Function {
        return (target:TestItem, propertyKey: string, descriptor: any):void => {

            // console.log(`Test called for ${target.constructor.name} in ${propertyKey}`)

            TestRunner.instance.tests.push(new TestMethod(
                name || propertyKey,
                propertyKey,
                target.constructor.name,
                target.constructor ));
        };
    }
}