import { useMemo } from "react";
import { useRoute, Link } from "wouter";
import { useGetCase, getGetCaseQueryKey, useGetSiteSettings } from "@workspace/api-client-react";
import {
  ArrowLeft,
  Send,
  Briefcase,
  ExternalLink,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-32 min-h-screen">
        <Skeleton className="h-4 w-32 mb-12 bg-[#1A1A1B]" />
        <Skeleton className="h-12 w-3/4 mb-4 bg-[#1A1A1B]" />
        <Skeleton className="h-5 w-1/2 mb-16 bg-[#1A1A1B]" />
        <Skeleton className="aspect-video w-full rounded bg-[#1A1A1B]" />
      </div>
    );
  }

  if (isError || !caseStudy) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-40 text-center min-h-screen flex flex-col items-center justify-center">
        <LayoutTemplate className="w-16 h-16 text-[#333336] mb-8" />
        <h1 className="text-2xl font-bold mb-6 text-[#F0F0F0]">
          {t.caseDetail.notFound}
        </h1>
        <Link
          href="/cases"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {t.caseDetail.backToCases}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0E]">
      {/* Header */}
      <section className="pt-32 pb-16 border-b border-[#323234]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Link
            href="/cases"
            className="inline-flex items-center text-xs font-mono text-[#7A7A85] hover:text-[#F0F0F0] mb-10 transition-colors uppercase tracking-wider gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.caseDetail.back}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-mono text-[#7A7A85] border border-[#323234] px-2 py-0.5 rounded">
                {t.caseDetail.badge}
              </span>
              {caseStudy.clientSegment && (
                <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 rounded">
                  {caseStudy.clientSegment}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#F0F0F0] tracking-tight leading-none mb-6">
              {caseStudy.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Cover / Video */}
      {(caseStudy.coverImageUrl || caseStudy.videoUrl) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-6xl mx-auto px-6 md:px-12 py-8"
        >
          <div className="aspect-video w-full rounded border border-[#323234] overflow-hidden bg-[#131314]">
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
              <img
                src={caseStudy.coverImageUrl!}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article */}
          <div className="lg:col-span-8 space-y-16">

            {/* Metrics */}
            {metrics.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest mb-6">{t.caseDetail.impact}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#323234] border border-[#323234] rounded overflow-hidden">
                  {metrics.map((metric, i) => (
                    <div key={i} className="bg-[#0D0D0E] px-6 py-5">
                      <p className="text-base font-semibold text-[#F0F0F0]">{metric}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Challenge */}
            {caseStudy.problem && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest mb-6">{t.caseDetail.challenge}</h2>
                <div className="border-l-2 border-[#323234] pl-6">
                  <p className="text-[#888895] text-base leading-relaxed whitespace-pre-wrap">{caseStudy.problem}</p>
                </div>
              </motion.section>
            )}

            {/* Solution */}
            {caseStudy.solution && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest mb-6">{t.caseDetail.solution}</h2>
                <div className="border-l-2 border-primary/40 pl-6">
                  <p className="text-[#888895] text-base leading-relaxed whitespace-pre-wrap">{caseStudy.solution}</p>
                </div>
              </motion.section>
            )}

            {/* Result */}
            {caseStudy.result && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest mb-6">{t.caseDetail.result}</h2>
                <div className="border-l-2 border-[#323234] pl-6">
                  <p className="text-[#888895] text-base leading-relaxed whitespace-pre-wrap">{caseStudy.result}</p>
                </div>
              </motion.section>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest mb-6">{t.caseDetail.gallery}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryImages.map((imgUrl, i) => (
                    <div key={i} className="aspect-video w-full rounded border border-[#323234] bg-[#131314] overflow-hidden">
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-12 border-t border-[#323234]"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F0F0F0] mb-3">
                {t.caseDetail.ctaTitle}
              </h3>
              <p className="text-[#888895] text-base mb-6 max-w-md">
                {t.caseDetail.ctaSubtitle}
              </p>
              <button
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded transition-colors"
              >
                {t.caseDetail.ctaBtn}
                <Send className="w-4 h-4" />
              </button>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="border border-[#323234] rounded bg-[#131314] p-6 space-y-6 sticky top-24">
              <h3 className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest pb-4 border-b border-[#323234]">
                {t.caseDetail.sidebarTitle}
              </h3>

              {/* Type */}
              <div>
                <p className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest mb-2">
                  {t.caseDetail.typeLabel}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-[#888895]">
                  <Briefcase className="w-3.5 h-3.5" />
                  {t.caseDetail.badge}
                </div>
              </div>

              {/* Segment */}
              {caseStudy.clientSegment && (
                <div className="pt-4 border-t border-[#323234]">
                  <p className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest mb-2">
                    {t.caseDetail.segmentLabel}
                  </p>
                  <span className="text-sm text-[#F0F0F0]">{caseStudy.clientSegment}</span>
                </div>
              )}

              {/* Metrics */}
              {metrics.length > 0 && (
                <div className="pt-4 border-t border-[#323234]">
                  <p className="font-mono text-xs text-[#7A7A85] uppercase tracking-widest mb-3">
                    {t.caseDetail.resultsLabel}
                  </p>
                  <div className="space-y-1.5">
                    {metrics.map((m, i) => (
                      <p key={i} className="text-sm text-[#888895]">{m}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Related URL */}
              {caseStudy.relatedUrl && (
                <div className="pt-4 border-t border-[#323234]">
                  <a
                    href={caseStudy.relatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {t.caseDetail.relatedProjectBtn}
                  </a>
                </div>
              )}
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
