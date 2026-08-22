"use client";

/**
 * Single-select tag filter row for /case-study. Visual spec is copied
 * from TagChip's locked shape (`rounded-full border border-border px-3.5
 * py-1.5 text-xs font-medium`) rather than reusing TagChip itself — TagChip
 * is explicitly non-interactive (no onClick, no selected state, see
 * TagChip.tsx), so this is new interactive behavior layered on the same
 * existing look, not a new visual language. Selected state uses `bg-fg
 * text-bg` — the same "this is the active/primary one" treatment as
 * `<Button variant="secondary">` — and the resting hover is the sitewide
 * `hover:bg-bg-alt` group (see Button.tsx's third variant for that group's
 * other members), not an invented third hover color.
 */
export default function FilterPills({
  tags,
  selected,
  onSelect,
}: {
  tags: string[];
  selected: string | null;
  onSelect: (tag: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
          selected === null ? "border-fg bg-fg text-bg" : "border-border text-fg hover:bg-bg-alt"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(tag)}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
            selected === tag ? "border-fg bg-fg text-bg" : "border-border text-fg hover:bg-bg-alt"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
