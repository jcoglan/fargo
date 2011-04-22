Fargo.Runtime.extend({
  Scope: new JS.Class({
    initialize: function(parent) {
      this._parent = parent;
      this._vars   = {};
    },
    
    resolve: function(name) {
      var value, scope = this;
      while (value === undefined && scope) {
        value = scope._vars[name];
        scope = scope._parent;
      }
      if (value !== undefined) return value;
      throw new Error('Undefined variable ' + name);
    },
    
    define: function(name, value) {
      if (typeof value === 'function') value = new Fargo.Runtime.Function(this, value);
      this._vars[name] = value;
    },
    
    syntax: function(name, block) {
      this._vars[name] = new Fargo.Runtime.Syntax(this, block);
    },
    
    run: function(path) {
      var program = Fargo.parseFile(path);
      program.eval(this);
    }
  })
});
