import { ExerciseVideo } from "./ExerciseVideo";
import { useState } from "react";
import { BookOpen, Clock3, Target } from "lucide-react";
import { exercises, getPrescription } from "../data/program";
import { extendedCompoundIds } from "../data/extendedCatalog";
import { exerciseBenefit, benefitSources } from "../data/exerciseBenefits";
import { coaching } from "../data/coaching";
import { exerciseExposure, involvement } from "../data/anatomy";
import type { DayId } from "../domain/schema";
import { useStore } from "../state/StoreProvider";
import { useI18n, variantKey } from "../i18n/messages";
import { AnatomyMap } from "../components/AnatomyMap";
import { Modal } from "../components/ui";
import { ProgressionAdvice } from "../components/ProgressionAdvice";

export function ExerciseDetails({
  id,
  day,
  variant: initialVariant,
  onClose,
}: {
  id: string;
  day: DayId;
  variant?: string;
  onClose: () => void;
}) {
  const { store } = useStore();
  const { t, loc } = useI18n();
  const [variant, setVariant] = useState(
    initialVariant ?? store.settings.variants[id] ?? exercises[id].variants[0],
  );
  const active =
    store.active?.day === day
      ? store.active.exercises.find((e) => e.id === id && e.variant === variant)
      : undefined;
  const prescription = active
    ? {
        id,
        warmups: active.sets.filter((s) => s.kind === "warmup").length,
        workSets: active.sets.filter((s) => s.kind === "work").length,
        repMin: active.repMin,
        repMax: active.repMax,
        restSeconds: active.restSeconds,
      }
    : getPrescription(store.settings, day, id);
  const guide = coaching[id === "tricepsChoice" ? variant : id];
  const muscles = involvement(id, variant);
  const compound = [
    "pullup",
    "dips",
    "ohp",
    "inclineShoulder",
    "squat",
    "bulgarian",
    "row",
    "legpress",
    "backExtension",
    "tricepsChoice",
  ].includes(id) || extendedCompoundIds.has(id);
  return (
    <Modal title={loc(exercises[id].name)} onClose={onClose} wide>
      <div className="exercise-detail-meta">
        <span className="badge">
          {prescription.workSets} × {prescription.repMin}–{prescription.repMax}
        </span>
        <span>
          <Clock3 size={14} />
          {prescription.restSeconds ?? store.settings.restSeconds} s
        </span>
        <span>
          {prescription.warmups > 0
            ? `${prescription.warmups} ${t("warmup")}`
            : t("accessoryWarmup").split(".")[0]}
        </span>
      </div>
      {exercises[id].variants.length > 1 && (
        <label className="field variant-preview">
          <span>{t("exploreVariant")}</span>
          <select value={variant} onChange={(e) => setVariant(e.target.value)}>
            {exercises[id].variants.map((v) => (
              <option key={v} value={v}>
                {t(variantKey(v))}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="exercise-detail-grid">
        <section className="exercise-anatomy">
          <span className="eyebrow">
            <Target size={14} />
            {t("anatomicalFocus")}
          </span>
          <AnatomyMap values={exerciseExposure(id, variant)} mode="exercise" />
          <div className="anatomy-key">
            <span>
              <i className="primary-dot" />
              {t("primaryMuscles")}
            </span>
            <span>
              <i className="secondary-dot" />
              {t("secondaryMuscles")}
            </span>
          </div>
          <p className="muted">{t("anatomyModel")}</p>
        </section>
        <div className="exercise-instructions">
          <div className="muscle-summary">
            <h3>{t("primaryMuscles")}</h3>
            <div className="muscle-chips">
              {muscles.primary.map((m) => (
                <span className="primary-chip" key={m}>
                  {t(m)}
                </span>
              ))}
            </div>
            <h3>{t("secondaryMuscles")}</h3>
            <div className="muscle-chips">
              {muscles.secondary.length ? (
                muscles.secondary.map((m) => <span key={m}>{t(m)}</span>)
              ) : (
                <span>—</span>
              )}
            </div>
          </div>
          <section className="exercise-benefit">
            <span className="eyebrow">{t("exercisePurpose")}</span>
            <h3>{t("whyExercise")}</h3>
            <p>{loc(exerciseBenefit(id, variant))}</p>
            <a
              className="guide-link"
              href={benefitSources.training}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("selectionPrinciples")} ↗
            </a>
            {(id === "dips" ||
              (id === "tricepsChoice" && variant === "benchDips")) && (
              <a
                className="guide-link"
                href={benefitSources.dips}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("dipResearch")} ↗
              </a>
            )}
          </section>
          <ol className="technique-steps">
            {(["setup", "movement", "avoid"] as const).map((step, i) => (
              <li key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>
                    {t(
                      step === "setup"
                        ? "setupStep"
                        : step === "movement"
                          ? "movementStep"
                          : "avoidStep",
                    )}
                  </h3>
                  <p>{loc(guide[step])}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="effort-block">
            <h3>{t("effortGuide")}</h3>
            <p>{t(compound ? "compoundEffort" : "isolationEffort")}</p>
          </div>
        </div>
      </div>
      <ExerciseVideo key={`${id}:${variant}`} id={id} variant={variant} />
      <div className="detail-bottom">
        <section className="warmup-coaching">
          <span className="eyebrow">{t("warmup")}</span>
          <h3>{t("warmupDetails")}</h3>
          <p>
            {t(
              guide.warmup === "bodyweight"
                ? "bodyweightWarmup"
                : guide.warmup === "compound"
                  ? "compoundWarmup"
                  : "accessoryWarmup",
            )}
          </p>
          <p>{t("restDetails")}</p>
          <small>{t("warmupNoFatigue")}</small>
        </section>
        <ProgressionAdvice
          day={day}
          id={id}
          variant={variant}
          prescription={prescription}
        />
      </div>
      <a className="guide-link" href="#learn" onClick={onClose}>
        <BookOpen size={17} />
        {t("exploreGuide")}
      </a>
    </Modal>
  );
}
