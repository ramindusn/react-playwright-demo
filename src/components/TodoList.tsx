import { useState } from 'react';

export function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos(prev => [...prev, trimmed]);
    setInput('');
  };

  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          placeholder="Add a todo"
          aria-label="Todo input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {todos.length === 0 ? (
        <p data-testid="empty-state">No todos yet.</p>
      ) : (
        <ul data-testid="todo-list">
          {todos.map((todo, i) => (
            <li key={i}>
              <span>{todo}</span>
              <button onClick={() => removeTodo(i)} aria-label={`Remove ${todo}`}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
