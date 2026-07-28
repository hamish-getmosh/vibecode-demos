# G1 concepts: four structural models

Scenario used identically across all four, taken from the research session:

> Set up a Moshy AU semaglutide pricing test. Variant A is the existing basic package. Variant B is a new premium tier that adds a dietitian consult, a longevity consult and a protein shake. **The premium package does not exist yet.** Target Australia, iOS only. 25 percent of eligible traffic, split evenly. Review and publish to staging.

Each concept had to change the **primary navigation model** and the **primary work surface**. Flipping the existing panels is included only as a control, to measure the others against.

---

## Control: flip the panels

The incremental option that came out of the session. Keep the five-stage wizard, move the configurator to the left at two thirds, put the checkout preview on the right at one third, add field-level change dots, tooltips, a traffic funnel diagram and better save wording.

- **Fixes:** D02 partially, D07, D12, D13, D15
- **Does not fix:** D11 (package building still crammed into a stage), D09 (duplication model unchanged), D16 (difference still review-only), D06 (type still gates the flow), D04 (no automation stance)
- **Verdict:** a real improvement and cheap to build, but it leaves the four structural problems intact. Useful as the floor, not the answer.

---

## Concept A: Ledger

**Thesis.** The experiment is one document, not five gates. Stop asking people to complete stages and start letting them fill in a record.

- **Navigation:** vertical document with a table of contents rail. No completion gates. Jump anywhere at any time.
- **Work surface:** full-width single column, sections stacked in reading order.
- **Nested objects:** inline expansion, with a full-screen focus mode for deep work.
- **Difference:** a compare toggle turns the variants section into aligned columns.
- **Readiness:** a persistent panel lists what is blocking publish, rather than blocking each step.
- **Preview:** summoned on demand rather than permanently occupying space.

**Bets:** that gating was never the value, orientation was. That a readiness checklist beats sequential locks.
**Kills:** the stepper, the completion gates, the permanent canvas.
**Risk:** a long document can feel unbounded for a first-time user.

---

## Concept B: Bench

**Thesis.** The unit of work is not the experiment, it is the difference between variants. Make variants columns and configure inside the comparison.

- **Navigation:** no stages at all. One workspace, variants as columns, attributes as aligned rows.
- **Work surface:** a comparison grid that is directly editable.
- **Nested objects:** layered slide-over from the cell being edited.
- **Difference:** structural, not a feature. Rows where variants diverge are visibly marked because they are literally side by side.
- **Cohort and traffic:** a band above and below the grid, since both are small relative to variant configuration.
- **A/A detection:** free, because an all-identical grid is self-evident.

**Bets:** that the real job is authoring a difference, and everything else is small.
**Kills:** stages, the review step as a separate destination, the whole-window change tint.
**Risk:** does not obviously extend to experiment types where variants are not attribute-comparable, such as a redirect.

---

## Concept C: Assembly

**Thesis.** Take the IKEA metaphor literally. Parts live in a library. The experiment is a shallow assembly of parts.

- **Navigation:** two zones. A library of packages, plans and care products, and an assembly tray holding the experiment.
- **Work surface:** the assembly tray is deliberately thin. The heavy editor belongs to the library zone and gets full width when you are in it.
- **Nested objects:** not nested at all. Creating a package is a first-class mode in the library zone, entered and exited without losing the tray.
- **Difference:** variant slots show which parts differ, since parts are discrete and named.
- **Reuse:** the same premium package can be attached to future experiments without rebuilding.

**Bets:** that package reuse across experiments is real and currently unrewarded, and that the platform nav already implies this model.
**Kills:** package building inside the experiment flow, the deep sidebar editor.
**Risk:** a mode switch mid-task can feel like leaving, unless the return is handled well.

---

## Concept D: Spec

**Thesis.** If MCP is genuinely the primary interface for power users, design the object first and treat the UI as one client of it.

- **Navigation:** a command surface plus two views of the same object, structured spec and rendered result.
- **Work surface:** the spec view is a readable, editable structured document. Every field is addressable by a path, which is also the API shape.
- **Nested objects:** expand in place within the spec.
- **Difference:** a native diff, because the object is structured data.
- **Automation:** what the agent does and what the UI does are the same operations, so a chat-driven setup and a hand-driven setup converge on the same record.
- **Preview:** rendered view shows the resulting checkout.

**Bets:** that Hamish's actual workflow is the leading indicator, and that an inspectable object beats a form.
**Kills:** forms as the primary authoring mechanism, the UI as the only entry point.
**Risk:** alienating non-technical users, exactly the marketing audience the tool needs to serve.

---

## How they map to the design questions

| | Control | A Ledger | B Bench | C Assembly | D Spec |
|---|---|---|---|---|---|
| Q1 wizard spine | kept | removed | removed | removed | removed |
| Q2 primary surface | config left | document | comparison grid | library plus tray | spec view |
| Q3 preview role | persistent | on demand | per column | rendered view | rendered view |
| Q4 difference | review only | toggle | always on | by part | native diff |
| Q5 layer depth | shallow | focus mode | slide-over | zone switch | in place |
| Q6 type branching | branches | sections vary | weak fit | parts vary | schema varies |
| Q8 automation | none | none | none | partial | native |
