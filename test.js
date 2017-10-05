var fs = require("fs");
var vm = require("vm");

global.window = {
    Atom:{
        
    },
    WebAtoms: {

    }
};

global.WebAtoms = global.window.WebAtoms;

function loadScript(file){
    var s = fs.readFileSync(file,'utf-8');
    var script = new vm.Script(s, { filename: file });
    script.runInThisContext();
}

loadScript("web-atoms-mock.js");
loadScript("index.js");
loadScript("tests/build/tests.js");

var p = WebAtoms.Unit.TestRunner.instance.run(process.argv[2]);

p.then(function(){
    process.exit();
});

p.catch(function(error){
    console.error(error);
    process.abort();
});

