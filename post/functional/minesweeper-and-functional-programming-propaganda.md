---
calendar: functional
post_year: 2019
post_day: 4
title: 'Minesweeper, and functional programming propaganda'
authors:
  - André Wolden
---
## TL;DR

I'm a sucker for math (not necessarily good at it, I just like it) 
and really dislike null pointer exceptions. 
If you can relate, 
then functional programming is probably something you will like too.
Now I've (almost) replicated 
<a href="http://wolden-minesweeper.herokuapp.com">minesweeper</a> 
in Elm, and I thought I'd write a little bit about it.

## Background

Before I started working at Bekk I hadn't heard about functional programming.
Mostly by coincidence I joined that group,
and started practicing Elm.
It was a struggle in the beginning.
Actually for quite some time.
After I had practiced for a while and maybe gotten past the noob level,
I decided that I wanted to try and write the classic Minesweeper game in Elm.
And I wanted to do so without getting any hints. 
Like following a tutorial of some sort.
The idea was that if I did it that way, 
then through struggle I would have as steep a learning
curve as I could get...hopefully.

I guess I believe that this is an efficient way to practice and learn 
new things, and thought I would try to persuade some of the readers to 
try something similar. Hopefully something that involves functional 
programming :)

## The result

Here's what it looks like at the moment:
![alt text1][img-screenshot-wolden-minesweeper]

There's still some stuff and features missing.
And it's not exactly clean code. Far from it I'm afraid.
But the point was to learn, fast, so I hope I'm excused ^^.
The entire design is manually written in SVG. That part I'm pretty happy about.

If you want you can 
<a href="http://wolden-minesweeper.herokuapp.com">play it </a> 
 and check out/ help with the 
<a href="https://github.com/woldena/minesweep">code</a>


## The biggest challenge

I thought that I would pick one part of the code and dig into it (instead of trying to cover too much). 
This is the part that I found to be most challenging.
If you have a black belt in recursion, then this will most likely be an easy task for you.
I was more of a white belt, maybe yellow. 
So it gave me one of those great nerd-rushes when I got it working in the end.

The task: 

When I click a square which contains nothing, then all its neighbours should automatically open.
And if any of those neighbours also contains nothing, then all their neighbours should automatically open. And so on.
I can't just open all empty squares. It has to be only a collection of neighbours.

My solution:

I started out with this sketch:

![alt text1][img-photo-recursion-example]

My model is a matrix, where I use coordinates i and j, and every square has an id.

stepping through the example:

1. open 3
2. opening all neighbours
3. seeing that 9 is also an empty square
4. opening all neighbours of square 9
5. seeing that 16 is an empty neighbour of 9
6. opening all neighbours of square 16

...and so on

putting this into something which can be done recursively

1. open 3
2. open all neighbours (2, 4, 8, 9, 10)
3. save 3 to a list named something like list_of_completed_squares=\[3]
4. save empty neighbours in a list named something like todo_list_of_empty_neighbours=\[9], except those that are already
in the list_of_completed_squares
5. 
    case todo_list_of_empty_neighbours is empty -> 
    
        return the result, I'm finished (which is not the case at the moment)
    
    case todo_list_of_empty_neighbours is not empty -> 
    
        do this whole process again, but changing 3 with another square from the todo_list_of_empty_neighbours 

Here's how I wrote that in Elm:

````elm
goAgain : AlgDat -> AlgDat
goAgain ag =
    let
        current_matrix =
            ag.current_matrix

        current_square =
            ag.current_square

        remaining =
            ag.remaining

        done =
            ag.done

        newEmptyNeighbours =
            getListOfEmptyNeighbours current_matrix current_square.i current_square.j

        matrix_updated =
            openAllNeighbours current_matrix current_square

        done_updated =
            current_square :: done

        remaining_updated =
            updateRemainingList remaining newEmptyNeighbours done

        current_square_updated =
            List.head remaining_updated
    in
    case current_square_updated of
        Nothing ->
            { remaining = remaining_updated --: List Square
            , current_matrix = matrix_updated --: Matrix
            , current_square = current_square --: Square
            , done = done_updated --: List Square
            , debug_remaining = newEmptyNeighbours
            }

        Just nextSquare ->
            goAgain
                { remaining = remaining_updated --: List Square
                , current_matrix = matrix_updated --: Matrix
                , current_square = nextSquare --: Square
                , done = done_updated --: List Square
                , debug_remaining = newEmptyNeighbours
                }
````

If the list remaining_updated has any members left, then current_square_updated will be an actual Square (not Nothing)
and "Just nextSquare" will be the case. Which leads to the stupidly named function goAgain calling itself :) 

I take self criticism for bad naming and all messy things you can find.
The name of the type 'AlgDat' for example is just a stupid name that I chose,
since I didn't want to try and come up with something better.
After I got it to work I should have cleaned it up. But.... I still havn't done that. 

If could probably be more efficient. But I guess it could turn out to be a lot more inefficient as well,
so I guess I'm happy with it at the moment.

At least it was a lot of fun, seriously :D


## Some thoughts that I have

React+redux+typescript is great. That's what I mostly use at work. 
There's a ton of great modules that can so easily be used.
It's so famous that it's hard to get the project to use anything else.

But then again, it is so hard not to create bugs! And many of them were/are my fault. I have to admit that.
Often they are very hard to find. And it compiles anyway.
Almost every time I track down bugs, usually something that caused something to be undefined or null,
I dream of a compiler that tells me where it is.

Elm does that.

No forgotten side effects. No `any` type. No accidental mutations. 
Just pure functions that make it so much easier to get it to do what I wan't it to do.

And I've just scratched the surface of functional programming. 
Applicatives, Functors, Monads. Don't know what they are yet. But I bet they are awesome.


[img-screenshot-wolden-minesweeper]: https://gitlab.com/wolden.andre/papers/raw/master/blogposts/functional-christmas/img/screenshot-wolden-minesweeper.png "Screenshot"
[img-photo-recursion-example]: https://gitlab.com/wolden.andre/papers/raw/master/blogposts/functional-christmas/img/photo-recursion-example.png "Screenshot"
