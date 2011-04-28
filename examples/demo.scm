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

(define list (cons 1 (cons 2 (cons 3 '()))))
(set-car! (cdr list) 5)

(puts list)
(puts (eq? '(1 2) '(1 2)))
(puts (eq? 'foo 'foo))
(puts (eq? '() '()))
(puts (list? 'foo))

(define square (lambda (x) (* x x)))
(puts (map square '(1 2 3 4)))

(puts (let ((x 1)
            (y 2)
            (z 3)
            (h 7))
        (+ (+ x y) z)))

(puts `(x y ,map))
