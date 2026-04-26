import { expect, test } from '@playwright/test';

// ──────────────────────────────────────────────────────────────────────────────
// Homepage
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Homepage', () => {
  test('has page title and hero section', async ({ page }) => {
    await page.goto('/');

    // The document title should mention PodCodar
    await expect(page).toHaveTitle(/PodCodar/i);

    // Hero heading is visible
    const heroHeading = page.locator('#hero-heading');
    await expect(heroHeading).toBeVisible();
  });

  test('scrolls down the homepage', async ({ page }) => {
    await page.goto('/');

    // Confirm hero is visible before scrolling
    await expect(page.locator('#hero-heading')).toBeVisible();

    // Scroll to the bottom of the page
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    );

    // Footer is now in view
    const footer = page.locator('footer');
    await expect(footer).toBeInViewport();
  });

  test('shows only official social links in the footer', async ({ page }) => {
    await page.goto('/');

    const socialLinks = page.locator('footer').getByTestId('social-links');

    await expect(socialLinks.getByRole('link', { name: /podcodar no github/i })).toHaveAttribute(
      'href',
      'https://github.com/podcodar/'
    );
    await expect(socialLinks.getByRole('link', { name: /podcodar no linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/podcodar/'
    );
    await expect(socialLinks.getByRole('link', { name: /podcodar no instagram/i })).toHaveAttribute(
      'href',
      'https://www.instagram.com/podcodar/'
    );
    await expect(socialLinks.getByRole('link', { name: /podcodar no youtube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/@podcodar5070/'
    );

    await expect(socialLinks.getByRole('link')).toHaveCount(4);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Navigation: Contributing page (/contributing)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Contributing page', () => {
  test('navigates to Contributing page via header CTA', async ({ page }) => {
    await page.goto('/');

    // The header CTA "Como posso ajudar?" links to /contributing
    await page
      .getByRole('link', { name: /como posso ajudar/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/contributing/);
    await expect(page.getByRole('heading', { name: /como posso ajudar/i, level: 1 })).toBeVisible();
  });

  test('can navigate directly to /contributing', async ({ page }) => {
    await page.goto('/contributing');

    await expect(page).toHaveTitle(/PodCodar/i);
    await expect(page.getByRole('heading', { name: /como posso ajudar/i, level: 1 })).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Navigation: Join Us page (/join-us)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Join Us page', () => {
  test('navigates to Join Us page via header CTA', async ({ page }) => {
    await page.goto('/');

    // The header primary CTA "Faça parte!" links to /join-us
    await page
      .getByRole('link', { name: /faça parte/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/join-us/);
    await expect(page.getByRole('heading', { name: /faça parte/i, level: 1 })).toBeVisible();
  });

  test('can navigate directly to /join-us', async ({ page }) => {
    await page.goto('/join-us');

    await expect(page).toHaveTitle(/PodCodar/i);
    await expect(page.getByRole('heading', { name: /faça parte/i, level: 1 })).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Navigation: Contact page (/contact)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Contact page', () => {
  test('navigates to Contact page via nav link', async ({ page }) => {
    await page.goto('/');

    // Primary nav has a "Contato" link
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: /contato/i })
      .click();

    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole('heading', { name: /contato|entre em contato/i })).toBeVisible();
  });

  test('can navigate directly to /contact', async ({ page }) => {
    await page.goto('/contact');

    await expect(page).toHaveTitle(/PodCodar/i);
    await expect(page.getByRole('heading', { name: /contato|entre em contato/i })).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// About page (/about)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('About page', () => {
  test('has hero section with gradient background and eyebrow badge', async ({ page }) => {
    await page.goto('/about');

    // Eyebrow badge is visible
    const eyebrowBadge = page.locator('section').first().getByText('PodCodar');
    await expect(eyebrowBadge).toBeVisible();

    // Hero heading is visible
    await expect(page.getByRole('heading', { name: /sobre nós/i, level: 1 })).toBeVisible();

    // Gradient background section exists
    const heroSection = page.locator('section').first();
    await expect(heroSection).toHaveClass(/gradient/);
  });

  test('has mission section with icon header', async ({ page }) => {
    await page.goto('/about');

    // Mission section with icon
    await expect(page.getByRole('heading', { name: /^missão$/i, level: 2 })).toBeVisible();
  });

  test('has values section with 3 value cards', async ({ page }) => {
    await page.goto('/about');

    // Values section heading
    await expect(page.getByRole('heading', { name: /^valores$/i, level: 2 })).toBeVisible();

    // Three value cards: Inclusão, Colaboração, Qualidade de ensino
    const valuesSection = page.locator('section:has-text("Valores")');
    await expect(valuesSection.getByText('Inclusão')).toBeVisible();
    await expect(valuesSection.getByText('Colaboração')).toBeVisible();
    await expect(valuesSection.getByText('Qualidade de ensino')).toBeVisible();
  });

  test('has communication channels section with 3 channel cards', async ({ page }) => {
    await page.goto('/about');

    // Communication channels heading
    await expect(page.getByRole('heading', { name: /onde conversamos/i })).toBeVisible();

    // Three channel cards: WhatsApp, Discord, Google Meet
    const channelsSection = page.locator('section:has-text("Onde conversamos")');
    await expect(channelsSection.getByText('WhatsApp')).toBeVisible();
    await expect(channelsSection.getByText('Discord')).toBeVisible();
    await expect(channelsSection.getByText('Google Meet')).toBeVisible();
  });

  test('has projects section with project cards linking to GitHub', async ({ page }) => {
    await page.goto('/about');

    // Projects section heading
    await expect(page.getByRole('heading', { name: /projetos e repositórios/i })).toBeVisible();

    // Project cards have links to GitHub
    const projectsSection = page.locator('section:has-text("Projetos e repositórios")');
    await expect(projectsSection.getByRole('link', { name: /abrir link/i })).toHaveCount(2);

    // Check GitHub links are correct
    const githubLinks = projectsSection.getByRole('link', { name: /abrir link/i });
    await expect(githubLinks.nth(0)).toHaveAttribute('href', 'https://github.com/podcodar/webapp');
    await expect(githubLinks.nth(1)).toHaveAttribute('href', 'https://github.com/podcodar');
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Join Us page (/join-us)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Join Us page', () => {
  test('has hero section with stats (3 channels, 300+ members, weekly encounters)', async ({
    page,
  }) => {
    await page.goto('/join-us');

    // Hero heading is visible
    await expect(page.getByRole('heading', { name: /faça parte/i, level: 1 })).toBeVisible();

    // Stats are displayed - use more specific selectors
    await expect(page.locator('text=Canais principais').first()).toBeVisible();
    await expect(page.locator('text=Membros ativos').first()).toBeVisible();
    await expect(page.locator('text=Encontros').first()).toBeVisible();
  });

  test('has channels section with 3 channel cards', async ({ page }) => {
    await page.goto('/join-us');

    // Channels section heading
    await expect(page.getByRole('heading', { name: /onde a comunidade vive/i })).toBeVisible();

    // Three channel cards - use section-specific locators
    const channelsSection = page.locator('section:has-text("Onde a comunidade vive")');
    await expect(channelsSection.getByRole('heading', { name: 'WhatsApp' })).toBeVisible();
    await expect(channelsSection.getByRole('heading', { name: 'Discord' })).toBeVisible();
    await expect(channelsSection.getByRole('heading', { name: 'Google Meet' })).toBeVisible();
  });

  test('has steps section with 5 numbered steps', async ({ page }) => {
    await page.goto('/join-us');

    // Steps section heading
    await expect(page.getByRole('heading', { name: /primeiros passos/i })).toBeVisible();

    // Five steps: Imersão, Escolha, Engajamento, Colaboração, Crescimento
    await expect(page.getByText('Imersão')).toBeVisible();
    await expect(page.getByText('Escolha')).toBeVisible();
    await expect(page.getByText('Engajamento')).toBeVisible();
    await expect(page.getByText('Colaboração')).toBeVisible();
    await expect(page.getByText('Crescimento')).toBeVisible();
  });

  test('has GitHub section with CTA', async ({ page }) => {
    await page.goto('/join-us');

    // GitHub section
    await expect(page.getByRole('heading', { name: /^github$/i, level: 2 })).toBeVisible();
    await expect(page.getByText(/github.com\/podcodar/i)).toBeVisible();

    // GitHub CTA button
    await expect(page.getByRole('link', { name: /ver repositórios/i })).toHaveAttribute(
      'href',
      'https://github.com/podcodar'
    );
  });

  test('has contact section with link to /contact', async ({ page }) => {
    await page.goto('/join-us');

    // Contact section
    await expect(page.getByRole('heading', { name: /^contato$/i, level: 2 })).toBeVisible();

    // Link to contact page
    await expect(page.getByRole('link', { name: /envie uma mensagem/i })).toHaveAttribute(
      'href',
      '/contact'
    );
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Contact page (/contact)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Contact page', () => {
  test('has hero section with response stats', async ({ page }) => {
    await page.goto('/contact');

    // Hero heading
    await expect(page.getByRole('heading', { name: /fale conosco/i, level: 1 })).toBeVisible();

    // Response stats are displayed - use actual translation values
    await expect(page.getByText('1-2 dias')).toBeVisible();
    await expect(page.getByText('Comunidade ativa')).toBeVisible();
    await expect(page.getByText('Suporte dedicado')).toBeVisible();
  });

  test('has contact methods section with email link', async ({ page }) => {
    await page.goto('/contact');

    // Contact methods heading - using actual translation
    await expect(page.getByRole('heading', { name: /canais de comunicação/i })).toBeVisible();

    // Email link with mailto - use first() since there are multiple
    const emailLink = page.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
  });

  test('has inquiries section with 5 inquiry type cards', async ({ page }) => {
    await page.goto('/contact');

    // Inquiries section heading - using actual translation
    await expect(
      page.getByRole('heading', { name: /sobre o que você pode entrar em contato/i })
    ).toBeVisible();

    // Five inquiry type cards - using actual translation titles
    await expect(page.getByText('Mentoria e carreira')).toBeVisible();
    await expect(page.getByText('Parcerias e colaborações')).toBeVisible();
    await expect(page.getByText('Voluntariado')).toBeVisible();
    await expect(page.getByText('Doações e apoio')).toBeVisible();
    await expect(page.getByText('Outros assuntos')).toBeVisible();
  });

  test('has social links section', async ({ page }) => {
    await page.goto('/contact');

    // Social links section heading - using actual translation
    await expect(page.getByRole('heading', { name: /nos acompanhe nas redes/i })).toBeVisible();

    // Social links are present - use first() to avoid strict mode violation
    await expect(page.getByRole('link', { name: /podcodar no github/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /podcodar no linkedin/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /podcodar no instagram/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /podcodar no youtube/i }).first()).toBeVisible();
  });

  test('has CTA section with mailto link', async ({ page }) => {
    await page.goto('/contact');

    // CTA section with email button
    const mailtoLink = page.locator('a[href^="mailto:"]').last();
    await expect(mailtoLink).toBeVisible();
  });
});
