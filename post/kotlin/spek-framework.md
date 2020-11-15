---
calendar: kotlin
post_year: 2020
post_day: 10
title: Spek Framework
ingress: Most of us use JUnit as our go-to testing framework, often without
  really considering the alternatives. Are you ready to try something new? Why
  not give Spek Framework a shot?
links:
  - title: Spek Framework Documentation
    url: https://www.spekframework.org/
authors:
  - Tia Firing
---
Spek Framework is a specification testing framework written in Kotlin. Being a *specification* oriented testing framework, Spek makes it easy to focus on functionality rather than implementation details when writing tests. Here is a simple example of what a test written in Spek may look like: 

```kotlin
object SantasListFeature: Spek({
    Feature("SantasList") {
	lateinit var santasList: SantasList

	beforeEachTest {
    	    santasList = SantasList()
	}

        Scenario("adding children to Santa's list") {
            When("adding Peter") {
                santasList.add(Child("Peter", NICE))
            }

            Then("it should have a size of 1") {
                santasList.size `should be` 1
            }

            Then("it should contain Peter") {
		santasList.contains(Child("Peter", NICE)) `should be` true
            }
        }
    }
})
```

Spek offers two testing styles: `Specification` and `Gherkin`. The previous example made use of the `Gherkin` testing style, and those of you who are familiar with Gherkin and Behavior Driven Development will recognize the Given, When, Then syntax. Here's an example using the `Specification` testing style as well: 

```kotlin
object ChristmasGreeterSpec: Spek({
    describe("A Christmas greeter") {
        val christmasGreeter by memoized { ChristmasGreeter() }

        describe("greet") {
            it("returns a greeting for a given name") {
		christmasGreeter.greet("Anna") `should equal` "Merry Christmas, Anna!"
            }
        }
    }
})
```

However, Spek is fairly flexible, and you are free to write your tests in other styles as well. 

An easy way of running blocks of code before and after test execution is essential in any testing framework. Spek provides the following options: 

* `before`/`beforeGroup`
* `beforeEach`/`beforeEachTest`
* `after`/`afterGroup`
* `afterEach`/`afterEachTest`

Spek does not provide assertions, so you can use any assertion framework you like. If you combine Spek with assertion frameworks like Kluent or JUnit 5 Assertions you can develop tests that are easy to read and understand, even for team members with no technical background or programming experience. 

Switching testing framework for an existing application can be a frustrating and time consuming task. Luckily, Spek is designed as a JUnit 5 test engine, so if your application is using JUnit 5 you can try out Spek for just a few tests without having to change test framework for the entire application. 

One thing to be aware of is that Spek is currently maintained by one person. So far it has been updated on a regular basis, but we have no guarantees as to what will happen in the future. 