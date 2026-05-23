/*
 * Indicadores - Listado de indicadores
 * Design: Grid de tarjetas con enlaces a cada indicador individual
 * Colors: #F5F4F8 bg, white cards, #0176DE accents
 */

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronRight, Filter, Search } from "lucide-react";
import type { Indicator } from "@shared/types/indicators";
import { apiGetJson } from "@/lib/apiClient";
import { useIndicatorsContext } from "../../../contexts/IndicatorsContext";

const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  "1.- Institucionalizacion": { bg: "#E8F2FF", border: "#E5D4F0", text: "#0176DE" },
  "2.- Violencia de Genero": { bg: "#FEE2E2", border: "#FECACA", text: "#DC2626" },
  "3.- Corresponsabilidad en los cuidados": { bg: "#D1FAE5", border: "#A7F3D0", text: "#059669" },
  "4.- Trayectorias laborales": { bg: "#F3E8FF", border: "#E9D5FF", text: "#7C3AED" },
  "5.- Trayectorias educativas": { bg: "#CFFAFE", border: "#A5F3FC", text: "#0891B2" },
  "6.- Modelo educativo con perspectiva de genero": {
    bg: "#FEF3C7",
    border: "#FDE68A",
    text: "#F59E0B",
  },
  "7.- Divulgacion Cientifica": { bg: "#FCE7F3", border: "#FBCFE8", text: "#EC4899" },
  "8.- Mujeres en Conocimiento": { bg: "#EDE9FE", border: "#DDD6FE", text: "#8B5CF6" },
};

const DEFAULT_COLOR = { bg: "#F0F9FF", border: "#E0F2FE", text: "#0369A1" };

