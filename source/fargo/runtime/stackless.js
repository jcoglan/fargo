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
      if (this._current.klass === Fargo.Runtime.Body) {
        var expression = this._current._expression,
            scope      = this._current._scope,
            NULL       = Fargo.Runtime.Cons.NULL;
        
        while (expression.cdr !== NULL) {
          Fargo.evaluate(expression.car, scope);
          expression = expression.cdr;
        }
        
        return new Fargo.Runtime.Frame(expression.car, scope);
      }
      return this._current.process();
    }
  })
});
