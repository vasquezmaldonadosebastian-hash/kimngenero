# Checklist de Release

## Objetivo

Definir una lista breve y repetible para reducir riesgos antes, durante y despues de una liberacion de KimnGenero.

## Alcance

- Cubre releases de aplicacion y cambios de datos.
- Cubre validacion tecnica minima previa y posterior al deploy.
- No cubre aprobaciones de negocio ni calendario editorial.

## Pasos / Implementacion

### 1. Antes del merge

1. Confirmar que el alcance del PR este acotado y descrito.
2. Ejecutar localmente:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

3. Si el cambio toca datos o repositorio:
   - validar `data/indicadores.json` y su esquema de carga
   - revisar impacto en `INDICATOR_REPOSITORY=sqlite`
4. Si el cambio toca UI:
   - revisar estados de carga, vacio y error
   - revisar accesibilidad basica por teclado
5. Confirmar que la documentacion afectada fue actualizada.

### 2. Antes del deploy

1. Verificar variables de entorno del ambiente objetivo.
2. Confirmar estrategia de repositorio:
   - `memory` para despliegues efimeros
   - `sqlite` solo si existe persistencia establecida
3. Confirmar que el artefacto productivo se genera con:

```bash
pnpm run build
```

4. Confirmar comando de arranque:

```bash
pnpm run start
```

5. Si se usa SQLite:
   - verificar path de base
   - validar permisos de escritura
   - confirmar plan de backup o regeneracion

### 3. Despues del deploy

1. Validar disponibilidad general.
2. Ejecutar smoke checks:

```bash
curl http://<host>/api/indicadores
curl http://<host>/api/categorias
curl http://<host>/api/reportes-agrupados
curl http://<host>/api/metrics
```

3. Abrir home e indicadores en navegador.
4. Revisar que carguen al menos:
   - listado de indicadores
   - pagina de detalle
   - embed de dashboard permitido por CSP
5. Revisar logs de arranque y errores HTTP.

### 4. Criterios para rollback

- Errores 5xx persistentes en endpoints core.
- Fallo de carga de dataset o repositorio.
- CSP o allowlist bloqueando dashboards criticos.
- Corrupcion o ausencia de la base SQLite en un despliegue que la requiera.

## Validacion

- Usar esta lista como gate operativo en cada release.
- Registrar hallazgos en el PR o canal operativo del equipo.

## Riesgos y consideraciones

- Sin ambiente staging formal, los smoke checks post-deploy son especialmente importantes.
- Si el despliegue depende de SQLite persistente, la ausencia de backup eleva el riesgo operacional.

## Referencias

- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_CONFIGURATION.md`
- `docs/SECURITY_NETWORK.md`
- `docs/DATA_PIPELINE.md`
