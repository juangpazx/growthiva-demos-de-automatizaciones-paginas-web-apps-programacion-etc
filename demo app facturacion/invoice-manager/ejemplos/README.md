# 📸 5 Facturas de Ejemplo - Guía Rápida

## ✨ Lo que tienes disponible

He creado **5 facturas de ejemplo** realistas y completamente funcionales para probar la aplicación:

### 📋 Facturas Disponibles

| # | Tipo | Empresa | Monto | Categoría |
|---|------|---------|-------|-----------|
| 1 | 📋 Servicios | TechConsulting Perú | $12,390.00 | Servicios |
| 2 | 📦 Materiales | SuplyStore Perú | $7,678.26 | Materiales |
| 3 | 🚛 Transporte | Transportes Rápido | $5,015.00 | Transporte |
| 4 | 🍽️ Alimentos | Distribuidora Gourmet | $9,841.20 | Alimentos |
| 5 | 📢 Publicidad | CreativeAds Perú | $6,319.20 | Publicidad |

**Total:** $41,243.66 en 5 facturas

---

## 🚀 Cómo Usar - 3 Pasos Simples

### Paso 1️⃣: Ver las Facturas
```
Abre en el navegador: http://localhost:3001
```

Verás una interfaz con todas las 5 facturas disponibles. Haz clic en "Ver Factura" para abrir cualquiera.

### Paso 2️⃣: Convertir a PDF
Con la factura abierta:
1. Presiona **`Ctrl + P`** (o `Cmd + P` en Mac)
2. En la ventana de impresión, selecciona **"Guardar como PDF"**
3. Haz clic en **"Guardar"**
4. ¡Listo! Tienes un PDF

### Paso 3️⃣: Subir a la App
1. Ve a **http://localhost:3000**
2. Haz clic en **"Seleccionar Archivo"**
3. Elige el PDF que convertiste
4. ¡La app procesa automáticamente!

---

## 📁 Estructura de Archivos

```
ejemplos/
├── factura_1_servicios.html           ← Abre en navegador
├── factura_2_materiales.html          ← Abre en navegador
├── factura_3_transporte.html          ← Abre en navegador
├── factura_4_alimentos.html           ← Abre en navegador
├── factura_5_publicidad.html          ← Abre en navegador
├── servidor_ejemplos.js               ← Ya está ejecutándose en puerto 3001
├── convertir_facturas.js              ← Script opcional para conversión automática
├── INSTRUCCIONES.md                   ← Documentación detallada
└── README.md (este archivo)
```

---

## 🖥️ Servidores en Ejecución

| Servidor | Puerto | URL | Función |
|----------|--------|-----|---------|
| **App Principal** | 3000 | http://localhost:3000 | Gestión de facturas |
| **Ejemplos** | 3001 | http://localhost:3001 | Ver facturas de ejemplo |

---

## 📊 Qué Esperar del OCR

Cuando subas cada factura, la app detectará automáticamente:

### Factura 1 - Servicios
```
✓ Fecha: 08/05/2024
✓ Proveedor: TechConsulting Perú
✓ Monto: $12,390.00
✓ N° Factura: INV-2024-001
✓ Categoría: Servicios (detectada automáticamente)
```

### Factura 2 - Materiales
```
✓ Fecha: 06/05/2024
✓ Proveedor: SuplyStore Perú
✓ Monto: $7,678.26
✓ N° Factura: FCT-2024-002
✓ Categoría: Materiales
```

### Factura 3 - Transporte
```
✓ Fecha: 07/05/2024
✓ Proveedor: Transportes Rápido Perú
✓ Monto: $5,015.00
✓ N° Factura: TRP-2024-003
✓ Categoría: Transporte
```

### Factura 4 - Alimentos
```
✓ Fecha: 05/05/2024
✓ Proveedor: Distribuidora Gourmet Perú
✓ Monto: $9,841.20
✓ N° Factura: ALI-2024-004
✓ Categoría: Alimentos
```

### Factura 5 - Publicidad
```
✓ Fecha: 09/05/2024
✓ Proveedor: CreativeAds Perú
✓ Monto: $6,319.20
✓ N° Factura: PUB-2024-005
✓ Categoría: Publicidad
```

---

## ⚡ Opciones Avanzadas

### Opción A: Convertir Automáticamente con Puppeteer

Si quieres generar automáticamente todos los PDFs:

```bash
# 1. Instala Puppeteer
npm install puppeteer

# 2. Ejecuta el script
node ejemplos/convertir_facturas.js
```

Esto generará automáticamente los 5 PDFs listos para usar.

### Opción B: Convertir en Línea

Si no quieres instalar nada, usa CloudConvert:
1. Ve a https://cloudconvert.com/
2. Sube los archivos HTML
3. Convierte a PDF

---

## 💡 Tips Útiles

✅ **Todos los PDFs tienen datos realistas** - Mira el Excel después para verificar la extracción

✅ **Las categorías se detectan automáticamente** - El sistema busca palabras clave

✅ **Los montos están claramente indicados** - El OCR captará el monto total

✅ **Puedes probar con foto** - Abre el HTML en tu móvil y toma una captura de pantalla

✅ **Las fechas están en formato común** - DD/MM/YYYY se detecta automáticamente

---

## 🎯 Flujo Completo Recomendado

```
1. Abre http://localhost:3001
         ↓
2. Haz clic en "Ver Factura 1"
         ↓
3. Presiona Ctrl+P → Guardar como PDF
         ↓
4. Abre http://localhost:3000
         ↓
5. Sube el PDF a la app
         ↓
6. Verifica que se extraigan los datos
         ↓
7. Repite con las otras 4 facturas
         ↓
8. Descarga el Excel con los resultados
```

---

## 🐛 Si Algo No Funciona

### Los datos no se extraen correctamente
- Asegúrate de usar el PDF generado (no el HTML directamente)
- Prueba con otra factura
- Verifica que el archivo no esté corrupto

### No veo el servidor de ejemplos
- Verifica que el puerto 3001 esté disponible
- Ejecuta: `node ejemplos/servidor_ejemplos.js`

### El Ctrl+P no funciona
- Intenta con el menú: Archivo → Imprimir
- En la ventana de impresión, selecciona "Guardar como PDF"

---

## 📈 Métricas de Ejemplo

- **Total de Facturas:** 5
- **Monto Total:** $41,243.66
- **Formatos:** Diversos (servicios, materiales, transporte, alimentos, publicidad)
- **Campos Detectables:** Fecha, Proveedor, Monto, N° Factura, Categoría
- **Calidad de OCR:** Excelente (texto claro y bien formateado)

---

## 🔗 Enlaces Rápidos

- 🏠 [App Principal](http://localhost:3000) - Gestión de facturas
- 📄 [Ver Ejemplos](http://localhost:3001) - Facturas de ejemplo
- 📖 [Documentación](../README.md) - Documentación completa
- ⚙️ [Configuración](../.env) - Variables de entorno

---

## ✅ Checklist

- [ ] Abrí http://localhost:3001
- [ ] Visualicé las 5 facturas de ejemplo
- [ ] Convertí al menos 1 factura a PDF
- [ ] Subí el PDF a http://localhost:3000
- [ ] Verifiqué que se extrajeron los datos
- [ ] Descargué el Excel con los resultados
- [ ] Probé con otra categoría de factura

---

**¿Listo para empezar? ¡Abre http://localhost:3001 ahora! 🚀**
