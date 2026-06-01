import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CounterPage extends BasePage {
  readonly incrementBtn: Locator;
  readonly decrementBtn: Locator;
  readonly count: Locator;

  constructor(page: Page) {
    super(page);
    this.incrementBtn = page.getByTestId('increment');
    this.decrementBtn = page.getByTestId('decrement');
    this.count = page.getByTestId('count');
  }

  async increment() {
    await this.incrementBtn.click();
  }

  async decrement() {
    await this.decrementBtn.click();
  }
}
