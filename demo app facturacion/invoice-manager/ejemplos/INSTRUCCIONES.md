# 📄 Facturas de Ejemplo - Cómo Usar

He creado **5 facturas de ejemplo** en HTML listas para probar la aplicación. Aquí están:

## 📋 Facturas Disponibles

1. **factura_1_servicios.html** - Consultoría de Servicios TechConsulting
2. **factura_2_materiales.html** - Venta de Materiales de Construcción
3. **factura_3_transporte.html** - Servicio de Transporte y Logística
4. **factura_4_alimentos.html** - Distribuidora Gourmet (alimentos)
5. **factura_5_publicidad.html** - Agencia de Publicidad Digital

## 🖥️ Cómo Convertir HTML a PDF/PNG

### Opción 1: Usar el Navegador (Más Fácil)

#### Para convertir a PDF:
1. Abre el archivo HTML en tu navegador
2. Presiona `Ctrl + P` (o `Cmd + P` en Mac)
3. En la ventana de impresión, cambia la opción a "Guardar como PDF"
4. Dale un nombre al archivo (ej: factura_1.pdf)
5. ¡Listo! Ya tienes un PDF

#### Para convertir a PNG (captura de pantalla):
1. Abre el archivo HTML en tu navegador
2. Presiona `Print Screen` (PrtScn) o usa herramienta de captura
3. Abre Paint o similar
4. Pega (Ctrl + V) y guarda como PNG
5. ¡O simplemente usa las herramientas del navegador!

### Opción 2: Abrir Directamente

```bash
# Windows
start factura_1_servicios.html

# Mac
open factura_1_servicios.html

# Linux
firefox factura_1_servicios.html
```

### Opción 3: Crear Automáticamente (Con Node.js)

Si quieres generar automáticamente los PDFs, ejecuta este comando:

```bash
npm install html-pdf puppeteer
```

Luego crea un script `convertir_facturas.js`:

```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertirHTMLaPDF() {
  const browser = await puppeteer.launch();
  const facturas = [
    'factura_1_servicios.html',
    'factura_2_materiales.html',
    'factura_3_transporte.html',
    'factura_4_alimentos.html',
    'factura_5_publicidad.html'
  ];

  for (const factura of facturas) {
    const rutaHTML = path.join(__dirname, 'ejemplos', factura);
    const rutaPDF = rutaHTML.replace('.html', '.pdf');
    
    const page = await browser.newPage();
    await page.goto(`file://${rutaHTML}`, { waitUntil: 'networkidle0' });
    await page.pdf({ path: rutaPDF, format: 'A4' });
    console.log(`✓ Convertido: ${factura} -> ${path.basename(rutaPDF)}`);
  }

  await browser.close();
  console.log('¡Conversión completada!');
}

convertirHTMLaPDF();
```

Ejecuta:
```bash
node convertir_facturas.js
```

## 📱 Cómo Usar las Facturas en la App

### Paso 1: Convertir a PDF/PNG
Sigue cualquiera de los métodos anterior para obtener archivos PDF o PNG.

### Paso 2: Probar en la App

1. **Ve a http://localhost:3000**
2. **Haz clic en "Seleccionar Archivo"**
3. **Elige uno de los PDFs/PNGs que convertiste**
4. **¡La app procesará la factura automáticamente!**

### Paso 3: Verifica los Datos Extraídos

La app detectará automáticamente:
- ✓ Fecha
- ✓ Proveedor
- ✓ Monto
- ✓ Número de Factura
- ✓ Categoría
- ✓ La imagen se guardará en /public/uploads/AAAA-MM-DD/

## 📊 Qué Esperar de Cada Factura

### Factura 1 - Servicios
- **Proveedor**: TechConsulting Perú
- **Monto Total**: $12,390.00
- **Categoría**: Servicios
- **N° Factura**: INV-2024-001

### Factura 2 - Materiales
- **Proveedor**: SuplyStore Perú
- **Monto Total**: $7,678.26
- **Categoría**: Materiales
- **N° Factura**: FCT-2024-002

### Factura 3 - Transporte
- **Proveedor**: Transportes Rápido Perú
- **Monto Total**: $5,015.00
- **Categoría**: Transporte
- **N° Factura**: TRP-2024-003

### Factura 4 - Alimentos
- **Proveedor**: Distribuidora Gourmet Perú
- **Monto Total**: $9,841.20
- **Categoría**: Alimentos
- **N° Factura**: ALI-2024-004

### Factura 5 - Publicidad
- **Proveedor**: CreativeAds Perú
- **Monto Total**: $6,319.20
- **Categoría**: Publicidad
- **N° Factura**: PUB-2024-005

## ⚡ Recomendaciones

1. **Calidad de Imagen**: Las facturas funcionan mejor como PDF
2. **Iluminación**: Si tomas fotos del HTML en pantalla, asegúrate buena iluminación
3. **Ángulo**: Toma fotos desde arriba para mejor OCR
4. **Primero Prueba con PDF**: Los PDFs tienen mejor reconocimiento que fotos

## 🔍 Solucionar Problemas

### El OCR no extrae datos correctamente
- Asegúrate de que la imagen sea clara
- Prueba convertir a PDF de mejor calidad
- Verifica que el texto sea legible

### La aplicación dice que el archivo no es válido
- Confirma que es PDF, JPG o PNG
- Verifica que el archivo sea menor a 10MB
- Intenta con otra factura

### Los datos se ven incompletos
- Es normal que algunos datos falten
- Puedes editarlos manualmente después
- Prueba con una factura más clara

## 💡 Próximos Pasos

1. Convierte los HTML a PDF
2. Sube los PDFs a la app
3. Verifica que los datos se extraigan correctamente
4. Edita los datos si es necesario (en el Excel)
5. Descarga el Excel con todas las facturas

## 📚 Recursos Adicionales

- **Convertir en Línea**: https://cloudconvert.com/
- **Herramienta de Captura Windows**: Win + Shift + S
- **Print to PDF**: Todos los navegadores lo soportan

---

**¡Listo para probar! Convierte las facturas y comienza a procesarlas en la app. 🎉**
