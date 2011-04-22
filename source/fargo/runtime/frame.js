Fargo.Runtime.extend({
  Frame: new JS.Class({
    initialize: function(expression, scope) {
      this._expression = expression;
      this._scope      = scope;
      this.complete    = false;
    },
    
    process: function() {
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

Fargo.Runtime.extend({
  Body: new JS.Class(Fargo.Runtime.Frame, {
    initialize: function(expressions, scope) {
      this._expressions = expressions;
      this._scope       = scope;
      this._values      = [];
    },

    process: function() {
      var expression = this._expressions.car,
          Frame      = Fargo.Runtime.Frame,
          NULL       = Fargo.Runtime.Cons.NULL;

      this._expressions = this._expressions.cdr;

      if (this._expression === NULL) {
        this.complete = true;
        return new Frame(expression, this._scope);
      }

      var stack = this._scope.runtime.stack;
      return stack.push(new Frame(expression, this._scope));
    }
  })
});
