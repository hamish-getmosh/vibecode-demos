# Framer build notes (002)

**Status:** Branch skip Phase 1 (female gate) on branch **`new-quiz`** (`kkckrrqfa`).

Page: `/quiz/002_onboarding` (`M9W2IZ2bc`).

**Branch preview:** `https://appreciative-confidence-252404--new-quiz-kkckrrqfa.framer.app/quiz/002_onboarding`

## Act 2 slot order (clinical gate steps)

Gender and female gate live in **Act 2** slot on canvas (Act 1 = Intro only):

| Order | Frame | Screen ID | Notes |
|-------|-------|-----------|-------|
| 1 | `MR2YgzSrp` (1.1) | `s-22` | Gender · Question key `gender` |
| 2 | `VjMfDw_F1` (1.2) | `s-22b` | Female gate · Pregnant variant · Question key `female-gate` |
| 3 | `aGcx1j5oR` (1.3) | `s-23` | Height |
| 4 | `NJJNe0ISZ` (1.4) | `s-24` | Height (duplicate; fix to Weight later) |
| 5 | `wx9c9KD4O` (1.5) | `s-25` | Health conditions |

**QuizDriver screen IDs (CLI):**

```text
SET Q1NBWqRQA $control__act1ScreenIds="s-11"
SET Q1NBWqRQA $control__act2ScreenIds="s-22,s-22b,s-23,s-24,s-25"
SET Q1NBWqRQA $control__act3ScreenIds="s-31,s-32"
```

## Branch QA (Male skips female gate)

```bash
node framer/code/lib/quizBranchNavigation.test.mjs
node framer/code/tracking/tests/quiz-branch-smoke.mjs --config framer/code/tracking/tests/fixtures/quiz-002-new-quiz-branch-smoke.json
```

Expected: Male on gender → height (not pregnancy screen). Female → pregnancy screen. Back from height on Male path → gender.

## Canvas model

| Piece | ID / notes |
|-------|------------|
| QuizDriver | `Q1NBWqRQA` — Act 1–4 guts slots (8 max each) |
| Intro (Act 1 step 0) | `INB065_Ns` → **Intro** `AnN7iIoia` |
| Step gender | `MR2YgzSrp` → **Radio Question** (`hkvfzLwpE`), **Question key** `gender` |
| Step height | `aGcx1j5oR` → **Number Input** (`DudcnbWdK`), variant Height, **Question key** `height`, **Control Bar** `Default` |
| **Number Input** master | `DudcnbWdK` — **Control Bar** (`FLLZtdmi1`) + **Question key** (`IuLwsEDr3`); **QuizNumericField** `codeFile/NZpSXHl:default`; hidden **ControlBarSelector** |
| **QuizNumericField** | `codeFile/NZpSXHl:default` — interactive field (min 120 cm height; weight variant min 35 kg) |
| **TrustpilotSelector** | `codeFile/DUpjAvT:default` — hidden bridge; **Shell Trustpilot** variable (`O1uY3sIGJ`) |
| Shell Trustpilot override | `codeFile/WwQ1f3X:withQuizTrustpilotShell` on scroll embed `ZGBtTn059` |
| ControlBarDriver | `vtKLaNTJ5` |
| On Load bar frame | `Ej6vSE1i7` → instance `jXMtIl4Vy` |
| Default bar frame | `bGet0zQfu` → instance `LQGcJ6NmJ` + **QuizProgPills** `Ct4yRkzUD` |
| Intro component | `AnN7iIoia` — **Control Bar** (`vOJLTRhh_`) + **Question key** (`XdGh6UABH`, blank) + **Content align** (`HDwomP5rZ`, default `Top`) |
| Intro instance (Act 1 step 0) | `YEHF9rg6r` on frame `INB065_Ns` — **Content align** = `Center` |
| **ContentAlignSelector** | `codeFile/jlHCwDC:default` hidden in Intro master (`SFQ9xGB_B`); chain-linked to **Content align** |
| Scroll area align override | `codeFile/D_Nm0hg:withQuizScrollAlign` on frame `P7niaT8rn` |
| Radio Question component | `hkvfzLwpE` — **Control Bar** (`KRn4mQHOs`) + **Question key** (`AODghvRm3`) |
| **Multiple Select** master | `yXyWC4uSc` — **Control Bar** (`x3BbY4FBP`, key `$control__controlBar1`) + **Question key** (`J4U3YjLtK`) |
| Multiple Select variant | `yYiiGA_AQ` — hidden **ControlBarSelector** `A45QqtlRb` + **QuizAnswerKeySelector** `CD7TAKzcl` (`mode=multi`) + **QuizMultiSelectStack** `K6xwBY28a` |
| Step health conditions (1.5) | Frame `wx9c9KD4O` → instance `K8TZh2UoK` — **Control Bar** `Default`, **Question key** `conditions` |
| **QuizMultiSelectStack** | `codeFile/EHR5B5Q:default` — toggle rows + CTA reveal; **Options** array is canvas SSOT |
| **Loader** (Act 3 step 1.6) | Frame `Xj8HU122O` → instance `lX8D3pIIB` → **Loader** `ppWwkpKTb` |
| **Loader** master | `ppWwkpKTb` — **Control Bar** (`PqsQrfCOt`) + **Question key** (`c7sLujGBE`) + **Shell Trustpilot** (`uWgFdQeXI`); hidden **ControlBarSelector** / **QuizAnswerKeySelector** / **TrustpilotSelector** |
| **QuizLoaderStack** | `codeFile/KND7sAT:default` inside Loader master — timer sequence + `goForward()` on complete |

