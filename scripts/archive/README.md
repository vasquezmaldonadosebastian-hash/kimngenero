# Scripts auxiliares

Esta carpeta agrupa scripts de trabajo puntual, exploracion, capturas o apoyo documental que no forman parte del flujo normal del proyecto.

## Ejemplos

- generacion de briefs
- capturas de pantallas
- inspeccion de endpoints o paginas especificas
- experimentos tecnicos de una etapa concreta

Algunos de estos scripts escriben insumos en `outputs/brief_diseno_docs/` o rutas similares de trabajo local; esos artefactos no forman parte del producto y deben seguir fuera del flujo normal.

## Regla

No usar estos scripts como dependencia implicita del producto.
Si alguno pasa a ser parte del flujo real del repositorio, debe volver a `scripts/` y quedar documentado en `package.json` o en la documentacion tecnica correspondiente.
