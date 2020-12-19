---
calendar: functional
post_year: 2020
post_day: 20
title: Haskell - A layman's deep-dive in monoids
image: ""
ingress: "This article will introduce an important and interesting concept in
  functional programming: Monoids. The focus will be on monoids in Haskell."
description: ""
links:
  - url: https://en.wikipedia.org/wiki/Monoid
    title: Monoid - Wikipedia
  - title: "Data.Monoid "
    url: https://hackage.haskell.org/package/base-4.14.1.0/docs/Data-Monoid.html
authors:
  - Morten Kolstad
---
# What are monoids?

*Monoid* is a concept that comes from abstract algebra, where  it is defined as :
a set equipped with an associative binary operation and an identity element.

A binary operation on a set is a function that takes two arguments from the set and produces another one.
Being associative means that the grouping of parentheses does not matter. For a
binary operation `<>`, that means that `x <> (y <> z) === (x <> y) <> z`.

An identity element is an element of the set where `mempty <> x === x` and `x <> mempty === x`.
So, it is kind of an "empty" element, that is "ignored" by `<>`.


Translated into Haskell:
* A set ==> A Type `a`
* binary operation ==> a function `<> :: a -> a -> a`
* identity element ==> `mempty :: a`

So, implemented in Haskell it could become:

```haskell
class Monoid a where
    (<>) :: a -> a -> a
    mempty :: a
```

This was how it was defined earlier, but now this class is split into two: `Semigroup` and `Monoid`.
A semigroup is just a monoid without the identity element part, a monoid is then a semigroup with an identity.
So now it is:

```haskell
class Semigroup a where
    (<>) :: a -> a -> a

class Semigroup a => Monoid a where
    mempty :: a
```

(When I refer to a "monoid instance" later in the article, I mean both the semigroup and monoid instance for a type, not just the monoid instance).


## Basic Monoids

Let us start with some basic, but common and useful monoids.

### Sum and Product
When we want to get the sum of values, we can use `Sum`. 
`Sum` is a monoid for numbers where the binary operation is addition (`+`) and the identity element is `0`.


```haskell
newtype Sum a = Sum { getSum :: a }

instance Num a => Semigroup (Sum a) where
        Sum a <> Sum b = Sum (a+b)

instance Num a => Monoid (Sum a) where
        mempty = Sum 0

Sum 2 <> Sum 4
> Sum 6

mempty :: Sum Int
> Sum 0

```



If we instead want to multiply values we can use `Product`.
Here the binary operation is multiplication (`*`) and the identity element is `1`.

```haskell
newtype Product a = Product { getProduct :: a }

instance Num a => Semigroup (Product a) where
        Product a <> Product b = Product (a*b)


instance Num a => Monoid (Product a) where
        mempty = Product 1

Product 4 <> Product 5 <> mempty
> Product 20
```



But how do we use this on multiple values, like combining all the elements in a list using `<>`?

## Foldable