## Loader step (Act 3 · s-38)

QuizDriver **Act 3** slot: `Xj8HU122O` (canvas label **1.6**) then `xzHWQq12X` (1.7 BMI).

| Instance prop | Value |
|---------------|-------|
| **Control Bar** | `Default` |
| **Question key** | blank |
| **Shell Trustpilot** | `Hide in shell` |

**QuizLoaderStack** on live instance (via Loader master): `previewMode` off, `autoPlay` on, `proceedOnComplete` on, `loop` off, `entryDelay` 500 ms, `rowStagger` 120 ms, `pauseAfterComplete` 1500 ms. Headline/stack **Appear on mount** on Loader master.

Component Lab stack (`FbNUqoawm`): `previewMode` on, `previewActiveIndex` 0, `proceedOnComplete` off.

**Steps array (s-38):** set in Framer UI on Loader master stack — four rows from [`adding-it-up.json`](../frames/templates/loader/hydrations/adding-it-up.json) (CLI array control not yet supported).


1. **Order steps within an act:** QuizDriver → **Act N** slot (drag Step frames). Act 1: Intro (`INB065_Ns`) then radio steps.
2. **Pill count:** Automatic from active act slot length (2, 4, 6, etc.).
3. **Edit question:** Step frame → **Radio Question** (copy, options, variant).
4. **Set chrome:** Same nested panel → **Control Bar** (`On Load` / `Default` / `Hidden`).
5. **Set Question key** on **Radio Question** (e.g. `gender`). **Leave blank** on Intro / loader / exit.
6. **Canvas Preview** on QuizDriver to scrub flat steps across acts.
7. **Static pill reference:** Keep canvas dots on Default bar; live `QuizProgPills` sits on top (right).

Do not duplicate Radio Question rows on the page. One Step frame per step in act slots only.

## Answer store (2026-09-03)

| Layer | Detail |
|-------|--------|
| sessionStorage | `moshy_quiz_002_answers` JSON blob |
| Key shape | `act-{N}_{questionKey}` e.g. `act-1_gender` |
| Question key | Set on guts template instance; hidden **QuizAnswerKeySelector** persists picks (`mode=multi` for Multiple Select → `string[]`) |
| Option Value | English id per row — what gets saved (radio: string; multi: string array) |

