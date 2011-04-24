# Fargo

Fargo is a programming language that runs on Node.js. It's designed to ease
asynchronous functional programming by providing features missing in JavaScript,
namely tail recursion and some form of continuations. It is still an experiment
and a toy.

It is loosely based on Scheme, in that I'm using Scheme's function names where
appropriate. It is unlikely to become a complete Scheme implementation; at this
stage it is an extremely minimal language that you can use where JavaScript is
not sufficiently expressive. The initial version was written in various airport
and hotel bars. It is probably slow and full of bugs.


## Building Fargo

    git clone git://github.com/jcoglan/fargo.git
    cd fargo
    gem install jake
    git submodule update --init --recursive
    cd vendor/js.class
    jake
    cd ../../
    jake
    
    node bin/fargo path/to/program.scm


## Fibers

The main reason for Fargo's existence at present is to add fibers to the Node
environment to make async programming easier. Fibers are a lightweight form of
continuations that allow blocks of code to be suspended and resumed by the user.
Many Ruby programmers are using fibers to let them write non-blocking code with
blocking-style syntax.

In Fargo, fibers look like functions and are callable in the same way. When a
fiber is running, you can use the `yield` function which suspends the fiber and
returns the yielded value as the result of the fiber's invokation. Next time you
call the fiber, it will resume from the last `yield`; the value you invoke the
fiber with will become the result of the `yield` expression. Some basic examples:

    (define stream (fiber (max)
      (define (loop i)
        (if (< i max)
            (begin
              (yield i)
              (loop (+ i 1)))
            'done))
      (loop 0)))
    
    ; This binds 2 to `max` and begins running `stream`. The first `yield` is
    ; called with 0. The next `yield` produces 1, then the fiber exits with `done`
    (puts (stream 2)) ; -> 0
    (puts (stream))   ; -> 1
    (puts (stream))   ; -> done
    
    
    (define test (fiber (first)
      (define second (yield (+ first 2)))
      second))
    
    ; Binds 10 to `first`, begins the fiber. 12 is yielded
    (puts (test 10)) ; -> 12
    
    ; The `yield` is replaced with the value 14 and the fiber continues by
    ; returning the value of `second`
    (puts (test 14)) ; -> 14
    
    ; The fiber has no more code to run so this produces an error
    (puts (test 18))

Fibers can help mask async code with callback-free APIs. Here's an example:

In Node we can make asynchronous HTTP requests. Let's write a function to expose
this facility to Fargo; our function will take a URL and a callback function (a
Fargo `Procedure` object, not a JavaScript function) and invoke the callback
with the response body after requesting the URL.

    // lib-http.js
    
    Fargo.runtime.define('http-get', function(url, callback) {
      var uri    = require('url').parse(url),
          client = require('http').createClient(80, uri.hostname);
      
      var request = client.request('GET', uri.pathname);
      request.addListener('response', function(response) {
        var data = '';
        response.addListener('data', function(c) { data += c});
        response.addListener('end', function() {
          callback.exec(data);
        });
      });
      return request.end();
    });

In Fargo, we can wrap this function in some Fiber yield/resume magic to give us
a callback-free version of the function. We can then use this function when
running within a fiber to simplify our async code.

    ; http.scm
    
    (load "./lib-http.js")
    
    ; This function captures the current fiber and initiates a request. It then
    ; returns a `yield` as the return value, suspending the fiber. When the
    ; callback is called, we resume the captured fiber with the response; the
    ; response is injected at the point of the yield and is returned to the
    ; caller.
    (define (fiber-http-get url)
      (define f (current-fiber))
      (http-get url (lambda (response)
        (f response)))
      (yield))
    
    ; We wrap our main program in a fiber so it can be suspended at will
    (define program (fiber ()
      (define page (fiber-http-get "http://www.google.com/"))
      (puts page)))
    
    ; Begins the main program fiber
    (program)


## Features

Fargo's syntax is that of Scheme. Booleans are written as `#t` and `#f`. Strings
are be double-quoted only. Numeric literals are base-10 decimals. Lists are
delimited with `(` and `)`. Quoted values are prefixed with `'`. The null value
is the empty list `'()`. Vectors and characters are currently not implemented.

Fargo implements the following syntax elements from Scheme:

* `define` for binding variables and creating functions
* `begin` for bundling blocks of code as single expressions
* `if` for conditional branching
* `lambda` for creating first-class anonymous functions
* `quote` for defining immutable lists
* `and` and `or` for boolean logic

The following predicates are included:

* `eq?`, `eqv?`, `boolean?`, `number?`, `string?`, `symbol?`,
  `pair?`, `null?`, `list?`, `procedure?`

Binary numeric operators, which delegate to the JavaScript equivalents:

* `+`, `-`, `*`, `/`, `>`, `>=`, `<`, `<=`, `=`

List primitives and library functions:

* `cons`, `car`, `cdr`, `set-car!`, `set-cdr!`, `length`, `map`


## License

Copyright (c) 2011 James Coglan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
