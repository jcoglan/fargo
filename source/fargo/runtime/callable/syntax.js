Fargo.Runtime.extend({
  Syntax: new JS.Class(Fargo.Runtime.Function, {
    call: function(scope, cells) {
      return this._body.call(this, scope, cells);
    }
  })
});
