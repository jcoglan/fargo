Fargo.Runtime.Macro.extend({
  Matches: new JS.Class({
    initialize: function(pattern, formals) {
      this._data = {};
      var names  = Fargo.Runtime.Macro.patternVars(pattern, formals),
          i      = names.length;
      
      while (i--) this._data[names[i]] = new Fargo.Runtime.Macro.Tree(names[i]);
    },
    
    descend: function(names, depth) {
      for (var name in this._data) {
        if (names.indexOf(name) >= 0) this._data[name].descend(depth);
      }
    },
    
    put: function(name, value) {
      if (this._data.hasOwnProperty(name))
        this._data[name].push(value);
    },
    
    has: function(name) {
      return this._data.hasOwnProperty(name);
    },
    
    get: function(name) {
      return this._data[name].read();
    },
    
    expand: function(template, depth, callback, context) {
      var names = Fargo.Runtime.Macro.patternVars(template),
          i     = this._size(names, depth);
      
      while (i--) {
        callback.call(context);
        this._iterate(names, depth);
      }
    },
    
    _size: function(names, depth) {
      var sizes = [], size;
      for (var name in this._data) {
        size = this._data[name].size(depth);
        if (names.indexOf(name) >= 0 && size !== null && sizes.indexOf(size) < 0)
          sizes.push(size);
      }
      if (sizes.length === 1) return sizes[0];
      else throw new Error('Mismatched repetition patterns');
    },
    
    _iterate: function(names, depth) {
      for (var name in this._data) {
        if (names.indexOf(name) >= 0) this._data[name].shift(depth);
      }
    }
  })
});
