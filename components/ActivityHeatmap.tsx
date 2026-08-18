"use client";

import { useMemo, useState } from "react";

type Source = "github" | "claude";

const YEARS = [2025, 2026] as const;
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

/** Level→color per source: GitHub uses GitHub's own green palette, Claude Code
 *  uses a palette in the site's coral/red accent instead, so the two are easy
 *  to tell apart at a glance while sharing the exact same grid/behavior. */
const LEVEL_COLORS: Record<Source, string[]> = {
  github: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  claude: ["#ebedf0", "#ffe0d6", "#ffb199", "#ff8a66", "#ff6553"],
};

/** Demo data window — placeholder activity only appears in this range, until the
 *  real GitHub / Claude Code APIs are wired up. */
const ACTIVITY_START = Date.UTC(2025, 8, 1);
const DEMO_TODAY = Date.UTC(2026, 6, 29);

/** Deterministic string hash so demo levels are stable across server/client renders
 *  (using Math.random() here would cause a hydration mismatch). */
function seededRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(h, 31) + seed.charCodeAt(i)) | 0;
  }
  h ^= h << 13;
  h ^= h >>> 17;
  h ^= h << 5;
  return ((h >>> 0) % 1000) / 1000;
}

/** Real contribution levels pulled from github.com/coldpizzayum's public calendar, plus a
 *  handful of hand-picked dates approximating the private-repo activity visible in the
 *  account owner's own (logged-in) contribution graph screenshot, which the public API
 *  can't see. Keyed by "YYYY-MM-DD". */
const GITHUB_ACTIVITY: Record<string, number> = {
  "2025-09-10": 1,
  "2025-11-03": 1,
  "2025-11-16": 4,
  "2025-12-01": 4,
  "2025-12-08": 1,
  "2025-12-10": 2,
  "2026-01-07": 1,
  "2026-01-19": 1,
  "2026-02-02": 2,
  "2026-02-04": 1,
  "2026-02-05": 4,
  "2026-03-13": 4,
  "2026-03-16": 1,
  "2026-03-17": 1,
  "2026-03-18": 2,
  "2026-03-19": 2,
  "2026-03-20": 4,
  "2026-03-21": 2,
  "2026-04-22": 1,
  "2026-04-23": 1,
  "2026-05-03": 1,
  "2026-05-07": 2,
  "2026-05-13": 3,
  "2026-05-15": 2,
  "2026-05-18": 2,
  "2026-05-19": 4,
  "2026-05-21": 2,
  "2026-06-01": 1,
  "2026-06-19": 2,
  "2026-06-20": 4,
  "2026-06-28": 1,
  "2026-06-29": 4,
  "2026-07-01": 1,
  "2026-07-02": 2,
  "2026-07-05": 2,
  "2026-07-06": 2,
  "2026-07-14": 4,
  "2026-07-18": 4,
  "2026-07-21": 3,
  "2026-07-22": 3,
  "2026-07-27": 1,
  "2026-07-28": 2,
  "2026-07-29": 1,
  "2026-07-30": 1,
};

/** Activity level (0–4) for a given day. GitHub uses the real data above; Claude Code
 *  still uses seeded demo data since there's no real activity source for it yet. */
function demoLevel(date: Date, source: Source): number {
  const t = date.getTime();
  if (t < ACTIVITY_START || t > DEMO_TODAY) return 0;
  const dateKey = date.toISOString().slice(0, 10);

  if (source === "github") return GITHUB_ACTIVITY[dateKey] ?? 0;

  const r = seededRandom(`${source}-${dateKey}`);
  if (r < 0.32) return 0;
  if (r < 0.58) return 1;
  if (r < 0.8) return 2;
  if (r < 0.93) return 3;
  return 4;
}

interface DayCell {
  date: Date;
  inYear: boolean;
}

/** Builds a GitHub-style week grid for `year`: columns are weeks (Sun–Sat rows), padded
 *  with the leading/trailing days needed to complete the first and last week. */
