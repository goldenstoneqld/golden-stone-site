# Golden Stone QLD — Typography

## Font Stack

| Role | Font | Weights | Source |
|------|------|---------|--------|
| Display / Headings | **Barlow Semi Condensed** | 600, 700 | Google Fonts |
| Body / UI | **DM Sans** | 400, 500 | Google Fonts |

### Rationale

**Barlow Semi Condensed** is a modern, geometric condensed sans-serif. It carries authority and presence without feeling luxury or rustic — it reads like a professional trade company, not a boutique. The condensed proportion allows strong typographic hierarchy in tight spaces (quotes, banners, vehicle graphics).

**DM Sans** is clean, friendly, and highly legible at small sizes. It bridges the B2B (clear, efficient) and B2C (approachable, plain English) tone simultaneously.

---

## Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

```css
--font-display: 'Barlow Semi Condensed', 'Arial Narrow', Arial, sans-serif;
--font-body:    'DM Sans', 'Helvetica Neue', Arial, sans-serif;
```

---

## Type Scale

Base: 16px | Scale ratio: 1.25 (Major Third)

| Element | Font | Weight | Desktop | Mobile | Line Height | Letter Spacing |
|---------|------|--------|---------|--------|-------------|----------------|
| Hero / Display | Barlow Semi Condensed | 700 | 52px | 36px | 1.1 | -0.02em |
| H1 | Barlow Semi Condensed | 700 | 42px | 30px | 1.15 | -0.01em |
| H2 | Barlow Semi Condensed | 700 | 34px | 26px | 1.2 | 0 |
| H3 | Barlow Semi Condensed | 600 | 26px | 22px | 1.25 | 0 |
| H4 | Barlow Semi Condensed | 600 | 20px | 18px | 1.3 | 0 |
| Body Large | DM Sans | 400 | 18px | 17px | 1.65 | 0 |
| Body | DM Sans | 400 | 16px | 16px | 1.6 | 0 |
| Body Small | DM Sans | 400 | 14px | 14px | 1.5 | 0 |
| Label / All-caps | DM Sans | 500 | 11px | 11px | 1.4 | 0.08em |
| Caption | DM Sans | 400 | 12px | 12px | 1.4 | 0 |

---

## Usage Examples

### Headings
```
GOLDEN STONE QLD                        ← Barlow Semi Condensed 700, 42px, UPPERCASE
Kitchen Benchtops in Natural Stone      ← Barlow Semi Condensed 700, 34px, Title Case
Installed on Time. Every Time.          ← Barlow Semi Condensed 600, 26px
```

### Body (B2B context)
```
We supply cut-and-polish benchtop services to joineries across South-East Queensland.
Fast turnaround, competitive rates, and consistent quality on every job.
```
→ DM Sans 400, 16px, #1C1C1E on #F7F5F2

### Body (B2C context)
```
Get a free measure and quote within 24 hours. We'll handle everything from material
selection through to installation — no fuss.
```
→ DM Sans 400, 16px, #1C1C1E on #F7F5F2

### Label / Sub-heading
```
STONE MASONRY · QLD          ← DM Sans 500, 11px, letter-spacing 0.08em, #8A7D6E
REQUEST A QUOTE              ← DM Sans 500, 11px, letter-spacing 0.08em, uppercase
```

---

## CSS Implementation

```css
/* Font families */
--font-display: 'Barlow Semi Condensed', 'Arial Narrow', Arial, sans-serif;
--font-body:    'DM Sans', 'Helvetica Neue', Arial, sans-serif;

/* Scale */
--text-xs:    0.75rem;   /* 12px */
--text-sm:    0.875rem;  /* 14px */
--text-base:  1rem;      /* 16px */
--text-lg:    1.125rem;  /* 18px */
--text-xl:    1.25rem;   /* 20px */
--text-2xl:   1.625rem;  /* 26px */
--text-3xl:   2.125rem;  /* 34px */
--text-4xl:   2.625rem;  /* 42px */
--text-hero:  3.25rem;   /* 52px */

/* Weights */
--font-regular:  400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
```

## Tailwind Config

```js
fontFamily: {
  display: ['Barlow Semi Condensed', 'Arial Narrow', 'Arial', 'sans-serif'],
  body:    ['DM Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
},
```

---

## Pairing Don'ts

- Don't use Barlow Semi Condensed for body text (too condensed for long reads)
- Don't use DM Sans for hero headings without sufficient size (loses impact)
- Don't use italic in headings — the brand voice is direct, not decorative
- Don't mix a third display font — the pairing is the system
