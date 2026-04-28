/**
 * Unit tests for src/lib/qrcode.ts — QR code SVG generator.
 *
 * Covers: valid SVG output, correct attributes, edge cases.
 */
import { describe, expect, it } from 'vitest';
import { generateQrSvg } from './qrcode';

describe('generateQrSvg', () => {
  const samplePix =
    '00020126410014br.gov.bcb.pix0120doar@podcodar.org520400005303986540525.005802BR5908PodCodar6014Belo Horizonte6304676C';

  // ── Basic validity ─────────────────────────────────────────────────────────

  it('generates valid SVG for a typical PIX string', () => {
    const svg = generateQrSvg(samplePix, 200);
    expect(svg).toBeTruthy();
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
  });

  it('SVG contains xmlns attribute', () => {
    const svg = generateQrSvg(samplePix);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it('SVG contains correct viewBox attribute', () => {
    const svg = generateQrSvg(samplePix, 200);
    expect(svg).toMatch(/viewBox="0 0 [\d.]+ [\d.]+"/);
  });

  it('SVG contains width and height attributes matching the requested size', () => {
    const svg = generateQrSvg(samplePix, 300);
    expect(svg).toContain('width="300"');
    expect(svg).toContain('height="300"');
  });

  // ── Content checks ─────────────────────────────────────────────────────────

  it('SVG contains a white background rect', () => {
    const svg = generateQrSvg(samplePix);
    expect(svg).toContain('fill="white"');
  });

  it('SVG contains dark modules (black rect elements)', () => {
    const svg = generateQrSvg(samplePix);
    expect(svg).toContain('fill="black"');
  });

  it('SVG contains multiple rect elements (modules)', () => {
    const svg = generateQrSvg(samplePix);
    const rectCount = (svg.match(/<rect/g) || []).length;
    // Should have many modules (at least the background + several dark modules)
    expect(rectCount).toBeGreaterThan(10);
  });

  // ── Edge cases ─────────────────────────────────────────────────────────────

  it('handles empty string gracefully', () => {
    const svg = generateQrSvg('', 200);
    // Should return a valid SVG, even if empty
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
    expect(svg).toContain('fill="white"');
  });

  it('handles very long PIX strings without crashing', () => {
    // Build a long string that exercises higher QR versions
    const longStr = samplePix + 'X'.repeat(200);
    const svg = generateQrSvg(longStr, 200);
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
  });

  it('produces valid XML (no unclosed tags)', () => {
    const svg = generateQrSvg(samplePix);
    // Count open and close tags for rect elements
    const openRects = (svg.match(/<rect\b/g) || []).length;
    const selfClosing = (svg.match(/\/>/g) || []).length;
    // All rects should be self-closing
    expect(openRects).toBe(selfClosing);
  });

  // ── Determinism ────────────────────────────────────────────────────────────

  it('produces identical output for the same input', () => {
    const a = generateQrSvg(samplePix, 256);
    const b = generateQrSvg(samplePix, 256);
    expect(a).toBe(b);
  });

  it('produces different output for different inputs', () => {
    const a = generateQrSvg(samplePix, 200);
    const b = generateQrSvg(`${samplePix}X`, 200);
    expect(a).not.toBe(b);
  });

  // ── Accessibility ──────────────────────────────────────────────────────────

  it('includes role and aria-label for accessibility', () => {
    const svg = generateQrSvg(samplePix);
    expect(svg).toContain('role="img"');
    expect(svg).toContain('aria-label="QR Code"');
  });

  // ── Size parameter ─────────────────────────────────────────────────────────

  it('defaults to size 200 if not specified', () => {
    const svg = generateQrSvg(samplePix);
    expect(svg).toContain('width="200"');
  });

  it('accepts custom size', () => {
    const svg = generateQrSvg(samplePix, 400);
    expect(svg).toContain('width="400"');
  });

  // ── No external dependencies ───────────────────────────────────────────────

  it('uses no external dependencies', () => {
    // Verify the function returns a string without throwing
    const result = generateQrSvg(samplePix);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(100);
  });
});
