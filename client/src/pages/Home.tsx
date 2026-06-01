/*
 * Home - KimnGenero
 * Portada simple, blanca y azul institucional.
 */

import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
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
    <div className="flex min-h-12 items-center justify-center rounded-full border-2 border-[#0176DE] bg-white px-6 py-3 text-center">
      <div className="flex flex-wrap items-baseline justify-center gap-x-2 text-[#0176DE]">
        <span className="font-montserrat whitespace-nowrap text-[1.35rem] font-extrabold leading-none">{value}</span>
        <span className="font-montserrat whitespace-nowrap text-[0.92rem] font-bold leading-none">{label}</span>
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
      <article
        className="group flex h-[11.75rem] overflow-hidden bg-[#0176DE] text-white transition-[filter] hover:brightness-95"
        style={{ backgroundColor: color }}
      >
        <div className="flex h-full w-full flex-col px-4 pb-4 pt-3">
          <div className="mb-auto flex h-12 w-12 items-center justify-center text-sm font-extrabold text-white">
            {iconSrc ? (
              <img
                src={iconSrc}
                alt=""
                aria-hidden="true"
                className="h-11 w-11 object-contain"
                style={{ transform: `scale(${iconScale})` }}
              />
            ) : (
              formatTwoDigits(index + 1)
            )}
          </div>
          <h3 className="font-montserrat mt-3 text-[0.64rem] font-extrabold leading-[1.05] text-white sm:text-[0.66rem]">
            {title}
          </h3>
          <p className="mt-2 inline-flex h-4 w-fit min-w-[4.2rem] items-center justify-center rounded-full border border-white px-2.5 text-[0.38rem] font-extrabold text-white">
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
    <div className="bg-white text-slate-700">
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-6 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-10">
          <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-[0.92fr_1fr] md:gap-20">
            <div>
              <p className="font-montserrat text-lg font-bold leading-none text-[#858B91]">
                Plataforma Institucional de Datos
              </p>

              <h1 className="font-montserrat mt-7 text-[5rem] font-extrabold leading-[0.78] text-[#0176DE] sm:text-[6rem] md:text-[6.7rem]">
                Kimn
                <br />
                Género
              </h1>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/indicadores">
                  <span className="inline-flex h-[31px] min-w-[132px] items-center justify-center rounded-full bg-[#0176DE] px-5 text-[0.68rem] font-bold text-white transition-colors hover:bg-[#0668C0]">
                    Explorar Indicadores
                  </span>
                </Link>
                <Link href="/metodologia">
                  <span className="inline-flex h-[31px] min-w-[132px] items-center justify-center rounded-full bg-[#0176DE] px-5 text-[0.68rem] font-bold text-white transition-colors hover:bg-[#0668C0]">
                    Ver Metodología
                  </span>
                </Link>
              </div>
            </div>

            <div className="pb-7 md:pb-12">
              <p className="font-montserrat max-w-[36rem] text-[1.55rem] font-bold leading-[1.18] text-[#858B91] md:text-[1.75rem]">
                Plataforma interactiva para la visualización y análisis de datos desagregados por sexo.
                Evidencia para el diseño de políticas públicas con enfoque de género.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            <MetricCard label="Indicadores" value={String(totalIndicators)} />
            <MetricCard label="Áreas estratégicas" value="04" />
            <MetricCard label="Dimensiones" value={formatTwoDigits(dimensionsCount)} />
            <MetricCard label="Unidades" value="10" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-6 py-12 sm:px-8 lg:grid-cols-[350px_680px] lg:justify-between lg:px-10">
          <div>
            <h2 className="font-montserrat max-w-[18rem] text-[1.75rem] font-bold leading-[1.08] text-[#0176DE]">
              Datos para la igualdad de género
            </h2>
            <div className="mt-7 max-w-[21rem] space-y-5 text-[1rem] leading-[1.25] text-[#8B8B95]">
              <p>
                <strong className="font-montserrat font-extrabold text-[#858B91]">KimnGenero</strong> es una plataforma
                institucional que pone a disposición del público indicadores desagregados en múltiples dimensiones
                relacionadas con la equidad de género.
              </p>
              <p>
                Los indicadores se producen a partir de fuentes oficiales y son actualizados periódicamente para
                reflejar la situación actual de las brechas de género en la institución.
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-1 justify-self-center bg-white sm:grid-cols-2 md:grid-cols-4 lg:max-w-[680px]">
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
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-14 px-6 pb-28 pt-10 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-10">
          <figure className="max-w-[21rem] text-center">
            <blockquote className="font-montserrat text-[1.08rem] font-extrabold italic leading-[1.22] text-[#0176DE]">
              &quot;Un indicador de género es una medida que señala el estado o nivel de las diferencias entre hombres
              y mujeres en un momento del tiempo, expresando en particular las desigualdades que resultan de la
              diferencia sexual o de género.&quot;
            </blockquote>
            <figcaption className="mt-4 text-right text-sm text-[#858B91]">— INE, 2019</figcaption>
          </figure>

          <div className="max-w-[37rem]">
            <p className="font-montserrat text-lg font-bold text-[#858B91]">Datos abiertos</p>
            <h2 className="font-montserrat mt-6 max-w-[24rem] text-[1.85rem] font-bold leading-[1.05] text-[#0176DE]">
              Explore los
              <br />
              indicadores interactivos
            </h2>
            <p className="mt-6 text-[1rem] leading-snug text-[#8B8B95]">
              Acceda a visualizaciones dinámicas de Power BI con datos actualizados sobre brechas de género.
            </p>
            <div className="mt-7">
              <Link href="/indicadores">
                <span className="inline-flex h-8 min-w-[120px] items-center justify-center gap-2 rounded-full bg-[#0176DE] px-5 text-[0.6rem] font-bold text-white transition-colors hover:bg-[#0668C0]">
                  Ir a indicadores
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
