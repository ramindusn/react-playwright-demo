import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'playwright-report', 'blob-report', 'test-results'] },

  // Everything: baseline JS + TypeScript rules.
  js.configs.recommended,
  tseslint.configs.recommended,

  // E2E only: catches the classic Playwright mistakes, above all a missing
  // await on an expect or an action, which makes a test pass silently.
  {
    files: ['e2e/**/*.ts'],
    extends: [playwright.configs['flat/recommended']],
  },

  // Last, so formatting is Prettier's job and not ESLint's.
  prettier,
);
