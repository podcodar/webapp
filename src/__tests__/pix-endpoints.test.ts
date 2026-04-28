/**
 * Integration tests for /api/pix-qr and /api/pix-result endpoints.
 *
 * Tests validation logic and endpoint handler behavior.
 * Uses bun test to avoid Cloudflare adapter conflicts with vitest.
 */
import { beforeAll, describe, expect, it } from 'bun:test';

// Import validation logic (no Astro dependency)
import { validateAmount } from '@/pages/api/pix-qr';

// Mock Request builder
function mkReq(path: string, headers?: Record<string, string>): Request {
  return new Request(`https://example.com${path}`, { headers });
}

let GET_pixQr: any;
let GET_pixResult: any;

// ═══════════════════════════════════════════════════════════════════════════════
// validateAmount tests
// ═══════════════════════════════════════════════════════════════════════════════

describe('validateAmount', () => {
  it('accepts valid integer amounts', () => {
    expect(validateAmount('25')).toEqual({ valid: true, amount: 25 });
    expect(validateAmount('50')).toEqual({ valid: true, amount: 50 });
    expect(validateAmount('100')).toEqual({ valid: true, amount: 100 });
  });

  it('accepts decimal amounts with up to 2 places', () => {
    expect(validateAmount('50.5')).toEqual({ valid: true, amount: 50.5 });
    expect(validateAmount('50.50')).toEqual({ valid: true, amount: 50.5 });
    expect(validateAmount('5.00')).toEqual({ valid: true, amount: 5 });
  });

  it('accepts minimum amount (5.00)', () => {
    expect(validateAmount('5')).toEqual({ valid: true, amount: 5 });
    expect(validateAmount('5.00')).toEqual({ valid: true, amount: 5 });
  });

  it('accepts maximum amount (10000.00)', () => {
    expect(validateAmount('10000')).toEqual({ valid: true, amount: 10000 });
    expect(validateAmount('10000.00')).toEqual({ valid: true, amount: 10000 });
  });

  it('rejects amounts below 5', () => {
    expect(validateAmount('4.99').valid).toBe(false);
    expect(validateAmount('0').valid).toBe(false);
    expect(validateAmount('-10').valid).toBe(false);
  });

  it('rejects amounts above 10000', () => {
    expect(validateAmount('10000.01').valid).toBe(false);
    expect(validateAmount('20000').valid).toBe(false);
  });

  it('rejects non-numeric input', () => {
    expect(validateAmount('abc').valid).toBe(false);
    expect(validateAmount('').valid).toBe(false);
  });

  it('rejects wrong decimal format', () => {
    expect(validateAmount('1,000').valid).toBe(false);
    expect(validateAmount('50.999').valid).toBe(false);
  });

  it('rejects null / missing amount', () => {
    expect(validateAmount(null).valid).toBe(false);
  });

  it('provides error messages in pt-BR', () => {
    const missing = validateAmount(null);
    expect(missing.valid).toBe(false);
    if (!missing.valid) {
      expect(typeof missing.error).toBe('string');
      expect(missing.error.length).toBeGreaterThan(0);
    }

    const invalid = validateAmount('abc');
    expect(invalid.valid).toBe(false);
    if (!invalid.valid) {
      expect(invalid.error).toContain('inválido');
    }

    const below = validateAmount('1');
    expect(below.valid).toBe(false);
    if (!below.valid) {
      expect(below.error).toContain('mínimo');
    }

    const above = validateAmount('20000');
    expect(above.valid).toBe(false);
    if (!above.valid) {
      expect(above.error).toContain('10.000');
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// GET handler smoke tests
// ═══════════════════════════════════════════════════════════════════════════════

describe('GET /api/pix-qr', () => {
  beforeAll(async () => {
    const mod = await import('@/pages/api/pix-qr');
    GET_pixQr = mod.GET;
  });

  it('returns 200 with image/svg+xml for valid amount', async () => {
    const res = await GET_pixQr({ request: mkReq('/api/pix-qr?amount=25') });
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('image/svg+xml');
  });

  it('returns valid SVG body', async () => {
    const res = await GET_pixQr({ request: mkReq('/api/pix-qr?amount=25') });
    const body = await res.text();
    expect(body.startsWith('<svg')).toBe(true);
  });

  it('sets X-Pix-Code header with PIX string', async () => {
    const res = await GET_pixQr({ request: mkReq('/api/pix-qr?amount=25') });
    expect(res.headers.get('X-Pix-Code')).toMatch(/^000201/);
  });

  it('sets caching headers', async () => {
    const res = await GET_pixQr({ request: mkReq('/api/pix-qr?amount=25') });
    expect(res.headers.get('Cache-Control')).toBeTruthy();
    expect(res.headers.get('ETag')).toBeTruthy();
    expect(res.headers.get('Vary')).toBe('Accept');
  });

  it('returns 304 when If-None-Match matches', async () => {
    const res1 = await GET_pixQr({ request: mkReq('/api/pix-qr?amount=25') });
    const etag = res1.headers.get('ETag');
    const res2 = await GET_pixQr({
      request: mkReq('/api/pix-qr?amount=25', { 'If-None-Match': etag! }),
    });
    expect(res2.status).toBe(304);
  });

  it('returns 400 for invalid amount', async () => {
    const res = await GET_pixQr({ request: mkReq('/api/pix-qr?amount=abc') });
    expect(res.status).toBe(400);
  });

  it('returns 400 for missing amount', async () => {
    const res = await GET_pixQr({ request: mkReq('/api/pix-qr') });
    expect(res.status).toBe(400);
  });

  it('ignores unknown query params', async () => {
    const res = await GET_pixQr({ request: mkReq('/api/pix-qr?amount=25&foo=1') });
    expect(res.status).toBe(200);
  });
});

describe('GET /api/pix-result', () => {
  beforeAll(async () => {
    const mod = await import('@/pages/api/pix-result');
    GET_pixResult = mod.GET;
  });

  it('returns 200 with text/html for valid amount', async () => {
    const res = await GET_pixResult({ request: mkReq('/api/pix-result?amount=25') });
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
  });

  it('returns HTML containing QR img tag', async () => {
    const res = await GET_pixResult({ request: mkReq('/api/pix-result?amount=50') });
    const body = await res.text();
    expect(body).toContain('<img');
    expect(body).toContain('/api/pix-qr?amount=50');
  });

  it('returns HTML containing truncated PIX preview', async () => {
    const res = await GET_pixResult({ request: mkReq('/api/pix-result?amount=25') });
    const body = await res.text();
    expect(body).toContain('…');
    expect(body).toContain('000201');
  });

  it('returns HTML containing copy button text', async () => {
    const res = await GET_pixResult({ request: mkReq('/api/pix-result?amount=25') });
    const body = await res.text();
    expect(body).toContain('Copiar');
  });

  it('sets caching headers', async () => {
    const res = await GET_pixResult({ request: mkReq('/api/pix-result?amount=25') });
    expect(res.headers.get('Cache-Control')).toBeTruthy();
    expect(res.headers.get('ETag')).toBeTruthy();
  });

  it('returns 400 for invalid amount', async () => {
    const res = await GET_pixResult({ request: mkReq('/api/pix-result?amount=abc') });
    expect(res.status).toBe(400);
  });

  it('uses DaisyUI utility classes', async () => {
    const res = await GET_pixResult({ request: mkReq('/api/pix-result?amount=25') });
    const body = await res.text();
    expect(body).toMatch(/rounded|btn|space-y-/);
  });
});
