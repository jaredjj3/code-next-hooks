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
  });

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

