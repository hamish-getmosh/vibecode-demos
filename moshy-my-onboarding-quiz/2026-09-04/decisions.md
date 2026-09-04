# Decisions · 002 onboarding value stack

Decision log for the onboarding value-stack quiz. Implementation lives in Framer later; this folder documents intent.

---

## Strategy and scope

| Decision | Choice | Why |
|----------|--------|-----|
| Strategy | A · Konvo-adapted honest guide | Selected in copywriter run 2026-09-01 |
| Visual mode | Light only | No dark loaders/theatre |
| Repo home | `quizzes/002_onboarding-value-stack/` in moshy-malaysia-framer | Quiz flow docs beside Framer SSOT; not a separate product repo |
| Folder purpose | Documentation + mixboard | Not building the live quiz in HTML |

---

## Flow structure

| Decision | Choice | Why |
|----------|--------|-----|
| Act count | 4 acts (fold old 1+2+3a, 3b+3c, 4, 5) | Cleaner mixboard rows |
| Entry hook | Inside Act 1 (not standalone act) | Single clinical gate chapter |
| Roadmap step 3 | **Explore your options** | Not "book a free doctor consult" (hold consult framing) |
| 12-month journey screen | Removed | Too big a commit; projection theatre is enough |
| Act 3 mirror | 5 screens (profile → fit → stack → trust → consult) | 4.2 dynamic + 4.3 programme stack split |
| Programme pricing in funnel | None (v1) | Price discussion at consult; experiments later |

---

## Eligibility

| Decision | Choice | Why |
|----------|--------|-----|
| BMI threshold | **23** | Aligns with 001 booking router |
| Ineligible UX | Single screen `s-fail` · **locked hi-fi** | Hers mirror; no nav; blue CTA; no Trustpilot |
| Female gate | Split options; ineligible if not "none" | MY women's health requirement |

---

## Trust and social proof

| Decision | Choice | Why |
|----------|--------|-----|
| Trustpilot placement | Bottom of applicable screens (hi-fi pattern) | Consistent with Act 2 hi-fi |
| Trustpilot omissions | Loaders, 300g reframe, decline exit | Per layout rules; stat reveal includes Trustpilot |
| Review count | In compact Trustpilot row | Social proof; placeholder until live count |
| Safe hands (4.4) | Trust grid + prominent Trustpilot | Replaced "data stays private" tile |

---

## Design / hi-fi

| Decision | Choice | Why |
|----------|--------|-----|
| Hi-fi overrides | Gender, height, weight only (phase 1) | Settled Act 2 reference |
| Stat reveal + 300g | **hifi** · split screens · fadeHold motion | [`stat-reveal`](../frames/templates/stat-reveal/), [`reframe`](../frames/templates/reframe/) templates |
| Act 2 hi-fi vs lofi order | Documented mismatch | Hi-fi has age/loader; lofi has roadmap + conditions |
| Screen templates | Grow incrementally | No upfront taxonomy |
| Template naming | Plain names (`radio`, `numeric-input`) | No `tpl-` prefix |
| Intro hi-fi | `intro` template · s-21 in gallery `#intro` | Replaces deprecated act-01 2.1 reference |

---

## Numeric input (height / weight)

| Decision | Choice | Why |
|----------|--------|-----|
| Keypad | **Native OS keyboard** on mobile web | No bespoke numpad in production; familiar UX, accessibility, no cross-platform maintenance |
| Preview numpad | Mock `numpad-dock` in git fixtures only | Desktop mixboard/gallery has no OS keyboard; `showNumpad` is preview-only, not shipped |
| Input element | Real `<input type="text" inputmode="decimal">` | Decimal pad for kg; avoids `type="number"` spinner and quirks |
| Field display | Styled mirror + focused input (see `frames/components/numeric-input/interactive.js`) | Big typography and custom caret; keyboard stays native |
| Keyboard layout on open | Deferred to Framer build | Scroll/padding when keyboard covers CTA or Trustpilot; not blocking hi-fi lock |

---

## Booking (Act 4)

| Decision | Choice | Why |
|----------|--------|-----|
| RM5 on 5.1 | Explainer at top of doctor pick | Upfront transparency |
| Next available | Top card, same style as doctors | Fast path; round-robin Cal |
| Old 5.2 consult screen | Folded into 5.4 | Fewer steps |
| 5.4 bullets | Options explained clearly | No programme pricing in funnel |

---

## 4.2 dynamic fit

| Decision | Choice | Why |
|----------|--------|-----|
| Headline pattern | "Why GLP-1 may fit you" + **Based on your health profile** | Personalisation without overclaiming |
| Content model | Hero image + **3** short bullets from answers (triggered/fallback per slot) | Less dense; visual break before copy |
| Gender paths | ♀ yo-yo → metabolic → hormonal · ♂ yo-yo → metabolic → energy | One bullet per Act 2 theme |
| v1 scope | 4 themes only — no carry-weight, age, or conditions bullets | Matches lofi; defer expansion |
| Matrix SSOT | [`docs/s-42-content-matrix.json`](docs/s-42-content-matrix.json) | Machine-readable copy + trigger rules |
| Hi-fi layout | **Concept C** full-bleed hero + blue arrow bullets | Locked · gallery `#fit` |
| Resolver | [`frames/lib/fit-bullets.mjs`](frames/lib/fit-bullets.mjs) | Shared by eval, concepts board, Framer runtime |
| Brief | [`docs/s-42-dynamic-fit-brief.md`](docs/s-42-dynamic-fit-brief.md) | Strategy + design gate |

---

## Deferred

- RM199/week or programme price in funnel
- Full hi-fi for every screen
- Framer page/route for 002
- Ineligible variant copy per reason (single screen for v1)
