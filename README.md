# React Playwright Demo

[![CI](https://github.com/ramindusn/react-playwright-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/ramindusn/react-playwright-demo/actions/workflows/ci.yml)

A demo React application showcasing **Playwright E2E testing** with the Page Object Model and fixtures, **Vitest** unit tests, **TypeScript**, and a **GitHub Actions** CI pipeline.

## Tech Stack

- React 18 + TypeScript + Vite
- Vitest + Testing Library (component unit tests)
- Playwright (E2E tests across Chrome, Safari, Pixel 5, iPhone 13)
- GitHub Actions (CI pipeline)

## Getting Started

```bash
npm install
npm run dev
```

## Running Tests

### Unit tests (Vitest)

```bash
npm test
```

### E2E tests (Playwright)

```bash
npm run build
npx playwright install
npm run test:e2e
```

Open the Playwright interactive UI:

```bash
npm run test:e2e:ui
```

## Project Structure

```
src/
  components/       # React components (Counter, TodoList, Greeting)
  tests/            # Vitest component unit tests
e2e/
  pages/            # Page Object Model classes (BasePage + page objects)
  fixtures.ts       # Custom Playwright fixtures (page object injection)
  *.spec.ts         # Playwright E2E test specs
.github/workflows/  # CI pipeline
```

## Architecture & Decisions

I think of a test framework as **three layers**, with CI/CD wrapping around them:

1. **Test layer** — the specs and assertions. They read like a user story and stay free of selector/setup noise.
2. **Logic layer** — page objects, fixtures, and helpers. All interaction detail lives here.
3. **Config & reporting layer** — Playwright config, reporters, traces/videos, and the CI pipeline.

Key decisions:

- **Page Object Model + `BasePage`.** Each component has a page object that owns its locators and actions. Shared behaviour (like `goto()`) lives in `BasePage`. When the UI changes, I update one place — not every test.
- **Custom fixtures for dependency injection.** Instead of constructing page objects in every test, specs receive a ready-to-use page object as a fixture (`async ({ counterPage }) => ...`). This removes boilerplate and keeps tests focused on behaviour.
- **`data-testid` locators.** Tests target `getByTestId` (with `getByRole` where it reads naturally) rather than brittle CSS/XPath or visible text. Selectors stay stable even when styling or copy changes. If an element lacks a `data-testid`, I add one.
- **Multi-viewport coverage.** Tests run on Desktop Chrome, Desktop Safari, Pixel 5, and iPhone 13 — real mobile engines, not just a resized desktop window.
- **Testing pyramid.** Vitest covers component logic at the unit level; Playwright covers full user flows end-to-end. Each tool is used where it gives the most value.
- **Strict TypeScript** is enabled, and commits follow **Conventional Commits**.

## Playwright Configuration

Tests run on 4 browser/device projects:

| Project  | Device         |
| -------- | -------------- |
| chromium | Desktop Chrome |
| webkit   | Desktop Safari |
| pixel    | Pixel 5        |
| iphone   | iPhone 13      |

Traces and videos are retained on failure to make debugging easy.

## CI Pipeline

GitHub Actions runs on every push and pull request to `main`:

1. **Unit job** — runs the Vitest suite.
2. **E2E job** — gated on the unit job (`needs: unit`), then fans out across the 4 Playwright projects in a matrix so browsers run in parallel. The HTML report is uploaded as an artifact per project.
