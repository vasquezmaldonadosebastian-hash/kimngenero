import { ChevronRight, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function HeaderUCT() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const topLinks = [
    { label: "CONECTA", href: "#" },
    { label: "UCT AL DIA", href: "#" },
    { label: "TEC-UCT", href: "#" },
    { label: "CENTRO DE AYUDA", href: "#" },
    { label: "DIRECTORIO", href: "#" },
    { label: "WEBMAIL", href: "#" },
    { label: "PORTAL DE PAGOS", href: "#" },
  ];

  const mainNavLinks = [
    { label: "INICIO", href: "/" },
    { label: "INDICADORES", href: "/indicadores" },
    { label: "VISTA GENERAL", href: "/estado-agrupado" },
    { label: "KimnIA", href: "/kimnia" },
    { label: "SOBRE EL MODELO", href: "/metodologia" },
    { label: "CALENDARIO", href: "/calendario" },
    { label: "GLOSARIO", href: "/glosario" },
    { label: "CONTACTO", href: "/contacto" },
  ];

  const isActiveLink = (href: string) => location === href || (href !== "/" && location.startsWith(`${href}/`));

  return (
    <>
      <div className="bg-[#0073CC] text-white">
        <div className="mx-auto hidden h-10 max-w-7xl items-center justify-between gap-4 px-4 lg:flex">
          <div className="flex min-w-0 items-center overflow-hidden text-[11px] font-semibold tracking-wider">
            {topLinks.map((link, idx) => (
              <div key={link.label} className="flex items-center whitespace-nowrap">
                <a href={link.href} className="px-3 transition-colors hover:text-gray-200">
                  {link.label}
                </a>
                {idx < topLinks.length - 1 && <span className="text-white/40">|</span>}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#" className="transition-transform hover:scale-110 hover:text-gray-200" aria-label="Facebook">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
            <a href="#" className="transition-transform hover:scale-110 hover:text-gray-200" aria-label="Twitter">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </a>
            <a href="#" className="transition-transform hover:scale-110 hover:text-gray-200" aria-label="Instagram">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
            <a href="#" className="transition-transform hover:scale-110 hover:text-gray-200" aria-label="LinkedIn">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 448 512">
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            <Link href="/">
              <div className="flex items-center transition-opacity hover:opacity-90">
                <img
                  src="/assets/logo_KIMN_gris-scaled.webp"
                  alt="Logo KIMN"
                  className="h-10 w-auto object-contain sm:h-11 md:h-14"
                />
              </div>
            </Link>

            <nav className="hidden items-center gap-5 xl:flex">
              {mainNavLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    aria-current={isActiveLink(link.href) ? "page" : undefined}
                    className={`border-b-2 pb-1 text-[11px] font-bold transition-colors ${
                      isActiveLink(link.href)
                        ? "border-[#0073CC] text-[#0073CC]"
                        : "border-transparent text-gray-700 hover:border-[#0073CC] hover:text-[#0073CC]"
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className="hidden rounded-full p-2 transition-colors hover:bg-gray-50 xl:inline-flex"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5 stroke-[2.5] text-[#0073CC]" />
              </button>

              <button
                className="inline-flex items-center justify-center rounded-full bg-white p-2.5 text-[#0073CC] ring-1 ring-inset ring-gray-200 transition-colors hover:bg-gray-50 xl:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DialogContent
          showCloseButton={false}
          id="mobile-navigation"
          className="!fixed !inset-0 !h-dvh !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-0 !p-0 shadow-none"
        >
          <div className="flex h-full flex-col bg-white">
            <div className="bg-[#0073CC] text-white">
              <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap px-4 py-2 text-[11px] font-semibold tracking-wider scrollbar-none">
                {topLinks.map((link, idx) => (
                  <div key={link.label} className="flex items-center">
                    <a href={link.href} className="shrink-0 px-2 transition-colors hover:text-gray-200">
                      {link.label}
                    </a>
                    {idx < topLinks.length - 1 && <span className="text-white/40">|</span>}
                  </div>
                ))}
              </div>
            </div>

            <DialogHeader className="border-b border-gray-100 px-4 py-4 text-left sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <Link href="/">
                  <div className="flex items-center transition-opacity hover:opacity-90">
                    <img src="/assets/logo_KIMN_gris-scaled.webp" alt="Logo KIMN" className="h-10 w-auto object-contain" />
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white text-[#0073CC] ring-1 ring-inset ring-gray-200 transition-colors hover:bg-gray-50"
                    aria-label="Buscar"
                  >
                    <Search className="h-5 w-5 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
                    aria-label="Cerrar menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
              <DialogTitle className="sr-only">Navegacion principal</DialogTitle>
              <nav className="grid gap-2" aria-label="Navegacion principal movil">
                {mainNavLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a
                      aria-current={isActiveLink(link.href) ? "page" : undefined}
                      className={`flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        isActiveLink(link.href)
                          ? "border-[#0073CC]/30 bg-[#0073CC]/5 text-[#0073CC]"
                          : "border-gray-200 bg-gray-50 text-gray-800 hover:border-[#0073CC]/20 hover:bg-white hover:text-[#0073CC]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </a>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                  Accesos institucionales
                </p>
                <div className="mt-3 grid gap-2">
                  {topLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex min-h-11 items-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#0073CC]/20 hover:bg-gray-50 hover:text-[#0073CC]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
