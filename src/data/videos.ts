import { extendedExercises } from "./extendedCatalog";
// Public tutorial URLs discovered from publisher/video pages, September 2026.
// These demonstrate movement patterns; the app's prescription governs loading and angles.
const defaults: Record<string, string> = {
  pullup: "PHdHnZcbsB8",
  dips: "4la6BkUBLgo",
  ohp: "43GSKivZnw4",
  inclineShoulder: "rO_iEImwHyo",
  "inclineShoulder:smith": "evtRb6cPF-Q",
  skull: "jq49gbqgFlw",
  squat: "rrJIyZGlK8c",
  bulgarian: "eXLyilSNQgM",
  ham: "SbSNUXPRkc8",
  extension: "4ZDm5EbiFI8",
  decline: "FRzQXeN1hro",
  pec: "eGjt4lk6g34",
  row: "vwHG9Jfu4sw",
  "row:supported": "TXjeZsqCVsg",
  lateral: "WJm9zA2NY8E",
  rear: "Z84HkxGCBqQ",
  "rear:dumbbell": "buuYPLVXsJg",
  curl: "QciWGMjD-nM",
  tricepsChoice: "jq49gbqgFlw",
  "tricepsChoice:benchDips": "lPXJMzFXFvc",
  backExtension: "osj4gCzJuVI",
  wristCurl: "lA3QwdAn19Y",
  legpress: "obqVU1u3Bfk",
};
export function defaultVideo(id: string, variant: string) {
  const video = defaults[`${id}:${variant}`] ?? defaults[id];
  return video ? `https://www.youtube.com/watch?v=${video}` : extendedExercises[id] ? `https://www.youtube.com/results?search_query=${encodeURIComponent(extendedExercises[id].name.en + " exercise technique tutorial")}` : undefined;
}
export function youtubeEmbed(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    let id: string | null = null;
    if (url.hostname === "youtu.be") id = url.pathname.slice(1);
    else if (
      [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "www.youtube-nocookie.com",
      ].includes(url.hostname)
    ) {
      if (url.pathname === "/watch") id = url.searchParams.get("v");
      else if (/^\/(shorts|embed)\//.test(url.pathname))
        id = url.pathname.split("/")[2];
    }
    return id && /^[\w-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null;
  } catch {
    return null;
  }
}
