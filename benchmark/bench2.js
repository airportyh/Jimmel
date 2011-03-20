require('../jimmel')
var sys = require('sys')
function page(){with(Jimmel){
    var Title = 'Jimmel Example Page'
    var example = "\n\
      p('I am a paragraph.')\
    "
    return html(
      {lang: 'en'},
      head(title(Title)),
      body(
        h1(Title),
        p('Jimmel is a Markup Language based on Javascript.'),
        h2('Example'),
        pre(example)
      )
    )
}}

var start = new Date().getTime()
for (var i = 0; i < 1000000; i++)
    page()
    
var end = new Date().getTime()
sys.puts('Elapsed time: ' + (end - start))