var fs = require("fs");
var vm = require("vm");

function loadScript(file){
    var s = fs.readFileSync(file,'utf-8');
    var script = new vm.Script(s, { filename: file });
    script.runInThisContext();
}

loadScript("index.js");
loadScript("tests/build/tests.js");

var p = WebAtoms.Unit.TestRunner.instance.run();

p.then(function(){
    process.exit();
});

p.catch(function(error){
    console.error(error);
    process.abort();
});

