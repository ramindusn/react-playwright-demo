import { test, expect } from '@playwright/test';
import { CounterPage } from './pages/CounterPage';

test.describe('Counter', () => {
  let counter: CounterPage;

  test.beforeEach(async ({ page }) => {
    counter = new CounterPage(page);
    await counter.goto();
  });

  test('starts at 0', async () => {
    await expect(counter.count).toHaveText('0');
  });

  test('increments', async () => {
    await counter.increment();
    await counter.increment();
    await expect(counter.count).toHaveText('2');
  });

  test('decrements', async () => {
    await counter.decrement();
    await expect(counter.count).toHaveText('-1');
  });

  test('increments and decrements', async () => {
    await counter.increment();
    await counter.increment();
    await counter.decrement();
    await expect(counter.count).toHaveText('1');
  });
});
