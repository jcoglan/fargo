Fargo.Scheme.List = new JS.Module({
  eval: function(scope) {
    var cells  = this.cells.elements,
        values = [];
    
    for (var i = 0, n = cells.length; i < n; i++)
      values.push(cells[i].eval(scope));
    
    return values[0].call(values.slice(1));
  }
});
