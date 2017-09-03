namespace WebAtoms.Unit{


    export class Assert{

        static equals(
            expected: any,
            result:any, 
            msg?:string ){
            if(result !== expected){
                Assert.throw(msg || `Expected ${expected}, found ${result}`);
            }
        }

        static doesNotEqual(
            expected: any,
            result:any,
            msg?:string){
            if(result === expected)
                Assert.throw(msg || `Not Expected ${expected}, found ${result}`);
        }

        static throws(
            expected:string, 
            f:()=>any,
            msg?:string){
            try{
                f();
                Assert.throw(msg || `Expected ${expected}, no exception was thrown.`);
            }catch(e){
                if(e.message != expected)
                {
                    Assert.throw(msg || `Expected error ${expected}, found ${e.message}`);
                }
            }
        }

        static async throwsAsync(
            expected: string,
            f:()=> Promise<any>,
            msg?:string ):Promise<any>{
            try{
                await f();
                Assert.throw(msg || `Expected ${expected}, no exception was thrown.`);
            }catch(e){
                if(e.message != expected)
                {
                    Assert.throw(msg || `Expected error ${expected}, found ${e.message}`);
                }
            }
        }

        static isTrue(b:boolean, msg?:string){
            if(b !== true)
                Assert.throw(msg || "Expected isTrue");
        }

        static isFalse(b:boolean, msg?:string){
            if(b !== false)
                Assert.throw(msg || "Expected isFalse");
        }

        static throw(message:string){
            throw new AssertError(message);
        }


    }

}