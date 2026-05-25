import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home, FolderGit2, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/languageContext";

export default function NotFound() {
  const t = useT();

  return (
    <div className="min-h-screen bg-[#05070D] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4 max-w-2xl mx-auto"
      >
        <div className="text-[10rem] md:text-[14rem] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/40 to-primary/5 select-none mb-4">
          404
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 -mt-4">
          {t.notFound.title}
        </h1>
        <p className="text-lg text-[#AAB6D3] mb-12 leading-relaxed">
          {t.notFound.desc1}
          <br />
          {t.notFound.desc2}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-base font-bold bg-gradient-to-r from-[#123DFF] to-[#0A28CC] hover:from-[#1a47ff] hover:to-[#1230e0] text-white border-0 glow-blue w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              {t.notFound.home}
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base font-bold border-[rgba(255,255,255,0.15)] text-white hover:bg-white/5 glassmorphism w-full sm:w-auto"
          >
            <Link href="/projetos">
              <FolderGit2 className="w-5 h-5 mr-2" />
              {t.notFound.projects}
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base font-bold border-[rgba(255,255,255,0.15)] text-white hover:bg-white/5 glassmorphism w-full sm:w-auto"
          >
            <Link href="/cases">
              <Briefcase className="w-5 h-5 mr-2" />
              {t.notFound.cases} <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
