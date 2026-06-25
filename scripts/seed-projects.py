# -*- coding: utf-8 -*-
"""Seed de projetos via API de producao. Sem dependencias externas."""

import json
import urllib.request
import urllib.error
import http.cookiejar

BASE = "https://kauanfunaki.knaidev.cloud/api"
EMAIL = "admin@41tech.com.br"
PASS = "41Tech@2026"

PROJECTS = [
    {
        "title": "41-Tech-Hub",
        "slug": "41-tech-hub",
        "shortDescription": "Portal corporativo centralizado com helpdesk, RBAC e monitoramento operacional para o Grupo 41.",
        "fullDescription": "O 41-Tech-Hub e o ponto unico de entrada para todas as ferramentas, dashboards e sistemas internos da empresa. Construido com React 18 + Node.js + PostgreSQL, integra autenticacao via Microsoft Entra ID (Azure AD), sistema de helpdesk completo com SLA em horas uteis, base de conhecimento e painel de operacoes (Ops Center). O controle de acesso e baseado em setor e cargo, com overrides individuais por recurso.",
        "problem": "Ferramentas e sistemas internos dispersos: cada equipe acessava aplicacoes diferentes sem controle centralizado de acesso, identidade unificada ou visibilidade sobre o estado das ferramentas.",
        "solution": "Portal React+Node.js com RBAC granular (setor x cargo x recurso), helpdesk com formularios dinamicos por categoria, SLA em horas uteis, escalacao automatica, fluxo de aprovacao, base de conhecimento e monitoramento de saude das aplicacoes. Autenticacao via Microsoft Entra ID com fallback local.",
        "result": "Ponto unico de entrada para todas as ferramentas internas. Rastreabilidade completa de tickets com SLA, notificacoes em tempo real e auditoria de acoes.",
        "category": "Sistema Web",
        "metricsSummary": "60+ endpoints - 30+ tabelas - RBAC multidimensional - SLA em horas uteis",
        "status": "active",
        "featured": True,
    },
    {
        "title": "BI FinSight",
        "slug": "bi-finsight",
        "shortDescription": "Dashboards financeiros executivos em Power BI com analise de caixa, heatmap e agenda financeira interativa.",
        "fullDescription": "BI FinSight e a solucao de Business Intelligence financeiro do Grupo 41, conectada diretamente ao banco de dados operacional. Conta com tela de Visao Geral (saldo, resultado, inadimplencia, heatmap dos proximos 14 dias) e Agenda Financeira com calendario interativo desenvolvido em Deneb/Vega-Lite, exibindo entradas, saidas e saldo projetado por dia.",
        "problem": "Informacoes financeiras espalhadas no ERP Omie sem visao consolidada - gestores sem acesso a indicadores de caixa, inadimplencia e projecoes em tempo real.",
        "solution": "Modelo dimensional em Power BI conectado ao PostgreSQL, com medidas DAX avancadas para analise de passado e futuro, calendario customizado em Vega-Lite e horizonte de analise configuravel (7, 15, 30 dias ou personalizado).",
        "result": "Decisoes financeiras tomadas com dados atualizados em tempo real. Heatmap de entrada/saida diaria reduz o tempo de analise de horas para segundos.",
        "category": "BI e Dados",
        "metricsSummary": "183 medidas DAX - Calendario Deneb/Vega-Lite - Horizonte configuravel",
        "status": "active",
        "featured": True,
    },
    {
        "title": "Watchers BPO/BLD",
        "slug": "watchers-bpo-bld",
        "shortDescription": "8 scripts Python autonomos que monitoram pastas de rede e acionam workflows n8n para processamento automatico de documentos.",
        "fullDescription": "Sistema de automacao baseado em monitoramento continuo de pastas de rede compartilhadas. Cada watcher observa uma pasta especifica (NFs BPO, NFs BLD, contratos, recibos, folhas de pagamento), valida o arquivo recebido e aciona o workflow n8n correspondente via webhook HTTP. Apos processamento, renomeia e move o arquivo para Processados ou Erros com registro de data.",
        "problem": "Processamento manual de documentos fiscais e operacionais: operadores precisavam acompanhar pastas de rede, verificar arquivos, renomear conforme padrao e acionar processos manualmente.",
        "solution": "8 scripts Python com watchdog que monitoram pastas em tempo real, validam estabilidade e extensao, enviam para n8n via POST multipart, validam retorno e executam renomeacao/movimentacao automatica. Resultados reportados ao Ops Center do Hub.",
        "result": "Processamento automatico de centenas de documentos por mes sem intervencao manual. Rastreabilidade completa via Ops Center. Erros isolados sem bloquear o fluxo principal.",
        "category": "Automacao",
        "metricsSummary": "8 watchers - n8n integrado - Ops Center - Zero intervencao manual",
        "status": "active",
        "featured": False,
    },
    {
        "title": "ECAC Regularize Automation",
        "slug": "ecac-regularize-automation",
        "shortDescription": "RPA Python que coleta mensagens fiscais do e-CAC e Regularize/PGFN para multiplos CNPJs via certificado digital A1.",
        "fullDescription": "Automacao RPA com pywinauto e pyautogui que opera o portal e-CAC e o Regularize da Receita Federal de forma autonoma. Le uma lista de CNPJs de planilha Excel, autentica via GOV.BR com certificado digital A1, alterna o perfil ativo no e-CAC para cada CNPJ, extrai todas as mensagens da Caixa Postal e do Regularize/PGFN usando parser posicional, e persiste os dados no MySQL remoto com deduplicacao.",
        "problem": "Consulta manual de mensagens fiscais no e-CAC e Regularize para dezenas de CNPJs - processo que levava horas por dia, sujeito a erro humano e impossivel de escalar.",
        "solution": "RPA Python com pywinauto para controle da janela do certificado A1, parser posicional para extracao estruturada, ON DUPLICATE KEY UPDATE para idempotencia e logout automatico ao final de cada sessao.",
        "result": "Processo que levava horas reduzido a minutos. Execucao autonoma com log completo. Base historica de mensagens fiscais disponivel via Caixa Postal 41.",
        "category": "Automacao",
        "metricsSummary": "Multi-CNPJ - Certificado A1 - MySQL - Parser posicional - Deduplicacao",
        "status": "active",
        "featured": True,
    },
    {
        "title": "Caixa Postal 41",
        "slug": "caixa-postal-41",
        "shortDescription": "Portal FastAPI para visualizacao e gestao das mensagens fiscais coletadas do e-CAC e Regularize/PGFN.",
        "fullDescription": "App FastAPI containerizada no EasyPanel que expoe as mensagens fiscais coletadas pela automacao ECAC em uma interface web clara. Exibe contadores por fonte (e-CAC / Regularize), listagem com filtros, cards de estatistica e envia relatorios por e-mail com template HTML responsivo.",
        "problem": "Mensagens fiscais coletadas pela automacao ficavam no banco MySQL sem interface de consulta - a equipe fiscal precisava de acesso rapido as pendencias por CNPJ.",
        "solution": "App FastAPI containerizada com Docker no EasyPanel, servida na porta 80, com dashboard de mensagens segmentado por fonte, cards de contagem, tabelas com linhas zebradas e envio de relatorio HTML por e-mail.",
        "result": "Equipe fiscal com acesso imediato a todas as mensagens fiscais organizadas por CNPJ e fonte. Relatorio automatico por e-mail elimina consultas manuais ao banco.",
        "category": "Sistema Web",
        "metricsSummary": "FastAPI - Docker - EasyPanel - E-mail automatico - e-CAC + Regularize",
        "status": "active",
        "featured": False,
    },
    {
        "title": "Frota-Link",
        "slug": "frota-link",
        "shortDescription": "SaaS de gestao de transportadoras migrado de Supabase para infraestrutura propria com GoTrue, PostgREST e MinIO.",
        "fullDescription": "Frota-Link e um SaaS de gestao de transportadoras originalmente hospedado no Supabase. O projeto envolveu planejar e executar a migracao completa para VPS Hostinger com PostgreSQL 17, GoTrue self-hosted para autenticacao, PostgREST como camada de API e MinIO como storage S3-compatible, mantendo o frontend React intacto com apenas troca da URL do Supabase.",
        "problem": "Aplicacao SaaS com 45+ Edge Functions no Supabase free tier: limitacoes de performance, custo crescente e dependencia total de plataforma externa.",
        "solution": "Migracao em 9 fases para VPS propria: PostgreSQL 17, GoTrue para autenticacao JWT-compativel, PostgREST mapeando as mesmas rotas REST, MinIO para buckets de arquivos e API Node.js (Fastify) substituindo Edge Functions. Frontend usa @supabase/supabase-js sem alteracao.",
        "result": "Infraestrutura propria com controle total sobre banco, autenticacao e storage. Eliminacao da dependencia e limitacoes do free tier. Frontend sem reescrita.",
        "category": "Sistema Web",
        "metricsSummary": "PostgreSQL 17 - GoTrue - PostgREST - MinIO - 45+ Edge Functions",
        "status": "active",
        "featured": True,
    },
    {
        "title": "DevPulse",
        "slug": "devpulse",
        "shortDescription": "App de produtividade que rastreia tempo de codigo por projeto via extensao VS Code, com dashboard React e integracao GitHub.",
        "fullDescription": "DevPulse e uma ferramenta pessoal de monitoramento de produtividade. Composta por uma extensao VS Code que envia heartbeats a cada mudanca de arquivo, uma API Node.js que consolida e persiste os dados, e um dashboard React com estatisticas diarias, semanais e por projeto. Integra com a API do GitHub para correlacionar commits e PRs ao tempo investido.",
        "problem": "Sem visibilidade objetiva sobre tempo gasto por projeto e produtividade diaria - estimativas imprecisas, sem dados historicos e sem correlacao entre tempo de codigo e entregas.",
        "solution": "Monorepo npm workspaces com extensao VS Code (heartbeats por evento de arquivo), API Express+PostgreSQL que consolida sessoes por projeto e dashboard React com horas de codigo, tempo de tela ativo e integracao GitHub.",
        "result": "Rastreamento automatico e preciso de horas de codigo por projeto. Correlacao visual entre tempo investido e commits/PRs entregues.",
        "category": "Ferramenta",
        "metricsSummary": "Extensao VS Code - API Node.js - Dashboard React - GitHub integration",
        "status": "active",
        "featured": False,
    },
]


