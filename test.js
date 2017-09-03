var fs = require("fs");
var vm = require("vm");

function scriptFile(file){
    var s = fs.readFileSync(file,'utf-8');
    return new vm.Script(s, { filename: file });
}

var index = scriptFile("index.js");
index.runInThisContext();


var p = WebAtoms.Unit.TestRunner.instance.run();

p.then(function(){
    process.exit();
});

p.catch(function(error){
    console.error(error);
    process.abort();
});

