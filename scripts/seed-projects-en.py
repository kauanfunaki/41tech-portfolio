# -*- coding: utf-8 -*-
"""Adiciona traducoes EN nos projetos via API. Sem dependencias externas."""

import json
import urllib.request
import urllib.error
import http.cookiejar

BASE = "https://kauanfunaki.knaidev.cloud/api"
EMAIL = "admin@41tech.com.br"
PASS = "41Tech@2026"

# Somente os campos EN + campos obrigatorios para o PUT (title, slug, shortDescription, status, featured)
# O PUT substitui o projeto inteiro, entao precisamos enviar todos os campos.
# Buscamos o projeto atual e fazemos merge com os campos EN.

EN_TRANSLATIONS = {
    "41-tech-hub": {
        "shortDescriptionEn": "Centralized corporate portal with helpdesk, RBAC and operational monitoring for Grupo 41.",
        "fullDescriptionEn": "41-Tech-Hub is the single entry point for all internal tools, dashboards and systems. Built with React 18 + Node.js + PostgreSQL, it integrates Microsoft Entra ID (Azure AD) authentication, a full helpdesk system with SLA tracked in business hours, a knowledge base and an Operations Center (Ops Center). Access control is based on department and role, with individual overrides per resource.",
        "problemEn": "Dispersed internal tools and systems: each team accessed different applications with no centralized access control, unified identity or visibility into the health of internal tools.",
        "solutionEn": "React+Node.js portal with granular RBAC (department x role x resource), helpdesk with dynamic forms by category, business-hours SLA, automatic escalation, approval workflow, knowledge base and application health monitoring. Microsoft Entra ID authentication with local fallback.",
        "resultEn": "Single entry point for all internal tools. Full ticket traceability with SLA, real-time notifications and action audit logs.",
    },
    "bi-finsight": {
        "shortDescriptionEn": "Executive financial dashboards in Power BI with cash flow analysis, heatmap and interactive financial calendar.",
        "fullDescriptionEn": "BI FinSight is Grupo 41's financial Business Intelligence solution, connected directly to the operational database. It features an Overview screen (balance, result, overdue receivables, 14-day heatmap) and a Financial Calendar with an interactive calendar built in Deneb/Vega-Lite, showing daily inflows, outflows and projected balance.",
        "problemEn": "Financial information scattered across the Omie ERP with no consolidated view - managers had no access to real-time cash flow, overdue receivables and projection indicators.",
        "solutionEn": "Dimensional model in Power BI connected to PostgreSQL, with advanced DAX measures for past and future analysis, custom Vega-Lite calendar and configurable analysis horizon (7, 15, 30 days or custom).",
        "resultEn": "Financial decisions made with real-time data. Daily inflow/outflow heatmap reduces analysis time from hours to seconds.",
    },
    "watchers-bpo-bld": {
        "shortDescriptionEn": "8 autonomous Python scripts that monitor network folders and trigger n8n workflows for automatic document processing.",
        "fullDescriptionEn": "Automation system based on continuous monitoring of shared network folders. Each watcher observes a specific folder (BPO invoices, BLD invoices, contracts, receipts, payroll), validates the received file and triggers the corresponding n8n workflow via HTTP webhook. After processing, it renames and moves the file to Processed or Errors with a date stamp.",
        "problemEn": "Manual processing of fiscal and operational documents: operators had to watch network folders, check files, rename according to a standard and trigger processes manually.",
        "solutionEn": "8 Python scripts with watchdog that monitor folders in real time, validate file stability and extension, send to n8n via POST multipart, validate the response and perform automatic renaming and moving. Results reported to the Hub Ops Center.",
        "resultEn": "Automatic processing of hundreds of documents per month with no manual intervention. Full traceability via Ops Center. Errors isolated without blocking the main flow.",
    },
    "ecac-regularize-automation": {
        "shortDescriptionEn": "Python RPA that collects fiscal messages from e-CAC and Regularize/PGFN for multiple CNPJs using a digital A1 certificate.",
        "fullDescriptionEn": "RPA automation with pywinauto and pyautogui that autonomously operates the e-CAC portal and the Federal Revenue Regularize system. It reads a list of CNPJs from an Excel spreadsheet, authenticates via GOV.BR with a digital A1 certificate, switches the active profile in e-CAC for each CNPJ, extracts all Mailbox and Regularize/PGFN messages using a positional parser, and persists the data in a remote MySQL database with deduplication.",
        "problemEn": "Manual consultation of fiscal messages in e-CAC and Regularize for dozens of CNPJs - a process that took hours per day, prone to human error and impossible to scale.",
        "solutionEn": "Python RPA with pywinauto for A1 certificate window control, positional parser for structured extraction, ON DUPLICATE KEY UPDATE for idempotency and automatic logout at the end of each session.",
        "resultEn": "Process that took hours reduced to minutes. Autonomous execution with full log. Historical database of fiscal messages available via Caixa Postal 41.",
    },
    "caixa-postal-41": {
        "shortDescriptionEn": "FastAPI portal for viewing and managing fiscal messages collected from e-CAC and Regularize/PGFN.",
        "fullDescriptionEn": "FastAPI app containerized in EasyPanel that exposes the fiscal messages collected by the ECAC automation in a clear web interface. Displays counters by source (e-CAC / Regularize), listing with filters, statistics cards and sends HTML email reports.",
        "problemEn": "Fiscal messages collected by the automation remained in the MySQL database with no query interface - the tax team needed quick access to pending items by CNPJ.",
        "solutionEn": "FastAPI app containerized with Docker in EasyPanel, served on port 80, with a message dashboard segmented by source, count cards, striped tables and HTML email report delivery.",
        "resultEn": "Tax team with immediate access to all fiscal messages organized by CNPJ and source. Automatic email reports eliminate manual database queries.",
    },
    "frota-link": {
        "shortDescriptionEn": "Fleet management SaaS migrated from Supabase to own infrastructure with GoTrue, PostgREST and MinIO.",
        "fullDescriptionEn": "Frota-Link is a fleet management SaaS originally hosted on Supabase. The project involved planning and executing the full migration to a Hostinger VPS with PostgreSQL 17, self-hosted GoTrue for authentication, PostgREST as the API layer and MinIO as S3-compatible storage - keeping the React frontend intact with only the Supabase URL changed.",
        "problemEn": "SaaS application with 45+ Edge Functions on the Supabase free tier: performance limitations, growing costs and total dependency on an external platform.",
        "solutionEn": "9-phase migration to own VPS: PostgreSQL 17, GoTrue for JWT-compatible authentication, PostgREST mapping the same REST routes, MinIO for file buckets and Node.js API (Fastify) replacing Edge Functions. Frontend uses @supabase/supabase-js without changes.",
        "resultEn": "Own infrastructure with full control over the database, authentication and storage. Elimination of free tier dependency and limitations. Frontend without rewrite.",
    },
    "devpulse": {
        "shortDescriptionEn": "Productivity app that tracks coding time per project via a VS Code extension, with a React dashboard and GitHub integration.",
        "fullDescriptionEn": "DevPulse is a personal productivity monitoring tool. Composed of a VS Code extension that sends heartbeats on every file change, a Node.js API that consolidates and persists the data, and a React dashboard with daily, weekly and per-project statistics. Integrates with the GitHub API to correlate commits and PRs with time invested.",
        "problemEn": "No objective visibility into time spent per project and daily productivity - inaccurate estimates, no historical data and no correlation between coding time and deliverables.",
        "solutionEn": "npm workspaces monorepo with a VS Code extension (heartbeats per file event), Express+PostgreSQL API that consolidates sessions per project and a React dashboard with coding hours, active screen time and GitHub integration.",
        "resultEn": "Automatic and precise tracking of coding hours per project. Visual correlation between time invested and commits/PRs delivered.",
    },
}


