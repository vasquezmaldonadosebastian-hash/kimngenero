# Contribucion Avanzada

## Objetivo

Definir criterios de contribucion tecnica para cambios que afectan arquitectura, datos, pruebas, seguridad o UI, de modo que la mantenibilidad no dependa de conocimiento implicito.

## Alcance

- Cubre convenciones de cambios tecnicos y documentales.
- Cubre expectativas para pruebas y validacion por tipo de cambio.
- No reemplaza el onboarding basico del `README.md`.

## Pasos / Implementacion

### 1. Alcance y forma de los PR

- Preferir PR pequenos, enfocados y con una sola razon de cambio.
- Separar cuando sea posible:
  - cambios de codigo
  - cambios de datos
  - cambios de documentacion
- Si un cambio modifica contratos o comportamiento visible, explicarlo en la descripcion del PR.

### 2. Reglas por tipo de cambio

#### Backend / API

- Actualizar `docs/API_SURFACE.md` si cambia un endpoint.
- Actualizar `docs/API_ERROR_CONTRACT.md` si cambia el contrato de errores.
- Agregar o ajustar tests de rutas/contrato cuando cambie validacion o payload.

#### Datos

- Actualizar `docs/DATA_PIPELINE.md` y `docs/DATA_DICTIONARY.md` si cambia el shape o significado del dataset.
- Validar impacto en `memory` y `sqlite`.

#### UI / UX

- Validar estados de carga, vacio y error.
- Si se introducen nuevos patrones visuales, actualizar `docs/UI_UX_GUIDELINES.md`.
- No introducir componentes Radix fuera del conjunto retenido sin justificarlo.

#### Seguridad / Produccion

- Cualquier cambio en CSP, iframes o configuracion sensible debe reflejarse en:
  - `docs/SECURITY_NETWORK.md`
  - `docs/PRODUCTION_CONFIGURATION.md`

### 3. Pruebas esperadas

Ejecutar segun aplique:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

Adicionalmente:

- cambios en API: revisar tests backend
- cambios en componentes: revisar tests frontend
- cambios en datos: validar navegacion real y embeds

### 4. Documentacion como parte del cambio

Se espera actualizar documentacion cuando cambie:

- el flujo operativo
- el contrato de datos
- la API publica
- la configuracion por ambiente
- el sistema visual o de interaccion

### 5. Criterios de calidad

- Evitar duplicacion innecesaria.
- Mantener nombres consistentes entre codigo y docs.
- Favorecer defaults seguros sobre configuraciones implicitas.
- Dejar registradas las decisiones de largo plazo en `docs/ADR_INDEX.md`.

## Validacion

- Confirmar que el PR enumera:
  - que cambia
  - como se valido
  - que docs se tocaron
- Confirmar que los archivos de docs relevantes quedaron enlazados desde `README.md` o desde otro documento indice.

## Riesgos y consideraciones

- La deuda documental reaparece rapido si cambios de codigo no arrastran sus docs asociadas.
- PRs grandes con mezcla de datos, UI y backend elevan el costo de revision y el riesgo de regresiones.

## Referencias

- `README.md`
- `docs/TEST_STRATEGY.md`
- `docs/API_SURFACE.md`
- `docs/UI_UX_GUIDELINES.md`
- `docs/ADR_INDEX.md`
