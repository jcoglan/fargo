Fargo.Runtime.extend({
  Cons: new JS.Class({
    include: JS.Enumerable,
    
    initialize: function(car, cdr) {
      this.car = (car === undefined) ? this.klass.NULL : car;
      this.cdr = (cdr === undefined) ? this.klass.NULL : cdr;
      
      if (this.car !== this.klass.NULL) this.car.parent = this;
    },
    
    forEach: function(block, context) {
      var pair = this;
      while (pair.klass === this.klass && pair !== this.klass.NULL) {
        block.call(context, pair.car);
        pair = pair.cdr;
      }
    },
    
    clone: function() {
      return this.klass.list(this);
    },
    
    equals: function(other) {
      if (!other || other.klass !== this.klass) return false;
      var E = JS.Enumerable;
      return E.areEqual(this.car, other.car) &&
             E.areEqual(this.cdr, other.cdr);
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
          pair   = this,
          NULL   = this.klass.NULL;
      
      while (pair.klass === this.klass && pair !== NULL) {
        elems.push(Fargo.stringify(pair.car));
        pair = pair.cdr;
      }
      
      var tail = (pair === NULL) ? '' : ' . ' + pair;
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
    car:      undefined,
    cdr:      undefined,
    equals:   function(other) { return other === this },
    toString: function() { return '()' }
  });
})();
