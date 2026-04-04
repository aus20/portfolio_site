import type { CareerEntry } from "@/content/profile";

export function CareerTimeline({ entries }: { entries: CareerEntry[] }) {
  return (
    <div className="border-l border-border-subtle pl-8 md:pl-12">
      <ol className="space-y-12 md:space-y-14">
        {entries.map((entry) => (
          <li key={`${entry.org}-${entry.period}`} className="relative">
            <span
              className="absolute top-1.5 -left-[calc(2rem-4px)] size-3 rounded-full border-2 border-bg-deep bg-accent md:-left-[calc(3rem-6px)] md:size-3.5"
              aria-hidden
            />
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {entry.role}
                </h3>
                <p className="text-accent">{entry.org}</p>
                {entry.location ? (
                  <p className="text-sm text-text-muted">{entry.location}</p>
                ) : null}
              </div>
              <p className="shrink-0 font-mono text-xs uppercase tracking-wider text-text-muted">
                {entry.period}
              </p>
            </div>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">
              {entry.summary}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text-muted">
              {entry.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
