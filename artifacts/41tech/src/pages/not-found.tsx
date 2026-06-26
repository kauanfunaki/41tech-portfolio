import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home, FolderGit2, Briefcase } from "lucide-react";
import { useT } from "@/lib/languageContext";

export default function NotFound() {
  const t = useT();

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6 max-w-lg mx-auto"
      >
        <p className="font-mono text-[6rem] md:text-[9rem] font-bold leading-none text-[#334155] select-none mb-6">
          404
        </p>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-[#F4F4F4] mb-4">
          {t.notFound.title}
        </h1>
        <p className="text-sm text-[#94A3B8] mb-10 leading-relaxed">
          {t.notFound.desc1}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded transition-colors"
          >
            <Home className="w-4 h-4" />
            {t.notFound.home}
          </Link>

          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#334155] text-[#94A3B8] hover:text-[#F4F4F4] hover:border-[#475569] text-sm font-semibold rounded transition-colors"
          >
            <FolderGit2 className="w-4 h-4" />
            {t.notFound.projects}
          </Link>

          <Link
            href="/cases"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#334155] text-[#94A3B8] hover:text-[#F4F4F4] hover:border-[#475569] text-sm font-semibold rounded transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            {t.notFound.cases}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
