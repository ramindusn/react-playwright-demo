import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';

test.describe('Todo List', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('shows empty state initially', async () => {
    await expect(todoPage.emptyState).toBeVisible();
  });

  test('adds a todo', { tag: '@smoke' }, async () => {
    await todoPage.addTodo('Buy groceries');
    await expect(todoPage.todoItem('Buy groceries')).toBeVisible();
    await expect(todoPage.emptyState).toBeHidden();
  });

  test('adds multiple todos', async () => {
    await todoPage.addTodo('Task 1');
    await todoPage.addTodo('Task 2');
    await todoPage.addTodo('Task 3');
    await expect(todoPage.todoItems).toHaveCount(3);
  });

  test('removes a todo', async () => {
    await todoPage.addTodo('Temporary task');
    await todoPage.removeTodo('Temporary task');
    await expect(todoPage.emptyState).toBeVisible();
  });

  test('does not add empty todo', async () => {
    await todoPage.addTodo('');
    await expect(todoPage.emptyState).toBeVisible();
  });
});
