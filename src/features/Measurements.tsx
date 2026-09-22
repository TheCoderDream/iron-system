import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
import {
  localDate,
  measurementSchema,
  type Measurement,
} from "../domain/schema";
import { uid } from "../domain/training";
import { Chart } from "../components/Chart";
import { Modal, NumberField } from "../components/ui";

export function Measurements() {
  const { store, dispatch } = useStore();
  const { t, date } = useI18n();
  const [draft, setDraft] = useState<Measurement | null>(null);
  const [error, setError] = useState(false);
  const [metric, setMetric] = useState<"weight" | "waist" | "arm" | "thigh">(
    "weight",
  );
  const sorted = [...store.measurements].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  return (
    <section className="panel measurements">
      <div className="section-title">
        <h2>{t("measurements")}</h2>
        <button
          className="secondary"
          onClick={() => {
            setError(false);
            setDraft({
              id: uid(),
              date: localDate(),
              weight: null,
              waist: null,
              arm: null,
              thigh: null,
            });
          }}
        >
          <Plus size={16} />
          {t("addMeasurement")}
        </button>
      </div>
      <div className="segmented">
        {(["weight", "waist", "arm", "thigh"] as const).map((key) => (
          <button
            className={metric === key ? "active" : ""}
            key={key}
            onClick={() => setMetric(key)}
          >
            {t(key)}
          </button>
        ))}
      </div>
      <Chart
        label={t(metric)}
        unit={metric === "weight" ? "kg" : "cm"}
        points={sorted.flatMap((m) =>
          m[metric] === null ? [] : [{ date: m.date, value: m[metric]! }],
        )}
      />
      <div className="measurement-list">
        {sorted
          .slice(-5)
          .reverse()
          .map((m) => (
            <div key={m.id}>
              <span>{date(m.date)}</span>
              <strong>
                {m[metric] ?? "—"} {metric === "weight" ? "kg" : "cm"}
              </strong>
              <button
                className="icon-button"
                aria-label={`${t("delete")} ${date(m.date)}`}
                onClick={() => {
                  if (confirm(t("deleteMeasurement")))
                    dispatch({ type: "deleteMeasurement", id: m.id });
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
      </div>
      {draft && (
        <Modal title={t("addMeasurement")} onClose={() => setDraft(null)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const result = measurementSchema.safeParse(draft);
              if (
                !result.success ||
                [draft.weight, draft.waist, draft.arm, draft.thigh].every(
                  (v) => v === null,
                )
              ) {
                setError(true);
                return;
              }
              dispatch({ type: "measurement", measurement: result.data });
              setDraft(null);
            }}
          >
            <label className="field">
              <span>{t("date")}</span>
              <input
                type="date"
                required
                max={localDate()}
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              />
            </label>
            <div className="field-grid">
              {(["weight", "waist", "arm", "thigh"] as const).map((key) => (
                <NumberField
                  key={key}
                  label={t(key === "weight" ? "bodyweight" : key)}
                  value={draft[key]}
                  min={1}
                  max={
                    key === "weight"
                      ? 2000
                      : key === "waist"
                        ? 300
                        : key === "arm"
                          ? 150
                          : 200
                  }
                  onChange={(value) => setDraft({ ...draft, [key]: value })}
                />
              ))}
            </div>
            {error && (
              <p className="error" role="alert">
                {t("invalidMeasurement")}
              </p>
            )}
            <button className="primary" type="submit">
              {t("save")}
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
}
