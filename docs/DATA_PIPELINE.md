# Pipeline de Datos

## Objetivo

Documentar el flujo actual de datos de indicadores, desde la fuente versionada en el repo hasta su consumo por la API y el seed opcional en SQLite.

## Alcance

- Cubre `data/indicadores.json` como fuente operativa actual.
- Cubre inicializacion en `memory` y `sqlite`.
- Cubre validaciones manuales y operativas hoy necesarias.
- No cubre ETL automatizado porque actualmente no existe en el repo.

## Estado actual

- La fuente de datos versionada es `data/indicadores.json`.
- `server/src/app.ts` admite dos formatos de entrada:
  1. un arreglo top-level de indicadores.
  2. un objeto con `indicadores` y `reportesAgrupados`.
- En arranque, el backend separa `rawIndicators` y `rawReports`, valida el seed con `server/src/data/indicatorSeed.ts`, crea el repositorio configurado y ejecuta `initialize()`.
- Formato canonico recomendado: objeto con `indicadores` y `reportesAgrupados`.
- El formato arreglo queda como compatibilidad de lectura para migraciones o seeds historicos.
## Flujo operativo actual

1. Editar o reemplazar `data/indicadores.json`.
2. Validar visualmente que el JSON mantenga uno de los dos formatos soportados.
3. Ejecutar:

```bash
pnpm run test
pnpm run build
```

4. Si se usa `INDICATOR_REPOSITORY=sqlite`:
   - con base nueva o vacia, el seed se aplica automaticamente.
   - con base existente, el seed no sobreescribe datos ya persistidos.
5. Levantar la aplicacion y verificar:
   - `GET /api/indicadores`
   - `GET /api/categorias`
   - `GET /api/reportes-agrupados`

## SQLite y seed

- Variable de control: `INDICATOR_REPOSITORY=sqlite`.
- Ruta por defecto: `data/indicators.sqlite` si `SQLITE_DB_PATH` no esta definida.
- `server/src/repositories/SqliteIndicatorRepository.ts`:
  - crea directorios faltantes para el `dbPath`.
  - rechaza un `dbPath` que apunte a un directorio existente.
  - crea tablas `indicators` y `grouped_reports` si no existen.
  - inserta seed solo cuando `indicators` esta vacia.
- Implicacion operativa:
  - actualizar `indicadores.json` no refresca automaticamente una base SQLite ya poblada.
  - si se requiere volver a sembrar, debe regenerarse la base o definirse un proceso controlado.

## Validaciones minimas recomendadas

- El JSON debe parsear sin errores.
- Cada indicador debe tener `id`, `codigo`, `nombre/titulo`, `area`, `dimension`, `estado` y metadatos minimos suficientes para render.
- Si existe `enlaceVisualizacion`, debe ser una URL valida de Power BI o Tableau publico.
- Si se usa el formato objeto, `reportesAgrupados` debe ser consistente con `/api/reportes-agrupados`.
- Se valida estructura base del seed en arranque; los cambios invalidos fallan antes de construir el repositorio.
## Calidad y ownership

- Estado actual: no hay owner ni proceso ETL formal documentado dentro del repo.
- Hasta contar con ETL:
  - tratar `data/indicadores.json` como fuente de verdad versionada.
  - revisar cambios por PR.
  - adjuntar evidencia del origen del dato en la descripcion del PR o en documento complementario.

## Brechas conocidas

- No hay scripts de ingesta automatica.
- No existe versionado formal del esquema ni migraciones de shape para cambios futuros.
## Validacion

- `pnpm run test`
- `pnpm run build`
- Verificar manualmente rutas API principales y una muestra de indicadores con y sin dashboard.

## Riesgos y consideraciones

- Riesgo: asumir que cambiar `indicadores.json` actualiza SQLite existente. Mitigacion: regenerar o recrear DB cuando el seed deba reaplicarse.
- Riesgo: introducir datos con shape compatible pero semanticamente incorrecto. Mitigacion: mantener la validacion estructural y sumar checklist de negocio.

## Referencias

- `data/indicadores.json`
- `server/src/app.ts`
- `server/src/config/repositoryFactory.ts`
- `server/src/data/indicatorSeed.ts`
- `server/src/repositories/SqliteIndicatorRepository.ts`
