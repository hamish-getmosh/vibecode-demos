# Consult onboarding · Quiz layout rules

Rules for MOSHY MY Strategy A quiz screens (Act 2 lock). Pair with [`act-2-spacing.lock.json`](act-2-spacing.lock.json) and the hi-fi mixboard.

## Phone regions

```text
┌─────────────────────────────┐
│  chrome bar (fixed)         │  brand bar OR nav bar · 16px top · 32px sides
├─────────────────────────────┤
│  quiz-scroll (flex 1)       │
│    quiz-main                │  headline · subhead? · inputs / options
│    …                        │
│    page-footer (mt: auto)   │  Trustpilot · legal? — see below
├─────────────────────────────┤
│  footer-dock (optional)     │  fixed CTA + Trustpilot — tpl-intro only
├─────────────────────────────┤
│  numpad-dock (optional)     │  tpl-numeric mock only
└─────────────────────────────┘
```

All regions share **white** ground (`--color-ground`). No tinted footer dock, no drop shadow on docks.

---

## Spacing tokens (mobile)

| Slot | Token | px | When |
|------|-------|-----|------|
| Chrome → headline | `xl` | 32 | Always |
| Headline → subhead | `xs` | 8 | Subhead present (component-internal; not a layout spacing block in hi-fi frames) |
| Subhead → content | `xl` | 32 | Subhead present |
| Headline → content | `2xl` | 44 | **No subhead** (height, weight) |
| Content → page footer | `3xl` | 60 | Before Trustpilot / legal block |
| Trustpilot → legal | `xs` | 8 | Age screens (`page-footer`) |
| CTA → Trustpilot | `xs` | 8 | Why we ask (`footer-dock`) |
| Footer → bottom | `md` | 16 | After last footer item to screen edge or numpad |

**Legal text:** centred (`text-align: center` on `fine print block`).

**Rule:** With subhead, headline→content is **8 + subhead + 32** (not 44). Without subhead, use single **44px** gap.

Shell horizontal padding: **32px** everywhere.

### Per-template overrides

Global defaults live in [`act-2-spacing.lock.json`](act-2-spacing.lock.json) and [`act-2-spacing.lock.css`](act-2-spacing.lock.css).

Per hi-fi template type, gap overrides live in [`frames/templates/<type>/spacing.json`](../frames/templates/radio/spacing.json). Edit via the templates gallery spacing tuner (**Save spacing**) or the file directly, then run `python3 scripts/hydrate-quiz-frames.py`. Saving a template updates **all** hydrated instances of that type (e.g. `numeric-input` → height + weight).

---

## Trustpilot (`trust block`)

Compact row (quiz-router style), not a card:

```html
<div class="trust-row" data-layer="trust block">
  <span class="trust-row__stars" aria-hidden="true">★★★★★</span>
  <span class="trust-row__text"><strong>Excellent</strong> · 4.8 on Trustpilot</span>
</div>
```

### Placement logic

| Layout type | Trustpilot position | Scrolls? |
|-------------|---------------------|----------|
| **A · Tap advance** (gender, age) | `page-footer` at bottom of `quiz-scroll` | Yes, when content overflows |
| **B · CTA fixed** (why we ask) | `footer-dock`, **below** the CTA button | No (fixed with CTA) |
| **C · Numeric** (height, weight) | `page-footer` above numpad dock | Yes when needed |
| **D · Loader** | Omitted | — |
| **Decline** (`s-fail`) | Omitted | CTA only in `footer-dock` |
| **E · Reveal hero** (stat) | Footer dock below CTA | Fixed with CTA |
| **F · Reframe** (300g) | Omitted | Optional note below chart in scroll |

**Short content:** `page-footer` uses `margin-top: auto` so Trustpilot sits at the bottom of the viewport (above numpad or dock if present).

**Long content:** Trustpilot scrolls with the rest of `quiz-scroll` (not sticky/fixed).

### Legal text

- When present (age, why we ask): sits **below** Trustpilot inside `page-footer` (scroll layouts) or in `quiz-scroll` above fixed dock (why we ask).
- Order: **Trustpilot → legal** (never reversed).
- Gap between Trustpilot and legal: `--quiz-gap-trust-legal` (`spacing block` with `data-gap="trust-legal"`).
- **Why we ask dock:** `--quiz-gap-cta-trust` between CTA and Trustpilot.
- **Footer → bottom (`--quiz-gap-trust-bottom`):** gap after the last footer item (Trustpilot, or legal when present) to the screen bottom, or to the numpad dock on numeric screens. Same token on `page-footer` and `footer-dock`.

---

## Layout types (templates)

### tpl-intro · Why we ask (Layout B)

