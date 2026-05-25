import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetSiteSettings, useListTechnologies, useListTeamMembers } from "@workspace/api-client-react";
import { Send, CheckCircle2, Github, Linkedin, MapPin } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useT } from "@/lib/languageContext";

export default function AboutUs() {
  const t = useT();

  useSEO({
    title: t.about.title,
    description: t.about.seoDescription,
  });

  const { data: settings } = useGetSiteSettings();
  const { data: technologies } = useListTechnologies();
  const { data: teamMembers } = useListTeamMembers();

  const me = useMemo(() => {
    if (!teamMembers?.length) return null;
    return teamMembers.filter(m => m.isActive).sort((a, b) => a.sortOrder - b.sortOrder)[0] ?? null;
  }, [teamMembers]);

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

  const handleContactClick = () => {
    if (settings?.whatsappUrl) {
      window.open(settings.whatsappUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = "/#contato";
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D]">
      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden bg-[#0B1020] border-b border-[rgba(255,255,255,0.05)]">
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-primary/8 blur-[180px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t.about.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-foreground tracking-tight leading-tight">
              {t.about.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#AAB6D3] leading-relaxed">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24 space-y-32 max-w-5xl">

        {/* Profile Card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#0B1020] overflow-hidden relative">
            <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row gap-0">
              {/* Left — avatar + social */}
              <div className="flex flex-col items-center justify-center gap-6 p-10 md:p-12 md:border-r border-[rgba(255,255,255,0.06)] md:w-72 shrink-0">
                <div className="relative">
                  <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_rgba(18,61,255,0.2)]">
                    {me?.avatarUrl ? (
                      <img
                        src={me.avatarUrl}
                        alt={me.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#061A44] to-[#123DFF]/20 flex items-center justify-center text-5xl font-extrabold text-white">
                        {(me?.name ?? "K").charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 border-2 border-[#0B1020] flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xl font-extrabold text-white">{me?.name ?? "Kauan Funaki"}</p>
                  <p className="text-sm font-mono text-primary font-bold mt-1">{me?.roleTitle ?? "Dev Full Stack"}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-[#AAB6D3]">
                    <MapPin className="w-3 h-3" />
                    {t.footer.country}
                  </div>
                </div>

                <div className="flex gap-3">
                  {(me?.linkedinUrl ?? settings?.linkedinUrl) && (
                    <a
                      href={me?.linkedinUrl ?? settings?.linkedinUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#AAB6D3] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {me?.githubUrl && (
                    <a
                      href={me.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#AAB6D3] hover:text-white hover:bg-[#333] hover:border-[#555] transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right — bio + skills */}
              <div className="flex-1 p-10 md:p-12 flex flex-col justify-center gap-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-foreground mb-4">{t.about.sectionWho}</h2>
                  <p className="text-lg text-[#AAB6D3] leading-relaxed">
                    {me?.bio ? me.bio : t.about.defaultBio}
                  </p>
                </div>

                {me?.skills && me.skills.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-[#AAB6D3] uppercase tracking-widest mb-3">
                      {t.about.specialties}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {me.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-[rgba(18,61,255,0.08)] text-[#00D8FF] border border-[rgba(18,61,255,0.25)] font-mono text-xs font-normal px-3 py-1 hover:bg-[rgba(18,61,255,0.15)] transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                    <span className="text-2xl font-extrabold text-primary">B2B</span>
                  </div>
                  <p className="text-sm text-[#AAB6D3]">{t.about.b2bLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Diferenciais */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold mb-12 text-foreground">{t.about.sectionDiff}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.about.differentials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0B1020] hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-[#00D8FF] mt-0.5 flex-shrink-0" />
                <p className="text-lg text-[#AAB6D3] leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Como trabalho */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold mb-12 text-foreground">{t.about.sectionHow}</h2>
          <div className="space-y-0">
            {t.about.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                {/* Icon + connector column */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0D1A3D] to-[#05070D] border border-primary/30 flex items-center justify-center shadow-[0_0_16px_rgba(18,61,255,0.15)]">
                    <span className="text-sm font-black text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {i < t.about.steps.length - 1 && (
                    <div className="w-px flex-1 my-2 min-h-[2rem] bg-gradient-to-b from-primary/40 to-primary/10" />
                  )}
                </div>

                {/* Content */}
                <div className={`pt-2 ${i < t.about.steps.length - 1 ? "pb-10" : ""}`}>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-[#AAB6D3] text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Minha stack */}
        {techGroups.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold mb-12 text-foreground">{t.about.sectionStack}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {techGroups.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-5"
                >
                  <h3 className="text-base font-bold text-white border-b border-[rgba(255,255,255,0.1)] pb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.techs.map((tech) => (
                      <div
                        key={tech.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(18,61,255,0.12)] border border-[rgba(18,61,255,0.3)] text-white hover:bg-[rgba(18,61,255,0.2)] hover:scale-105 hover:border-[#00D8FF]/50 transition-all cursor-default"
                      >
                        {tech.iconUrl ? (
                          <img
                            src={tech.iconUrl}
                            alt={tech.name}
                            className="w-4 h-4 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <span className="text-[#00D8FF] font-bold text-sm leading-none">
                            {tech.name.charAt(0)}
                          </span>
                        )}
                        <span className="font-mono text-sm">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#061A44] to-[#0B1020] border border-primary/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 tech-grid opacity-20" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                {t.about.ctaTitle}
              </h3>
              <p className="text-[#AAB6D3] text-xl mb-10 max-w-2xl mx-auto">
                {t.about.ctaSubtitle}
              </p>
              <Button
                size="lg"
                onClick={handleContactClick}
                className="h-14 px-10 text-base font-bold bg-gradient-to-r from-[#123DFF] to-[#0A28CC] hover:from-[#1a47ff] hover:to-[#1230e0] text-white border-0 glow-blue"
              >
                {t.about.ctaBtn} <Send className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
