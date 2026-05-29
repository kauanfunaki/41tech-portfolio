/**
 * Dados estáticos da página Experience / Experiência.
 * Edite aqui para atualizar cargos, responsabilidades e entregas.
 */

// ── Timeline profissional ────────────────────────────────────────────────────

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  /** "current" = em andamento */
  current: boolean;
  modality: string;
  description: string;
  responsibilities: string[];
  results: string[];
  technologies: string[];
}

export const timelineData: Record<"pt" | "en", ExperienceEntry[]> = {
  pt: [
    {
      role: "Desenvolvedor Full Stack B2B",
      company: "41 Tech — Grupo 41",
      period: "2023 — presente",
      current: true,
      modality: "Presencial · Brasil",
      description:
        "Responsável pelo desenvolvimento, deploy e sustentação de sistemas internos e externos para o Grupo 41 e clientes B2B. Trabalho no ciclo completo: levantamento de requisitos, arquitetura, desenvolvimento, testes e produção.",
      responsibilities: [
        "Desenvolvimento de sistemas web com React, TypeScript e Node.js",
        "Modelagem e gestão de bancos de dados PostgreSQL",
        "Criação de dashboards executivos no Power BI com conexão direta ao banco",
        "Automação de processos operacionais com n8n e integrações via API",
        "Deploy e sustentação de aplicações via Docker e EasyPanel em VPS",
        "Integração com ERPs, CRMs e plataformas externas",
        "Aplicação de IA (LLMs) em workflows automatizados de negócio",
      ],
      results: [
        "Sistema 41 Hub — plataforma centralizada de gestão e comunicação interna",
        "BI FinSight — dashboards financeiros executivos em Power BI",
        "BI Pulse BLD — painel operacional de BLD com alertas e KPIs",
        "DevPulse — sistema de monitoramento de desenvolvimento",
        "Frota-Link — gestão de frota integrada com ERP",
        "Watchers BPO — plataforma de controle de pendências e SLA",
        "Mais de 10 automações n8n em produção eliminando trabalho manual",
      ],
      technologies: [
        "React", "TypeScript", "Node.js", "PostgreSQL", "Power BI",
        "n8n", "Docker", "EasyPanel", "REST APIs", "Drizzle ORM",
        "Tailwind CSS", "Vite", "GitHub Actions", "LLMs",
      ],
    },
  ],
  en: [
    {
      role: "Full Stack Developer B2B",
      company: "41 Tech — Grupo 41",
      period: "2023 — present",
      current: true,
      modality: "On-site · Brazil",
      description:
        "Responsible for development, deployment and maintenance of internal and external systems for Grupo 41 and B2B clients. Full cycle: requirements gathering, architecture, development, testing and production.",
      responsibilities: [
        "Web systems development with React, TypeScript and Node.js",
        "PostgreSQL database modeling and management",
        "Executive dashboards in Power BI with direct database connection",
        "Operational process automation with n8n and API integrations",
        "Application deployment and maintenance via Docker and EasyPanel on VPS",
        "Integration with ERPs, CRMs and external platforms",
        "AI (LLMs) applied in automated business workflows",
      ],
      results: [
        "41 Hub System — centralized internal management and communication platform",
        "BI FinSight — executive financial dashboards in Power BI",
        "BI Pulse BLD — BLD operational dashboard with alerts and KPIs",
        "DevPulse — development monitoring system",
        "Frota-Link — fleet management integrated with ERP",
        "Watchers BPO — backlog and SLA control platform",
        "10+ n8n automations in production eliminating manual work",
      ],
      technologies: [
        "React", "TypeScript", "Node.js", "PostgreSQL", "Power BI",
        "n8n", "Docker", "EasyPanel", "REST APIs", "Drizzle ORM",
        "Tailwind CSS", "Vite", "GitHub Actions", "LLMs",
      ],
    },
  ],
};

// ── Trabalhos relevantes ─────────────────────────────────────────────────────

export interface WorkHighlight {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export const workHighlightsData: Record<"pt" | "en", WorkHighlight[]> = {
  pt: [
    {
      icon: "LayoutTemplate",
      title: "Sistemas Internos",
      description:
        "Desenvolvimento de plataformas web completas para gestão operacional, controle de dados e automação de processos internos.",
    },
    {
      icon: "BarChart2",
      title: "Dashboards Executivos",
      description:
        "Painéis Power BI conectados a bancos de dados em tempo real, com KPIs críticos e modelos dimensionais avançados.",
    },
    {
      icon: "Workflow",
      title: "Automações Operacionais",
      description:
        "Fluxos n8n que eliminam tarefas manuais repetitivas, integrando sistemas e garantindo consistência nos processos.",
    },
    {
      icon: "Cable",
      title: "Integrações com APIs",
      description:
        "Conexão entre ERPs, CRMs e plataformas externas via REST APIs, webhooks e soluções customizadas de middleware.",
    },
    {
      icon: "Server",
      title: "Deploy e Sustentação",
      description:
        "Containerização com Docker, deploy em VPS via EasyPanel e manutenção contínua de aplicações em produção.",
    },
    {
      icon: "BookOpen",
      title: "Documentação Técnica",
      description:
        "Organização de conhecimento técnico, documentação de processos e estruturação de bases para times e clientes.",
    },
  ],
  en: [
    {
      icon: "LayoutTemplate",
      title: "Internal Systems",
      description:
        "Full web platform development for operational management, data control and internal process automation.",
    },
    {
      icon: "BarChart2",
      title: "Executive Dashboards",
      description:
        "Real-time Power BI dashboards connected to live databases, with critical KPIs and advanced dimensional models.",
    },
    {
      icon: "Workflow",
      title: "Operational Automations",
      description:
        "n8n workflows that eliminate repetitive manual tasks, integrating systems and ensuring process consistency.",
    },
    {
      icon: "Cable",
      title: "API Integrations",
      description:
        "Connecting ERPs, CRMs and external platforms via REST APIs, webhooks and custom middleware solutions.",
    },
    {
      icon: "Server",
      title: "Deploy & Maintenance",
      description:
        "Docker containerization, VPS deployment via EasyPanel and continuous maintenance of production applications.",
    },
    {
      icon: "BookOpen",
      title: "Technical Documentation",
      description:
        "Technical knowledge organization, process documentation and structured knowledge bases for teams and clients.",
    },
  ],
};
