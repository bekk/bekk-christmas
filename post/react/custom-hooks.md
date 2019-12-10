---
calendar: react
post_year: 2019
post_day: 13
title: Home-baked Hooks
ingress: >-
  About a year ago, Sophie Alpert and Dan Abramov presented one of the most
  thrilling new features in React: Hooks.


  Since then, a lot has happened. From purely understanding the concept of
  Hooks, we have also begun to write our own. For a quick introduction on how to
  build your own Hooks, confer with [the official React
  docs](https://reactjs.org/docs/hooks-custom.html).


  TLDR; name a function *use*-something.


  In todays article, we have hand-picked some examples illustrating the beauty
  of Custom Hooks.
authors:
  - Nicolai August Hagen
  - Markus Rauhut
---
## Custom Hook basics

```javascript
import React, { useEffect } from 'react';

const useDocumentTitle = title => {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

As you can see, Custom Hooks is really just a fancy way of saying "a function containing other hooks, and/or some extra logic". The whole idea behind it is to hide the implementation of something that we often need - for example updating the document title. By blackboxing often used implementations, we can combine our custom hooks in awesome new ways, and thereby creating a more loosely coupled application. 

## Popular Custom Hooks
- **[react-use](https://github.com/streamich/react-use)** - not a single Hook, but a colletion of many different (contains Hooks for interacting with sensors, UI, state etc.) 

- **[useForm](https://www.npmjs.com/package/react-hook-form)** – Ever struggled with state in form validations? It can really help you manage the state of your forms.

- **[useMedia](https://www.npmjs.com/package/react-use-media)** - a way to yyy

- useRedux: Oh yes, of course you can (almost) completely get rid of Redux by just creating a custom hook returning its `[state, dispatch]`.


## Writing your own Custom Hook

Have you been looking for a particular Hook, but you just couldn't find it? Fortunately, building your own Custom Hooks is easy.

```javascript
function useGiftList() {
    const [giftList, setGiftList] = React.useState(0);

    React.useEffect(() => {
        const fetchGiftList = async () => {
            const updatedGiftList = await SantaApi.updateGiftList();  
            setGiftList(updatedGiftList);
        };
        
        fetchGiftList();
    }, [giftCount]);

    return giftList;
}
```

The Custom Hook can then be used in this way:

```javascript
const giftList = useGiftList();
```


## Sources
- https://reactjs.org/docs/hooks-custom.html
