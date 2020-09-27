# Code Next - Hooks

[Fork on StackBlitz ⚡️](https://stackblitz.com/fork/code-next-hooks)

This is a lesson for the [Code Next](https://codenext.withgoogle.com/) React club.

In this lesson, engineers will

- Learn what hooks are.
- Discover commonly used hooks.
- Know how to make custom hooks.

## What are React hooks?

Hooks are functions that let you "hook into" React state and lifecycle features. They are containers for stateful operations.

Let's revisit our classic counter component. It's a component that shows a count, initialized at 0. It has an "increment" button which increases the count by 1 when it is clicked.

Before hooks, the Counter component would look like this:

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({ 
      ...this.state,
      count: this.state.count + 1,
    });
  }

  // special React lifecycle method
  componentDidUpdate(prevProps, prevState) {
    document.title = `count: ${this.state.count}`;
  }

  // special React lifecycle method
  componentWillUnmount() {
    document.title = 'no counter';
  }

  render() {
    return (
      <div>
        <div>count: {count}</div>
        <div>
          <button onClick={this.increment}>increment</button>
        </div>
      </div>
    );
  }
}
```

With hooks, the counter component looks like this:

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  useEffect(() => {
   document.title = `count: ${count}`;
   return () => { document.title = 'no counter' };
  }, [count]);

  return (
    <div>
      <div>count: {count}</div>
      <div>
        <button onClick={increment}>increment</button>
      </div>
    </div>
  )
}
```

Not only is the second version much more compact, it is easier to follow and is less error prone.

We won't explore class components too much in this club, but you may see them "in the wild". You can learn more about class components in the [React docs](https://reactjs.org/docs/components-and-props.html#function-and-class-components).

## YOUR TURN: Mouse tracker

Let's practice using React hooks by making a component that tracks the _page_ position (x, y), but only when the mouse is moved within a `<div>` element.

First, make a MouseTracker component.

_src/MouseTracker.js_

```jsx
import React from 'react';

const MOUSE_TRACKER_STYLE = {
  border: '2px solid red', 
  width: '500px', 
  height: '500px'
}

export const MouseTracker = () => {
  return (
    <div style={MOUSE_TRACKER_STYLE}></div>
  );
}
```

>Note: You could also import a CSS stylesheet instead of writing inline styles. What are the advantages/disadvantages of each approach?

Import it into your App component and render it.

_src/App.js_

```jsx
import React from 'react';
import { MouseTracker } from './MouseTracker';

const App = () => <MouseTracker />;
```

Let's create state for our coordinates and render it.

_src/MouseTracker.js_

```jsx
import React, { useState } from 'react';

const MOUSE_TRACKER_STYLE = {
  border: '2px solid red', 
  width: '500px', 
  height: '500px'
}

export const MouseTracker = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <>
      <div>(x, y): ({x}, {y})</div>
      <br />
      <div style={MOUSE_TRACKER_STYLE} />
    </>
  );
}
```

