---
calendar: talks
post_year: 2020
post_day: 8
title: Code in presentations
ingress: At Bekk we do a lot of sharing, both internally and at conferences.
  Being a tech-company it is inevitable that we will have to show code in our
  presentations at some point, which often leads to the question; how do I make
  code look good in my presentations?
authors:
  - Håvard Hvassing
---
Manually formatting your code to make it look good is not really a viable option of you are thinking of adding more than a select few lines of code. Even then colour coding is going to be a pain.

Possibly the easiest way, is simply making a screenshot of the bit of code you need. This will, however, be somewhat cumbersome if you have to make edits to your code and might result in different font sizes and other oddities. 

## Enter Visual Studio Code

What seems to be the best way, is copying the code directly from Visual Studio Code and pasting it into your presentation. 
In Visual Studio Code, press `F1` to find your keyboard shortcuts, and search for `@command:editor.action.clipboardCopyWithSyntaxHighlightingAction`(or start typing “CopyWith” and it should appear). This will, as the name suggests, copy editor text with syntax highlighted to your clipboard.

Assign a keybinding to it, like `Cmd+Shift+C` and you are ready to copying code with proper formatting. Back in your presentation tool of choice, you can simply paste your code and hey’presto there it is in all its colour coded glory. Or close enough. In the image below you can see the difference between code pasted into PowerPoint and Keynote. 



![Code pasted from Visual Studio in a side-by-side comparison between PowerPoint and Keynote ](https://storage.googleapis.com/keen-electron-277310.appspot.com/public/talks-christmas-08/Code%20in%20presentations%20-%20Visual%20Studio.png)

The font-size is minuscule in the Keynote-presentation, but it maintains indents which is nice. PowerPoint has a better grasp on font-size, but lacks the indenting. 

## Not too keen on using Visual Studio?

Sublime 3 has the same type of support using one of the many highlighting packages. Open your package management (`Cmd+Shift+P`), select the option for installing packages, and search for “highlight”. 

There should be a number of options to chose from. The first candidate lets you copy colour coded syntax either as rich text or as HTML. Simply select the code and right click to access the two options. 



![Code pasted from Sublime3 in a side-by-side comparison between PowerPoint and Keynote ](https://storage.googleapis.com/keen-electron-277310.appspot.com/public/talks-christmas-08/Code%20in%20presentations%20-%20Sublime.png)

PowerPoint disregarded the new lines, but the code is coloured correctly. 

## For the invested ones

If you really want to control the output of your code or you intend to turn heaps of code into presentations, Pandoc might be the tool for you. 

Converting code to presentations is as easy as  `pandoc -o presentation.pptx code.md`. As with most command line tools, that’s just the tip of the iceberg. Pandoc is an immensely powerful tool for converting text and documents into a variety of different formats.