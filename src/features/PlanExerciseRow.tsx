import { ArrowUpRight, Clock3 } from "lucide-react";
import { exercises, type Prescription } from "../data/program";
import { involvement } from "../data/anatomy";
import type { DayId } from "../domain/schema";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
import { useProgressionAdvice } from "../components/ProgressionAdvice";
export function PlanExerciseRow({
  prescription: p,
  index,
  day,
  onSelect,
}: {
  prescription: Prescription;
  index: number;
  day: DayId;
  onSelect: () => void;
}) {
  const { store } = useStore();
  const { t, loc } = useI18n();
  const variant = store.settings.variants[p.id] ?? exercises[p.id].variants[0];
  const { suggestion, previous } = useProgressionAdvice(day, p.id, variant, p);
  return (
    <button
      className="plan-exercise"
      type="button"
      onClick={onSelect}
      aria-haspopup="dialog"
      aria-label={`${loc(exercises[p.id].name)} — ${t("viewDetails")}`}
    >
      <span className="exercise-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="plan-exercise-body">
        <strong className="plan-exercise-name">
          {loc(exercises[p.id].name)}
        </strong>
        <span className="plan-note">{loc(exercises[p.id].note)}</span>
        <span className="muscle-chips">
          {involvement(p.id, variant).primary.map((m) => (
            <span className="primary-chip" key={m}>
              {t(m)}
            </span>
          ))}
        </span>
        <span className="plan-metadata">
          <span>
            <Clock3 size={12} />
            {p.restSeconds ?? store.settings.restSeconds} s
          </span>
          <span>
            {p.warmups > 0
              ? `${p.warmups} ${t("warmup")}`
              : t("optional") + " · " + t("warmup")}
          </span>
        </span>
        <span className="plan-target">
          <span>{t("target")}: </span>
          <strong>
            {suggestion.weight === null
              ? t("firstTarget")
              : `${suggestion.weight} kg · ${p.repMin}–${p.repMax} ${t("reps").toLowerCase()}`}
          </strong>
          {previous && (
            <small>
              {t("previous")}:{" "}
              {previous.sets
                .filter((s) => s.done && s.kind === "work")
                .map((s) => `${s.weight} × ${s.reps}`)
                .join(" / ")}
            </small>
          )}
        </span>
      </span>
      <span className="plan-prescription">
        <strong>
          {p.workSets} × {p.repMin}–{p.repMax}
        </strong>
        <span>{t("workingSets")}</span>
        <ArrowUpRight size={20} />
        <small>{t("viewDetails")}</small>
      </span>
    </button>
  );
}
