import { test, expect } from '@playwright/test';
import { GreetingPage } from './pages/GreetingPage';

test.describe('Greeting', () => {
  let greetingPage: GreetingPage;

  test.beforeEach(async ({ page }) => {
    greetingPage = new GreetingPage(page);
    await greetingPage.goto();
  });

  test('no greeting shown initially', async () => {
    await expect(greetingPage.greeting).toBeHidden();
  });

  test('shows greeting when name is entered', { tag: '@smoke' }, async () => {
    await greetingPage.enterName('Alice');
    await expect(greetingPage.greeting).toHaveText('Hello, Alice!');
  });

  test('updates greeting when name changes', async () => {
    await greetingPage.enterName('Alice');
    await greetingPage.enterName('Bob');
    await expect(greetingPage.greeting).toHaveText('Hello, Bob!');
  });

  test('hides greeting when name is cleared', async () => {
    await greetingPage.enterName('Alice');
    await greetingPage.clearName();
    await expect(greetingPage.greeting).toBeHidden();
  });
});
