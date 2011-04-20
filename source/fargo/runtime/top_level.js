Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      
      this.syntax('define', function(scope, cells) {
        scope.define(cells[0].elements[1].textValue, cells[1].eval(scope));
      });
      
      this.syntax('if', function(scope, cells) {
        var which = cells[0].eval(scope) ? cells[1] : cells[2];
        return which.eval(scope);
      });
      
      this.define('+', function(a,b) { return a + b });
      this.define('-', function(a,b) { return a - b });
      this.define('*', function(a,b) { return a * b });
      this.define('/', function(a,b) { return a / b });
      
      this.define('<',  function(a,b) { return a <  b });
      this.define('<=', function(a,b) { return a <= b });
      this.define('>',  function(a,b) { return a >  b });
      this.define('>=', function(a,b) { return a >= b });
      this.define('=',  function(a,b) { return a === b });
    }
  })
});
