// Screenshots at 375 and 1280 via playwright-core + system Chrome, plus DOM checks.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const PORT = 3701;
mkdirSync('shots', { recursive: true });
const srv = spawn(process.execPath, ['scripts/serve.mjs'], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
let fails = 0;
const pages = [['fr', '/site/'], ['ar', '/site/ar.html'], ['demos', '/demos/']];
for (const [name, path] of pages) {
  for (const [w, h] of [[375, 812], [1280, 800]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:${PORT}${path}`);
    const info = await p.evaluate(() => {
      const parse = (s) => s.match(/[\d.]+/g).map(Number);
      const lum = ([r, g, b]) => { const c = [r, g, b].map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
      const bgOf = (el) => { for (; el; el = el.parentElement) { const c = getComputedStyle(el).backgroundColor; const a = parse(c); if (a.length < 4 || a[3] > 0.5) { if (a.length >= 3 && !(a.length === 4 && a[3] === 0)) return a; } } return [255, 255, 255]; };
      const low = [];
      for (const el of document.querySelectorAll('body *')) {
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        const cs = getComputedStyle(el); if (cs.visibility === 'hidden') continue;
        const fg = parse(cs.color), bg = bgOf(el);
        const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x); const r = (a + 0.05) / (b + 0.05);
        const big = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 700);
        if (r < (big ? 3 : 4.5)) low.push(`${el.tagName}.${el.className} ${r.toFixed(2)} "${el.textContent.trim().slice(0, 30)}"`);
      }
      return { overflow: document.documentElement.scrollWidth - innerWidth, low, dir: document.documentElement.dir };
    });
    console.log(`${name} @${w}: dir=${info.dir} horizontalOverflow=${info.overflow}px lowContrast=${info.low.length}`);
    info.low.forEach((l) => console.log('   ', l));
    if (info.overflow > 0 || info.low.length) fails++;
    await p.screenshot({ path: `shots/${name}-${w}.png`, fullPage: true });
    await ctx.close();
  }
}
// keyboard: first Tab hits the skip link, focus ring visible on the CTA
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const p = await ctx.newPage(); await p.goto(`http://localhost:${PORT}/site/`);
await p.keyboard.press('Tab');
console.log('first Tab focuses:', await p.evaluate(() => document.activeElement.className));
// site-kit demo links resolve
for (const u of ['/sitekit/restaurant/', '/sitekit/gym/ar/', '/site/styles.css']) {
  const r = await p.request.get(`http://localhost:${PORT}${u}`); console.log(u, r.status());
  if (r.status() !== 200) fails++;
}
const r = await p.request.get(`http://localhost:${PORT}/node_modules/x`); console.log('/node_modules blocked:', r.status());
await browser.close(); srv.kill();
process.exit(fails ? 1 : 0);
