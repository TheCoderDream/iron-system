import { useI18n } from "../i18n/messages";

export function Chart({
  points,
  label,
  unit,
}: {
  points: { date: string; value: number }[];
  label: string;
  unit: string;
}) {
  const { t, date } = useI18n();
  if (!points.length)
    return (
      <div className="chart-empty">
        <p>{t("noDataHelp")}</p>
      </div>
    );
  const recent = points.slice(-16);
  const max = Math.max(...recent.map((p) => p.value), 1);
  const min = Math.min(...recent.map((p) => p.value), 0);
  const x = (i: number) =>
    36 + (recent.length === 1 ? 240 : (i * 480) / (recent.length - 1));
  const y = (n: number) => 148 - ((n - min) / (max - min)) * 120;
  const line = recent.map((p, i) => `${x(i)},${y(p.value)}`).join(" ");
  return (
    <figure className="chart">
      <figcaption>
        {label}
        <strong>
          {recent.at(-1)?.value.toLocaleString()} <small>{unit}</small>
        </strong>
      </figcaption>
      <svg
        viewBox="0 0 552 184"
        role="img"
        aria-label={`${label}: ${recent.map((p) => `${date(p.date)} ${p.value} ${unit}`).join(", ")}`}
      >
        {[0, 0.5, 1].map((ratio) => (
          <g key={ratio}>
            <line
              x1="36"
              x2="516"
              y1={y(max * ratio)}
              y2={y(max * ratio)}
              className="chart-grid"
            />
            <text x="0" y={y(max * ratio) + 4}>
              {Math.round(max * ratio)}
            </text>
          </g>
        ))}
        <polygon
          points={`36,148 ${line} ${x(recent.length - 1)},148`}
          className="chart-area"
        />
        <polyline points={line} className="chart-line" />
        {recent.map((p, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={y(p.value)}
            r="4"
            className="chart-point"
          >
            <title>
              {date(p.date)}: {p.value} {unit}
            </title>
          </circle>
        ))}
        <text x="36" y="176">
          {date(recent[0].date)}
        </text>
        <text x="516" y="176" textAnchor="end">
          {date(recent.at(-1)!.date)}
        </text>
      </svg>
      <details className="chart-data">
        <summary>{t("overview")}</summary>
        <div className="data-list">
          {recent.map((p, i) => (
            <div key={i}>
              <span>{date(p.date)}</span>
              <strong>
                {p.value} {unit}
              </strong>
            </div>
          ))}
        </div>
      </details>
    </figure>
  );
}
