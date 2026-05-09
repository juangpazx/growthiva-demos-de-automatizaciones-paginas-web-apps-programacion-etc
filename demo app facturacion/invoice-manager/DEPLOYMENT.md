# Despliegue público

Este proyecto está listo para publicarse en GitHub y desplegarse en un servicio de hosting.

## Opciones recomendadas

- Render
- Railway
- Fly.io
- DigitalOcean App Platform

## Pasos rápidos para Render

1. Crea una cuenta en https://render.com
2. Crea un nuevo servicio tipo "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura el comando de build:
   ```bash
npm install
```
5. Configura el comando de start:
   ```bash
npm start
```
6. Define las variables de entorno si las necesitas.

## Variables de entorno

Ejemplo de `.env`:

```env
PORT=3000
NODE_ENV=production
UPLOAD_DIR=public/uploads
EXCEL_FILE=public/facturas.xlsx
OCR_LANGUAGE=spa
```

## Nota

Para que la aplicación esté disponible públicamente, el servidor debe estar en ejecución permanente en el servicio elegido. Render y Railway proporcionan URLs públicas automáticas.
