import { type Page, type Locator } from '@playwright/test';

export class GreetingPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel('Name');
    this.greeting = page.getByTestId('greeting');
  }

  async goto() {
    await this.page.goto('/');
  }

  async enterName(name: string) {
    await this.nameInput.fill(name);
  }

  async clearName() {
    await this.nameInput.clear();
  }
}
