---
calendar: react
post_year: 2020
post_day: 15
title: Making sounds with React and Tone.js
ingress: "**By utilizing Tone.js one could easily produce some sounds, and if
  you’re lucky it could be quite musical. In this article we’ll look at
  combining React with Tone.js to make a simple sequencer.**"
description: tonejs tone.js react sequenser polysynth
links:
  - title: Tone.js on GitHub
    url: https://github.com/Tonejs/Tone.js/
  - url: https://tonejs.github.io/demos
    title: Tone.js Demos
authors:
  - Nicolai Fredriksen
---
[Tone.js](https://tonejs.github.io/) is, by their own description, a “Web Audio framework for creating interactive music in the browser”. Its API is quite low level, with good flexibility with regards to asynchronous tasks and extensibility of sounds to produce. Today we’ll create what’s known as a music sequencer, which is a way to sequence a series of notes

\
For the rest of this article we will utilize the notes C, D, E, G and A. This creates what is known as the C Major Pentatonic Scale. Why these notes and this scale? In simple terms, it means all the notes sound good together, but the why is beyond the scope of this article. Thus increasing our chance of making something that sounds musical.



First we’ll import Tone.JS, create a synth and play one of the five chosen notes when they’re pressed.\
\
<https://codesandbox.io/s/tonejs-react-part-1-x6463?file=/src/App.js>

\`triggerAttackRelease\` takes two arguments: the note to be played, and its duration. The note is a combination of the note name (e.g C) and the number is which octave it is played in, meaning how high or low. The duration \`8n\` means an eighth-note, meaning, an eighth of the duration of the bar we’re currently in. 

Now, let’s make a grid, with our five special notes stacked on top of each other in ascending order, and as we’re playing eighth-notes, let’s make the grid 8 spaces wide. For each eight note, a column in our grid will be played, and sequencing through a column at a time, before starting over at the start. Thus, we need to save the state of each note in the grid if it is going to be played or not.

Then we’ll use \`Tone.Sequence\` to make our sequencer. As our potential hit machine now could play several tones simultaneously, we’ll first change our synth for a polysynth. Thus being able to play multiple (poly) tones at the same time. Our \`triggerAttackRelease\` function can now take an array of notes as its first parameter 

<https://codesandbox.io/s/tonejs-react-part-2-fw9vt?file=/src/App.js> 

That’s it for our musical sequencer. It’s not much, but it’ll get you going with Tone.js, which has great [documentation](https://tonejs.github.io/docs/14.7.58/index.html). You could also take a look at the [examples](https://tonejs.github.io/examples/) and [demos](https://tonejs.github.io/demos) on their website for more inspiration. Who knows, maybe your future is in making sick music in javascript? Bach better watch is back...