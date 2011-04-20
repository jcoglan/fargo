Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      
      this.syntax('define', function(scope, cells) {
        scope.define(cells.car.name, Fargo.evaluate(cells.cdr.car, scope));
      });
      
      this.syntax('if', function(scope, cells) {
        var which = Fargo.evaluate(cells.car, scope) ? cells.cdr.car : cells.cdr.cdr.car;
        return Fargo.evaluate(which, scope);
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
    }
  })
});
