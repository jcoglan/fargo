Fargo.Scheme.Program = new JS.Module({
  eval: function(scope) {
    var cells = this.elements[1].elements,
        value = null;
    
    for (var i = 0, n = cells.length; i < n; i++)
      value = cells[i].eval(scope);
    
    return value;
  }
});
