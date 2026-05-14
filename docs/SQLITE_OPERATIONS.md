# Operacion de SQLite

## Objetivo

Documentar el comportamiento actual del repositorio SQLite y las precauciones necesarias para operarlo de forma segura en NewKimn.

## Alcance

- Cubre inicializacion, seed, persistencia y recuperacion basica.
- Cubre el uso de `INDICATOR_REPOSITORY=sqlite`.
- No cubre migraciones complejas ni escalamiento a una base relacional remota.

## Pasos / Implementacion

### 1. Activacion

Para usar SQLite:

```bash
INDICATOR_REPOSITORY=sqlite
SQLITE_DB_PATH=data/indicators.sqlite
```

El backend crea un `SqliteIndicatorRepository` y usa esa ruta como archivo de base.

### 2. Inicializacion actual

- Si `SQLITE_DB_PATH` es relativo, se resuelve desde `process.cwd()`.
- Si el directorio no existe, se crea automaticamente.
- Si la ruta apunta a un directorio existente, la inicializacion falla.
- Se crean dos tablas:
  - `indicators`
  - `grouped_reports`

### 3. Logica de seed

- El seed solo ocurre cuando la tabla `indicators` esta vacia.
- Los datos seed provienen de:
  - `data/indicadores.json` para indicadores
  - `reportesAgrupados` cuando exista en el mismo dataset
- Si la base ya tiene datos, el repositorio no sobreescribe contenidos existentes.

Implicancia operativa:

- cambiar `data/indicadores.json` no actualiza automaticamente una base SQLite ya poblada
- para refrescar datos hay que regenerar la base o aplicar una estrategia explicita de recarga

### 4. Cuándo conviene usar `sqlite`

Usar `sqlite` cuando:

- se quiere persistencia local simple
- se necesita validar el contrato de almacenamiento fuera de memoria
- el entorno tiene filesystem estable y controlado

Evitar `sqlite` cuando:

- el hosting usa disco efimero
- se espera alta concurrencia de escritura
- se requiere backup/restore formal y trazabilidad fuerte

### 5. Backup y recuperacion

Estado actual:

- no existe automatizacion de backup en el repo
- no existen migraciones ni utilidad oficial de restore

Recuperacion minima hoy:

1. detener aplicacion
2. respaldar o eliminar el archivo SQLite dañado
3. reiniciar aplicacion con dataset valido
4. dejar que el seed regenere la base si estaba vacia

### 6. Riesgos conocidos

- Divergencia entre `data/indicadores.json` y base SQLite ya poblada.
- Riesgo de perdida total si el archivo vive en almacenamiento no persistente.
- Falta de visibilidad operativa sobre corrupcion del archivo.

## Validacion

- Ejecutar pruebas del repositorio:

```bash
pnpm run test
```

- Revisar especificamente:
  - `server/src/repositories/SqliteIndicatorRepository.test.ts`
  - `server/src/api/v1/indicators/indicators.contract.test.ts`

- Probar localmente:

```bash
set INDICATOR_REPOSITORY=sqlite
set SQLITE_DB_PATH=data/indicators.sqlite
pnpm run dev
```

## Riesgos y consideraciones

- SQLite es una opcion tactica, no una estrategia de datos a largo plazo por si sola.
- Si el equipo adopta `sqlite` en produccion, debe complementarlo con backup, monitoreo y politica de recarga.

## Referencias

- `docs/DATA_PIPELINE.md`
- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_CONFIGURATION.md`
- `server/src/repositories/SqliteIndicatorRepository.ts`
- `server/src/config/repositoryFactory.ts`
