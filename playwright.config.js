// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  globalTimeout: 120 * 1000,
  expect: {
    timeout: 10000,
  },
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://emicalculator.net/",
    trace: "on-first-retry",
    video: {
      mode: "retain-on-failure",
      size: { width: 640, height: 480 },
    },
    screenshot: {
      mode: "only-on-failure",
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      testMatch: /.*\/UI\/.*\.js/,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      testMatch: /.*\/UI\/.*\.js/,
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      testMatch: /.*\/UI\/.*\.js/,
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "API tests",
      testMatch: /.*\/API\/.*\.js/,
    },
  ],
});
