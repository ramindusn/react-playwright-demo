# React Playwright Demo

A demo React application showcasing **Playwright E2E testing** with Page Object Model, **TypeScript**, and **GitHub Actions CI**.

## Tech Stack

- React 18 + TypeScript + Vite
- Playwright (E2E tests across Chrome, Safari, Pixel 5, iPhone 13)
- GitHub Actions (CI pipeline)

## Getting Started

```bash
npm install
npm run dev
```

## Running E2E Tests

```bash
npm run build
npx playwright install
npm run test:e2e
```

To open the Playwright interactive UI:

```bash
npm run test:e2e:ui
```

## Project Structure

```
src/
  components/       # React components (Counter, TodoList, Greeting)
e2e/
  pages/            # Page Object Model classes
  *.spec.ts         # Playwright E2E test specs
.github/workflows/  # CI pipeline
```

## Playwright Configuration

Tests run on 4 browser/device configurations:

| Project  | Device          |
|----------|-----------------|
| chromium | Desktop Chrome  |
| webkit   | Desktop Safari  |
| pixel    | Pixel 5         |
| iphone   | iPhone 13       |
