import {
  aboutParagraphs,
  careerJourney,
  contact,
  education,
  featuredProjects,
  focusAreas,
  site,
  technicalSkills,
} from "@/content/profile";

function formatCareer() {
  return careerJourney
    .map(
      (e) =>
        `- ${e.role} at ${e.org} (${e.period})${e.location ? ` — ${e.location}` : ""}\n  ${e.summary}\n  Highlights: ${e.highlights.join("; ")}`,
    )
    .join("\n");
}

function formatEducation() {
  return education
    .map((x) => `- ${x.school} (${x.period}): ${x.detail}`)
    .join("\n");
}

function formatProjects() {
  return featuredProjects
    .map((p) => `- ${p.name} (${p.context}): ${p.summary}`)
    .join("\n");
}

function formatSkills() {
  return Object.entries(technicalSkills)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");
}

/** Factual profile text only (no instructions). */
export function getCareerKnowledgeBase(): string {
  return `
## Person
Name: ${site.name}
Title / tagline: ${site.title}
Summary: ${site.description}

## Contact (public)
- Email: ${contact.email}, ${contact.emailAlt}
- Phone: ${contact.phone}
- GitHub: ${contact.github}
- LinkedIn: ${contact.linkedin}

## Focus areas
${focusAreas.map((f) => `- ${f}`).join("\n")}

## About
${aboutParagraphs.map((p) => p).join("\n\n")}

## Education
${formatEducation()}

## Career timeline (most recent first)
${formatCareer()}

## Selected projects & internships (summary)
${formatProjects()}

## Technical skills
${formatSkills()}
`.trim();
}

const SYSTEM_INSTRUCTIONS = `You are a helpful assistant on a personal portfolio website. You answer questions ONLY about this person's professional profile, career, education, skills, projects, and public contact information, using the knowledge base below.

Rules:
- Use only the knowledge base. Do not invent employers, dates, technologies, or achievements.
- If something is not in the knowledge base, say you do not have that information.
- Reply in the same language as the user's message (Turkish or English).
- Be concise and professional. For contact, you may cite email, phone, GitHub, and LinkedIn from the knowledge base.
- Decline unrelated topics (e.g. general trivia, other people, coding homework) politely.

## Knowledge base
`;

export function buildCareerSystemMessage(): string {
  return `${SYSTEM_INSTRUCTIONS}\n${getCareerKnowledgeBase()}`;
}
