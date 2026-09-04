# tpl-trust · Safe hands (s-44)

Act 3.4 trust screen. **D3 bridge cascade** locked from [`trust-concepts.html`](../../boards/trust-concepts.html#trust-d3).

Templates tab: [`gallery.html#trust`](../gallery.html#trust) · instance **s-44 · You're in safe hands**

## Layout

| Zone | Content |
|------|---------|
| Headline | Area Inktrap 25px, headline only (no subhead) |
| Body | Three USP cards + bridge connectors (`usp-cascade-bridge`) |
| Footer | Ruby CTA + compact Trustpilot row (`trust-compact`) |

## Hydration

| Field | Notes |
|-------|-------|
| `trustpilot` | `"prominent"` → compact footer row; `true` → embed widget |
| `showSubhead` | Default `false` |
| `motionVariant` | `"bridge"` (only variant for now) |

## Spacing

Tune in gallery spacing overlay → **Save spacing** writes `spacing.json` and re-hydrates.

## Copy

Provisional exploration copy. Clinic review required before ship.
