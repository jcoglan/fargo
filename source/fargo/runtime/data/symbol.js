Fargo.Runtime.extend({
  Symbol: new JS.Class({
    initialize: function(name) {
      this.name = name;
    },
    
    eval: function(scope) {
      return scope.resolve(this.name);
    },
    
    toString: function() {
      return this.name;
    }
  })
});
