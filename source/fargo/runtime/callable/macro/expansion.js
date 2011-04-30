Fargo.Runtime.Macro.extend({
  Expansion: new JS.Class({
    initialize: function(lexicalScope, callingScope, template, matches) {
      this._lexicalScope = lexicalScope;
      this._callingScope = callingScope;
      this.expression    = this.expand(template, matches);
    },
    
    expand: function(template, matches, depth, ignoringEllipses) {
      var klass    = (template && template.klass),
          depth    = depth || 0,
          Cons     = Fargo.Runtime.Cons,
          NULL     = Cons.NULL,
          ELLIPSIS = Fargo.Runtime.Macro.ELLIPSIS,
          result, last, repeater, templatePair,
          push, cell, followedByEllipsis, dx;
      
      if (klass === Cons) {
        if (template === NULL) return NULL;
        
        if (ELLIPSIS.equals(template.car))
          return this.expand(template.cdr.car, matches, depth, true);
        
        templatePair = template;
        
        push = function(value) {
          var pair = new Cons(value);
          result = result || pair;
          if (last) last.cdr = pair;
          last = pair;
        };
        
        while (templatePair.klass === Cons && templatePair !== NULL) {
          cell = templatePair.car;
          
          followedByEllipsis = (templatePair.cdr.klass === Cons &&
                                ELLIPSIS.equals(templatePair.cdr.car) &&
                                !ignoringEllipses);
          
          dx = followedByEllipsis ? 1 : 0;
          if (followedByEllipsis) repeater = cell;
          
          if (ELLIPSIS.equals(cell) && !ignoringEllipses) {
            matches.expand(repeater, depth + 1, function() {
              push(this.expand(repeater, matches, depth + 1));
            }, this);
          
          } else if (!followedByEllipsis) {
            push(this.expand(cell, matches, depth + dx, ignoringEllipses));
          }
          templatePair = templatePair.cdr;
        }
        
        if (last)
          last.cdr = this.expand(templatePair, matches, depth, ignoringEllipses);
        
        return result;
      }
      
      else if (klass === Fargo.Runtime.Vector) {
        result = [];
        push = function(value) { result.push(value) };
        
        var elements = template.members;
        for (var i = 0, n = elements.length; i < n; i++) {
          cell = elements[i];
          
          followedByEllipsis = (ELLIPSIS.equals(template.get(i + 1)) && !ignoringEllipses);
          dx = followedByEllipsis ? 1 : 0;
          
          if (followedByEllipsis) repeater = cell;
          
          if (ELLIPSIS.equals(cell) && !ignoringEllipses) {
            matches.expand(repeater, depth + 1, function() {
              push(this.expand(repeater, matches, depth + 1));
            }, this);
            
          } else if (!followedByEllipsis) {
            push(this.expand(cell, matches, depth + dx, ignoringEllipses));
          }
        }
        
        return new Fargo.Runtime.Vector(result);
      }
      
      else if (klass === Fargo.Runtime.Symbol) {
        if (matches.has(template.name)) return matches.get(template.name);
        else return new Fargo.Runtime.Symbol(template.name);
      }
      
      else
        return template;
    }
  })
});
