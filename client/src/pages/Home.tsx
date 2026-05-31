/*
 * Home - KimnGenero
 * Portada simple, blanca y azul institucional.
 */

import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen } from "lucide-react";
import { useIndicatorsContext } from "@/contexts/IndicatorsContext";
import { page2Resources } from "@/lib/page2-resources";
import indicadoresData from "@data/indicadores.json";

type DimensionSource = {
  dimension?: string;
};

const fallbackIndicators = (indicadoresData as { indicadores: DimensionSource[] }).indicadores;

function formatTwoDigits(value: number) {
  return String(value).padStart(2, "0");
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-12 items-center justify-center rounded-lg border border-[#0176DE] bg-white px-4 py-3 text-center">
      <div className="flex flex-wrap items-baseline justify-center gap-x-2 text-[#0176DE]">
        <span className="font-montserrat text-[1.35rem] font-extrabold leading-none">{value}</span>
        <span className="font-montserrat text-[0.98rem] font-bold leading-none">{label}</span>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  color,
  iconSrc,
  iconScale = 1,
  count,
  dimension,
  index,
}: {
  title: string;
  color: string;
  iconSrc?: string;
  iconScale?: number;
  count: number;
  dimension: string;
  index: number;
}) {
  return (
    <Link href={`/indicadores?dimension=${encodeURIComponent(dimension)}`}>
      <article className="group min-h-[13.5rem] overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-[#0176DE]">
        <div className="h-2" style={{ backgroundColor: color }} aria-hidden="true" />
        <div className="flex h-full flex-col px-5 py-5">
          <div
            className="mb-5 flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-md text-xl font-extrabold text-white"
            style={{ backgroundColor: color }}
          >
            {iconSrc ? (
              <img
                src={iconSrc}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 object-contain"
                style={{ transform: `scale(${iconScale})` }}
              />
            ) : (
              formatTwoDigits(index + 1)
            )}
          </div>
          <h3 className="font-montserrat text-base font-bold leading-tight text-[#03122E] transition-colors group-hover:text-[#0176DE]">
            {title}
          </h3>
          <p className="mt-auto pt-5 text-sm font-semibold text-slate-500">
            {count} indicador{count !== 1 ? "es" : ""}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  const { indicators } = useIndicatorsContext();
  const activeIndicators = indicators.length > 0 ? indicators : fallbackIndicators;

  const countByDimension = useMemo(() => {
    const stats = new Map<string, number>();

    activeIndicators.forEach((indicator) => {
      if (!indicator.dimension) return;
      stats.set(indicator.dimension, (stats.get(indicator.dimension) ?? 0) + 1);
    });

    return stats;
  }, [activeIndicators]);

  const resourceCards = useMemo(
    () =>
      page2Resources.map((resource) => ({
        ...resource,
        count: countByDimension.get(resource.dimension) ?? 0,
      })),
    [countByDimension],
  );

  const totalIndicators = activeIndicators.length || 19;
  const dimensionsCount = page2Resources.length || 8;

  return (
    <main className="min-h-screen bg-white text-slate-700">
      <section className="bg-white">
        <div className="container max-w-[920px] pb-11 pt-3 sm:pb-12 sm:pt-4">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_0.92fr] md:gap-16">
            <div>
              <p className="font-montserrat text-lg font-bold leading-none text-[#858B91]">
                Plataforma Institucional de Datos
              </p>

              <h1 className="font-montserrat mt-7 text-[5rem] font-extrabold leading-[0.78] text-[#0176DE] sm:text-[6rem] md:text-[6.3rem]">
                Kimn
                <br />
                Género
              </h1>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/indicadores">
                  <span className="inline-flex h-[31px] min-w-[132px] items-center justify-center rounded-lg bg-[#0176DE] px-5 text-[0.72rem] font-bold text-white transition-colors hover:bg-[#0668C0]">
                    Explorar Indicadores
                  </span>
                </Link>
                <Link href="/metodologia">
                  <span className="inline-flex h-[31px] min-w-[132px] items-center justify-center rounded-lg bg-[#0176DE] px-5 text-[0.72rem] font-bold text-white transition-colors hover:bg-[#0668C0]">
                    Ver Metodología
                  </span>
                </Link>
              </div>
            </div>

            <div className="md:pt-[4.3rem]">
              <p className="text-[0.76rem] font-bold text-[#7C838B]">Datos abiertos</p>
              <h2 className="font-montserrat mt-4 max-w-[17rem] text-[1.18rem] font-extrabold leading-[1.05] text-[#0176DE]">
                Explore los
                <br />
                indicadores interactivos
              </h2>
              <p className="mt-4 max-w-[25rem] text-[0.76rem] leading-snug text-slate-500">
                Acceda a visualizaciones dinámicas de Power BI con datos actualizados sobre brechas de
                género.
              </p>
              <Link href="/indicadores">
                <span className="mt-4 inline-flex h-[18px] min-w-[77px] items-center justify-center rounded-full bg-[#0176DE] px-3 text-[0.48rem] font-bold text-white transition-colors hover:bg-[#0668C0]">
                  Ir a indicadores
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            <MetricCard label="Indicadores" value={String(totalIndicators)} />
            <MetricCard label="Áreas estrategicas" value="04" />
            <MetricCard label="Dimensiones" value={formatTwoDigits(dimensionsCount)} />
            <MetricCard label="Unidades" value="10" />
          </div>
        </div>
      </section>

      <section className="container max-w-[920px] pb-16">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-montserrat mt-1 text-2xl font-extrabold text-[#0176DE]">
              Explorar por dimensión
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">
            Las tarjetas quedan preparadas para recibir los SVG finales sin reutilizar los iconos generados.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resourceCards.map((resource, index) => (
            <ResourceCard
              key={resource.dimension}
              title={resource.title}
                color={resource.color}
                iconSrc={resource.iconSrc}
                iconScale={resource.iconScale}
                count={resource.count}
                dimension={resource.dimension}
                index={index}
            />
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-[#0176DE]/20 bg-[#F6FAFF] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#0176DE]">Datos para la igualdad de género</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">
                Plataforma institucional para consultar indicadores desagregados y apoyar el análisis de
                brechas con enfoque de género.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/indicadores">
                <span className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#0176DE] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0668C0]">
                  Indicadores
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/metodologia">
                <span className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#0176DE] bg-white px-4 text-sm font-semibold text-[#0176DE] transition-colors hover:bg-[#EAF3FF]">
                  <BookOpen className="h-4 w-4" />
                  Metodología
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
