import { expect, test } from "@playwright/test";

const PAGE_MAP: Record<string, string> = {
	development: "http://localhost:5173",
	production: "https://podcodar.org",
};

const HOMEPAGE =
	process.env.TEST_URL ||
	PAGE_MAP[process.env.NODE_ENV as string] ||
	PAGE_MAP.development;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("has title", async ({ page }) => {
	await page.goto(HOMEPAGE);

	await sleep(1000);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Remix/);
});
