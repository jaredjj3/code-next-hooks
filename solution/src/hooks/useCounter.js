import { useState } from 'react';

export const useCounter = (delta = 1) => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + delta);
  const decrement = () => setCount(count - delta);
  return [count, increment, decrement];
};
