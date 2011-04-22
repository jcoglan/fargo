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
          scope = this._lexicalScope.spawn(),
          i     = 0;
      
      while (param !== nil) {
        scope.define(param.car.name, args[i]);
        param = param.cdr;
        i += 1;
      }
      return new Fargo.Runtime.Body(this._body, scope);
    }
  })
});
