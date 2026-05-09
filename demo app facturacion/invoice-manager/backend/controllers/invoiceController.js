/**
 * Controlador de facturas
 * Maneja toda la lógica de negocio para procesamiento y almacenamiento de facturas
 */

const { processImageWithOCR, extractInvoiceData } = require('../utils/ocrProcessor');
const { addInvoiceToExcel, getAllInvoices } = require('../utils/excelHandler');
const { getWebPath } = require('../utils/fileOrganizer');
const config = require('../config/config');
const fs = require('fs');

/**
 * Procesa una factura subida
 * @param {Object} req - Request object de Express
 * @param {Object} res - Response object de Express
 */
async function uploadInvoice(req, res) {
  try {
    // Verificar si el archivo fue subido
    if (!req.file) {
      console.log(`[UPLOAD] Error: No se subió archivo`);
      return res.status(400).json({
        success: false,
        message: 'No se subió ningún archivo'
      });
    }

    console.log(`[UPLOAD] Archivo recibido: ${req.file.filename}`);
    console.log(`[UPLOAD] Ruta: ${req.file.path}`);

    // Paso 1: Procesar la imagen con OCR
    console.log(`[PROCESO] Iniciando OCR...`);
    const extractedText = await processImageWithOCR(req.file.path);

    // Paso 2: Extraer datos de la factura
    console.log(`[PROCESO] Extrayendo datos...`);
    const invoiceData = extractInvoiceData(extractedText);

    if (!invoiceData) {
      throw new Error('No se pudieron extraer datos de la factura');
    }

    // Paso 3: Obtener la ruta web de la imagen
    const imagePath = getWebPath(req.file.path);
    invoiceData.imagePath = imagePath;

    // Paso 4: Guardar los datos en Excel
    console.log(`[PROCESO] Guardando en Excel...`);
    addInvoiceToExcel(invoiceData, imagePath);

    console.log(`[UPLOAD] Proceso completado exitosamente`);

    // Responder con los datos extraídos
    res.status(200).json({
      success: true,
      message: 'Factura procesada exitosamente',
      data: {
        fecha: invoiceData.fecha,
        proveedor: invoiceData.proveedor,
        monto: invoiceData.monto,
        numeroFactura: invoiceData.numeroFactura,
        categoria: invoiceData.categoria,
        imagePath: imagePath,
        fechaRegistro: new Date().toLocaleString('es-ES')
      }
    });
  } catch (error) {
    console.error(`[UPLOAD] Error:`, error.message);
    
    // Limpiar el archivo si hubo error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      console.log(`[UPLOAD] Archivo eliminado por error`);
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error procesando la factura'
    });
  }
}

/**
 * Obtiene todas las facturas procesadas
 * @param {Object} req - Request object de Express
 * @param {Object} res - Response object de Express
 */
function getInvoices(req, res) {
  try {
    console.log(`[GET] Obteniendo todas las facturas...`);
    
    // Obtener facturas del Excel
    const invoices = getAllInvoices();

    console.log(`[GET] ${invoices.length} facturas obtenidas`);

    res.status(200).json({
      success: true,
      message: `${invoices.length} facturas encontradas`,
      data: invoices
    });
  } catch (error) {
    console.error(`[GET] Error:`, error.message);
    
    res.status(500).json({
      success: false,
      message: 'Error obteniendo facturas'
    });
  }
}

/**
 * Descarga el archivo Excel actualizado
 * @param {Object} req - Request object de Express
 * @param {Object} res - Response object de Express
 */
function downloadExcel(req, res) {
  try {
    console.log(`[DOWNLOAD] Iniciando descarga de Excel...`);
    
    // Verificar si el archivo existe
    if (!fs.existsSync(config.excelFile)) {
      console.log(`[DOWNLOAD] Archivo no encontrado`);
      return res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
    }

    // Configurar headers para descarga
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=facturas.xlsx');

    // Enviar el archivo
    const stream = fs.createReadStream(config.excelFile);
    stream.pipe(res);

    console.log(`[DOWNLOAD] Descarga completada`);
  } catch (error) {
    console.error(`[DOWNLOAD] Error:`, error.message);
    
    res.status(500).json({
      success: false,
      message: 'Error descargando archivo'
    });
  }
}

/**
 * Obtiene estadísticas de las facturas
 * @param {Object} req - Request object de Express
 * @param {Object} res - Response object de Express
 */
function getStatistics(req, res) {
  try {
    console.log(`[STATS] Calculando estadísticas...`);
    
    // Obtener todas las facturas
    const invoices = getAllInvoices();

    // Calcular estadísticas
    const stats = {
      totalFacturas: invoices.length,
      totalMonto: 0,
      categorias: {},
      proveedores: {}
    };

    invoices.forEach(invoice => {
      // Sumar montos (removiendo símbolos de moneda y reemplazando comas por puntos)
      if (invoice['Monto'] && invoice['Monto'] !== 'N/A') {
        const monto = parseFloat(
          String(invoice['Monto']).replace(/[$,]/g, '').replace(',', '.')
        );
        if (!isNaN(monto)) {
          stats.totalMonto += monto;
        }
      }

      // Contar por categoría
      const categoria = invoice['Categoría'] || 'Otros';
      stats.categorias[categoria] = (stats.categorias[categoria] || 0) + 1;

      // Contar por proveedor
      const proveedor = invoice['Proveedor'] || 'N/A';
      stats.proveedores[proveedor] = (stats.proveedores[proveedor] || 0) + 1;
    });

    console.log(`[STATS] Estadísticas calculadas`);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error(`[STATS] Error:`, error.message);
    
    res.status(500).json({
      success: false,
      message: 'Error calculando estadísticas'
    });
  }
}

module.exports = {
  uploadInvoice,
  getInvoices,
  downloadExcel,
  getStatistics
};