def make_opener():
    jar = http.cookiejar.CookieJar()
    return urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))


def post(opener, path, data):
    body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(
        BASE + path,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    resp = opener.open(req)
    return json.loads(resp.read().decode("utf-8"))


def main():
    opener = make_opener()

    print("Autenticando...")
    try:
        login = post(opener, "/auth/login", {"email": EMAIL, "password": PASS})
        print(f"  Logado como: {login['user']['email']}")
    except urllib.error.HTTPError as e:
        print(f"  Falha no login: {e.code} {e.reason}")
        return

    print("\nInserindo projetos...")
    ok = skip = fail = 0

    for p in PROJECTS:
        try:
            post(opener, "/projects", p)
            print(f"  v  {p['slug']}")
            ok += 1
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            if e.code in (409, 422):
                print(f"  -  {p['slug']} -- ja existe")
                skip += 1
            elif e.code == 400:
                print(f"  !  {p['slug']} -- dados invalidos: {body[:200]}")
                fail += 1
            else:
                print(f"  x  {p['slug']} -- erro {e.code}: {body[:200]}")
                fail += 1
        except Exception as e:
            print(f"  x  {p['slug']} -- {e}")
            fail += 1

    print(f"\nConcluido: {ok} inseridos - {skip} ja existiam - {fail} erros")


if __name__ == "__main__":
    main()
