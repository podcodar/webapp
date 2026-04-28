/**
 * QR code SVG generator — pure TypeScript, zero external dependencies.
 *
 * Produces scannable QR codes as inline SVG strings.
 * Implements byte-mode encoding with error correction level M (15%).
 * Supports versions 1–10, which covers typical PIX payloads (up to ~270 bytes).
 *
 * Reference: ISO/IEC 18004 (QR Code standard).
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Galois Field GF(256) — foundation for Reed-Solomon
// ═══════════════════════════════════════════════════════════════════════════════

const EXP_TABLE = new Array<number>(512); // Double size to avoid % 255
const LOG_TABLE = new Array<number>(256);

{
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    EXP_TABLE[i + 255] = x; // Duplicate for fast multiplication
    LOG_TABLE[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d; // primitive polynomial x^8 + x^4 + x^3 + x^2 + 1
    x &= 0xff;
  }
}

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]];
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Reed-Solomon error correction
// ═══════════════════════════════════════════════════════════════════════════════

/** Generate the generator polynomial of given degree. */
function rsGeneratorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const term = EXP_TABLE[i];
    const next = new Array<number>(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gfMul(poly[j], term);
      next[j + 1] ^= poly[j];
    }
    poly = next;
  }
  return poly;
}

/** Compute EC codewords for the given message. Returns only the EC portion. */
function rsComputeEC(message: number[], ecCount: number): number[] {
  const gen = rsGeneratorPoly(ecCount);
  const result = new Array<number>(ecCount).fill(0);

  for (let i = 0; i < message.length; i++) {
    const feedback = message[i] ^ result[0];
    // Shift left by 1, dropping result[0]
    for (let j = 0; j < ecCount - 1; j++) {
      result[j] = result[j + 1] ^ gfMul(gen[ecCount - 1 - j], feedback);
    }
    result[ecCount - 1] = gfMul(gen[0], feedback);
  }

  return result;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Version / capacity tables — byte mode, error correction level M (15%)
// ═══════════════════════════════════════════════════════════════════════════════

// Total data codewords for level M (index = version - 1)
const DATA_CODEWORDS_M = [
  16, 28, 44, 64, 86, 108, 124, 154, 182, 216, 254, 290, 334, 365, 415, 453, 507, 563, 627, 691,
  755, 819, 891, 963, 1035, 1103, 1187, 1267, 1347, 1437, 1539, 1635, 1731, 1827, 1947, 2067, 2179,
  2307, 2427, 2547,
];

// EC codewords per block
const EC_CODEWORDS_PER_BLOCK_M = [
  10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 26, 28, 30, 30, 28, 28, 28, 30, 30,
  26, 28, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
];

// Blocks in group 1
const GROUP1_BLOCKS_M = [
  1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9,
  10, 10, 10, 10, 11, 11, 11,
];

// Data codewords per block in group 1
const GROUP1_DATA_PER_BLOCK_M = [
  16, 28, 44, 32, 42, 29, 34, 40, 38, 45, 53, 59, 65, 63, 63, 78, 84, 84, 103, 117, 127, 121, 113,
  122, 119, 139, 151, 152, 155, 162, 174, 184, 192, 186, 199, 211, 220, 212, 236, 240,
];

// Blocks in group 2
const GROUP2_BLOCKS_M = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 2, 2, 4, 4, 4, 5, 5, 0, 0, 0, 6, 0, 6, 6, 6, 0, 0, 6, 8,
  0, 0, 0, 10, 0, 0, 0,
];

// Data codewords per block in group 2
const GROUP2_DATA_PER_BLOCK_M = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 60, 66, 0, 64, 79, 85, 85, 104, 118, 128, 0, 0, 0, 120, 0, 152,
  153, 156, 0, 0, 185, 193, 0, 0, 0, 221, 0, 0, 0,
];

