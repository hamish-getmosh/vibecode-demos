# Mobbin pattern research: experiment configuration UI

Web patterns relevant to a pricing-and-packaging experiment tool (define experiment, variants, packages, cohort, traffic split, review, publish). Findings focus on interaction mechanics, not visual styling.

## 1. Staged / multi-step creation

- **Persistent stage map with completion marks.** [Upwork](https://mobbin.com/flows/0c0b3422-ee47-4889-b0f0-93fff6d38aa3) keeps a full horizontal stepper (Overview → Pricing → … → Review) visible on every screen; completed stages show checkmarks, the active stage shows an edit affordance. Users always see remaining work and a dedicated Review end-state.
- **Save separately from advance.** [Customer.io](https://mobbin.com/flows/afc4139d-58c8-4d0f-92ad-4acb73328b23) exposes Exit, Save, and Save & Next beside the stepper, so draft persistence is not tied to finishing a stage.
- **Stages nest sub-steps.** [Contra](https://mobbin.com/screens/cb05158e-80fc-4d63-9dac-014693a0a524) pairs a top stage rail (Proposal → Contract → Review → Sign) with an accordion of numbered sub-steps inside the active stage, plus an explicit Save as draft control.
- **Vertical step list for non-linear jumps.** [Loops](https://mobbin.com/flows/a668d932-b73f-4462-af9c-bcd0d9619f12) lists Compose / Audience / Schedule / Send as a left “Steps” rail; the whole journey stays visible while Back/Next handles linear movement.
- **Side validation while staging.** Customer.io’s right rail shows a human-readable trigger summary and a live “Matches” count, so users validate audience logic before leaving the stage.

**Implications for the experiment tool:** Use a durable stage map (Setup → Variants → Targeting → Traffic → Review) with independent draft save, and put live validation (cohort size, split totals) beside the form rather than only at the end.

## 2. Editor + live preview workspaces

- **Config drives a dominant preview pane.** [Podia](https://mobbin.com/screens/3517715b-97b4-4177-9354-d5d0684706fa) puts fields and toggles in a left rail and a high-fidelity page render on the right, with desktop/tablet/mobile preview switches.
- **Explicit dirty vs saved state.** Podia shows “Saved”; [StackAI](https://mobbin.com/screens/95b72e77-3b3b-42cd-a79e-a846e7d0d769) shows “Unsaved changes” next to Save/Publish; [beehiiv](https://mobbin.com/screens/358f6c1b-aeec-4dd9-8fee-d07e3a4f9042) pins Unsaved changes + Save Changes in a sticky footer.
- **Draft vs publish are separate actions.** StackAI and [WRITER](https://mobbin.com/screens/57c1c747-0eb5-4d13-9e72-ac0c0c1bb8e6) keep Save/Deploy distinct from publish-like CTAs, with last-saved timestamps where useful.
- **Preview can be on-demand, not only split.** [Upwork](https://mobbin.com/flows/0c0b3422-ee47-4889-b0f0-93fff6d38aa3) uses a “Preview project” control from within the wizard when continuous split view would crowd the form.
- **Micro-preview + macro-preview.** [Mailchimp](https://mobbin.com/screens/e1ea0948-be0c-4c66-9fbe-b55fed8c82f9) nests a small social-card preview in the config rail while the full page preview stays in the main canvas.

**Implications for the experiment tool:** Prefer a config + checkout preview split on variant/package steps, with a persistent Saved/Unsaved indicator and device framing; fall back to on-demand preview on dense forms like cohort rules.

## 3. Nested work surfaces

- **Create a missing sub-object in a drawer over the parent form.** [Airwallex](https://mobbin.com/screens/46ff1614-b773-43c7-abfd-5e949a89cbd9) opens “New department” as a right slide-over while “Invite user” stays dimmed underneath, then returns the new object to the parent selectors (GTM-like layering).
- **Edit complex children in a side panel with its own commit.** [Gorgias](https://mobbin.com/screens/9138a6bf-f346-4702-b35e-59a17d5044fa) slides a Tags drawer over AI settings with its own Save Changes / Cancel, so nested commits are explicit.
- **Filter/build rules without leaving the stage.** [Customer.io](https://mobbin.com/flows/afc4139d-58c8-4d0f-92ad-4acb73328b23) opens an “Audience filters” drawer from the Trigger step; the parent summary updates when the drawer closes.
- **Inspect hierarchy with checkboxes and bulk include.** [Quicken](https://mobbin.com/screens/ee9bca99-93ef-45d4-888f-30d1c51efc10) uses a right drawer with nested account trees, selection counts, and + Account to create from inside the picker.
- **Stack confirmation on top of a history drawer.** [Notion](https://mobbin.com/screens/e8ed9805-4357-4690-8bfc-9185f37c0a93) layers Version history then a Restore confirmation modal, clarifying destructive depth.

**Implications for the experiment tool:** Create/edit Package → Plan → Price/dosage → care products in stacked slide-overs that keep the variant parent visible; give each layer Cancel/Save so nested work does not silently mutate the experiment draft.

## 4. Object library + assembly

- **Searchable catalog, then place into a canvas.** [Zapier Interfaces](https://mobbin.com/screens/788dcb4c-6679-4950-857e-2252fd1575e7) and [Wix](https://mobbin.com/screens/b24397cb-9340-4e1e-9253-37d578e7f7fb) present component/section libraries with thumbnails; assembly happens on a live canvas with drop zones.
- **Domain objects live in the library, not only generic widgets.** [Squarespace](https://mobbin.com/screens/3860a41c-dc1c-4967-a178-bc684fb6bfa9) includes Sell items such as Product and Pricing Plan beside essentials.
- **Reusable segments are selected into campaigns.** Customer.io assembles campaigns from existing segments (IN Valid Email Address AND IN Signed up) with inspect popovers; [beehiiv](https://mobbin.com/flows/b61096b2-db1d-44b0-89d5-86563e5ae2a1) builds segments as AND/OR condition trees that save as first-class objects.
- **Audience assembly shows live membership.** [Loops](https://mobbin.com/flows/a668d932-b73f-4462-af9c-bcd0d9619f12) pairs attribute/operator/value filters with a match count and sample table before advancing.
- **Create-from-library escape hatch.** WRITER offers “Set up a new … voice” beside a select control when the library lacks the needed object.

**Implications for the experiment tool:** Treat packages (and maybe cohorts) as a library managed outside the experiment, then assemble by select-or-create on each variant; show live membership for cohort rules before publish.

## 5. Diff / comparison + publish review

- **Gate publish behind a side-by-side diff modal.** [ElevenLabs](https://mobbin.com/screens/ff16450b-9de9-4c60-8738-770be8df0a5c) compares Published vs Current changes, expands only changed hunks, optional version description, then Publish.
- **Publish as a mini-wizard with filtered deltas.** [Vapi](https://mobbin.com/screens/5f8324b9-1e1f-4118-b0fb-f575d9b70848) uses Publish Steps (Review Changes → …) with +/− counts and “Show Unchanged Values” off by default.
- **Object-level change list + visual pair.** [Figma](https://mobbin.com/screens/ebb90bf9-735a-4f5f-968a-8152ff58dde8) lists Added/Removed layers, side-by-side (or overlay) previews, and a property/code pane for the selected item.
- **Filter to changed items only.** [GitBook](https://mobbin.com/screens/3ca28996-7b99-4add-af2f-c3ee8a8ceac4) toggles “Show only changed pages” and offers Editor / Changes / Preview modes.
- **Review completeness before final submit.** [GitHub](https://mobbin.com/screens/cfe962fd-5b58-4bb6-8a52-bda060b30da5) tracks “files viewed” progress and finishes review in a nested popover; [Linear](https://mobbin.com/screens/6c14e085-9ff5-4e61-9a21-b04f1b0a3433) steps through “1 of N” highlighted changes.
- **Compare configurations column-wise while editing.** Upwork’s Pricing step edits Starter / Standard / Advanced as parallel columns, making variant differences scannable before Review.

**Implications for the experiment tool:** End with a Review that lists only fields that differ across variants (packages, prices, traffic, cohort), plus side-by-side checkout previews, before a single Publish confirmation.

## Cross-cutting principles

- Keep a durable map of stages or objects so users can jump without losing draft state.
- Separate persist (Save / autosave) from go-live (Publish / Deploy).
- Prefer layered surfaces for nested CRUD; keep parent context dimmed but visible.
- Prefer select-from-library with create-in-place when a dependency is missing.
- Pair every high-risk config with a live consequence preview (UI render, match count, or diff).
- Default review UIs to “changes only,” with expand-for-context.
- Surface dirty/saved status continuously in chrome, not only after a failed submit.
- Use parallel columns or dual previews when the job is “make variants differ intentionally.”

## Anti-patterns observed

- Full-page navigations for creating a small dependency (forces re-finding the parent form).
- Publish that skips a change summary when configs are nested and easy to mis-set.
- Sticky preview with no Saved/Unsaved signal (users cannot trust the draft).
- Libraries without search/categories when the object set is large (Pricing Plan–scale catalogs).
- Linear wizards that hide future stages until “Next,” reducing confidence about remaining work.
