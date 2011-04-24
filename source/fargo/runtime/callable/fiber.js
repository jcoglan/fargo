Fargo.Runtime.extend({
  Fiber: new JS.Class(Fargo.Runtime.Procedure, {
    execute: function(scope) {
      var R = Fargo.Runtime;
      if (!this._stack) this._stack = new R.Stack(new R.Body(this._body, scope));
      
      var runtime = scope.runtime,
          current = runtime.stack;
      
      runtime.stack = this._stack;
      var value = runtime.stack.resume();
      runtime.stack = current;
      return value;
    }
  })
});
