# stat-reveal template

Screen **3.9 · Stat reveal** (s-39). **Locked** · hi-fi settled.

Centred hero + downward weight chart + Continue. Layout E. No nav chrome. Trustpilot in footer dock.

## Gallery

Templates tab: [`gallery.html#stat-reveal`](../gallery.html#stat-reveal) · instance **s-39 · Stat reveal**

Split proto (click between 3.9 → 3.10): [`boards/reveal-split-play.html`](../../boards/reveal-split-play.html)

## Motion · locked

**Variant:** `statFadeHold` · soft fade + rise cascade. Elements stay put after landing (no shrink, hide, or reposition).

Engine: [`frames/shared/reveal-motion-engine.js`](../shared/reveal-motion-engine.js)

## Components

| Include | Role |
|---------|------|
| `{{> weight-chart}}` | Downward 12-month trajectory SVG |
| Footer CTA | `input-cta` · animated via motion engine |

## Layout

| Zone | Content |
|------|---------|
| Chrome | None (no nav bar) |
| Scroll | Eyebrow → lead → stat → full-bleed chart |
| Footer dock | Continue CTA → Trustpilot |

## Spacing (gallery tuner)

| Gap | Default | Between |
|-----|---------|---------|
| `chrome-headline` | lg | Nav → eyebrow |
| `eyebrow-lead` | sm | Eyebrow → lead |
| `lead-stat` | xs | Lead → stat block |
| `stat-chart` | md | Stat → chart |
| `content-footer` | lg | Chart → footer CTA |
| `cta-trust` | xs | CTA → Trustpilot |
| `trust-bottom` | md | Trustpilot → bottom safe area |

## Hydration

See [`schema.json`](schema.json). Copy: [`hydrations/stat-reveal.json`](hydrations/stat-reveal.json).

```bash
python3 scripts/hydrate-quiz-frames.py --only s-39
```
