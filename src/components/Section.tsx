import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title || subtitle) && (
          <header className="mb-12 md:mb-16 max-w-2xl">
            {eyebrow ? (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-4 text-lg leading-relaxed text-text-muted">
                {subtitle}
              </p>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
