// Tiny static server. Serves agency-kit and, read-only, ../site-kit/dist at /sitekit/.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sitekit = resolve(root, '..', 'site-kit', 'dist');
const port = Number(process.env.PORT ?? 3700);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json', '.md': 'text/plain; charset=utf-8' };
// only these top-level folders of agency-kit are public (no node_modules, no .git)
const publicDirs = new Set(['site', 'demos', 'docs']);

async function resolvePath(urlPath) {
  // work on URL segments (always "/"), reject anything odd, then let resolve() + prefix check do the rest
  const segs = decodeURIComponent(urlPath).split('/').filter(Boolean);
  if (segs.some((s) => s === '..' || s.includes('\\') || s.includes('\0'))) return null;
  let base = root;
  if (segs[0] === 'sitekit') { base = sitekit; segs.shift(); }
  else if (!publicDirs.has(segs[0])) return null;
  const rel = segs.join('/');
  let file = resolve(base, rel);
  if (file !== base && !file.startsWith(base + sep)) return null;
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch { return null; }
  return file;
}

createServer(async (req, res) => {
  const path = new URL(req.url ?? '/', 'http://x').pathname;
  if (path === '/') { res.writeHead(302, { location: '/site/' }); return res.end(); }
  const file = await resolvePath(path).catch(() => null);
  if (!file) { res.writeHead(404, { 'content-type': 'text/plain' }); return res.end('Not found'); }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream', 'x-content-type-options': 'nosniff' });
    res.end(body);
  } catch { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('Not found'); }
}).listen(port, () => console.log(`agency-kit on http://localhost:${port}  (agency page: /  ·  AR: /site/ar.html  ·  demos: /demos/)`));
