Fargo.Runtime.extend({
  Vector: new JS.Class({
    include: JS.Enumerable,
    
    initialize: function(elements) {
      this.members = elements.slice();
      this.length  = elements.length;
    },
    
    forEach: function(block, context) {
      for (var i = 0, n = this.members.length; i < n; i++)
        block.call(context, this.members[i]);
    },
    
    get: function(index) {
      return this.members[index];
    },
    
    clone: function() {
      return new this.klass(this.members);
    },
    
    eval: function(scope) {
      return this.clone();
    },
    
    freeze: function() {
      if (this.frozen) return;
      this.frozen = true;
      var el = this.members, i = el.length;
      while (i--) Fargo.freeze(el[i]);
    },
    
    toString: function() {
      return '#(' + this.members.join(' ') + ')';
    }
  })
});
