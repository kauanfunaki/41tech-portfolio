/**
 * Admin — Experiência
 *
 * Os dados desta página estão em arquivos estáticos TypeScript.
 * Para editar o conteúdo público, modifique o arquivo:
 *   src/data/experienceData.ts
 *
 * Seções editáveis nesse arquivo:
 *   • timelineData      — Cargos, responsabilidades e entregas
 *   • workHighlightsData — Cards de trabalhos relevantes
 *
 * Para ter CRUD completo desta página via admin:
 *   → É necessária uma migração de banco de dados (tabelas:
 *     experience_entries, work_highlights).
 *   → Solicite a Fase "Admin Experience DB" para implementar.
 */

import { useMemo } from "react";
import { FileCode2, ExternalLink, Info, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/languageContext";
import { timelineData, workHighlightsData } from "@/data/experienceData";

export default function ExperienceAdmin() {
  const { lang } = useLanguage();
  const timeline = useMemo(() => timelineData[lang], [lang]);
  const highlights = useMemo(() => workHighlightsData[lang], [lang]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Experiência</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie o conteúdo da página pública <code className="text-xs bg-muted px-1 py-0.5 rounded">/experiencia</code>.
        </p>
      </div>

      {/* Aviso sobre edição */}
      <div className="flex gap-3 p-4 border border-primary/30 bg-primary/5 rounded-lg">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Dados estáticos</p>
          <p className="text-sm text-muted-foreground">
            O conteúdo desta página está em{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">src/data/experienceData.ts</code>.
            Edite esse arquivo no código-fonte para atualizar cargos, responsabilidades e trabalhos relevantes.
          </p>
        </div>
      </div>

      {/* Quick link */}
      <div className="flex gap-3 flex-wrap">
        <a
          href="/experiencia"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded text-sm hover:bg-muted transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Ver página pública
        </a>
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded text-sm bg-muted text-muted-foreground">
          <FileCode2 className="w-4 h-4" />
          src/data/experienceData.ts
        </div>
      </div>

      {/* Timeline */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold">Trajetória ({timeline.length} entrada{timeline.length !== 1 ? "s" : ""})</h2>
        {timeline.map((entry, i) => (
          <div key={i} className="border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-card border-b border-border flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{entry.role}</p>
                  {entry.current && (
                    <span className="text-xs text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 rounded font-mono">Atual</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{entry.company} · {entry.period}</p>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground">{entry.description}</p>

              {entry.results.length > 0 && (
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Entregas</p>
                  <ul className="space-y-1">
                    {entry.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {entry.technologies.map((tech) => (
                  <span key={tech} className="text-xs bg-muted px-2 py-0.5 rounded font-mono">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Work Highlights */}
      <section className="border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-card border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold">Trabalhos Relevantes ({highlights.length})</h2>
          <span className="text-xs text-muted-foreground">workHighlightsData</span>
        </div>
        <div className="divide-y divide-border">
          {highlights.map((item, i) => (
            <div key={i} className="px-4 py-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
