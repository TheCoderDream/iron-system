import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  Play,
  Sparkles,
} from "lucide-react";
import {
  days,
  dayOrder,
  exercises,
  liftingDays,
  getProgram,
} from "../data/program";
import {
  completedWork,
  createSession,
  nextLiftingDay,
} from "../domain/training";
import type { DayId } from "../domain/schema";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
import {
  Modal,
  NumberField,
  PageHeader,
  Stat,
  formatTime,
} from "../components/ui";
import { RestTimer } from "../components/RestTimer";
import { ExerciseDetails } from "./ExerciseDetails";
import { ProgramAnatomy } from "./ProgramAnatomy";
import { PlanExerciseRow } from "./PlanExerciseRow";
import { ExerciseCard } from "./ExerciseCard";

export function Train() {
  const { store, dispatch } = useStore();
  const program = getProgram(store.settings);
  const { t, loc } = useI18n();
  const [selected, setSelected] = useState<DayId>(
    store.active?.day ?? store.nextDay,
  );
  const [detail, setDetail] = useState<string | null>(null);
  const [short, setShort] = useState(false);
  const [finish, setFinish] = useState(false);
  const [message, setMessage] = useState("");
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const active = store.active;
  const day = active?.day ?? selected;
  const entries = program[day].filter(
    (p) =>
      !(
        short &&
        day === "upper-b" &&
        store.settings.shortOmissions.includes(
          p.id as (typeof store.settings.shortOmissions)[number],
        )
      ),
  );
  const total = active
    ? active.exercises.flatMap((e) => e.sets).filter((s) => s.kind === "work")
        .length
    : entries.reduce((sum, p) => sum + p.workSets, 0);
  const done = active ? completedWork(active).length : 0;
  const recent = store.sessions
    .filter(
      (s) =>
        s.day === day &&
        s.short === (short && day === "upper-b") &&
        s.exercises.length === entries.length &&
        entries.every((p) =>
          s.exercises.some(
            (e) =>
              e.id === p.id &&
              e.repMin === p.repMin &&
              e.repMax === p.repMax &&
              e.sets.filter((set) => set.kind === "work").length ===
                p.workSets &&
              (e.restSeconds ?? store.settings.restSeconds) ===
                (p.restSeconds ?? store.settings.restSeconds),
          ),
        ),
    )
    .slice(-3);
  const estimate = recent.length
    ? Math.round(
        recent.reduce((sum, s) => sum + (s.endedAt! - s.startedAt) / 60000, 0) /
          recent.length,
      )
    : Math.round(
        entries.reduce(
          (sum, p) =>
            sum +
            p.workSets *
              (0.75 + (p.restSeconds ?? store.settings.restSeconds) / 60) +
            p.warmups * 1.5,
          8,
        ) +
          entries.length * 1.5,
      );
  const update = (patch: Partial<NonNullable<typeof active>>) => {
    if (active) dispatch({ type: "active", session: { ...active, ...patch } });
  };
  const start = () => {
    setMessage("");
    dispatch({
      type: "active",
      session: createSession(day, store, short && day === "upper-b"),
    });
  };
  const progress = total ? Math.round((done / total) * 100) : 0;
  return (
    <>
      <PageHeader
        eyebrow={t("train")}
        title={loc(days[day].title)}
        subtitle={loc(days[day].subtitle)}
      >
        {active && (
          <div className="session-clock">
            <span className="live-dot" />
            <Clock3 size={15} />
            {formatTime((now - active.startedAt) / 1000)}
          </div>
        )}
      </PageHeader>
      {!active && (
        <div className="day-tabs" role="group" aria-label={t("schedule")}>
          {dayOrder.map((id) => (
            <button
              key={id}
              className={id === day ? "active" : ""}
              onClick={() => {
                setSelected(id);
                setMessage("");
              }}
            >
              <span>{loc(days[id].day)}</span>
              <strong>{loc(days[id].short)}</strong>
              {id === store.nextDay && <i />}
            </button>
          ))}
        </div>
      )}
      {message && (
        <div className="notice" role="status">
          <Check size={18} />
          {message}
        </div>
      )}
      <section className="training-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="live-dot" />
            {loc(days[day].badge)}
          </span>
          <h2>{loc(days[day].heroTitle)}</h2>
          <p>{loc(days[day].heroText)}</p>
          {!active && day !== "rest" && (
            <button className="primary" onClick={start}>
              <Play size={16} fill="currentColor" />
              {t("start")}
              <ArrowRight size={17} />
            </button>
          )}
          {active && (
            <span className="hero-session-label">
              {t("workingSets")}{" "}
              <strong>
                {done} / {total}
              </strong>
            </span>
          )}
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <Dumbbell strokeWidth={1} size={128} />
          <span>
            IRON
            <br />
            SYSTEM
          </span>
        </div>
        {active && liftingDays.includes(day) && (
          <div className="hero-progress" style={{ width: `${progress}%` }} />
        )}
      </section>
      {day === "rest" ? (
        <section className="panel recovery-panel">
          <Sparkles size={30} />
          <h2>{t("restDay")}</h2>
          <p>{loc(exercises.rest.note)}</p>
        </section>
      ) : (
        <>
          {!active && liftingDays.includes(day) && (
            <>
              <div className="stats-strip">
                <Stat label={t("exercises")} value={entries.length} />
                <Stat label={t("workingSets")} value={total} />
                <Stat
                  label={recent.length ? t("measured") : t("estimated")}
                  value={estimate}
                  detail={recent.length ? t("minutes") : t("estimateHelp")}
                />
              </div>
              {day === "upper-b" && (
                <section className="short-panel">
                  <div>
                    <h3>{t("short")}</h3>
                    <p>{t("shortHelp")}</p>
                  </div>
                  <div className="segmented">
                    <button
                      className={!short ? "active" : ""}
                      onClick={() => setShort(false)}
                    >
                      {t("full")}
                    </button>
                    <button
                      className={short ? "active" : ""}
                      onClick={() => setShort(true)}
                    >
                      {t("short")}
                    </button>
                  </div>
                  {short && (
                    <div className="omissions">
                      {(
                        [
                          "pec",
                          "tricepsChoice",
                          "curl",
                          "rear",
                          "lateral",
                        ] as const
                      ).map((id) => (
                        <label key={id}>
                          <input
                            type="checkbox"
                            checked={store.settings.shortOmissions.includes(id)}
                            onChange={(e) =>
                              dispatch({
                                type: "settings",
                                patch: {
                                  shortOmissions: e.target.checked
                                    ? [...store.settings.shortOmissions, id]
                                    : store.settings.shortOmissions.filter(
                                        (x) => x !== id,
                                      ),
                                },
                              })
                            }
                          />
                          {loc(exercises[id].name)}
                        </label>
                      ))}
                      <p>
                        {t("omitted")}: {store.settings.shortOmissions.length} ·
                        −{store.settings.shortOmissions.length * 2}{" "}
                        {t("workingSets").toLowerCase()}
                      </p>
                    </div>
                  )}
                </section>
              )}
            </>
          )}
          <div className="workout-layout">
            <div>
              {active ? (
                <>
                  <section className="panel checkin">
                    <details>
                      <summary>
                        <Flame size={16} />
                        {t("checkin")}
                        <span>{t("optional")}</span>
                      </summary>
                      <p className="muted">{t("checkinHelp")}</p>
                      <div className="field-grid">
                        <NumberField
                          label={t("bodyweight")}
                          value={active.bodyweight}
                          min={1}
                          onChange={(bodyweight) => update({ bodyweight })}
                        />
                        {(["energy", "soreness"] as const).map((key) => (
                          <label className="field" key={key}>
                            <span>{t(key)}</span>
                            <select
                              value={active[key]}
                              onChange={(e) =>
                                update({ [key]: Number(e.target.value) })
                              }
                            >
                              {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n}>{n}</option>
                              ))}
                            </select>
                          </label>
                        ))}
                      </div>
                    </details>
                  </section>
                  <div className="exercise-list">
                    {active.exercises.map((exercise, i) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        index={i}
                        session={active}
                        onChange={(changed) =>
                          update({
                            exercises: active.exercises.map((e) =>
                              e.id === changed.id ? changed : e,
                            ),
                          })
                        }
                      />
                    ))}
                  </div>
                  {!liftingDays.includes(day) && (
                    <section className="panel">
                      <h2>{t("cardio")}</h2>
                      <p>
                        {day === "cardio-1" ? "30–40" : "25–40"} {t("minutes")}{" "}
                        · {loc(exercises.cardio.note)}
                      </p>
                      <div className="field-grid">
                        <label className="field">
                          <span>{t("variant")}</span>
                          <select
                            value={active.cardioMode}
                            onChange={(e) =>
                              update({
                                cardioMode: e.target
                                  .value as typeof active.cardioMode,
                              })
                            }
                          >
                            {(["walk", "bike", "elliptical"] as const).map(
                              (mode) => (
                                <option key={mode} value={mode}>
                                  {t(mode)}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                        <NumberField
                          label={t("duration")}
                          value={active.cardioMinutes || null}
                          max={600}
                          onChange={(cardioMinutes) =>
                            update({
                              cardioMinutes: Math.max(
                                0,
                                Math.min(600, cardioMinutes ?? 0),
                              ),
                            })
                          }
                        />
                      </div>
                    </section>
                  )}
                  <section className="panel session-footer">
                    <label className="field">
                      <span>{t("sessionNotes")}</span>
                      <textarea
                        value={active.notes}
                        maxLength={3000}
                        onChange={(e) => update({ notes: e.target.value })}
                      />
                    </label>
                    <div className="button-row">
                      <button
                        className="text-button danger"
                        onClick={() => {
                          if (confirm(t("discardHelp")))
                            dispatch({ type: "active", session: null });
                        }}
                      >
                        {t("discard")}
                      </button>
                      <button
                        className="primary"
                        onClick={() => {
                          if (done === 0 && active.cardioMinutes === 0) {
                            setMessage(t("noSets"));
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else setFinish(true);
                        }}
                      >
                        <Check size={17} />
                        {t("finish")}
                      </button>
                    </div>
                  </section>
                </>
              ) : (
                <section className="panel plan-list">
                  <div className="section-title">
                    <h2>{t("exercises")}</h2>
                    <a className="guide-link" href="#plan">
                      {t("plan")}
                    </a>
                  </div>
                  <p className="plan-details-hint">{t("detailsHint")}</p>
                  {entries.length ? (
                    entries.map((p, i) => (
                      <PlanExerciseRow
                        key={p.id}
                        prescription={p}
                        index={i}
                        day={day}
                        onSelect={() => setDetail(p.id)}
                      />
                    ))
                  ) : (
                    <p>{loc(exercises.cardio.note)}</p>
                  )}
                </section>
              )}
            </div>
            <aside className="workout-aside">
              <RestTimer />
              <section className="panel focus-card">
                <span className="eyebrow">{t("principles")}</span>
                <h3>{t("target")}</h3>
                <p>{t("repeatTarget")}</p>
                <div className="progress-example">
                  <span>+50 kg × 5, 5</span>
                  <ArrowRight size={16} />
                  <strong>+52.5 kg</strong>
                </div>
                <p className="muted">{t("rirHelp")}</p>
                <a className="guide-link" href="#learn">
                  {t("exploreGuide")}
                </a>
              </section>
            </aside>
          </div>
        </>
      )}
      {!active && liftingDays.includes(day) && (
        <ProgramAnatomy day={day} short={short && day === "upper-b"} />
      )}
      {detail && (
        <ExerciseDetails
          id={detail}
          day={day}
          onClose={() => setDetail(null)}
        />
      )}
      {finish && active && (
        <Modal title={t("finishTitle")} onClose={() => setFinish(false)}>
          <p>{t("finishHelp")}</p>
          <div className="stats-strip">
            <Stat label={t("workingSets")} value={`${done}/${total}`} />
            <Stat
              label={t("sessionTime")}
              value={formatTime((now - active.startedAt) / 1000)}
            />
          </div>
          <div className="button-row">
            <button className="secondary" onClick={() => setFinish(false)}>
              {t("cancel")}
            </button>
            <button
              className="primary"
              onClick={() => {
                dispatch({ type: "finish", now: Date.now() });
                setSelected(
                  liftingDays.includes(day)
                    ? nextLiftingDay(day)
                    : store.nextDay,
                );
                setFinish(false);
                setMessage(t("saved"));
              }}
            >
              {t("save")}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
