# Golden Stone — Project Context for Claude Code

## What this project is

Institutional website for Golden Stone, a stonemason business in 
Brisbane, QLD, Australia. Static HTML + CSS + minimal JS. Deployed 
to GitHub Pages. Domain: goldenstoneqld.com.au.

## Tech stack

- Pure HTML5 + CSS (vanilla, no frameworks)
- Vanilla JavaScript for interactions
- No build step
- No npm dependencies
- Mobile-first responsive

## Repository structure

- `index.html` — Home page (root)
- `src/styles/tokens.css` — Design tokens (colours, typography, spacing)
- `src/styles/reset.css` — CSS reset
- `src/styles/base.css` — Base element styles
- `src/styles/components.css` — Reusable component classes (.btn, .card, .section, .nav, .footer)
- `src/styles/pages/home.css` — Home page specific styles
- `src/scripts/main.js` — Header scroll, mobile menu, fade-in animations
- `docs/brand/` — Brand book v2.0, colour palette, typography, logos
- `docs/design-system.html` — Design system reference page
- `public/images/suppliers/` — Supplier logo files (uploaded by user, never overwrite)

## Infrastructure

- **Hosting:** GitHub Pages (user site — `goldenstoneqld.github.io`)
- **Repository name:** `goldenstoneqld.github.io` (must match `<username>.github.io` for user site)
- **Custom domain:** `goldenstoneqld.com.au` (CNAME file at repo root — do not delete)
- **HTTPS:** Let's Encrypt certificate via GitHub Pages (automatic)
- **DNS provider:** Cloudflare (DNS only — proxy/orange cloud is OFF)
- **Domain registrar:** VentraIP (nameservers: `hunts.ns.cloudflare.com`, `veda.ns.cloudflare.com`)

### DNS records (Cloudflare)

| Type  | Name | Value                    | Proxy |
|-------|------|--------------------------|-------|
| A     | @    | 185.199.108.153          | Off   |
| A     | @    | 185.199.109.153          | Off   |
| A     | @    | 185.199.110.153          | Off   |
| A     | @    | 185.199.111.153          | Off   |
| CNAME | www  | goldenstoneqld.github.io | Off   |
| MX    | @    | smtp.google.com          | —     |
| TXT   | @    | google-site-verification | —     |

> **WARNING — Cloudflare proxy:** Do NOT enable the orange cloud on A/CNAME records without
> first setting SSL/TLS → "Full" (not "Flexible") in Cloudflare. Flexible mode causes redirect
> loops; the proxy caused 503 errors on CSS/JS/images during initial setup.

> **NOTE — GitHub Pages false negative:** The panel may show "DNS check unsuccessful —
> NotServedByPagesError" even when the site is live. This is a known GitHub cache delay
> (hours to days). https://goldenstoneqld.com.au is confirmed working. Do not try to fix
> this warning by deleting/recreating the CNAME file.

## Brand summary

- Tagline: "Crafted in Stone. Built to Last."
- Voice: Confident · Refined · Direct · Australian English
- Primary colour: #B8922A (Brass Gold)
- Anchor colour: #111111 (Deep Black)
- Background: #F5F0E8 (Warm Cream)
- Display font: Barlow Semi Condensed 700
- Body font: DM Sans 400/500
- Full reference: docs/brand/brand-book.md (v2.0)

## Company information

- ABN: 95 497 084 038
- Phone: 0459 604 470 (international: +61459604470)
- Email: sales@goldenstoneqld.com.au
- Office: 37 Donna Ave, Rochedale South QLD 4123
- Factory: 1819 Tarome Rd, Moorang QLD 4340
- Hours: Mon–Fri, 7:00 AM – 5:00 PM
- Service area: Brisbane · Gold Coast · Ipswich · Logan · Sunshine Coast · Toowoomba

## Trusted suppliers

Logo files in `public/images/suppliers/` (uploaded by user, do not overwrite):
- caesarstone.png    → https://www.caesarstone.com.au
- wk-stone.png       → https://www.wkstone.com.au
- ydl-stone.png      → https://www.ydlstone.com.au
- stone-ambassador.webp → https://www.stoneambassador.com.au
- better-stone.webp  → https://www.betterstone.com.au

## Working rules — IMPORTANT

1. **Always work on a new branch**, never commit directly to main.
2. **Always open a PR** at the end of each task.
3. **Verify state before acting**: run `git status`, `ls`, or read 
   files before assuming what's there. Do NOT assume based on memory 
   of previous sessions.
4. **Never overwrite user-uploaded files** (especially in 
   `public/images/`). If a file is missing, ASK before creating 
   placeholders.
5. **Use Australian English** in all user-facing copy and code 
   comments (colour, organise, centre, favourite).
6. **Use existing design tokens** from `src/styles/tokens.css` and 
   existing component classes from `src/styles/components.css`. 
   Don't reinvent.
7. **Verify on GitHub** that branches and PRs exist before reporting 
   completion.

## Commit message convention

- `feat(scope): description` — new feature
- `fix(scope): description` — bug fix
- `docs(scope): description` — documentation
- `chore(scope): description` — maintenance
- `style(scope): description` — formatting/CSS only
