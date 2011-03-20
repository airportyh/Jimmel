var sys = require('sys')

function output(str){
	sys.print(str)
}
function allDefined(arr, len){
    for (var i = 0; i < len; i++)
        if (!(i in arr))
            return false
    return true
}
function h1(){
    function go(){
    	output('<h1>')
    	var values = []
    	var orgArgs = Array.prototype.slice.call(arguments, 0)
    	function finish(){
    	    output('</h1>')
    	}
    	function gotValue(value, idx){
    	    //sys.debug('got "' + value + '", ' + idx)
            values[idx] = value
            //sys.puts('\nvalues: ' + values)
            var allIn = allDefined(values, orgArgs.length)
            if (allIn){
                values.map(function(arg){
                    output(arg)
                })
                finish()
            }
    	}
    	for (var i = 0; i < arguments.length; i++){
    		var arg = arguments[i]
    		if (typeof(arg) == 'function'){
    		    var makeCallback = function(promise, idx){
    		        return function(err, value){
        			    if (!err){
        			        gotValue(value, idx)
        		        }
        			}
    		    }
    			arg(makeCallback(arg, i))
    		}else{
    			gotValue(arg, i)
    		}
		
    	}
    }
	return go
}


var promiseBobby = function(callback){
	setTimeout(function(){
		callback(null, 'Bobby')
	}, 500)
}

var promiseBrown = function(callback){
	setTimeout(function(){
		callback(null, 'Brown')
	}, 100)
}

h1(promiseBrown, ' ', promiseBobby, ' ', 
    h1(promiseBrown, ', ', promiseBobby, ' '))
