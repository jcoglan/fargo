JSCLASS_PATH = './../js.class/build/min'
require(JSCLASS_PATH + '/loader')

JS.Packages(function() { with(this) {
  file('./build/fargo.js')
    .provides('Fargo')
    .requires('JS.Class')
}})

JS.require('Fargo')
var sys = require('sys')

var scope = new Fargo.TopLevel()
var program = Fargo.SchemeParser.parse('(+ (- 8 7) 5)')
sys.puts(program.eval(scope))
