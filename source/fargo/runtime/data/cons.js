Fargo.Runtime.extend({
  Cons: new JS.Class({
    initialize: function(car, cdr) {
      this.car = (car === undefined) ? this.klass.NULL : car;
      this.cdr = (cdr === undefined) ? this.klass.NULL : cdr;
    },
    
    eval: function(scope) {
      var Frame = Fargo.Runtime.Frame,
          frame = new Frame(this, scope);
      
      while (frame && frame.klass === Frame) frame = frame.iterate();
      return frame;
    },
    
    freeze: function() {
      if (this.frozen) return;
      this.frozen = true;
      Fargo.freeze(this.car);
      Fargo.freeze(this.cdr);
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
