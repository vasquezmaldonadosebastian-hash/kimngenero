# Politica de artefactos

## Objetivo

Definir donde deben vivir los artefactos generados por analisis, validacion visual, exploracion puntual y documentacion auxiliar para que no se confundan con la base normativa del proyecto.

## Regla general

- Los artefactos generados localmente no son fuente de verdad.
- `outputs/` se considera espacio de trabajo o historico local.
- Todo artefacto importante que deba preservarse debe documentarse o archivarse expresamente.

## Clasificacion

### Puede vivir en `outputs/`

- capturas de pantalla
- PDFs o DOCX generados durante validaciones
- excels o reportes intermedios
- logs de inspeccion o exploracion
- resultados de pruebas visuales o de apoyo

### Debe vivir en `docs/`

- politicas estables
- guias operativas
- inventarios y referencias vivas
- analisis que se usen como fuente para decisiones de mantenimiento

### Debe vivir en `docs/archive/`

- briefs desactualizados
- reportes historicos
- planes antiguos que ya no son la referencia vigente

## Reglas operativas

1. No usar `outputs/` como referencia normativa.
2. No enlazar artefactos generados desde documentos vivos salvo necesidad puntual.
3. Archivar cualquier material que represente una decision o analisis terminado.
4. Si un artefacto generado empieza a ser reutilizado, convertirlo en documento normativo o moverlo a `docs/archive/` con contexto claro.

## Validacion

- `outputs/` debe permanecer ignorado por git.
- Los documentos vivos deben apuntar a `docs/` o `docs/archive/`, no a salidas temporales.
- Cualquier nuevo script que genere artefactos debe indicar su destino esperado.
