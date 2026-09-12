import { test, expect } from '@playwright/test';

/**
 * Fails the surrounding test if the app threw an uncaught exception or logged
 * an error to the console.
 *
 * A DOM assertion cannot see either of those, so without this check a test can
 * pass while the app is broken: the markup renders, but a handler threw on the
 * way there, or a request failed and the UI fell back to a state the assertion
 * happened to expect.
 *
 * Call it as the first line of a describe block, so the listeners are attached
 * before the spec's own beforeEach navigates. If a known-benign error ever
 * needs excusing, filter it here rather than in a spec.
 */
export function failOnConsoleErrors() {
  let errors: string[] = [];

  test.beforeEach(({ page }) => {
    errors = [];
    page.on('pageerror', error => errors.push(`${error.name}: ${error.message}`));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
  });

  test.afterEach(async ({ page }) => {
    // Let the browser finish one task turn before asserting. A callback that
    // is already queued, such as a timer scheduled by the last action, runs
    // first and its error reaches us. Without this an error thrown just after
    // the final assertion is missed. Costs about a millisecond, unlike a
    // fixed sleep.
    if (!page.isClosed()) {
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 0)));
    }

    expect(errors, 'the page threw or logged console errors').toEqual([]);
  });
}
