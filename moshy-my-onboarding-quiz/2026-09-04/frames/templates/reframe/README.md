# reframe template

Screen **3.10 · 300g reframe** (s-310). Left-aligned pace reframe with day OR week pills. Layout F. No Trustpilot.

## Gallery

Templates tab: [`gallery.html#reframe`](../gallery.html#reframe) · instance **s-310 · 300g reframe**

Split proto: [`boards/reveal-split-play.html#reframe`](../../boards/reveal-split-play.html#reframe)

## Motion · locked

**Variant:** `reframeFadeHold` · same fade-rise character as stat reveal. Bridge → pills → body → CTA.

Engine: [`frames/shared/reveal-motion-engine.js`](../shared/reveal-motion-engine.js)

## Components

| Include | Role |
|---------|------|
| `{{> pace-pills}}` | ~40 g/day **or** ~300 g/week pills |
| Footer CTA | Primary action (e.g. How it works →) |

## Copy · candid honest

Numbers derive from 14 kg over 12 months (~40 g/day ≈ 300 g/week). Body copy acknowledges week-to-week variation.

## Layout

| Zone | Content |
|------|---------|
| Chrome | Back visible + progress pills |
| Scroll | Bridge headline/sub → pace pills → body → disclaimer |
| Footer dock | Primary CTA |

## Spacing (gallery tuner)

| Gap | Default | Between |
|-----|---------|---------|
| `chrome-headline` | lg | Nav → bridge |
| `bridge-pill` | md | Bridge → pills |
| `pill-body` | md | Pills → body |
| `body-note` | sm | Body → disclaimer |
| `content-footer` | lg | Content → footer CTA |

## Hydration

See [`schema.json`](schema.json). Copy: [`hydrations/pace-reframe.json`](hydrations/pace-reframe.json).

```bash
python3 scripts/hydrate-quiz-frames.py --only s-310
```
