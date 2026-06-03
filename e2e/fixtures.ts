import { test as base } from '@playwright/test';
import { CounterPage } from './pages/CounterPage';
import { GreetingPage } from './pages/GreetingPage';
import { TodoPage } from './pages/TodoPage';

type Pages = {
  counterPage: CounterPage;
  greetingPage: GreetingPage;
  todoPage: TodoPage;
};

// Each fixture instantiates its page object and navigates to the app,
// so specs receive a ready-to-use page via dependency injection.
export const test = base.extend<Pages>({
  counterPage: async ({ page }, use) => {
    const counterPage = new CounterPage(page);
    await counterPage.goto();
    await use(counterPage);
  },
  greetingPage: async ({ page }, use) => {
    const greetingPage = new GreetingPage(page);
    await greetingPage.goto();
    await use(greetingPage);
  },
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
