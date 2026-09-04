# intro template

Check-in roadmap (s-21). **Layout B** · brand bar + scroll + fixed footer dock.

Templates tab: [`gallery.html#intro`](../gallery.html#intro) · instance **s-21 · Check-in roadmap**

## Layout

| Zone | Content |
|------|---------|
| Chrome | Brand bar (logo + EN) · no nav pills |
| Scroll | Headline + subhead → roadmap visual (check → chart → doctor) → numbered steps |
| Footer dock | CTA → Trustpilot |

## Hydrate

```bash
python3 scripts/hydrate-quiz-frames.py --only s-21
```

Copy lock: step 3 must stay **Explore your options** (see `LOCKED.md`).
