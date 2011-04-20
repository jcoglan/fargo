Fargo.Scheme.Program = new JS.Module({
  eval: function(scope) {
    var expr  = this.convert(),
        value = null,
        nil   = Fargo.Runtime.Cons.NULL;
    
    while (expr !== nil) {
      value = Fargo.evaluate(expr.car, scope);
      expr  = expr.cdr;
    }
    return value;
  },
  
  convert: function() {
    if (this._ast) return this._ast;
    
    var cells = this.elements[1].elements,
        cons  = Fargo.Runtime.Cons,
        list  = cons.NULL,
        i     = cells.length;
    
    while (i--) list = new cons(cells[i].convert(), list);
    return this._ast = list;
  }
});
