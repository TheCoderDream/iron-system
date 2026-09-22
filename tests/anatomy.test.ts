import { describe, expect, it } from "vitest";
import {
  exerciseExposure,
  involvement,
  plannedExposure,
  loggedExposure,
  anatomy,
} from "../src/data/anatomy";
import { coaching } from "../src/data/coaching";
import { liftingDays, program } from "../src/data/program";
import { initialStore } from "../src/domain/schema";
import { createSession } from "../src/domain/training";

describe("muscle exposure model", () => {
  it("has guidance and anatomy for every lifting exercise", () => {
    for (const day of liftingDays)
      for (const exercise of program[day]) {
        expect(anatomy[exercise.id]).toBeDefined();
        expect(coaching[exercise.id]).toBeDefined();
        for (const language of ["en", "es", "ru", "tr"] as const) {
          expect(coaching[exercise.id].setup[language].length).toBeGreaterThan(
            10,
          );
          expect(
            coaching[exercise.id].movement[language].length,
          ).toBeGreaterThan(10);
          expect(coaching[exercise.id].avoid[language].length).toBeGreaterThan(
            10,
          );
        }
      }
  });
  it("separates anterior, lateral and posterior delts", () => {
    expect(exerciseExposure("ohp").frontDelts.direct).toBe(1);
    expect(exerciseExposure("ohp").rearDelts.direct).toBe(0);
    expect(exerciseExposure("lateral").sideDelts.direct).toBe(1);
    expect(exerciseExposure("rear").rearDelts.direct).toBe(1);
  });
  it("counts actual full V6 work sets and excludes warm-ups", () => {
    const values = plannedExposure(initialStore().settings);
    expect(values.quads.direct).toBe(12);
    expect(values.glutes.direct).toBe(9);
    expect(values.chest.direct).toBe(6);
    expect(values.triceps.direct).toBe(8);
    expect(values.lats.direct).toBe(6);
    expect(values.abs.direct).toBe(4);
    expect(values.frontDelts.direct).toBe(4);
    expect(values.calves.direct).toBe(0);
  });
  it("honors day, short-mode and equipment selections", () => {
    const settings = initialStore().settings;
    expect(plannedExposure(settings, "upper-b", false).chest.direct).toBe(4);
    expect(plannedExposure(settings, "upper-b", true).chest.direct).toBe(2);
    expect(involvement("tricepsChoice", "benchDips").secondary).toContain(
      "frontDelts",
    );
    expect(involvement("tricepsChoice", "skull").secondary).toHaveLength(0);
  });
  it("logged mode counts completed working sets in the chosen dates only", () => {
    const store = initialStore();
    const session = createSession("upper-a", store, false);
    session.endedAt = Date.now();
    session.exercises[0].sets.forEach((s, i) => {
      s.done = i !== 3;
      s.weight = 20;
      s.reps = 5;
    });
    expect(
      loggedExposure([session], session.date, session.date).lats.direct,
    ).toBe(1);
    expect(
      loggedExposure([session], "2099-01-01", "2099-01-02").lats.direct,
    ).toBe(0);
  });
});
