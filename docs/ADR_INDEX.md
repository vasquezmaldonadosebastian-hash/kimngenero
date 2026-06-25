# Indice de Decisiones Arquitectonicas

## Objetivo

Concentrar las decisiones tecnicas relevantes que ya fueron tomadas en KimnGenero y dar un punto de entrada para futuras ADRs.

## Alcance

- Cubre decisiones existentes registradas en documentacion.
- Cubre decisiones tacticas con impacto en arquitectura, datos, seguridad o frontend.
- No sustituye documentos detallados; actua como indice y resumen ejecutivo.

## Pasos / Implementacion

### 1. Decisiones ya registradas

#### ADR-001 - Mantener parche aplicado a `wouter`

- Estado: vigente
- Motivacion: estabilizar comportamiento del router segun evaluacion tecnica actual.
- Documento fuente: `docs/WOUTER_PATCH_EVALUATION.md`

#### ADR-002 - Poda de dependencias UI y retencion minima de Radix

- Estado: vigente
- Motivacion: reducir superficie de dependencias y dejar solo primitivas realmente usadas.
- Documento fuente: `docs/DEPENDENCY_AUDIT.md`

#### ADR-003 - Repositorio de indicadores conmutado por ambiente (`memory | sqlite`)

- Estado: vigente
- Motivacion: mantener simplicidad local y habilitar persistencia ligera cuando se necesite.
- Documentos fuente:
  - `docs/ARCHITECTURE.md`
  - `docs/DATA_PIPELINE.md`
  - `docs/SQLITE_OPERATIONS.md`

#### ADR-004 - CSP con allowlist de iframes y modo report-only por defecto

- Estado: vigente con endurecimiento pendiente
- Motivacion: permitir dashboards embebidos sin abrir de forma amplia la politica de contenido.
- Documentos fuente:
  - `docs/SECURITY_NETWORK.md`
  - `docs/PRODUCTION_CONFIGURATION.md`

### 2. Decisiones que conviene formalizar a continuacion

- Politica de almacenamiento productivo para datos e indicador repository.
- Estrategia de despliegue oficial por ambiente.
- Estrategia E2E y smoke testing browser.
- Sistema de diseño normativo y evolucion de componentes.

### 3. Convencion sugerida para nuevas ADRs

- Nombre de archivo: `docs/ADR-XXX_<tema>.md`
- Contenido minimo:
  - contexto
  - decision
  - consecuencias
  - estado
  - referencias

## Validacion

- Cada vez que una decision cambie el comportamiento estructural de la app, agregar o actualizar una ADR.
- Verificar que el indice apunte siempre al documento fuente mas actualizado.

## Riesgos y consideraciones

- Si las decisiones quedan solo en PRs o conversaciones, el costo de onboarding y mantenimiento sube rapidamente.
- Este indice no reemplaza discusiones profundas; solo evita que el conocimiento se disperse.

## Referencias

- `docs/ARCHITECTURE.md`
- `docs/DEPENDENCY_AUDIT.md`
- `docs/WOUTER_PATCH_EVALUATION.md`
- `docs/SECURITY_NETWORK.md`
