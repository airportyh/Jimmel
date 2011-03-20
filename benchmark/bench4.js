require('../jimmel')
var fs = require('fs'),
    sys = require('sys')
var text = fs.readFileSync('template2.js')
var page = eval('(function page(){with(Jimmel){\n' + text + '\n}})')

var start = new Date().getTime()
for (var i = 0; i < 1000000; i++)
    page()
    
var end = new Date().getTime()
sys.puts('Elapsed time: ' + (end - start))