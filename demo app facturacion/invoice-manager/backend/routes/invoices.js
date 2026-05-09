/**
 * Rutas de facturas
 * Define todos los endpoints para el manejo de facturas
 */

const express = require('express');
const upload = require('../middleware/upload');
const {
  uploadInvoice,
  getInvoices,
  downloadExcel,
  getStatistics
} = require('../controllers/invoiceController');

const router = express.Router();

/**
 * POST /api/upload
 * Sube y procesa una factura
 * - Recibe: archivo (PDF, JPG, PNG)
 * - Retorna: datos extraídos de la factura
 */
router.post('/upload', upload.single('factura'), uploadInvoice);

/**
 * GET /api/facturas
 * Obtiene todas las facturas procesadas
 * - Retorna: array de facturas del Excel
 */
router.get('/facturas', getInvoices);

/**
 * GET /api/excel
 * Descarga el archivo Excel
 * - Retorna: archivo Excel descargado
 */
router.get('/excel', downloadExcel);

/**
 * GET /api/estadisticas
 * Obtiene estadísticas de las facturas
 * - Retorna: totales, categorías, proveedores
 */
router.get('/estadisticas', getStatistics);

module.exports = router;
