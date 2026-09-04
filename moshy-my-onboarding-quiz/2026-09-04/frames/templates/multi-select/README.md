# multi-select template

Vertical option list with multi-tap selection and a **Continue** CTA below the stack. Same chrome as `radio` (nav, question, Trustpilot footer).

## Selection modes

Set in hydration JSON with `"nonePreset": true | false` (default `false`).

### `nonePreset: true` · None option at top

Use when the question needs a “none apply” escape hatch (e.g. health conditions).

**Hydration rules**

- Set `"nonePreset": true`.
- Mark the none option with `"exclusive": true` (only one allowed).
- List order in JSON does not matter: hydrate moves the exclusive option to the **top**.
- **Nothing is pre-selected** on load (including none). User must tap to select.

**Runtime rules**

| State | CTA |
|-------|-----|
| Nothing selected (initial) | Hidden |
| User selects none | Visible |
| User selects one or more conditions | Visible |
| User selects none while conditions are selected | Conditions clear; none selected; CTA visible |
| User selects a condition while none is selected | None clears; condition toggles on; CTA visible |
| User deselects everything | Hidden |

The exclusive (none) option is mutually exclusive with all others. Other options can be multi-selected together.

### `nonePreset: false` · Free select (default)

Use when a dedicated none option does not belong at the top (or none does not apply).

**Hydration rules**

- Omit `"nonePreset"` or set `"nonePreset": false`.
- No pre-selection unless you set `"selected": true` on specific options (gallery preview only).
- Optional: mark an option `"exclusive": true` for none-style mutual exclusion (stays in JSON order).

**Runtime rules**

| State | CTA |
|-------|-----|
| Nothing selected (initial) | Hidden |
| One or more options selected | Visible |
| Exclusive option selected | All others clear |
| Non-exclusive selected while exclusive is on | Exclusive clears first |

## Hydration fields

| Field | Required | Notes |
|-------|----------|-------|
| `nonePreset` | No | `true` = none option at top + exclusive rules |
| `showSubhead` | No | Default `true`. Subhead renders in accent blue (`#4d41f0`) |
| `subhead` | No | Default `Select all that apply.` when omitted |
| `options[].exclusive` | When `nonePreset` | Marks the none option |
| `options[].selected` | No | Ignored when `nonePreset: true` (hydrate clears all) |
| `ctaLabel` | No | Default `Continue` |

## Example · none at top

```json
{
  "screenId": "s-25",
  "template": "multi-select",
  "nonePreset": true,
  "headline": "Do any of these apply to you?",
  "subhead": "Select all that apply.",
  "showSubhead": true,
  "options": [
    { "label": "None of these", "exclusive": true },
    { "label": "High blood pressure" },
    { "label": "PCOS" }
  ]
}
```

## Example · free select

```json
{
  "screenId": "s-XX",
  "template": "multi-select",
  "headline": "Which goals matter to you?",
  "subhead": "Select all that apply.",
  "showSubhead": true,
  "options": [
    { "label": "Lose weight" },
    { "label": "More energy" },
    { "label": "Better sleep" }
  ]
}
```

## Files

| File | Purpose |
|------|---------|
| `template.html` | Layout + CTA slot |
| `preview.js` | Tap rules + CTA show/hide in built frames |
| `spacing.json` | Gap ladder (includes `input-cta`) |
| `hydrations/*.json` | Per-screen copy and options |

Regenerate built HTML:

```bash
python3 scripts/hydrate-quiz-frames.py
```
