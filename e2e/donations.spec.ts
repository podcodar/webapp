import { expect, test } from '@playwright/test';

// ──────────────────────────────────────────────────────────────────────────────
// Donations widget (embedded in /contributing)
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Wait for Astro island hydration to complete before interacting with
 * the SolidJS donation widget.
 */
async function waitForWidgetHydration(page: import('@playwright/test').Page) {
  await page.waitForFunction(() => {
    const island = document.querySelector('astro-island[client="load"]');
    return !island?.hasAttribute('ssr');
  });
}

test.describe('Donations page (/contributing)', () => {
  test('has donation section with heading and benefits', async ({ page }) => {
    await page.goto('/contributing');

    await expect(page.getByRole('heading', { name: /doe via pix/i, level: 3 })).toBeVisible();
    await expect(page.getByText('100% do valor vai diretamente para a comunidade')).toBeVisible();
    await expect(page.getByText('Sem taxas, sem burocracia — é instantâneo')).toBeVisible();
    await expect(page.getByText('Você recebe o comprovante no app do banco')).toBeVisible();
  });

  test('has donation widget with default R$ 25 selected', async ({ page }) => {
    await page.goto('/contributing');
    await waitForWidgetHydration(page);

    // Widget title and subtitle
    await expect(page.getByRole('heading', { name: /escolha um valor/i, level: 3 })).toBeVisible();
    await expect(page.getByText(/sua doação faz toda a diferença/i)).toBeVisible();

    // Default amount R$ 25 is selected
    const amount25 = page.locator('button[aria-pressed="true"]').filter({ hasText: 'R$ 25' });
    await expect(amount25).toBeVisible();

    // PIX code is generated
    const pixInput = page.locator('#pix-copia-cola');
    await expect(pixInput).toBeVisible();
    await expect(pixInput).toHaveValue(/br\.gov\.bcb\.pix/);
    await expect(pixInput).toHaveValue(/doar@podcodar\.org/);
  });

  test('switches PIX code when clicking suggested amounts', async ({ page }) => {
    await page.goto('/contributing');
    await waitForWidgetHydration(page);

    const pixInput = page.locator('#pix-copia-cola');
    await expect(pixInput).toBeVisible();

    // Default is 25.00
    await expect(pixInput).toHaveValue(/25\.00/);

    // Click R$ 50
    await page.getByRole('button', { name: 'R$ 50' }).click();
    await expect(pixInput).toHaveValue(/50\.00/);
    await expect(pixInput).toHaveValue(/br\.gov\.bcb\.pix/);

    // Click R$ 100
    await page.getByRole('button', { name: 'R$ 100' }).click();
    await expect(pixInput).toHaveValue(/100\.00/);
    await expect(pixInput).toHaveValue(/br\.gov\.bcb\.pix/);
  });

  test('generates PIX code for custom valid amount', async ({ page }) => {
    await page.goto('/contributing');
    await waitForWidgetHydration(page);

    const pixInput = page.locator('#pix-copia-cola');
    const customInput = page.locator('input[aria-label="Valor da doação"]');

    // Clear and type a custom amount
    await customInput.fill('75');
    await expect(pixInput).toHaveValue(/75\.00/);
    await expect(pixInput).toHaveValue(/doar@podcodar\.org/);
  });

  test('shows validation error for amount below minimum', async ({ page }) => {
    await page.goto('/contributing');
    await waitForWidgetHydration(page);

    const customInput = page.locator('input[aria-label="Valor da doação"]');

    await customInput.fill('3');
    await expect(page.getByText(/o valor mínimo para doação é r\$ 5,00/i)).toBeVisible();

    // PIX code should be hidden / empty state shown
    const pixInput = page.locator('#pix-copia-cola');
    await expect(pixInput).toHaveValue('');
  });

  test('shows validation error for too many decimals', async ({ page }) => {
    await page.goto('/contributing');
    await waitForWidgetHydration(page);

    const customInput = page.locator('input[aria-label="Valor da doação"]');

    // Typing non-numeric characters gets stripped immediately by the input cleaner,
    // so we test the "too many decimals" validation instead.
    await customInput.fill('10.234');
    await expect(page.getByText(/use no máximo duas casas decimais/i)).toBeVisible();
  });

  test('shows empty state when input is cleared', async ({ page }) => {
    await page.goto('/contributing');
    await waitForWidgetHydration(page);

    const customInput = page.locator('input[aria-label="Valor da doação"]');

    await customInput.fill('');
    await expect(page.getByText(/digite um valor válido para gerar o qr code/i)).toBeVisible();
  });

  test('copy button toggles to copied state', async ({ page }) => {
    await page.goto('/contributing');
    await waitForWidgetHydration(page);

    const copyButton = page.locator('button[aria-label="Copiar código PIX"]');
    await expect(copyButton).toBeVisible();
    await expect(copyButton).toHaveText(/copiar/i);

    // Click copy
    await copyButton.click();

    // Should show "Copiado!" state
    const copiedButton = page.locator('button[aria-label="Copiado"]');
    await expect(copiedButton).toBeVisible();
    await expect(copiedButton).toHaveText(/copiado!/i);

    // After ~2s it should revert (wait a bit longer than the timeout)
    await expect(page.locator('button[aria-label="Copiar código PIX"]')).toBeVisible({
      timeout: 3000,
    });
  });

  test('QR code is visible on desktop viewport', async ({ page }) => {
    await page.goto('/contributing');

    const qrCode = page.locator('[role="img"][aria-label="QR Code para pagamento PIX"]');
    await expect(qrCode).toBeVisible();
  });

  test('security badge is visible when PIX code is generated', async ({ page }) => {
    await page.goto('/contributing');

    await expect(page.getByText(/pagamento seguro via pix/i)).toBeVisible();
  });

  test('navigates to contact page from donation CTA', async ({ page }) => {
    await page.goto('/contributing');

    const contactLink = page
      .locator('section')
      .filter({ hasText: /doe via pix/i })
      .getByRole('link', { name: /entre em contato/i });

    await contactLink.click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
