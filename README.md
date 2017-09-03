# Web Atoms Unit Testing

Simple Unit testing framework for web atoms.

## Dependencies

    typescript

Please make sure, decorator support is enabled for your tests.

## Installation

    npm install web-atoms-unit

## Running with Node

Create a `run-tests.js` file

```javascript
    var fs = require("fs");
    var vm = require("vm");

    function loadScript(file){
        var s = fs.readFileSync(file,'utf-8');
        var script = new vm.Script(s, { filename: file });
        script.runInThisContext();
    }

    loadScript("./node_modules/web-atoms-unit/index.js");

    // load your tests..
    // ideally all typescript files should be transpiled into
    // one js file
    loadScript("./tests/generated-test.js");
    
    // .. so on.. you can write a script to load many files....

    var p = WebAtoms.Unit.TestRunner.instance.run();

    p.then(function(){
        process.exit();
    });

    p.catch(function(error){
        console.error(error);
        process.abort();
    });

```

```command
    node run-tests.js
```

## Running with browser

```html
    <html>
    <head>
        <script src="//cdn.jsdelivr.net/npm/web-atoms-unit@1.0.4/index.js"></script>
    </head>
    <body>
        <script>
            // make sure all other scripts are loaded on the page
            // before calling this one...
            setTimeout(function(){
                WebAtoms.Unit.TestRunner.instance.run();
            },100);
        </script>
    </body>
    </html>
```

## Sample Test class

```typescript
    /// <reference path="./node_modules/web-atoms-unit/index.d.ts">

    var Category = WebAtoms.Unit.Category;
    var Test = WebAtoms.Unit.Test;
    var Assert = WebAtoms.Unit.Assert;
    var TestItem = WebAtoms.Unit.TestItem;

    @Category("Math-Test")
    class SampleTest extends TestItem{

        
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

```        
