/**
 * Servidor principal de la aplicación
 * Express server con soporte para OCR, Excel y carga de archivos
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const invoiceRoutes = require('./routes/invoices');

// Crear aplicación Express
const app = express();

// ============ MIDDLEWARES ============

// CORS - Permitir solicitudes desde cualquier origen
app.use(cors(config.corsOptions));

// Body parser para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// ============ RUTAS ============

// Rutas de API de facturas
app.use('/api', invoiceRoutes);

// Ruta raíz - Servir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ============ MANEJO DE ERRORES ============

// Middleware para rutas no encontradas
app.use((req, res) => {
  console.log(`[ERROR] Ruta no encontrada: ${req.url}`);
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware para errores globales
app.use((err, req, res, next) => {
  console.error(`[ERROR GLOBAL]`, err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
});

// ============ INICIAR SERVIDOR ============

const PORT = config.port;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('INVOICE MANAGER - Servidor iniciado');
  console.log('='.repeat(50));
  console.log(`✓ Puerto: ${PORT}`);
  console.log(`✓ Entorno: ${config.env}`);
  console.log(`✓ Directorio de carga: ${config.uploadDir}`);
  console.log(`✓ Archivo Excel: ${config.excelFile}`);
  console.log(`✓ Idioma OCR: ${config.ocrLanguage}`);
  console.log('='.repeat(50));
  console.log(`🚀 Servidor ejecutándose en: http://localhost:${PORT}`);
  console.log('='.repeat(50) + '\n');
});

module.exports = app;
