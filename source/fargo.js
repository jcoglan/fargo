Fargo = new JS.Module('Fargo');

Fargo.extend({
  Function: new JS.Class({
    initialize: function(block) {
      this._body = block;
    },
    
    call: function(args) {
      return this._body.apply(this, args);
    }
  })
});

Fargo.extend({
  Scope: new JS.Class({
    initialize: function() {
      this._vars = {};
    },
    
    resolve: function(name) {
      return this._vars[name];
    },
    
    define: function(name, block) {
      this._vars[name] = new Fargo.Function(block);
    }
  })
});

Fargo.extend({
  TopLevel: new JS.Class(Fargo.Scope, {
    initialize: function() {
      this.callSuper();
      
      this.define('+', function(a,b) { return a + b })
      this.define('-', function(a,b) { return a - b })
      this.define('*', function(a,b) { return a * b })
      this.define('/', function(a,b) { return a / b })
    }
  })
});
