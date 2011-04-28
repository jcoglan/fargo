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
    
    set: function(name, value) {
      var scope = this.innermostBinding(name);
      if (!scope) throw new Error('Undefined variable ' + name);
      return scope._vars[name] = value;
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
    
    innermostBinding: function(name) {
      var scope = this;
      while (scope && !scope._vars.hasOwnProperty(name))
        scope = scope._parent;
      return scope;
    },
    
    define: function(name, value) {
      if (typeof value === 'function') value = new Fargo.Runtime.Procedure(this, value);
      if (!value.name) value.name = name;
      return this._vars[name] = value;
    },
    
    syntax: function(name, block) {
      var syntax = new Fargo.Runtime.Syntax(this, block);
      syntax.name = name;
      return this._vars[name] = syntax;
    },
    
    run: function(pathname) {
      var dirname = this._path ? Fargo.dirname(this._path) : '',
          fqpath  = Fargo.path(dirname, pathname),
          runtime = Fargo.runtime,
          scope   = new Fargo.Runtime.FileScope(fqpath, this.runtime, this);
      
      Fargo.runtime = this.runtime;
      
      if (/\.js$/i.test(fqpath)) {
        Fargo.loadJavaScript(fqpath);
      } else {
        var source  = Fargo.readFile(fqpath),
            parser  = new Fargo.SchemeParser(source),
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
