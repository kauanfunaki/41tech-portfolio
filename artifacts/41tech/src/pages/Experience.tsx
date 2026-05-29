import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

export default function Experience() {
  useSEO({
    title: "Experiência",
    description: "Trajetória profissional de Kauan Funaki.",
  });

  return (
    <div className="min-h-screen bg-[#0D0D0E]">
      <section className="pt-32 pb-16 border-b border-[#272729]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-num mb-4 block">// 00</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-[#F0F0F0] tracking-tight leading-none mb-6">
              Experiência
            </h1>
            <p className="text-lg text-[#888895] max-w-xl leading-relaxed">
              Trajetória profissional e histórico de atuação.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <p className="text-sm font-mono text-[#555560]">Em construção — conteúdo em breve.</p>
      </div>
    </div>
  );
}
