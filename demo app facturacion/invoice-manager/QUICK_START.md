# 🚀 Inicio Rápido - Invoice Manager

## ✅ El proyecto está 100% listo para usar

### 📋 Lo que se ha creado:

```
invoice-manager/
├── backend/
│   ├── config/config.js              ✓ Configuración centralizada
│   ├── controllers/invoiceController.js ✓ Lógica de facturas
│   ├── middleware/upload.js          ✓ Validación de archivos
│   ├── routes/invoices.js            ✓ Endpoints de API
│   ├── utils/
│   │   ├── ocrProcessor.js           ✓ Procesamiento OCR local
│   │   ├── excelHandler.js           ✓ Manejo de Excel
│   │   └── fileOrganizer.js          ✓ Organización de archivos
│   └── server.js                     ✓ Servidor Express
├── frontend/
│   └── index.html                    ✓ Interfaz con Tailwind CSS
├── public/
│   ├── uploads/                      ✓ Carpeta para imágenes
│   └── facturas.xlsx                 ✓ Excel (se crea al procesar)
├── package.json                      ✓ Dependencias instaladas
├── .env                              ✓ Configuración lista
└── README.md                         ✓ Documentación completa
```

## 🎯 Características Implementadas

- ✅ OCR local con Tesseract.js (sin APIs)
- ✅ Extracción automática de datos (fecha, proveedor, monto, N° factura)
- ✅ Detección automática de categoría
- ✅ Creación automática de Excel
- ✅ Almacenamiento organizado por fecha
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Estadísticas en tiempo real
- ✅ Descarga de Excel
- ✅ Validación de archivos (PDF, JPG, PNG)
- ✅ Todo 100% local, sin dependencias externas

## ▶️ Para iniciar el servidor

### Opción 1: Modo Desarrollo (con auto-reinicio)

```bash
npm run dev
```

### Opción 2: Modo Producción

```bash
npm start
```

El servidor estará disponible en: **http://localhost:3000**

## 📝 Cómo usar la aplicación

### 1. **Subir una Factura**
   - Abre http://localhost:3000 en tu navegador
   - Haz clic en "Seleccionar Archivo" o arrastra una imagen/PDF
   - Formatos soportados: PDF, JPG, PNG (máximo 10MB)
   - La app procesará la factura automáticamente

### 2. **Datos Extraídos Automáticamente**
   - ✓ Fecha (detecta: DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD)
   - ✓ Proveedor
   - ✓ Monto Total
   - ✓ Número de Factura
   - ✓ Categoría (detectada automáticamente)
   - ✓ Imagen guardada en: /public/uploads/AAAA-MM-DD/

### 3. **Ver Resultados**
   - Tabla con todas las facturas procesadas
   - Haz clic en "Ver" para ver la imagen original
   - Las estadísticas se actualizan en tiempo real

### 4. **Descargar Excel**
   - El botón "Descargar Excel" descarga el archivo actualizado
   - Archivo: facturas.xlsx
   - Se crea automáticamente en: /public/facturas.xlsx

## 🌐 Endpoints de API

```
POST   /api/upload          - Subir factura
GET    /api/facturas        - Obtener todas las facturas
GET    /api/excel           - Descargar Excel
GET    /api/estadisticas    - Obtener estadísticas
```

## 📁 Estructura de Carpetas de Imágenes

Las facturas se guardan automáticamente organizadas por fecha:

```
public/uploads/
├── 2024-05-09/
│   ├── 1715254800000-abc123.pdf
│   └── 1715254801000-def456.jpg
├── 2024-05-10/
│   └── 1715341200000-ghi789.png
└── 2024-05-11/
    └── 1715427600000-jkl012.jpg
```

## 📊 Datos en el Excel

El archivo `facturas.xlsx` contiene:
- Fecha
- Proveedor
- Monto
- Número de Factura
- Categoría
- Ruta de Imagen (enlace local)
- Fecha de Registro

## ⚙️ Configuración (.env)

El archivo `.env` contiene:

```env
PORT=3000                           # Puerto del servidor
NODE_ENV=development                # Entorno
UPLOAD_DIR=public/uploads           # Carpeta de imágenes
EXCEL_FILE=public/facturas.xlsx     # Ruta del Excel
OCR_LANGUAGE=spa                    # Idioma (spa=español)
```

**Para cambiar idioma**, edita `.env`:
- `spa` - Español
- `eng` - Inglés
- `fra` - Francés
- `por` - Portugués

## 🎓 Ejemplos de Uso

### Desde Navegador
1. Ve a http://localhost:3000
2. Haz clic en "Seleccionar Archivo"
3. Elige una factura (PDF, JPG o PNG)
4. Los datos se extraen automáticamente
5. Aparecen en la tabla abajo

### Desde Móvil
1. En la red local: http://[IP_DEL_ORDENADOR]:3000
2. Sube fotos de facturas directamente desde el móvil
3. La app las procesa automáticamente

### Descarga de Excel
- Haz clic en "Descargar Excel"
- Se descarga `facturas.xlsx` con todos los datos
- Abre en Excel, Google Sheets o LibreOffice

## 🐛 Solucionar Problemas

### El servidor no inicia
```bash
# Verificar que Node.js está instalado
node --version

# Verificar que las dependencias están instaladas
npm install
```

### Error: "Port 3000 already in use"
```bash
# Cambiar puerto en .env
PORT=3001
```

### OCR muy lento
- Es normal en la primera ejecución
- Tesseract.js descarga modelos la primera vez
- Las siguientes serán más rápidas

### Excel no se guarda
- Verificar que la carpeta `public/` existe
- Verificar permisos de escritura en la carpeta

## 📚 Archivos Importantes

| Archivo | Descripción |
|---------|------------|
| `backend/server.js` | Servidor principal |
| `backend/controllers/invoiceController.js` | Lógica de facturas |
| `backend/utils/ocrProcessor.js` | Procesamiento OCR |
| `backend/utils/excelHandler.js` | Manejo de Excel |
| `backend/utils/fileOrganizer.js` | Organización de archivos |
| `frontend/index.html` | Interfaz web |
| `.env` | Configuración |
| `package.json` | Dependencias |
| `README.md` | Documentación completa |

## 🔒 Seguridad

- ✅ Validación de extensiones
- ✅ Límite de tamaño (10MB)
- ✅ Nombres únicos de archivo
- ✅ Sin APIs externas
- ✅ Todo 100% local

## 📈 Próximas Características (Opcional)

- Edición manual de datos
- Búsqueda y filtrado
- Base de datos
- Autenticación
- Exportación a más formatos

## ❓ ¿Preguntas?

Revisa el archivo `README.md` para documentación completa.

---

**¡La aplicación está lista para usar! Comienza a subir facturas. 🎉**
