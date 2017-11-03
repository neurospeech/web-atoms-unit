namespace WebAtoms.Unit {

    export class TestContext {

        logs:Array<any> = [];
        errors:Array<any> = [];

        log(a:any):void {
            this.logs.push(a);
        }

        error(a:any):void {
            this.errors.push(a);
        }

        reset():void {
            this.logs.length = 0;
            this.errors.length = 0;
        }

    }

    export class TestMethod {

        constructor(desc:any, name:string, category:string, target:any) {
            this.description = desc;
            this.name = name;
            this.category = category;
            this.testClass = target;
        }

        name:string;
        category:string;
        description: any;

        testClass: any;

        get path(): string {
            return `${this.category}/${this.name}`;
        }

        error:any;

        logText: string;
    }

    export class TestItem {

        logText:string = "";

        async init():Promise<any> {
            return 0;
        }

        async dispose():Promise<any> {
            return 0;
        }

        log(text:string):void {
            if(text) {
                this.logText += text;
            }
        }

        delay(n:number):Promise<any> {
            return new Promise((resolve,reject)=> {
                setTimeout(()=> {
                    resolve();
                },n);
            });
        }


    }


}