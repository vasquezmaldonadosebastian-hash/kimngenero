# Configuracion de Produccion

## Objetivo

Centralizar las variables de entorno y defaults relevantes para operar `KimnGenero` en produccion y evitar configuracion implicita.

## Alcance

- Cubre variables actualmente leidas por el backend.
- Cubre defaults y efecto operativo.
- No cubre secretos de terceros porque actualmente el repo no define integraciones autenticadas adicionales.

## Matriz de variables

| Variable | Default | Uso | Requerida en prod |
| --- | --- | --- | --- |
| `NODE_ENV` | `development` / segun runtime | Selecciona modo de servidor, assets y middleware | Si |
| `PORT` | `3000` | Puerto HTTP del servicio Node | Si |
| `INDICATOR_REPOSITORY` | `memory` | Selecciona backend de datos (`memory` o `sqlite`) | Si |
| `SQLITE_DB_PATH` | `data/indicators.sqlite` | Ruta de la base SQLite cuando aplica | Solo si `INDICATOR_REPOSITORY=sqlite` |
| `IFRAME_ALLOWLIST` | allowlist interna Power BI + Tableau | Origenes permitidos en `frame-src` | No |
| `CSP_REPORT_ONLY` | `true` | Define si CSP corre en modo report-only o enforcing | No |

## Comportamiento por variable

### `NODE_ENV`

- En produccion:
  - `server/src/app.ts` sirve assets desde `dist/public`.
  - `createApp()` registra logger y metrics middleware.
- En `test`:
  - se desactiva logger y metrics middleware.

### `INDICATOR_REPOSITORY`

- `memory`:
  - carga datos desde JSON al arranque.
  - no persiste a disco.
- `sqlite`:
  - inicializa la base en `SQLITE_DB_PATH`.
  - usa el dataset raw como seed solo si la DB esta vacia.

### `SQLITE_DB_PATH`

- Puede ser relativa o absoluta.
- Si la ruta apunta a un directorio existente, la app falla.
- Si la carpeta no existe, el repositorio intenta crearla.

### `IFRAME_ALLOWLIST`

- Formato: CSV de origenes.
- Si no se define, se permiten embeds publicos de Power BI y Tableau.

Ejemplo:

```env
IFRAME_ALLOWLIST=https://app.powerbi.com,https://public.tableau.com
```

### `CSP_REPORT_ONLY`

- `true` o ausente:
  - CSP en modo `report-only`.
- `false`:
  - CSP en modo enforcing.

## Perfiles recomendados

### Produccion minima con `memory`

```env
NODE_ENV=production
PORT=3000
INDICATOR_REPOSITORY=memory
CSP_REPORT_ONLY=true
```

### Produccion con `sqlite`

```env
NODE_ENV=production
PORT=3000
INDICATOR_REPOSITORY=sqlite
SQLITE_DB_PATH=/app/data/indicators.sqlite
CSP_REPORT_ONLY=true
```

## Configuraciones faltantes hoy

- No existe `env.example`.
- No existe separacion documentada por ambiente adicional (`staging`, `preview`).
- No hay convencion formal de gestion de secretos ni rotacion.

## Validacion

- Confirmar variables resueltas en ambiente de despliegue.
- Ejecutar `pnpm run build` y `pnpm run start`.
- Verificar endpoints API y al menos un dashboard embebido.

## Riesgos y consideraciones

- Riesgo: dejar `INDICATOR_REPOSITORY=memory` esperando persistencia. Mitigacion: documentar explicitamente que no persiste.
- Riesgo: activar CSP enforcing sin validar dashboards. Mitigacion: probar primero con `CSP_REPORT_ONLY=true`.

## Referencias

- `server/src/app.ts`
- `server/src/createApp.ts`
- `server/src/config/repositoryFactory.ts`
- `server/src/config/security.ts`
