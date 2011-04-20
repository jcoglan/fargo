Fargo.Scheme.List = new JS.Module({
  convert: function() {
    if (this._ast) return this._ast;
    
    var cells = this.cells.elements,
        cons  = Fargo.Runtime.Cons,
        list  = cons.NULL,
        i = cells.length;
    
    while (i--) list = new cons(cells[i].convert(), list);
    return this._ast = list;
  }
});
