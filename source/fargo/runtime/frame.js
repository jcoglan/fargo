Fargo.Runtime.extend({
  Frame: new JS.Class({
    initialize: function(expression, scope) {
      this._expression = expression;
      this.target      = expression;
      this._current    = expression;
      this._values     = Fargo.clone(expression);
      this._curValue   = this._values;
      this._scope      = scope;
    },
    
    process: function() {
      var expr    = this._expression,
          scope   = this._scope,
          Runtime = Fargo.Runtime,
          Cons    = Runtime.Cons,
          NULL    = Cons.NULL;
      
      if (!expr || expr.klass !== Cons) {
        this.complete = true;
        return Fargo.evaluate(expr, scope);
      }
      
      var proc = this._values.car;
      if (proc.klass === Runtime.Syntax || this._current === NULL) {
        this.complete = true;
        return proc.call(scope, this._values.cdr);
      }
      
      var stack   = scope.runtime.stack,
          current = this._current,
          value   = this._curValue;
      
      var result = stack.push(new Runtime.Frame(current.car, scope));
      
      this._curValue.car = result;
      this._current = this._current.cdr;
      this._curValue = this._curValue.cdr;
      
      return result;
    },
    
    fill: function(frame, result) {
      var subexpr = frame.target,
          expr    = this._expression,
          value   = this._values,
          NULL    = Fargo.Runtime.Cons.NULL;
      
      while (expr.car !== subexpr && expr !== NULL) {
        expr = expr.cdr;
        value = value.cdr;
      }
      if (expr !== NULL) value.car = new Fargo.Runtime.Value(result);
    }
  })
});

Fargo.Runtime.extend({
  Body: new JS.Class(Fargo.Runtime.Frame, {
    initialize: function(expressions, scope) {
      this._expression = expressions;
      this._scope      = scope;
      this._values     = [];
    },
    
    process: function() {
      var expression = this._expression.car,
          Frame      = Fargo.Runtime.Frame,
          NULL       = Fargo.Runtime.Cons.NULL;
      
      this._expression = this._expression.cdr;
      
      if (this._expression === NULL) {
        this.complete = true;
        return new Frame(expression, this._scope);
      }
      
      var stack = this._scope.runtime.stack;
      return stack.push(new Frame(expression, this._scope));
    },
    
    fill: function() {}
  })
});