// Alignment pattern center positions (by version)
const ALIGNMENT_CENTERS: Record<number, number[]> = {
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
  10: [6, 28, 50],
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Format & version information
// ═══════════════════════════════════════════════════════════════════════════════

// Format bits for EC level M + mask pattern 0-7 (pre-computed BCH(15,5))
const FORMAT_BITS: Record<number, number> = {
  0: 0b101010000010010,
  1: 0b101000100100101,
  2: 0b101111001111100,
  3: 0b101101101001011,
  4: 0b100010111111001,
  5: 0b100000011001110,
  6: 0b100111110010111,
  7: 0b100101010100000,
};

// Version information bits for versions 7-10
const VERSION_BITS: Record<number, number> = {
  7: 0b000111110010010100,
  8: 0b001000010110111100,
  9: 0b001001101010011001,
  10: 0b001010010011010011,
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Data encoding (byte mode)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Encode the raw data into a bit stream with mode indicator, count, data,
 * terminator, and padding — ready for interleaving with EC codewords.
 */
function encodeDataBits(bytes: Uint8Array, version: number): number[] {
  const totalCodewords = DATA_CODEWORDS_M[version - 1];
  const bits: number[] = [];

  // Mode indicator: 0100 (byte mode)
  bits.push(0, 1, 0, 0);

  // Character count indicator (8 bits for v1-9, 16 for v10+)
  const countBits = version <= 9 ? 8 : 16;
  for (let i = countBits - 1; i >= 0; i--) {
    bits.push((bytes.length >> i) & 1);
  }

  // Data bytes
  for (const b of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
  }

  // Terminator: up to 4 zero bits
  const termLen = Math.min(4, totalCodewords * 8 - bits.length);
  for (let i = 0; i < termLen; i++) {
    bits.push(0);
  }

  // Pad to full byte
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  // Pad to capacity with alternating 0xEC and 0x11
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < totalCodewords * 8) {
    const b = padBytes[padIdx % 2];
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
    padIdx++;
  }

  return bits;
}

/** Split data codewords into blocks and attach EC codewords. */
function interleaveWithEC(dataCodewords: number[], version: number): number[] {
  const ecPerBlock = EC_CODEWORDS_PER_BLOCK_M[version - 1];
  const g1Blocks = GROUP1_BLOCKS_M[version - 1];
  const g1DataPerBlock = GROUP1_DATA_PER_BLOCK_M[version - 1];
  const g2Blocks = GROUP2_BLOCKS_M[version - 1];
  const g2DataPerBlock = GROUP2_DATA_PER_BLOCK_M[version - 1];

  // Split data into blocks
  const blocks: number[][] = [];
  let offset = 0;

  for (let i = 0; i < g1Blocks; i++) {
    blocks.push(dataCodewords.slice(offset, offset + g1DataPerBlock));
    offset += g1DataPerBlock;
  }
  for (let i = 0; i < g2Blocks; i++) {
    blocks.push(dataCodewords.slice(offset, offset + g2DataPerBlock));
    offset += g2DataPerBlock;
  }

  // Compute EC for each block
  const ecBlocks: number[][] = blocks.map((b) => rsComputeEC(b, ecPerBlock));

  // Interleave: data first, then EC
  const result: number[] = [];
  const maxDataLen = Math.max(g1DataPerBlock, g2DataPerBlock);

  // Interleave data
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of blocks) {
      if (i < block.length) result.push(block[i]);
    }
  }

  // Interleave EC
  for (let i = 0; i < ecPerBlock; i++) {
    for (const ec of ecBlocks) {
      result.push(ec[i]);
    }
  }

  return result;
}

/** Pack interleaved codewords into a flat bit array (MSB first per byte). */
function codewordsToBits(codewords: number[]): number[] {
  const bits: number[] = [];
  for (const cw of codewords) {
    for (let i = 7; i >= 0; i--) {
      bits.push((cw >> i) & 1);
    }
  }
  return bits;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Matrix construction
// ═══════════════════════════════════════════════════════════════════════════════

function createMatrix(size: number): boolean[][] {
  return Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
}

function copyMatrix(src: boolean[][]): boolean[][] {
  return src.map((row) => [...row]);
}

/** Place a 7×7 finder pattern with separator at (row, col). */
function placeFinder(matrix: boolean[][], row: number, col: number): void {
  // Finder + separator = 9×9 region (outer border black, inner 7×7)
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      if (row + r < 0 || col + c < 0) continue;
      if (row + r >= matrix.length || col + c >= matrix[0].length) continue;

      // Separator ring (white)
      if (r === -1 || r === 7 || c === -1 || c === 7) {
        matrix[row + r][col + c] = false;
        continue;
      }

      // Outer black ring
      if (r === 0 || r === 6 || c === 0 || c === 6) {
        matrix[row + r][col + c] = true;
        continue;
      }

      // Inner white ring
      if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
        // Center black module
        matrix[row + r][col + c] = r === 3 && c === 3;
        continue;
      }

      matrix[row + r][col + c] = false;
    }
  }
}

