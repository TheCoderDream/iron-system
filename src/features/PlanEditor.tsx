import { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Check,
  RotateCcw,
} from "lucide-react";
import {
  days,
  exercises,
  exerciseIds,
  muscles,
  type Muscle,
  liftingDays,
  getProgram,
  program,
  type Prescription,
} from "../data/program";
import { searchExercises } from "../domain/exerciseSearch";
import { planDaySchema, type DayId } from "../domain/schema";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
import { PageHeader } from "../components/ui";
import { ProgramAnatomy } from "./ProgramAnatomy";

export function PlanEditor() {
  const { store, dispatch } = useStore();
  const { t, loc } = useI18n();
  const [day, setDay] = useState<DayId>("upper-a");
  const [draft, setDraft] = useState(() =>
    structuredClone(getProgram(store.settings)),
  );
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const [query,setQuery]=useState("");
  const [muscle,setMuscle]=useState<Muscle|"all">("all");
  const [addId,setAddId]=useState("");
  const entries = draft[day];
  const matchingIds = searchExercises(query,muscle).sort((a,b)=>loc(exercises[a].name).localeCompare(loc(exercises[b].name)));
  const available = matchingIds.filter(id=>!entries.some(p=>p.id===id));
  const selectedAdd = available.includes(addId)?addId:available[0]??"";
  const dirty =
    JSON.stringify(draft) !== JSON.stringify(getProgram(store.settings));
  const update = (items: Prescription[]) => {
    setDraft({ ...draft, [day]: items });
    setSaved(false);
    setError(false);
  };
  const change = (index: number, patch: Partial<Prescription>) =>
    update(entries.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  const move = (i: number, d: number) => {
    const next = [...entries];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    update(next);
  };
  return (
    <>
      <PageHeader
        eyebrow={t("plan")}
        title={t("planTitle")}
        subtitle={t("planHelp")}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            liftingDays.some((d) => !planDaySchema.safeParse(draft[d]).success)
          ) {
            setError(true);
            return;
          }
          dispatch({
            type: "settings",
            patch: {
              plan: Object.fromEntries(liftingDays.map((d) => [d, draft[d]])),
            },
          });
          setSaved(true);
          setError(false);
        }}
      >
        <div className="plan-toolbar panel">
          <div className="button-row">
            {liftingDays.map((d) => (
              <button
                type="button"
                key={d}
                className={day === d ? "primary" : "secondary"}
                onClick={() => setDay(d)}
              >
                {loc(days[d].short)}
              </button>
            ))}
          </div>
          <div className="button-row">
            <button className="primary" type="submit" disabled={!dirty}>
              <Check size={16} />
              {t("savePlan")}
            </button>
            <button
              type="button"
              className="secondary"
              disabled={!dirty}
              onClick={() => {
                setDraft(structuredClone(getProgram(store.settings)));
                setSaved(false);
                setError(false);
              }}
            >
              {t("cancel")}
            </button>
          </div>
          <p className="muted" role="status">
            {saved ? t("planSaved") : dirty ? t("unsavedPlan") : t("planHelp")}
          </p>
          {error && <p role="alert">{t("planInvalid")}</p>}
        </div>
        <section className="panel editor-panel">
          <div className="section-title">
            <h2>{loc(days[day].short)}</h2>
            <button
              type="button"
              className="secondary"
              onClick={() => update(structuredClone(program[day]))}
            >
              <RotateCcw size={14} />
              {t("restoreDay")}
            </button>
          </div>
          <div className="library-filters">
            <div className="section-title"><h3>{t("exerciseLibrary")}</h3><span className="badge">{matchingIds.length} / {exerciseIds.length}</span></div>
            <div className="library-filter-fields">
              <label className="field"><span>{t("searchExercises")}</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t("exerciseSearchHint")} /></label>
              <label className="field"><span>{t("filterMuscle")}</span><select aria-label={t("filterMuscle")} value={muscle} onChange={e=>setMuscle(e.target.value as Muscle|"all")}><option value="all">{t("allMuscles")}</option>{muscles.map(m=><option key={m} value={m}>{t(m)}</option>)}</select></label>
            </div>
            <p className="muted">{t("libraryFilterHelp")}</p>
            {!matchingIds.length&&<p role="status">{t("noExercisesFound")}</p>}
            {(query||muscle!=="all")&&<button type="button" className="secondary" onClick={()=>{setQuery("");setMuscle("all");}}>{t("clearFilters")}</button>}
          </div>
          {entries.map((p, index) => (
            <div className="editor-exercise" key={`${day}:${p.id}`}>
              <div className="editor-exercise-heading">
                <span className="exercise-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <label className="field">
                  <span>{t("chooseExercise")}</span>
                  <select
                    aria-label={t("chooseExercise")}
                    value={p.id}
                    onChange={(e) => change(index, { id: e.target.value })}
                  >
                    {[p.id,...matchingIds.filter(id=>id!==p.id&&!entries.some(e=>e.id===id))].map(id=><option key={id} value={id}>{loc(exercises[id].name)}</option>)}
                  </select>
                </label>
                <div className="button-row">
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={t("moveUp")}
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowUp size={17} />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={t("moveDown")}
                    disabled={index === entries.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowDown size={17} />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={t("removeExercise")}
                    disabled={entries.length === 1}
                    onClick={() =>
                      update(entries.filter((_, i) => i !== index))
                    }
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
              <div className="editor-fields">
                {(
                  [
                    ["workSets", "workingSets", 1, 10],
                    ["warmups", "warmup", 0, 6],
                    ["repMin", "repMinimum", 1, 100],
                    ["repMax", "repMaximum", 1, 100],
                    ["restSeconds", "restSecondsLabel", 30, 600],
                  ] as const
                ).map(([key, label, min, max]) => (
                  <label className="field" key={key}>
                    <span>{t(label)}</span>
                    <input
                      type="number"
                      required
                      min={min}
                      max={max}
                      step="1"
                      value={
                        Number.isNaN(p[key])
                          ? ""
                          : (p[key] ?? store.settings.restSeconds)
                      }
                      onChange={(e) =>
                        change(index, {
                          [key]:
                            e.target.value === ""
                              ? NaN
                              : Number(e.target.value),
                        })
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="library-add">
          <label className="field"><span>{t("libraryExercise")}</span><select aria-label={t("libraryExercise")} value={selectedAdd} disabled={!available.length||entries.length>=20} onChange={e=>setAddId(e.target.value)}>{!available.length&&<option value="">{t("noExercisesFound")}</option>}{available.map(id=><option key={id} value={id}>{loc(exercises[id].name)}</option>)}</select></label>
          <button
            type="button"
            className="secondary"
            disabled={!selectedAdd || entries.length >= 20}
            onClick={() => {
              const id = selectedAdd;
              if (id)
                update([
                  ...entries,
                  {
                    id,
                    warmups: 0,
                    workSets: 2,
                    repMin: 8,
                    repMax: 12,
                    restSeconds: 150,
                  },
                ]);
            }}
          >
            <Plus size={16} />
            {t("addExercise")}
          </button></div>
          {entries.length>=20&&<p className="muted">{t("dayExerciseLimit")}</p>}
        </section>
      </form>
      <ProgramAnatomy key={day} day={day} />
    </>
  );
}
