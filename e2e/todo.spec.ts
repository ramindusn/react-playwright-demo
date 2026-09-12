import { test, expect } from './fixtures';

test.describe('Todo List', () => {
  test('shows empty state initially', async ({ todoPage }) => {
    await expect(todoPage.emptyState).toBeVisible();
  });

  test('adds a todo', async ({ todoPage }) => {
    await todoPage.addTodo('Buy groceries');
    await expect(todoPage.todoList).toContainText('Buy groceries');
    await expect(todoPage.emptyState).toBeHidden();
  });

  test('adds multiple todos', async ({ todoPage }) => {
    await todoPage.addTodo('Task 1');
    await todoPage.addTodo('Task 2');
    await todoPage.addTodo('Task 3');
    await expect(todoPage.todoList.locator('li')).toHaveCount(3);
  });

  test('removes a todo', async ({ todoPage }) => {
    await todoPage.addTodo('Temporary task');
    await todoPage.removeTodo('Temporary task');
    await expect(todoPage.emptyState).toBeVisible();
  });

  test('does not add empty todo', async ({ todoPage }) => {
    await todoPage.addBtn.click();
    await expect(todoPage.emptyState).toBeVisible();
  });
});
