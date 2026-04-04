import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ButtonLink } from "@/components/ButtonLink";
import { cvPath, site } from "@/content/profile";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae — ${site.name}`,
  openGraph: {
    title: `CV · ${site.name}`,
    description: `Download or view the CV of ${site.name}.`,
  },
};

export default function CvPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Document
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-text-primary">
              Curriculum vitae
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={cvPath} download variant="primary">
              Download PDF
            </ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Back home
            </ButtonLink>
          </div>
        </div>
        <p className="mb-6 text-sm text-text-muted">
          If the preview does not load in your browser, use{" "}
          <Link
            href={cvPath}
            className="text-accent underline-offset-4 hover:underline"
          >
            direct PDF link
          </Link>
          .
        </p>
        <div className="overflow-hidden rounded-lg border border-border-subtle bg-bg-card shadow-2xl shadow-black/40">
          <iframe
            title="Alperen Us CV PDF"
            src={`${cvPath}#view=FitH`}
            className="aspect-[8.5/11] min-h-[75vh] w-full md:min-h-[85vh]"
          />
        </div>
      </main>
    </>
  );
}
