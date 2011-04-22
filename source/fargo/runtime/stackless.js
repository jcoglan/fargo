Fargo.Runtime.extend({
  Stackless: new JS.Class({
    push: function(frame) {
      var Frame = frame.klass;
      while (frame && frame.klass === Frame) frame = frame.iterate();
      return frame;
    }
  })
});
