Fargo.Scheme.Symbol = new JS.Module({
  convert: function() {
    return new Fargo.Runtime.Symbol(this.textValue);
  }
});
