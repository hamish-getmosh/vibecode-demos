# programme template

Act 3 programme stack screen (s-43). Fixed footer dock + Trustpilot (Layout B).

## Gallery

Templates tab: [`gallery.html#programme`](../gallery.html#programme) · instance **s-43 · What Moshy does**

## Components

| Include | Source |
|---------|--------|
| `{{> question}}` | Pulled · `Quiz/Quiz Headline` |
| Programme cards | Template CSS · `programme-card` |
| CTA | Pulled · `Quiz/Quiz CTA` |
| Trustpilot | Pulled embed |

## Layout

| Zone | Content |
|------|---------|
| Chrome | Nav bar + progress pills |
| Scroll | Question block → three benefit cards → doctor disclaimer callout |
| Footer dock | CTA → Trustpilot |

No page eyebrow. No side timeline rail.

## Hydrate

```bash
python3 scripts/hydrate-quiz-frames.py
```
