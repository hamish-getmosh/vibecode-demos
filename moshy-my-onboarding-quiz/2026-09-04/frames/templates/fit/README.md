# fit template

Act 3 dynamic fit screen (s-42). **Concept C · full-bleed hero** + 3 arrow bullets.

Concepts board: [`boards/fit-concepts.html`](../../../boards/fit-concepts.html) · selected **C**

## Layout

| Zone | Content |
|------|---------|
| Chrome | Nav bar + progress pills |
| Hero | Full-bleed gradient wash + centred figure (photo in Framer) |
| Scroll | Headline + subhead → 3 blue-arrow bullets → disclaimer |
| Footer dock | CTA → Trustpilot |

## Dynamic copy

Runtime: `resolveFitBullets()` from [`frames/lib/fit-bullets-core.mjs`](../../lib/fit-bullets-core.mjs).  
Matrix: [`docs/s-42-content-matrix.json`](../../../docs/s-42-content-matrix.json).

Default hydration (`why-glp-fit.json`) uses **max-female** persona bullets for gallery preview.

## Hydrate

```bash
python3 scripts/hydrate-quiz-frames.py --only s-42
```

Gallery: [`gallery.html#fit`](../gallery.html#fit)
