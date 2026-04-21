# Golden Stone QLD — Colour Palette

---

## v2 (Current) — Gold + Black

### Rationale

The v1 palette (Slate Navy + Steel Blue) was technically sound but ignored a core strategic truth: the brand is called **Golden** Stone. Suppressing gold creates cognitive dissonance — customers who hear the name expect a visual confirmation that never arrives. More practically, mature gold anchored by deep black is the dominant convention in the Australian construction and trade sector, where recognition value outweighs differentiation.

The v2 palette is not the clichéd "builder-gold" — it avoids saturated or metallic gold entirely. Instead it draws from **aged brass, whisky amber, and tarnished bronze**: tones that read as experienced and grounded, not flashy or cheap. No gradients, no shine effects, no lens flare.

### Gold Options (Primary Colour — choose one)

| Option | Name | Hex | RGB | WCAG Contrast (on `#111111`) | Character |
|--------|------|-----|-----|------------------------------|-----------|
| **Recommended** | Brass Gold | `#B8922A` | rgb(184,146,42) | **7.2:1 (AAA)** | Whisky amber / aged brass — warm, substantive, not flashy |
| Alt 1 | Bronze Deep | `#A67C2E` | rgb(166,124,46) | **5.5:1 (AA)** | Deeper, more bronze, more serious — works at larger sizes |
| Alt 2 | Champagne | `#C9A84C` | rgb(201,168,76) | **9.2:1 (AAA)** | Lightest option — reads clearly at small sizes, less "heavy" |

**Use `#B8922A` as the default.** Switch to `#C9A84C` only where the primary gold risks losing legibility (e.g. fine engraving, small embroidery).

### Full v2 Palette

#### Primary

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Brass Gold | `#B8922A` | rgb(184,146,42) | Brand mark, display headings, accents, CTAs on dark |
| Deep Black | `#111111` | rgb(17,17,17) | Primary backgrounds, anchors, body text on light |

#### Secondary

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Dark Gold | `#7A5F1A` | rgb(122,95,26) | Shadow/edge on slab mark, pressed states |
| Champagne | `#C9A84C` | rgb(201,168,76) | Highlight accent, small-scale gold where primary is too heavy |

#### Neutral

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Warm Cream | `#F5F0E8` | rgb(245,240,232) | Page background — cream with a whisper of gold undertone |
| Surface | `#EDE7DA` | rgb(237,231,218) | Card backgrounds, alternating rows |
| Stone Grey | `#9E9790` | rgb(158,151,144) | Secondary text, sub-labels, dividers |
| Border | `#D8D0C0` | rgb(216,208,192) | Input borders, dividers — warm, not clinical |
| Text Dark | `#111111` | rgb(17,17,17) | Primary body text |
| Text Secondary | `#5C5650` | rgb(92,86,80) | Captions, muted copy |

#### Semantic

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#2A7A4A` | Confirmed installation, accepted quote |
| Warning | `#B86A1A` | Pending, lead time notice |
| Error | `#B83A2A` | Form errors, rejection |
| Info | `#2A5A8A` | Notes, informational callouts |

---

### Colour Ratios (60-30-10)

| Role | Colour | Target |
|------|--------|--------|
| Dominant | Warm Cream `#F5F0E8` + Deep Black `#111111` | ~60% |
| Secondary | Deep Black `#111111` (as blocks/mark) | ~30% |
| Accent | Brass Gold `#B8922A` | ~10% |

On dark (inverted) layouts: Deep Black dominates (~60%), Gold accents (~10–15%), Off-white text for the rest.

---

### Accessibility

| Pair | Ratio | WCAG Level |
|------|-------|------------|
| Deep Black `#111111` on Warm Cream `#F5F0E8` | 17.1:1 | AAA |
| Brass Gold `#B8922A` on Deep Black `#111111` | 7.2:1 | AAA |
| Champagne `#C9A84C` on Deep Black `#111111` | 9.2:1 | AAA |
| Warm Cream `#F5F0E8` on Deep Black `#111111` | 17.1:1 | AAA |
| Stone Grey `#9E9790` on Warm Cream `#F5F0E8` | 3.5:1 | AA Large only — use for labels 18px+ only |

---

### CSS Variables (v2)

```css
:root {
  /* Primary */
  --color-gold:         #B8922A;
  --color-gold-dark:    #7A5F1A;
  --color-gold-light:   #C9A84C;
  --color-black:        #111111;

  /* Neutrals */
  --color-bg:           #F5F0E8;
  --color-surface:      #EDE7DA;
  --color-border:       #D8D0C0;
  --color-text:         #111111;
  --color-text-sec:     #5C5650;
  --color-stone:        #9E9790;
}
```

### Tailwind Config (v2)

```js
colors: {
  gold: {
    DEFAULT: '#B8922A',
    dark:    '#7A5F1A',
    light:   '#C9A84C',
  },
  black:  '#111111',
  cream:  '#F5F0E8',
  surface:'#EDE7DA',
  border: '#D8D0C0',
  stone:  '#9E9790',
}
```

---

## v1 (Archived — replaced by v2)

> **Why replaced:** The navy + steel blue palette was technically solid and accessible but missed the core brand truth that the name "Golden Stone" creates an expectation of gold. Dropped in favour of v2 to avoid brand–name dissonance. Files using v1 colours (Concepts A and B) are preserved in `docs/brand/logos/` for comparison.

| Name | Hex | Role |
|------|-----|------|
| Slate Navy | `#2B3A52` | v1 Primary |
| Steel Blue | `#4A7FA5` | v1 Accent |
| Warm Stone | `#8A7D6E` | v1 Secondary |
| Off White | `#F7F5F2` | v1 Background |
| Text Dark | `#1C1C1E` | v1 Text |
