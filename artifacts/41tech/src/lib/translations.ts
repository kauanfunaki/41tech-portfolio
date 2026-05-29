export type Lang = "pt" | "en";

export const translations = {
  pt: {
    lang: {
      current: "PT",
      other: "EN",
    },
    nav: {
      home: "Início",
      expertise: "Especialidades",
      projects: "Projetos",
      experience: "Experiência",
      cases: "Cases",
      about: "Sobre mim",
      contact: "Contato",
    },
    footer: {
      description:
        "Desenvolvedor Full Stack apaixonado por transformar problemas reais em soluções digitais escaláveis.",
      navTitle: "Navegação",
      contactTitle: "Contato",
      rights: "Todos os direitos reservados.",
      country: "Brasil",
    },
    home: {
      badge: "Engenharia de Software B2B",
      headline1: "Tecnologia aplicada à",
      headline2: "operação real.",
      subheading:
        "Crio sistemas, automações, dashboards e integrações que transformam processos manuais em soluções digitais escaláveis.",
      ctaPrimary: "Transformar meu processo",
      ctaSecondary: "Ver projetos",
      servicesTitle: "O que faço",
      servicesSubtitle:
        "Engenharia de software focada em resolver gargalos operacionais complexos.",
      services: [
        {
          title: "Sistemas Web",
          description:
            "Aplicações web robustas e escaláveis, do MVP ao sistema corporativo complexo.",
        },
        {
          title: "Automações",
          description:
            "Fluxos automatizados com n8n, APIs e integrações que eliminam trabalho manual.",
        },
        {
          title: "BI e Dashboards",
          description:
            "Painéis executivos em Power BI conectados ao seu banco de dados em tempo real.",
        },
        {
          title: "Integrações com APIs",
          description:
            "Conexão entre sistemas, ERPs, CRMs e plataformas via REST e webhooks.",
        },
        {
          title: "IA aplicada a processos",
          description:
            "LLMs e modelos de IA integrados em workflows reais de negócio.",
        },
        {
          title: "Infra Docker e Deploy",
          description:
            "Containerização e deploy seguro via Docker e EasyPanel com CI/CD.",
        },
      ],
      featuredProjectsTitle: "Projetos em destaque",
      featuredProjectsSubtitle:
        "Soluções construídas com precisão para impacto real na operação.",
      viewAllProjects: "Ver todos os projetos",
      casesTitle: "Estudos de Caso",
      casesSubtitle:
        "Problemas reais, decisões técnicas documentadas e resultados mensuráveis.",
      viewAllCases: "Ver todos os cases",
      viewCase: "Ver case",
      featured: "Destaque",
      viewDetails: "Ver detalhes",
      stackTitle: "Stack Tecnológico",
      stackSubtitle: "Utilizo as ferramentas certas para cada problema real.",
      ctaBigPart1: "Quer transformar um processo manual em uma",
      ctaBigGradient: "solução digital?",
      ctaBigSubtitle:
        "Se existe uma rotina repetitiva, uma planilha crítica ou um processo manual travando sua operação, posso transformar isso em sistema.",
      ctaBigBtn: "Falar comigo",
      contactTitle: "Vamos construir algo incrível.",
      contactSubtitle:
        "Conte-me sobre o seu desafio. Posso ajudar a encontrar a melhor solução.",
      nameLabel: "Nome",
      namePlaceholder: "Seu nome",
      companyLabel: "Empresa",
      companyPlaceholder: "Nome da sua empresa",
      contactLabel: "E-mail ou WhatsApp",
      contactPlaceholder: "Como posso te contatar?",
      messageLabel: "O que você quer automatizar ou criar?",
      messagePlaceholder: "Descreva brevemente o problema que precisa resolver...",
      sendBtn: "Enviar pelo WhatsApp",
      contactUnavailableTitle: "Contato indisponível",
      contactUnavailableDesc: "O link de WhatsApp não foi configurado.",
      popupBlockedTitle: "Popup bloqueado pelo navegador",
      popupBlockedDesc:
        "Permita popups para este site e tente novamente, ou entre em contato diretamente pelo WhatsApp.",
    },
    projects: {
      badge: "Portfólio Técnico",
      title: "Projetos",
      subtitle:
        "Sistemas web, automações, dashboards, integrações e IA — projetos reais com problema documentado, solução técnica e resultado mensurado.",
      searchPlaceholder: "Buscar por nome, descrição...",
      // Ordered list matching ALL_CATEGORY_KEYS order
      categories: [
        "Todos",
        "Sistema Web",
        "BI & Dados",
        "Automação",
        "Integração",
        "IA",
        "Infra & Deploy",
        "ERP",
        "Outro",
      ],
      emptyTitle: "Nenhum projeto encontrado",
      emptyDesc: "Nenhum projeto corresponde aos filtros aplicados.",
      featured: "Destaque",
      viewDetails: "Ver projeto",
      caseTag: "Documentado",
    },
    cases: {
      badge: "Estudos de Caso",
      title: "Cases",
      subtitle:
        "Problemas reais, soluções desenvolvidas e resultados mensuráveis — detalhados do início ao fim.",
      searchPlaceholder: "Buscar por título, segmento...",
      viewFull: "Ver case completo",
      emptySearchTitle: "Nenhum case encontrado",
      emptySearchDesc: "Nenhum case corresponde à busca.",
      emptyNoneTitle: "Nenhum case publicado ainda",
      emptyNoneDesc: "Em breve haverá estudos de caso disponíveis aqui.",
      privateCases: "case(s) privados não exibidos publicamente",
    },
    about: {
      badge: "Minha história",
      title: "Sobre mim",
      subtitle:
        "Desenvolvedor Full Stack focado em transformar operação real em sistemas, automações e inteligência de dados.",
      seoDescription:
        "Desenvolvedor Full Stack B2B focado em sistemas, automações e inteligência de dados. Conheça minha história e stack tecnológico.",
      sectionWho: "Quem sou",
      defaultBio:
        "Uno desenvolvimento de software, automação, BI, integrações e inteligência artificial para resolver gargalos operacionais reais dentro de empresas. Comecei no Grupo 41 resolvendo problemas internos — e rapidamente percebi que essas soluções valem para muitas outras empresas.",
      specialties: "Especialidades",
      b2bLabel:
        "Focado em empresas que precisam de tecnologia séria para problemas sérios.",
      sectionDiff: "O que me diferencia",
      differentials: [
        "Entendo a operação antes de escrever código",
        "Crio soluções sob medida para cada negócio",
        "Conecto dados, sistemas e pessoas",
        "Penso em escala, segurança e manutenção",
      ],
      sectionHow: "Como trabalho",
      steps: [
        {
          title: "Diagnóstico do processo",
          desc: "Mapeio o fluxo atual, os gargalos e as oportunidades de melhoria.",
        },
        {
          title: "Desenho da solução",
          desc: "Defino a arquitetura e as ferramentas ideais para o seu contexto.",
        },
        {
          title: "Desenvolvimento",
          desc: "Construo com agilidade, boas práticas e código limpo.",
        },
        {
          title: "Validação com usuários",
          desc: "Testo junto a quem vai usar no dia a dia, refinando o produto.",
        },
        {
          title: "Deploy e melhoria contínua",
          desc: "Coloco em produção e evoluo com base no uso real.",
        },
      ],
      sectionStack: "Minha stack",
      ctaTitle: "Tem um processo manual travando sua operação?",
      ctaSubtitle: "Posso transformar isso em sistema. Vamos conversar.",
      ctaBtn: "Falar comigo",
    },
    projectDetail: {
      back: "Voltar ao Portfólio",
      notFound: "Projeto não encontrado",
      backToProjects: "Voltar para projetos",
      seoFallbackTitle: "Projeto",
      seoFallbackDesc: "Detalhes do projeto no portfólio de Kauan Funaki.",
      featured: "Destaque",
      demo: "Ver demonstração",
      repo: "Repositório",
      impact: "Impacto Direto",
      overview: "Visão Geral",
      problem: "Problema Resolvido",
      solution: "Solução Implementada",
      result: "Resultados Obtidos",
      techStack: "Stack Técnica",
      gallery: "Galeria",
      ctaTitle: "Gostou deste projeto?",
      ctaSubtitle:
        "Posso construir uma solução com este mesmo nível de qualidade para a sua empresa.",
      ctaBtn: "Falar comigo",
      sidebarTitle: "Detalhes Técnicos",
      statusLabel: "Status",
      statusCompleted: "Concluído",
      statusInProgress: "Em Andamento",
      stackUsed: "Stack Técnica",
      viewCaseBtn: "Ver documentação completa",
      viewCaseLabel: "Documentação detalhada disponível",
    },
    caseDetail: {
      back: "Voltar para Cases",
      notFound: "Case não encontrado",
      backToCases: "Voltar para cases",
      seoFallbackTitle: "Case",
      seoFallbackDesc: "Estudo de caso detalhado com problema, solução e resultados.",
      badge: "Estudo de Caso",
      relatedProject: "Ver projeto relacionado",
      impact: "Impacto Direto",
      challenge: "O Desafio",
      solution: "A Solução",
      result: "O Resultado",
      gallery: "Galeria",
      ctaTitle: "Gostou deste case?",
      ctaSubtitle:
        "Posso desenvolver uma solução com o mesmo nível de resultado para o seu negócio.",
      ctaBtn: "Falar comigo",
      sidebarTitle: "Detalhes do Case",
      typeLabel: "Tipo",
      segmentLabel: "Segmento",
      resultsLabel: "Resultados",
      relatedProjectBtn: "Projeto relacionado",
    },
    notFound: {
      title: "Página não encontrada",
      desc1: "A página que você está procurando não existe ou foi movida.",
      desc2: "Explore o portfólio pelos links abaixo.",
      home: "Início",
      projects: "Ver Projetos",
      cases: "Ver Cases",
    },
    expertise: {
      heroSubtitle: "Formação, certificações e especialidades técnicas aplicadas em projetos reais.",
      heroCta: "Ver Projetos",
      summaryLabel: "Resumo Técnico",
      summaryText: "Desenvolvedor Full Stack com foco em sistemas web, automação de processos, dados, BI, integrações, infraestrutura e IA aplicada a operações reais de empresas.",
      educationTitle: "Formação",
      certificationsTitle: "Certificações",
      specialtiesTitle: "Especialidades",
      stackTitle: "Stack por Categoria",
      statusActive: "Em andamento",
      statusDone: "Concluído",
      linkLabel: "Ver certificado",
    },
  },

  en: {
    lang: {
      current: "EN",
      other: "PT",
    },
    nav: {
      home: "Home",
      expertise: "Expertise",
      projects: "Projects",
      experience: "Experience",
      cases: "Case Studies",
      about: "About me",
      contact: "Contact",
    },
    footer: {
      description:
        "Full Stack Developer passionate about turning real problems into scalable digital solutions.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      rights: "All rights reserved.",
      country: "Brazil",
    },
    home: {
      badge: "B2B Software Engineering",
      headline1: "Technology applied to",
      headline2: "real operations.",
      subheading:
        "I build systems, automations, dashboards and integrations that turn manual processes into scalable digital solutions.",
      ctaPrimary: "Transform my process",
      ctaSecondary: "View projects",
      servicesTitle: "What I do",
      servicesSubtitle:
        "Software engineering focused on solving complex operational bottlenecks.",
      services: [
        {
          title: "Web Systems",
          description:
            "Robust and scalable web applications, from MVP to complex enterprise systems.",
        },
        {
          title: "Automations",
          description:
            "Automated flows with n8n, APIs and integrations that eliminate manual work.",
        },
        {
          title: "BI & Dashboards",
          description:
            "Executive Power BI dashboards connected to your database in real time.",
        },
        {
          title: "API Integrations",
          description:
            "Connecting systems, ERPs, CRMs and platforms via REST and webhooks.",
        },
        {
          title: "AI applied to processes",
          description: "LLMs and AI models integrated into real business workflows.",
        },
        {
          title: "Docker & Deploy",
          description:
            "Containerization and secure deployment via Docker and EasyPanel with CI/CD.",
        },
      ],
      featuredProjectsTitle: "Featured projects",
      featuredProjectsSubtitle:
        "Solutions built with precision for real operational impact.",
      viewAllProjects: "View all projects",
      casesTitle: "Case Studies",
      casesSubtitle:
        "Real problems, documented technical decisions and measurable results.",
      viewAllCases: "View all cases",
      viewCase: "View case",
      featured: "Featured",
      viewDetails: "View details",
      stackTitle: "Tech Stack",
      stackSubtitle: "I use the right tools for each real problem.",
      ctaBigPart1: "Want to turn a manual process into a",
      ctaBigGradient: "digital solution?",
      ctaBigSubtitle:
        "If there's a repetitive routine, a critical spreadsheet or a manual process slowing down your operations, I can turn it into a system.",
      ctaBigBtn: "Talk to me",
      contactTitle: "Let's build something amazing.",
      contactSubtitle:
        "Tell me about your challenge. I can help find the best solution.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      companyLabel: "Company",
      companyPlaceholder: "Your company name",
      contactLabel: "Email or WhatsApp",
      contactPlaceholder: "How can I reach you?",
      messageLabel: "What do you want to automate or build?",
      messagePlaceholder: "Briefly describe the problem you need to solve...",
      sendBtn: "Send via WhatsApp",
      contactUnavailableTitle: "Contact unavailable",
      contactUnavailableDesc: "The WhatsApp link has not been configured.",
      popupBlockedTitle: "Popup blocked by browser",
      popupBlockedDesc:
        "Allow popups for this site and try again, or contact me directly via WhatsApp.",
    },
    projects: {
      badge: "Technical Portfolio",
      title: "Projects",
      subtitle:
        "Web systems, automations, dashboards, integrations and AI — real projects with documented problems, technical solutions and measurable results.",
      searchPlaceholder: "Search by name, description...",
      categories: [
        "All",
        "Web System",
        "BI & Data",
        "Automation",
        "Integration",
        "AI",
        "Infra & Deploy",
        "ERP",
        "Other",
      ],
      emptyTitle: "No projects found",
      emptyDesc: "No projects match the applied filters.",
      featured: "Featured",
      viewDetails: "View project",
      caseTag: "Documented",
    },
    cases: {
      badge: "Case Studies",
      title: "Cases",
      subtitle:
        "Real problems, developed solutions and measurable results — detailed from start to finish.",
      searchPlaceholder: "Search by title, segment...",
      viewFull: "View full case",
      emptySearchTitle: "No cases found",
      emptySearchDesc: "No cases match your search.",
      emptyNoneTitle: "No cases published yet",
      emptyNoneDesc: "Case studies will be available here soon.",
      privateCases: "private case(s) not shown publicly",
    },
    about: {
      badge: "My story",
      title: "About me",
      subtitle:
        "Full Stack Developer focused on turning real operations into systems, automations and data intelligence.",
      seoDescription:
        "B2B Full Stack Developer focused on systems, automations and data intelligence. Learn about my background and tech stack.",
      sectionWho: "Who I am",
      defaultBio:
        "I combine software development, automation, BI, integrations and artificial intelligence to solve real operational bottlenecks inside companies. I started at Grupo 41 solving internal problems — and quickly realized these solutions apply to many other businesses.",
      specialties: "Specialties",
      b2bLabel:
        "Focused on companies that need serious technology for serious problems.",
      sectionDiff: "What sets me apart",
      differentials: [
        "I understand the operation before writing code",
        "I create custom solutions for each business",
        "I connect data, systems and people",
        "I think about scale, security and maintenance",
      ],
      sectionHow: "How I work",
      steps: [
        {
          title: "Process diagnosis",
          desc: "I map the current flow, bottlenecks and improvement opportunities.",
        },
        {
          title: "Solution design",
          desc: "I define the ideal architecture and tools for your context.",
        },
        {
          title: "Development",
          desc: "I build with agility, best practices and clean code.",
        },
        {
          title: "User validation",
          desc: "I test alongside day-to-day users, refining the product.",
        },
        {
          title: "Deploy & continuous improvement",
          desc: "I deploy to production and evolve based on real usage.",
        },
      ],
      sectionStack: "My stack",
      ctaTitle: "Have a manual process slowing down your operations?",
      ctaSubtitle: "I can turn it into a system. Let's talk.",
      ctaBtn: "Talk to me",
    },
    projectDetail: {
      back: "Back to Portfolio",
      notFound: "Project not found",
      backToProjects: "Back to projects",
      seoFallbackTitle: "Project",
      seoFallbackDesc: "Project details from Kauan Funaki's portfolio.",
      featured: "Featured",
      demo: "View demo",
      repo: "Repository",
      impact: "Direct Impact",
      overview: "Overview",
      problem: "Problem Solved",
      solution: "Solution Implemented",
      result: "Results Obtained",
      techStack: "Tech Stack",
      gallery: "Gallery",
      ctaTitle: "Like this project?",
      ctaSubtitle:
        "I can build a solution with the same level of quality for your company.",
      ctaBtn: "Talk to me",
      sidebarTitle: "Technical Details",
      statusLabel: "Status",
      statusCompleted: "Completed",
      statusInProgress: "In Progress",
      stackUsed: "Tech Stack",
      viewCaseBtn: "View full documentation",
      viewCaseLabel: "Detailed documentation available",
    },
    caseDetail: {
      back: "Back to Cases",
      notFound: "Case not found",
      backToCases: "Back to cases",
      seoFallbackTitle: "Case",
      seoFallbackDesc: "Detailed case study with problem, solution and results.",
      badge: "Case Study",
      relatedProject: "View related project",
      impact: "Direct Impact",
      challenge: "The Challenge",
      solution: "The Solution",
      result: "The Result",
      gallery: "Gallery",
      ctaTitle: "Like this case?",
      ctaSubtitle:
        "I can develop a solution with the same level of results for your business.",
      ctaBtn: "Talk to me",
      sidebarTitle: "Case Details",
      typeLabel: "Type",
      segmentLabel: "Segment",
      resultsLabel: "Results",
      relatedProjectBtn: "Related project",
    },
    notFound: {
      title: "Page not found",
      desc1: "The page you're looking for doesn't exist or has been moved.",
      desc2: "Explore the portfolio using the links below.",
      home: "Home",
      projects: "View Projects",
      cases: "View Cases",
    },
    expertise: {
      heroSubtitle: "Education, certifications and technical specialties applied to real projects.",
      heroCta: "View Projects",
      summaryLabel: "Technical Summary",
      summaryText: "Full Stack Developer focused on web systems, process automation, data & BI, integrations, infrastructure and AI applied to real business operations.",
      educationTitle: "Education",
      certificationsTitle: "Certifications",
      specialtiesTitle: "Specialties",
      stackTitle: "Stack by Category",
      statusActive: "In progress",
      statusDone: "Completed",
      linkLabel: "View certificate",
    },
  },
} as const;

export type Translations = typeof translations.pt;
