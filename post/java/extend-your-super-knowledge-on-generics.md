---
calendar: java
post_year: 2019
post_day: 23
title: Extend your super knowledge on Generics
image: >-
  https://images.unsplash.com/photo-1538499630394-0ca197249217?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3306&q=80
ingress: >-
  We all know and appreciate Java Generics. It enables us to say "oh, this is a
  List of Strings", "oh, this is a Comparator for Integers", and the compiler
  will forbid you to add numbers to your list, or sorting your List of Strings
  by comparing Integers. Because it does not make sense. Before Generics was
  introduced in Java 5.0 in 2004, nothing was stopping you from expressing these
  nonsensical actions, and things would blow up when running your program,
  instead of being told already when writing the code that there is no way this
  will work.
authors:
  - Rune Flobakk
---
When we are introduced to Java Generics, parameterized types, or what you choose to call it, it is usually in the context of container classes. The most well-known containers in Java are probably the ones offered by the Collections Framework. Parameterized types is an intuitive fit for managing lists, sets, maps, and other generic collections in a safe way. The alternative before Generics was introduced, was scattering collections around which you can add anything to, and must remember which type you must manually cast to when retrieving elements. Generic collections is an easy concept to grasp and use. It is almost as if Java Generics were introduced solely for collection classes.

But what are those `extends` and `super` words for? And the `?`? They always introduce problems. They seem to be related to why we can't pass a `List<Car>` to a method accepting a `Collection<Vehicle>`, even though a `List` _is_ a `Collection` and a `Car` _is_ a `Vehicle`. We can fix this by having the method accept a `Collection<? extends Vehicle>` instead. Ok, so we can settle with the fact that we can assign the `List` to its super type of `Collection`, but this does not work with those types inside the `<` and `>`. In some cases, and for some reason, we have to be so darn verbose by saying "oh, this is a Collection of something which is a Vehicle of some particular type".

And that `super` word. That's just weird.


## The `extends` wildcard

The `extends` keyword used with a type parameter is probably the most familiar wildcard type annotation in Java. With collections in Java they may still be confusing at first. For instance, why is this not possible:

```java
void addYourCars(List<? extends Vehicle> vehicles) {
    vehicles.add(new Car());   // does not compile
}
```

It is a list of anything which extends the `Vehicle` class and `Car extends Vehicle`, so why can I not add a `Car`? Is it bug in the type system?

