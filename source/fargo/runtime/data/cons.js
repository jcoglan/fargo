Fargo.Runtime.extend({
  Cons: new JS.Class({
    initialize: function(car, cdr) {
      this.car = (car === undefined) ? this.klass.NULL : car;
      this.cdr = (cdr === undefined) ? this.klass.NULL : cdr;
    },
    
    clone: function() {
      return this.klass.list(this);
    },
    
    eval: function(scope) {
      var frame = new Fargo.Runtime.Frame(this, scope);
      return scope.runtime.stack.push(frame);
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
          NULL   = Fargo.Runtime.Cons.NULL;
      
      while (cell.klass === this.klass && cell !== NULL) {
        elems.push(String(cell.car));
        cell = cell.cdr;
      }
      
      var tail = (cell === NULL) ? '' : ' . ' + cell;
      return '(' + elems.join(' ') + tail + ')';
    }
  })
});

Fargo.Runtime.Cons.extend({
  list: function(array, tail) {
    var list, tail, i;
    
    if (array.klass === this) {
      list = tail = new this();
      while (array !== this.NULL) {
        tail.car = array.car;
        tail = tail.cdr = (array.cdr === this.NULL) ? this.NULL : new this();
        array = array.cdr;
      }
      
    } else {
      list = tail || this.NULL;
      i = array.length;
      while (i--) list = new this(array[i], list);
    }
    return list;
  },
  
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