**Quick test:** pick → forward → back (selected) → refresh (still in tab storage).

## Off-canvas slot width

Slot items parked off-page use **fixed 326px** width (`390 − 32 − 32` side padding) so they are editable on canvas. **Drivers on-page stay Fill (1fr)** inside the `max width` stack (`380px` cap). Step / control wrappers off-page: `326px`; children inside those wrappers: **Fill**.

`QuizDriver` clamps slot step frames to the driver column width at runtime. Intro component variant root is **326px** fixed (same pattern as Radio Question).

**Full rules for new templates:** [`methods/quiz-guts-slot-templates.md`](../../../methods/quiz-guts-slot-templates.md).

## Control bar → ControlBarDriver

- **Control Bar** option variable on Radio Question (`KRn4mQHOs`)
- **Question key** string variable on Radio Question (`AODghvRm3`)
- **ControlBarSelector** (`codeFile/Pqynv86:default`) hidden inside Radio Question master
- **QuizAnswerKeySelector** (`codeFile/pRXWc_z:default`) hidden inside Radio Question master; link Question key variable (chain icon); **writes** picks to store
- **QuizRadioStack** inside variant: link **Question key** to same variable; **reads** store to rehighlight on back nav
- One-time master setup: select Control Bar Selector → **Control bar** → chain icon → **Control Bar** variable
- **QuizProgPills** (`codeFile/aDjJT3W:default`) on Default bar frame, right-aligned

## Code files

| File | Export |
|------|--------|
| `QuizDriver.tsx` | `codeFile/jOv6GTM:default` |
| `QuizProgPills.tsx` | `codeFile/aDjJT3W:default` |
| `ControlBarDriver.tsx` | `codeFile/fKQtxZA:default` |
| `ControlBarSelector.tsx` | `codeFile/Pqynv86:default` |
| `ContentAlignSelector.tsx` | `codeFile/jlHCwDC:default` |
| `QuizScrollAlign.tsx` | `codeFile/D_Nm0hg:withQuizScrollAlign` on scroll area `P7niaT8rn` |
| `QuizNavBack.tsx` | `codeFile/hKaV3QZ:withQuizNavBack` |
| `QuizNavForward.tsx` | `codeFile/h3VM7st:withQuizNavForward` on Quiz CTA master (`PqXrMuDrT`) |
| `QuizAnswerKeySelector.tsx` | `codeFile/pRXWc_z:default` (hidden in guts template masters; `mode=multi` on Multiple Select) |
| `QuizMultiSelectStack.tsx` | `codeFile/EHR5B5Q:default` (Multiple Select master toggle rows) |
| `QuizNumericField.tsx` | `codeFile/NZpSXHl:default` (Number Input master, Height/Weight variants) |
| `QuizGutsRadio.tsx` | `codeFile/uplW17a:default` (component lab only; not used on quiz canvas) |

## Proceed (Marcus)

| Step type | Proceed |
|-----------|---------|
| Intro / entry / eligible | **Quiz CTA** tap (no page link on instance) |
| Multi-select | **QuizMultiSelectStack** toggles reveal hidden **Quiz CTA**; CTA tap proceeds; store key `act-2_conditions` (array) |
| Single-select radio | Tap option → auto-advance (no CTA) |
| Numeric (height/weight) | **Quiz CTA** tap; `QuizNumericField` gates via `stepCanProceed` |
| Loader | Timer sequence in **QuizLoaderStack** → auto `goForward()` after pause |
| Exit (decline) | Quiz CTA **with link** (override skips) |

## Eval commands

```bash
node framer/code/lib/quizActNavigation.test.mjs
node framer/code/tracking/tests/quiz-driver-smoke.mjs --config framer/code/tracking/tests/fixtures/quiz-002-guts-update-smoke.json
node framer/code/tracking/tests/quiz-multi-select-smoke.mjs
```

`QuizGutsStep` deprecated; remove from Framer assets if still listed.