export default function Indicadores() {
  const { indicators, loading, error } = useIndicatorsContext();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArea, setFilterArea] = useState("todos");
  const [filterDimension, setFilterDimension] = useState("todos");
  const [visibleIndicators, setVisibleIndicators] = useState<Indicator[]>([]);
  const [loadingFiltered, setLoadingFiltered] = useState(false);
  const [filtersReady, setFiltersReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dimensionParam = params.get("dimension");
    const areaParam = params.get("area");
    if (dimensionParam) setFilterDimension(dimensionParam);
    if (areaParam) setFilterArea(areaParam);
  }, []);

  useEffect(() => {
    const loadFiltered = async () => {
      try {
        setLoadingFiltered(true);
        const qs = new URLSearchParams();
        if (filterArea !== "todos") qs.set("area", filterArea);
        if (filterDimension !== "todos") qs.set("dimension", filterDimension);

        const path = qs.toString() ? `/api/indicadores?${qs.toString()}` : "/api/indicadores";
        const data = await apiGetJson<Indicator[]>(path);
        setVisibleIndicators(data);
      } catch {
        setVisibleIndicators(indicators);
      } finally {
        setLoadingFiltered(false);
        setFiltersReady(true);
      }
    };

    if (!loading && !error) {
      loadFiltered();
    }
  }, [filterArea, filterDimension, indicators, loading, error]);

  const areas = useMemo(() => {
    const uniqueAreas = Array.from(
      new Set(indicators.map((ind) => ind.area).filter((area): area is string => !!area))
    ).sort();
    return ["todos", ...uniqueAreas];
  }, [indicators]);

  const dimensiones = useMemo(() => {
    const uniqueDimensions = Array.from(
      new Set(indicators.map((ind) => ind.dimension).filter((d): d is string => !!d))
    ).sort();
    return ["todos", ...uniqueDimensions];
  }, [indicators]);

  const filtrados = useMemo(() => {
    const base = filtersReady || loadingFiltered ? visibleIndicators : indicators;
    const q = searchTerm.trim().toLowerCase();
    if (!q) return base;

    return base.filter((ind) => {
      return (
        ind.titulo?.toLowerCase().includes(q) ||
        ind.codigo?.toLowerCase().includes(q) ||
        ind.descripcion?.toLowerCase().includes(q)
      );
    });
  }, [visibleIndicators, indicators, searchTerm, filtersReady, loadingFiltered]);

  const getColorForDimension = (dimension: string | undefined) => {
    if (!dimension) return DEFAULT_COLOR;
    return COLOR_MAP[dimension] ?? DEFAULT_COLOR;
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterArea("todos");
    setFilterDimension("todos");
    setLocation("/indicadores");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F4F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0176DE]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F4F8] flex items-center justify-center text-center">
        <div>
          <div className="text-6xl mb-4">!</div>
          <h1 className="text-2xl font-bold mb-2">Error al cargar</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F8]">
      <div className="bg-white border-b border-[#E8F2FF]">
        <div className="container py-8 sm:py-10">
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-gray-400">
            <a href="/" className="hover:text-[#0176DE]">
              Inicio
            </a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0176DE] font-medium">Indicadores</span>
          </nav>
          <h1 className="mb-2 text-3xl font-black text-[#03122E]">
            Sistema de Indicadores de Genero
          </h1>
          <p className="max-w-2xl text-gray-600">
            Explora los {indicators.length} indicadores del observatorio institucional.
          </p>
        </div>
      </div>

      <div className="container py-6 sm:py-8">
        {loadingFiltered && <div className="mb-4 text-sm text-gray-500">Cargando filtros...</div>}

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-[#E8F2FF] py-3 pl-10 pr-4 text-sm focus:border-[#0176DE] focus:outline-none focus:ring-2 focus:ring-[#0176DE]/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="min-h-11 flex-1 rounded-lg border border-[#E8F2FF] px-4 py-3 text-sm focus:border-[#0176DE] focus:outline-none focus:ring-2 focus:ring-[#0176DE]/20"
            >
              <option value="todos">Todas las areas</option>
              {areas.filter((a) => a !== "todos").map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterDimension}
              onChange={(e) => setFilterDimension(e.target.value)}
              className="min-h-11 flex-1 rounded-lg border border-[#E8F2FF] px-4 py-3 text-sm focus:border-[#0176DE] focus:outline-none focus:ring-2 focus:ring-[#0176DE]/20"
            >
              <option value="todos">Todas las dimensiones</option>
              {dimensiones.filter((d) => d !== "todos").map((dimension) => (
                <option key={dimension} value={dimension}>
                  {dimension}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtrados.map((indicador: Indicator) => {
              const color = getColorForDimension(indicador.dimension);
              return (
                <Link key={indicador.id} href={`/indicador/${indicador.id}`} className="group h-full">
                  <div className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg">
                    <div
                      className="p-4"
                      style={{
                        backgroundColor: color.bg,
                        borderBottom: `2px solid ${color.border}`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{ backgroundColor: color.text, color: "white" }}
                        >
                          {indicador.codigo}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          {indicador.frecuenciaMedicion}
                        </span>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1">
                        {indicador.area}
                      </p>
                      <p className="text-xs text-gray-600">{indicador.dimension}</p>
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-bold text-[#03122E] line-clamp-2 group-hover:text-[#0176DE]">
                        {indicador.titulo}
                      </h3>
                      <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                        {indicador.descripcion}
                      </p>
                      <div className="space-y-2 mb-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Unidad:</span>
                          <span className="font-semibold">{indicador.unidad || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Estado:</span>
                          <span
                            className="font-semibold px-2 py-1 rounded"
                            style={{
                              backgroundColor:
                                indicador.estado === "Oficializado" ? "#D1FAE5" : "#FEF3C7",
                              color:
                                indicador.estado === "Oficializado" ? "#065F46" : "#92400E",
                            }}
                          >
                            {indicador.estado || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex min-h-11 w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: color.text }}
                      >
                        Ver indicador
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#E8F2FF] bg-white py-16 text-center">
            <div className="text-5xl mb-4">?</div>
            <h3 className="text-lg font-bold mb-2">No se encontraron indicadores</h3>
            <button
              onClick={handleClearFilters}
              className="mt-4 min-h-11 rounded-lg bg-[#0176DE] px-6 py-3 font-semibold text-white"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
