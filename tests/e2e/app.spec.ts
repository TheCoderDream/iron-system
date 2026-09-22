import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test("fresh workout logs, validates, resumes, finishes, and appears in history", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Start workout", exact: true })
    .click();
  const first = page.locator(".exercise-card").first();
  await first
    .getByRole("button", {
      name: "Complete set 3 Weighted Pull-Ups",
      exact: true,
    })
    .click();
  await expect(first.getByRole("alert")).toContainText("Enter a weight");
  await first
    .getByRole("spinbutton", {
      name: "Weighted Pull-Ups 3 Weight",
      exact: true,
    })
    .fill("20");
  await first
    .getByRole("spinbutton", { name: "Weighted Pull-Ups 3 Reps", exact: true })
    .fill("5");
  await first
    .getByRole("button", {
      name: "Complete set 3 Weighted Pull-Ups",
      exact: true,
    })
    .click();
  await expect(page.getByRole("timer")).toContainText("02:");
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Undo set 3 Weighted Pull-Ups",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Finish workout", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Save", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Session saved");
  await page.getByRole("link", { name: "History", exact: true }).click();
  await page.locator(".history-card summary").click();
  await expect(page.locator(".history-detail")).toContainText("20 kg × 5");
  await expect(
    page.locator(".history-detail .uncompleted").first(),
  ).toBeVisible();
  await page.getByRole("link", { name: "Progress", exact: true }).click();
  await expect(page.locator(".record-card").first()).toContainText("+20");
});
test("short Upper B, variant choice and scheduling preserve intent", async ({
  page,
}) => {
  await page.getByRole("button", { name: /Thursday Upper B/ }).click();
  await page
    .getByRole("button", { name: "Short session", exact: true })
    .click();
  await expect(page.locator(".stats-strip")).toContainText("16");
  await expect(
    page
      .locator(".plan-list")
      .getByRole("heading", { name: "Pec Deck Fly", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Start workout", exact: true })
    .click();
  const incline = page.locator(".exercise-card").filter({
    has: page.getByRole("heading", {
      name: "65–75° Incline Shoulder Press — Dumbbell or Smith Machine",
    }),
  });
  await incline.locator("summary").click();
  await incline
    .getByRole("combobox", { name: /Equipment \/ variant/ })
    .selectOption("smith");
  await page.reload();
  await incline.locator("summary").click();
  await expect(
    incline.getByRole("combobox", { name: /Equipment \/ variant/ }),
  ).toHaveValue("smith");
  await page.getByRole("link", { name: "Schedule", exact: true }).click();
  await page.getByLabel("Upper A Date", { exact: true }).fill("2026-10-12");
  await expect(page.getByLabel("Lower A Date", { exact: true })).toHaveValue(
    "2026-10-13",
  );
  await expect(page.getByLabel("Upper B Date", { exact: true })).toHaveValue(
    "2026-10-14",
  );
});
test("measurements, language, calculator and backup validation", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Progress", exact: true }).click();
  await page
    .getByRole("button", { name: "Add measurement", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByLabel("Bodyweight (kg)", { exact: true })
    .fill("82.5");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Save", exact: true })
    .click();
  await expect(page.locator(".measurement-list")).toContainText("82.5");
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page.getByLabel("Next target (kg)", { exact: true }).fill("100");
  await expect(page.locator(".calculator-grid")).toContainText("100 kg");
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export backup", exact: true })
    .click();
  const downloaded = await downloadPromise;
  const path = await downloaded.path();
  await page.locator("input[type=file]").setInputFiles({
    name: "broken.json",
    mimeType: "application/json",
    buffer: Buffer.from("{}"),
  });
  await expect(page.getByRole("status")).toContainText("not a valid");
  await page.locator("input[type=file]").setInputFiles(path!);
  await expect(page.getByRole("dialog")).toContainText(
    "Replace with this backup",
  );
  await page
    .getByRole("button", { name: "Replace with this backup", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("tr");
  await expect(
    page.getByRole("heading", { name: "Kendine göre ayarla." }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
});
test("mobile screens fit without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const view of ["Train", "Progress", "History", "Schedule", "Settings"]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: view, exact: true })
      .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Train", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Start workout", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
});
test("production app reloads offline after installation", async ({
  page,
  context,
}) => {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Upper A — Strength", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Start workout", exact: true })
    .click();
  await expect(page.locator(".exercise-card")).toHaveCount(6);
});

test("invalid numeric input cannot corrupt a saved session, and keyboard skip preserves the page", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Start workout", exact: true })
    .click();
  const first = page.locator(".exercise-card").first();
  await first
    .getByRole("spinbutton", {
      name: "Weighted Pull-Ups 3 Weight",
      exact: true,
    })
    .fill("-20");
  await page.reload();
  await expect(page.locator(".exercise-card")).toHaveCount(6);
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Settings", exact: true })
    .click();
  const skip = page.getByRole("link", { name: "Skip to content", exact: true });
  await skip.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Make it yours.", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main")).toBeFocused();
});

test("corrupt storage is preserved and a warning is shown", async ({
  page,
}) => {
  await page.evaluate(() =>
    localStorage.setItem("iron-system:v7", "unreadable-original-data"),
  );
  await page.reload();
  await expect(page.getByRole("alert")).toContainText("Saving is unavailable");
  expect(
    await page.evaluate(() => localStorage.getItem("iron-system:v7")),
  ).toBe("unreadable-original-data");
});

test("all four languages fit a small phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const language of ["en", "es", "ru", "tr"]) {
    await page.goto("/#settings");
    await page.locator(".settings-grid select").first().selectOption(language);
    for (const view of [
      "train",
      "progress",
      "history",
      "schedule",
      "settings",
    ]) {
      await page.locator(`nav a[href="#${view}"]`).click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${language} ${view}`,
      ).toBeTruthy();
    }
  }
});

test("exercise details expose technique, anatomy and history-based suggestions", async ({
  page,
}) => {
  await page
    .getByRole("button", {
      name: "Weighted Pull-Ups — Technique & details",
      exact: true,
    })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "Set up", exact: true }),
  ).toBeVisible();
  await expect(
    dialog.getByText("Start with an easy assisted/bodyweight set", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    dialog.locator("path[data-region=lats]").first(),
  ).toHaveAttribute("fill", "#c8ff3d");
  await expect(
    dialog.locator("path[data-region=biceps]").first(),
  ).toHaveAttribute("fill", "#547b9d");
  await expect(dialog.locator(".progression-advice")).toContainText(
    "Choose a starting load",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  const anatomy = page.locator(".anatomy-panel");
  await anatomy
    .getByRole("button", { name: "Full program", exact: true })
    .click();
  await anatomy
    .locator(".muscle-ranking")
    .getByRole("button", { name: /Quads/ })
    .click();
  await expect(anatomy.locator(".muscle-focus")).toContainText(
    "12 Direct work sets",
  );
  await anatomy
    .getByRole("button", { name: "Logged this week", exact: true })
    .click();
  await expect(anatomy.locator(".muscle-focus")).toContainText(
    "0 Direct work sets",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Guide", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Understand the work.", exact: true }),
  ).toBeVisible();
  await page
    .locator(".lesson")
    .filter({
      has: page.getByRole("heading", {
        name: "Failure, effort and hypertrophy",
        exact: true,
      }),
    })
    .locator("summary")
    .click();
  await expect(
    page.getByText("0 RIR means no additional clean repetition", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.locator(".lesson-list .lesson")).toHaveCount(9);
});

test("exercise details and guide fit on a phone in every language", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const language of ["en", "es", "ru", "tr"]) {
    await page.goto("/#settings");
    await page.locator(".settings-grid select").first().selectOption(language);
    await page.locator('nav a[href="#train"]').click();
    await page.locator(".plan-exercise").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBeTruthy();
    await page.keyboard.press("Escape");
    await page.locator('nav a[href="#learn"]').click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});

test("completed rep ceilings produce an actionable next-session load", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Start workout", exact: true })
    .click();
  const first = page.locator(".exercise-card").first();
  for (const n of [3, 4]) {
    await first
      .getByRole("spinbutton", {
        name: `Weighted Pull-Ups ${n} Weight`,
        exact: true,
      })
      .fill("20");
    await first
      .getByRole("spinbutton", {
        name: `Weighted Pull-Ups ${n} Reps`,
        exact: true,
      })
      .fill("5");
    await first
      .getByRole("button", {
        name: `Complete set ${n} Weighted Pull-Ups`,
        exact: true,
      })
      .click();
  }
  await page
    .getByRole("button", { name: "Finish workout", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Save", exact: true })
    .click();
  await page.getByRole("button", { name: /Monday Upper A/ }).click();
  await expect(page.locator(".plan-exercise").first()).toContainText("22.5 kg");
  await page.locator(".plan-exercise").first().click();
  await expect(
    page.getByRole("dialog").locator(".progression-advice"),
  ).toContainText("All prescribed working sets reached the rep ceiling");
  await page
    .getByRole("dialog")
    .getByLabel("Load increment (kg)", { exact: true })
    .fill("1.25");
  await expect(
    page.getByRole("dialog").locator(".suggested-load"),
  ).toContainText("21.25 kg");
});

test("plan editor saves targets, order and rest without mutating an active workout", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Start workout", exact: true })
    .click();
  await page.getByRole("link", { name: "Plan", exact: true }).click();
  const first = page.locator(".editor-exercise").first();
  await first.getByLabel("Exercise", { exact: true }).selectOption("squat");
  await first.getByLabel("Working sets", { exact: true }).fill("3");
  await first.getByLabel("Rest (seconds)").fill("210");
  await first.getByLabel("Minimum reps").fill("6");
  await first.getByLabel("Maximum reps").fill("10");
  await page.getByRole("button", { name: "Save plan", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Plan saved");
  await page.reload();
  await expect(
    page
      .locator(".editor-exercise")
      .first()
      .getByLabel("Exercise", { exact: true }),
  ).toHaveValue("squat");
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("iron-system:v7")!),
  );
  expect(stored.active.exercises[0].id).toBe("pullup");
  expect(stored.settings.plan["upper-a"][0]).toMatchObject({
    id: "squat",
    workSets: 3,
    restSeconds: 210,
  });
  await page.getByRole("button", { name: "Add exercise", exact: true }).click();
  await page
    .locator(".editor-exercise")
    .last()
    .getByRole("button", { name: "Move up", exact: true })
    .click();
  await page.getByRole("button", { name: "Save plan", exact: true }).click();
  await page.getByRole("link", { name: "Train", exact: true }).first().click();
  await expect(page.locator(".exercise-card").first()).toContainText(
    "Weighted Pull-Ups",
  );
});

test("video player loads on demand and custom URLs persist safely", async ({
  page,
}) => {
  await page.locator(".plan-exercise").first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("iframe")).toHaveCount(0);
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<p>Video provider fixture</p>",
    }),
  );
  await dialog
    .getByRole("button", { name: "Play tutorial", exact: true })
    .click();
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie.com\/embed\/PHdHnZcbsB8/,
  );
  await dialog.locator(".exercise-video summary").click();
  await dialog
    .getByLabel("Your tutorial URL (HTTPS)", { exact: true })
    .fill("javascript:alert(1)");
  await dialog.getByRole("button", { name: "Save video", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText("valid HTTPS");
  await dialog
    .getByLabel("Your tutorial URL (HTTPS)", { exact: true })
    .fill("https://youtu.be/43GSKivZnw4");
  await dialog.getByRole("button", { name: "Save video", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText("Video saved");
  await page.reload();
  await page.locator(".plan-exercise").first().click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("link", { name: "Open video source", exact: true }),
  ).toHaveAttribute("href", "https://youtu.be/43GSKivZnw4");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "/private/tmp/iron-video-mobile.png" });
});

test("saved plan drives the next workout and the editor fits a small phone", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Plan", exact: true }).first().click();
  const first = page.locator(".editor-exercise").first();
  await first.getByLabel("Exercise", { exact: true }).selectOption("squat");
  await first.getByLabel("Working sets", { exact: true }).fill("3");
  await first.getByLabel("Minimum reps").fill("8");
  await first.getByLabel("Maximum reps").fill("6");
  await page.getByRole("button", { name: "Save plan", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Check rep ranges");
  await first.getByLabel("Maximum reps").fill("12");
  await page.getByRole("button", { name: "Save plan", exact: true }).click();
  await page.screenshot({
    path: "/private/tmp/iron-plan-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 320, height: 740 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "/private/tmp/iron-plan-mobile.png",
    fullPage: true,
  });
  await page.getByRole("link", { name: "Train", exact: true }).first().click();
  await expect(page.locator(".plan-exercise").first()).toContainText(
    "3 × 8–12",
  );
  await page
    .getByRole("button", { name: "Start workout", exact: true })
    .click();
  const session = await page.evaluate(
    () => JSON.parse(localStorage.getItem("iron-system:v7")!).active,
  );
  expect(session.exercises[0].id).toBe("squat");
  expect(
    session.exercises[0].sets.filter(
      (s: { kind: string }) => s.kind === "work",
    ),
  ).toHaveLength(3);
});
