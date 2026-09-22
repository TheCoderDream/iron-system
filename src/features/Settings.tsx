import { useRef, useState } from "react";
import {
  Download,
  Upload,
  Smartphone,
  ShieldCheck,
  Calculator,
} from "lucide-react";
import { type Language, type Store } from "../domain/schema";
import { plateLoad, warmups } from "../domain/training";
import { useStore } from "../state/StoreProvider";
import { download, parseBackup } from "../state/persistence";
import { useI18n } from "../i18n/messages";
import { Modal, NumberField, PageHeader, Stat } from "../components/ui";

export function Settings() {
  const { store, dispatch } = useStore();
  const { t } = useI18n();
  const input = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<Store | null>(null);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<number | null>(60);
  const [plates, setPlates] = useState(store.settings.plates.join(", "));
  const [plateError, setPlateError] = useState(false);
  const result = plateLoad(
    target ?? 0,
    store.settings.barWeight,
    store.settings.plates,
  );
  const backup = () =>
    download(
      JSON.stringify(store, null, 2),
      `iron-system-${new Date().toISOString().slice(0, 10)}.json`,
    );
  return (
    <>
      <PageHeader
        eyebrow={t("settings")}
        title={t("preferences")}
        subtitle={t("preferencesSub")}
      />
      <div className="settings-grid">
        <section className="panel">
          <h2>{t("settings")}</h2>
          <label className="field">
            <span>{t("language")}</span>
            <select
              value={store.settings.language}
              onChange={(e) =>
                dispatch({
                  type: "settings",
                  patch: { language: e.target.value as Language },
                })
              }
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="ru">Русский</option>
              <option value="tr">Türkçe</option>
            </select>
          </label>
          <label className="field">
            <span>{t("restTimer")}</span>
            <select
              value={store.settings.restSeconds}
              onChange={(e) =>
                dispatch({
                  type: "settings",
                  patch: {
                    restSeconds: Number(e.target.value) as 120 | 150 | 180,
                  },
                })
              }
            >
              <option value="120">2:00</option>
              <option value="150">2:30</option>
              <option value="180">3:00</option>
            </select>
          </label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={store.settings.sound}
              onChange={(e) =>
                dispatch({
                  type: "settings",
                  patch: { sound: e.target.checked },
                })
              }
            />
            {t("sound")}
          </label>
          <p className="muted">{t("soundHelp")}</p>
        </section>
        <section className="panel offline-card">
          <Smartphone size={28} />
          <h2>{t("offline")}</h2>
          <p>{t("offlineHelp")}</p>
          <span className="badge">
            <ShieldCheck size={14} />
            {t("local")}
          </span>
        </section>
      </div>
      <section className="panel">
        <div className="section-title">
          <h2>
            <Calculator size={20} /> {t("tools")}
          </h2>
        </div>
        <div className="field-grid">
          <NumberField
            label={`${t("target")} (kg)`}
            value={target}
            onChange={setTarget}
          />
          <NumberField
            label={t("barWeight")}
            value={store.settings.barWeight}
            onChange={(barWeight) => {
              if (barWeight !== null)
                dispatch({ type: "settings", patch: { barWeight } });
            }}
          />
        </div>
        <label className="field">
          <span>{t("plates")}</span>
          <input
            value={plates}
            onChange={(e) => setPlates(e.target.value)}
            onBlur={() => {
              const values = plates.split(",").map((s) => Number(s.trim()));
              if (
                !values.length ||
                values.length > 20 ||
                values.some(
                  (p) =>
                    !Number.isFinite(p) ||
                    p < 0.01 ||
                    p > 100 ||
                    Math.abs(p * 100 - Math.round(p * 100)) > 0.00001,
                )
              ) {
                setPlateError(true);
                return;
              }
              setPlateError(false);
              dispatch({ type: "settings", patch: { plates: values } });
            }}
          />
        </label>
        {plateError && (
          <p className="error" role="alert">
            {t("invalidPlates")}
          </p>
        )}
        <div className="calculator-grid">
          <div>
            <span className="eyebrow">{t("plateCalc")}</span>
            <h3>{t("perSide")}</h3>
            <div className="plate-stack">
              <span className="bar-line" />
              {result.pairs.map(({ plate, count }) => (
                <div
                  className="plate"
                  style={{ height: `${50 + Math.min(plate, 25) * 2}px` }}
                  key={plate}
                >
                  <strong>{plate}</strong>
                  <small>× {count}</small>
                </div>
              ))}
            </div>
            <p>
              {t("achievable")}: <strong>{result.achievable} kg</strong>
            </p>
          </div>
          <div>
            <span className="eyebrow">{t("warmupCalc")}</span>
            {warmups(target ?? 0, store.settings.barWeight).map((s, i) => (
              <div className="warmup-result" key={i}>
                <span>W{i + 1}</span>
                <strong>
                  {s.weight} kg × {s.reps}
                </strong>
              </div>
            ))}
            <p className="muted">{t("warmupHelp")}</p>
          </div>
        </div>
      </section>
      <section className="panel backup-panel">
        <ShieldCheck size={24} />
        <h2>{t("backups")}</h2>
        <p>{t("backupHelp")}</p>
        <div className="button-row">
          <button className="primary" onClick={backup}>
            <Download size={16} />
            {t("export")}
          </button>
          <button className="secondary" onClick={() => input.current?.click()}>
            <Upload size={16} />
            {t("import")}
          </button>
          <input
            hidden
            ref={input}
            type="file"
            accept="application/json,.json"
            aria-label={t("import")}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              try {
                if (file.size > 10_000_000) throw new Error("Too large");
                setPending(parseBackup(await file.text()));
                setMessage("");
              } catch {
                setMessage(t("invalidBackup"));
              }
            }}
          />
        </div>
        {message && (
          <p role="status" className="notice">
            {message}
          </p>
        )}
      </section>
      {pending && (
        <Modal title={t("import")} onClose={() => setPending(null)}>
          <p>{t("importHelp")}</p>
          <div className="stats-strip">
            <Stat label={t("sessions")} value={pending.sessions.length} />
            <Stat
              label={t("measurements")}
              value={pending.measurements.length}
            />
          </div>
          {pending.active && <p>{t("sessionActive")}</p>}
          <div className="button-row">
            <button className="secondary" onClick={backup}>
              <Download size={15} />
              {t("export")}
            </button>
            <button
              className="primary"
              onClick={() => {
                dispatch({ type: "import", store: pending });
                setPlates(pending.settings.plates.join(", "));
                setPending(null);
                setMessage(t("restored"));
              }}
            >
              {t("restore")}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
