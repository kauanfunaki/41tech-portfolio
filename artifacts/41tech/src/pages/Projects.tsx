import { useState, useMemo, useEffect } from "react";
import { Link, useSearch, useLocation } from "wouter";
import { useListProjects } from "@workspace/api-client-react";
import { ArrowRight, Search, SearchX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { inferCategory } from "@/lib/inferCategory";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/lib/languageContext";

// Internal keys match DB values and URL params (always Portuguese)
const ALL_CATEGORY_KEYS = [
  "Todos",
  "Sistema Web",
  "BI & Dados",
  "Automação",
  "Integração",
  "IA",
  "Infra & Deploy",
  "ERP",
  "Outro",
];

export default function Projects() {
  const { t, lang } = useLanguage();

  useSEO({
    title: t.projects.title,
    description: t.projects.subtitle,
  });

  const searchString = useSearch();
  const [, navigate] = useLocation();

  const urlParams = new URLSearchParams(searchString);
  const selectedCategory = urlParams.get("categoria") || "Todos";

  const [searchQuery, setSearchQuery] = useState(urlParams.get("q") || "");

  const { data: projects, isLoading } = useListProjects();

  // Sync search query to URL (debounced 350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const p = new URLSearchParams();
      if (searchQuery) p.set("q", searchQuery);
      if (selectedCategory !== "Todos") p.set("categoria", selectedCategory);
      const qs = p.toString();
      navigate(qs ? `/projetos?${qs}` : "/projetos", { replace: true });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleCategoryChange = (cat: string) => {
    const p = new URLSearchParams();
    if (searchQuery) p.set("q", searchQuery);
    if (cat !== "Todos") p.set("categoria", cat);
    const qs = p.toString();
    navigate(qs ? `/projetos?${qs}` : "/projetos", { replace: true });
  };

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((project) => {
      const desc = (lang === "en" ? project.shortDescriptionEn ?? project.shortDescription : project.shortDescription);
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());
      const projectCategory = project.category || inferCategory(project.title);
      const matchCategory =
        selectedCategory === "Todos" || projectCategory === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Page Header */}
      <section className="pt-32 pb-16 border-b border-[#334155]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold text-[#F4F4F4] tracking-tight leading-none mb-6">
              {t.projects.title}
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
              {t.projects.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 space-y-5"
          >
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.projects.searchPlaceholder}
                className="w-full pl-9 pr-4 h-10 bg-transparent border border-[#334155] rounded text-sm text-[#F4F4F4] placeholder:text-[#64748B] focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORY_KEYS.map((key, i) => (
                <button
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  className={`px-3 py-1 text-xs font-medium rounded border transition-colors focus-ring ${
                    selectedCategory === key
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_8px_rgba(34, 211, 238, 0.3)]"
                      : "bg-transparent border-[#334155] text-[#94A3B8] hover:text-[#F4F4F4] hover:border-[#475569]"
                  }`}
                >
                  {t.projects.categories[i]}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects list */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        {isLoading ? (
          <div className="space-y-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-6 py-7 border-b border-[#334155]">
                <Skeleton className="w-8 h-4 bg-[#253348] shrink-0" />
                <Skeleton className="w-16 h-16 rounded bg-[#253348] shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48 bg-[#253348]" />
                  <Skeleton className="h-4 w-72 bg-[#253348]" />
                </div>
                <Skeleton className="h-4 w-20 bg-[#253348] shrink-0 hidden sm:block" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length ? (
          <div>
            {filteredProjects.map((project, i) => {
              const cardImg = project.thumbnailUrl || project.coverImageUrl || null;
              const category = project.category || inferCategory(project.title);
              // Project is "fully documented" when it has the full case structure
              const isDocumented = !!(project.problem && project.solution && project.result);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: Math.min(i * 0.06, 0.3) }}
                >
                  <Link href={`/projetos/${project.slug}`}>
                    <div className="project-row group">
                      {/* Index */}
                      <span className="font-mono text-xs text-[#64748B] w-8 shrink-0 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded border border-[#334155] bg-[#1E293B] shrink-0 overflow-hidden">
                        {cardImg ? (
                          <img
                            src={cardImg}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#2D3E52]">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <line x1="3" y1="9" x2="21" y2="9" />
                              <line x1="9" y1="21" x2="9" y2="9" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-[#F4F4F4] group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-xs font-mono text-[#64748B] border border-[#334155] px-2 py-0.5 rounded">
                            {category}
                          </span>
                          {isDocumented && (
                            <span className="text-xs font-mono text-primary/80 border border-primary/20 bg-primary/5 px-2 py-0.5 rounded">
                              {t.projects.caseTag}
                            </span>
                          )}
                          {project.featured && (
                            <span className="text-xs font-mono text-[#94A3B8] border border-[#334155] px-2 py-0.5 rounded">
                              {t.projects.featured}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#94A3B8] line-clamp-1 leading-relaxed">
                          {lang === "en" ? (project.shortDescriptionEn ?? project.shortDescription) : project.shortDescription}
                        </p>
                        {project.metricsSummary && (
                          <p className="text-xs font-mono text-primary/70 mt-1 line-clamp-1">
                            {project.metricsSummary.split("|")[0].trim()}
                          </p>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs text-[#64748B] group-hover:text-primary transition-colors hidden sm:block">
                          {t.projects.viewDetails}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-32 text-center border-t border-[#334155] flex flex-col items-center gap-4">
            <SearchX className="w-10 h-10 text-[#2D3E52]" />
            <div>
              <p className="font-mono text-xs text-[#64748B] uppercase tracking-widest mb-2">
                {t.projects.emptyTitle}
              </p>
              <p className="text-sm text-[#94A3B8]">{t.projects.emptyDesc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
