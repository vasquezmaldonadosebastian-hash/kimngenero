# Diccionario de Datos

## Objetivo

Describir el significado operativo de los campos que componen el modelo de indicadores y los conceptos derivados que usa NewKimn.

## Alcance

- Cubre el modelo normalizado consumido por frontend y API.
- Cubre campos relevantes del seed raw cuando afectan ingesta o limpieza.
- No cubre reglas estadisticas profundas de cada indicador individual.

## Pasos / Implementacion

### 1. Entidad principal: `Indicator`

Campos normalizados principales:

- `id`: identificador unico del indicador.
- `titulo`: nombre desplegado al usuario.
- `descripcion`: contexto textual del indicador.
- `iframeSrc`: URL del dashboard o visualizacion embebida.
- `iframeHeight`: alto sugerido para el embed.
- `tipo`: `powerbi`, `tableau` o `placeholder`.
- `fuentes`: lista de fuentes de informacion asociadas.
- `ultimaActualizacion`: texto de fecha de actualizacion.
- `notasMetodologicas`: contenido metodologico asociado.
- `unidad`: unidad de medida del indicador.
- `codigo`: codigo institucional del indicador.
- `objetivo`: objetivo del indicador.
- `formula`: formula de calculo.
- `formulaSimplificada`: resumen opcional de la formula.
- `variables`: variables involucradas en el calculo.
- `frecuenciaMedicion`: periodicidad de actualizacion o medicion.
- `estado`: estado operativo del indicador.
- `lineaBase`: valor o referencia inicial.
- `dimension`: agrupador tematico o eje analitico.
- `area`: agrupador funcional de categoria.
- `fuenteAdministrativa`: sistema o fuente administrativa de origen.
- `responsableCalculo`: rol o unidad responsable del calculo.
- `responsableVerificar`: rol o unidad responsable de verificacion.
- `fechaCorte`: fecha de corte del dato.
- `instructivoCalculo`: instructivo o detalle del calculo.

### 2. Entidades derivadas

#### `IndicatorCategory`

- Derivada desde `area`.
- Campos:
  - `id`: slug generado a partir de `area`
  - `label`: nombre visible de la categoria
  - `descripcion`: texto generado automaticamente
  - `indicadores`: coleccion asociada

#### `GroupedReport`

- Reporte agregado distinto de un indicador individual.
- Campos:
  - `id`
  - `titulo`
  - `descripcion`
  - `iframeSrc`
  - `tipo`

### 3. Campos raw relevantes en ingesta

El seed tolera nombres heterogeneos en `RawIndicator`, por ejemplo:

- `codigo` o `CÃ³digo del indicador`
- `nombre` o `Nombre del indicador`
- `dimension` o `DimensiÃ³n`
- `area` o `Ãrea`
- `enlaceVisualizacion` o `Enlace visualizacion`

Implicancia:

- el pipeline actual absorbe variantes historicas de nombres
- problemas de codificacion del origen pueden reflejarse en keys raw
- cualquier limpieza del dataset debe preservar compatibilidad hasta formalizar una migracion

### 4. Campos con semantica sensible

- `estado`: se usa visualmente y debe mantenerse con vocabulario estable.
- `dimension`: afecta color y agrupacion en frontend.
- `area`: afecta categorias y navegacion.
- `iframeSrc` y `tipo`: afectan embebido y CSP.
- `fechaCorte`, `ultimaActualizacion`, `frecuenciaMedicion`: sostienen la lectura de vigencia del dato.

### 5. Reglas practicas

- `id` y `codigo` no deben asumir equivalencia semantica si el origen no la garantiza.
- `area` vacia impide que el indicador aparezca dentro de categorias derivadas.
- `iframeSrc` ausente o invalido termina en `placeholder` durante la normalizacion.

## Validacion

- Revisar tipos compartidos en:
  - `shared/types/indicator-domain.ts`
- Ejecutar:

```bash
pnpm run test
```

- Validar especialmente los normalizadores:
  - `server/src/services/normalizers.test.ts`

## Riesgos y consideraciones

- El dataset actual mezcla convenciones de nombres y posibles problemas de codificacion.
- Sin versionado del esquema raw, cualquier cambio aguas arriba puede romper la normalizacion silenciosamente.

## Referencias

- `docs/DATA_PIPELINE.md`
- `shared/types/indicator-domain.ts`
- `server/src/services/normalizers.ts`
