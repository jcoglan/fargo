(define factorial (lambda (x)
  (if (= 0 x)
      1
      (* (factorial (- x 1))
         x))))

(puts (factorial 6))

(define add (lambda (a)
  (lambda (b)
    (+ a b))))

(puts ((add 2) 3))
