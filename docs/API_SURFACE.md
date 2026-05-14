# Superficie API

## Objetivo

Documentar la superficie HTTP actual de NewKimn para facilitar consumo interno, validacion operativa y evolucion controlada del backend.

## Alcance

- Cubre endpoints expuestos por la aplicacion Express.
- Cubre parametros, respuestas esperadas y notas operativas basadas en el comportamiento actual.
- No cubre autenticacion, versionado formal de API ni acuerdos con terceros externos.

## Pasos / Implementacion

### 1. Endpoints de indicadores

#### `GET /api/indicadores`

- Devuelve la lista de indicadores normalizados.
- Soporta filtros opcionales:
  - `area`
  - `dimension`
  - `limit`
  - `offset`
- Reglas actuales:
  - `limit` debe ser entero positivo `<= 1000`.
  - `offset` debe ser entero `>= 0`.
  - Si se usa paginacion, la API responde con headers:
    - `X-Total-Count`
    - `X-Limit`
    - `X-Offset`

Ejemplo:

```http
GET /api/indicadores?area=Autonomia&limit=10&offset=0
```

#### `GET /api/indicadores/:id`

- Devuelve un indicador individual por identificador normalizado.
- Cuando no existe, responde error unificado `404`.

Ejemplo:

```http
GET /api/indicadores/02VGGE-04
```

### 2. Endpoints de categorias

#### `GET /api/categorias`

- Devuelve categorias derivadas desde `area`.
- El `id` de categoria corresponde a un slug generado en backend.

#### `GET /api/categorias/:categoryId/indicadores`

- Devuelve indicadores asociados a una categoria.
- `categoryId` debe cumplir regex `^[a-z0-9-]+$`.
- Si el `categoryId` es invalido, la validacion responde error unificado.

### 3. Endpoints de reportes y salud operativa

#### `GET /api/reportes-agrupados`

- Devuelve la coleccion de reportes agrupados cargados desde datos seed.

#### `GET /api/metrics`

- Expone metricas operativas en JSON para observabilidad minima.
- Su objetivo actual es inspeccion interna y smoke checks.

### 4. Contratos de respuesta

- Las respuestas exitosas se serializan en JSON.
- Los errores siguen el contrato descrito en `docs/API_ERROR_CONTRACT.md`.
- Las pruebas de contrato actuales validan consistencia entre `memory` y `sqlite`.

### 5. Consideraciones operativas

- No existe autenticacion ni rate limiting por endpoint.
- No hay versionado explicito tipo `/api/v2`.
- No hay cache documentada a nivel CDN o reverse proxy.
- `GET /api/indicadores` usa ETag por configuracion global de Express.

## Validacion

- Ejecutar `pnpm run test` y revisar:
  - tests de rutas en `server/src/api/v1/indicators/indicators.routes.test.ts`
  - tests de contrato en `server/src/api/v1/indicators/indicators.contract.test.ts`
- Verificar localmente:

```bash
curl http://localhost:3000/api/indicadores
curl http://localhost:3000/api/indicadores?limit=5&offset=0
curl http://localhost:3000/api/categorias
curl http://localhost:3000/api/reportes-agrupados
curl http://localhost:3000/api/metrics
```

## Riesgos y consideraciones

- Sin autenticacion, cualquier despliegue publico debe asumir consumo abierto de lectura.
- Sin versionado formal, cambios de payload deben tratarse como breaking changes.
- La documentacion refleja el estado actual del codigo; si se agregan endpoints, este inventario debe actualizarse en el mismo PR.

## Referencias

- `docs/API_ERROR_CONTRACT.md`
- `docs/ARCHITECTURE.md`
- `server/src/api/v1/indicators/indicators.routes.ts`
- `server/src/createApp.ts`
