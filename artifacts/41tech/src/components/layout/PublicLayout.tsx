import { ReactNode } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetSiteSettings } from "@workspace/api-client-react";
import { Logo } from "@/components/brand/Logo";
import { useLanguage } from "@/lib/languageContext";
import type { Lang } from "@/lib/translations";

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  const toggle = (l: Lang) => () => setLang(l);

  if (compact) {
    // Mobile version — simple button row
    return (
      <div className="flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.12)] overflow-hidden w-fit">
        <button
          onClick={toggle("pt")}
          className={`px-4 py-2 text-sm font-bold transition-colors ${
            lang === "pt"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          PT
        </button>
        <button
          onClick={toggle("en")}
          className={`px-4 py-2 text-sm font-bold transition-colors ${
            lang === "en"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          EN
        </button>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="flex items-center rounded-full border border-[rgba(255,255,255,0.12)] overflow-hidden text-xs">
      <button
        onClick={toggle("pt")}
        className={`px-3 py-1.5 font-bold tracking-wide transition-colors ${
          lang === "pt"
            ? "bg-primary text-white"
            : "text-muted-foreground hover:text-white"
        }`}
      >
        PT
      </button>
      <button
        onClick={toggle("en")}
        className={`px-3 py-1.5 font-bold tracking-wide transition-colors ${
          lang === "en"
            ? "bg-primary text-white"
            : "text-muted-foreground hover:text-white"
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

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (settings?.whatsappUrl) {
      e.preventDefault();
      window.open(settings.whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground selection:bg-primary/30">
      <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.10)] glassmorphism">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="text-xl" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/projetos" className="hover:text-primary transition-colors">
              {t.nav.projects}
            </Link>
            <Link href="/cases" className="hover:text-primary transition-colors">
              {t.nav.cases}
            </Link>
            <Link href="/sobre-mim" className="hover:text-primary transition-colors">
              {t.nav.about}
            </Link>
            <LangToggle />
            <Button
              asChild
              className="border-0 text-white bg-gradient-to-r from-[#123DFF] to-[#0A28CC] hover:from-[#1a47ff] hover:to-[#1230e0]"
            >
              <a href="#contato" onClick={handleContactClick}>
                {t.nav.contact}
              </a>
            </Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border">
              <div className="flex flex-col gap-6 mt-12">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {t.nav.home}
                </Link>
                <Link
                  href="/projetos"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {t.nav.projects}
                </Link>
                <Link
                  href="/cases"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {t.nav.cases}
                </Link>
                <Link
                  href="/sobre-mim"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {t.nav.about}
                </Link>
                <LangToggle compact />
                <Button
                  asChild
                  className="w-full mt-2 bg-gradient-to-r from-[#123DFF] to-[#0A28CC] hover:from-[#1a47ff] hover:to-[#1230e0] border-0 text-white"
                >
                  <a href="#contato" onClick={handleContactClick}>
                    {t.nav.contact}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[rgba(255,255,255,0.10)] bg-[#05070D] py-12 md:py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Logo className="text-xl" />
            </div>
            <p className="text-muted-foreground max-w-sm mt-4">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-foreground">{t.footer.navTitle}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/projetos" className="hover:text-primary transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-primary transition-colors">
                  {t.nav.cases}
                </Link>
              </li>
              <li>
                <Link href="/sobre-mim" className="hover:text-primary transition-colors">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-foreground">{t.footer.contactTitle}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {settings?.contactEmail ? (
                <li>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="hover:text-primary transition-colors"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
              ) : (
                <li>contato@grupo41.com.br</li>
              )}
              {settings?.whatsappUrl && (
                <li>
                  <a
                    href={settings.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {settings?.linkedinUrl && (
                <li>
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              <li>{t.footer.country}</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-[rgba(255,255,255,0.10)] text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} Kauan Funaki. {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}
