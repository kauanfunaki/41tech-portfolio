import { useMemo } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Globe,
  Workflow,
  BarChart2,
  Cable,
  Server,
  Brain,
  Briefcase,
  CheckCircle2,
  Mail,
  Linkedin,
} from "lucide-react";

/** Ícone oficial do WhatsApp como SVG inline */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
import { Button } from "@/components/ui/button";
import {
  useListProjects,
  useGetSiteSettings,
  useListTechnologies,
} from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { inferCategory } from "@/lib/inferCategory";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/lib/languageContext";
import { useToast } from "@/hooks/use-toast";
import { specialtiesData } from "@/data/expertiseData";
import { timelineData } from "@/data/experienceData";

// ── Specialty icons map ──────────────────────────────────────────────────────
const SPECIALTY_ICONS: Record<string, React.ElementType> = {
  Globe, Workflow, BarChart2, Cable, Server, Brain,
};

// ── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const stagger = (delay = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

// ── Static fallback tech list (shown if DB is empty) ────────────────────────
const FALLBACK_TECHS = [
  "React", "TypeScript", "Node.js", "PostgreSQL", "Power BI",
  "n8n", "Docker", "Tailwind CSS", "Vite", "Drizzle ORM",
  "GitHub Actions", "EasyPanel", "LLMs", "REST APIs", "Figma",
];

