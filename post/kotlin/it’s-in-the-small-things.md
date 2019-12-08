---
calendar: kotlin
post_year: 2019
post_day: 10
title: It’s in the small things
---
Kotlin brings with it a lot of good things like Null Safety and full interoperability with Java, but data classes might be one the things you most often notice

Most larger applications, especially those consuming or producing REST apis need lots of DTOs (data transfer objects). These are used to represent plaint data objects which is only used to hold data. 

An example of such a class could be:

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
