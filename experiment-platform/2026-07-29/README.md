# Experiment platform ideation

Structural redesign exploration for the internal experiment configuration tool, run from the Figma MVP prototype and the Hamish / Alice research session of 28 July 2026.

**Repo:** https://github.com/hamish-getmosh/vibecode-demos  
**Share with colleagues:** https://hamish-getmosh.github.io/vibecode-demos/experiment-platform/2026-07-29/prototype/index.html

This folder is the working copy. Git root is two levels up at `vibecode-demos/`. To publish edits:

```bash
cd ../..   # vibecode-demos repo root
git add experiment-platform/2026-07-29
git commit -m "Update experiment platform 2026-07-29"
git push origin main
```

GitHub Pages redeploys automatically from `main`.

## Start the preview server

Everything here is HTML and is meant to be viewed over HTTP, not opened as a file. Serve from the repo root so the paths below work:

```bash
cd /Users/hamishsnodgrass/Projects/vibecode-demos
python3 -m http.server 8823 --bind 127.0.0.1
```

Port 8823 is used because 8765 belongs to the landing-page-builder preview agent and 8791 is already taken by another local server.

## What to look at, in order

| | URL | What it is |
|---|---|---|
| R0 | [r0-requirements.html](http://127.0.0.1:8823/experiment-platform/2026-07-29/boards/r0-requirements.html) | Requirements board. Evidence, object model, the one blocking scope decision, eight design questions. |
| G1 | [g1-concepts.html](http://127.0.0.1:8823/experiment-platform/2026-07-29/boards/g1-concepts.html) | Low-fi mixboard. Four structurally different concepts plus a control, each stepping through the same scenario. |
| G2 | [g2-midfi.html](http://127.0.0.1:8823/experiment-platform/2026-07-29/boards/g2-midfi.html) | Mid-fi. The two surviving directions side by side across seven moments, with a comparison table and a recommendation. |
| Build | [prototype/index.html](http://127.0.0.1:8823/experiment-platform/2026-07-29/prototype/index.html) | Clickable prototype of the locked direction. |

## Using the prototype

It boots on the dashboard. Each running experiment is a **results card** built on the standard stats readout: a plain-language summary with the p-value, relative and absolute change tiles, a 95% confidence interval, and a status bar. The encoding is truthful, so if the interval capsule crosses the zero tick the result is not significant, and the status bar always agrees with the geometry. Six cards cover the realistic range: significant win, significant loss, no difference, approaching significance, and two that are too early to read.

Click any card to open that experiment with every stage already unlocked. Click the outlined **New experiment** card to start the staged flow.

### The staged flow

A new experiment moves through five stages in order: **Setup, Audience, Variants, Traffic, Launch**. Audience comes before Variants deliberately, so a package created inside a variant can inherit region and vertical from an audience that already exists.

Stages you have not reached are collapsed and greyed. Each stage has a **Next** button in the bottom right that stays disabled until that stage's required fields are satisfied, then ungreys as you type. Clicking it unlocks and highlights the following stage. Anything already unlocked stays editable, so this gates first-run order without trapping you.

1. **Setup.** Name the experiment. Next ungreys the moment the name is non-empty.
2. **Audience.** Country now includes **MY** for Malaysia. **+ add rule from 42 properties** opens the long-tail picker, which is a scrollable list of 42 inside a fixed-size modal, with a filter. It stays open so you can add several.
3. **Variants.** **Clone →** creates a variant with explicit inheritance, which triggers the A/A warning because a clone starts identical. **+ package** opens the library picker; **Create a new package** enters the builder. Compare view is the default for two or three variants, with card view as the alternative.
4. **Traffic.** Drag the slider anywhere along the track. The enrolment bar, per-variant volume and time-to-detect all redraw live.
5. **Launch.** A seven-row checklist derived entirely from the stages above, each row carrying its own evidence and a **Fix** link to the stage that owns it. Blocking rows prevent publish; advisory rows such as detectability warn without blocking. Below it, the computed change set by field path.

**View as data** shows the record in the shape an API or MCP would expose.

Nothing asks you to save, anywhere.

### Builders slide over, and keep their context

Both the package builder and the care product builder use the same Google Tag Manager pattern: a panel that slides in from the right and covers most of the screen while leaving the platform nav visible on the left, plus a vertical close tab. You can always see where you are.

Opening a care product from inside a package stacks it as a second layer, inset further so the package underneath stays visible. That is the depth limit: two levels, always with a way back and a breadcrumb showing the chain.

In the package builder, switch a plan to **Price per dose** and five dosage tiers appear, with the checkout preview redrawing as you type. Switch medication to Contrave to watch per-dose pricing collapse to one price, carrying the price across rather than discarding it.

### Care packages and products outside an experiment

**Care packages** and **Care products** in the sidebar are real pages. Create or **Edit** either and you get the identical builder an experiment opens in place. Editing something referenced by several experiments or packages warns you before you save.

## Notes and decisions

| File | Contents |
|---|---|
| `notes/01-requirements.md` | Evidence with transcript timestamps, object model, 16 requirements, 7 edge cases |
| `notes/02-concepts.md` | The four G1 concepts and what each bets on |
| `notes/03-g1-decision.md` | Which concepts survived and why, with the scope call |
| `notes/04-experience-brief.md` | The locked brief the prototype was built from, including acceptance criteria |
| `notes/05-spine-and-care-packages.md` | The spine question restated in plain terms, and the care package object model |
| `research/mobbin-patterns.md` | Pattern research across five areas, cited to Mobbin |

## Open decisions

1. **Scope.** Confirmed: consume from the Care packages library, with an in-context route to create a missing one. Both routes are built.
2. **Spine.** Resolved as document. The grid spine has been removed rather than left as a toggle, because it assumed every experiment is a structured-attribute comparison and the roadmap does not support that. `notes/05-spine-and-care-packages.md` section 1 records what it bought and cost.
3. **Products on variants.** A variant currently composes what the customer gets by attaching packages, and care products appear as a derived comparison row. Attaching a product directly to a variant, bypassing the package, is not built and would change the object model.
4. **Automation.** The Spec concept was absorbed rather than shipped. If MCP should genuinely be the primary surface, that reopens.
5. **Vertical, and dosage tiers.** The builder inherits vertical rather than setting it, and dosage tiers are hardcoded per medication. Both need real objects behind them before this is buildable. `notes/05-spine-and-care-packages.md` section 4.
