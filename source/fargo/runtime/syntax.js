Fargo.Runtime.extend({
  Syntax: new JS.Class({
    initialize: function(block) {
      this._body = block;
    },
    
    call: function(scope, cells) {
      return this._body.call(this, scope, cells);
    }
  })
});
