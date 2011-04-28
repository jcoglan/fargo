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

Fargo.Scheme.QuotedCell = new JS.Module({
  SHORTHANDS: {
    "'":  'quote',
    "`":  'quasiquote',
    ",":  'unquote',
    ",@": 'unquote-splicing'
  },
  
  convert: function() {
    var runtime = Fargo.Runtime,
        macro   = this.SHORTHANDS[this.elements[1].textValue];
    
    return new runtime.Cons(new runtime.Symbol(macro),
           new runtime.Cons(this.cell.convert(),
                            runtime.Cons.NULL));
  }
});

Fargo.Scheme.Cell = new JS.Module({
  convert: function() {
    return this.elements[1].convert();
  }
});

Fargo.Scheme.Datum = new JS.Module({
  convert: function() {
    return this.elements[0].convert();
  }
});

Fargo.Scheme.List = new JS.Module({
  convert: function() {
    if (this._ast) return this._ast;
    
    var cells = this.cells.dot ? this.cells.elements[0].elements : this.cells.elements,
        elems = [],
        i = cells.length;
    
    while (i--) elems[i] = cells[i].convert();
    var tail = this.cells.dot && this.cells.elements[3].convert();
    this._ast = Fargo.Runtime.Cons.list(elems, tail);
    
    return this._ast;
  }
});

Fargo.Scheme.Vector = new JS.Module({
  convert: function() {
    if (this._ast) return this._ast;
    
    var cells = this.elements[1].elements,
        elems = [],
        i = cells.length;
    
    while (i--) elems[i] = cells[i].convert();
    return this._ast = new Fargo.Runtime.Vector(elems);
  }
});

Fargo.Scheme.Boolean = new JS.Module({
  convert: function() {
    return this.textValue === '#t';
  }
});

Fargo.Scheme.Number = new JS.Module({
  convert: function() {
    return parseFloat(this.textValue, 10);
  }
});

Fargo.Scheme.String = new JS.Module({
  convert: function() {
    return eval(this.textValue);
  }
});

Fargo.Scheme.Symbol = new JS.Module({
  convert: function() {
    return new Fargo.Runtime.Symbol(this.textValue);
  }
});
