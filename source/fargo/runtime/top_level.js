Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      this.runtime.scope = this;
      
      var path    = require('path'),
          dirname = path.dirname(__filename);
      
      this.run(dirname + '/lib/primitives.js');
      this.run(dirname + '/lib/lists.scm');
    }
  })
});
