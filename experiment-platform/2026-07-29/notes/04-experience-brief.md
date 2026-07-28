# Locked experience brief

**Direction: Ledger spine, Bench comparison as a view inside it.** Provisional lock so the prototype could be built in one pass. Section 8 lists exactly what changes if you pick differently.

## 1. The spine

The experiment is **one editable record**, not a sequence of gates.

- Left contents rail lists the five areas: Setup, Variants, Audience, Traffic, Launch. Clicking jumps. Nothing is ever locked.
- A **readiness panel** under the rail lists what is blocking publish. It is the only thing tracking completion.
- Every change persists immediately. The chrome shows a saving state that settles to saved. There is no save button anywhere in the product.
- Publish is available from the top bar at all times and states why it is unavailable when it is.

## 2. Variants, and the comparison view

The Variants section has two renderings of the same data:

| Rendering | When it is the default |
|---|---|
| **Compare grid** (Bench) | two or three variants, and the experiment type is attribute-comparable |
| **Stacked cards** (Ledger) | one variant, four or more variants, or a non-comparable type |

Both are always available via a toggle. The grid puts variants in columns and attributes in rows. Cells identical to the control render dimmed and dashed. Cells that diverge render marked, with a dot on the row label.

Rules:

- **Cloning is initiated from the control**, pushing rightwards. Never from the new variant looking backwards.
- A cloned variant states `inherits A` explicitly and counts its overrides.
- If a variant has zero overrides against the control, show a **non-blocking** warning offering "Intentional A/A" or "Add an override". Deliberate A/A must always be publishable.
- Adding a variant rebalances traffic evenly and says so. It never requires navigating anywhere.

## 3. Packages come from the library

The experiment **consumes** packages. It does not own them.

- A package slot opens a picker listing library packages, with search and a **Create new package** action at the bottom.
- Creating a package opens a **full-width focus mode**, not a sidebar. Plans sit side by side. A phone-framed checkout preview updates live as prices and care products change.
- The breadcrumb states where you will return to, precisely: experiment, variant, slot.
- On save, the package is written to the Care packages library and attached to the slot you came from. It is reusable in later experiments, and the interface says so.

## 4. Audience

- Derived from the packages attached to the variants: country, brand, vertical and medication are inferred, never re-asked.
- Rendered as **selectable chips**, not static grey text and not dropdowns. Selected chips are filled, alternatives are outlined.
- Additional rule layers are added from a picker over the full property set. Each shows as a removable chip with its operator.
- A live estimate of weekly matching traffic sits beside the rule.

## 5. Traffic

- One input: the percentage of eligible traffic **enrolled** in the experiment.
- Rendered as a **bar drawn to scale against the whole eligible population**, showing each variant's share and the unenrolled remainder in the same picture. This is what makes the two-tier maths legible.
- Beneath it, absolute weekly numbers per variant and an estimated time to detect a meaningful lift.

## 6. Launch

- Not a destination. It is the last section of the same document.
- Shows a **computed change set**, listing only the field paths that differ from the control, with the count of identical fields stated rather than shown.
- Every line in the change set is editable in place. Nothing sends you back.
- The publish control names the environment behaviour before the action: staging goes active immediately, production publishes inactive and needs a manual switch.
- Publishing emits the Amplitude schema payload as part of the action, not as a separate button.

## 7. Terminology and vocabulary

- "Plan" is labelled with its meaning in place: commitment duration.
- Info affordances sit on the fields that were unclear in the session: key, plan, package, enrolment.
- No button anywhere says save.

## 8. Sample data for the prototype

- Experiment `004`, "AU Moshy: semaglutide tiered checkout"
- Library: AU Semaglutide Basic (3-month $349, Monthly $399), AU Contrave Standard, AU Semaglutide Maintenance
- Care products: dietitian consult, longevity consult, protein shake, blood panel
- Created in flow: AU Semaglutide Premium (3-month $429, Monthly $479, three care products)
- Audience: AU, MOSHY, weight loss, new customer, device is iOS. 16,700 eligible per week.
- Traffic: 25 percent enrolled

## 9. Acceptance criteria

1. A pricing test with two variants and one new package can be set up and published without ever navigating backwards.
2. What differs between variants is visible at every moment after the second variant exists, not only at review.
3. Creating a missing package returns you to the exact slot you left, with the package attached.
4. Two identical variants produce a warning that can be dismissed as intentional and still published.
5. Adding a third variant does not require leaving the variants section, and traffic rebalances visibly.
6. The traffic picture communicates enrolment and split without a numeric explanation.
7. Nothing in the interface asks the user to save.
8. The record can be viewed as structured data, matching the shape an API or MCP would expose.

## 10. If the G2 call goes the other way

**If you want Bench as the permanent spine:** drop the contents rail and the section stack. The grid becomes the page, with audience and traffic as fixed bands above and below. Accept that a non-pricing experiment type will need a different surface later, and that four or more variants scroll horizontally.

**If you want to keep a wizard:** everything in sections 3 to 7 still applies. Only section 1 changes. The package library, the comparison rendering, the derived audience, the traffic picture and the computed change set are all independent of the spine.
