import { CareerTimeline } from "@/components/CareerTimeline";
import { Nav } from "@/components/Nav";
import { Section } from "@/components/Section";
import { SiteFooter } from "@/components/SiteFooter";
import { ButtonLink } from "@/components/ButtonLink";
import {
  aboutParagraphs,
  careerJourney,
  contact,
  cvPath,
  education,
  featuredProjects,
  focusAreas,
  site,
  technicalSkills,
} from "@/content/profile";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Software engineer · Istanbul
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl md:text-6xl md:leading-[1.08]">
              {site.name.split(" ")[0]}
              <span className="text-text-muted"> </span>
              <span className="bg-gradient-to-r from-text-primary via-accent to-text-primary/90 bg-clip-text text-transparent">
                {site.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
              JVM backends, event-driven architecture, and production NLP
              platforms—built with the discipline of enterprise engineering and
              the sharpness of a product-minded builder.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={cvPath} download variant="primary">
                Download CV
              </ButtonLink>
              <ButtonLink href="#career" variant="secondary">
                Career journey
              </ButtonLink>
              <ButtonLink href={`mailto:${contact.email}`} variant="ghost">
                Email me
              </ButtonLink>
            </div>
            <dl className="mt-16 grid gap-6 border-t border-border-subtle pt-10 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  Focus
                </dt>
                <dd className="mt-2 text-sm text-text-primary">
                  Backend, data, NLP
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  Core stack
                </dt>
                <dd className="mt-2 text-sm text-text-primary">
                  Java, Spring, Kafka, Python
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  Education
                </dt>
                <dd className="mt-2 text-sm text-text-primary">
                  Koç University · dual B.S.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <Section
          id="about"
          eyebrow="Profile"
          title="About me"
          subtitle="Dual training in computer science and molecular biology shapes how I approach complex systems."
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="space-y-6 text-lg leading-relaxed text-text-muted">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <aside className="rounded-lg border border-border-subtle bg-bg-card/80 p-6 backdrop-blur-sm">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
                Focus areas
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded border border-border-subtle bg-bg-elevated px-3 py-1.5 text-sm text-text-primary"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 font-mono text-xs uppercase tracking-wider text-accent">
                Education
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-text-muted">
                {education.map((e) => (
                  <li key={e.school}>
                    <p className="font-medium text-text-primary">{e.school}</p>
                    <p className="text-xs text-text-muted">{e.period}</p>
                    <p className="mt-1">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <Section
          id="career"
          eyebrow="Timeline"
          title="Career journey"
          subtitle="From structural biology research to shipping NLP and microservices in production."
        >
          <CareerTimeline entries={careerJourney} />
        </Section>

        <Section
          id="projects"
          eyebrow="Selected work"
          title="Projects & internships"
          subtitle="Hands-on builds across full stack, data engineering, and ML—details on the CV."
        >
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((proj) => (
              <li
                key={proj.name}
                className="flex flex-col rounded-lg border border-border-subtle bg-bg-card/60 p-6 transition-colors hover:border-accent/25"
              >
                <p className="font-mono text-xs text-accent">{proj.context}</p>
                <h3 className="mt-2 text-lg font-semibold text-text-primary">
                  {proj.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {proj.summary}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-14 rounded-lg border border-border-subtle bg-bg-elevated/80 p-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              Technical skills
            </h3>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-text-muted">
                  Programming
                </dt>
                <dd className="mt-1 text-sm text-text-primary">
                  {technicalSkills.programming}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-text-muted">
                  Frameworks
                </dt>
                <dd className="mt-1 text-sm text-text-primary">
                  {technicalSkills.frameworks}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-text-muted">
                  Data & infra
                </dt>
                <dd className="mt-1 text-sm text-text-primary">
                  {technicalSkills.dataInfra}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-text-muted">
                  Data science
                </dt>
                <dd className="mt-1 text-sm text-text-primary">
                  {technicalSkills.dataScience}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-text-muted">
                  Tools & DevOps
                </dt>
                <dd className="mt-1 text-sm text-text-primary">
                  {technicalSkills.tools}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-text-muted">Other</dt>
                <dd className="mt-1 text-sm text-text-primary">
                  {technicalSkills.other}
                </dd>
              </div>
            </dl>
          </div>
        </Section>

        <section className="border-y border-border-subtle bg-bg-card/30 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
              Full resume
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted">
              Download the PDF for complete project descriptions, activities, and
              formatting you can share with hiring teams.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href={cvPath} download variant="primary">
                Download PDF
              </ButtonLink>
              <ButtonLink href="/cv" variant="secondary">
                View in browser
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
