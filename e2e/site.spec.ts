import { expect, test } from "@playwright/test";

// ──────────────────────────────────────────────────────────────────────────────
// Homepage
// ──────────────────────────────────────────────────────────────────────────────

test.describe("Homepage", () => {
  test("has page title and hero section", async ({ page }) => {
    await page.goto("/");

    // The document title should mention PodCodar
    await expect(page).toHaveTitle(/PodCodar/i);

    // Hero heading is visible
    const heroHeading = page.locator("#hero-heading");
    await expect(heroHeading).toBeVisible();
  });

  test("scrolls down the homepage", async ({ page }) => {
    await page.goto("/");

    // Confirm hero is visible before scrolling
    await expect(page.locator("#hero-heading")).toBeVisible();

    // Scroll to the bottom of the page
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));

    // Footer is now in view
    const footer = page.locator("footer");
    await expect(footer).toBeInViewport();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Navigation: Contributing page (/contributing)
// ──────────────────────────────────────────────────────────────────────────────

test.describe("Contributing page", () => {
  test("navigates to Contributing page via header CTA", async ({ page }) => {
    await page.goto("/");

    // The header CTA "Como posso ajudar?" links to /contributing
    await page.getByRole("link", { name: /como posso ajudar/i }).first().click();

    await expect(page).toHaveURL(/\/contributing/);
    await expect(page.getByRole("heading", { name: /como posso ajudar/i, level: 1 })).toBeVisible();
  });

  test("can navigate directly to /contributing", async ({ page }) => {
    await page.goto("/contributing");

    await expect(page).toHaveTitle(/PodCodar/i);
    await expect(page.getByRole("heading", { name: /como posso ajudar/i, level: 1 })).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Navigation: Join Us page (/join-us)
// ──────────────────────────────────────────────────────────────────────────────

test.describe("Join Us page", () => {
  test("navigates to Join Us page via header CTA", async ({ page }) => {
    await page.goto("/");

    // The header primary CTA "Faça parte!" links to /join-us
    await page.getByRole("link", { name: /faça parte/i }).first().click();

    await expect(page).toHaveURL(/\/join-us/);
    await expect(page.getByRole("heading", { name: /faça parte/i, level: 1 })).toBeVisible();
  });

  test("can navigate directly to /join-us", async ({ page }) => {
    await page.goto("/join-us");

    await expect(page).toHaveTitle(/PodCodar/i);
    await expect(page.getByRole("heading", { name: /faça parte/i, level: 1 })).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Navigation: Contact page (/contact)
// ──────────────────────────────────────────────────────────────────────────────

test.describe("Contact page", () => {
  test("navigates to Contact page via nav link", async ({ page }) => {
    await page.goto("/");

    // Primary nav has a "Contato" link
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: /contato/i }).click();

    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole("heading", { name: /contato|entre em contato/i })).toBeVisible();
  });

  test("can navigate directly to /contact", async ({ page }) => {
    await page.goto("/contact");

    await expect(page).toHaveTitle(/PodCodar/i);
    await expect(page.getByRole("heading", { name: /contato|entre em contato/i })).toBeVisible();
  });
});
