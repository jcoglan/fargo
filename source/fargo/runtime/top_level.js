Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      
      var Runtime = Fargo.Runtime,
          Fiber   = Runtime.Fiber,
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
              body   = cells.cdr,
              proc   = new Runtime.Procedure(scope, params, body);
          
          scope.define(name, proc);
          return proc;
          
        } else if (cells.car.klass === Symbol) {
          var value = Fargo.evaluate(cells.cdr.car, scope);
          scope.define(cells.car.name, value);
          return value;
        }
      });
      
      this.syntax('if', function(scope, cells) {
        var which = Fargo.evaluate(cells.car, scope) ? cells.cdr.car : cells.cdr.cdr.car;
        return new Runtime.Frame(which, scope);
      });
      
      this.syntax('begin', function(scope, cells) {
        return new Runtime.Body(cells, scope);
      });
      
      this.syntax('lambda', function(scope, cells) {
        return new Runtime.Procedure(scope, cells.car, cells.cdr);
      });
      
      this.syntax('quote', function(scope, cells) {
        return Fargo.freeze(cells.car);
      });
      
      //================================================================
      // Fibers
      
      this.syntax('fiber', function(scope, cells) {
        return new Fiber(scope, cells.car, cells.cdr);
      });
      
      this.define('current-fiber', function() { return Fiber.current });
      
      this.define('yield', function(value) {
        value = (value === undefined) ? NULL : value;
        return {yieldValue: value};
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
      
      this.syntax('load', function(scope, cells) {
        scope.run(Fargo.evaluate(cells.car, scope));
        return true;
      });
      
      this.define('puts', function(string) {
        require('sys').puts(string);
        return string;
      });
      
      //================================================================
      // Predicates
      
      var eqv = function(a,b) {
        if (a.klass === Symbol && b.klass === Symbol)
          return a.name === b.name;
        else
          return a === b;
      };
      this.define('eqv?', eqv);
      this.define('eq?',  eqv);
      
      this.define('pair?', function(object) {
        return object.klass === Cons && object !== NULL;
      });
      
      this.define('boolean?', function(object) { return typeof object === 'boolean' });
      this.define('number?',  function(object) { return typeof object === 'number'  });
      this.define('string?',  function(object) { return typeof object === 'string'  });
      
      this.define('symbol?', function(object) {
        return object.klass === Runtime.Symbol;
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
        return value;
      });
      
      this.define('set-cdr!', function(pair, value) {
        if (pair.frozen) throw new Error('Cannot set-cdr! on immutable list');
        pair.cdr = value;
        return value;
      });
      
      this.run(dirname + '/lib/lists.scm');
    }
  })
});
