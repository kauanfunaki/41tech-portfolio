import { useMemo } from "react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-[#0D0D0E]">
      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-num mb-4 block">// 00</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-[#F0F0F0] tracking-tight leading-none mb-6">
              {t.about.title}
            </h1>
            <p className="text-lg text-[#888895] max-w-xl leading-relaxed">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 space-y-24">

        {/* Profile */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border border-[#272729] rounded bg-[#131314] overflow-hidden">
            {/* Avatar column */}
            <div className="md:col-span-3 flex flex-col items-center justify-center gap-5 p-8 md:border-r border-[#272729]">
              <div className="w-36 h-36 rounded border border-[#272729] overflow-hidden bg-[#0D0D0E]">
                {me?.avatarUrl ? (
                  <img
                    src={me.avatarUrl}
                    alt={me.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#272729]">
                    {(me?.name ?? "K").charAt(0)}
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="font-semibold text-[#F0F0F0] text-base">{me?.name ?? "Kauan Funaki"}</p>
                <p className="text-xs font-mono text-primary mt-1">{me?.roleTitle ?? "Dev Full Stack"}</p>
                <div className="flex items-center justify-center gap-1 mt-1.5 text-xs text-[#555560]">
                  <MapPin className="w-3 h-3" />
                  {t.footer.country}
                </div>
              </div>

              <div className="flex gap-2">
                {(me?.linkedinUrl ?? settings?.linkedinUrl) && (
                  <a
                    href={me?.linkedinUrl ?? settings?.linkedinUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded border border-[#272729] flex items-center justify-center text-[#555560] hover:text-[#F0F0F0] hover:border-[#444448] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {me?.githubUrl && (
                  <a
                    href={me.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded border border-[#272729] flex items-center justify-center text-[#555560] hover:text-[#F0F0F0] hover:border-[#444448] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Bio column */}
            <div className="md:col-span-9 p-8 flex flex-col justify-center gap-6">
              <div>
                <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-4">{t.about.sectionWho}</h2>
                <p className="text-[#888895] text-base leading-relaxed">
                  {me?.bio ? me.bio : t.about.defaultBio}
                </p>
              </div>

              {me?.skills && me.skills.length > 0 && (
                <div>
                  <p className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-3">
                    {t.about.specialties}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {me.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-mono border border-[#272729] text-[#888895] rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#272729] flex items-center gap-3">
                <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2.5 py-1 rounded">B2B</span>
                <p className="text-sm text-[#555560]">{t.about.b2bLabel}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Diferenciais */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-8">{t.about.sectionDiff}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#272729] border border-[#272729] rounded overflow-hidden">
            {t.about.differentials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-6 bg-[#0D0D0E]"
              >
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-[#888895] leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Como trabalho */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-8">{t.about.sectionHow}</h2>
          <div className="space-y-0">
            {t.about.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 items-start py-6 border-b border-[#272729] last:border-0"
              >
                <span className="font-mono text-xs text-[#555560] w-8 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[#F0F0F0] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#888895] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stack */}
        {techGroups.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-mono text-xs text-[#555560] uppercase tracking-widest mb-8">{t.about.sectionStack}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techGroups.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-mono text-[#555560] uppercase tracking-widest border-b border-[#272729] pb-2">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.techs.map((tech) => (
                      <div
                        key={tech.id}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#272729] text-xs text-[#888895] hover:text-[#F0F0F0] transition-colors cursor-default"
                      >
                        {tech.iconUrl ? (
                          <img
                            src={tech.iconUrl}
                            alt={tech.name}
                            className="w-3.5 h-3.5 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : null}
                        <span className="font-mono">{tech.name}</span>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-[#272729] pt-16"
        >
          <h3 className="font-display text-3xl md:text-4xl font-bold text-[#F0F0F0] mb-4">
            {t.about.ctaTitle}
          </h3>
          <p className="text-[#888895] text-base mb-8 max-w-md">
            {t.about.ctaSubtitle}
          </p>
          <button
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded transition-colors"
          >
            {t.about.ctaBtn}
            <Send className="w-4 h-4" />
          </button>
        </motion.section>
      </div>
    </div>
  );
}
