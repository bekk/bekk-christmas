---
calendar: react
post_year: 2019
post_day: 22
title: How I structure my React code
image: >-
  https://images.unsplash.com/photo-1505178041309-ad46d2e4207b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1650&q=80
ingress: >-
  If you're looking for the definite answer to how you should structure you
  React apps, this article probably isn't for you. If you're interested in
  seeing how it _can_ be done - read on!
authors:
  - Mathilde Wærstad
---
How to structure files and components in a project - or even components in themselves - is always the root of never-ending discussions. And like a lot of topics, there is a lot of strongly held opinions and different ways to solve it.

Your own opinion is probably influenced by your personal preferences on what's most readable, easy to parse, or just nice to look at. When you're a part of a team, you'll typically need to agree on these structural decisions, which isn't an easy feat in the best of teams. 

These kinds of discussions can be compared to two people arguing which of their favorite colors -  blue and red - that's the best one. They'll always voice their opinions, state their case, and then just keep on having the same opinion. They'll never agree on purple, to put it that way. 

So I'm not hoping for agreement on this. In this article I will show what preferences I have when it comes to structuring my React code, and why I have those preferences. Hopefully you'll learn a thing or two, or at least gain understanding for a different point of view. 

## Puzzles

First, a few words about how I am as a developer. When I code, I see what I'm building as a building blocks - like a puzzle. Every thing I make, every function I write or component I implement, is a part of a larger picture. 

I'm also very fond of visualizing what I work with. I tend to draw when I explain, and I love when what my users are using, the actual pieces of UI, is reflected in the code base as well. 

Another thing that's important to me is to get a top level overview quickly, and understanding what a component does as simply as possible. Both through spending time choosing the right names, but also through visualizing hierarchies through usage.

## Santa's gone digital

Let's look at a fictive project I've created for this article - I've called it Santa's digital wish list. Everybody can visit, create a user, add their wishes and see their profile page. 

Below, you'll see the file and component `EditMyInformationToSanta`, which **really** needs a refactor. It's the component that lets us add all the info that Santa needs in order to provide you with the correct gift for Christmas.

It's a lot - so let's just jump in.

```jsx
import React, { useState } from 'react';
import { saveMyInformationToSanta } from '../../api/santa-api';

const EditMyInformationToSanta = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState('');
  const [hasFireplace, setHasFireplace] = useState(null);
  const [naughtyOrNice, setNaughtyOrNice] = useState(null);
  const [letterToSanta, setLetterToSanta] = useState('');
  const [wish, setWish] = useState('');
  const [wishList, setWishList] = useState([]);

  const submitMyInformationToSanta = async event => {
    event.preventDefault();

    await saveMyInformationToSanta({
      name,
      age,
      gender,
      address,
      hasFireplace,
      naughtyOrNice,
      letterToSanta,
      wishList,
    });
  };

  return (
    <div>
      <h1>Hi, Santa! This is me</h1>
      <form>
        <h2>About me:</h2>

        <label>
          <span>My name is:</span>
          <input
            type="text"
            value={name}
            placeholder="Write your name"
            onChange={event => setName(event.target.value)}
          />
        </label>

        <label>
          <span>My age is:</span>
          <input
            type="text"
            value={age}
            placeholder="Tell Santa your age"
            onChange={event => setAge(event.target.value)}
          />
        </label>

        <fieldset>
          <legend>I am a...</legend>
          <label>
            <input
              type="radio"
              value="boy"
              checked={gender === 'boy'}
              onChange={event => setGender(event.target.value)}
            />
            Boy
          </label>
          <label>
            <input
              type="radio"
              value="girl"
              checked={gender === 'girl'}
              onChange={event => setGender(event.target.value)}
            />
            Girl
          </label>
        </fieldset>

        <label>
          <span>My address is:</span>
          <input
            type="text"
            value={address}
            placeholder="Where do you live?"
            onChange={event => setAddress(event.target.value)}
          />
        </label>

        <fieldset>
          <legend>I have a fireplace?</legend>
          <label>
            <input
              type="radio"
              value={true}
              checked={hasFireplace}
              onChange={event => setHasFireplace(event.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value={false}
              checked={hasFireplace === false}
              onChange={event => setHasFireplace(event.target.value)}
            />
            No
          </label>
        </fieldset>

        <fieldset>
          <legend>This year I have been naughty or nice?</legend>
          <label>
            <input
              type="radio"
              value="naughty"
              checked={naughtyOrNice === 'naughty'}
              onChange={event => setNaughtyOrNice(event.target.value)}
            />
            Naughty
          </label>

          <label>
            <input
              type="radio"
              value="nice"
              checked={naughtyOrNice === 'nice'}
              onChange={event => setNaughtyOrNice(event.target.value)}
            />
            Nice
          </label>
        </fieldset>

        <div>
          <h2>My wishes this year:</h2>
          <label>
            <span>I want:</span>
            <input
              type="text"
              value={wish}
              placeholder="Write a wish"
              onChange={event => setWish(event.target.value)}
            />
          </label>

          <button
            type="button"
            value="Add wish"
            onClick={() => {
              setWishList(wishList.concat(wish));
              setWish('');
            }}
          />

          <h3>My wish list:</h3>
          <ul>
            {wishList.map(wish => (
              <li>{wish}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Santa, I also want to tell you...</h2>
          <textarea
            placeholder="Do you want to say something to Santa?"
            onChange={event => setLetterToSanta(event.target.value)}
            value={letterToSanta}
          />
        </div>

        <button type="submit" onClick={submitMyInformationToSanta} />
      </form>
    </div>
  );
};

export default EditMyInformationToSanta;
```

