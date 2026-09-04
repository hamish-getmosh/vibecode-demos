# Screen templates · 002

Living list of screen template names for **hi-fi design**. Grows as we work through screens together. Lofi mixboard frames stay `template: null` until categorised.

**Rules:** See [`quiz-layout-rules.md`](quiz-layout-rules.md) for spacing and Trustpilot placement. For **Framer guts slot** step frames and component masters, see [`methods/quiz-guts-slot-templates.md`](../../../methods/quiz-guts-slot-templates.md).

## Assigned

| Template | Hi-fi source | Used on |
|----------|-----------------|---------|
| `entry-hook` | `frames/built/s-11.html` | s-11 entry hook · concept B full-bleed hero |
| `intro` | `frames/built/s-21.html` | s-21 check-in roadmap |
| `radio` | `frames/built/s-22.html` | s-22 gender |
| `multi-select` | `frames/built/s-25.html` | s-25 health conditions |
| `numeric-input` | `frames/built/s-23.html`, `s-24.html` | s-23 height, s-24 weight |
| `loader` | `frames/built/s-31.html`, `s-38.html` | s-31 checking eligibility, s-38 adding it up |
| `stat-reveal` | `frames/built/s-39.html` | s-39 stat reveal · **locked** motion `statFadeHold` |
| `reframe` | `frames/built/s-310.html` | s-310 300g reframe · **locked** motion `reframeFadeHold` |
| `eligible` | `frames/built/s-32.html` | s-32 BMI passed |
| `decline` | `frames/built/s-fail.html` | s-fail Not eligible · **locked** |
| `profile` | `frames/built/s-41.html` | s-41 health profile |
| `fit` | `frames/built/s-42.html` | s-42 why GLP-1 may fit you · concept C |
| `programme` | `frames/built/s-43.html` | s-43 what Moshy does |
| `trust` | `frames/built/s-44.html` | s-44 safe hands · D3 bridge cascade · **locked** motion |

Built frames: [`frames/`](../frames/). Hydrate with `python3 scripts/hydrate-quiz-frames.py`.

## Not yet assigned

Remaining lofi screens in [`screens.json`](../screens.json) — e.g. s-45 consult bridge, Act 4 book steps. Add rows here when we hi-fi them.
