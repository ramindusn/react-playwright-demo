import { test, expect } from '@playwright/test';
import { GreetingPage } from './pages/GreetingPage';

test.describe('Greeting', () => {
  let greeting: GreetingPage;

  test.beforeEach(async ({ page }) => {
    greeting = new GreetingPage(page);
    await greeting.goto();
  });

  test('no greeting shown initially', async () => {
    await expect(greeting.greeting).not.toBeVisible();
  });

  test('shows greeting when name is entered', async () => {
    await greeting.enterName('Alice');
    await expect(greeting.greeting).toHaveText('Hello, Alice!');
  });

  test('updates greeting when name changes', async () => {
    await greeting.enterName('Alice');
    await greeting.enterName('Bob');
    await expect(greeting.greeting).toHaveText('Hello, Bob!');
  });

  test('hides greeting when name is cleared', async () => {
    await greeting.enterName('Alice');
    await greeting.clearName();
    await expect(greeting.greeting).not.toBeVisible();
  });
});
