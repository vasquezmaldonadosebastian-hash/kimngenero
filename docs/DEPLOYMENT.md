# Despliegue

## Objetivo

Definir el camino actual para construir y ejecutar `KimnGenero` en un entorno productivo, junto con las decisiones operativas minimas necesarias para frontend, backend y persistencia.

## Alcance

- Cubre build y arranque de la aplicacion full-stack actual.
- Cubre despliegue de una unica aplicacion Node que sirve API y assets estaticos.
- Cubre consideraciones de `memory` y `sqlite`.
- No cubre pipeline CD automatizado, porque actualmente no existe en el repo.

## Arquitectura de despliegue actual

- El frontend se construye con Vite y queda en `dist/public`.
- El backend se empaqueta con `esbuild` desde `server/src/app.ts` a `dist/index.js`.
- En produccion, el servidor Express sirve:
  - endpoints `/api/*`
  - assets estaticos desde `dist/public`
  - fallback `index.html` para rutas SPA

## Comandos de build y arranque

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm run start
```

Notas:

- `build` ejecuta build de cliente y bundle del server.
- `start` ejecuta `NODE_ENV=production node dist/index.js`.
- El puerto lo define `PORT`, o usa `3000` por defecto.
- El script `start` esta escrito con sintaxis POSIX; en shells Windows puede requerir exportar `NODE_ENV` por separado o ejecutar directamente el runtime objetivo del hosting.

## Variables de entorno minimas

- `NODE_ENV=production`
- `PORT`
- `INDICATOR_REPOSITORY=memory|sqlite`
- `SQLITE_DB_PATH` si se usa `sqlite`
- `IFRAME_ALLOWLIST` opcional
- `CSP_REPORT_ONLY=true|false`

La matriz detallada esta en `docs/PRODUCTION_CONFIGURATION.md`.

## Estrategia de hosting actual

- Modelo recomendado actual: un solo servicio Node con filesystem local.
- Si el ambiente no garantiza disco persistente, `sqlite` no debe considerarse durable sin volumen dedicado.
- Si se despliega en hosting efimero, `memory` es el modo mas seguro operativamente, con la limitacion de no persistir cambios.

## Persistencia y SQLite

- Ruta por defecto: `data/indicators.sqlite`.
- Requisito de produccion:
  - usar almacenamiento persistente si `INDICATOR_REPOSITORY=sqlite`.
  - definir backup/restore fuera del proceso de app hasta contar con runbook dedicado.
- Cambio importante:
  - una base SQLite ya inicializada no se resincroniza sola desde `indicadores.json`.

## CI disponible hoy

- `.github/workflows/ci.yml`:
  - instala dependencias
  - corre `pnpm run lint`
  - corre `pnpm run test`
- `.github/workflows/bundle-analysis.yml`:
  - corre `pnpm run build:analyze`
  - publica artefactos del reporte de bundle

## CD y rollback

- Estado actual: no existe pipeline de CD documentado ni automatizado en el repo.
- Estado actual: no existe runbook formal de rollback.
- Recomendacion minima mientras no haya CD:
  1. ejecutar CI en PR
  2. correr `pnpm run build` localmente antes de merge
  3. desplegar un build reproducible desde `main`
4. conservar el ultimo artefacto estable o release previo para rollback manual

## Nota sobre desarrollo versus validacion productiva

- `pnpm run dev` levanta el servidor de Vite para frontend.
- La validacion de despliegue debe hacerse sobre el artefacto productivo generado por `pnpm run build` + `pnpm run start`, porque ese camino ejercita el servidor Express empaquetado.
- Mientras no exista un script unificado de desarrollo full-stack documentado, no se debe asumir que el flujo `dev` replica exactamente el comportamiento de produccion.

## Smoke checks post-deploy

1. Abrir `/`.
2. Verificar `/indicadores`.
3. Probar `GET /api/indicadores`.
4. Probar `GET /api/categorias`.
5. Probar `GET /api/metrics`.
6. Verificar al menos un indicador con dashboard embebido.

## Validacion

- `pnpm run build`
- `pnpm run start`
- Smoke checks funcionales sobre home, listado, detalle e indicadores embebidos.

## Riesgos y consideraciones

- Riesgo: usar SQLite en filesystem efimero. Mitigacion: usar volumen persistente o modo `memory`.
- Riesgo: desplegar sin smoke checks sobre dashboards externos. Mitigacion: validar al menos un embed real en cada release.
- Riesgo: validar solo sobre Vite dev server y omitir el artefacto final. Mitigacion: probar siempre `build` + `start` antes de una liberacion importante.

## Referencias

- `package.json`
- `server/src/app.ts`
- `.github/workflows/ci.yml`
- `.github/workflows/bundle-analysis.yml`
