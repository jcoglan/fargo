Fargo.Runtime.extend({
  Scope: new JS.Class({
    initialize: function(runtime, parent) {
      this.runtime = runtime;
      this._parent = parent;
      this._vars   = {};
    },
    
    spawn: function() {
      return new Fargo.Runtime.Scope(this.runtime, this);
    },
    
    resolve: function(name) {
      var value, scope = this;
      while (value === undefined && scope) {
        value = scope._vars[name];
        scope = scope._parent;
      }
      if (value !== undefined) return value;
      throw new Error('Undefined variable ' + name);
    },
    
    define: function(name, value) {
      if (typeof value === 'function') value = new Fargo.Runtime.Procedure(this, value);
      this._vars[name] = value;
    },
    
    syntax: function(name, block) {
      this._vars[name] = new Fargo.Runtime.Syntax(this, block);
    },
    
    run: function(pathname) {
      var path    = require('path'),
          dirname = this._path ? path.dirname(this._path) : '',
          fqpath  = path.resolve(path.join(dirname, pathname)),
          runtime = Fargo.runtime,
          scope   = new Fargo.Runtime.FileScope(fqpath, this.runtime, this);
      
      Fargo.runtime = this.runtime;
      
      if (/\.js$/i.test(fqpath)) {
        require(fqpath);
      } else {
        var source  = require('fs').readFileSync(fqpath),
            parser  = new Fargo.SchemeParser(source.toString()),
            program = parser.parse();
        
        if (program) program.eval(scope);
        else throw new Error(Fargo.SchemeParser.formatError(parser.error));
      }
      
      Fargo.runtime = runtime;
    }
  })
});

Fargo.Runtime.extend({
  FileScope: new JS.Class(Fargo.Runtime.Scope, {
    initialize: function(path, runtime, parent) {
      this._path   = path;
      this.runtime = runtime;
      this._parent = parent;
      this._vars   = parent._vars;
    }
  })
});
