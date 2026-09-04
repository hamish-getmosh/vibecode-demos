# eligible template

BMI / eligibility win screen after Act 1 loader (s-32). Fixed footer dock + Trustpilot (Layout B).

## Gallery

Templates tab: [`gallery.html#eligible`](../gallery.html#eligible) · instance **s-32 · BMI check passed**

## Components

| Include | Source | Framer target (build next) |
|---------|--------|----------------------------|
| `{{> question}}` | Pulled · `Quiz/Quiz Headline` | Done (`riceymdsf`) |
| `{{> elig-pass}}` | Prototype CSS | **Native** · `Quiz/Quiz Elig Pass` (tick + ring) |
| `{{> elig-checklist}}` | Prototype CSS | **Code** · `QuizEligChecklist.tsx` (checks array prop) |
| `{{> cta-primary}}` | Pulled · `Quiz/Quiz CTA` | Done (`Yf0P638Mj`) |
| `{{> trustpilot-row}}` | Pulled embed | Done (`5jo1wtkgIZb38X2KsI6D`) |

Template-only (no separate component yet): `elig-step-hint`, `elig-bridge`, `elig-hero` shell (gradient band).

## Layout

| Zone | Content |
|------|---------|
| Chrome | Nav bar + progress pills |
| Scroll | Hero card (white, elevated) → stacked checklist card → next-step card |
| Footer dock | CTA → Trustpilot on gradient wash |

**Visual:** `phone--eligible` purple-pink gradient page; white cards with divider rows (finalise-booking stacked-list pattern).

## Spacing (gallery tuner)

| Gap | Default | Between |
|-----|---------|---------|
| `chrome-headline` | 2xl | Nav → hero |
| `subhead-content` | lg | Hero → step hint |
| `headline-content` | md | Step hint → checklist |
| `content-footer` | lg | Checklist → bridge |
| `cta-trust` | xs | CTA → Trustpilot |

## Hydration fields

See [`schema.json`](schema.json). Copy lives in [`hydrations/bmi-passed.json`](hydrations/bmi-passed.json).

**Framer dynamic row 3:** On ♀ path, label → `Women's health screening` (pregnancy gate from s-22b).

## Pull workflow (after Framer styling)

```bash
# When native tick + checklist exist on branch new-quiz:
./scripts/pull-quiz-component.sh elig-pass
./scripts/pull-quiz-component.sh elig-checklist   # or pull-all-code for TSX
python3 scripts/hydrate-quiz-frames.py
```

Add pull script entries when Framer components are registered in [`framer/inventory/quiz-components.json`](../../../../framer/inventory/quiz-components.json).

## Hydrate

```bash
python3 scripts/hydrate-quiz-frames.py
```
