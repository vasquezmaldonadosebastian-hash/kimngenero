import type { RawGroupedReport, RawIndicator } from "../../../shared/types/indicators";

type RecordLike = Record<string, unknown>;

const indicatorIdentifierKeys = ["id", "nro", "ID", "Nro indicador"] as const;
const indicatorTitleKeys = ["nombre", "Nombre del indicador"] as const;
const indicatorCodeKeys = ["codigo", "Código del indicador"] as const;
const indicatorDescriptionKeys = ["descripcion", "Descripción"] as const;
const indicatorObjectiveKeys = ["objetivo", "Objetivo del Indicador"] as const;
const indicatorAreaKeys = ["area", "Área"] as const;
const indicatorDimensionKeys = ["dimension", "Dimensión"] as const;
const indicatorStatusKeys = ["estado", "Estado del Indicador"] as const;
const indicatorCutoffKeys = ["fechaCorte", "Fecha de Corte"] as const;
const reportRequiredKeys = ["id", "titulo", "descripcion", "iframeSrc", "tipo"] as const;

function isRecord(value: unknown): value is RecordLike {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidIdentifier(value: unknown): boolean {
  return typeof value === "string" || typeof value === "number";
}

function hasAnyValue(record: RecordLike, keys: readonly string[]) {
  return keys.some((key) => isNonEmptyString(record[key]));
}

function assertIndicatorShape(record: unknown, index: number) {
  if (!isRecord(record)) {
    throw new Error(`Indicator seed entry at index ${index} must be an object`);
  }

  const missing = [
    !hasAnyValue(record, indicatorIdentifierKeys) ? "id" : null,
    !hasAnyValue(record, indicatorTitleKeys) ? "nombre" : null,
    !hasAnyValue(record, indicatorCodeKeys) ? "codigo" : null,
    !hasAnyValue(record, indicatorDescriptionKeys) ? "descripcion" : null,
    !hasAnyValue(record, indicatorObjectiveKeys) ? "objetivo" : null,
    !hasAnyValue(record, indicatorAreaKeys) ? "area" : null,
    !hasAnyValue(record, indicatorDimensionKeys) ? "dimension" : null,
    !hasAnyValue(record, indicatorStatusKeys) ? "estado" : null,
    !hasAnyValue(record, indicatorCutoffKeys) ? "fechaCorte" : null,
  ].filter((value): value is string => Boolean(value));

  if (missing.length > 0) {
    throw new Error(`Missing required indicator fields: ${missing.join(", ")}`);
  }

  const identifierValue = indicatorIdentifierKeys.some((key) => isValidIdentifier(record[key]));
  if (!identifierValue) {
    throw new Error("Indicator seed requires a stable identifier");
  }
}

function assertReportShape(record: unknown, index: number) {
  if (!isRecord(record)) {
    throw new Error(`Report seed entry at index ${index} must be an object`);
  }

  const missing = reportRequiredKeys.filter((key) => !isNonEmptyString(record[key]));
  if (missing.length > 0) {
    throw new Error(`Missing required report fields: ${missing.join(", ")}`);
  }
}

function normalizeIndicators(value: unknown): RawIndicator[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("Seed must include at least one indicator");
  }

  value.forEach((item, index) => assertIndicatorShape(item, index));
  return value as RawIndicator[];
}

function normalizeReports(value: unknown): RawGroupedReport[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) {
    throw new Error("reportesAgrupados must be an array when present");
  }

  value.forEach((item, index) => assertReportShape(item, index));
  return value as RawGroupedReport[];
}

export type ParsedIndicatorSeed = {
  format: "array" | "object";
  rawIndicators: RawIndicator[];
  rawReports: RawGroupedReport[];
};

export function loadIndicatorSeed(source: unknown): ParsedIndicatorSeed {
  if (Array.isArray(source)) {
    return {
      format: "array",
      rawIndicators: normalizeIndicators(source),
      rawReports: [],
    };
  }

  if (!isRecord(source)) {
    throw new Error("Indicator seed must be an array or an object with indicadores");
  }

  const rawIndicators = normalizeIndicators(source.indicadores);
  const rawReports = normalizeReports(source.reportesAgrupados);

  return {
    format: "object",
    rawIndicators,
    rawReports,
  };
}
