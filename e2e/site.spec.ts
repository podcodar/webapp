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
    await expect(
      page.getByRole('heading', { name: /contribua com código aberto/i, level: 2 })
    ).toBeVisible();
    await expect(page.getByText(/repositórios da organização/i)).toBeVisible();

    // GitHub CTA button
    await expect(page.getByRole('link', { name: /ver repositórios/i })).toHaveAttribute(
      'href',
      'https://github.com/podcodar'
    );
  });

  test('has contact section with link to /contact', async ({ page }) => {
    await page.goto('/join-us');

    // Contact section
    await expect(
      page.getByRole('heading', { name: /pronto para fazer parte/i, level: 2 })
    ).toBeVisible();

    // Link to contact page
    await expect(page.getByRole('link', { name: /entre em contato/i })).toHaveAttribute(
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

    // Six inquiry type cards - using actual translation titles
    await expect(page.getByText('Precisando contratar?')).toBeVisible();
    await expect(page.getByText('Workshops Patrocinados')).toBeVisible();
    await expect(page.getByText('Mentoria e carreira')).toBeVisible();
    await expect(page.getByText('Parcerias e colaborações')).toBeVisible();
    await expect(page.getByText('Doações, apoio e voluntariado')).toBeVisible();
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

  test('has FAQ section with multiple categories', async ({ page }) => {
    await page.goto('/contact');

    // FAQ section heading
    await expect(page.getByRole('heading', { name: /perguntas frequentes/i })).toBeVisible();

    // FAQ categories
    await expect(page.getByText('Sobre a PodCodar e Nossa Missão')).toBeVisible();
    await expect(page.getByText('Para Novos Membros')).toBeVisible();
    await expect(page.getByText('Para Empresas e Parceiros')).toBeVisible();
    await expect(page.getByText('Outras Dúvidas')).toBeVisible();

    // Sample questions from each category
    await expect(page.getByText('O que é a PodCodar?')).toBeVisible();
    await expect(page.getByText('Preciso pagar para participar da comunidade?')).toBeVisible();
    await expect(page.getByText('Quero participar! Qual é o primeiro passo?')).toBeVisible();
    await expect(
      page.getByText('Somos uma empresa. Como podemos ser parceiros da PodCodar?')
    ).toBeVisible();
    await expect(page.getByText('Quais ferramentas de comunicação vocês usam?')).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Transparency page (/transparency)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Transparency page', () => {
  test('navigates to Transparency page via nav link', async ({ page }) => {
    await page.goto('/');

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: /transparência/i })
      .click();

    await expect(page).toHaveURL(/\/transparency/);
    await expect(page.getByRole('heading', { name: /transparência/i, level: 1 })).toBeVisible();
  });

  test('can navigate directly to /transparency', async ({ page }) => {
    await page.goto('/transparency');

    await expect(page).toHaveTitle(/PodCodar/i);
    await expect(page.getByRole('heading', { name: /transparência/i, level: 1 })).toBeVisible();
  });

  test('has hero section with stats', async ({ page }) => {
    await page.goto('/transparency');

    // Eyebrow badge
    await expect(page.getByText('Compromisso com a Transparência')).toBeVisible();

    // Hero heading
    await expect(page.getByRole('heading', { name: /transparência/i, level: 1 })).toBeVisible();

    // Stats are visible
    await expect(page.locator('text=Documentos').first()).toBeVisible();
    await expect(page.locator('text=Membros').first()).toBeVisible();
  });

  test('has documents section with categories', async ({ page }) => {
    await page.goto('/transparency');

    // Documents section heading
    await expect(page.getByRole('heading', { name: /documentos/i, level: 2 })).toBeVisible();

    // CNPJ badge - scoped to main content to avoid footer match
    await expect(
      page.locator('main, [role="main"]').getByText('53.979.776/0001-61').first()
    ).toBeVisible();

    // Category headings (at least one should exist based on content)
    const hasInstitucional = await page
      .getByText('Institucional')
      .first()
      .isVisible()
      .catch(() => false);
    const hasFinanceiro = await page
      .getByText('Financeiro')
      .first()
      .isVisible()
      .catch(() => false);
    const hasFiscal = await page
      .getByText('Fiscal')
      .first()
      .isVisible()
      .catch(() => false);
    expect(hasInstitucional || hasFinanceiro || hasFiscal).toBe(true);
  });

  test('has board members section', async ({ page }) => {
    await page.goto('/transparency');

    await expect(
      page.getByRole('heading', { name: /conselho administrativo/i, level: 2 })
    ).toBeVisible();

    // Board members from data/transparency.ts
    await expect(page.getByText('Marco Antônio de Souza Júnior')).toBeVisible();
    await expect(page.getByText('Pedro Henrique Ramos Costa')).toBeVisible();
    await expect(page.getByText('Marina Andrade Fonseca')).toBeVisible();
    await expect(page.getByText('Pedro Frattezi Silva')).toBeVisible();
  });

  test('has metrics section with impact numbers', async ({ page }) => {
    await page.goto('/transparency');

    await expect(
      page.getByRole('heading', { name: /impacto e resultados/i, level: 2 })
    ).toBeVisible();

    // Metrics from data/transparency.ts
    await expect(page.locator('text=300+').first()).toBeVisible();
    await expect(page.locator('text=30+').first()).toBeVisible();
    await expect(page.locator('text=16+').first()).toBeVisible();
  });

  test('has commitment section with CTA links', async ({ page }) => {
    await page.goto('/transparency');

    await expect(page.getByRole('heading', { name: /nosso compromisso/i, level: 2 })).toBeVisible();

    // CTA links
    await expect(page.getByRole('link', { name: /fale conosco/i }).first()).toHaveAttribute(
      'href',
      '/contact'
    );
    await expect(page.getByRole('link', { name: /como ajudar/i })).toHaveAttribute(
      'href',
      '/contributing'
    );
  });

  test('has contact CTA with mailto link', async ({ page }) => {
    await page.goto('/transparency');

    await expect(page.getByRole('heading', { name: /fale conosco/i, level: 2 })).toBeVisible();

    const mailtoLink = page.locator('a[href^="mailto:contato@podcodar.org"]');
    await expect(mailtoLink).toBeVisible();
  });

  test('can navigate to a document detail page', async ({ page }) => {
    await page.goto('/transparency');

    // Click the first document card
    const firstDocLink = page.locator('a[href^="/transparency/"]').first();
    await expect(firstDocLink).toBeVisible();
    await firstDocLink.click();

    // Should be on a detail page
    await expect(page).toHaveURL(/\/transparency\/.+/);

    // Detail page should have a breadcrumb back to transparency
    const backLink = page
      .getByRole('navigation', { name: 'Breadcrumb' })
      .getByRole('link', { name: /transparência/i });
    await expect(backLink).toHaveAttribute('href', '/transparency');
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Transparency detail pages (/transparency/:slug)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Transparency detail pages', () => {
  test('estatuto page has title, description and back link', async ({ page }) => {
    await page.goto('/transparency/estatuto');

    // Page should have a heading (the page title h1, not the markdown content h1)
    await expect(
      page.locator('h1.text-3xl').filter({ hasText: /ata de assembleia/i })
    ).toBeVisible();

    // Category badge
    await expect(page.getByText('Institucional').first()).toBeVisible();

    // Back link to transparency - use the breadcrumb nav, not the header nav
    const breadcrumbLink = page
      .getByRole('navigation', { name: 'Breadcrumb' })
      .getByRole('link', { name: /transparência/i });
    await expect(breadcrumbLink).toHaveAttribute('href', /\/transparency/);

    // Back navigation at bottom
    await expect(
      page.getByRole('link', { name: /voltar para todos os documentos/i })
    ).toHaveAttribute('href', '/transparency');
  });

  test('document page has external file link when available', async ({ page }) => {
    await page.goto('/transparency/estatuto');

    // Should have a view/download link
    const viewLink = page.getByRole('link', { name: /ver documento/i });
    await expect(viewLink).toBeVisible();
  });

  test('renders 404 for non-existent transparency slug', async ({ page }) => {
    await page.goto('/transparency/non-existent-doc');

    // Should show 404
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByRole('heading', { name: /ops/i })).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 404 page
// ──────────────────────────────────────────────────────────────────────────────

test.describe('404 page', () => {
  test('shows 404 for non-existent routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');

    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByRole('heading', { name: /ops/i })).toBeVisible();
    await expect(page.getByText(/essa página não existe/i)).toBeVisible();
  });

  test('has navigation links back to main pages', async ({ page }) => {
    await page.goto('/non-existent-page');

    // Link back to home - scoped to 404 navigation
    const nav404 = page.getByRole('navigation', { name: '404 navigation' });
    await expect(nav404.getByRole('link', { name: /início/i })).toHaveAttribute('href', '/');

    // Link to join-us
    await expect(nav404.getByRole('link', { name: /faça parte/i })).toHaveAttribute(
      'href',
      '/join-us/'
    );
  });

  test('returns 404 status for non-existent page', async ({ page }) => {
    const response = await page.goto('/definitely-not-real');
    expect(response?.status()).toBe(404);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Cross-page navigation
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Cross-page navigation', () => {
  test('all main nav links are present in header', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Primary' });

    await expect(nav.getByRole('link', { name: /início/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /sobre/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /transparência/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /contato/i })).toBeVisible();
  });

  test('can navigate from about to join-us via CTA', async ({ page }) => {
    await page.goto('/about');

    const cta = page.getByRole('link', { name: /faça parte/i }).last();
    await cta.click();

    await expect(page).toHaveURL(/\/join-us/);
  });

  test('footer social links are consistent across pages', async ({ page }) => {
    const pages = ['/', '/about', '/contact', '/transparency', '/join-us', '/contributing'];

    for (const path of pages) {
      await page.goto(path);
      const socialLinks = page.locator('footer').getByTestId('social-links');
      await expect(socialLinks.getByRole('link')).toHaveCount(4);
    }
  });

  test('can navigate to transparency from footer or nav on any page', async ({ page }) => {
    await page.goto('/join-us');

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: /transparência/i })
      .click();

    await expect(page).toHaveURL(/\/transparency/);
    await expect(page.getByRole('heading', { name: /transparência/i, level: 1 })).toBeVisible();
  });
});
