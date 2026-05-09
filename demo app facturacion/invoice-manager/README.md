# 📄 Invoice Manager - Gestor de Facturas Local

Aplicación web completa para gestionar facturas sin usar APIs externas. Todo funciona 100% localmente con OCR, Excel y almacenamiento de imágenes.

## ✨ Características

- ✅ **OCR Local** - Procesa imágenes con Tesseract.js (sin APIs)
- ✅ **Extracción Automática** - Detecta fecha, proveedor, monto, número de factura y categoría
- ✅ **Excel Automático** - Guarda datos en Excel local (crea archivo si no existe)
- ✅ **Almacenamiento Organizado** - Organiza imágenes por fecha (AAAA-MM-DD)
- ✅ **Interfaz Moderna** - Frontend con Tailwind CSS
- ✅ **Estadísticas en Tiempo Real** - Visualiza totales y categorías
- ✅ **Descarga de Excel** - Acceso a datos desde el navegador
- ✅ **Responsive** - Funciona en móvil y desktop

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express.js
- **OCR**: Tesseract.js (local, sin APIs)
- **Excel**: XLSX
- **Almacenamiento**: Sistema de archivos local
- **Frontend**: HTML5 + Tailwind CSS
- **Carga de Archivos**: Multer
- **Compresión de Imágenes**: Sharp

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Windows, macOS o Linux

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd invoice-manager
```

### 2. Instalar dependencias

```bash
npm install
```

El comando anterior instala todos los paquetes necesarios:
- express
- multer
- xlsx
- tesseract.js
- sharp
- cors
- dotenv

### 3. Configurar variables de entorno

Copiar el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

O manualmente, crear un archivo `.env` en la raíz con:

```env
PORT=3000
NODE_ENV=development
UPLOAD_DIR=public/uploads
EXCEL_FILE=public/facturas.xlsx
OCR_LANGUAGE=spa
```

## ▶️ Ejecutar la Aplicación

### Modo Desarrollo (con Nodemon)

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

La aplicación estará disponible en: **http://localhost:3000**

## 📁 Estructura del Proyecto

```
invoice-manager/
├── backend/
│   ├── config/
│   │   └── config.js           # Configuración general
│   ├── controllers/
│   │   └── invoiceController.js # Lógica de negocio
│   ├── middleware/
│   │   └── upload.js           # Configuración de Multer
│   ├── routes/
│   │   └── invoices.js         # Rutas de API
│   ├── utils/
│   │   ├── ocrProcessor.js     # Procesamiento OCR
│   │   ├── excelHandler.js     # Manejo de Excel
│   │   └── fileOrganizer.js    # Organización de archivos
│   └── server.js               # Servidor principal
├── frontend/
│   └── index.html              # Interfaz web
├── public/
│   ├── uploads/                # Imágenes de facturas (por fecha)
│   └── facturas.xlsx           # Archivo Excel generado
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

## 🔌 Endpoints de API

### Subir Factura
```
POST /api/upload
Content-Type: multipart/form-data

Archivo: factura.pdf/jpg/png
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Factura procesada exitosamente",
  "data": {
    "fecha": "15/05/2024",
    "proveedor": "Empresa XYZ",
    "monto": "$1,234.56",
    "numeroFactura": "INV-001",
    "categoria": "Servicios",
    "imagePath": "/public/uploads/2024-05-15/timestamp-random.pdf",
    "fechaRegistro": "09/05/2024 14:30:45"
  }
}
```

### Obtener todas las Facturas
```
GET /api/facturas
```

**Respuesta:**
```json
{
  "success": true,
  "message": "5 facturas encontradas",
  "data": [
    {
      "Fecha": "15/05/2024",
      "Proveedor": "Empresa XYZ",
      "Monto": "$1,234.56",
      "Número de Factura": "INV-001",
      "Categoría": "Servicios",
      "Ruta de Imagen": "/public/uploads/2024-05-15/timestamp-random.pdf",
      "Fecha de Registro": "09/05/2024 14:30:45"
    }
  ]
}
```

### Descargar Excel
```
GET /api/excel
```

Descarga el archivo `facturas.xlsx` actualizado.

### Obtener Estadísticas
```
GET /api/estadisticas
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "totalFacturas": 5,
    "totalMonto": 5234.56,
    "categorias": {
      "Servicios": 3,
      "Materiales": 2
    },
    "proveedores": {
      "Empresa XYZ": 2,
      "Empresa ABC": 3
    }
  }
}
```

## 🎯 Flujo de Procesamiento

```
1. Usuario sube archivo (PDF/JPG/PNG)
   ↓
2. Multer recibe y valida el archivo
   ↓
3. Archivo se guarda en: public/uploads/AAAA-MM-DD/nombre-único.ext
   ↓
4. Tesseract.js realiza OCR local
   ↓
5. Script extrae datos clave (fecha, proveedor, monto, etc.)
   ↓
6. Se detecta categoría automáticamente
   ↓
7. Se abre/crea archivo Excel
   ↓
8. Se agrega fila con datos de la factura
   ↓
9. Se guarda Excel
   ↓
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
