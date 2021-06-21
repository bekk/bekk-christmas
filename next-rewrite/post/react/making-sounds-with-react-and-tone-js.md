---
calendar: react
post_year: 2020
post_day: 15
title: Making sounds with React and Tone.js
image: https://images.unsplash.com/photo-1509310202330-aec5af561c6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2584&q=80
ingress: "**By utilizing Tone.js one could easily produce some sounds, and if
  you’re lucky it could be quite musical. In this article we’ll look at
  combining React with Tone.js to make a simple sequencer.**"
description: tonejs tone.js react sequencer polysynth
links:
  - title: Tone.js on GitHub
    url: https://github.com/Tonejs/Tone.js/
  - url: https://tonejs.github.io/demos
    title: Tone.js Demos
authors:
  - Nicolai Fredriksen
---
[Tone.js](https://tonejs.github.io/) is, by their own description, a “Web Audio framework for creating interactive music in the browser”. Its API is quite low level, with good flexibility with regards to asynchronous tasks and extensibility of sounds to produce. Today we’ll create what’s known as a music sequencer, which is a way to sequence a series of notes.

\
First, some music theory. For the rest of this article we will utilize the notes C, D, E, G and A. This creates what is known as the C Major Pentatonic Scale. Why these notes and this scale? In simple terms, it means all the notes sound good together. Thus increasing our chance of making something that sounds musical. I wont go into why these notes sounds the way they do, as it is way beyond the scope of this article. You'll just have to trust me on this one.

Now, let's bootstrap a project using [create-react-app](https://create-react-app.dev/), and then add Tone.js with `npm install tone` \
Then we’ll import Tone.JS, create a synthesizer, or synth for short, which will generate our notes. Then attach our synth to five buttons, and play one of the five chosen notes when they’re pressed. 

<iframe src="https://codesandbox.io/embed/tonejs-react-part-1-x6463?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="ToneJS + React part 1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

`triggerAttackRelease` takes two arguments: the note to be played, and its duration. The note is a combination of the note name (e.g C) and the number is which octave it is played in, meaning how high or low. The duration `8n` means an eighth-note, meaning, an eighth of the duration of the bar we’re currently in. (Side note: a bar is usually four beats of four quarter-notes, and by extension, the same bar can also hold eight eighth-notes)

Now, let’s make a grid, with our five special notes stacked on top of each other in ascending order, and as we’re playing eighth-notes, let’s make the grid 8 spaces wide. For each eight note, a column in our grid will be played, and sequencing through a column at a time, before starting over at the start. Thus, we need to save the state of each note in the grid if it is going to be played or not.

Then we’ll use `Tone.Sequence` to make our sequencer. As our potential hit machine now could play several tones simultaneously, we’ll first change our synth for a polysynth. Thus being able to play multiple (poly) tones at the same time. Our `triggerAttackRelease` function can now take an array of notes as its first parameter 

<iframe src="https://codesandbox.io/embed/tonejs-react-part-2-fw9vt?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="ToneJS + React part 2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

That’s it for our musical sequencer. It’s not much, but it’ll get you going with Tone.js, which has great [documentation](https://tonejs.github.io/docs/14.7.58/index.html). You could also take a look at the [examples](https://tonejs.github.io/examples/) and [demos](https://tonejs.github.io/demos) on their website for more inspiration. Who knows, maybe your future is in making sick tunes with Tone.js? Somebody get Grammy on the phone!