Fargo.Runtime.extend({
  Symbol: new JS.Class({
    initialize: function(name) {
      this.name = name;
    },
    
    equals: function(other) {
      return other && other.klass === this.klass && other.name === this.name;
    },
    
    eval: function(scope) {
      return scope.resolve(this.name);
    },
    
    toString: function() {
      return this.name;
    }
  })
});
