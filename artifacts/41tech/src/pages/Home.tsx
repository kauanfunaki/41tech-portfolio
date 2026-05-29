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
  MessageCircle,
  Mail,
  Linkedin,
} from "lucide-react";
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

  const techList = useMemo(() => {
    const items = technologies?.map((t) => t.name) ?? FALLBACK_TECHS;
    // Duplicate for seamless marquee loop
    return [...items, ...items];
  }, [technologies]);

  const specialties = useMemo(() => specialtiesData[lang].slice(0, 6), [lang]);
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
    <div className="flex flex-col min-h-screen bg-[#0D0D0E]">

      {/* ══════════════════════════════════════════════
          01 — HERO
      ══════════════════════════════════════════════ */}
      <section
        className="relative pt-28 pb-16 md:pt-44 md:pb-28 min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(18,61,255,0.07) 0%, transparent 65%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
          <div className={`grid items-center gap-12 lg:gap-20 ${hasHeroMedia ? "lg:grid-cols-[1fr_1fr]" : ""}`}>

            {/* Text */}
            <motion.div initial="hidden" animate="show" variants={stagger(0.1)}>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
                <span className="section-num">// 00</span>
                <span className="section-num">{t.home.badge}</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-bold leading-[0.9] tracking-tight text-[#F0F0F0] mb-8"
                style={{ fontSize: `clamp(2.6rem, ${hasHeroMedia ? "5vw" : "9vw"}, ${hasHeroMedia ? "5rem" : "7.5rem"})` }}
              >
                {t.home.headline1}
                <br />
                <span className="text-primary">{t.home.headline2}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-[#888895] max-w-lg mb-12 leading-relaxed">
                {t.home.subheading}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  asChild
                  className="h-12 px-7 text-sm font-semibold bg-primary hover:bg-primary/90 text-white border-0 rounded"
                >
                  <Link href="/projetos">
                    {settings?.ctaPrimaryLabel || t.home.ctaPrimary}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={openWhatsApp}
                  className="h-12 px-7 text-sm font-semibold border-[#272729] text-[#F0F0F0] hover:bg-[#1C1C1E] rounded"
                >
                  {t.home.contactCtaBtn}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Media (optional) */}
            {hasHeroMedia && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {hasVideo ? (
                  <video
                    src={settings!.heroVideoUrl!}
                    autoPlay muted loop playsInline
                    poster={settings?.heroFallbackImageUrl ?? undefined}
                    className="w-full aspect-video rounded border border-[#272729] object-cover bg-[#131314]"
                  />
                ) : (
                  <img
                    src={settings!.heroFallbackImageUrl!}
                    alt=""
                    className="w-full aspect-video rounded border border-[#272729] object-cover bg-[#131314]"
                  />
                )}
              </motion.div>
            )}
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3 text-[#555560]"
          >
            <div className="w-8 h-px bg-[#272729]" />
            <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02 — MÉTRICAS RÁPIDAS
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#272729]">
            {t.home.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="px-6 py-8 first:pl-0 last:pr-0"
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0] mb-1">{m.value}</p>
                <p className="text-xs font-mono text-[#555560] leading-snug">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03 — TECH MARQUEE
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#272729] py-8 overflow-hidden">
        <div className="flex items-center gap-6 mb-4 max-w-6xl mx-auto px-6 md:px-12">
          <span className="section-num shrink-0">// {t.home.techMarqueeLabel}</span>
        </div>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0D0D0E] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0D0D0E] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee gap-3 w-max">
            {techList.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono text-[#888895] border border-[#272729] bg-[#131314] px-3 py-1.5 rounded whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04 — EXPERTISE PREVIEW
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#272729] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger()}>
            <motion.div variants={fadeUp} className="flex items-baseline justify-between gap-6 mb-12 flex-wrap">
              <div className="flex items-baseline gap-4">
                <span className="section-num">// 01</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                  {t.home.expertisePreviewLabel}
                </h2>
              </div>
              <Link
                href="/expertise"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#555560] hover:text-primary transition-colors"
              >
                {t.home.expertisePreviewCta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialties.map((s, i) => {
                const Icon = SPECIALTY_ICONS[s.icon] ?? Globe;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="p-6 border border-[#272729] rounded bg-[#131314] hover:border-[#3A3A3E] transition-colors flex flex-col gap-3"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-[#F0F0F0]">{s.title}</h3>
                    <p className="text-xs text-[#888895] leading-relaxed line-clamp-2">{s.description}</p>
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                      {s.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs font-mono text-[#555560] border border-[#272729] px-1.5 py-0.5 rounded">
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
      <section className="border-t border-[#272729] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger()}>
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-12">
              <span className="section-num">// 02</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                {t.home.featuredLabel}
              </h2>
            </motion.div>

            {featuredProject ? (
              <motion.div variants={fadeUp}>
                <Link href={`/projetos/${featuredProject.slug}`}>
                  <div className="group grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 p-8 border border-[#272729] rounded bg-[#131314] hover:border-[#3A3A3E] transition-colors">
                    {/* Info */}
                    <div className="flex flex-col gap-5 justify-center">
                      <div className="flex flex-wrap items-center gap-2">
                        {featuredProject.category && (
                          <span className="text-xs font-mono text-[#555560] border border-[#272729] px-2 py-0.5 rounded">
                            {featuredProject.category}
                          </span>
                        )}
                        {featuredProject.featured && (
                          <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 rounded">
                            {t.home.featured}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0] group-hover:text-primary transition-colors leading-tight">
                        {featuredProject.title}
                      </h3>

                      <p className="text-sm text-[#888895] leading-relaxed max-w-lg">
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

                      <div className="flex items-center gap-2 text-sm font-medium text-[#555560] group-hover:text-primary transition-colors mt-2">
                        {t.home.viewProject}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Thumbnail */}
                    {(featuredProject.thumbnailUrl || featuredProject.coverImageUrl) && (
                      <div className="aspect-video rounded border border-[#272729] overflow-hidden bg-[#0D0D0E] shrink-0">
                        <img
                          src={featuredProject.thumbnailUrl || featuredProject.coverImageUrl!}
                          alt={featuredProject.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
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
                className="p-12 border border-dashed border-[#272729] rounded text-center"
              >
                <p className="font-mono text-xs text-[#555560] mb-2">{t.home.featuredEmptyTitle}</p>
                <p className="text-sm text-[#888895]">{t.home.featuredEmptyDesc}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          06 — PREVIEW DE PROJETOS
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#272729] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger()}>
            <motion.div variants={fadeUp} className="flex items-baseline justify-between gap-6 mb-12 flex-wrap">
              <div className="flex items-baseline gap-4">
                <span className="section-num">// 03</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                  {t.home.projectsPreviewLabel}
                </h2>
              </div>
              <Link
                href="/projetos"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#555560] hover:text-primary transition-colors"
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
                          <span className="font-mono text-xs text-[#555560] w-8 shrink-0 select-none">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="w-14 h-14 rounded border border-[#272729] bg-[#131314] shrink-0 overflow-hidden">
                            {cardImg ? (
                              <img src={cardImg} alt={project.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#333336]">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <h3 className="text-sm font-semibold text-[#F0F0F0] group-hover:text-primary transition-colors">{project.title}</h3>
                              <span className="text-xs font-mono text-[#555560] border border-[#272729] px-1.5 py-0.5 rounded">{category}</span>
                            </div>
                            <p className="text-xs text-[#888895] line-clamp-1">{project.shortDescription}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#555560] group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div variants={fadeUp} className="py-16 border-t border-[#272729] text-center">
                <p className="text-sm text-[#555560] font-mono">{t.home.featuredEmptyTitle}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          07 — EXPERIENCE PREVIEW
      ══════════════════════════════════════════════ */}
      <section className="border-t border-[#272729] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger()}>
            <motion.div variants={fadeUp} className="flex items-baseline justify-between gap-6 mb-12 flex-wrap">
              <div className="flex items-baseline gap-4">
                <span className="section-num">// 04</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                  {t.home.experiencePreviewLabel}
                </h2>
              </div>
              <Link
                href="/experiencia"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#555560] hover:text-primary transition-colors"
              >
                {t.home.experiencePreviewCta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {currentRole && (
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16 p-8 border border-[#272729] rounded bg-[#131314]"
              >
                {/* Meta */}
                <div className="space-y-2">
                  {currentRole.current && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {lang === "pt" ? "Atual" : "Current"}
                    </span>
                  )}
                  <p className="text-xs font-mono text-[#555560]">{currentRole.period}</p>
                  <p className="text-xs font-mono text-[#888895] font-medium">{currentRole.company}</p>
                </div>

                {/* Content */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="text-base font-semibold text-[#F0F0F0]">{currentRole.role}</h3>
                  </div>

                  <ul className="space-y-2">
                    {currentRole.results.slice(0, 4).map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#888895]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentRole.technologies.slice(0, 6).map((tech) => (
                      <span key={tech} className="text-xs font-mono text-[#555560] border border-[#272729] px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {currentRole.technologies.length > 6 && (
                      <span className="text-xs font-mono text-[#555560] px-2 py-0.5">
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
      <section className="border-t border-[#272729] py-24" id="contato">
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
              <motion.span variants={fadeUp} className="section-num mb-4 block">// 05</motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0F0F0] leading-tight mb-6"
              >
                {t.home.contactCtaTitle}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#888895] text-base mb-8 max-w-md leading-relaxed">
                {t.home.contactCtaSubtitle}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={openWhatsApp}
                  className="h-12 px-7 text-sm font-semibold bg-primary hover:bg-primary/90 text-white border-0 rounded"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t.home.contactCtaBtn}
                </Button>
              </motion.div>
            </div>

            {/* Right: contact links */}
            <motion.div variants={fadeUp} className="space-y-3">
              {settings?.whatsappUrl && (
                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-[#272729] rounded bg-[#131314] hover:border-[#3A3A3E] transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-[#888895] group-hover:text-[#F0F0F0] transition-colors">WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#555560] ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              )}
              {settings?.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center gap-4 p-4 border border-[#272729] rounded bg-[#131314] hover:border-[#3A3A3E] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#555560] shrink-0" />
                  <span className="text-sm text-[#888895] group-hover:text-[#F0F0F0] transition-colors">{settings.contactEmail}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#555560] ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              )}
              {settings?.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-[#272729] rounded bg-[#131314] hover:border-[#3A3A3E] transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-[#555560] shrink-0" />
                  <span className="text-sm text-[#888895] group-hover:text-[#F0F0F0] transition-colors">LinkedIn</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#555560] ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
