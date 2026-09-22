import { Check, ChevronDown, Settings2, Trophy } from "lucide-react";
import { useState } from "react";
import { exercises } from "../data/program";
import {
  setSchema,
  type ExerciseLog,
  type Session,
  type SetLog,
} from "../domain/schema";
import { performance, previousExercise, progression } from "../domain/training";
import { useStore } from "../state/StoreProvider";
import { useI18n, variantKey } from "../i18n/messages";
import { ExerciseDetails } from "./ExerciseDetails";
import { NumberField } from "../components/ui";

export function ExerciseCard({
  exercise,
  session,
  index,
  onChange,
}: {
  exercise: ExerciseLog;
  session: Session;
  index: number;
  onChange: (exercise: ExerciseLog) => void;
}) {
  const { store, dispatch } = useStore();
  const { t, loc } = useI18n();
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");
  const definition = exercises[exercise.id];
  const previous = previousExercise(
    store.sessions,
    session.day,
    exercise.id,
    exercise.variant,
  );
  const track = `${session.day}:${exercise.id}:${exercise.variant}`;
  const increment = store.settings.increments[track] ?? 2.5;
  const required = exercise.sets.filter((s) => s.kind === "work").length;
  const target = progression(previous, required, exercise.repMax, increment);
  const work = exercise.sets.filter((s) => s.kind === "work");
  const done = work.filter((s) => s.done).length;
  const historical = performance(
    store.sessions,
    session.day,
    exercise.id,
    exercise.variant,
  );
  const best = historical.length
    ? Math.max(...historical.map((p) => p.weight))
    : null;
  const isRecord =
    best !== null && work.some((s) => s.done && s.weight! > best);
  const updateSet = (id: string, patch: Partial<SetLog>) => {
    setError("");
    onChange({
      ...exercise,
      startedAt: exercise.startedAt ?? Date.now(),
      sets: exercise.sets.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  };
  const complete = (set: SetLog) => {
    if (set.done) {
      updateSet(set.id, { done: false, completedAt: null });
      return;
    }
    const result = setSchema.safeParse({
      ...set,
      done: true,
      completedAt: Date.now(),
    });
    if (!result.success) {
      setError(t("invalidSet"));
      return;
    }
    updateSet(set.id, { done: true, completedAt: Date.now() });
    dispatch({
      type: "timer",
      deadline:
        Date.now() +
        (exercise.restSeconds ?? store.settings.restSeconds) * 1000,
    });
  };
  const changeVariant = (variant: string) => {
    const old = previousExercise(
      store.sessions,
      session.day,
      exercise.id,
      variant,
    );
    const suggestion = progression(
      old,
      required,
      exercise.repMax,
      store.settings.increments[`${session.day}:${exercise.id}:${variant}`] ??
        2.5,
    );
    onChange({
      ...exercise,
      variant,
      notes: store.settings.notes[`${exercise.id}:${variant}`] ?? "",
      sets: exercise.sets.map((s) => ({
        ...s,
        weight: s.kind === "work" ? suggestion.weight : null,
        reps: null,
        rir: null,
      })),
    });
    dispatch({
      type: "settings",
      patch: {
        variants: { ...store.settings.variants, [exercise.id]: variant },
      },
    });
  };
  return (
    <article
      className={`exercise-card ${done === work.length ? "exercise-done" : ""}`}
    >
      <div className="exercise-heading">
        <span className="exercise-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="exercise-title">
          <h3>
            <button
              className="exercise-detail-trigger"
              onClick={() => setShowDetails(true)}
              aria-haspopup="dialog"
            >
              {loc(definition.name)}
              <span>{t("viewDetails")} ↗</span>
            </button>
          </h3>
          <p>
            {required} × {exercise.repMin}–{exercise.repMax}
            {exercise.id === "bulgarian" ? ` / ${t("perLeg")}` : ""}
            <span>·</span>
            {exercise.restSeconds ?? store.settings.restSeconds} s
          </p>
        </div>
        <span className="set-count">
          {done}/{work.length}
          <Check size={13} />
        </span>
      </div>
      {isRecord && (
        <div className="record-badge" role="status">
          <Trophy size={14} />
          {t("personalBest")}
        </div>
      )}
      <div className="last-performance">
        <span>{t("previous")}</span>
        <strong>
          {previous
            ? previous.sets
                .filter((s) => s.done && s.kind === "work")
                .map((s) => `${s.weight} kg × ${s.reps}`)
                .join(" / ")
            : "—"}
        </strong>
      </div>
      <div
        className="set-table"
        role="group"
        aria-label={`${loc(definition.name)} ${t("workingSets")}`}
      >
        <div className="set-table-head">
          <span>{t("set")}</span>
          <span>
            {definition.addedWeight
              ? t("addedWeight")
              : exercise.variant === "dumbbell"
                ? t("perDumbbell")
                : t("weight")}
            <small> kg</small>
          </span>
          <span>{t("reps")}</span>
          <span title={t("rirHelp")}>RIR</span>
          <span />
        </div>
        {exercise.sets.map((set, i) => (
          <div key={set.id} className={`set-row ${set.done ? "logged" : ""}`}>
            <span
              className={set.kind === "warmup" ? "warmup-tag" : "work-tag"}
              title={set.kind === "warmup" ? t("warmup") : t("workingSets")}
            >
              {set.kind === "warmup"
                ? "W"
                : i -
                  exercise.sets.filter((s) => s.kind === "warmup").length +
                  1}
            </span>
            <input
              aria-label={`${loc(definition.name)} ${i + 1} ${t("weight")}`}
              type="number"
              inputMode="decimal"
              min="0"
              max="2000"
              step="any"
              disabled={set.done}
              placeholder="—"
              value={set.weight ?? ""}
              onChange={(e) => {
                if (e.target.value && !e.target.validity.valid) return;
                updateSet(set.id, {
                  weight: e.target.value === "" ? null : Number(e.target.value),
                });
              }}
            />
            <input
              aria-label={`${loc(definition.name)} ${i + 1} ${t("reps")}`}
              type="number"
              inputMode="numeric"
              min="1"
              max="200"
              step="1"
              disabled={set.done}
              placeholder={`${exercise.repMin}–${exercise.repMax}`}
              value={set.reps ?? ""}
              onChange={(e) => {
                if (e.target.value && !e.target.validity.valid) return;
                updateSet(set.id, {
                  reps: e.target.value === "" ? null : Number(e.target.value),
                });
              }}
            />
            <input
              aria-label={`${loc(definition.name)} ${i + 1} RIR`}
              title={t("rirHelp")}
              type="number"
              inputMode="decimal"
              min="0"
              max="10"
              step="0.5"
              disabled={set.done}
              placeholder="—"
              value={set.rir ?? ""}
              onChange={(e) => {
                if (e.target.value && !e.target.validity.valid) return;
                updateSet(set.id, {
                  rir: e.target.value === "" ? null : Number(e.target.value),
                });
              }}
            />
            <button
              className="set-check"
              aria-label={`${set.done ? t("undo") : t("complete")} ${i + 1} ${loc(definition.name)}`}
              aria-pressed={set.done}
              onClick={() => complete(set)}
            >
              <Check size={18} />
            </button>
          </div>
        ))}
      </div>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <details className="exercise-details">
        <summary>
          <Settings2 size={14} />
          {t("setup")}
          <ChevronDown size={14} />
        </summary>
        <p>{loc(definition.note)}</p>
        <p className="muted">{t("rirHelp")}</p>
        {definition.variants.length > 1 && (
          <label className="field">
            <span>{t("variant")}</span>
            <select
              value={exercise.variant}
              disabled={exercise.sets.some((s) => s.done)}
              onChange={(e) => changeVariant(e.target.value)}
            >
              {definition.variants.map((v) => (
                <option key={v} value={v}>
                  {t(variantKey(v))}
                </option>
              ))}
            </select>
            <small>{t("variantHelp")}</small>
          </label>
        )}
        <div className="target-note">
          <strong>
            {t("target")}: {target.weight ?? "—"} kg
          </strong>
          <p>{t(target.reason)}</p>
        </div>
        <NumberField
          label={t("increment")}
          value={increment}
          min={0.25}
          max={100}
          onChange={(value) => {
            if (value && value <= 100 && value >= 0.25)
              dispatch({
                type: "settings",
                patch: {
                  increments: { ...store.settings.increments, [track]: value },
                },
              });
          }}
        />
        <label className="field">
          <span>{t("setup")}</span>
          <textarea
            value={exercise.notes}
            maxLength={3000}
            placeholder={t("setupHelp")}
            onChange={(e) => {
              onChange({ ...exercise, notes: e.target.value });
              dispatch({
                type: "settings",
                patch: {
                  notes: {
                    ...store.settings.notes,
                    [`${exercise.id}:${exercise.variant}`]: e.target.value,
                  },
                },
              });
            }}
          />
        </label>
        <small className="muted">{t("loadHelp")}</small>
      </details>
      {showDetails && (
        <ExerciseDetails
          id={exercise.id}
          day={session.day}
          variant={exercise.variant}
          onClose={() => setShowDetails(false)}
        />
      )}
    </article>
  );
}
