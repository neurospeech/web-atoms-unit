namespace WebAtoms.Unit{

    

    export class TestRunner{

        private static _instance:TestRunner;
        static get instance(): TestRunner{
            if(!TestRunner._instance){
                TestRunner._instance = new TestRunner();
            }
            return TestRunner._instance;
        }

        constructor(){
            this.tests = [];
            this.executed = [];
        }

        tests:Array<TestMethod>;
        executed:Array<TestMethod>;

        printAll():void{
            // var results = this.executed.sort((a,b)=>{
            //     return a.testClass.category.localeCompare(b.testClass.category);
            // });
            // var results = results.sort((a,b)=>{
            //     return a.description.localeCompare(b.description);
            // });

            for(var result of this.executed){
                if(result.error){

                    console.error(`${result.category} > ${result.description} failed ${result.error.message}.`);
                    console.error(result.error);
                }else{
                    console.log(`${result.category} > ${result.description} succeeded.`);
                }
                if(result.logText){
                    console.log(`\t\t${result.logText}`);
                }
            }
        }

        runTest(f:any,target:any):Promise<any>{
            return new Promise((resolve,reject)=>{
                try{
                    var t = f.apply(target);
                    if(t && t.then){
                        t.then(v=>{
                            resolve(v);
                        });
                        t.catch(e=>{
                            reject(e);
                        });
                        return;
                    }
                    resolve();
                }catch(ex){
                    reject(ex);
                }
            });
        }

        async run():Promise<any>{

            if(this.tests.length==0){
                this.printAll();
                return;
            }

            var peek = this.tests.shift();

            this.executed.push(peek);

            var test = new (peek.testClass as {new ()});

            try{
                await test.init();

                var fx = test[peek.name];

                await this.runTest(fx,test);
            }catch(e){
                peek.error = e;
            }
            finally{
                peek.logText = test.logText;
                try{
                    await test.dispose();
                }catch(er){
                    peek.error = er;
                }
            }

            await this.run();
            
        }

    }

}

// setTimeout(()=>{
//     WebAtoms.Unit.TestRunner.instance.run();
// },100);