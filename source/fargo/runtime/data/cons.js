Fargo.Runtime.extend({
  Cons: new JS.Class({
    initialize: function(car, cdr) {
      this.car = (car === undefined) ? this.klass.NULL : car;
      this.cdr = (cdr === undefined) ? this.klass.NULL : cdr;
    },
    
    eval: function(scope) {
      var proc = Fargo.evaluate(this.car, scope);
      return proc.call(scope, this.cdr);
    },
    
    toString: function() {
      var elems  = [],
          cell   = this,
          nil    = Fargo.Runtime.Cons.NULL;
      
      while (cell !== nil) {
        elems.push(String(cell.car));
        cell = cell.cdr;
      }
      return '(' + elems.join(' ') + ')';
    }
  })
});

Fargo.Runtime.Cons.extend({
  NULL: new Fargo.Runtime.Cons()
});

(function() {
  var nil = Fargo.Runtime.Cons.NULL;
  nil.extend({
    car: nil,
    cdr: nil,
    toString: function() { return '()' }
  });
})();
