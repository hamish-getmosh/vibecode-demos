# 05 Spine question, made concrete, and the care package model

Written after the G2 round, in response to two pieces of feedback: the spine question was
unclear, and care package creation had not actually been shown.

---

## 1. What the spine question was asking

The wording at G2 was bad. "Spine" means: what is the page made of, at the top level?
There are two candidate answers and they are now both live in the prototype, switchable
from the top right of any experiment record.

### Answer A, document spine

The record is a stack of five sections with a contents rail: Setup, Variants, Audience,
Traffic, Launch. The comparison grid is a **view inside** the Variants section, toggled
with Compare view and Card view. Readiness lives in the rail.

What this buys:

- Extends to experiment types that are not about pricing. A copy test, a flow test, or a
  practitioner-messaging test all get a Variants section without needing a grid that makes
  sense of them.
- Survives variant count. At four or more variants the grid stops fitting, so Variants
  falls back to stacked cards without the rest of the page changing shape.
- Readiness has somewhere permanent to live.

What it costs:

- Comparison is one click away rather than always on screen.
- Five sections is five things to scroll past when you only came to change a price.

### Answer B, grid spine

There are no sections. The comparison grid **is** the page. Setup, Audience, Traffic and
Launch are compressed into thin bands above and below it. Changes only filters the grid
to rows that diverge, which makes the pre-launch review the same object as the editor.

What this buys:

- The difference between variants is never hidden. That is the thing Alice's design made
  hardest to see, and it is the thing the whole tool exists to express.
- Review before publish stops being a separate screen. It is a filter on the grid.
- Density. The entire experiment fits above the fold at two variants.

What it costs:

- At four variants the grid scrolls sideways and the structure visibly strains. The
  prototype does not hide this: add a fourth variant in grid spine and watch it happen.
- It assumes every experiment is a comparison of structured attributes. A copy test has
  no attribute rows worth tabulating, so the page would be mostly empty bands.
- Audience becomes cycle-on-click chips instead of a visible option set, because there is
  no room for the full set of choices.

### Where this lands

The document spine is still the recommendation, for one reason: the grid spine is a bet
that every experiment is a structured-attribute comparison, and the roadmap does not
support that bet. But the grid spine is better at the single most important job, so the
document spine borrows it wholesale as the default view inside Variants.

Switch between them on the same record and the difference is a matter of taste in a way
the words never made it.

---

## 2. The care package model

Care packages were the largest gap in the G2 work. They were a name, a region, two fixed
plans and a row of chips. That is not the object.

### Object shape

```
Care package
  name, region, vertical
  medication            -> decides which dosage tiers exist
  plans[]               -> a plan is a commitment duration, not a different product
    type                -> Monthly, 3-month, 6-month, 12-month
    mode                -> one price, or one price per dose
    price               -> when mode is one price
    tiers{dose: price}  -> when mode is per dose
  care[]                -> references into the Care products library
```

### The two decisions that matter

**Plans are durations, not products.** Alice's design let a package hold plans that
differed in ways other than commitment length, which made "package" and "plan" nearly
synonymous and left nobody able to say which one an experiment was varying. Constraining
a plan to a duration means the package is the thing an experiment swaps, and the plan is
just how long you commit for.

**Pricing mode is per plan, not per package.** Semaglutide has five dosage tiers.
Pricing every tier on every plan is twenty inputs, which is why the current design buried
it in a sidebar. So each plan chooses: one price at every dose, or one price per dose.
A 3-month plan can ladder by dose while the Monthly plan stays flat, which is a real
commercial pattern and was previously unexpressible.

Switching a plan from one price to per dose copies the flat price across every tier rather
than blanking the fields, so the switch is never destructive. Switching medication to a
single-dose drug like Contrave collapses per-dose pricing back to one price and carries
the lowest tier price forward.

**Pricing model is a comparable attribute.** Because the mode is structured rather than
buried, the comparison grid can show "One price per plan" against "Per dose" as a row that
diverges. The pricing shape becomes something an experiment can test, not just the numbers.

### Care products

A care product carries its own pricing mode, included in the package or a priced add-on.
The package decides which products it holds. The checkout preview splits them into
Included with a tick, and Add to your plan with a price, because those are two different
things to a customer and the current design treats them as one list.

---

## 3. Two routes to creating a package, one editor

The scope call at R0 was confirmed: the experiment tool consumes from the library, with an
in-context route to create a missing one. That means the package builder has to be
reachable two ways and be the same surface both times.

| Route | Entry | Return |
|---|---|---|
| In context | Variant slot, then + package, then Create a new package | Saves to the library **and** attaches to the slot you came from |
| From the library | Care packages, then New package | Saves to the library, returns to the list |

The builder is identical in both. The only differences are the breadcrumb, the save button
label, and whether region and vertical are inherited or set. Editing an existing package
from the library uses the same editor again, with a warning chip when the package is
referenced by more than one experiment, because saving reaches all of them.

### Depth is capped at two

Creating a care product from inside the package builder opens a stacked side layer, not a
third full-screen mode. It creates exactly one object and hands it straight back, selected.
Two levels is the limit: experiment, then package, then a layer that returns immediately.
Alice's design lost people at three nested panels with no way back.

---

## 4. Still open

1. **Spine.** Both are built. The recommendation is document, but this is now a taste call
   you can make by clicking rather than by reading.
2. **Vertical when built outside an experiment.** Currently defaults to weight loss and is
   not editable in the builder. It needs to be a real field before this is buildable.
3. **Dosage tiers are hardcoded per medication.** In production these come from the
   medication object, which does not exist in this prototype.
4. **Usage counts are approximate.** The prototype increments a counter rather than
   deriving references. Real reference counting changes how safe an edit feels.
