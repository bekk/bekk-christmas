---
calendar: functional
post_year: 2020
post_day: 20
title: An introduction to Monoids in Haskell
links:
  - url: https://en.wikipedia.org/wiki/Monoid
    title: Monoid - Wikipedia
  - title: "Data.Monoid "
    url: https://hackage.haskell.org/package/base-4.14.1.0/docs/Data-Monoid.html
authors:
  - Morten Kolstad
---
# Monoids in Haskell

# What are monoids?

Have you ever felt that folds like reduce/foldr/foldl are too "low level"?
Because they care about right vs left assoicativity?
Because you have to provide an element where in many cases they are often given?

Then you should meet your lord and saviour, Monoid (and foldMap)

# What are monoids?

Monoid is a concept  from abstract algebra, and is there defined as :
a set equipped with an associative binary operation and an identity element.

A binary operation on a set is a function takes two arguments from the set and produces another one.
Being associative means that the grouping of parentheses does not matter, so for a binary operation <> that means that `x <> (y <> z) (x <> y) <> z`.

An identity element is an element of the set that follows `mempty <> x === x` and `x <> mempty === x`.
So it is kind of an "empty" element


Translated into Haskell
    * A Set -> A Type `a`
    * binary operation -> a function `a -> a -> a`
    * identity element -> `mempty : : a`

So implemented in Haskell it becomes (*) 

```haskell
class Monoid a where
    (<>) : : a -> a -> a
    mempty : : a
```





## Basic Monoids

Let us start with some basic, but common and useful monoids.

### Sum and Product
When we want to get the sum of values, we can use `Sum`. 
The `Sum` is a monoid for numbers where the binary operation is addition and the identity element is `0`.

SUM INSTANCE

```haskell
Sum 2 <> Sum 4
> Sum 6

mempty :: Sum Int
> Sum 0

```

If we instead want to multiply values into a? product, we can use `Product`.
Here the binary operation is multiplication and the identity element is `1`.

PRODUCT INSTANCE

```haskell
Product 4 <> Product 5 <> mempty -- ==> Product 20
```

But how do we use this on multiple values, like combining all the elements in a list using `<>`?

### Foldable

Haskell has a type class for data structures that can be folded.
To be folded just means to combine the values inside the structure, which is exactly what we want to do with monoids.

```haskell
foldMap :: (Foldable t, Monoid m) => (a -> m) -> t a -> m
```

What this function does is to apply the `a->m` function on every `a` in the `t a` and then combines all the resulting `m` values using `<>`
and uses `mempty` when the foldable is empty.  

This a bit abstract, so let us see some concrete examples.
Let us first look at lists :

```haskell
instance Foldable [] where
    foldMap _ []     = mempty
    foldMap f (x:xs) = f x <> foldMap f xs
```



foldMap (Sum . fst) [(1,"abc"),(2,"12"),(3,"xx")] -- ==> Sum 6


`Maybe` is also foldable.

```haskell
instance Foldable Maybe where
    foldMap _ Nothing = mempty
    foldMap f (Just x) = f x
```

When the values inside the `Foldable` are of the monoid we need already we can use the `fold` function.

```haskell
fold :: (Foldable t , Monoid m) => t m -> m
fold = foldMap id

fold (Just "abc")
> "abc"

fold Nothing
> ""

fold [Sum 1, Sum 3, Sum 5]
> Sum 9
```

foldMap (Sum . fst) [(1,"abc"),(2,"12"),(3,"xx")] -- ==> Sum 6


## Bool Monoids

### Any - All
 
All and Any are newtypes for monoid instances for (&&) with mempty = True and (||) with mempty = False, respectivly.

They can be use to check that any or all elements in a foldable container satisfies a predicate.


foldMap (Any . (==5)) [1,3,5,2] -- ==> Any True


foldMap (All . (>2) . length) ["abc","xs"] -- ==> All False

Bool can also be made into a monoid using the `xor`-operation.

## Min Max

When you want to find the maximum of values of values, you can use the `Max` monoid.

mempty <> Max 2 <> Max 3 -- ==> Max 3



For miniumum, we use `Min`.

mempty <> Min 2 <> Min 3 -- ==> Min 2

INSTANCES

As we can see, the identity element for `Min` is `maxBound` and `Max` is `minBound`.

```haskell
mempty :: Min Int
> Min {getMin = 9223372036854775807}
mempty :: Max Int
> Max {getMax = -9223372036854775808}
```

This means that if we fold an empty container, we get a value which is confusing in some cases.

```haskell
fold [] :: Min Int
> Min {getMin = 9223372036854775807}
```

Instead we probably want to represent this "failure" using Maybe.


## Lifting a Semigroup into a Monoid

