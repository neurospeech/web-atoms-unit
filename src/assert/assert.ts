namespace WebAtoms.Unit{


    export class Assert{

        static equals(result:any, expected: any){
            if(result !== expected){
                throw new AssertError(`Expected ${expected} found ${result}`);
            }
        }


    }

}