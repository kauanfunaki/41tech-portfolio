import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, Server, Activity, Database, Blocks, LayoutTemplate, Workflow, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useListProjects, useGetSiteSettings, useListTechnologies, useListCases } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { inferCategory } from "@/lib/inferCategory";
import { useSEO } from "@/hooks/useSEO";
import { useT } from "@/lib/languageContext";

const SERVICE_ICONS = [LayoutTemplate, Workflow, Activity, Blocks, Database, Server];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function Home() {
  const t = useT();

  useSEO({
    title: "Kauan Funaki | Dev Full Stack B2B",
    description: t.home.subheading,
  });

  const { data: projects } = useListProjects({ featured: true });
  const { data: settings } = useGetSiteSettings();
  const { data: technologies } = useListTechnologies();
  const { data: allCases } = useListCases();
  const { toast } = useToast();

  const [contactForm, setContactForm] = useState({ name: "", company: "", contact: "", message: "" });

  const recentCases = useMemo(() => {
    if (!allCases) return [];
    return allCases.filter((c) => c.isPublic !== false).slice(0, 3);
  }, [allCases]);

  const services = useMemo(
    () => t.home.services.map((s, i) => ({ ...s, icon: SERVICE_ICONS[i] })),
    [t]
  );

  const techGroups = useMemo(() => {
    if (!technologies?.length) return [];
    const map: Record<string, typeof technologies> = {};
    for (const tech of technologies) {
      const cat = tech.category || "Outros";
      if (!map[cat]) map[cat] = [];
      map[cat].push(tech);
    }
    return Object.entries(map).map(([category, techs]) => ({ category, techs }));
  }, [technologies]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings?.whatsappUrl) {
      toast({ title: t.home.contactUnavailableTitle, description: t.home.contactUnavailableDesc, variant: "destructive" });
      return;
    }
    const text = `Olá, sou ${contactForm.name}, da empresa ${contactForm.company}. Quero conversar sobre: ${contactForm.message}. Meu contato é ${contactForm.contact}.`;
    const url = new URL(settings.whatsappUrl);
    url.searchParams.set("text", text);
    const w = window.open(url.toString(), "_blank", "noopener,noreferrer");
    if (!w) toast({ title: t.home.popupBlockedTitle, description: t.home.popupBlockedDesc, variant: "destructive" });
  };

  const handlePrimaryCtaClick = () => {
    if (settings?.whatsappUrl) {
      const w = window.open(settings.whatsappUrl, "_blank", "noopener,noreferrer");
      if (!w) document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0E]">

      {/* ── 00 HERO ─────────────────────────────────── */}
      <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 min-h-[88vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-4xl"
          >
            {/* Label */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
              <span className="section-num">// 00</span>
              <span className="section-num">{t.home.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold leading-[0.9] tracking-tight text-[#F0F0F0] mb-8"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              {t.home.headline1}
              <br />
              <span className="text-primary">{t.home.headline2}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeUp} className="text-lg text-[#888895] max-w-xl mb-12 leading-relaxed">
              {t.home.subheading}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryCtaClick}
                className="h-12 px-7 text-sm font-semibold bg-primary hover:bg-primary/90 text-white border-0 rounded"
              >
                {settings?.ctaPrimaryLabel || t.home.ctaPrimary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("projetos-destaque")?.scrollIntoView({ behavior: "smooth" })}
                className="h-12 px-7 text-sm font-semibold border-[#272729] text-[#F0F0F0] hover:bg-[#1C1C1E] rounded"
              >
                {settings?.ctaSecondaryLabel || t.home.ctaSecondary}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3 text-[#555560]"
          >
            <div className="w-8 h-px bg-[#272729]" />
            <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          </motion.div>
        </div>
      </section>

      {/* ── 01 SERVIÇOS ─────────────────────────────── */}
      <section className="border-t border-[#272729] py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-16">
              <span className="section-num">// 01</span>
              <h2 className="font-display font-bold text-[2.5rem] text-[#F0F0F0]">{t.home.servicesTitle}</h2>
            </motion.div>

            {/* Grid with dividing lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 divide-[#272729]
                            md:[&>*:nth-child(3n+2)]:border-x md:[&>*:nth-child(3n+2)]:border-[#272729]">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="p-8 group hover:bg-[#131314] transition-colors"
                >
                  <p className="font-mono text-xs text-[#555560] mb-5">{String(i + 1).padStart(2, "0")}</p>
                  <service.icon className="w-5 h-5 text-primary mb-5" />
                  <h3 className="font-semibold text-[#F0F0F0] mb-2">{service.title}</h3>
                  <p className="text-sm text-[#888895] leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 02 PROJETOS ─────────────────────────────── */}
      {projects && projects.length > 0 && (
        <section id="projetos-destaque" className="border-t border-[#272729] py-24 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            >
              <motion.div variants={fadeUp} className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="section-num">// 02</span>
                  <h2 className="font-display font-bold text-[2.5rem] text-[#F0F0F0]">{t.home.featuredProjectsTitle}</h2>
                </div>
                <Link href="/projetos" className="text-sm text-[#888895] hover:text-primary transition-colors flex items-center gap-1">
                  {t.home.viewAllProjects} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              {/* Project rows */}
              <div className="border-t border-[#272729]">
                {projects.map((project, i) => (
                  <motion.div key={project.id} variants={fadeUp} custom={i}>
                    <Link href={`/projetos/${project.slug}`}>
                      <div className="flex items-center gap-6 py-6 border-b border-[#272729] group hover:pl-3 transition-all duration-200 cursor-pointer">
                        <span className="font-mono text-xs text-[#555560] w-6 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Thumbnail */}
                        {(project.thumbnailUrl || project.coverImageUrl) && (
                          <div className="hidden md:block w-16 h-10 rounded overflow-hidden shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                            <img
                              src={project.thumbnailUrl || project.coverImageUrl || ""}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <span className="font-display font-bold text-xl text-[#F0F0F0] grow group-hover:text-primary transition-colors truncate">
                          {project.title}
                        </span>

                        {project.category && (
                          <Badge className="shrink-0 hidden sm:inline-flex bg-transparent border-[#272729] text-[#888895] text-xs font-normal hover:bg-transparent">
                            {project.category}
                          </Badge>
                        )}

                        {project.metricsSummary && (
                          <span className="hidden lg:block text-xs text-[#555560] shrink-0 max-w-[180px] truncate">
                            {project.metricsSummary.split("|")[0].trim()}
                          </span>
                        )}

                        <span className="text-[#555560] group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0">
                          →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 03 CASES ─────────────────────────────────── */}
      {recentCases.length > 0 && (
        <section className="border-t border-[#272729] py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={fadeUp} className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="section-num">// 03</span>
                  <h2 className="font-display font-bold text-[2.5rem] text-[#F0F0F0]">{t.home.casesTitle}</h2>
                </div>
                <Link href="/cases" className="text-sm text-[#888895] hover:text-primary transition-colors flex items-center gap-1">
                  {t.home.viewAllCases} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentCases.map((c, i) => (
                  <motion.div key={c.id} variants={fadeUp} custom={i}>
                    <Link href={`/cases/${c.slug}`}>
                      <div className="group h-full flex flex-col border border-[#272729] rounded-lg bg-[#131314] hover:border-primary/40 transition-all duration-300 p-6 cursor-pointer">
                        <div className="w-1 h-4 bg-primary rounded mb-5 group-hover:h-6 transition-all" />
                        {c.clientSegment && (
                          <span className="text-xs font-mono text-[#555560] uppercase tracking-widest mb-3">
                            {c.clientSegment}
                          </span>
                        )}
                        <h3 className="font-semibold text-[#F0F0F0] mb-3 group-hover:text-primary transition-colors">
                          {c.title}
                        </h3>
                        {c.problem && (
                          <p className="text-sm text-[#888895] line-clamp-3 leading-relaxed flex-1">
                            {c.problem}
                          </p>
                        )}
                        {c.metricsSummary && (
                          <p className="mt-4 text-xs text-primary font-mono truncate">
                            {c.metricsSummary.split("·")[0].trim()}
                          </p>
                        )}
                        <div className="mt-4 flex items-center text-xs text-[#555560] group-hover:text-primary transition-colors">
                          {t.home.viewCase} <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 04 STACK ─────────────────────────────────── */}
      {techGroups.length > 0 && (
        <section className="border-t border-[#272729] py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-16">
                <span className="section-num">// 04</span>
                <h2 className="font-display font-bold text-[2.5rem] text-[#F0F0F0]">{t.home.stackTitle}</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {techGroups.map((group, i) => (
                  <motion.div key={group.category} variants={fadeUp} custom={i} className="space-y-4">
                    <h3 className="text-xs font-mono text-[#555560] uppercase tracking-widest border-b border-[#272729] pb-3">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.techs.map((tech) => (
                        <div
                          key={tech.id}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#272729] bg-[#131314] text-[#888895] hover:text-[#F0F0F0] hover:border-[#3a3a3d] transition-all cursor-default"
                        >
                          {tech.iconUrl ? (
                            <img src={tech.iconUrl} alt={tech.name} className="w-3.5 h-3.5 object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          ) : (
                            <span className="text-primary font-bold text-xs">{tech.name.charAt(0)}</span>
                          )}
                          <span className="font-mono text-xs">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 05 CTA ───────────────────────────────────── */}
      <section className="border-t border-[#272729] py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-baseline gap-4 mb-10">
              <span className="section-num">// 05</span>
            </div>
            <h2 className="font-display font-bold leading-tight text-[#F0F0F0] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              {t.home.ctaBigPart1}{" "}
              <span className="gradient-text">{t.home.ctaBigGradient}</span>
            </h2>
            <p className="text-lg text-[#888895] mb-10 max-w-2xl leading-relaxed">
              {t.home.ctaBigSubtitle}
            </p>
            <Button
              size="lg"
              onClick={handlePrimaryCtaClick}
              className="h-12 px-8 text-sm font-semibold bg-primary hover:bg-primary/90 text-white border-0 rounded"
            >
              {t.home.ctaBigBtn} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── 06 CONTATO ───────────────────────────────── */}
      <section id="contato" className="border-t border-[#272729] py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 mb-16">
              <span className="section-num">// 06</span>
              <div>
                <h2 className="font-display font-bold text-[2.5rem] text-[#F0F0F0]">{t.home.contactTitle}</h2>
                <p className="text-[#888895] mt-2">{t.home.contactSubtitle}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="max-w-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-mono text-[#888895] uppercase tracking-widest">
                      {t.home.nameLabel}
                    </Label>
                    <Input
                      id="name" required value={contactForm.name}
                      onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
                      className="bg-[#131314] border-[#272729] focus-visible:ring-primary h-11 text-[#F0F0F0]"
                      placeholder={t.home.namePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-xs font-mono text-[#888895] uppercase tracking-widest">
                      {t.home.companyLabel}
                    </Label>
                    <Input
                      id="company" required value={contactForm.company}
                      onChange={(e) => setContactForm((p) => ({ ...p, company: e.target.value }))}
                      className="bg-[#131314] border-[#272729] focus-visible:ring-primary h-11 text-[#F0F0F0]"
                      placeholder={t.home.companyPlaceholder}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-xs font-mono text-[#888895] uppercase tracking-widest">
                    {t.home.contactLabel}
                  </Label>
                  <Input
                    id="contact" required value={contactForm.contact}
                    onChange={(e) => setContactForm((p) => ({ ...p, contact: e.target.value }))}
                    className="bg-[#131314] border-[#272729] focus-visible:ring-primary h-11 text-[#F0F0F0]"
                    placeholder={t.home.contactPlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-mono text-[#888895] uppercase tracking-widest">
                    {t.home.messageLabel}
                  </Label>
                  <Textarea
                    id="message" required value={contactForm.message}
                    onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                    className="bg-[#131314] border-[#272729] focus-visible:ring-primary min-h-[120px] resize-none text-[#F0F0F0]"
                    placeholder={t.home.messagePlaceholder}
                  />
                </div>
                <Button
                  type="submit" size="lg"
                  className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-white border-0 rounded"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t.home.sendBtn}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
