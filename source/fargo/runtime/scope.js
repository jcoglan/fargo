Fargo.Runtime.extend({
  Scope: new JS.Class({
    initialize: function() {
      this._vars = {};
    },
    
    resolve: function(name) {
      return this._vars[name];
    },
    
    define: function(name, value) {
      if (typeof value === 'function') value = new Fargo.Runtime.Function(value);
      this._vars[name] = value;
    },
    
    syntax: function(name, block) {
      this._vars[name] = new Fargo.Runtime.Syntax(block);
    }
  })
});
