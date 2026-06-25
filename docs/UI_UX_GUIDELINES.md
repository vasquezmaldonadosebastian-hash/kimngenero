# Lineamientos de UX/UI y Sistema de Diseno

## Objetivo

Definir estandares visuales y de interaccion para asegurar consistencia en `KimnGenero`, facilitar el desarrollo del frontend en React y sostener una experiencia accesible para usuarios del observatorio.

## Alcance

- Cubre tokens de diseno: color, tipografia y espaciado.
- Cubre el uso de la libreria de componentes base.
- Cubre patrones de visualizacion de datos e indicadores.
- No cubre la implementacion detallada de CSS ni la arquitectura completa del frontend.

## 1. Tokens de diseno

### Paleta de colores actual

Colores observados de uso frecuente en vistas de indicadores y detalle:

- Color principal: `#0176DE`
  - acciones primarias, enlaces, foco visual y botones.
- Texto/base oscura: `#03122E`
  - encabezados, heroes y contraste fuerte.
- Fondo suave: `#F5F4F8`, `#F8F9FA`, `#E8F2FF`
  - superficies, cards y fondos secundarios.
- Estados:
  - exito: `#D1FAE5` / `#065F46`
  - advertencia: `#FEF3C7` / `#92400E`
  - disponibilidad de dashboard: `#27AE60` o `#F59E0B`

### Colores por dimension en indicadores

`client/src/features/indicadores/pages/Indicadores.tsx` define un `COLOR_MAP` por dimension.

Regla actual:

- cada dimension usa `bg`, `border` y `text`.
- el color se reutiliza en header de card y CTA.

Recomendacion documental:

- no agregar nuevas dimensiones sin definir tripleta `bg/border/text`.
- separar conceptualmente color de dimension y color de estado para no mezclar semanticas.

### Tipografia y espaciado

- Tipografia dominante:
  - `Montserrat` en titulos o bloques destacados del detalle.
  - tipografia utilitaria del sistema/Tailwind para texto general.
- Escala observable:
  - heroes entre `text-3xl` y superiores
  - cuerpo principal entre `text-sm` y `text-lg`
  - metadata en `text-xs`
- Espaciado:
  - cards y bloques usan `rounded-xl`, `shadow-sm|md`, paddings amplios y layout respirado.

## 2. Componentes UI

### Libreria base

Tras la auditoria de dependencias, los componentes base documentados hoy son:

- `@radix-ui/react-dialog`
- `@radix-ui/react-slot`
- `@radix-ui/react-tooltip`

Implementaciones locales:

- `client/src/components/ui/dialog.tsx`
- `client/src/components/ui/button.tsx`
- `client/src/components/ui/tooltip.tsx`

Estilado:

- base utilitaria con Tailwind classes y variantes locales.
- evitar introducir wrappers nuevos de Radix UI sin justificar dependencia y uso real.

### Iconografia

- Libreria principal: `lucide-react`
- Criterio actual:
  - iconos lineales simples
  - tamano pequeno en acciones, metadata y soporte visual

## 3. Patrones de interaccion (UX)

### Carga de datos

Estado actual:

- se usan `spinners` para cargas principales:
  - `IndicatorsContext`
  - `/indicadores`
  - `/indicador/:id`
  - `EstadoAgrupado`
- no hay skeletons implementados como patron global.

Regla actual recomendada:

- usar spinner para carga de pagina o carga inicial de contexto.
- si se agregan cargas parciales mas complejas, evaluar skeletons y documentarlos antes de replicarlos.

### Manejo de errores UI

- Cliente usa `apiGetJson()` y mapea `message`/`error` del contrato documentado en `docs/API_ERROR_CONTRACT.md`.
- Las paginas principales muestran error inline o vista de error.
- Acciones de dashboard usan `sonner` para `toast.success`, `toast.info` y `toast.error`.

Regla recomendada:

- errores de fetch de pagina:
  - mostrar bloque inline o pantalla de error.
- errores de accion corta:
  - usar toast.
- placeholders:
  - usar copy claro, no tecnico, si falta dashboard o dato.

### Filtros y busqueda

- `/indicadores` combina:
  - filtros semanticos `area` y `dimension` resueltos por backend.
  - busqueda local sobre dataset visible.
- `Limpiar filtros` debe restaurar:
  - `searchTerm`
  - `filterArea`
  - `filterDimension`

Regla recomendada:

- cualquier filtro nuevo debe definir si vive en backend o solo en cliente.
- evitar mezclar demasiados significados visuales en una misma card al filtrar.

### Tooltips, dialogos y feedback

- `TooltipProvider` esta montado a nivel app.
- `Dialog` y `Tooltip` deben reutilizar wrappers locales y no instancias directas dispersas.
- acciones no implementadas aun muestran toast informativo en vez de silencio.

## 4. Accesibilidad (A11y)

Estado actual observado:

- hay `focus-visible` styles en componentes base.
- existen atributos `aria-*` en algunos componentes y botones/iframes con `title`.
- no hay documento de contraste minimo ni checklist A11y formal.

Lineamiento minimo recomendado:

- mantener contraste suficiente entre texto y fondo en heroes, badges y estados.
- todo control clickeable debe ser navegable por teclado.
- componentes personalizados deben exponer `title`, `aria-expanded`, `aria-disabled` o equivalente cuando aplique.
- no depender solo de color para comunicar estado.

## 5. Patrones visuales para indicadores y dashboards

- Cards de indicadores:
  - header coloreado por dimension
  - metadata breve
  - badge de estado
  - CTA unico hacia detalle
- Detalle de indicador:
  - hero informativo
  - formula/metodologia
  - ficha tecnica
  - dashboard embebido o placeholder
- Dashboards:
  - `iframe` con `loading=\"lazy\"`
  - acciones de refresh, fullscreen y compartir
  - nota de actualizacion al pie del bloque

## Validacion

- Revisar `/indicadores`, `/indicador/:id` y una vista con dashboard.
- Verificar foco visible, lectura de estados y consistencia de colores por dimension.
- Confirmar que errores de API sigan el contrato documentado.

## Riesgos y consideraciones

- Riesgo: que cada pantalla nueva reinvente colores o feedback. Mitigacion: usar este documento como referencia normativa.
- Riesgo: mezclar color de categoria y de estado en una misma senal. Mitigacion: documentar una sola jerarquia semantica por elemento.

## Referencias

- `client/src/features/indicadores/pages/Indicadores.tsx`
- `client/src/features/indicadores/pages/IndicadorPage.tsx`
- `client/src/features/indicadores/components/detail/DashboardCard.tsx`
- `docs/API_ERROR_CONTRACT.md`
