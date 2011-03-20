require('../jimmel')
var fs = require('fs'),
    sys = require('sys')
var text = fs.readFileSync('template1.js')
var start = new Date().getTime()
for (var i = 0; i < 1000000; i++)
    Jimmel.render(text)
    
var end = new Date().getTime()
sys.puts('Elapsed time: ' + (end - start))