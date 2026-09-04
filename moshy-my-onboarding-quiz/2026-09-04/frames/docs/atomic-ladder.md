# Atomic design ladder · 002 quiz frames

How we grow from small UI pieces to the full onboarding flow.

## Ladder (bottom → top)

```text
Framer (Quiz/Component Lab)   Visual SSOT — radius, fill, type, shadow
    ↓ pull-quiz-component.sh
components/                   Atoms & molecules (HTML snippets + pulled CSS)
    ↓ compose
templates/                    Screen layout types (radio, numeric-input, loader, eligible)
    ↓ hydrate
built/                        One HTML file per screen instance (s-22, s-23, …)
    ↓ embed
mixboard                      Full journey (lofi wires + hi-fi iframes)
    ↓ later
Framer pages                  Production quiz screens
```

| Layer | Tab / surface | What you review |
|-------|----------------|-----------------|
| **Components** | [`components/gallery.html`](../components/gallery.html) | Isolated controls in all states |
| **Templates** | [`gallery.html`](../gallery.html) | Layout type + hydrated instances per row |
| **Flow** | [`boards/mixboard.html`](../../boards/mixboard.html) | End-to-end journey, branches, lofi |

## Components (Phase 2 · built)

### Tier 1 · base

| ID | Used in | Notes |
|----|---------|-------|
| `question` | All question templates | **Framer-linked** (`riceymdsf` · Quiz/Quiz Headline); pull via `pull-quiz-component.sh question`. Hydration `showSubhead` (default `false`); multi-select subhead uses accent `#4d41f0` when shown |
| `radio-option` | `radio-stack` | Single option; icon slot |
| `radio-stack` | `radio` template | **Framer code** (`QuizRadioStack.tsx`); HTML gallery is static mirror |
| `cta-primary` | Numeric dock, intro (future) | **Framer-linked** (`Yf0P638Mj` · Quiz/Quiz CTA); pull via `pull-quiz-component.sh` |
| `trustpilot-row` | Radio footer, numeric dock | **Framer embed** (`5jo1wtkgIZb38X2KsI6D`); git mirror uses live Trustpilot Micro TrustScore widget + link-block overlay |
| `legal-fine` | Radio + numeric when `legal: true` | **Framer-linked** (`wsFJGhnNs`); body `var(--ink-muted)`, links `var(--ink)` (#312C62) |
| `numeric-input` | `numeric-input-dock`, numeric template | Framer native component on `new-quiz`; cm inline, four focus/value variants |
| `loader-step` | `loader` template | **Framer native** (`QWRRBVGty`); sync to stack via `pull-and-sync-loader-row.sh` |
| `loader-stack` | quiz pages (future) | **Framer code** (`QuizLoaderStack.tsx`); row look synced from native pull |
| `elig-pass` | `eligible` template | **Prototype** → native `Quiz/Quiz Elig Pass` on Component Lab |
| `elig-checklist` | `eligible` template | **Prototype** → code `QuizEligChecklist.tsx` (checks array) |

### Tier 2 · composite

| ID | Composes | Notes |
|----|----------|-------|
| `numeric-input-dock` | num field + CTA + trust (+ legal) | Phone preview in gallery; numpad stays template-level; includes `numeric-input` |

### Include syntax

Hydrate pipeline: `resolve_includes` → `#each` / `#if` → `{{vars}}`.

```html
{{> cta-primary}}
{{footerTrustLegal}}
```

`footerTrustLegal` is assembled by [`scripts/hydrate-quiz-frames.py`](../../../../scripts/hydrate-quiz-frames.py): Trustpilot row, optional `trust-legal` gap + `legal-fine`, then `trust-bottom` gap.

### Legal toggle (all Trustpilot templates)

```json
"legal": false
```

| Template | Slot when `legal: true` |
|----------|-------------------------|
| `radio` | `.page-footer` after Trustpilot |
| `numeric-input` | Tail of `numeric-input-dock`, above numpad |

Default `false` on all hydrations. Built frames always include legal markup (hidden via `is-hidden`); templates gallery **Legal** checkbox toggles preview visibility without changing JSON.

## Templates gallery

[`gallery.html`](../gallery.html) groups hydrated frames by template. Manifest: [`gallery.manifest.json`](../gallery.manifest.json).

## Agent workflow

| Task | Open |
|------|------|
| Journey / branches / lofi | Mixboard tab |
| Template layout or copy | Templates gallery |
| Shared chrome (CTA, Trustpilot, legal, radio card) | Components gallery |

After hydrate, refresh the open gallery tab in place (`browser_navigate`, `newTab: false`).
