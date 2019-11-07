---
calendar: react
post_year: 2019
post_day: 12
title: Control your components
image: >-
  https://images.unsplash.com/photo-1472235008642-bb3ce23994ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  A quick and easy guide to creating components that control their own state, if
  you want them to.
links:
  - title: State reducers vs control props
    body: An article comparing state reducers to control props
    url: 'https://kentcdodds.com/blog/control-props-vs-state-reducers'
  - title: How to give rendering control to users with Prop getters
    body: 'A different way to do the same thing, with classes!'
    url: >-
      https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters
authors:
  - Kristofer Giltvedt Selbekk
---
React is a pretty neat piece of technology. Its component-centric design lets us create reusable pieces of code - pieces that can be used over and over again in new contexts with new demands to its flexibility.
When you have something this flexible, though, you need to put a lot of thought into how you design its interface. If your component has internal state, should it ever be overridable? Should you be able to set defaults? Control it for a bit, and then let it control itself?

## An example: the humble expandable panel

I'm currently implementing a [design system](https://design.entur.org) for our client, and I was tasked with creating an expandable component. The initial implementation looked something like this:

```js
const ExpandablePanel = ({ children, defaultOpen, title }) => {
  const [isOpen, setOpen] = React.useState(defaultOpen);
  return (
    <div className="expandable-panel">
      <button
        aria-expanded={isOpen}
        className="trigger"
        onClick={() => setOpen(prev => !prev)}
        type="button"
      >
        {title}
      </button>
      {isOpen && <div className="content">{children}</div>}
    </div>
  );
};
```

Now this works fine for our initial usecase. It lets us toggle the visibility of our content in an accessible way. However, somebody soon comes along and asks us for the ability to control the visibility programmatically.

Let's take you through how you can implement this functionality once, and through the magic of hooks, never have to think of it ever again.

First, let's introduce two new props - `isOpen` and `onToggle`, and make it completely controlled from the outside:

```js
const ExpandablePanel = ({ children, isOpen, onToggle, title }) => {
  return (
    <div className="expandable-panel">
      <button
        aria-expanded={isOpen}
        className="trigger"
        onClick={onToggle}
        type="button"
      >
        {title}
      </button>
      {isOpen && <div className="content">{children}</div>}
    </div>
  );
};
```

This is flexible, but a pain for when you don't need the flexibility. Instead, let's control the state if the consumer doesn't provide it for us.

```js
const ExpandablePanel = ({
  children,
  defaultOpen,
  isOpen,
  onToggle,
  title,
}) => {
  const isControlled = isOpen !== undefined;
  const [internalIsOpen, setInternalOpen] = React.useState(
    isControlled ? isOpen : defaultOpen,
  );
  const currentIsOpen = isControlled ? isOpen : internalIsOpen;
  const currentUpdater = isControlled
    ? onToggle
    : () => setInternalOpen(p => !p);

  React.useEffect(() => {
    if (isControlled) {
      setInternalOpen(isOpen);
    }
  }, [isControlled, isOpen]);

  return (
    <div className="expandable-panel">
      <button
        aria-expanded={currentIsOpen}
        className="trigger"
        onClick={currentUpdater}
        type="button"
      >
        {title}
      </button>
      {currentIsOpen && <div className="content">{children}</div>}
    </div>
  );
};
```

Woah, that was a lot! We're keeping track of the state internally, updating it if it changes externally, and calling the correct updater function if available.

But even if this looks pretty ugly - especially when you sprinkle this into an already complex component - it works!

Luckily, React lets us refactor this kind of reusable logic into what's known as custom hooks. Let's create a new hook `useControllableProp` and pull out some of this complexity:

```js
const useControllableProp = ({ value, updater, defaultValue }) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(
    isControlled ? value : defaultValue,
  );
  const currentValue = isControlled ? value : internalValue;
  const currentUpdater = isControlled ? updater : e => setInternalValue(e);

  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [isControlled, value]);

  return [currentValue, currentUpdater];
};
```

We've renamed the code to be a bit more general, and made the internal updater function require an argument, but that's it. Our expandable panel code now looks like this:

```js
const ExpandablePanel = ({
  children,
  defaultOpen,
  isOpen,
  onToggle,
  title,
}) => {
  const [currentIsOpen, currentSetOpen] = useControllableProp({
    value: isOpen,
    updater: onToggle,
    defaultValue: defaultOpen,
  });

  return (
    <div className="expandable-panel">
      <button
        aria-expanded={currentIsOpen}
        className="trigger"
        onClick={() => currentSetOpen(!currentIsOpen)}
        type="button"
      >
        {title}
      </button>
      {currentIsOpen && <div className="content">{children}</div>}
    </div>
  );
};
```

The beauty of this hook is that it can be reused across your codebase whenever you need something to be controllable _sometimes_. Here's a text field with the
same logic applied:

```js
const ControllableTextField = ({ value, onChange, defaultValue }) => {
  const [currentValue, currentUpdater] = useControllableProp({
    value,
    updater: onChange,
    defaultValue,
  });
  return (
    <input
      value={currentValue}
      onChange={e => currentUpdater(e.target.value)}
    />
  );
};
```

It's a hook that has served our needs well, and that we hope will help you out as well.

## Other ways to achieve the same

There are, of course, other ways to solve this particular problem. One of the most powerful ones is called the `state reducer pattern`, popularised by the one and only Kent C. Dodds.
