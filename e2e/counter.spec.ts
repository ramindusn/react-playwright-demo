import { test, expect } from '@playwright/test';
import { CounterPage } from './pages/CounterPage';

test.describe('Counter', () => {
  test('starts at 0', async ({ page }) => {
    const counter = new CounterPage(page);
    await counter.goto();
    await expect(counter.count).toHaveText('0');
  });

  test('increments', async ({ page }) => {
    const counter = new CounterPage(page);
    await counter.goto();
    await counter.increment();
    await counter.increment();
    await expect(counter.count).toHaveText('2');
  });

  test('decrements', async ({ page }) => {
    const counter = new CounterPage(page);
    await counter.goto();
    await counter.decrement();
    await expect(counter.count).toHaveText('-1');
  });

  test('increments and decrements', async ({ page }) => {
    const counter = new CounterPage(page);
    await counter.goto();
    await counter.increment();
    await counter.increment();
    await counter.decrement();
    await expect(counter.count).toHaveText('1');
  });
});
