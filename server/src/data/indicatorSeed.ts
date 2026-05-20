import { z } from "zod";
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

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidIdentifier(value: unknown): boolean {
  return typeof value === "string" || typeof value === "number";
}

function hasAnyValue(record: RecordLike, keys: readonly string[], predicate: (value: unknown) => boolean) {
  return keys.some((key) => predicate(record[key]));
}

function getMissingFieldLabel(record: RecordLike, keys: readonly string[], label: string) {
  if (hasAnyValue(record, keys, isNonEmptyString)) return null;
  return label;
}

const rawIndicatorSchema = z.record(z.unknown()).superRefine((record, ctx) => {
  const missing = [
    getMissingFieldLabel(record, indicatorIdentifierKeys, "id"),
    getMissingFieldLabel(record, indicatorTitleKeys, "nombre"),
    getMissingFieldLabel(record, indicatorCodeKeys, "codigo"),
    getMissingFieldLabel(record, indicatorDescriptionKeys, "descripcion"),
    getMissingFieldLabel(record, indicatorObjectiveKeys, "objetivo"),
    getMissingFieldLabel(record, indicatorAreaKeys, "area"),
    getMissingFieldLabel(record, indicatorDimensionKeys, "dimension"),
    getMissingFieldLabel(record, indicatorStatusKeys, "estado"),
    getMissingFieldLabel(record, indicatorCutoffKeys, "fechaCorte"),
  ].filter((value): value is string => Boolean(value));

  if (missing.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Missing required indicator fields: ${missing.join(", ")}`,
    });
  }

  const identifierValue = indicatorIdentifierKeys.some((key) => isValidIdentifier(record[key]));
  if (!identifierValue) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Indicator seed requires a stable identifier",
    });
  }
});

const rawGroupedReportSchema = z.record(z.unknown()).superRefine((record, ctx) => {
  const missing = reportRequiredKeys.filter((key) => !isNonEmptyString(record[key]));
  if (missing.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Missing required report fields: ${missing.join(", ")}`,
    });
  }
});

const arraySeedSchema = z.array(rawIndicatorSchema).min(1, "Seed must include at least one indicator");

const objectSeedSchema = z
  .object({
    indicadores: arraySeedSchema,
    reportesAgrupados: z.array(rawGroupedReportSchema).default([]),
  })
  .passthrough();

const indicatorSeedSchema = z.union([arraySeedSchema, objectSeedSchema]);

export type ParsedIndicatorSeed = {
  format: "array" | "object";
  rawIndicators: RawIndicator[];
  rawReports: RawGroupedReport[];
};

export function loadIndicatorSeed(source: unknown): ParsedIndicatorSeed {
  const parsed = indicatorSeedSchema.parse(source);

  if (Array.isArray(parsed)) {
    return {
      format: "array",
      rawIndicators: parsed as RawIndicator[],
      rawReports: [],
    };
  }

  return {
    format: "object",
    rawIndicators: parsed.indicadores as RawIndicator[],
    rawReports: parsed.reportesAgrupados as RawGroupedReport[],
  };
}
