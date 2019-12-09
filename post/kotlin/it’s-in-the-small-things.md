---
calendar: kotlin
post_year: 2019
post_day: 10
title: It’s in the small things
links:
  - title: Data classes
    url: 'https://kotlinlang.org/docs/reference/data-classes.html'
---
Kotlin brings with it a lot of good things like Null Safety and full interoperability with Java, but data classes might be one the things you most often notice during day to day work.

Most larger applications, especially those consuming or producing REST apis need lots of DTOs (data transfer objects). These are used to represent plaint data objects which is only used to hold data. 

In java an example of such a class could be:

```
import java.util.Objects;public class ChristmasTree {
    private int height;
    private int radius;
    private int price;public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public ChristmasTree(int height, int radius, int price) {
        this.height = height;
        this.radius = radius;
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChristmasTree that = (ChristmasTree) o;
        return height == that.height &&
            radius == that.radius &&
            price == that.price;
    }

    @Override
    public int hashCode() {
        return Objects.hash(height, radius, price);
    }

    @Override
    public String toString() {
        return "ChristmasTree{" +
            "height=" + height +
            ", radius=" + radius +
            ", price=" + price +
            '}';
    }}
```

It is possible to use third party libraries or an IDE to help with reduce the amount of code, or generate most of the boilerplate code. Still I prefer to not have the extra lines of code, and if you are going to add or remove fields you still have to regenerate constructors, getters/setters and equals()/hashcode() methods.

## Kotlins Data classes

Using data classes in Kotlin the same DTO as above suddenly only becomes:

```
 data class ChristmasTree(val height: Number, val radius: Number, val price: Number )
```

The compiler automatically derives 

* getters and setters for mutable properties and 
  getters for immutable properties. 
* equals()
* hashCode() 
* toString() 
* componentN() 
* copy() 

Creating new christmas trees are done like this:

```
val christmasTree = ChristmasTree(200, 100, 500)
```

## Summary

Data classes gives us
