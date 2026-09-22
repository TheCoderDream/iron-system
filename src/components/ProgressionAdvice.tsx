import { ArrowUpRight, TrendingUp } from "lucide-react";
import { getPrescription, type Prescription } from "../data/program";
import type { DayId } from "../domain/schema";
import {
  declining,
  performance,
  previousExercise,
  progression,
} from "../domain/training";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
import { NumberField } from "./ui";

export function useProgressionAdvice(
  day: DayId,
  id: string,
  variant: string,
  prescription?: Prescription,
) {
  const { store } = useStore();
  const p = prescription ?? getPrescription(store.settings, day, id);
  const track = `${day}:${id}:${variant}`;
  const increment = store.settings.increments[track] ?? 2.5;
  const previous = previousExercise(store.sessions, day, id, variant);
  const suggestion = progression(previous, p.workSets, p.repMax, increment);
  const points = performance(store.sessions, day, id, variant);
  const lastThree = points.slice(-3);
  const stalled =
    lastThree.length === 3 &&
    lastThree.every(
      (v) =>
        v.weight === lastThree[0].weight &&
        v.reps === lastThree[0].reps &&
        v.sets === lastThree[0].sets,
    );
  const below = previous?.sets.some(
    (s) => s.kind === "work" && s.done && s.reps! < p.repMin,
  );
  const review: "trendHelp" | "belowRangeTip" | "plateauTip" | null = declining(
    points,
  )
    ? "trendHelp"
    : below
      ? "belowRangeTip"
      : stalled && suggestion.reason !== "increaseTarget"
        ? "plateauTip"
        : null;
  return { suggestion, previous, review, increment, track };
}
export function ProgressionAdvice({
  day,
  id,
  variant,
  compact = false,
  prescription,
}: {
  day: DayId;
  id: string;
  variant: string;
  compact?: boolean;
  prescription?: Prescription;
}) {
  const { store, dispatch } = useStore();
  const { t } = useI18n();
  const { suggestion, previous, review, increment, track } =
    useProgressionAdvice(day, id, variant, prescription);
  return (
    <section className={`progression-advice ${compact ? "compact" : ""}`}>
      <div className="section-title">
        <h3>
          <TrendingUp size={17} />
          {t("target")}
        </h3>
        <ArrowUpRight size={16} />
      </div>
      <div className="suggested-load">
        <strong>
          {suggestion.weight === null ? "—" : `${suggestion.weight} kg`}
        </strong>
        <span>{t("targetLoad")}</span>
      </div>
      <p>{t(suggestion.reason)}</p>
      {!compact && (
        <>
          <div className="previous-detail">
            <span>{t("previous")}</span>
            <strong>
              {previous
                ? previous.sets
                    .filter((s) => s.kind === "work" && s.done)
                    .map((s) => `${s.weight} kg × ${s.reps}`)
                    .join(" / ")
                : t("noneYet")}
            </strong>
          </div>
          <NumberField
            label={t("increment")}
            value={increment}
            min={0.25}
            max={100}
            onChange={(value) => {
              if (value !== null)
                dispatch({
                  type: "settings",
                  patch: {
                    increments: {
                      ...store.settings.increments,
                      [track]: value,
                    },
                  },
                });
            }}
          />
          <small>{t("targetEditable")}</small>
        </>
      )}
      {review && (
        <div className="coaching-observation">
          <strong>{t("reviewPerformance")}</strong>
          <p>{t(review)}</p>
        </div>
      )}
    </section>
  );
}
