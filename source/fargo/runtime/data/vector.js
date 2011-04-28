Fargo.Runtime.extend({
  Vector: new JS.Class({
    include: JS.Enumerable,
    
    initialize: function(elements) {
      this._elements = elements.slice();
      this.length    = elements.length;
    },
    
    forEach: function(block, context) {
      for (var i = 0, n = this._elements.length; i < n; i++)
        block.call(context, this._elements[i]);
    },
    
    get: function(index) {
      return this._elements[index];
    },
    
    clone: function() {
      return new this.klass(this._elements);
    },
    
    eval: function(scope) {
      return this.clone();
    },
    
    freeze: function() {
      if (this.frozen) return;
      this.frozen = true;
      var el = this._elements, i = el.length;
      while (i--) Fargo.freeze(el[i]);
    },
    
    toString: function() {
      return '#(' + this._elements.join(' ') + ')';
    }
  })
});
