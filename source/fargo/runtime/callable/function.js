Fargo.Runtime.extend({
  Function: new JS.Class({
    initialize: function(scope, paramsList, bodyList) {
      this._lexicalScope = scope;
      if (typeof paramsList === 'function') {
        this._body = paramsList;
      } else {
        this._params = paramsList;
        this._body   = bodyList;
      }
    },
    
    call: function(scope, cells) {
      var args = [],
          cell = cells,
          nil  = Fargo.Runtime.Cons.NULL;
      
      while (cell !== nil) {
        args.push(Fargo.evaluate(cell.car, scope));
        cell = cell.cdr;
      }
      
      if (typeof this._body === 'function')
        return this._body.apply(this, args);
      
      var param = this._params,
          scope = new Fargo.Runtime.Scope(this._lexicalScope),
          i     = 0;
      
      while (param !== nil) {
        scope.define(param.car.name, args[i]);
        param = param.cdr;
        i += 1;
      }
      
      var expression = this._body,
          value      = null;
      
      while (expression !== nil) {
        value = Fargo.evaluate(expression.car, scope);
        expression = expression.cdr;
      }
      return value;
    }
  })
});
