import {
  BookOpen,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { lessons, sources } from "../data/learning";
import { useI18n } from "../i18n/messages";
import { PageHeader } from "../components/ui";
export function Learn() {
  const { t, loc } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow={t("learn")}
        title={t("guideTitle")}
        subtitle={t("guideSubtitle")}
      />
      <section className="learning-intro">
        <BookOpen size={32} />
        <p>{t("guideNote")}</p>
        <span>01 — 09</span>
      </section>
      <div className="lesson-list">
        {lessons.map((lesson, i) => (
          <details className="lesson panel" key={lesson.id} open={i === 0}>
            <summary>
              <span className="lesson-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{loc(lesson.title)}</h2>
              <ChevronDown size={20} />
            </summary>
            <div className="lesson-content">
              <p className="lesson-summary">{loc(lesson.summary)}</p>
              <div className="lesson-practice">
                <span className="eyebrow">
                  <ArrowUpRight size={14} />
                  {t("inPractice")}
                </span>
                <p>{loc(lesson.practice)}</p>
              </div>
              <div className="lesson-sources">
                <h3>{t("references")}</h3>
                {lesson.sourceIds.map((id) => (
                  <a
                    key={id}
                    href={sources[id].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sources[id].title}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
