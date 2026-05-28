import { type Page, type Locator } from '@playwright/test';

export class CounterPage {
  readonly page: Page;
  readonly incrementBtn: Locator;
  readonly decrementBtn: Locator;
  readonly count: Locator;

  constructor(page: Page) {
    this.page = page;
    this.incrementBtn = page.getByRole('button', { name: '+' });
    this.decrementBtn = page.getByRole('button', { name: '-' });
    this.count = page.getByTestId('count');
  }

  async goto() {
    await this.page.goto('/');
  }

  async increment() {
    await this.incrementBtn.click();
  }

  async decrement() {
    await this.decrementBtn.click();
  }
}
