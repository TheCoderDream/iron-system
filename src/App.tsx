import { useEffect, useState } from "react";
import {
  Activity,
  ListChecks,
  BookOpen,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Dumbbell,
  History as HistoryIcon,
  Settings2,
  WifiOff,
} from "lucide-react";
import { useStore } from "./state/StoreProvider";
import { download, STORAGE_KEY } from "./state/persistence";
import { useI18n } from "./i18n/messages";
import { PlanEditor } from "./features/PlanEditor";
import { Learn } from "./features/Learn";
import { Train } from "./features/Train";
import { Progress } from "./features/Progress";
import { History } from "./features/History";
import { Schedule } from "./features/Schedule";
import { Settings } from "./features/Settings";
import { RestTimer } from "./components/RestTimer";
import { days } from "./data/program";

type View =
  "plan" | "train" | "progress" | "history" | "schedule" | "settings" | "learn";
const views: View[] = [
  "train",
  "plan",
  "progress",
  "history",
  "schedule",
  "learn",
  "settings",
];
const icons = {
  plan: ListChecks,
  train: Dumbbell,
  progress: Activity,
  history: HistoryIcon,
  schedule: CalendarDays,
  settings: Settings2,
  learn: BookOpen,
};
function currentView(): View {
  const hash = location.hash.slice(1);
  return views.includes(hash as View) ? (hash as View) : "train";
}
export default function App() {
  const [view, setView] = useState<View>(currentView);
  const [online, setOnline] = useState(navigator.onLine);
  const { store, storageError, recover } = useStore();
  const { t, loc, language } = useI18n();
  useEffect(() => {
    const changed = () => {
      setView(currentView());
      window.scrollTo({ top: 0 });
      document.getElementById("main")?.focus({ preventScroll: true });
    };
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    const changed = () => setOnline(navigator.onLine);
    window.addEventListener("online", changed);
    window.addEventListener("offline", changed);
    return () => {
      window.removeEventListener("online", changed);
      window.removeEventListener("offline", changed);
    };
  }, []);
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        {t("skipContent")}
      </a>
      <aside className="sidebar">
        <a href="#train" className="brand">
          <div className="brand-mark">
            <Dumbbell size={23} />
          </div>
          <div>
            <strong>
              IRON SYSTEM<span>TRAINING COMPANION</span>
            </strong>
          </div>
        </a>
        <span className="nav-label">{t("workspace")}</span>
        <nav aria-label={t("workspace")}>
          {views.map((key) => {
            const Icon = icons[key];
            return (
              <a
                key={key}
                href={`#${key}`}
                className={view === key ? "active" : ""}
                aria-current={view === key ? "page" : undefined}
              >
                <Icon size={19} />
                <span>{t(key)}</span>
                {key === "train" && store.active && <i className="live-dot" />}
              </a>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="next-card">
            <span className="eyebrow">
              {store.active ? t("resume") : t("next")}
            </span>
            <h3>{loc(days[store.active?.day ?? store.nextDay].short)}</h3>
            <a href="#train">
              {t("train")}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="local-indicator">
            {online ? <CheckCircle2 size={14} /> : <WifiOff size={14} />}
            <span>{t(storageError ? "saveUnavailable" : "local")}</span>
          </div>
          <small>IRON SYSTEM · V7</small>
        </div>
      </aside>
      <main id="main" tabIndex={-1}>
        <div className="topline">
          <span>{t("system")}</span>
          <span className="topline-date">
            {new Intl.DateTimeFormat(language, {
              weekday: "short",
              day: "numeric",
              month: "long",
            }).format(new Date())}
          </span>
        </div>
        {storageError && (
          <div className="notice warning" role="alert">
            <div>
              <p>{t("storageError")}</p>
              <div className="button-row">
                <button
                  className="secondary"
                  onClick={() =>
                    download(
                      JSON.stringify(store, null, 2),
                      "iron-system-recovery.json",
                    )
                  }
                >
                  {t("export")}
                </button>
                <button
                  className="secondary"
                  onClick={() => {
                    try {
                      download(
                        localStorage.getItem(STORAGE_KEY) ?? "{}",
                        "iron-system-stored.json",
                      );
                    } catch {
                      /* Browser storage may be inaccessible. */
                    }
                  }}
                >
                  {t("rawExport")}
                </button>
                <button
                  className="secondary"
                  onClick={() => {
                    if (confirm(t("recoveryConfirm"))) recover();
                  }}
                >
                  {t("recover")}
                </button>
              </div>
            </div>
          </div>
        )}
        {view === "train" ? (
          <Train />
        ) : view === "plan" ? (
          <PlanEditor />
        ) : view === "progress" ? (
          <Progress />
        ) : view === "history" ? (
          <History />
        ) : view === "schedule" ? (
          <Schedule />
        ) : view === "learn" ? (
          <Learn />
        ) : (
          <Settings />
        )}
        {view !== "train" && store.active && (
          <div className="floating-timer">
            <RestTimer />
          </div>
        )}
        <footer className="page-footer">
          <span>IRON SYSTEM</span>
          <span>{t("local")} · V7</span>
        </footer>
      </main>
    </div>
  );
}
