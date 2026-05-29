/**
 * Admin — Especialidades
 *
 * Os dados desta página estão em arquivos estáticos TypeScript.
 * Para editar o conteúdo público, modifique o arquivo:
 *   src/data/expertiseData.ts
 *
 * Seções editáveis nesse arquivo:
 *   • educationData   — Formação acadêmica
 *   • certificationsData — Certificações
 *   • specialtiesData — Cards de especialidade
 *   • stackData       — Stack por categoria (fallback estático)
 *
 * NOTA: A seção "Stack por Categoria" na página pública consome
 *       preferencialmente as tecnologias cadastradas aqui em
 *       Admin > Tecnologias. O stackData é apenas fallback.
 *
 * Para ter CRUD completo desta página via admin:
 *   → É necessária uma migração de banco de dados (tabelas:
 *     education, certifications, specialties).
 *   → Solicite a Fase "Admin Expertise DB" para implementar.
 */

import { useMemo } from "react";
import { Link } from "wouter";
import { FileCode2, ExternalLink, Info } from "lucide-react";
import { useLanguage } from "@/lib/languageContext";
import {
  educationData,
  certificationsData,
  specialtiesData,
} from "@/data/expertiseData";

export default function ExpertiseAdmin() {
  const { lang } = useLanguage();
  const education = useMemo(() => educationData[lang], [lang]);
  const certifications = useMemo(() => certificationsData[lang], [lang]);
  const specialties = useMemo(() => specialtiesData[lang], [lang]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Especialidades</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie o conteúdo da página pública <code className="text-xs bg-muted px-1 py-0.5 rounded">/expertise</code>.
        </p>
      </div>

      {/* Aviso sobre edição */}
      <div className="flex gap-3 p-4 border border-primary/30 bg-primary/5 rounded-lg">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Dados estáticos</p>
          <p className="text-sm text-muted-foreground">
            O conteúdo desta página está em{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">src/data/expertiseData.ts</code>.
            Edite esse arquivo no código-fonte para atualizar formação, certificações e especialidades.
            A seção <strong>Stack por Categoria</strong> usa automaticamente as tecnologias
            cadastradas em <Link href="/admin-41tech/technologies" className="text-primary underline">Admin → Tecnologias</Link>.
          </p>
        </div>
      </div>

      {/* Quick link */}
      <div className="flex gap-3">
        <a
          href="/expertise"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded text-sm hover:bg-muted transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Ver página pública
        </a>
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded text-sm bg-muted text-muted-foreground">
          <FileCode2 className="w-4 h-4" />
          src/data/expertiseData.ts
        </div>
      </div>

      {/* Formação */}
      <section className="border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-card border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold">Formação ({education.length})</h2>
          <span className="text-xs text-muted-foreground">educationData</span>
        </div>
        <div className="divide-y divide-border">
          {education.map((entry, i) => (
            <div key={i} className="px-4 py-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{entry.course}</p>
                <p className="text-xs text-muted-foreground">{entry.institution} · {entry.period}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded border shrink-0 ${
                entry.status === "active"
                  ? "text-primary border-primary/30 bg-primary/5"
                  : "text-muted-foreground border-border"
              }`}>
                {entry.status === "active" ? "Em andamento" : "Concluído"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Certificações */}
      <section className="border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-card border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold">Certificações ({certifications.length})</h2>
          <span className="text-xs text-muted-foreground">certificationsData</span>
        </div>
        <div className="divide-y divide-border">
          {certifications.map((cert, i) => (
            <div key={i} className="px-4 py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.institution} · {cert.year}</p>
              </div>
              <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded shrink-0">
                {cert.status === "done" ? "Concluído" : "Em andamento"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Especialidades */}
      <section className="border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-card border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold">Especialidades ({specialties.length})</h2>
          <span className="text-xs text-muted-foreground">specialtiesData</span>
        </div>
        <div className="divide-y divide-border">
          {specialties.map((s, i) => (
            <div key={i} className="px-4 py-3">
              <p className="text-sm font-medium">{s.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{s.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {s.technologies.map((tech) => (
                  <span key={tech} className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