>Note: <> and </> are shorthand for `<React.Fragment> and </React.Fragment>`. React requires your components to return JSX with a single node. You can use React fragments to uphold this invariant. You can learn more in the [React docs](https://reactjs.org/docs/fragments.html).

Now, let's add some life to our component. Let's create an event handler that will be triggered when the mouse is moved inside the `<div>` element.

```jsx
import React, { useState } from 'react';

const MOUSE_TRACKER_STYLE = {
  border: '2px solid red', 
  width: '500px', 
  height: '500px'
}

export const MouseTracker = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const updateCoords = (e) => {
    setX(e.pageX);
    setY(e.pageY);
  };

  return (
    <>
      <div>(x, y): ({x}, {y})</div>
      <br />
      <div style={MOUSE_TRACKER_STYLE} onMouseMove={updateCoords} />
    </>
  );
}
```

>Note: We leveraged the event that React gave us to get the cursor position relative to the _page_. A full list of React events is in the [React docs](https://reactjs.org/docs/events.html).

### Reflection

- What does `e` represent and how do we know what's in it?
- What would happen if we didn't use `React.useState`?

_WRONG_

```jsx
import React, { useState } from 'react';

const MOUSE_TRACKER_STYLE = {
  border: '2px solid red', 
  width: '500px', 
  height: '500px'
}

export const MouseTracker = () => {
  let x = 0;
  let y = 0;

  const updateCoords = (e) => {
    x = e.pageX;
    y = e.pageY;
  };

  return (
    <>
      <div>(x, y): ({x}, {y})</div>
      <br />
      <div style={MOUSE_TRACKER_STYLE} onMouseMove={updateCoords} />
    </>
  );
}
```

### YOUR TURN: Renderer counter

Have you wondered how many times a component is rerendering? Let's use `useEffect` in our MouseTracker component to answer this.

Try this without looking at the solution: First, import `useEffect` from React, in a similar way that we import `useState`. Next, create state that will track the render count. Use `useEffect` in the component and set its dependencies to be `[x, y]`. In the `useEffect` callback, increment `renderCount` by 1.

```jsx
import React, { useState, useEffect } from 'react';

const MOUSE_TRACKER_STYLE = {
  border: '2px solid red', 
  width: '500px', 
  height: '500px'
}

export const MouseTracker = () => {
  const [renderCount, setRenderCount] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const updateCoords = (e) => {
    setX(e.pageX);
    setY(e.pageY);
  }

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [x, y]);

  return (
    <>
      <div>render count: {renderCount}</div>
      <br />
      <div>(x, y): ({x}, {y})</div>
      <br />
      <div style={MOUSE_TRACKER_STYLE} onMouseMove={updateCoords} />
    </>
  );
}
```

### Reflection

- Why did we have to use `useEffect`?
- What are `useEffect`'s dependency array and why do we need it?

## LECTURE: Custom hooks

In programming, there is something called the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't Repeat Yourself). The idea is to abstract repetitious code into a single abstraction, so that it's easier to maintain and understand.

For example, let's say I had this code:

```js
console.log(`IMPORTANT: something went wrong`.toUpperCase());
console.log(`IMPORTANT: trying again`.toUpperCase());
console.log(`IMPORTANT: debug info: ${someGlobalVariable}`.toUpperCase());
```

I'm prepending `'IMPORTANT: '` to each function call. Since I'm seeing this pattern a few times, I can adhere to the DRY principle like this:

```js
const important = (str) => `IMPORTANT: ${str}`.toUpperCase();
console.log(important('something went wrong'));
console.log(important('trying again'));
console.log(important(`debug info ${someGlobalVariable}`));
```

Using the `important` function guarantees that I don't misspell `IMPORTANT: ` or forget to call `String.toUpperCase`.

The same idea applies to React hooks and components.  When we see repeated code, we can create a single abstraction for it, instead.

>Note: It is very important that you see something repeat 2 or 3 times before you create an abstraction for it. When you abstract an operation too early, you end up having to make assumptions about all future use cases, creating a [leaky abstraction](https://stackoverflow.com/questions/3883006/meaning-of-leaky-abstraction). When you wait for a code pattern to repeat, you have a better chance of understanding the usecases of the abstraction. This is one of the biggests challenges in Software engineering. It's an art that takes some time to getting used to.

### EXAMPLE: Friend Status

The following example was adapted from the [React docs](https://reactjs.org/docs/hooks-custom.html).

Let's say we have a chat application. We want to show our user which friends are online. We have a FriendListItem component, which is rendered for every friend.

```jsx
import React, { useState, useEffect } from 'react';

const FriendListItem = (props) => {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    const handleStatusChange = (status) => {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

This works, but we're told that we need to surface the online status to 2 more different components. The implementation looks almost identical. This warrants to a custom hook:

```jsx
import { useState, useEffect } from 'react';

const useFriendStatus = (friendID) => {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    const handleStatusChange = (status) => {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  }, [friendID]);

  return isOnline;
}
```

Now, we can simplify our FriendListItem component as well as use our new custom hook in the 2 different components its needed in.

```jsx
import React, { useState, useEffect } from 'react';

const FriendListItem = (props) => {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

>Note: Even though we won't cover testing in this club, it is worth noting that creating a custom hook allows the hook behavior to be tested easier. We don't need to know anything about what components it's used in. In our automated test, we would just create a simple dummy component, and test against that.

A contrived example:

```jsx
const Dummy = (props) => {
  const isOnline = useFriendStatus(props.friendID);
  if (isOnline) {
    return <div data-testid="is-online"></div>;
  else {
    return <div data-testid="is-offline"></div>;
  }
};

test('useFriendStatus inits as offline', () => {
  const { queryByTestId } = render(<Dummy friend={{ id: 'fj832jf' }} />);
  expect(queryByTestId('is-offline')).toBeInTheDocument();
  expect(queryByTestId('is-online')).not.toBeInTheDocument();
});
```

### YOUR TURN: Custom Counter Hook

We really like counting things in this club. We've implemented many Counter components and we really should just create a hook for it.

Try to do this without looking. Create a new hook called `useCounter`. It should return an array of `[count, increment, decrement]`.

BONUS: Allow the caller to specify how much to increment or decrement by.

Solution with bonus:

```jsx
const useCounter = (delta = 1) => {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + delta);
  const decrement = () => setCount(count - delta);

  return [count, increment, decrement];
};

const FivesCounter = () => {
  const [count, incrementBy5, decrementBy5] = useCounter(5);
  return (
    <>
      <div>count: {count}</div>
      <div>
        <button onClick={incrementBy5}>+5</button>
        <button onClick={decrementBy5}>-5</button>
      </div>
    </>
  );
};

// or even more generic

const DeltaCounter = (props) => {
  const [count, increment, decrement] = useCounter(props.delta);
  return (
    <>
      <div>count: {count}</div>
      <div>
        <button onClick={increment}>+{delta}</button>
        <button onClick={decrement}>-{delta}</button>
      </div>
    </>
  );
};

// requires the delta prop: <DeltaCounter delta={10} />
```
