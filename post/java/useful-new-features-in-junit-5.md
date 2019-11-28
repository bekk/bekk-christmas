---
calendar: java
post_year: 2019
post_day: 9
title: Useful new features in JUnit 5
links:
  - title: JUnit 5 - Display names
    url: >-
      https://junit.org/junit5/docs/current/user-guide/#writing-tests-display-names
  - title: JUnit 5 - Nested tests
    url: 'https://junit.org/junit5/docs/current/user-guide/#writing-tests-nested'
  - title: JUnit 5 - Assertions
    url: 'https://junit.org/junit5/docs/current/user-guide/#writing-tests-assertions'
authors:
  - John Ringø
---
# Grouped assertions

Assertions in general haven’t changed too much from JUnit 4 to JUnit 5, but there are some changes. Most of the old assertion methods have been kept, and some new ones have been added. In addition to a few new methods, lambdas can now be used with assertions.

A really cool feature is the ability to group assertions together. Remember in JUnit 4 when you fixed a failing test because of a wrong assertion, only to find out that the next assertion also failed on the following test run? Yeah, no need to be annoyed by such simple things anymore. Enter, grouped assertions:

```java
@Test
void groupedAssertions() {
    assertAll("vehicle",
        () -> assertEquals("I-PACE", vehicle.getModel()),
        () -> assertEquals(5, vehicle.getSeats()),
        () -> assertEquals("electric", vehicle.getFuel())
    );
}
```

All assertions in the above test are executed, and you’ll be notified of failures from all failing assertions simultaneously.

# Nested tests

The ability to have nested tests opens up a whole new field of play when it comes to grouping tests that belong together. Combine this with different display name generators (introduced below) and you have a powerful tool to write tests that are simple to read and understand the intent of.

```java
@Nested
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class Tesla_Model_X {

    @Test
    void must_have_an_electric_motor() {
        vehicle = new Vehicle("Tesla", "Model X", 5, "electric");
        assertEquals("electric", vehicle.getMotor());
    }

    @Nested
    class can_have_seat_configurations {

        @ParameterizedTest(name = "{0} seats")
        @ValueSource(ints = {5, 6, 7})
        void with(int seats) {
            vehicle = new Vehicle("Tesla", "Model X", seats, "electric");
            assertTrue(vehicle.isValidSeatConfiguration());
        }
    }
}
```

The output of these tests look like the following in IntelliJ. Here we have combined nested tests with a parameterized test:

![Eksempel på hvordan tester vises i IntelliJ](https://i.ibb.co/T02SLVY/teslatest.png)

# Giving your tests display names

Giving your tests sensible names that are easy to read can be a bit of a hassle.  JUnit 5 comes with the `@DisplayName` annotation, to give you a simple way to give your tests pretty names. If that's not enough for you, JUnit 5 comes with a `DisplayNameGenerator` that replaces all underscores from your test method’s name, which is handy enough in a lot of cases. If you still think that your tests need prettier names, just write your own DisplayNameGenerator and voilá: Your test names no longer require deciphering.

Oh, and you can use emojis in your test display names! 🥳

You can check out the JUnit 5 User Guide for an example of a homemade DisplayNameGenerator: IndicativeSentences.

Happy testing!
