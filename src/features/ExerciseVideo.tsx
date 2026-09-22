import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { defaultVideo, youtubeEmbed } from "../data/videos";
import { videoUrlSchema } from "../domain/schema";
import { useStore } from "../state/StoreProvider";
import { useI18n } from "../i18n/messages";
export function ExerciseVideo({
  id,
  variant,
}: {
  id: string;
  variant: string;
}) {
  const { store, dispatch } = useStore();
  const { t } = useI18n();
  const key = `${id}:${variant}`;
  const saved = store.settings.videos[key];
  const url = saved ?? defaultVideo(id, variant);
  const [draft, setDraft] = useState(saved ?? "");
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState<"invalidVideo" | "videoSaved" | null>(
    null,
  );
  const embed = url ? youtubeEmbed(url) : null;
  const isSearch = !saved && !!url?.includes("/results?search_query=");
  function save() {
    const result = videoUrlSchema.safeParse(draft.trim());
    if (!result.success) {
      setStatus("invalidVideo");
      return;
    }
    dispatch({
      type: "settings",
      patch: { videos: { ...store.settings.videos, [key]: result.data } },
    });
    setPlaying(false);
    setStatus("videoSaved");
  }
  return (
    <section className="exercise-video">
      <h3>{t("videoTitle")}</h3>
      <p className="muted">{t("videoHelp")}</p>
      {playing && embed ? (
        <iframe
          className="video-player"
          src={embed}
          title={t("videoTitle")}
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="video-placeholder">
          {embed ? (
            <button
              type="button"
              className="primary"
              onClick={() => setPlaying(true)}
            >
              <Play size={18} />
              {t("playVideo")}
            </button>
          ) : (
            <p>{t(isSearch ? "videoSearchHelp" : "videoExternal")}</p>
          )}
          {url && (
            <a
              className="guide-link"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
              {t(isSearch ? "findVideo" : "openVideo")}
            </a>
          )}
        </div>
      )}
      {playing && url && (
        <a
          className="guide-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("openVideo")} ↗
        </a>
      )}
      <details>
        <summary>{t("customVideo")}</summary>
        <label className="field">
          <span>{t("customVideo")}</span>
          <input
            type="url"
            value={draft}
            placeholder="https://www.youtube.com/watch?v=…"
            onChange={(e) => {
              setDraft(e.target.value);
              setStatus(null);
            }}
          />
        </label>
        <div className="button-row">
          <button type="button" className="secondary" onClick={save}>
            {t("saveVideo")}
          </button>
          {saved && (
            <button
              type="button"
              className="secondary"
              onClick={() => {
                const videos = { ...store.settings.videos };
                delete videos[key];
                dispatch({ type: "settings", patch: { videos } });
                setDraft("");
                setPlaying(false);
                setStatus(null);
              }}
            >
              {t("resetVideo")}
            </button>
          )}
        </div>
        {status && <p role="status">{t(status)}</p>}
      </details>
    </section>
  );
}
