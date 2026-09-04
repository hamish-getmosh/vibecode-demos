# Hi-fi override map · 002

Which mixboard frames use hi-fi vs lofi. Source manifest: [`screens.json`](../screens.json).

## Settled hi-fi

| Screen | ID | Hi-fi source | Template |
|--------|-----|--------------|----------|
| Entry hook | s-11 | `frames/built/s-11.html` | entry-hook |
| Check-in roadmap | s-21 | `frames/built/s-21.html` | intro |
| Gender | s-22 | `frames/built/s-22.html` | radio |
| Height | s-23 | `frames/built/s-23.html` | numeric-input |
| Weight | s-24 | `frames/built/s-24.html` | numeric-input |
| BMI passed | s-32 | `frames/built/s-32.html` | eligible |
| Not eligible | s-fail | `frames/built/s-fail.html` | decline |
| Checking eligibility | s-31 | `frames/built/s-31.html` | loader |
| Adding it up | s-38 | `frames/built/s-38.html` | loader |
| Stat reveal | s-39 | `frames/built/s-39.html` | stat-reveal |
| 300g reframe | s-310 | `frames/built/s-310.html` | reframe |
| Health profile | s-41 | `frames/built/s-41.html` | profile |
| Why GLP-1 may fit you | s-42 | `frames/built/s-42.html` | fit |
| What Moshy does | s-43 | `frames/built/s-43.html` | programme |
| You're in safe hands | s-44 | `frames/built/s-44.html` | trust |

Hydration JSON lives under [`frames/templates/`](../frames/templates/). Regenerate built files with `python3 scripts/hydrate-quiz-frames.py` from repo root.

Gallery (all built frames): [`frames/gallery.html`](../frames/gallery.html)

Motion engine (shared): [`frames/shared/reveal-motion-engine.js`](../frames/shared/reveal-motion-engine.js). Split proto: [`boards/reveal-split-play.html`](../boards/reveal-split-play.html).

Legacy multi-frame board [`boards/hifi/act-01-invest-personalise.html`](../boards/hifi/act-01-invest-personalise.html) is reference-only; do not edit for production hi-fi.

## Reference only (not 1:1 override)

Deprecated layout board [`boards/hifi/act-01-invest-personalise.html`](../boards/hifi/act-01-invest-personalise.html) — use templates gallery instead.

## Explicitly lofi (not settled)

| Screen | ID | Reason |
|--------|-----|--------|
| Act 3 dynamic + Act 4 book | s-45 … s-55 | Not yet hi-fi'd |
| Female gate | s-22b | Radio template exists; mixboard may differ |

## Known mismatch

Act 2 hi-fi mixboard order: why we ask → gender → height → weight → **age** → loader.

Locked lofi flow: roadmap → gender → female gate → height → weight → **health conditions** → eligibility loader → BMI win.

Do not force-merge. Hi-fi overrides apply only where screen purpose matches.
