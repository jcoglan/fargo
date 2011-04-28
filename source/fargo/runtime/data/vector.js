Fargo.Runtime.extend({
  Vector: new JS.Class({
    initialize: function(elements) {
      this._elements = elements.slice();
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
