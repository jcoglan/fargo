Fargo.Runtime.Macro.extend({
  Tree: new JS.Class({
    initialize: function(name) {
      this._name  = name;
      this._data  = [];
      this._depth = 0;
    },
    
    descend: function(depth) {
      this._tail(depth-1).push([]);
      this._depth = Math.max(this._depth, depth);
    },
    
    push: function(value) {
      this._tail(this._depth).push(value);
    },
    
    read: function() {
      var indexes = this._indexes(),
          depth   = this._depth;
      return this._current(depth)[indexes[depth]];
    },
    
    shift: function(depth) {
      if (depth > this._depth) return;
      var indexes = this._indexes();
      indexes[depth] += 1;
      if (indexes[depth] >= this._current(depth).length)
        indexes[depth] = 0;
    },
    
    size: function(depth) {
      if (depth > this._depth) return null;
      return this._current(depth).length;
    },
    
    _tail: function(depth) {
      var list = this._data;
      while (depth--) list = list[list.length - 1];
      return list;
    },
    
    _current: function(depth) {
      var list = this._data,
          idx  = this._indexes();
      for (var i = 0; i < depth; i++) list = list[idx[i]];
      return list;
    },
    
    _indexes: function() {
      if (this._idx) return this._idx;
      this._idx = [];
      for (var i = 0, n = this._depth; i <= n; i++) this._idx.push(0);
      return this._idx;
    }
  })
});
