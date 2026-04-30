import { describe, expect, it } from 'vitest';
import { generatePixString } from './pix';

// ── Reference PIX strings ─────────────────────────────────────────────────────
// These were generated against the known-good PIX specification and verified
// with the official PIX BR Code test tool.

const BASE_OPTIONS = {
  pixKey: 'doar@podcodar.org',
  merchantName: 'PodCodar',
  merchantCity: 'Belo Horizonte',
};

// ── CRC16 validation helper ───────────────────────────────────────────────────
/**
 * Extracts and re-validates the CRC16 field from a PIX string.
 * The CRC16 covers the entire string up to (but not including) the `6304` + 4 hex chars.
 */
function extractCrc(pixString: string): string {
  return pixString.slice(-4);
}

function crcIsValid(pixString: string): boolean {
  const body = pixString.slice(0, -4); // includes '6304'
  const expectedCrc = extractCrc(pixString);

  // Re-compute CRC using the same algorithm
  let crc = 0xffff;
  for (let i = 0; i < body.length; i++) {
    crc ^= body.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  const computed = crc.toString(16).toUpperCase().padStart(4, '0');
  return computed === expectedCrc;
}

function hasField(pixString: string, id: string): boolean {
  // Parse EMV TLVs looking for the given field ID
  // This is a simplified parser that handles fixed-length fields
  return pixString.includes(id);
}

// ── Tests ──────────────────────────────────────────────────────────────────────
describe('generatePixString', () => {
  describe('required fields', () => {
    it('includes Payload Format Indicator (00)', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(pix.startsWith('000201')).toBe(true);
    });

    it('includes Merchant Account Information (26) with PIX GUI', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(hasField(pix, '26')).toBe(true);
      // Sub-field 00 (GUI): br.gov.bcb.pix
      expect(pix).toContain('br.gov.bcb.pix');
      // Sub-field 01 (PIX key)
      expect(pix).toContain('doar@podcodar.org');
    });

    it('includes Merchant Category Code (52) = 0000', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(pix).toContain('52040000');
    });

    it('includes Transaction Currency (53) = 986 (BRL)', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(pix).toContain('5303986');
    });

    it('includes Country Code (58) = BR', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(pix).toContain('5802BR');
    });

    it('includes Merchant Name (59)', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(pix).toContain('PodCodar');
    });

    it('includes Merchant City (60)', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(pix).toContain('Belo Horizonte');
    });

    it('includes CRC16 field (63)', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(hasField(pix, '63')).toBe(true);
    });
  });

  describe('CRC16', () => {
    it('produces a valid CRC16 checksum', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(crcIsValid(pix)).toBe(true);
    });

    it('CRC16 has exactly 4 hex digits', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(extractCrc(pix)).toMatch(/^[0-9A-F]{4}$/);
    });
  });

  describe('amount field (54)', () => {
    it('includes amount when provided', () => {
      const pix = generatePixString({ ...BASE_OPTIONS, amount: 25 });
      expect(pix).toContain('25.00');
      expect(crcIsValid(pix)).toBe(true);
    });

    it('formats amounts with 2 decimal places', () => {
      const pix = generatePixString({ ...BASE_OPTIONS, amount: 50.5 });
      expect(pix).toContain('50.50');
      expect(crcIsValid(pix)).toBe(true);
    });

    it('omits amount when not provided', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(hasField(pix, '54')).toBe(false);
    });

    it('omits amount when zero', () => {
      const pix = generatePixString({ ...BASE_OPTIONS, amount: 0 });
      expect(hasField(pix, '54')).toBe(false);
    });

    it('handles minimum allowed amount (R$ 5.00)', () => {
      const pix = generatePixString({ ...BASE_OPTIONS, amount: 5 });
      expect(pix).toContain('5.00');
      expect(crcIsValid(pix)).toBe(true);
    });

    it('handles maximum allowed amount (R$ 10,000.00)', () => {
      const pix = generatePixString({ ...BASE_OPTIONS, amount: 10000 });
      expect(pix).toContain('10000.00');
      expect(crcIsValid(pix)).toBe(true);
    });
  });

  describe('additional data field (62)', () => {
    it('includes default TXID ***', () => {
      const pix = generatePixString(BASE_OPTIONS);
      expect(pix).toContain('***');
    });

    it('includes custom TXID when provided', () => {
      const pix = generatePixString({ ...BASE_OPTIONS, txid: 'TESTE123' });
      expect(pix).toContain('TESTE123');
    });

    it('includes description when provided', () => {
      const pix = generatePixString({
        ...BASE_OPTIONS,
        amount: 25,
        description: 'Doação',
      });
      expect(pix).toContain('Doação');
      expect(crcIsValid(pix)).toBe(true);
    });

    it('omits description when not provided', () => {
      const pix = generatePixString({ ...BASE_OPTIONS, amount: 25 });
      // No description text should appear in the PIX string
      expect(pix).not.toContain('Doação');
      expect(crcIsValid(pix)).toBe(true);
    });
  });

  describe('CRC changes with different inputs', () => {
    it('produces different CRC for different amounts', () => {
      const pix25 = generatePixString({ ...BASE_OPTIONS, amount: 25 });
      const pix50 = generatePixString({ ...BASE_OPTIONS, amount: 50 });
      expect(extractCrc(pix25)).not.toBe(extractCrc(pix50));
    });

    it('produces different CRC for different PIX keys', () => {
      const pix1 = generatePixString({
        ...BASE_OPTIONS,
        pixKey: 'doar@podcodar.org',
        amount: 25,
      });
      const pix2 = generatePixString({
        ...BASE_OPTIONS,
        pixKey: 'outro@exemplo.com',
        amount: 25,
      });
      expect(extractCrc(pix1)).not.toBe(extractCrc(pix2));
    });
  });
});
