import { useState } from "react";
import { ChevronDown, Clock3, Download } from "lucide-react";
import { days, dayOrder, exercises } from "../data/program";
import { completedWork } from "../domain/training";
import { useStore } from "../state/StoreProvider";
import { download } from "../state/persistence";
import { useI18n, variantKey } from "../i18n/messages";
import { EmptyState, PageHeader, formatTime } from "../components/ui";

export function History() {
  const { store } = useStore();
  const { t, loc, date } = useI18n();
  const [filter, setFilter] = useState("all");
  const sessions = [...store.sessions]
    .filter((s) => filter === "all" || s.day === filter)
    .sort((a, b) => b.startedAt - a.startedAt);
  const exportCsv = () => {
    const rows: (string | number)[][] = [
      [
        "Date",
        "Session",
        "Exercise",
        "Variant",
        "Set type",
        "Weight kg",
        "Reps",
        "RIR",
        "Completed",
        "Bodyweight kg",
      ],
    ];
    for (const s of sessions)
      for (const e of s.exercises)
        for (const set of e.sets)
          rows.push([
            s.date,
            s.day,
            e.id,
            e.variant,
            set.kind,
            set.weight ?? "",
            set.reps ?? "",
            set.rir ?? "",
            String(set.done),
            s.bodyweight ?? "",
          ]);
    download(
      rows
        .map((row) =>
          row
            .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
            .join(","),
        )
        .join("\r\n"),
      "iron-system-sets.csv",
      "text/csv;charset=utf-8",
    );
  };
  return (
    <>
      <PageHeader
        eyebrow={t("history")}
        title={t("historyTitle")}
        subtitle={t("historySub")}
      >
        <button className="secondary" onClick={exportCsv}>
          <Download size={16} />
          {t("exportCsv")}
        </button>
      </PageHeader>
      <label className="field history-filter">
        <span>{t("filter")}</span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">{t("all")}</option>
          {dayOrder
            .filter((id) => id !== "rest")
            .map((id) => (
              <option key={id} value={id}>
                {loc(days[id].title)}
              </option>
            ))}
        </select>
      </label>
      {store.legacyCompleted && <p className="notice">{t("legacy")}</p>}
      {!sessions.length && (
        <EmptyState title={t("noHistory")} description={t("noDataHelp")} />
      )}
      <div className="history-list">
        {sessions.map((session) => (
          <details className="panel history-card" key={session.id}>
            <summary>
              <span className="history-date">{date(session.date)}</span>
              <div>
                <h3>
                  {loc(days[session.day].title)}{" "}
                  {session.short && <span className="badge">{t("short")}</span>}
                </h3>
                <p>
                  {completedWork(session).length} {t("workingSets")}
                  <span> · </span>
                  <Clock3 size={12} />{" "}
                  {formatTime((session.endedAt! - session.startedAt) / 1000)}
                </p>
              </div>
              <ChevronDown size={20} />
            </summary>
            <div className="history-detail">
              <p className="muted">
                {t("energy")}: {session.energy}/5 · {t("soreness")}:{" "}
                {session.soreness}/5 · {t("bodyweight")}:{" "}
                {session.bodyweight ?? "—"}
              </p>
              {session.cardioMinutes > 0 && (
                <p>
                  {t(session.cardioMode)} · {session.cardioMinutes}{" "}
                  {t("minutes")}
                </p>
              )}
              {session.exercises.map((e) => (
                <div className="history-exercise" key={e.id}>
                  <div>
                    <h4>{loc(exercises[e.id].name)}</h4>
                    <small>{t(variantKey(e.variant))}</small>
                  </div>
                  <div className="history-sets">
                    {e.sets.map((set, i) => (
                      <span
                        className={set.done ? "" : "uncompleted"}
                        key={set.id}
                        title={set.done ? "" : t("incomplete")}
                      >
                        {set.kind === "warmup" ? "W" : i + 1} ·{" "}
                        {set.weight ?? "—"} kg × {set.reps ?? "—"}
                        {set.rir !== null ? ` · RIR ${set.rir}` : ""}
                        {!set.done ? " ○" : " ✓"}
                      </span>
                    ))}
                  </div>
                  {e.notes && <p>{e.notes}</p>}
                  {e.startedAt && e.sets.some((s) => s.done) && (
                    <small>
                      {t("exerciseTime")}:{" "}
                      {formatTime(
                        (Math.max(
                          ...e.sets.map((s) => s.completedAt ?? e.startedAt!),
                        ) -
                          e.startedAt) /
                          1000,
                      )}
                    </small>
                  )}
                </div>
              ))}
              {session.notes && <blockquote>{session.notes}</blockquote>}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
