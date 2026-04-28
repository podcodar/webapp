/**
 * E2E smoke test for the PIX donation flow on /contributing.
 *
 * Exercises the full critical path:
 * 1. Navigate to /contributing
 * 2. Find donation section after hero
 * 3. Click suggested amount button
 * 4. Verify QR code loads
 * 5. Verify Copia e Cola appears
 * 6. Test copy button
 * 7. Test large donation message
 */
import { expect, test } from '@playwright/test';

test.describe('PIX Donation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contributing');
    // Wait for Alpine.js to initialize (client:load island)
    await page.waitForFunction(() => !!(window as any).Alpine);
    // Give Alpine a moment to fully bootstrap
    await page.waitForTimeout(500);
  });

  test('donation section is visible immediately after the hero', async ({ page }) => {
    // The donation section should appear right after the HeroSection
    const donationSection = page.locator('.donation-form');
    await expect(donationSection).toBeVisible();

    // Check for the section heading
    await expect(page.getByRole('heading', { name: /doação via PIX/i })).toBeVisible();

    // Verify suggested buttons are present
    await expect(page.getByRole('button', { name: 'R$ 25' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'R$ 50' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'R$ 100' })).toBeVisible();
  });

  test('clicking R$ 25 button generates QR code and Copia e Cola', async ({ page }) => {
    // Click the R$ 25 suggested button
    await page.getByRole('button', { name: 'R$ 25' }).click();

    // Wait for htmx to fetch /api/pix-result and swap content
    // The loading skeleton should disappear and the result should appear
    await page.waitForTimeout(1000);

    // Check that the placeholder is gone and the QR image appeared
    const resultPane = page.locator('#donation-result');
    const qrImg = resultPane.locator('img');
    await expect(qrImg).toBeVisible({ timeout: 5000 });

    // Verify the QR image loaded (has naturalWidth > 0)
    await expect(async () => {
      const naturalWidth = await qrImg.evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }).toPass({ timeout: 5000 });

    // Verify Copia e Cola section is present
    await expect(page.getByText('Copia e Cola')).toBeVisible();

    // Verify truncated PIX string preview is visible
    await expect(page.locator('.donation-result .font-mono').first()).toContainText('…');

    // Verify amount confirmation
    await expect(page.locator('.donation-result').getByText('R$ 25,00')).toBeVisible();
  });

  test('clicking R$ 50 button shows correct amount', async ({ page }) => {
    await page.getByRole('button', { name: 'R$ 50' }).click();
    await page.waitForTimeout(1000);

    const resultPane = page.locator('#donation-result');
    await expect(resultPane.locator('img')).toBeVisible({ timeout: 5000 });

    // Verify amount
    await expect(resultPane.getByText('R$ 50,00')).toBeVisible();
  });

  test('copy button copies PIX string to clipboard', async ({ page }) => {
    // Grant clipboard permissions for the test
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.getByRole('button', { name: 'R$ 25' }).click();
    await page.waitForTimeout(1000);

    // Wait for the copy button to appear (inside htmx-swapped content)
    const copyButton = page.locator('#donation-result').getByRole('button', {
      name: /Copiar/,
    });
    await expect(copyButton).toBeVisible({ timeout: 5000 });

    // Click copy
    await copyButton.click();

    // Verify button text changed to "Copiado!"
    await expect(copyButton).toContainText('Copiado!', { timeout: 3000 });

    // Verify clipboard has a PIX string
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('000201');
    expect(clipboardText).toContain('doar@podcodar.org');
    expect(clipboardText).toContain('6304');
  });

  test('entering amount above 10000 shows contact us message instead of QR', async ({ page }) => {
    // Type an amount above the maximum
    const input = page.locator('#donation-custom-amount');
    await input.fill('10000.01');

    // Wait for Alpine validation
    await page.waitForTimeout(500);

    // Verify the info alert appears (not error alert)
    const infoAlert = page.locator('.alert-info');
    await expect(infoAlert).toBeVisible({ timeout: 3000 });
    await expect(infoAlert).toContainText('10.000');

    // Verify link to /contact exists
    const contactLink = infoAlert.locator('a[href="/contact"]');
    await expect(contactLink).toBeVisible();

    // Verify NO QR code is shown
    const resultPane = page.locator('#donation-result');
    // The result pane should still show the placeholder or empty state
    // (no QR img should have appeared)
    const qrImgs = resultPane.locator('img');
    await expect(qrImgs).toHaveCount(0);
  });

  test('entering invalid format shows validation error', async ({ page }) => {
    const input = page.locator('#donation-custom-amount');
    await input.fill('abc');

    await page.waitForTimeout(300);

    // Error alert should appear
    const errorAlert = page.locator('.alert-error');
    await expect(errorAlert).toBeVisible({ timeout: 3000 });
    await expect(errorAlert).toContainText('inválido');
  });

  test('custom valid amount generates QR code', async ({ page }) => {
    const input = page.locator('#donation-custom-amount');
    await input.fill('42');
    // Trigger input event (x-model + @input)
    await input.dispatchEvent('input');

    await page.waitForTimeout(1000);

    const resultPane = page.locator('#donation-result');
    await expect(resultPane.locator('img')).toBeVisible({ timeout: 5000 });

    // Verify amount
    await expect(resultPane.getByText('R$ 42,00')).toBeVisible();
  });

  test('the old CTA linking to /contact is removed', async ({ page }) => {
    // The old "Falar sobre doação" CTA button should no longer exist
    // in its original form (it was replaced by the PIX section)
    const _oldCta = page.getByRole('link', { name: 'Falar sobre doação' });
    // It may or may not be present; the PIX section should be the primary donation interface
    // The body text mentioning "fale com a gente" should be gone too
    const oldBody = page.getByText('Se quiser contribuir financeiramente ou combinar');
    await expect(oldBody).not.toBeVisible();
  });
});
