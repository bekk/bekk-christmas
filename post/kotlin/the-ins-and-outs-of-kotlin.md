---
calendar: kotlin
post_year: 2019
post_day: 22
title: The 'in's and 'out's of Kotlin
image: >-
  https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ingress: >-
  Wonder why a MutableList<Cat> isn't a subtype of MutableList<Animal>? Ever
  seen the "in" and "out" modifiers in Kotlin and wondered what they did? Let's
  find out!
links:
  - title: Kotlin docs for generics
    url: 'https://kotlinlang.org/docs/reference/generics.html'
authors:
  - Jørund Amsen
---
So the other day I was writing a program for my new zoo. What? Okay fine I haven't actually opened a zoo, I was writing some very boring domain-specific software at work. But it's Christmas, let's just pretend. 

There I was modelling my new zoo in Kotlin. I had decided on a simple inheritance; all animals of the zoo would inherit from the superclass "Animal", and would be contained in a list of animals. Currently all I had for my zoo were my two cats; Sir Toby and Mr Winterbottom. It looked something like this:

```kotlin
open class Animal(val name: String) {
    fun eat() {}
}

class Cat(name: String) : Animal(name) {
    fun purr() {}
}

fun main() {
    val winterbottom = Cat("Mr Winterbottom")
    val toby = Cat("Sir Toby") 
    
    val myCats: List<Cat> = listOf(
        winterbottom,
        toby        
    )
    
    val zooAnimals: List<Animal> = myCats
}
```
 
All was good and i kept on adding new features to my zoo. Until at one point I realized something quite obvious: I need to be able to expand my zoo! Well that's a simple refactoring, I just take that List of Animals and turn it into a MutableList of...

