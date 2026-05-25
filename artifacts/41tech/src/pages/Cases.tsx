import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useListCases } from "@workspace/api-client-react";
import { Briefcase, ArrowRight, Search, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen bg-[#05070D]">
      {/* Page Header */}
      <section className="pt-32 pb-24 relative overflow-hidden bg-[#0B1020] border-b border-[rgba(255,255,255,0.05)]">
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t.cases.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-foreground tracking-tight">
              {t.cases.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#AAB6D3] leading-relaxed">
              {t.cases.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.cases.searchPlaceholder}
                className="pl-12 h-14 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] focus-visible:ring-primary text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl bg-[#0B1020]" />
                <Skeleton className="h-8 w-3/4 bg-[#0B1020]" />
                <Skeleton className="h-4 w-full bg-[#0B1020]" />
              </div>
            ))}
          </div>
        ) : filtered.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/cases/${c.slug}`}>
                  <div className="group h-full flex flex-col rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0B1020] hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] shadow-lg cursor-pointer">
                    {/* Top accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-primary via-[#00D8FF] to-primary/0" />

                    <div className="p-8 flex flex-col flex-1 relative">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
                        <div className="flex flex-wrap gap-2">
                          {c.clientSegment && (
                            <Badge className="bg-primary/10 text-primary border border-primary/20 font-mono text-xs">
                              {c.clientSegment}
                            </Badge>
                          )}
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00D8FF] transition-colors text-foreground relative z-10">
                        {c.title}
                      </h3>

                      {c.problem && (
                        <p className="text-[#AAB6D3] line-clamp-2 mb-5 flex-1 text-base leading-relaxed relative z-10">
                          {c.problem}
                        </p>
                      )}

                      {c.metricsSummary && (
                        <div className="mb-5 p-3 rounded-lg bg-[rgba(18,61,255,0.05)] border border-[rgba(18,61,255,0.1)] relative z-10">
                          <p className="text-sm font-semibold text-[#00D8FF]">
                            {c.metricsSummary}
                          </p>
                        </div>
                      )}

                      <div className="mt-auto overflow-hidden relative z-10">
                        <div className="flex items-center text-primary font-semibold translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          {t.cases.viewFull}{" "}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#0B1020] border border-[rgba(255,255,255,0.05)] rounded-2xl">
            <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {searchQuery ? t.cases.emptySearchTitle : t.cases.emptyNoneTitle}
            </h3>
            <p className="text-[#AAB6D3] text-lg">
              {searchQuery ? t.cases.emptySearchDesc : t.cases.emptyNoneDesc}
            </p>
          </div>
        )}

        {/* Private cases note */}
        {cases && cases.some((c) => c.isPublic === false) && (
          <div className="mt-12 flex items-center gap-3 text-sm text-[#AAB6D3] justify-center">
            <Lock className="w-4 h-4" />
            <span>
              {cases.filter((c) => c.isPublic === false).length} {t.cases.privateCases}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
