(define null? (lambda (object)
  (eq? '() object)))

(define list? (lambda (object)
  (or (null? object)
      (and (pair? object)
           (list? (cdr object))))))

(define length (lambda (list)
  (if (null? list)
      0
      (+ (length (cdr list) 1)))))

(define map (lambda (proc list)
  (if (null? list)
      list
      (cons (proc (car list))
            (map proc (cdr list))))))
