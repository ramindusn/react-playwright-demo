import { Counter } from './components/Counter';
import { TodoList } from './components/TodoList';
import { Greeting } from './components/Greeting';

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>React Playwright Demo</h1>
      <hr />
      <Counter />
      <hr />
      <Greeting />
      <hr />
      <TodoList />
    </div>
  );
}

export default App;
