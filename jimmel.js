function iterMap(map, func){
  for (var key in map) func(key, map[key]);
}
function mapMap(map, func){
  var ret = [];
  for (var key in map)
    ret.push(func(key, map[key]));
  return ret;
}
function dasherize(camel){
  return camel.replace( /([A-Z])/g, "-$1" ).toLowerCase()
}
function flatten(arr){
  return arr.reduce(function(curr, item){
    return item.constructor === Array ?
      curr.concat(item) :
      curr.concat([item])
  }, [])
}
function indent(str){
  return '\n' + str.split('\n').map(function(line){
    return '\t' + line
  }).join('\n') + '\n'
}
function toArray(na){
  var arr = []
  for (var i = 0; i < na.length; i++)
    arr.push(na[i])
  return arr
}
Jimmel = function Jimmel(opts){
  this.opts = opts || {}
  this.opts.doctype = this.opts.doctype || '<!DOCTYPE html>'
}

Jimmel.prototype.tag = function tag(){
  var opts = this.opts || {}
  var args = toArray(arguments)
  var selfclose = args[0]
  args = args.slice(1)
  var tag = args[0]
  var arg1 = args[1]
  var attrs = arg1 && arg1.constructor === Object && !(arg1[0] instanceof String) ?
    arg1 : null
  var contents = flatten(args.slice(attrs ? 2 : 1))
  attrs = attrs || {}
  var markup
  var insides = [tag].concat(
    mapMap(attrs, function(name, value){
      return name + '="' + value + '"';
    })).join(' ')
  
  
  if (contents.length == 0)
    contents = ''
  else if (contents.length == 1)
    contents = contents[0]
  else{
    contents = contents.join('')
    if (opts.pretty && tag != 'pre')
      contents = indent(contents)
  }
  markup = 
    selfclose ? 
      '<' + insides + '/>'
      : '<' + insides + '>' + contents + '</' + tag + '>'
  if (opts.pretty)
    markup += '\n'
  return markup
}

var tags =
'a abbracronym address applet area b base basefont bdo big blockquote body button caption center cite code col colgroup dd del dir div dfn dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 head html i iframe ins isindex kbd label legend li link map menu meta noframes noscript object ol optgroup option p param pre q s samp script select small span strike strong style sub sup table tbody td textarea tfoot th thead title tr tt u ul'.split(' ')
tags.forEach(function(tag){
  Jimmel.prototype[tag] = function(){
    return this.tag.apply(this, [false, tag].concat(toArray(arguments)))
  }
})

var selfcloseTags = "input br hr img".split(' ')
selfcloseTags.forEach(function(tag){
  Jimmel.prototype[tag] = function(){
    return this.tag.apply(this, [true, tag].concat(toArray(arguments)))
  }
})

Jimmel.prototype.render = function render(markup){
  with(this){
    return opts.doctype + (opts.pretty ? '\n' : '') + eval(markup)
  }
}