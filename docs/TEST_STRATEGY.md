# Estrategia de Pruebas

## Objetivo

Consolidar la estrategia actual de testing de `NewKimn`, clarificar que cubre cada suite y definir el baseline minimo para cambios de backend, frontend y datos.

## Alcance

- Cubre pruebas actuales con `vitest`.
- Cubre backend, frontend y contrato `memory vs sqlite`.
- No cubre E2E automatizado, porque actualmente no existe en el repo.

## Estado actual

- Runner principal: `vitest`.
- Comandos:

```bash
pnpm run test
pnpm run test:coverage
```

- CI ejecuta `lint` y `test` en cada PR y push a `main`.

## Piramide actual

### Unitarias

- Backend:
  - `server/src/services/normalizers.test.ts`
  - `server/src/repositories/SqliteIndicatorRepository.test.ts`
- Frontend:
  - tests de subcomponentes en `client/src/features/indicadores/components/detail/*.test.tsx`

### Integracion / API

- `server/src/api/v1/indicators/indicators.routes.test.ts`
  - valida rutas y contratos de respuesta sobre la app Express.

### Contrato de repositorio

- `server/src/api/v1/indicators/indicators.contract.test.ts`
  - compara comportamiento de `memory` y `sqlite` sobre los mismos endpoints.

## Cobertura funcional real

- Normalizacion y mapeo de datos.
- Inicializacion y comportamiento base de SQLite.
- Endpoints de indicadores y categorias.
- Paridad de comportamiento entre repositorios.
- Render de bloques criticos del detalle de indicador.

## Brechas de testing

- No hay E2E/browser para rutas SPA, filtros, embeds o navegacion principal.
- No hay smoke tests automatizados post-build.
- No hay pruebas de regresion visual para cards, dashboards o responsive.
- No hay una matriz documentada de que cambios exigen que suite.

## Regla operativa recomendada

- Cambios en backend/API:
  - correr `pnpm run test`
- Cambios en datos o repositorios:
  - correr `pnpm run test`
  - validar manualmente `/api/indicadores` y al menos un indicador real
- Cambios en UI/indicadores:
  - correr `pnpm run test`
  - revisar manualmente home, `/indicadores` y un detalle con dashboard
- Cambios antes de merge:
  - correr `pnpm run lint`
  - correr `pnpm run test`
  - preferentemente correr `pnpm run build`

## Roadmap recomendado

1. Agregar smoke E2E de rutas criticas.
2. Cubrir filtros y busqueda en `/indicadores`.
3. Cubrir estados de error de cliente con `ApiError`.
4. Agregar checklist QA de release en `docs/RELEASE_CHECKLIST.md`.

## Validacion

- `pnpm run test`
- `pnpm run test:coverage`
- Verificar que CI en GitHub Actions permanezca verde.

## Riesgos y consideraciones

- Riesgo: asumir que cobertura actual protege flujos de navegador. Mitigacion: incorporar E2E o smoke browser en roadmap.
- Riesgo: cambios en `indicadores.json` que no rompen tests pero degradan UX. Mitigacion: combinar tests con revision manual de una muestra de indicadores.

## Referencias

- `package.json`
- `.github/workflows/ci.yml`
- `server/src/api/v1/indicators/indicators.contract.test.ts`
- `client/src/features/indicadores/components/detail/DashboardCard.test.tsx`
