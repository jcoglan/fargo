Fargo.Runtime.extend({
  Stackless: new JS.Class({
    push: function(frame) {
      this._current = frame;
      var Frame = Fargo.Runtime.Frame,
          klass = this._current.klass;
      
      while (klass && (klass === Frame || klass.superclass === Frame)) {
        this._current = this.process();
        klass = (this._current || {}).klass;
      }
      
      return this._current;
    },
    
    process: function() {
      var expression = this._current._expression,
          scope      = this._current._scope,
          NULL       = Fargo.Runtime.Cons.NULL;
      
      if (this._current.klass === Fargo.Runtime.Body) {
        while (expression.cdr !== NULL) {
          Fargo.evaluate(expression.car, scope);
          expression = expression.cdr;
        }
        
        return new Fargo.Runtime.Frame(expression.car, scope);
      }
      if (expression.klass !== Fargo.Runtime.Cons)
        return Fargo.evaluate(expression, scope);
      
      var proc   = Fargo.evaluate(expression.car, scope),
          result = proc.call(scope, expression.cdr);
      
      if (!result || result.klass !== Fargo.Runtime.Macro.Expansion)
        return result;
      
      expression.parent.car = result.expression;
      result.expression.parent = expression.parent;
      
      return new Fargo.Runtime.Frame(result.expression, scope);
    }
  })
});
