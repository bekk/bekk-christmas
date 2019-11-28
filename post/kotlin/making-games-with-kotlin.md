---
calendar: kotlin
post_year: 2019
post_day: 12
title: WIP - Making games with Kotlin!
authors:
  - Vegard Veiset
---
Who doesn’t love flashy fun things! LibGDX is a library that makes it easy and fun to work with graphics in Java. But what about Kotlin, how does LibGDX work with Kotlin and how can we use it?

# ktx

KTX Is a wrapper library to make LibGDX idiomatic Kotlin. 

# Project setup

While libgdx supports multiple platforms we will only be focusing on making a small game for a desktop environment. To get started we need an empty gradle kotlin project. 

We add the dependencies we need for libgdx and ktx. Your gradle file should look something like this:

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

Here we add dependencies for libgdx. We need the core `gdx` package, the `lwjgl` for opengl bindings and `platform` for our desired platform, in our case desktop. We also want to use `ktx-app` and `ktx-graphic` for idiomatic kotlin syntax when using libgdx. 


# Let there be darkness

Let's make the simplest application we can make. A black screen!

```kotlin
package src.org.veiset.game

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
        clearScreen(0f, 0f, 0f, 0f)
    }
}
```

# Let there be light

A black screen isn't very interesting so let us add game objects, controls, some very simple logic and graphics.

First and most importantly we need gifts, and santa! 

```kotlin
data class Santa(val position: Float)
data class ChristmasGift(
    var height: Float = 720f,
    val position: Float = (40..1200).random().toFloat()
)
```

Gdx allows us to check for input state. 

```kotlin
 private fun handleInput() {
        if (Gdx.input.isKeyPressed(Input.Keys.A)) {
            player = Santa(player.position - 5f)
        } else if (Gdx.input.isKeyPressed(Input.Keys.D)) {
            player = Santa(player.position + 5f)
        }
    }
```

Every game needs some good core game play. This game however doesn’t have much of that.

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


Lastly let us draw our amazing game!

```kotlin
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
```


# Putting it all together

```kotlin
package src.org.veiset.game

import com.badlogic.gdx.Gdx
import com.badlogic.gdx.Input
import com.badlogic.gdx.backends.lwjgl.LwjglApplication
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration
import com.badlogic.gdx.graphics.Color
import com.badlogic.gdx.graphics.glutils.ShapeRenderer
import ktx.app.KtxApplicationAdapter
import ktx.app.clearScreen
import ktx.graphics.use

fun main() {
    val config = LwjglApplicationConfiguration().apply {
        width = 1280
        height = 720
    }
    LwjglApplication(MyGame(), config)
}

data class Santa(val position: Float)
data class ChristmasGift(
    var height: Float = 720f,
    val position: Float = (40..1200).random().toFloat()
)

class MyGame : KtxApplicationAdapter {
    private lateinit var renderer: ShapeRenderer

    private var player = Santa(40f)
    private var gifts = emptyList<ChristmasGift>()

    override fun create() {
        renderer = ShapeRenderer()
    }

    override fun render() {
        handleInput()
        logic()
        draw()
    }

    private fun handleInput() {
        if (Gdx.input.isKeyPressed(Input.Keys.A)) {
            player = Santa(player.position - 5f)
        } else if (Gdx.input.isKeyPressed(Input.Keys.D)) {
            player = Santa(player.position + 5f)
        }
    }

    private fun logic() {
        if (Math.random() > 0.95) {
            gifts = gifts + ChristmasGift()
        }
        gifts.forEach {
            it.height -= 1f
        }
    }

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

[Source code](https://gist.github.com/veiset/4f4e4dd59a95d6d12bc1a828b64955a1)

![gameplay image](/assets/gameplay_simple_game.gif)

This is a very simple example to get you familiarized with libgdx and ktx. You can build upon this to make cool games. I can highly recommend [Beat the High-Score](https://www.youtube.com/watch?v=kDxerDYelLs), a talk from last years KotlinConf by David Wursteisen.
