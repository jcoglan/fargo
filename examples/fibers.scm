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
(puts (gen))
