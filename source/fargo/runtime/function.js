Fargo.Runtime.extend({
  Function: new JS.Class({
    initialize: function(block) {
      this._body = block;
    },
    
    call: function(scope, cells) {
      var args = [];
    
      for (var i = 0, n = cells.length; i < n; i++)
        args.push(cells[i].eval(scope));
      
      return this._body.apply(this, args);
    }
  })
});
