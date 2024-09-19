import { test, expect } from "@playwright/test";
import { links } from "../packages/config/site";

const PAGE_MAP: Record<string, string> = {
  development: "http://localhost:3000",
  production: "https://podcodar.org",
};

const HOMEPAGE = process.env.TEST_URL || PAGE_MAP[process.env.NODE_ENV as string] || PAGE_MAP.development;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("has title", async ({ page }) => {
  await page.goto(HOMEPAGE);

  await sleep(1000);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PodCodar/);
});

test("has navigation links", async ({ page }) => {
  await page.goto(HOMEPAGE);

  await sleep(1000);

  for (const link of Object.values(links)) {
    expect(await page.$(`a[href="${link}"]`)).not.toBeNull();
  }
});

test("Join button is disabled", async ({ page }) => {
  await page.goto(HOMEPAGE);

  await sleep(1000);

  // Get join button
  const joinBtn = page.getByTestId("join-button");
  expect(joinBtn).not.toBeNull();

  // Expect join button to be disabled
  expect(await joinBtn.isEnabled()).toBeFalsy();
});

test("Toggle theme is working", async ({ page }) => {
  await page.goto(HOMEPAGE);

  await sleep(1000);

  // Get join button
  const toggleBtn = page.getByTestId("toggle-theme");
  expect(toggleBtn).not.toBeNull();

  // check initial theme value
  const initialTheme = await page.getAttribute("html", "data-theme");
  expect(initialTheme).toBe("light");

  // Click the toggle theme
  await toggleBtn.click();
  expect(await page.getAttribute("html", "data-theme")).toBe("dark");

  // Click the toggle theme
  await toggleBtn.click();
  expect(await page.getAttribute("html", "data-theme")).toBe("light");
});

test("Toggle language is working", async ({ page }) => {
  await page.goto(HOMEPAGE);

  await sleep(1000);

  // Get join button
  const toggleBtn = page.getByTestId("toggle-language");
  expect(toggleBtn).not.toBeNull();

  // check initial theme value
  expect(await page.getByTestId("join-button").textContent()).toBe("Entrar");

  // Click the toggle language
  await toggleBtn.click();
  expect(await page.getByTestId("join-button").textContent()).toBe("Join");

  // Click the toggle language
  await toggleBtn.click();
  expect(await page.getByTestId("join-button").textContent()).toBe("Entrar");
});
