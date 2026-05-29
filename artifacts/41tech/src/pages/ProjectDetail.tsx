import { useState, useEffect, useMemo } from "react";
import { useRoute, Link } from "wouter";
import {
  useGetProject,
  getGetProjectQueryKey,
  useGetSiteSettings,
  useGetProjectTechnologies,
} from "@workspace/api-client-react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  LayoutTemplate,
  Send,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useT } from "@/lib/languageContext";

export default function ProjectDetail() {
  const t = useT();
  const [, params] = useRoute("/projetos/:slug");
  const slug = params?.slug || "";

  const { data: project, isLoading, isError } = useGetProject(slug, {
    query: { enabled: !!slug, queryKey: getGetProjectQueryKey(slug) },
  });

  const { data: settings } = useGetSiteSettings();
  const { data: projectTechs } = useGetProjectTechnologies(slug, {
    query: { enabled: !!slug },
  });

  const [coverError, setCoverError] = useState(false);

  useEffect(() => {
    setCoverError(false);
  }, [slug]);

  const galleryImages = useMemo(
    () =>
      project?.galleryImages
        ?.split(/[\n,]/)
        .map((u) => u.trim())
        .filter(Boolean) ?? [],
    [project?.galleryImages]
  );

  const metrics = useMemo(
    () =>
      project?.metricsSummary
        ?.split("|")
        .map((m) => m.trim())
        .filter(Boolean) ?? [],
    [project?.metricsSummary]
  );

  useSEO({
    title: project?.title ?? t.projectDetail.seoFallbackTitle,
    description: project?.shortDescription ?? t.projectDetail.seoFallbackDesc,
    image: project?.coverImageUrl ?? project?.thumbnailUrl ?? undefined,
  });

  const coverUrl = project?.coverImageUrl || project?.thumbnailUrl || null;

  const handleContactClick = () => {
    if (settings?.whatsappUrl) {
      window.open(settings.whatsappUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = "/contato";
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-32 min-h-screen">
        <Skeleton className="h-4 w-32 mb-12 bg-[#1A1A1B]" />
        <Skeleton className="h-12 w-3/4 mb-4 bg-[#1A1A1B]" />
        <Skeleton className="h-5 w-1/2 mb-16 bg-[#1A1A1B]" />
        <Skeleton className="aspect-video w-full rounded bg-[#1A1A1B]" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-40 text-center min-h-screen flex flex-col items-center justify-center">
        <LayoutTemplate className="w-16 h-16 text-[#333336] mb-8" />
        <h1 className="text-2xl font-bold mb-6 text-[#F0F0F0]">
          {t.projectDetail.notFound}
        </h1>
        <Button
          asChild
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white rounded"
        >
          <Link href="/projetos">{t.projectDetail.backToProjects}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0E]">
      {/* ── Hero header ── */}
      <section className="pt-32 pb-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Link
            href="/projetos"
            className="inline-flex items-center text-xs font-mono text-[#555560] hover:text-[#F0F0F0] mb-10 transition-colors uppercase tracking-wider gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.projectDetail.back}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {project.category && (
                <span className="text-xs font-mono text-[#555560] border border-[#272729] px-2 py-0.5 rounded">
                  {project.category}
                </span>
              )}
              {project.featured && (
                <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 rounded">
                  {t.projectDetail.featured}
                </span>
              )}
              {project.problem && project.solution && project.result && (
                <span className="text-xs font-mono text-[#555560] border border-[#272729] px-2 py-0.5 rounded">
                  {t.projects.caseTag}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#F0F0F0] tracking-tight leading-none mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-[#888895] leading-relaxed max-w-2xl">
              {project.shortDescription}
            </p>

            {/* Quick action links */}
            {(project.demoUrl || project.repositoryUrl) && (
              <div className="flex flex-wrap gap-3 mt-8">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.projectDetail.demo}
                  </a>
                )}
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-[#272729] text-[#888895] hover:text-[#F0F0F0] hover:border-[#444448] text-sm font-semibold rounded transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    {t.projectDetail.repo}
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Cover image ── */}
      {coverUrl && !coverError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-6xl mx-auto px-6 md:px-12 py-8"
        >
          <div className="aspect-video w-full rounded border border-[#272729] overflow-hidden bg-[#131314]">
            <img
              src={coverUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={() => setCoverError(true)}
            />
          </div>
        </motion.div>
      )}

      {/* ── Documentation banner (linked case) ── */}
      {project.linkedCaseSlug && (
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-4 pb-0">
          <Link href={`/cases/${project.linkedCaseSlug}`}>
            <div className="flex items-center justify-between px-6 py-4 border border-primary/30 bg-primary/5 rounded hover:bg-primary/10 transition-colors group">
              <div>
                <p className="text-xs font-mono text-[#555560] uppercase tracking-widest mb-0.5">
                  {t.projectDetail.viewCaseLabel}
                </p>
                <p className="text-sm font-semibold text-[#F0F0F0]">
                  {t.projectDetail.viewCaseBtn}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── Article (left) ── */}
          <div className="lg:col-span-8 space-y-16">

            {/* 1. Impacto / Métricas */}
            {metrics.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-6">
                  {t.projectDetail.impact}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#272729] border border-[#272729] rounded overflow-hidden">
                  {metrics.map((metric, i) => (
                    <div key={i} className="bg-[#0D0D0E] px-6 py-5">
                      <p className="text-base font-semibold text-[#F0F0F0]">{metric}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 2. Visão Geral */}
            {project.fullDescription && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-6">
                  {t.projectDetail.overview}
                </h2>
                <p className="text-[#888895] text-base leading-relaxed whitespace-pre-wrap">
                  {project.fullDescription}
                </p>
              </motion.section>
            )}

            {/* 3. Problema Resolvido */}
            {project.problem && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-6">
                  {t.projectDetail.problem}
                </h2>
                <div className="border-l-2 border-[#272729] pl-6">
                  <p className="text-[#888895] text-base leading-relaxed whitespace-pre-wrap">
                    {project.problem}
                  </p>
                </div>
              </motion.section>
            )}

            {/* 4. Solução Implementada */}
            {project.solution && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-6">
                  {t.projectDetail.solution}
                </h2>
                <div className="border-l-2 border-primary/40 pl-6">
                  <p className="text-[#888895] text-base leading-relaxed whitespace-pre-wrap">
                    {project.solution}
                  </p>
                </div>
              </motion.section>
            )}

            {/* 5. Resultados Obtidos */}
            {project.result && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-6">
                  {t.projectDetail.result}
                </h2>
                <div className="border-l-2 border-[#272729] pl-6">
                  <p className="text-[#888895] text-base leading-relaxed whitespace-pre-wrap">
                    {project.result}
                  </p>
                </div>
              </motion.section>
            )}

            {/* 6. Stack Técnica (in main flow) */}
            {projectTechs && projectTechs.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-6">
                  {t.projectDetail.techStack}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {projectTechs.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#272729] bg-[#131314] text-sm text-[#888895] hover:text-[#F0F0F0] transition-colors"
                    >
                      {tech.iconUrl ? (
                        <img
                          src={tech.iconUrl}
                          alt={tech.name}
                          className="w-4 h-4 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : null}
                      <span className="font-mono">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 7. Galeria / Preview */}
            {galleryImages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-6">
                  {t.projectDetail.gallery}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryImages.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="aspect-video w-full rounded border border-[#272729] bg-[#131314] overflow-hidden"
                    >
                      <img
                        src={imgUrl}
                        alt={`${t.projectDetail.gallery} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* CTA */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-12 border-t border-[#272729]"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0] mb-3">
                {t.projectDetail.ctaTitle}
              </h3>
              <p className="text-[#888895] text-base mb-6 max-w-md">
                {t.projectDetail.ctaSubtitle}
              </p>
              <button
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded transition-colors"
              >
                {t.projectDetail.ctaBtn}
                <Send className="w-4 h-4" />
              </button>
            </motion.section>
          </div>

          {/* ── Sidebar (right) ── */}
          <div className="lg:col-span-4">
            <div className="border border-[#272729] rounded bg-[#131314] p-6 space-y-6 sticky top-24">
              <h3 className="font-mono text-xs text-[#555560] uppercase tracking-widest pb-4 border-b border-[#272729]">
                {t.projectDetail.sidebarTitle}
              </h3>

              {/* Status */}
              <div>
                <p className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-2">
                  {t.projectDetail.statusLabel}
                </p>
                <span className="text-sm text-[#F0F0F0] capitalize">
                  {project.status === "completed"
                    ? t.projectDetail.statusCompleted
                    : project.status === "in_progress"
                    ? t.projectDetail.statusInProgress
                    : project.status}
                </span>
              </div>

              {/* Links */}
              {(project.demoUrl || project.repositoryUrl) && (
                <div className="pt-4 border-t border-[#272729] space-y-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#888895] hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t.projectDetail.demo}
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#888895] hover:text-[#F0F0F0] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      {t.projectDetail.repo}
                    </a>
                  )}
                </div>
              )}

              {/* Linked documentation */}
              {project.linkedCaseSlug && (
                <div className="pt-4 border-t border-[#272729]">
                  <Link
                    href={`/cases/${project.linkedCaseSlug}`}
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    {t.projectDetail.viewCaseBtn}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
