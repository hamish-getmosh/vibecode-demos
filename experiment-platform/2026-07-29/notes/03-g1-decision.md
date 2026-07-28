# G1 decision

**Status: provisional.** Taken so the work can continue in one pass. Every call here is reversible and each one names what would change if you disagree.

## Scope decision from R0

**Answer taken: B, the experiment assembles library objects.**

Reasons: Care packages and Care products already exist in the platform navigation, so the current design duplicates them rather than adding anything. The IKEA framing from the session says the same thing in different words. Package reuse across experiments is currently unrewarded, and every experiment rebuilding its own packages is a data-quality problem as much as a UX one.

*If you disagree:* Assembly collapses, Bench loses its supply of parts, and Ledger becomes the default because it is the only concept that can absorb a deep in-experiment package editor without distortion.

## Concepts carried forward

**Primary: Bench and Assembly merged.** They were solving adjacent halves of one problem. Bench makes difference structural but never answers where packages come from. Assembly answers exactly that but its comparison is coarse, only at the level of whole parts. Merged, the workspace is a comparison grid and the cells are filled from a parts library. Called **Bench** from here.

**Alternate: Ledger.** Kept as the lower-risk direction. It fixes gating, review-as-destination and free navigation without asking anyone to learn a new mental model. If Bench turns out to be too opinionated for the marketing audience, this is the fallback that still beats the control.

**Absorbed, not carried: Spec.** Three of its ideas move into both directions rather than shipping as an interface:

1. **Explicit inheritance.** A cloned variant states what it inherits and what it overrides, rather than silently copying.
2. **Path-addressable fields.** Every field has a stable address, which makes the diff real rather than hand-built and makes MCP a consequence of the model instead of a later integration.
3. **Native change sets.** Review filters a computed diff, it does not narrate one.

**Dropped: the control.** Flipping the panels is now the floor, not a candidate. Both surviving directions do everything it does.

## What mid-fi has to prove

| | Bench | Ledger |
|---|---|---|
| Does the grid stay readable with three variants | open | not applicable |
| Does the library feel like supply, not a detour | open | open |
| Can a marketer read the traffic maths unaided | open | open |
| Does difference stay legible without a review page | open | open |
| Does it survive a non-pricing experiment type | doubtful | likely |

The last row is Bench's real risk and mid-fi should be honest about it rather than designing around it.
