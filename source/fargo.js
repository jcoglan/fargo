var sys = require('sys');
Fargo = new JS.Module('Fargo');

Fargo.extend({
  Runtime: new JS.Class({
    initialize: function() {
      this.stack = new this.klass.Stackless();
      this.scope = new this.klass.TopLevel(this);
    },
    
    define: function(name, value) {
      return this.scope.define(name, value);
    },
    
    run: function(path) {
      return this.scope.run(path);
    }
  }),
  
  clone: function(value) {
    if (value && value.clone) return value.clone();
    return value;
  },
  
  evaluate: function(expression, scope) {
    if (expression && expression.klass === Fargo.Runtime.Value)
      return expression.value;
    
    if (!expression || !expression.eval) return expression;
    return expression.eval(scope);
  },
  
  freeze: function(value) {
    if (value && value.freeze) value.freeze();
    return value;
  },
  
  parseFile: function(path) {
    var source = require('fs').readFileSync(path);
    return this.SchemeParser.parse(source.toString());
  }
});
