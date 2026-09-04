# Components · 002 quiz frames

Reusable atoms and molecules extracted from templates. **Visual styling for Framer-linked components is pulled one-way from Framer**; edit appearance there, then pull. Copy and layout slots stay in git hydrations.

## Framer-first styling (linked components)

Registry: [`framer/inventory/quiz-components.json`](../../../../framer/inventory/quiz-components.json)

| Step | Action |
|------|--------|
| Edit look | Framer branch `new-quiz` → `Quiz/Component Lab` → edit component definition (not a new duplicate) |
| Pull (canvas) | `./scripts/pull-quiz-component.sh cta-primary` |
| Pull (code) | `./scripts/pull-all-code.sh` (e.g. `QuizRadioStack.tsx`) |
| Rebuild | `python3 scripts/hydrate-quiz-frames.py` |
| Review | Components gallery tab (refresh in place) |

| Component | Framer type | Pull command |
|-----------|-------------|--------------|
| `cta-primary` | Native canvas (`Yf0P638Mj`) | `pull-quiz-component.sh cta-primary` |
| `radio-stack` | Code (`QuizRadioStack.tsx` · `C6kFUEl`) | `pull-all-code.sh` |
| `question` | Native canvas (`riceymdsf` · Quiz/Quiz Headline) | `pull-quiz-component.sh question` |
| `trustpilot-row` | Embed (`5jo1wtkgIZb38X2KsI6D` · Trustpilot Badge) | `pull-quiz-component.sh trustpilot-row` |
| `legal-fine` | Native preview node (`wsFJGhnNs` · legal copy + link styles) | `pull-quiz-component.sh legal-fine` |
| `numeric-input` | Framer `Quiz/Quiz Numeric Input` (`vgu7wKkk7`) | Pull via `./scripts/pull-quiz-component.sh numeric-input`; local HTML mirrors Framer structure (unit wrap, cluster) |
| `loader-step` | Native canvas (`QWRRBVGty` · Quiz/Quiz Loader Step) | `pull-and-sync-loader-row.sh` |
| `loader-stack` | Code (`QuizLoaderStack.tsx` · `KND7sAT`) | auto-synced via `pull-and-sync-loader-row.sh` |

Each pulled component writes:

- `component.css` (generated; do not hand-edit)
- `framer-source.json` (snapshot + Framer component ID)

## Gallery

| Surface | URL |
|---------|-----|
| **Components** | [`gallery.html`](gallery.html) |
| Templates | [`../gallery.html`](../gallery.html) |
| Flow | [`../../boards/mixboard.html`](../../boards/mixboard.html) |

```bash
python3 scripts/preview_quizzes.py ensure
# http://127.0.0.1:8777/002_onboarding-value-stack/frames/components/gallery.html
```

Horizontal row of interactive preview cards (wraps vertically). Each card: title row, config row, then a **390px white preview pane** with 32px padding. Components render **inline** with the same hi-fi CSS as `built/s-*.html` (no phone-frame iframe).

## Tiers

| Tier | Rule | Examples |
|------|------|----------|
| **1 · Base** | Edit here to change everywhere | `question`, `radio-stack`, `cta-primary`, `trustpilot-row`, `legal-fine`, `numeric-input`, `loader-step`, `loader-stack`, `elig-pass`, `elig-checklist` |
| **2 · Composite** | Includes base components; CTA/Trustpilot locked inside | `numeric-input-dock` |

Composite internal spacing is component-owned (CSS in `component.css`). Template `.spacing-block[data-gap]` is for **between** layout slots only.

## Folder shape

```text
components/
├── gallery.html
├── gallery.css
├── gallery.js
├── components.manifest.json
├── cta-primary/
│   ├── component.html
│   ├── component.css          ← generated from Framer
│   ├── framer-source.json     ← pull snapshot + component ID
│   ├── preview.html
│   └── states.json
├── question/
│   ├── component.html
│   ├── preview.html
│   ├── preview.js
│   └── states.json
├── numeric-input-dock/
│   └── …
└── …
```

## Includes in templates

Hydrate resolves `{{> component-id}}` from `component.html` before token substitution:

```html
{{> cta-primary}}
{{> numeric-input-dock}}
```

Shared footer stack (Trustpilot + optional legal) is injected as `{{footerTrustLegal}}` from the hydrate script.

## Legal toggle

Hydration JSON on any Trustpilot template:

```json
"legal": true
```

Legal always renders **after Trustpilot, before bottom safe area**. Radio: in `.page-footer`. Numeric: tail of `numeric-input-dock` above the numpad.

See [`docs/atomic-ladder.md`](../docs/atomic-ladder.md).
