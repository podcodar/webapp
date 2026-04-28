/**
 * PIX BR Code generator — pure TypeScript, zero dependencies.
 *
 * Builds an EMV QRCPS-MPM compliant PIX "copia e cola" string.
 * Reference: PIX BR Code Standard (BCB).
 */

// ── CRC16-CCITT ──────────────────────────────────────────────────────────────
// Polynomial: x^16 + x^12 + x^5 + 1 (0x1021)
// Initial value: 0xFFFF, no reflect in/out, no final XOR.
// Used by PIX for the 6304 trailer checksum.

function crc16CCITT(data: string): number {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc;
}

// ── EMV Tag-Length-Value encoding ────────────────────────────────────────────

function tlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return id + len + value;
}

// ── Merchant Account Information (field 26) ──────────────────────────────────

function merchantInfo(key: string): string {
  const gui = tlv('00', 'br.gov.bcb.pix');
  const pixKey = tlv('01', key);
  return tlv('26', gui + pixKey);
}

// ── Amount formatting ────────────────────────────────────────────────────────

function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

// ── Public API ───────────────────────────────────────────────────────────────

export interface PixConfig {
  key: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
}

/**
 * Generate a PIX "copia e cola" BR Code string.
 *
 * @param amount - Donation amount in BRL (e.g. 25 for R$ 25.00)
 * @returns EMV QRCPS-MPM compliant PIX string, ready for QR encoding or copy
 *
 * @example
 *   const pix = generatePixCode(25);
 *   // => "00020126410014br.gov.bcb.pix0120doar@podcodar.org..."
 */
export function generatePixCode(amount: number): string {
  return generatePixCodeWithConfig({
    key: 'doar@podcodar.org',
    merchantName: 'PodCodar',
    merchantCity: 'Belo Horizonte',
    amount,
  });
}

/**
 * Generate a PIX BR Code with full configuration.
 *
 * Exported for testing — callers should prefer generatePixCode().
 */
export function generatePixCodeWithConfig(config: PixConfig): string {
  const payload =
    tlv('00', '01') + // Payload Format Indicator
    merchantInfo(config.key) + // Merchant Account Information
    tlv('52', '0000') + // Merchant Category Code
    tlv('53', '986') + // Transaction Currency (BRL)
    tlv('54', formatAmount(config.amount)) + // Transaction Amount
    tlv('58', 'BR') + // Country Code
    tlv('59', config.merchantName) + // Merchant Name (max 25)
    tlv('60', config.merchantCity); // Merchant City (max 15)

  // CRC16 is computed over payload + "6304" prefix
  const crc = crc16CCITT(`${payload}6304`);
  const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');

  return `${payload}6304${crcHex}`;
}
