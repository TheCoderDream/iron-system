import { z } from "zod";

export const languageSchema = z.enum(["en", "es", "ru", "tr"]);
export type Language = z.infer<typeof languageSchema>;
export type Localized = Record<Language, string>;
export const daySchema = z.enum([
  "upper-a",
  "lower-a",
  "cardio-1",
  "upper-b",
  "lower-b",
  "cardio-2",
  "rest",
]);
export type DayId = z.infer<typeof daySchema>;
const finite = z.number().finite();
const weight = finite.min(0).max(2000);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(value + "T12:00:00Z");
    return (
      !Number.isNaN(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  });
const text = z.string().max(3000);
export const setSchema = z
  .object({
    id: z.string(),
    kind: z.enum(["warmup", "work"]),
    weight: weight.nullable(),
    reps: finite.int().min(1).max(200).nullable(),
    rir: finite.min(0).max(10).nullable(),
    done: z.boolean(),
    completedAt: finite.nonnegative().nullable(),
  })
  .refine(
    (set) => !set.done || (set.weight !== null && set.reps !== null),
    "Completed sets require weight and reps",
  );
export type SetLog = z.infer<typeof setSchema>;
export const prescriptionSchema = z
  .object({
    id: z.string().min(1),
    warmups: finite.int().min(0).max(6),
    workSets: finite.int().min(1).max(10),
    repMin: finite.int().min(1).max(100),
    repMax: finite.int().min(1).max(100),
    restSeconds: finite.int().min(30).max(600).optional(),
  })
  .refine((p) => p.repMax >= p.repMin);
export const planDaySchema = z
  .array(prescriptionSchema)
  .min(1)
  .max(20)
  .refine((p) => new Set(p.map((e) => e.id)).size === p.length);
export const videoUrlSchema = z
  .string()
  .max(1000)
  .url()
  .refine((value) => {
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  });
export const exerciseLogSchema = z
  .object({
    id: z.string(),
    variant: z.string(),
    restSeconds: finite.int().min(30).max(600).optional(),
    repMin: finite.int().positive(),
    repMax: finite.int().positive(),
    sets: z.array(setSchema).max(20),
    notes: text,
    startedAt: finite.nonnegative().nullable(),
  })
  .refine((exercise) => exercise.repMax >= exercise.repMin);
export type ExerciseLog = z.infer<typeof exerciseLogSchema>;
export const sessionSchema = z.object({
  id: z.string(),
  day: daySchema,
  date,
  startedAt: finite.nonnegative(),
  endedAt: finite.nonnegative().nullable(),
  bodyweight: weight.nullable(),
  energy: finite.int().min(1).max(5),
  soreness: finite.int().min(1).max(5),
  exercises: z.array(exerciseLogSchema).max(30),
  notes: text,
  cardioMinutes: finite.min(0).max(600),
  cardioMode: z.enum(["walk", "bike", "elliptical"]),
  short: z.boolean(),
});
export type Session = z.infer<typeof sessionSchema>;
export const measurementSchema = z.object({
  id: z.string(),
  date,
  weight: weight.nullable(),
  waist: finite.min(1).max(300).nullable(),
  arm: finite.min(1).max(150).nullable(),
  thigh: finite.min(1).max(200).nullable(),
});
export type Measurement = z.infer<typeof measurementSchema>;
export const settingsSchema = z.object({
  language: languageSchema,
  plan: z.record(daySchema, planDaySchema).default({}),
  videos: z.record(videoUrlSchema).default({}),
  restSeconds: z.union([z.literal(120), z.literal(150), z.literal(180)]),
  sound: z.boolean(),
  increments: z.record(finite.positive().max(100)),
  variants: z.record(z.string()),
  notes: z.record(text),
  shortOmissions: z
    .array(z.enum(["pec", "tricepsChoice", "curl", "rear", "lateral"]))
    .max(5),
  barWeight: weight,
  plates: z.array(finite.min(0.01).max(100).multipleOf(0.01)).min(1).max(20),
});
export type Settings = z.infer<typeof settingsSchema>;
export const storeSchema = z
  .object({
    version: z.literal(1),
    settings: settingsSchema,
    sessions: z.array(sessionSchema).max(10000),
    active: sessionSchema.nullable(),
    measurements: z.array(measurementSchema).max(10000),
    schedule: z.record(daySchema, date),
    nextDay: daySchema,
    restDeadline: finite.nonnegative().nullable(),
    legacyCompleted: z.record(z.array(z.string())).optional(),
  })
  .superRefine((store, ctx) => {
    if (
      store.sessions.some((s) => s.endedAt === null || s.endedAt < s.startedAt)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid finished session",
      });
    }
    if (store.active?.endedAt !== null && store.active !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Active session must be unfinished",
      });
    }
    if (
      new Set(store.sessions.map((s) => s.id)).size !== store.sessions.length
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Duplicate session IDs",
      });
    }
  });
export type Store = z.infer<typeof storeSchema>;

export function localDate(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function initialStore(language: Language = "en"): Store {
  return {
    version: 1,
    settings: {
      language,
      plan: {},
      videos: {},
      restSeconds: 150,
      sound: false,
      increments: {},
      variants: {},
      notes: {},
      shortOmissions: ["pec"],
      barWeight: 20,
      plates: [25, 20, 10, 5, 2.5, 1.25],
    },
    sessions: [],
    active: null,
    measurements: [],
    schedule: {},
    nextDay: "upper-a",
    restDeadline: null,
  };
}