def make_opener():
    jar = http.cookiejar.CookieJar()
    return urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))


def request(opener, method, path, data=None):
    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(
        BASE + path,
        data=body,
        headers={"Content-Type": "application/json"},
        method=method,
    )
    resp = opener.open(req)
    return json.loads(resp.read().decode("utf-8"))


def main():
    opener = make_opener()

    print("Autenticando...")
    try:
        login = request(opener, "POST", "/auth/login", {"email": EMAIL, "password": PASS})
        print(f"  Logado como: {login['user']['email']}")
    except urllib.error.HTTPError as e:
        print(f"  Falha no login: {e.code}")
        return

    print("\nBuscando projetos atuais...")
    projects_list = request(opener, "GET", "/projects")
    projects_by_slug = {p["slug"]: p for p in projects_list}

    print(f"  {len(projects_list)} projetos encontrados\n")
    print("Atualizando traducoes EN...")

    ok = fail = skip = 0
    for slug, en_fields in EN_TRANSLATIONS.items():
        existing = projects_by_slug.get(slug)
        if not existing:
            print(f"  ?  {slug} -- nao encontrado, pulando")
            skip += 1
            continue

        # Merge: keep all existing fields, add/overwrite EN fields
        payload = {**existing, **en_fields}
        # Remove read-only fields
        for key in ("id", "createdAt", "updatedAt"):
            payload.pop(key, None)

        try:
            request(opener, "PUT", f"/projects/{slug}", payload)
            print(f"  v  {slug}")
            ok += 1
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            print(f"  x  {slug} -- erro {e.code}: {body[:200]}")
            fail += 1

    print(f"\nConcluido: {ok} atualizados - {skip} pulados - {fail} erros")


if __name__ == "__main__":
    main()
