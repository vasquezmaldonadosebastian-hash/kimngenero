# Diccionario de Datos

## Objetivo

Describir el significado operativo de los campos que componen el modelo de indicadores y los conceptos derivados que usa KimnGenero.

## Alcance

- cubre el modelo normalizado consumido por frontend y API
- cubre campos relevantes del seed raw cuando afectan ingesta o limpieza
- no cubre reglas estadisticas profundas de cada indicador individual

## 1. Entidad principal: `Indicator`

Campos normalizados principales:

- `id`: identificador unico del indicador
- `titulo`: nombre desplegado al usuario
- `descripcion`: contexto textual del indicador
- `iframeSrc`: URL del dashboard o visualizacion embebida
- `iframeHeight`: alto sugerido para el embed
- `tipo`: `powerbi` o `placeholder`
- `fuentes`: lista de fuentes de informacion asociadas
- `ultimaActualizacion`: texto de fecha de actualizacion
- `notasMetodologicas`: contenido metodologico asociado
- `unidad`: unidad de medida del indicador
- `codigo`: codigo institucional del indicador
- `objetivo`: objetivo del indicador
- `formula`: formula de calculo
- `formulaSimplificada`: resumen opcional de la formula
- `variables`: variables involucradas en el calculo
- `frecuenciaMedicion`: periodicidad de actualizacion o medicion
- `estado`: estado operativo del indicador
- `lineaBase`: valor o referencia inicial
- `dimension`: agrupador tematico o eje analitico
- `area`: agrupador funcional de categoria
- `fuenteAdministrativa`: sistema o fuente administrativa de origen
- `responsableCalculo`: rol o unidad responsable del calculo
- `responsableVerificar`: rol o unidad responsable de verificacion
- `fechaCorte`: fecha de corte del dato
- `instructivoCalculo`: instructivo o detalle del calculo

## 2. Entidades derivadas

### `IndicatorCategory`

- derivada desde `area`
- campos:
  - `id`: slug generado a partir de `area`
  - `label`: nombre visible de la categoria
  - `descripcion`: texto generado automaticamente
  - `indicadores`: coleccion asociada

### `GroupedReport`

- reporte agregado distinto de un indicador individual
- campos:
  - `id`
  - `titulo`
  - `descripcion`
  - `iframeSrc`
  - `tipo`

## 3. Campos raw relevantes en ingesta

El seed tolera nombres heterogeneos en `RawIndicator`, por ejemplo:

- `codigo` o `Codigo del indicador`
- `nombre` o `Nombre del indicador`
- `dimension` o `Dimension`
- `area` o `Area`
- `enlaceVisualizacion` o `Enlace visualizacion`

Implicancia:

- el pipeline actual absorbe variantes historicas de nombres
- problemas de codificacion del origen pueden reflejarse en keys raw
- cualquier limpieza del dataset debe preservar compatibilidad hasta formalizar una migracion

## 4. Campos con semantica sensible

- `estado`: se usa visualmente y debe mantenerse con vocabulario estable
- `dimension`: afecta color y agrupacion en frontend
- `area`: afecta categorias y navegacion
- `iframeSrc` y `tipo`: afectan embebido y CSP
- `fechaCorte`, `ultimaActualizacion`, `frecuenciaMedicion`: sostienen la lectura de vigencia del dato

## 5. Reglas practicas

- `id` y `codigo` no deben asumir equivalencia semantica si el origen no la garantiza
- `area` vacia impide que el indicador aparezca dentro de categorias derivadas
- `iframeSrc` ausente o invalido termina en `placeholder` durante la normalizacion

## Validacion

- el seed valida estructura base en `server/src/data/indicatorSeed.ts` antes de construir el repositorio
- revisar tipos compartidos en `shared/types/indicator-domain.ts`
- ejecutar:

```bash
pnpm run test
```

- validar especialmente los normalizadores en `server/src/services/normalizers.test.ts`

## Riesgos y consideraciones

- el dataset actual mezcla convenciones de nombres y posibles problemas de codificacion
- la validacion estructural reduce fallos silenciosos, pero no reemplaza la revision de negocio

## Referencias

- `docs/DATA_PIPELINE.md`
- `server/src/data/indicatorSeed.ts`
- `shared/types/indicator-domain.ts`
- `server/src/services/normalizers.ts`
