# Code Next - Hooks

[Fork on StackBlitz ⚡️](https://stackblitz.com/fork/code-next-hooks)

This is a lesson for the [Code Next](https://codenext.withgoogle.com/) React club.

In this lesson, engineers will

- Learn what hooks are.
- Discover commonly used hooks.
- Know how to make custom hooks.

## What are React hooks?

Hooks are functions that let you "hook into" React state and lifecycle features. 

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
   return () => { document.title = 'no counter' } 
  })

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

## References

[React docs](https://reactjs.org/docs/hooks-intro.html)