Fargo.Runtime.extend({
  Procedure: new JS.Class({
    initialize: function(scope, params, body) {
      this._lexicalScope = scope;
      if (typeof params === 'function') {
        this._body = params;
      } else {
        this._params = params;
        this._body   = body;
      }
    },
    
    call: function(scope, cells) {
      var args = [],
          cell = cells,
          NULL = Fargo.Runtime.Cons.NULL;
      
      while (cell !== NULL) {
        args.push(Fargo.evaluate(cell.car, scope));
        cell = cell.cdr;
      }
      
      if (typeof this._body === 'function')
        return this._body.apply(this, args);
      
      var param = this._params,
          scope = this._lexicalScope.spawn(),
          i     = 0;
      
      while (param !== NULL) {
        scope.define(param.car.name, args[i]);
        param = param.cdr;
        i += 1;
      }
      return this.execute(scope);
    },
    
    execute: function(scope) {
      return new Fargo.Runtime.Body(this._body, scope);
    }
  })
});
