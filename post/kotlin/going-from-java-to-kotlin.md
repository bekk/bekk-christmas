---
calendar: kotlin
post_year: 2019
post_day: 20
title: Going from Java to Kotlin
ingress: >-
  We used to have a pure Java application. Then we decided to add some Kotlin
  code to it, just to try it out. Now there is no Java code left. How did that
  come about? Read on!
authors:
  - Øyvind Hagen
---
Kotlin is a language rapidly growing in popularity, not least among the established Java communiy. One of the key benefits is that the language has full interoperability with Java and the JVM which makes introducing Kotlin to an existing Java project pretty straightforward. Without going into [details](https://kotlin.christmas/2019/1 "Get started with Kotlin!") all you have to do is basically make some minor changes to the configuration of your project and you will be good to go. This is probably one common way the language makes it way into the lives of Java developers. 

## The Kotlin plugin to IntelliJ

Once the share of Kotlin code increases you might get to a point when the mix of the two languages starts to hurt a little bit. It can be a bit confusing to constantly switch between the two different syntaxes and you might even start to prefer doing your coding in the Kotlin portion of the source tree. This is the moment when you might decide to rewrite your existing Java code to Kotlin. This is also when the Kotlin plugin to IntelliJ comes in handy.

The plugin bundles a Java to Kotlin converter that works in two ways. You can either copy a piece of Java code and paste it into a Kotlin file and you will be prompted if you want the plugin to translate it. Alternatively, you can select one or even multiple Java files and from the code menu choose to transform them into Kotlin source files. Doing so you might end up with a piece of code that you are happy with, but often, some refinement is needed to get the code to the desired quality or even to get it to compile at all. The plugin might also suggest improvements in your code where you simply press `Alt+Shift+Enter` to accept them. It should be mentioned that the migration tool in the plugin is still in an experimental state, and that the behavior experienced at the time of writing might have changed by the more recent versions. Nevertheless, let's look into a few random examples taken from an application consuming some REST-services. The examples could just as well be seen as examples of Kotlin code snippets that tends to be more concise compared to their Java counterparts.

## DTOs

Working with REST, either consuming or producing services, you will often have DTOs (data transfer objects) used when serializing and deserializing data transferred as JSON. In Java you create the fields you need along with the necessary methods such as getters and setters. When converting those classes you will very likely run into the concept of [immutability](https://functional.christmas/2019/3 "Immutable by default") and nullability. Kotlin makes a very clear distinction between whether a data type is nullable or not, and the compiler will enforce how you may handle those types in your code. If the type is declared nullable then you basically have to implement checks to avoid the all too familiar `NullPointerException` (NPE). So when the plugin has converted your code you often end up with nullable String type properties (given you have not used the `@NotNull` annotation). This may in turn result in compilation errors elsewhere throughout your code where you access those properties. You might feel rather certain that these properties will never be null and be tempted to start inserting the `!!` operator (which converts the nullable type to a non-nullable one) and accepting the risk of a NPE. A better approach is probably to alter the class generated for you and make qualified decisions if a property in fact can be null or not. In our case that meant taking a closer look at the swagger-documentation of the services consumed and making only the mandatory fields not nullable. The others are handled properly for null values and the whole application now feels more robust. Furthermore, we made use of the data class in Kotlin, which dramatically reduces a lot of boilerplate code. 

So a simple Java class like this,

```java
public class Foo {
    private String description;
    private int code;

    public Foo(String description, int code) {
        this.description = description;
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public int getCode() {
        return code;
    }
}

```
would finally end up with this nice little Kotlin class with immutable properties and where we have assured that non of the fields will never be null. In addition, data classes will have constructors, toString(), equals() and a few more standard functions  created automatically for you.

```kotlin
data class Foo(val description: String, val code: Int)
```

## String concatenation
String concatenation in Java is usually done either using the `+` operator or using the method `concat()` on the String class. There are other options as well, but let's stick to the two most basic ways as they are the most commonly used. The java code might then look like this. 

```java
public String printFoo(Foo foo) {
    return foo.getCode() + " has description [" + foo.getDescription() + "].";
}
```
Or like this:
```java
public String printFoo(Foo foo) {
    return String.valueOf(foo.getCode())
        .concat(" has description [")
        .concat(foo.getDescription())
        .concat("].");
}
``` 

Note that `getCode()` returns a primitive int and thus has to be converted into a String in order to be used with the concat method. Using the plugin we end up with the following for both cases:

```kotlin
fun printFoo(foo: Foo): String? {
    return foo.code.toString() + " has description [" + foo.description + "]."
}
```

As we see, the plugin seems to prefer using the `+` operator. The Kotlin String class has a function `plus()` that is very similar to Java's `concat()` counterpart that would have looked like this for the second example:

```kotlin
fun printFoo(foo: Foo): String? {
    return foo.code.toString().plus(" has description [").plus(foo.description).plus("].")
}
```

However, there is a third option we tend to prefer, using a feature in Kotlin called String templates. This makes for very compact and highly readable statements like this:

```kotlin
fun printFoo(foo: Foo): String? {
    return "${foo.code} has description [${foo.description}]."
}
```
The concatenation itself looks fine now but while we are at it, we may improve this code further. Firstly, we can safely get rid of the question mark the plugin strangely added to the function making its return String value nullable. Furthermore, since this is a single-expression function we may also remove the curly braces and assign the return value directly to the function. Having done that we may then even remove the String return type completely, making advantage of type inference. The result is this:

```kotlin
fun printFoo(foo: Foo) = "${foo.code} has description [${foo.description}]."
```

It would probably have been reasonable to make this function a member of the Foo class itself, but for the sake of the example we left it like this.

## Extension methods

Kotlin has a concept of extension methods where it is possible to add new functionality to existing classes without making use of inheritance. This can make the code highly readable and thus, easier to maintain. In Java, we often find ourselves passing objects as parameters to methods that perform some sort of logic based upon then. There is nothing that prohibits us from doing basically the same thing i Kotlin, and the plugin will often do just that. While the code might feel familiar from the Java version of it, you should keep en eye out for good candidates for an extension method here and there. A slightly simplified example from our case where we had the following Java code that gets a response from our REST call and we want to return a deserialized representation of the JSON response. The `Response` class resides in the package `javax.ws.rs.core`.

```java
public class ConsumerUtils {
    public static <T> T readEntity(Class<T> responseClass, Response response) {
        try {
            return response.readEntity(responseClass);
        } catch (Exception e) {
            // Some error handling.
        }
    }
}
```

Converting the code to Kotlin we ended up with this:

```kotlin
object ConsumerUtils {
    fun <T> readEntity(responseClass: Class<T>, response: Response): T {
        try {
            return response.readEntity(responseClass)
        } catch (e: Exception) {
            // Some error handling.
        }
    }
}
```

This is very similar to the Java version and calling the function may look like this:


```kotlin
val foo = ConsumerUtils.readEntity(Foo::class.java, response)
```

We then refactored the converted class and instead made the function into an extension method on the `Response` class. To get rid of the rather ugly class parameter we also made it an `inline` function with a [reified](https://kotlin.christmas/2019/15 "When we need a concrete generic") type parameter. That meant we could get the class from the type parameter using `T::class.java`. 

```kotlin
inline fun <reified T> Response.readEntity(): T {
    return try {
        readEntity(T::class.java)
    } catch (e: Exception) {
        // Some error handling.
    }
}
```

Now we could call our function like this instead:

```kotlin
val foo = response.readEntity<Foo>()
```

Or alternatively this way:


```kotlin
val foo: Foo = response.readEntity()
```

## Open classes and functions

Using annotations in your code, for instance when working with Spring applications, the compiler will often require that the annotated classes and functions are overridable. In Java that is the default and the compiler will have nothing to complain about as long as you have not explicitly declared your classes and methods as `final`. In Kotlin it is the other way around, where you explicitly have to make them overridable using the `open` keyword. This is something the plugin usually wouldn't do for you, thus giving you compiler errors you have to deal with. There are a couple of options to solve this. You could either configure your project using the openall-plugin (which will handle everything transparently in the background) or by adding the `open` keyword yourself. We went for the latter as we found it more readable and not introducing another dependency doing its magic, but it is really a question of taste. A class annotated with the Spring `@Configure` annotation would then look something like this:

```kotlin
@Configuration
open class RestServiceConfiguration {

    @Bean
    @Throws(URISyntaxException::class)
    open fun restServiceConsumer(
            @Named("restServiceClient") client: Client,
            @Value("\${REST_SERVICE_URL}") restServiceUri: String): RestServiceConsumer {
        return RestServiceConsumer(client, URI(restServiceUri))
    }

    ...
    ...
}
```

## Final words
OK, these were just a few simple examples, but hopefully something that gives you an idea of how to approach Kotlin from the Java world. It can be done gradually in small steps with the help of a handy plugin to speed things up. Thankfully, it is still plenty of room for creative thinking and to discover and make use of all the features and capabilities in Kotlin. It should be fun!
