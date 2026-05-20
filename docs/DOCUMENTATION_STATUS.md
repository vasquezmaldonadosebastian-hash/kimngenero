# Estado de la documentacion

Fecha base: 2026-05-20
Estado: vigente

## Objetivo

Separar la documentacion que hoy sirve como referencia operativa real de la documentacion historica, desactualizada o auxiliar.

## Uso recomendado

- si el cambio afecta arquitectura, API, datos, testing, seguridad o despliegue, partir por los documentos marcados como `normativos`
- si un documento esta marcado como `historico` o `auxiliar`, no usarlo como fuente principal sin contrastarlo con codigo y docs normativas
- si un PR cambia el comportamiento real del sistema, actualizar este inventario si corresponde

## Documentacion normativa

- `ARCHITECTURE.md`
- `API_ERROR_CONTRACT.md`
- `API_SURFACE.md`
- `TEST_STRATEGY.md`
- `OPERATIONS.md`
- `WOUTER_PATCH_EVALUATION.md`
- `DATA_PIPELINE.md`
- `DATA_DICTIONARY.md`
- `DEPLOYMENT.md`
- `PRODUCTION_CONFIGURATION.md`
- `SECURITY_NETWORK.md`
- `SQLITE_OPERATIONS.md`
- `CONTRIBUTING_ADVANCED.md`
- `ADR_INDEX.md`
- `RELEASE_CHECKLIST.md`
- `UI_UX_GUIDELINES.md`
- `ARTIFACT_POLICY.md`
- `PLAN_SANEAMIENTO_REAL.md`
- `RELEASE_NOTE_SANAMIENTO_2026-05-20.md`
- `GAP_ANALYSIS.md`
  - contiene brechas detectadas en una revision anterior; parte de ellas ya fue cubierta

## Documentacion auxiliar

- `archive/BRIEF_DISENO_GRAFICO.md`
- `archive/BRIEF_DISENO_GRAFICO_EJECUTIVO.md`
- `archive/BRIEF_DISENO_GRAFICO_RECOMENDACIONES.md`
- `archive/BRIEF_DISENO_GRAFICO_CON_SCREENSHOTS.md`

Notas:

- estos briefs pueden servir como insumo de diseno o comunicacion
- no deben tratarse como definicion arquitectonica ni como guias operativas del sistema
- algunos dependen de capturas y artefactos externos en `outputs/`
- `outputs/` esta ignorado y debe tratarse como historico o de trabajo local, no como parte del producto

## Documentacion fuera de `docs/` que no debe guiar decisiones tecnicas por si sola

- `env.example`
  - archivo de configuracion de referencia para desarrollo local
- `OPTIMIZATION_PLAN.md`
  - describe una etapa anterior del repositorio
- `Informe_de_cambios_Fase_1.txt`

## Proxima limpieza sugerida

1. mantener `PLAN_SANEAMIENTO_REAL.md` y este inventario alineados con cada fase de limpieza
2. seguir reduciendo artefactos auxiliares que no aporten al flujo principal del producto
3. validar por ejecucion los cambios de frontend y normalizacion cuando el entorno tenga `node` y `pnpm` disponibles
