# Arquitectura Tecnica (Resumen)

## Objetivo

Describir la arquitectura actual a alto nivel para facilitar onboarding y decisiones de mantenimiento.

## 1) Vista de componentes

### Frontend (`client/`)

- React + Vite como stack principal.
- Consumo de API via rutas `/api/*`.
- Enrutamiento con `wouter`.

### Backend (`server/`)

- Express como API HTTP.
- Capa de rutas para indicadores/categorias.
- Capa de servicio para normalizacion y logica de dominio.
- Capa de repositorio con implementaciones `memory` y `sqlite` bajo flag.

### Datos (`data/`)

- Fuente local inicial de indicadores (`data/indicadores.json`).
- Inicializacion de datos en arranque de app.

### Tipos compartidos (`shared/`)

- Tipos de dominio y tipos comunes utilizados entre frontend/backend.

## 2) Flujo principal de request

Ejemplo: `GET /api/indicadores`

1. Cliente solicita `GET /api/indicadores`.
2. Router Express recibe y valida parametros (si aplica).
3. Servicio consulta al repositorio activo (`memory` o `sqlite`).
4. Se normaliza/formatea respuesta de dominio.
5. API responde payload JSON al cliente.
6. Cliente renderiza listado de indicadores.

## 3) Decisiones tecnicas vigentes

### Parche de `wouter`

- Se mantiene el parche de `wouter@3.7.1` declarado en `pnpm.patchedDependencies`.
- Justificacion y riesgos: ver [WOUTER_PATCH_EVALUATION.md](./WOUTER_PATCH_EVALUATION.md).

### Estrategia de repositorio de datos

- `memory`: modo default para desarrollo simple y rapido.
- `sqlite`: modo alternativo bajo feature flag/variable de entorno para evolucion operativa.

### Contrato de errores API

- Se mantiene contrato uniforme para respuestas de error.
- Referencia: [API_ERROR_CONTRACT.md](./API_ERROR_CONTRACT.md).

## 4) Observabilidad y operacion

- Existe baseline operativo con SLO inicial y metricas endpoint.
- Referencia: [OPERATIONS.md](./OPERATIONS.md).

## 5) Convenciones de documentacion

- Toda documentacion tecnica nueva debe enlazarse desde `README.md`.
- Usar la plantilla base en [DOCUMENT_TEMPLATE.md](./DOCUMENT_TEMPLATE.md).
