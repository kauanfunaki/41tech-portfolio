import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useGetSiteSettings } from "@workspace/api-client-react";
import { Logo } from "@/components/brand/Logo";
import { useLanguage } from "@/lib/languageContext";
import type { Lang } from "@/lib/translations";

function LangToggle({ large = false }: { large?: boolean }) {
  const { lang, setLang } = useLanguage();
  const toggle = (l: Lang) => () => setLang(l);
  const base = large ? "px-4 py-2 text-sm" : "px-2.5 py-1 text-xs";
  return (
    <div className="flex items-center rounded border border-[#323234] overflow-hidden" role="group" aria-label="Seletor de idioma">
      <button
        onClick={toggle("pt")}
        aria-label="Português"
        aria-pressed={lang === "pt"}
        className={`${base} font-bold tracking-wide transition-colors focus-ring ${
          lang === "pt" ? "bg-primary text-primary-foreground" : "text-[#888895] hover:text-[#F0F0F0]"
        }`}
      >
        PT
      </button>
      <button
        onClick={toggle("en")}
        aria-label="English"
        aria-pressed={lang === "en"}
        className={`${base} font-bold tracking-wide transition-colors focus-ring ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-[#888895] hover:text-[#F0F0F0]"
        }`}
      >
        EN
      </button>
    </div>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  const { data: settings } = useGetSiteSettings();
  const { t } = useLanguage();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { href: "/expertise", label: t.nav.expertise },
    { href: "/projetos", label: t.nav.projects },
    { href: "/experiencia", label: t.nav.experience },
    { href: "/contato", label: t.nav.contact },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0E] flex flex-col text-[#F0F0F0] selection:bg-primary/30">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#0D0D0E]/95 backdrop-blur-sm border-b border-[#323234]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo className="text-xl" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const isActive = location === link.href || location.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-0.5 transition-colors focus-ring ${
                    isActive
                      ? "text-[#F0F0F0] border-b border-primary"
                      : "text-[#888895] hover:text-[#F0F0F0] border-b border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right: lang toggle */}
          <div className="hidden md:flex items-center gap-4">
            <LangToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#888895] hover:text-[#F0F0F0] transition-colors focus-ring rounded"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0D0D0E] border-t border-[#323234]" role="navigation" aria-label="Menu mobile">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = location === link.href || location.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium transition-colors focus-ring rounded ${
                      isActive ? "text-primary" : "text-[#F0F0F0] hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#323234]">
                <LangToggle large />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#323234] bg-[#0D0D0E] py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <Logo className="text-xl" />
            <p className="text-sm text-[#888895] leading-relaxed max-w-sm mt-4">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono text-[#7A7A85] uppercase tracking-widest mb-4">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-sm text-[#888895]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#F0F0F0] transition-colors focus-ring rounded">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono text-[#7A7A85] uppercase tracking-widest mb-4">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-2 text-sm text-[#888895]">
              {settings?.contactEmail && (
                <li>
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-[#F0F0F0] transition-colors">
                    {settings.contactEmail}
                  </a>
                </li>
              )}
              {settings?.whatsappUrl && (
                <li>
                  <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F0F0F0] transition-colors">
                    WhatsApp
                  </a>
                </li>
              )}
              {settings?.linkedinUrl && (
                <li>
                  <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F0F0F0] transition-colors">
                    LinkedIn
                  </a>
                </li>
              )}
              <li>{t.footer.country}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-[#323234] text-xs text-[#7A7A85]">
          © {new Date().getFullYear()} Kauan Funaki — {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}
