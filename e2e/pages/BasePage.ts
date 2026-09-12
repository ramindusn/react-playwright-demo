import { type Page } from '@playwright/test';

/**
 * Shared behaviour for every page object. Subclasses pass the route they
 * live on, so this scales to a multi-page app without touching goto().
 */
export class BasePage {
  readonly page: Page;
  readonly path: string;

  constructor(page: Page, path = '/') {
    this.page = page;
    this.path = path;
  }

  async goto() {
    await this.page.goto(this.path);
  }
}
