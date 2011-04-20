Fargo = new JS.Module('Fargo');

Fargo.extend({
  Runtime: new JS.Class(),
  
  evaluate: function(expression, scope) {
    if (!expression || !expression.eval) return expression;
    return expression.eval(scope);
  },
  
  freeze: function(value) {
    if (value && value.freeze) value.freeze();
    return value;
  }
});
