/**
 * PIX EMV (BR Code) string generator.
 *
 * Generates the "copia e cola" string for PIX payments following the
 * Brazilian Central Bank specification.
 */

/**
 * CRC-16/CCITT-FALSE checksum used by the PIX EMV specification.
 *
 * Polynomial: 0x1021
 * Initial value: 0xFFFF
 * No input/output reflection, no XOR out.
 */
function crc16(data: string): string {
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
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Format a sub-field: ID (2 digits), length (2 digits), value.
 */
function emvField(id: string, value: string): string {
  return id + value.length.toString().padStart(2, '0') + value;
}

export interface PixOptions {
  /** PIX key (email, CPF, CNPJ, phone, or random key) */
  pixKey: string;
  /** Merchant name (max 25 chars) */
  merchantName: string;
  /** Merchant city (max 15 chars) */
  merchantCity: string;
  /** Optional amount in BRL (e.g. 25.50) */
  amount?: number;
  /** Optional transaction description (max 25 chars, shown on payer receipt) */
  description?: string;
  /** Optional transaction ID (*** = default) */
  txid?: string;
}

/**
 * Generate a PIX EMV string ("copia e cola").
 */
export function generatePixString(options: PixOptions): string {
  const { pixKey, merchantName, merchantCity, amount, description, txid } = options;

  // 00 — Payload Format Indicator (fixed)
  const payloads: string[] = ['000201'];

  // 26 — Merchant Account Information (PIX GUI)
  const pixGui = emvField('00', 'br.gov.bcb.pix') + emvField('01', pixKey);
  payloads.push(emvField('26', pixGui));

  // 52 — Merchant Category Code (0000 = not specified)
  payloads.push('52040000');

  // 53 — Transaction Currency (986 = BRL)
  payloads.push('5303986');

  // 54 — Transaction Amount (optional)
  if (amount !== undefined && amount > 0) {
    const amountStr = amount.toFixed(2);
    payloads.push(emvField('54', amountStr));
  }

  // 58 — Country Code
  payloads.push('5802BR');

  // 59 — Merchant Name
  payloads.push(emvField('59', merchantName));

  // 60 — Merchant City
  payloads.push(emvField('60', merchantCity));

  // 62 — Additional Data Field (TXID + optional description)
  const txidValue = txid ?? '***';
  let additional = emvField('05', txidValue);
  if (description) {
    additional += emvField('07', description);
  }
  payloads.push(emvField('62', additional));

  // 63 — CRC16 placeholder
  const partial = `${payloads.join('')}6304`;
  const crc = crc16(partial);

  return partial + crc;
}
