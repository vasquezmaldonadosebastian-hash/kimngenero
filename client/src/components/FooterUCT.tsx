import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

export default function FooterUCT() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Dirección de Género
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#0176DE]" />
                <p>Manuel Montt 56, Campus San Francisco, Edificio 03, 4° Nivel</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#0176DE]" />
                <a href="tel:+56452685126" className="transition-colors hover:text-[#0176DE]">
                  (45) 2 685126
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#0176DE]" />
                <a href="mailto:direcciondegenero@uct.cl" className="transition-colors hover:text-[#0176DE]">
                  direcciondegenero@uct.cl
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Observatorio de Género
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#0176DE]" />
                <p>Manuel Montt 56, Campus San Francisco, Edificio 07, oficina 240</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#0176DE]" />
                <a href="tel:+56452685057" className="transition-colors hover:text-[#0176DE]">
                  (45) 2 685057
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#0176DE]" />
                <a href="mailto:observatorio@uct.cl" className="transition-colors hover:text-[#0176DE]">
                  observatorio@uct.cl
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Síguenos
            </h3>
            <div className="mb-6 flex items-center gap-4">
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-[#0176DE]" title="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-[#0176DE]" title="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-[#0176DE]" title="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-[#0176DE]" title="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg p-2 transition-colors hover:bg-[#0176DE]" title="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            <div className="space-y-2 text-sm">
              <a href="#" className="block transition-colors hover:text-[#0176DE]">
                Política de Privacidad
              </a>
              <a href="#" className="block transition-colors hover:text-[#0176DE]">
                Términos de Uso
              </a>
              <a href="#" className="block transition-colors hover:text-[#0176DE]">
                Accesibilidad
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-bold text-white">Enlaces de Interés</h4>
            <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
              <a href="#" className="transition-colors hover:text-[#0176DE]">
                Ministerio de la Mujer y Equidad de Género
              </a>
              <a href="#" className="transition-colors hover:text-[#0176DE]">
                Dirección de Género
              </a>
              <a href="#" className="transition-colors hover:text-[#0176DE]">
                Observatorio del Sistema Nacional de Ciencias
              </a>
              <a href="#" className="transition-colors hover:text-[#0176DE]">
                Observatorio Igualdad de Género CEPAL
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between border-t border-gray-700 pt-6 text-xs text-gray-400 md:flex-row">
            <p>TODO EL CONTENIDO © UCT 2025</p>
            <p className="mt-4 md:mt-0">
              Universidad Católica de Temuco | Dirección de Género y Observatorio de Indicadores de Género
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
