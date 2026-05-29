# Despliegue Docker Institucional

## Objetivo

Preparar `KimnGenero` para evaluacion y despliegue en infraestructura Docker institucional, usando un unico servicio Node/Express que sirve API y frontend construido.

## Arquitectura

- Imagen base: `node:20-alpine`.
- La imagen base se puede ajustar con `NODE_IMAGE` si un modo operativo requiere un runtime Node mas nuevo.
- Build multi-stage con clonacion del repositorio publico desde GitHub.
- Runtime no root con usuario `node`.
- Servicio HTTP interno en `PORT=3000`.
- Frontend y API se sirven desde el mismo origen.
- SSL, dominio publico y HSTS quedan a cargo del proxy inverso institucional.

## Recursos minimos

| Recurso | Minimo recomendado | Nota |
| --- | --- | --- |
| CPU | 1 vCPU | Suficiente para trafico institucional bajo o moderado |
| RAM | 512 MB | Recomendado construir la imagen fuera del host si el margen es ajustado |
| Almacenamiento | 500 MB | Aumentar si se activa SQLite con historicos o backups locales |
| Red | Entrada desde proxy inverso | Salida a internet solo requerida durante build |
| Puerto interno | 3000 | Publicado en loopback para proxy local |

## Variables de entorno

| Variable | Valor recomendado | Uso |
| --- | --- | --- |
| `NODE_ENV` | `production` | Activa comportamiento productivo |
| `PORT` | `3000` | Puerto HTTP del contenedor |
| `INDICATOR_REPOSITORY` | `memory` | Modo por defecto sin persistencia |
| `SQLITE_DB_PATH` | `/app/data/indicators.sqlite` | Solo si se usa `sqlite` |
| `CSP_REPORT_ONLY` | `true` | Mantiene CSP en modo reporte inicial |
| `IFRAME_ALLOWLIST` | Opcional | Restringe origenes permitidos para iframes |

## Build y ejecucion

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail=100 kimngenero
```

Para construir desde un tag o rama estable:

```bash
docker compose build --build-arg REPO_REF=v1.0.0
docker compose up -d
```

El `Dockerfile` tambien acepta otro origen publico:

```bash
docker build \
  --build-arg NODE_IMAGE=node:20-alpine \
  --build-arg REPO_URL=https://github.com/vasquezmaldonadosebastian-hash/KimnGenero.git \
  --build-arg REPO_REF=main \
  -t kimngenero:main .
```

## Proxy inverso y dominio

- Subdominio sugerido: `genero.uct.cl`.
- El proxy debe reenviar a `http://127.0.0.1:3000`.
- Cabeceras recomendadas:
  - `X-Forwarded-For`
  - `X-Forwarded-Proto`
  - `X-Forwarded-Host`
- No separar frontend y backend en esta fase; operar mismo origen evita agregar CORS.

## Smoke checks

```bash
curl http://127.0.0.1:3000/health
curl http://127.0.0.1:3000/api/indicadores
curl http://127.0.0.1:3000/api/categorias
curl http://127.0.0.1:3000/api/metrics
```

Validar tambien desde navegador:

1. `/`
2. `/indicadores`
3. Un detalle de indicador con dashboard embebido

## Actualizacion y rollback

Actualizacion:

```bash
docker compose build --build-arg REPO_REF=main
docker compose up -d
docker compose logs --tail=100 kimngenero
```

Rollback manual:

```bash
docker compose build --build-arg REPO_REF=<tag-o-commit-estable>
docker compose up -d
```

## Persistencia SQLite opcional

El despliegue inicial recomendado usa `INDICATOR_REPOSITORY=memory`, que carga `data/indicadores.json` al arranque y no requiere backup.

Si infraestructura solicita persistencia local:

1. Activar la variante SQLite documentada en `docker-compose.yml`.
2. Construir con una imagen Node que incluya `node:sqlite`; la variante comentada usa `NODE_IMAGE=node:24-alpine`.
3. Definir `INDICATOR_REPOSITORY=sqlite`.
4. Definir `SQLITE_DB_PATH=/app/data/indicators.sqlite`.
5. Montar el volumen `kimngenero_sqlite_data:/app/data`.
6. Programar backup externo del archivo SQLite.

Backup manual con el servicio detenido:

```bash
docker compose stop kimngenero-sqlite
docker run --rm -v kimngenero_sqlite_data:/data -v "$PWD/backups:/backup" alpine \
  sh -c 'cp /data/indicators.sqlite /backup/indicators-$(date +%Y%m%d-%H%M%S).sqlite'
docker compose start kimngenero-sqlite
```

## Seguridad

- El contenedor se ejecuta como usuario no root.
- `no-new-privileges:true` esta definido en `docker-compose.yml`.
- No incluir `.env`, credenciales ni archivos locales sensibles en la imagen.
- Mantener `CSP_REPORT_ONLY=true` hasta validar dashboards reales.
- Configurar HSTS en el proxy que termina SSL.
- No publicar el puerto directamente a internet; exponer solo por proxy inverso.
