import { describe, it, expect } from "vitest";
import { initialStore, planDaySchema } from "../src/domain/schema";
import { createSession } from "../src/domain/training";
import { parseBackup } from "../src/state/persistence";
import { plannedExposure } from "../src/data/anatomy";
import { exercises, exerciseIds } from "../src/data/program";
import { defaultVideo, youtubeEmbed } from "../src/data/videos";

describe("editable plans and videos", () => {
  it("snapshots sets, rep targets and rest; changes apply only to new workouts", () => {
    const store = initialStore();
    store.active = createSession("upper-a", store, false);
    const original = structuredClone(store.active);
    store.settings.plan["upper-a"] = [
      {
        id: "squat",
        workSets: 3,
        warmups: 1,
        repMin: 6,
        repMax: 10,
        restSeconds: 210,
      },
    ];
    const next = createSession("upper-a", store, false);
    expect(next.exercises[0]).toMatchObject({
      id: "squat",
      repMin: 6,
      repMax: 10,
      restSeconds: 210,
    });
    expect(next.exercises[0].sets).toHaveLength(4);
    expect(store.active).toEqual(original);
    store.active = next;
    expect(parseBackup(JSON.stringify(store)).active).toEqual(next);
    expect(plannedExposure(store.settings, "upper-a").quads.direct).toBe(3);
  });
  it("keeps historical exercises importable after removal from the current plan", () => {
    const store = initialStore();
    const session = createSession("upper-a", store, false, 1000);
    session.endedAt = 2000;
    store.sessions = [session];
    store.settings.plan["upper-a"] = [
      { id: "squat", workSets: 2, warmups: 0, repMin: 8, repMax: 12 },
    ];
    expect(parseBackup(JSON.stringify(store)).sessions[0].exercises[0].id).toBe(
      "pullup",
    );
    delete (store.settings as Partial<typeof store.settings>).plan;
    delete (store.settings as Partial<typeof store.settings>).videos;
    expect(parseBackup(JSON.stringify(store)).settings.plan).toEqual({});
  });
  it("rejects duplicate, unknown, empty and invalid prescriptions", () => {
    const p = { id: "squat", workSets: 2, warmups: 0, repMin: 8, repMax: 12 };
    expect(planDaySchema.safeParse([p, p]).success).toBe(false);
    expect(planDaySchema.safeParse([]).success).toBe(false);
    expect(planDaySchema.safeParse([{ ...p, repMax: 5 }]).success).toBe(false);
    const store = initialStore();
    store.settings.plan["upper-a"] = [{ ...p, id: "made-up" }];
    expect(() => parseBackup(JSON.stringify(store))).toThrow();
  });
  it("only embeds validated YouTube identifiers and rejects unsafe saved URLs", () => {
    expect(youtubeEmbed("https://youtu.be/PHdHnZcbsB8?t=3")).toBe(
      "https://www.youtube-nocookie.com/embed/PHdHnZcbsB8",
    );
    expect(
      youtubeEmbed("https://youtube.com.evil.test/watch?v=PHdHnZcbsB8"),
    ).toBeNull();
    const store = initialStore();
    store.settings.videos["pullup:standard"] = "javascript:alert(1)";
    expect(() => parseBackup(JSON.stringify(store))).toThrow();
  });
  it("provides a video for every exercise variant", () => {
    Object.entries(exercises)
      .filter(([id]) => exerciseIds.includes(id))
      .forEach(([id, e]) =>
        e.variants.forEach((v) =>
          expect(youtubeEmbed(defaultVideo(id, v)!)).toBeTruthy(),
        ),
      );
  });
});

import { searchExercises } from "../src/domain/exerciseSearch";
import { coaching } from "../src/data/coaching";
import { exerciseBenefit } from "../src/data/exerciseBenefits";
import { involvement, regions } from "../src/data/anatomy";

describe("expanded exercise library",()=>{
 it("has complete localized guidance, benefits and valid anatomy for every selectable movement",()=>{
  expect(exerciseIds.length).toBe(85);
  expect(new Set(exerciseIds).size).toBe(exerciseIds.length);
  for(const id of exerciseIds){
   for(const v of exercises[id].variants){
    const guide=coaching[id==='tricepsChoice'?v:id];
    for(const l of ['en','es','ru','tr'] as const){
     expect(exercises[id].name[l]).toBeTruthy();expect(guide.movement[l].length).toBeGreaterThan(20);expect(exerciseBenefit(id,v)[l].length).toBeGreaterThan(20);
    }
    const muscles=involvement(id,v);expect(muscles.primary.length).toBeGreaterThan(0);
    [...muscles.primary,...muscles.secondary].forEach(m=>expect(regions).toContain(m));
   }
  }
 });
 it("searches across languages, Turkish accents, and muscle filters",()=>{
  expect(searchExercises('gogus','chest')).toContain('chestPress');
  expect(searchExercises('RDL')).toContain('rdl');
  expect(searchExercises('жим','chest')).toContain('benchPress');
  expect(searchExercises('','calves')).toContain('standingCalf');
  expect(searchExercises('bench','calves')).toEqual([]);
 });
 it("persists new exercises and includes calf and adductor work in anatomy",()=>{
  const store=initialStore();store.settings.plan['upper-a']=['standingCalf','hipAdduction','rdl'].map(id=>({id,warmups:0,workSets:3,repMin:8,repMax:12}));
  store.active=createSession('upper-a',store,false);
  expect(parseBackup(JSON.stringify(store)).active?.exercises.map(e=>e.id)).toEqual(['standingCalf','hipAdduction','rdl']);
  const map=plannedExposure(store.settings,'upper-a');expect(map.calves.direct).toBe(3);expect(map.adductors.direct).toBe(3);expect(map.hamstrings.direct).toBe(3);
 });
});
