import { test, expect } from './fixtures';

test.describe('Greeting', () => {
  test('no greeting shown initially', async ({ greetingPage }) => {
    await expect(greetingPage.greeting).not.toBeVisible();
  });

  test('shows greeting when name is entered', async ({ greetingPage }) => {
    await greetingPage.enterName('Alice');
    await expect(greetingPage.greeting).toHaveText('Hello, Alice!');
  });

  test('updates greeting when name changes', async ({ greetingPage }) => {
    await greetingPage.enterName('Alice');
    await greetingPage.enterName('Bob');
    await expect(greetingPage.greeting).toHaveText('Hello, Bob!');
  });

  test('hides greeting when name is cleared', async ({ greetingPage }) => {
    await greetingPage.enterName('Alice');
    await greetingPage.clearName();
    await expect(greetingPage.greeting).not.toBeVisible();
  });
});
