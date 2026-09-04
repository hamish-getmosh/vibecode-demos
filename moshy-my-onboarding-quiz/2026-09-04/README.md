# MOSHY MY · 002 onboarding value stack

Design mixboard for the long consult onboarding quiz (quiz 002). Static snapshot for colleague review; not the live Framer build.

**Source repo:** https://github.com/hamish-getmosh/moshy-malaysia-framer (`quizzes/002_onboarding-value-stack/`)

**Share with colleagues:** https://hamish-getmosh.github.io/vibecode-demos/moshy-my-onboarding-quiz/2026-09-04/boards/mixboard.html

**Live interactive quiz (Framer branch):** https://appreciative-confidence-252404--new-quiz-kkckrrqfa.framer.app/quiz/002_onboarding

This folder is a published snapshot. Git root is three levels up at `vibecode-demos/`. To refresh from source and republish:

```bash
# From moshy-malaysia-framer repo root (update paths if the snapshot date changes)
SRC=quizzes/002_onboarding-value-stack
DEST=/Users/hamishsnodgrass/Projects/vibecode-demos/moshy-my-onboarding-quiz/2026-09-04
rsync -a --delete --exclude='frames/lib/' --exclude='*.mjs' "$SRC/" "$DEST/"
# Re-apply font paths in design/midfi-shared.css (./fonts/ not /design/moshy/...)

cd /Users/hamishsnodgrass/Projects/vibecode-demos
git add moshy-my-onboarding-quiz/2026-09-04
git commit -m "Refresh MOSHY MY quiz 002 mixboard snapshot"
git push origin main
```

GitHub Pages redeploys automatically from `main`.

## What to open

| Surface | URL |
|---------|-----|
| **Mixboard (start here)** | [mixboard.html](https://hamish-getmosh.github.io/vibecode-demos/moshy-my-onboarding-quiz/2026-09-04/boards/mixboard.html) |
| Templates gallery | [gallery.html](https://hamish-getmosh.github.io/vibecode-demos/moshy-my-onboarding-quiz/2026-09-04/frames/gallery.html) |
| Components gallery | [components/gallery.html](https://hamish-getmosh.github.io/vibecode-demos/moshy-my-onboarding-quiz/2026-09-04/frames/components/gallery.html) |

Use the left nav on the mixboard to jump between acts. Toggle **Male / Female** in the sidebar to see branch-only screens (e.g. female gate, menopause).

## Local preview

Serve from the `vibecode-demos` repo root (not `file://`):

```bash
cd /Users/hamishsnodgrass/Projects/vibecode-demos
python3 -m http.server 8824 --bind 127.0.0.1
# http://127.0.0.1:8824/moshy-my-onboarding-quiz/2026-09-04/boards/mixboard.html
```

## Notes

- View-only on GitHub Pages. Gallery **Save spacing** needs the local preview API (`preview-quizzes.sh` on port 8777 in the source repo).
- Snapshot date: 2026-09-04.
