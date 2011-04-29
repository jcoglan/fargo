Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      this.runtime.scope = this;
      
      // Built-in functions and syntax
      this.run(FARGO_PATH + '/lib/primitives.js');
      this.run(FARGO_PATH + '/lib/syntax.scm');
      
      // Core Scheme libraries
      this.run(FARGO_PATH + '/lib/util.scm');
      this.run(FARGO_PATH + '/lib/logic.scm');
      this.run(FARGO_PATH + '/lib/numeric.scm');
      this.run(FARGO_PATH + '/lib/list.scm');
      this.run(FARGO_PATH + '/lib/vector.scm');
      
      // Fargo platform libraries
      this.run(FARGO_PATH + '/lib/timers.js');
    }
  })
});
