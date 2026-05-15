# Gap Analysis de Documentacion

## Objetivo

Consolidar que conocimiento tecnico ya esta documentado en `KimnGenero` y dejar explicitadas las brechas mas relevantes para mantenibilidad, flujo de datos y paso a produccion.

## Alcance

- Cubre onboarding, arquitectura, datos, despliegue, testing, seguridad y UX/UI.
- Cubre el estado documental actual del repositorio.
- No cubre cambios de codigo ni redisenos arquitectonicos.

## 1. Mapa de lo resuelto

- `README.md`: onboarding local, scripts, estructura del repo y flujo basico de contribucion.
- `docs/ARCHITECTURE.md`: arquitectura macro de frontend/backend, repositorio `memory|sqlite` y flujo principal de request.
- `docs/API_ERROR_CONTRACT.md`: shape de errores, codigos y ejemplos de payload.
- `docs/OPERATIONS.md`: SLO inicial y uso de `/api/metrics`.
- `docs/WOUTER_PATCH_EVALUATION.md`: decision tecnica sobre el parche de `wouter`.
- `docs/DEPENDENCY_AUDIT.md`: auditoria de dependencias UI y criterio de poda.
- `docs/DOCUMENT_TEMPLATE.md`: base comun para documentos nuevos.
- `.github/workflows/ci.yml` y `.github/workflows/bundle-analysis.yml`: automatizacion basica de calidad, aun poco reflejada en docs.

## 2. Brechas criticas

### Datos e ingesta

- No existe un documento que describa el ciclo de vida de `data/indicadores.json`.
- Falta documentar como se siembra SQLite a partir del dataset raw.
- No hay guia para refrescar datos, regenerar base o validar cambios de shape.
- No existen scripts ETL dedicados en `scripts/`.
- No hay definicion formal de validaciones, responsables y checklist de calidad de datos.

### Despliegue y CI/CD

- Falta una guia de despliegue extremo a extremo.
- No hay matriz de variables de entorno por ambiente.
- No esta documentada la estrategia de hosting ni la persistencia de SQLite.
- Existe CI para lint/test y bundle analysis, pero no hay CD documentado.
- No hay criterios operativos de rollback ni smoke check post-deploy.

### Testing y QA

- No existe documento de estrategia de pruebas.
- El repo tiene tests unitarios, de rutas API y de contrato `memory vs sqlite`, pero no estan consolidados en una guia.
- No hay piramide de testing ni definicion de responsabilidades por capa.
- No hay E2E documentado ni checklist de release QA.

### Seguridad y red

- Existe `helmet`, CSP y allowlist de iframes, pero falta una guia operativa de seguridad.
- No hay documentacion explicita de CORS ni de superficie expuesta de la API.
- Falta una politica de secretos y configuracion sensible.
- No hay una nota de hardening de produccion para headers, CSP y embeds externos.

### Sistema de diseno y UX/UI

- No existe documento de tokens visuales ni reglas de consistencia.
- Falta una guia de uso de componentes base tras la auditoria de Radix UI.
- No estan formalizados patrones de interaccion: filtros, tooltips, estados de carga, errores y vacios.
- No hay criterios documentados para dashboards, cards e indicadores.
- No existe una guia explicita de accesibilidad frontend.

## 3. Roadmap sugerido

### Alta prioridad

1. `docs/DATA_PIPELINE.md`
2. `docs/DEPLOYMENT.md`
3. `docs/TEST_STRATEGY.md`
4. `docs/PRODUCTION_CONFIGURATION.md`
5. `docs/SECURITY_NETWORK.md`
6. `docs/UI_UX_GUIDELINES.md`

### Media / baja prioridad

1. `docs/API_SURFACE.md`
2. `docs/RELEASE_CHECKLIST.md`
3. `docs/SQLITE_OPERATIONS.md`
4. `docs/CONTRIBUTING_ADVANCED.md`
5. `docs/ADR_INDEX.md`
6. `docs/DATA_DICTIONARY.md`

## Validacion

- Un integrante nuevo debe poder explicar desde docs como levantar, probar, actualizar datos y desplegar.
- Un frontend engineer debe poder agregar o ajustar vistas sin inventar paleta, patrones o manejo de estados.
- Un responsable de operaciones debe poder identificar variables de entorno, riesgos de SQLite y pasos de rollback.

## Riesgos y consideraciones

- Riesgo: que las nuevas guias documenten una vision ideal y no el estado real. Mitigacion: basar cada doc en codigo y workflows existentes.
- Riesgo: que produccion y datos sigan dependiendo de conocimiento tacito. Mitigacion: priorizar primero pipeline, deploy y configuracion.

## Referencias

- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/API_ERROR_CONTRACT.md`
- `docs/OPERATIONS.md`
