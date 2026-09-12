import { test, expect } from './fixtures';

test.describe('Counter', () => {
  test('starts at 0', async ({ counterPage }) => {
    await expect(counterPage.count).toHaveText('0');
  });

  test('increments', { tag: '@smoke' }, async ({ counterPage }) => {
    await counterPage.increment();
    await counterPage.increment();
    await expect(counterPage.count).toHaveText('2');
  });

  test('decrements', async ({ counterPage }) => {
    await counterPage.decrement();
    await expect(counterPage.count).toHaveText('-1');
  });

  test('increments and decrements', async ({ counterPage }) => {
    await counterPage.increment();
    await counterPage.increment();
    await counterPage.decrement();
    await expect(counterPage.count).toHaveText('1');
  });
});
