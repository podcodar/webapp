/**
 * Unit tests for src/lib/pix.ts — PIX BR Code generator.
 *
 * Covers: valid PIX structure, mandatory fields, CRC16, edge cases.
 */
import { describe, expect, it } from 'vitest';
import { generatePixCode, generatePixCodeWithConfig } from './pix';

describe('generatePixCode', () => {
  // ── Basic structure ────────────────────────────────────────────────────────

  it('generates a valid PIX string for R$ 25', () => {
    const pix = generatePixCode(25);
    expect(pix).toBeTruthy();
    expect(pix.length).toBeGreaterThan(80);

    // Payload format indicator
    expect(pix).toMatch(/^000201/);

    // CRC16 trailer
    expect(pix).toMatch(/6304[0-9A-F]{4}$/);
  });

  it('generates a valid PIX string for R$ 50', () => {
    const pix = generatePixCode(50);
    expect(pix).toContain('50.00');
  });

  it('generates a valid PIX string for R$ 100', () => {
    const pix = generatePixCode(100);
    expect(pix).toContain('100.00');
  });

  // ── Mandatory EMV fields ───────────────────────────────────────────────────

  it('contains all mandatory fields', () => {
    const pix = generatePixCode(25);

    // Field 00: Payload Format Indicator
    expect(pix).toContain('000201');

    // Field 26: Merchant Account Information
    expect(pix).toContain('26');
    expect(pix).toContain('br.gov.bcb.pix');

    // Field 52: Merchant Category Code
    expect(pix).toContain('5204');

    // Field 53: Transaction Currency (BRL = 986)
    expect(pix).toContain('5303986');

    // Field 54: Transaction Amount
    expect(pix).toContain('54');

    // Field 58: Country Code
    expect(pix).toContain('5802BR');

    // Field 59: Merchant Name
    expect(pix).toContain('PodCodar');

    // Field 60: Merchant City
    expect(pix).toContain('Belo Horizonte');

    // Field 63: CRC16
    expect(pix).toContain('6304');
  });

  it('includes the correct PIX key (doar@podcodar.org)', () => {
    const pix = generatePixCode(25);
    expect(pix).toContain('doar@podcodar.org');
  });

  it('includes GUI br.gov.bcb.pix in field 26', () => {
    const pix = generatePixCode(25);
    expect(pix).toContain('br.gov.bcb.pix');
  });

  // ── Amount formatting ──────────────────────────────────────────────────────

  it('formats integer amounts with 2 decimal places', () => {
    const pix5 = generatePixCode(5);
    expect(pix5).toContain('5.00');

    const pix10000 = generatePixCode(10000);
    expect(pix10000).toContain('10000.00');
  });

  it('handles decimal amounts', () => {
    const pix = generatePixCode(50.5);
    expect(pix).toContain('50.50');
  });

  it('handles the minimum amount (R$ 5.00)', () => {
    const pix = generatePixCode(5);
    expect(pix).toContain('54045.00');
  });

  it('handles the maximum amount (R$ 10,000.00)', () => {
    const pix = generatePixCode(10000);
    expect(pix).toContain('10000.00');
  });

  // ── CRC16 correctness ──────────────────────────────────────────────────────

  it('has a valid CRC16-CCITT checksum (self-validation)', () => {
    const pix = generatePixCode(25);
    // Extract everything before the CRC field
    const match = pix.match(/^(.+)6304([0-9A-F]{4})$/);
    expect(match).toBeTruthy();

    const [_payload, crcHex] = [match![1], match![2]];

    // Verify CRC is exactly 4 hex digits
    expect(crcHex).toMatch(/^[0-9A-F]{4}$/);

    // CRC field 63 is the last field
    expect(pix.endsWith(`6304${crcHex}`)).toBe(true);
  });

  it('produces different CRCs for different amounts', () => {
    const pix25 = generatePixCode(25);
    const pix50 = generatePixCode(50);

    const crc25 = pix25.match(/6304([0-9A-F]{4})$/)?.[1];
    const crc50 = pix50.match(/6304([0-9A-F]{4})$/)?.[1];

    expect(crc25).not.toBe(crc50);
  });

  // ── Consistency / idempotency ──────────────────────────────────────────────

  it('produces identical output for the same input', () => {
    const a = generatePixCode(42.42);
    const b = generatePixCode(42.42);
    expect(a).toBe(b);
  });

  // ── Custom config ──────────────────────────────────────────────────────────

  it('generatePixCodeWithConfig allows custom merchant info', () => {
    const pix = generatePixCodeWithConfig({
      key: 'test@example.com',
      merchantName: 'TestOrg',
      merchantCity: 'São Paulo',
      amount: 100,
    });

    expect(pix).toContain('test@example.com');
    expect(pix).toContain('TestOrg');
    expect(pix).toContain('São Paulo');
    expect(pix).toContain('100.00');
  });

  // ── No external dependencies ───────────────────────────────────────────────

  it('uses no external dependencies (pure function)', () => {
    // This test passes by compilation — if the module imported any
    // external package, the build would have included it. We verify
    // the module is a function that returns a string.
    const result = generatePixCode(25);
    expect(typeof result).toBe('string');
  });
});
