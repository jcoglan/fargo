(define factorial (lambda (x)
  (if (= 0 x)
      1
      (* (factorial (- x 1))
         x))))

(puts (factorial 2000))

(define add (lambda (a)
  (lambda (b)
    (+ a b))))

(puts ((add 2) 3))

(puts '(a b c))
(puts (cdr '(a b c)))

(define list '(1 2 3))
(set-car! (cdr list) 5)
