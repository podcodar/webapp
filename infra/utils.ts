import * as path from 'node:path';
import * as fs from 'node:fs';

export const today = () => new Date().toISOString().split('T')[0];

export const absolutePath = (relativePath: string) =>
  new URL(relativePath, import.meta.url).pathname;

/**
 * Discover all .mjs module files from the Astro build output.
 * Astro generates code-split chunks that need to be uploaded as separate modules.
 */
export function discoverWorkerModules(serverDir: string): Array<{
  name: string;
  contentFile: string;
  contentType: string;
}> {
  const modules: Array<{
    name: string;
    contentFile: string;
    contentType: string;
  }> = [];

  // The entry point is special - it's renamed to index.js
  const entryPath = path.join(serverDir, 'entry.mjs');
  if (fs.existsSync(entryPath)) {
    modules.push({
      name: 'index.js',
      contentFile: entryPath,
      contentType: 'application/javascript+module',
    });
  }

  // Discover other .mjs files in the server root (excluding entry.mjs)
  if (fs.existsSync(serverDir)) {
    const rootFiles = fs.readdirSync(serverDir);
    for (const file of rootFiles) {
      if (file.endsWith('.mjs') && file !== 'entry.mjs') {
        modules.push({
          name: file,
          contentFile: path.join(serverDir, file),
          contentType: 'application/javascript+module',
        });
      }
    }
  }

  // Discover all .mjs files in the chunks directory
  const chunksDir = path.join(serverDir, 'chunks');
  if (fs.existsSync(chunksDir)) {
    const chunkFiles = fs.readdirSync(chunksDir);
    for (const file of chunkFiles) {
      if (file.endsWith('.mjs')) {
        modules.push({
          name: `chunks/${file}`,
          contentFile: path.join(chunksDir, file),
          contentType: 'application/javascript+module',
        });
      }
    }
  }

  return modules;
}
