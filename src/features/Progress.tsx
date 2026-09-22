import { useState } from "react";
import { Activity, ArrowUpRight, Trophy } from "lucide-react";
import {
  days,
  exercises,
  liftingDays,
  muscles,
  getProgram,
} from "../data/program";
import type { DayId } from "../domain/schema";
import { localDate } from "../domain/schema";
import {
  addDays,
  completedWork,
  declining,
  performance,
  volume,
  weekStart,
} from "../domain/training";
import { useStore } from "../state/StoreProvider";
import { useI18n, variantKey } from "../i18n/messages";
import { EmptyState, PageHeader, Stat } from "../components/ui";
import { Chart } from "../components/Chart";
import { ProgramAnatomy } from "./ProgramAnatomy";
import { Measurements } from "./Measurements";

export function Progress() {
  const { store } = useStore();
  const program = getProgram(store.settings);
  const { t, loc, date } = useI18n();
  const [day, setDay] = useState<DayId>("upper-a");
  const [exercise, setExercise] = useState(program["upper-a"][0].id);
  const [variant, setVariant] = useState(
    exercises[program["upper-a"][0].id].variants[0],
  );
  const [metric, setMetric] = useState<"weight" | "reps" | "volume">("weight");
  const start = weekStart();
  const today = localDate();
  const weekly = store.sessions.filter(
    (s) => s.date >= start && s.date <= today,
  );
  const points = performance(store.sessions, day, exercise, variant);
  const muscleVolume = volume(store.sessions, start, today, store.settings);
  const dates = Array.from({ length: 28 }, (_, i) => addDays(today, i - 27));
  const trainingDates = new Set(
    store.sessions
      .filter((s) => s.date >= dates[0] && s.date <= today)
      .map((s) => s.date),
  );
  return (
    <>
      <PageHeader
        eyebrow={t("progress")}
        title={t("yourProgress")}
        subtitle={t("progressSub")}
      />
      <div className="stats-strip">
        <Stat label={t("sessions")} value={store.sessions.length} />
        <Stat label={t("thisWeek")} value={weekly.length} />
        <Stat
          label={t("workingSets")}
          value={weekly.reduce((sum, s) => sum + completedWork(s).length, 0)}
        />
        <Stat
          label={t("consistency")}
          value={`${trainingDates.size}/28`}
          detail={t("last28")}
        />
      </div>
      <section className="panel consistency">
        <div className="section-title">
          <h2>{t("consistency")}</h2>
          <span className="muted">{t("last28")}</span>
        </div>
        <div className="heatmap">
          {dates.map((d) => (
            <div
              key={d}
              className={trainingDates.has(d) ? "trained" : ""}
              title={`${date(d)}: ${store.sessions.filter((s) => s.date === d).length} ${t("sessions")}`}
            >
              <span>{new Date(d + "T12:00:00").getDate()}</span>
            </div>
          ))}
        </div>
      </section>
      <div className="record-grid">
        {["pullup", "dips"].map((id) => {
          const records = store.sessions.flatMap((s) =>
            s.exercises
              .filter((e) => e.id === id)
              .flatMap((e) =>
                e.sets.filter((set) => set.kind === "work" && set.done),
              ),
          );
          const best = records.length
            ? Math.max(...records.map((s) => s.weight!))
            : null;
          return (
            <section className="record-card" key={id}>
              <div className="section-title">
                <Trophy size={18} />
                <ArrowUpRight size={18} />
              </div>
              <h3>{loc(exercises[id].name)}</h3>
              <strong>
                {best === null ? "—" : `+${best}`} <small>kg</small>
              </strong>
              <span>{t("bestLoad")}</span>
            </section>
          );
        })}
      </div>
      <section className="panel">
        <div className="section-title">
          <h2>
            <Activity size={18} /> {t("progress")}
          </h2>
        </div>
        <div className="filters">
          <label className="field">
            <span>{t("train")}</span>
            <select
              value={day}
              onChange={(e) => {
                const next = e.target.value as DayId;
                setDay(next);
                setExercise(program[next][0].id);
                setVariant(exercises[program[next][0].id].variants[0]);
              }}
            >
              {liftingDays.map((id) => (
                <option key={id} value={id}>
                  {loc(days[id].short)}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{t("exercises")}</span>
            <select
              value={exercise}
              onChange={(e) => {
                setExercise(e.target.value);
                setVariant(exercises[e.target.value].variants[0]);
              }}
            >
              {[
                ...new Set([
                  ...program[day].map((p) => p.id),
                  ...store.sessions
                    .filter((s) => s.day === day)
                    .flatMap((s) => s.exercises.map((e) => e.id)),
                ]),
              ].map((id) => (
                <option key={id} value={id}>
                  {loc(exercises[id].name)}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{t("variant")}</span>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              {exercises[exercise].variants.map((v) => (
                <option key={v} value={v}>
                  {t(variantKey(v))}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="segmented">
          {(["weight", "reps", "volume"] as const).map((key) => (
            <button
              key={key}
              className={key === metric ? "active" : ""}
              onClick={() => setMetric(key)}
            >
              {t(key === "volume" ? "loadVolume" : key)}
            </button>
          ))}
        </div>
        {points.length ? (
          <Chart
            label={t(
              metric === "volume"
                ? "loadVolume"
                : metric === "reps"
                  ? "totalReps"
                  : "bestLoad",
            )}
            unit={
              metric === "reps" ? "" : metric === "volume" ? "kg × reps" : "kg"
            }
            points={points.map((p) => ({ date: p.date, value: p[metric] }))}
          />
        ) : (
          <EmptyState title={t("noData")} description={t("noDataHelp")} />
        )}
        {exercises[exercise].addedWeight &&
          points.some((p) => p.bodyweight !== null) && (
            <Chart
              label={t("bodyweight")}
              unit="kg"
              points={points.flatMap((p) =>
                p.bodyweight === null
                  ? []
                  : [{ date: p.date, value: p.bodyweight }],
              )}
            />
          )}
        {declining(points) && (
          <div className="notice warning">
            <div>
              <strong>{t("trend")}</strong>
              <p>{t("trendHelp")}</p>
            </div>
          </div>
        )}
      </section>
      <section className="panel">
        <div className="section-title">
          <h2>{t("volume")}</h2>
          <span className="muted">
            {date(start)} – {date(today)}
          </span>
        </div>
        <p className="muted">{t("volumeHelp")}</p>
        <div className="volume-legend">
          <span>
            <i />
            {t("direct")}
          </span>
          <span>
            <i />
            {t("secondary")}
          </span>
          <span>{t("planned")}</span>
        </div>
        <div className="volume-table">
          {muscles.map((m) => {
            const value = muscleVolume[m] ?? {
              direct: 0,
              secondary: 0,
              planned: 0,
            };
            const max = Math.max(
              value.direct,
              value.secondary,
              value.planned,
              1,
            );
            return (
              <div className="volume-row" key={m}>
                <strong>{t(m)}</strong>
                <div className="volume-bars">
                  <div style={{ width: `${(value.direct / max) * 100}%` }} />
                  <div style={{ width: `${(value.secondary / max) * 100}%` }} />
                </div>
                <span>
                  {value.direct} / {value.secondary} / {value.planned}
                </span>
              </div>
            );
          })}
        </div>
      </section>
      <ProgramAnatomy />
      <Measurements />
    </>
  );
}
