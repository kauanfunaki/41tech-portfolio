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
      role: "Desenvolvedor Júnior",
      company: "Grupo 41",
      period: "out 2025 — presente",
      current: true,
      modality: "Presencial · Curitiba, PR",
      description:
        "Desenvolvimento e evolução de aplicações e sistemas internos, criando soluções que conectam processos, automatizam rotinas e aumentam a eficiência operacional da empresa.",
      responsibilities: [
        "Levantamento técnico de necessidades internas, traduzindo demandas de negócio em soluções tecnológicas viáveis e escaláveis",
        "Desenvolvimento de sistemas e ferramentas internas voltadas para automação de processos, gestão de dados e otimização das rotinas operacionais",
        "Deploy e gerenciamento de aplicações em VPS, garantindo disponibilidade e estabilidade",
        "Modelagem e estruturação de bancos de dados para armazenamento eficiente e consistente",
        "Estruturação de arquitetura de sistemas, definindo fluxos entre aplicações, APIs e bancos de dados",
        "Manutenção, melhorias e refatoração de sistemas existentes em produção",
        "Integração entre sistemas e automações, conectando aplicações internas com APIs e serviços externos",
        "Aplicação de Inteligência Artificial em automações e sistemas (classificação de dados, análise e geração de insights)",
        "Desenvolvimento de dashboards e consultas de dados com Power BI e SQL",
      ],
      results: [
        "41-Tech-Hub — plataforma centralizada de gestão e comunicação interna",
        "BI FinSight — dashboards financeiros executivos em Power BI",
        "BI Pulse BLD — painel operacional com alertas e KPIs",
        "Watchers BPO — plataforma de controle de pendências e SLA",
        "Frota-Link — gestão de frota integrada com ERP",
        "DevPulse — sistema de monitoramento de desenvolvimento",
        "Mais de 10 automações n8n em produção eliminando trabalho manual",
      ],
      technologies: [
        "React", "TypeScript", "Node.js", "PostgreSQL", "Power BI",
        "n8n", "Docker", "EasyPanel", "REST APIs", "Drizzle ORM",
        "Tailwind CSS", "Vite", "GitHub Actions", "LLMs",
      ],
    },
    {
      role: "Analista de Planejamento",
      company: "Bellinati Perez",
      period: "jan 2025 — out 2025",
      current: false,
      modality: "Híbrido · Curitiba, PR",
      description:
        "Suporte técnico, gestão dos processos digitais e controle operacional das operações de cobrança via WhatsApp.",
      responsibilities: [
        "Criação de dashboards para acompanhamento de KPIs, controle de chamados (GLPI) e gestão de licenças",
        "Gestão de chamados controlando SLA, fluxo e priorização das demandas internas do time",
        "Criação e manutenção de chatbots, links encurtados e landing pages para direcionamento de clientes aos canais digitais (WhatsApp, portais e 0800)",
        "Monitoramento dos números operacionais (WhatsApp API) com substituição imediata de números banidos para garantir continuidade dos atendimentos",
        "Visitas técnicas às operações e treinamentos para operadores, supervisores e gerentes sobre plataformas, fluxos e indicadores",
        "Gestão parcial do faturamento, controle de custos de licenças e reuniões com fornecedores para alinhamento financeiro",
      ],
      results: [
        "Dashboards de KPIs para monitoramento das operações de cobrança",
        "Automação do fluxo de chamados com controle de SLA",
        "Implantação de chatbots e landing pages para canais digitais de cobrança",
      ],
      technologies: [
        "Power BI", "GLPI", "WhatsApp API", "Chatbots", "SQL", "Excel",
      ],
    },
    {
      role: "Analista de Dados",
      company: "Bosch",
      period: "fev 2023 — jul 2024",
      current: false,
      modality: "Presencial · Curitiba, PR",
      description:
        "Aprendiz em análise de dados com foco em ferramentas de BI, automação de planilhas e suporte à gestão industrial.",
      responsibilities: [
        "Criação e análise de dashboards no Power BI para apoio à gestão",
        "Desenvolvimento de aplicações VBA (Excel) para controle e monitoramento de materiais",
        "Gestão de projetos técnicos focados em análise de dados",
        "Registro e monitoramento de dados da linha de produção para suporte às vendas internacionais via SAP ERP",
        "Aplicação de metodologia 5S no setor",
        "Desenvolvimento em Python para automação e análise de dados",
        "Consulta e criação de bancos de dados no SQL Server",
        "Introdução a IoT e Machine Learning",
      ],
      results: [
        "Dashboards Power BI para suporte à gestão industrial",
        "Aplicações VBA para automação de controle de materiais",
        "Projetos de análise de dados e aprendizado em Python, SQL e ML",
      ],
      technologies: [
        "Power BI", "VBA", "SAP ERP", "Python", "SQL Server", "Excel",
        "IoT", "Machine Learning",
      ],
    },
  ],
  en: [
    {
      role: "Junior Developer",
      company: "Grupo 41",
      period: "Oct 2025 — present",
      current: true,
      modality: "On-site · Curitiba, PR",
      description:
        "Development and evolution of internal applications and systems, creating solutions that connect processes, automate routines and increase operational efficiency.",
      responsibilities: [
        "Technical requirements gathering, translating business demands into viable and scalable technological solutions",
        "Development of internal systems and tools for process automation, data management and operational efficiency",
        "VPS deployment and application management, ensuring availability and stability",
        "Database modeling and structuring for efficient and consistent data storage",
        "System architecture design, defining flows between applications, APIs and databases",
        "Maintenance, improvements and refactoring of existing production systems",
        "System integrations and automations connecting internal applications with external APIs and services",
        "AI application in automations and systems (data classification, analysis and insight generation)",
        "Dashboard and data query development using Power BI and SQL",
      ],
      results: [
        "41-Tech-Hub — centralized internal management and communication platform",
        "BI FinSight — executive financial dashboards in Power BI",
        "BI Pulse BLD — operational dashboard with alerts and KPIs",
        "Watchers BPO — backlog and SLA control platform",
        "Frota-Link — fleet management integrated with ERP",
        "DevPulse — development monitoring system",
        "10+ n8n automations in production eliminating manual work",
      ],
      technologies: [
        "React", "TypeScript", "Node.js", "PostgreSQL", "Power BI",
        "n8n", "Docker", "EasyPanel", "REST APIs", "Drizzle ORM",
        "Tailwind CSS", "Vite", "GitHub Actions", "LLMs",
      ],
    },
    {
      role: "Planning Analyst",
      company: "Bellinati Perez",
      period: "Jan 2025 — Oct 2025",
      current: false,
      modality: "Hybrid · Curitiba, PR",
      description:
        "Technical support, digital process management and operational control of WhatsApp-based billing operations.",
      responsibilities: [
        "KPI dashboard creation, ticket management (GLPI) and license control",
        "Ticket management controlling SLA, flow and prioritization of internal team demands",
        "Chatbot creation and maintenance, plus shortened links and landing pages directing customers to digital channels (WhatsApp, portals and 0800)",
        "Operational number monitoring (WhatsApp API) with immediate replacement of banned numbers to ensure service continuity",
        "Technical visits to call center operations and training for operators, supervisors and managers on platforms, flows and indicators",
        "Partial billing management, license cost control and supplier meetings for financial alignment",
      ],
      results: [
        "KPI dashboards for billing operations monitoring",
        "Ticket flow automation with SLA control",
        "Chatbots and landing pages for digital billing channels",
      ],
      technologies: [
        "Power BI", "GLPI", "WhatsApp API", "Chatbots", "SQL", "Excel",
      ],
    },
    {
      role: "Data Analyst",
      company: "Bosch",
      period: "Feb 2023 — Jul 2024",
      current: false,
      modality: "On-site · Curitiba, PR",
      description:
        "Apprentice in data analysis focused on BI tools, spreadsheet automation and industrial management support.",
      responsibilities: [
        "Power BI dashboard creation and analysis for management support",
        "VBA (Excel) application development for material control and monitoring",
        "Technical project management focused on data analysis",
        "Production line data recording and monitoring for international sales support using SAP ERP",
        "5S methodology application in the department",
        "Python development for automation and data analysis",
        "SQL Server database querying and creation",
        "Introduction to IoT and Machine Learning",
      ],
      results: [
        "Power BI dashboards for industrial management support",
        "VBA applications for material control automation",
        "Data analysis projects with hands-on Python, SQL and ML learning",
      ],
      technologies: [
        "Power BI", "VBA", "SAP ERP", "Python", "SQL Server", "Excel",
        "IoT", "Machine Learning",
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
