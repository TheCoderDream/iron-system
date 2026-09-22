import {
  exercises,
  liftingDays,
  program,
  getProgram,
  type Muscle,
} from "../data/program";
import {
  localDate,
  type DayId,
  type ExerciseLog,
  type Session,
  type Settings,
  type Store,
} from "./schema";

export const uid = () => crypto.randomUUID();
export function createSession(
  day: DayId,
  store: Store,
  short: boolean,
  now = Date.now(),
): Session {
  const prescriptions = getProgram(store.settings)[day].filter(
    (p) =>
      !(
        short &&
        day === "upper-b" &&
        store.settings.shortOmissions.includes(
          p.id as Settings["shortOmissions"][number],
        )
      ),
  );
  return {
    id: uid(),
    day,
    date: localDate(new Date(now)),
    startedAt: now,
    endedAt: null,
    bodyweight:
      [...store.measurements]
        .sort((a, b) => b.date.localeCompare(a.date))
        .find((m) => m.weight !== null)?.weight ?? null,
    energy: 3,
    soreness: 1,
    notes: "",
    cardioMinutes: 0,
    cardioMode: "walk",
    short,
    exercises: prescriptions.map((p) => {
      const variant =
        store.settings.variants[p.id] ?? exercises[p.id].variants[0];
      const previous = previousExercise(store.sessions, day, p.id, variant);
      const target = progression(
        previous,
        p.workSets,
        p.repMax,
        store.settings.increments[`${day}:${p.id}:${variant}`] ?? 2.5,
      );
      return {
        id: p.id,
        variant,
        restSeconds: p.restSeconds ?? store.settings.restSeconds,
        repMin: p.repMin,
        repMax: p.repMax,
        notes: store.settings.notes[`${p.id}:${variant}`] ?? "",
        startedAt: null,
        sets: Array.from({ length: p.warmups + p.workSets }, (_, i) => ({
          id: uid(),
          kind: i < p.warmups ? ("warmup" as const) : ("work" as const),
          weight: i < p.warmups ? null : target.weight,
          reps: null,
          rir: null,
          done: false,
          completedAt: null,
        })),
      };
    }),
  };
}
export function previousExercise(
  sessions: Session[],
  day: DayId,
  id: string,
  variant: string,
): ExerciseLog | undefined {
  return [...sessions]
    .filter((s) => s.day === day)
    .sort((a, b) => b.startedAt - a.startedAt)
    .flatMap((s) => s.exercises)
    .find(
      (e) =>
        e.id === id &&
        e.variant === variant &&
        e.sets.some((s) => s.done && s.kind === "work"),
    );
}
export function progression(
  previous: ExerciseLog | undefined,
  required: number,
  ceiling: number,
  increment: number,
) {
  const sets = previous?.sets.filter((s) => s.kind === "work") ?? [];
  const logged = sets.filter(
    (s) => s.done && s.weight !== null && s.reps !== null,
  );
  const lastWeight = logged[0]?.weight ?? null;
  const qualifies =
    sets.length === required &&
    logged.length === required &&
    logged.every((s) => s.reps! >= ceiling && s.weight === lastWeight);
  return {
    weight:
      lastWeight === null
        ? null
        : Math.round((lastWeight + (qualifies ? increment : 0)) * 100) / 100,
    reason:
      lastWeight === null
        ? ("firstTarget" as const)
        : qualifies
          ? ("increaseTarget" as const)
          : ("repeatTarget" as const),
  };
}
export function completedWork(session: Session) {
  return session.exercises.flatMap((e) =>
    e.sets.filter((s) => s.done && s.kind === "work"),
  );
}
export function nextLiftingDay(day: DayId): DayId {
  const i = liftingDays.indexOf(day);
  return liftingDays[(i + 1) % liftingDays.length];
}
export function weekStart(now = new Date()): string {
  const date = new Date(now);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return localDate(date);
}
export function addDays(date: string, count: number): string {
  const d = new Date(date + "T12:00:00");
  d.setDate(d.getDate() + count);
  return localDate(d);
}
export function reschedule(
  day: DayId,
  date: string,
  schedule: Store["schedule"],
): Store["schedule"] {
  const index = liftingDays.indexOf(day);
  const result = { ...schedule, [day]: date };
  if (index < 0) return result;
  let previous = date;
  for (const later of liftingDays.slice(index + 1)) {
    const earliest = addDays(previous, 1);
    result[later] =
      result[later] && result[later]! >= earliest ? result[later] : earliest;
    previous = result[later]!;
  }
  return result;
}
export function volume(
  sessions: Session[],
  start: string,
  end: string,
  settings?: Settings,
) {
  const result: Record<
    string,
    { direct: number; secondary: number; planned: number }
  > = {};
  const get = (m: Muscle) =>
    (result[m] ??= { direct: 0, secondary: 0, planned: 0 });
  liftingDays
    .flatMap((day) => (settings ? getProgram(settings) : program)[day])
    .forEach((p) =>
      exercises[p.id].primary.forEach((m) => (get(m).planned += p.workSets)),
    );
  sessions
    .filter((s) => s.date >= start && s.date <= end)
    .forEach((s) =>
      s.exercises.forEach((e) => {
        const n = e.sets.filter(
          (set) => set.done && set.kind === "work",
        ).length;
        exercises[e.id]?.primary.forEach((m) => (get(m).direct += n));
        exercises[e.id]?.secondary.forEach((m) => (get(m).secondary += n));
      }),
    );
  return result;
}
export function performance(
  sessions: Session[],
  day: DayId,
  id: string,
  variant: string,
) {
  return [...sessions]
    .filter((s) => s.day === day)
    .sort((a, b) => a.startedAt - b.startedAt)
    .flatMap((s) => {
      const e = s.exercises.find((e) => e.id === id && e.variant === variant);
      const sets =
        e?.sets.filter((set) => set.done && set.kind === "work") ?? [];
      if (!sets.length) return [];
      return [
        {
          date: s.date,
          weight: Math.max(...sets.map((set) => set.weight!)),
          reps: sets.reduce((sum, set) => sum + set.reps!, 0),
          volume: sets.reduce((sum, set) => sum + set.weight! * set.reps!, 0),
          sets: sets.length,
          bodyweight: s.bodyweight,
        },
      ];
    });
}
export function declining(points: ReturnType<typeof performance>): boolean {
  const last = points.slice(-3);
  return (
    last.length === 3 &&
    last.every((p) => p.sets === last[0].sets && p.weight === last[0].weight) &&
    last[0].reps > last[1].reps &&
    last[1].reps > last[2].reps
  );
}
/** Find the closest load at or below target, then minimize plate count.
 * Integer hundredths avoid floating-point drift; a greedy choice is not
 * sufficient for custom denominations (e.g. 3 kg and 2 kg plates).
 */
