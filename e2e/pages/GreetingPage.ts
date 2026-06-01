import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GreetingPage extends BasePage {
  readonly nameInput: Locator;
  readonly greeting: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByTestId('name-input');
    this.greeting = page.getByTestId('greeting');
  }

  async enterName(name: string) {
    await this.nameInput.fill(name);
  }

  async clearName() {
    await this.nameInput.clear();
  }
}
