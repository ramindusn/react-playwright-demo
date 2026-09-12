import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
  readonly todoInput: Locator;
  readonly addBtn: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);
    this.todoInput = page.getByTestId('todo-input');
    this.addBtn = page.getByTestId('add-todo');
    this.todoList = page.getByTestId('todo-list');
    this.todoItems = this.todoList.getByRole('listitem');
    this.emptyState = page.getByTestId('empty-state');
  }

  /** A single todo row, so specs can assert on one item by its text. */
  todoItem(text: string): Locator {
    return this.todoItems.filter({ hasText: text });
  }

  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.addBtn.click();
  }

  async removeTodo(text: string) {
    await this.todoItem(text)
      .getByRole('button', { name: `Remove ${text}` })
      .click();
  }
}