![Thinking covariantly](https://i.ibb.co/7Y34RfR/thinking-covariantly.png)

It is actually quite easy to get an understanding to why being able to add a `Car` to this list would be a hole in the type system. Consider adding some more context to the code above:

```java
void collectVehicles() {
    List<Boat> vehicles = new getYourBoats();
    addYourCars(vehicles);
}

void addYourCars(List<? extends Vehicle> vehicles) {
    vehicles.add(new Car());   // does not compile
}
```

The list of boats which is passed as a _list of some particular type of vehicles_, i.e. `List<? extends Vehicle>`, can not contain cars, and the type system prevents us from having such an error in our program. And we can not trick the type system by assigning the `List<Boat>` to the lesser specific type `List<? extends Vehicle>`, which is what we do by passing it as an argument to the method.

The following code example should make this very evident:

```java
List<Boat> boats = new ArrayList<Boat>();
List<? extends Vehicle> vehicles = boats;
vehicles.add(new Car());   // nope!
```

There is only one `List` instance being instantiated, and it is an `ArrayList<Boat>`. The instance is then (correctly) assigned as a `List<? extends Vehicle>`, but that does not change _what_ the list was instantiated as, and that integrity is maintained by the type system, which refuses to add a car to the list of boats.

If the list was indeed instantiated as an `ArrayList<Vehicle>`, then it would be possible to add both cars and boats to it. And that is also why it is not allowed to assign a `List<Boat>` to a `List<Vehicle>`, as they exhibit different behaviour in what type of elements you may add to them.

You _are_ allowed to assign a `List<Vehicle>` as a, also in this case lesser specific, type of `List<? extends Vehicle>`, and you will loose the ability to add anything to the list through the new reference:

```java
List<Vehicle> vehicles = new ArrayList<Vehicle>();
vehicles.add(new Car());
vehicles.add(new Boat());

List<? extends Vehicle> sameVehicles = vehicles;
sameVehicles.add(new Car());   // compile error!
```


### In summary

In the previous examples, `List<? extends Vehicle>` is a parameterized type, and `? extends Vehicle` is a wildcard type.

Types describe properties of instances passed around in our program, and the type system must always be able to guarantee the integrity of what an instance was originally created as. When an instance is passed as a compatible less specific type than what it was originally declared, we loose some options for what we may do with this instance. As in the examples with the lists of vehicles, cars and boats, it makes sense that when we don't know exactly of which specific type a list was originally declared as, the type system can not allow us to add anything to it, because it may be list of boats, or a list of cars. It may also be a list vehicles, which can hold both cars and boats, but we don't know as long as we have a `List<? extends Vehicle>`.

But how does the compiler know that the `add(..)` method is not safe? Having a `List<? extends Vehicle>` or `List<Vehicle>` does not stop us from retrieving the vehicle instances contained in the list.


### Generics with `extends` — in general

The compiler and type system does _not_ know anything about the semantics of lists and what it means to add elements to them. The compiler knows about a _certain property_ of the signature of the `add(..)`-method: it accepts an argument of the same type as the declared type parameter for the List: `add(T element)`. We can not pass arguments to the add method when the type states that `T` may have been declared as either `Boat` or `Car`. It may even be declared as `Vehicle`, making the list capable to hold both boats and cars, but the wildcard type has lost this information.

**💡 If we do not know _exactly_ which type `T` is, all methods accepting arguments of this type are effectively useless.**

The `extends` wildcard have a distinct relation to method arguments, in that it renders any method with parameters of the wildcard type as simply not invocable. The compiler will not allow it. Now this seems like a rather annoying restriction. Why would anyone want to disable perfectly usable functionality? But this is what a type system is about, to impose restrictions on what you may express in code in order to provide certain guarantees on correctness.

So what _do_ we gain with declaring wildcard types?

**💡 The `extends` wildcard type widens the scope of assignable references for the parameterized type, e.g. what you may pass as a method argument, at the cost of effectively shutting off all methods of the parameterized type accepting the wildcard type as input parameter.**

So for collections, methods retrieving elements from a given collection, but does not mutate it by adding new elements, will typically benefit from accepting a more flexible parameterized type declared with the `extends` wildcard. Using our cars and boats, and say they need to be registered in some vehicle registry, the following code skeleton should demonstrate how to be able to accept collections of different types of vehicles:


```java
class VehicleRegistry {
    void register(Collection<? extends Vehicle> vehicles) {
        // register given vehicles
    }
}

VehicleRegistry registry = new VehicleRegistry();
List<Car> cars = new ArrayList<>();
List<Boat> boats = new ArrayList<>();
registry.register(cars);
registry.register(boats);
```

The `register(..)`-method is able to accept collections of cars and boats because of the wildcard type, but are not able to add elements to the given list.




## So what about `super`?

As the `extends` wildcard puts restrictions on the use of methods having the wildcard type in their parameters, the `super` keyword puts restrictions on methods _returning_ the wildcard type. Not in a way that you can not invoke such methods, but you can only ever get a value of type `Object` when invoking methods returning a wildcard type declared with `super`.

Continuing with our types of vehicles, consider the following example:

```java
List<? super Car> vehicles = new ArrayList<Vehicle>();
vehicles.add(new Car());
Object x = vehicles.get(0);
```

We create a list for containing vehicles, but somewhat strangely assign it to a list of something that may be cars or any super-class of `Car`. This has, what is probably expected, the implication that you can not add a `Boat` to the list, as it is not a super-class of `Car`. But it also has the somewhat strange effect that the _only thing that is safe to add_ to a `List<? super Car>` is specifically a `Car`. We can not add a `Vehicle`. Perhaps even more non-intuitive is that if we have a `Volvo` class which extends `Car`, we _can_ add a Volvo to a list declared to contain `? super Car`!

```java
List<? super Car> vehicles = new ArrayList<Vehicle>();
vehicles.add(new Car());
vehicles.add(new Volvo());
```

This is weird, but still valid code. And again, if your experience with Generics is mostly by using them with the Collections Framework, the `super` keyword will seem _very_ esoteric. Granted, the super keyword is _not_ meant to be used as shown above, and does not yield any advantages.



### `super`-generics — in general

With the more elaborate assessment of the `extends` wildcard fresh in memory, let's look at the effects of the `super` wildcard from a general point of view as well.

The `super` wildcard is all about flexibility when _consuming_ values of specific types, since a wildcard type of `? super T` enables the parameterized type to accept any arguments of type T as method arguments. But a type parameter _without_ a wildcard already enables this capability.

**💡 The `super` wildcard type widens the scope of assignable references for the parameterized type, e.g. what you may pass as a method argument, at the cost of effectively making the wildcard type unusable as a return type for all methods of the parameterized type.**

So analogous to the `extends` wildcard, `super` is also about enabling flexibility when passing references of parameterized types. And in the case of the `super` wildcard, the parameterized type is used for consuming values of the wildcard type.



### Some `super` awkward collection manipulation

Passing a list of some type to some method which then mutates the list by adding elements to it as a side effect, is rarely a natural way of solving how to populate a list. But to bring some closure to our use of the Collections Framework as examples for applying wildcard types, consider this code:

```java
class ParkingLot {
    List<Car> cars = new ArrayList<>();

    void putExpiredInto(Collection<? super Car> expired) {
        // determine cars with expired parking,
        // and add them to the given Collection
    }
}

ParkingLot parkingLot = new ParkingLot();
parkingLot.cars.add(new Car());

List<Car> expiredCars = new ArrayList<>();
parkingLot.putExpiredInto(expiredCars);
```

The implementation of `putExpiredInto(Collection)`-method is just a matter of invoking `expired.add(..)` for applicable cars in the parking lot, and not affected by the Collection being parameterized with a type with or without a `super` wildcard. But the wildcard adds more flexibility in which types of collections which are accepted as input parameters by the method, but still being type safe. Code using `putExpiredInto(Collection)` may actually not be interested in having the expired parked cars put into a collection of cars, but a more general kind, say a `List<Vehicle>`, or even a `Set<Object>`, and that should not matter to the `ParkingLot`. What does matter though, is that it is not accepted to add the cars to a collection of for instance boats, and the type system is able to enforce that. 

```java
ParkingLot parkingLot = new ParkingLot();

List<Vehicle> expiredVehicles = new ArrayList<>();
parkingLot.putExpiredInto(expiredVehicles);

Set<Object> expiredAnything = new HashSet<>();
parkingLot.putExpiredInto(expiredAnything);

Set<Boat> boats = new HashSet<>();
parkingLot.putExpiredInto(boats);  //does not compile
```
The `? super Car` wildcard type enables to express that the method needs to be able to add cars to the given collection, but the caller is free to choose any level of compatible generality of the collection. Without the `super` wildcard, it would not be possible to pass _any_ of the collections instantiated in the last example. With the wildcard, only the non-sensical operation of adding cars to a collections of boats is prohibited.



### Applying the general `super` powers

The `super` wildcard has arguably become more applicable with the introduction of facilities for functional programming in the Java language. Functions, and especially passing functions to other functions, creates a more natural motivation for designing methods accepting arguments with flexible means for consuming values. Functions _are_ notorious for consuming values.

So finally leaving the Collections Framework, let us apply the general understanding we now should have on where the two types of wildcard apply to method signatures:

- `extends` adds flexibility to return types, but disables method parameter types
- `super` adds flexibility to method parameter types, but makes return types not useful

So which simple concept can we apply this knowledge to in an actual useful way? The new facilities introduced in Java 8: Functional Interfaces. You are probably already passing lambdas and method references to various methods in APIs of the JDK and third parties which utilizes both types of wildcards. The [`Function<T, R>`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html) interface is a perfect fit for both `super` and `extends`, because its two type parameters, `T` and `R`, assigns types to respectively a method input parameter type, and a return type.

Say that every vehicle has a name, so we add a method for getting it to `Vehicle`. Then, with an instance of another ubiquitous type introduced in Java 8, an Optional<Car>, we wish to map the `Car` to a `String` containing the car's name:

```java
Optional<Car> car = Optional.of(new Car());
String carName = car.map(Vehicle::getName).orElse("no car");
```

This is simple enough, nothing controversial. But what is the type of `Vehicle::getName`? Let's assign it to a reference to make it more explicit:

```java
Optional<Car> car = Optional.of(new Car());
Function<Vehicle, String> getName = Vehicle::getName;
String carName = car.map(getName).orElse("no car");
```

Here we see that the signature of the method reference is `Function<Vehicle, String>`, so the `.map(..)`-method is able to accept a `Function` which is parameterized with a super-type of what is contained in the `Optional`. The signature of the method is declared like this:

```java
<U> Optional<U> map(Function<? super T, ? extends U> mapper);
```

And we recognize the `super` wildcard being used for the type parameter for what the function declares as it's input type. It is perfectly valid to do that since the contained value of the `Optional` is _passed_ to the given mapping function, and it is up to the caller of `.map()` to pass a function of appropriate level of generality. It may be as specific as only accepting `Car`, but _not anything more specific_. I.e. a subclass of `Car` will not be allowed, because the type system can not guarantee the value is anything more specific than a `Car`.

The effect of the `extends` wildcard is a bit more subtle. It enables the function to return a more specific type than the resulting type parameter of the returned `Optional<U>`. This kind of flexibility is important, as the resulting `Optional` could very likely be used as a return value from a method which signature is already defined by an interface. And, as already demonstrated, an `Optional<A>` is never compatible with `Optional<B>` even though if `B` is a subclass of `A`. But the `extends` wildcard enables the function to for instance return a value of type `String`, and if the result of the mapping must be of type `Optional<CharSequence>`, the compiler is inspecting the _target type_ to verify that assigning the resulting type parameter to a super-type.

```java
Optional<CharSequence> getCarName() {
    Optional<Car> car = Optional.of(new Car());
    Function<Vehicle, String> getName = Vehicle::getName;
    return car.map(getName);
}
```

Recalling the signature of `Optional.map(..)`, the compiler verifies that `String`, when substituted with `U` such that `? extends String`, is indeed a type which extends the target type parameter of `CharSequence`. This holds, and the compiler can safely allow this type transformation.




## Summary

Types are about guarantees of the constructs we are working on in code. For a type system to be sound it must maintain the integrity of values starting out as some specific type, and being passed around and referred to as potentially less specific types by code on various levels of generality. Treating values as less specific parameterized types than what it was originally conceived as, imposes certain restrictions on how the parameter types may be used.

The intention of this article has been to give an understanding and appreciation for how types enables to prove certain properties of our programs, automatically, and how maintaining the integrity of these proofs requires the type system to be very strict about how hierarchies of types are managed, and how working with parameterized types in hierarchies naturally imposes restrictions on what operations are possible to safely perform with generic types. The use of familiar examples instead of introducing theoretical concepts on type theory, should hopefully help the reader being able to begin to internalize more advanced use of Java Generics.

Readers interested in further understanding some of the theory behind types, I can recommend the article on [Covariance and contravariance on Wikipedia](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)). In particular, it is interesting to gain an understanding on how type parameterization differ in C# and Java, using respectively _declaration-site_ and _use-site_ variance type annotations. One can also argue that the keywords used in C# for variance, `in` and `out`, offer a more intuitive mnemonic for the effect of the variance than the overloaded words `extends` and `super` in Java.
