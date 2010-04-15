require('./describe')
require('./jimmel')
var File = require('file')
var exampleText = File.read('example.js')

var jimmel = new Jimmel()
with(jimmel){
describe('Jimmel')
  .should('gen tag', function(){
    expect(p('I am a paragraph')).toBe('<p>I am a paragraph</p>')
  })
  .should('gen nested tags', function(){
    expect(div(span('span'))).toBe('<div><span>span</span></div>')
  })
  .should('gen attrs', function(){
    expect(div({id: 'myDiv', 'class': 'myClass'})).toBe('<div id="myDiv" class="myClass"></div>')
  })
  .should('self-close input, br, hr, img', function(){
    expect(input({type: 'text', name: 'text'})).toBe('<input type="text" name="text"/>')
    expect(br()).toBe('<br/>')
    expect(hr()).toBe('<hr/>')
    expect(img({alt: 'I am an image', src: 'image.png'})).toBe('<img alt="I am an image" src="image.png"/>')
  })
  .should('render()', function(){
    var File = require('file')
    expect(render(exampleText)).toBe('<!DOCTYPE html><html lang="en"><head><title>Jimmel Example Page</title></head><body><h1>Jimmel Example Page</h1><p>Jimmel is a Markup Language based on Javascript.</p><h2>Example</h2><pre>\n\
  p(\'I am a paragraph.\')</pre></body></html>')
  })
  .should('pretty print render()', function(){
    expect(new Jimmel({pretty: true}).render(exampleText, {pretty: true})).toBe(
'<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
    <title>Jimmel Example Page</title>\n\
</head>\n\
<body>\n\
    <h1>Jimmel Example Page</h1>\n\
    <p>Jimmel is a Markup Language based on Javascript.</p>\n\
    <h2>Example</h2>\n\
    <pre>\n\
  p(\'I am a paragraph.\')</pre>\n\
</body>\n\
</html>')
  })
}

describe.output = function(msg){
  print(msg)
}

describe.run()
