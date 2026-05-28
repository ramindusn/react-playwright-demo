import { useState } from 'react';

export function Greeting() {
  const [name, setName] = useState('');

  return (
    <section>
      <h2>Greeting</h2>
      <input
        data-testid="name-input"
        type="text"
        placeholder="Enter your name"
        aria-label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {name && <p data-testid="greeting">Hello, {name}!</p>}
    </section>
  );
}
