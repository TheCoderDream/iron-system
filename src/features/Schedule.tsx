import { CalendarDays, ArrowRight } from "lucide-react";
import { days, dayOrder, liftingDays } from "../data/program";
import { weekStart, addDays, reschedule } from "../domain/training";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
import { PageHeader } from "../components/ui";

export function Schedule() {
  const { store, dispatch } = useStore();
  const { t, loc } = useI18n();
  const start = weekStart();
  const schedule = {
    ...Object.fromEntries(dayOrder.map((day, i) => [day, addDays(start, i)])),
    ...store.schedule,
  };
  return (
    <>
      <PageHeader
        eyebrow={t("schedule")}
        title={t("scheduleTitle")}
        subtitle={t("scheduleSub")}
      />
      <div className="notice">
        <CalendarDays size={20} />
        <p>{t("scheduleHelp")}</p>
      </div>
      <div className="schedule-list">
        {dayOrder.map((day, i) => (
          <section
            className={`panel schedule-row ${day === store.nextDay ? "up-next" : ""}`}
            key={day}
          >
            <span className="exercise-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="eyebrow">{loc(days[day].day)}</span>
              <h3>{loc(days[day].title)}</h3>
              {day === store.nextDay && (
                <span className="badge">
                  {t("next")} <ArrowRight size={12} />
                </span>
              )}
            </div>
            <label className="field">
              <span>{t("date")}</span>
              <input
                aria-label={`${loc(days[day].short)} ${t("date")}`}
                type="date"
                value={schedule[day]}
                min={
                  liftingDays.indexOf(day) > 0
                    ? addDays(
                        schedule[liftingDays[liftingDays.indexOf(day) - 1]]!,
                        1,
                      )
                    : undefined
                }
                onChange={(e) => {
                  if (e.target.value && e.target.validity.valid)
                    dispatch({
                      type: "schedule",
                      schedule: reschedule(day, e.target.value, schedule),
                    });
                }}
              />
            </label>
          </section>
        ))}
      </div>
    </>
  );
}
