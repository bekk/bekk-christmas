---
calendar: kotlin
post_year: 2019
post_day: 12
title: WIP - Making games with Kotlin!
authors:
  - Vegard Veiset
---
Who doesn’t love flashy fun things! [LibGDX](https://libgdx.badlogicgames.com) is a library that makes it easy and fun to work with graphics in Java. ...more about LibGDX...

But what about Kotlin, how does LibGDX work with Kotlin and how can we use it?

# Introducing LibKTX

Using LibGDX with Kotlin can feel a little bit dated and clunky, it is a Java framework after all, not a framework tailored for Kotlin. To make LibGDX feel more idiomatic to Kotlin we are lucky enough to have a library to help us with that; [ktx](https://github.com/libktx/ktx) is a library aimed to make libGDX feel like a Kotlin framework. It's still LibGDX, just with syntax that feels more natural in Kotlin.

# Project setup

While LibGDX supports multiple platforms in this article we will focus on making a small game for a desktop environment. To get started we need an empty Gradle Kotlin project. Fire up your favorite editor and create a new empty Gradle Kotlin project. 

We are going to use LibGDX and LibKTX, so lets add to our dependency list. The `build.gradle` file should look something like this:

```gradle
plugins {
    id 'java'
    id 'org.jetbrains.kotlin.jvm' version '1.3.61'
}

group 'org.veiset'
version '1.0-SNAPSHOT'
sourceCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk8"
    compile "com.badlogicgames.gdx:gdx:1.9.10"
    compile "com.badlogicgames.gdx:gdx-backend-lwjgl:1.9.10"
    compile "com.badlogicgames.gdx:gdx-platform:1.9.10:natives-desktop"
    compile "io.github.libktx:ktx-app:1.9.10-b2"
    compile "io.github.libktx:ktx-graphics:1.9.10-b2"
}

compileKotlin {
    kotlinOptions {
        jvmTarget = "1.8"
    }
}
```

So from LibGDX we need the core `gdx` package, the `lwjgl` for opengl bindings and `platform` for our desired platform, desktop (native) in our case. We also want to include `ktx-app` and `ktx-graphic` for idiomatic Kotlin syntax supplied by the LibKTX library. 

# Let there be darkness

Lets make the simplest application we can make. A black screen!

```kotlin
// file: src/main/kotlin/org/veiset/game/MyGame.kt
package org.veiset.game

import com.badlogic.gdx.backends.lwjgl.LwjglApplication
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration
import ktx.app.KtxApplicationAdapter

fun main() {
    val config = LwjglApplicationConfiguration().apply {
        width = 1280
        height = 720
    }

    LwjglApplication(MyGame(), config)
}

class MyGame : KtxApplicationAdapter {
    override fun render() {
 }
}
```

There is not much to the example above. We use [LwjglApplicationConfiguration](https://libgdx.badlogicgames.com/ci/nightlies/docs/api/com/badlogic/gdx/backends/lwjgl/LwjglApplicationConfiguration.html) to configure our games resolution. It has a lot of options to play around with, like capping FPS and other performance tweaks, but for now we'll keep it simple. The second thing we do is create a [LwjglApplication](https://libgdx.badlogicgames.com/ci/nightlies/docs/api/com/badlogic/gdx/backends/lwjgl/LwjglApplication.html) and pass our game adapter and config to that.

Lastly we need an actual game adapter that will contain our game. To make one we simply extend the [KtxApplicationAdapter](https://github.com/libktx/ktx/blob/master/app/src/main/kotlin/ktx/app/application.kt) and override the methods we want to use. For our black screen application overriding `render` and doing nothing is enough. And that's it. Now simply run the `main` method and a black screen should appear. 

# Let there be light

A black screen isn't very interesting so let us add game objects, controls, some very simple logic and graphics. 

The application adapter comes with two important methods we can override: `create` and `render`. The `create` method is run before the application starts and this is were we do all our LibGDX related setup. The `render` method acts as the main game loop. We know we need to handle user input, have logic and to draw the game. So lets make functions for those and put them in to the `render` method. 

```kotlin
class MyGame : KtxApplicationAdapter {

    override fun create() { }

    override fun render() {
        handleInput()
        logic()
        draw()
    }

    private fun handleInput() { }
    private fun logic() { }
    private fun draw() { }
}
```

With our game application structure outlined lets start by adding some game objects, and what's more fitting than Santa and gifts.  

```kotlin
data class Santa(val position: Float)
data class ChristmasGift(
    var height: Float = 720f,
    val position: Float = (40..1200).random().toFloat()
)

class MyGame : KtxApplicationAdapter {   
    private var player = Santa(40f)
    private var gifts = emptyList<ChristmasGift>()

    override fun create() { }

    override fun render() {
        handleInput()
        logic()
        draw()
    }

    private fun handleInput() { }
    private fun logic() { }
    private fun draw() { }
}
```

We use Kotlin data classes to represent Santa and ChristmasGifts. For the gifts we give them a random horizontal position and put them at the top of the game screen.
The `create` method is run after LibGDX is loaded and ensures that we can safely access LibGDX-specific stuff inside it. We don't need that for our data objects so we simply place them as private variables and ignore `create` for now. 


The next part is to make our game interactive. Luckily input-handling with LibGDX is very easy. 

```kotlin
 private fun handleInput() {
        if (Gdx.input.isKeyPressed(Input.Keys.A)) {
            player = Santa(player.position - 5f)
        } else if (Gdx.input.isKeyPressed(Input.Keys.D)) {
            player = Santa(player.position + 5f)
        }
    }
```

... input info...



Every game needs some good core game play. This game however doesn’t have much of that, but lets add some randomness and "gravity"!

```kotlin
    private fun logic() {
        if (Math.random() > 0.95) {
            gifts = gifts + ChristmasGift()
        }
        gifts.forEach {
            it.height -= 1f
        }
    }
```

So whats the core of our game? We add a new gift every now and then and then move them downwards by one pixel every frame. I gotta admit that this is maybe not the most exciting game play, but hey, it does something.

With input, game play and data objects out of the way let us draw our amazing game! 

```kotlin
class MyGame : KtxApplicationAdapter {
    private lateinit var renderer: ShapeRenderer
    private var player = Santa(40f)
    private var gifts = emptyList<ChristmasGift>()
    
    override fun create() {
        renderer = ShapeRenderer()
    }

    override fun render() { ... }

    private fun handleInput() { ... }
    private fun logic() { ... }

    private fun draw() {
        clearScreen(0f, 0f, 0f, 0f)

        renderer.use(ShapeRenderer.ShapeType.Filled) {
            renderer.color = Color.GREEN
            gifts.forEach {
                renderer.rect(it.position, it.height, 60f, 60f)
            }
        }

        renderer.use(ShapeRenderer.ShapeType.Filled) {
            renderer.color = Color.RED
            renderer.rect(player.position, 80f, 80f, 80f)
        }
    }
}
```

To draw shapes in our game we use [ShapeRenderer](https://libgdx.badlogicgames.com/ci/nightlies/docs/api/com/badlogic/gdx/graphics/glutils/ShapeRenderer.html) from LibGDX combined with the `use` extension function LibKTX comes with...


# Putting it all together

[Full source code](https://gist.github.com/veiset/4f4e4dd59a95d6d12bc1a828b64955a1)

![gameplay image](/assets/gameplay_simple_game.gif)

The game might be simple, and we can almost argue that it's not a game at all, it has no real game play and no end goal, but it does highlights some of the features of LibGDX and LibKTX. You can build upon this to make cool games. 

I can highly recommend [Beat the High-Score](https://www.youtube.com/watch?v=kDxerDYelLs), a talk from last years KotlinConf by David Wursteisen.

You can make pretty cool stuff using Kotlin, LibGDX and LibKTX. As a side project over the last year I've been making a game and I can wholeheartedly recommend you to do the same. Check out the video below to see an example of what you can make using Kotlin! Peace out and happy holidays.

<iframe width="560" height="315" src="https://www.youtube.com/embed/9DIsHFzZfyg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



