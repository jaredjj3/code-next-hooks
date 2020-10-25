import React from 'react';
import { useCounter } from './hooks/useCounter';

export const CustomHookCounter = () => {
  const [count, increment, decrement] = useCounter(5);
  return (
    <div>
      <div>count: {count}</div>
      <div>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
      </div>
    </div>
  );
};
