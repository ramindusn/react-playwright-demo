import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TodoList } from '../components/TodoList';

describe('TodoList', () => {
  it('shows empty state initially', () => {
    render(<TodoList />);
    expect(screen.getByTestId('empty-state')).toHaveTextContent('No todos yet.');
  });

  it('adds a todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId('todo-input'), { target: { value: 'Buy milk' } });
    fireEvent.click(screen.getByTestId('add-todo'));
    expect(screen.getByTestId('todo-list')).toHaveTextContent('Buy milk');
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
  });

  it('removes a todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId('todo-input'), { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByTestId('add-todo'));
    fireEvent.click(screen.getByRole('button', { name: 'Remove Task 1' }));
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('does not add empty todos', () => {
    render(<TodoList />);
    fireEvent.click(screen.getByTestId('add-todo'));
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
