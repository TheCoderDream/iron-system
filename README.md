# IRON SYSTEM — V7

A personal training companion built with **React 19, strict TypeScript and Vite**. The original V6 program and its English, Spanish, Russian and Turkish exercise content are preserved. The interface keeps the dark/lime identity and adapts to phone, tablet and desktop.

## Run locally

Use **Node 22.12+ (Node 24 recommended)** and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. Do not open `index.html` as a file: React modules and offline installation require an HTTP server.

```sh
npm run build
npm run preview
```

The production output is in `dist/`. It can be served as a static site at a root or subdirectory. Hosting must use HTTPS for service workers (localhost is also supported). Navigation uses URL fragments, so server-side route rewrites are unnecessary. No accounts, API keys or server database are required.

## Netlify deployment

The included `netlify.toml` configures Node 24, the production build, `dist/` publishing and cache headers. Follow [NETLIFY.md](NETLIFY.md) for Git or manual deployment, verification and moving local workout data to the new domain.

## Features

- **Train:** start/resume dated workouts; per-set kg/reps/optional RIR; separate warm-up and work sets; previous performance; editable suggested loads; variant-specific setup notes; automatic 2:00/2:30/3:00 rest timer with extend/skip and optional sound; measured session duration and exercise time spans.
- **Progression:** double progression, configurable increments per training day/exercise/variant, independent strength and hypertrophy histories, weighted dips/pull-up records, charts for load/reps/external volume, separately charted bodyweight, consistency heatmap and explainable repeated-decline observations.
- **Upper B:** configurable short session, explicit omissions and working-set difference, intact full program, estimated duration with recent-session average when history exists.
- **Variants:** dumbbell/Smith incline press, cable/chest-supported row, machine/dumbbell rear delts, skull crushers/bench dips. Changing equipment does not mix load history. Select before completing a set.
- **History:** saved sessions, incomplete sets, notes, equipment, check-in, cardio and bodyweight context; filters and CSV set export.
- **Schedule:** flexible dates with later lifting days moved forward as needed; lifting order remains Upper A → Lower A → Upper B → Lower B.
- **Analytics:** weekly direct and secondary muscle sets shown separately alongside the saved plan's target. Warm-ups do not count as working volume. A full-plan target is a reference, not a prescription to add sets to short sessions.
- **Measurements:** dated weight, waist, arm and thigh measurements with charts and deletion.
- **Tools:** warm-up planner and balanced plate calculator with configurable bar/plate weights. The plate calculator assumes enough matching pairs of each listed size and reports the load it can assemble; it does not track plate inventory.
- **Cardio/check-in:** activity and duration logging, optional bodyweight, energy and soreness, session notes.
- **Data:** autosave, validated JSON export/import with preview and explicit replacement, corrupt-storage protection and recovery export. CSV is for analysis; restore uses JSON.
- **Offline:** installable web app; the production service worker caches the application and local icons. Mobile timer stays above navigation during a lifting session.

## Plan editor and video tutorials

The **Plan** panel edits the four lifting days: choose from 19 supported exercises, add/remove/reorder movements, change working sets (1–10), warm-ups (0–6), rep ranges (1–100) and rest (30–600 seconds). Save applies all draft days together. Restore V6 day prepares a reset for review; Save commits it. Changes affect new sessions, progression targets and planned muscle totals. Existing sessions retain their set, rep and rest snapshots. Removed exercises remain available in historical progress filters. The anatomy below the editor reflects the saved plan. The lifting-day schedule and order remain unchanged.

Exercise details include public YouTube tutorials for every supported exercise and variant, loaded only after pressing Play. Original source links remain available if embedding fails. Save an HTTPS tutorial URL per exercise/variant; YouTube links embed, other providers open externally. Videos need internet and are not included in offline backups; their URLs are backed up. Demos illustrate technique, while your program controls load, bench angle and reps. Default tutorial links were discovered from publisher/video pages in September 2026; availability and embedding remain controlled by their publishers.

## Exercise details and training education

Click an exercise in the plan, or its title during a workout, to open a detailed guide. Each movement explains why it earns a place in the program, its complementary role and relevant tradeoffs, followed by setup, execution and common mistakes, an effort guide, warm-up instructions, and a history-based next-load suggestion. Variant exploration changes the explanation and anatomy preview; the logged equipment selection remains in the workout's setup controls.

