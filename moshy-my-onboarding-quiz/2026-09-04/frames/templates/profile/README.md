# profile template

Health profile recap after 300g reframe (`s-41`). **Layout G** · divider list, no card outline.

Templates tab: [`gallery.html#profile`](../gallery.html#profile) · instance **s-41 · Health profile**

## Structure

1. Headline + subhead (`question` component)
2. **Wins** — line icons only: BMI passed, weight projection
3. Section label — *A little more about you*
4. **Details** — label/value rows, hairline dividers
5. Footer dock — CTA + Trustpilot

## Hydration

`hydrations/health-profile.json` — `wins[]`, `details[]`, `aboutSectionLabel`, `ctaLabel`.

Female-only rows: set `"femaleClass": " profile-detail--female"` on a detail item.

## Spacing

Uses shell `--nav-pad-x` (32px) on `quiz-scroll` only. Tune gaps in gallery spacing overlay → **Save spacing**.
