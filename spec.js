/*
Copyright (c) 2010, Toby Ho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

require('./describe')
require('./jimmel')
var File = require('file')
var exampleText = File.read('example.js')
var example2Text = File.read('example2.js')


with(Jimmel){
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
/*  .should('pretty print render()', function(){
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
  })*/
  .should('render with params', function(){
    expect(render(example2Text, {name: 'Jason'})).toBe('<span>Jason</span>')
  })
  .should('have url()', function(){
    expect(url('/blah', {one: 1, two: '1 2'})).toBe('/blah?one=1&two=1%202')
  })
  .should('Be able to change doctype', function(){
    var orgDoctype = Jimmel.doctype
    Jimmel.doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
    expect(render(exampleText)).toBe(Jimmel.doctype + '<html lang="en"><head><title>Jimmel Example Page</title></head><body><h1>Jimmel Example Page</h1><p>Jimmel is a Markup Language based on Javascript.</p><h2>Example</h2><pre>\n\
  p(\'I am a paragraph.\')</pre></body></html>')
    Jimmel.doctype = orgDoctype
  })
}

describe.output = function(msg){
  print(msg)
}

describe.run()
