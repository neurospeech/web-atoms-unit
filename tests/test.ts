

namespace WebAtoms.Unit.Tests{

    var Atom = window["Atom"];

    @Category("Sample")
    class SampleTest extends TestItem {

        data:any = {};

        @Test("Atom.set")
        atomSet()
        {
            Atom.set(this,"data.firstName","s");

            var a = Atom.get(this,"data.firstName");

            Assert.equals("s",a);
        }


        @Test("Add")
        add():void{
            Assert.equals(4, 2 + 2);
            Assert.doesNotEqual(5, 2 + 2);
        }

        divide(a:number,b:number):number{
            if(b==0){
                throw new Error("Division by zero");
            }
            return a/b;
        }

        @Test("Divide by zero")
        divideByZero():void{
            Assert.throws('Division by zero', ()=>{
                this.divide(1,0);
            });
        }


        // async...
        @Test("Async test")
        async asyncTest():Promise<any>{

            // this.delay(100) is inbuilt
            // function, you can use any
            // promise to await
            await this.delay(100);

            Assert.equals(2,2);
        }

        @Test("Async throws")
        async asyncThrows():Promise<any>{

            // catches exception on 
            // asynchronous result

            await Assert.throwsAsync('Division by zero',
                async ():Promise<any> =>{
                    await this.delay(100);
                    this.divide(1,0);
                }
            );
        }

    }

}