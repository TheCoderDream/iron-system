# IRON SYSTEM — V7 implementation plan

## Product direction

A personal, offline-capable training companion for the existing V6 program. Preserve the dark/lime identity, exercise prescriptions and English, Turkish, Spanish and Russian content. Favor fast logging, clear explanations and optional detail over crowded screens. No accounts or server are required.

## Delivery sequence

1. **Foundation:** React + strict TypeScript + Vite; typed program catalogue; domain functions isolated from UI; versioned, validated local persistence; preserve legacy source and language preference.
2. **Train:** dated, resumable sessions; warm-up/work set logging; previous values; optional RIR; separate variants; bodyweight and added load; autosave; rest timer; measured exercise/session time; notes; finish review.
3. **Progress:** explainable double progression with per-exercise increments and independent strength/hypertrophy tracks; editable targets; PRs; charts; weekly direct/secondary muscle sets; consistency; repeated-decline observations.
4. **Planning:** sequence-preserving rescheduling; equipment variants; configurable Upper B short mode with explicit omitted exercises and set changes; session estimate from logged duration where possible.
5. **Supporting tools:** warm-up and plate calculators; body measurements/trends; cardio logging; energy/soreness check-ins; data backup/import validation and preview; installable offline app.
6. **Quality:** domain and persistence tests; production build and lint; desktop/mobile browser tests; keyboard/labels/contrast/reduced-motion checks; offline reload and corrupted-import checks; user documentation.

## Architecture and decisions

- `src/data`: original translated program plus normalized prescriptions and muscle metadata.
- `src/domain`: Zod schemas, progression, analytics, date and calculator functions.
- `src/state`: React context/reducer and persistence boundary. Session snapshots preserve historical variants and set prescriptions.
- `src/components`: small reusable UI, charts, timer and layout.
- `src/features`: workout, history, progress, schedule and settings screens.
- `src/i18n`: complete four-language interface dictionaries with compile-time key checking.
- Save structured data locally and export portable JSON. Import must validate and preview before replacing data. Never silently overwrite corrupt storage. Legacy checkmarks remain archived, not fabricated as dated training records.
- Timers use wall-clock deadlines, not accumulated interval ticks. Background audio/notifications are best effort; elapsed time reconciles on return.
- Workout history and progression distinguish exercise variant and training day. No comparison between Smith and dumbbell weights.
- Muscle charts label secondary involvement separately; no synthetic recovery percentages or injury predictions.
- All phases above are in scope. Previously deferred social feeds, generic AI coaching, nutrition and native smartwatch/health integrations are not part of this release.

## Acceptance criteria

- A fresh user can choose a session, enter sets, refresh, resume and finish without losing data.
- Previous performance and next targets use only relevant completed historical sessions.
- Partial sessions remain honest: uncompleted sets do not become completed or qualify for progression.
- Upper B short mode never silently changes the full template.
- History, measurements, preferences and active sessions survive backup/restore.
- Four languages, small screens, keyboard navigation and production offline reload work.
- Build, lint, domain tests and browser workflows pass; remaining platform limits are documented.

## Delivery status

- [x] React/TypeScript migration and original V6 archive
- [x] Logging, resume, history, notes, variants, timers and check-ins
- [x] Progression, records, charts, consistency and muscle-volume reporting
- [x] Short Upper B and flexible scheduling
- [x] Measurements, cardio, calculators, JSON/CSV export and validated restore
- [x] Installable offline production build
- [x] Four languages and desktop/mobile visual review
- [x] 24 domain tests and 14 production-browser workflows passing
- [x] TypeScript/build, ESLint and dependency audit checked

The app is ready for local use. Browser background alarms remain best-effort; data is device-local and should be exported regularly. No external deployment or accounts were created.

## Exercise learning and anatomy extension

- Clickable exercise rows in the plan and active workout; setup, execution, common mistakes, effort, rest, warm-up guidance and variant exploration.
- Exercise-specific front/back anatomy with primary vs secondary/stabilizing involvement.
- Program/session/logged-week maps use actual prescribed or completed working-set counts. Regions separate front/side/rear delts, lats, upper back and spinal erectors. Charts do not claim EMG activation or predicted growth.
- Visible progression targets with matching day/equipment history, editable increments and explicit below-range, declining-performance and plateau observations.
- Nine translated guide chapters: progressive overload, warm-ups, set execution, failure, rests, recovery, strength, deloading and plateaus. Links to primary research and professional guidance are embedded in the app.
- Additional domain tests verify anatomical accounting and complete coaching coverage; browser checks cover dialogs, anatomy selection, guide navigation and mobile layouts in all four languages.

## Editable plans and videos

- Added a dedicated translated Plan panel with validated drafts, explicit save/cancel, reorder, add/remove/replace, per-exercise prescriptions and per-day V6 restore.
- Saved plans feed new workout sessions, progression and muscle accounting; old backups receive empty override defaults. Active/completed records remain independent snapshots.
- All supported exercise variants have tutorial links, on-demand YouTube embedding, external fallback and validated custom HTTPS URLs persisted in backups.
