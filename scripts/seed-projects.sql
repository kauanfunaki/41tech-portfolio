-- Seed: Projetos portfólio 41 Tech
-- Uso: psql "postgresql://portfolio_user:41Tech@2026@vps.41tech.cloud:3308/portfolio_db" -f scripts/seed-projects.sql

INSERT INTO projects (title, slug, short_description, full_description, problem, solution, result, category, metrics_summary, status, featured)
VALUES
(
  '41-Tech-Hub',
  '41-tech-hub',
  'Portal corporativo centralizado com helpdesk, RBAC e monitoramento operacional para o Grupo 41.',
  'O 41-Tech-Hub é o ponto único de entrada para todas as ferramentas, dashboards e sistemas internos da empresa. Construído com React 18 + Node.js + PostgreSQL, integra autenticação via Microsoft Entra ID (Azure AD), sistema de helpdesk completo com SLA em horas úteis, base de conhecimento e painel de operações (Ops Center). O controle de acesso é baseado em setor e cargo, com overrides individuais por recurso.',
  'Ferramentas e sistemas internos dispersos: cada equipe acessava aplicações diferentes sem controle centralizado de acesso, identidade unificada ou visibilidade sobre o estado das ferramentas.',
  'Portal React+Node.js com RBAC granular (setor × cargo × recurso), helpdesk com formulários dinâmicos por categoria, SLA em horas úteis, escalação automática, fluxo de aprovação, base de conhecimento e monitoramento de saúde das aplicações. Autenticação via Microsoft Entra ID com fallback local.',
  'Ponto único de entrada para todas as ferramentas internas. Rastreabilidade completa de tickets com SLA, notificações em tempo real e auditoria de ações.',
  'Sistema Web',
  '60+ endpoints · 30+ tabelas · RBAC multidimensional · SLA em horas úteis',
  'active',
  true
),
(
  'BI FinSight',
  'bi-finsight',
  'Dashboards financeiros executivos em Power BI com análise de caixa, heatmap e agenda financeira interativa.',
  'BI FinSight é a solução de Business Intelligence financeiro do Grupo 41, conectada diretamente ao banco de dados operacional. Conta com tela de Visão Geral (saldo, resultado, inadimplência, heatmap dos próximos 14 dias) e Agenda Financeira com calendário interativo desenvolvido em Deneb/Vega-Lite, exibindo entradas, saídas e saldo projetado por dia.',
  'Informações financeiras espalhadas no ERP Omie sem visão consolidada — gestores sem acesso a indicadores de caixa, inadimplência e projeções em tempo real.',
  'Modelo dimensional em Power BI conectado ao PostgreSQL, com medidas DAX avançadas para análise de passado e futuro, calendário customizado em Vega-Lite e horizonte de análise configurável (7, 15, 30 dias ou personalizado).',
  'Decisões financeiras tomadas com dados atualizados em tempo real. Heatmap de entrada/saída diária reduz o tempo de análise de horas para segundos.',
  'BI & Dados',
  '183 medidas DAX · Calendário Deneb/Vega-Lite · Horizonte configurável',
  'active',
  true
),
(
  'Watchers BPO/BLD',
  'watchers-bpo-bld',
  '8 scripts Python autônomos que monitoram pastas de rede e acionam workflows n8n para processamento automático de documentos.',
  'Sistema de automação baseado em monitoramento contínuo de pastas de rede compartilhadas. Cada watcher observa uma pasta específica (NFs BPO, NFs BLD, contratos de aluguel, recibos, folhas de pagamento), valida o arquivo recebido e aciona o workflow n8n correspondente via webhook HTTP. Após processamento, renomeia e move o arquivo para Processados ou Erros com registro de data.',
  'Processamento manual de documentos fiscais e operacionais: operadores precisavam acompanhar pastas de rede, verificar arquivos, renomear conforme padrão e acionar processos manualmente.',
  '8 scripts Python com watchdog que monitoram pastas em tempo real, validam estabilidade e extensão do arquivo, enviam para n8n via POST multipart, validam retorno e executam renomeação/movimentação automática. Resultados reportados ao Ops Center do Hub.',
  'Processamento automático de centenas de documentos por mês sem intervenção manual. Rastreabilidade completa via Ops Center. Erros isolados sem bloquear o fluxo principal.',
  'Automação',
  '8 watchers · n8n integrado · Ops Center · Zero intervenção manual',
  'active',
  false
),
(
  'ECAC Regularize Automation',
  'ecac-regularize-automation',
  'RPA Python que coleta mensagens fiscais do e-CAC e Regularize/PGFN para múltiplos CNPJs via certificado digital A1.',
  'Automação RPA com pywinauto e pyautogui que opera o portal e-CAC e o Regularize da Receita Federal de forma autônoma. Lê uma lista de CNPJs de planilha Excel, autentica via GOV.BR com certificado digital A1, alterna o perfil ativo no e-CAC para cada CNPJ, extrai todas as mensagens da Caixa Postal e do Regularize/PGFN usando parser posicional, e persiste os dados no MySQL remoto com deduplicação.',
  'Consulta manual de mensagens fiscais no e-CAC e Regularize para dezenas de CNPJs — processo que levava horas por dia, sujeito a erro humano e impossível de escalar.',
  'RPA Python com pywinauto para controle da janela do certificado A1, parser posicional para extração estruturada, ON DUPLICATE KEY UPDATE para idempotência e logout automático ao final de cada sessão.',
  'Processo que levava horas reduzido a minutos. Execução autônoma com log completo. Base histórica de mensagens fiscais disponível via Caixa Postal 41.',
  'Automação',
  'Multi-CNPJ · Certificado A1 · MySQL · Parser posicional · Deduplicação',
  'active',
  true
),
(
  'Caixa Postal 41',
  'caixa-postal-41',
  'Portal FastAPI para visualização e gestão das mensagens fiscais coletadas do e-CAC e Regularize/PGFN.',
  'App FastAPI containerizada no EasyPanel que expõe as mensagens fiscais coletadas pela automação ECAC em uma interface web clara. Exibe contadores por fonte (e-CAC / Regularize), listagem com filtros, cards de estatística e envia relatórios por e-mail com template HTML responsivo.',
  'Mensagens fiscais coletadas pela automação ficavam no banco MySQL sem interface de consulta — a equipe fiscal precisava de acesso rápido às pendências por CNPJ.',
  'App FastAPI containerizada com Docker no EasyPanel, servida na porta 80, com dashboard de mensagens segmentado por fonte, cards de contagem, tabelas com linhas zebradas e envio de relatório HTML por e-mail.',
  'Equipe fiscal com acesso imediato a todas as mensagens fiscais organizadas por CNPJ e fonte. Relatório automático por e-mail elimina consultas manuais ao banco.',
  'Sistema Web',
  'FastAPI · Docker · EasyPanel · E-mail automático · e-CAC + Regularize',
  'active',
  false
),
(
  'Frota-Link',
  'frota-link',
  'SaaS de gestão de transportadoras migrado de Supabase para infraestrutura própria com GoTrue, PostgREST e MinIO.',
  'Frota-Link é um SaaS de gestão de transportadoras originalmente hospedado no Supabase. O projeto envolveu planejar e executar a migração completa para VPS Hostinger com PostgreSQL 17, GoTrue self-hosted para autenticação, PostgREST como camada de API de banco e MinIO como storage S3-compatible — mantendo o frontend React intacto com apenas troca da URL do Supabase.',
  'Aplicação SaaS com 45+ Edge Functions no Supabase free tier: limitações de performance, custo crescente e dependência total de plataforma externa.',
  'Migração em 9 fases para VPS própria: PostgreSQL 17, GoTrue para autenticação JWT-compatível, PostgREST mapeando as mesmas rotas REST, MinIO para buckets de arquivos e API Node.js (Fastify) substituindo Edge Functions. Frontend usa @supabase/supabase-js sem alteração.',
  'Infraestrutura própria com controle total sobre banco, autenticação e storage. Eliminação da dependência e limitações do free tier. Frontend sem reescrita.',
  'Sistema Web',
  'PostgreSQL 17 · GoTrue · PostgREST · MinIO · 45+ Edge Functions',
  'active',
  true
),
(
  'DevPulse',
  'devpulse',
  'App de produtividade que rastreia tempo de código por projeto via extensão VS Code, com dashboard React e integração GitHub.',
  'DevPulse é uma ferramenta pessoal de monitoramento de produtividade para desenvolvedores. Composta por uma extensão VS Code que envia heartbeats a cada mudança de arquivo, uma API Node.js que consolida e persiste os dados, e um dashboard React com estatísticas diárias, semanais e por projeto. Integra com a API do GitHub para correlacionar commits e PRs ao tempo investido.',
  'Sem visibilidade objetiva sobre tempo gasto por projeto e produtividade diária — estimativas imprecisas, sem dados históricos e sem correlação entre tempo de código e entregas.',
  'Monorepo npm workspaces com extensão VS Code (heartbeats por evento de arquivo), API Express+PostgreSQL que consolida sessões por projeto e dashboard React com horas de código, tempo de tela ativo e integração GitHub.',
  'Rastreamento automático e preciso de horas de código por projeto. Correlação visual entre tempo investido e commits/PRs entregues.',
  'Ferramenta',
  'Extensão VS Code · API Node.js · Dashboard React · GitHub integration',
  'active',
  false
)
ON CONFLICT (slug) DO NOTHING;

SELECT title, slug, featured, category FROM projects ORDER BY created_at;
