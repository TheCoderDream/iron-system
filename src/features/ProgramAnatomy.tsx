import { useState } from "react";
import { Target } from "lucide-react";
import { AnatomyMap } from "../components/AnatomyMap";
import {
  involvement,
  loggedExposure,
  plannedExposure,
  regions,
  type Region,
} from "../data/anatomy";
import { days, exercises, liftingDays, getProgram } from "../data/program";
import { localDate, type DayId } from "../domain/schema";
import { weekStart } from "../domain/training";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
import { ExerciseDetails } from "./ExerciseDetails";

export function ProgramAnatomy({
  day,
  short = false,
}: {
  day?: DayId;
  short?: boolean;
}) {
  const { store } = useStore();
  const program = getProgram(store.settings);
  const { t, loc } = useI18n();
  const [mode, setMode] = useState<"full" | "day" | "logged">(
    day ? "day" : "full",
  );
  const [selected, setSelected] = useState<Region | null>(null);
  const [detail, setDetail] = useState<{
    id: string;
    day: DayId;
    variant?: string;
  } | null>(null);
  const values =
    mode === "logged"
      ? loggedExposure(store.sessions, weekStart(), localDate())
      : plannedExposure(
          store.settings,
          mode === "day" ? day : undefined,
          mode === "day" && short,
        );
  const ranked = [...regions].sort(
    (a, b) =>
      values[b].direct - values[a].direct ||
      values[b].secondary - values[a].secondary,
  );
  const focus = selected ?? ranked[0];
  const contributions =
    mode === "logged"
      ? store.sessions
          .filter((s) => s.date >= weekStart() && s.date <= localDate())
          .flatMap((s) =>
            s.exercises.map((e) => ({
              day: s.day,
              id: e.id,
              variant: e.variant,
              sets: e.sets.filter((set) => set.done && set.kind === "work")
                .length,
            })),
          )
      : (mode === "day" && day ? [day] : liftingDays).flatMap((d) =>
          program[d]
            .filter(
              (p) =>
                !(
                  mode === "day" &&
                  short &&
                  d === "upper-b" &&
                  store.settings.shortOmissions.includes(
                    p.id as (typeof store.settings.shortOmissions)[number],
                  )
                ),
            )
            .map((p) => ({
              day: d,
              id: p.id,
              variant: store.settings.variants[p.id],
              sets: p.workSets,
            })),
        );
  const involved = contributions.filter(
    (p) =>
      p.sets > 0 &&
      (involvement(p.id, p.variant).primary.includes(focus) ||
        involvement(p.id, p.variant).secondary.includes(focus)),
  );
  return (
    <section className="panel anatomy-panel">
      <div className="section-title">
        <div>
          <span className="eyebrow">{t("anatomyTitle")}</span>
          <h2>{t("anatomyProgram")}</h2>
        </div>
        <Target size={22} />
      </div>
      <p className="muted">{t("anatomyHelp")}</p>
      <div className="segmented" aria-label={t("anatomyTitle")}>
        <button
          className={mode === "full" ? "active" : ""}
          onClick={() => {
            setMode("full");
            setSelected(null);
          }}
        >
          {t("fullWeek")}
        </button>
        {day && (
          <button
            className={mode === "day" ? "active" : ""}
            onClick={() => {
              setMode("day");
              setSelected(null);
            }}
          >
            {t("selectedSession")}
          </button>
        )}
        <button
          className={mode === "logged" ? "active" : ""}
          onClick={() => {
            setMode("logged");
            setSelected(null);
          }}
        >
          {t("loggedWeek")}
        </button>
      </div>
      <div className="program-anatomy-grid">
        <div className="program-body">
          <AnatomyMap values={values} selected={focus} onSelect={setSelected} />
          <div className="anatomy-scale">
            <span>{t("anatomyScale")}</span>
            <i />
            <i />
            <i />
          </div>
          <div className="anatomy-key">
            <span>
              <i className="secondary-dot" />
              {t("secondaryMuscles")}
            </span>
            <span>
              <i className="inactive-dot" />
              {t("notTargeted")}
            </span>
          </div>
        </div>
        <div className="muscle-ranking">
          <span className="eyebrow">{t("highestExposure")}</span>
          {ranked.map((region) => (
            <button
              key={region}
              className={focus === region ? "active" : ""}
              onClick={() => setSelected(region)}
            >
              <span>{t(region)}</span>
              <div className="ranking-bar">
                <i
                  style={{
                    width: `${(values[region].direct / Math.max(1, values[ranked[0]].direct)) * 100}%`,
                  }}
                />
              </div>
              <strong>
                {values[region].direct}
                <small> + {values[region].secondary}</small>
              </strong>
            </button>
          ))}
          <p className="muted">
            {t("direct")} + {t("secondary")}
          </p>
        </div>
      </div>
      <div className="muscle-focus">
        <div>
          <span className="eyebrow">{t("anatomicalFocus")}</span>
          <h3>{t(focus)}</h3>
          <p>
            {values[focus].direct} {t("directSets")} · {values[focus].secondary}{" "}
            {t("secondary")}
          </p>
        </div>
        <div className="contributing-exercises">
          {involved.length ? (
            involved.map((item, i) => (
              <button
                key={`${item.day}-${item.id}-${i}`}
                onClick={() =>
                  setDetail({
                    id: item.id,
                    day: item.day,
                    variant: item.variant,
                  })
                }
              >
                <span>
                  {loc(exercises[item.id].name)}
                  <small>
                    {loc(days[item.day].short)} ·{" "}
                    {t(
                      involvement(item.id, item.variant).primary.includes(focus)
                        ? "direct"
                        : "secondary",
                    )}
                  </small>
                </span>
                <strong>{item.sets}</strong>
              </button>
            ))
          ) : (
            <p className="muted">{t("notTargeted")}</p>
          )}
        </div>
      </div>
      <p className="anatomy-footnote">{t("anatomyModel")}</p>
      {detail && (
        <ExerciseDetails
          id={detail.id}
          day={detail.day}
          variant={detail.variant}
          onClose={() => setDetail(null)}
        />
      )}
    </section>
  );
}
