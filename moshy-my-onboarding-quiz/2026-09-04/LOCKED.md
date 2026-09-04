# 002 · onboarding-value-stack · LOCKED

**Locked:** 2026-09-02  
**Strategy:** A · Konvo-adapted honest guide · light mode  
**Market:** MOSHY MY · doctor-led GLP-1  
**Manifest:** [`screens.json`](screens.json)  
**Mixboard:** [`boards/mixboard.html`](boards/mixboard.html)

---

## Scope

Documentation + review boards only. Framer implementation is a later phase ([`framer/README.md`](framer/README.md)).

---

## Four-act structure

| Act | Name | Legacy screens | ~time |
|-----|------|----------------|-------|
| **1** | Clinical gate + eligibility | 1.1, 2.1–2.5, 2.2b, 3.1–3.2, fail | ~60s |
| **2** | Metabolic profile + reveal | 3.3–3.10 | ~60s |
| **3** | Mirror + trust | 4.1–4.5 | ~25s |
| **4** | Book | 5.1, 5.3–5.5 | ~25s |

**Happy path:** ~2.5–3 min.

---

## Screen list (by act)

### Act 1 · Clinical gate + eligibility

| Step | ID | Screen | Template | Fidelity |
|------|-----|--------|----------|----------|
| 1.1 | s-11 | Entry hook | entry-hook | **hifi** |
| 1.2 | s-21 | Check-in roadmap | intro | **hifi** |
| 1.3 | s-22 | Gender | radio | **hifi** |
| 1.4 | s-22b | Female gate ♀ | — | lofi |
| 1.5 | s-23 | Height | numeric-input | **hifi** |
| 1.6 | s-24 | Weight | numeric-input | **hifi** |
| 1.7 | s-25 | Health conditions | — | lofi |
| 1.8 | s-31 | Checking eligibility | loader | **hifi** |
| 1.9 | s-32 | BMI check passed | eligible | **hifi** |
| 1.x | s-fail | Not eligible | decline | **hifi** |

### Act 2 · Metabolic profile + reveal

| Step | ID | Screen | Fidelity |
|------|-----|--------|----------|
| 2.1 | s-33 | Age | lofi |
| 2.2 | s-34 | Yo-yo history | lofi |
| 2.3 | s-35 | Harder lately | lofi |
| 2.4 | s-36 | Energy | lofi |
| 2.5 | s-36f | Menopause ♀ | lofi |
| 2.6 | s-37 | Carry weight | lofi |
| 2.7 | s-38 | Adding it up | **hifi** |
| 2.8 | s-39 | Stat reveal | stat-reveal | **hifi · locked** |
| 2.9 | s-310 | 300g reframe | reframe | **hifi** |

### Act 3 · Mirror + trust

| Step | ID | Screen | Notes |
|------|-----|--------|-------|
| 3.1 | s-41 | Health profile | Recap card |
| 3.2 | s-42 | Why GLP-1 may fit you | fit | **hifi** · concept C |
| 3.3 | s-43 | What Moshy does | Programme stack, no pricing |
| 3.4 | s-44 | Safe hands | Trust grid + prominent Trustpilot |
| 3.5 | s-45 | 15-min consult | Bridge → Act 4 |

### Act 4 · Book

| Step | ID | Screen |
|------|-----|--------|
| 4.1 | s-51 | Choose doctor |
| 4.2 | s-53 | Pick a time |
| 4.3 | s-54 | Pay RM5 |
| 4.4 | s-55 | You're booked |

---

## Branches

| Branch | Screens | Rule |
|--------|---------|------|
| Female path | s-22b, s-36f, profile menopause row | Hidden on ♂ preview toggle |
| Ineligible | s-fail | Female gate: any option except "None of these". BMI: below **23** after s-32 check |

---

## Content locks

- Roadmap step 3: **Explore your options** (not "book a free doctor consult")
- No programme pricing in funnel (v1)
- No 12-month journey screen in Act 3
- Trustpilot on applicable screens; omitted on loaders, **300g reframe**, **decline exit (s-fail)**
- Decline exit (`s-fail`): no nav chrome; accent-blue CTA; Hers-mirror copy (single screen, both fail routes)
- Trustpilot row includes review count (placeholder until live count confirmed)
- 4.2 subhead: **Based on your health profile**

---

## Hi-fi overrides (settled only)

See [`docs/hifi-override-map.md`](docs/hifi-override-map.md). Gender, height, weight, loaders, BMI passed, and decline exit use settled hi-fi. All other screens lofi until iterative hi-fi pass.

---

## Related docs

- [`flow-architecture.md`](flow-architecture.md)
- [`psychology.md`](psychology.md)
- [`decisions.md`](decisions.md)
- [`design/quiz-layout-rules.md`](design/quiz-layout-rules.md)
