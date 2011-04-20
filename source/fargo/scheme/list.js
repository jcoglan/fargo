Fargo.Scheme.List = new JS.Module({
  eval: function(scope) {
    var cells = this.cells.elements,
        proc  = cells[0].eval(scope);
    
    return proc.call(scope, cells.slice(1));
  }
});
