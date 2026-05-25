import { useMemo } from "react";
import { useRoute, Link } from "wouter";
import { useGetCase, getGetCaseQueryKey, useGetSiteSettings } from "@workspace/api-client-react";
import {
  ArrowLeft,
  AlertTriangle,
  Zap,
  TrendingUp,
  Send,
  Briefcase,
  ExternalLink,
  LayoutTemplate,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useT } from "@/lib/languageContext";

function CaseDetailInner() {
  const t = useT();
  const [, params] = useRoute("/cases/:slug");
  const slug = params?.slug || "";

  const { data: caseStudy, isLoading, isError } = useGetCase(slug, {
    query: { enabled: !!slug, queryKey: getGetCaseQueryKey(slug) },
  });
  const { data: settings } = useGetSiteSettings();

  useSEO({
    title: caseStudy?.title ?? t.caseDetail.seoFallbackTitle,
    description: caseStudy?.problem
      ? caseStudy.problem.slice(0, 160)
      : t.caseDetail.seoFallbackDesc,
    image: caseStudy?.coverImageUrl ?? undefined,
  });

  const metrics = useMemo(
    () =>
      caseStudy?.metricsSummary
        ?.split("|")
        .map((m) => m.trim())
        .filter(Boolean) ?? [],
    [caseStudy?.metricsSummary]
  );

  const galleryImages = useMemo(
    () =>
      caseStudy?.galleryImages
        ?.split(/[\n,]/)
        .map((u) => u.trim())
        .filter(Boolean) ?? [],
    [caseStudy?.galleryImages]
  );

  const handleContactClick = () => {
    if (settings?.whatsappUrl) {
      window.open(settings.whatsappUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = "/#contato";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 bg-[#05070D] min-h-screen">
        <Skeleton className="h-8 w-32 mb-12 bg-[#0B1020]" />
        <Skeleton className="h-16 w-3/4 mb-6 bg-[#0B1020]" />
        <Skeleton className="h-6 w-1/2 mb-16 bg-[#0B1020]" />
        <Skeleton className="aspect-[21/9] w-full rounded-2xl mb-16 bg-[#0B1020]" />
      </div>
    );
  }

  if (isError || !caseStudy) {
    return (
      <div className="container mx-auto px-4 py-40 text-center bg-[#05070D] min-h-screen flex flex-col items-center justify-center">
        <LayoutTemplate className="w-20 h-20 text-muted-foreground mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          {t.caseDetail.notFound}
        </h1>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
          <Link href="/cases">{t.caseDetail.backToCases}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070D]">
      {/* Hero */}
      <div className="relative pt-32 pb-40 overflow-hidden bg-[#0B1020] border-b border-[rgba(255,255,255,0.05)]">
        <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/cases"
            className="inline-flex items-center text-sm font-bold text-[#AAB6D3] hover:text-[#00D8FF] mb-12 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            {t.caseDetail.back}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-background/80 text-white border-[rgba(255,255,255,0.1)] hover:bg-background text-sm px-4 py-1">
                {t.caseDetail.badge}
              </Badge>
              {caseStudy.clientSegment && (
                <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 text-sm px-4 py-1">
                  {caseStudy.clientSegment}
                </Badge>
              )}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-foreground tracking-tight leading-tight">
              {caseStudy.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-20 pb-32">
        {/* Cover / Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {caseStudy.coverImageUrl || caseStudy.videoUrl ? (
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] bg-[#0B1020] mb-8">
              {caseStudy.videoUrl ? (
                <video
                  src={caseStudy.videoUrl}
                  controls
                  muted
                  playsInline
                  poster={caseStudy.coverImageUrl ?? undefined}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-background/40 to-transparent opacity-60 z-10" />
                  <img
                    src={caseStudy.coverImageUrl!}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[21/9] w-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] bg-gradient-to-br from-[#061A44] to-[#0B1020] flex items-center justify-center mb-8 relative overflow-hidden">
              <div className="absolute inset-0 tech-grid opacity-30" />
              <Briefcase className="w-32 h-32 text-primary/30 relative z-10" />
            </div>
          )}

          {caseStudy.relatedUrl && (
            <div className="flex gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 text-base font-bold bg-gradient-to-r from-[#123DFF] to-[#0A28CC] hover:from-[#1a47ff] hover:to-[#1230e0] text-white border-0"
              >
                <a href={caseStudy.relatedUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t.caseDetail.relatedProject}
                </a>
              </Button>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-20">
            {/* Metrics */}
            {metrics.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-8 text-foreground">{t.caseDetail.impact}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-[rgba(18,61,255,0.05)] border border-[rgba(18,61,255,0.1)] flex items-center justify-center text-center"
                    >
                      <p className="text-2xl font-bold text-[#00D8FF]">{metric}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Challenge */}
            {caseStudy.problem && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{t.caseDetail.challenge}</h2>
                </div>
                <div className="p-8 md:p-10 rounded-2xl bg-[#0B1020] border border-red-500/20 text-white text-lg md:text-xl leading-relaxed shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                  <p className="whitespace-pre-wrap">{caseStudy.problem}</p>
                </div>
              </motion.section>
            )}

            {/* Solution */}
            {caseStudy.solution && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{t.caseDetail.solution}</h2>
                </div>
                <div className="p-8 md:p-10 rounded-2xl bg-[#0B1020] border border-primary/30 text-white text-lg md:text-xl leading-relaxed shadow-[inset_0_0_20px_rgba(18,61,255,0.05)]">
                  <p className="whitespace-pre-wrap">{caseStudy.solution}</p>
                </div>
              </motion.section>
            )}

            {/* Result */}
            {caseStudy.result && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{t.caseDetail.result}</h2>
                </div>
                <div className="p-8 md:p-10 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-white text-lg md:text-xl leading-relaxed shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                  <p className="whitespace-pre-wrap">{caseStudy.result}</p>
                </div>
              </motion.section>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-8 text-foreground">{t.caseDetail.gallery}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {galleryImages.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="aspect-video w-full rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#0B1020]"
                    >
                      <img
                        src={imgUrl}
                        alt={`${t.caseDetail.gallery} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-12 border-t border-[rgba(255,255,255,0.05)]"
            >
              <div className="p-12 rounded-2xl bg-gradient-to-br from-[#061A44] to-[#0B1020] border border-primary/20 text-center">
                <h3 className="text-3xl font-bold text-white mb-4">{t.caseDetail.ctaTitle}</h3>
                <p className="text-[#AAB6D3] text-lg mb-8 max-w-xl mx-auto">
                  {t.caseDetail.ctaSubtitle}
                </p>
                <Button
                  size="lg"
                  onClick={handleContactClick}
                  className="h-14 px-8 text-base font-bold bg-gradient-to-r from-[#123DFF] to-[#0A28CC] hover:from-[#1a47ff] hover:to-[#1230e0] text-white border-0 glow-blue"
                >
                  {t.caseDetail.ctaBtn} <Send className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0B1020] space-y-8 sticky top-32 glassmorphism">
              <h3 className="font-bold text-2xl text-white border-b border-[rgba(255,255,255,0.1)] pb-6">
                {t.caseDetail.sidebarTitle}
              </h3>

              <div className="space-y-6">
                <div>
                  <span className="text-sm font-bold text-[#AAB6D3] uppercase tracking-wider block mb-3">
                    {t.caseDetail.typeLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#061A44] text-[#00D8FF] border border-[#00D8FF]/30">
                    <Briefcase className="w-4 h-4" />
                    {t.caseDetail.badge}
                  </span>
                </div>

                {caseStudy.clientSegment && (
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.1)]">
                    <span className="text-sm font-bold text-[#AAB6D3] uppercase tracking-wider block mb-3">
                      {t.caseDetail.segmentLabel}
                    </span>
                    <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold bg-primary/10 text-primary border border-primary/20">
                      {caseStudy.clientSegment}
                    </span>
                  </div>
                )}

                {metrics.length > 0 && (
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.1)]">
                    <span className="text-sm font-bold text-[#AAB6D3] uppercase tracking-wider block mb-4">
                      {t.caseDetail.resultsLabel}
                    </span>
                    <div className="space-y-2">
                      {metrics.map((m, i) => (
                        <div
                          key={i}
                          className="px-3 py-2 rounded-lg bg-[rgba(18,61,255,0.08)] border border-[rgba(18,61,255,0.15)] text-[#00D8FF] text-sm font-semibold"
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.relatedUrl && (
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.1)]">
                    <Button
                      asChild
                      className="w-full h-12 text-sm font-bold bg-gradient-to-r from-[#123DFF] to-[#0A28CC] hover:from-[#1a47ff] hover:to-[#1230e0] text-white border-0 glow-blue justify-center"
                    >
                      <a href={caseStudy.relatedUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t.caseDetail.relatedProjectBtn}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseDetail() {
  return <CaseDetailInner />;
}