If we look at the Maybe data type : `data Maybe a = Nothing | Just a`.
We can see it can represent a set of values (`Just a`) with an additional element `Nothing` which should work? as an identity element.
In other words, we embed a semigroup in a monoid by adjoining an identity.

The monoid intance for `Maybe` implements this idea .

INSTANCE

```haskell
fold [Just (Sum 1), Just (Sum 2)]
> Just (Sum 3)
```

We can use this to fold into a semigroup.
An example of a semigroup that is not a monoid, is `First` which has the semigroup implementation `a <> _ = a`, meaning that it will always pick the left argument.
There is understandably no identity element for this semigroup.
But by using `Maybe (First Int)` we use `Nothing` as our identity.

```haskell
foldMap (Just . First) [1,2,3]
> Just (First 1)
```

Back to our "problem" with the min/max identities:
If we now wrap up our type inside a `Maybe`, the result is more sensible?
```haskell
>fold [] :: Maybe (Min Int)
Nothing
```


## [a] - The free monoid




## Composing monoids - Where the fun begins

A core value? in Haskell is composability . Composability is important to be able to combine small parts into bigger programs easily.
Luckily monoids compose in multiple ways.
Let us take a look

### Tuples
Can we combine two monoids 

INSTANCE

```haskell
("abc",Sum 2) <> ("abc",Sum 1) 
> ("abcabc", Sum 3)
```

This also implemented for larger tuples.

We can use this to find the minimum,maximum,length,sum and product of a list, in one pass in a  neat way. 

```haskell
foldMap (\x -> (Min x, Max x, Sum 1, Sum x, Product x)) [5,1,3]
```

And for another example:
Let us say that we have a list of x y coordinates and want to find AVGRENNSENDE OMRÅDET, the bottom left and top right corner.
namely min x, min y and max x, max y

(\(x,y) -> ((Min x, Min y),(Max x, Max y)))


```haskell
> foldMap (\(x,y) -> ((Min x, Min y),(Max x, Max y))) [(0,5),(5,0),(5,10),(7::Int,3::Int)]
((Min {getMin = 0},Min {getMin = 0}),(Max {getMax = 7},Max {getMax = 10}))
```



### Ap 


```haskell
> fold [Just "a", Nothing, Just "c"]
Just "ac"
> fold [Ap $ Just "a", Ap $ Nothing, Ap $ Just "c"]
Ap {getAp = Nothing}


> fold [[Sum 1], [Sum 2, Sum 3]]
[Sum {getSum = 1},Sum {getSum = 2},Sum {getSum = 3}]
> fold [Ap [Sum 1], Ap [Sum 2, Sum 3]]
Ap {getAp = [Sum {getSum = 3},Sum {getSum = 4}]}
```



## Set and Map
Both Sets (Data.Set) and Maps (Data.Map) have monoid instances, with
the respective `union` as the binary operator and `empty` as the identity element.

```haskell
foldMap Set.fromList [[1,2,3],[3,4,5],[4,5,6]]
> Set.fromList [1,2,3,4,5,6]

Map.fromList [(0,"abc"),(1,"xyz")] <> Map.fromList [(1,"www"),(2,"q")]
> Map.fromList [(0,"abc"),(1,"xyz"),(2,"q")]
```

As you can see, the Map monoid instance only keeps the values from the left map when encountering dupliacate keys.
Often you would like to combine the values.
Then you could use `Map.unionsWith`

```haskell
Map.unionsWith (<>) Map.fromList [(0,"abc"),(1,"xyz")] Map.fromList [(1,"www"),(2,"q")]
> Map.fromList [(0,"abc"),(1,"xyzwww"),(2,"q")]
```

The [appendmap](https://hackage.haskell.org/package/appendmap) package provides a newtype `AppendMap` with this monoid instance.

```haskell
AppendMap (Map.fromList [(0,"abc"),(1,"xyz")]) <>  AppendMap (Map.fromList [(1,"www"),(2,"q")])
> AppendMap Map.fromList [(0,"abc"),(1,"xyzwww"),(2,"q")]
```


# Create a Monoid from a Semigroup - Monoid (Maybe a)

If we have a type that is a semigroup, we can make a monoid out of it by adjoining an element that we chose as the identity element. To do this we use the Maybe data type where Nothing is the identity element.

Lift a semigroup into Monoid

The implementation is straigth-forward.

instance Semigroup a => Semigroup (Maybe a) wheree
    Nothing <> y = y
    x <>  Nothing  = y
    Just x <> Just y = Just (x <> y)

instance Semigroup a => Monoid (Maybe a) where
    mempty = Nothing

This instance is very useful , not only for lifting types that are only semigroups, but also for instances like Min and Max, where you often don't want the mempty value.

foldMap (Just . Max) []


