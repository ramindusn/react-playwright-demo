import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

/**
 * Point the suite at any environment: BASE_URL=https://staging.example.com
 * When BASE_URL is set we skip the local preview server and test what is
 * already deployed there.
 */
const baseURL = process.env.BASE_URL ?? 'http://localhost:4173';
const usesLocalServer = !process.env.BASE_URL;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  // One worker per CI job; parallelism comes from the browser matrix instead.
  workers: isCI ? 1 : undefined,

  // CI: machine-readable blob reports that merge into one HTML report, plus
  // inline annotations on the pull request. Local: a readable terminal list.
  reporter: isCI ? [['list'], ['blob'], ['github']] : [['list'], ['html', { open: 'on-failure' }]],

  use: {
    baseURL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'pixel', use: { ...devices['Pixel 5'] } },
    { name: 'iphone', use: { ...devices['iPhone 13'] } },
  ],

  ...(usesLocalServer && {
    webServer: {
      command: 'npm run preview',
      url: baseURL,
      reuseExistingServer: !isCI,
      timeout: 60_000,
    },
  }),
});
