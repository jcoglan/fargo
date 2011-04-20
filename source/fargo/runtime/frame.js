Fargo.Runtime.extend({
  Frame: new JS.Class({
    initialize: function(expression, scope) {
      this._expression = expression;
      this._scope = scope;
    },
    
    iterate: function() {
      var expr  = this._expression,
          scope = this._scope,
          Cons  = Fargo.Runtime.Cons;
      
      if (!expr || expr.klass !== Cons)
        return Fargo.evaluate(expr, scope);
      
      var proc = Fargo.evaluate(expr.car, scope);
      return proc.call(scope, expr.cdr);
    }
  })
});
