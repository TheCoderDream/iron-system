import { useId } from "react";
import type { Exposure, Region } from "../data/anatomy";
import { useI18n } from "../i18n/messages";

type Shape = { region: Region; path: string; mirror?: boolean };
const front: Shape[] = [
  {
    region: "frontDelts",
    path: "M68 80 Q51 80 47 104 L60 114 Q66 102 76 95 Z",
    mirror: true,
  },
  {
    region: "sideDelts",
    path: "M48 88 Q35 94 36 115 L44 124 L51 108 Z",
    mirror: true,
  },
  {
    region: "chest",
    path: "M97 83 Q83 76 70 86 L60 113 Q72 131 97 119 Z",
    mirror: true,
  },
  {
    region: "biceps",
    path: "M46 122 Q36 130 35 150 L42 168 Q54 152 54 130 Z",
    mirror: true,
  },
  {
    region: "triceps",
    path: "M34 122 L29 148 L30 165 L35 158 L33 143 L38 127 Z",
    mirror: true,
  },
  {
    region: "forearms",
    path: "M36 172 Q27 182 22 207 L24 224 L31 224 L42 182 Z",
    mirror: true,
  },
  {
    region: "abs",
    path: "M84 126 L97 124 L97 145 L84 145 Z M83 150 L97 150 L97 169 L84 168 Z M85 174 L97 174 L97 197 L90 204 L85 193 Z",
    mirror: true,
  },
  {
    region: "lats",
    path: "M63 119 L77 130 L78 163 L69 177 L66 149 Z",
    mirror: true,
  },
  {
    region: "adductors",
    path: "M94 223 L98 238 L93 278 L85 295 L80 274 Z",
    mirror: true,
  },
  {
    region: "quads",
    path: "M75 217 Q57 240 60 270 L67 304 L78 310 L86 290 L83 266 L92 222 Z",
    mirror: true,
  },
];
const back: Shape[] = [
  {
    region: "upperBack",
    path: "M89 69 L99 77 L99 126 L83 140 L65 111 L65 89 Z",
    mirror: true,
  },
  {
    region: "rearDelts",
    path: "M62 85 Q 40 84 39 110 L52 120 L68 105 Z",
    mirror: true,
  },
  {
    region: "sideDelts",
    path: "M38 99 L34 117 L 40 127 L47 119 Z",
    mirror: true,
  },
  {
    region: "lats",
    path: "M65 117 L82 143 L95 150 L91 181 L 70 169 L64 146 Z",
    mirror: true,
  },
  {
    region: "lowerBack",
    path: "M92 154 L98 150 L98 203 L84 210 L86 184 Z",
    mirror: true,
  },
  {
    region: "triceps",
    path: "M 40 124 L53 123 L52 145 L42 169 L34 157 Z",
    mirror: true,
  },
  {
    region: "forearms",
    path: "M35 174 L42 181 L30 224 L23 224 L22 209 Z",
    mirror: true,
  },
  {
    region: "glutes",
    path: "M 70 190 Q81 200 97 207 L97 237 Q 80 247 62 231 L60 216 Z",
    mirror: true,
  },
  {
    region: "hamstrings",
    path: "M63 242 Q 70 250 96 243 L87 281 L79 309 L67 305 L61 273 Z",
    mirror: true,
  },
  {
    region: "adductors",
    path: "M96 246 L98 268 L90 293 L87 294 Z",
    mirror: true,
  },
  {
    region: "calves",
    path: "M67 321 L78 320 L 80 341 L73 362 L66 381 L61 355 L60 337 Z",
    mirror: true,
  },
];
const outline =
  "M87 60 L86 73 Q75 78 63 79 Q 40 77 33 98 L25 145 L22 169 L12 209 L12 228 L7 246 Q10 259 19 253 L28 232 L35 207 L48 178 L58 139 L 60 165 L 60 193 Q53 213 55 241 L52 275 L 60 312 L54 345 L58 386 L49 403 Q48 412 61 413 L76 410 L79 387 L84 345 L84 319 L95 277 L100 248 L105 277 L116 319 L116 345 L121 387 L124 410 L139 413 Q152 412 151 403 L142 386 L146 345 L140 312 L148 275 L145 241 Q147 213 140 193 L140 165 L142 139 L152 178 L165 207 L172 232 L181 253 Q190 259 193 246 L188 228 L188 209 L178 169 L175 145 L167 98 Q160 77 137 79 Q125 78 114 73 L113 60";

export function AnatomyMap({
  values,
  mode = "program",
  selected,
  onSelect,
}: {
  values: Exposure;
  mode?: "exercise" | "program";
  selected?: Region;
  onSelect?: (region: Region) => void;
}) {
  const { t } = useI18n();
  const id = useId();
  const max = Math.max(1, ...Object.values(values).map((v) => v.direct));
  const fill = (region: Region) => {
    const { direct, secondary } = values[region];
    if (direct > 0) {
      if (mode === "exercise") return "#c8ff3d";
      const ratio = direct / max;
      return ratio > 0.75 ? "#c8ff3d" : ratio > 0.4 ? "#8bad3d" : "#536b2f";
    }
    return secondary > 0 ? "#547b9d" : "#262e35";
  };
  return (
    <svg
      className="anatomy-map"
      viewBox="0 0 440 460"
      role="group"
      aria-labelledby={`${id}-title`}
    >
      <title id={`${id}-title`}>{t("anatomyTitle")}</title>
      {[
        { shapes: front, x: 10, label: "frontView" as const },
        { shapes: back, x: 230, label: "backView" as const },
      ].map(({ shapes, x, label }) => (
        <g key={label} transform={`translate(${x},8)`}>
          <ellipse cx="100" cy="35" rx="19" ry="25" className="body-outline" />
          <path d={outline} className="body-outline" />
          <path
            d="M100 78 V210 M82 315 H76 M118 315 H124"
            className="body-divider"
          />
          {shapes.map((shape, i) => (
            <g key={`${shape.region}-${i}`}>
              {[false, ...(shape.mirror ? [true] : [])].map((mirror) => (
                <path
                  key={String(mirror)}
                  d={shape.path}
                  transform={
                    mirror ? "translate(200,0) scale(-1,1)" : undefined
                  }
                  fill={fill(shape.region)}
                  className={`muscle-region ${selected === shape.region ? "selected" : ""}`}
                  data-region={shape.region}
                  role={onSelect ? "button" : undefined}
                  tabIndex={onSelect ? (mirror ? -1 : 0) : undefined}
                  aria-label={`${t(shape.region)}: ${values[shape.region].direct} ${t("direct")}, ${values[shape.region].secondary} ${t("secondary")}`}
                  onClick={() => onSelect?.(shape.region)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect?.(shape.region);
                    }
                  }}
                >
                  <title>
                    {t(shape.region)} ·{" "}
                    {mode === "exercise"
                      ? t(
                          values[shape.region].direct
                            ? "primaryMuscles"
                            : values[shape.region].secondary
                              ? "secondaryMuscles"
                              : "notTargeted",
                        )
                      : `${values[shape.region].direct} ${t("direct")} / ${values[shape.region].secondary} ${t("secondary")}`}
                  </title>
                </path>
              ))}
            </g>
          ))}
          <text x="100" y="441" textAnchor="middle">
            {t(label)}
          </text>
        </g>
      ))}
    </svg>
  );
}
