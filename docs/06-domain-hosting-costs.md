# Domain + hosting costs in Morocco

> **Everything below is an ESTIMATE from general knowledge, not checked live.** I could not verify any current price or registration rule while building this kit. Before quoting a client, open the registrar's page and write down the real price and date. Prices change and are often promotional in year one, more expensive at renewal.

## Domain names (per year, renewal price matters most)

| Type | Typical range (estimate) | Notes to verify |
|---|---|---|
| `.com` at an international registrar | about 100 to 180 MAD | Check the **renewal** price, not year-one promo. Payment usually needs an international card or PayPal: check that the card you use works. |
| `.ma` via a Moroccan registrar/reseller | about 250 to 500 MAD (very uncertain) | Verify: current price, required documents (business proof? ID?), who the registrant is, how long it takes, how to transfer it. Rules differ by registrar. |
| `.co.ma`, `.net.ma` etc. | similar to or lower than `.ma` (uncertain) | Verify eligibility. |
| `.shop`, `.online`, other new endings | often very cheap in year one, much higher at renewal | Not recommended for a local business; customers trust `.ma` / `.com`. |

Advice (my opinion, not a fact): put the domain in the **client's name** so it is never held hostage, and keep the login in the delivery sheet.

## Hosting for the static sites made with site-kit

| Option | Cost (estimate) | Notes |
|---|---|---|
| GitHub Pages | free tier | Public repo on free plans; custom domain supported. Verify current limits. |
| Cloudflare Pages | free tier | Custom domain supported; DNS can also be moved to Cloudflare. Verify current limits. |
| Netlify free tier | free tier | Verify current limits. |
| Moroccan shared hosting (cPanel) | about 300 to 800 MAD per year (very uncertain) | Useful if the client already has one. Upload the `dist/<template>/` folder. Not needed otherwise. |
| VPS (for booking-page / qr-menu, which need a Node server + disk) | about 40 to 120 MAD per month for a small one (rough) | Needed only for the Sur mesure tier. Verify provider prices and payment methods. |

## Other costs to keep in mind

| Item | Estimate | Note |
|---|---|---|
| Business email on the domain | 0 (forward to Gmail) to a few dozen MAD per month | Skip unless asked. |
| Google Business profile | free | Needs phone or postcard verification: plan a few days. |
| WhatsApp Business app | free | Client should install it and use the business number. |
| Your own domain for the agency | about 100 to 180 MAD per year | One-time decision. |

## A sample quote (illustration, with estimates)

Vitrine for a barber: setup 1,500 MAD + `.com` domain about 150 MAD per year (estimate, at cost) + hosting 0 (static free tier) + care 49 MAD per month. First-year total to the client is roughly 1,500 + 150 + 588 = about 2,240 MAD if they take the care plan. Replace with real numbers before showing it.

## Verification checklist (do once before your first quote)

- [ ] Real `.com` and `.ma` price, including renewal, on two registrars (date: ____ )
- [ ] `.ma` requirements written down
- [ ] Payment methods that actually work for you
- [ ] Current free-tier terms of the static host you will use
- [ ] How a domain is transferred to the client (steps and cost)
