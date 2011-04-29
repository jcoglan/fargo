Fargo.Runtime.extend({
  Macro: new JS.Class(Fargo.Runtime.Procedure, {
    extend: {
      ELLIPSIS: new Fargo.Runtime.Symbol('...'),
      RESERVED: ['_', '...'],
      
      patternVars: function(pattern, excluded, results) {
        excluded = excluded || [];
        results  = results  || [];
        if (pattern === Fargo.Runtime.Cons.NULL) return results;
        
        var klass = (pattern && pattern.klass),
            Cons  = Fargo.Runtime.Cons,
            NULL  = Cons.NULL,
            name, cell, elements, i;
        
        if (klass === Fargo.Runtime.Symbol) {
          name = pattern.name;
          if (excluded.indexOf(name) >= 0 || this.RESERVED.indexOf(name) >= 0) return;
          if (results.indexOf(name) < 0) results.push(name);
        }
        
        if (klass === Cons) {
          cell = pattern;
          while (cell.klass === Cons && cell !== NULL) {
            this.patternVars(cell.car, excluded, results);
            cell = cell.cdr;
          }
          this.patternVars(cell, excluded, results);
        }
        
        if (klass === Fargo.Runtime.Vector) {
          elements = pattern.members;
          i = elements.length;
          while (i--) this.patternVars(elements[i], excluded, results);
        }
        
        return results;
      }
    },
    
    initialize: function() {
      this.callSuper();
      this._params = this._params.map(function(s) { return s.name });
    },
    
    call: function(scope, cells) {
      var result = this.ruleFor(cells, scope);
      if (!result) throw new Error('Syntax error');
      return new this.klass.Expansion(this._lexicalScope, scope, result[0].car.cdr.car, result[1]);
    },
    
    ruleFor: function(cells, scope) {
      var rule = this._body,
          Cons = Fargo.Runtime.Cons,
          NULL = Cons.NULL;
      
      while (rule !== NULL) {
        var matches = this.ruleMatches(scope, rule.car.car.cdr, cells);
        if (matches) return [rule, matches];
        rule = rule.cdr;
      }
    },
    
    ruleMatches: function(scope, pattern, input, matches, depth) {
      matches = matches || new this.klass.Matches(pattern, this._params);
      depth   = depth || 0;
      
      var klass = (pattern && pattern.klass),
          Cons  = Fargo.Runtime.Cons,
          NULL  = Cons.NULL,
          self  = this,
          patternPair, inputPair,
          token, followedByEllipsis,
          dx, consume, consumed, inputIndex;
      
      if (klass === Cons) {
        if (pattern === NULL) return (input === NULL) ? matches : null;
        if (!input || input.klass !== Cons) return null;
        
        patternPair = pattern,
        inputPair   = input;
        
        while (patternPair.klass === Cons && patternPair !== NULL) {
          token = patternPair.car;
          
          if (this.klass.ELLIPSIS.equals(token)) {
            patternPair = patternPair.cdr;
            continue;
          }
          followedByEllipsis = this.klass.ELLIPSIS.equals(patternPair.cdr.car);
          dx = followedByEllipsis ? 1 : 0;
          
          if (followedByEllipsis)
            matches.descend(this.klass.patternVars(token, this._params), depth + dx);
          
          consume = function() {
            return (inputPair.klass === Cons && inputPair !== NULL)
                ? self.ruleMatches(scope, token, inputPair.car, matches, depth + dx)
                : null;
          };
          
          consumed = consume();
          if (!consumed && !followedByEllipsis) return null;
          if (consumed) inputPair = inputPair.cdr;
          while (followedByEllipsis && consume()) inputPair = inputPair.cdr;
          patternPair = patternPair.cdr;
        }
        if (!this.ruleMatches(scope, patternPair, inputPair, matches, depth))
          return null;
      }
      
      else if (klass === Fargo.Runtime.Vector) {
        if (!input || input.klass !== Fargo.Runtime.Vector) return null;
        
        inputIndex = 0;
        
        var elements = pattern.members;
        for (var i = 0, n = elements.length; i < n; i++) {
          token = elements[i];
          if (this.klass.ELLIPSIS.equals(token)) continue;
          
          followedByEllipsis = this.klass.ELLIPSIS.equals(pattern.get(i + 1));
          dx = followedByEllipsis ? 1 : 0;
          
          if (followedByEllipsis)
            matches.descend(this.klass.patternVars(token, this._params), depth + dx);
          
          consume = function() {
            return input.get(inputIndex) !== undefined &&
                   self.ruleMatches(scope, token, input.get(inputIndex), matches, depth + dx);
          };
          
          consumed = consume();
          if (!consumed && !followedByEllipsis) return null;
          if (consumed) inputIndex += 1;
          while (followedByEllipsis && consume()) inputIndex += 1;
        }
        
        if (inputIndex !== input.length) return null;
      }
      
      else if (klass === Fargo.Runtime.Symbol) {
        if (this._params.indexOf(pattern.name) >= 0)
          return pattern.equals(input) && this._lexicalScope.innermostBinding(pattern.name)
                                          === scope.innermostBinding(input.name);
        else
          matches.put(pattern.name, input);
      }
      
      else {
        if (pattern !== input) return null;
      }
      
      return matches;
    }
  })
});
