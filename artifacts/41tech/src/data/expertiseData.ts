/**
 * Dados estáticos da página Expertise.
 * Edite aqui para atualizar formação, certificações, especialidades e stack.
 */

// ── Formação ────────────────────────────────────────────────────────────────

export interface EducationEntry {
  course: string;
  institution: string;
  period: string;
  /** "active" | "done" */
  status: "active" | "done";
  description: string;
}

export const educationData: Record<"pt" | "en", EducationEntry[]> = {
  pt: [
    {
      course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      institution: "Universidade Positivo",
      period: "2023 — 2025",
      status: "done",
      description:
        "Formação tecnológica em desenvolvimento de software, algoritmos, estruturas de dados, banco de dados relacional e engenharia de sistemas. Concluído em maio de 2025.",
    },
  ],
  en: [
    {
      course: "Technology Degree in Systems Analysis and Development",
      institution: "Universidade Positivo",
      period: "2023 — 2025",
      status: "done",
      description:
        "Technology degree in software development, algorithms, data structures, relational databases and systems engineering. Completed in May 2025.",
    },
  ],
};

// ── Certificações ────────────────────────────────────────────────────────────

export interface CertificationEntry {
  name: string;
  institution: string;
  year: string;
  /** "active" | "done" */
  status: "active" | "done";
  link?: string | null;
}

export const certificationsData: Record<"pt" | "en", CertificationEntry[]> = {
  pt: [
    { name: "Análise de Dados", institution: "Bosch", year: "2024", status: "done" },
    { name: "Linguagem de Programação Python — Básico", institution: "Fundação Bradesco", year: "2022", status: "done" },
    { name: "Desenvolvimento Orientado a Objetos com Python", institution: "Fundação Bradesco", year: "2022", status: "done" },
    { name: "Introdução à Programação Orientada a Objetos — POO", institution: "Fundação Bradesco", year: "2020", status: "done" },
    { name: "Fundamentos de Lógica de Programação", institution: "Fundação Bradesco", year: "2020", status: "done" },
    { name: "Programação de Arduino Básico", institution: "Senai PR", year: "2020", status: "done" },
    { name: "Operador de Suporte Técnico em T.I", institution: "Senai PR", year: "2020", status: "done" },
  ],
  en: [
    { name: "Data Analysis", institution: "Bosch", year: "2024", status: "done" },
    { name: "Python Programming Language — Basic", institution: "Fundação Bradesco", year: "2022", status: "done" },
    { name: "Object-Oriented Development with Python", institution: "Fundação Bradesco", year: "2022", status: "done" },
    { name: "Introduction to Object-Oriented Programming — OOP", institution: "Fundação Bradesco", year: "2020", status: "done" },
    { name: "Programming Logic Fundamentals", institution: "Fundação Bradesco", year: "2020", status: "done" },
    { name: "Basic Arduino Programming", institution: "Senai PR", year: "2020", status: "done" },
    { name: "IT Technical Support Operator", institution: "Senai PR", year: "2020", status: "done" },
  ],
};

// ── Especialidades ───────────────────────────────────────────────────────────

export interface SpecialtyEntry {
  icon: string; // lucide icon name (mapped in component)
  title: string;
  description: string;
  technologies: string[];
}

