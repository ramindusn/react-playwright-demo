import { type Page, type Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly addBtn: Locator;
  readonly todoList: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.getByTestId('todo-input');
    this.addBtn = page.getByTestId('add-todo');
    this.todoList = page.getByTestId('todo-list');
    this.emptyState = page.getByTestId('empty-state');
  }

  async goto() {
    await this.page.goto('/');
  }

  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.addBtn.click();
  }

  async removeTodo(text: string) {
    await this.page.getByRole('button', { name: `Remove ${text}` }).click();
  }
}
