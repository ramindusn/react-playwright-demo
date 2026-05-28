import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';

test.describe('Todo List', () => {
  test('shows empty state initially', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await expect(todo.emptyState).toBeVisible();
  });

  test('adds a todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTodo('Buy groceries');
    await expect(todo.todoList).toContainText('Buy groceries');
    await expect(todo.emptyState).not.toBeVisible();
  });

  test('adds multiple todos', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTodo('Task 1');
    await todo.addTodo('Task 2');
    await todo.addTodo('Task 3');
    await expect(todo.todoList.locator('li')).toHaveCount(3);
  });

  test('removes a todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTodo('Temporary task');
    await todo.removeTodo('Temporary task');
    await expect(todo.emptyState).toBeVisible();
  });

  test('does not add empty todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addBtn.click();
    await expect(todo.emptyState).toBeVisible();
  });
});
