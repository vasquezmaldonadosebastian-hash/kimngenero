import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { filterNotebooks, getNotebookStats, notebooks, type NotebookItem } from "@/lib/notebooks";

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-extrabold text-[#1A0A2E]">{value}</p>
        </div>
        <div className="rounded-2xl bg-[#0176DE]/10 p-3 text-[#0176DE]">{icon}</div>
      </div>
    </div>
  );
}

function NotebookArtwork({ item }: { item: NotebookItem }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-end justify-between bg-gradient-to-br from-[#1A0A2E] via-[#173F8A] to-[#0176DE] p-5 text-white">
        <div className="max-w-[78%]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">KimnIA</p>
          <p className="mt-2 text-lg font-bold leading-tight">{item.title}</p>
        </div>
        <div className="rounded-full bg-white/15 p-3 backdrop-blur-sm">
          <BookOpen className="h-6 w-6" />
        </div>
      </div>
    );
  }

  return (
    <img
      src={item.imageUrl}
      alt={item.imageAlt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      onError={() => setFailed(true)}
    />
  );
}

function NotebookCard({
  item,
  onOpen,
}: {
  item: NotebookItem;
  onOpen: (item: NotebookItem) => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0176DE]"
        aria-label={`Ver detalle de ${item.title}`}
      >
        <NotebookArtwork item={item} />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-[#0176DE] px-3 py-1 text-xs font-bold text-white">
            {item.featured ? "Destacado" : "Notebook"}
          </span>
        </div>
      </button>

      <div className="flex h-full flex-col p-5">
        <div className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          KimnIA
        </div>

        <h3 className="mt-4 text-xl font-bold leading-tight text-slate-900">
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="text-left transition-colors hover:text-[#0176DE] focus:outline-none focus-visible:underline"
          >
            {item.title}
          </button>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-[#0176DE]/30 hover:text-[#0176DE]"
            >
              Ver detalle
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={item.notebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0176DE] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#03122E]"
            >
              NotebookLM
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function NotebooksLMS() {
  const [query, setQuery] = useState("");
  const [selectedNotebook, setSelectedNotebook] = useState<NotebookItem | null>(null);

  useEffect(() => {
    document.title = "KimnIA - [genIA] UdeC";
    window.scrollTo(0, 0);
  }, []);

  const visibleNotebooks = useMemo(() => filterNotebooks(notebooks, query), [query]);
  const stats = useMemo(() => getNotebookStats(notebooks), []);

  return (
    <div className="min-h-screen bg-[#F5F4F8] text-slate-700">
      <section className="relative overflow-hidden bg-[#03122E] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(1,118,222,0.35),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(124,58,237,0.28),_transparent_32%),linear-gradient(135deg,_#1A0A2E_0%,_#03122E_45%,_#0176DE_100%)]" />
        <div className="absolute left-[-5rem] top-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-8 h-64 w-64 rounded-full bg-[#9fd4ff]/20 blur-3xl" />

        <div className="container relative z-10 py-16 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              KimnIA
            </div>

            <h1
              className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              KimnIA
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
              KimnIA: Kimün es la palabra para el conocimiento, la sabiduría o el saber ancestral.
              KimnIA refleja que este repositorio es un espacio de aprendizaje y sabiduría sobre
              género, impulsado por tecnología.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#03122E] transition-colors hover:bg-[#E8F2FF]"
              >
                Explorar catálogo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#notebook-01"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                Ir al primero
                <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-8">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StatCard
              label="Notebooks publicados"
              value={stats.total.toString()}
              icon={<BookOpen className="h-5 w-5" />}
            />
            <StatCard
              label="Marcados como destacados"
              value={stats.featured.toString()}
              icon={<Star className="h-5 w-5" />}
            />
          </div>
        </div>
      </section>

      <section className="container pt-8" id="catalogo">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0176DE]">
                Exploración rápida
              </p>
              <h2
                className="mt-2 text-3xl font-extrabold tracking-tight text-[#1A0A2E]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Dos notebooks disponibles en KimnIA
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                Usa la búsqueda para filtrar por palabra clave o abre cualquiera de los cuadernos
                directamente en NotebookLM.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por título o palabra clave..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#0176DE] focus:bg-white focus:ring-4 focus:ring-[#0176DE]/10"
              />
            </label>
            {query && (
              <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>{visibleNotebooks.length} resultado(s) encontrado(s)</span>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-[#0176DE]"
                >
                  <X className="h-4 w-4" />
                  Limpiar
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container pb-16 pt-10">
        {visibleNotebooks.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
            <h2
              className="mt-4 text-2xl font-bold text-[#1A0A2E]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              No encontramos coincidencias
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
              Prueba con otro término o limpia la búsqueda para volver a ver los dos notebooks
              disponibles.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 rounded-xl bg-[#0176DE] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#03122E]"
            >
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visibleNotebooks.map((item) => (
              <div key={item.id} id={item.id}>
                <NotebookCard item={item} onOpen={setSelectedNotebook} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Dialog
        open={selectedNotebook !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedNotebook(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto border-slate-200 bg-[#F5F4F8] p-0">
          {selectedNotebook && (
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[18rem] overflow-hidden bg-slate-200 lg:min-h-full">
                <NotebookArtwork item={selectedNotebook} />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-[#0176DE] px-3 py-1 text-xs font-bold text-white">
                    {selectedNotebook.featured ? "Destacado" : "Notebook"}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <DialogHeader className="text-left">
                  <DialogTitle
                    className="text-2xl font-extrabold tracking-tight text-[#1A0A2E]"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {selectedNotebook.title}
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-sm leading-relaxed text-slate-600">
                    {selectedNotebook.longSummary}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Estado
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {selectedNotebook.status}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Etiquetas
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedNotebook.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={selectedNotebook.notebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0176DE] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#03122E]"
                  >
                    Abrir en NotebookLM
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedNotebook(null)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-[#0176DE]/30 hover:text-[#0176DE]"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