/** Place a 5×5 alignment pattern centered at (r, c). */
function placeAlignment(matrix: boolean[][], centerR: number, centerC: number): void {
  for (let dr = -2; dr <= 2; dr++) {
    for (let dc = -2; dc <= 2; dc++) {
      const r = centerR + dr;
      const c = centerC + dc;
      if (r < 0 || c < 0 || r >= matrix.length || c >= matrix[0].length) continue;

      // Outer border black, inner 3×3 white, center black
      matrix[r][c] = dr === -2 || dr === 2 || dc === -2 || dc === 2 || (dr === 0 && dc === 0);
    }
  }
}

/** Place timing patterns (alternating black/white on row 6 and col 6). */
function placeTiming(matrix: boolean[][], size: number): void {
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }
}

function isReserved(row: number, col: number, size: number, version: number): boolean {
  // Finder patterns (top-left, top-right, bottom-left) + separators
  if (row <= 8 && col <= 8) return true;
  if (row <= 8 && col >= size - 8) return true;
  if (row >= size - 8 && col <= 8) return true;

  // Timing patterns
  if (row === 6 || col === 6) return true;

  // Format info areas (around finders)
  if (row <= 8 && col === 8) return true;
  if (row === 8 && col <= 8) return true;
  if (row === 8 && col >= size - 8) return true;
  if (row >= size - 8 && col === 8) return true;

  // Dark module (always on)
  if (row === size - 8 && col === 8) return true;

  // Alignment patterns
  if (version >= 2) {
    const centers = ALIGNMENT_CENTERS[version] || [];
    for (const ar of centers) {
      for (const ac of centers) {
        // Skip finder overlap areas
        if ((ar <= 8 && ac <= 8) || (ar <= 8 && ac >= size - 7) || (ar >= size - 7 && ac <= 8)) {
          continue;
        }
        if (Math.abs(row - ar) <= 2 && Math.abs(col - ac) <= 2) return true;
      }
    }
  }

  // Version info (v7+)
  if (version >= 7) {
    if (
      (row <= 5 && col >= size - 11 && col <= size - 9) ||
      (col <= 5 && row >= size - 11 && row <= size - 9)
    ) {
      return true;
    }
  }

  return false;
}

/** Build the initial QR matrix with all function patterns. */
function buildBaseMatrix(version: number): boolean[][] {
  const size = version * 4 + 17;
  const matrix = createMatrix(size);

  // Finder patterns
  placeFinder(matrix, 0, 0);
  placeFinder(matrix, 0, size - 7);
  placeFinder(matrix, size - 7, 0);

  // Timing patterns
  placeTiming(matrix, size);

  // Dark module
  matrix[size - 8][8] = true;

  // Alignment patterns
  if (version >= 2) {
    const centers = ALIGNMENT_CENTERS[version] || [];
    for (const ar of centers) {
      for (const ac of centers) {
        if ((ar <= 8 && ac <= 8) || (ar <= 8 && ac >= size - 7) || (ar >= size - 7 && ac <= 8)) {
          continue;
        }
        placeAlignment(matrix, ar, ac);
      }
    }
  }

  return matrix;
}

