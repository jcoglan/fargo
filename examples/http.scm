(define (fiber-http-get url)
  (define f (current-fiber))
  (http-get url (lambda (response)
    (f response)))
  (yield))

(define program (fiber ()
  (define page (fiber-http-get "http://www.google.com/"))
  (puts page)))

(program)
