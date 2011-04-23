var sys = require('sys');
Fargo = new JS.Module('Fargo');

Fargo.extend({
  Runtime: new JS.Class({
    initialize: function() {
      this.stack = new this.klass.Stackless();
      this.scope = new this.klass.TopLevel(this);
    }
  }),
  
  evaluate: function(expression, scope) {
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
