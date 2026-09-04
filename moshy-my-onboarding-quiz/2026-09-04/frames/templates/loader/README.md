# loader template

Centred calculation screen: headline + subhead (via `question` component), and animated checklist steps (via `loader-stack` component). No Trustpilot footer.

## Components

| Include | Source |
|---------|--------|
| `{{> question}}` | Framer native headline |
| `{{> loader-stack}}` | Step array + timing; row chrome from pulled `loader-step` CSS |

After native styling in Framer:

```bash
./scripts/pull-and-sync-loader-row.sh
python3 scripts/hydrate-quiz-frames.py
```

## Layout

| Zone | Content |
|------|---------|
| Chrome | None (focused full-screen loader) |
| Content | Centred question block → spacing gap → loader stack |
| Footer | None |

Row states: **waiting** · **loading** (spinner left) · **complete** (tick).

Spacing: one `subhead-content` gap between subhead and step list (locked at 3xl / 60px).

## Hydration fields

| Field | Required | Notes |
|-------|----------|-------|
| `headline` | Yes | Main centred heading |
| `subhead` | No | Supporting copy; shown when `showSubhead` is true (default true) |
| `steps` | Yes | `{ "label", "durationMs"? }` per row |
| `defaultStepMs` | No | Fallback duration (default 950) |
| `pauseAfterCompleteMs` | No | Loop pause (default 1500) |
| `trustpilot` | No | Default `false` |

## Instances

| Screen | Hydration |
|--------|-----------|
| s-31 · Checking eligibility | `hydrations/checking-eligibility.json` |
| s-38 · Adding it up | `hydrations/adding-it-up.json` |
