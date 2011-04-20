Fargo.Runtime.extend({
  Function: new JS.Class({
    initialize: function(block) {
      this._body = block;
    },
    
    call: function(scope, cells) {
      var args = [],
          cell = cells,
          nil  = Fargo.Runtime.Cons.NULL;
      
      while (cell !== nil) {
        args.push(Fargo.evaluate(cell.car, scope));
        cell = cell.cdr;
      }
      
      return this._body.apply(this, args);
    }
  })
});
