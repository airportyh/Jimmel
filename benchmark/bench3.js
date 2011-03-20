require('../jimmel')
var sys = require('sys')
function page(){
    var Title = 'Jimmel Example Page'
    var example = "\n\
      p('I am a paragraph.')\
    "
    return Jimmel.html(
      {lang: 'en'},
      Jimmel.head(Jimmel.title(Title)),
      Jimmel.body(
        Jimmel.h1(Title),
        Jimmel.p('Jimmel is a Markup Language based on Javascript.'),
        Jimmel.h2('Example'),
        Jimmel.pre(example)
      )
    )
}

var start = new Date().getTime()
for (var i = 0; i < 1000000; i++)
    page()
    
var end = new Date().getTime()
sys.puts('Elapsed time: ' + (end - start))