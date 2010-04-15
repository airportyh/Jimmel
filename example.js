var Title = 'Jimmel Example Page'
var example = "\n\
  p('I am a paragraph.')\
"
html(
  {lang: 'en'},
  head(title(Title)),
  body(
    h1(Title),
    p('Jimmel is a Markup Language based on Javascript.'),
    h2('Example'),
    pre(example)
  )
)
