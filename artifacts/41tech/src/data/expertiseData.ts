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
      course: "Análise e Desenvolvimento de Sistemas",
      institution: "UNIP",
      period: "2023 — 2025",
      status: "active",
      description:
        "Formação técnica em desenvolvimento de software, algoritmos, estruturas de dados, banco de dados relacional e engenharia de sistemas.",
    },
  ],
  en: [
    {
      course: "Systems Analysis and Development",
      institution: "UNIP",
      period: "2023 — 2025",
      status: "active",
      description:
        "Technical education in software development, algorithms, data structures, relational databases and systems engineering.",
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
    { name: "Node.js do Zero a Expert", institution: "Udemy", year: "2023", status: "done" },
    { name: "React + TypeScript Completo", institution: "Udemy", year: "2023", status: "done" },
    { name: "PostgreSQL Completo", institution: "Udemy", year: "2023", status: "done" },
    { name: "APIs REST com Express", institution: "Udemy", year: "2023", status: "done" },
    { name: "Power BI do Básico ao Avançado", institution: "Udemy", year: "2024", status: "done" },
    { name: "n8n — Automação e Integrações", institution: "Udemy", year: "2024", status: "done" },
    { name: "Docker e Deploy com EasyPanel", institution: "Udemy", year: "2024", status: "done" },
    { name: "Fundamentos de IA com LLMs", institution: "Udemy", year: "2025", status: "done" },
  ],
  en: [
    { name: "Node.js from Zero to Expert", institution: "Udemy", year: "2023", status: "done" },
    { name: "React + TypeScript Complete", institution: "Udemy", year: "2023", status: "done" },
    { name: "PostgreSQL Complete", institution: "Udemy", year: "2023", status: "done" },
    { name: "REST APIs with Express", institution: "Udemy", year: "2023", status: "done" },
    { name: "Power BI Basic to Advanced", institution: "Udemy", year: "2024", status: "done" },
    { name: "n8n — Automation & Integrations", institution: "Udemy", year: "2024", status: "done" },
    { name: "Docker & Deploy with EasyPanel", institution: "Udemy", year: "2024", status: "done" },
    { name: "AI Fundamentals with LLMs", institution: "Udemy", year: "2025", status: "done" },
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