The component itself isn't really very advanced, but since it's a pretty big form with a lot of information, the file size (or rather, the file _length_) becomes pretty huge. To improve this, I'd start splitting the code into components.

Some of the most obvious culprits are the repeating inputs and radio button layouts, so let's start with those. In the example code below, you'll see what I'm left with after the refactor:

```jsx
import React, { useState } from 'react';
import { saveMyInformationToSanta } from '../../api/santa-api';
import TextInputWithLabel from './TextInputWithLabel';
import RadioToggle from './RadioToggle';

const EditMyInformationToSanta = () => {
  const [name, setName] = useState('');

  const [age, setAge] = useState('');
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState('');
  const [hasFireplace, setHasFireplace] = useState(null);
  const [naughtyOrNice, setNaughtyOrNice] = useState(null);
  const [letterToSanta, setLetterToSanta] = useState('');
  const [wish, setWish] = useState('');
  const [wishList, setWishList] = useState([]);

  const submitMyInformationToSanta = async event => {
    event.preventDefault();

    await saveMyInformationToSanta({
      name,
      age,
      gender,
      address,
      hasFireplace,
      naughtyOrNice,
      letterToSanta,
      wishList,
    });
  };

  return (
    <div>
      <h1>Hi, Santa! This is me</h1>
      <form>
        <h2>About me</h2>

        <TextInputWithLabel
          label="My name is:"
          placeholder="Write your name"
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <TextInputWithLabel
          label="My age is:"
          placeholder="Tell Santa your age"
          value={age}
          onChange={event => setAge(event.target.value)}
        />

        <RadioToggle
          question="I am a..."
          label1="Boy"
          toggleValue1="boy"
          label2="Girl"
          toggleValue2="girl"
          value={gender}
          onChange={event => setGender(event.target.value)}
        />

        <TextInputWithLabel
          label="My address is:"
          placeholder="Where do you live?"
          value={address}
          onChange={event => setAddress(event.target.value)}
        />

        <RadioToggle
          question="I have a fireplace?"
          label1="Yes"
          toggleValue1={true}
          label2="No"
          toggleValue2={false}
          value={hasFireplace}
          onChange={event => setHasFireplace(event.target.value)}
        />

        <RadioToggle
          question="This year I have been naughty or nice?"
          label1="Naughty"
          toggleValue1="naughty"
          label2="Nice"
          toggleValue2="nice"
          value={naughtyOrNice}
          onChange={event => setNaughtyOrNice(event.target.value)}
        />
        
        <div>
          <h2>My wishes this year:</h2>
          <TextInputWithLabel
            label="I want:"
            placeholder="Write a wish"
            value={wish}
            onChange={event => setWish(event.target.value)}
          />

          <button
            type="button"
            value="Add wish"
            onClick={() => {
              setWishList(wishList.concat(wish));
              setWish('');
            }}
          />

          <h3>My wish list:</h3>
          <ul>
            {wishList.map(wish => (
              <li>{wish}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Santa, I also want to tell you...</h2>
          <textarea
            placeholder="Do you want to say something to Santa?"
            onChange={event => setLetterToSanta(event.target.value)}
            value={letterToSanta}
          />
        </div>

        <button type="submit" onClick={submitMyInformationToSanta} />
      </form>
    </div>
  );
};

export default EditMyInformationToSanta;
```

Note that, even though I'm not sure if the inputs and radio buttons will ever be used by other parts of my application, I'm still choosing to move them into their own separate files. These are placed as close to the original component as possible, so they're as close as possible to where they're used. 

## Keep your components separated!

Many developers prefer to keep local components like these in the same file as they're used, but I prefer a maximum of a single component in each file. To me it's much quicker to gain that top-level overview by visiting many files with a single component in each, instead of a single file with many components.

In this case, the difference probably wouldn't be huge, since the components I refactored out isn't very big, but the problem starts to surface once they start to grow. In a few weeks, you'll end up having to scroll up and down the file to find the "root" component, and it'll be a huge mess.

