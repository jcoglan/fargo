(define (null? object)
  (eq? '() object))

(define (list? object)
  (or (null? object)
      (and (pair? object)
           (list? (cdr object)))))

(define (list . args) args)

(define (length list)
  (if (null? list)
      0
      (+ (length (cdr list) 1))))

(define (map proc list)
  (if (null? list)
      list
      (cons (proc (car list))
            (map proc (cdr list)))))
