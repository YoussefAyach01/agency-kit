# agency-kit

A sales toolkit for selling websites (built with `site-kit`) to local Moroccan
businesses. **Not a SaaS** — no accounts, no database, no server-side logic
beyond a tiny static file server for local preview. Everything here is meant
to be read, copied, filled in with real placeholders, and used by hand.

## What's in it

- `docs/01-pricing-sheet.md` — three tiers in MAD (Vitrine/Pro/Sur mesure), care plans, extras, payment terms.
- `docs/02-discovery-call-checklist.md` — questions to ask before quoting.
- `docs/03-outreach-templates.md` — FR + AR (Darija-flavoured) WhatsApp/Instagram/email first-contact and follow-up messages, with hard rules against spam and fake claims.
- `docs/04-proposal-template.md` — one-page proposal, FR, with short WhatsApp/AR versions.
- `docs/05-service-contract-template.md` — plain-language service contract draft. **Not legal advice — needs lawyer review before real use.**
- `docs/06-domain-hosting-costs.md` — estimated domain/hosting costs in Morocco, flagged as unverified, with a checklist to verify before quoting.
- `docs/07-delivery-handover-checklist.md` — pre-launch content/technical checks, handover steps, follow-up cadence.
- `docs/08-first-5-clients-30-day-plan.md` — a day-by-day outreach plan, framed as a stretch target, not a promise.
- `site/index.html` + `site/ar.html` + `site/styles.css` — a static FR/AR (RTL) landing page for Youssef's own agency. Ships full of `[BRACKET]` placeholders (name, WhatsApp, email, city) and a visible draft banner — **not meant to be published as-is**.
- `demos/index.html` — one index page linking every wave-1 (and listing wave-2) product with its folder, run command and local URL, for walking a prospect through live examples.

## Run it locally

```bash
npm install
npm run serve     # http://localhost:3700 -> redirects to /site/ (agency page)
```

The server only exposes `site/`, `demos/` and `docs/` from this repo, plus a
read-only `/sitekit/` alias onto `../site-kit/dist` (so the demo links on the
landing page and in `demos/index.html` work). Build `site-kit` first if those
links 404:

```bash
cd ../site-kit && npm install && npm run build
```

## Verify

```bash
npm run check    # HTML validity (html-validate) + WCAG contrast of every CSS token/literal pair
npm run shots     # real headless Chrome (playwright-core): 375/1280 screenshots, overflow + computed-contrast checks, RTL, keyboard (skip link), site-kit demo links, path-traversal guard
```

Both are green as of the last run in this repo. `npm run shots` needs system
Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`.

## Before using this for real outreach

- Replace every `[BRACKET]` in `site/index.html` / `site/ar.html` (agency name, WhatsApp, email, city, year, legal status).
- Have a native Arabic speaker proofread the AR site copy and outreach templates.
- Have a Moroccan lawyer review `docs/05-service-contract-template.md` before sending it to a real client.
- Verify real domain/hosting prices (`docs/06-domain-hosting-costs.md` is estimates, explicitly unverified).
- Decide and fill in the WhatsApp number before pointing any `wa.me` link at it.

## Deploy

Not deployed by this kit. If Youssef wants the agency landing page public, it
is static HTML/CSS — any static host (GitHub Pages, Cloudflare Pages, Netlify)
works, same as a `site-kit` template. No environment variables are required
(`.env.example` only documents the optional local `PORT`).

## Honesty rules baked into this kit

No fake testimonials, invented client names, or made-up numbers appear
anywhere in `docs/` or `site/` — every doc that could tempt it explicitly
tells Youssef not to. The four `site-kit` templates linked from the demo
pages are labelled as fictional sample businesses, not real clients.
