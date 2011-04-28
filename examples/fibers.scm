(define stream (fiber (max)
  (do ((i 0 (+ 1 i)))
      ((eqv? max i) 'done)
    (yield i))))

(puts (stream 2))
(puts (stream))
(puts (stream))

(define test (fiber (first)
  (define second (yield (+ first 2)))
  second))

(puts (test 10))
(puts (test 14))
(puts (test 18))
