/**
 * GET /api/pix-result?amount=X
 *
 * Returns an HTML fragment for htmx swap: QR <img>, Copia e Cola preview,
 * expand toggle, and copy button. Styled with DaisyUI utility classes.
 */
import type { APIRoute } from 'astro';
import { generatePixCode } from '@/lib/pix';
import { validateAmount } from '@/pages/api/pix-qr';

export const prerender = false;

function simpleHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(16);
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const amountRaw = url.searchParams.get('amount');

  const validation = validateAmount(amountRaw);
  if (!validation.valid) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const pixCode = generatePixCode(validation.amount);
  const etag = `"${simpleHash(pixCode)}"`;

  const ifNoneMatch = request.headers.get('If-None-Match');
  if (ifNoneMatch === etag) {
    return new Response(null, { status: 304 });
  }

  const truncated = pixCode.length > 48 ? `${pixCode.slice(0, 48)}…` : pixCode;
  const pixUrl = `/api/pix-qr?amount=${encodeURIComponent(validation.amount)}`;

  const html = `\
<div class="donation-result space-y-5" x-data="{ expanded: false, copied: false }">
  <!-- QR Code -->
  <div class="flex justify-center bg-white rounded-2xl p-4 border border-base-300/50">
    <img
      src="${pixUrl}"
      alt="QR Code PIX para doação de R$ ${validation.amount.toFixed(2).replace('.', ',')}"
      class="w-56 h-56"
      width="256"
      height="256"
    />
  </div>

  <!-- Copia e Cola -->
  <div class="space-y-3">
    <h3 class="text-sm font-semibold text-base-content/70 uppercase tracking-wide">
      Copia e Cola
    </h3>

    <!-- Truncated preview -->
    <div
      class="relative cursor-pointer select-all rounded-xl border border-base-300/50 bg-base-200/50 p-4 font-mono text-sm break-all leading-relaxed"
      @click="expanded = !expanded"
      role="button"
      tabindex="0"
      :aria-expanded="expanded"
      @keydown.enter="expanded = !expanded"
      @keydown.space.prevent="expanded = !expanded"
    >
      <span x-show="!expanded" class="block">${truncated}</span>
      <span x-show="expanded" x-cloak class="block">${pixCode}</span>
      <span class="block mt-1 text-xs text-primary" x-text="expanded ? 'Recolher' : 'Expandir'"></span>
    </div>

    <!-- Copy button -->
    <button
      type="button"
      class="btn btn-primary w-full"
      :class="copied ? 'btn-success' : 'btn-primary'"
      @click="
        navigator.clipboard?.writeText?.('${pixCode.replace(/'/g, "\\'")}').then(() => { copied = true; setTimeout(() => copied = false, 2000); }).catch(() => {
          /* fallback handled by .select-all above */
          copied = true;
          setTimeout(() => copied = false, 2000);
        })
      "
    >
      <span x-show="!copied">Copiar</span>
      <span x-show="copied" x-cloak>✓ Copiado!</span>
    </button>
  </div>

  <!-- Amount confirmation -->
  <p class="text-center text-sm text-base-content/50 m-0">
    Doação de <strong class="text-base-content/70">R$ ${validation.amount.toFixed(2).replace('.', ',')}</strong>
  </p>
</div>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
      ETag: etag,
      Vary: 'Accept',
    },
  });
};
