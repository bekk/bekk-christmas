---
calendar: talks
post_year: 2020
post_day: 8
title: Showing code in presentations
ingress: Showing the audience a snippet of code can be an easy way of getting a
  complex concept across. Bekk being a tech-company it is inevitable that we
  will have to show code in our presentations at some point, which often leads
  to the question; how do I make my code look good?
links:
  - url: https://buttondown.email/hillelwayne/archive/syntax-highlighting-is-a-waste-of-an-information/
    title: Syntax highlighting is a waste of an information channel
authors:
  - Håvard Hvassing
---
Formatting your code by hand to make it look good is not a viable option if you are thinking of adding more than a few lines of code. And even with just a few lines, colour coding is going to be a pain.

The easiest way is to take a screenshot of the bit of code you need. This convenience comes with certain trade-offs, such as different font sizes between images, scaling and other oddities. 

## Enter Visual Studio Code

What seems to be the best way, is copying the highlighted code directly from [Visual Studio Code](https://code.visualstudio.com) and pasting it into your presentation. 

This does not work right out of the box, so you will have to enable this functionality first. In Visual Studio Code, press `F1` to find your keyboard shortcuts, and search for `@command:editor.action.clipboardCopyWithSyntaxHighlightingAction` (or start typing “CopyWith” and it should appear). This will, as the name suggests, allow the editor to add text with highlighted syntax to your clipboard.

![Enable Copy with syntax highlighting in Visual Sudio Code](https://storage.googleapis.com/keen-electron-277310.appspot.com/public/talks-christmas-08/VisualStudioCopyWithFormatting.png)

Assign a keybinding to it, like `Cmd+Shift+C` and you are ready to copying code with proper formatting. Back in your presentation tool of choice, you can now paste your code and hey’presto there it is in all its colour coded glory. Or close enough. In the image below you can see the difference between code pasted into PowerPoint and Keynote. 

![Code pasted from Visual Studio in a side-by-side comparison between PowerPoint and Keynote ](https://storage.googleapis.com/keen-electron-277310.appspot.com/public/talks-christmas-08/Code%20in%20presentations%20-%20Visual%20Studio.png)

The font-size is minuscule in the Keynote-presentation, but it maintains indents which is nice. PowerPoint has a better grasp on font-size, but lacks the indenting. Both issues are easy enough to fix.

## Not too keen on using Visual Studio?

Sublime 3 has the same type of support using one of the many highlighting packages. Open your package management (`Cmd+Shift+P`), select the option for installing packages, and search for “highlight”. 

There should be a number of options to chose from. The first candidate lets you copy colour coded syntax either as rich text or as HTML. Simply select the code and right click to access the two options. 

![Code pasted from Sublime3 in a side-by-side comparison between PowerPoint and Keynote ](https://storage.googleapis.com/keen-electron-277310.appspot.com/public/talks-christmas-08/Code%20in%20presentations%20-%20Sublime.png)

PowerPoint disregarded the new lines, but the code is coloured correctly. 

## Taking it up a notch

If you really want to control the output of your code or you intend to turn use markdown to write your presentations, [Pandoc](https://pandoc.org) is the tool for you. 

Converting code to presentations is as easy as  `pandoc -o presentation.pptx code.md`. This will convert a Markdown formatted document (`code.md`) into a PowerPoint document (`presentation.pptx`). 

As with most command line tools, that’s just the tip of the iceberg. Pandoc is an immensely powerful tool for converting text and documents into a variety of different formats. Pandoc allows you to write your entire presentation as Markdown, with code included. 
![Markdown document with a heading and code block](https://storage.googleapis.com/keen-electron-277310.appspot.com/public/talks-christmas-08/VisualStudioCodeMarkdownDocument.png)

This document can then be parsed using the following command: `pandoc -o presentation.pptx code.md`

Which should result in somehing like this:
![PowerPoint created by converting Markdown with Pandoc](https://storage.googleapis.com/keen-electron-277310.appspot.com/public/talks-christmas-08/PandocConvertedMarkdown.png)

It's not perfect right out of the box, but with minimal effort your slides and code will look the part.