export const specialtiesData: Record<"pt" | "en", SpecialtyEntry[]> = {
  pt: [
    {
      icon: "Globe",
      title: "Sistemas Web",
      description:
        "Aplicações web robustas e escaláveis, do MVP ao sistema corporativo completo, com autenticação, multi-tenant e integrações.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs"],
    },
    {
      icon: "Workflow",
      title: "Automação de Processos",
      description:
        "Fluxos automatizados com n8n, webhooks e scripts que eliminam trabalho manual repetitivo e aumentam a eficiência operacional.",
      technologies: ["n8n", "Webhooks", "Scripts", "Zapier", "APIs"],
    },
    {
      icon: "BarChart2",
      title: "BI & Dados",
      description:
        "Painéis executivos em Power BI conectados a bancos de dados em tempo real, com modelagem dimensional e DAX avançado.",
      technologies: ["Power BI", "DAX", "SQL", "Modelagem", "ETL"],
    },
    {
      icon: "Cable",
      title: "Integrações",
      description:
        "Conexão entre sistemas, ERPs, CRMs e plataformas externas via REST, webhooks e soluções customizadas.",
      technologies: ["REST APIs", "Webhooks", "ERPs", "CRMs", "OAuth"],
    },
    {
      icon: "Server",
      title: "Infra & Deploy",
      description:
        "Containerização com Docker e deploy seguro via EasyPanel e VPS, com pipelines de CI/CD e monitoramento.",
      technologies: ["Docker", "VPS", "EasyPanel", "GitHub Actions", "Linux"],
    },
    {
      icon: "Brain",
      title: "IA Aplicada",
      description:
        "LLMs e modelos de IA integrados em workflows reais, automações inteligentes e assistentes contextuais para negócios.",
      technologies: ["OpenAI API", "LLMs", "Embeddings", "n8n + IA", "Prompting"],
    },
  ],
  en: [
    {
      icon: "Globe",
      title: "Web Systems",
      description:
        "Robust and scalable web applications, from MVP to complete enterprise systems, with authentication, multi-tenant and integrations.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs"],
    },
    {
      icon: "Workflow",
      title: "Process Automation",
      description:
        "Automated workflows with n8n, webhooks and scripts that eliminate repetitive manual work and boost operational efficiency.",
      technologies: ["n8n", "Webhooks", "Scripts", "Zapier", "APIs"],
    },
    {
      icon: "BarChart2",
      title: "BI & Data",
      description:
        "Executive Power BI dashboards connected to live databases, with dimensional modeling and advanced DAX.",
      technologies: ["Power BI", "DAX", "SQL", "Modeling", "ETL"],
    },
    {
      icon: "Cable",
      title: "Integrations",
      description:
        "Connecting systems, ERPs, CRMs and external platforms via REST, webhooks and custom solutions.",
      technologies: ["REST APIs", "Webhooks", "ERPs", "CRMs", "OAuth"],
    },
    {
      icon: "Server",
      title: "Infra & Deploy",
      description:
        "Docker containerization and secure deployment via EasyPanel and VPS, with CI/CD pipelines and monitoring.",
      technologies: ["Docker", "VPS", "EasyPanel", "GitHub Actions", "Linux"],
    },
    {
      icon: "Brain",
      title: "Applied AI",
      description:
        "LLMs and AI models integrated into real workflows, intelligent automations and contextual business assistants.",
      technologies: ["OpenAI API", "LLMs", "Embeddings", "n8n + AI", "Prompting"],
    },
  ],
};

// ── Stack por Categoria ──────────────────────────────────────────────────────

export interface StackCategory {
  label: string;
  items: string[];
}

export const stackData: Record<"pt" | "en", StackCategory[]> = {
  pt: [
    { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Shadcn/ui", "Framer Motion"] },
    { label: "Backend", items: ["Node.js", "Express", "REST APIs", "Drizzle ORM", "Zod"] },
    { label: "Banco de Dados", items: ["PostgreSQL", "MySQL", "SQLite"] },
    { label: "BI & Dados", items: ["Power BI", "DAX", "SQL Avançado", "Modelagem Dimensional"] },
    { label: "Automação", items: ["n8n", "Webhooks", "Scripts Node.js", "Integrações API"] },
    { label: "Infra & Deploy", items: ["Docker", "VPS", "EasyPanel", "GitHub Actions", "Linux"] },
    { label: "Design / Produto", items: ["Figma", "UI/UX", "Prototipação", "Design System"] },
  ],
  en: [
    { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Shadcn/ui", "Framer Motion"] },
    { label: "Backend", items: ["Node.js", "Express", "REST APIs", "Drizzle ORM", "Zod"] },
    { label: "Database", items: ["PostgreSQL", "MySQL", "SQLite"] },
    { label: "BI & Data", items: ["Power BI", "DAX", "Advanced SQL", "Dimensional Modeling"] },
    { label: "Automation", items: ["n8n", "Webhooks", "Node.js Scripts", "API Integrations"] },
    { label: "Infra & Deploy", items: ["Docker", "VPS", "EasyPanel", "GitHub Actions", "Linux"] },
    { label: "Design / Product", items: ["Figma", "UI/UX", "Prototyping", "Design System"] },
  ],
};