![Type mismatch. Required MutableList<Animal>. Found: MutableList<Cat>](https://i.ibb.co/7WwKxXW/bilde.png)
 
Wait, what? What do you mean my cats arent animals? And why don't I get the error when I have a normal immutable List? Confused? [Try it yourself:](https://pl.kotl.in/aQNJT1aEj)

Now some of the more experienced of you might already be mumbling about "covariance, contravariance, decleration-site versus use-site variance, ArrayStoreException" and other technical mumbo jumbo. But for those of you who - like me - are stumped by why the mutability of my list seemingly defines whether Mr Winterbottom is an animal or not(he most assuredly is!): I'll try to explain.

Like any good developer I undid and redid my change from List to MutableList about seven times before admitting it wasn't IntelliJ trying to mess with me. I then proceeded to take a look at the signature of the two interfaces:
```kotlin
interface List<out E> : Collection<E>
interface MutableList<E> : List<E>, MutableCollection<E>
```

Pretty much what I expected except one little thing: before the generic "E" of List, there was the keyword "out". This was missing in MutableList. Huh. 

### A little recap

Now before we go any further, let's do a very quick recap of inheritance and generics. 
In Kotlin as with many programming languages we are allowed to assign a subclass to a variable with the type of one of its superclasses:

```kotlin
val winterbottom: Cat = Cat("Mr Winterbottom")
val anAnimal: Animal = winterbottom
```
Now, of course we cannot handle this variable as if it was a cat since we've only declared it as an Animal:
 
![Unresolved reference: purr](https://i.ibb.co/pn0tGQK/bilde.png)
 
 
This is one of the central mechanics in object oriented programming.
 
Now with generics, things get a little trickier. Let's take our zoo. Eventually I need somewhere for my animals to stay, so I'll make an Enclossure class. (Cage sounds so...cramped). And I'll make it generic on any subtype of animal:

```kotlin
class Enclosure<T : Animal> {
    private var resident: T? = null

    fun moveInAnimal(animal: T) {
        this.resident = animal
    }

    fun feed() {
        resident?.eat()
    }
}
```

And give Mr Winterbottom a new home.

```kotlin
val winterbottom: Cat = Cat("Mr Winterbottom")
val catHouse = Enclosure<Cat>()
catHouse.moveInAnimal(winterbottom)
```
 
So this is all well and good. We've made a generic class that can be used with any animal that inherits from the Animal-class, like a dog or a sloth. It even has the `feed()`-function that acts equally on all animals. However say I now wanted to add the feature of feeding any animal inside an Enclosure:
 
```kotlin
fun feedAnimalInside(enclosure: Enclosure<Animal>) {
    enclosure.feed()
}
```

And using it would look something like this:

```kotlin
val winterbottom: Cat = Cat("Mr Winterbottom")
val catHouse = Enclosure<Cat>()
catHouse.moveInAnimal(winterbottom)
    
feedAnimalInside(catHouse)
```
 
Now intuitively, this might look good. However, this doesn't actually compile:
 
 
 ![Type mismatch. Required Enclosure<Animal>. Found: Enclosure<Cat>](https://i.ibb.co/pKK72QP/bilde.png)
  
You see, in Kotlin, generic types are by default **invariant**. This means that `Enclosure<Cat>` is **not** a subtype of `Enclosure<Animal>`, and cannot be assigned to it. We say that *`Enclosure<T>` is invariant in T*. "But wait!", you might be saying... "Didn't you assign a `List<Cat>` to a `List<Animal>` earlier?" I did indeed, and herein lies the magic. If we take one more look at the documentation for [List](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-list/index.html) and [MutableList](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-mutable-list/index.html), right underneath the signature, by the parameter descriptions it says:


>`interface List<out E> : Collection<E>`  
>E - the type of elements contained in the list. The list is **covariant**  on its element type.

>`interface MutableList<E> : List<E>, MutableCollection<E>`   
>E - the type of elements contained in the list. The mutable list is **invariant** on its element type.


So what it means is that `List<Cat>` is a subtype of `List<Animal>`, since it is **covariant** on the generic type. Whilst `MutableList<Cat>` is not a subtype of `MutableList<Animal>` since it is **invariant**. Wait, so why did the Kotlin standard library even put such a restriction on MutableList? Well imagine for a moment that MutableList **is** covariant:
 
```kotlin
val myCats: MutableList<Cat> = mutableListOf(
    Cat("Mr Winterbottom"),
    Cat("Sir Toby")
)

val zooAnimals: MutableList<Animal> = myCats
```

I assign my `MutableList<Cat>` to a variable of type `MutableList<Animal>`. All is fine and dandy. Until the "new guy" (a dog person...) tries to make this function:
 
```kotlin
fun addADog(animals: MutableList<Animal>) {
    animals.add(Dog("Hachiko"))
}
```
 
There is nothing wrong with it, a list of animals should definitely be able to hold a Dog, which also inherits from Animal. However, what if I now run the function with my mutable list of cats? (Which we are pretending are a subclass of `MutableList<Animal>`)

```kotlin
val myCats: MutableList<Cat> = mutableListOf(
    Cat("Mr Winterbottom"),
    Cat("Sir Toby")
)

addADog(myCats)
```
 
Take a moment before you read on to ask yourself *why* the Kotlin people would not allow this. Why isn't the class MutableList covariant? What error will this cause? Don't worry, take your time. This whole generic business is a bit to wrap our head around. 

Ready for the answer? The error we'd encounter is we are now adding a `Dog` to a variable defined only to hold `Cats`. The variable myCats originally wasn't a `MutableList<Animal>` but a `MutableList<Cat>`, one which now suddenly contains a Dog! In Java, we can encounter this error with Arrays since Arrays are **covariant** on its type. It's called an ArrayStoreException, and is a runtime error. Meaning nothing warns us that it will happen. However in Kotlin, they've tried to make this type of error difficult by making all generics by default **invariant**. So why then is an immutable List **covariant**? Well first of all, if we had a `List<Animal>` as a parameter to our `addADog()`, we wouldn't be able to add a dog. Since.. well the List interface doesn't have `add()`. So what that means, is that you can't mess with the content of List. Meaning it's safe to assign a `List<Cat>` to `List<Animal>`, because none can by mistake of adding a `Dog` or a `Sloth`. 

So can we generalize this rule to any kind of generic class? Well, kind of. The rule as far as I've understood it is this:

Only a class whose members strictly return the type on which it is generic can be covariant on said type. Meaning no functions of the class can take/consume a parameter of the type, they can only return it. This in turn means there is no way for such a class to have a function that can take a "wrong" subclass and add it to its member variables. We call classes that only return their type **producers**. Producers are covariant on their type. `List<E>` is a **producer**, and is therefore **covariant** on E. However MutableList has the function `add(element: E)`, this means the class doesn't strictly **return**, it also **consumes** a parameter of the type and thus is not a producer, nor is it covariant. 

### Always an exception

Now before some of you get all up in arms about the List-interface having functions such as `contains(element: E)`, which quite clearly consumes a parameter of the type, and therefore should make List not strictly a producer. Let's take a look at the List implementation:

![The contains() function in List is annotated with @UnsafeVariance](https://i.ibb.co/9tjmCPC/bilde.png)

 

Notice the `@UnsafeVariance` annotation? Yep. I just gave you a strict rule to follow, and one minute later I show you a exception to it. As long as you annotate the functions of your producer that do consume its type with `@UnsafeVariance`, Kotlin won't complain. This means Kotlin forces you to make a conscious decision to break this rule, if you so wish. At least it tried.

### Out
So how do we annotate a type in such a way that our generic class will be covariant on it? Some of you might already have guessed it: the `out` modifier. Doing so not only makes our class covariant on this type, it also stops us from making any function that take this type *in* as a parameter, and only allows us to return it. In other words: the type can only go **out** of our class. Hence the name! This is also why MutableList does *not* have `out` on it's type, since it has functions that consume it without the annotation. 


### More cats!

Phew! Still hanging on? All right we have one more thing. Remember that Enclosure-class?

```kotlin
class Enclosure<T : Animal> {
    private var resident: T? = null

    fun moveInAnimal(animal: T) {
        this.resident = animal
    }

    fun feed() {
        resident?.eat()
    }
}
``` 
 
Now, this clearly clearly breaks with our rule: it has the function `moveInAnimal(animal: T)` that consumes the type and is therefore not strictly a producer, and cannot have the `out`-modifier on T. However it does not have any members that *return* the class, meaning it is strictly a **consumer**. Perhaps there is a similar rule for that?

Let's say for a moment I want to add this function:
```kotlin
fun moveInCat(enclosure: Enclosure<Cat>) {
    enclosure.moveInAnimal(Cat("Admiral von Schneider"))
}
```
 
And it works splendidly!

```kotlin
val animalHouse: Enclosure<Animal>()

moveInCat(animalHouse)
```
 
 ### Contra- what?
 
But what if I want to do this?

![Type mismatch. Required: Enclosure<Animal>. Found: Enclosure<Cat>](https://i.ibb.co/KFmkqYj/bilde.png)

Wait what? I can't add a Cat to a cat house? It's because we made the parameter `Enclosure<Animal>`, and since Enclosure isn't **covariant** on Animal, `Enclosure<Cat>` is not a subtype of `Enclosure<Animal>`. Nor can we make it covariant, since it has a *consuming member function*. What I really want is to have a function that accepts both `Enclosure<Cat>` and `Enclosure<Animal>`. What if I told you there was another way? Imagine if we could say that `Enclosure<Animal>` was a **subtype** of `Enclosure<Cat>`. Yes you read that right, the Enclosure with the supertype Animal is a subtype of an `Enclosure<Cat>`. This is called **contravariance**. The opposite of covariance! This way we could write the function:
 
 ```kotlin
fun moveInCat(enclosure: Enclosure<Cat>) {
    enclosure.moveInAnimal(Cat("Admiral von Schneider"))
}
```
 
And it would accept both `Enclosure<Animal>` and `Enclosure<Cat>` as parameters if Enclosure is **contravariant on its type**. Now before I give you the secret, let us look at what problems might arise from allowing contravariance. Imagine for a moment that the "new guy" added a function to get the inhabitant out of an Enclosure:
 
 ```kotlin
class Enclosure<T : Animal> {
    private var resident: T? = null

    fun moveInAnimal(animal: T) {
        this.resident = animal
    }
    
    fun getInhabitant(): T? {
        return resident
    }

    fun feed() {
        resident?.eat()
    }
}
```
 
So that he could play with the kitten before moving the new inhabitant in: 

```kotlin
fun moveInCat(enclosure: Enclosure<Cat>) {
    enclosure.getInhabitant()?.purr()
    enclosure.moveInAnimal(Cat("Admiral von Schneider"))
}
```

Now if Enclosure is **contravariant**, this means that one could call this function with an `Enclosure<Animal>`-parameter:

```kotlin
val animalHouse = Enclosure<Animal>()

moveInCat(animalHouse)
```
 
This looks fine. Until we do something like this:

```kotlin
val animalHouse = Enclosure<Animal>()
animalHouse.moveInAnimal(Dog("Hachiko"))
moveInCat(animalHouse)
```
 
What happens inside our `moveInCat()` function now? As long as Enclosure is contravariant, `getInhabitant()` might return a `Dog`. And dogs don't purr! You'd get a class cast exception. 

### In

This is a very similar problem to our covariance problem. So the Kotlin people made another rule: If you want **contravariance**  your class must be strictly a **consumer**. This means that there is no way for the class to return the underlying type, only take it in as a parameter. In our case, it would make the function `getInhabitant():T` create a compile error. So let's remove that function and add the - you guessed it - `in` modifier to T:
```kotlin
class Enclosure<in T : Animal> {
    private var resident: T? = null

    fun moveInAnimal(animal: T) {
        this.resident = animal
    }
    
    fun feed() {
        resident?.eat()
    }
}
``` 
 
 
Our Enclosure class is now strictly a consumer. And with the addition of the `in` modifier it is now also **contravariant** on T. This means we can now do:
 
```kotlin
fun moveInCat(enclosure: Enclosure<Cat>) {
    enclosure.moveInAnimal(Cat("Admiral von Schneider"))
}
```
 
and use the function like this:
 
```kotlin
val animalHouse = Enclosure<Animal>()
val catHouse = Enclosure<Cat>()

moveInCat(animalHouse)
moveInCat(catHouse)
```

### TL;DR:
A generic class is **covariant** on its type if classes containing **subtypes** of its type are also subclasses.

A generic class is **contravariant** on its type if classes containing **supertypes** of its type are also subclasses.

To make a class **covariant** you need to add the `out` modifier to its type, and ensure that no functions consume the type.

To make a class **contravariant** you need to add the `in` modifier to its type, and ensure that no function returns the type. 

 

