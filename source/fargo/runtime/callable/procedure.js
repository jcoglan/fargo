Fargo.Runtime.extend({
  Procedure: new JS.Class({
    initialize: function(scope, params, body) {
      this._lexicalScope = scope;
      this._runtime = scope.runtime;
      
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
      return this.apply(args);
    },
    
    apply: function(args) {
      var NULL = Fargo.Runtime.Cons.NULL;
      
      if (typeof this._body === 'function')
        return this._body.apply(this, args);
      
      var scope = this._createScope(args);
      return new Fargo.Runtime.Body(this._body, scope);
    },
    
    exec: function() {
      var args = [].slice.call(arguments);
      var frame = this.apply(args);
      return this._runtime.stack.push(frame);
    },
    
    toString: function() {
      var name = this.name ? ':' + this.name : '';
      return '#<procedure' + name + '>';
    },
    
    _createScope: function(args) {
      var Cons  = Fargo.Runtime.Cons,
          NULL  = Cons.NULL,
          param = this._params,
          scope = this._lexicalScope.spawn(),
          i     = 0;
      
      while (param.klass === Cons && param !== NULL) {
        scope.define(param.car.name, args[i]);
        param = param.cdr;
        i += 1;
      }
      if (param !== NULL)
        scope.define(param.name, Cons.list(args.slice(i)));
      
      return scope;
    }
  })
});