/** Place data bits onto the matrix (skip reserved areas). */
function placeData(matrix: boolean[][], dataBits: number[], version: number): void {
  const size = matrix.length;
  let bitIdx = 0;
  let goingUp = true;

  for (let col = size - 1; col >= 0; col -= 2) {
    // Skip vertical timing pattern
    if (col === 6) col = 5;

    const rows = goingUp
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const row of rows) {
      for (let c = col; c >= col - 1 && c >= 0; c--) {
        if (isReserved(row, c, size, version)) continue;

        if (bitIdx < dataBits.length) {
          matrix[row][c] = dataBits[bitIdx] === 1;
          bitIdx++;
        }
      }
    }
    goingUp = !goingUp;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. Masking & evaluation
// ═══════════════════════════════════════════════════════════════════════════════

function maskFn(pattern: number, row: number, col: number): boolean {
  switch (pattern) {
    case 0:
      return (row + col) % 2 === 0;
    case 1:
      return row % 2 === 0;
    case 2:
      return col % 3 === 0;
    case 3:
      return (row + col) % 3 === 0;
    case 4:
      return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0;
    case 5:
      return ((row * col) % 2) + ((row * col) % 3) === 0;
    case 6:
      return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0;
    case 7:
      return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0;
    default:
      return false;
  }
}

function applyMask(baseMatrix: boolean[][], version: number, pattern: number): boolean[][] {
  const size = baseMatrix.length;
  const result = copyMatrix(baseMatrix);

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (isReserved(row, col, size, version)) continue;
      if (maskFn(pattern, row, col)) {
        result[row][col] = !result[row][col];
      }
    }
  }

  return result;
}

/** Penalty score for masking evaluation (lower is better). */
function evaluateMask(matrix: boolean[][], size: number): number {
  let penalty = 0;

  // Condition 1: 5+ consecutive modules in a row/column
  for (let row = 0; row < size; row++) {
    let run = 0;
    let prev: boolean | null = null;
    for (let col = 0; col < size; col++) {
      if (prev !== null && matrix[row][col] === prev) {
        run++;
        if (run === 5) penalty += 3;
        else if (run > 5) penalty += 1;
      } else {
        run = 1;
        prev = matrix[row][col];
      }
    }
  }
  for (let col = 0; col < size; col++) {
    let run = 0;
    let prev: boolean | null = null;
    for (let row = 0; row < size; row++) {
      if (prev !== null && matrix[row][col] === prev) {
        run++;
        if (run === 5) penalty += 3;
        else if (run > 5) penalty += 1;
      } else {
        run = 1;
        prev = matrix[row][col];
      }
    }
  }

  // Condition 2: 2×2 blocks of same color
  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      if (
        matrix[row][col] === matrix[row][col + 1] &&
        matrix[row][col] === matrix[row + 1][col] &&
        matrix[row][col] === matrix[row + 1][col + 1]
      ) {
        penalty += 3;
      }
    }
  }

  // Condition 3: finder-like patterns (1011101) in rows/cols
  const pattern = [true, false, true, true, true, false, true];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size - 6; col++) {
      if (
        pattern.every((v, i) => matrix[row][col + i] === v) ||
        pattern.every((v, i) => matrix[row][col + i] === !v)
      ) {
        penalty += 40;
      }
    }
  }
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size - 6; row++) {
      if (
        pattern.every((v, i) => matrix[row + i][col] === v) ||
        pattern.every((v, i) => matrix[row + i][col] === !v)
      ) {
        penalty += 40;
      }
    }
  }

  // Condition 4: dark/light ratio
  let darkCount = 0;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col]) darkCount++;
    }
  }
  const ratio = (darkCount / (size * size)) * 100;
  const deviation = Math.abs(ratio - 50) / 5;
  penalty += Math.floor(deviation) * 10;

  return penalty;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. Format & version information placement
// ═══════════════════════════════════════════════════════════════════════════════

function placeFormatInfo(matrix: boolean[][], maskPattern: number, size: number): void {
  const bits = FORMAT_BITS[maskPattern];
  if (bits === undefined) return;

  // Place the 15 format bits around the finder patterns
  const positions: [number, number][] = [
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 7],
    [8, 8],
    [7, 8],
    [5, 8],
    [4, 8],
    [3, 8],
    [2, 8],
    [1, 8],
    [0, 8],
  ];

  // Mirror copy positions
  const mirror: [number, number][] = [];
  for (let i = 14; i >= 0; i--) {
    mirror.push([size - 1 - i, 8]);
  }
  for (let i = 0; i < 8; i++) {
    mirror.push([8, size - 8 + i]);
  }

  for (let i = 0; i < 15; i++) {
    const bit = (bits >> (14 - i)) & 1;
    if (i < positions.length) {
      const [r, c] = positions[i];
      matrix[r][c] = bit === 1;
    }
    if (i < mirror.length) {
      const [r, c] = mirror[i];
      matrix[r][c] = bit === 1;
    }
  }
}

