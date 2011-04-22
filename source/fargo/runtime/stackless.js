Fargo.Runtime.extend({
  Stackless: new JS.Class({
    push: function(frame) {
      var Frame = Fargo.Runtime.Frame;

      while (frame && frame.klass && (frame.klass === Frame ||
                                      frame.klass.superclass === Frame))
        frame = frame.process();

      return frame;
    }
  })
});