The anatomy panel offers **full program**, **selected session**, and **logged this week** views. Select a muscle on the SVG or in the accessible ranking to see contributing exercises. Direct sets use a relative color scale; secondary/stabilizing involvement is reported separately. The map is a schematic coaching model, not measured muscle activation, a recovery score, or a hypertrophy prediction. It differentiates deltoid heads and back regions; one compound set may count toward several regions. Short-session omissions affect the selected-session map, not the full-plan baseline. Calves remain unprogrammed, consistent with V6.

The **Guide** page contains nine chapters covering overload, warm-ups, rep execution, failure/RIR, set rests, recovery, strength, deloading and plateaus. Sources include the ACSM 2026 position-stand summary, peer-reviewed reviews/trials, deloading expert consensus, ACE's exercise library, and AASM sleep guidance. Training advice uses cautious, adjustable examples. It does not claim that failure on every set is necessary or that strength gains directly measure hypertrophy. No automatic deload changes are made.

## Data and calculations

Data is stored in this browser's `localStorage` under `iron-system:v7`. There is no cloud sync. Export a backup regularly and before changing browsers, devices or origins. Use one editing tab at a time. The app does not silently replace unreadable storage: it shows a recovery banner and lets you export the stored bytes or in-memory data before an explicit reset.

Legacy language preference is read automatically on the same origin. V6 completion checkmarks are preserved in the backup's `legacyCompleted` field. They have no dates or weights, so the app does not invent historical workouts from them. The original source is preserved in `legacy/`; moving from `file://` to localhost creates a different storage origin.

Sessions snapshot their prescriptions, variant, notes and sets. Only completed work sets contribute to progress. A load increase requires all prescribed work sets at the same load to reach the rep ceiling. First sessions ask you to choose a load; suggestions remain editable. Bodyweight and added weight are stored separately. External volume is `logged load × reps`; it does not claim to measure total mechanical work or make unlike machines comparable. Dumbbell entries use weight per dumbbell consistently.

A performance observation appears after three sessions with descending total reps at the same maximum load and set count. It asks you to review the record; it does not diagnose fatigue, injury or readiness. Energy/soreness values are self-reports, not a computed recovery percentage.

Timer deadlines use wall-clock time, so reloading and returning from the background reconcile elapsed time. Browser suspension can delay sound; there is no guarantee of an alarm while the phone is locked. Desktop/Android installation is available through supported browser menus; iOS uses Safari's Add to Home Screen. Open the production app online once before relying on offline access. Updated workers activate after older app tabs close, avoiding changes mid-workout.

## Code organization

```text
src/
  data/        Translated V6 catalogue, normalized prescriptions and muscle metadata
  domain/      Runtime schemas and pure training, analytics, date and calculator functions
  state/       React reducer/context, local persistence and validated backup boundary
  i18n/        Complete four-language UI dictionary with typed keys
  components/  Shared fields, dialog, chart and timer
  features/    PlanEditor, ExerciseVideo, Train, ExerciseCard, ExerciseDetails, ProgramAnatomy, Learn, Progress, Measurements, History, Schedule, Settings
scripts/       Build-specific service-worker cache versioning
public/        Manifest, icons and service-worker template
legacy/        Original standalone V6 app
```

TypeScript strict mode and runtime validation serve different purposes: types protect application code; Zod checks storage/import data. Domain functions are kept separate from presentation so progression and calculations can be tested without a browser. Browser state updates are immutable; completed sets must be explicitly unchecked before editing. UI strings use typed translations. Charts include text summaries and expandable data, and dialogs use native keyboard focus handling.

## Validation

```sh
npm run lint
npm run test
npm run build
npx playwright install chromium
npm run test:e2e
```

`test:e2e` serves the production build at `127.0.0.1:4173`. To use an existing Chromium binary, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to its absolute path. Build before browser tests. `npm run format` formats source, tests and config.

Domain tests cover prescriptions, warm-ups, short mode, partial sessions, progression eligibility, track isolation, volume, dates, scheduling, calculators and backup validation. Browser tests cover actual input, reload/resume/finish, history/progress, equipment variants, rescheduling, measurement and backup workflows, language persistence, mobile overflow and offline reload.

## Scope

The practical feature set in `IMPLEMENTATION_PLAN.md` is implemented. Social feeds, generic AI coaching, nutrition tracking, cloud synchronization, and native smartwatch/health integrations remain separate future projects, as discussed before this migration. The app is a personal local training tool, not a multi-user service.