export default function Home() {
  const { lang, t } = useLanguage();
  const { toast } = useToast();

  useSEO({
    title: "Kauan Funaki | Dev Full Stack B2B",
    description: t.home.subheading,
  });

  const { data: allProjects } = useListProjects();
  const { data: settings } = useGetSiteSettings();
  const { data: technologies } = useListTechnologies();

  // ── Derived data ─────────────────────────────────────────────────────────
  const featuredProject = useMemo(
    () => allProjects?.find((p) => p.featured) ?? allProjects?.[0] ?? null,
    [allProjects]
  );

  const previewProjects = useMemo(() => {
    if (!allProjects) return [];
    const withoutFeatured = allProjects.filter((p) => p.id !== featuredProject?.id);
    return (withoutFeatured.length >= 3 ? withoutFeatured : allProjects).slice(0, 3);
  }, [allProjects, featuredProject]);

  // Tech items include iconUrl from admin (already in API response)
  const techItems = useMemo(() => {
    const items = technologies?.length
      ? technologies.map((t) => ({ name: t.name, iconUrl: t.iconUrl ?? null }))
      : FALLBACK_TECHS.map((name) => ({ name, iconUrl: null }));
    // Duplicate for seamless marquee loop
    return [...items, ...items];
  }, [technologies]);

  const specialties = useMemo(() => specialtiesData[lang].slice(0, 5), [lang]);
  const currentRole = useMemo(() => timelineData[lang][0], [lang]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const openWhatsApp = () => {
    if (settings?.whatsappUrl) {
      const w = window.open(settings.whatsappUrl, "_blank", "noopener,noreferrer");
      if (!w) toast({ title: t.home.popupBlockedTitle, description: t.home.popupBlockedDesc, variant: "destructive" });
    } else {
      toast({ title: t.home.contactUnavailableTitle, description: t.home.contactUnavailableDesc, variant: "destructive" });
    }
  };

  const hasVideo = !!(settings?.heroVideoEnabled && settings?.heroVideoUrl);
  const hasHeroMedia = hasVideo || !!settings?.heroFallbackImageUrl;

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A]">

      {/* ══════════════════════════════════════════════
          01 — HERO
      ══════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 min-h-[92vh] flex items-center overflow-hidden">

        {/* ── Background media (absolute, fills entire hero) ── */}
        {hasHeroMedia && (
          <>
            {hasVideo ? (
              <video
                src={settings!.heroVideoUrl!}
                autoPlay
                muted
                loop
                playsInline
                poster={settings?.heroFallbackImageUrl ?? undefined}
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              />
            ) : (
              <img
                src={settings!.heroFallbackImageUrl!}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Overlay: gradient left-to-right so text stays legible on the left */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.72) 45%, rgba(15,23,42,0.30) 100%)",
              }}
            />
            {/* Bottom fade so the hero merges cleanly into the next section */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, #0F172A)" }}
            />
          </>
        )}

        {/* Subtle blue radial when no media (original look) */}
        {!hasHeroMedia && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(34, 211, 238, 0.07) 0%, transparent 65%)",
            }}
          />
        )}

        {/* ── Foreground content ── */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger(0.1)} className="max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
              <span className="section-num">{t.home.badge}</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-bold leading-[0.9] tracking-tight text-[#F4F4F4] mb-8"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              {t.home.headline1}
              <br />
              <span className="text-primary">{t.home.headline2}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-[#C0C0C8] max-w-lg mb-12 leading-relaxed">
              {t.home.subheading}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button
                size="lg"
                asChild
                className="h-12 px-7 text-sm font-semibold bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] text-primary-foreground border-0 rounded transition-all hover:shadow-[0_0_20px_rgba(34, 211, 238, 0.35)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link href="/projetos">
                  {settings?.ctaPrimaryLabel || t.home.ctaPrimary}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={openWhatsApp}
                className="h-12 px-7 text-sm font-semibold border-white/20 text-[#F4F4F4] hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] rounded backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.home.contactCtaBtn}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3 text-[#64748B]"
          >
            <div className="w-8 h-px bg-[#334155]" />
            <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02 — MÉTRICAS RÁPIDAS
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#334155]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Mobile: 2×2 grid with border-b + border-r; Desktop: 4×1 row */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {t.home.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`px-5 md:px-6 py-8 hover:bg-[#1E293B] transition-colors
                  ${i % 2 === 0 ? "border-r border-[#334155]" : ""}
                  ${i < 2 ? "border-b md:border-b-0 border-[#334155]" : ""}
                  md:border-r md:last:border-r-0 border-[#334155]
                  ${i === 0 ? "md:pl-0" : ""}
                  ${i === 3 ? "md:pr-0" : ""}
                `}
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-[#F4F4F4] mb-1">{m.value}</p>
                <p className="text-xs font-mono text-[#64748B] leading-snug">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03 — TECH MARQUEE
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#334155] py-6 overflow-hidden">
        <div className="flex items-center gap-6 mb-4 max-w-6xl mx-auto px-6 md:px-12">
          <span className="section-num shrink-0">// {t.home.techMarqueeLabel}</span>
        </div>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee w-max">
            {techItems.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center text-xs font-mono text-[#64748B] whitespace-nowrap"
              >
                {tech.iconUrl && (
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    className="w-3.5 h-3.5 object-contain shrink-0 mr-1.5"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                )}
                {tech.name}
                <span className="mx-3 text-[#475569] select-none" aria-hidden="true">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04 — EXPERTISE PREVIEW
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#334155] py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger()}>
            <motion.div variants={fadeUp} className="flex items-baseline justify-between gap-6 mb-12 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-5 h-px bg-primary shrink-0" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F4F4F4]">
                  {t.home.expertisePreviewLabel}
                </h2>
              </div>
              <Link
                href="/expertise"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748B] hover:text-primary transition-colors"
              >
                {t.home.expertisePreviewCta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialties.map((s, i) => {
                const Icon = SPECIALTY_ICONS[s.icon] ?? Globe;
                const featured = i === 0;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className={`card-interactive flex flex-col gap-3 ${
                      featured
                        ? "p-6 lg:p-8 min-h-[180px] lg:min-h-[220px] lg:col-span-2"
                        : "p-6 min-h-[180px]"
                    }`}
                  >
                    <Icon className={`text-primary ${featured ? "w-5 h-5" : "w-4 h-4"}`} />
                    <h3 className={`font-semibold text-[#F4F4F4] ${featured ? "text-base" : "text-sm"}`}>
                      {s.title}
                    </h3>
                    <p className={`text-xs text-[#94A3B8] leading-relaxed ${featured ? "" : "line-clamp-2"}`}>
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                      {s.technologies.slice(0, featured ? 5 : 3).map((tech) => (
                        <span key={tech} className="text-xs font-mono text-[#64748B] border border-[#334155] px-1.5 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          05 — PROJETO EM DESTAQUE
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#334155] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger()}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
              <div className="w-5 h-px bg-primary shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F4F4F4]">
                {t.home.featuredLabel}
              </h2>
            </motion.div>

            {featuredProject ? (
              <motion.div variants={fadeUp}>
                <Link href={`/projetos/${featuredProject.slug}`}>
                  <div className="group card-interactive grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 p-8 focus-ring">
                    {/* Info */}
                    <div className="flex flex-col gap-5 justify-center">
                      <div className="flex flex-wrap items-center gap-2">
                        {featuredProject.category && (
                          <span className="text-xs font-mono text-[#64748B] border border-[#334155] px-2 py-0.5 rounded">
                            {featuredProject.category}
                          </span>
                        )}
                        {featuredProject.featured && (
                          <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 rounded">
                            {t.home.featured}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F4F4F4] group-hover:text-primary transition-colors leading-tight">
                        {featuredProject.title}
                      </h3>

                      <p className="text-sm text-[#94A3B8] leading-relaxed max-w-lg">
                        {featuredProject.shortDescription}
                      </p>

                      {featuredProject.metricsSummary && (
                        <div className="flex flex-wrap gap-2">
                          {featuredProject.metricsSummary.split("|").map((m, i) => (
                            <span key={i} className="text-xs font-mono text-primary/80 border border-primary/20 bg-primary/5 px-2.5 py-1 rounded">
                              {m.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm font-medium text-[#64748B] group-hover:text-primary transition-colors mt-2">
                        {t.home.viewProject}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Thumbnail */}
                    {(featuredProject.thumbnailUrl || featuredProject.coverImageUrl) && (
                      <div className="aspect-video rounded border border-[#334155] overflow-hidden bg-[#0F172A] shrink-0">
                        <img
                          src={featuredProject.thumbnailUrl || featuredProject.coverImageUrl!}
                          alt={featuredProject.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-[1.05] transition-all duration-300"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                variants={fadeUp}
                className="p-12 border border-dashed border-[#334155] rounded text-center"
              >
                <p className="font-mono text-xs text-[#64748B] mb-2">{t.home.featuredEmptyTitle}</p>
                <p className="text-sm text-[#94A3B8]">{t.home.featuredEmptyDesc}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          06 — PREVIEW DE PROJETOS
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#334155] py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger()}>
            <motion.div variants={fadeUp} className="flex items-baseline justify-between gap-6 mb-12 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-5 h-px bg-primary shrink-0" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F4F4F4]">
                  {t.home.projectsPreviewLabel}
                </h2>
              </div>
              <Link
                href="/projetos"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748B] hover:text-primary transition-colors"
              >
                {t.home.projectsPreviewCta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {previewProjects.length > 0 ? (
              <div>
                {previewProjects.map((project, i) => {
                  const cardImg = project.thumbnailUrl || project.coverImageUrl || null;
                  const category = project.category || inferCategory(project.title);
                  return (
                    <motion.div key={project.id} variants={fadeUp}>
                      <Link href={`/projetos/${project.slug}`}>
                        <div className="project-row group">
                          <span className="font-mono text-xs text-[#64748B] w-8 shrink-0 select-none">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="w-14 h-14 rounded border border-[#334155] bg-[#1E293B] shrink-0 overflow-hidden">
                            {cardImg ? (
                              <img src={cardImg} alt={project.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#2D3E52]">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <h3 className="text-sm font-semibold text-[#F4F4F4] group-hover:text-primary transition-colors">{project.title}</h3>
                              <span className="text-xs font-mono text-[#64748B] border border-[#334155] px-1.5 py-0.5 rounded">{category}</span>
                            </div>
                            <p className="text-xs text-[#94A3B8] line-clamp-1">{project.shortDescription}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div variants={fadeUp} className="py-16 border-t border-[#334155] text-center">
                <p className="text-sm text-[#64748B] font-mono">{t.home.featuredEmptyTitle}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          07 — EXPERIENCE PREVIEW
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#334155] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger()}>
            <motion.div variants={fadeUp} className="flex items-baseline justify-between gap-6 mb-12 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-5 h-px bg-primary shrink-0" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F4F4F4]">
                  {t.home.experiencePreviewLabel}
                </h2>
              </div>
              <Link
                href="/experiencia"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748B] hover:text-primary transition-colors"
              >
                {t.home.experiencePreviewCta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {currentRole && (
              <motion.div
                variants={fadeUp}
                className="card-interactive grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16 p-8"
              >
                {/* Meta */}
                <div className="space-y-2">
                  {currentRole.current && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
                      {lang === "pt" ? "Atual" : "Current"}
                    </span>
                  )}
                  <p className="text-xs font-mono text-[#64748B]">{currentRole.period}</p>
                  <p className="text-xs font-mono text-[#94A3B8] font-medium">{currentRole.company}</p>
                </div>

                {/* Content */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="text-base font-semibold text-[#F4F4F4]">{currentRole.role}</h3>
                  </div>

                  <ul className="space-y-2">
                    {currentRole.results.slice(0, 4).map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentRole.technologies.slice(0, 6).map((tech) => (
                      <span key={tech} className="text-xs font-mono text-[#64748B] border border-[#334155] px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {currentRole.technologies.length > 6 && (
                      <span className="text-xs font-mono text-[#64748B] px-2 py-0.5">
                        +{currentRole.technologies.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          08 — CONTACT CTA
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#334155] py-32" id="contato">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger(0.1)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: copy */}
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-5 h-px bg-primary shrink-0" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F4F4] leading-tight mb-6"
              >
                {t.home.contactCtaTitle}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#94A3B8] text-base mb-8 max-w-md leading-relaxed">
                {t.home.contactCtaSubtitle}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={openWhatsApp}
                  className="h-12 px-7 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-0 rounded transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-4 h-4 mr-2" />
                  {t.home.contactCtaBtn}
                </Button>
              </motion.div>
            </div>

            {/* Right: contact pill buttons — Uiverse "wise-stingray-29" style */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-mono text-[#64748B] uppercase tracking-widest mb-6">
                {lang === "pt" ? "Canais de contato" : "Contact channels"}
              </p>
              <div className="flex flex-wrap gap-5">
                {settings?.whatsappUrl && (
                  <a
                    href={settings.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                    className="w-[52px] h-[52px] flex items-center justify-center rounded-[30px] bg-[#22D3EE] text-[#0F172A] hover:text-white transition-all duration-300 hover:bg-[#128c7e] hover:scale-[1.2] focus-ring"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                )}
                {settings?.contactEmail && (
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    aria-label={`Email: ${settings.contactEmail}`}
                    title={settings.contactEmail}
                    className="w-[52px] h-[52px] flex items-center justify-center rounded-[30px] bg-[#22D3EE] text-[#0F172A] hover:text-white transition-all duration-300 hover:bg-[#EA4335] hover:scale-[1.2] focus-ring"
                  >
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </a>
                )}
                {settings?.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="w-[52px] h-[52px] flex items-center justify-center rounded-[30px] bg-[#22D3EE] text-[#0F172A] hover:text-white transition-all duration-300 hover:bg-[#0072b1] hover:scale-[1.2] focus-ring"
                  >
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
