Fargo.Runtime.extend({
  TopLevel: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function() {
      this.callSuper();
      this.runtime.scope = this;
      
      this.run(FARGO_PATH + '/lib/primitives.js');
      this.run(FARGO_PATH + '/lib/syntax.scm');
      this.run(FARGO_PATH + '/lib/util.scm');
      this.run(FARGO_PATH + '/lib/logic.scm');
      this.run(FARGO_PATH + '/lib/numeric.scm');
      this.run(FARGO_PATH + '/lib/list.scm');
      this.run(FARGO_PATH + '/lib/vector.scm');
    }
  })
});
