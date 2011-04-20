Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      
      this.define('+', function(a,b) { return a + b })
      this.define('-', function(a,b) { return a - b })
      this.define('*', function(a,b) { return a * b })
      this.define('/', function(a,b) { return a / b })
      
      this.syntax('define', function(scope, cells) {
        scope.define(cells[0].elements[1].textValue, cells[1].eval(scope));
      });
    }
  })
});