export function plateLoad(target: number, bar: number, plates: number[]) {
  const capacity = Math.floor(Math.max(0, target - bar) * 50 + 0.00001);
  const denominations = [...new Set(plates.map((p) => Math.round(p * 100)))]
    .filter((p) => p > 0)
    .sort((a, b) => b - a);
  const count = new Int32Array(capacity + 1).fill(capacity + 1);
  const chosen = new Int32Array(capacity + 1);
  count[0] = 0;
  for (let amount = 1; amount <= capacity; amount++) {
    for (const plate of denominations) {
      if (plate <= amount && count[amount - plate] + 1 < count[amount]) {
        count[amount] = count[amount - plate] + 1;
        chosen[amount] = plate;
      }
    }
  }
  let reachable = capacity;
  while (reachable > 0 && chosen[reachable] === 0) reachable--;
  const quantities = new Map<number, number>();
  for (let amount = reachable; amount > 0; amount -= chosen[amount]) {
    const plate = chosen[amount];
    quantities.set(plate, (quantities.get(plate) ?? 0) + 1);
  }
  const achievable = Math.round((bar + reachable / 50) * 100) / 100;
  return {
    pairs: [...quantities]
      .sort(([a], [b]) => b - a)
      .map(([plate, count]) => ({ plate: plate / 100, count })),
    achievable,
    exact: Math.abs(achievable - target) < 0.00001,
  };
}
export function warmups(target: number, bar: number) {
  return [0.5, 0.75].map((factor, i) => ({
    weight: Math.min(
      target,
      Math.max(bar, Math.round((target * factor) / 2.5) * 2.5),
    ),
    reps: i === 0 ? 8 : 4,
  }));
}
