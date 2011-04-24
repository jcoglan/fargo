(define gen (fiber (max)
  (define (loop i)
    (if (< i max)
        (begin
          (yield i)
          (loop (+ i 1)))
        'done))
  (loop 0)))

(puts (gen 2))
(puts (gen))
(puts (gen))

(define test (fiber (first)
  (define second (yield (+ first 2)))
  second))

(puts (test 10))
(puts (test 14))
(puts (test 18))
