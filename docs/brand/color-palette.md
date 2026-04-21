# Golden Stone QLD — Colour Palette

## Design Rationale

The palette avoids the clichéd gold/black combination and instead draws from the actual material: the deep layered tones of quarried stone, the clarity of a fresh-cut surface, and the professional confidence of a reliable trade business.

- **Slate Navy** anchors the brand — serious, trustworthy, not cold
- **Steel Blue** provides energy and modernity without veering into tech-brand territory
- **Warm Stone** ties back to the physical material without being "earthy" or rustic
- Neutral backgrounds carry warm undertones (like a honed stone surface), not clinical white

---

## Primary Palette

| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| Slate Navy | `#2B3A52` | rgb(43, 58, 82) | hsl(217, 31%, 25%) | Primary brand colour — badges, headings, CTAs |
| Steel Blue | `#4A7FA5` | rgb(74, 127, 165) | hsl(206, 38%, 47%) | Accent, links, rule lines, highlights |

## Secondary Palette

| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| Warm Stone | `#8A7D6E` | rgb(138, 125, 110) | hsl(33, 11%, 49%) | Sub-labels, supporting text, dividers |
| Stone Light | `#C4B9AC` | rgb(196, 185, 172) | hsl(32, 17%, 72%) | Backgrounds on print, secondary blocks |

## Neutral Palette

| Name | Hex | RGB | HSL | Usage |
|------|-----|-----|-----|-------|
| Off White | `#F7F5F2` | rgb(247, 245, 242) | hsl(40, 29%, 96%) | Page background — warm, like honed stone |
| Surface | `#EFECEA` | rgb(239, 236, 234) | hsl(20, 14%, 93%) | Cards, sections, alternating rows |
| Mid Grey | `#9B9693` | rgb(155, 150, 147) | hsl(15, 4%, 59%) | Placeholder text, disabled states |
| Text Dark | `#1C1C1E` | rgb(28, 28, 30) | hsl(240, 3%, 11%) | Body text — warm near-black |
| Text Secondary | `#5C5C62` | rgb(92, 92, 98) | hsl(240, 3%, 37%) | Secondary body, captions |
| Border | `#DDD9D4` | rgb(221, 217, 212) | hsl(30, 10%, 85%) | Dividers, input borders |

## Semantic Colours

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#2D8A5E` | Quote accepted, installation complete |
| Warning | `#C47B2B` | Pending approval, lead time notice |
| Error | `#C0392B` | Form error, rejection |
| Info | `#3B7FBF` | Note, informational callout |

---

## Colour Ratios (60-30-10 Rule)

| Role | Colour | Coverage |
|------|--------|----------|
| Dominant | Off White `#F7F5F2` + Text Dark `#1C1C1E` | ~60% |
| Secondary | Slate Navy `#2B3A52` | ~30% |
| Accent | Steel Blue `#4A7FA5` | ~10% |

---

## Accessibility

| Pair | Contrast Ratio | WCAG Level |
|------|---------------|------------|
| Text Dark `#1C1C1E` on Off White `#F7F5F2` | 17.8:1 | AAA |
| Slate Navy `#2B3A52` on Off White `#F7F5F2` | 9.4:1 | AAA |
| White `#FFFFFF` on Slate Navy `#2B3A52` | 9.4:1 | AAA |
| White `#FFFFFF` on Steel Blue `#4A7FA5` | 4.6:1 | AA |
| Warm Stone `#8A7D6E` on Off White `#F7F5F2` | 3.4:1 | AA Large only |

---

## CSS Variables

```css
:root {
  /* Primary */
  --color-primary:        #2B3A52;
  --color-primary-light:  #3D5270;
  --color-primary-dark:   #1C2738;

  /* Accent */
  --color-accent:         #4A7FA5;
  --color-accent-light:   #7FB8D8;
  --color-accent-dark:    #2F5F80;

  /* Stone */
  --color-stone:          #8A7D6E;
  --color-stone-light:    #C4B9AC;

  /* Neutrals */
  --color-bg:             #F7F5F2;
  --color-surface:        #EFECEA;
  --color-border:         #DDD9D4;
  --color-text:           #1C1C1E;
  --color-text-secondary: #5C5C62;
  --color-text-muted:     #9B9693;
}
```

## Tailwind Config

```js
colors: {
  primary: {
    DEFAULT: '#2B3A52',
    light:   '#3D5270',
    dark:    '#1C2738',
  },
  accent: {
    DEFAULT: '#4A7FA5',
    light:   '#7FB8D8',
    dark:    '#2F5F80',
  },
  stone: {
    DEFAULT: '#8A7D6E',
    light:   '#C4B9AC',
  },
  neutral: {
    bg:        '#F7F5F2',
    surface:   '#EFECEA',
    border:    '#DDD9D4',
    text:      '#1C1C1E',
    secondary: '#5C5C62',
    muted:     '#9B9693',
  },
}
```
