# Strategy A — selected

**Confirmed:** Strategy A — Konvo-adapted honest guide  
**Design rule:** Light mode only (no dark screens — loader/theatre in Act 3 will use light treatment too)

## Act 2 — LOCKED (2026-09-01)

**Scope:** 2.1 permission → gender → height → weight → age → loader. Stat reveal is Act 3.

| Artifact | Path |
|----------|------|
| **Lock manifest** | `landing-page-pipeline/design/moshy/malaysia/consult-onboarding/ACT-2-LOCKED.md` |
| **Layout rules** | `.../quiz-layout-rules.md` |
| **Spacing lock** | `.../act-2-spacing.lock.json` + `act-2-spacing.lock.css` |
| **Act 2 hi-fi** | `.../hifi/invest-personalise-mixboard.html` |
| **Agent skill** | `landing-page-pipeline/.cursor/skills/consult-onboarding-quiz-layout/SKILL.md` |
| Spacing tuner | `.../midfi/act-2-spacing-mixboard.html` |
| Mid-fi archive | `.../midfi/invest-personalise-mixboard.html` |

### Locked spacing (mobile)

| Gap | px |
|-----|-----|
| Chrome → headline | 32 |
| Headline → subhead | 8 |
| Subhead → content | 32 |
| Headline → content (no subhead) | 44 |
| Content → footer | 60 |
| Trustpilot → legal | 8 |
| CTA → Trustpilot | 8 |
| Footer → bottom | 16 |

## Other artifacts

| Act | Board |
|-----|-------|
| Full flow (tabbed, draft) | `midfi/consult-onboarding-mixboard.html` |
| Progress exploration | `midfi/progress-bar-mixboard.html` |
| 1 · Arrive | Pending (use Act 2 skill) |
| 3 · Theatre & reveal | **Locked** — `consult-onboarding-flow-lofi.html` · architecture: `flow-architecture.md` |

## Sharing across chats

Design SSOT lives in **landing-page-pipeline** (`consult-onboarding/` folder). Strategy and narrative stay in this copywriter run. New chats: read the skill + `ACT-2-LOCKED.md`. No separate repo required.
