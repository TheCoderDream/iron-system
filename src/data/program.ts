import { extendedExercises, extendedIds } from "./extendedCatalog";
import legacy from "./legacy-program.json";
import type { DayId, Localized, Settings } from "../domain/schema";

export interface Prescription {
  id: string;
  restSeconds?: number;
  warmups: number;
  workSets: number;
  repMin: number;
  repMax: number;
}
export interface Exercise {
  name: Localized;
  note: Localized;
  primary: Muscle[];
  secondary: Muscle[];
  variants: string[];
  addedWeight: boolean;
}
export type Muscle =
  | "chest"
  | "back"
  | "shoulders"
  | "triceps"
  | "biceps"
  | "quads"
  | "hamstrings"
  | "glutes"
  | "abs"
  | "forearms"
  | "calves"
  | "adductors";
export const muscles: Muscle[] = [
  "chest",
  "back",
  "shoulders",
  "triceps",
  "biceps",
  "quads",
  "hamstrings",
  "glutes",
  "abs",
  "forearms",
  "calves",
  "adductors",
];
const metadata: Record<string, [Muscle[], Muscle[], string[]]> = {
  pullup: [["back"], ["biceps"], ["standard"]],
  dips: [["chest", "triceps"], ["shoulders"], ["standard"]],
  ohp: [["shoulders"], ["triceps"], ["barbell"]],
  inclineShoulder: [["shoulders"], ["chest", "triceps"], ["dumbbell", "smith"]],
  skull: [["triceps"], [], ["barbell"]],
  squat: [["quads", "glutes"], [], ["barbell"]],
  bulgarian: [["quads", "glutes"], [], ["dumbbell"]],
  ham: [["hamstrings"], [], ["machine"]],
  extension: [["quads"], [], ["machine"]],
  decline: [["abs"], [], ["standard"]],
  pec: [["chest"], [], ["machine"]],
  row: [["back"], ["biceps"], ["cable", "supported"]],
  lateral: [["shoulders"], [], ["dumbbell"]],
  rear: [["shoulders"], ["back"], ["machine", "dumbbell"]],
  curl: [["biceps"], [], ["barbell"]],
  tricepsChoice: [["triceps"], [], ["skull", "benchDips"]],
  backExtension: [["glutes", "hamstrings"], ["back"], ["standard"]],
  wristCurl: [["forearms"], [], ["barbell"]],
  legpress: [["quads", "glutes"], [], ["machine"]],
};
export const exerciseIds = [...Object.keys(metadata), ...extendedIds];
export const exercises: Record<string, Exercise> = Object.fromEntries(
  Object.entries(legacy.E).map(([id, value]) => {
    const [primary, secondary, variants] = metadata[id] ?? [
      [],
      [],
      ["standard"],
    ];
    return [
      id,
      {
        ...value,
        primary,
        secondary,
        variants,
        addedWeight: ["pullup", "dips", "decline", "backExtension"].includes(
          id,
        ),
      },
    ];
  }),
);
Object.assign(exercises, extendedExercises);
export const days = legacy.DAY_TEXT;
export const dayOrder: DayId[] = [
  "upper-a",
  "lower-a",
  "cardio-1",
  "upper-b",
  "lower-b",
  "cardio-2",
  "rest",
];
export const liftingDays: DayId[] = [
  "upper-a",
  "lower-a",
  "upper-b",
  "lower-b",
];
export const program: Record<DayId, Prescription[]> = Object.fromEntries(
  Object.entries(legacy.PROGRAM).map(([day, entries]) => [
    day,
    liftingDays.includes(day as DayId)
      ? entries.map(([id, sets, reps]) => {
          const [repMin, repMax] = reps
            .split("–")
            .map((value) => parseInt(value));
          return {
            id,
            warmups: sets === "w2w2" ? 2 : 0,
            workSets: sets === "w1" ? 1 : 2,
            repMin,
            repMax,
          };
        })
      : [],
  ]),
) as Record<DayId, Prescription[]>;

export function getProgram(
  settings: Pick<Settings, "plan">,
): Record<DayId, Prescription[]> {
  return { ...program, ...settings.plan };
}
export function getPrescription(
  settings: Settings,
  day: DayId,
  id: string,
): Prescription {
  return (
    getProgram(settings)[day].find((p) => p.id === id) ??
    Object.values(program)
      .flat()
      .find((p) => p.id === id) ?? {
      id,
      warmups: 0,
      workSets: 2,
      repMin: 8,
      repMax: 12,
    }
  );
}
