import { z } from "zod";
import { exercises, liftingDays, exerciseIds } from "../data/program";
import {
  initialStore,
  languageSchema,
  storeSchema,
  type Store,
} from "../domain/schema";

export const STORAGE_KEY = "iron-system:v7";
export function parseBackup(raw: string): Store {
  if (raw.length > 10_000_000) throw new Error("Backup is too large");
  const store = storeSchema.parse(JSON.parse(raw));
  for (const session of [
    ...store.sessions,
    ...(store.active ? [store.active] : []),
  ]) {
    if (
      new Set(session.exercises.map((e) => e.id)).size !==
      session.exercises.length
    )
      throw new Error("Duplicate exercises");
    for (const exercise of session.exercises) {
      if (!liftingDays.includes(session.day))
        throw new Error("Exercise does not belong to this session");
      if (new Set(exercise.sets.map((s) => s.id)).size !== exercise.sets.length)
        throw new Error("Duplicate sets");
      if (
        !exerciseIds.includes(exercise.id) ||
        !exercises[exercise.id]?.variants.includes(exercise.variant)
      )
        throw new Error("Unknown exercise or variant");
    }
  }
  for (const [day, entries] of Object.entries(store.settings.plan)) {
    if (
      !liftingDays.includes(day as import("../domain/schema").DayId) ||
      entries?.some((p) => !exerciseIds.includes(p.id))
    )
      throw new Error("Unknown plan day or exercise");
  }
  for (const key of Object.keys(store.settings.videos)) {
    const [id, variant] = key.split(":");
    if (!exercises[id]?.variants.includes(variant))
      throw new Error("Unknown video exercise");
  }
  for (const [id, variant] of Object.entries(store.settings.variants)) {
    if (!exercises[id]?.variants.includes(variant))
      throw new Error("Unknown preferred variant");
  }
  return store;
}
export function loadStore(
  storage: Pick<Storage, "getItem">,
  browserLanguage = "en",
): { store: Store; error: boolean } {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw) return { store: parseBackup(raw), error: false };
    const language = languageSchema
      .catch("en")
      .parse(
        storage.getItem("workoutLanguage") ?? browserLanguage.split("-")[0],
      );
    const store = initialStore(language);
    const legacy = storage.getItem("workoutCompletedV3");
    if (legacy) {
      const result = z
        .record(z.array(z.string()))
        .safeParse(JSON.parse(legacy));
      if (result.success) store.legacyCompleted = result.data;
    }
    return { store, error: false };
  } catch {
    return { store: initialStore(), error: true };
  }
}
export function download(
  content: string,
  name: string,
  mime = "application/json",
) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