- **Chrome:** brand bar (logo + EN)
- **Scroll:** hero, headline, subhead, legal
- **Fixed `footer-dock`:** Continue CTA, then Trustpilot underneath
- No Trustpilot in scroll
- **Proceed:** Quiz CTA tap → next step (`withQuizNavForward` on CTA master; no page link)

### tpl-entry-hook · Entry landing (Layout B)

- Same proceed as intro: **Quiz CTA** tap, no link
- **Chrome:** brand bar (no nav pills)

### tpl-multi-select · Health conditions (Layout A + reveal CTA)

- **Chrome:** nav bar
- **Scroll:** headline, subhead, native toggle options
- **Page footer:** Trustpilot
- Toggles select only; **do not** advance
- Canvas reveal shows hidden **Quiz CTA** when ≥1 selected; CTA tap proceeds
- No code Continue button (`QuizGutsMultiSelect` scaffold is not production)

### tpl-radio · Gender (Layout A)

- **Chrome:** nav bar
- **Scroll:** headline, subhead, options
- **Page footer:** Trustpilot only
- Tap option → advance (no CTA)

### tpl-numeric · Height / weight (Layout C)

- **Chrome:** nav bar
- **No subhead** → headline→content **44px**
- **Scroll:** headline, input, Continue (in content for now)
- **Page footer:** Trustpilot (pins above numpad when short)
- **Numpad dock:** mock only

### tpl-radio-legal · Age (Layout A + legal)

- **Chrome:** nav bar
- **Scroll:** headline, subhead, options
- **Page footer:** Trustpilot, then legal
- Tap band → loader (no CTA)

### tpl-radio-legal · Age long (overflow QA)

- Same as age with many options
- Demonstrates Trustpilot + legal scrolling with chrome fixed

### tpl-eligible · BMI passed (Layout B)

- **Chrome:** nav bar
- **Scroll:** headline, subhead, pass tick, "What we checked" list
- **Fixed `footer-dock`:** primary CTA, then Trustpilot
- No accordion, no badge, no hero card

### tpl-decline · Not eligible (Layout G) · locked

- **Chrome:** none (no back, no progress pills)
- **Scroll:** left-aligned headline + two body paragraphs (native text)
- **Fixed `footer-dock`:** accent-blue CTA only (no Trustpilot)
- Single screen for female-gate fail and BMI fail (v1)
- Spacing locked in `templates/decline/spacing.json`

### tpl-loader · Adding it up (Layout D)

- No Trustpilot
- Centred loader + checkmarks in content

### tpl-reveal-hero · Stat reveal (Layout E)

- **Chrome:** none (no nav bar, no progress pills)
- **Scroll:** centred reveal lead + stat number + full-bleed downward chart
- **Fixed `footer-dock`:** Continue CTA, then Trustpilot (same row pattern as radio/eligible)
- Measured tone; estimate framing required in copy and disclaimer
- Centred hero is allowed; do not left-align the peak stat block

### tpl-reframe · Daily reframe (Layout F)

- **Chrome:** nav bar (back visible)
- **Scroll:** left-aligned headline + subhead, chart or visual in `content block`
- **Fixed `footer-dock`:** primary CTA (e.g. How it works →), no Trustpilot
- Optional inline disclaimer below chart inside scroll

### tpl-reveal-hero · Long legal (overflow QA)

- Same as Layout E but legal paragraphs in `quiz-scroll` above fixed CTA
- Demonstrates scroll when disclaimer copy is long; CTA stays pinned

---

## Framer layer names

| Layer | Role |
|-------|------|
| `brand bar` / `nav bar` | Fixed chrome |
| `quiz scroll` | Scroll container |
| `quiz main` | Primary question content |
| `spacing block` | Token gap (hidden in prod) |
| `headline block` | H2 |
| `subhead block` | Optional subtitle |
| `content block` | Inputs / radios / hero |
| `page footer` | Trustpilot + optional legal |
| `footer dock` | Fixed CTA stack (intro only) |
| `trust block` | Trustpilot row |
| `fine print block` | Legal links |

---

## Boards

| Board | URL path |
|-------|----------|
| Act 2 hi-fi | `hifi/invest-personalise-mixboard.html` |
| Act 3 hi-fi | `hifi/theatre-reveal-mixboard.html` |
| Spacing tuner | `midfi/act-2-spacing-mixboard.html` |

---

## Do not

- Centre question headlines (left-align always)
- Fix Trustpilot on tap-advance screens (use `page-footer`, not `footer-dock`)
- Put Trustpilot above legal when both are shown
- Use 44px headline→content when a subhead exists (use 8 + 32 instead)
- Add fake iOS status bar on hi-fi builds
