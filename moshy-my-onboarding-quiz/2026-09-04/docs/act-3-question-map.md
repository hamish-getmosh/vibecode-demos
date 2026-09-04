# Act 2–3 question map · Flow C (confirmed)

**Run:** `2026-09-01-moshy-my-consult-onboarding`  
**Board:** [`consult-onboarding-flow-lofi.html`](consult-onboarding-flow-lofi.html)  
**Market:** MOSHY MY · Strategy A · **Doctor** (not practitioner)

---

## Flow overview

```text
ACT 2 · Clinical gate
  permission → gender → [female gate · split] → height → weight → conditions
      ↓
ACT 3a · Eligibility win
  loader → BMI check passed
      ↓
ACT 3b · Metabolic profile (projection theatre inputs)
  age → yo-yo history → harder lately → [♀ menopause | ♂ energy] → carry weight
      ↓
ACT 3c · Projection
  adding it up → stat → 300g
```

---

## Act 2 · Clinical gate

### 2.1 · Why we ask → Check-in roadmap

**Headline:** Let's get you checked in for doctor-led weight loss  
**Sub:** A few quick questions. Here's what happens next:

1. **Confirm your eligibility** for a GLP-1 prescription programme  
2. **See your personalised estimate** — how much weight you could lose over 12 months  
3. **Explore your options** — next steps with a doctor, only if you're happy  

**Visual:** Simple 3-step roadmap (check → chart → doctor)  
**CTA:** Get started  
**Tone:** GP intake, not sales. No payment on this screen.

### 2.2 · Gender

**Headline:** What is your gender?  
**Sub:** For medical purposes.  
**Options:** Female · Male  
**Branch:** Female → 2.2b · Male → 2.3

### 2.2b · Female gate (split options)

**Headline:** Do any of the following apply to you right now?  
**Sub:** GLP-1 programmes aren't suitable during these times.  
**Input:** Single-select radio · **None of these** default selected

| Label | Value |
|-------|-------|
| I'm pregnant | `pregnant` |
| I'm breastfeeding | `breastfeeding` |
| I'm planning a pregnancy in the next 3 months | `planning-pregnancy` |
| None of these | `none` |

**If any risk option selected:** ineligible exit (sympathetic). **None of these** → continue.

### 2.3 · Height · 2.4 · Weight

Standard numeric (cm / kg).

### 2.5 · Health conditions (multi-select, marketing)

**Headline:** Do any of these apply to you?  
**Sub:** Select all that apply.

Type 2 diabetes · High blood pressure · PCOS · Thyroid condition · Heart disease · None of these

---

## Act 3a · Eligibility win

### 3.1 · Checking eligibility

**Headline:** One moment  
**Sub:** Checking your BMI and health profile.  
**Checkmarks:** BMI range ✓ · Health profile ✓ · Confirming eligibility…

### 3.2 · BMI check passed

**Layout:** Tick hero → headline → subhead → what we checked (all Passed) → next step row → CTA

**Headline:** Your BMI is in range  
**Sub:** Next we'll build your metabolic profile and show you a personalised weight estimate.  
**What we checked:** Height & weight · Passed · Health conditions · Passed · Clinical eligibility · Passed (all green)  
**Next:** Calculate how much weight I could lose · Next step (blue pill)  
**CTA:** Continue  

**Framer note:** On ♀ path, swap row 3 label to "Women's health screening" (still Passed). Age is Act 2 (3.3).

---

## Act 3b · Metabolic profile

*Footer on each screen:* Personalising your 12-month estimate.

### 3.3 · Age

**Headline:** How old are you?  
**Sub:** Age affects how your body responds to treatment.  
**Bands:** 18–29 · 30–39 · 40–49 · 50–59 · 60–69 · 70+

### 3.4 · Yo-yo history

**Headline:** Have you lost weight before and gained it back?  
**Sub:** This helps us model a realistic trajectory for you.

| Label | Value |
|-------|-------|
| No, not really | `never` |
| Once | `once` |
| A few times | `few-times` |
| Yes — yo-yo for years | `yo-yo` |

### 3.5 · Harder lately

**Headline:** Has losing weight felt harder than it used to?  
**Sub:** Many people notice their body responds differently over time.

| Label | Value |
|-------|-------|
| No | `no` |
| A little | `a-little` |
| Yes, much harder | `yes` |
| I'm not sure | `unsure` |

### 3.6a · Menopause (female only)

**Headline:** Are you in perimenopause or menopause?  
**Sub:** Hormonal changes can affect weight — we factor this into your estimate.

| Label | Value |
|-------|-------|
| Not that I'm aware of | `no` |
| Maybe / perimenopause | `peri` |
| Yes, menopause | `menopause` |
| Prefer not to say | `prefer-not` |

### 3.6b · Energy (male only)

**Headline:** How would you describe your energy lately?  
**Sub:** Energy and metabolism often shift with age — this helps personalise your estimate.

| Label | Value |
|-------|-------|
| Plenty of energy and drive | `high` |
| Fine, but not like it used to be | `moderate` |
| Often flat or run down | `low` |
| Exhausted most days | `exhausted` |

*Hints at hormonal/metabolic shift without naming testosterone.*

### 3.7 · Carry weight (both)

**Headline:** Where do you tend to carry weight?  
**Sub:** Body shape affects how weight comes off.

| Label | Value |
|-------|-------|
| Mostly around my belly | `belly` |
| Hips and thighs | `hips-thighs` |
| All over fairly evenly | `even` |
| Not sure | `unsure` |

---

## Act 3c · Projection

### 3.8 · Adding it up

**Headline:** Adding it up  
**Sub:** Personalising your 12-month estimate.  
**Checkmarks:**

- Your metabolic profile ✓  
- Age and body factors ✓  
- Calculating 12-month estimate…  
- Preparing your results

**Reveal subcopy can reference:** age, yo-yo pattern, hormonal/energy factors, where you carry weight.

### 3.9 · Stat reveal

**Lead:** At your current weight, with Moshy you could lose up to **14 kg** over 12 months  
**Sub:** ~12% body mass · estimate only  
**CTA:** Continue

### 3.10 · 300g reframe

**Headline:** That might sound like a lot.  
**Sub:** With Moshy, it's about **300 grams a day**.  
**Chart:** Without support vs with Moshy  
**CTA:** How it works →

---

## Screen counts (happy path)

| Path | Act 2 | 3a | 3b | 3c | Total to Act 4 |
|------|-------|-----|-----|-----|----------------|
| Male | 5 | 2 | 5 | 3 | **15** |
| Female | 6 | 2 | 5 | 3 | **16** |

---

## Branching

```text
gender
 ├─ Female → female gate (split) → [ineligible if pregnant/BF/planning]
 └─ Male → height
height → weight → conditions
loader → BMI passed
age → yo-yo → harder lately
 ├─ ♀ menopause
 └─ ♂ energy
carry weight → adding it up → stat → 300g
```
