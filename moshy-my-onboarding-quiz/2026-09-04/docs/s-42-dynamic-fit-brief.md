# s-42 · Why GLP-1 may fit you — dynamic fit brief

**Screen:** `s-42` · Act 3 step 3.2  
**Status:** v2 — hero image + 3 simple bullets  
**SSOT:** [`s-42-content-matrix.json`](s-42-content-matrix.json)

---

## Job

Pay off s-41's CTA ("See how GLP-1s could help") with a **visual, light** screen: hero image up top, then **3 short bullets** tied to their Act 2 answers. Not a wall of text.

| Do | Don't |
|----|-------|
| Hero visual + scannable bullets | Dense paragraph list |
| 3 lines max | 4+ bullets or long copy |
| Feel personalised | Re-list the health profile card |

---

## Layout (v2)

```text
┌─────────────────────────┐
│ nav pills               │
├─────────────────────────┤
│ HERO · image / wash     │  ~180–220px visual break
├─────────────────────────┤
│ headline                │
│ subhead                 │
│ • bullet 1              │  short, one line each
│ • bullet 2              │
│ • bullet 3              │
│ disclaimer              │
├─────────────────────────┤
│ CTA + Trustpilot        │
└─────────────────────────┘
```

---

## Fixed chrome

| Element | Copy |
|---------|------|
| Headline | Why GLP-1 may fit you |
| Subhead | Based on your health profile |
| Disclaimer | A doctor will confirm what's right for you. |
| CTA | Continue |

---

## Three bullets (one per Act 2 theme)

| Slot | ♀ | ♂ | Triggered when |
|------|---|---|----------------|
| 1 | yo-yo | yo-yo | `few-times`, `yo-yo` |
| 2 | metabolic | metabolic | `a-little`, `yes` |
| 3 | hormonal | energy | see matrix |

Copy is **short** (max 72 chars). Triggered = direct tie to their answer. Fallback = softer generic line for that theme.

---

## Hero

- Gradient wash + figure placeholder in concepts (matches entry-hook pattern)
- Framer: replace with photography (doctor, care, wellness — not duplicate entry stethoscope)

---

## Eval

```bash
node quizzes/002_onboarding-value-stack/frames/lib/fit-bullets.test.mjs
node scripts/eval-s42-content-matrix.mjs
```

---

## Design gate

**Locked: Concept C · full bleed** → [`frames/built/s-42.html`](../frames/built/s-42.html)

Earlier explorations: [`boards/fit-concepts.html`](../boards/fit-concepts.html)

---

## Compliance

Clinic review before ship. No new efficacy claims; shorter reframes of locked themes.
