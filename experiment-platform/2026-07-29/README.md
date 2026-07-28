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

Everything here is HTML and is meant to be viewed over HTTP, not opened as a file.

```bash
cd /Users/hamishsnodgrass/Projects/vibecode-demos/experiment-platform/2026-07-29
python3 -m http.server 8791 --bind 127.0.0.1
```

Port 8791 is used because 8765 belongs to the landing-page-builder preview agent.

## What to look at, in order

| | URL | What it is |
|---|---|---|
| R0 | [/boards/r0-requirements.html](http://127.0.0.1:8791/boards/r0-requirements.html) | Requirements board. Evidence, object model, the one blocking scope decision, eight design questions. |
| G1 | [/boards/g1-concepts.html](http://127.0.0.1:8791/boards/g1-concepts.html) | Low-fi mixboard. Four structurally different concepts plus a control, each stepping through the same scenario. |
| G2 | [/boards/g2-midfi.html](http://127.0.0.1:8791/boards/g2-midfi.html) | Mid-fi. The two surviving directions side by side across seven moments, with a comparison table and a recommendation. |
| Build | [/prototype/index.html](http://127.0.0.1:8791/prototype/index.html) | Clickable prototype of the locked direction. |

## Using the prototype

It boots on the dashboard with an empty state. **Load sample scenario** in the top right is a demo shortcut that seeds the experiment used throughout the boards. From there:

1. **Clone →** on variant A creates variant B with explicit inheritance. The A/A warning appears immediately, because a clone starts identical.
2. **+ package** on variant B opens the library picker. Choose **Create a new package** to enter the builder.
3. In the builder, set a name, then switch a plan to **Price per dose**. Five dosage tiers appear and the checkout preview redraws as you type. Switch medication to Contrave to watch per-dose pricing collapse to one price.
4. **+ New care product** opens a side layer over the builder. Save and it returns you with the product selected. That is the depth limit: two levels, always with a way back.
5. **Save and return** attaches the package to the slot you came from and writes it to the library.
6. Audience chips are toggles. **+ add rule** opens the long-tail property picker.
7. Drag the traffic slider and watch the enrolment bar redraw. The two-tier split is a picture, not a calculation.
8. **Launch** shows the computed change set by field path. Every line is editable in place.
9. **View as data** shows the record in the shape an API or MCP would expose.

Nothing asks you to save, anywhere.

### Compare the two page structures

**Document** and **Grid** in the top right switch the spine of the record while keeping the same data. Document is a stack of five sections with the comparison grid as a view inside Variants. Grid makes the comparison table the whole page, with everything else as thin bands, and adds a **Changes only** filter so pre-launch review is the same object as the editor. Add a fourth variant in Grid to see where it strains. `notes/05-spine-and-care-packages.md` explains what each one buys and costs.

### Care packages outside an experiment

**Care packages** in the sidebar is a real page. Create a package there, or **Edit** an existing one, and you get the same builder the experiment opens in place. Editing a package referenced by several experiments warns you before you save. **Care products** shows each product's pricing mode and how many packages hold it.

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

1. **Scope.** Confirmed: consume from the Care packages library, with an in-context route to create a missing one. Both routes are now built.
2. **Spine.** Both answers are built and switchable in the prototype, so this is a click rather than a reading exercise. The recommendation is still document, because the grid spine assumes every experiment is a structured-attribute comparison and the roadmap does not support that. `notes/05-spine-and-care-packages.md` section 1.
3. **Automation.** The Spec concept was absorbed rather than shipped. If MCP should genuinely be the primary surface, that reopens.
4. **Vertical, and dosage tiers.** The builder inherits vertical rather than setting it, and dosage tiers are hardcoded per medication. Both need real objects behind them before this is buildable. `notes/05-spine-and-care-packages.md` section 4.
