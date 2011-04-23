Fargo.Runtime.extend({
  Fiber: new JS.Class({
    initialize: function(scope, body) {
      this._scope = scope;
      this._body  = new Fargo.Runtime.Body(body, scope);
      this._stack = new Fargo.Runtime.Stack(this._body);
    },
    
    resume: function() {
      var runtime = this._scope.runtime,
          current = runtime.stack;
      
      runtime.stack = this._stack;
      var value = runtime.stack.resume();
      runtime.stack = current;
      return value;
    }
  })
});
