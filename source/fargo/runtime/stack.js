Fargo.Runtime.extend({
  Stack: new JS.Class({
    initialize: function(frame) {
      this._frames = [];
      if (frame) this._frames.push(frame);
    },
    
    resume: function(value) {
      value = (value === undefined) ? Fargo.Runtime.Cons.NULL : value;
      
      if (this._yield) this._frames.pop();
      delete this._yield;
      
      this.clear();
      return this._value;
    },
    
    push: function(frame) {
      var frames = this._frames;
      frames.push(frame);
      this.clear(frames.length - 1);
      return this._value;
    },
    
    clear: function(limit) {
      var frames = this._frames,
          limit  = limit || 0;
      
      while (frames.length > limit && !this._yield)
        this.process();
    },
    
    process: function() {
      var frames = this._frames,
          Frame  = Fargo.Runtime.Frame,
          last   = frames[frames.length - 1]
          value  = last.process(),
          klass  = value.klass;
      
      this.setValue(value);
      if (this._yield || frames.length === 0 || !last.complete) return;
      
      frames.pop();
      
      if (klass && (klass === Frame || klass.superclass === Frame))
        this._frames.push(value);
    },
    
    setValue: function(value) {
      var Frame = Fargo.Runtime.Frame;
      this._yield = value && value.yieldValue;
      this._value = this._yield || value;
      
      var klass = value.klass;
      this._tail = (klass && (klass === Frame || klass.superclass === Frame));
    }
  })
});
