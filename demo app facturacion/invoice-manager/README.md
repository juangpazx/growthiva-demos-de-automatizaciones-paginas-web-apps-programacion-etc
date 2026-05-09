# 📄 Invoice Manager

Aplicación de facturación inteligente para capturar, almacenar y analizar facturas de forma local. Ideal para pruebas rápidas, automatización de gastos y demostraciones técnicas.

## 🚀 Qué hace

- Captura facturas en `PDF`, `JPG` o `PNG`
- Extrae datos clave con OCR local (Tesseract.js)
- Guarda facturas en `public/uploads/` organizadas por fecha
- Actualiza automáticamente un archivo Excel (`facturas.xlsx`)
- Ofrece APIs para ver facturas, descargar Excel y obtener estadísticas

## 💡 Beneficios

- No depende de servicios externos
- Funciona completamente local
- Código estructurado para producción
- Listo para publicar como repositorio público en GitHub

## ✅ Características principales

- OCR local con `tesseract.js`
- Validación y subida de archivos con `multer`
- Guardado de datos en Excel con `xlsx`
- Backend con `Express` y `CORS`
- Frontend ligera y funcional

## 📦 Requisitos

- Node.js 14+
- npm
- Windows, macOS o Linux

## ⚙️ Instalación

```bash
cd invoice-manager
npm install
```

## 🔧 Configuración

Copia el archivo de ejemplo:

```bash
copy .env.example .env
```

Contenido recomendado de `.env`:

```env
PORT=3000
NODE_ENV=development
UPLOAD_DIR=public/uploads
EXCEL_FILE=public/facturas.xlsx
OCR_LANGUAGE=spa
```

## ▶️ Ejecutar

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

Abre la aplicación en `http://localhost:3000`

## 📁 Estructura del proyecto

```
invoice-manager/
├── backend/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   └── invoiceController.js
│   ├── middleware/
│   │   └── upload.js
│   ├── routes/
│   │   └── invoices.js
│   ├── utils/
│   │   ├── ocrProcessor.js
│   │   ├── excelHandler.js
│   │   └── fileOrganizer.js
│   └── server.js
├── frontend/
│   └── index.html
├── public/
│   ├── uploads/
│   └── facturas.xlsx
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

## 🔌 Endpoints disponibles

### Subir factura

`POST /api/upload`

- `multipart/form-data`
- campo: `file`

### Listar facturas

`GET /api/facturas`

### Descargar Excel

`GET /api/excel`

### Obtener estadísticas

`GET /api/estadisticas`

## 📈 Flujo de procesamiento

1. Usuario sube archivo (PDF/JPG/PNG)
2. Multer guarda la factura en `public/uploads/AAAA-MM-DD`
3. Se ejecuta OCR local
4. Se extraen fecha, proveedor, monto, número y categoría
5. Se actualiza el archivo Excel
6. Se devuelve la respuesta con los datos procesados

## 🌍 Cómo publicar este proyecto

1. Sube este repositorio a GitHub.
2. Cambia la visibilidad a `Public`.
3. Actualiza la descripción del repositorio con:
   `Invoice Manager | OCR + Excel local sin APIs`
4. Agrega `LICENSE`, `README.md` y `CONTRIBUTING.md`.

## 🧑‍💼 Contacto

- Juan Paz
- info@juanpazx.com

## 📝 Licencia

MIT

10. Frontend muestra resultados y actualiza tabla
```

## 📸 Formatos Soportados

- **PDF** (.pdf)
- **Imágenes** (.jpg, .jpeg, .png)
- **Tamaño máximo**: 10 MB

## 🏷️ Categorías Detectadas

El sistema detecta automáticamente la categoría basado en palabras clave:

- **Servicios**: servicio, consultoría, mantenimiento, limpieza
- **Materiales**: material, producto, equipo, herramienta
- **Transporte**: transporte, envío, flete, logística
- **Alimentos**: alimento, comida, bebida, restaurante
- **Publicidad**: publicidad, anuncio, marketing
- **Viaje**: hotel, vuelo, pasaje, viaje
- **Otros**: Si no coincide con ninguna categoría

## 📊 Datos Extraídos Automáticamente

1. **Fecha**: Detecta formatos DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD
2. **Proveedor**: Busca palabras como "empresa", "de:", "proveedor"
3. **Monto**: Detecta números con 2 decimales (último es el total)
4. **Número de Factura**: Busca "factura", "invoice", "n°", "#"
5. **Categoría**: Basado en palabras clave en el texto
6. **Ruta de Imagen**: Enlace local para acceder a la factura

## 🗂️ Organización de Archivos

Las imágenes se guardan automáticamente en carpetas por fecha:

```
public/uploads/
├── 2024-05-09/
│   ├── 1715254800000-abc123.pdf
│   ├── 1715254801000-def456.jpg
│   └── 1715254802000-ghi789.png
├── 2024-05-10/
│   ├── 1715341200000-jkl012.pdf
│   └── 1715341201000-mno345.jpg
└── 2024-05-11/
    └── 1715427600000-pqr678.jpg
```

## 💾 Archivo Excel

El archivo `public/facturas.xlsx` se crea automáticamente con las siguientes columnas:

| Fecha | Proveedor | Monto | Número de Factura | Categoría | Ruta de Imagen | Fecha de Registro |
|-------|-----------|-------|-------------------|-----------|----------------|------------------|
| 15/05/2024 | Empresa XYZ | $1,234.56 | INV-001 | Servicios | /public/uploads/... | 09/05/2024 14:30:45 |