To skip internal discussions about when to do this refactor, or how big these extra components need to be before we pull them out into their own file, I just prefer to implement this simple rule.

## Extract by domain

Back to our example. Even though we've extracted repeated markup into reusable components, I'm still not completely done with my refactoring efforts. I want to take it to the next level, and refactor out code that are grouped by the task they're representing. In the following example, I've extracted components for each section of the form - `AboutMe`, `LetterToSanta` and `MyWishes`.

```jsx
import React, { useState } from 'react';
import { saveMyInformationToSanta } from '../../api/santa-api';
import AboutMe from './AboutMe';
import MyWishes from './MyWishes';
import LetterToSanta from './LetterToSanta';

const EditMyInformationToSanta = () => {
  const [me, setMeState] = useState({
    name: '',
    age: '',
    address: '',
    gender: null,
    hasFireplace: null,
    naughtyOrNice: null,
  });

  const [letterToSanta, setLetterToSanta] = useState('');
  const [wish, setWish] = useState('');
  const [wishList, setWishList] = useState([]);

  const submitMyInformationToSanta = async event => {
    event.preventDefault();

    await saveMyInformationToSanta({
      ...me,
      letterToSanta,
      wishList,
    });
  };

  return (
    <div>
      <h1>Hi, Santa! This is me</h1>
      <form>
        <AboutMe me={me} onMeChange={updatedMeState => setMeState(updatedMeState)} />
        <MyWishes wish={wish} wishList={wishList} onWishChange={setWish} onWishListChange={setWishList} /> 
        <LetterToSanta letterToSanta={letterToSanta} onLetterChange={setLetterToSanta} />

        <button type="submit" onClick={submitMyInformationToSanta} />
      </form>
    </div>
  );
};

export default EditMyInformationToSanta;
```

You can see the complete code for this project in [its Github repository](https://github.com/mathilwa/WishesToSanta).

Now we're left with a directory that contains the file `EditMyInformationToSanta.jsx` and a bunch of simple component files. Each file is small, easy to reason about in isolation. 

The section components are very local to this file, so they reside in the same folder. The reason I refactored this code out in the first place is so the main file is visually nicer to look at, and easier to understand. We'll can also place other relevant files here, like styling, images, texts, utilities or other resources. 

## Domain vs Components

When your app grows, like when we add live-tracking of Santa's movements using the SantaLocation API, or the new top 10 wished gifts feature, you'll eventually start running into places where presentational components can be reused.  To separate these from the rest, I like to split my code into two folders - `/components` and `/domain`. 

`/domain` contains the domain logic of my application. It's where `EditMyInformationToSanta` lives, and all of its buddies. 

`/components` is where I place components that are reusable and can be used across the project. `TextInputWithLabel` is a typical candidate for this kind of reuse, and will be moved from the `/domain/edit-my-information-to-santa` folder to its own folder in `/components/text-input-with-label` whenever that need arises. Like in the `/domain` folder, this one might also contain relevant files as texts or styling.

## Keeping it clean

We've spent the last couple of minutes stepping through the process of how I like to structure my React code. To summarize:

I like to extract presentational logic into their own components, both where it makes sense in terms of reuse, and where it makes sense in order to simplify the root component. 

I extract each component into its own file, and make sure to keep to that rule as my user interface grows in complexity. I do this because I think it's easier to see what's happening in each file when there's only a single component in there. The files are shorter, which gives me that top level overview, and good component (and file) names help with understanding the underlying responsibilities of each.

Splitting the components into one-off domain logic and reusable components makes our code base easier to navigate, and it _definitely_ makes it easier to delete dead code.

When working as a consultant, you end up spending a lot of time looking at other people's code. Making sure that process is as smooth as possible is paramount. Most of the time I alter or extend already written code, and having a simple, yet robust file structure that's easy to reason about is a great help in getting stuff done.

## Agreeing on the impossible

.

S

I want to end by repeating what I claimed in the beginning of the article. Agreeing on how to structure you code with a team of diverse people with diverse opinions and preferences isn't necessarily easy. But do we really _need_ to agree? **I'd say yes**. Not about what's the prettiest, but what kind of code style and structure you want in your project - even if some people don't agree completely.

Getting everybody to agree on what's the "cleanest" or "most readable" is not a realistic goal. What becomes the most important then is to have everybody voice their opinions, try to empathize with why they want one thing or the other, and then try to have a conversation about what choices you should make as a team. It will definitely be a lot of give and take for most (if not all) members of your team, but I stand by that it's better to agree on a single code style and structure, instead of having a mix and match of everybody's personal preferences.

Because when you have a neat, clean, understandable and standardized code style in your code base, it'll help with onboarding new developers, and keeping everybody as productive as possible.
