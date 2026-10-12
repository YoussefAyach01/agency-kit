// HTML validity (html-validate) + token contrast pairs from site/styles.css.
import { HtmlValidate } from 'html-validate';
import { readFileSync } from 'node:fs';

const files = ['site/index.html', 'site/ar.html', 'demos/index.html'];
const hv = new HtmlValidate({ extends: ['html-validate:recommended'], rules: { 'no-inline-style': 'off', 'require-sri': 'off', 'no-trailing-whitespace': 'off', 'void-style': 'off' } });
let bad = 0;
for (const f of files) {
  const r = await hv.validateString(readFileSync(f, 'utf8'), f);
  const msgs = r.results.flatMap((x) => x.messages);
  console.log(`${f}: ${msgs.length ? msgs.length + ' problem(s)' : 'valid'}`);
  for (const m of msgs) { bad++; console.log(`  ${m.line}:${m.column} ${m.ruleId} ${m.message}`); }
}

const css = readFileSync('site/styles.css', 'utf8');
const tok = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const pairs = [['ink', 'paper'], ['ink', 'white'], ['white', 'ink'], ['sun', 'ink'], ['ink', 'sun'], ['white', 'blue'], ['white', 'blue-deep'], ['muted', 'white'], ['muted', 'paper'], ['blue-deep', 'paper'], ['blue-deep', 'white'], ['ph-fg', 'ph-bg'], ['sun', 'blue-deep']];
for (const [fg, bg] of pairs) {
  const r = ratio(tok[fg], tok[bg]);
  if (r < 4.5) bad++;
  console.log(`contrast ${fg} on ${bg}: ${r.toFixed(2)} ${r < 4.5 ? 'FAIL' : 'ok'}`);
}
for (const [fg, bg] of [['#e6ebff', tok.blue], ['#c6cef0', tok.ink], ['#cbd4f7', tok['blue-deep']], ['#e3e8fb', tok.ink]]) {
  const r = ratio(fg, bg); if (r < 4.5) bad++;
  console.log(`contrast literal ${fg} on ${bg}: ${r.toFixed(2)} ${r < 4.5 ? 'FAIL' : 'ok'}`);
}
process.exit(bad ? 1 : 0);
