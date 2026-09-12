import { test, expect } from '@playwright/test';
import { CounterPage } from './pages/CounterPage';

test.describe('Counter', () => {
  let counterPage: CounterPage;

  test.beforeEach(async ({ page }) => {
    counterPage = new CounterPage(page);
    await counterPage.goto();
  });

  test('starts at 0', async () => {
    await expect(counterPage.count).toHaveText('0');
  });

  test('increments', { tag: '@smoke' }, async () => {
    await counterPage.increment();
    await counterPage.increment();
    await expect(counterPage.count).toHaveText('2');
  });

  test('decrements', async () => {
    await counterPage.decrement();
    await expect(counterPage.count).toHaveText('-1');
  });

  test('increments and decrements', async () => {
    await counterPage.increment();
    await counterPage.increment();
    await counterPage.decrement();
    await expect(counterPage.count).toHaveText('1');
  });
});
