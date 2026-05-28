import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>Counter</h2>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <span data-testid="count" style={{ margin: '0 1rem' }}>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </section>
  );
}
