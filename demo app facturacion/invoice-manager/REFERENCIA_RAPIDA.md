# 📄 TARJETA DE REFERENCIA RÁPIDA

## 🎯 ACCESO INMEDIATO

### 🌐 URLs Principales
```
App Principal:     http://localhost:3000
Ver Ejemplos:      http://localhost:3001
```

---

## 📋 FACTURAS DE EJEMPLO (5 DISPONIBLES)

### Abre Directamente en el Navegador

| # | Tipo | Monto | URL |
|---|------|-------|-----|
| 1️⃣ | 📋 Servicios | $12,390.00 | `http://localhost:3001/factura_1_servicios.html` |
| 2️⃣ | 📦 Materiales | $7,678.26 | `http://localhost:3001/factura_2_materiales.html` |
| 3️⃣ | 🚛 Transporte | $5,015.00 | `http://localhost:3001/factura_3_transporte.html` |
| 4️⃣ | 🍽️ Alimentos | $9,841.20 | `http://localhost:3001/factura_4_alimentos.html` |
| 5️⃣ | 📢 Publicidad | $6,319.20 | `http://localhost:3001/factura_5_publicidad.html` |

---

## ⚡ PASOS RÁPIDOS (3 MINUTOS)

### 1️⃣ VER FACTURA
```
Abre: http://localhost:3001/factura_1_servicios.html
```

### 2️⃣ CONVERTIR A PDF
```
Tecla: Ctrl + P
Acción: Guardar como PDF
Listo: ✓
```

### 3️⃣ PROCESAR EN APP
```
Abre: http://localhost:3000
Sube: El PDF convertido
Result: Datos extraídos automáticamente ✓
```

---

## 📊 DATOS EXTRAÍDOS

```
✓ Fecha
✓ Proveedor
✓ Monto Total
✓ Número de Factura
✓ Categoría (auto-detectada)
✓ Imagen (guardada en /public/uploads/)
```

---

## 🛠️ COMANDOS ÚTILES

```bash
# Iniciar servidor principal (ya está corriendo)
npm start

# Ver ejemplos (ya está corriendo en puerto 3001)
node ejemplos/servidor_ejemplos.js

# Convertir HTML a PDF automáticamente
npm install puppeteer
node ejemplos/convertir_facturas.js
```

---

## 📁 ARCHIVOS IMPORTANTES

```
invoice-manager/
├── frontend/index.html              ← App web
├── backend/server.js                ← Servidor
├── backend/utils/ocrProcessor.js    ← OCR
├── backend/utils/excelHandler.js    ← Excel
├── public/uploads/                  ← Imágenes
├── public/facturas.xlsx             ← Datos
├── .env                             ← Configuración
├── README.md                        ← Docs
└── ejemplos/
    ├── factura_1_servicios.html
    ├── factura_2_materiales.html
    ├── factura_3_transporte.html
    ├── factura_4_alimentos.html
    ├── factura_5_publicidad.html
    └── servidor_ejemplos.js (CORRIENDO)
```

---

## 🔌 API ENDPOINTS

```
POST   /api/upload          Subir factura
GET    /api/facturas        Obtener todas
GET    /api/excel           Descargar Excel
GET    /api/estadisticas    Ver estadísticas
```

---

## ✅ VERIFICACIÓN RÁPIDA

- [ ] ¿Está corriendo http://localhost:3000?  
- [ ] ¿Está corriendo http://localhost:3001?  
- [ ] ¿Puedo ver las facturas en puerto 3001?  
- [ ] ¿Puedo convertir una a PDF?  
- [ ] ¿Puedo subirla a puerto 3000?  

**Si todo ✓ → ¡LISTO PARA USAR!**

---

## 🎁 BONUS

```bash
# Ver lista de facturas en terminal
ls ejemplos/factura_*.html

# Convertir una factura específica
node ejemplos/convertir_facturas.js
```

---

## 📞 SOPORTE RÁPIDO

| Problema | Solución |
|----------|----------|
| Puerto ocupado | Cambiar en .env: PORT=3001 |
| OCR lento | Normal la primera vez |
| Datos incompletos | Prueba con PDF vs JPG |
| No se ve la app | Verificar http://localhost:3000 |

---

## 🚀 RESUMEN

```
TOTAL DE FACTURAS: 5
MONTO TOTAL: $41,243.66
ESTADO: ✅ READY TO USE

Próximos 5 minutos:
1. Abre http://localhost:3001
2. Ctrl+P en una factura
3. Sube PDF a http://localhost:3000
4. ¡Procesado automáticamente!
5. Descarga Excel con resultados
```

---

**¡Todo está listo! ¡Comienza ahora! 🚀**
