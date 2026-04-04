export const site = {
  name: "Alperen Us",
  domain: "https://alperenus.site",
  title: "Alperen Us — Software Engineer",
  description:
    "Software developer specializing in Java, Spring ecosystem, data platforms, and ML. Based in Istanbul, Türkiye.",
};

export const contact = {
  email: "usalperen@gmail.com",
  emailAlt: "aus20@ku.edu.tr",
  phone: "+90 543 284 2899",
  github: "https://github.com/aus20",
  linkedin: "https://www.linkedin.com/in/alperen-us",
};

export const cvPath = "/cv/aus20_cv_2026.pdf";

export const focusAreas = [
  "Backend & microservices",
  "Event-driven systems",
  "Data engineering & ML",
  "NLP platforms",
];

export const aboutParagraphs = [
  "I am a software engineer with a dual degree in Computer Science & Engineering and Molecular Biology and Genetics from Koç University. I build and maintain production systems where JVM backends, data infrastructure, and machine learning meet.",
  "Most recently I work on NLP and named-entity recognition platforms—keeping complex pipelines fast, observable, and reliable. I am equally at home designing Spring Boot microservices with Kafka and Redis as I am shipping analytics and modeling work in Python.",
  "Outside of code I have contributed to research in structural biology and data science, and I enjoy problems that sit at the boundary of engineering rigor and scientific curiosity.",
];

export type CareerEntry = {
  role: string;
  org: string;
  location?: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const careerJourney: CareerEntry[] = [
  {
    role: "Software Developer Specialist",
    org: "ETIYA",
    location: "Istanbul, Türkiye",
    period: "Sep 2025 — Present",
    summary:
      "Maintain and optimize an NLP-based named entity recognition (NER) platform.",
    highlights: [
      "System maintenance, performance tuning, and reliability for production NLP workloads.",
    ],
  },
  {
    role: "Advanced Data Analyst Intern",
    org: "SEM",
    location: "Istanbul, Türkiye",
    period: "Aug 2024 — Sep 2024",
    summary: "Customer segmentation and predictive analytics with the advanced analytics team.",
    highlights: [
      "Clustering, predictive models, and behavioral analysis for targeting and retention.",
    ],
  },
  {
    role: "AI Developer Intern",
    org: "ETIYA",
    location: "YTU Teknopark",
    period: "Jul 2023 — Aug 2023",
    summary: "NLP and transformer-based workflows; automation of article summarization.",
    highlights: [
      "Hands-on NLP, transformer architectures, and end-to-end model-led features.",
    ],
  },
  {
    role: "Data Science Intern",
    org: "COSBILAB",
    location: "Koç University",
    period: "Sep 2022 — Feb 2023",
    summary: "Machine learning for protein–protein interaction prediction.",
    highlights: [
      "Preprocessing and analysis of biological datasets; ML pipelines in Python.",
    ],
  },
  {
    role: "Research Assistant",
    org: "KUYBIIG-M",
    location: "Koç University",
    period: "Sep 2021 — May 2022",
    summary: "Structural biology research on protein and ribosome complexes.",
    highlights: [
      "X-ray crystallography workflows, experiments, and structural data analysis.",
    ],
  },
];

export const education = [
  {
    school: "Koç University",
    period: "2020 — 2025",
    detail: "B.S. Computer Science & Engineering; B.S. Molecular Biology and Genetics",
  },
  {
    school: "TEVITOL",
    period: "2015 — 2020",
    detail: "High school diploma — specialized school for gifted students (GPA 93/100)",
  },
];

export const technicalSkills = {
  programming: "Java (Spring Boot), Kotlin, TypeScript, Python, SQL",
  frameworks: "Spring Cloud, Angular, Hibernate",
  dataInfra: "PostgreSQL, MongoDB, Redis, Apache Kafka, Elasticsearch, Docker",
  dataScience: "Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch",
  tools: "Git, Maven, Postman, Podman, Docker, Unix/Bash",
  other: "X-ray crystallography methods, bioinformatics tools",
};

export const featuredProjects = [
  {
    name: "Telco CRM microservices",
    context: "Personal project — full stack",
    summary:
      "Scalable microservices with Spring Boot / Spring Cloud, Kafka, Redis, OpenFeign, Angular, JWT, Podman.",
  },
  {
    name: "Mobile game data analytics",
    context: "Independent case study",
    summary:
      "Dockerized warehouse, ETL with Python and PostgreSQL COPY over 2.6GB+ of events, SQL analytics and dashboards.",
  },
  {
    name: "Personal travel assistant",
    context: "Mobile & backend",
    summary:
      "Kotlin / Jetpack Compose Android app with Spring Boot APIs, Retrofit, FCM price alerts, JWT auth.",
  },
];
