# Scripts del repositorio

Este directorio contiene utilidades de soporte para el proyecto.

## Scripts activos del flujo del repo

- `bundle-report.mjs`
  - complemento de `pnpm run build:analyze`

## Scripts auxiliares o historicos

Los scripts que no forman parte del flujo normal del proyecto deben vivir en `scripts/archive/`.
Esto incluye:

- utilidades de briefs de diseno
- capturas y scraping puntual
- inspecciones exploratorias
- herramientas de apoyo no integradas a `package.json`

## Regla operativa

Si un script no esta conectado a `package.json`, CI o una tarea operativa repetible del proyecto, debe considerarse auxiliar hasta demostrar lo contrario.
