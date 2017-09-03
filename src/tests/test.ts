

namespace WebAtoms.Unit.Tests{

    @Category("Sample")
    class SampleTest extends TestItem {


        @Test("Success Assert")
        test1(){

            Assert.equals(2,2);


        }

        @Test("Failed Assert")
        async test2(): Promise<any>{
            Assert.equals(2,2);
            await this.delay(100);
            Assert.equals(5,2);
        }

    }

}