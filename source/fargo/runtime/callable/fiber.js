Fargo.Runtime.extend({
  Fiber: new JS.Class(Fargo.Runtime.Procedure, {
    apply: function(args) {
      var R = Fargo.Runtime, NULL = R.Cons.NULL;
      
      if (!this._stack) {
        this._scope = this._createScope(args);
        this._stack = new R.Stack(new R.Body(this._body, this._scope));
      }
      
      var runtime = this._scope.runtime,
          fiber   = runtime.currentFiber,
          stack   = runtime.stack;
      
      runtime.currentFiber = this;
      runtime.stack = this._stack;
      
      var arg   = (args[0] === undefined) ? NULL : args[0],
          value = runtime.stack.resume(arg);
      
      runtime.currentFiber = fiber;
      runtime.stack = stack;
      
      return value;
    }
  })
});
