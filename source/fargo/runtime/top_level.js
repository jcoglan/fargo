Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      
      this.syntax('define', function(scope, cells) {
        scope.define(cells.car.name, Fargo.evaluate(cells.cdr.car, scope));
      });
      
      this.syntax('if', function(scope, cells) {
        var which = Fargo.evaluate(cells.car, scope) ? cells.cdr.car : cells.cdr.cdr.car;
        return new Fargo.Runtime.Frame(which, scope);
      });
      
      this.syntax('lambda', function(scope, cells) {
        return new Fargo.Runtime.Function(scope, cells.car, cells.cdr);
      });
      
      this.define('+', function(a,b) { return a + b });
      this.define('-', function(a,b) { return a - b });
      this.define('*', function(a,b) { return a * b });
      this.define('/', function(a,b) { return a / b });
      
      this.define('<',  function(a,b) { return a <  b });
      this.define('<=', function(a,b) { return a <= b });
      this.define('>',  function(a,b) { return a >  b });
      this.define('>=', function(a,b) { return a >= b });
      this.define('=',  function(a,b) { return a === b });
      
      this.define('puts', function(string) { require('sys').puts(string) });
      
      this.syntax('quote', function(scope, cells) {
        return Fargo.freeze(cells.car);
      });
      
      this.define('car', function(pair) { return pair.car });
      this.define('cdr', function(pair) { return pair.cdr });
      
      this.define('set-car!', function(pair, value) {
        if (pair.frozen) throw new Error('Cannot set-car! on immutable list');
        pair.car = value;
      });
      
      this.define('set-cdr!', function(pair, value) {
        if (pair.frozen) throw new Error('Cannot set-cdr! on immutable list');
        pair.cdr = value;
      });
    }
  })
});
