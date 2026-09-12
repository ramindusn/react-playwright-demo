import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('home page has no violations', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/');

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    // Report the rule names, so a failure says what broke without opening a trace.
    expect(violations.map(v => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
