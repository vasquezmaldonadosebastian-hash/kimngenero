import { Mail, MapPin, Phone } from "lucide-react";

const footerLogos = [
  {
    src: "/assets/footer/logo3.png",
    alt: "Universidad acreditada nivel avanzado",
    href: "https://www.cnachile.cl",
  },
  {
    src: "/assets/footer/cruch_logo.webp",
    alt: "Consejo de Rectoras y Rectores de las Universidades Chilenas",
    href: "https://www.consejoderectores.cl",
  },
  {
    src: "/assets/footer/g9-1.png",
    alt: "Red G9",
    href: "https://redg9.cl",
  },
  {
    src: "/assets/footer/logoredcampusustentable.png",
    alt: "Red Campus Sustentable",
    href: "https://www.redcampussustentable.cl",
  },
];

export default function FooterUCT() {
  return (
    <footer className="border-t-8 border-[#0176DE] bg-white text-[#8B8B8B]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.1fr_1.1fr_1.2fr_0.9fr] xl:gap-14">
          <section>
            <h2 className="font-montserrat mb-8 text-2xl font-extrabold text-[#4A4A4A]">KIMN es parte de</h2>
            <a href="https://gobiernodedatos.uct.cl" target="_blank" rel="noreferrer" className="inline-flex">
              <img
                src="https://kimn.uct.cl/wp-content/uploads/2025/10/gobierno-de-datos.webp"
                alt="Programa Gobierno de Datos"
                className="h-auto w-52 max-w-full"
              />
            </a>

            <h3 className="font-montserrat mb-5 mt-12 text-lg font-extrabold text-[#4A4A4A]">Impulsado por</h3>
            <a href="https://gobiernodedatos.uct.cl" target="_blank" rel="noreferrer" className="inline-flex">
              <img
                src="https://kimn.uct.cl/wp-content/uploads/2025/10/dgob.webp"
                alt="Direccion de Gobierno de Datos y Gestion de Informacion"
                className="h-auto w-36"
              />
            </a>
            <p className="font-montserrat mt-6 text-base font-medium text-[#999]">#SomosUCT</p>
          </section>

          <section>
            <h2 className="font-montserrat mb-7 text-2xl font-extrabold text-[#4A4A4A]">Contactanos</h2>
            <div className="space-y-5 text-base leading-relaxed">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#8B8B8B]" />
                <p>Av. Alemania 0422 Casona Malmus, Campus Mechaca Lira, Temuco</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#8B8B8B]" />
                <a href="tel:+56452553706" className="font-medium text-[#0176DE] hover:underline">
                  +56 45 2 553 706
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#8B8B8B]" />
                <a href="mailto:dgob@uct.cl" className="font-medium text-[#0176DE] hover:underline">
                  dgob@uct.cl
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-montserrat mb-7 text-2xl font-extrabold text-[#4A4A4A]">Links de interes</h2>
            <nav className="space-y-4 text-base leading-snug">
              <a href="https://www.uct.cl" target="_blank" rel="noreferrer" className="block hover:text-[#0176DE]">
                Vicerrectoria de Calidad y Gestion Estrategica
              </a>
              <a
                href="https://gobiernodedatos.uct.cl"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#0176DE]"
              >
                Programa de Gobierno de Datos
              </a>
              <a
                href="https://catalogoindicadores.uct.cl"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#0176DE]"
              >
                Catalogo de Indicadores
              </a>
              <a href="https://kimn.uct.cl" target="_blank" rel="noreferrer" className="block hover:text-[#0176DE]">
                KIMN UCT
              </a>
              <a
                href="https://escuchaactiva.uct.cl"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#0176DE]"
              >
                Escucha Activa
              </a>
            </nav>
          </section>

          <section className="flex flex-wrap items-center gap-5 md:justify-start xl:flex-col xl:items-start xl:gap-8">
            {footerLogos.map((logo) => (
              <a key={logo.alt} href={logo.href} target="_blank" rel="noreferrer" className="inline-flex">
                <span className="flex h-20 w-32 items-center justify-center sm:h-24 sm:w-36">
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                </span>
              </a>
            ))}
          </section>
        </div>

        <div className="mt-14 border-t border-[#E5E5E5] pt-6 text-sm text-[#999]">
          Universidad Catolica de Temuco | Sistema de Informacion Institucional KIMN
        </div>
      </div>
    </footer>
  );
}