## 🔧 Configuración Avanzada

### Cambiar idioma de OCR

Editar `.env`:

```env
OCR_LANGUAGE=spa  # Español
OCR_LANGUAGE=eng  # Inglés
OCR_LANGUAGE=fra  # Francés
OCR_LANGUAGE=por  # Portugués
```

Idiomas soportados: [Tesseract Languages](https://github.com/naptha/tesseract.js#supported-languages)

### Cambiar puerto

Editar `.env`:

```env
PORT=8080  # En lugar de 3000
```

### Cambiar directorio de uploads

Editar `.env`:

```env
UPLOAD_DIR=uploads  # Otro directorio
```

## 🐛 Solucionar Problemas

### Error: "Cannot find module 'tesseract.js'"

```bash
npm install tesseract.js
```

### Error: "Port 3000 is already in use"

Cambiar puerto en `.env`:

```env
PORT=3001
```

### OCR muy lento

Es normal en la primera ejecución. Tesseract.js descarga modelos la primera vez. Las siguientes serán más rápidas.

### Excel no se guarda

Verificar que la carpeta `public/` exista y tenga permisos de escritura.

## 📝 Registros (Logs)

La aplicación muestra registros detallados en la consola:

```
[OCR] Procesando imagen: public/uploads/2024-05-09/timestamp.jpg
[EXTRACCIÓN] Extrayendo datos de factura...
[EXCEL] Agregando factura al Excel...
[UPLOAD] Proceso completado exitosamente
```

## 💡 Cómo funciona este proyecto

1. El frontend envía la factura al backend mediante `/api/upload`.
2. El backend recibe el archivo con Multer y lo guarda en `public/uploads/AAAA-MM-DD/`.
3. Si el archivo es PDF, primero intenta extraer texto directo con `pdf-parse`.
4. Si no hay texto seleccionable, convierte el PDF a imagen con `sharp` y aplica OCR con `tesseract.js`.
5. El texto extraído se procesa en `backend/utils/ocrProcessor.js` para obtener fecha, proveedor, monto, número y categoría.
6. Los datos se agregan al Excel usando `backend/utils/excelHandler.js`.
7. El frontend muestra el resultado y permite descargar el Excel actualizado.

### Archivos clave

- `backend/server.js`: inicia el servidor Express.
- `backend/routes/invoices.js`: define endpoints `/api/upload`, `/api/facturas`, `/api/excel`, `/api/estadisticas`.
- `backend/controllers/invoiceController.js`: orquesta OCR, extracción y guardado en Excel.
- `backend/utils/ocrProcessor.js`: procesa OCR y extrae datos.
- `backend/utils/excelHandler.js`: crea y actualiza el archivo Excel.
- `backend/utils/fileOrganizer.js`: organiza las subidas por fecha.
- `frontend/index.html`: interfaz para subir facturas y mostrar resultados.

### Subirlo a GitHub

He preparado el proyecto para subirlo a GitHub. Si la carpeta ya está en tu repositorio con remote configurado, puedes hacer:

```bash
cd "c:/Users/DELL/Desktop/Juan working/growthiva-demos-de-automatizaciones-paginas-web-apps-programacion-etc"
git add invoice-manager
git commit -m "Add invoice-manager app with OCR, Excel and frontend"
git push origin main
```

Esto dejará el proyecto disponible en tu repositorio en GitHub.


## 🔒 Seguridad

- Validación de extensiones de archivo
- Límite de tamaño de archivo (10MB)
- Nombres de archivo únicos (previene sobrescritura)
- CORS configurado
- Errores no exponen rutas internas

## ⚡ Optimizaciones

- Sharp comprime imágenes automáticamente
- Excel se abre solo cuando es necesario
- Tesseract.js cachea modelos localmente
- Nombres únicos previenen conflictos

## 📱 Uso Móvil

La aplicación es 100% responsive. En móvil:

1. Abre http://localhost:3000 en el navegador
2. Toca el botón "Seleccionar Archivo"
3. Selecciona una foto o archivo de la galería
4. La factura se procesa automáticamente

## 🚫 Limitaciones

- OCR depende de la calidad de la imagen
- Funciona mejor con facturas claras y bien iluminadas
- Datos extraídos pueden necesitar revisión
- No soporta múltiples idiomas simultáneamente

## 📈 Próximas Mejoras

- [ ] Edición manual de datos extraídos
- [ ] Búsqueda y filtrado de facturas
- [ ] Exportación a formatos adicionales
- [ ] Autenticación de usuarios
- [ ] Base de datos (opcional)
- [ ] API de sincronización en la nube

## 📄 Licencia

MIT - Libre para usar en proyectos personales y comerciales

## 👥 Autor

Desarrollado con ❤️ para pequeños negocios

## 💬 Soporte

Para problemas o sugerencias:
1. Revisar los registros en la consola
2. Verificar que Node.js esté instalado correctamente
3. Asegurar que los puertos no estén ocupados
4. Revisar permisos de carpetas

## 🎓 Recursos Útiles

- [Documentación Express.js](https://expressjs.com/)
- [Tesseract.js](https://github.com/naptha/tesseract.js)
- [XLSX NPM](https://www.npmjs.com/package/xlsx)
- [Multer](https://www.npmjs.com/package/multer)
- [Tailwind CSS](https://tailwindcss.com/)

---

**¡Disfruta gestionando tus facturas localmente! 🎉**
