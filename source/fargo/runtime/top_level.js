Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      
      var Runtime = Fargo.Runtime,
          Cons    = Runtime.Cons,
          Symbol  = Runtime.Symbol,
          NULL    = Cons.NULL,
          
          path    = require('path'),
          dirname = path.dirname(__filename);
      
      //================================================================
      // Core syntax
      
      this.syntax('define', function(scope, cells) {
        if (cells.car.klass === Cons) {
          var name   = cells.car.car.name,
              params = cells.car.cdr,
              body   = cells.cdr;
          
          scope.define(name, new Runtime.Function(scope, params, body));
          
        } else if (cells.car.klass === Symbol) {
          scope.define(cells.car.name, Fargo.evaluate(cells.cdr.car, scope));
        }
      });
      
      this.syntax('if', function(scope, cells) {
        var which = Fargo.evaluate(cells.car, scope) ? cells.cdr.car : cells.cdr.cdr.car;
        return new Runtime.Frame(which, scope);
      });
      
      this.syntax('lambda', function(scope, cells) {
        return new Runtime.Function(scope, cells.car, cells.cdr);
      });
      
      this.syntax('quote', function(scope, cells) {
        return Fargo.freeze(cells.car);
      });
      
      //================================================================
      // Should be macros
      
      this.syntax('and', function(scope, cells) {
        var and = true, cell = cells;
        while (and && cell !== NULL) {
          and = and && Fargo.evaluate(cell.car, scope);
          cell = cell.cdr;
        }
        return and;
      });
      
      this.syntax('or', function(scope, cells) {
        var or = false, cell = cells;
        while (!or && cell !== NULL) {
          or = or || Fargo.evaluate(cell.car, scope);
          cell = cell.cdr;
        }
        return or;
      });
      
      //================================================================
      // I/O
      
      this.define('puts', function(string) { require('sys').puts(string) });
      
      //================================================================
      // Predicates
      
      this.define('eq?', function(a,b) { return a === b });
      
      this.define('pair?', function(object) {
        return object && object.klass === Cons && object !== NULL;
      });
      
      this.define('boolean?', function(object) { return typeof object === 'boolean' });
      this.define('number?',  function(object) { return typeof object === 'number'  });
      this.define('string?',  function(object) { return typeof object === 'string'  });
      
      this.define('symbol?', function(object) {
        return object && object.klass === Runtime.Symbol;
      });
      
      //================================================================
      // Math library
      
      this.define('+', function(a,b) { return a + b });
      this.define('-', function(a,b) { return a - b });
      this.define('*', function(a,b) { return a * b });
      this.define('/', function(a,b) { return a / b });
      
      this.define('<',  function(a,b) { return a <  b });
      this.define('<=', function(a,b) { return a <= b });
      this.define('>',  function(a,b) { return a >  b });
      this.define('>=', function(a,b) { return a >= b });
      this.define('=',  function(a,b) { return a === b });
      
      //================================================================
      // Lists and pairs
      
      this.define('cons', function(a,b) { return new Cons(a,b) });
      
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
      
      this.run(dirname + '/lib/lists.scm');
    }
  })
});
