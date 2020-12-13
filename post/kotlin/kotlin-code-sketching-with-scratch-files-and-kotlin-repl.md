---
calendar: kotlin
post_year: 2020
post_day: 19
title: Kotlin code sketching with Scratch files and Kotlin REPL
image: https://images.unsplash.com/photo-1557243962-0a093922933f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3300&q=80
ingress: >-
  Imagine you're sitting on the train on your way to work, and you suddenly get
  an epiphany on how

  to solve that mind numbing coding problem that's been bothering you over the last few days. You whip out

  your laptop, create a new Kotlin file, implement the standard

  `main` function, and hit "Build" to verify that everything is OK. By the time IntelliJ responds with

  a "green light", your stop has been announced on the speaker system and you have to drop what you were doing.

  At the office, the solution you once had so clear in your mind now is lost to the void. If only you had a

  tool to quickly verify that code snippet, with less overhead!
---
This example is arguably a little overdramatized (\*), and you would probably be better off just scribbling
down some pseudo-code in a arbitrary text file, instead of going through the process of setting up a new project.
Although, there might be certain times where we want to have some code executed and output printed
as fast as possible, to quickly be able to verify or refute some assumption. A quick feedback-loop like this is also very convenient in a learning phase, be it a new concept or a new language.  Luckily JetBrains has got our backs
and provided us with just the tools we need: _IntelliJ Scratch Files_ and _Worksheets_, and _Kotlin REPL_.

\* _Besides, theres not really much commuting these days with mostly everyone working remote_

## Scratches and Kotlin Worksheets

If you want the whole suite of IntelliJ built in auxiliary coding tools, you pretty much have two types of alternatives for your code sketching needs. Firstly there's **Scratches**, which aren't tied to any particular project, and are stored in a separate area (\*). **Kotlin Worksheets** are similar, but will be tied to a specific project upon creation.
Personally I tend to use mostly scratches, but it can be convenient to have them included in the project itself, in which case worksheets would be the go-to alternative. Additionally, scratches support a wide variety of different languages and extensions, in addition to Kotlin. We'll be focusing on Scratch files for this article.

Scratches can be created either via the menu **File > New > Scratch File**, or by using the built in shortcut if you find that more convenient: **⌘ + Shift + N** or **Ctrl + Alt + Shift + Insert** for Mac and Windows respectively, if using the default keymap. Finally choose the **Kotlin** format for your scratch file, and you're good to go; a file with a `.kts` extension will be opened in a separate tab.

\* _Your cratches can be found under **Scratches and Consoles** in the IntelliJ project tree_

## Features of scratches, and how to run them

### Auxiliary tools

We're ready to put that ingenious Kotlin idea of ours to the test! With the scratch file open in IntelliJ, let's take a look at what kind of features we get:

![A Kotlin scratch file opened in IntelliJ](https://i.ibb.co/Qmsbvr0/Intelli-J-IDEA-CE-2020-2-1-Scratch-File.png)

We can see clearly that our Kotlin code has been syntax highlighted in addition to code completion being active, like we're used to when working with regular Kotlin files. In general we can write Kotlin code like we normally would otherwise. One thing to note here is that a Kotlin scratch file does not require us to create an entry point, i.e. a Kotlin application `main` method, so we're able to start typing and executing Kotlin code right away. The output will be conveniently displayed in a window to the right of our source code upon hitting **Run Scratch File**.

### Including project modules

By default we have access to the native Kotlin language constructs as well as the the Kotlin Standard Library in the scratch file context, which is why we're able to invoke the `iterator` and `forEachRemaining` functions in the example above. Should you want to use functionality from other modules defined in a project of yours, you can do so by choosing the **Use classpath of module** option and select said module from the dropdown. You may now import and reference functionality defined in the module from within your scratch file (\*):

![Referencing functionality from a project module from within a scratch file](https://i.ibb.co/1b3kJbF/Intelli-J-IDEA-CE-2020-2-1-Scratch-File-2.png)

_\* If you get an `Unresolved reference` error in the Scratch Output, make sure the functionality from your module is defined inside a [package](https://kotlinlang.org/docs/reference/packages.html#packages)._

### Customizing scratch file execution

We have two additional options that can be toggled to alter how our scratch will be evaluated: **Interactive mode** and **Use REPL**, where the former simply enables our scratches to be run automatically. **Use REPL** means that we will switch to a [Read-Eval-Print-Loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) execution style, where each expression will we evaluated and its output printed individually. As a result if we append new expressions to an existing scratch file, IntelliJ doesn't have to execute the whole file, but rather only the last expression we added. Personally I like to toggle both options, which lets me sketch out code and see the resulting output instantly.

## Alternatives with even less overhead

To create a Scratch file you have to at least get IntelliJ up and running with an existing project, so that we can access the scratches folder. If you're comfortable not having the auxiliary tools that IntelliJ provides, like syntax highlighting for instance, a more lightweight approach can be used. It's possible to use the Kotlin REPL to execute Kotlin code snippets directly on a command line and avoid IntelliJ and a corresponding project setup alltogether. Invoking `kotlinc` on a command line will give access to an interactive shell in the Kotlin compiler, where we may execute individual Kotlin code snippets and read output from the console. The standalone Kotlin compiler can be found here: https://github.com/JetBrains/kotlin/releases/tag/v1.4.21.
