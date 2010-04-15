require('./jimmel')
var File = require('file')
print(new Jimmel().render(File.read('example.js')))