import { describe, expect, it } from "vitest";
import { initialStore, storeSchema } from "../src/domain/schema";
import {
  addDays,
  createSession,
  declining,
  nextLiftingDay,
  plateLoad,
  previousExercise,
  progression,
  reschedule,
  volume,
  warmups,
} from "../src/domain/training";
import { loadStore, parseBackup, STORAGE_KEY } from "../src/state/persistence";
import { reducer } from "../src/state/StoreProvider";

function fixture() {
  const store = initialStore();
  const session = createSession("upper-b", store, false, 1000);
  session.exercises[0].sets.forEach((s) =>
    Object.assign(s, { done: true, weight: 30, reps: 12, completedAt: 2000 }),
  );
  session.endedAt = 3000;
  return session;
}
describe("training lifecycle", () => {
  it("preserves V6 prescriptions and separates warm-ups", () => {
    const store = initialStore();
    const upperA = createSession("upper-a", store, false);
    expect(upperA.exercises).toHaveLength(6);
    expect(upperA.exercises[0].sets.map((s) => s.kind)).toEqual([
      "warmup",
      "warmup",
      "work",
      "work",
    ]);
    expect(createSession("upper-b", store, false).exercises).toHaveLength(9);
    expect(
      createSession("upper-b", store, false).exercises.flatMap((e) => e.sets),
    ).toHaveLength(18);
    expect(
      createSession("lower-a", store, false).exercises.some(
        (e) => e.id === "crunch",
      ),
    ).toBe(false);
    expect(
      createSession("lower-a", store, false).exercises.some(
        (e) => e.id === "decline",
      ),
    ).toBe(true);
  });
  it("short mode omits only configured accessories without changing the full plan", () => {
    const store = initialStore();
    store.settings.shortOmissions = ["pec", "tricepsChoice"];
    expect(createSession("upper-b", store, true).exercises).toHaveLength(7);
    expect(createSession("upper-b", store, false).exercises).toHaveLength(9);
  });
  it("saves partial sessions once and advances only lifting sequence", () => {
    const session = fixture();
    session.endedAt = null;
    const store = { ...initialStore(), active: session };
    const saved = reducer(store, { type: "finish", now: 4000 });
    expect(saved.sessions).toHaveLength(1);
    expect(saved.nextDay).toBe("lower-b");
    expect(saved.active).toBeNull();
    expect(reducer(saved, { type: "finish", now: 5000 }).sessions).toHaveLength(
      1,
    );
    expect(saved.sessions[0].exercises[1].sets.every((s) => !s.done)).toBe(
      true,
    );
    const cardio = reducer(
      { ...saved, active: createSession("cardio-1", saved, false) },
      { type: "finish", now: Date.now() },
    );
    expect(cardio.nextDay).toBe("lower-b");
  });
});
describe("explainable progression", () => {
  it("increases only when every prescribed work set reaches ceiling at the same load", () => {
    const e = fixture().exercises[0];
    expect(progression(e, 2, 12, 2.5)).toEqual({
      weight: 32.5,
      reason: "increaseTarget",
    });
    e.sets[1].reps = 11;
    expect(progression(e, 2, 12, 2.5).weight).toBe(30);
    e.sets[1].reps = 12;
    e.sets[1].done = false;
    expect(progression(e, 2, 12, 2.5).reason).toBe("repeatTarget");
    e.sets[1].done = true;
    e.sets[1].weight = 25;
    expect(progression(e, 2, 12, 2.5).reason).toBe("repeatTarget");
  });
  it("supports bodyweight (zero added load), custom increments, and first sessions", () => {
    const e = fixture().exercises[0];
    e.sets.forEach((s) => (s.weight = 0));
    expect(progression(e, 2, 12, 1.25).weight).toBe(1.25);
    expect(progression(undefined, 2, 12, 2.5)).toEqual({
      weight: null,
      reason: "firstTarget",
    });
  });
  it("isolates variant and strength/hypertrophy history", () => {
    const session = fixture();
    expect(
      previousExercise([session], "upper-a", "dips", "standard"),
    ).toBeUndefined();
    expect(
      previousExercise([session], "upper-b", "dips", "smith"),
    ).toBeUndefined();
    expect(
      previousExercise([session], "upper-b", "dips", "standard"),
    ).toBeDefined();
  });
  it("does not interpret missing sets as a performance decline", () => {
    const points = [12, 10, 8].map((reps) => ({
      date: "2026-09-22",
      weight: 30,
      reps,
      sets: 2,
      volume: 30 * reps,
      bodyweight: 80,
    }));
    expect(declining(points)).toBe(true);
    points[2].sets = 1;
    expect(declining(points)).toBe(false);
  });
});
describe("analytics, scheduling and tools", () => {
  it("counts completed work only and reports secondary involvement separately", () => {
    const s = fixture();
    const data = volume([s], s.date, s.date);
    expect(data.chest.direct).toBe(2);
    expect(data.shoulders.direct).toBe(0);
    expect(data.shoulders.secondary).toBe(2);
    expect(volume([s], "2099-01-01", "2099-01-07").chest.direct).toBe(0);
  });
  it("reschedules later lifts without reversing their sequence", () => {
    const result = reschedule("lower-a", "2026-09-26", {
      "upper-a": "2026-09-21",
      "upper-b": "2026-09-24",
      "lower-b": "2026-09-25",
    });
    expect(result["upper-a"]).toBe("2026-09-21");
    expect(result["upper-b"]).toBe("2026-09-27");
    expect(result["lower-b"]).toBe("2026-09-28");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(nextLiftingDay("lower-b")).toBe("upper-a");
  });
  it("calculates balanced plates and exposes unavailable target loads", () => {
    expect(plateLoad(100, 20, [20, 10, 5, 2.5]).pairs).toEqual([
      { plate: 20, count: 2 },
    ]);
    expect(plateLoad(63, 20, [20, 10, 5, 2.5])).toMatchObject({
      achievable: 60,
      exact: false,
    });
    expect(plateLoad(10, 20, [5])).toMatchObject({
      achievable: 20,
      exact: false,
    });
    expect(plateLoad(8, 0, [3, 2])).toMatchObject({
      pairs: [{ plate: 2, count: 2 }],
      achievable: 8,
      exact: true,
    });
    expect(warmups(60, 20)).toEqual([
      { weight: 30, reps: 8 },
      { weight: 45, reps: 4 },
    ]);
  });
});
describe("durable data", () => {
  it("roundtrips complete sessions, notes, measurements and active work", () => {
    const store = initialStore("tr");
    store.sessions = [fixture()];
    store.active = createSession("lower-a", store, false);
    expect(parseBackup(JSON.stringify(store))).toEqual(store);
  });
  it("rejects unknown versions, missing fields, impossible sets and corrupt dates", () => {
    const store = initialStore();
    expect(() => parseBackup("{broken")).toThrow();
    expect(() =>
      parseBackup(JSON.stringify({ ...store, version: 99 })),
    ).toThrow();
    const s = fixture();
    s.exercises[0].sets[0].weight = null;
    expect(storeSchema.safeParse({ ...store, sessions: [s] }).success).toBe(
      false,
    );
    s.exercises[0].sets[0].weight = 30;
    s.date = "2026-02-31";
    expect(storeSchema.safeParse({ ...store, sessions: [s] }).success).toBe(
      false,
    );
  });
  it("rejects unknown exercise IDs and variants before import", () => {
    const store = initialStore();
    const s = fixture();
    s.exercises[0].id = "unknown";
    store.sessions = [s];
    expect(() => parseBackup(JSON.stringify(store))).toThrow();
    store.sessions = [];
    store.settings.variants = { dips: "unknown" };
    expect(() => parseBackup(JSON.stringify(store))).toThrow();
  });
  it("preserves legacy checkmarks without inventing sessions and blocks corrupt storage overwrite", () => {
    const values: Record<string, string> = {
      workoutLanguage: "tr",
      workoutCompletedV3: '{"upper-a":["dips"]}',
    };
    const storage = { getItem: (key: string) => values[key] ?? null };
    expect(loadStore(storage).store).toMatchObject({
      sessions: [],
      legacyCompleted: { "upper-a": ["dips"] },
      settings: { language: "tr" },
    });
    values[STORAGE_KEY] = "invalid";
    expect(loadStore(storage).error).toBe(true);
  });
});
