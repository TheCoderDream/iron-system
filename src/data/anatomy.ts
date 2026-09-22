import { extendedAnatomy } from "./extendedCatalog";
import { liftingDays, getProgram } from "./program";
import type { DayId, Session, Settings } from "../domain/schema";

export const regions = [
  "chest",
  "lats",
  "upperBack",
  "lowerBack",
  "frontDelts",
  "sideDelts",
  "rearDelts",
  "biceps",
  "triceps",
  "forearms",
  "abs",
  "glutes",
  "quads",
  "hamstrings",
  "adductors",
  "calves",
] as const;
export type Region = (typeof regions)[number];
export interface MuscleExposure {
  direct: number;
  secondary: number;
}
export type Exposure = Record<Region, MuscleExposure>;
export const anatomy: Record<
  string,
  { primary: Region[]; secondary: Region[] }
> = {
  pullup: { primary: ["lats"], secondary: ["biceps", "upperBack", "forearms"] },
  dips: { primary: ["chest", "triceps"], secondary: ["frontDelts"] },
  ohp: { primary: ["frontDelts"], secondary: ["sideDelts", "triceps"] },
  inclineShoulder: {
    primary: ["frontDelts"],
    secondary: ["chest", "triceps", "sideDelts"],
  },
  skull: { primary: ["triceps"], secondary: [] },
  squat: {
    primary: ["quads", "glutes"],
    secondary: ["adductors", "lowerBack", "abs"],
  },
  bulgarian: { primary: ["quads", "glutes"], secondary: ["adductors"] },
  ham: { primary: ["hamstrings"], secondary: [] },
  extension: { primary: ["quads"], secondary: [] },
  decline: { primary: ["abs"], secondary: [] },
  pec: { primary: ["chest"], secondary: ["frontDelts"] },
  row: {
    primary: ["upperBack", "lats"],
    secondary: ["biceps", "rearDelts", "forearms"],
  },
  lateral: { primary: ["sideDelts"], secondary: ["upperBack"] },
  rear: { primary: ["rearDelts"], secondary: ["upperBack"] },
  curl: { primary: ["biceps"], secondary: ["forearms"] },
  tricepsChoice: { primary: ["triceps"], secondary: [] },
  backExtension: {
    primary: ["glutes", "hamstrings"],
    secondary: ["lowerBack"],
  },
  wristCurl: { primary: ["forearms"], secondary: [] },
  legpress: { primary: ["quads", "glutes"], secondary: ["adductors"] },
};
Object.assign(anatomy, extendedAnatomy);
export function involvement(id: string, variant?: string) {
  if (id === "tricepsChoice" && variant === "benchDips")
    return {
      primary: ["triceps"] as Region[],
      secondary: ["frontDelts", "chest"] as Region[],
    };
  return anatomy[id] ?? { primary: [], secondary: [] };
}
export function emptyExposure(): Exposure {
  return Object.fromEntries(
    regions.map((id) => [id, { direct: 0, secondary: 0 }]),
  ) as Exposure;
}
function add(exposure: Exposure, id: string, sets: number, variant?: string) {
  const muscles = involvement(id, variant);
  muscles.primary.forEach((m) => (exposure[m].direct += sets));
  muscles.secondary.forEach((m) => (exposure[m].secondary += sets));
}
export function exerciseExposure(id: string, variant?: string): Exposure {
  const result = emptyExposure();
  add(result, id, 1, variant);
  return result;
}
export function plannedExposure(
  settings: Settings,
  day?: DayId,
  short = false,
): Exposure {
  const result = emptyExposure();
  (day ? [day] : liftingDays).forEach((d) =>
    getProgram(settings)[d].forEach((p) => {
      if (
        short &&
        d === "upper-b" &&
        settings.shortOmissions.includes(
          p.id as Settings["shortOmissions"][number],
        )
      )
        return;
      add(result, p.id, p.workSets, settings.variants[p.id]);
    }),
  );
  return result;
}
export function loggedExposure(
  sessions: Session[],
  start: string,
  end: string,
): Exposure {
  const result = emptyExposure();
  sessions
    .filter((s) => s.date >= start && s.date <= end)
    .forEach((s) =>
      s.exercises.forEach((e) =>
        add(
          result,
          e.id,
          e.sets.filter((set) => set.done && set.kind === "work").length,
          e.variant,
        ),
      ),
    );
  return result;
}
