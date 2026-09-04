# decline template

Ineligible exit (`s-fail`). **Locked 2026-09-02.**

Hers mirror: headline + two body paragraphs + blue footer CTA. No nav chrome, no Trustpilot. Native text only.

## Gallery

Templates tab: `gallery.html#decline` · instance **s-fail · Not eligible**

## Components

| Slot | Source |
|------|--------|
| Headline + body | Native `.q-head` + `.decline-body` in template |
| CTA | `input-cta--decline` · accent blue (`#4d41f0`) |
| Trustpilot | **Omitted** |
| Nav chrome | **Omitted** |

## Spacing (locked)

| Gap | Token | px | Between |
|-----|-------|-----|---------|
| `chrome-headline` | 4xl | 80 | Top → headline |
| `headline-content` | 2xl | 44 | Headline → body 1 |
| `subhead-content` | md | 16 | Body 1 → body 2 |
| `content-footer` | 3xl | 60 | Body 2 → CTA |
| `trust-bottom` | xl | 32 | CTA → screen bottom |

## Hydrate

```bash
python3 scripts/hydrate-quiz-frames.py --only s-fail
```
