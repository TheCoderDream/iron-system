import { useEffect, useRef, useState } from "react";
import { Timer, Volume2, VolumeX } from "lucide-react";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
import { formatTime } from "./ui";

export function RestTimer() {
  const { store, dispatch } = useStore();
  const { t } = useI18n();
  const [now, setNow] = useState(Date.now());
  const announced = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);
  const remaining =
    store.restDeadline === null
      ? 0
      : Math.max(0, Math.ceil((store.restDeadline - now) / 1000));
  useEffect(() => {
    const deadline = store.restDeadline;
    if (
      deadline !== null &&
      deadline <= now &&
      announced.current !== deadline
    ) {
      announced.current = deadline;
      setReady(true);
      if (store.settings.sound) {
        try {
          const audio = new AudioContext();
          const oscillator = audio.createOscillator();
          const gain = audio.createGain();
          oscillator.connect(gain);
          gain.connect(audio.destination);
          gain.gain.value = 0.12;
          oscillator.frequency.value = 740;
          oscillator.start();
          oscillator.stop(audio.currentTime + 0.25);
          oscillator.onended = () => {
            void audio.close();
          };
        } catch {
          /* A blocked audio context must never interrupt logging. */
        }
      }
      dispatch({ type: "timer", deadline: null });
    }
  }, [now, store.restDeadline, store.settings.sound, dispatch]);
  const begin = (seconds: 120 | 150 | 180) => {
    setReady(false);
    dispatch({ type: "settings", patch: { restSeconds: seconds } });
    dispatch({ type: "timer", deadline: Date.now() + seconds * 1000 });
  };
  return (
    <section
      className={`timer-card ${store.restDeadline ? "running" : ""}`}
      aria-label={t("restTimer")}
    >
      <div className="section-title">
        <span>
          <Timer size={16} />
          {t("restTimer")}
        </span>
        <button
          className="icon-button"
          aria-label={t("sound")}
          aria-pressed={store.settings.sound}
          onClick={() =>
            dispatch({
              type: "settings",
              patch: { sound: !store.settings.sound },
            })
          }
        >
          {store.settings.sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
      <div className="timer-digits" role="timer">
        {formatTime(
          store.restDeadline ? remaining : store.settings.restSeconds,
        )}
      </div>
      <p className="timer-status" aria-live="polite">
        {ready && !store.restDeadline ? t("ready") : t("timerHint")}
      </p>
      <div className="timer-presets">
        {([120, 150, 180] as const).map((s) => (
          <button
            key={s}
            className={store.settings.restSeconds === s ? "selected" : ""}
            onClick={() => begin(s)}
          >
            {formatTime(s)}
          </button>
        ))}
      </div>
      {store.restDeadline && (
        <div className="timer-actions">
          <button
            onClick={() =>
              dispatch({
                type: "timer",
                deadline: Math.max(Date.now(), store.restDeadline!) + 30000,
              })
            }
          >
            +30s
          </button>
          <button onClick={() => dispatch({ type: "timer", deadline: null })}>
            {t("skip")}
          </button>
        </div>
      )}
    </section>
  );
}
