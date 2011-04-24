(load "./lib-http.js")

(define (fiber-http-get url)
  (http-get url (current-fiber))
  (yield))

(define program (fiber ()
  (define page (fiber-http-get "http://www.google.com/"))
  (puts page)))

(program)
