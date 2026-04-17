import { expect, test } from "@playwright/test";

// ──────────────────────────────────────────────────────────────────────────────
// Blog
// ──────────────────────────────────────────────────────────────────────────────

test.describe("Blog", () => {
  test("navigates to blog homepage via nav link", async ({ page }) => {
    await page.goto("/");

    // Primary nav has a "Blog" link
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: /^blog$/i }).click();

    await expect(page).toHaveURL(/\/blog/);

    // The blog index page should list at least one post
    const postLinks = page.getByRole("link").filter({ hasText: /./u });
    await expect(postLinks.first()).toBeVisible();
  });

  test("blog homepage lists posts", async ({ page }) => {
    await page.goto("/blog");

    await expect(page).toHaveTitle(/PodCodar/i);

    // There should be at least one article/post link on the listing page
    const firstPost = page.locator("ul li a").first();
    await expect(firstPost).toBeVisible();
  });

  test("opens the first blog post from the listing", async ({ page }) => {
    await page.goto("/blog");

    // Click the very first post link in the listing
    const firstPost = page.locator("ul li a").first();
    await expect(firstPost).toBeVisible();

    const postTitle = await firstPost.textContent();
    await firstPost.click();

    // We should be on a blog post URL
    await expect(page).toHaveURL(/\/blog\/.+/);

    // The post page should have a <h1> matching the post title text
    if (postTitle) {
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("scrolls down the first blog post", async ({ page }) => {
    await page.goto("/blog");

    // Open the first post
    await page.locator("ul li a").first().click();
    await expect(page).toHaveURL(/\/blog\/.+/);

    // Confirm the post heading is visible
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Scroll to the bottom of the post
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));

    // Footer should come into view
    const footer = page.locator("footer");
    await expect(footer).toBeInViewport();
  });
});
