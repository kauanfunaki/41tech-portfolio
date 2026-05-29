import { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  LayoutTemplate,
  BarChart2,
  Workflow,
  Cable,
  Server,
  BookOpen,
  MapPin,
  CalendarDays,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/lib/languageContext";
import {
  timelineData,
  workHighlightsData,
  type WorkHighlight,
} from "@/data/experienceData";

// Map icon name strings to lucide components
const HIGHLIGHT_ICONS: Record<string, React.ElementType> = {
  LayoutTemplate,
  BarChart2,
  Workflow,
  Cable,
  Server,
  BookOpen,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function HighlightCard({ item }: { item: WorkHighlight }) {
  const Icon = HIGHLIGHT_ICONS[item.icon] ?? Briefcase;
  return (
    <div className="p-6 border border-[#272729] rounded bg-[#131314] hover:border-[#3A3A3E] transition-colors flex flex-col gap-3">
      <Icon className="w-5 h-5 text-primary shrink-0" />
      <h3 className="text-sm font-semibold text-[#F0F0F0]">{item.title}</h3>
      <p className="text-sm text-[#888895] leading-relaxed">{item.description}</p>
    </div>
  );
}

export default function Experience() {
  const { lang, t } = useLanguage();

  useSEO({
    title: lang === "pt" ? "Experiência" : "Experience",
    description: t.experience.heroSubtitle,
  });

  const timeline = useMemo(() => timelineData[lang], [lang]);
  const highlights = useMemo(() => workHighlightsData[lang], [lang]);

  return (
    <div className="min-h-screen bg-[#0D0D0E]">

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.span variants={fadeUp} className="section-num mb-4 block">
              // 00
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl font-bold text-[#F0F0F0] tracking-tight leading-none mb-6"
            >
              {lang === "pt" ? "Experiência" : "Experience"}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[#888895] max-w-xl leading-relaxed mb-10">
              {t.experience.heroSubtitle}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/projetos"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#888895] hover:text-[#F0F0F0] transition-colors"
              >
                {t.experience.heroCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-16">
              <span className="section-num">// 01</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                {t.experience.timelineTitle}
              </h2>
            </motion.div>

            <div className="space-y-0">
              {timeline.map((entry, i) => (
                <motion.article
                  key={i}
                  variants={fadeUp}
                  className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-16 py-12 border-b border-[#272729] last:border-0"
                >
                  {/* ── Meta column (left) ── */}
                  <div className="shrink-0 space-y-3">
                    {entry.current && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {t.experience.currentLabel}
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-xs font-mono text-[#555560]">
                      <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                      {entry.period}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#555560]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {entry.modality}
                    </div>
                    <p className="text-xs font-mono text-[#888895] font-medium mt-1">
                      {entry.company}
                    </p>
                  </div>

                  {/* ── Content column (right) ── */}
                  <div className="space-y-8">
                    {/* Role + description */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="w-4 h-4 text-primary shrink-0" />
                        <h3 className="text-lg font-semibold text-[#F0F0F0]">{entry.role}</h3>
                      </div>
                      <p className="text-sm text-[#888895] leading-relaxed">{entry.description}</p>
                    </div>

                    {/* Responsibilities */}
                    {entry.responsibilities.length > 0 && (
                      <div>
                        <p className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-4">
                          {t.experience.responsibilitiesLabel}
                        </p>
                        <ul className="space-y-2">
                          {entry.responsibilities.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-[#888895]">
                              <span className="w-1 h-1 rounded-full bg-[#555560] shrink-0 mt-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Results / deliveries */}
                    {entry.results.length > 0 && (
                      <div>
                        <p className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-4">
                          {t.experience.resultsLabel}
                        </p>
                        <ul className="space-y-2">
                          {entry.results.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-[#888895]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {entry.technologies.length > 0 && (
                      <div>
                        <p className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-3">
                          {t.experience.techLabel}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {entry.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono text-[#888895] border border-[#272729] bg-[#131314] px-2.5 py-1 rounded hover:text-[#F0F0F0] hover:border-[#3A3A3E] transition-colors cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRABALHOS RELEVANTES ── */}
      <section className="py-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-12">
              <span className="section-num">// 02</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                {t.experience.highlightsTitle}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlights.map((item, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <HighlightCard item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F0F0F0]">
                {t.experience.ctaTitle}
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-[#888895] text-base mb-8 max-w-md">
              {t.experience.ctaText}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/projetos"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded transition-colors"
              >
                {t.experience.ctaBtn}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
