---
calendar: functional
post_year: 2019
post_day: 18
title: That one time I thought I understood recursion
image: 'https://underskaar.com/images/csharpman0.png'
ingress: >-
  A short tale about my struggle to comprehend why C# isn't a functional
  language.
links:
  - title: Exercism.io
    url: 'https://exercism.io/tracks/haskell'
authors:
  - Øyvind Skaar
---

In an effort to learn Haskell I have started to work through the exercises at [exercism.io](https://exercism.io/). It is an excellent site that provides classical programming exercises in loads of different languages. You get feedback from experienced mentors, and the feedback I have received so far has been really thoughtful and useful. I am learning tons!

I am having a go at learning **Haskell**. Not because this is something I will ever need. It is rather an attempt to get my head around functional programming, and Haskell doesn’t seem to pretend to have any practical application beyond that.

Although I am struggling, it is great fun!

My background is in OO programming, mostly using C#.
C# being the versatile language it is, I have had the perception that whatever you do in other programming languages, you can with a little more code and hassle achieve in C# as well. If need be, I can program C# using a functional paradigm. And, of course I use recursion all the time. I know all there is to know about recursion.

Obviously, I can’t know much about functional programming!

One of my tasks was to implement a function that returns the nth prime number.

Googling for a Haskell implementation of the problem, I would consider cheating. But using Wikipedia to find a general algorithm is not beneath my standards. So I jumped over to [this page](https://en.wikipedia.org/wiki/Primality_test#Pseudocode) and found a small optimization I probably wouldn’t have thought of myself.

The final solution was published, and I was pretty happy with my own efforts; a [beauty of just 30 lines](https://exercism.io/tracks/haskell/exercises/nth-prime/solutions/798a0cab2879469db0557d789d9c4ca7).
 
```haskell
module Prime (nth) where

import Data.Maybe

nth :: Int -> Maybe Integer
nth 1 = Just 2
nth 2 = Just 3
nth n 
    | n < 1 = Nothing
    | otherwise = Just (nextPrime (fromJust (nth (n - 1))))

nextPrime :: Integer -> Integer
nextPrime previous
    | mod previous 2 == 0 = nextPrime previous + 1
    | isPrime (previous + 2) = previous + 2
    | otherwise = nextPrime (previous + 2)

isPrime :: Integer -> Bool
isPrime n
    | n <= 3 = n > 1
    | divisibleBy 2 = False
    | divisibleBy 3 = False
    | n < 25 = True
    | any 
        (\k -> divisibleBy k || divisibleBy (k + 2)) 
        [5,11..floor(sqrt $ fromIntegral n)] 
            = False
    | otherwise = True
    where
        divisibleBy x = mod n x == 0
```

I had used most of what I had learned so far, and recursion too. (It seems like all the problems presented in functional programming courses invites a recursive solution.)

In exercism, you get the option to publish your solution, and to look at other users published solutions.
I browsed some of them. [For instance this](https://exercism.io/tracks/haskell/exercises/nth-prime/solutions/8bb1b551c3e84759a39ed231a10826ed):

```haskell

nth :: Integral a => Int -> Maybe a
nth 0 = Nothing
nth x = Just (last $ primes x)

primes :: Integral a => Int -> [a]
primes n = take n $ sieve [2..]
    where sieve (p:xs) = p : sieve [x | x <- xs, x `rem` p > 0]
          sieve [] = []
```

Not only is it _much_ shorter, it also applies a combination of recursion and lazy partial execution of the function. This led me to understand how little I had understood.

Now, it is conceivable that this is the [canonical solution to this particular problem](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes), but still my head exploded.

Is this at all possible to achieve in C#?
I sat down and tried to restore the honour of C# by [solving it with recursion and lazy implementation in my old familiar language](https://gist.github.com/oyms/e7bad5882dd8495246b5a9045c474444). (With a little more code and hassle.)

```csharp
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace CSharpCanDoFunctional
{
    class PrimeFinder
    {
        public int Nth(int n) => Siphon(new Generator()).Skip(n - 1).First();

        private IEnumerable<int> Siphon(SingletonIterable numbers)
        {
            var (head, tail) = numbers;
            yield return head;
            foreach (var n in Siphon(tail).Where(x => x % head != 0))
            {
                yield return n;
            }
        }
    }

    class Generator : SingletonIterable
    {
        public Generator() : base(Numbers().GetEnumerator()){}
        private static IEnumerable<int> Numbers()
        {
            var n = 2;
            while (true) yield return n++;
        }
    }

    class SingletonIterable : IEnumerable<int>
    {
        private readonly IEnumerator<int> _enumerator;

        protected SingletonIterable(IEnumerator<int> enumerator)
        {
            _enumerator = enumerator;
        }
        public IEnumerator<int> GetEnumerator() => _enumerator;
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public void Deconstruct(out int head, out SingletonIterable tail)
        {
            _enumerator.MoveNext();
            head = _enumerator.Current;
            tail = this;
        }
    }
}
```

No, I don’t think it is possible to solve this way in C#. 

In about 50 lines the snippet achieves almost but not quite what Haskell could do in seven. I just took a massive code golf defeat.

I think I have learned something new today.
