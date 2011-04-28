Fargo.Runtime.extend({
  Stack: new JS.Class({
    initialize: function(frame) {
      this._frames = [];
      if (frame) this._frames.push(frame);
    },
    
    resume: function(value) {
      var frames = this._frames, last;
      if (frames.length === 0) throw new Error('Dead fiber called');
      
      if (this._yield) {
        last = frames.pop();
        frames[frames.length - 1].fill(last, value);
        delete this._yield;
      }
      
      this.clear();
      return this._yield ? this._value.yieldValue : this._value;
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
          last   = frames[frames.length - 1],
          value  = last.process(),
          klass  = value && value.klass;
      
      this.setValue(value);
      if (this._yield || frames.length === 0 || !last.complete) return;
      
      if (this._tail) this._value.target = last.target;
      frames.pop();
      
      if (klass && (klass === Frame || klass.superclass === Frame))
        this._frames.push(value);
    },
    
    setValue: function(value) {
      var Frame = Fargo.Runtime.Frame;
      this._value = value;
      this._yield = value && value.yieldValue !== undefined;
      
      this._tail = value && value.klass &&
                   (value.klass === Frame ||
                    value.klass.superclass === Frame);
    }
  })
});
