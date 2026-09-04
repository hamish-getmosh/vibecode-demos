# entry-hook template

Act 1 entry landing (s-11). Concept **B · Full-bleed hero** from [`boards/entry-hook-concepts.html`](../../../boards/entry-hook-concepts.html).

## Gallery

Templates tab: [`gallery.html#entry-hook`](../gallery.html#entry-hook) · instance **s-11 · Entry hook**

## Layout

| Zone | Content |
|------|---------|
| Chrome | Brand bar (logo + EN) · no nav pills |
| Hero | Full-bleed gradient wash + centred figure (photo replaces SVG in Framer) |
| Scroll | Headline + subhead |
| Footer dock | CTA → Trustpilot (Layout B) |

## Components

| Include | Source |
|---------|--------|
| `{{> question}}` | Pulled · `Quiz/Quiz Headline` |
| CTA | Pulled · `Quiz/Quiz CTA` |
| Trustpilot | Pulled embed |

## Hydrate

```bash
python3 scripts/hydrate-quiz-frames.py
```