function buildWeeks(year: number): DayCell[][] {
  const jan1 = new Date(Date.UTC(year, 0, 1));
  const start = new Date(jan1);
  start.setUTCDate(jan1.getUTCDate() - jan1.getUTCDay());

  const weeks: DayCell[][] = [];
  const cursor = new Date(start);

  while (true) {
    const week: DayCell[] = [];
    for (let d = 0; d < 7; d++) {
      week.push({ date: new Date(cursor), inYear: cursor.getUTCFullYear() === year });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
    if (cursor.getUTCFullYear() > year) break;
  }
  return weeks;
}

/** One month label per column, placed at the week containing that month's 1st. */
function monthLabelsForWeeks(weeks: DayCell[][]): (string | null)[] {
  return weeks.map((week) => {
    const firstOfMonth = week.find((day) => day.inYear && day.date.getUTCDate() === 1);
    return firstOfMonth ? MONTH_NAMES[firstOfMonth.date.getUTCMonth()] : null;
  });
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15v3.19c0 .31.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M10 1.5c.3 3.1 1 5.3 2.1 6.4 1.1 1.1 3.3 1.8 6.4 2.1-3.1.3-5.3 1-6.4 2.1-1.1 1.1-1.8 3.3-2.1 6.4-.3-3.1-1-5.3-2.1-6.4-1.1-1.1-3.3-1.8-6.4-2.1 3.1-.3 5.3-1 6.4-2.1 1.1-1.1 1.8-3.3 2.1-6.4Z" />
    </svg>
  );
}

export default function ActivityHeatmap() {
  const [source, setSource] = useState<Source>("github");
  const [year, setYear] = useState<(typeof YEARS)[number]>(2026);

  const weeks = useMemo(() => buildWeeks(year), [year]);
  const monthLabels = useMemo(() => monthLabelsForWeeks(weeks), [weeks]);
  const levelColors = LEVEL_COLORS[source];

  return (
    <div
      id="activity"
      className="rounded-2xl border border-border bg-white/60 p-card-compact shadow-[0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-[8px] md:p-card-compact-lg"
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 font-source-sans-pro">
        {/* shrink-0 + whitespace-nowrap: on narrow mobile widths this pill's
         *  natural width (icon + "Claude Code") plus the YEAR block on the
         *  same flex row can exceed the available width. Without shrink-0,
         *  the flex parent squeezes this pill below its content's natural
         *  width, wrapping "Claude Code" onto two lines inside the button
         *  instead of the intended result: the YEAR block wrapping down to
         *  its own line (already possible via the parent's flex-wrap). */}
        <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-white p-1">
          <button
            type="button"
            onClick={() => setSource("github")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors duration-200 ${
              source === "github" ? "bg-bg-alt text-fg" : "text-fg-secondary hover:text-fg"
            }`}
          >
            <GitHubIcon />
            GitHub
          </button>
          <button
            type="button"
            onClick={() => setSource("claude")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors duration-200 ${
              source === "claude" ? "bg-bg-alt text-fg" : "text-fg-secondary hover:text-fg"
            }`}
          >
            <SparkleIcon />
            Claude Code
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-sm text-fg-secondary">
          <label htmlFor="activity-year" className="tracking-[0.1em]">
            YEAR
          </label>
          <select
            id="activity-year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value) as (typeof YEARS)[number])}
            className="cursor-pointer rounded-lg border border-border bg-white py-2 px-3 font-source-sans-pro text-sm text-fg"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cell colors are seeded demo data (Sep 2025–today) — real GitHub / Claude Code
         activity isn't wired up yet, but the level→color mapping matches GitHub's own.
         Same grid at every viewport size; on narrow screens it just scrolls
         horizontally rather than reflowing into a different layout. */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max font-source-sans-pro text-xs text-fg-secondary">
          <div className="mr-2 flex shrink-0 flex-col">
            <div className="mb-2 h-[15px]" />
            <div className="flex flex-col gap-[3px]">
              {[0, 1, 2, 3, 4, 5, 6].map((row) => (
                <span key={row} className="h-[15px] w-9 leading-[15px]">
                  {DAY_LABELS[row] ?? ""}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex gap-[3px]">
              {monthLabels.map((label, i) => (
                <span key={i} className="h-[15px] w-[15px] shrink-0 leading-[15px] whitespace-nowrap">
                  {label ?? ""}
                </span>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => {
                    const level = day.inYear ? demoLevel(day.date, source) : 0;
                    return (
                      <div
                        key={dayIndex}
                        className="h-[15px] w-[15px] rounded-[3px]"
                        style={{ backgroundColor: day.inYear ? levelColors[level] : "transparent" }}
                        title={day.inYear ? day.date.toDateString() : undefined}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
