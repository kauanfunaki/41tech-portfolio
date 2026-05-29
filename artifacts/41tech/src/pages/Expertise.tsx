import { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Globe,
  Workflow,
  BarChart2,
  Cable,
  Server,
  Brain,
  GraduationCap,
  Award,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useListTechnologies } from "@workspace/api-client-react";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/lib/languageContext";
import {
  educationData,
  certificationsData,
  specialtiesData,
  stackData,
  type SpecialtyEntry,
} from "@/data/expertiseData";

// Map icon names from data to actual lucide components
const SPECIALTY_ICONS: Record<string, React.ElementType> = {
  Globe,
  Workflow,
  BarChart2,
  Cable,
  Server,
  Brain,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function StatusChip({ status, labelActive, labelDone }: { status: "active" | "done"; labelActive: string; labelDone: string }) {
  return status === "active" ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2.5 py-0.5 rounded">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
      {labelActive}
    </span>
  ) : (
    <span className="text-xs font-mono text-[#555560] border border-[#272729] px-2.5 py-0.5 rounded">
      {labelDone}
    </span>
  );
}

function SpecialtyCard({ specialty }: { specialty: SpecialtyEntry }) {
  const Icon = SPECIALTY_ICONS[specialty.icon] ?? Globe;
  return (
    <div className="card-interactive p-6 flex flex-col gap-4">
      <Icon className="w-5 h-5 text-primary shrink-0" />
      <div>
        <h3 className="text-sm font-semibold text-[#F0F0F0] mb-2">{specialty.title}</h3>
        <p className="text-sm text-[#888895] leading-relaxed">{specialty.description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {specialty.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono text-[#555560] border border-[#272729] px-2 py-0.5 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Expertise() {
  const { lang, t } = useLanguage();

  useSEO({
    title: lang === "pt" ? "Especialidades" : "Expertise",
    description: t.expertise.heroSubtitle,
  });

  const { data: technologies } = useListTechnologies();

  const education = useMemo(() => educationData[lang], [lang]);
  const certifications = useMemo(() => certificationsData[lang], [lang]);
  const specialties = useMemo(() => specialtiesData[lang], [lang]);

  // Stack: use admin API (grouped by category) with fallback to static data
  const stack = useMemo(() => {
    if (technologies?.length) {
      const map: Record<string, Array<{ name: string; iconUrl: string | null }>> = {};
      for (const tech of technologies) {
        const cat = tech.category || (lang === "pt" ? "Outros" : "Other");
        if (!map[cat]) map[cat] = [];
        map[cat].push({ name: tech.name, iconUrl: tech.iconUrl ?? null });
      }
      return Object.entries(map).map(([label, items]) => ({ label, items }));
    }
    // Fallback to static data if API is empty
    return stackData[lang].map((g) => ({
      label: g.label,
      items: g.items.map((name) => ({ name, iconUrl: null })),
    }));
  }, [technologies, lang]);

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
              {lang === "pt" ? "Especialidades" : "Expertise"}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[#888895] max-w-xl leading-relaxed mb-10">
              {t.expertise.heroSubtitle}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/projetos"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#888895] hover:text-[#F0F0F0] transition-colors"
              >
                {t.expertise.heroCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── RESUMO TÉCNICO ── */}
      <section className="py-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.span variants={fadeUp} className="section-num mb-6 block">
              // 01 — {t.expertise.summaryLabel}
            </motion.span>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-[#888895] leading-relaxed max-w-3xl border-l-2 border-primary/40 pl-6"
            >
              {t.expertise.summaryText}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FORMAÇÃO ── */}
      <section className="py-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-12">
              <span className="section-num">// 02</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                {t.expertise.educationTitle}
              </h2>
            </motion.div>

            <div className="space-y-0">
              {education.map((entry, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10 py-8 border-b border-[#272729] last:border-0"
                >
                  {/* Period + institution */}
                  <div className="shrink-0">
                    <p className="text-xs font-mono text-[#555560] mb-1">{entry.period}</p>
                    <p className="text-xs font-mono text-[#888895]">{entry.institution}</p>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                      <h3 className="text-base font-semibold text-[#F0F0F0]">{entry.course}</h3>
                      <StatusChip
                        status={entry.status}
                        labelActive={t.expertise.statusActive}
                        labelDone={t.expertise.statusDone}
                      />
                    </div>
                    <p className="text-sm text-[#888895] leading-relaxed">{entry.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CERTIFICAÇÕES ── */}
      <section className="py-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-12">
              <span className="section-num">// 03</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                {t.expertise.certificationsTitle}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#272729] border border-[#272729] rounded overflow-hidden">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-[#0D0D0E] p-5 flex flex-col gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <Award className="w-4 h-4 text-[#555560] shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                    <StatusChip
                      status={cert.status}
                      labelActive={t.expertise.statusActive}
                      labelDone={t.expertise.statusDone}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F0F0F0] leading-snug">{cert.name}</p>
                    <p className="text-xs text-[#555560] font-mono mt-1">
                      {cert.institution} · {cert.year}
                    </p>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-auto"
                    >
                      {t.expertise.linkLabel}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ESPECIALIDADES ── */}
      <section className="py-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-12">
              <span className="section-num">// 04</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                {t.expertise.specialtiesTitle}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialties.map((specialty, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <SpecialtyCard specialty={specialty} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STACK POR CATEGORIA ── */}
      <section className="py-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-12">
              <span className="section-num">// 05</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0]">
                {t.expertise.stackTitle}
              </h2>
            </motion.div>

            <div className="space-y-0">
              {stack.map((group, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10 py-6 border-b border-[#272729] last:border-0 items-start"
                >
                  <p className="font-mono text-xs text-[#555560] uppercase tracking-widest pt-1 shrink-0">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#888895] border border-[#272729] bg-[#131314] px-3 py-1.5 rounded hover:text-[#F0F0F0] hover:border-[#3A3A3E] transition-colors cursor-default"
                      >
                        {item.iconUrl && (
                          <img
                            src={item.iconUrl}
                            alt={item.name}
                            className="w-3.5 h-3.5 object-contain shrink-0"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          />
                        )}
                        {item.name}
                      </span>
                    ))}
                  </div>
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
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold text-[#F0F0F0] mb-4"
            >
              {lang === "pt"
                ? "Quer aplicar isso na sua operação?"
                : "Want to apply this to your operation?"}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#888895] text-base mb-8 max-w-md">
              {lang === "pt"
                ? "Veja os projetos reais construídos com essa stack e metodologia."
                : "See the real projects built with this stack and methodology."}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/projetos"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded transition-colors"
              >
                {t.expertise.heroCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
