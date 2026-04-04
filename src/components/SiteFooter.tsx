import { contact, site } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-border-subtle bg-bg-elevated/50 py-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Contact
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
            Let&apos;s connect
          </h2>
          <p className="mt-3 max-w-md text-text-muted">
            Open to conversations about backend engineering, data platforms, and
            NLP-heavy products.
          </p>
        </div>
        <ul className="flex flex-col gap-3 font-mono text-sm">
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="text-text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {contact.email}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${contact.emailAlt}`}
              className="text-text-muted underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {contact.emailAlt}
            </a>
          </li>
          <li className="text-text-muted">{contact.phone}</li>
          <li>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto mt-14 max-w-6xl border-t border-border-subtle px-6 pt-8">
        <p className="text-center text-xs text-text-muted">
          © {year} {site.name} · {site.domain.replace("https://", "")}
        </p>
      </div>
    </footer>
  );
}