Haskell has a type class for data structures that can be folded, called [Foldable](https://hackage.haskell.org/package/base-4.14.1.0/docs/Data-Foldable.html#t:Foldable).
To be folded just means to combine the values inside the structure, which is exactly what we want to do when using monoids.

```haskell
foldMap :: (Foldable t, Monoid m) => (a -> m) -> t a -> m
```

What this function does is to apply the `a -> m` function on every `a` in the `t a` combining all the resulting `m` values using `<>`
and uses `mempty` when the foldable is empty.

This a bit abstract, so let us see some concrete examples.
Let us first look at lists:

```haskell
instance Foldable [] where
    foldMap _ []     = mempty
    foldMap f (x:xs) = f x <> foldMap f xs
```

We can see that `foldMap f [x0,x1,x2,x3...,xn] === f x0 <> (f x1 <> (f x2 <> (f x3.... <> f xn)))`.
But since `<>` needs to be associative, these parentheses does not matter, so it is the same as : 
`f x0 <> f x1 <> f x2 <> f x3.... <> f xn`


```haskell
foldMap Sum [1,2,3]
> Sum {getSum = 6}

foldMap (Sum . length) ["hei","hopp"]
> Sum {getSum = 7}

foldMap (Product . fst) [(5,"abc"),(2,"12"),(3,"xx")]
> Product {getProduct = 30}

foldMap (foldMap (const (Sum 1))) ["abc","df"]
> Sum {getSum = 5}
```


`Maybe` is also a foldable container.

```haskell
instance Foldable Maybe where
    foldMap _ Nothing = mempty
    foldMap f (Just x) = f x

foldMap reverse Nothing :: String
> ""

foldMap Sum (Just 5)
> Sum 5

foldMap (foldMap Product) [Just 2, Nothing, Just 4]
> Product  8
```


When we don't need to transform the values inside the `Foldable`, we can use the `fold` function.

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

Now we have seen how to fold data structures using monoids, so let us take a look at some more monoid instances.


### Any and All
 
All and Any are `Bool` newtypes for monoid instances for `(&&)` with `mempty = True` and `(||)` with `mempty = False`, respectively.

They can be use to check that any or all elements in a foldable container satisfies a predicate.

```haskell
foldMap (Any . (==5)) [1,3,5,2]
> Any True


foldMap (All . (>2) . length) ["abc","xs"]
> All False
```

Bool can also be made into a monoid using the `xor`-operation.

## Min and Max

When we want to find the maximal value, we can use the `Max` monoid.

```haskell
newtype Max a = Max { getMax :: a }

instance Ord a => Semigroup (Max a) where
  Max a <> Max b = Max (max a b)
  
instance (Ord a, Bounded a) => Monoid (Max a) where
  mempty = minBound

mempty <> Max 2 <> Max 3
> Max 3
```


For miniumum, we use `Min`.
```haskell
newtype Min a = Min { getMin :: a }


instance Ord a => Semigroup (Min a) where
  Min a <> Min b = Min (min a b)
  
instance (Ord a, Bounded a) => Monoid (Min a) where
  mempty = maxBound

mempty <> Min 2 <> Min 3
> Min 2
```

As we can see, the identity element for `Min` is `maxBound` and `Max` is `minBound`.

```haskell
mempty :: Min Int
> Min {getMin = 9223372036854775807}
mempty :: Max Int
> Max {getMax = -9223372036854775808}
```

This means that if we fold an empty container, we get a value which may be confusing in some cases.

```haskell
fold [] :: Min Int
> Min {getMin = 9223372036854775807}
```

Instead we sometimes want to represent this "failure" using Maybe.


## Lifting a Semigroup into a Monoid

If we take a look at the Maybe data type: `data Maybe a = Nothing | Just a`,
we can see that it can represent a set of values (`Just a`) with an additional element `Nothing`.

If the `a`'s are monoids, we can combine them using `<>` and then chose `Nothing` as our identity element.
In other words, we embeded a semigroup in a monoid by adjoining an identity.

The monoid instance for `Maybe` implements this idea:

```haskell

instance Semigroup a => Semigroup (Maybe a) where
    Nothing <> b       = b
    a       <> Nothing = a
    Just a  <> Just b  = Just (a <> b)

instance Semigroup a => Monoid (Maybe a) where
    mempty = Nothing

fold [Just (Sum 1), Just (Sum 2),Nothing]
> Just (Sum 3)
```

We can use this to fold into a semigroup.
An example of a semigroup that is not a monoid is `First`, which has the semigroup implementation `a <> _ = a`, meaning that it will always pick the left argument.
There is understandably no identity element for this semigroup,
but by using `Maybe (First Int)` we use `Nothing` as our identity.
We have now created a monoid from the First semigroup, and can therefore use it in a fold.

```haskell
foldMap (Just . First) [1,2,3]
> Just (First 1)
```

Back to our "problem" with the min/max identity elements:
If we now wrap up our type inside a `Maybe`, the result is more sensible.
```haskell
>fold [] :: Maybe (Min Int)
Nothing
```


## Lists

Lists are monoids with `(<>) = (++)` and `mempty = []`.

```haskell
[1,2,3] <> [4,5]
> [1,2,3,4,5]

foldMap (\x -> [x,x*2]) [1,2,3]
> [1,2,2,4,3,6]

```

In fact, the list is an important monoid, called the free monoid.
This comes from the fact that if you take the requirements for a monoid and create the minimal structure needed to satisfy these requirements, 
you end up with list monoid instance.


### Tuples
A very neat property about monoids is that they compose over products.
Which in practice means, that if you have two monoids, you can combine them in a tuple, and then that tuple is also a monoid.

```haskell
instance (Monoid a, Monoid b) => Monoid (a,b) where
    (a,b) <> (a',b') = (a<>a',b<>b')
    
instance (Monoid a, Monoid b) => Monoid (a,b) where
        mempty = (mempty, mempty)

("abc",Sum 2) <> ("abc",Sum 1)
> ("abcabc", Sum 3)
```

(This is also implemented for tuples of size 3,4 and 5)

This makes it easy to accumulate multiple monoid values in a single fold.
We can use this to find the minimum, maximum, length, sum and product of a list, all in one pass in a neat way.

```haskell
foldMap (\x -> (Min x, Max x, Sum 1, Sum x, Product x)) [5,1,3]
> (Min 1,Max 5,Sum 3,Sum 9,Product 15)
```

And for another example:
Let us say that we have a list of x y coordinates and want to find, the bottom
left and top right corner, i.e. (min x, min y) and (max x, max y).


```haskell
> foldMap (\(x,y) -> ((Min x, Min y),(Max x, Max y))) [(0,5),(5,0),(5,10),(7::Int,3::Int)]
((Min 0,Min 0), (Max 7,Max 1))
```



### Ap -  Lifting a Monoid inta an Applicative

Applacatives have a strong connection to monoids. In categoory theory they are called `lax monoidal functors`.
Every Applicative gives us a monoid, by defining
`(<>) = liftA2 (<>)` and `mempty = pure mempty`.
This is the instance for the `Ap` newtype.

```haskell
[Sum 1,Sum 2] <> [Sum 10, Sum 11,Sum 12]
> [Sum 1,Sum 2,Sum 10,Sum 11,Sum 12]

Ap [Sum 1,Sum 2] <> Ap [Sum 10, Sum 11,Sum 12]
> Ap {getAp = [Sum 11,Sum 12,Sum 13,Sum 12,Sum 13,Sum 14]}
```

We see here how `<>` for regular lists, just appends the lists toghether, but 
`<>` for `Ap []` combines every element in the first list with every element in the second list,
which mirrors the applicative instance for lists.  

```haskell
> fold [Just "a", Nothing, Just "c"]
Just "ac"
> fold [Ap $ Just "a", Ap $ Nothing, Ap $ Just "c"]
Ap {getAp = Nothing}
```

As we have seen earlier, in the regular Maybe monoid, `Nothing` is the identity element.
Moreover, the applicative instance for maybe short circuits when you encounter `Nothing
Because the monoid instance for `Ap Maybe` inherits this behaviour, the second example ends up being `Nothing`, 
but in the first example the `Nothing` is "ignored".

There also exists another applicative instance for lists, namely `ZipList`, which combines elements pair-wise.
```haskell
liftA2 (,) (ZipList [1,2,3]) (ZipList [4,5,6])
> ZipList {getZipList = [(1,4),(2,5),(3,6)]}

Ap (ZipList [Sum 1,Sum 2]) <> Ap (ZipList [Sum 10, Sum 11,Sum 12])
> Ap {getAp = ZipList [Sum 11,Sum 13]}

```


## Set and Map
Both sets (Data.Set) and maps (Data.Map) have monoid instances, with
their respective `union` as the binary operator and `empty` as the identity element.

```haskell
foldMap Set.fromList [[1,2,3],[3,4,5],[4,5,6]]
> Set.fromList [1,2,3,4,5,6]

Map.fromList [(0,"abc"),(1,"xyz")] <> Map.fromList [(1,"www"),(2,"q")]
> Map.fromList [(0,"abc"),(1,"xyz"),(2,"q")]
```

As we can see, the Map monoid instance only keeps the values from the left map when encountering duplicate keys.
Often we would like to combine the values instead.
One alternative in this case is to use `Map.unionsWith` instead of `<>`

```haskell
Map.unionsWith (<>) Map.fromList [(0,"abc"),(1,"xyz")] Map.fromList [(1,"www"),(2,"q")]
> Map.fromList [(0,"abc"),(1,"xyzwww"),(2,"q")]
```

But sometimes we actually need this to be a monoid instance.
The [appendmap](https://hackage.haskell.org/package/appendmap) package provides a newtype `AppendMap` for exactly this purpose.

```haskell
AppendMap (Map.fromList [(0,"abc"),(1,"xyz")]) <>  AppendMap (Map.fromList [(1,"www"),(2,"q")])
> AppendMap Map.fromList [(0,"abc"),(1,"xyzwww"),(2,"q")]
```

# 

```haskell
foldMap fold [Just "Merry", Nothing, Just " Monoidal ", Nothing ,Just "Christmas"] <> "!"
> "Merry Monoidal Christmas!"`
```