function placeVersionInfo(matrix: boolean[][], version: number, size: number): void {
  if (version < 7) return;
  const bits = VERSION_BITS[version];
  if (bits === undefined) return;

  // Bottom-left area
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      const bit = (bits >> (i * 3 + j)) & 1;
      matrix[size - 11 + j][i] = bit === 1;
    }
  }

  // Top-right area
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      const bit = (bits >> (i * 3 + j)) & 1;
      matrix[i][size - 11 + j] = bit === 1;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 9. Public API
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate a QR code as an inline SVG string.
 *
 * @param data   - The string to encode (e.g. a PIX BR Code)
 * @param size   - Desired SVG dimension in pixels (default 200)
 * @param margin - White margin in modules (default 4)
 * @returns       Inline SVG markup ready for <img> or direct embedding
 *
 * @example
 *   const svg = generateQrSvg(pixCode, 300);
 *   // => '<svg xmlns="..." viewBox="0 0 300 300" ...>...</svg>'
 */
export function generateQrSvg(data: string, size = 200, margin = 4): string {
  if (!data) {
    // Return a minimal valid SVG for empty input
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="white"/></svg>`;
  }

  const bytes = new TextEncoder().encode(data);

  // Select version
  let version = 1;
  for (let v = 0; v < DATA_CODEWORDS_M.length; v++) {
    // Byte mode overhead: 4 (mode) + 8/16 (count) + 4 (term) + bits
    // Conservative estimate: capacity = data codewords
    if (bytes.length + 2 <= DATA_CODEWORDS_M[v]) {
      version = v + 1;
      break;
    }
  }

  const size2 = version * 4 + 17;

  // Encode data
  const dataBits = encodeDataBits(bytes, version);

  // Convert bits to codewords
  const dataCodewords: number[] = [];
  for (let i = 0; i < dataBits.length; i += 8) {
    let cw = 0;
    for (let j = 0; j < 8 && i + j < dataBits.length; j++) {
      cw = (cw << 1) | dataBits[i + j];
    }
    dataCodewords.push(cw);
  }

  // Interleave with EC
  const interleaved = interleaveWithEC(dataCodewords, version);
  const finalBits = codewordsToBits(interleaved);

  // Build base matrix
  const baseMatrix = buildBaseMatrix(version);

  // Place data
  const dataMatrix = copyMatrix(baseMatrix);
  placeData(dataMatrix, finalBits, version);

  // Try all masks, pick best
  let bestMatrix: boolean[][] | null = null;
  let bestPattern = -1;
  let bestScore = Infinity;

  for (let p = 0; p < 8; p++) {
    const masked = applyMask(dataMatrix, version, p);
    // Place format info temporarily for evaluation
    placeFormatInfo(masked, p, size2);
    placeVersionInfo(masked, version, size2);

    const score = evaluateMask(masked, size2);

    // Undo format/version info for fair mask comparison
    // (They'll be applied to the final matrix)

    if (score < bestScore) {
      bestScore = score;
      bestPattern = p;
      bestMatrix = masked;
    }
  }

  if (!bestMatrix || bestPattern < 0) {
    bestMatrix = dataMatrix;
    bestPattern = 0;
  }

  // Apply format and version info to best matrix
  placeFormatInfo(bestMatrix, bestPattern, size2);
  placeVersionInfo(bestMatrix, version, size2);

  // Render SVG
  const totalSize = size2 + margin * 2;
  const moduleSize = size / totalSize;
  const viewBoxSize = size / moduleSize;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" width="${size}" height="${size}" role="img" aria-label="QR Code">`;
  svg += `<rect width="${viewBoxSize}" height="${viewBoxSize}" fill="white"/>`;

  for (let row = 0; row < size2; row++) {
    for (let col = 0; col < size2; col++) {
      if (bestMatrix[row][col]) {
        const x = (col + margin) * moduleSize;
        const y = (row + margin) * moduleSize;
        svg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`;
      }
    }
  }

  svg += '</svg>';
  return svg;
}
