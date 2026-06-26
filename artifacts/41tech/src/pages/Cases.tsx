import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useListCases } from "@workspace/api-client-react";
import { ArrowRight, Search, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useT } from "@/lib/languageContext";

export default function Cases() {
  const t = useT();

  useSEO({
    title: t.cases.title,
    description: t.cases.subtitle,
  });

  const { data: cases, isLoading } = useListCases();
  const [searchQuery, setSearchQuery] = useState("");

  const publicCases = useMemo(() => {
    if (!cases) return [];
    return cases.filter((c) => c.isPublic !== false);
  }, [cases]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return publicCases;
    return publicCases.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.clientSegment ?? "").toLowerCase().includes(q) ||
        (c.problem ?? "").toLowerCase().includes(q)
    );
  }, [publicCases, searchQuery]);

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
              {t.cases.title}
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-xl leading-relaxed">
              {t.cases.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10"
          >
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.cases.searchPlaceholder}
                className="w-full pl-9 pr-4 h-10 bg-transparent border border-[#334155] rounded text-sm text-[#F4F4F4] placeholder:text-[#64748B] focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cases list */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        {isLoading ? (
          <div className="space-y-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-6 py-8 border-b border-[#334155]">
                <Skeleton className="w-8 h-4 bg-[#253348] shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48 bg-[#253348]" />
                  <Skeleton className="h-4 w-80 bg-[#253348]" />
                  <Skeleton className="h-4 w-64 bg-[#253348]" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length ? (
          <div>
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.06, 0.3) }}
              >
                <Link href={`/cases/${c.slug}`}>
                  <div className="group flex items-start gap-6 py-8 border-b border-[#334155] cursor-pointer hover:pl-3 transition-all duration-200">
                    {/* Index */}
                    <span className="font-mono text-xs text-[#64748B] w-8 shrink-0 mt-1 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-[#F4F4F4] group-hover:text-primary transition-colors">
                          {c.title}
                        </h3>
                        {c.clientSegment && (
                          <span className="text-xs font-mono text-[#64748B] border border-[#334155] px-2 py-0.5 rounded">
                            {c.clientSegment}
                          </span>
                        )}
                      </div>

                      {c.problem && (
                        <p className="text-sm text-[#94A3B8] line-clamp-2 leading-relaxed mb-2">
                          {c.problem}
                        </p>
                      )}

                      {c.metricsSummary && (
                        <p className="text-xs font-mono text-primary/70 line-clamp-1">
                          {c.metricsSummary.split("|")[0].trim()}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-1.5 mt-0.5 shrink-0">
                      <span className="text-xs text-[#64748B] group-hover:text-primary transition-colors hidden sm:block">
                        {t.cases.viewFull}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-t border-[#334155]">
            <p className="font-mono text-xs text-[#64748B] uppercase tracking-widest mb-3">
              {searchQuery ? t.cases.emptySearchTitle : t.cases.emptyNoneTitle}
            </p>
            <p className="text-sm text-[#94A3B8]">
              {searchQuery ? t.cases.emptySearchDesc : t.cases.emptyNoneDesc}
            </p>
          </div>
        )}

        {/* Private cases note */}
        {cases && cases.some((c) => c.isPublic === false) && (
          <div className="mt-12 flex items-center gap-2 text-xs font-mono text-[#64748B] justify-center">
            <Lock className="w-3.5 h-3.5" />
            <span>
              {cases.filter((c) => c.isPublic === false).length} {t.cases.privateCases}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
