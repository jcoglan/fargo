var Runtime = Fargo.Runtime,
    Cons    = Runtime.Cons,
    Symbol  = Runtime.Symbol,
    NULL    = Cons.NULL;

//================================================================
// Core syntax

Fargo.runtime.syntax('define', function(scope, cells) {
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

Fargo.runtime.syntax('set!', function(scope, cells) {
  return scope.set(cells.car.name, Fargo.evaluate(cells.cdr.car, scope));
});

Fargo.runtime.syntax('if', function(scope, cells) {
  var which = (Fargo.evaluate(cells.car, scope) === false)
            ? cells.cdr.cdr.car
            : cells.cdr.car;
  
  if (which === undefined) return false;
  else return new Runtime.Frame(which, scope);
});

Fargo.runtime.syntax('begin', function(scope, cells) {
  return new Runtime.Body(cells, scope);
});

Fargo.runtime.syntax('lambda', function(scope, cells) {
  return new Runtime.Procedure(scope, cells.car, cells.cdr);
});

Fargo.runtime.syntax('quote', function(scope, cells) {
  return Fargo.freeze(cells.car);
});

Fargo.runtime.syntax('define-syntax', function(scope, cells) {
  var macro = Fargo.evaluate(cells.cdr.car, scope);
  scope.define(cells.car.name, macro);
  return macro;
});

Fargo.runtime.syntax('syntax-rules', function(scope, cells) {
  return new Runtime.Macro(scope, cells.car, cells.cdr);
});

//================================================================
// Fibers

Fargo.runtime.syntax('fiber', function(scope, cells) {
  return new Runtime.Fiber(scope, cells.car, cells.cdr);
});

Fargo.runtime.syntax('current-fiber', function(scope, cells) {
  return scope.runtime.currentFiber;
});

Fargo.runtime.define('yield', function(value) {
  value = (value === undefined) ? NULL : value;
  return {yieldValue: value};
});

Fargo.runtime.define('call-with-current-continuation', function() {
  return NULL;
});

//================================================================
// I/O

Fargo.runtime.syntax('load', function(scope, cells) {
  scope.run(Fargo.evaluate(cells.car, scope));
  return true;
});

Fargo.runtime.define('puts', function(string) {
  Fargo.puts(string);
  return string;
});

Fargo.runtime.define('exit', function() {
  process.exit();
});

//================================================================
// Predicates

var eqv = function(a,b) {
  if (a.klass === Symbol && b.klass === Symbol)
    return a.name === b.name;
  else
    return a === b;
};
Fargo.runtime.define('eqv?', eqv);
Fargo.runtime.define('eq?',  eqv);

Fargo.runtime.define('equal?', function(a, b) {
  return (a && a.equals) ? a.equals(b) : a === b;
});

Fargo.runtime.define('pair?', function(object) {
  return object.klass === Cons && object !== NULL;
});

Fargo.runtime.define('vector?', function(object) {
  return object.klass === Runtime.Vector;
});

Fargo.runtime.define('complex?', function(object) { return typeof object === 'number' });
Fargo.runtime.define('string?',  function(object) { return typeof object === 'string' });

Fargo.runtime.define('symbol?', function(object) {
  return object.klass === Runtime.Symbol;
});

Fargo.runtime.define('procedure?', function(object) {
  return object.klass === Runtime.Function;
});

//================================================================
// Math library

Fargo.runtime.define('+', function() {
  var value = arguments[0] || 0;
  for (var i = 1, n = arguments.length; i < n; i++) value += arguments[i];
  return value;
});

Fargo.runtime.define('-', function() {
  var value = arguments[0];
  if (arguments.length === 1) return 0 - value;
  for (var i = 1, n = arguments.length; i < n; i++) value -= arguments[i];
  return value;
});

Fargo.runtime.define('*', function() {
  var value = arguments[0] || 1;
  for (var i = 1, n = arguments.length; i < n; i++) value *= arguments[i];
  return value;
});

Fargo.runtime.define('/', function() {
  var value = arguments[0];
  if (arguments.length === 1) return 1/value;
  for (var i = 1, n = arguments.length; i < n; i++) value /= arguments[i];
  return value;
});

Fargo.runtime.define('<',  function(a,b) { return a <  b });
Fargo.runtime.define('<=', function(a,b) { return a <= b });
Fargo.runtime.define('>',  function(a,b) { return a >  b });
Fargo.runtime.define('>=', function(a,b) { return a >= b });

'ceil floor round sin cos tan asin acos atan exp log sqrt random'.
split(' ').forEach(function(fn) {
  Fargo.runtime.define(fn, Math[fn]);
});

Fargo.runtime.define('expt', Math.pow);

Fargo.runtime.define('number->string', function(number) {
  return number.toString(10);
});

Fargo.runtime.define('string->number', function(string) {
  return parseFloat(string, 10);
});

Fargo.runtime.define('PI', Math.PI);

//================================================================
// Lists and pairs

Fargo.runtime.define('cons', function(a,b) { return new Cons(a,b) });

Fargo.runtime.define('car', function(pair) { return pair.car });
Fargo.runtime.define('cdr', function(pair) { return pair.cdr });

Fargo.runtime.define('set-car!', function(pair, value) {
  if (pair.frozen) throw new Error('Cannot set-car! on immutable list');
  pair.car = value;
  return value;
});

Fargo.runtime.define('set-cdr!', function(pair, value) {
  if (pair.frozen) throw new Error('Cannot set-cdr! on immutable list');
  pair.cdr = value;
  return value;
});

Fargo.runtime.define('caar',   function(pair) { return pair.car.car });
Fargo.runtime.define('cadr',   function(pair) { return pair.cdr.car });
Fargo.runtime.define('cdar',   function(pair) { return pair.car.cdr });
Fargo.runtime.define('cddr',   function(pair) { return pair.cdr.cdr });
Fargo.runtime.define('caaar',  function(pair) { return pair.car.car.car });
Fargo.runtime.define('caadr',  function(pair) { return pair.cdr.car.car });
Fargo.runtime.define('cadar',  function(pair) { return pair.car.cdr.car });
Fargo.runtime.define('caddr',  function(pair) { return pair.cdr.cdr.car });
Fargo.runtime.define('cdaar',  function(pair) { return pair.car.car.cdr });
Fargo.runtime.define('cdadr',  function(pair) { return pair.cdr.car.cdr });
Fargo.runtime.define('cddar',  function(pair) { return pair.car.cdr.cdr });
Fargo.runtime.define('cdddr',  function(pair) { return pair.cdr.cdr.cdr });
Fargo.runtime.define('caaaar', function(pair) { return pair.car.car.car.car });
Fargo.runtime.define('caaadr', function(pair) { return pair.cdr.car.car.car });
Fargo.runtime.define('caadar', function(pair) { return pair.car.cdr.car.car });
Fargo.runtime.define('caaddr', function(pair) { return pair.cdr.cdr.car.car });
Fargo.runtime.define('cadaar', function(pair) { return pair.car.car.cdr.car });
Fargo.runtime.define('cadadr', function(pair) { return pair.cdr.car.cdr.car });
Fargo.runtime.define('caddar', function(pair) { return pair.car.cdr.cdr.car });
Fargo.runtime.define('cadddr', function(pair) { return pair.cdr.cdr.cdr.car });
Fargo.runtime.define('cdaaar', function(pair) { return pair.car.car.car.cdr });
Fargo.runtime.define('cdaadr', function(pair) { return pair.cdr.car.car.cdr });
Fargo.runtime.define('cdadar', function(pair) { return pair.car.cdr.car.cdr });
Fargo.runtime.define('cdaddr', function(pair) { return pair.cdr.cdr.car.cdr });
Fargo.runtime.define('cddaar', function(pair) { return pair.car.car.cdr.cdr });
Fargo.runtime.define('cddadr', function(pair) { return pair.cdr.car.cdr.cdr });
Fargo.runtime.define('cdddar', function(pair) { return pair.car.cdr.cdr.cdr });
Fargo.runtime.define('cddddr', function(pair) { return pair.cdr.cdr.cdr.cdr });

Fargo.runtime.define('apply', function(procedure, list) {
  return procedure.apply(list.toArray());
});

//================================================================
// Vectors

Fargo.runtime.define('make-vector', function(size, fill) {
  if (fill === undefined) fill = NULL;
  var elements = [];
  while (size--) elements.push(fill);
  return new Runtime.Vector(elements);
});

Fargo.runtime.define('vector-length', function(vector) {
  return vector.members.length;
});

Fargo.runtime.define('vector-ref', function(vector, k) {
  var size = vector.members.length;
  if (k < 0 || k >= size) throw new Error('Index out of bounds');
  return vector.members[k];
});

Fargo.runtime.define('vector-set!', function(vector, k, object) {
  var size = vector.members.length;
  if (k < 0 || k >= size) throw new Error('Index out of bounds');
  if (vector.frozen) throw new Error('Cannot vector-set! on immutable vector');
  return vector.members[k] = object;
});
