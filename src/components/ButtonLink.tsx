import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg-deep hover:bg-teal-300 focus-visible:outline-accent",
  secondary:
    "border border-border-subtle bg-bg-card text-text-primary hover:border-accent/40 hover:bg-bg-elevated",
  ghost: "text-text-muted hover:text-text-primary underline-offset-4 hover:underline",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
};

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  download,
  className = "",
}: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();
  const useAnchor = external || download || isExternalHref(href);

  if (useAnchor) {
    return (
      <a
        href={href}
        className={cls}
        {...(external || (isExternalHref(href) && href.startsWith("http"))
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
