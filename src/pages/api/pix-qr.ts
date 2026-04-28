/**
 * GET /api/pix-qr?amount=X
 *
 * Returns a PIX QR code as inline SVG.
 * Caching: ETag-based with If-None-Match support, long-lived CDN cache.
 */
import type { APIRoute } from 'astro';
import { generatePixCode } from '@/lib/pix';
import { generateQrSvg } from '@/lib/qrcode';

export const prerender = false;

/** Shared validation logic used by both /api/pix-qr and /api/pix-result */
export function validateAmount(
  raw: string | null
): { valid: true; amount: number } | { valid: false; error: string } {
  if (!raw) {
    return { valid: false, error: "O parâmetro 'amount' é obrigatório." };
  }

  // Must be a valid positive number with at most 2 decimal places
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
    return { valid: false, error: 'Formato inválido. Use um valor como 25 ou 50.50.' };
  }

  const amount = Number.parseFloat(raw);

  if (amount < 5) {
    return { valid: false, error: 'O valor mínimo para doação é R$ 5,00.' };
  }

  if (amount > 10000) {
    return { valid: false, error: 'Para doações acima de R$ 10.000,00, entre em contato conosco.' };
  }

  return { valid: true, amount };
}

/** Hash a string to a short hex digest for ETag. Fast, non-cryptographic. */
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

  // Check conditional request
  const ifNoneMatch = request.headers.get('If-None-Match');
  if (ifNoneMatch === etag) {
    return new Response(null, { status: 304 });
  }

  const svg = generateQrSvg(pixCode, 256);

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'X-Pix-Code': pixCode,
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
      ETag: etag,
      Vary: 'Accept',
    },
  });
};
